import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
const publicRoot=resolve('public'),catalog=JSON.parse(await readFile(resolve(publicRoot,'resources/v1/index.json'))),byId=new Map(catalog.resources.map(row=>[row.id,row]));
test('supplied archives and existing component library have real, unique, hash-bound resources and exact counts',async()=>{
 assert.equal(catalog.schemaVersion,1);assert.equal(catalog.collections.length,13);assert.equal(byId.size,catalog.resources.length);
 for(const collection of catalog.collections){assert.ok(byId.has(collection.overview));assert.equal(collection.count,catalog.resources.filter(row=>row.collection===collection.id&&row.type!=='collection').length);}
 for(const row of catalog.resources){const file=resolve(publicRoot,row.path);assert.ok(file.startsWith(publicRoot+'/'));const bytes=await readFile(file);assert.equal(createHash('sha256').update(bytes).digest('hex'),row.sha256,row.id);assert.equal(bytes.length,row.bytes);assert.equal(row.authority,'reference-data-only');if(row.cover)await readFile(resolve(publicRoot,'.'+row.cover));}
});
test('existing references are reused and new sources are complete without claiming paid screens',()=>{
 assert.ok(byId.has('component:cult-ui/cosmic-button'));
 assert.equal(catalog.collections.find(row=>row.id==='motion-primitives').count,4);
 for (const name of ['accordion','animated-number','disclosure','transition-panel']) {
  const item=byId.get('component:motion-primitives/'+name);
  assert.equal(item.installation.url,`https://motion-primitives.com/c/${name}.json`);
  assert.ok(item.cover.endsWith(`/cover-${name}.png`));
 }
 assert.equal(catalog.resources.filter(row=>row.collection==='ottermind').length,202);
 assert.equal(catalog.resources.filter(row=>row.collection==='app-tokens'&&row.type==='tokens').length,6);
 assert.equal(catalog.resources.filter(row=>row.collection==='brand-registry'&&row.type==='component').length,308);
 assert.equal(catalog.collections.find(row=>row.id==='mobbin-archive').access,'public-documents-only');
 assert.ok(byId.get('design-md:mercury-3172cd4d').path.startsWith('design-archive/'));
});
test('derived brand registry has resolved local install dependencies and preserves original payloads',async()=>{
 for(const row of catalog.resources.filter(row=>row.collection==='brand-registry'&&row.type==='component')){
  const text=await readFile(resolve(publicRoot,row.path),'utf8');assert.ok(!text.includes('http://localhost:8080'),row.id);const data=JSON.parse(text);
  assert.ok(row.installation.originalSha256);
  for(const dependency of data.registryDependencies||[]){if(dependency.startsWith('https://happyhands.cc/'))await readFile(resolve(publicRoot,new URL(dependency).pathname.slice(1)));}
  const original=await readFile(resolve(publicRoot,'collections/brand-registry',row.path));assert.equal(createHash('sha256').update(original).digest('hex'),row.installation.originalSha256);
 }
});

test('every copied archive asset retains its complete published bytes',async()=>{
 const manifest=JSON.parse(await readFile(resolve(publicRoot,'resources/v1/assets.json')));
 for(const asset of manifest.files){const bytes=await readFile(resolve(publicRoot,asset.path));assert.equal(bytes.length,asset.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256,asset.path);}
});
