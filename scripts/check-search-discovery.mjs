// Read-only production check. Reachability does not prove Google indexing.
import assert from 'node:assert/strict';
const origin='https://happyhands.cc';
async function get(path){
 const response=await fetch(new URL(path,origin),{signal:AbortSignal.timeout(20000)});
 assert.equal(response.status,200,`${path}: HTTP ${response.status}`);
 assert.ok(!/noindex|none/i.test(response.headers.get('x-robots-tag')||''),`${path}: indexing blocked by header`);
 return {response,text:await response.text()};
}
const {text:robots}=await get('/robots.txt');
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`),'Missing sitemap discovery');
const {text:sitemap}=await get('/sitemap.xml');
const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.ok(urls.length>0,'Empty sitemap');
const pages=[];
for(const url of urls){
 assert.equal(new URL(url).origin,origin,'Unexpected sitemap host');
 const {response,text}=await get(url);
 assert.equal(response.url,url,'Sitemap URL redirects');
 assert.match(response.headers.get('content-type')||'',/text\/html/);
 assert.ok(!/<meta\b(?=[^>]*name=["'](?:robots|googlebot)["'])(?=[^>]*content=["'][^"']*(?:noindex|none))[^>]*>/i.test(text),`${url}: noindex meta`);
 assert.ok(text.replace(/\s+/g,' ').includes(`rel="canonical" href="${url}"`),`${url}: canonical mismatch`);
 assert.match(text,/<title>[^<]+<\/title>/);
 if(url.endsWith('/apps/portal/')){
  assert.ok(text.includes('pnpm workbench')&&text.includes('常见问题'),'Missing prerendered product content');
  const schemas=[...text.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
  assert.ok(schemas.some(s=>s['@graph']?.some(n=>n['@type']==='SoftwareApplication'&&n.name==='HappyHands')),'Product structured data not deployed');
 }
 pages.push({url,status:response.status});
}
console.log(JSON.stringify({pages,limitations:['Does not prove indexing, ranking, Googlebot access or all robots.txt semantics. Confirm in Search Console.']},null,2));
