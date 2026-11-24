import assert from "node:assert/strict";
import { mkdir, readFile } from "node:fs/promises";
import { chromium } from "playwright-core";
import { isSystemEntry, systemEntryName } from "../components/platform-directory.ts";
import { systemOfficialCover, systemDocumentCover } from "../packages/ui/resource-editorial-covers.ts";
import { resourceHref, sectionFor } from "../components/resource-directory.ts";

const base = process.env.SITE_URL || "http://127.0.0.1:4212";
const index = JSON.parse(await readFile("public/resources/v1/index.json", "utf8"));
const entries = index.resources.filter((row) =>
  !row.aliasOf && row.type !== "collection" && sectionFor(row) === "systems" && isSystemEntry(row),
);
const downloads = [
  ...entries.map((row) => ({
    name: systemEntryName(row),
    system: row.system,
    ...((row.path.startsWith("design-how/") || row.system) ? {
      ids: ["system-preview", "system-foundations", "system-components", "system-download"],
    } : row.collection === "beautiful-ui" ? {
      ids: ["system-preview", "system-components", "system-source", "system-download"],
    } : row.type === "tokens" ? {
      ids: ["system-foundations", "system-source", "system-download"],
    } : {
      ids: ["system-guides", "system-source", "system-download"],
    }),
    href: resourceHref(row, "zh"),
  })),
];
const browser = await chromium.launch(process.env.BROWSER_PATH
  ? { executablePath: process.env.BROWSER_PATH }
  : { channel: process.env.BROWSER_CHANNEL || "chrome" });

await mkdir("test-results/system-book", { recursive: true });
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));

  const officialEntries = entries.flatMap((row) => {
    const url = systemOfficialCover(row.path);
    return url ? [{ row, url }] : [];
  });
  for (const { url } of officialEntries) await page.route(target => target.href === url, route => route.abort());
  await page.goto(base + '/components/?provider=systems');
  const covers = page.locator('.archive-grid a.resource-card img');
  await covers.first().waitFor();
  assert.equal(await covers.count(), downloads.length);
  for (const image of await covers.all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(async (node) => {
      if (node.src.startsWith(location.origin)) return node.decode();
      await new Promise((resolve) => node.addEventListener('load', resolve, { once: true }));
      await node.decode();
    });
    assert.ok(await image.evaluate(node => node.naturalWidth >= 600));
  }
  assert.equal(new Set(await covers.evaluateAll(nodes => nodes.map(node => node.src))).size, downloads.length);
  assert.equal(await page.locator('.archive-grid .component-cover-fallback').count(), 0);
  for (const { row } of officialEntries) {
    const fallback = systemDocumentCover(row);
    assert.ok(fallback && await page.locator(`img[src="${fallback}"]`).count());
  }

  for (const { name, href, ids, system } of downloads) {
    await page.goto(base + href);
    const book = page.locator(".system-documentation");
    await book.getByRole("heading", { name, exact: true, level: 1 }).waitFor();
    const links = book.locator(".system-book-toc nav a");
    assert.deepEqual(await links.evaluateAll((elements) => elements.map((link) => link.hash.slice(1)).filter((id) => document.getElementById(id))), await book.locator(".system-book-content > section").evaluateAll((elements) => elements.map((section) => section.id)));
    for (const id of ids) await book.locator(`#${id}`).waitFor();
    assert.ok(await links.count() >= ids.length, name);
    if (system) {
      const gallery = book.locator("#system-components iframe[src*='gallery=components']");
      await gallery.scrollIntoViewIfNeeded();
      const specimens = gallery.contentFrame().locator(".component-wall-item");
      await specimens.first().waitFor();
      const documents = index.resources.filter(row =>
        row.system === system && row.type === "system" && row.path.includes("/components/"),
      );
      assert.equal(await specimens.count(), documents.length, `${name} component gallery`);
      assert.ok(await gallery.contentFrame().locator(".component-wall").evaluate(wall =>
        [...wall.children].every(card => card.getBoundingClientRect().right <= innerWidth + 1),
      ), `${name} gallery fits the embedded viewport`);
      if (system === "meridian-clay") {
        const dialog = gallery.contentFrame().getByRole("button", { name: "Open dialog", exact: true });
        await dialog.click();
        const panel = gallery.contentFrame().getByRole("dialog");
        await panel.waitFor();
        await page.keyboard.press("Escape");
        await panel.waitFor({ state: "hidden" });
      }
      if (system === "meridian-slate") {
        const button = gallery.contentFrame().getByRole("button", { name: "Publish prompt", exact: true });
        await button.click();
        await gallery.contentFrame().getByText("Preview updated", { exact: true }).waitFor();
      }
    }

    const last = links.last();
    await last.press("Enter");
    await page.waitForURL((url) => url.hash === "#system-download");
    assert.equal(await last.getAttribute("aria-current"), "location", name);
    const file = book.locator("#system-download a[download]").first();
    const path = await file.getAttribute("href");
    assert.ok((await page.request.head(base + path)).ok(), `${name}: ${path}`);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${name}: page overflow`);
  }
  for (const [id, title] of [["quartz", "Quartz"], ["lime", "Lime"], ["glaze", "Glaze"], ["sodium", "Sodium"]]) {
    await page.goto(`${base}/systems/${id}/`);
    const header = page.locator(".system-documentation-header");
    await header.getByRole("heading", { name: title, exact: true, level: 1 }).waitFor();
    const file = header.locator("a[download]").first();
    assert.ok((await page.request.head(base + await file.getAttribute("href"))).ok(), id);
    const anchor = page.locator(".system-book-toc nav a[href='#system-components']");
    await anchor.press("Enter");
    await page.waitForURL((url) => url.hash === "#system-components");
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), id);
  }
  assert.deepEqual(errors, []);

  for (const [id, width, language, theme] of [
    ["quartz", 1280, "zh", "light"],
    ["quartz", 849, "zh", "light"],
    ["quartz", 390, "zh", "light"],
    ["quartz", 725, "zh", "light"],
    ["quartz", 390, "en", "dark"],
  ]) {
    const context = await browser.newContext({ viewport: { width, height: 960 }, colorScheme: theme, reducedMotion: "reduce" });
    const preview = await context.newPage();
    await preview.goto(`${base}${language === "en" ? "/en" : ""}/components/?provider=systems&system=${id}`);
    const glass = preview.locator(".hh-site-header > .liquid-glass-surface[data-refraction]");
    await glass.waitFor();
    assert.ok(await glass.evaluate(surface => {
      const { left, right } = surface.getBoundingClientRect();
      const style = getComputedStyle(surface);
      return Math.abs(left) < 1 && Math.abs(right - innerWidth) < 1 &&
        style.maskImage.includes("16px") && style.backdropFilter !== "none" &&
        style.pointerEvents === "none";
    }), "Glass stays visible across the document header");
    const toc = preview.locator(".system-book-toc");
    assert.equal(await toc.evaluate((el) => getComputedStyle(el).position), width > 900 ? "sticky" : "static");
    const surface = preview.locator("#system-preview .system-style-preview").first();
    assert.equal(await surface.evaluate(el => getComputedStyle(el).borderRadius), "16px");
    await preview.frameLocator("#system-preview iframe").locator(".demo-root").waitFor();
    await preview.screenshot({ path: `test-results/system-book/${id}-after-${width}-${language}-${theme}.png` });
    await context.close();
  }
  console.log(`${downloads.length} design system detail routes, section navigation, file links, responsive layouts and live previews passed. Four standalone system pages share the same template.`);
} finally {
  await browser.close();
}
