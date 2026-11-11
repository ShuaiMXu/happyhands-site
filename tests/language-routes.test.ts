import test from 'node:test';import assert from 'node:assert/strict';
import {languagePath,hasLanguageRoute} from '../packages/ui/language-route';
import {seoData,seoHead} from '../packages/ui/site-seo';
import {resourceSeoData,systemSeo} from '../packages/ui/resource-seo';
import {mkdtemp,mkdir,readFile,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
test('owned English routes have distinct canonicals and reciprocal language alternates',()=>{
 for(const key of ['portal','components','quartz','lime'] as const){const zh=seoData(key,'zh'),en=seoData(key,'en');assert.notEqual(zh.url,en.url);assert.ok(en.url.includes('/en/'));assert.match(seoHead(key,'en'),/hreflang="zh-CN"/);assert.match(seoHead(key,'zh'),/hreflang="en"/);}
 const data=systemSeo({id:'quartz',name:'Quartz',summary:'Reference'});assert.ok(resourceSeoData(data,'en').url.includes('/en/components/?provider=systems'));
 assert.equal(languagePath('/en/components/','zh'),'/components/');assert.equal(languagePath('/components/','en'),'/en/components/');assert.ok(!hasLanguageRoute('/systems/quartz/components/button.md'));
});

test('English system builds use complete localized fallback content, not partial dictionary replacements',async()=>{
 const cwd=await mkdtemp(join(tmpdir(),'happyhands-language-pages-'));
 const write=async(path:string,text:string)=>{const file=join(cwd,path);await mkdir(dirname(file),{recursive:true});await writeFile(file,text);};
 const sources=new Map<string,string>();
 try {
  for(const key of ['quartz','lime','happyhands','components'] as const){
   const data=seoData(key,'zh');
   const html=`<html lang="zh-CN"><head>${seoHead(key,'zh')}</head><body><div id="root"><noscript><main><h1>${data.title}</h1><p>${data.description}</p><p>交互预览需要启用 JavaScript。<a href="/guide/">阅读使用指南</a></p><nav aria-label="设计资源"><a href="/components/">组件与参考</a></nav></main></noscript></div><script src="/assets/example.js"></script></body></html>`;
   const path=key==='components'?'resource-pages/en':`systems/${key}`;
   sources.set(path,html);await write(`dist/${path}/index.html`,html);
  }
  for(const key of ['glaze','sodium'])await write(`dist/systems/${key}/index.html`,'<html><head></head><body></body></html>');
  await write('public/design-how/catalog.json',JSON.stringify({systems:['glaze','sodium'].map(id=>({id,name:id,summary:'Source reference'}))}));
  await write('dist/sitemap.xml','<urlset></urlset>');
  execFileSync(process.execPath,['--import',fileURLToPath(import.meta.resolve('tsx')),fileURLToPath(new URL('../scripts/build-language-pages.mjs',import.meta.url))],{cwd,stdio:'pipe'});
  for(const key of ['quartz','lime'] as const){
   const html=await readFile(join(cwd,`dist/en/systems/${key}/index.html`),'utf8');
   const fallback=html.match(/<noscript>([\s\S]*?)<\/noscript>/)?.[1];
   assert.ok(fallback,`${key} fallback`);
   assert.equal(fallback.match(/<h1>(.*?)<\/h1>/)?.[1],seoData(key,'en').title);
   assert.ok(fallback.includes(seoData(key,'en').description));
   assert.doesNotMatch(fallback,/[\u3400-\u9fff]/);
   assert.match(fallback,/Interactive previews require JavaScript/);
   for(const path of ['guide','components','systems/happyhands','systems/quartz','systems/lime'])assert.ok(fallback.includes(`href="/en/${path}/"`),path);
   assert.ok(html.includes('src="/assets/example.js"'),'Preserve the interactive application');
   assert.equal(await readFile(join(cwd,`dist/systems/${key}/index.html`),'utf8'),sources.get(`systems/${key}`),'Do not rewrite the Chinese source');
  }
 } finally {await rm(cwd,{recursive:true,force:true});}
});


test('shared English navigation leaves explicit language-choice links untouched',async()=>{
 const previous={document:globalThis.document,location:globalThis.location};
 let handler:(event:unknown)=>void;
 Object.defineProperty(globalThis,'location',{value:new URL('https://happyhands.cc/en/apps/portal/'),configurable:true,writable:true});
 Object.defineProperty(globalThis,'document',{value:{addEventListener(type:string,callback:(event:unknown)=>void){if(type==='click')handler=callback;}},configurable:true,writable:true});
 try {
  await import('../packages/ui/site-preferences');
  for(const explicit of [true,false]){
   let href='/apps/portal/?q=example#design-resources';
   const link={hasAttribute:(name:string)=>explicit&&name==='hreflang',getAttribute:()=>href,setAttribute:(_name:string,value:string)=>{href=value;}};
   handler!({target:{closest:()=>link}});
   assert.equal(href,(explicit?'':'/en')+'/apps/portal/?q=example#design-resources');
  }
 } finally {
  for(const [key,value] of Object.entries(previous)){
   if(value===undefined)Reflect.deleteProperty(globalThis,key);else Object.defineProperty(globalThis,key,{value,configurable:true,writable:true});
  }
 }
});
