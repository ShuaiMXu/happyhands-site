import test from 'node:test';import assert from 'node:assert/strict';
import {languagePath,hasLanguageRoute} from '../packages/ui/language-route';
import {seoData,seoHead} from '../packages/ui/site-seo';
import {resourceSeoData,systemSeo} from '../packages/ui/resource-seo';
test('owned English routes have distinct canonicals and reciprocal language alternates',()=>{
 for(const key of ['portal','components','quartz','lime'] as const){const zh=seoData(key,'zh'),en=seoData(key,'en');assert.notEqual(zh.url,en.url);assert.ok(en.url.includes('/en/'));assert.match(seoHead(key,'en'),/hreflang="zh-CN"/);assert.match(seoHead(key,'zh'),/hreflang="en"/);}
 const data=systemSeo({id:'quartz',name:'Quartz',summary:'Reference'});assert.ok(resourceSeoData(data,'en').url.includes('/en/components/?provider=systems'));
 assert.equal(languagePath('/en/components/','zh'),'/components/');assert.equal(languagePath('/components/','en'),'/en/components/');assert.ok(!hasLanguageRoute('/systems/quartz/components/button.md'));
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
