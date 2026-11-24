import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';
import { previewFor, resourceHref } from '../components/resource-directory.ts';

const base = process.env.SITE_URL || 'http://127.0.0.1:4173';
const index = JSON.parse(await readFile('public/resources/v1/index.json', 'utf8'));
const rows = index.resources.filter((row) => row.type === 'component' && !row.aliasOf);
const groups = [...new Set(rows.map((row) => row.collection))];
const browser = await chromium.launch(process.env.BROWSER_PATH
  ? { executablePath: process.env.BROWSER_PATH } : { channel: 'chrome' });
try {
  for (const width of [390, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 850 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(base + '/components/?provider=cult-ui');
    const cards = page.locator('.resource-collection-card');
    await cards.first().waitFor();
    assert.ok(await cards.count() >= groups.length);
    for (const group of groups) {
      const available = rows.filter((row) => row.collection === group);
      const row = available.find((entry) => previewFor(entry) && entry.path.endsWith('/button.json')) ||
        available.find((entry) => previewFor(entry));
      assert.ok(row, group);
      await page.goto(base + resourceHref(row, 'zh'));
      await page.locator('#catalog-main').getByRole('heading', { level: 1 }).waitFor();
      const tabs = page.locator('#catalog-main').getByRole('tablist');
      await tabs.getByRole('tab', { name: /预览$/ }).waitFor();
      await tabs.getByRole('tab', { name: /源码/ }).click();
      await page.locator('.component-source-file').first().waitFor();
      const source = page.locator('.component-source-file').first();
      if (!await source.locator('pre').isVisible()) await source.getByRole('button').first().click();
      assert.ok((await source.locator('pre').innerText()).trim().length > 0, group);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${group} overflows at ${width}px`);
    }
    await page.goto(base + '/components/?provider=cult-ui&collection=beautiful-ui');
    await page.getByRole('heading', { name: 'Beautiful UI', exact: true }).waitFor();
    assert.equal(await page.locator('.archive-grid .resource-card').count(), 27);
    assert.equal(await page.locator('.component-source-section').count(), 0);
    const heading = await page.locator('.component-collection-heading').boundingBox();
    const toolbar = await page.locator('.resource-toolbar').boundingBox();
    assert.ok(heading && toolbar && heading.y + heading.height < toolbar.y);
    await page.goto(base + '/components/?provider=cult-ui&component=expandable&collection=cult-ui');
    const preview = page.locator('.component-detail-preview');
    const frame = page.frameLocator('.component-detail-preview iframe');
    const card = frame.getByRole('button', { name: 'Toggle expand' });
    const example = preview.getByRole('combobox', { name: '示例' });
    await frame.getByText('Design Sync', { exact: true }).waitFor();
    await card.press('Enter');
    await frame.getByText('Conference Room A', { exact: true }).waitFor();
    assert.ok(await card.evaluate(el => {
      const rect = el.getBoundingClientRect();
      return rect.left >= 0 && rect.right <= window.innerWidth + 1;
    }), 'The expanded card fits the preview width');
    await preview.getByRole('button', { name: '重置', exact: true }).click();
    await frame.getByText('Conference Room A', { exact: true }).waitFor({ state: 'hidden' });
    await example.selectOption('product');
    await frame.getByText('Sony Headphones', { exact: true }).waitFor();
    await example.selectOption('weather');
    await frame.getByText('Feels like 75°F', { exact: true }).waitFor();
    if (width > 600) {
      const phone = preview.getByRole('button', { name: '手机宽度', exact: true });
      await phone.click();
      assert.equal(await phone.getAttribute('aria-pressed'), 'true');
      assert.ok((await preview.locator('iframe').boundingBox()).width <= 390);
    }
    await page.getByRole('tab', { name: '源码', exact: true }).click();
    await page.locator('.component-source-file').first().waitFor();
    await page.getByRole('tab', { name: '接入', exact: true }).click();
    await page.locator('textarea[aria-label="接入说明"]').waitFor();
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    assert.deepEqual(errors, []);
    await page.close();
  }
  console.log(`${rows.length} indexed component records across ${groups.length} sources. Representative preview and source layouts passed at 390px and 1280px.`);
} finally {
  await browser.close();
}
