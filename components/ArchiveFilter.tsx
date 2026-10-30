import React,{useState} from 'react';
import {Popover,PopoverTrigger,PopoverContent} from '../packages/ui/shadcn/popover';
import {Command,CommandInput,CommandList,CommandEmpty,CommandItem} from '../packages/ui/shadcn/command';
import {Button} from '../packages/ui';
import {ChevronDown} from 'lucide-react';
import './resource-controls.css';
export type FilterOption={value:string;label:string;count:number};
export function ArchiveFilter({label,options,value,onChange,zh}:{label:string;options:FilterOption[];value:string;onChange:(value:string)=>void;zh:boolean}) {
 const [open,setOpen]=useState(false);
 const [pointerFocus,setPointerFocus]=useState(false);
 return <Popover open={open} onOpenChange={setOpen}><PopoverTrigger asChild><Button variant="ghost" className="archive-filter-trigger" data-filter-active={!!value} data-pointer-focus={pointerFocus||undefined} onPointerDown={()=>setPointerFocus(true)} onKeyDown={()=>setPointerFocus(false)} role="combobox" aria-expanded={open} aria-label={`${label}: ${options.find(i=>i.value===value)?.label??''}`}>{options.find(i=>i.value===value)?.label}<ChevronDown size={16}/></Button></PopoverTrigger><PopoverContent collisionPadding={{top:80,right:16,bottom:16,left:16}} sideOffset={8} align="start" className="hh-catalog-popover" data-pointer-open={pointerFocus||undefined}><Command defaultValue={value||'all'}><CommandInput aria-label={zh?`搜索${label}`:`Search ${label.toLowerCase()}`} placeholder={zh?'搜索选项…':'Search options…'}/><CommandList aria-label={label}><CommandEmpty>{zh?'没有匹配选项':'No matching options'}</CommandEmpty>{options.map(item=><CommandItem className="archive-filter-option" data-checked={item.value===value} key={item.value} value={item.value||'all'} keywords={[item.label]} onSelect={()=>{onChange(item.value);setOpen(false);}}><span>{item.label}</span><span className="archive-filter-count">{item.count}</span></CommandItem>)}</CommandList></Command></PopoverContent></Popover>;
}
