import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { agentPresets, harnessPrompt, setupGuide } from '../apps/portal/agent-presets.js';
import { guideContent } from '../guide/content.ts';
import { renderPortalHtml } from '../apps/portal/render-content.js';

for (const lang of ['zh', 'en']) test(`${lang}: the footer is the single crawlable guide entry`, () => {
  const path = lang === 'en' ? 'en/apps/portal/index.html' : 'apps/portal/index.html';
  const html = renderPortalHtml(readFileSync(path, 'utf8'), lang);
  const prefix = lang === 'en' ? '/en' : '';
  const section = html.match(/<nav class="sy__guide"[^>]*>[\s\S]*?<\/nav>/)[0];
  const lists = [...section.matchAll(/<ul class="sy__guide-links">([\s\S]*?)<\/ul>/g)].map(m => m[1]);
  const guideLinks = [...lists[0].matchAll(/<a href="([^"]+)"/g)].map(match => match[1]);
  const moreLinks = [...lists[1].matchAll(/<a href="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(guideLinks, ['/guide/', '/ai-website-design/', '/ai-ui-review/', '/ai-ui-review/#ai-slop', '/nonprofit-website-design/'].map(p => prefix + p).concat('/apps/setup/'));
  assert.deepEqual(moreLinks, ['https://icons.kubai.design/', 'https://collectui.com/']);
  assert.match(html, lang === 'en' ? /Review and code changes run locally/ : /审查与代码修改在本地执行/);
  assert.doesNotMatch(html, /class="workflow-links"/, 'No second guide block on the page');
  assert.match(html, /href="https:\/\/icons.kubai.design\/"/);
  assert.doesNotMatch(section, /<button|<details|<script/);
});


for (const lang of ['zh', 'en']) test(`${lang}: all six first-run prompts use Lite; the workbench is opt-in`, () => {
  const prefix = lang === 'en' ? '/en' : '';
  const install = `${prefix}/guide/#setup`;
  const workbench = `${prefix}/guide/#workbench`;
  assert.equal(setupGuide(lang), install);
  assert.equal(setupGuide(lang, 'workbench'), workbench);
  const guide = guideContent(lang);
  assert.match(guide, /id="setup"[\s\S]*happyhands-lite-[^<]+\.tgz/);
  assert.match(guide, /id="workbench"[\s\S]*pnpm workbench/);
  for (const agent of agentPresets) {
    const prompt = harnessPrompt(agent.id, lang);
    assert.ok(prompt.includes(agent.name));
    assert.ok(prompt.indexOf(install) > 0 && prompt.indexOf(install) < prompt.indexOf(workbench));
    assert.doesNotMatch(prompt, /pnpm|git clone/);
    assert.match(prompt, /SKILL\.md/);
    assert.match(prompt, /doctor/);
    assert.match(prompt, /不自动推送、合并或部署|Do not automatically push, merge or deploy/);
    if (agent.id === 'claude-code') assert.match(prompt, /--agent claude-code/);
    if (agent.id === 'dsh') assert.ok(prompt.includes(`${prefix}/guide/#dsh`));
    if (!agent.adapter) assert.ok(prompt.includes(`--agent ${agent.id}`));
  }
});
