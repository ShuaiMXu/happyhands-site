import React from 'react';
import {resourceSections,resourceTools} from './resource-navigation';
import './resource-navigation.css';

export function ResourceNavigation({active,lang,onSelect}:{active:string;lang:string;onSelect?:(id:string)=>void}) {
 return <nav className="hh-resource-navigation catalog-resource-navigation" aria-label={lang==='zh'?'设计资源分类':'Design resource sections'}><div className="hh-resource-group">
  {[...resourceSections,...resourceTools].map(({id,zh,en})=><a key={id} href={`/components/?provider=${id}`} aria-current={active===id?'page':undefined} onClick={event=>{
   if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
   if(onSelect){event.preventDefault();onSelect(id);}
   else if(active===id)event.preventDefault();
  }}>{lang==='zh'?zh:en}</a>)}
 </div></nav>;
}
