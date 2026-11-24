import { chromium } from "playwright-core";
import assert from "node:assert/strict";
import { readFile, mkdir } from "node:fs/promises";
const base = process.env.SITE_URL || "http://127.0.0.1:4212";
const registry = JSON.parse(
  await readFile(
    new URL("../systems/quartz/catalog.json", import.meta.url),
    "utf8",
  ).then((text) => text.replace(/^\uFEFF/, "")),
);
const browser = await chromium.launch({
  channel: process.env.BROWSER_CHANNEL || "chrome",
  headless: true,
});
await mkdir("test-results/design-system-reference", { recursive: true });
try {
  for (const width of [390, 1280])
    for (const theme of ["light", "dark"])
      for (const lang of ["zh", "en"]) {
        const t = (zh, en) => (lang === "zh" ? zh : en);
        const entry = base + (lang === "en" ? "/en" : "");
        const context = await browser.newContext({
          viewport: { width, height: 960 },
          colorScheme: theme,
          reducedMotion: "reduce",
        });
        await context.addInitScript(
          ({ lang, theme }) => {
            localStorage.setItem("pd-lang", lang);
            localStorage.setItem("hh-theme", theme);
            Object.defineProperty(navigator, "clipboard", {
              configurable: true,
              value: {
                writeText: async (text) => {
                  window.copiedReference = text;
                },
              },
            });
          },
          { lang, theme },
        );
        const page = await context.newPage(),
          errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        const check = async () => {
          assert.equal(
            await page.locator("html").getAttribute("data-theme"),
            theme,
          );
          assert.ok(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
            "no page overflow",
          );
          assert.deepEqual(errors, []);
        };
        await page.goto(`${entry}/systems/quartz/`, {
          waitUntil: "networkidle",
        });
        const catalog = page.locator(".quartz-catalog");
        await catalog
          .getByRole("button", {
            name: t("显示全部匹配项", "Show all matches"),
            exact: true,
          })
          .click();
        assert.deepEqual(
          (
            await catalog
              .locator("[data-registry-item]")
              .evaluateAll((items) =>
                items.map((item) => item.dataset.registryItem),
              )
          ).sort(),
          registry.items.map((item) => item.name).sort(),
        );
        await choose(page, catalog, /^(页面模板|Screen blocks)\s*\//);
        assert.equal(
          await catalog.locator("[data-registry-item]").count(),
          registry.items.filter((item) => item.type === "registry:block")
            .length,
        );
        await choose(page, catalog, /^(全部|All)\s*\//);
        await catalog.getByRole("searchbox").fill("dialog");
        assert.equal(await catalog.locator("[data-registry-item]").count(), 1);
        await catalog.locator("summary").click();
        await catalog
          .getByRole("button", {
            name: t("复制命令", "Copy command"),
            exact: true,
          })
          .click();
        assert.equal(
          await page.evaluate(() => window.copiedReference),
          "npx shadcn@latest add https://happyhands.cc/r/quartz/dialog.json",
        );
        await page.evaluate(() => {
          navigator.clipboard.writeText = async () => {
            throw Error("denied");
          };
        });
        await catalog
          .getByRole("button", {
            name: t("复制命令", "Copy command"),
            exact: true,
          })
          .click();
        assert.match(
          await catalog.locator("output").innerText(),
          /手动|manually/,
        );
        await catalog.scrollIntoViewIfNeeded();
        await check();
        await page.screenshot({
          path: `test-results/design-system-reference/catalog-${width}-${theme}-${lang}.png`,
        });
        await context.close();
      }
  console.log(
    "Design references: catalog coverage, exact exports, selection, filtering, clipboard failure, bilingual themes and system-library section navigation passed.",
  );
} finally {
  await browser.close();
}
