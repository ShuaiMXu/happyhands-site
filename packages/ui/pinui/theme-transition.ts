import {createThemeSwitch, type ThemeName} from './theme-switch-engine';
import './theme-transition.css';
/** The toggle's label follows the page language rather than the engine's English default. */
const label=(next:ThemeName)=>((document.documentElement.lang||'').toLowerCase().startsWith('zh')?`切换到${next==='dark'?'深色':'浅色'}模式`:`Switch to ${next} mode`);
/** Original PinUI rain engine, connected to the site's persistent theme. */
export function setupThemeTransition(button: HTMLButtonElement, commit: (next:ThemeName)=>void) {
 const root=document.createElement('div');root.className='hh-theme-transition';root.setAttribute('aria-hidden','true');
 const fx=document.createElement('div');fx.className='pts__fx';root.append(fx);document.body.append(root);document.body.classList.add('hh-theme-background-effects');
 root.dataset.theme=document.documentElement.dataset.theme || 'light';
 const engine=createThemeSwitch({root,button,fx,effect:()=> 'rain',sound:()=>false,label,onCommit:next=>{commit(next);}});
 const observer=new MutationObserver(()=>{if(!engine.busy())root.dataset.theme=document.documentElement.dataset.theme || 'light';});
 observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
 return ()=>{observer.disconnect();engine.destroy();root.remove();if(!document.querySelector('.hh-theme-transition'))document.body.classList.remove('hh-theme-background-effects');};
}
