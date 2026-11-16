import React,{useEffect,useMemo,useState} from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Button} from '../packages/ui';
import {ResourceCard,ResourceDetailHeader} from './ResourcePresentation';
import {ResourceToolbar} from './ResourceToolbar';
import {DesignComponentDemo} from './DesignComponentDemo';
import './collections.css';
type Entry={id:string;name:string;type:string;path:string;collection:string;sha256:string;bytes:number;summary?:string;cover?:string;preview?:string;system?:string;installation?:{url:string};source:string;sourceUrl?:string;license:string};
type Collection={id:string;name:string;nameEn:string;group:string;count:number;types?:string[];cover?:string;overview:string;access:string};
type Catalog={schemaVersion:number;version:string;collections:Collection[];resources:Entry[]};
const groups=[['all','全部','All'],['inspiration','找参考','Inspiration'],['tokens','设计变量','Tokens'],['systems','设计系统','Systems'],['components','组件源码','Component source'],['guidelines','平台规范','Guidelines']];
export function CollectionsLibrary({lang,embedded=false}:{lang:string;embedded?:boolean}){
 const Root=embedded?'section':'main';const zh=lang==='zh';const [catalog,setCatalog]=useState<Catalog|null>(null),[error,setError]=useState(''),[retry,setRetry]=useState(0),[query,setQuery]=useState(''),[group,setGroup]=useState('all'),[collection,setCollection]=useState(()=>typeof location==='undefined'?'':new URLSearchParams(location.search).get('collection')||''),[selected,setSelected]=useState<Entry|null>(null),[content,setContent]=useState(''),[loadError,setLoadError]=useState(''),[copyError,setCopyError]=useState(''),[page,setPage]=useState(1),[copied,setCopied]=useState(false);
 useEffect(()=>{const c=new AbortController();setError('');fetch('/resources/v1/index.json',{signal:c.signal}).then(r=>{if(!r.ok)throw Error();return r.json();}).then(v=>{if(v.schemaVersion!==1||!Array.isArray(v.resources)||!Array.isArray(v.collections))throw Error();setCatalog(v);}).catch(e=>{if(e.name!=='AbortError')setError(zh?'资源目录加载失败。':'Could not load the resource catalog.');});return()=>c.abort();},[retry,zh]);
 useEffect(()=>{setContent('');setLoadError('');setCopyError('');setCopied(false);if(!selected)return;const c=new AbortController();fetch('/'+selected.path,{signal:c.signal}).then(async r=>{if(!r.ok)throw Error();const bytes=await r.arrayBuffer();const hash=[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(v=>v.toString(16).padStart(2,'0')).join('');if(hash!==selected.sha256)throw Error();return new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(bytes);}).then(value=>{if(!c.signal.aborted)setContent(value);}).catch(e=>{if(e.name!=='AbortError')setLoadError(zh?'文件加载或来源校验失败，请重试。':'The file could not be loaded or its source hash changed. Retry.');});return()=>c.abort();},[selected,zh,retry]);
 const items=useMemo(()=>{const q=query.trim().toLowerCase();return (catalog?.resources||[]).filter(row=>row.collection===collection&&row.type!=='collection'&&(!q||JSON.stringify([row.name,row.summary,row.type,row.system]).toLowerCase().includes(q)));},[catalog,collection,query]);
 if(error)return <Root id={embedded?undefined:'catalog-main'} className="collections-library" role="alert"><p>{error}</p><Button onClick={()=>setRetry(v=>v+1)}>{zh?'重试':'Retry'}</Button></Root>;
 if(!catalog)return <Root id={embedded?undefined:'catalog-main'} className="collections-library"><p role="status">{zh?'正在加载资源目录…':'Loading resource catalog…'}</p></Root>;
 const current=catalog.collections.find(row=>row.id===collection);
 const open=(row:Entry)=>{setContent('');setLoadError('');setSelected(row);setCopied(false);};
 const copy=async()=>{try{await navigator.clipboard.writeText(content);setCopied(true);}catch{setCopyError(zh?'复制失败，请下载原文件。':'Copy failed. Download the original file.');}};
 return <Root id={embedded?undefined:'catalog-main'} className="collections-library" aria-label={zh?'资源合集':'Resource collections'}>
 {selected?<>
  <ResourceDetailHeader title={selected.name} backLabel={zh?'返回合集':'Back to collection'} onBack={()=>setSelected(null)}/>
  <div className="collections-actions"><a className="hh-button" href={'/'+selected.path} download>{zh?'下载原文件':'Download original'}</a><Button disabled={!content} onClick={()=>void copy()}>{copied?(zh?'已复制':'Copied'):(zh?'复制原文':'Copy source')}</Button>{selected.preview&&<a className="hh-button" href={selected.preview}>{zh?'查看交互预览':'Open interactive preview'}</a>}</div>
  {copyError&&<p role="alert">{copyError}</p>}
  {selected.installation&&<div className="collections-install"><h3>{zh?'安装到项目':'Install in your project'}</h3><pre>npx shadcn@latest add {selected.installation.url}</pre><p>{zh?'先核对目标框架、依赖与许可证；此页面不会执行安装。':'Check target framework, dependencies and license. This page does not run installation commands.'}</p></div>}
  {loadError?<div role="alert"><p>{loadError}</p><Button onClick={()=>setRetry(v=>v+1)}>{zh?'重试':'Retry'}</Button></div>:!content?<p role="status">{zh?'正在读取原文件…':'Loading original source…'}</p>:<>
   {selected.cover&&<img className="collections-preview" src={selected.cover} alt={selected.name}/>}
   {selected.type==='tokens'&&<TokenSamples content={content} zh={zh}/>}
   {selected.type==='design-md'&&<DesignComponentDemo markdown={content} lang={lang}/>}
   <div className="design-document-body collections-document">{selected.path.endsWith('.md')?<Markdown remarkPlugins={[remarkGfm]} skipHtml components={{a:({href,children})=><a href={href?.startsWith('http')?href:new URL(href||'',location.origin+'/'+selected.path).href} target="_blank" rel="noopener noreferrer">{children}</a>,img:()=>null,table:({children})=><div className="collections-table" tabIndex={0}><table>{children}</table></div>}}>{content}</Markdown>:<pre>{content}</pre>}</div>
  </>}
  <details className="collections-provenance"><summary>{zh?'来源与版本':'Source and version'}</summary><p><a href={selected.sourceUrl||selected.source} target="_blank" rel="noopener noreferrer">{selected.sourceUrl||selected.source}</a></p><p>{selected.license}</p><code>SHA-256 {selected.sha256}</code></details>
 </>:<>
  {current&&<ResourceDetailHeader title={zh?current.name:current.nameEn} backLabel={zh?'返回全部合集':'All collections'} onBack={()=>{setCollection('');setGroup('all');setQuery('');setPage(1);}}><Button onClick={()=>open(catalog.resources.find(row=>row.id===current.overview)!)}>{zh?'归档说明':'Archive notes'}</Button></ResourceDetailHeader>}
  <ResourceToolbar label={zh?'搜索资源':'Search resources'} placeholder={zh?'搜索名称、组件或规范':'Search names, components or guidelines'} query={query} onQueryChange={v=>{setQuery(v);setPage(1);}} status={current?`${items.length} ${zh?'份资源':'resources'}`:`${catalog.collections.length} ${zh?'个合集':'collections'}`}>
   {!current&&<div className="collections-filters">{groups.map(([id,cn,en])=><Button key={id} variant={group===id?'primary':'ghost'} aria-pressed={group===id} onClick={()=>setGroup(id)}>{zh?cn:en}</Button>)}</div>}
  </ResourceToolbar>
  {current?<>
   {current.access==='public-documents-only'&&<p>{zh?'仅包含公开接入文档，不含付费 App 截图或流程。':'Public integration documents only. Paid app screenshots and flows are not included.'}</p>}
   <div className="collections-documents">{items.slice(0,page*40).map(row=><button key={row.id} type="button" onClick={()=>open(row)}><span>{row.name}</span><span>{row.type} / {Math.ceil(row.bytes/1024)} KB</span></button>)}</div>
   {!items.length&&<p role="status">{zh?'没有找到匹配资源。':'No matching resources.'}</p>}
   {items.length>page*40&&<Button onClick={()=>setPage(v=>v+1)}>{zh?'加载更多':'Load more'}</Button>}
  </>:<div className="archive-grid">{catalog.collections.filter(row=>(group==='all'||row.group===group)&&(!query||JSON.stringify([row.name,row.nameEn,...catalog.resources.filter(r=>r.collection===row.id).map(r=>r.name)]).toLowerCase().includes(query.toLowerCase()))).map(row=><ResourceCard key={row.id} href={`?provider=collections&collection=${row.id}`} title={zh?row.name:row.nameEn} mediaClassName={row.cover?'archive-card-media':'collections-summary-media'} description={`${row.count} ${zh?'份资源':'resources'}`} media={row.cover?<img src={row.cover} alt="" loading="lazy"/>:<div className="collections-type-preview">{catalog.resources.filter(item=>item.collection===row.id&&item.type!=='collection'&&(row.id!=='design-how-systems'||!item.id.includes('/'))&&(row.id!=='brand-systems'||item.path.endsWith('/index.md'))).slice(0,4).map(item=><span key={item.id}>{row.id==='app-tokens'?item.name.replace(/ \/ tokens$/,''):item.name.split(' / ').at(-1)}</span>)}</div>} onClick={e=>{if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();setCollection(row.id);setQuery('');setPage(1);}}/>)}</div>}
 </>}
 </Root>;
}

function TokenSamples({content,zh}:{content:string;zh:boolean}){
 let values:Record<string,unknown>;try{values=JSON.parse(content);}catch{return null;}
 const colors=Object.entries(values).filter((pair):pair is [string,string]=>typeof pair[1]==='string'&&/^(#|rgb|hsl|oklch)/i.test(pair[1])&&CSS.supports('color',pair[1])).slice(0,24);
 if(!colors.length)return null;
 return <section aria-label={zh?'设计变量取样':'Token samples'} className="collections-token-samples">{colors.map(([name,value])=><div key={name}><span style={{backgroundColor:value}}/><p>{name}</p><code>{value}</code></div>)}</section>;
}
