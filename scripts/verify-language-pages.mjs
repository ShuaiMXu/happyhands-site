import{readFile}from'node:fs/promises';import assert from'node:assert/strict';
for(const path of ['en/apps/portal','en/systems/quartz','en/systems/lime','en/systems/glaze','en/systems/sodium','en/systems/happyhands']){const html=await readFile(`dist/${path}/index.html`,'utf8');assert.match(html,/<html lang="en"/);const id=path.split('/').at(-1);const expected=['glaze','sodium'].includes(id)?'https://happyhands.cc/en/components/?provider=systems&amp;system='+id:'https://happyhands.cc/'+path+'/';assert.ok(html.includes('rel="canonical" href="'+expected+'"'),path);}
for(const p of ['design-md/mercury-3172cd4d','systems/quartz/components/button.md']){const html=await readFile(`dist/resource-pages/en/${p}/index.html`,'utf8');assert.match(html,/<html lang="en"/);assert.match(html,/hreflang="zh-CN"/);assert.match(html,/https:\/\/happyhands.cc\/en\/components\//);assert.match(html,/resource-static/);}
console.log('English page outputs, canonicals, alternates and crawler content OK');

for(const system of ['quartz','lime']){
 const html=await readFile(`dist/en/systems/${system}/index.html`,'utf8');
 const fallback=html.match(/<noscript>([\s\S]*?)<\/noscript>/)?.[1];
 assert.ok(fallback,`${system} English fallback`);
 assert.equal((fallback.match(/<h1>/g)||[]).length,1);
 assert.equal(fallback.match(/<h1>(.*?)<\/h1>/)?.[1],html.match(/<title>(.*?)<\/title>/)?.[1]);
 assert.ok(fallback.includes(html.match(/<meta name="description" content="([^"]+)"/)?.[1]));
 assert.doesNotMatch(fallback,/[\u3400-\u9fff]/,`${system} fallback must be completely English`);
 assert.match(fallback,/Interactive previews require JavaScript/);
 for(const href of ['guide','components','systems/happyhands','systems/quartz','systems/lime'])assert.ok(fallback.includes(`href="/en/${href}/"`));
}
console.log('Quartz and Lime English fallback headings, descriptions and navigation OK');

const portal=await readFile('dist/en/apps/portal/index.html','utf8');
const body=portal.slice(portal.indexOf('<body'));
assert.ok(body.includes('Review and code changes run locally.')&&body.includes('You decide which changes to accept or reject.'));
assert.ok(body.includes('Make your product '));
assert.ok(body.includes('href="/en/components/?'));
assert.ok(!body.includes('href="/components/?'));
assert.ok(!body.includes('开源的本地 AI 界面审阅工具'));
assert.match(body,/<a href="\/apps\/portal\/" hreflang="zh-CN"/);
for(const href of ['/en/guide/','/en/ai-ui-review/','/en/ai-ui-review/#ai-slop'])assert.ok(body.includes(`href="${href}"`));
const resourceIndex=await readFile('dist/resource-pages/en/index.html','utf8');
assert.ok(resourceIndex.includes('href="/en/components/?'));
assert.ok(!resourceIndex.includes('href="/components/?'));
const sitemap=await readFile('dist/sitemap.xml','utf8');
const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(x=>x[1]);
assert.equal(urls.length,new Set(urls).size);
assert.equal(urls.length,18);
for(const path of ['apps/studio','en/systems/glaze','en/systems/sodium'])assert.ok(!urls.includes(`https://happyhands.cc/${path}/`));
const retired=await readFile('dist/apps/studio/index.html','utf8');
assert.match(retired,/noindex,follow/);
assert.match(retired,/Theme Studio has been retired/);
assert.ok(!retired.includes('main.tsx'));
console.log('English portal body, language links, resource links, canonical sitemap and Studio retirement OK');

for(const prefix of ['', 'en/']){
 const guide=await readFile(`dist/${prefix}guide/index.html`,'utf8');
 const lang=prefix?'en':'zh';
 for(const token of ['id="setup"','id="workbench"','happyhands-lite-0.1.0-alpha.2.tgz happyhands install','pnpm workbench','~/.happyhands/runs','.harness/'])assert.ok(guide.includes(token),`${prefix}guide ${token}`);
 const schema=JSON.parse(guide.match(/<script id="site-structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
 const faq=schema['@graph'].find(x=>x['@type']==='FAQPage');
 for(const row of faq.mainEntity){assert.ok(guide.includes(row.name));assert.ok(guide.includes(row.acceptedAnswer.text));}
 for(const route of ['ai-ui-review','ai-website-design','nonprofit-website-design']){
  const html=await readFile(`dist/${prefix}${route}/index.html`,'utf8');
  assert.ok(html.includes(lang==='en'?'lightweight Skill':'轻量 Skill'),`${prefix}${route} lightweight entry`);
  assert.ok(html.includes('~/.happyhands/runs')&&html.includes('.harness/'),`${prefix}${route} storage defaults`);
 }
}
console.log('Bilingual Alpha.2 setup, optional workbench, workflow storage and FAQ parity OK');
