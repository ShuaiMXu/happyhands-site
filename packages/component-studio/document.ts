import {interFont} from './inter-font';
import bundle from './runtime-bundle.json';
import {variables,validateStyles,type ThemeStyles,type Mode} from '../theme-core';
import {validateConfig,type ComponentConfig} from './registry';
/** The sandbox preview and export execute the same bundled React/shadcn components, without a CDN. */
export function componentDocument(config:ComponentConfig,styles:ThemeStyles,mode:Mode,lang:'zh'|'en'='zh',overview=false){
 const c=validateConfig(config);validateStyles(styles);
 const vars=variables(styles,mode);
 const map:Record<string,string>={bg:'background',ink:'foreground','bg-raised':'card','bg-sunken':'secondary','ink-muted':'muted-foreground','bg-hover':'accent',primary:'primary','on-primary':'primary-foreground',line:'border','line-strong':'input',ring:'ring',danger:'destructive','font-sans':'font-sans'};
 const tokens=Object.entries(vars).map(([key,value])=>`${key}:${value}`).join(';');
 const aliases=Object.entries(map).map(([key,value])=>`--hh-${key}:var(--${value})`).join(';') + ';' + ['sm','md','lg','xl','control','field','card','option'].map(role=>`--hh-radius-${role}:var(--radius)`).join(';') + ';--hh-radius-group:calc(var(--radius) + 4px)';
 const data=JSON.stringify({config:c,lang,overview}).replaceAll('<','\\u003c').replaceAll('>','\\u003e').replaceAll('&','\\u0026');
 return `<!doctype html><html lang="${lang}" class="${mode}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none';font-src data:;style-src 'unsafe-inline';script-src 'unsafe-inline';form-action 'none';base-uri 'none'"><title>${lang==='zh'?'组件预览':'Component preview'}</title><style>${bundle.css}\n${styles[mode]['font-sans'].includes('Inter')?`@font-face{font-family:Inter;src:url(${interFont}) format('woff2');font-weight:100 900}`:''}\n:root{${tokens};${aliases};color-scheme:${mode}}body{margin:0;padding:32px;background:var(--background);color:var(--foreground);font:400 14px/1.6 var(--font-sans)}.runtime-main{max-width:640px;margin:auto;min-height:280px;display:grid;align-content:center;gap:24px}.runtime-main>button{justify-self:start}form{display:grid;gap:12px}p{margin:0;color:var(--muted-foreground)}output{min-height:24px;color:var(--muted-foreground)}[data-slot=button],[data-slot=card]{border-radius:var(--radius)}[data-slot=input]{border-radius:var(--radius)}@media(max-width:420px){body{padding:20px}}</style></head><body><div id="component-root"></div><script>window.__HH_COMPONENT__=${data};${bundle.js.replaceAll('</script','<\\/script')}</script></body></html>`;
}
