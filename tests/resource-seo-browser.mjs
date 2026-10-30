import { chromium } from "playwright-core";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.SITE_URL || "http://127.0.0.1:4246";
const browser = await chromium.launch(
  process.env.BROWSER_PATH
    ? { executablePath: process.env.BROWSER_PATH }
    : { channel: process.env.BROWSER_CHANNEL || "chrome" },
);
const routes = [
  ["provider=design-md&design=dot-connect-981d90e9", "(dot)connect"],
  ["provider=cult-ui&component=cosmic-button", "Cosmic Button"],
  ["provider=systems&system=quartz", "Quartz"],
  ["provider=systems&system=quartz&doc=foundations%2Fcolor.md", "Color"],
];
const results = [];
await mkdir("test-results/resource-seo", { recursive: true });
try {
  for (const [query, title] of routes) {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    const response = await page.goto(
      `${base}/components/?${query}&utm_source=test`,
    );
    assert.equal(response.status(), 200);
    assert.ok((await page.title()).includes(title));
    assert.ok((await page.locator("main").innerText()).length > 100);
    assert.equal(
      await page.locator('link[rel="canonical"]').getAttribute("href"),
      `https://happyhands.cc/components/?${query}`,
    );
    assert.equal(await page.locator("h1").count(), 1);
    results.push({ query, javaScript: false, pass: true });
    await context.close();
  }
  const plain = await browser.newContext({ javaScriptEnabled: false });
  const p = await plain.newPage();
  await p.goto(base + "/components/");
  assert.ok((await p.locator("main a").count()) > 1000);
  const unknown = await p.goto(
    base + "/components/?provider=design-md&design=not-a-real-entry",
  );
  assert.equal(unknown.status(), 404);
  await plain.close();
  for (const width of [1280, 390]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (const [query, title] of routes) {
      await page.goto(`${base}/components/?${query}`);
      await page.waitForFunction(
        () => !document.getElementById("resource-static"),
      );
      await page.waitForFunction((t) => document.title.includes(t), title);
      await page.waitForTimeout(400);
      assert.equal(
        await page.locator('link[rel="canonical"]').getAttribute("href"),
        `https://happyhands.cc/components/?${query}`,
      );
      assert.equal(
        await page.locator('meta[property="og:title"]').getAttribute("content"),
        await page.title(),
      );
      assert.equal(await page.locator('link[rel="canonical"]').count(), 1);
      await page.screenshot({
        path: `test-results/resource-seo/${width}-${routes.findIndex((x) => x[0] === query)}.png`,
      });
    }
    await page.goto(base + "/components/?provider=cult-ui");
    await page.locator('a[href*="component=cosmic-button"]').first().click();
    await page.waitForFunction(() => document.title.includes("Cosmic Button"));
    await page.goBack();
    await page.waitForFunction(() => !document.title.includes("Cosmic Button"));
    assert.equal(
      await page.locator('link[rel="canonical"]').getAttribute("href"),
      "https://happyhands.cc/components/",
    );
    await page.goForward();
    await page.waitForFunction(() => document.title.includes("Cosmic Button"));
    assert.equal(
      await page.locator('link[rel="canonical"]').getAttribute("href"),
      "https://happyhands.cc/components/?provider=cult-ui&component=cosmic-button",
    );
    assert.deepEqual(errors, []);
    results.push({ width, javaScript: true, backForward: true, pass: true });
    await context.close();
  }
  console.log(JSON.stringify(results, null, 2));
  await writeFile(
    "test-results/resource-seo/results.json",
    JSON.stringify(results, null, 2),
  );
} finally {
  await browser.close();
}
