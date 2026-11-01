import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {guideFaq} from '../packages/ui/site-seo.ts';
import {resourceRewritePath} from './resource-preview-plugin.mjs';
const origin='https://happyhands.cc';
const builtPage = path => path === 'components' ? 'dist/resource-pages/index.html' : `dist/${path}/index.html`;
const pages=['apps/portal','systems/happyhands','systems/quartz','systems/lime','apps/studio','components','guide','en/guide'];
const release=JSON.parse(await readFile('dist/release.json','utf8'));
const expected=process.env.VERCEL_GIT_COMMIT_SHA||execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
assert.equal(release.revision,expected,'Built revision does not match the expected source');
assert.ok(release.dirty===null||typeof release.dirty==='boolean','Invalid source dirty state');
if(process.argv.includes('--require-clean'))assert.equal(release.dirty,false,'Clean local source required');
assert.match(release.revision,/^[a-f0-9]{40}$/);assert.equal(release.channel,'local-web-alpha');
const sitemap=await readFile('dist/sitemap.xml','utf8');
for(const path of pages){const html=(await readFile(builtPage(path),'utf8')).replace(/\s+/g,' ');assert.match(html,/<title>[^<]+<\/title>/);assert.match(html,/<meta name="description" content="[^"]+"/);assert.ok(html.includes(`rel="canonical" href="${origin}/${path}/"`),path+' canonical');for(const key of ['og:title','og:description','og:url','og:image'])assert.ok(html.includes(`property="${key}"`),path+' '+key);assert.ok(sitemap.includes(`<loc>${origin}/${path}/</loc>`));}
const robots=await readFile('dist/robots.txt','utf8');assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));assert.ok(!sitemap.includes('/apps/designer/'));
const legacy=await readFile('dist/apps/web/index.html','utf8');assert.ok(legacy.includes('noindex'));assert.ok(legacy.includes('url=/apps/portal/'));

const portal=await readFile('dist/apps/portal/index.html','utf8');
for(const text of ['feed-panel-design-md','feed-panel-systems','feed-panel-cult-ui','docs/harness.md'])assert.ok(portal.includes(text),'Missing prerendered content: '+text);
assert.ok(!portal.includes('class="homepage-case"'),'Removed homepage case must not return');
assert.ok(!portal.includes('<div id="portal-content"></div>'),'Portal must not be an empty client-only shell');
for(const path of pages){
  const html=await readFile(builtPage(path),'utf8');
  const scripts=[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length,1,path+' structured data');
  const graph=JSON.parse(scripts[0][1]);
  assert.ok(graph['@graph'].some(x=>x.url===`${origin}/${path}/`),path+' entity URL');
}
for(const [path,lang]of [['guide','zh'],['en/guide','en']]){
  const html=await readFile(builtPage(path),'utf8');
  const body=html.slice(html.indexOf('<body'));
  for(const [q,a]of guideFaq[lang]){assert.ok(body.includes(q),path+' FAQ question');assert.ok(body.includes(a),path+' FAQ answer');}
  for(const value of ['zh-CN','en','x-default'])assert.ok(html.includes(`hreflang="${value}"`),path+' hreflang');
}
const social=await readFile('dist/brand/happyhands-social.png');assert.equal(social.readUInt32BE(16),1200);assert.equal(social.readUInt32BE(20),630);
assert.ok((await readFile('dist/llms.txt','utf8')).includes(`${origin}/en/guide/`));
const productData=JSON.parse(portal.match(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)?.[1]||'null');
assert.ok(productData?.['@graph']?.some(node=>node['@type']==='SoftwareApplication'&&node.name==='HappyHands'),'Missing built product identity');

// Verify the query-routed resource output, not the removed generic shell path.
const rewrites=JSON.parse(await readFile('vercel.json','utf8')).rewrites;
const resourceSitemap=await readFile('dist/resource-sitemap.xml','utf8');
const resourceUrls=[...resourceSitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>match[1].replaceAll('&amp;','&'));
assert.ok(resourceUrls.length>0,'Missing resource sitemap URLs');
assert.equal(resourceUrls.length,new Set(resourceUrls).size,'Duplicate canonical resources');
for(const url of resourceUrls){
 const destination=resourceRewritePath(new URL(url),rewrites);
 assert.ok(destination,'Canonical resource must resolve through the deployment routing rules');
 const html=await readFile(`dist${destination}`,'utf8');
 assert.ok(html.includes(`rel="canonical" href="${url.replaceAll('&','&amp;')}"`),'Resource canonical mismatch: '+url);
 assert.ok(html.includes('id="resource-static"'),'Missing visible resource content: '+url);
}
assert.ok(robots.includes(`Sitemap: ${origin}/resource-sitemap.xml`));

console.log(JSON.stringify({status:'pass',kind:'built-artifact-contract',release,pages,resources:resourceUrls.length,limitations:['Does not prove deployment, accessibility, performance or visual acceptance.']},null,2));
