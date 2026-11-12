import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {agentPresets,harnessPrompt} from '../apps/portal/agent-presets.js';
import {lightweightInstall} from '../apps/portal/lightweight-release.js';
import {guideContent} from '../guide/content.ts';
import {resourcePreviewPlugin} from '../scripts/resource-preview-plugin.mjs';

test('all six bilingual task payloads use the released portable entry and retain review boundaries',()=>{
 assert.equal(agentPresets.length,6);
 assert.equal(lightweightInstall,'npx --yes --package=https://github.com/ShuaiMXu/happyhands/releases/download/v0.1.0-alpha.4/happyhands-lite-0.1.0-alpha.4.tgz happyhands install');
 for(const lang of ['zh','en'])for(const agent of agentPresets){
  const prompt=harnessPrompt(agent.id,lang);
  for(const fact of [agent.name,lightweightInstall,'bin/happyhands.mjs','Codex CLI','doctor --agent codex','agents'])assert.ok(prompt.includes(fact),agent.id+': '+fact);
  assert.doesNotMatch(prompt,/pnpm harness|happyhands checkout/);
  assert.match(prompt,/不自动推送、合并或部署|Do not automatically push, merge or deploy/);
  if(!agent.adapter)assert.ok(prompt.includes('--agent '+agent.id),'Explicitly forbids an unsupported executor');
 }
 for(const lang of ['zh','en']){
  const html=guideContent(lang);
  assert.ok(html.includes(lightweightInstall));
  assert.ok(html.includes('bin/happyhands.mjs'));
  assert.ok(html.includes('pnpm workbench'),'Optional source workflow retained');
  assert.doesNotMatch(html,/alpha\.2|Alpha\.2/);
 }
});

test('local English resource alias serves the real entry without losing provider and agent query',()=>{
 let middleware;
 resourcePreviewPlugin(process.cwd()).configureServer({middlewares:{use(fn){middleware=fn;}}});
 for(const url of ['/en/components/?provider=setup&agent=dsh','/en/components/?provider=setup&agent=kimi&extra=a%2Fb','/components/?provider=setup','/en/guide/']){
  const req={url};let next=false;
  middleware(req,{},()=>{next=true;});
  assert.equal(req.url,url.replace(/^\/en\/components\//,'/components/'));
  assert.equal(next,true);
 }
});

test('setup and shared host retain query/hash and verify embedded message sender',async()=>{
 const connect=await readFile(new URL('../apps/portal/connect.js',import.meta.url),'utf8');
 const host=await readFile(new URL('../packages/ui/ResourceToolPanels.tsx',import.meta.url),'utf8');
 assert.ok(connect.includes("url.searchParams.set('agent',selectedAgent)"));
 for(const source of [connect,host])assert.match(source,/url\.pathname\s*\+\s*url\.search\s*\+\s*url\.hash/);
 assert.ok(host.includes('event.origin !== location.origin'));
 assert.ok(host.includes('event.source !== frame.current?.contentWindow'));
 assert.ok(host.includes('agentPresets.some'));
});
