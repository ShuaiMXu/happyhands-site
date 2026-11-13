import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Run against a local or authorized preview. No authentication/sandbox bypasses.
const base = process.env.SITE_URL || 'http://127.0.0.1:4251';
const output = resolve(process.env.ARTIFACT_DIR || 'test-results/wiki');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome' });
const checks = [];
const screenshots = [];
const routes = ['/guide/', '/en/guide/', '/ai-ui-review/', '/en/ai-ui-review/', '/ai-website-design/', '/en/ai-website-design/', '/nonprofit-website-design/', '/en/nonprofit-website-design/'];
const name = route => route.split('/').filter(Boolean).join('-');
async function capture(page, route, state, fullPage = false) {
  const path = resolve(output, `${name(route)}-${state}.png`);
  await page.screenshot({ path, fullPage });
  screenshots.push({ route, state, path });
}
async function ready(page, route) {
  await page.goto(new URL(route, base).href, { waitUntil: 'networkidle' });
  await page.locator('header[data-menu-ready]').waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => document.querySelector('.wiki-header-slot')?.style.height);
}
async function noOverflow(page, label) {
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `${label}: horizontal overflow`);
}
async function verifyFooter(page, route) {
  const footer = page.locator('.guide-footer');
  const layout = await footer.evaluate(el => {
    const grid = el.querySelector('.wiki-footer-grid').getBoundingClientRect();
    return {
      height: el.getBoundingClientRect().height,
      inset: grid.left,
      viewport: innerWidth,
      links: [...el.querySelectorAll('a')].map(a => a.getBoundingClientRect().height),
    };
  });
  assert.ok(layout.height < 460, `${route}: footer must stay compact`);
  assert.ok(layout.links.every(height => height >= 44), `${route}: footer touch targets`);
  const inset = layout.viewport < 600 ? 20 : layout.viewport <= 1100 ? 24 : Math.max(32, (layout.viewport - 1168) / 2);
  assert.ok(Math.abs(layout.inset - inset) < 1, `${route}: footer follows page grid`);
  const prefix = route.startsWith('/en/') ? '/en' : '';
  for (const provider of ['design-md', 'systems', 'cult-ui']) {
    assert.equal(await footer.locator(`a[href="${prefix}/components/?provider=${provider}"]`).count(), 1);
  }
}
async function verifyOutline(page) {
  await page.waitForFunction(() => {
    const links = [...document.querySelectorAll('.wiki-outline a[href^="#"]')];
    const items = links.map(link => {
      const section = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      return { link, heading: section?.querySelector('h2,h3') || section };
    }).filter(item => item.heading);
    let current = items[0];
    for (const item of items) if (item.heading.getBoundingClientRect().top <= innerHeight * 0.2) current = item;
    return current && current.link.getAttribute('aria-current') === 'location'
      && document.querySelector('.wiki-current-section')?.textContent === current.link.textContent;
  });
  assert.equal(await page.locator('.wiki-outline [aria-current="location"]').count(), 1);
}
async function settleScroll(page, y) {
  await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y);
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}

try {
  for (const route of routes) {
    const plain = await browser.newContext({ javaScriptEnabled:false, viewport:{width:390,height:844} });
    const plainPage = await plain.newPage();
    await plainPage.goto(new URL(route,base).href);
    assert.equal(await plainPage.locator('.wiki-pages').isVisible(),true);
    assert.equal(await plainPage.locator('.wiki-outline').isVisible(),true);
    assert.equal(await plainPage.locator('.wiki-mobile-bar').isVisible(),false);
    assert.equal(await plainPage.locator('h1').count(),1);
    await noOverflow(plainPage,`${route} without JavaScript`);
    await plain.close();
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: 'light' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await ready(page, route);
    await settleScroll(page, 0);
    assert.equal(await page.locator('.hh-site-header').evaluate(el => getComputedStyle(el).position), 'relative');
    assert.equal(await page.locator('.hh-site-header').evaluate(el => el.classList.contains('is-floating')), false);
    await noOverflow(page, route);
    const alignment = await page.evaluate(() => ({
      hero: document.querySelector('.guide-heading').getBoundingClientRect().left,
      article: document.querySelector('.guide-body').getBoundingClientRect().left,
    }));
    assert.ok(Math.abs(alignment.hero - alignment.article) <= 2, `${route}: hero/article left edges diverge`);
    assert.equal(await page.locator('.guide-footer nav').count(), 2, `${route}: guide and resource navigation groups`);
    assert.equal(await page.locator('.wiki-help a[href="https://github.com/ShuaiMXu/happyhands/issues"]').count(), 1, `${route}: help retained above footer`);
    await capture(page, route, 'desktop-top');

    // The transition must not remove the header's flow box and move its own threshold.
    const threshold = await page.locator('.guide-heading').evaluate(el => el.getBoundingClientRect().bottom + scrollY);
    const slotHeight = await page.locator('.wiki-header-slot').evaluate(el => el.getBoundingClientRect().height);
    await settleScroll(page, threshold + 2);
    await page.waitForFunction(() => document.querySelector('.hh-site-header')?.classList.contains('is-floating'));
    assert.ok(Math.abs(await page.locator('.wiki-header-slot').evaluate(el => el.getBoundingClientRect().height) - slotHeight) <= 1, 'header slot changes at float threshold');
    assert.ok(Math.abs(await page.locator('.guide-heading').evaluate(el => el.getBoundingClientRect().bottom + scrollY) - threshold) <= 1, 'hero threshold oscillates');
    await page.waitForFunction(() => !document.querySelector('.hh-site-header')?.classList.contains('is-entering'));

    const middle = await page.evaluate(() => Math.max(scrollY, (document.documentElement.scrollHeight - innerHeight) * 0.45));
    await settleScroll(page, middle);
    await verifyOutline(page);
    const sticky = await page.locator('.wiki-pages').evaluate(el => {
      const style = getComputedStyle(el);
      const bounds = el.getBoundingClientRect();
      const container = el.closest('.wiki-columns').getBoundingClientRect();
      return { position: style.position, top: bounds.top, expected: parseFloat(style.top), canStick: container.top < parseFloat(style.top) && container.bottom > parseFloat(style.top) + bounds.height };
    });
    assert.equal(sticky.position, 'sticky');
    if (sticky.canStick) assert.ok(Math.abs(sticky.top - sticky.expected) <= 2, 'page sidebar is not sticky');
    await capture(page, route, 'desktop-middle');
    await settleScroll(page, await page.evaluate(() => document.documentElement.scrollHeight));
    await verifyOutline(page);
    await page.locator('.guide-footer').waitFor();
    await verifyFooter(page, route);
    await capture(page, route, 'desktop-end');
    await capture(page, route, 'desktop-full', true);

    // Small real page lists must not manufacture overflow indicators.
    const edges = await page.locator('.wiki-pages').evaluate(el => {
      const list = el.querySelector('.wiki-page-scroll');
      return { above: el.dataset.moreAbove, below: el.dataset.moreBelow, fits: list.scrollHeight <= list.clientHeight + 1 };
    });
    if (edges.fits) assert.deepEqual([edges.above, edges.below], ['false', 'false']);

    await page.setViewportSize({ width: 390, height: 844 });
    await settleScroll(page, 0);
    await page.waitForFunction(() => !document.querySelector('.hh-site-header')?.classList.contains('is-floating'));
    await noOverflow(page, `${route} phone`);
    assert.equal(await page.locator('.wiki-pages').isVisible(), false);
    assert.equal(await page.locator('.wiki-outline').isVisible(), false);
    assert.equal(await page.locator('.wiki-mobile-bar').isVisible(), true);
    await capture(page, route, 'phone');
    await capture(page, route, 'phone-full', true);

    const pagesTrigger = page.locator('[data-wiki-open="wiki-pages-dialog"]');
    const outlineTrigger = page.locator('[data-wiki-open="wiki-outline-dialog"]');
    const pageDialog = page.locator('#wiki-pages-dialog');
    const outlineDialog = page.locator('#wiki-outline-dialog');
    // Native showModal alone does not lock page scrolling, especially on Safari.
    for (const [trigger, dialogId] of [[pagesTrigger, 'wiki-pages-dialog'], [outlineTrigger, 'wiki-outline-dialog']]) {
      await settleScroll(page, 900);
      const before = await page.evaluate(() => ({ x: scrollX, y: scrollY, heroTop: document.querySelector('.guide-heading').getBoundingClientRect().top }));
      await trigger.click();
      assert.equal(await page.evaluate(() => getComputedStyle(document.body).position), 'fixed');
      const locked = await page.evaluate(() => ({ x: scrollX, y: scrollY }));
      await page.mouse.move(1, 1);
      await page.mouse.wheel(0, 440);
      await page.waitForTimeout(250); // Allow the asynchronous wheel/scroll pipeline to settle.
      const afterWheel = await page.evaluate(() => ({ x: scrollX, y: scrollY, heroTop: document.querySelector('.guide-heading').getBoundingClientRect().top }));
      assert.deepEqual({ x: afterWheel.x, y: afterWheel.y }, locked, `${dialogId}: background wheel moved document`);
      assert.ok(Math.abs(afterWheel.heroTop - before.heroTop) <= 1, `${dialogId}: background visibly moved`);
      await page.keyboard.press('Escape');
      await page.waitForFunction(id => !document.getElementById(id).open, dialogId);
      assert.deepEqual(await page.evaluate(() => ({ x: scrollX, y: scrollY })), { x: before.x, y: before.y }, `${dialogId}: close did not restore scroll`);
      assert.notEqual(await page.evaluate(() => getComputedStyle(document.body).position), 'fixed');
    }
    await pagesTrigger.click();
    await page.setViewportSize({ width: 392, height: 844 });
    await page.waitForFunction(() => !document.querySelector('#wiki-pages-dialog').open);
    assert.notEqual(await page.evaluate(() => getComputedStyle(document.body).position), 'fixed');
    await page.setViewportSize({ width: 390, height: 844 });
    await pagesTrigger.click();
    assert.equal(await pageDialog.evaluate(el => el.open && el.matches(':modal')), true);
    assert.equal(await pageDialog.locator('[aria-current="page"]').count(), 1);
    assert.match(await pageDialog.evaluate(el => getComputedStyle(el, '::backdrop').backgroundColor), /rgba\(0, 0, 0, 0\)|transparent/);
    await page.keyboard.press('Tab');
    assert.equal(await pageDialog.evaluate(el => el.contains(document.activeElement)), true);
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('#wiki-pages-dialog').open);
    await page.waitForFunction(() => document.activeElement?.getAttribute('data-wiki-open') === 'wiki-pages-dialog');

    await outlineTrigger.click();
    assert.equal(await outlineDialog.evaluate(el => el.open && el.matches(':modal')), true);
    const rect = await outlineDialog.boundingBox();
    assert.ok(rect && rect.y > 2, 'bottom sheet should leave an outside area');
    await page.mouse.click(1, 1);
    await page.waitForFunction(() => !document.querySelector('#wiki-outline-dialog').open);
    await outlineTrigger.click();
    const entry = outlineDialog.locator('a[href^="#"]').nth(1);
    const hash = await entry.getAttribute('href');
    await entry.click();
    await page.waitForFunction(hash => location.hash === hash && !document.querySelector('#wiki-outline-dialog').open, hash);
    await page.waitForFunction(hash => {
      const target = document.getElementById(hash.slice(1));
      const heading = target?.querySelector('h2,h3') || target;
      const top = heading?.getBoundingClientRect().top;
      return top >= 0 && top < innerHeight * 0.4 && getComputedStyle(document.body).position !== 'fixed';
    }, hash);
    await verifyOutline(page);
    await noOverflow(page, `${route} phone after anchor`);

    await page.emulateMedia({ reducedMotion: 'reduce' });
    const phoneThreshold = await page.locator('.guide-heading').evaluate(el => el.getBoundingClientRect().bottom + scrollY);
    await settleScroll(page, phoneThreshold + 5);
    await page.waitForFunction(() => document.querySelector('.hh-site-header')?.classList.contains('is-floating'));
    assert.equal(await page.locator('.hh-site-header').evaluate(el => getComputedStyle(el).animationName), 'none');
    await settleScroll(page, 0);
    await page.waitForFunction(() => !document.querySelector('.hh-site-header')?.classList.contains('is-floating'));
    await page.locator('#theme-toggle').click();
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
    await noOverflow(page, `${route} dark phone`);
    await verifyFooter(page, route);
    await capture(page, route, 'phone-dark');
    assert.deepEqual(errors, [], `${route}: browser errors`);
    checks.push({ route, desktop: true, phone: true, headerThreshold: true, outline: true, dialogs: true, reducedMotion: true, dark: true, errors });
    await context.close();
  }
  // The tablet uses the existing page/outline drawers, freeing the duplicate rail's width.
  const tablet = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const page = await tablet.newPage();
  for (const route of routes) {
    await ready(page, route);
    assert.equal(await page.locator('.wiki-pages').isVisible(), false);
    assert.equal(await page.locator('.wiki-outline').isVisible(), false);
    assert.equal(await page.locator('.wiki-mobile-bar').isVisible(), true);
    const geometry = await page.evaluate(() => {
      const rect = selector => document.querySelector(selector).getBoundingClientRect();
      const article = rect('.guide-body');
      return { width: article.width, left: article.left, heading: rect('.guide-heading').left, end: rect('.wiki-article-end').left };
    });
    assert.ok(Math.abs(geometry.width - 672) <= 1, `${route}: tablet reading width`);
    assert.ok(Math.abs(geometry.left - geometry.heading) <= 1 && Math.abs(geometry.left - geometry.end) <= 1, `${route}: tablet reading edges`);
    await page.locator('[data-wiki-open="wiki-pages-dialog"]').click();
    assert.equal(await page.locator('#wiki-pages-dialog [aria-current="page"]').count(), 1);
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('#wiki-pages-dialog').evaluate(el => el.contains(document.activeElement)), true);
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('#wiki-pages-dialog').open && document.activeElement?.getAttribute('data-wiki-open') === 'wiki-pages-dialog');
    await noOverflow(page, `${route} tablet`);
    await capture(page, route, 'tablet');
  }
  await tablet.close();
  const plainTablet = await browser.newContext({ javaScriptEnabled:false, viewport:{width:768,height:1024} });
  const plainTabletPage = await plainTablet.newPage();
  for (const route of routes) {
    await plainTabletPage.goto(new URL(route, base).href);
    assert.equal(await plainTabletPage.locator('.wiki-pages').isVisible(), true);
    assert.equal(await plainTabletPage.locator('.wiki-outline').isVisible(), true);
    assert.equal(await plainTabletPage.locator('.wiki-mobile-bar').isVisible(), false);
    await noOverflow(plainTabletPage, `${route} tablet without JavaScript`);
  }
  await plainTablet.close();
  await writeFile(resolve(output, 'report.json'), JSON.stringify({ base, checks, screenshots, status: 'passed' }, null, 2));
  console.log(JSON.stringify({ status: 'passed', pages: checks.length, output, screenshots: screenshots.length }, null, 2));
} catch (error) {
  await writeFile(resolve(output, 'report.json'), JSON.stringify({ base, checks, screenshots, status: 'failed', error: String(error) }, null, 2));
  throw error;
} finally {
  await browser.close();
}
