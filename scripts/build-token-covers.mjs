import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { chromium } from "playwright-core";
const catalog = JSON.parse(
  await readFile("public/resources/v1/index.json", "utf8"),
);
const rows = catalog.resources.filter(
  (r) =>
    r.type === "tokens" ||
    r.path.endsWith(".css") ||
    r.path.endsWith("material3/DESIGN.md") ||
    r.path.endsWith("mobbin-archive/colors.md"),
);
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({
  viewport: { width: 640, height: 600 },
  reducedMotion: "reduce",
});
const evidence = [];
try {
  for (const row of rows) {
    await p.goto(
      "http://127.0.0.1:4307/components/?provider=systems&resource=" +
        encodeURIComponent(row.id),
      { waitUntil: "domcontentloaded" },
    );
    const grid = p.locator(".token-specimens-grid").first();
    await grid.waitFor();
    await grid.evaluate((el) => {
      el.style.maxHeight = "400px";
      el.style.overflow = "hidden";
      el.style.padding = "12px";
      el.style.background = "var(--hh-bg)";
    });
    await p.evaluate(() => document.fonts.ready);
    const cover =
      "/resource-covers/" +
      createHash("sha256").update(row.id).digest("hex").slice(0, 16) +
      ".png";
    await grid.screenshot({ path: "public" + cover });
    evidence.push({
      id: row.id,
      sha256: row.sha256,
      cover,
      checkedAt: new Date().toISOString(),
    });
    console.log(row.id);
  }
  await writeFile(
    "public/resources/v1/token-preview-evidence.json",
    JSON.stringify(evidence, null, 2) + "\n",
  );
} finally {
  await b.close();
}
await import("./link-guideline-covers.mjs");
