import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {resourceTools} from '../packages/ui/resource-navigation.ts';
import {siteNavigation} from '../packages/ui/site-navigation.ts';
import {portalContent} from '../apps/portal/render-content.js';
import {guideContent} from '../guide/content.ts';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
test('retired Studio is absent from active discovery and leaves saved browser data untouched',async()=>{
 assert.ok(!resourceTools.some(x=>x.id==='studio'));
 assert.ok(!siteNavigation.some(x=>x.href.includes('/apps/studio/')));
 for(const lang of ['zh','en'])for(const html of [portalContent(lang),guideContent(lang)])assert.ok(!html.includes('/apps/studio/'));
 const page=await read('apps/studio/index.html');assert.match(page,/noindex,follow/);assert.match(page,/Theme Studio has been retired/);assert.ok(!page.includes('main.tsx'));assert.ok(!page.includes('localStorage'));
 assert.ok(!(await read('public/sitemap.xml')).includes('/apps/studio/'));
 assert.ok((await read('apps/studio/main.tsx')).includes('createRoot'));
});
