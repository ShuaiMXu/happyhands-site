import "../../packages/ui/embedded-tool";
import React,{useEffect,useMemo} from 'react';
import {createRoot} from 'react-dom/client';
import '../portal/portal.css';
import '../../packages/design-tokens/portal.css';
import '../../packages/ui/icons.css';
import '../portal/hero-connect.css';
import '../portal/resource-feed.css';
import '../../packages/ui/owned-ui.css';
import './setup.css';
import {Button,Input,Textarea} from '../../packages/ui';
import {Accordion,AccordionItem,AccordionTrigger,AccordionContent} from '../../packages/ui/shadcn/accordion';
import {Card} from '../../packages/ui/shadcn/card';
import {SiteHeader} from '../../packages/ui/SiteHeader';
import {useSitePreferences} from '../../packages/ui/useSitePreferences';
import {connectMarkup,heroConnectMarkup,setupConnect} from '../portal/connect.js';
function CopyPrompt({zh}:{zh:boolean}){
 const [notice,setNotice]=React.useState('');
 return <div className="setup-prompt-actions"><Button id="copy-agent" onClick={async event=>{try{await navigator.clipboard.writeText(event.currentTarget.dataset.copy||'');setNotice(zh?'已复制':'Copied');}catch{setNotice(zh?'复制失败，请选择下方文本复制。':'Select the text below to copy.');}}}>{zh?'复制提示词':'Copy prompt'}</Button><span role="status">{notice}</span></div>;
}
/** Internal authored setup content stays shared with the portal; all form controls render through shadcn. */
function SetupContent({html}:{html:string}) {
 const nodes=useMemo(()=>{
  const doc=new DOMParser().parseFromString(html,'text/html');
  let index=0;
  function render(node:ChildNode):React.ReactNode {
   if(node.nodeType===Node.TEXT_NODE)return node.textContent;
   if(!(node instanceof Element))return null;
   const key=index++; const props:Record<string,unknown>={key};
   for(const attr of node.attributes){const name=({class:'className',for:'htmlFor',readonly:'readOnly',tabindex:'tabIndex'} as Record<string,string>)[attr.name]||attr.name;props[name]=['readonly','hidden','disabled','required'].includes(attr.name)?true:attr.value;}
   const children=Array.from(node.childNodes).map(render);
   if(node.classList.contains('agent-prompt-preview'))return <section key={key} className="agent-prompt-preview"><div className="setup-prompt-heading"><label htmlFor="agent-prompt">{node.querySelector('label')?.textContent}</label><CopyPrompt zh={node.querySelector('label')?.textContent?.includes('复制')||false}/></div><Textarea id="agent-prompt" readOnly rows={16}/></section>;
   if(node.tagName==='DETAILS'){
    const summary=node.querySelector(':scope > summary');
    return <Accordion key={key} type="single" collapsible className={node.className}><AccordionItem value="content"><AccordionTrigger>{summary?.textContent}</AccordionTrigger><AccordionContent forceMount>{Array.from(node.childNodes).filter(n=>n!==summary).map(render)}</AccordionContent></AccordionItem></Accordion>;
   }
   if(node.tagName==='A'&&/^https?:/.test(node.getAttribute('href')||'')){props.target='_blank';props.rel='noopener noreferrer';}
   if(node.tagName==='BUTTON')return <Button variant="secondary" {...props}>{children}</Button>;
   if(node.tagName==='INPUT')return <Input {...props} defaultValue={node.getAttribute('value')||undefined} value={undefined}/>;
   if(node.tagName==='TEXTAREA')return <Textarea {...props} defaultValue={node.textContent||''}/>;
   if(node.classList.contains('agent-setup-help'))return <Card {...props}>{children}</Card>;
   return React.createElement(node.tagName.toLowerCase(),props,...children);
  }
  return Array.from(doc.body.childNodes).map(render);
 },[html]);
 return <>{nodes}</>;
}
function App(){
 const {lang,dark,toggleLanguage,toggleTheme}=useSitePreferences(); const zh=lang==='zh';
 useEffect(()=>{setupConnect(lang);document.title=`${zh?'接入详情':'Setup details'} / HappyHands`;},[lang]);
 const content=connectMarkup(lang).replace('<h2>接入详情</h2>','<h2>接入与使用</h2>').replace('<h2>Setup details</h2>','<h2>Setup and usage</h2>').replaceAll('href="#top"','href="#agent-choice"').replace('首屏复制','下方复制').replace('from the first screen','below');
 return <><SiteHeader lang={lang} dark={dark} onTheme={toggleTheme} onLanguage={toggleLanguage} active="/apps/setup/"/><main key={lang} className="setup-page"><section className="setup-start" id="agent-choice"><a href="/apps/portal/#design-resources">{zh?'返回首页':'Back to home'}</a><h1>{zh?'接入详情':'Setup details'}</h1><p>{zh?'选择你的 AI 工具，复制提示词开始。':'Choose your AI tool and copy the setup prompt.'}</p><SetupContent html={heroConnectMarkup(lang)}/></section><SetupContent html={content}/></main></>;
}
createRoot(document.getElementById('setup-page')!).render(<App/>);
