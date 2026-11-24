import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const base = process.env.SITE_URL || 'http://127.0.0.1:4173';
const out = 'test-results/design-md-publish';
await mkdir(out, { recursive: true });
const browser = await chromium.launch(process.env.BROWSER_PATH
  ? { executablePath: process.env.BROWSER_PATH }
  : { channel: process.env.BROWSER_CHANNEL || 'chrome' });
const designQuery = '?provider=design-md&design=mercury-3172cd4d';

try {
  for (const [prefix, lang] of [['', 'zh'], ['/en', 'en']]) {
    const zh = lang === 'zh';
    for (const width of [1280, 390]) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        reducedMotion: 'reduce',
      });
      await context.addInitScript(value => {
        if (window !== top) return;
        localStorage.setItem('hh-theme', value === 'en' ? 'dark' : 'light');
        localStorage.setItem('pd-lang', value);
      }, lang);
      const page = await context.newPage();
      page.setDefaultTimeout(15000);
      const errors = [];
      page.on('pageerror', error => { console.error(error.stack); errors.push(error.message); });

      const publicDirectoryPaths = ['/resources/v1/index.json', '/resources/v1/covers.json'];
      const directoryRequests = [];
      page.on('request', request => {
        const path = new URL(request.url()).pathname;
        if (publicDirectoryPaths.includes(path)) directoryRequests.push(path);
      });
      assert.equal((await page.goto(base + prefix + '/apps/portal/')).status(), 200);
      const feed = page.locator('#design-resources');
      const homeArchive = feed.getByRole('tab', { name: 'Design.md', exact: true });
      await feed.locator('#feed-panel-design-md a.resource-card').first().waitFor();
      assert.equal(await homeArchive.getAttribute('aria-selected'), 'true');
      const archiveRequestCount = directoryRequests.length;
      await homeArchive.focus();
      await page.keyboard.press('ArrowRight');
      const homeSystems = feed.getByRole('tab', { name: zh ? '设计系统' : 'Design systems', exact: true });
      await feed.locator('#feed-tab-systems[aria-selected="true"]').waitFor();
      assert.equal(await homeSystems.getAttribute('aria-selected'), 'true');
      await feed.locator('#feed-panel-systems a.resource-card').first().waitFor();
      await homeSystems.focus();
      await page.keyboard.press('ArrowRight');
      const homeComponents = feed.getByRole('tab', { name: zh ? '组件库' : 'Components', exact: true });
      await feed.locator('#feed-panel-cult-ui a.resource-card').first().waitFor();
      assert.equal(await homeComponents.getAttribute('aria-selected'), 'true');
      assert.deepEqual(directoryRequests.slice(archiveRequestCount).sort(), [...publicDirectoryPaths].sort(),
        'Systems and Components reuse one index and covers pair after the archive is loaded');
      await homeComponents.focus();
      await page.keyboard.press('ArrowLeft');
      await feed.locator('#feed-tab-systems[aria-selected="true"]').waitFor();
      await homeSystems.focus();
      await page.keyboard.press('ArrowLeft');
      await feed.locator('#feed-tab-design-md[aria-selected="true"]').waitFor();
      assert.equal(await homeArchive.getAttribute('aria-selected'), 'true');

      assert.equal((await page.goto(base + prefix + '/components/?provider=design-md')).status(), 200);
      const catalog = page.locator('#catalog-main');
      await catalog.locator('a.resource-card').first().waitFor();
      await page.locator('a[aria-current="page"][href$="?provider=design-md"]').waitFor();
      const search = catalog.getByRole('searchbox', { name: zh ? '搜索资源' : 'Search resources' });
      await search.fill('Mercury');
      const mercury = catalog.locator('a.resource-card[href*="design=mercury-3172cd4d"]');
      await mercury.waitFor();
      await page.keyboard.press('ArrowDown');
      await catalog.locator('.psearch__row-link:focus').waitFor();
      await page.keyboard.press('Escape');
      await catalog.locator('input[aria-expanded="false"]:focus').waitFor();

      const typeButton = catalog.getByRole('combobox', { name: zh ? /^类型:/ : /^Type:/ });
      await typeButton.focus();
      await page.keyboard.press('Enter');
      const filterSearch = page.getByLabel(zh ? '搜索类型' : 'Search type', { exact: true });
      await filterSearch.waitFor();
      await filterSearch.fill(zh ? '金融' : 'Finance');
      await page.getByRole('option', { name: zh ? '金融' : 'Finance', exact: true }).waitFor();
      await page.screenshot({ path: `${out}/filter-${lang}-${width}.png` });
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.waitForFunction(needle =>
        [...document.querySelectorAll('.archive-filter-trigger')].some(el => el.getAttribute('aria-label')?.includes(needle) && el.getAttribute('aria-expanded') === 'false'),
      zh ? '类型: 金融' : 'Type: Finance');
      await mercury.waitFor();
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      await page.screenshot({ path: `${out}/catalog-${lang}-${width}.png` });

      await mercury.click();
      await page.waitForURL(url => url.search.includes('design=mercury-3172cd4d'));
      await page.locator('.resource-detail-header').getByRole('heading', { name: 'Mercury' }).waitFor();
      await page.locator('.resource-detail-preview .reference-specimen').waitFor();
      const mercuryButton = page.locator('[data-component-family="button"]').first();
      const save = zh ? '保存' : 'Save';
      const saved = zh ? '已保存' : 'Saved';
      await mercuryButton.getByRole('button', { name: save, exact: true }).first().waitFor();
      assert.equal(await mercuryButton.getByRole('button', { name: save, exact: true }).nth(1).isDisabled(), true);
      assert.equal(await mercuryButton.locator('.design-sample-action').first().evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(82, 102, 235)');
      await mercuryButton.getByRole('button', { name: save, exact: true }).first().press('Space');
      await mercuryButton.getByRole('button', { name: saved, exact: true }).waitFor();
      await mercuryButton.screenshot({ path: `${out}/mercury-specimen-${lang}-${width}.png` });
      await page.getByRole('tab', { name: zh ? '资料与下载' : 'Files and downloads', exact: true }).click();
      const download = page.getByRole('link', { name: zh ? '下载' : 'Download', exact: true });
      const rawUrl = await download.getAttribute('href');
      assert.equal(rawUrl, '/design-archive/mercury-3172cd4d/design.md');
      const raw = await context.request.get(base + rawUrl);
      assert.equal(raw.status(), 200);
      assert.match(await raw.text(), /Mercury/i);
      const formats = page.locator('.resource-export-tabs');
      await formats.getByRole('tab', { name: 'Design.md', exact: true }).focus();
      await page.keyboard.press('End');
      await page.keyboard.press('Enter');
      await formats.getByRole('tab', { name: 'Compact', exact: true, selected: true }).waitFor();
      await page.locator('.resource-export pre[aria-busy="false"]').waitFor();
      assert.equal(await page.getByRole('link', { name: zh ? '下载' : 'Download', exact: true }).getAttribute('href'), '/design-archive/mercury-3172cd4d/compact/design.md');

      await page.goto(base + prefix + '/components/?provider=design-md&design=designmd-library-swiss-design');
      const swissButton = page.locator('[data-component-family="button"]').first();
      await swissButton.waitFor();
      assert.equal(await swissButton.locator('.design-sample-action').first().evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(226, 0, 26)');
      await page.locator('.design-document-body').getByRole('heading').first().waitFor();
      await page.locator('.design-document').getByRole('button', { name: zh ? '原始结构化参数' : 'Original structured parameters' }).click();
      await page.locator('.design-document pre').filter({ hasText: 'button-primary' }).waitFor();
      await swissButton.screenshot({ path: `${out}/swiss-specimen-${lang}-${width}.png` });

      await page.goto(base + prefix + '/components/?provider=design-md&design=designmd-brands-99');
      const select = page.locator('[data-component-family="select"]').getByRole('combobox').first();
      await select.press('Enter');
      const option = page.getByRole('option', { name: zh ? '进行中' : 'In progress', exact: true });
      await option.waitFor();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.waitForFunction(label => [...document.querySelectorAll('.design-sample-select-trigger')].some(el =>
        el.getAttribute('aria-expanded') === 'false' && el.textContent.includes(label)), zh ? '进行中' : 'In progress');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      assert.deepEqual(errors, []);
      await context.close();
      console.log(`PASS ${lang} ${width}: homepage, catalog, keyboard filter, two archive formats, shared specimens and original file`);
    }
    const noScript = await browser.newContext({ javaScriptEnabled: false });
    const page = await noScript.newPage();
    assert.equal((await page.goto(base + prefix + '/components/' + designQuery)).status(), 200);
    assert.equal(await page.locator('main h1').innerText(), 'Mercury');
    assert.equal((await page.goto(base + prefix + '/components/?provider=design-md&design=not-a-real-record')).status(), 404);
    await noScript.close();
  }

  const visualCases = [
    ['aaply-357e6fee', ['media', 'avatar', 'brand']],
    ['a24-6afa22a6', ['icon']],
    ['axiom-c809190a', ['diagram']],
    ['beautifultm-8e1c35bf', ['shape']],
  ];
  for (const width of [390, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const [slug, families] of visualCases) {
      await page.goto(base + '/en/components/?provider=design-md&design=' + slug);
      if (slug === 'aaply-357e6fee') {
        const canvas = page.locator('[data-component-family="section"]').first();
        await canvas.waitFor();
        assert.equal(await canvas.evaluate(el => getComputedStyle(el.querySelector('p')).color), await canvas.evaluate(el => getComputedStyle(el).color));
      }
      for (const family of families) {
        const sample = page.locator(`[data-component-family="${family}"]`).first();
        await sample.getByText('Illustrative specimen', { exact: true }).waitFor();
        assert.equal(await sample.getByRole('link', { name: 'View page reference' }).getAttribute('href'), '#reference-original');
        await sample.scrollIntoViewIfNeeded();
        await page.screenshot({ path: `${out}/visual-${family}-${width}.png` });
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    }
    assert.deepEqual(errors, []);
    await page.close();
  }
  console.log('PASS: six shared asset-dependent specimen families on desktop and phone');

  const detail = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  detail.on('pageerror', error => { console.error(error.stack); errors.push(error.message); });
  await detail.goto(base + '/en/components/?provider=design-md&design=tailwind-css-8f79ab5b');
  const original = detail.locator('iframe[data-kind="source"]').first();
  await original.scrollIntoViewIfNeeded();
  assert.equal(await original.getAttribute('sandbox'), '');
  await detail.frameLocator('iframe[data-kind="source"]').first().locator('body[inert]').waitFor();
  assert.equal(await original.locator('xpath=..').locator('.design-sample-surface').count(), 0);

  await detail.goto(base + '/en/components/?provider=cult-ui&component=halo-input');
  await detail.frameLocator('iframe').getByPlaceholder('Display name').fill('HappyHands');
  await detail.getByRole('tab', { name: 'Source', exact: true }).click();
  await detail.locator('.component-source-file pre').filter({ hasText: 'HaloInput' }).first().waitFor();
  await detail.getByRole('tab', { name: 'Integration', exact: true }).click();
  assert.match(await detail.locator('#catalog-main textarea').inputValue(), /Halo|halo-input/);
  await detail.getByRole('tab', { name: 'Preview', exact: true }).click();
  const displayName = detail.frameLocator('iframe').getByPlaceholder('Display name');
  await displayName.fill('HappyHands');
  const resetPreview = detail.locator('#catalog-main iframe').evaluate(frame =>
    new Promise(resolve => frame.addEventListener('load', () => resolve(true), { once: true })),
  );
  await detail.getByRole('button', { name: 'Reset', exact: true }).click();
  await resetPreview;
  assert.equal(await displayName.inputValue(), '');

  await detail.goto(base + '/en/components/?provider=cult-ui&resource=component%3Apin-ui%2Fliquid-tabs');
  await detail.locator('.directory-inline-preview').getByRole('tab').first().waitFor();
  await detail.getByRole('tab', { name: 'Integration', exact: true }).click();
  assert.match(await detail.locator('.collections-install pre').innerText(), /pinui.xyz\/r\/liquid-tabs.json/);
  await detail.getByRole('tab', { name: 'Source', exact: true }).click();
  await detail.getByRole('link', { name: 'Download original', exact: true }).waitFor();
  assert.deepEqual(errors, []);
  await detail.close();
  console.log('PASS: original archive HTML, Cult UI preview and source, and PinUI preview and install');

  const recovery = await browser.newPage({ viewport: { width: 390, height: 900 } });
  await recovery.route('**/design-archive/index.json', route => route.fulfill({ status: 503 }));
  await recovery.goto(base + '/en/components/?provider=collections&collection=design-archive');
  const failure = recovery.getByRole('alert').filter({ hasText: 'Could not load resources' });
  await failure.waitFor();
  const field = recovery.getByRole('searchbox', { name: 'Search resources' });
  await field.fill('Mercury');
  await field.press('Escape');
  await recovery.unroute('**/design-archive/index.json');
  await failure.getByRole('button', { name: 'Retry' }).click();
  await recovery.locator('#catalog-main a.resource-card[href*="design=mercury-3172cd4d"]').waitFor();
  assert.equal(await field.inputValue(), 'Mercury');
  await recovery.close();
  console.log('PASS old collection link and recovery with a preserved query');
} finally {
  await browser.close();
}
