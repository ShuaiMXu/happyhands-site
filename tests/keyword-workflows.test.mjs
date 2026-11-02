import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {workflowContent,workflowCopy,workflowPaths} from '../workflows/content.ts';
import {seoData,seoHead,enhanceSeoHtml,seoPages} from '../packages/ui/site-seo.ts';
import {portalContent} from '../apps/portal/render-content.js';
import {guideContent} from '../guide/content.ts';
const origin='https://happyhands.cc';
test('four language routes have unique metadata, one H1 and reciprocal alternate URLs',()=>{
 const titles=new Set(),descriptions=new Set();
 for(const kind of ['review','design'])for(const lang of ['zh','en']){
  const key=kind+(lang==='en'?'En':''),path=(lang==='en'?'/en':'')+workflowPaths[kind];
  const data=seoData(key),head=seoHead(key),body=workflowContent(kind,lang);
  titles.add(data.title);descriptions.add(data.description);
  assert.equal(data.url,origin+path);assert.equal(data.lang,lang);
  assert.equal((body.match(/<h1>/g)||[]).length,1);assert.ok(body.includes(workflowCopy[kind][lang].h1));
  for(const l of ['zh-CN','en','x-default'])assert.ok(head.includes(`hreflang="${l}"`));
  assert.ok(head.includes(`href="${origin}${workflowPaths[kind]}"`));assert.ok(head.includes(`href="${origin}/en${workflowPaths[kind]}"`));
  const html=enhanceSeoHtml(enhanceSeoHtml('<html><head></head></html>',key),key);
  assert.equal((html.match(/rel="canonical"/g)||[]).length,1);assert.equal((html.match(/application\/ld\+json/g)||[]).length,1);
  assert.ok(body.includes('Codex CLI'));assert.ok(body.includes('Local Web Alpha'));assert.ok(body.includes('.harness/'));
  assert.ok(!body.includes('undefined'));assert.ok(!body.includes('·'));
 }
 assert.equal(titles.size,4);assert.equal(descriptions.size,4);
});
test('workflow pages are distinct from installation and communicate real product boundaries',()=>{
 for(const lang of ['zh','en']){
  const review=workflowContent('review',lang),design=workflowContent('design',lang);
  for(const term of lang==='zh'?['可复现','不会','截图','合并或部署']:['reproducible','does not merge or deploy','screenshots'])assert.ok(review.includes(term),term);
  for(const term of lang==='zh'?['生成并托管','已有代码','假设场景']:['generated and hosted','existing code','illustrative scenario'])assert.ok(design.includes(term),term);
  assert.ok(!review.includes('git clone'));assert.ok(!design.includes('git clone'));
  const prefix=lang==='en'?'/en':'';
  for(const page of [review,design,guideContent(lang),portalContent(lang)])for(const path of Object.values(workflowPaths)){
   // Each workflow links to the other; self links are not needed.
   if(page===review&&path===workflowPaths.review||page===design&&path===workflowPaths.design)continue;
   assert.ok(page.includes(`href="${prefix}${path}"`));
  }
 }
});
test('workflow routes are crawlable build inputs included in sitemap and alpha verification',async()=>{
 const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
 const sitemap=await read('public/sitemap.xml'),config=await read('vite.config.js'),verify=await read('scripts/verify-alpha-release.mjs');
 for(const key of ['review','reviewEn','design','designEn']){
  const {path,file}=seoPages[key];assert.ok(sitemap.includes(`<loc>${origin}${path}</loc>`));assert.ok(config.includes(`resolve('${file}')`));
  assert.ok(verify.includes(`'${path.slice(1,-1)}'`));assert.ok((await read(file)).includes('id="workflow-content"'));
 }
 assert.ok(config.includes('workflowContent('));
});
