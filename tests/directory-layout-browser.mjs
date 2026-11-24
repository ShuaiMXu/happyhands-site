import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const base = process.env.SITE_URL || 'http://127.0.0.1:4173';
const out = 'test-results/directory-layout';
await mkdir(out, { recursive: true });
const browser = await chromium.launch(process.env.BROWSER_PATH
  ? { executablePath: process.env.BROWSER_PATH }
  : { channel: 'chrome' });
try {
  for (const width of [390, 710, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 762 }, reducedMotion: 'reduce' });
    page.setDefaultTimeout(15000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base + '/components/?provider=design-md');
    const toolbar = page.locator('#catalog-main .resource-toolbar');
    const triggers = toolbar.locator('.archive-filter-trigger');
    await triggers.nth(2).waitFor();
    const measure = async locator => {
      const box = await locator.boundingBox();
      assert(box);
      return box;
    };
    const search = await measure(toolbar.locator('.resource-search'));
    const first = await measure(triggers.first());
    if (width <= 710) {
      assert(first.y >= search.y + search.height - 1, 'filters belong under the search field');
      assert(Math.abs(first.y - (await measure(triggers.nth(2))).y) < 1, 'the three short filters fit on one shared row');
    } else assert(Math.abs(first.y - search.y) < 8, 'desktop keeps filters alongside search');
    await page.screenshot({ path: `${out}/archive-${width}.png` });

    await page.goto(base + '/components/?provider=systems');
    const trigger = page.locator('.resource-facets .archive-filter-trigger').first();
    await trigger.focus();
    assert.equal(await trigger.evaluate(el => getComputedStyle(el).outlineOffset), '-2px');
    await trigger.press('Enter');
    const popup = page.locator('.archive-sdk-select');
    const option = popup.getByRole('option', { name: /^sodium/ });
    await option.click();
    await trigger.press('Enter');
    const selected = popup.locator('[role=option][aria-selected=true]');
    await selected.filter({ hasText: 'sodium' }).waitFor();
    const list = await measure(popup.getByRole('listbox'));
    const selectedBox = await measure(selected);
    const tick = await measure(selected.locator('.archive-filter-check'));
    assert(selectedBox.y >= list.y - 1 && selectedBox.y + selectedBox.height <= list.y + list.height + 1);
    assert(tick.x >= selectedBox.x && tick.x + tick.width <= list.x + list.width);
    await page.screenshot({ path: `${out}/selected-${width}.png` });
    await page.keyboard.press('Escape');

    await page.goto(base + '/components/?provider=cult-ui');
    const collections = page.locator('.resource-collection-card');
    await collections.first().waitFor();
    const mono = collections.filter({ hasText: 'Meridian Mono' });
    assert.equal(await mono.count(), 1);
    await mono.click();
    assert.match(page.url(), /collection=meridian-mono/);
    const item = page.locator('a.resource-card[href*="resource=component%3Ameridian-mono-button"]').first();
    await item.click();
    await page.frameLocator('.directory-live-preview').getByRole('button').first().waitFor();
    await page.locator('.resource-detail-header button').first().click();
    assert.match(page.url(), /collection=meridian-mono/);
    await page.goto(base + '/components/?provider=cult-ui');
    await page.locator('#catalog-main input[type=search]').fill('meridian-mono / button');
    await page.locator('a.resource-card[href$="resource=component%3Ameridian-mono-button"]').waitFor();
    assert.equal(await page.locator('.resource-collection-card').count(), 0);

    await page.goto(base + '/components/?provider=setup');
    const footer = page.locator('footer.hh-catalog-footer');
    await footer.getByRole('heading', { name: '使用指南' }).waitFor();
    assert.deepEqual(await footer.locator('h2').allTextContents(), ['使用指南', '设计友链', '关注我']);
    assert.equal(await footer.locator('a[href="/apps/setup/"]').count(), 1);
    assert.equal(await footer.locator('.sy__cta, .sy__word').count(), 0);
    assert.equal(await footer.getByRole('link', { name: '在 X 关注我' }).getAttribute('href'), 'https://x.com/ShuaiXU13');
    await footer.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${out}/footer-${width}.png` });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    assert.deepEqual(errors, []);
    await page.close();
    console.log(`PASS ${width}: toolbar wrapping, selected state, collection drill-down and footer`);
  }
} finally {
  await browser.close();
}
