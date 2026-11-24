import assert from 'node:assert/strict';
import { mkdir, readFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const base = process.env.SITE_URL || 'http://127.0.0.1:4173';
const manifest = JSON.parse(await readFile('components/beautiful-preview/catalog.json', 'utf8'));
const out = process.env.BEAUTIFUL_UI_COVERS_DIR;
if (out) await mkdir(out, { recursive: true });
const browser = await chromium.launch(process.env.BROWSER_PATH
  ? { executablePath: process.env.BROWSER_PATH } : { channel: 'chrome', args: ['--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader'] });
try {
  const page = await browser.newPage({ viewport: { width: 720, height: 450 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const failures = [];
  for (const name of Object.keys(manifest)) {
    try {
      errors.length = 0;
      await page.goto(base + '/components/beautiful-preview/?lang=en&component=' + name);
      const specimen = page.locator('[data-preview-specimen="' + name + '"]');
      await specimen.waitFor({ timeout: 7000 });
      await specimen.locator(':scope > *').first().waitFor({ timeout: 4000 });
      await page.evaluate(() => document.fonts.ready);
      assert.deepEqual(errors, []);
      if (out) await page.screenshot({ path: out + '/' + name + '.png', animations: 'disabled' });
      console.log('PASS ' + name);
    } catch (error) {
      failures.push({ name, errors: [...errors], failure: error.message.split('\n')[0] });
    }
  }
  assert.deepEqual(failures, []);
} finally {
  await browser.close();
}
