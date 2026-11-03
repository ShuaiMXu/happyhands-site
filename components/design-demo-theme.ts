import {parseDesignDocument} from './designmd-document';
import type {ReferenceSystem} from './ReferenceSpecimen';
export const validColor=(v:string|undefined)=>/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(v||'')?v:undefined;
const length=(v:string|undefined)=>/^(?:\d{1,4}(?:\.\d+)?)(?:px|rem|em)$/.test(v||'')?v:undefined;
const font=(v:string|undefined)=>v&&/^[\w\s,'"-]+$/.test(v)?v:undefined;
const luminance=(hex:string)=>{
 const rgb=hex.slice(1).length===3?hex.slice(1).split('').map(x=>x+x).join(''):hex.slice(1);
 const l=[0,2,4].map(i=>parseInt(rgb.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
 return l;
}
export const contrastRatio=(a:string,b:string)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
export const contrastInk=(hex:string)=>luminance(hex)>.179?'#000000':'#ffffff';
export type DemoTheme={accent:string;background:string;surface:string;ink:string;onAccent:string;onSurface:string;adjustments:string[];border:string;radius:string;cardRadius:string;inputRadius:string;padding:string;cardPadding:string;cardBorder:string;font:string;size:string;weight:string;source:string[];fallback:string[]};
export function designDemoTheme(markdown:string,system?:ReferenceSystem):DemoTheme{
 const doc=parseDesignDocument(markdown), values:Record<string,string>={},stack:Array<{indent:number;key:string}>=[];
 for(const line of doc.frontmatter.split('\n')){
  const m=line.match(/^(\s*)([\w-]+):\s*(.*?)\s*$/);if(!m)continue;
  while(stack.length&&stack[stack.length-1].indent>=m[1].length)stack.pop();
  const key=[...stack.map(x=>x.key),m[2]].join('.');
  if(m[3])values[key]=m[3].replace(/^(["'])(.*)\1$/,'$2');else stack.push({indent:m[1].length,key:m[2]});
 }
 const get=(key:string)=>{let value=values[key];for(let i=0;i<4&&/^\{[\w.-]+\}$/.test(value||'');i++)value=values[value.slice(1,-1)];return value;};
 const source:string[]=[],fallback:string[]=[];
 const pick=(label:string,value:string|undefined,base:string)=>{(value?source:fallback).push(label);return value||base;};
 const colorRole=(pattern:RegExp)=>system?.colors?.find(c=>pattern.test(c.name+' '+c.role))?.hex||doc.body.split('\n').find(line=>/#[\da-f]{3,6}\b/i.test(line)&&pattern.test(line))?.match(/#[\da-f]{6}\b|#[\da-f]{3}\b/i)?.[0];
 const accent=pick('accent',validColor(get('components.button-primary.backgroundColor')||get('colors.primary')||system?.colors?.find(c=>c.group==='brand')?.hex||colorRole(/primary action|primary.*button|accent highlight/i)),'#171717');
 const dark=system?.theme==='dark';
 const background=pick('background',validColor(get('colors.background')||colorRole(/page background|primary background surface|dominant.*background|canvas/i)),dark?'#171717':'#fafafa');
 const ink=pick('text',validColor(get('colors.text')||colorRole(/primary text|dominant foreground/i)),contrastInk(background));
 const surface=pick('surface',validColor(get('colors.surface')||colorRole(/card.*surface|surface background/i)),background);
 const componentLine=(kind:string)=>doc.body.split('\n').find(line=>new RegExp(`^[-*] \\*\\*${kind}[^:]*:`, 'i').test(line));
 const proseRadius=(kind:string)=>{const line=componentLine(kind);return line?.match(/\((\d+(?:\.\d+)?(?:px|rem))\).*?(?:shape|corner)/i)?.[1]||line?.match(/(\d+(?:\.\d+)?(?:px|rem))[- ](?:radius|corner)/i)?.[1];};
 const radius=pick('button radius',length(get('components.button-primary.rounded')||get('rounded.sm')||system?.spacing?.radius?.buttons||proseRadius('Primary Button')),'8px');
 const cardRadius=pick('card radius',length(get('components.card.rounded')||get('rounded.md')||system?.spacing?.radius?.cards||proseRadius('Cards')),'12px');
 const bodyFont=system?.typography?.find(t=>/body|UI/i.test(t.role||''))||system?.typography?.[0];
 const family=pick('font',font(get('typography.body-md.fontFamily')||bodyFont?.family),'system-ui, sans-serif');
 const card=system?.components?.find(c=>/card/i.test(c.name));
 const cardPadding=pick('card padding',length(get('components.card.padding')||system?.spacing?.cardPadding),'24px');
 const cardBorder=pick('card border',card&&/no border|borderless|zero border/i.test(card.description)?'0':undefined,'1px solid');
 const adjustments:string[]=[];
 const readable=(label:string,candidate:string,bg:string)=>{if(contrastRatio(candidate,bg)>=4.5)return candidate;adjustments.push(label);return contrastInk(bg);};
 const onSurface=readable('surface text',validColor(get('colors.on-surface'))||ink,surface);
 const onAccent=readable('button text',pick('button text',validColor(get('components.button-primary.textColor')||get('colors.on-primary')),contrastInk(accent)),accent);
 return {cardPadding,cardBorder,accent,background,ink:readable('page text',ink,background),surface,onAccent,onSurface,adjustments,border:pick('border',validColor(get('colors.border')||colorRole(/borders|border color/i)),dark?'#666666':'#cccccc'),radius,cardRadius,inputRadius:pick('input radius',length(get('components.input.rounded')||system?.spacing?.radius?.inputs),radius),padding:pick('button padding',length(get('components.button-primary.padding')),'12px'),font:family,size:pick('body size',length(get('typography.body-md.fontSize')),'14px'),weight:pick('body weight',/^[1-9]00$/.test(get('typography.body-md.fontWeight')||'')?get('typography.body-md.fontWeight'):undefined,'400'),source,fallback};
}
