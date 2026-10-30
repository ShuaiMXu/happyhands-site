import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Button} from '../ui/shadcn/button';
import {Input} from '../ui/shadcn/input';
import {Card,CardHeader,CardTitle,CardDescription,CardContent,CardFooter} from '../ui/shadcn/card';
import type {ComponentConfig} from './registry';
declare global {interface Window{__HH_COMPONENT__:{config:ComponentConfig;lang:'zh'|'en'}}}
function Preview(){
 const {config:c,lang}=window.__HH_COMPONENT__;const zh=lang==='zh';const [notice,setNotice]=useState('');
 const variant=c.variant==='solid'?'default':c.variant==='outline'?'outline':'secondary';
 const size=c.size==='compact'?'sm':c.size==='large'?'lg':'default';
 const button=<Button variant={variant} size={size} disabled={c.state==='disabled'} type={c.component==='input'?'submit':'button'} onClick={c.component==='input'?undefined:()=>setNotice(zh?'已完成操作':'Action completed')}>{c.label||(zh?'保存':'Save')}</Button>;
 return <main className="runtime-main">{c.component==='input'?<form onSubmit={e=>{e.preventDefault();setNotice(zh?'已保存':'Saved');}}><label htmlFor="project-name">{zh?'项目名称':'Project name'}</label><p id="input-hint">{zh?'输入名称后保存':'Enter a name and save'}</p><Input id="project-name" name="name" required maxLength={120} disabled={c.state==='disabled'} aria-describedby="input-hint"/>{button}</form>:c.component==='card'?<Card><CardHeader><CardTitle>{zh?'项目概览':'Project overview'}</CardTitle><CardDescription>{zh?'同一套设计规则应用到内容、表单和操作。':'One design system for content, forms and actions.'}</CardDescription></CardHeader><CardContent><p>{zh?'调整颜色、字体和形态，查看组件的实际效果。':'Adjust colors, fonts and variants in a real component.'}</p></CardContent><CardFooter>{button}</CardFooter></Card>:button}<output role="status" aria-live="polite">{notice}</output></main>;
}
createRoot(document.getElementById('component-root')!).render(<Preview/>);
