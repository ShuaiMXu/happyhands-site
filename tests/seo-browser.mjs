import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const base=process.env.SITE_URL||'http://127.0.0.1:4246';
await mkdir('test-results/seo',{recursive:true});
const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL||'chrome'});
const results=[];
try{
 if(process.argv.includes('--social-card')){
  const p=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
  await p.goto(base+'/scripts/social-card.html');await p.locator('img').evaluate(async img=>{await img.decode()});await p.evaluate(()=>document.fonts.ready);
  await p.screenshot({path:'public/brand/happyhands-social.png'});await p.close();
 }
 for(const lang of ['zh','en']){
  const route=lang==='zh'?'/guide/':'/en/guide/';
  const plain=await browser.newContext({javaScriptEnabled:false});const p=await plain.newPage();
  await p.goto(base+route);assert.equal(await p.locator('h1').count(),1);assert.equal(await p.locator('#faq h3').count(),7);
  assert.ok((await p.locator('main').innerText()).includes('pnpm workbench'));
  assert.equal(await p.locator('html').getAttribute('lang'),lang==='zh'?'zh-CN':'en');
  assert.equal(await p.locator('link[rel="canonical"]').getAttribute('href'),'https://happyhands.cc'+route);
  results.push({route,javaScript:false,content:true,faq:7});await plain.close();
  for(const width of [1280,390]){
   const context=await browser.newContext({viewport:{width,height:900},colorScheme:width===390?'dark':'light',reducedMotion:'reduce'});
   const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base+route);await page.locator('header[data-menu-ready]').waitFor();
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,route+' overflow');
   const graph=JSON.parse(await page.locator('#site-structured-data').textContent());
   assert.equal(graph['@graph'].find(x=>x['@type']==='FAQPage').inLanguage,lang==='zh'?'zh-CN':'en');
   await page.screenshot({path:`test-results/seo/viewport-${lang}-${width}.png`});
   const before=await page.locator('html').getAttribute('data-theme');await page.locator('#theme-toggle').click();
   assert.notEqual(await page.locator('html').getAttribute('data-theme'),before);
   if(width===390){await page.locator('.hh-site-menu-toggle').click();assert.equal(await page.locator('.hh-site-menu-toggle').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('.hh-site-menu-toggle').getAttribute('aria-expanded'),'false')}
   await page.screenshot({path:`test-results/seo/guide-${lang}-${width}.png`,fullPage:true});
   await page.locator('.guide-language').click();await page.waitForURL(base+(lang==='zh'?'/en/guide/':'/guide/'));
   assert.equal(await page.locator('html').getAttribute('lang'),lang==='zh'?'en':'zh-CN');assert.deepEqual(errors,[]);
   results.push({route,width,overflow:false,pageErrors:errors,themeToggle:true,languageLink:true});await context.close();
  }
 }
 const context=await browser.newContext({reducedMotion:'reduce'});
 await context.addInitScript(()=>{if(!localStorage.getItem('pd-lang'))localStorage.setItem('pd-lang','en')});
 const page=await context.newPage();await page.goto(base+'/apps/portal/');
 await page.waitForFunction(()=>document.documentElement.lang==='en');
 assert.ok((await page.title()).includes('AI Website Review'));
 const en=await page.locator('meta[name="description"]').getAttribute('content');
 await page.locator('#lang-switch button').click();await page.waitForFunction(()=>document.documentElement.lang==='zh-CN');
 assert.notEqual(await page.locator('meta[name="description"]').getAttribute('content'),en);
 assert.equal(await page.locator('meta[property="og:title"]').getAttribute('content'),await page.title());
 await page.goto(base+'/apps/studio/');await page.waitForFunction(()=>document.title.includes('主题工作室'));
 assert.equal(await page.locator('meta[property="og:title"]').getAttribute('content'),await page.title());
 results.push({sharedMetadata:'portal language change and Studio route',pass:true});await context.close();
 await writeFile('test-results/seo/browser.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
}finally{await browser.close()}
