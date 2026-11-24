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
  for (const width of [390, 710, 725, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 762 }, reducedMotion: 'reduce' });
    page.setDefaultTimeout(15000);
    await page.addInitScript(theme => {
      if (window === window.top) localStorage.setItem('hh-theme', theme);
    }, width === 710 ? 'dark' : 'light');
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base + '/components/?provider=design-md');
    const toolbar = page.locator('#catalog-main .resource-toolbar');
    const triggers = toolbar.locator('.archive-filter-trigger');
    await triggers.nth(2).waitFor();
    await page.locator('#catalog-main a.resource-card').first().waitFor();
    const measure = async locator => {
      const box = await locator.boundingBox();
      assert(box);
      return box;
    };
    const search = await measure(toolbar.locator('.resource-search'));
    const first = await measure(triggers.first());
    if (width <= 840) {
      assert(first.y >= search.y + search.height - 1, 'filters belong under the search field');
      assert(Math.abs(first.y - (await measure(triggers.nth(2))).y) < 1, 'the three short filters fit on one shared row');
    } else assert(Math.abs(first.y - search.y) < 8, 'desktop keeps filters alongside search');
    await page.screenshot({ path: `${out}/archive-${width}.png` });

    const type = triggers.nth(1);
    await type.focus();
    assert.equal(await type.evaluate(el => getComputedStyle(el).outlineOffset), '-2px');
    await type.press('Enter');
    const menu = page.locator('.archive-sdk-select:visible');
    const picked = menu.getByRole('option').last();
    const pickedText = await picked.locator('span').first().innerText();
    await picked.click();
    await type.press('Enter');
    const selected = menu.getByRole('option', { selected: true });
    await selected.getByText(pickedText, { exact: true }).waitFor();
    const list = await measure(menu.getByRole('listbox'));
    const selectedBox = await measure(selected);
    const tick = await measure(selected.locator('.archive-filter-check'));
    assert(selectedBox.y >= list.y && selectedBox.y + selectedBox.height <= list.y + list.height + 1);
    assert(tick.x >= list.x && tick.x + tick.width <= list.x + list.width);
    assert(tick.y >= selectedBox.y && tick.y + tick.height <= selectedBox.y + selectedBox.height);
    await page.screenshot({ path: `${out}/selected-${width}.png` });
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => document.activeElement?.matches('.archive-filter-trigger'));

    await page.goto(base + '/components/?provider=cult-ui&collection=beautiful-ui');
    const searchInput = page.locator('.psearch__input');
    await searchInput.waitFor();
    await page.locator('#catalog-main a.resource-card').first().waitFor();
    for (const expanded of [false, true]) {
      if (expanded) await searchInput.focus();
      await page.evaluate(() => {
        const bar = document.querySelector('.psearch__bar').getBoundingClientRect();
        const logo = document.querySelector('.hh-site-header a').getBoundingClientRect();
        window.scrollBy(0, bar.top + bar.height / 2 - logo.top - logo.height / 2);
      });
      const layers = await page.evaluate(() => {
        const header = document.querySelector('.hh-site-header');
        const logo = header.querySelector('a').getBoundingClientRect();
        const x = logo.left + logo.width / 2;
        const y = logo.top + logo.height / 2;
        const bar = document.querySelector('.psearch__bar').getBoundingClientRect();
        return { overlaps: bar.left <= x && x <= bar.right && bar.top <= y && y <= bar.bottom,
          logoReceivesPointer: Boolean(document.elementFromPoint(x, y)?.closest('.hh-site-header a')) };
      });
      assert.ok(layers.overlaps, 'reproduce the bar crossing the fixed header while scrolling');
      assert.ok(layers.logoReceivesPointer, 'search stays below the header in both states');
      if (width === 725) await page.screenshot({ path: `${out}/search-header-${expanded ? 'open' : 'closed'}-725.png` });
    }

    await page.goto(base + '/components/?provider=systems');
    await page.locator('#catalog-main .resource-card').first().waitFor();
    assert.equal(await page.locator('#catalog-main a[href*="system=happyhands"]').count(), 0);

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
  const portal = await browser.newPage({ viewport: { width: 854, height: 762 }, reducedMotion: 'reduce' });
  await portal.goto(base + '/apps/portal/');
  await portal.locator('#feed-tab-systems').click();
  const grid = portal.locator('#feed-panel-systems .archive-grid');
  await grid.waitFor();
  assert.equal(await portal.locator('#feed-panel-systems .directory-pagination').count(), 0);
  const measured = await portal.evaluate(() => {
    const rect = selector => document.querySelector(selector).getBoundingClientRect();
    return {
      blankRow: Boolean(document.querySelector('.back-to-top-row')),
      afterContent: rect('#main').bottom - rect('#portal-content').bottom,
      beforeFooter: rect('.portal-footer').top - rect('#main').bottom,
      afterGrid: rect('.portal-footer').top - rect('#feed-panel-systems .archive-grid').bottom,
    };
  });
  assert.equal(measured.blankRow, false);
  assert(measured.afterContent <= 1 && measured.beforeFooter <= 1);
  assert(measured.afterGrid >= 16 && measured.afterGrid <= 32);
  await grid.locator('.resource-card').last().scrollIntoViewIfNeeded();
  await portal.screenshot({ path: `${out}/portal-footer-spacing-854.png` });
  await portal.getByRole('button', { name: '返回顶部' }).click();
  await portal.waitForFunction(() => window.scrollY === 0 && document.activeElement?.matches('.site-header .wordmark'));
  await portal.close();
  console.log('PASS: homepage footer spacing and back-to-top focus');

  const system = await browser.newPage({ viewport: { width: 849, height: 762 }, reducedMotion: 'reduce' });
  for (const prefix of ['', '/en']) {
    for (const path of ['/systems/happyhands/', '/components/?provider=systems&system=happyhands#system-components']) {
      await system.goto(base + prefix + path);
      await system.waitForURL(url => url.pathname === prefix + '/components/' && url.search === '?provider=systems' && !url.hash);
      await system.locator('#catalog-main .resource-card').first().waitFor();
      assert.equal(await system.locator('#catalog-main a[href*="system=happyhands"]').count(), 0);
    }
  }
  await system.close();
  console.log('PASS: archived design system links lead to the matching catalog language');

  const motion = await browser.newPage({ viewport: { width: 390, height: 762 }, reducedMotion: 'reduce' });
  await motion.goto(base + '/en/components/?provider=cult-ui&collection=motion-primitives');
  const item = motion.locator('a.resource-card[href*="component%3Amotion-primitives%2Faccordion"]');
  await item.click();
  const frame = motion.frameLocator('.directory-live-preview');
  const trigger = frame.getByRole('button', { name: 'Review scope' });
  await trigger.focus();
  await trigger.press('Enter');
  assert.equal(await trigger.getAttribute('aria-expanded'), 'true');
  await frame.getByText('Choose the pages and interactions to inspect.', { exact: true }).waitFor();
  await motion.getByRole('tab', { name: 'Integration', exact: true }).click();
  await motion.locator('.collections-install pre').getByText(/npx shadcn@latest add.*accordion.json/).waitFor();
  await motion.goto(base + '/en/components/?provider=design-md&design=designmd-library-swiss-design');
  await motion.getByRole('button', { name: 'Use in shadcn/ui' }).click();
  const guide = motion.locator('.resource-shadcn-guide');
  await guide.getByText('npx shadcn@latest add button card', { exact: true }).waitFor();
  await guide.getByText(/--primary: #e2001a/).waitFor();
  await motion.close();
  console.log('PASS: actual Motion Primitives interaction, shadcn registry install and Design.md mapping');
} finally {
  await browser.close();
}
