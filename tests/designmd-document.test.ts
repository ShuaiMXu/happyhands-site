import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parseDesignDocument} from '../components/designmd-document';

test('all imported documents retain readable content, navigation and colors',()=>{
 const entries=JSON.parse(readFileSync('public/design-archive/index.json','utf8')).filter((entry:{source?:string})=>entry.source==='designmd.app');
 assert.equal(entries.length,806);
 for(const entry of entries){
  const doc=parseDesignDocument(readFileSync(`public/design-archive/${entry.slug}/design.md`,'utf8'));
  assert.ok(doc.body.trim(),entry.slug);
  assert.ok(doc.sections.length,entry.slug);
  assert.ok(doc.colors.length,entry.slug);
 }
});
test('palette excludes prohibition examples and code fences; source body stays intact',()=>{
 const body='## Colors\nBlue #0080FF\n```css\n## Fake\ncolor: #FFFFFF;\n```\n## Avoid\nDo not use #000000';
 const result=parseDesignDocument(`---\ncolors:\n  primary: "#0080FF"\n---\n${body}`);
 assert.equal(result.body,body);
 assert.deepEqual(result.colors,['#0080FF']);
 assert.deepEqual(result.sections.map(item=>item.title),['Colors','Avoid']);
});
