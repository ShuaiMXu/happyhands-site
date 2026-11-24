import React,{useEffect,useState} from 'react';
import {Button} from '../packages/ui';
import {DesignDocumentBody} from './DesignDocumentBody';
import './design-document.css';
import {DesignComponentSpecimens} from './DesignComponentSpecimens';
import type {ReferenceSystem} from './ReferenceSpecimen';

export function DesignDocumentPreview({slug,lang,system,referenceName,sourceHref,supplement=false}:{slug:string;lang:string;system?:ReferenceSystem;referenceName?:string;sourceHref?:string;supplement?:boolean}){
 const zh=lang==='zh';
 const [text,setText]=useState(''),[error,setError]=useState(false),[retry,setRetry]=useState(0);
 useEffect(()=>{
  const controller=new AbortController();setText('');setError(false);
  fetch(`/design-archive/${slug}/design.md`,{signal:controller.signal}).then(r=>{if(!r.ok)throw Error();return r.text();}).then(value=>{if(!controller.signal.aborted)setText(value);}).catch(e=>{if(e.name!=='AbortError')setError(true);});
  return ()=>controller.abort();
 },[slug,retry]);
 if(error)return <div role="alert"><p>{zh?'设计规范加载失败。':'Could not load design guidelines.'}</p><Button onClick={()=>setRetry(v=>v+1)}>{zh?'重试':'Retry'}</Button></div>;
 if(!text)return <p role="status">{zh?'正在加载设计规范…':'Loading design guidelines…'}</p>;
 return <>
  {!system?.components?.length && <DesignComponentSpecimens markdown={text} system={system} lang={lang} referenceName={referenceName} sourceHref={sourceHref}/>}
  <DesignDocumentBody text={text} lang={lang} supplement={supplement}/>
 </>;
}
