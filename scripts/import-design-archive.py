"""Import supplied references without executing source content.

Media locations are remapped in the published copy only. Existing references
and working upstream videos are retained; the supplied archive is untouched.
"""
import hashlib
import json
import pathlib
import re
import shutil
import sys

source = pathlib.Path(sys.argv[1]).resolve()
target = pathlib.Path(__file__).resolve().parents[1] / 'public/design-archive'
previous = json.loads((target / 'index.json').read_text()) if (target / 'index.json').exists() else []
existing = {row['slug']: row for row in previous}
rows = []
seen = set()
for entry in json.loads((source / 'index.json').read_text()):
    slug = entry['slug']
    if not re.fullmatch(r'[a-z0-9-]+', slug) or slug in seen:
        raise ValueError(f'Invalid or duplicate slug: {slug}')
    seen.add(slug)
    folder = (source / entry['folder']).resolve()
    if not folder.is_relative_to(source):
        raise ValueError('Source folder escapes the archive')
    dest = target / slug
    dest.mkdir(parents=True, exist_ok=True)
    video = entry.get('video', {}).get('url', '')
    if 'assets.example.com' in video:
        video = existing.get(slug, {}).get('video', '')
    if not video.startswith('https://') or 'example.com' in video:
        raise ValueError(f'Missing published video URL: {slug}')
    substitutions = {
        f'https://assets.example.com/styles/{slug}/preview.mp4': video,
        f'https://assets.example.com/styles/{slug}/': f'https://happyhands.cc/design-archive/{slug}/',
    }
    for file in folder.rglob('*'):
        if not file.is_file() or file.suffix not in {'.md', '.css', '.json', '.txt', '.jpg'}:
            continue
        output = dest / file.relative_to(folder)
        output.parent.mkdir(parents=True, exist_ok=True)
        if file.suffix == '.jpg':
            shutil.copyfile(file, output)
        else:
            text = file.read_text()
            for old, new in substitutions.items():
                text = text.replace(old, new)
            output.write_text(text)
    row = {key: entry[key] for key in ['slug', 'name', 'site_url', 'theme', 'industry', 'north_star', 'fonts']}
    row['page_url'] = entry.get('page_url') or existing.get(slug, {}).get('page_url') or f'https://styles.refero.design/style/{entry["id"]}'
    row['video'] = video
    if not all(row[key].startswith('https://') for key in ['site_url', 'page_url', 'video']):
        raise ValueError('Expected HTTPS source URLs')
    row['sha256'] = hashlib.sha256((dest / 'design.md').read_bytes()).hexdigest()
    row['sourceSha256'] = hashlib.sha256((folder / 'design.md').read_bytes()).hexdigest()
    rows.append(row)
rows.extend(row for row in previous if row['slug'] not in seen)
(target / 'index.json').write_text(json.dumps(rows, ensure_ascii=False, separators=(',', ':')))
print(f'Imported {len(seen)} complete references; retained {len(rows) - len(seen)} existing references')
