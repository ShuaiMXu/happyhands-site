import test from 'node:test';
import assert from 'node:assert/strict';
import {guideContent} from '../guide/content.ts';
import {workflowContent} from '../workflows/content.ts';
import {readFileSync} from 'node:fs';

for(const lang of ['zh','en']) for(const kind of ['guide','review','design']) {
 test(`${lang} ${kind}: shared static reading navigation and real help channels`,()=>{
  const html=kind==='guide'?guideContent(lang):workflowContent(kind,lang);
  assert.equal((html.match(/<h1>/g)||[]).length,1);
  assert.equal((html.match(/id="main"/g)||[]).length,1);
  assert.ok(html.indexOf('id="site-navigation"')<html.indexOf('class="wiki-columns"'));
  assert.equal((html.match(/class="wiki-header-slot"/g)||[]).length,1);
  assert.equal((html.match(/<dialog /g)||[]).length,2);
  assert.equal((html.match(/aria-current="page"/g)||[]).length,3);
  const outline=html.match(/class="guide-contents wiki-outline"[\s\S]*?<\/nav>/)[0];
  const ids=[...html.matchAll(/<section id="([^"]+)"/g)].map(x=>x[1]);
  for(const id of ids) assert.ok(outline.includes(`href="#${id}"`),`missing ${id}`);
  assert.ok(html.includes('https://github.com/ShuaiMXu/happyhands/issues'));
  assert.ok(html.indexOf('class="wiki-help"')<html.indexOf('class="wiki-pagination"'));
  assert.ok(html.indexOf('class="wiki-pagination"')<html.indexOf('class="guide-footer"'));
  if(kind==='guide') assert.ok(html.includes('rel="prev" href="/apps/portal/"'));
  const links=html.match(/class="wiki-page-scroll">([\s\S]*?)<\/div>/)[1];
  assert.equal((links.match(/<a /g)||[]).length,4);
  assert.ok(links.includes(`href="${lang==='en'?'/en':''}/guide/"`));
 });
}

test('shared CSS scopes layout and supports transparent modal/reduced motion',()=>{
 const css=readFileSync(new URL('../guide/wiki-layout.css',import.meta.url),'utf8');
 assert.match(css,/\.wiki-sheet::backdrop\s*\{\s*background:transparent/);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(css,/wiki-header-enter 320ms ease-out/);
 assert.match(css,/wiki-header-exit 120ms ease-out/);
 assert.match(css,/data-more-above="true"/);
 assert.match(css,/data-more-below="true"/);
 assert.match(css,/mask-image:linear-gradient/);
});


test('narrow navigation has a no-JavaScript fallback before enhancement',()=>{
 const css=readFileSync(new URL('../guide/wiki-layout.css',import.meta.url),'utf8');
 assert.match(css,/\.wiki-layout\.wiki-enhanced \.wiki-outline \{ display:none/);
 assert.match(css,/\.wiki-enhanced \.wiki-pages \{ display:none/);
 assert.match(css,/\.wiki-enhanced \.wiki-mobile-bar \{ display:grid/);
 assert.match(css,/\.wiki-layout:not\(\.wiki-enhanced\) \.wiki-columns \{ display:block/);
 assert.ok(!guideContent('en').includes('class="wiki-layout wiki-enhanced"'));
});


test('footer offers real guide, resource and support destinations',()=>{
 const html=guideContent('en');
 const footer=html.match(/<footer class="guide-footer">([\s\S]*?)<\/footer>/)[1];
 assert.equal((footer.match(/class="wiki-footer-section"/g)||[]).length,3);
 for(const href of ['/en/guide/','/en/ai-ui-review/','/en/ai-website-design/','/apps/studio/','/components/?provider=systems','https://github.com/ShuaiMXu/happyhands/issues','/llms.txt']) assert.ok(footer.includes(`href="${href}"`));
});
