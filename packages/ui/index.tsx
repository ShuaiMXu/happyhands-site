import "./components.css";
import type { ComponentPropsWithRef, ReactNode } from 'react';
import {Button as ShadcnButton} from './shadcn/button';
export function Button({variant='secondary',loading=false,children,disabled,className='',...props}:ComponentPropsWithRef<'button'> & {variant?:'primary'|'secondary'|'ghost'|'danger';loading?:boolean;children?:ReactNode}) {
 const mapped={primary:'default',secondary:'secondary',ghost:'ghost',danger:'destructive'} as const;
 return <ShadcnButton type="button" {...props} variant={mapped[variant]} data-variant={variant} data-shadcn-variant={mapped[variant]} aria-busy={loading||undefined} disabled={disabled||loading} className={`hh-button ${className}`}><span className="hh-button-content">{children}</span>{loading&&<span className="hh-spinner" aria-hidden="true"/>}</ShadcnButton>;
}
import {Input as ShadcnInput} from './shadcn/input';
import {Checkbox} from './shadcn/checkbox';
import type {ChangeEvent} from 'react';
export function Input(props:ComponentPropsWithRef<'input'>){
 if(props.type==='checkbox')return <Checkbox id={props.id} name={props.name} className={props.className} style={props.style} checked={props.checked} defaultChecked={props.defaultChecked} disabled={props.disabled} required={props.required} value={String(props.value??'on')} aria-label={props['aria-label']} aria-labelledby={props['aria-labelledby']} aria-describedby={props['aria-describedby']} onCheckedChange={checked=>props.onChange?.({target:{checked:checked===true,value:props.value,name:props.name},currentTarget:{checked:checked===true,value:props.value,name:props.name}} as ChangeEvent<HTMLInputElement>)}/>;
 // Browser-native color, range and file widgets intentionally keep their native affordances.
 if(['color','range','file','radio'].includes(props.type||''))return <input {...props}/>;
 return <ShadcnInput {...props}/>;
}
export {Textarea} from './shadcn/textarea';
