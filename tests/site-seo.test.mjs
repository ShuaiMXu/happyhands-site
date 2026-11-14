import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {portalContent,renderPortalHtml} from '../apps/portal/render-content.js';
import {portalLanguage,portalPath} from '../apps/portal/language.ts';
import {seoPages,seoData,seoHead,enhanceSeoHtml,guideFaq} from '../packages/ui/site-seo.ts';
import {guideContent} from '../guide/content.ts';
const origin='https://happyhands.cc';
const paths=['apps/portal','en/apps/portal','systems/happyhands','systems/quartz','systems/lime','components'];
const read=path=>readFile(new URL(`../${path}`,import.meta.url),'utf8');
test('public metadata consistently identifies the production domain',async()=>{
  const sitemap=await read('public/sitemap.xml');
  for(const path of paths){
    const html=(await read(`${path}/index.html`)).replace(/\s+/g,' ');
    assert.ok(html.includes(`rel="canonical" href="${origin}/${path}/"`),path);
    assert.ok(html.includes(`property="og:url" content="${origin}/${path}/"`),path);
    assert.ok(!html.includes('happyhands-design.vercel.app'),path);
    assert.ok(sitemap.includes(`<loc>${origin}/${path}/</loc>`),path);
  }
  assert.equal((sitemap.match(/<loc>/g)||[]).length,paths.length+8);
  for(const path of ['guide','en/guide'])assert.ok(sitemap.includes(`<loc>${origin}/${path}/</loc>`));
  const robots=await read('public/robots.txt');
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
  for(const path of ['/apps/designer/','/components/preview/','/skillry-full/'])assert.ok(robots.includes(`Disallow: ${path}`));
  assert.ok(!sitemap.includes('/apps/designer/'));
  assert.ok((await read('index.html')).includes(`rel="canonical" href="${origin}/apps/portal/"`));
});
test('redirect only the exact legacy production alias, not preview hosts',async()=>{
  const {redirects}=JSON.parse(await read('vercel.json'));
  assert.deepEqual(redirects.find(rule=>rule.source==='/'&&!rule.has),{source:'/',destination:'/apps/portal/',permanent:true});
  const alias=redirects.find(rule=>rule.source==='/:path*');
  assert.deepEqual(alias,{source:'/:path*',has:[{type:'host',value:'happyhands-design.vercel.app'}],destination:`${origin}/:path*`,permanent:true});
  const legacyRoot=redirects.find(rule=>rule.source==='/'&&rule.has);
  assert.equal(legacyRoot.destination,`${origin}/apps/portal/`);
  const trailing=redirects.find(rule=>rule.source==='/:path*/');
  assert.deepEqual(trailing,{source:'/:path*/',has:alias.has,destination:`${origin}/:path*/`,permanent:true});
  assert.ok(redirects.indexOf(legacyRoot)<redirects.findIndex(rule=>rule.source==='/'&&!rule.has));
  assert.ok(redirects.filter(rule=>rule.source.startsWith('/apps/web')).every(rule=>rule.destination==='/apps/portal/'));
});
test('shared portal renderer provides real content in both languages without browser state',()=>{
  const zh=portalContent('zh'),en=portalContent('en');
  for(const html of [zh,en]){
    for(const id of ['design-resources'])assert.equal((html.match(new RegExp(`id="${id}"`,'g'))||[]).length,1,id);
    assert.ok(!html.includes('pnpm workbench'));
    assert.ok(!html.includes('homepage-case'));
    assert.equal((html.match(/role="tab"/g)||[]).length,4);
    for(const id of ['design-md','systems','cult-ui','setup']){
      assert.ok(html.includes(`id="feed-tab-${id}"`));
      assert.ok(html.includes(`id="feed-panel-${id}"`));
    }
    assert.ok(!html.includes('undefined'));
    assert.ok(!html.includes('happyhands-design.vercel.app'));
    assert.ok(!html.includes('handoff-repo'));
  }
  assert.ok(en.includes('href="/en/components/?'));
  assert.ok(!en.includes('href="/components/?'));
  assert.ok(!zh.includes('href="/en/components/?'));
  assert.ok(!zh.includes('常见问题'));assert.ok(!zh.includes('待人工验收'));
  assert.ok(!en.includes('Frequently asked questions'));assert.ok(!en.includes('human acceptance pending'));
});

test('search metadata has one canonical and a factual entity graph for each public page',()=>{
 for(const key of Object.keys(seoPages)){
  const html=enhanceSeoHtml('<html><head><title>Old</title><meta name="description" content="Old"><link rel="canonical" href="https://old.example/"><meta property="og:title" content="Old"></head></html>',key);
  assert.equal((html.match(/rel="canonical"/g)||[]).length,1,key);
  assert.equal((html.match(/name="description"/g)||[]).length,1,key);
  const graph=JSON.parse(html.match(/<script id="site-structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(graph['@context'],'https://schema.org');
  if(!['quartz','lime'].includes(key))assert.ok(graph['@graph'].some(x=>x['@type']==='SoftwareSourceCode'&&x.codeRepository==='https://github.com/ShuaiMXu/happyhands'));
  assert.ok(!/aggregateRating|reviewCount|offers/.test(JSON.stringify(graph)),'No fabricated ratings or prices');
  assert.ok(html.includes('summary_large_image'));assert.ok(html.includes('happyhands-social.png'));
 }
 assert.notEqual(seoData('studio','en').description,seoData('studio','zh').description);
 assert.ok(seoData('portalEn').title.includes('AI Website Review'));
});

test('translated guides are complete without JavaScript and match their FAQ schema',()=>{
 for(const lang of ['zh','en']){
  const key=lang==='zh'?'guide':'guideEn',html=guideContent(lang),head=seoHead(key),data=seoData(key);
  for(const [q,a]of guideFaq[lang]){assert.ok(html.includes(q));assert.ok(html.includes(a));}
  assert.equal(data.graph['@graph'].find(x=>x['@type']==='FAQPage').mainEntity.length,guideFaq[lang].length);
  assert.ok(html.includes('pnpm install --frozen-lockfile'));assert.ok(html.includes('pnpm workbench'));
  assert.ok(html.includes('THIRD_PARTY_NOTICES.md'));assert.ok(html.includes('.harness/'));
  for(const hreflang of ['zh-CN','en','x-default'])assert.ok(head.includes(`hreflang="${hreflang}"`));
  assert.ok(head.includes('https://happyhands.cc/guide/'));assert.ok(head.includes('https://happyhands.cc/en/guide/'));
  assert.ok(!html.includes('undefined'));assert.ok(!html.includes('happyhands-private'));
 }
});

test('machine reading aid links to user-facing facts and preserves crawler exclusions',async()=>{
 const text=await read('public/llms.txt');
 for(const href of ['/guide/','/en/guide/','/components/','github.com/ShuaiMXu/happyhands'])assert.ok(text.includes(href));
 assert.ok(text.includes('processing')||text.includes('Processing'));
 assert.ok(text.includes('not an indexing requirement'));
 const robots=await read('public/robots.txt');
 assert.ok(!/^User-agent: (?:OAI-SearchBot|GPTBot)/m.test(robots),'Do not accidentally override wildcard exclusions or change training policy');
 for(const lang of ['zh','en']) { const home=portalContent(lang); assert.ok(home.includes('id="design-resources"')); assert.ok(!home.includes('id="connect-agent"')); }
});
test('product structured data describes real capabilities without invented ratings',async()=>{
 const html=await read('apps/portal/index.html');
 const data=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
 const app=data['@graph'].find(node=>node['@type']==='SoftwareApplication');
 assert.equal(app.name,'HappyHands');assert.equal(app.url,origin+'/apps/portal/');
 assert.equal(app.sameAs,'https://github.com/ShuaiMXu/happyhands');
 assert.ok(!app.aggregateRating&&!app.review&&!app.offers,'Do not invent endorsements or pricing');
 const ids=new Set(data['@graph'].map(node=>node['@id']));
 for(const node of data['@graph'])for(const key of ['about','isPartOf'])if(node[key])assert.ok(ids.has(node[key]['@id']));
 assert.ok(html.includes('AI 网站审阅、设计系统提取与代码优化'));
});

test('metadata reconciliation preserves product identity and replaces stale graphs exactly once',async()=>{
 const source=await read('apps/portal/index.html');
 for(const key of ['portal','guide','guideEn']){
  const once=enhanceSeoHtml(source,key),twice=enhanceSeoHtml(once,key);
  assert.equal((twice.match(/type="application\/ld\+json"/g)||[]).length,1);
  assert.equal((twice.match(/<link\b[^>]*hreflang=/g)||[]).length,3);
  const graph=seoData(key).graph['@graph'];
  const app=graph.find(x=>x['@type']==='SoftwareApplication');
  assert.equal(app['@id'],origin+'/#software');
  assert.equal(app.sameAs,'https://github.com/ShuaiMXu/happyhands');
  assert.equal(app.featureList.length,4);
  const ids=new Set(graph.map(x=>x['@id']));
  for(const node of graph)for(const name of ['about','isPartOf','publisher'])if(node[name])assert.ok(ids.has(node[name]['@id']));
 }
 assert.equal(seoData('portal').title,'HappyHands | AI 网站审阅、设计系统提取与代码优化');
});

// Importing the checker must not run a live network check during unit tests.
import {assertSearchContent} from '../scripts/check-search-discovery.mjs';
import {workflowContent} from '../workflows/content.ts';
test('production discovery checks the current resource homepage, not removed setup copy',()=>{
 const body=portalContent('zh'),url=origin+'/apps/portal/';
 assert.ok(!body.includes('pnpm workbench'));assert.ok(!body.includes('常见问题'));
 assert.doesNotThrow(()=>assertSearchContent(url,`<body>${body}</body>`));
 assert.throws(()=>assertSearchContent(url,'<body><div id="app"></div></body>'),/resource feed/);
 assert.throws(()=>assertSearchContent(url,`<head>${body}</head><body></body>`),/resource feed/);
 assert.throws(()=>assertSearchContent(url,`<body><script>${body}</script></body>`),/resource feed/);
 assert.throws(()=>assertSearchContent(url,`<body>${body.replaceAll('href="/ai-ui-review/"','href="#"')}</body>`),/workflow link/);
});
test('production discovery requires real prerendered guide and workflow content in both languages',()=>{
 for(const lang of ['zh','en']){
  const prefix=lang==='en'?'/en':'';
  assert.doesNotThrow(()=>assertSearchContent(origin+prefix+'/guide/',`<body>${guideContent(lang)}</body>`));
  assert.throws(()=>assertSearchContent(origin+prefix+'/guide/','<body><h1>Guide</h1></body>'),/setup guide/);
  for(const [kind,path] of [['review','ai-ui-review'],['design','ai-website-design']]){
   const url=origin+prefix+'/'+path+'/',body=workflowContent(kind,lang);
   assert.doesNotThrow(()=>assertSearchContent(url,`<body>${body}</body>`));
   assert.throws(()=>assertSearchContent(url,'<body><h1>Workflow</h1></body>'),/workflow content/);
   assert.throws(()=>assertSearchContent(url,`<body><script>${body}</script></body>`),/workflow heading/);
  }
 }
});

test('both homepage URLs have complete language-specific static content and reciprocal identity',async()=>{
 const sitemap=await read('public/sitemap.xml');
 const config=await read('vite.config.js');
 for(const lang of ['zh','en']){
  const key=lang==='en'?'portalEn':'portal',path=portalPath(lang),other=portalPath(lang==='en'?'zh':'en');
  const source=await read(seoPages[key].file);
  const html=renderPortalHtml(enhanceSeoHtml(source,key),lang);
  assert.equal(portalLanguage(path),lang);
  assert.ok(html.includes(`<html lang="${lang==='en'?'en':'zh-CN'}">`));
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert.ok(html.includes(lang==='en'?'Make your product ':'让你的产品，'));
  assert.ok(html.includes(lang==='en'?'Review and code changes run locally.':'审查与代码修改在本地执行'));
  assert.ok(html.includes(lang==='en'?'You decide which changes to accept or reject.':'由你决定接受或拒绝修改'));
  assert.ok(html.includes(`href="${lang==='en'?'/en':''}/guide/"`));
  assert.ok(html.includes(`href="${lang==='en'?'/en':''}/ai-ui-review/#ai-slop"`));
  assert.ok(html.includes('id="workflow-heading"'));
  assert.ok(html.includes(`rel="canonical" href="${origin}${path}"`));
  assert.ok(source.includes(`<a href="${other}" hreflang=`),'Language link must work without JavaScript');
  for(const [code,target] of [['zh-CN','/apps/portal/'],['en','/en/apps/portal/'],['x-default','/en/apps/portal/']])
   assert.ok(html.includes(`hreflang="${code}" href="${origin}${target}"`));
  assert.ok(sitemap.includes(`<loc>${origin}${path}</loc>`));
  assert.ok(config.includes(`resolve('${seoPages[key].file}')`));
  assert.doesNotThrow(()=>assertSearchContent(origin+path,html));
  assert.throws(()=>assertSearchContent(origin+path,html.replaceAll(lang==='en'?'Review and code changes run locally.':'审查与代码修改在本地执行','')),/local execution/);
  const page=seoData(key).graph['@graph'].find(node=>node['@type']==='WebPage');
  assert.equal(page.inLanguage,lang==='en'?'en':'zh-CN');
  assert.equal(page.url,origin+path);
 }
});

test('homepage language is URL-authoritative rather than localStorage-dependent',async()=>{
 assert.equal(portalLanguage('/en/apps/portal/'),'en');
 assert.equal(portalLanguage('/apps/portal/'),'zh');
 const source=await read('apps/portal/main.js');
 assert.ok(source.includes('let lang = portalLanguage(location.pathname)'));
 assert.ok(!source.includes('readLanguage('));
 assert.ok(source.includes("querySelector('#lang-switch a')"));
 assert.ok(source.includes('portalPath(next) + location.search + location.hash'));
 assert.match(source,/addEventListener\('hashchange',[^\n]*syncLanguageLink/);
});

test('third-party system pages identify the referenced work and preserve original attribution',()=>{
 for(const key of ['quartz','lime']){
  const data=seoData(key),graph=data.graph['@graph'];
  const page=graph.find(node=>node['@type']==='WebPage');
  const source=`https://design.how/systems/${key}`;
  assert.equal(page.citation,source);
  assert.deepEqual(page.about,{'@id':source});
  assert.ok(graph.some(node=>node['@type']==='CreativeWork'&&node['@id']===source&&node.url===source));
  assert.ok(!graph.some(node=>['SoftwareApplication','SoftwareSourceCode'].includes(node['@type'])));
  assert.ok(graph.some(node=>node['@type']==='WebSite'&&node['@id']===origin+'/#website'));
  assert.ok(!/sameAs|creator|copyrightHolder/.test(JSON.stringify(page)),'Do not invent ownership or affiliation');
 }
});


test('homepage language navigation preserves active state and current history language',async()=>{
 const source=await read('apps/portal/main.js');
 assert.match(source,/event\.button !== 0.*event\.metaKey.*event\.ctrlKey.*event\.shiftKey.*event\.altKey/);
 assert.match(source,/history\.pushState\(history\.state, '', link\.href\)/);
 assert.match(source,/addEventListener\('popstate', \(\) => setLang\(portalLanguage\(location\.pathname\)\)\)/);
 assert.ok(source.includes('disposeResourceFeed?.snapshot?.()'));
 assert.ok(source.includes('ResourceToolPanels,previous'));
 assert.ok(source.includes("document.querySelector('#lang-switch a')?.focus({preventScroll:true})"));
 assert.ok(source.includes("window.scrollTo({top:y,behavior:'instant'})"));
});

test('v1.0.0 discovery distinguishes the lightweight Skill from the optional workbench',async()=>{
 const install='npx --yes --package=https://github.com/ShuaiMXu/happyhands/releases/download/v1.0.0/happyhands-lite-1.0.0.tgz happyhands install';
 const {nonprofitContent}=await import('../workflows/nonprofit.ts');
 for(const lang of ['zh','en']){
  const guide=guideContent(lang),prefix=lang==='en'?'/en':'';
  const setup=guide.match(/<section id="setup">([\s\S]*?)<\/section>/)?.[1];
  const workbench=guide.match(/<section id="workbench">([\s\S]*?)<\/section>/)?.[1];
  assert.ok(setup?.includes(install),'Pinned release command is crawlable without JavaScript');
  assert.ok(setup.includes('~/.codex/skills/happyhands')&&setup.includes('CODEX_HOME'));
  assert.ok(setup.includes('$happyhands')&&setup.includes('install --agent claude-code'));
  assert.ok(setup.includes(lang==='zh'?'不会覆盖已有 Skill':'refusing to overwrite an existing Skill'));
  assert.ok(setup.includes(lang==='zh'?'完整执行闭环仍未验证':'full execution loop remains unverified'));
  assert.ok(!setup.includes('pnpm workbench'),'Lightweight entry does not require the workbench');
  assert.ok(workbench?.includes('pnpm workbench'));
  assert.ok(workbench.includes(lang==='zh'?'可选':'Optional'));
  assert.ok(guide.includes('href="#setup"')&&guide.includes('href="#workbench"'));
  for(const body of [guide,workflowContent('review',lang),workflowContent('design',lang),nonprofitContent(lang)]){
   assert.ok(body.includes(lang==='zh'?'轻量 Skill':'lightweight Skill'));
   assert.ok(body.includes('~/.happyhands/runs')&&body.includes('.harness/'),'Both storage defaults are explicit');
   assert.ok(body.includes('Codex CLI')&&body.includes('v1.0.0'));
  }
  const app=seoData(lang==='en'?'portalEn':'portal').graph['@graph'].find(x=>x['@type']==='SoftwareApplication');
  assert.equal(app.softwareVersion,'1.0.0');
  const source=await read(`${prefix.slice(1)?prefix.slice(1)+'/':''}apps/portal/index.html`);
  assert.ok(source.includes(`href="${prefix}/guide/#setup">${lang==='zh'?'安装':'Install'} v1.0.0`),'Homepage installation CTA keeps its language and opens setup');
  assert.equal(app.operatingSystem,undefined,'Do not imply unverified cross-platform coverage');
  const homepage=portalContent(lang);
  assert.ok(homepage.includes(lang==='zh'?'由你决定接受或拒绝修改':'You decide which changes to accept or reject.'));
  assert.ok(homepage.includes(`href="${prefix}/guide/"`));
  const faq=guideFaq[lang].map(row=>row.join(' ')).join(' ');
  assert.ok(faq.includes('~/.happyhands/runs')&&faq.includes('.harness/'));
  assert.ok(faq.includes(lang==='zh'?'轻量 Skill':'lightweight Skill'));
 }
 const facts=await read('public/llms.txt');
 for(const term of ['v1.0.0','docs/lightweight.md','releases/tag/v1.0.0','~/.happyhands/runs','.harness/','optional local workbench','not a verified repair'])assert.ok(facts.includes(term),term);
});
