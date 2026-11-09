// Read-only: never import or adopt upstream changes automatically.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const hash=b=>createHash('sha256').update(b).digest('hex');
const findings=[];
for(const system of ['quartz','lime','glaze','sodium']) {
 const original=JSON.parse(await readFile(`public/design-how/${system}/registry/index.json`,'utf8'));
 const targets=[['registry.json',`public/design-how/${system}/registry/index.json`],...original.items.map(item=>[item.name+'.json',`public/design-how/${system}/registry/items/${item.name}.json`])];
 for(let start=0;start<targets.length;start+=8) await Promise.all(targets.slice(start,start+8).map(async([name,path])=>{
  const url=`https://design.how/r/${system}/${name}`;
  try {
   const response=await fetch(url,{signal:AbortSignal.timeout(15000)});if(!response.ok)throw Error(`HTTP ${response.status}`);
   const text=await response.text();const current=JSON.stringify(JSON.parse(text));const pinned=JSON.stringify(JSON.parse(await readFile(path,'utf8')));
   if(hash(current)!==hash(pinned))findings.push({url,status:'changed',pinned:hash(pinned),upstream:hash(current)});
  }catch(error){findings.push({url,status:'unavailable',reason:error.message});}
 }));
}
await writeFile('registry-drift-report.json',JSON.stringify({checkedAt:new Date().toISOString(),findings},null,2)+'\n');
console.log(`${findings.length} changed or unavailable upstream registry files; see registry-drift-report.json`);
if(findings.length)process.exitCode=1;
