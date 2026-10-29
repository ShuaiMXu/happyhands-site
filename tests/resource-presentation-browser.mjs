import { chromium } from "playwright-core";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.SITE_URL || "http://127.0.0.1:4216";
const dir = "test-results/resource-presentation";
await mkdir(dir, { recursive: true });
const b = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
try {
  for (const width of [390, 768, 1440])
    for (const dark of [false, true]) {
      const context = await b.newContext({
        viewport: { width, height: 1000 },
        reducedMotion: "reduce",
      });
      await context.addInitScript((dark) => {
        if (window !== window.top) return;
        localStorage.setItem("hh-theme", dark ? "dark" : "light");
        localStorage.setItem("pd-lang", dark ? "en" : "zh");
      }, dark);
      const geometry = [];
      for (const provider of ["systems", "design-md", "cult-ui"]) {
        const p = await context.newPage();
        const errors = [];
        p.on("pageerror", (e) => errors.push(e.message));
        await p.goto(`${base}/components/?provider=${provider}`);
        const card = p.locator(".resource-card").first();
        await card.waitFor();
        const measure = await card.evaluate((el) => {
          const m = el.querySelector(".resource-card-media");
          const h = el.querySelector("h2");
          const d = el.querySelector("p");
          return {
            x: el.getBoundingClientRect().x,
            y: el.getBoundingClientRect().y,
            width: el.getBoundingClientRect().width,
            ratio:
              m.getBoundingClientRect().width /
              m.getBoundingClientRect().height,
            title: getComputedStyle(h).fontSize,
            caption: getComputedStyle(d).fontSize,
            radius: getComputedStyle(m).borderRadius,
          };
        });
        geometry.push(measure);
        assert(Math.abs(measure.ratio - 1.6) < 0.01);
        assert.equal(measure.title, "16px");
        assert.equal(measure.caption, "12px");
        const search = p.locator(".resource-search input");
        await search.fill("no-matches-xyz-482");
        assert.equal(await p.locator(".resource-card").count(), 0);
        await search.fill("");
        await card.waitFor();
        await p.waitForTimeout(400);
        await p.screenshot({
          path: `${dir}/${provider}-${width}-${dark ? "dark" : "light"}.png`,
        });
        const target =
          provider === "systems"
            ? "&system=glaze"
            : provider === "design-md"
              ? "&design=mercury-3172cd4d"
              : "&component=shift-card";
        await p.goto(`${base}/components/?provider=${provider}${target}`);
        await p.locator(".resource-detail-header h2").waitFor();
        const tabs = p.locator(".resource-content-tabs [role=tab]");
        await tabs.first().waitFor();
        await tabs.first().focus();
        await p.keyboard.press("ArrowRight");
        assert.equal(await tabs.nth(1).getAttribute("aria-selected"), "true");
        if (provider === "design-md") {
          await p.locator(".resource-export pre").waitFor();
          await p
            .locator(".resource-export pre")
            .filter({ hasText: "Mercury" })
            .waitFor();
        }
        await tabs.first().click();
        if (provider === "design-md") await p.locator("video").waitFor();
        await p.waitForTimeout(400);
        await p.screenshot({
          path: `${dir}/${provider}-detail-${width}-${dark ? "dark" : "light"}.png`,
        });
        assert(
          await p.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          "horizontal overflow",
        );
        assert.deepEqual(errors, []);
        await p.locator(".resource-detail-header button").first().click();
        await p.locator(".resource-card").first().waitFor();
        results.push({ provider, width, dark, measure });
        await p.close();
      }
      for (const g of geometry.slice(1)) {
        assert(Math.abs(g.width - geometry[0].width) < 1, "card width differs");
        assert(Math.abs(g.x - geometry[0].x) < 1, "left alignment differs");
        assert(Math.abs(g.y - geometry[0].y) < 1, "top alignment differs");
        assert.equal(g.radius, geometry[0].radius);
      }
      await context.close();
    }
  const hoverContext = await b.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "no-preference",
  });
  const hoverPage = await hoverContext.newPage();
  await hoverPage.goto(`${base}/components/?provider=design-md`);
  const hoverCard = hoverPage.locator(".archive-card").first();
  await hoverCard.hover();
  await hoverCard.locator("video").waitFor({ state: "attached" });
  await hoverPage.mouse.move(0, 0);
  await hoverCard.locator("video").waitFor({ state: "detached" });
  await hoverContext.close();
  await writeFile(`${dir}/results.json`, JSON.stringify(results, null, 2));
  console.log(`${results.length} list/detail checks passed`);
} finally {
  await b.close();
}
