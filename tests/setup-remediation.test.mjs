import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript-compiler';
import {assertSiteHandoff, localWorkbenchURL, decodeSiteHandoff} from '../packages/contracts/site-handoff.js';

// Adapted from the supplied, unaccepted prior-attempt test reference and rerun against this baseline.
// Source-level behavioral tests; this DOM/hook harness does not claim browser QA.
function formHarness(lang='zh', storageFails=false) {
  const storage=new Map();
  let nodes;
  function mount() {
    nodes=Object.fromEntries(['repo','task','sources','address','open','result','status'].map(name=>{
      let text='';
      return ['handoff-'+name, {value:name==='address'?'http://127.0.0.1:4190/apps/designer/':'',writes:0,clicks:0,listeners:{},
        get textContent(){return text}, set textContent(value){text=value;this.writes++},
        addEventListener(type,callback){this.listeners[type]=callback},removeAttribute(name){delete this[name]},setAttribute(name,value){this[name]=String(value)},getAttribute(name){return this[name]??null},hasAttribute(name){return this[name]!==undefined},click(){this.clicks++;this.listeners.click({preventDefault(){}})}}];
    }));
  }
  mount();
  const context={assertSiteHandoff,localWorkbenchURL,Error,TypeError,crypto,
    sessionStorage:{getItem:key=>storage.get(key)||null,setItem(key,value){if(storageFails)throw Error('storage unavailable');storage.set(key,value)}},
    document:{getElementById:id=>nodes[id]}};
  vm.createContext(context);
  vm.runInContext(fs.readFileSync('apps/portal/local-workbench.js','utf8').replace(/^import .*\n/,'').replaceAll('export function','function'),context);
  context.setupLocalWorkbench(lang);
  return {get nodes(){return nodes},storage,
    input(name,value){nodes['handoff-'+name].value=value;nodes['handoff-'+name].listeners.input()},
    click(){let prevented=false;nodes['handoff-open'].listeners.click({preventDefault(){prevented=true}});return prevented},
    remount(next){mount();context.setupLocalWorkbench(next)}};
}
for(const lang of ['zh','en']) test(`validation recovers with current errors and preserves draft (${lang})`,()=>{
  const f=formHarness(lang);
  f.input('repo','/Users/example/product');
  assert.equal(f.nodes['handoff-status'].textContent,'','no premature validation');
  f.input('repo','');assert.equal(f.click(),true);
  assert.equal(f.nodes['handoff-status'].textContent,lang==='zh'?'请填写项目文件夹。':'Enter the project folder.');
  f.input('repo','/Users/example/product');
  assert.equal(f.nodes['handoff-status'].textContent,lang==='zh'?'请填写希望改善的任务。':'Describe the task to improve.');
  const writes=f.nodes['handoff-status'].writes;
  f.input('repo','/Users/example/product-two');
  assert.equal(f.nodes['handoff-status'].writes,writes,'unchanged live-region message is not rewritten');
  assert.equal(f.nodes['handoff-open'].href,undefined);
  f.input('task','Review signup error recovery');
  assert.equal(f.nodes['handoff-status'].textContent,'');
  const link=f.nodes['handoff-open'].href;
  const payload=decodeSiteHandoff(new URL(link).hash.slice('#handoff='.length));
  assert.equal(payload.repo,'/Users/example/product-two');assert.equal(payload.task,'Review signup error recovery');
  f.input('task','Review signup error recovery');assert.equal(f.nodes['handoff-open'].href,link);
  f.input('sources','../invalid');assert.match(f.nodes['handoff-status'].textContent,/相对路径|relative paths/);
  f.input('sources','DESIGN.md\nsrc/styles/tokens.css');
  f.input('address','https://example.com/');assert.match(f.nodes['handoff-status'].textContent,/工作台地址|workbench address/);
  f.input('address','http://127.0.0.1:4190/apps/designer/');
  f.remount(lang==='zh'?'en':'zh');
  assert.equal(f.nodes['handoff-repo'].value,'/Users/example/product-two');
  assert.equal(f.nodes['handoff-task'].value,'Review signup error recovery');
  assert.equal(f.nodes['handoff-sources'].value,'DESIGN.md\nsrc/styles/tokens.css');
  assert.ok(f.nodes['handoff-open'].href);
});
test('draft survives a language remount even when storage fails',()=>{
  const f=formHarness('zh',true);f.input('repo','/repo');f.input('task','Keep input');f.remount('en');
  assert.equal(f.nodes['handoff-repo'].value,'/repo');assert.equal(f.nodes['handoff-task'].value,'Keep input');
});

function hooks() {
  let cursor=0,queued=[];const slots=[];
  const api={
    useState(init){const i=cursor++;if(!(i in slots))slots[i]=typeof init==='function'?init():init;return [slots[i],v=>{slots[i]=typeof v==='function'?v(slots[i]):v}]},
    useRef(init){const i=cursor++;return slots[i] ||= {current:init}},
    useEffect(callback,deps){const i=cursor++;if(!slots[i]||deps.some((d,j)=>d!==slots[i].deps[j])){queued.push(()=>{slots[i]?.cleanup?.();slots[i]={deps,cleanup:callback()}})}},
    createElement(type,props,...children){return {type,props:{...props,children}}},Fragment:'fragment'
  };
  return {api,slots,render(fn){cursor=0;return fn()},flush(){const work=queued;queued=[];work.forEach(f=>f())},dispose(){slots.forEach(s=>s?.cleanup?.())}};
}
function loadTS(path,context,imports) {
  context.exports={};context.require=name=>{assert.ok(name in imports,`unexpected import ${name}`);return imports[name]};
  vm.createContext(context);
  const result=ts.transpileModule(fs.readFileSync(path,'utf8'),{fileName:path,reportDiagnostics:true,compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,target:ts.ScriptTarget.ES2022}});
  assert.deepEqual(result.diagnostics,[]);vm.runInContext(result.outputText,context);return context.exports;
}
function preferenceHarness(search,options) {
  const h=hooks(),listeners=new Map(),parent={};let stored='en';
  const context={URLSearchParams,location:{search,origin:'http://localhost'},
    document:{documentElement:{dataset:{},style:{}}},
    window:{parent,addEventListener:(t,fn)=>listeners.set(t,fn),removeEventListener:t=>listeners.delete(t)},
    matchMedia:()=>({addEventListener(){},removeEventListener(){}})};
  const {useSitePreferences}=loadTS('packages/ui/useSitePreferences.ts',context,{
    react:h.api,'./site-preferences':{readLanguage:()=>stored,readTheme:()=> 'light',savePreference:(_,v)=>{stored=v}}
  });
  const render=()=>{const value=h.render(()=>useSitePreferences(options));h.flush();return value};
  return {render,context,listeners,get stored(){return stored},send(data,source=parent,origin='http://localhost'){listeners.get('message')?.({source,origin,data})},dispose:h.dispose};
}
test('embedded host language wins initially and updates without changing global preference',()=>{
  const h=preferenceHarness('?embedded=1&lang=zh',{embeddedLanguage:true});
  assert.equal(h.render().lang,'zh');
  h.send({type:'hh:tool-language',lang:'en'});assert.equal(h.render().lang,'en');
  h.send({type:'hh:tool-language',lang:'zh'});assert.equal(h.render().lang,'zh');
  h.listeners.get('storage')();assert.equal(h.render().lang,'zh');
  for(const [data,source,origin] of [[{type:'hh:tool-language',lang:'fr'},h.context.window.parent,'http://localhost'],[{type:'hh:tool-language',lang:'en'},{},'http://localhost'],[{type:'hh:tool-language',lang:'en'},h.context.window.parent,'https://other.example']]){
    h.send(data,source,origin);assert.equal(h.render().lang,'zh');
  }
  assert.equal(h.stored,'en','host synchronization does not overwrite global language');
  h.dispose();assert.equal(h.listeners.size,0);
});
test('standalone and other hook consumers retain existing preference semantics',()=>{
  for(const [search,options] of [['?lang=zh',{embeddedLanguage:true}],['?embedded=1&lang=zh',undefined],['?embedded=1&lang=invalid',{embeddedLanguage:true}]]){
    const h=preferenceHarness(search,options);assert.equal(h.render().lang,'en');h.dispose();
  }
});
test('shared host sends language on load/update while keeping frame URL and agent stable',()=>{
  const h=hooks(),messages=[];
  const {ResourceToolPanels}=loadTS('packages/ui/ResourceToolPanels.tsx',{URLSearchParams,location:{search:'?agent=dsh',origin:'http://localhost'}},{
    react:{...h.api,default:h.api},'./HistorySafeFrame':{HistorySafeFrame:'iframe'},'./frame-sizing':{autoSizeFrame:()=>()=>{}},
    './resource-navigation':{resourceTools:[{id:'setup',href:'/apps/setup/',zh:'接入详情',en:'Setup details'}]}
  });
  function render(lang,active='setup'){
    const root=ResourceToolPanels({lang,active});const component=root.props.children[0][0];
    return h.render(()=>component.type(component.props));
  }
  let tree=render('zh');let frame=tree.props.children[0];
  assert.equal(frame.props.src,'/apps/setup/?embedded=1&lang=zh&agent=dsh');
  frame.props.ref.current={contentWindow:{postMessage:(data,origin)=>messages.push({data,origin})}};h.flush();
  frame.props.onLoad();assert.ok(messages.some(m=>m.data.type==='hh:tool-language'&&m.data.lang==='zh'));
  tree=render('en');h.flush();assert.equal(tree.props.children[0].props.src,frame.props.src);
  assert.equal(messages.at(-1).data.lang,'en');assert.equal(messages.at(-1).origin,'http://localhost');
  tree=render('zh','design-md');h.flush();assert.equal(tree.props.hidden,true);assert.equal(messages.at(-1).data.lang,'zh');
  tree.props.children[0].props.onLoad();assert.equal(messages.at(-1).data.lang,'zh');h.dispose();
});

for(const lang of ['zh','en']) test(`invalid handoff has keyboard button semantics, valid handoff stays a native link (${lang})`,()=>{
 const f=formHarness(lang),open=f.nodes['handoff-open'];
 assert.equal(open.getAttribute('role'),'button');
 assert.equal(open.getAttribute('tabindex'),'0');
 assert.equal(open.hasAttribute('href'),false);
 const key=(type,value,repeat=false)=>{let prevented=false;open.listeners[type]?.({key:value,repeat,preventDefault(){prevented=true}});return prevented;};
 assert.equal(key('keydown','Enter'),true);
 assert.match(f.nodes['handoff-status'].textContent,/项目文件夹|project folder/);
 assert.equal(open.clicks,1);
 key('keydown','Enter',true);assert.equal(open.clicks,1,'held Enter does not reactivate');
 f.input('repo','/repo');
 assert.equal(key('keydown',' '),true);
 assert.equal(open.clicks,1,'Space activates on release');
 assert.equal(key('keyup',' '),true);
 assert.equal(open.clicks,2);
 key('keydown',' ');open.listeners.blur();key('keyup',' ');
 assert.equal(open.clicks,2,'Space cancelled when focus leaves');
 assert.match(f.nodes['handoff-status'].textContent,/任务|task/);
 f.input('task','Keep keyboard access');
 assert.strictEqual(f.nodes['handoff-open'],open,'same element survives state transition');
 assert.ok(open.href);
 assert.equal(open.getAttribute('role'),null);
 assert.equal(open.getAttribute('tabindex'),null);
 assert.equal(key('keydown','Enter'),false,'valid Enter uses native navigation');
 assert.equal(key('keydown',' '),false,'valid Space keeps native scroll behavior');
 assert.equal(f.storage.has('happyhands-local-handoff-v1'),false,'no valid handoff activated');
 f.input('task','');assert.equal(open.hasAttribute('href'),false);
 assert.equal(open.getAttribute('role'),'button');assert.equal(open.getAttribute('tabindex'),'0');
});
