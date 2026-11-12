import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { renderPortalHtml } from '../apps/portal/render-content.js';

for (const lang of ['zh', 'en']) test(`${lang}: server HTML retains four distinct guide destinations and Kubai with no client execution`, () => {
  const path = lang === 'en' ? 'en/apps/portal/index.html' : 'apps/portal/index.html';
  const html = renderPortalHtml(readFileSync(path, 'utf8'), lang);
  const section = html.match(/<section class="workflow-links"[\s\S]*?<\/section>/)[0];
  const prefix = lang === 'en' ? '/en' : '';
  const links = [...section.matchAll(/<a href="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(links, ['/guide/', '/ai-website-design/', '/ai-ui-review/', '/ai-ui-review/#ai-slop'].map(p => prefix + p));
  assert.equal((section.match(/class="workflow-purpose"/g) || []).length, 4);
  assert.match(section, lang === 'en' ? /run locally.*accept or reject/ : /本地执行.*接受或拒绝/);
  assert.match(html, /href="https:\/\/icons.kubai.design\/"/);
  assert.doesNotMatch(section, /<button|<details|<script/);
});
