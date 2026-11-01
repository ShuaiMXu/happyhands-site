import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
// Exercise the same ordered routing rules in vite preview; deployment routing
// remains Vercel's responsibility and must also be verified on the PR preview.
export function resourceRewritePath(url, rules) {
  for (const rule of rules) {
    if (url.pathname !== rule.source) continue;
    const values = {};
    const matches = (condition) => {
      const value = url.searchParams.get(condition.key);
      if (value === null) return false;
      if (condition.value === undefined) return true;
      const match = value.match(new RegExp(`^(?:${condition.value})$`));
      if (match?.groups) Object.assign(values, match.groups);
      return !!match;
    };
    if (!(rule.has || []).every(matches) || (rule.missing || []).some(matches))
      continue;
    const destination = rule.destination.replace(
      /:([a-z]+)/g,
      (_, key) => values[key] || "",
    );
    // Never allow public query data to escape the generated resource directory.
    if (
      destination.split("/").some((part) => part === ".." || part === ".") ||
      destination.includes("%")
    )
      return null;
    return destination;
  }
  return null;
}
export function resourcePreviewPlugin(root) {
  return {
    name: "resource-static-preview",
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url || "/", "http://localhost");
        if (url.pathname !== "/components/") return next();
        try {
          const config = JSON.parse(
            await readFile(resolve(root, "vercel.json"), "utf8"),
          );
          const path = resourceRewritePath(url, config.rewrites);
          if (!path) {
            res.statusCode = 404;
            res.end("Not found");
            return;
          }
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end(await readFile(resolve(root, "dist", "." + path)));
        } catch {
          res.statusCode = 404;
          res.end("Not found");
        }
      });
    },
  };
}
