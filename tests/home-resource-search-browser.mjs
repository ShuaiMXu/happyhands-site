import { chromium } from "playwright-core";
import assert from "node:assert/strict";
import { mkdir, readFile } from "node:fs/promises";
const base = process.env.SITE_URL || "http://127.0.0.1:4216";
const archive = JSON.parse(
  await readFile("public/design-archive/index.json", "utf8"),
);
const sample = archive.at(-1);
const b = await chromium.launch({ channel: "chrome", headless: true });
await mkdir("test-results/home-search", { recursive: true });
try {
  for (const width of [390, 1440])
    for (const dark of [false, true]) {
      const c = await b.newContext({
        viewport: { width, height: 1000 },
        reducedMotion: "reduce",
      });
      await c.addInitScript((d) => {
        if (window === top) {
          localStorage.setItem("hh-theme", d ? "dark" : "light");
          localStorage.setItem("pd-lang", d ? "en" : "zh");
        }
      }, dark);
      const p = await c.newPage();
      const errors = [];
      p.on("pageerror", (e) => errors.push(e.message));
      await p.goto(base + "/apps/portal/");
      const feed = p.locator(".resource-feed");
      await feed
        .locator(".resource-result-count")
        .filter({ hasText: "1342" })
        .waitFor();
      const search = feed.locator(".resource-search input");
      await search.fill(sample.name);
      await feed.locator(`a[href*="design=${sample.slug}"]`).waitFor();
      await search.fill("no-match-29485");
      await feed.locator(".feed-empty").waitFor();
      await feed.locator(".feed-empty button").click();
      await feed.locator(".archive-filter-trigger").click();
      const opts = p.getByRole("option");
      await opts.nth(1).click();
      assert(
        (await feed.locator("#feed-panel-design-md .feed-item").count()) > 0,
      );
      await feed.locator('[data-feed-tab="systems"]').click();
      await search.fill("quartz");
      assert.equal(
        await feed.locator("#feed-panel-systems .feed-item").count(),
        1,
      );
      await feed.locator('[data-feed-tab="cult-ui"]').click();
      await feed
        .locator(".resource-result-count")
        .filter({ hasText: /\d/ })
        .waitFor();
      await search.fill("halo");
      await feed.locator("#feed-panel-cult-ui .feed-item").first().waitFor();
      assert(
        (await feed.locator("#feed-panel-cult-ui .feed-item").count()) > 1,
      );
      await feed.locator('[data-feed-tab="systems"]').click();
      assert.equal(await search.inputValue(), "quartz");
      await search.fill("");
      await feed.scrollIntoViewIfNeeded();
      await p.waitForTimeout(300);
      await p.screenshot({
        path: `test-results/home-search/${width}-${dark ? "dark" : "light"}.png`,
      });
      assert(
        await p.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
      assert.deepEqual(errors, []);
      await c.close();
      console.log("PASS", width, dark);
    }
  const p = await b.newPage();
  await p.route("**/design-archive/index.json", (r) =>
    r.fulfill({ status: 503, body: "unavailable" }),
  );
  await p.goto(base + "/apps/portal/");
  await p
    .locator("[data-feed-controls]")
    .getByRole("button", { name: "重试", exact: true })
    .waitFor();
  await p.unroute("**/design-archive/index.json");
  await p
    .locator("[data-feed-controls]")
    .getByRole("button", { name: "重试", exact: true })
    .click();
  await p
    .locator(".resource-feed .resource-result-count")
    .filter({ hasText: "1342" })
    .waitFor();
  console.log("Error retry passed");
} finally {
  await b.close();
}
