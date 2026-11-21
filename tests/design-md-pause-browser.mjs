import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {chromium} from 'playwright-core';

const base = process.env.SITE_URL || 'http://127.0.0.1:4173';
const out = 'test-results/design-md-pause';
await mkdir(out, {recursive: true});
const browser = await chromium.launch(process.env.BROWSER_PATH
  ? {executablePath: process.env.BROWSER_PATH}
  : {channel: process.env.BROWSER_CHANNEL || 'chrome'});
try {
  for (const [prefix, lang] of [['', 'zh'], ['/en', 'en']]) {
    for (const width of [1280, 390]) {
      const page = await browser.newPage({viewport: {width, height: 900}, reducedMotion: 'reduce'});
      const archiveRequests = [];
      const directoryRequests = [];
      page.on('request', request => {
        const path = new URL(request.url()).pathname;
        if (path.startsWith('/design-archive/')) archiveRequests.push(request.url());
        if (['/resources/v1/index.json', '/resources/v1/covers.json'].includes(path)) directoryRequests.push(path);
      });
      const systemsName = lang === 'zh' ? '设计系统' : 'Design systems';
      const componentsName = lang === 'zh' ? '组件库' : 'Components';
      assert.equal((await page.goto(base + prefix + '/apps/portal/')).status(), 200);
      const feed = page.locator('#design-resources');
      const systems = feed.getByRole('tab', {name: systemsName, exact: true});
      const components = feed.getByRole('tab', {name: componentsName, exact: true});
      await feed.locator('#feed-panel-systems .resource-directory').waitFor();
      await feed.locator('#feed-panel-systems .resource-card').first().waitFor();
      assert.equal(await systems.getAttribute('aria-selected'), 'true');
      assert.equal(await feed.locator('#feed-tab-design-md, #feed-panel-design-md').count(), 0);
      await page.screenshot({path: `${out}/home-${lang}-${width}.png`, fullPage: true});
      await systems.focus();
      await page.keyboard.press('ArrowRight');
      await feed.locator('#feed-panel-cult-ui .resource-card').first().waitFor();
      assert.equal(await components.getAttribute('aria-selected'), 'true');
      assert.deepEqual(directoryRequests.sort(), ['/resources/v1/covers.json', '/resources/v1/index.json'],
        'one catalog and one covers fetch total across both hydrated homepage tabs');
      assert.deepEqual(archiveRequests, []);
      assert.equal((await page.goto(base + prefix + '/components/?provider=design-md')).status(), 200);
      await page.locator('a[aria-current="page"][href$="?provider=systems"]').waitFor();
      await page.locator('#catalog-main .resource-card').first().waitFor();
      assert.equal(await page.locator('a[href*="provider=design-md"]').count(), 0);
      assert.deepEqual(archiveRequests, []);
      assert.equal((await page.goto(base + prefix + '/components/?provider=collections&collection=design-archive')).status(), 200);
      await page.locator('#catalog-main .resource-card').first().waitFor();
      assert.deepEqual(archiveRequests, []);
      const retired = await page.goto(base + prefix + '/components/?provider=design-md&design=mercury-3172cd4d');
      assert.equal(retired.status(), 404);
      assert.equal((await page.goto(base + prefix + '/components/?provider=systems&system=quartz')).status(), 200);
      await page.close();
    }
  }
} finally {
  await browser.close();
}
console.log('Design.md pause: Chinese and English, desktop and phone, public navigation and old route checks passed.');
