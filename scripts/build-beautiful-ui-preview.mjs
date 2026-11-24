import { compile } from '@tailwindcss/node';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { adaptPromptBar, adaptSidebar } from './beautiful-ui-live-adapter.mjs';

const preview = 'components/beautiful-preview';
const registry = 'public/collections/beautiful-ui/registry';
const license = await readFile('public/collections/beautiful-ui/LICENSE');
const names = JSON.parse(await readFile(preview + '/catalog.json', 'utf8'));
const sources = await Promise.all(['main.tsx', 'IceCreamHarness.tsx', 'review-runtime.tsx'].map((file) => readFile(preview + '/' + file, 'utf8')));
const forkDialog = await readFile('public/collections/beautiful-ui/source/UseThisHarness.tsx', 'utf8');
await mkdir(preview + '/upstream/site', { recursive: true });
await writeFile(preview + '/upstream/site/UseThisHarness.tsx', forkDialog);
sources.push(forkDialog);
const styles = [await readFile('public/collections/beautiful-ui/source/globals.css', 'utf8')];
const icons = {
  IconArrowBoxLeft: 'LogOut', IconCheckmark1Small: 'Check', IconChevronDownSmall: 'ChevronDown',
  IconCrossSmall: 'X', IconEditBig: 'SquarePen', IconHome: 'House', IconMagnifyingGlass: 'Search',
  IconPlusMedium: 'Plus', IconPopsicle2: 'Popsicle', IconSettingsGear1: 'Settings',
  IconSidebarLeftArrow: 'PanelLeftClose', IconUserAdd: 'UserPlus',
};

for (const name of Object.keys(names)) {
  const item = JSON.parse(await readFile(registry + '/' + name + '.json', 'utf8'));
  for (const file of item.files) {
    const match = /^components\/(atoms|primitives)\/([A-Za-z0-9]+\.tsx)$/.exec(file.path);
    if (!match) continue;
    const output = preview + '/upstream/' + match[1];
    await mkdir(output, { recursive: true });
    let code = file.content
      .replaceAll('"@/lib/utils"', '"../../../../packages/ui/shadcn/utils"')
      .replace(/"@\/components\/(atoms|primitives)\//g, '"../$1/')
      .replace(/import \{ (\w+) \} from "@central-icons-react\/[^"]+";/g, (_, name) => {
        if (!icons[name]) throw new Error('Unknown sidebar icon: ' + name);
        return 'import { ' + icons[name] + ' as ' + name + ' } from "lucide-react";';
      });
    if (match[2] === 'PromptBar.tsx') code = adaptPromptBar(code);
    if (match[2] === 'SidebarNav.tsx') code = adaptSidebar(code);
    await writeFile(output + '/' + match[2], code);
    sources.push(code);
  }
}
await writeFile(preview + '/upstream/LICENSE', license);
const compiler = await compile(styles.join('\n') + `
@font-face { font-family: 'Beautiful Inter'; src: url('/fonts/inter/files/inter-latin-wght-normal.woff2') format('woff2'); font-weight: 100 900; font-display: swap; }
@font-face { font-family: 'Beautiful Mono'; src: url('/fonts/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2') format('woff2'); font-weight: 100 900; font-display: swap; }
:root { --font-inter: 'Beautiful Inter', Inter, system-ui, sans-serif; --font-mono-face: 'Beautiful Mono', monospace; }
.beautiful-preview { display: grid; grid-template-columns: minmax(0, 1fr); gap: 16px; place-items: start center; min-height: 160px; padding: clamp(16px, 4vw, 36px); }
.beautiful-preview > * { max-width: 100%; }
.beautiful-preview > [data-preview-specimen="flowchart"] { width: 100%; min-width: 0; }
.beautiful-preview-note { color: var(--ink-2); font-size: 13px; }
.beautiful-swatches { display:flex; flex-wrap:wrap; gap: 10px; }
.beautiful-swatch { display:grid; gap:6px; color:var(--ink-2); font:12px var(--font-mono); }
.beautiful-swatch i { width:72px; height:48px; border:1px solid var(--line); border-radius:10px; }
@media (prefers-reduced-motion: reduce) {
  .beautiful-preview *, .beautiful-preview *::before, .beautiful-preview *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
`, { base: process.cwd(), onDependency() {} });
const candidates = [...new Set(sources.join(' ').match(/[^\s"'`<>{}=]+/g))];
await writeFile(preview + '/generated.css', compiler.build(candidates));
