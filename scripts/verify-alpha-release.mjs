import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {guideFaq} from '../packages/ui/site-seo.ts';
const origin='https://happyhands.cc';
const pages=['apps/portal','systems/happyhands','systems/quartz','systems/lime','apps/studio','components','guide','en/guide'];
const release=JSON.parse(await readFile('dist/release.json','utf8'));
const expected=process.env.VERCEL_GIT_COMMIT_SHA||execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
assert.equal(release.revision,expected,'Built revision does not match the expected source');
assert.ok(release.dirty===null||typeof release.dirty==='boolean','Invalid source dirty state');
if(process.argv.includes('--require-clean'))assert.equal(release.dirty,false,'Clean local source required');
assert.match(release.revision,/^[a-f0-9]{40}$/);assert.equal(release.channel,'local-web-alpha');
const sitemap=await readFile('dist/sitemap.xml','utf8');
for(const path of pages){const html=(await readFile(`dist/${path}/index.html`,'utf8')).replace(/\s+/g,' ');assert.match(html,/<title>[^<]+<\/title>/);assert.match(html,/<meta name="description" content="[^"]+"/);assert.ok(html.includes(`rel="canonical" href="${origin}/${path}/"`),path+' canonical');for(const key of ['og:title','og:description','og:url','og:image'])assert.ok(html.includes(`property="${key}"`),path+' '+key);assert.ok(sitemap.includes(`<loc>${origin}/${path}/</loc>`));}
const robots=await readFile('dist/robots.txt','utf8');assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));assert.ok(!sitemap.includes('/apps/designer/'));
const legacy=await readFile('dist/apps/web/index.html','utf8');assert.ok(legacy.includes('noindex'));assert.ok(legacy.includes('url=/apps/portal/'));

const portal=await readFile('dist/apps/portal/index.html','utf8');
for(const text of ['常见问题','pnpm workbench','人工接受仍待记录','docs/harness.md'])assert.ok(portal.includes(text),'Missing prerendered content: '+text);
assert.ok(!portal.includes('<div id="portal-content"></div>'),'Portal must not be an empty client-only shell');
for(const path of pages){
  const html=await readFile(`dist/${path}/index.html`,'utf8');
  const scripts=[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length,1,path+' structured data');
  const graph=JSON.parse(scripts[0][1]);
  assert.ok(graph['@graph'].some(x=>x.url===`${origin}/${path}/`),path+' entity URL');
}
for(const [path,lang]of [['guide','zh'],['en/guide','en']]){
  const html=await readFile(`dist/${path}/index.html`,'utf8');
  const body=html.slice(html.indexOf('<body'));
  for(const [q,a]of guideFaq[lang]){assert.ok(body.includes(q),path+' FAQ question');assert.ok(body.includes(a),path+' FAQ answer');}
  for(const value of ['zh-CN','en','x-default'])assert.ok(html.includes(`hreflang="${value}"`),path+' hreflang');
}
const social=await readFile('dist/brand/happyhands-social.png');assert.equal(social.readUInt32BE(16),1200);assert.equal(social.readUInt32BE(20),630);
assert.ok((await readFile('dist/llms.txt','utf8')).includes(`${origin}/en/guide/`));

console.log(JSON.stringify({status:'pass',kind:'built-artifact-contract',release,pages,limitations:['Does not prove deployment, accessibility, performance or visual acceptance.']},null,2));
