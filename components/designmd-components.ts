import {parseDesignDocument} from './designmd-document';
import type {ReferenceComponent} from './reference-component-preview';

/** Preserve declared names and descriptions, without treating prose as executable UI. */
export function designDocumentComponents(markdown:string):ReferenceComponent[]{
 const {body,frontmatter}=parseDesignDocument(markdown);const result:ReferenceComponent[]=[];
 // Scan indentation instead of interpreting arbitrary YAML tags or aliases.
 let inside=false,current:ReferenceComponent|undefined;
 for(const line of frontmatter.split('\n')){
  if(/^components:\s*$/.test(line)){inside=true;continue;}
  if(inside&&/^\S/.test(line))inside=false;
  if(!inside)continue;
  const key=line.match(/^  ([\w-]+):\s*$/);
  if(key){current={name:key[1],role:key[1],description:''};result.push(current);}
  else if(current&&line.trim())current.description+=(current.description?'\n':'')+line.trim();
 }
 current=undefined;
 let inSection=false,fenced=false;
 for(const line of body.split('\n')){
  if(/^\s*(```|~~~)/.test(line)){fenced=!fenced;continue;}if(fenced)continue;
  if(/^#{1,2} /.test(line)){inSection=/^#{1,2}\s+.*components?/i.test(line);current=undefined;continue;}
  if(!inSection)continue;
  const item=line.match(/^[-*]\s+\*\*(.+?)(?::)?\*\*:?\s*(.*)$/)||line.match(/^#{3,6}\s+(.+)$/);
  if(item){const name=item[1].replace(/:$/,'');current={name,role:name,description:item[2]||''};result.push(current);continue;}
  if(current&&line.trim())current.description+='\n'+line.trim();
 }
 const unique=new Map<string,ReferenceComponent>();
 for(const component of result){const key=component.name.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean).sort().join('');const existing=unique.get(key);if(existing)existing.description+='\n'+component.description;else unique.set(key,component);}
 return [...unique.values()];
}
