import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { portalFooter } from '../apps/portal/render-footer.js';
import { renderPortalHtml } from '../apps/portal/render-content.js';
import { repositories } from '../apps/portal/content.js';

test('both homepages render one footer guide group and no duplicate guide section', async () => {
  for (const lang of ['zh', 'en']) {
    const prefix = lang === 'en' ? '/en' : '';
    const source = await readFile(`${prefix ? 'en/' : ''}apps/portal/index.html`, 'utf8');
    const html = renderPortalHtml(source, lang);
    const footer = portalFooter(lang);
    assert.ok(html.includes(`<footer class="site-footer portal-footer">${footer}</footer>`));
    assert.equal((html.match(/<footer\b/g) || []).length, 1);
    assert.equal((html.match(/<main\b/g) || []).length, 1);
    assert.doesNotMatch(html, /workflow-links|workflow-heading/, 'Homepage must not repeat the guide block');
    assert.doesNotMatch(footer, /class="wordmark"|<button|<form|onclick|intent\/follow|messages\/compose/);
    assert.equal((footer.match(/class="sy__guide"/g) || []).length, 1, 'Exactly one footer link group');
    assert.equal((footer.match(/<nav\b/g) || []).length, 1);
    assert.equal(footer.split('/brand/happyhands-logo-cream.png').length - 1, 1, 'one compact wordmark');
    for (const target of ['/guide/', '/ai-website-design/', '/ai-ui-review/', '/ai-ui-review/#ai-slop', '/nonprofit-website-design/'])
      assert.equal(footer.split(`href="${prefix}${target}"`).length - 1, 1, `${target} appears once`);
    assert.equal(footer.split('href="/apps/setup/"').length - 1, 1, 'one setup link');
    assert.equal(footer.split(`href="${repositories.core}"`).length - 1, 1);
    for (const href of ['https://icons.kubai.design/', 'https://collectui.com/', '/llms.txt'])
      assert.equal(footer.split(`href="${href}"`).length - 1, 1, href);
    assert.equal(footer.split('href="https://x.com/ShuaiXU13"').length - 1, 1);
    for (const label of lang === 'en' ? ['Guides', 'Getting started', 'Design workflow', 'Setup details'] : ['使用指南', '快速开始', '设计工作流', '接入详情'])
      assert.ok(footer.includes(label), label);
  }
});
