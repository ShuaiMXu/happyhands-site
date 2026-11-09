import{readFile}from'node:fs/promises';import assert from'node:assert/strict';
for(const path of ['en/apps/portal','en/systems/quartz','en/systems/lime','en/systems/glaze','en/systems/sodium','en/systems/happyhands']){const html=await readFile(`dist/${path}/index.html`,'utf8');assert.match(html,/<html lang="en"/);const id=path.split('/').at(-1);const expected=['glaze','sodium'].includes(id)?'https://happyhands.cc/en/components/?provider=systems&amp;system='+id:'https://happyhands.cc/'+path+'/';assert.ok(html.includes('rel="canonical" href="'+expected+'"'),path);}
for(const p of ['design-md/mercury-3172cd4d','systems/quartz/components/button.md']){const html=await readFile(`dist/resource-pages/en/${p}/index.html`,'utf8');assert.match(html,/<html lang="en"/);assert.match(html,/hreflang="zh-CN"/);assert.match(html,/https:\/\/happyhands.cc\/en\/components\//);assert.match(html,/resource-static/);}
console.log('English page outputs, canonicals, alternates and crawler content OK');

const portal=await readFile('dist/en/apps/portal/index.html','utf8');
const body=portal.slice(portal.indexOf('<body'));
assert.ok(body.includes('open-source local AI-assisted UI review workbench'));
assert.ok(body.includes('Make your product '));
assert.ok(body.includes('href="/en/components/?'));
assert.ok(!body.includes('href="/components/?'));
assert.ok(!body.includes('开源的本地 AI 界面审阅工作台'));
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
