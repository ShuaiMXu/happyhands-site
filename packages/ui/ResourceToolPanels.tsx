import {HistorySafeFrame} from './HistorySafeFrame';
import React, {useEffect,useState} from 'react';
import {autoSizeFrame} from './frame-sizing';
import {resourceTools} from './resource-navigation';
export function ResourceToolPanels({active,lang}:{active:string;lang:string}) {
 const [visited,setVisited]=useState<string[]>([]);
 const resume=(frame:HTMLIFrameElement|null)=>frame?.contentWindow?.postMessage({type:'hh:tool-active'},location.origin);
 useEffect(()=>{if(resourceTools.some(tool=>tool.id===active))setVisited(items=>items.includes(active)?items:[...items,active]);},[active]);
 useEffect(()=>{const cleanups=Array.from(document.querySelectorAll<HTMLIFrameElement>('.resource-tool-panel iframe')).map(frame=>autoSizeFrame(frame));return ()=>cleanups.forEach(cleanup=>cleanup());},[visited]);
 useEffect(()=>{resume(document.querySelector<HTMLIFrameElement>('.resource-tool-panel:not([hidden]) iframe'));},[active]);
 return <>{resourceTools.map(tool=><section key={tool.id} hidden={active!==tool.id} className="resource-tool-panel" aria-label={lang==='zh'?tool.zh:tool.en}>{visited.includes(tool.id)&&<HistorySafeFrame title={lang==='zh'?tool.zh:tool.en} src={`${tool.href}?embedded=1`} onLoad={event=>{if(active===tool.id)resume(event.currentTarget);}} />}</section>)}</>;
}
