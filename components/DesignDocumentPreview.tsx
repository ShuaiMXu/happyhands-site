import React,{useEffect,useMemo,useState} from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Button} from '../packages/ui';
import {parseDesignDocument} from './designmd-document';
import './design-document.css';
import {DesignComponentDemo} from './DesignComponentDemo';
import type {ReferenceSystem} from './ReferenceSpecimen';
import {DesignDeclaredComponents} from './DesignDeclaredComponents';

export function DesignDocumentPreview({slug,lang,system,supplement=false}:{slug:string;lang:string;system?:ReferenceSystem;supplement?:boolean}){
 const zh=lang==='zh';
 const [text,setText]=useState(''),[error,setError]=useState(false),[retry,setRetry]=useState(0);
 useEffect(()=>{
  const controller=new AbortController();setText('');setError(false);
  fetch(`/design-archive/${slug}/design.md`,{signal:controller.signal}).then(r=>{if(!r.ok)throw Error();return r.text();}).then(value=>{if(!controller.signal.aborted)setText(value);}).catch(e=>{if(e.name!=='AbortError')setError(true);});
  return ()=>controller.abort();
 },[slug,retry]);
 const doc=useMemo(()=>parseDesignDocument(text),[text]);
 let headingIndex=0;
 const heading=({children}:{children?:React.ReactNode})=><h3 id={`designmd-section-${headingIndex++}`}>{children}</h3>;
 if(error)return <div role="alert"><p>{zh?'设计规范加载失败。':'Could not load design guidelines.'}</p><Button onClick={()=>setRetry(v=>v+1)}>{zh?'重试':'Retry'}</Button></div>;
 if(!text)return <p role="status">{zh?'正在加载设计规范…':'Loading design guidelines…'}</p>;
 const content=<section className="design-document" aria-label={zh?'设计规范':'Design guidelines'}>
  <h2>{zh?'设计规范':'Design guidelines'}</h2>
  {!!doc.sections.length&&<nav aria-label={zh?'规范目录':'Guideline sections'}>{doc.sections.map(section=><a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</nav>}
  {!!doc.colors.length&&<section aria-label={zh?'文档配色':'Document colors'} className="design-document-colors">{doc.colors.map(color=><div key={color}><span style={{backgroundColor:color}}/><code>{color}</code></div>)}</section>}
  <div className="design-document-body"><Markdown remarkPlugins={[remarkGfm]} skipHtml components={{h1:heading,h2:heading,h3:({children})=><h4>{children}</h4>,table:({children})=><div className="design-document-table" tabIndex={0}><table>{children}</table></div>,img:({alt})=><span>{alt}</span>,a:({href,children})=><a href={href} target="_blank" rel="noopener noreferrer">{children}</a>}}>{doc.body}</Markdown></div>
  {doc.frontmatter&&<details><summary>{zh?'原始结构化参数':'Original structured parameters'}</summary><pre>{doc.frontmatter}</pre></details>}
 </section>;
 return <><DesignComponentDemo markdown={text} system={system} lang={lang}/>{!supplement&&<DesignDeclaredComponents markdown={text} lang={lang}/ >}{supplement?<details className="design-document"><summary>{zh?'完整 Design.md 原文':'Complete Design.md reference'}</summary>{content}</details>:content}</>;
}
