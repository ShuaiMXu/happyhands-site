import test from 'node:test';
import assert from 'node:assert/strict';
import {agentPresets,harnessPrompt,setupAgent} from '../apps/portal/agent-presets.js';
import {guideContent} from '../guide/content.ts';

test('DSH remains an external operator and gets localized instructions, not an invented executor',()=>{
 const dsh=agentPresets.find(agent=>agent.id==='dsh');
 assert.ok(dsh);assert.equal(dsh.adapter,undefined);
 for(const lang of ['zh','en']){
  const prompt=harnessPrompt('dsh',lang);
  assert.ok(prompt.includes(lang==='zh'?'docs/dsh.zh-CN.md':'docs/dsh.md'));
  assert.doesNotMatch(prompt,/pnpm harness agents/);
  assert.match(prompt,/安装命令末尾加 --agent dsh，仅用于安装|Append --agent dsh to the install command only/);
  assert.match(prompt,/不要把 --agent dsh 当作执行器选项|Do not use --agent dsh as an executor flag/);
  assert.match(prompt,/不自动推送、合并或部署|Do not automatically push, merge or deploy/);
 }
});

test('a DSH guide link overrides the saved tool and invalid names never become executors',()=>{
 assert.equal(setupAgent('?provider=setup&agent=dsh','codex'),'dsh');
 assert.equal(setupAgent('?agent=missing','kimi'),'kimi');
 assert.equal(setupAgent('?agent=missing','missing'),'codex');
});

test('both guides disclose the DSH model dependency and the failed headless preflight',()=>{
 for(const lang of ['zh','en']){
  const html=guideContent(lang);
  assert.ok(html.includes('id="dsh"'));
  assert.ok(html.includes('dsh headless --help'));
  assert.ok(html.includes('Codex CLI'));
  assert.match(html,/缺少凭据停止|stopped on missing credentials/);
  assert.ok(html.includes(`${lang==='en'?'/en':''}/components/?provider=setup`));
 }
});
