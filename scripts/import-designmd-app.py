"""Import designmd.app documents and covers without executing archived content.
Usage: python3 scripts/import-designmd-app.py /path/to/designmd-archive
Original documents remain byte-for-byte intact. Re-running replaces this source's
entries only, retaining other archive providers and stable namespaced URLs.
"""
import hashlib
import json
from pathlib import Path
import re
import shutil
import sys

source = Path(sys.argv[1]).resolve()
target = Path(__file__).resolve().parents[1] / 'public/design-archive'
entries = json.loads((source / 'index.json').read_text())
prepared, seen = [], set()
for entry in entries:
    kind, name = entry['kind'], entry['slug']
    if kind not in ('library', 'brands') or not re.fullmatch(r'[a-z0-9-]+', name):
        raise ValueError(f'Invalid source identity: {kind}/{name}')
    slug = f'designmd-{kind}-{name}'
    if slug in seen:
        raise ValueError(f'Duplicate identity: {slug}')
    seen.add(slug)
    folder = (source / entry['folder']).resolve()
    if not folder.is_relative_to(source):
        raise ValueError('Source folder escapes archive')
    document = folder / 'design.md'
    if not document.resolve().is_relative_to(source) or not document.read_bytes().strip():
        raise ValueError(f'Missing or invalid document: {slug}')
    cover = folder / 'cover.png'
    if cover.exists() and not cover.resolve().is_relative_to(source):
        raise ValueError('Cover escapes archive')
    for field in ('page_url', 'design_url'):
        if not entry[field].startswith('https://designmd.app/'):
            raise ValueError(f'Unexpected source URL: {slug}')
    digest = hashlib.sha256(document.read_bytes()).hexdigest()
    row = dict(slug=slug, name=entry['title'], site_url=entry['page_url'],
        page_url=entry['page_url'], source='designmd.app', sourceKind=kind,
        sourceDocument=entry['design_url'], theme='unspecified', industry='other',
        north_star=entry.get('description', ''), fonts=[], video='',
        cover=f'/design-archive/{slug}/cover.png' if cover.exists() else None,
        sha256=digest, sourceSha256=digest)
    prepared.append((row, document, cover))
previous = json.loads((target / 'index.json').read_text())
retained = [row for row in previous if row.get('source') != 'designmd.app']
if seen.intersection(row['slug'] for row in retained):
    raise ValueError('Namespaced slug collides with another provider')
for row, document, cover in prepared:
    dest = target / row['slug']
    dest.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(document, dest / 'design.md')
    if cover.exists():
        shutil.copyfile(cover, dest / 'cover.png')
(target / 'index.json').write_text(json.dumps(retained + [r for r, _, _ in prepared], ensure_ascii=False, separators=(',', ':')) + '\n')
print(f'Imported {len(prepared)} documents, {sum(c.exists() for _, _, c in prepared)} covers; retained {len(retained)} existing references')
