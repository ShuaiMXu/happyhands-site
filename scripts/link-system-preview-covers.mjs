import {readFile,writeFile} from 'node:fs/promises';
const catalog=JSON.parse(await readFile('public/resources/v1/index.json','utf8'));
const covers=JSON.parse(await readFile('public/resources/v1/covers.json','utf8'));
const evidence=JSON.parse(await readFile('public/resources/v1/preview-evidence.json','utf8'));
const rendered=new Set(evidence.map(r=>r.id));
let count=0;
for(const row of catalog.resources){
 if(row.type!=='system'||!row.system||!row.path.includes('/components/'))continue;
 const name=row.path.split('/').at(-1).replace(/\.md$/,'');
 const component=catalog.resources.find(r=>r.type==='component'&&r.system===row.system&&r.path.endsWith('/'+name+'.json')&&rendered.has(r.id));
 if(component&&covers[component.id]){covers[row.id]=covers[component.id];count++}
}
await writeFile('public/resources/v1/covers.json',JSON.stringify(covers,null,2)+'\n');
console.log(`Linked ${count} system documents to captured component covers`);
