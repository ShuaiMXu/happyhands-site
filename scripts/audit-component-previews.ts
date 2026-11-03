import {readFileSync,writeFileSync} from 'node:fs';
import {componentPreviewKind,buildComponentPreview} from '../components/reference-component-preview';
import {designDocumentComponents} from '../components/designmd-components';
const entries=JSON.parse(readFileSync('public/design-archive/index.json','utf8'));
const kinds:Record<string,number>={};let legacy=0,imported=0,unrendered=0;
const schematic:Array<{reference:string;component:string;kind:string}>=[];
for(const entry of entries){
 if(entry.source){imported+=designDocumentComponents(readFileSync(`public/design-archive/${entry.slug}/design.md`,'utf8')).length;continue;}
 const system=JSON.parse(readFileSync(`public/design-archive/${entry.slug}/design-system.json`,'utf8'));
 for(const component of system.components){
  legacy++;const kind=component.html?'source':componentPreviewKind(component.name);kinds[kind]=(kinds[kind]||0)+1;
  if(!buildComponentPreview(component,system))unrendered++;
  if(['brand','avatar','icon','media','diagram','bespoke','composition'].includes(kind))schematic.push({reference:entry.slug,component:component.name,kind});
 }
}
const report={references:entries.length,legacyComponents:legacy,importedDeclaredComponents:imported,withoutPreview:unrendered,kinds,schematicCount:schematic.length,limitation:'All entries have a rendered example. Schematic entries are not original artwork or pixel-exact reconstructions.',schematic};
if(process.argv.includes('--write'))writeFileSync('docs/audits/design-component-coverage-2026-11-03.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({...report,schematic:undefined},null,2));
if(unrendered)process.exitCode=1;
