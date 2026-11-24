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
    ...(row.path.startsWith("design-how/") ? {
      ids: ["system-preview", "system-foundations", "system-components", "system-guides"],
    } : row.system ? {
      ids: ["system-preview", "system-foundations", "system-components", "system-source"],
    } : row.collection === "beautiful-ui" ? {
      ids: ["system-preview", "system-components", "system-source"],
    } : row.type === "tokens" ? {
      ids: ["system-foundations", "system-source"],
    } : {
      ids: ["system-guides", "system-source"],
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
  await page.route("https://fonts.googleapis.com/**", route => route.abort());

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

    if (name === "Varlet") {
      const specimens = book.locator("#system-foundations .token-specimens");
      const cards = specimens.locator(".token-specimens-grid article");
      await cards.first().waitFor();
      assert.equal(await cards.count(), 36);
      await specimens.getByRole("button", { name: "加载更多", exact: true }).press("Enter");
      assert.equal(await cards.count(), 72);
      assert.ok(await cards.nth(36).evaluate(card => document.activeElement === card));
      const search = specimens.getByRole("searchbox", { name: "查找设计变量" });
      await search.fill("--watermark-content-color");
      assert.equal(await cards.count(), 1);
      await cards.getByText("--watermark-content-color", { exact: true }).waitFor();
      await search.fill("absent-token-fixture");
      await specimens.getByText("没有匹配的设计变量", { exact: true }).waitFor();
      await search.clear();
      assert.equal(await cards.count(), 36);
    }

    assert.equal(await book.locator("#system-download, a[href='#system-download']").count(), 0, name);
    const last = links.last();
    const lastSection = await last.getAttribute("href");
    await last.press("Enter");
    await page.waitForURL((url) => url.hash === lastSection);
    await book.locator(`.system-book-toc nav a[href="${lastSection}"][aria-current="location"]`).waitFor();
    const file = book.locator(".system-documentation-header a[download]");
    assert.equal(await file.count(), 1, name);
    const path = await file.getAttribute("href");
    const response = await page.request.head(base + path);
    assert.ok(response.ok() && !response.headers()["content-type"]?.includes("text/html"), `${name}: ${path}`);
    if (ids.includes("system-source")) {
      const source = book.locator("#system-source");
      await source.getByRole("button", { name: "复制原文" }).waitFor();
      await source.locator(".collections-provenance summary").press("Enter");
      await source.locator(".collections-provenance a[target='_blank']").waitFor();
      assert.match(await source.locator(".collections-provenance code").innerText(), /^[a-f0-9]{64}$/);
    } else {
      assert.equal(await book.locator(".design-how-source a").getAttribute("href"), `https://design.how/systems/${name.toLowerCase()}`);
    }
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${name}: page overflow`);
  }
  await page.goto(base + "/components/?provider=systems&system=glaze#system-download");
  await page.waitForURL(url => url.hash === "#system-documentation-top");
  await page.locator("#system-documentation-top a[download]").waitFor();

  for (const system of ["lime", "meridian-clay"]) {
    await page.goto(`${base}/systems/preview/?system=${system}&component=accordion`);
    await page.getByText("How do round-ups work?", { exact: true }).waitFor();
    assert.ok(await page.evaluate(async () =>
      (await document.fonts.load('400 16px "Hanken Grotesk"')).length > 0
    ), `${system} can load its original font locally`);
  }
  for (const [id, title] of [["quartz", "Quartz"], ["lime", "Lime"], ["glaze", "Glaze"], ["sodium", "Sodium"]]) {
    await page.goto(`${base}/systems/${id}/`);
    const header = page.locator(".system-documentation-header");
    await header.getByRole("heading", { name: title, exact: true, level: 1 }).waitFor();
    const file = header.locator("a[download]").first();
    assert.ok((await page.request.head(base + await file.getAttribute("href"))).ok(), id);
    assert.equal(await page.locator("#system-download, a[href='#system-download']").count(), 0, id);
    if (id === "lime" || id === "quartz") {
      await page.goto(`${base}/systems/${id}/#system-download`);
      await page.waitForURL(url => url.hash === "#system-setup");
      await page.locator("#system-setup textarea").waitFor();
    }
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
