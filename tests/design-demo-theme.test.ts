import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {designDemoTheme,validColor} from '../components/design-demo-theme';
const read=(slug:string,file='design.md')=>readFileSync(`public/design-archive/${slug}/${file}`,'utf8');
test('all 2148 references generate validated themes without executing source',()=>{
 const entries=JSON.parse(readFileSync('public/design-archive/index.json','utf8'));assert.equal(entries.length,2148);
 for(const entry of entries){
  const system=entry.source?undefined:JSON.parse(read(entry.slug,'design-system.json'));
  const theme=designDemoTheme(read(entry.slug),system);
  for(const key of ['accent','background','surface','ink','border','onAccent'] as const)assert.ok(validColor(theme[key]),`${entry.slug}: ${key}`);
  assert.ok(theme.source.length+theme.fallback.length>=10,entry.slug);
 }
});
test('themes retain source-specific colors, radii and fonts',()=>{
 const swiss=designDemoTheme(read('designmd-library-swiss-design'));
 const soft=designDemoTheme(read('designmd-library-neumorphism'));
 assert.equal(swiss.accent,'#e2001a');assert.equal(swiss.radius,'0px');assert.match(swiss.font,/Helvetica/);
 assert.equal(soft.radius,'14px');assert.equal(soft.cardRadius,'28px');
 const mercury=designDemoTheme(read('mercury-3172cd4d'),JSON.parse(read('mercury-3172cd4d','design-system.json')));
 assert.equal(mercury.accent,'#5266eb');assert.equal(mercury.background,'#171721');
});
test('unsafe CSS values and unresolved references use documented defaults',()=>{
 const theme=designDemoTheme('---\ncolors:\n  primary: "red; background:url(https://bad.example)"\ncomponents:\n  button-primary:\n    rounded: "{missing.value}"\ntypography:\n  body-md:\n    fontFamily: "</style><script>alert(1)</script>"\n---\n## Sample');
 assert.equal(theme.accent,'#171717');assert.equal(theme.radius,'8px');assert.equal(theme.font,'system-ui, sans-serif');assert.ok(theme.fallback.includes('accent'));
});
test('Manga preview keeps surface and action text readable without rewriting source',()=>{
 const theme=designDemoTheme(read('designmd-library-manga-instructional-comic'));
 assert.equal(theme.background,'#FFFFFF');assert.equal(theme.surface,'#000000');
 assert.equal(theme.onSurface,'#ffffff');assert.equal(theme.onAccent,'#000000');
 assert.deepEqual(theme.adjustments,['surface text','button text']);
});

test('all generated themes have readable page, surface and action text',async()=>{
 const {contrastRatio}=await import('../components/design-demo-theme');
 const entries=JSON.parse(readFileSync('public/design-archive/index.json','utf8'));
 for(const entry of entries){
  const theme=designDemoTheme(read(entry.slug),entry.source?undefined:JSON.parse(read(entry.slug,'design-system.json')));
  for(const [fg,bg] of [[theme.ink,theme.background],[theme.onSurface,theme.surface],[theme.onAccent,theme.accent]])assert.ok(contrastRatio(fg,bg)>=4.5,entry.slug);
 }
});
