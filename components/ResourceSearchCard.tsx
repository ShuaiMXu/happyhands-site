import React,{useId,useRef,useState} from 'react';
import {AnimatePresence,motion,useReducedMotion} from 'motion/react';
export type SearchResult={id:string;label:string;href:string};
/** PinUI Search Card adaptation: morphing bar/card, backed by live catalog results.
 * Original demonstration remains in public/components/pin-ui/search-card.json. */
export function ResourceSearchCard({label,placeholder,query,onQueryChange,results,status}:{label:string;placeholder:string;query:string;onQueryChange:(value:string)=>void;results?:SearchResult[];status:string}){
 const [open,setOpen]=useState(false);const input=useRef<HTMLInputElement>(null);const root=useRef<HTMLDivElement>(null);const id=useId();const reduced=useReducedMotion();
 const zh=/[\u3400-\u9fff]/.test(label);const expanded=open&&!!query.trim()&&results!==undefined;
 return <div className="resource-search hh-search-card" ref={root} onFocus={()=>setOpen(true)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setOpen(false);}} onKeyDown={e=>{
 if(e.nativeEvent.isComposing)return;
 // Returning focus fires the bubbling onFocus handler synchronously; dismiss last.
 if(e.key==='Escape'){e.preventDefault();input.current?.focus();setOpen(false);}
 if(e.key==='ArrowDown'&&e.target===input.current&&query.trim()&&results!==undefined){e.preventDefault();if(expanded)root.current?.querySelector<HTMLAnchorElement>('a')?.focus();else setOpen(true);}
 }}>
 <motion.div className="hh-search-card-surface" layout transition={{duration:reduced?0:.25,ease:'easeOut'}}>
 <div className="hh-search-card-bar">
 <label htmlFor={id} className="resource-search-label">{label}</label>
 <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg>
 <input id={id} ref={input} type="search" value={query} placeholder={placeholder} aria-controls={expanded?`${id}-results`:undefined} onClick={()=>setOpen(true)} onChange={e=>{onQueryChange(e.target.value);setOpen(true);}}/>
 {query&&<button type="button" aria-label={zh?'清空搜索':'Clear search'} onClick={()=>{onQueryChange('');input.current?.focus();}}><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m6 6 12 12M18 6 6 18"/></svg></button>}
 </div>
 <AnimatePresence initial={false}>{expanded&&<motion.div key="results" id={`${id}-results`} className="hh-search-card-results" initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} transition={{duration:reduced?0:.2}}>
 <p>{status}</p>
 {results?.length ? <ul>{results.map(result=><li key={result.id}><a href={result.href}>{result.label}</a></li>)}</ul>:<p>{zh?'没有匹配结果，试试其他关键词。':'No matches. Try another search.'}</p>}
 </motion.div>}</AnimatePresence>
 </motion.div></div>;
}
