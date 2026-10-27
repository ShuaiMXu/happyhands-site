import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {portalContent} from '../apps/portal/render-content.js';
import {seoPages,seoData,seoHead,enhanceSeoHtml,guideFaq} from '../packages/ui/site-seo.ts';
import {guideContent} from '../guide/content.ts';
const origin='https://happyhands.cc';
const paths=['apps/portal','systems/happyhands','systems/quartz','systems/lime','apps/studio','components'];
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
  assert.equal((sitemap.match(/<loc>/g)||[]).length,paths.length+2);
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
    for(const id of ['apps','connect-agent','screens','get-started'])assert.equal((html.match(new RegExp(`id="${id}"`,'g'))||[]).length,1,id);
    assert.ok(html.includes('pnpm workbench'));
    assert.ok(html.includes('docs/counter-evidence-review-2026-10-21.md'));
    assert.ok(html.includes('docs/harness.md'));
    assert.ok(!html.includes('undefined'));
    assert.ok(!html.includes('happyhands-design.vercel.app'));
    assert.deepEqual(html.match(/value="[^"]+"/g), ['value="http://127.0.0.1:4190/apps/designer/"'],'Only the public local-workbench default may be rendered');
  }
  assert.ok(zh.includes('常见问题'));assert.ok(zh.includes('待人工验收'));
  assert.ok(en.includes('Frequently asked questions'));assert.ok(en.includes('human acceptance and release unconfirmed'));
});

test('search metadata has one canonical and a factual entity graph for each public page',()=>{
 for(const key of Object.keys(seoPages)){
  const html=enhanceSeoHtml('<html><head><title>Old</title><meta name="description" content="Old"><link rel="canonical" href="https://old.example/"><meta property="og:title" content="Old"></head></html>',key);
  assert.equal((html.match(/rel="canonical"/g)||[]).length,1,key);
  assert.equal((html.match(/name="description"/g)||[]).length,1,key);
  const graph=JSON.parse(html.match(/<script id="site-structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(graph['@context'],'https://schema.org');
  assert.ok(graph['@graph'].some(x=>x['@type']==='SoftwareSourceCode'&&x.codeRepository==='https://github.com/ShuaiMXu/happyhands'));
  assert.ok(!/aggregateRating|reviewCount|offers/.test(JSON.stringify(graph)),'No fabricated ratings or prices');
  assert.ok(html.includes('summary_large_image'));assert.ok(html.includes('happyhands-social.png'));
 }
 assert.notEqual(seoData('studio','en').description,seoData('studio','zh').description);
 assert.ok(seoData('portal','en').title.includes('AI Website Review'));
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
 for(const href of ['/guide/','/en/guide/','/apps/studio/','/components/','github.com/ShuaiMXu/happyhands'])assert.ok(text.includes(href));
 assert.ok(text.includes('processing')||text.includes('Processing'));
 assert.ok(text.includes('not an indexing requirement'));
 const robots=await read('public/robots.txt');
 assert.ok(!/^User-agent: (?:OAI-SearchBot|GPTBot)/m.test(robots),'Do not accidentally override wildcard exclusions or change training policy');
 assert.ok(portalContent('zh').includes('href="/guide/"'));assert.ok(portalContent('en').includes('href="/en/guide/"'));
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
  assert.equal((twice.match(/hreflang=/g)||[]).length,key==='portal'?0:3);
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
