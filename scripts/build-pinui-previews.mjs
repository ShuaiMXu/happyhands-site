import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {basename,resolve} from 'node:path';
const registry=JSON.parse(await readFile('public/components/pin-ui/registry.json','utf8'));
const footer=JSON.parse(await readFile('public/components/pin-ui/synais-footer.json','utf8'));
const root='components/pinui-preview/generated';await mkdir(root,{recursive:true});const manifest={};
for(const item of [...registry.items,footer]){
 await writeFile(`public/components/pin-ui/${item.name}.json`,JSON.stringify(item,null,2)+'\n');
 let entry='';for(const file of item.files){const name=basename(file.path);let source=file.content;
 // Only the preview adapter replaces Next's font loader; archived source stays byte-for-byte.
 if(item.name==='synais-footer')source=source.replace(/import \{ Inter_Tight \} from "next\/font\/google";\n/,'').replace(/const interTight = Inter_Tight\([^;]+;/,'const interTight = {variable:""};');
 // Keep demonstration media hosted by its owner; do not redistribute it as MIT code.
 source=source.replaceAll('"/library/', '"https://raw.githubusercontent.com/shadcn-labs/Pin-UI/main/public/library/');
 await writeFile(`${root}/${name}`,source);if(name.endsWith('.tsx')&&/export default function/.test(source)&&!entry)entry=name;
 }
 manifest[item.name]={entry,title:item.title||item.name,description:item.description||''};
}
await writeFile(`${root}/catalog.json`,JSON.stringify(manifest,null,2));console.log('PinUI source previews',Object.keys(manifest).length);

await import('./register-pinui.mjs');
