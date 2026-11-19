import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const base = process.env.SITE_URL || 'http://127.0.0.1:4173';
const output = 'test-results/component-request-budget';
const browser = await chromium.launch(process.env.BROWSER_PATH
  ? { executablePath: process.env.BROWSER_PATH }
  : { channel: process.env.BROWSER_CHANNEL || 'chrome' });
const reports = [];
await mkdir(output, { recursive: true });
const detail = '/components/?provider=cult-ui&resource=component%3Ameridian-mono-button';
const listPaths = ['/resources/v1/index.json', '/resources/v1/covers.json', '/design-archive/index.json'];
const previewPath = path => /^\/(components\/(preview|pinui-preview)|systems\/preview)(\/|$)/.test(path);

try {
  for (const width of [1280, 390]) {
    // A new context is a cold cache. Record requests, not just iframe elements:
    // scripts can prefetch a preview without ever attaching a visible frame.
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce', serviceWorkers: 'block' });
    const page = await context.newPage();
    const requests = [];
    page.on('request', request => {
      let childFrame = false;
      try { childFrame = request.frame() !== page.mainFrame(); } catch { /* no frame */ }
      requests.push({ url: request.url(), path: new URL(request.url()).pathname, type: request.resourceType(), childFrame });
    });
    const report = { width, phases: [] };
    reports.push(report);
    async function settle() {
      await page.waitForLoadState('networkidle');
      // Also catch short idle/deferred mounting after hydration or scrolling.
      await page.waitForTimeout(300);
    }
    function record(name, from) {
      const batch = requests.slice(from);
      report.phases.push({ name, requests: batch });
      return batch;
    }
    function noUnopenedPreviews(batch) {
      assert.deepEqual(batch.filter(r => r.childFrame || previewPath(r.path)), [], 'list must not request unopened preview documents or their child assets');
    }
    async function renderedPreview() {
      const frame = page.frameLocator('.directory-live-preview');
      await frame.locator('button').first().waitFor({ state: 'visible' });
      assert.equal(await frame.locator('[role="alert"]').count(), 0, 'preview must render, not an error placeholder');
      assert.equal(await page.locator('.directory-live-preview').count(), 1);
    }
    try {
      await page.goto(base + '/components/');
      await page.locator('.resource-card').first().waitFor();
      await settle();
      const cold = record('cold-list', 0);
      noUnopenedPreviews(cold);
      assert.equal(await page.locator('iframe').count(), 0);
      for (const path of listPaths) assert.equal(cold.filter(r => r.path === path).length, 1, `list fetches ${path} once`);
      let from = requests.length;
      for (let i = 0; i < 4; i++) { await page.mouse.wheel(0, 650); await page.waitForTimeout(150); }
      await settle();
      noUnopenedPreviews(record('scroll-list', from));
      assert.equal(await page.locator('iframe').count(), 0);

      // Search then click the real card, not a fabricated navigation event.
      await page.locator('.resource-toolbar input[type="search"]').fill('meridian-mono / button');
      await page.keyboard.press('Escape');
      const link = page.locator('a.resource-card[href*="resource=component%3Ameridian-mono-button"]');
      await link.waitFor();
      from = requests.length;
      await link.click();
      await renderedPreview();
      await settle();
      const opened = record('open-detail', from);
      assert.equal(opened.filter(r => r.path === listPaths[0]).length, 1, 'detail catalog has one owner');
      assert.equal(opened.filter(r => listPaths.slice(1).includes(r.path)).length, 0, 'detail must not load hidden-list covers/archive');
      assert.ok(opened.some(r => previewPath(r.path)), 'explicit open loads a preview');
      await page.screenshot({ path: `${output}/${width}-detail.png` });
      from = requests.length;
      await page.goBack();
      await page.locator('.resource-card').first().waitFor();
      await settle();
      assert.equal(await page.locator('iframe').count(), 0);
      noUnopenedPreviews(record('back-to-list', from));
      await page.goForward();
      await renderedPreview();

      // Cold deep links must work without a prior list request or cached catalog.
      const directContext = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce', serviceWorkers: 'block' });
      const direct = await directContext.newPage();
      const directRequests = [];
      direct.on('request', r => directRequests.push(new URL(r.url()).pathname));
      await direct.goto(base + detail);
      await direct.frameLocator('.directory-live-preview').locator('button').first().waitFor({ state: 'visible' });
      await direct.waitForLoadState('networkidle');
      assert.equal(directRequests.filter(path => path === listPaths[0]).length, 1);
      assert.equal(directRequests.filter(path => listPaths.slice(1).includes(path)).length, 0);
      report.phases.push({ name: 'deep-link', paths: directRequests });
      report.pass = true;
      await directContext.close();
    } finally { await context.close(); }
  }
} finally {
  await writeFile(`${output}/requests.json`, JSON.stringify({ base, reports }, null, 2));
  await browser.close();
}
console.log(JSON.stringify(reports.map(r => ({ width: r.width, pass: r.pass, phases: r.phases.map(p => p.name) })), null, 2));
