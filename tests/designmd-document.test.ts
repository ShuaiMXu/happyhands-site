import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parseDesignDocument} from '../components/designmd-document';
import {designDocumentHref,designMarkdown} from '../components/design-markdown';

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

test('Solid document model keeps Markdown tables and visible headings while omitting raw HTML',()=>{
 const result=designMarkdown('# **Product** design\n\nSecondary title\n---------------\n\n| Token | Value |\n| --- | ---: |\n| Background | White |\n\n<script>window.runArchiveScript()</script>');
 assert.deepEqual([...result.headings.values()],[
  {title:'Product design',id:'designmd-section-0'},
  {title:'Secondary title',id:'designmd-section-1'},
 ]);
 const output=JSON.stringify(result.tree);
 assert.match(output,/"tagName":"table"/);
 assert.doesNotMatch(output,/runArchiveScript|<script>/);
});
test('links in the Solid document accept useful URLs and reject executable schemes',()=>{
 assert.equal(designDocumentHref('#heading'),'#heading');
 assert.equal(designDocumentHref('https://example.com/guide'),'https://example.com/guide');
 assert.equal(designDocumentHref('java\tscript:alert(1)'),undefined);
 assert.equal(designDocumentHref('data:text/html,unsafe'),undefined);
});
