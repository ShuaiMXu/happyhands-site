import { readFileSync } from 'node:fs';
import { designSampleFamily, type ReferenceComponent } from '../components/reference-component-preview';
import { designDocumentComponents } from '../components/designmd-components';

const entries = JSON.parse(readFileSync('public/design-archive/index.json', 'utf8')) as { slug: string; source?: string }[];
const counts: Record<string, number> = {};
const shapes: { reference: string; component: string }[] = [];
const visualFamilies = new Set(['media', 'brand', 'diagram', 'icon', 'avatar', 'shape']);

for (const { slug, source } of entries) {
  const file = (name: string) => readFileSync(`public/design-archive/${slug}/${name}`, 'utf8');
  const components: ReferenceComponent[] = source
    ? designDocumentComponents(file('design.md'))
    : JSON.parse(file('design-system.json')).components;
  for (const component of components) {
    const family = designSampleFamily(component);
    counts[family] = (counts[family] ?? 0) + 1;
    if (visualFamilies.has(family) && process.argv.includes('--details')) {
      shapes.push({ reference: slug, component: component.name });
    }
  }
}

console.log(JSON.stringify({ references: entries.length, counts, ...(shapes.length ? { visualSpecimens: shapes } : {}) }, null, 2));
