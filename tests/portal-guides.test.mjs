import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { renderPortalHtml } from '../apps/portal/render-content.js';

for (const lang of ['zh', 'en']) test(`${lang}: the footer is the single crawlable guide entry`, () => {
  const path = lang === 'en' ? 'en/apps/portal/index.html' : 'apps/portal/index.html';
  const html = renderPortalHtml(readFileSync(path, 'utf8'), lang);
  const prefix = lang === 'en' ? '/en' : '';
  const section = html.match(/<nav class="sy__guide"[\s\S]*?<\/nav>/)[0];
  const lists = [...section.matchAll(/<ul class="sy__guide-links">([\s\S]*?)<\/ul>/g)].map(m => m[1]);
  const guideLinks = [...lists[0].matchAll(/<a href="([^"]+)"/g)].map(match => match[1]);
  const moreLinks = [...lists[1].matchAll(/<a href="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(guideLinks, ['/guide/', '/ai-website-design/', '/ai-ui-review/', '/ai-ui-review/#ai-slop', '/nonprofit-website-design/'].map(p => prefix + p).concat('/apps/setup/'));
  assert.deepEqual(moreLinks, ['/llms.txt', 'https://icons.kubai.design/', 'https://collectui.com/']);
  assert.match(html, lang === 'en' ? /Review and code changes run locally/ : /审查与代码修改在本地执行/);
  assert.doesNotMatch(html, /class="workflow-links"/, 'No second guide block on the page');
  assert.match(html, /href="https:\/\/icons.kubai.design\/"/);
  assert.doesNotMatch(section, /<button|<details|<script/);
});
