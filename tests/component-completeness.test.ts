import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {buildComponentPreview,componentPreviewKind} from '../components/reference-component-preview';
import {designDocumentComponents} from '../components/designmd-components';
const entries=JSON.parse(readFileSync('public/design-archive/index.json','utf8'));
test('every legacy component has a nonempty isolated preview',()=>{
 let count=0;
 for(const entry of entries.filter((e:{source?:string})=>!e.source)){
  const system=JSON.parse(readFileSync(`public/design-archive/${entry.slug}/design-system.json`,'utf8'));
  for(const component of system.components){const html=buildComponentPreview(component,system,'zh');assert.ok(html?.includes('<body '),`${entry.slug}: ${component.name}`);assert.ok(html?.includes("default-src 'none'"));count++;}
 }
 assert.equal(count,15214);
});
test('new document components retain declarations and render individual examples',()=>{
 let count=0;
 for(const entry of entries.filter((e:{source?:string})=>e.source)){
  const text=readFileSync(`public/design-archive/${entry.slug}/design.md`,'utf8');
  for(const component of designDocumentComponents(text)){assert.ok(buildComponentPreview(component,{},'en'));count++;}
 }
 assert.ok(count>2000);
 const sample=designDocumentComponents('---\ncomponents:\n  button-primary:\n    padding: 12px\n---\n## Components\n- **Primary Button:** Rounded action\n- **Cards:** Spacious surface');
 assert.equal(sample.length,2);assert.match(sample[0].description,/padding: 12px/);assert.match(sample[0].description,/Rounded action/);
});
test('specialized previews and honest asset placeholders do not execute descriptions',()=>{
 for(const [name,kind] of [['Logo Mark','brand'],['Loader Ring','loading'],['Compare Slider','compare'],['Avatar Stack','avatar'],['Star Rating Display','rating']])assert.equal(componentPreviewKind(name),kind);
 const html=buildComponentPreview({name:'Logo Mark',role:'<script>alert(1)</script>',description:''},{},'en')!;
 assert.ok(html.includes('original logo'));assert.ok(!html.includes('<script>alert(1)'));
 const bespoke=buildComponentPreview({name:'Unknown Custom Thing',role:'<img src=x onerror=alert(1)>',description:''},{},'en')!;
 assert.ok(bespoke.includes('not a pixel-exact reconstruction'));assert.ok(!bespoke.includes('<img src=x'));
});
test('image hover contract excludes video cards and reduced motion',()=>{
 const css=readFileSync('packages/ui/resource-image-hover.css','utf8');
 assert.match(css,/prefers-reduced-motion:no-preference/);assert.match(css,/hover:hover/);assert.match(css,/:not\(\[data-preview\]\)/);assert.match(css,/archive-card-image-only/);assert.ok(!css.includes('video {'));
});
