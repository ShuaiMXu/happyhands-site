import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const collection = 'motion-primitives';
const original = 'https://motion-primitives.com';
const location = `components/${collection}`;
const preview = 'components/motion-preview/generated';
const names = ['accordion', 'animated-number', 'disclosure', 'transition-panel'];
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const load = async path => JSON.parse(await readFile(path, 'utf8'));
const catalogPath = 'public/resources/v1/index.json';
const assetPath = 'public/resources/v1/assets.json';
const catalog = await load(catalogPath);
const assets = await load(assetPath);

catalog.resources = catalog.resources.filter(row => row.collection !== collection);
catalog.collections = catalog.collections.filter(row => row.id !== collection);
assets.files = assets.files.filter(row => !row.path.startsWith(location + '/'));

await mkdir(preview, { recursive: true });
for (const name of ['UPSTREAM', ...names]) {
  const overview = name === 'UPSTREAM';
  const path = `${location}/${name}.${overview ? 'md' : 'json'}`;
  const bytes = await readFile('public/' + path);
  const asset = { path, sha256: hash(bytes), bytes: bytes.length };
  assets.files.push(asset);
  const item = overview ? undefined : JSON.parse(bytes);
  const cover = item && `${location}/cover-${name}.png`;
  if (item) {
    const coverBytes = await readFile('public/' + cover);
    assets.files.push({ path: cover, sha256: hash(coverBytes), bytes: coverBytes.length });
    if (item.name !== name || item.files.length !== 1 || typeof item.files[0].content !== 'string') {
      throw Error(`Unexpected Motion Primitives snapshot: ${name}`);
    }
    // The example resolves the consumer app's shadcn utility through the site's copy.
    const source = item.files[0].content
      .replaceAll('@/lib/utils', '../../../packages/ui/shadcn/utils')
      .replaceAll('keyof JSX.IntrinsicElements', 'keyof React.JSX.IntrinsicElements')
      .replaceAll('React.isValidElement(child)', 'React.isValidElement<{ className?: string; [key: string]: unknown }>(child)')
      .replaceAll('(child as React.ReactElement).props', 'child.props');
    await writeFile(`${preview}/${name}.tsx`, source);
  }
  catalog.resources.push({
    ...asset,
    id: overview ? `collection:${collection}/UPSTREAM.md` : `component:${collection}/${name}`,
    name: item?.title ?? 'Motion Primitives',
    type: overview ? 'collection' : 'component',
    collection,
    mimeType: overview ? 'text/markdown' : 'application/json',
    source: original,
    sourceUrl: overview ? 'https://github.com/ibelick/motion-primitives' : `${original}/docs/${name}`,
    license: 'MIT',
    authority: 'reference-data-only',
    platform: 'web',
    summary: item?.description ?? 'Animated React components for shadcn projects.',
    tags: [collection, 'shadcn', 'motion', name],
    ...(item ? { cover: '/' + cover, installation: { url: `${original}/c/${name}.json`, status: 'Upstream React shadcn registry.' } } : {}),
  });
}

catalog.collections.push({
  id: collection,
  name: 'Motion Primitives 动效',
  nameEn: 'Motion Primitives',
  group: 'components',
  source: original,
  platform: 'web',
  overview: `collection:${collection}/UPSTREAM.md`,
  access: 'reference-archive',
  count: names.length,
  types: ['component'],
});
catalog.resources.sort((a, b) => a.id.localeCompare(b.id));
assets.files.sort((a, b) => a.path.localeCompare(b.path));
catalog.version = hash(JSON.stringify({ collections: catalog.collections, resources: catalog.resources }));
await writeFile(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
await writeFile(assetPath, JSON.stringify(assets, null, 2) + '\n');
console.log(`Registered ${names.length} Motion Primitives`);
