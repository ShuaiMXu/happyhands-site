import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {nonprofitContent,nonprofitCopy,nonprofitPath} from '../workflows/nonprofit.ts';
import {seoData,seoHead,seoPages} from '../packages/ui/site-seo.ts';
import {assertSearchContent} from '../scripts/check-search-discovery.mjs';
import {guideContent} from '../guide/content.ts';
for(const lang of ['zh','en']) test(`nonprofit ${lang}: crawlable distinct guide and truthful boundaries`,()=>{
 const key=lang==='en'?'nonprofitEn':'nonprofit',prefix=lang==='en'?'/en':'',html=nonprofitContent(lang),data=seoData(key),head=seoHead(key);
 assert.equal(data.lang,lang);assert.equal(data.url,'https://happyhands.cc'+prefix+nonprofitPath);
 assert.equal((html.match(/<h1>/g)||[]).length,1);assert.ok(html.includes(nonprofitCopy[lang].h1));
 assert.equal((html.match(/aria-current="page"/g)||[]).length,3);
 for(const id of ['scope','donation','volunteer','accessibility','evidence','workflow','next']){assert.ok(html.includes(`id="${id}"`));assert.ok(html.includes(`href="#${id}"`));}
 for(const path of ['/guide/#setup','/ai-ui-review/','/ai-website-design/'])assert.ok(html.includes(`href="${prefix}${path}"`));
 assert.ok(guideContent(lang).includes(`href="${prefix}${nonprofitPath}"`));
 for(const term of lang==='en'?['not a charity','not a case study','fictional data','does not guarantee','does not merge or deploy','Codex CLI']:['不是公益组织','不引用同名机构','虚构测试数据','不保证','不会自动合并或部署','Codex CLI'])assert.ok(html.includes(term),term);
 assert.ok(!html.includes('happyhands.org'));assert.ok(!html.includes('undefined'));assert.ok(!html.includes('·'));
 for(const url of [nonprofitPath,'/en'+nonprofitPath])assert.ok(head.includes(`href="https://happyhands.cc${url}"`));
 assert.ok(head.includes('hreflang="x-default"'));
 assertSearchContent(data.url,`<html><body>${html}</body></html>`);
 assert.throws(()=>assertSearchContent(data.url,`<html><head>${head}</head><body></body></html>`));
 const read=f=>readFileSync(new URL('../'+f,import.meta.url),'utf8');
 assert.ok(read('public/sitemap.xml').includes(`<loc>${data.url}</loc>`));
 assert.ok(read('vite.config.js').includes(`resolve('${seoPages[key].file}')`));
 assert.ok(read(seoPages[key].file).includes(`lang="${lang==='en'?'en':'zh-CN'}"`));
});
