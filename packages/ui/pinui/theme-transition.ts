import {createThemeSwitch, type ThemeName} from './theme-switch-engine';
import './theme-transition.css';
/** Original PinUI rain engine, connected to the site's persistent theme. */
export function setupThemeTransition(button: HTMLButtonElement, commit: (next:ThemeName)=>void) {
 const root=document.createElement('div');root.className='hh-theme-transition';root.setAttribute('aria-hidden','true');
 const fx=document.createElement('div');fx.className='pts__fx';root.append(fx);document.body.append(root);document.body.classList.add('hh-theme-background-effects');
 root.dataset.theme=document.documentElement.dataset.theme || 'light';
 const label=button.getAttribute('aria-label');
 const engine=createThemeSwitch({root,button,fx,effect:()=> 'rain',sound:()=>false,onCommit:next=>{commit(next);}});
 if(label)button.setAttribute('aria-label',label);
 const observer=new MutationObserver(()=>{if(!engine.busy())root.dataset.theme=document.documentElement.dataset.theme || 'light';});
 observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
 return ()=>{observer.disconnect();engine.destroy();root.remove();if(!document.querySelector('.hh-theme-transition'))document.body.classList.remove('hh-theme-background-effects');};
}
