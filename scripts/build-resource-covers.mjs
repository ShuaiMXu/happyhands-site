import { chromium } from "playwright-core";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
const catalog = JSON.parse(
  await readFile("public/resources/v1/index.json", "utf8"),
);
const examples = JSON.parse(
  await readFile("public/resources/v1/examples.json", "utf8"),
);
const controls = new Set([
  "button",
  "button-group",
  "copy-button",
  "input",
  "textarea",
  "checkbox",
  "switch",
  "slider",
  "progress",
  "tabs",
  "badge",
  "status",
  "avatar",
  "skeleton",
  "dialog",
  "popover",
  "select",
  "card",
  "frame",
]);
const base = process.env.SITE_URL || "http://127.0.0.1:4307",
  out = "public/resource-covers";
await mkdir(out, { recursive: true });
const retryIds = process.env.RETRY_FAILED ? new Set(JSON.parse(await readFile("public/resources/v1/preview-failures.json", "utf8")).map(r => r.id)) : null;
const covers = retryIds ? JSON.parse(await readFile("public/resources/v1/covers.json", "utf8")) : {},
  evidence = retryIds ? JSON.parse(await readFile("public/resources/v1/preview-evidence.json", "utf8")) : [], failures = [];
const escape = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[c],
  );
const health = await fetch(base + "/systems/preview/");
if (!health.ok) throw Error("Preview server unavailable");
const browser = await chromium.launch({ channel: "chrome", headless: true });
const p = await browser.newPage({
  viewport: { width: 600, height: 375 },
  reducedMotion: "reduce",
});
let errors = [];
p.on("pageerror", (e) => errors.push(e.message));
try {
  for (const row of catalog.resources) {
    if(retryIds && !retryIds.has(row.id)) continue;
    if (row.type === "collection") continue;
    if (row.cover) {
      covers[row.id] = row.cover;
      continue;
    }
    const key = createHash("sha256").update(row.id).digest("hex").slice(0, 16),
      name = row.path
        .split("/")
        .at(-1)
        .replace(/\.[^.]+$/, "");
    let url = "";
    if (
      row.system &&
      (controls.has(name) || examples[row.system]?.[name]) &&
      row.type === "component"
    )
      url = `/systems/preview/?system=${row.system}&component=${name}&theme=light`;
    if (row.type === "system" && row.system && row.path.endsWith("/index.md"))
      url = `/systems/preview/?system=${row.system}&theme=light`;
    if (row.collection === "cult-ui")
      url = `/components/preview/?component=${row.id.split("/").at(-1)}&theme=light&motion=off`;
    if(row.collection === "pin-ui") url = `/components/pinui-preview/?component=${row.id.split("/").at(-1)}&theme=light`;
    let rendered = false;
    if (url) {
      try {
        errors = [];
        await p.goto(base + url, { waitUntil: "load", timeout: 30000 });
        await p.waitForFunction(
          () => {
            const r = document.querySelector("#root");
            return (
              r?.children.length && !/Loading (preview|component)|Loading…/i.test(r.textContent || "")
            );
          },
          {},
          { timeout: 15000 },
        );
        await p.evaluate(() => document.fonts.ready);
        if (row.system && row.type === "component")
          await p.addStyleTag({
            content:
              "#root{min-height:100vh;display:grid;align-items:center}.demo-root{width:100%;box-sizing:border-box}.demo-root>div:only-child{min-width:0}",
          });
        await p.waitForTimeout(500);
        const text = await p.locator("body").innerText();
        if (errors.length) throw Error(errors.join("; "));
        if (
          /preview failed|failed to resolve|Internal Server Error|could not render|could not be rendered|Preview unavailable/i.test(
            text,
          ) ||
          (await p.locator("#root > *").count()) === 0
        )
          throw Error("No rendered example");
        await p.screenshot({ path: `${out}/${key}.png` });
        covers[row.id] = `/resource-covers/${key}.png`;
        evidence.push({ id: row.id, url, sha256: row.sha256, checkedAt: new Date().toISOString() });
        if (evidence.length % 50 === 0)
          console.log("Rendered", evidence.length, row.id);
        rendered = true;
      } catch (e) {
        failures.push({id:row.id,url,error:e.message}); console.log("FAILED", row.id, e.message);
      }
    }
    if (!rendered) {
      const text = await readFile("public/" + row.path, "utf8");
      const lines = text
        .split("\n")
        .map((l) => l.replace(/^#+\s*/, "").trim())
        .filter((l) => l && !l.startsWith("---"))
        .slice(0, 7);
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="#fafafa"/><text x="40" y="58" font-family="Arial,sans-serif" font-size="18" fill="#666">${escape(row.type === "component" ? "SOURCE / " + name : row.system || row.collection)}</text>${lines.map((l, i) => `<text x="40" y="${115 + i * 43}" font-family="Arial,sans-serif" font-size="${i ? 18 : 25}" fill="${i ? "#666" : "#111"}">${escape(l.slice(0, 65))}</text>`).join("")}</svg>`;
      await writeFile(`${out}/${key}.svg`, svg);
      covers[row.id] = `/resource-covers/${key}.svg`;
    }
  }
  await writeFile(
    "public/resources/v1/covers.json",
    JSON.stringify(covers, null, 2) + "\n",
  );
  await writeFile(
    "public/resources/v1/preview-evidence.json",
    JSON.stringify(evidence, null, 2) + "\n",
  );
  await writeFile("public/resources/v1/preview-failures.json", JSON.stringify(failures,null,2)+"\n");
  if(failures.length) process.exitCode=1;
  console.log(
    "Generated",
    Object.keys(covers).length,
    "covers;",
    evidence.length,
    "actual renders",
  );
} finally {
  await browser.close();
}

await import("./link-system-preview-covers.mjs");
