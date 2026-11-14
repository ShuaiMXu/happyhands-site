// Read-only production check. Reachability does not prove Google indexing.
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
const origin='https://happyhands.cc';

export function assertSearchContent(url,html){
 const path=new URL(url).pathname;
 // Do not mistake metadata or client-side script strings for crawlable content.
 const body=(html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1]||'')
  .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,'');
 if(path==='/apps/portal/'||path==='/en/apps/portal/'){
  assert.match(body,/id=["']design-resources["']/,'Missing prerendered resource feed');
  const prefix=path.startsWith('/en/')?'/en':'';
  const guides=body.match(/<section class="workflow-links"[\s\S]*?<\/section>/)?.[0]||'';
  assert.match(guides,prefix?/<h2\b[^>]*>Guides<\/h2>/:/<h2\b[^>]*>使用指南<\/h2>/,'Missing prerendered workflow introduction');
  assert.ok(body.includes('HappyHands'),'Missing visible product identity');
  const local=prefix?'Review and code changes run locally.':'审查与代码修改在本地执行';
  const judgment=prefix?'You decide which changes to accept or reject.':'由你决定接受或拒绝修改';
  assert.ok(guides.includes(local)&&guides.includes(judgment),'Missing visible local execution and human judgment scope');
  for(const target of ['/guide/','/ai-website-design/','/ai-ui-review/','/ai-ui-review/#ai-slop'])
   assert.ok(guides.includes(`href="${prefix}${target}"`),`Missing crawlable workflow link: ${target}`);
 }
 if(['/guide/','/en/guide/'].includes(path)){
  assert.ok(body.includes('pnpm workbench')&&body.includes('.harness/'),'Missing prerendered setup guide');
 }
 if(['/nonprofit-website-design/','/en/nonprofit-website-design/','/ai-ui-review/','/en/ai-ui-review/','/ai-website-design/','/en/ai-website-design/'].includes(path)){
  assert.match(body,/<h1\b[^>]*>[^<]+<\/h1>/,'Missing prerendered workflow heading');
  assert.ok(body.includes('Codex CLI')&&body.includes('v1.0.0')&&body.includes('.harness/'),'Missing prerendered workflow content');
 }
}

export async function checkSearchDiscovery(){
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
  assertSearchContent(url,text);
  if(new URL(url).pathname==='/apps/portal/'){
   const schemas=[...text.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
   assert.ok(schemas.some(s=>s['@graph']?.some(n=>n['@type']==='SoftwareApplication'&&n.name==='HappyHands')),'Product structured data not deployed');
  }
  pages.push({url,status:response.status});
 }
 return {pages,limitations:['Does not prove indexing, ranking, Googlebot access or all robots.txt semantics. Confirm in Search Console.']};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 console.log(JSON.stringify(await checkSearchDiscovery(),null,2));
}
