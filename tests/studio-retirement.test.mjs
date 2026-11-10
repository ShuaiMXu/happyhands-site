import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {resourceTools} from '../packages/ui/resource-navigation.ts';
import {siteNavigation} from '../packages/ui/site-navigation.ts';
import {portalContent} from '../apps/portal/render-content.js';
import {guideContent} from '../guide/content.ts';
import {workflowContent} from '../workflows/content.ts';
import {nonprofitContent} from '../workflows/nonprofit.ts';
import {seoData} from '../packages/ui/site-seo.ts';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
test('retired Studio is absent from active discovery and leaves saved browser data untouched',async()=>{
 assert.ok(!resourceTools.some(x=>x.id==='studio'));
 assert.ok(!siteNavigation.some(x=>x.href.includes('/apps/studio/')));
 for(const lang of ['zh','en'])for(const html of [portalContent(lang),guideContent(lang),workflowContent('review',lang),workflowContent('design',lang),nonprofitContent(lang)])assert.ok(!html.includes('/apps/studio/'));
 const page=await read('apps/studio/index.html');assert.match(page,/noindex,follow/);assert.match(page,/Theme Studio has been retired/);assert.ok(!page.includes('main.tsx'));assert.ok(!page.includes('localStorage'));
 assert.ok(!(await read('public/sitemap.xml')).includes('/apps/studio/'));
 assert.ok((await read('apps/studio/main.tsx')).includes('createRoot'));
});


test('public design-system UI and guide search descriptions do not promote retired editing',async()=>{
 const system=await read('systems/happyhands/main.tsx');
 assert.doesNotMatch(system,/Theme Studio|主题工作室|\/apps\/studio\//);
 assert.ok(system.includes('localized("/components/")'));
 assert.ok(system.includes('localized("/guide/") + "#design"'));
 for(const key of ['guide','guideEn'])for(const lang of ['zh','en'])assert.doesNotMatch(seoData(key,lang).description,/theme customization|主题自定义/i);
});

test('README documents retirement and preserves source without advertising an active editor',async()=>{
 const readme=await read('README.md');
 assert.match(readme,/The public Theme Studio has been retired/);
 assert.match(readme,/Existing browser drafts are not deleted/);
 assert.match(readme,/主题工作室已停用/);
 assert.match(readme,/https:\/\/happyhands\.cc\/en\/components\//);
 assert.doesNotMatch(readme,/Theme Studio — project themes|Theme Studio: `|Reviewed themes can be exported|Studio can\s+preview|Studio 的未导出主题草稿仍走/);
});
