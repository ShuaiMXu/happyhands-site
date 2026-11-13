import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { portalFooter } from '../apps/portal/render-footer.js';
import { renderPortalHtml } from '../apps/portal/render-content.js';
import { repositories } from '../apps/portal/content.js';

test('both production homepages use the same complete localized footer as runtime', async () => {
  for (const lang of ['zh', 'en']) {
    const prefix = lang === 'en' ? '/en' : '';
    const source = await readFile(`${prefix ? 'en/' : ''}apps/portal/index.html`, 'utf8');
    const html = renderPortalHtml(source, lang);
    const footer = portalFooter(lang);
    assert.ok(html.includes(`<footer class="site-footer portal-footer">${footer}</footer>`));
    assert.equal((html.match(/<footer\b/g) || []).length, 1);
    assert.equal((html.match(/<main\b/g) || []).length, 1);
    assert.doesNotMatch(footer, /class="wordmark"|<button|<form|<img|onclick|intent\/follow|messages\/compose/);
    for (const provider of ['design-md', 'systems', 'cult-ui'])
      assert.ok(footer.includes(`href="${prefix}/components/?provider=${provider}"`));
    for (const href of [repositories.core, 'https://collectui.com/', 'https://icons.kubai.design/'])
      assert.equal(footer.split(`href="${href}"`).length - 1, 1);
    assert.equal(footer.split('href="https://x.com/ShuaiXU13"').length - 1, 2);
    for (const action of lang === 'en' ? ['View source', 'Follow us on X', 'Contact us on X'] : ['查看源码', '在 X 关注我们', '到 X 联系'])
      assert.ok(footer.includes(action));
  }
});
