import test from "node:test";
import assert from "node:assert/strict";
import { auditRegistry } from "../scripts/audit-registry.mjs";
import { zipEntries, unzipEntries } from "../scripts/registry-zip.mjs";
test("all hosted artifacts, dependency graphs, embedded source, metadata and ZIP downloads agree", async () => {
  const result = await auditRegistry();
  assert.equal(result.items, 308);
  assert.ok(result.publishedArtifacts > 620);
  assert.ok(
    result.buttonBytesAcrossFourSystems.after <
      result.buttonBytesAcrossFourSystems.before,
  );
});
test("registry ZIPs round-trip UTF-8 source and detect payload corruption", () => {
  const bytes = zipEntries([
    ["source/组件.tsx", Buffer.from('export const label="中文";')],
    ["empty.css", Buffer.alloc(0)],
  ]);
  const files = unzipEntries(bytes);
  assert.equal(
    files.get("source/组件.tsx").toString(),
    'export const label="中文";',
  );
  assert.equal(files.get("empty.css").length, 0);
  const changed = Buffer.from(bytes);
  changed[changed.indexOf(Buffer.from("PK\x01\x02", "binary")) + 16] ^= 1;
  assert.throws(() => unzipEntries(changed), /Corrupt/);
});

test('hosted document navigation resolves and the versioned dependency graph stays pinned', async()=>{
 const {readFile,readdir,access}=await import('node:fs/promises');
 const {registryVersion}=await import('../scripts/hosted-document.mjs');
 const root=new URL('../public/',import.meta.url);
 async function walk(path){for(const file of await readdir(new URL(path,root),{withFileTypes:true})){
  const name=path+'/'+file.name;
  if(file.isDirectory()){await walk(name);continue;}
  const text=await readFile(new URL(name,root),'utf8');
  if(name.endsWith('.md')) for(const match of text.matchAll(/https:\/\/happyhands.cc\/systems\/[^\s)"<>]+/g)) await access(new URL(match[0].split('#')[0].replace('https://happyhands.cc/',''),root));
  if(name.endsWith('.json')) {
   const payload=JSON.parse(text);
   const check=async item=>{for(const dep of item.registryDependencies||[]){assert.ok(dep.startsWith(`https://happyhands.cc/r/v/${registryVersion}/`),dep);await access(new URL(dep.replace('https://happyhands.cc/',''),root));}};
   await check(payload);for(const item of payload.items||[])await check(item);
   if(payload.name==='skill')for(const file of payload.files) {assert.ok(!file.content.includes('https://design.how/r/'));assert.ok(file.content.includes(`/r/v/${registryVersion}/`));}
  }
 }}
 await walk('systems');await walk(`r/v/${registryVersion}`);
});
