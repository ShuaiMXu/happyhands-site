import {ResourceNavigation} from "../../packages/ui/ResourceNavigation";
import "../../packages/ui/embedded-tool";
import React,{useEffect,useMemo} from 'react';
import {createRoot} from 'react-dom/client';
import '../../packages/design-tokens/portal.css';
import '../../packages/ui/icons.css';
import '../portal/hero-connect.css';
import '../../packages/ui/owned-ui.css';
import './setup.css';
import {lightweightInstall} from '../portal/lightweight-release.js';
import {Button,Input,Textarea} from '../../packages/ui';
import {Accordion,AccordionItem,AccordionTrigger,AccordionContent} from '../../packages/ui/shadcn/accordion';
import {Card} from '../../packages/ui/shadcn/card';
import {SiteHeader} from '../../packages/ui/SiteHeader';
import {useSitePreferences} from '../../packages/ui/useSitePreferences';
import {connectMarkup,heroConnectMarkup,setupConnect} from '../portal/connect.js';
function CopyText({zh,id,text,install=false}:{zh:boolean;id?:string;text?:string;install?:boolean}){
 const [notice,setNotice]=React.useState('');
 const [busy,setBusy]=React.useState(false);
 return <div className="setup-copy-group"><Button id={id} variant={install?'primary':'secondary'} loading={busy} onClick={async event=>{
  const value=text??event.currentTarget.dataset.copy??'';
  setBusy(true);setNotice('');
  try{if(!value)throw Error('Empty copy');await navigator.clipboard.writeText(value);setNotice(zh?'已复制':'Copied');}
  catch{setNotice(zh?'复制失败，请手动选择文本复制，或重试。':'Copy failed. Select the text to copy manually, or retry.');}
  finally{setBusy(false);}
 }}>{install?(zh?'复制安装命令':'Copy install command'):(zh?'复制完整提示词':'Copy full prompt')}</Button><span role="status">{notice}</span></div>;
}
function InstallSkill({zh}:{zh:boolean}){
 return <section className="setup-install" aria-labelledby="setup-install-title">
  <h2 id="setup-install-title">{zh?'安装轻量 Skill':'Install the lightweight Skill'}</h2>
  <p id="setup-install-help">{zh?'在产品仓库的终端运行。无需克隆 HappyHands 源码或启动工作台。':'Run in your product repository’s terminal. No HappyHands source clone or workbench is required.'}</p>
  <pre tabIndex={0} aria-label={zh?'Alpha.4 安装命令':'Alpha.4 installation command'} aria-describedby="setup-install-help"><code>{lightweightInstall}</code></pre>
  <CopyText zh={zh} text={lightweightInstall} install/>
  <p>{zh?'需要 Node.js 22.15+、npm、Git 和 Chrome 或 Edge。安装会下载发布包与运行依赖，默认写入 Codex Skill 目录，不覆盖已有 Skill。内置诊断与独立模型复核仍需已配置并登录的 Codex CLI。':'Requires Node.js 22.15+, npm, Git and Chrome or Edge. Installation downloads the release and runtime dependencies into the default Codex Skill directory and refuses to overwrite an existing Skill. Built-in diagnosis and independent model review still require a configured, signed-in Codex CLI.'}</p>
 </section>;
}
function SetupDisclosure({id,className,children}:{id:string;className:string;children:React.ReactNode}) {
 const [value,setValue]=React.useState(()=>{try{return sessionStorage.getItem('hh-setup-disclosure:'+id)||'';}catch{return '';}});
 return <Accordion type="single" collapsible className={className} value={value} onValueChange={next=>{setValue(next);try{sessionStorage.setItem('hh-setup-disclosure:'+id,next);}catch{}}}>{children}</Accordion>;
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
   if(node.classList.contains('agent-prompt-preview'))return <section key={key} className="agent-prompt-preview"><div className="setup-prompt-heading"><label htmlFor="agent-prompt">{node.querySelector('label')?.textContent}</label><CopyText id="copy-agent" zh={node.querySelector('label')?.textContent?.includes('复制')||false}/></div><Textarea id="agent-prompt" readOnly rows={16}/></section>;
   if(node.tagName==='DETAILS'){
    const summary=node.querySelector(':scope > summary');
    return <SetupDisclosure key={key} id={node.id||`${node.className}:${key}`} className={node.className}><AccordionItem value="content"><AccordionTrigger>{summary?.textContent}</AccordionTrigger><AccordionContent forceMount>{Array.from(node.childNodes).filter(n=>n!==summary).map(render)}</AccordionContent></AccordionItem></SetupDisclosure>;
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
 const {lang,dark,toggleLanguage,toggleTheme}=useSitePreferences({embeddedLanguage:true}); const zh=lang==='zh';
 useEffect(()=>{setupConnect(lang);document.title=`${zh?'接入详情':'Setup details'} / HappyHands`;},[lang]);
 const content=connectMarkup(lang).replace('<h2>接入详情</h2>','<h2>接入与使用</h2>').replace('<h2>Setup details</h2>','<h2>Setup and usage</h2>').replaceAll('href="#top"','href="#agent-choice"').replace('首屏复制','下方复制').replace('from the first screen','below');
 return <><SiteHeader navigation={false} lang={lang} dark={dark} onTheme={toggleTheme} onLanguage={toggleLanguage} active="/apps/setup/"/><ResourceNavigation active="setup" lang={lang}/><main key={lang} className="setup-page"><section className="setup-start"><a href="/apps/portal/#design-resources">{zh?'返回首页':'Back to home'}</a><h1>{zh?'接入详情':'Setup details'}</h1><p>{zh?'安装一次，再把完整任务提示词交给你的 AI 工具。':'Install once, then give your AI tool the complete task prompt.'}</p></section><InstallSkill zh={zh}/><section className="setup-tools" id="agent-choice" aria-labelledby="setup-tools-title"><h2 id="setup-tools-title">{zh?'选择工具，复制任务':'Choose a tool and copy the task'}</h2><SetupContent html={heroConnectMarkup(lang)}/></section><SetupContent html={content}/></main></>;
}
createRoot(document.getElementById('setup-page')!).render(<App/>);
