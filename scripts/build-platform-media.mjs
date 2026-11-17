import { readFile, writeFile } from "node:fs/promises";
const catalog = JSON.parse(
  await readFile("public/resources/v1/index.json", "utf8"),
);
const rows = catalog.resources.filter(
  (r) => r.path.includes("apple-hig/docs/") && r.path.endsWith(".md"),
);
const output = { documents: {}, failures: [] };
let cursor = 0;
function key(s) {
  return decodeURIComponent(s)
    .split("/")
    .at(-1)
    .replace(/~(dark|light)|@\dx/g, "");
}
async function worker() {
  while (cursor < rows.length) {
    const row = rows[cursor++];
    const slug = row.path
      .split("/")
      .at(-1)
      .split("_")
      .at(-1)
      .replace(".md", "");
    const source =
      slug === "index"
        ? "https://developer.apple.com/tutorials/data/design/human-interface-guidelines.json"
        : `https://developer.apple.com/tutorials/data/design/human-interface-guidelines/${slug}.json`;
    try {
      const res = await fetch(source, { signal: AbortSignal.timeout(25000) });
      if (!res.ok) throw Error(String(res.status));
      const doc = await res.json();
      const media = {};
      for (const ref of Object.values(doc.references || {})) {
        if (ref.type === "image") {
          for (const variant of ref.variants || []) {
            media[key(ref.identifier)] ||= {};
            media[key(ref.identifier)][
              variant.traits?.includes("dark") ? "dark" : "light"
            ] = variant.url;
          }
        }
        if (ref.type === "video") {
          media[key(ref.identifier)] = {
            video: ref.variants?.[0]?.url || ref.url,
            poster: ref.poster,
          };
        }
      }
      output.documents[row.path] = { source, media };
    } catch (e) {
      output.failures.push({ path: row.path, error: e.message, source });
    }
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
await writeFile(
  "public/resources/v1/platform-media.json",
  JSON.stringify(output, null, 2) + "\n",
);
console.log(
  Object.keys(output.documents).length,
  "documents",
  output.failures.length,
  "failures",
);
