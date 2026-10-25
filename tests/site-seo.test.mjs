import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {portalContent} from '../apps/portal/render-content.js';
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
  assert.equal((sitemap.match(/<loc>/g)||[]).length,paths.length);
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
  assert.ok(zh.includes('常见问题'));assert.ok(zh.includes('人工接受仍待记录'));
  assert.ok(en.includes('Frequently asked questions'));assert.ok(en.includes('human acceptance is pending'));
});
