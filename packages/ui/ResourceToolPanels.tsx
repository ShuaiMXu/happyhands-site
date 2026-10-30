import React, {useEffect,useState} from 'react';
import {resourceTools} from './resource-navigation';
export function ResourceToolPanels({active,lang}:{active:string;lang:string}) {
 const [visited,setVisited]=useState<string[]>([]);
 useEffect(()=>{if(resourceTools.some(tool=>tool.id===active))setVisited(items=>items.includes(active)?items:[...items,active]);},[active]);
 return <>{resourceTools.map(tool=><section key={tool.id} hidden={active!==tool.id} className="resource-tool-panel" aria-label={lang==='zh'?tool.zh:tool.en}>{visited.includes(tool.id)&&<iframe title={lang==='zh'?tool.zh:tool.en} src={`${tool.href}?embedded=1`} />}</section>)}</>;
}
