import { readFile, readdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const collection = 'beautiful-ui';
const folder = 'collections/' + collection;
const revision = '44a274e598395ab61e7c96c26fda2758780253b7';
const source = 'https://www.beautifului.dev';
const repository = 'https://github.com/slev12397/beautiful-ui';
const digest = (value) => createHash('sha256').update(value).digest('hex');
const readPublic = (path) => readFile('public/' + path);
const json = async (path) => JSON.parse(await readPublic(path));
const index = await json('resources/v1/index.json');
const assets = await json('resources/v1/assets.json');
const registry = await json(folder + '/registry/registry.json');

index.resources = index.resources.filter((record) => record.collection !== collection);
index.collections = index.collections.filter((record) => record.id !== collection);
assets.files = assets.files.filter(({ path }) => !path.startsWith(folder + '/'));

async function asset(path) {
  const file = await readPublic(path);
  const entry = { path, sha256: digest(file), bytes: file.length };
  assets.files.push(entry);
  return entry;
}

const attribution = {
  collection, source, sourceRevision: revision, license: 'MIT', authority: 'reference-data-only', platform: 'web',
};
const overview = 'collection:beautiful-ui/index.md';
const cover = folder + '/cover.webp';
await asset(cover);
const coverFiles = new Set(await readdir('public/' + folder + '/covers'));
index.resources.push({
  ...await asset(folder + '/index.md'), ...attribution, id: overview, name: 'Beautiful UI',
  type: 'guideline', mimeType: 'text/markdown', sourceUrl: repository, cover: '/' + cover,
  summary: 'Design tokens and components for agent activity, approvals and code review.',
});
for (const item of registry.items) {
  const path = folder + '/registry/' + item.name + '.json';
  const payload = await json(path);
  const coverFile = item.name + '.webp';
  const itemCover = folder + '/covers/' + coverFile;
  if (coverFiles.has(coverFile)) await asset(itemCover);
  index.resources.push({
    ...await asset(path), ...attribution, id: 'component:beautiful-ui/' + item.name,
    name: item.title, type: 'component', mimeType: 'application/json',
    sourceUrl: repository + '/blob/' + revision + '/public/r/' + item.name + '.json',
    ...(coverFiles.has(coverFile) ? { cover: '/' + itemCover } : {}),
    summary: payload.description || item.title, tags: [item.name, 'AI interface'],
    installation: { url: source + '/r/' + item.name + '.json', status: 'Upstream registry. Check dependencies and licenses before installing.' },
  });
}
await asset(folder + '/registry/registry.json');
await asset(folder + '/LICENSE');
for (const file of await readdir('public/' + folder + '/source')) await asset(folder + '/source/' + file);
index.collections.push({
  id: collection, name: 'Beautiful UI', nameEn: 'Beautiful UI', group: 'components', platform: 'web', source,
  overview, cover: '/' + cover, access: 'reference-archive', types: ['guideline', 'component'], count: registry.items.length + 1,
});
index.resources.sort((a, b) => a.id.localeCompare(b.id));
assets.files.sort((a, b) => a.path.localeCompare(b.path));
index.version = digest(JSON.stringify({ collections: index.collections, resources: index.resources }));
await writeFile('public/resources/v1/index.json', JSON.stringify(index, null, 2) + '\n');
await writeFile('public/resources/v1/assets.json', JSON.stringify(assets, null, 2) + '\n');
