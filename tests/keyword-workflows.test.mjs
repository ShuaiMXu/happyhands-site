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

test('AI slop guidance ties subjective impressions to evidence and product tasks in both languages',()=>{
 for(const lang of ['zh','en']){
  const body=workflowContent('review',lang);
  const section=workflowCopy.review[lang].sections.find(([id])=>id==='ai-slop');
  assert.ok(section,'One substantive review section, not a separate keyword page');
  assert.equal(workflowCopy.review[lang].sections.filter(([id])=>id==='ai-slop').length,1);
  assert.ok(body.includes('id="ai-slop"'));
  assert.ok(body.includes('href="#ai-slop"'),'Generated table of contents includes new section');
  for(const term of lang==='zh'?['AI slop','AI 味','设计审查','产品体验','不能证明','主次层级','加载、空状态和错误状态','注册并创建第一个项目','截图、源码与项目设计规则','由人接受或拒绝','不是已验证的用户研究']:['AI slop','product experience','not a quality standard or proof','hierarchy','loading, empty and error states','signing up and creating a first project','screenshots, source and project design rules','person accept or reject','not validated user research']){
   assert.ok(section.join(' ').includes(term),term);
  }
  const design=workflowContent('design',lang),prefix=lang==='en'?'/en':'';
  assert.ok(design.includes(`href="${prefix}${workflowPaths.review}#ai-slop"`));
  const metadata=seoData(lang==='en'?'reviewEn':'review');
  assert.ok(metadata.description.includes(lang==='zh'?'AI 味':'AI slop'));
  for(const [id] of workflowCopy.review[lang].sections)assert.equal((body.match(new RegExp(`id="${id}"`,'g'))||[]).length,1,`Unique section ${id}`);
 }
});


test('public workflows recommend available resources, not the retired theme editor',()=>{
 for(const kind of ['review','design'])for(const lang of ['zh','en']){
  const body=workflowContent(kind,lang),prefix=lang==='en'?'/en':'';
  assert.doesNotMatch(body,/Theme Studio|主题工作室|\/apps\/studio\//);
  assert.ok(body.includes(`href="${prefix}/components/"`));
  assert.ok(body.includes(`href="${prefix}/guide/"`));
  if(kind==='design')assert.ok(body.includes(lang==='zh'?'浏览参考或取得资源不会自动修改仓库':'Browsing or obtaining a resource does not modify your repository'));
 }
});
