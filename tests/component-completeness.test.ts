import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  buildOriginalComponentPreview, designSampleFamily, designSampleTokens, sampleFamilies,
  type ReferenceComponent,
} from '../components/reference-component-preview';
import { designDocumentComponents } from '../components/designmd-components';

const entries = JSON.parse(readFileSync('public/design-archive/index.json', 'utf8')) as { slug: string; source?: string }[];
const example = (name: string): ReferenceComponent => ({ name, role: name, description: '' });

test('all archive declarations retain their name and resolve to a shared family, an isolated original', () => {
  const modes = new Set([...sampleFamilies, 'original']);
  const totals = { structured: 0, imported: 0 };
  for (const entry of entries) {
    const file = (name: string) => readFileSync(`public/design-archive/${entry.slug}/${name}`, 'utf8');
    const components: ReferenceComponent[] = entry.source
      ? designDocumentComponents(file('design.md'))
      : JSON.parse(file('design-system.json')).components;
    totals[entry.source ? 'imported' : 'structured'] += components.length;
    for (const component of components) {
      assert(component.name.trim(), entry.slug);
      assert(modes.has(designSampleFamily(component)), `${entry.slug}: ${component.name}`);
    }
  }
  assert.equal(totals.structured, 15214);
  assert(totals.imported > 2000);
});

test('different source names converge on the same shared component', () => {
  for (const [name, family] of [
    ['Primary Button', 'button'], ['Ghost Outline Button', 'button'], ['主要按钮', 'button'],
    ['Search field', 'input'], ['输入框', 'input'], ['Dropdown', 'select'], ['Select', 'select'],
    ['内容卡片', 'card'], ['Graphite Card', 'card'], ['Liquid Tabs', 'tabs'],
    ['Avatar Stack', 'avatar'], ['Unknown Custom Thing', 'shape'], ['Dot Grid Logo Mark', 'brand'],
    ['Browser Frame', 'media'], ['Log Bar Histogram', 'diagram'],
    ['Cart Icon', 'icon'], ['Editorial Serif Statement', 'typography'], ['page', 'composition'],
  ]) assert.equal(designSampleFamily(example(name)), family, name);
});

test('frontmatter and prose combine into one declaration and preserve original parameters', () => {
  const components = designDocumentComponents('---\ncomponents:\n  button-primary:\n    padding: 12px\n---\n## Components\n- **Primary Button:** Rounded action\n- **Cards:** Spacious surface');
  assert.equal(components.length, 2);
  assert.match(components[0].description, /padding: 12px/);
  assert.match(components[0].description, /Rounded action/);
  assert.equal(designSampleTokens(components[0]).padding, '12px');
  assert.deepEqual(
    designDocumentComponents('## Components\n- **主要按钮:** 保存\n- **输入框:** 录入\n- **内容卡片:** 展示').map(c => c.name),
    ['主要按钮', '输入框', '内容卡片'],
  );
});

test('source token values are validated before reaching a shared sample', () => {
  const variant = { ...example('Primary Button'), description: 'rounded: 16px\npadding: 1rem\nbackgroundColor: "#5266eb"\nNo border' };
  assert.deepEqual(designSampleTokens(variant), { radius: '16px', padding: '1rem', fill: '#5266eb', ink: undefined, size: undefined, borderless: true });
  const unsafe = { ...variant, description: 'rounded: url(https://example.com)\npadding: 1px!important\nbackgroundColor: #abcd' };
  assert.deepEqual(designSampleTokens(unsafe), { radius: undefined, padding: undefined, fill: undefined, ink: undefined, size: undefined, borderless: false });
});

test('original HTML takes precedence and stays inside a static, network-restricted preview', () => {
  const original = { ...example('Source dropdown'), html: '<select><option>Original</option></select>' };
  assert.equal(designSampleFamily(original), 'original');
  const html = buildOriginalComponentPreview(original);
  assert.match(html, /default-src 'none'/);
  assert.match(html, /form-action 'none'/);
  assert.match(html, /<body inert><select><option>Original/);
  assert.doesNotMatch(html, /script-src/);
});

test('image hover excludes video cards and reduced motion', () => {
  const css = readFileSync('packages/ui/resource-image-hover.css', 'utf8');
  assert.match(css, /prefers-reduced-motion:no-preference/);
  assert.match(css, /hover:hover/);
  assert.match(css, /:has\(video\)/);
  assert.match(css, /archive-card-image-only/);
  assert.doesNotMatch(css, /video \{|data-preview/);
});
