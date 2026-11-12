// Source-bound specialist producer. A passing result supplements independent visual QA.
import {chromium} from 'playwright-core';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {parseArgs} from 'node:util';
import {normalizeHeroContexts,heroFrameNames} from './helpers/hero-motion-contexts.mjs';

const {values}=parseArgs({options:{url:{type:'string'},out:{type:'string'},context:{type:'string'},contexts:{type:'string'}}});
if(values.context&&values.contexts)throw Error('Use the bound verification context or an explicit context declaration, not both.');
const base=values.url||process.env.SITE_URL||'http://127.0.0.1:4212/apps/portal/';
const supplied=values.context||values.contexts;
const scope=supplied?JSON.parse(await readFile(supplied,'utf8')):[
  {stateId:'hero-dark',configurationId:'desktop',width:1440,height:900,url:new URL('/apps/portal/',base).href,theme:'dark'},
  {stateId:'hero-light',configurationId:'desktop',width:1440,height:900,url:new URL('/apps/portal/',base).href,theme:'light'},
  {stateId:'hero-dark',configurationId:'phone',width:390,height:844,url:new URL('/en/apps/portal/',base).href,theme:'dark'},
  {stateId:'hero-light',configurationId:'phone',width:390,height:844,url:new URL('/en/apps/portal/',base).href,theme:'light'}
];
const contexts=normalizeHeroContexts(scope,base),names=heroFrameNames(contexts.length);
const output=values.out||'test-results/homepage-motion';
await mkdir(output,{recursive:true});
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const route=value=>{const url=new URL(value);return url.pathname.replace(/\/+$/,'')+url.search+url.hash;};
const result={status:'needs-evidence',heroMotion:{version:1,contexts:[]},checks:[],frames:[],limitations:[
  'Chrome viewports and emulated preferences. Draw counts, frame changes and recorded interactions do not rate visual quality or prove every other browser/device.',
  'Pointer events are exercised and motion frames inspected; causal pointer parallax and the source/material/perspective still need independent source and original-image review.',
  'The original covers may be randomized by the page. This producer never substitutes media, and does not treat a different cover as an improvement.'
]};
let browser,nextFrame=0;
async function frame(page,role,context){
  const name=names[nextFrame++];
  if(!name)throw Error('Specialist image budget exceeded. Split the actual run rather than dropping evidence.');
  const bytes=await page.screenshot({path:join(output,name),fullPage:false});
  result.frames.push({name,index:nextFrame-1,role,sha256:sha(bytes),stateId:context.stateId,configurationId:context.configurationId,width:context.width,height:context.height});
  return nextFrame-1;
}
async function sample(page){return page.evaluate(()=>({...window.__hhHeroProbe,timeMs:Math.round(performance.now())}));}
async function open(context,{reducedMotion='no-preference',noWebGL=false}={}){
  const page=await browser.newPage({viewport:{width:context.width,height:context.height},deviceScaleFactor:1,reducedMotion});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.addInitScript(({lang,theme,noWebGL})=>{
    if(window!==window.top)return;
    localStorage.setItem('pd-lang',lang);localStorage.setItem('hh-theme',theme);
    window.__hhHeroProbe={draws:0,firstDrawAt:null,pointer:null};
    document.addEventListener('pointermove',event=>{if(event.target.closest?.('.hero'))window.__hhHeroProbe.pointer={x:event.clientX,y:event.clientY,type:event.pointerType};});
    const original=HTMLCanvasElement.prototype.getContext,seen=new WeakSet();
    HTMLCanvasElement.prototype.getContext=function(type,...args){
      if(noWebGL&&(type==='webgl2'||type==='webgl'||type==='experimental-webgl'))return null;
      const ctx=original.call(this,type,...args);
      if((type==='webgl2'||type==='webgl')&&ctx&&!seen.has(ctx)){
        seen.add(ctx);for(const method of ['drawArrays','drawElements']){
          const draw=ctx[method].bind(ctx),canvas=this;
          ctx[method]=(...params)=>{if(canvas.classList.contains('pd-whirl-canvas')){const probe=window.__hhHeroProbe;probe.draws++;probe.firstDrawAt??=performance.now();}return draw(...params);};
        }
      }
      return ctx;
    };
  },{lang:context.lang,theme:context.theme,noWebGL});
  const response=await page.goto(context.url,{waitUntil:'domcontentloaded',timeout:20000});
  if(!response||response.status()>=400)throw Error(`Homepage returned HTTP ${response?.status()??'no response'}.`);
  await page.locator('.hero h1').waitFor();await page.evaluate(()=>document.fonts.ready);
  if(route(page.url())!==route(context.url))throw Error('Homepage changed away from the bound route.');
  if(await page.locator('html').getAttribute('data-theme')!==context.theme)throw Error('Homepage theme does not match the captured context.');
  return {page,errors};
}
async function layout(page){
  return page.evaluate(()=>{
    const mark=document.querySelector('.core-mark'),pseudo=mark&&getComputedStyle(mark,'::before');
    const buttons=[document.querySelector('#copy-agent'),document.querySelector('.hero-actions a')];
    return {singleMark:Boolean(mark&&mark.querySelectorAll('img').length===1&&(!pseudo||pseudo.content==='none'||pseudo.display==='none')),
      overflow:document.documentElement.scrollWidth>innerWidth,
      actionsVisible:buttons.every(button=>{if(!button)return false;const r=button.getBoundingClientRect();return r.width>0&&r.height>0&&r.top>=0&&r.bottom<=innerHeight;}),
      coverCount:document.querySelectorAll('.pd-whirl-tile').length};
  });
}
async function fallback(page){
  await page.waitForFunction(()=>{
    const canvas=document.querySelector('.pd-whirl-canvas');
    const dom=[...document.querySelectorAll('.pd-whirl-tile:not([hidden]) img')].some(img=>img.complete&&img.naturalWidth>0&&img.getBoundingClientRect().width>0);
    return (!canvas||canvas.hidden||getComputedStyle(canvas).display==='none')&&dom;
  },undefined,{timeout:5000});
}
try{
  browser=await chromium.launch({channel:'chrome',headless:true});
  // Capture every declared normal context before supplemental preference/fallback work.
  for(const context of contexts){
    const {page,errors}=await open(context);
    try{
      let active=true;
      try{await page.waitForFunction(()=>window.__hhHeroProbe.draws>0,undefined,{timeout:5000});}catch{active=false;}
      const first=await sample(page),firstIndex=await frame(page,'motion-start',context);
      const firstCanvas=active?sha(await page.locator('.pd-whirl-canvas').screenshot()):null;
      await page.mouse.move(Math.round(context.width*.7),Math.round(context.height*.3));
      await page.waitForTimeout(650);
      const second=await sample(page),secondIndex=await frame(page,'motion-after-pointer',context);
      const secondCanvas=active?sha(await page.locator('.pd-whirl-canvas').screenshot()):null;
      const geometry=await layout(page);
      const motionObserved=active&&second.draws>first.draws&&firstCanvas!==secondCanvas;
      const item={stateId:context.stateId,configurationId:context.configurationId,width:context.width,height:context.height,theme:context.theme,lang:context.lang,
        motionObserved,frameIndexes:[firstIndex,secondIndex],samples:[first,second],canvasChanged:active&&firstCanvas!==secondCanvas,openingSampled:active&&first.timeMs-first.firstDrawAt<2200,
        pointerEventObserved:Boolean(second.pointer),layout:geometry,errors};
      result.heroMotion.contexts.push(item);
      if(active){
        await page.evaluate(()=>window.scrollTo({top:document.querySelector('.hero-scroll-stage').offsetHeight+100,behavior:'instant'}));
        await page.waitForFunction(()=>document.querySelector('.hero-whirl-host').style.opacity==='0');
        await page.waitForTimeout(120);const paused=await sample(page);await page.waitForTimeout(160);const later=await sample(page);
        await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
        await page.waitForFunction(previous=>window.__hhHeroProbe.draws>previous,later.draws,{timeout:5000});
        item.scroll={paused:paused.draws===later.draws,resumed:(await sample(page)).draws>later.draws,samples:[paused,later,await sample(page)]};
      }else item.scroll={paused:false,resumed:false,reason:'No WebGL motion to verify.'};
      result.checks.push({name:'normal-context',stateId:context.stateId,configurationId:context.configurationId,
        status:motionObserved&&item.openingSampled&&item.pointerEventObserved&&item.scroll.paused&&item.scroll.resumed&&geometry.singleMark&&!geometry.overflow&&geometry.actionsVisible&&geometry.coverCount>0&&!errors.length?'pass':'needs-evidence'});
    }finally{await page.close();}
  }
  const desktop=contexts.reduce((a,b)=>a.width>b.width?a:b),phone=contexts.reduce((a,b)=>a.width<b.width?a:b);
  // 1. A live preference change must stop the cover motion, preserving fallback artwork.
  {
    const {page,errors}=await open(phone);
    try{
      await page.emulateMedia({reducedMotion:'reduce'});await fallback(page);
      const tile=page.locator('.pd-whirl-tile:not([hidden])').first(),before=await tile.getAttribute('style');await page.waitForTimeout(160);
      const still=before===await tile.getAttribute('style');await frame(page,'reduced-motion-static',phone);
      result.checks.push({name:'reduced-motion-change',status:still&&!errors.length?'pass':'fail',still,errors});
    }finally{await page.close();}
  }
  // 2. Devices without WebGL retain real covers and a usable primary action.
  {
    const {page,errors}=await open(phone,{noWebGL:true});
    try{await fallback(page);await frame(page,'webgl-unavailable-fallback',phone);const geometry=await layout(page);
      result.checks.push({name:'webgl-unavailable',status:geometry.actionsVisible&&!geometry.overflow&&!errors.length?'pass':'fail',layout:geometry,errors});
    }finally{await page.close();}
  }
  // 3. Real context loss must recover rather than leaving an empty canvas.
  {
    const {page,errors}=await open(desktop);let lost=false;
    try{
      try{await page.waitForFunction(()=>window.__hhHeroProbe.draws>0,undefined,{timeout:5000});
        lost=await page.locator('.pd-whirl-canvas').evaluate(canvas=>{const gl=canvas.getContext('webgl2'),ext=gl?.getExtension('WEBGL_lose_context');if(!ext)return false;ext.loseContext();return true;});
        if(lost)await fallback(page);
      }catch{}
      await frame(page,'context-loss-fallback',desktop);
      result.checks.push({name:'context-loss',status:lost&&!errors.length?'pass':'needs-evidence',contextLost:lost,errors});
    }finally{await page.close();}
  }
  // 4. The actual language control must navigate, with a working Hero after reload.
  {
    const {page,errors}=await open(phone);
    try{
      const next=phone.lang==='zh'?'en':'zh';await page.locator('#lang-switch a').click();
      await page.waitForURL(url=>next==='en'?url.pathname.startsWith('/en/'):!url.pathname.startsWith('/en/'));
      await page.locator('.hero h1').waitFor();await page.evaluate(()=>document.fonts.ready);
      await frame(page,'language-switch',phone);const geometry=await layout(page);
      result.checks.push({name:'language-switch',status:geometry.actionsVisible&&!geometry.overflow&&!errors.length?'pass':'fail',language:next,finalUrl:page.url(),layout:geometry,errors});
    }finally{await page.close();}
  }
  result.status=result.checks.some(check=>check.status==='fail')?'fail':result.checks.every(check=>check.status==='pass')?'pass':'needs-evidence';
}catch(error){
  result.status='needs-evidence';result.error=error.message;process.exitCode=1;
}finally{
  await browser?.close();
  await writeFile(join(output,'result.json'),JSON.stringify(result,null,2)+'\n');
}
console.log(JSON.stringify({status:result.status,contexts:result.heroMotion.contexts.length,frames:result.frames.length,output}));
