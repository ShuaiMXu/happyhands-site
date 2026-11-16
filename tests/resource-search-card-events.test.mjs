import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';

// Dependency-free handler replay, not a React/DOM or browser test. Model the
// synchronous focus event that bubbles when Escape returns focus to the input.
const source=readFileSync(new URL('../components/ResourceSearchCard.tsx',import.meta.url),'utf8');
const body=source.match(/onKeyDown=\{e=>\{([\s\S]*?)\n \}\}>/)[1].replaceAll('<HTMLAnchorElement>','');
const handle=new Function('e','setOpen','input','root','expanded','query','results',body);
function fixture({query='Apple',results=[{id:'apple',label:'Apple HIG',href:'/apple'}],open=true,focused='result'}={}) {
  const state={query,results,open,focused,prevented:false,changes:0};
  const setOpen=value=>{state.open=value;};
  const input={current:{focus(){if(state.focused!=='input'){state.focused='input';setOpen(true);}}}};
  const root={current:{querySelector(){return state.results?.length ? {focus(){state.focused='result';setOpen(true);}} : null;}}};
  return {state,press(key,isComposing=false){state.prevented=false;handle({key,nativeEvent:{isComposing},target:state.focused==='input'?input.current:null,preventDefault(){state.prevented=true;}},setOpen,input,root,state.open&&!!state.query.trim()&&state.results!==undefined,state.query,state.results);}};
}
test('Escape from result returns focus, dismisses and preserves query/results',()=>{
 const f=fixture();const results=f.state.results;f.press('Escape');
 assert.equal(f.state.open,false);assert.equal(f.state.focused,'input');assert.equal(f.state.prevented,true);
 assert.equal(f.state.query,'Apple');assert.equal(f.state.results,results);
 f.press('Escape');assert.equal(f.state.open,false);
 f.press('ArrowDown');assert.equal(f.state.open,true);assert.equal(f.state.focused,'input');
 f.press('ArrowDown');assert.equal(f.state.focused,'result');
 f.press('Enter');assert.equal(f.state.prevented,false,'native link navigation remains available');
});
test('composition does not consume Escape or ArrowDown',()=>{
 const f=fixture();f.press('Escape',true);assert.equal(f.state.open,true);assert.equal(f.state.focused,'result');assert.equal(f.state.prevented,false);
 const input=fixture({focused:'input',open:false});input.press('ArrowDown',true);assert.equal(input.state.open,false);assert.equal(input.state.prevented,false);
});
test('empty suggestions reopen without moving focus; absent suggestions and blank query keep native arrows',()=>{
 const empty=fixture({results:[],focused:'input',open:false});empty.press('ArrowDown');assert.equal(empty.state.open,true);empty.press('ArrowDown');assert.equal(empty.state.focused,'input');
 for(const opts of [{query:' '},{results:undefined}]) {
  const f=fixture({focused:'input',open:false,...opts});
  if('results' in opts)f.state.results=undefined;
  f.press('ArrowDown');assert.equal(f.state.open,false);assert.equal(f.state.prevented,false);
 }
});
