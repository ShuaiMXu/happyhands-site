import React,{useMemo} from 'react';
import {designDocumentComponents} from './designmd-components';
import {designDemoTheme} from './design-demo-theme';
import {buildComponentPreview,componentPreviewKind} from './reference-component-preview';
import {HistorySafeFrame} from '../packages/ui/HistorySafeFrame';
import type {ReferenceSystem} from './ReferenceSpecimen';

export function DesignDeclaredComponents({markdown,lang}:{markdown:string;lang:string}){
 const components=useMemo(()=>designDocumentComponents(markdown),[markdown]);
 const theme=useMemo(()=>designDemoTheme(markdown),[markdown]);
 const system:ReferenceSystem={colors:[{hex:theme.accent,name:'Primary',role:'Primary action',group:'brand'},{hex:theme.background,name:'Canvas',role:'Page background'},{hex:theme.surface,name:'Surface',role:'Card surface'},{hex:theme.ink,name:'Text',role:'Primary text'}],spacing:{radius:{buttons:theme.radius,cards:theme.cardRadius},cardPadding:theme.cardPadding}};
 if(!components.length)return null;
 return <section className="reference-specimen reference-component-section"><h3>{lang==='zh'?'文档声明的组件':'Components declared in the document'} <span>{components.length}</span></h3><p>{lang==='zh'?'逐项按文档用途生成形态示例；原文参数保留在下方。图形素材使用标明的占位示意。':'Individual form examples based on documented roles. Source parameters are retained below. Artwork uses labeled placeholders.'}</p>{components.map((component,i)=><article className="reference-component" key={i}><h4>{component.name}</h4><HistorySafeFrame title={`${component.name} ${lang==='zh'?'规范示例':'guideline example'}`} data-kind={componentPreviewKind(component.name)} srcDoc={buildComponentPreview(component,system,lang)!} sandbox="allow-scripts" autoHeight loading="lazy" referrerPolicy="no-referrer"/><p style={{whiteSpace:'pre-wrap'}}>{component.description}</p></article>)}</section>;
}
