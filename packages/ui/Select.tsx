import React, {Children, isValidElement, useState, useRef, type SelectHTMLAttributes} from 'react';
import {Select as Root,SelectTrigger,SelectValue,SelectContent,SelectItem,SelectGroup,SelectLabel} from './shadcn/select';
/** Compatibility boundary for existing form consumers; interaction is Radix Select. */
export function Select({children,value,defaultValue,onChange,disabled,name,required,id,className,...props}:SelectHTMLAttributes<HTMLSelectElement>) {
 function firstValue(nodes:React.ReactNode):string|undefined {for(const child of Children.toArray(nodes)){if(!isValidElement<{value?:string|number;children?:React.ReactNode}>(child))continue;if(child.type==='option')return String(child.props.value??child.props.children);const nested=firstValue(child.props.children);if(nested!==undefined)return nested;}return undefined;}
 const [local,setLocal]=useState(String(defaultValue ?? firstValue(children) ?? ''));
 const trigger=useRef<HTMLButtonElement>(null);
 const [portalStyle,setPortalStyle]=useState<React.CSSProperties>({});
 const empty='__hh_empty_option__';
 const selected=String(value ?? local);
 function options(nodes:React.ReactNode):React.ReactNode {return Children.map(nodes,node=>{
  if(!isValidElement<{value?:string|number;disabled?:boolean;label?:string;children?:React.ReactNode}>(node))return null;
  if(node.type===React.Fragment)return options(node.props.children);
  if(node.type==='optgroup')return <SelectGroup><SelectLabel>{node.props.label}</SelectLabel>{options(node.props.children)}</SelectGroup>;
  const key=String(node.props.value ?? node.props.children);
  return <SelectItem value={key||empty} disabled={node.props.disabled}>{node.props.children}</SelectItem>;
 });}
 return <span className="hh-select-field"><Root onOpenChange={open=>{if(open&&trigger.current){const style=getComputedStyle(trigger.current);const roles=['bg','ink','bg-raised','bg-sunken','bg-hover','ink-muted','primary','on-primary','line','line-strong','ring','danger','font-sans'];setPortalStyle(Object.fromEntries(roles.map(k=>['--hh-'+k,style.getPropertyValue('--hh-'+k)])) as React.CSSProperties);}}} value={selected||empty} onValueChange={next=>{const val=next===empty?'':next;setLocal(val);onChange?.({target:{value:val,name},currentTarget:{value:val,name}} as React.ChangeEvent<HTMLSelectElement>);}} disabled={disabled} name={name} required={required}><SelectTrigger ref={trigger} id={id} className={className} aria-label={props['aria-label']} aria-labelledby={props['aria-labelledby']} aria-describedby={props['aria-describedby']} aria-invalid={props['aria-invalid']}><SelectValue/></SelectTrigger><SelectContent position="popper" style={portalStyle}>{options(children)}</SelectContent></Root></span>;
}
