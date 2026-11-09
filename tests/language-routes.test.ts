import test from 'node:test';import assert from 'node:assert/strict';
import {languagePath,hasLanguageRoute} from '../packages/ui/language-route';
import {seoData,seoHead} from '../packages/ui/site-seo';
import {resourceSeoData,systemSeo} from '../packages/ui/resource-seo';
test('owned English routes have distinct canonicals and reciprocal language alternates',()=>{
 for(const key of ['portal','components','quartz','lime'] as const){const zh=seoData(key,'zh'),en=seoData(key,'en');assert.notEqual(zh.url,en.url);assert.ok(en.url.includes('/en/'));assert.match(seoHead(key,'en'),/hreflang="zh-CN"/);assert.match(seoHead(key,'zh'),/hreflang="en"/);}
 const data=systemSeo({id:'quartz',name:'Quartz',summary:'Reference'});assert.ok(resourceSeoData(data,'en').url.includes('/en/components/?provider=systems'));
 assert.equal(languagePath('/en/components/','zh'),'/components/');assert.equal(languagePath('/components/','en'),'/en/components/');assert.ok(!hasLanguageRoute('/systems/quartz/components/button.md'));
});
