import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {captureShuffleRandom} from '../apps/portal/hero-capture-seed.js';
import * as THREE from 'three';

// DOM/scheduler fixture: this verifies lifecycle and projection contracts, not GPU output.
function fixture({reduce = true, unavailable = false} = {}) {
  class Element extends EventTarget {
    constructor() { super(); this.children=[]; this.style={}; this.dataset={}; }
    appendChild(child) { this.children.push(child); child.parentElement=this; }
    get firstChild() { return this.children[0]; }
    remove() { this.parentElement.children=this.parentElement.children.filter(x=>x!==this); }
    closest() { return hero; }
    getBoundingClientRect() { return {left:0,top:0,width:1440,height:900}; }
  }
  const hero=new Element(), host=new Element(), mask=new Element(); mask.appendChild(host);
  const motion=new EventTarget(); motion.matches=reduce;
  const document=new EventTarget(); document.hidden=false; document.createElement=()=>new Element();
  const frames=new Map(), observers=[], renderCalls=[]; let clock=0, next=0, releases=0, lose;
  class Observer { constructor(callback){this.callback=callback;observers.push(this);} observe(){} disconnect(){this.disconnected=true;} }
  const window={scrollY:0,location:{search:'?hh-capture-seed=hero-20261112'}};
  const source=readFileSync(new URL('../apps/portal/whirl.js',import.meta.url),'utf8')
    .replace(/import \{captureShuffleRandom\} from .*?;\n/,'')
    .replace('export function startWhirl','function startWhirl')
    .replace('import.meta.env.DEV','true')
    .replace("import('./whirl-webgl.js')",'loadRenderer()');
  const context=vm.createContext({document,window,matchMedia:()=>motion,captureShuffleRandom,AbortController,
    performance:{now:()=>clock},IntersectionObserver:Observer,ResizeObserver:Observer,MutationObserver:Observer,
    requestAnimationFrame:fn=>{frames.set(++next,fn);return next;},cancelAnimationFrame:id=>frames.delete(id),
    loadRenderer:async()=>({createWhirlRenderer:(_host,_images,_widths,onLost)=>{
      if(unavailable) throw Error('Unavailable WebGL'); lose=onLost;
      return {render:positions=>{renderCalls.push(structuredClone(positions));return true;},resize(){},dispose(){releases++;}};
    }})});
  vm.runInContext(source,context);
  const images=JSON.parse(readFileSync(new URL('../apps/portal/hero-images.json',import.meta.url),'utf8'));
  const dispose=context.startWhirl(host,images);
  const advance=ms=>{clock+=ms; const pending=[...frames];frames.clear();for(const [,fn]of pending)fn(clock);};
  const preference=value=>{motion.matches=value;motion.dispatchEvent(new Event('change'));};
  return {host,frames,observers,renderCalls,document,window,dispose,advance,preference,lose:()=>lose(),releases:()=>releases};
}
const flush=()=>new Promise(resolve=>setImmediate(resolve));

test('seeded static fallback preserves all covers, widths, tangent pose and freezes without scheduling',()=>{
  const f=fixture(), second=fixture();
  const tiles=f.host.firstChild.children;
  assert.equal(tiles.length,189);
  assert.equal(new Set(tiles.map(tile=>tile.firstChild.src)).size,189);
  assert.deepEqual(tiles.map(tile=>tile.firstChild.src),second.host.firstChild.children.map(tile=>tile.firstChild.src));
  tiles.slice(0,3).forEach((tile,index)=>assert.ok(Math.abs(parseFloat(tile.style.width)-[4.8,4.72,3.4][index])<1e-10));
  assert.match(tiles[1].style.transform,/rotate\(.+rad\) scale\(/);
  assert.equal(f.frames.size,0);
  const before=JSON.stringify(tiles.map(tile=>tile.style)); f.advance(1000);
  assert.equal(JSON.stringify(tiles.map(tile=>tile.style)),before);
  f.dispose();second.dispose();assert.equal(f.host.children.length,0);
  assert.ok(f.observers.every(observer=>observer.disconnected));
});

test('motion stops on scroll exit, document hiding and reduced motion, and resumes only when allowed',async()=>{
  const f=fixture({reduce:false});await flush();f.advance(100);
  assert.ok(f.renderCalls.length>0);assert.equal(f.host.firstChild.hidden,true);
  f.host.style.opacity='0.0000';f.observers[1].callback();
  const count=f.renderCalls.length;f.advance(500);assert.equal(f.renderCalls.length,count);assert.equal(f.frames.size,0);
  f.host.style.opacity='1.0000';f.observers[1].callback();f.advance(100);assert.ok(f.renderCalls.length>count);
  f.document.hidden=true;f.document.dispatchEvent(new Event('visibilitychange'));assert.equal(f.frames.size,0);
  f.document.hidden=false;f.document.dispatchEvent(new Event('visibilitychange'));f.advance(100);
  f.preference(true);assert.equal(f.frames.size,0);assert.equal(f.host.firstChild.hidden,false);
  assert.equal(f.releases(),1);
  const snapshot=JSON.stringify(f.host.firstChild.children.map(tile=>tile.style));f.advance(500);
  assert.equal(JSON.stringify(f.host.firstChild.children.map(tile=>tile.style)),snapshot);
  f.preference(false);await flush();f.advance(100);assert.equal(f.host.firstChild.hidden,true);
  f.dispose();assert.equal(f.frames.size,0);assert.equal(f.releases(),2);
});

test('unavailable and lost WebGL retain a static populated fallback',async()=>{
  for(const unavailable of [true,false]) {
    const f=fixture({reduce:false,unavailable});await flush();f.advance(100);
    if(!unavailable) f.lose();
    assert.equal(f.host.firstChild.hidden,false);assert.equal(f.host.dataset.whirlRenderer,'dom');
    assert.equal(f.host.firstChild.children.length,189);
    const snapshot=JSON.stringify(f.host.firstChild.children.map(tile=>tile.style));f.advance(1000);
    assert.equal(JSON.stringify(f.host.firstChild.children.map(tile=>tile.style)),snapshot);
    assert.equal(f.frames.size,0);f.dispose();
  }
});

test('actual renderer preserves projected cover centers and widths after its opening at both viewports',()=>{
  const source=readFileSync(new URL('../apps/portal/whirl-webgl.js',import.meta.url),'utf8')
    .replace(/import .*? from 'three';/, '').replace('export function createWhirlRenderer','function createWhirlRenderer');
  for(const [width,height]of [[1728,900],[468,844]]) {
    let clock=0, captured;
    const canvas=()=>Object.assign(new EventTarget(),{style:{},setAttribute(){},remove(){},getContext:()=>({beginPath(){},roundRect(){},clip(){},drawImage(){}})});
    class Renderer {
      constructor(){this.domElement=canvas();}
      setClearColor(){} setPixelRatio(){} setSize(){} dispose(){} forceContextLoss(){}
      render(scene,camera){scene.updateMatrixWorld(true);camera.updateMatrixWorld(true);captured={scene,camera};}
    }
    const context=vm.createContext({...THREE,WebGLRenderer:Renderer,document:{createElement:canvas},window:{devicePixelRatio:1},performance:{now:()=>clock}});
    vm.runInContext(source,context);
    const host={parentElement:{clientWidth:width,clientHeight:height},offsetWidth:2000,append(){}};
    const renderer=context.createWhirlRenderer(host,[0,1,2].map(()=>({complete:true,naturalWidth:800,naturalHeight:500})),[120,118,85],()=>{});
    for(const scale of [.1,.3,.65,1]) {
      const positions=[0,1,2].map(()=>({x:430,y:-270,scale,angle:0,opacity:1}));
      renderer.render(positions,{x:0,y:0});clock+=1000;renderer.render(positions,{x:0,y:0});
      captured.scene.children.forEach((mesh,index)=>{
        const center=mesh.localToWorld(new THREE.Vector3()).project(captured.camera);
        const edge=mesh.localToWorld(new THREE.Vector3(.5,0,0)).project(captured.camera);
        assert.ok(Math.abs(center.x*width/2-430*.8)<1e-8);
        assert.ok(Math.abs(-center.y*height/2+270*.8)<1e-8);
        assert.ok(Math.abs((edge.x-center.x)*width-[120,118,85][index]*scale*.8)<1e-8);
      });
    }
    renderer.dispose();
  }
});
