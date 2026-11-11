import test from 'node:test';
import assert from 'node:assert/strict';
import {setupHeaderMaterial} from '../packages/ui/header-material.js';

function browserFixture(t,vendor=""){
 class Element {
  constructor(tag='header'){this.tag=tag;this.children=[];this.attrs={};this.dataset={};this.width=1280;this.height=64;this.className='';this.values=new Map();this.style={setProperty:(k,v)=>this.values.set(k,v),removeProperty:k=>this.values.delete(k)};this.classList={add:n=>this.className+=' '+n,contains:n=>this.className.split(' ').includes(n)};}
  closest(){return this.embedded?{}:null;}
  append(...children){for(const child of children){child.parent=this;this.children.push(child);}}
  prepend(child){child.parent=this;this.children.unshift(child);}
  remove(){if(this.parent)this.parent.children=this.parent.children.filter(child=>child!==this);}
  setAttribute(key,value){this.attrs[key]=value;}
  getBoundingClientRect(){return {width:this.width,height:this.height};}
 }
 const body=new Element('body'),root=new Element('html'),frames=new Map(),observers=[],maps=[];let next=0;
 const globals={
  navigator:{vendor},
  document:{body,documentElement:root,createElementNS:(_,tag)=>new Element(tag),createElement:tag=>tag==='canvas'?{getContext:()=>({createImageData:(width,height)=>({width,height,data:new Uint8ClampedArray(width*height*4)}),putImageData:map=>maps.push(map)}),toDataURL:()=>`data:image/png;base64,fixture-${next}`} :new Element(tag)},
  getComputedStyle:node=>({position:node.position||'sticky',borderRadius:'0'}),
  requestAnimationFrame:callback=>{frames.set(++next,callback);return next;},cancelAnimationFrame:id=>frames.delete(id),
  ResizeObserver:class {constructor(callback){this.callback=callback;observers.push(this);}observe(){this.callback();}disconnect(){this.disconnected=true;}}
 };
 const prior=Object.fromEntries(Object.keys(globals).map(key=>[key,Object.getOwnPropertyDescriptor(globalThis,key)]));
 for(const [key,value] of Object.entries(globals))Object.defineProperty(globalThis,key,{value,configurable:true,writable:true});
 t.after(()=>{for(const [key,value]of Object.entries(prior)){if(value)Object.defineProperty(globalThis,key,value);else delete globalThis[key];}});
 const flush=()=>{for(const [id,callback]of frames){frames.delete(id);callback();}};
 return {Element,body,root,observers,frames,maps,flush};
}

test('one lens per header survives repeated setup and resizing, with complete cleanup',t=>{
 const f=browserFixture(t),header=new f.Element();
 const dispose=setupHeaderMaterial({targets:[header]});
 const repeated=setupHeaderMaterial({targets:[header]});f.flush();
 assert.equal(header.children.length,1);assert.equal(f.body.children.length,1);
 const surface=header.children[0],filter=f.body.children[0].children[0];
 assert.ok(Object.hasOwn(surface.dataset,'refraction'));
 assert.match(surface.values.get('--glass-lens'),/url\("#hh-glass-lens-/);
 const bends=filter.children.filter(node=>node.tag==='feDisplacementMap');
 assert.deepEqual(bends.map(node=>Number(node.attrs.scale)),[64,60,56]);
 header.width=390;f.observers[0].callback();f.flush();
 assert.deepEqual(bends.map(node=>Number(node.attrs.scale)),[44.8,42,39.199999999999996]);
 repeated();assert.equal(header.children.length,1,'a duplicate caller does not own the original lens');
 f.observers[0].callback();dispose();f.flush();
 assert.equal(header.children.length,0);assert.equal(f.body.children.length,0);assert.equal(f.frames.size,0);
 assert.ok(f.observers[0].disconnected);assert.equal(f.root.values.has('--hh-sticky-header-offset'),false);
 const remount=setupHeaderMaterial({targets:[header]});f.flush();assert.equal(header.children.length,1);remount();
});

test('separate owners use unique filter IDs and leave other headers intact',t=>{
 const f=browserFixture(t),first=new f.Element(),second=new f.Element();second.position='relative';
 const disposeFirst=setupHeaderMaterial({targets:[first]}),disposeSecond=setupHeaderMaterial({targets:[second]});f.flush();
 const ids=f.body.children.map(defs=>defs.children[0].id);assert.equal(new Set(ids).size,2);
 disposeFirst();assert.equal(second.children.length,1);assert.equal(f.body.children.length,1);disposeSecond();
});

test('embedded tools create no hidden duplicate surface or observer',t=>{
 const f=browserFixture(t),header=new f.Element();header.embedded=true;
 setupHeaderMaterial({targets:[header]})();
 assert.equal(header.children.length,0);assert.equal(f.body.children.length,0);assert.equal(f.observers.length,0);
});

test('lens neutralizes both fixed side edges while preserving center refraction',t=>{
 const f=browserFixture(t);
 const header=new f.Element();
 const dispose=setupHeaderMaterial({targets:[header]});
 try {
  for(const width of [390,689,1440]){
   header.width=width;
   f.observers[0].callback();
   f.flush();
   const map=f.maps.at(-1);
   const channels=(x,y)=>Array.from(map.data.slice((y*map.width+x)*4,(y*map.width+x)*4+2));
   for(const y of [0,Math.floor(map.height/2),map.height-1]){
    assert.deepEqual(channels(0,y),[128,128]);
    assert.deepEqual(channels(map.width-1,y),[128,128]);
   }
   const center=Math.floor(map.width/2);
   assert.ok(channels(center,0)[1]<75,'the center of the upper bevel still refracts');
   assert.ok(channels(center,map.height-1)[1]>180,'the center of the lower bevel still refracts');
  }
 } finally {
  dispose();
 }
});

test('Safari uses clear CSS glass without generating an unsupported displacement map',t=>{
 const f=browserFixture(t,'Apple Computer, Inc.');
 const header=new f.Element();
 header.className='portal-glass-header';
 const dispose=setupHeaderMaterial({targets:[header]});
 try {
  f.flush();
  assert.ok(Object.hasOwn(header.children[0].dataset,'clearGlass'));
  assert.equal(Object.hasOwn(header.children[0].dataset,'refraction'),false);
  assert.equal(f.maps.length,0);
  assert.equal(f.root.values.get('--portal-header-height'),'64px');
 } finally {
  dispose();
 }
});
