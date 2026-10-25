import { chromium } from 'playwright-core';
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import assert from 'node:assert/strict';

const assets = join(process.cwd(), 'dist/assets');
const scripts = await readdir(assets);
let analyticsAsset;
for (const name of scripts.filter(name => name.endsWith('.js'))) {
  if ((await readFile(join(assets,name),'utf8')).includes('/_vercel/insights/script.js')) { analyticsAsset=name; break; }
}
assert.ok(analyticsAsset,'Analytics must be compiled into the production assets');
for (const page of ['apps/portal','apps/studio','components','systems/happyhands','systems/quartz','systems/lime']) {
  const html=await readFile(`dist/${page}/index.html`,'utf8');
  assert.ok(!html.includes('/packages/ui/site-analytics.ts'),'Do not leave an unbundled TypeScript URL in production');
}
const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL||'chrome'});
const results=[];
try {
  for (const scenario of [
    {name:'production',url:'https://happyhands.cc/apps/studio/?project=private-name&token=secret#draft',enabled:true},
    {name:'preview',url:'https://preview-shakaka.vercel.app/apps/portal/',enabled:false},
    {name:'localhost',url:'http://127.0.0.1:4246/apps/portal/',enabled:false},
    {name:'historical',url:'https://happyhands.cc/runs/private-id/',enabled:false},
    {name:'dnt',url:'https://happyhands.cc/apps/portal/',enabled:false,dnt:true},
    {name:'gpc',url:'https://happyhands.cc/apps/portal/',enabled:false,gpc:true},
  ]) {
    const context=await browser.newContext();
    if(scenario.dnt)await context.addInitScript(()=>Object.defineProperty(navigator,'doNotTrack',{value:'1'}));
    if(scenario.gpc)await context.addInitScript(()=>Object.defineProperty(navigator,'globalPrivacyControl',{value:true}));
    let scriptRequests=0;const payloads=[];
    // Every request is handled locally. Synthetic events never reach Vercel.
    await context.route('**/*',async route=>{
      const request=route.request(),url=new URL(request.url());
      if(url.pathname==='/_vercel/insights/script.js') {
        scriptRequests++;
        return route.fulfill({contentType:'application/javascript',body:`
          const filter=window.vaq.find(item=>item[0]==='beforeSend')[1];
          window.analyticsTestSend=url=>{const event=filter({type:'pageview',url});if(event)fetch('/_vercel/insights/view',{method:'POST',body:JSON.stringify(event)})};
          window.analyticsTestSend(location.href);
        `});
      }
      if(url.pathname==='/_vercel/insights/view') {payloads.push(request.postDataJSON());return route.fulfill({status:200,body:'{}'});}
      if(url.pathname.startsWith('/assets/'))return route.fulfill({contentType:'application/javascript',body:await readFile(join(assets,url.pathname.split('/').pop()))});
      if(request.isNavigationRequest())return route.fulfill({contentType:'text/html',body:`<!doctype html><html><head><script type="module" src="/assets/${analyticsAsset}"></script></head><body>Analytics verification fixture</body></html>`});
      return route.abort();
    });
    const page=await context.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
    await page.goto(scenario.url);await page.waitForLoadState('networkidle');
    assert.equal(scriptRequests,scenario.enabled?1:0,scenario.name);
    if(scenario.enabled) {
      assert.deepEqual(payloads,[{type:'pageview',url:'https://happyhands.cc/apps/studio/'}]);
      await page.evaluate(()=>window.analyticsTestSend('https://happyhands.cc/apps/studio/?project=another-secret'));
      assert.equal(payloads.length,1,'Project switches must not add duplicate views');
    }else assert.equal(payloads.length,0);
    assert.deepEqual(errors,[]);
    results.push({scenario:scenario.name,scriptRequests,payloads,collectorMocked:true});await context.close();
  }
  await mkdir('test-results',{recursive:true});await writeFile('test-results/analytics-browser.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
}finally{await browser.close()}
