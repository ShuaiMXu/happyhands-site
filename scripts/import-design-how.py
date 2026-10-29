"""Publish supplied design.how docs and a self-hosted shadcn registry.

Usage: python3 scripts/import-design-how.py /absolute/path/to/design-how-systems
Component source is preserved byte for byte and published as data, not executed.
"""
import hashlib
import json
import pathlib
import re
import shutil
import sys
import zipfile

source = pathlib.Path(sys.argv[1]).resolve()
root = pathlib.Path(__file__).resolve().parents[1]
public = root / 'public'
archive = public / 'design-how'
base = 'https://happyhands.cc'
upstream = 'https://design.how'
index = json.loads((source / 'index.json').read_text())
catalog = {'generatedAt': index['generated_at'], 'source': upstream, 'systems': [], 'reading': []}
manifest = []

def publish(file, dest):
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(file, dest)
    manifest.append({'path': str(dest.relative_to(public)), 'sha256': hashlib.sha256(file.read_bytes()).hexdigest()})

def doc_title(file):
    match = re.search(r'^# (.+)$', file.read_text(), re.M)
    return match[1] if match else file.stem.replace('-', ' ').title()

def hosted_text(text):
    return text.replace(upstream + '/r/', base + '/r/')

def hosted_registry(value):
    if isinstance(value, str):
        return hosted_text(value)
    if isinstance(value, list):
        return [hosted_registry(v) for v in value]
    if not isinstance(value, dict):
        return value
    result = {}
    for key, item in value.items():
        if key == 'files':
            result[key] = item
        elif isinstance(item, str):
            result[key] = hosted_text(item)
            if key in {'docs', 'page'} and item.startswith(upstream + '/systems/'):
                path = item.removeprefix(upstream + '/systems/').removesuffix('.md').strip('/')
                if '/' not in path:
                    path += '/index'
                result[key] = f'{base}/design-how/{path}.md'
        else:
            result[key] = hosted_registry(item)
    return result

for system in index['systems']:
    slug = system['slug']
    if slug not in {'sodium', 'glaze', 'quartz', 'lime'}:
        raise ValueError('Unexpected system')
    folder = source / slug
    for file in sorted(folder.rglob('*')):
        if file.is_file():
            publish(file, archive / slug / file.relative_to(folder))
    docs = []
    for kind, section in [('overview', [folder / 'index.md']), ('foundation', sorted((folder / 'foundations').glob('*.md'))), ('component', sorted((folder / 'components').glob('*.md')))]:
        for file in section:
            relative = str(file.relative_to(folder))
            docs.append({'path': relative, 'title': doc_title(file), 'kind': kind})
            output = public / 'systems' / slug / relative
            output.parent.mkdir(parents=True, exist_ok=True)
            output.write_text(hosted_text(file.read_text()))
    registry = public / 'r' / slug
    registry.mkdir(parents=True, exist_ok=True)
    for file in sorted((folder / 'registry/items').glob('*.json')):
        (registry / file.name).write_text(json.dumps(hosted_registry(json.loads(file.read_text())), ensure_ascii=False, indent=2) + '\n')
    registry_index = hosted_registry(json.loads((folder / 'registry/index.json').read_text()))
    registry_index['homepage'] = f'{base}/systems/{slug}/'
    (registry / 'registry.json').write_text(json.dumps(registry_index, ensure_ascii=False, indent=2) + '\n')
    catalog['systems'].append({
        'id': slug, 'name': system['title'], 'summary': system['summary'],
        'documents': docs, 'registryCount': len(list(registry.glob('*.json'))) - 1,
        'sourceCount': len(list((folder / 'src').rglob('*.*'))),
        'download': f'/design-how/{slug}.zip',
    })
    with zipfile.ZipFile(archive / f'{slug}.zip', 'w', zipfile.ZIP_DEFLATED) as bundle:
        for file in sorted((archive / slug).rglob('*')):
            if file.is_file():
                bundle.write(file, str(pathlib.Path(slug) / file.relative_to(archive / slug)))
        for file in sorted(registry.glob('*.json')):
            bundle.write(file, f'r/{slug}/{file.name}')

for section in ['guides', 'articles']:
    for file in sorted((source / section).glob('*.md')):
        publish(file, archive / section / file.name)
        catalog['reading'].append({'path': f'{section}/{file.name}', 'title': doc_title(file), 'kind': section})
publish(source / 'systems.md', archive / 'systems.md')
publish(source / 'index.json', archive / 'source-index.json')
(archive / 'catalog.json').write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n')
(archive / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
print(f'Published {len(catalog["systems"])} systems, {sum(len(s["documents"]) for s in catalog["systems"])} system documents, {len(catalog["reading"])} reading documents and {sum(s["registryCount"] for s in catalog["systems"])} registry entries')
