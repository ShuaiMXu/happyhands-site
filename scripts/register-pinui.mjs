import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const catalog=JSON.parse(await readFile('public/resources/v1/index.json','utf8'));
const registry=JSON.parse(await readFile('public/components/pin-ui/registry.json','utf8'));
const footer=JSON.parse(await readFile('public/components/pin-ui/synais-footer.json','utf8'));
const items=[...registry.items,footer];
catalog.resources=catalog.resources.filter(r=>r.collection!=='pin-ui');
catalog.collections=catalog.collections.filter(r=>r.id!=='pin-ui');
const assets=JSON.parse(await readFile('public/resources/v1/assets.json','utf8'));
assets.files=assets.files.filter(r=>!r.path.startsWith('components/pin-ui/'));
for(const item of [{name:'UPSTREAM',title:'PinUI',overview:true},...items]){
 const path=`components/pin-ui/${item.name}.${item.overview?'md':'json'}`;
 const bytes=await readFile('public/'+path);
 const record={path,sha256:hash(bytes),bytes:bytes.length};assets.files.push(record);
 catalog.resources.push({...record,id:item.overview?'collection:pin-ui/UPSTREAM.md':`component:pin-ui/${item.name}`,name:item.title||item.name,type:item.overview?'collection':'component',collection:'pin-ui',mimeType:item.overview?'text/markdown':'application/json',source:'https://www.pinui.xyz',sourceUrl:item.overview?'https://github.com/shadcn-labs/Pin-UI':`https://www.pinui.xyz/${item.name==='synais-footer'?'blocx':'components'}/${item.name}`,license:'MIT component code. PinUI brand and demo media excluded; see upstream terms.',authority:'reference-data-only',platform:'web',summary:item.description||'PinUI source components',tags:['pin-ui',item.name],...(!item.overview?{installation:{url:`https://www.pinui.xyz/r/${item.name==='synais-footer'?'blocx/':''}${item.name}.json`,status:'Original upstream registry; inspect dependencies and license before installation.'}}:{})});
}
catalog.collections.push({id:'pin-ui',name:'PinUI 组件',nameEn:'PinUI components',group:'components',source:'https://www.pinui.xyz',platform:'web',overview:'collection:pin-ui/UPSTREAM.md',access:'reference-archive',count:items.length,types:['component']});
catalog.resources.sort((a,b)=>a.id.localeCompare(b.id));assets.files.sort((a,b)=>a.path.localeCompare(b.path));
catalog.version=hash(JSON.stringify({collections:catalog.collections,resources:catalog.resources}));
await writeFile('public/resources/v1/index.json',JSON.stringify(catalog,null,2)+'\n');
await writeFile('public/resources/v1/assets.json',JSON.stringify(assets,null,2)+'\n');
console.log('Registered PinUI',items.length);
