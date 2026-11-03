import {readFileSync,writeFileSync} from 'node:fs';
import {designDemoTheme,contrastRatio} from '../components/design-demo-theme';
const entries=JSON.parse(readFileSync('public/design-archive/index.json','utf8'));
const adjustments=[];const failures=[];
for(const entry of entries){
 const base=`public/design-archive/${entry.slug}/`;
 const theme=designDemoTheme(readFileSync(base+'design.md','utf8'),entry.source?undefined:JSON.parse(readFileSync(base+'design-system.json','utf8')));
 if(theme.adjustments.length)adjustments.push({slug:entry.slug,adjustments:theme.adjustments});
 for(const [role,fg,bg] of [['page',theme.ink,theme.background],['surface',theme.onSurface,theme.surface],['action',theme.onAccent,theme.accent]])if(contrastRatio(fg,bg)<4.5)failures.push({slug:entry.slug,role});
}
const report={entries:entries.length,checked:'Generated basic preview page, surface and action text pairs; not original artwork or a full accessibility audit',failures,adjustments,visualReview:'Representative desktop/phone review recorded separately; this is not manual inspection of 2148 pages.'};
writeFileSync('docs/audits/preview-quality-2026-11-03.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({entries:entries.length,failures:failures.length,adjustedReferences:adjustments.length}));
if(failures.length)process.exitCode=1;
