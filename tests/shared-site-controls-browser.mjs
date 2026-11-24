import { chromium } from "playwright-core";
import assert from "node:assert/strict";

const base = process.env.SITE_URL || "http://127.0.0.1:4443";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const routes = ["/components/?provider=design-md", "/components/?provider=systems",
  "/components/?provider=cult-ui", "/apps/portal/"];

try {
  for (const width of [320, 390, 725, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 800 }, reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.addInitScript(() => {
      if (window === window.top) localStorage.setItem("pd-lang", "zh");
    });

    for (const route of routes) {
      await page.goto(new URL(route, base).href);
      const toolbar = page.locator(".resource-toolbar:visible").first();
      const trigger = toolbar.locator(".archive-filter-trigger").first();
      await trigger.waitFor();
      await page.locator(".archive-grid .resource-card:visible").first().waitFor();
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route);

      if (width === 725) {
        const rows = await toolbar.locator(".archive-filter-trigger")
          .evaluateAll(items => new Set(items.map(item => item.getBoundingClientRect().top)).size);
        assert.equal(rows, 1, `${route}: keep the filters together when the search moves to its own row`);
      }

      await trigger.focus();
      await trigger.press("Enter");
      const popup = page.locator(".archive-filter-popup:visible");
      await popup.waitFor();
      await page.waitForFunction(() => {
        const r = document.querySelector(".archive-filter-popup")?.getBoundingClientRect();
        return r && r.left >= 0 && r.right <= innerWidth + 1 && r.top >= 0 && r.bottom <= innerHeight + 1;
      });
      await popup.getByRole("option").nth(1).click();
      await popup.waitFor({ state: "hidden" });
      assert.equal(await trigger.getAttribute("data-filter-active"), "true");
      await trigger.press("Enter");
      await popup.getByRole("option", { selected: true }).waitFor();
      await page.keyboard.press("Escape");
      await popup.waitFor({ state: "hidden" });
      assert(await trigger.evaluate(el => document.activeElement === el), `${route}: focus should return`);

      const search = toolbar.locator(".psearch__input");
      await search.focus();
      const card = toolbar.locator(".psearch__card--open");
      await card.waitFor();
      const coveredHeader = await card.evaluate(el => {
        const header = document.querySelector(".hh-site-header");
        scrollBy({ top: el.getBoundingClientRect().top + 5, behavior: "instant" });
        const { left, right, top, bottom } = el.getBoundingClientRect();
        const deepestOverlap = Math.min(header.getBoundingClientRect().bottom, bottom);
        return top < deepestOverlap && el.contains(document.elementFromPoint(
          (left + right) / 2, (Math.max(0, top) + deepestOverlap) / 2,
        ));
      });
      assert.equal(coveredHeader, false, `${route}: search covers the header`);
      await search.press("Escape");
      await card.waitFor({ state: "hidden" });
    }

    assert.deepEqual(errors, []);
    await page.close();
  }

  const page = await browser.newPage();
  await page.goto(new URL("/components/?provider=systems", base).href);
  await page.locator(".archive-grid .resource-card").first().waitFor();
  assert.equal(await page.locator(".resource-load-more").count(), 0);
  await page.goto(new URL("/components/?provider=design-md", base).href);
  const more = page.locator(".resource-load-more button");
  await more.focus();
  const cards = page.locator(".resource-directory .archive-grid > *");
  const initial = await cards.count();
  await more.press("Enter");
  assert(await cards.count() > initial);
  assert(await cards.nth(initial).evaluate(el => el.contains(document.activeElement)));
  console.log("Shared site controls passed on 4 routes and 4 screen widths.");
} finally {
  await browser.close();
}
