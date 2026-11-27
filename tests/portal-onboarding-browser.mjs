import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const base = process.env.SITE_URL || 'http://127.0.0.1:4173';
const output = 'test-results/portal-onboarding';
await mkdir(output, { recursive: true });
const browser = await chromium.launch(process.env.BROWSER_PATH
  ? { executablePath: process.env.BROWSER_PATH }
  : { channel: process.env.BROWSER_CHANNEL || 'chrome' });

try {
  for (const [prefix, lang] of [['', 'zh'], ['/en', 'en']]) {
    for (const width of [390, 1280]) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        reducedMotion: 'reduce',
        permissions: ['clipboard-read', 'clipboard-write'],
      });
      try {
        const page = await context.newPage();
        await page.goto(base + prefix + '/apps/portal/');
        const copy = page.locator('#copy-agent');
        const guide = `${prefix}/guide/`;
        assert.equal(await page.locator('.hero-actions a').getAttribute('href'), guide + '#setup');
        await page.locator('[data-agent="codex"][aria-pressed="true"]').waitFor();
        assert.ok(await copy.isVisible());
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
        await page.screenshot({ path: `${output}/${lang}-${width}.png` });

        // Inspect what the user actually pastes, not just the prompt generator.
        const agents = await page.locator('[data-agent]').evaluateAll(items => items.map(item => item.dataset.agent));
        assert.equal(agents.length, 6);
        for (const id of agents) {
          const option = page.locator(`[data-agent="${id}"]`);
          await option.click();
          assert.equal(await option.getAttribute('aria-pressed'), 'true');
          const expected = await copy.getAttribute('data-copy');
          await page.evaluate(() => navigator.clipboard.writeText('onboarding test sentinel'));
          await copy.click();
          await page.waitForFunction(text => navigator.clipboard.readText().then(value => value === text), expected);
          const copied = await page.evaluate(() => navigator.clipboard.readText());
          assert.equal(copied, await page.locator('#agent-prompt').evaluate(el => el.value));
          assert.ok(copied.includes('https://happyhands.cc' + guide + '#setup'));
          assert.ok(copied.includes('https://happyhands.cc' + guide + '#workbench'));
          assert.doesNotMatch(copied, /pnpm|git clone/);
          if (id === 'dsh') assert.ok(copied.includes(guide + '#dsh'));
        }
        const workbench = page.locator('.project-handoff-details');
        await workbench.locator('summary').press('Enter');
        const source = workbench.locator(`a[href="${guide}#workbench"]`);
        assert.ok(await source.isVisible());
        await source.click();
        await page.waitForURL('**' + guide + '#workbench');
        assert.match(await page.locator('#workbench').innerText(), /pnpm workbench/);
        assert.match(await page.locator('#setup').innerText(), /happyhands-lite-[^ ]+\.tgz/);
        console.log(`PASS ${lang} ${width}: all six clipboard values, Lite install and separate workbench guide`);
      } finally { await context.close(); }
    }
  }
} finally { await browser.close(); }
