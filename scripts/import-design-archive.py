"""Import an explicitly supplied design archive without modifying source documents.
Usage: python3 scripts/import-design-archive.py /absolute/path/to/design-archive
Video files remain at their attributed upstream URLs; they are not bundled.
"""
import hashlib
import json
import pathlib
import re
import shutil
import sys

source = pathlib.Path(sys.argv[1]).resolve()
target = pathlib.Path(__file__).resolve().parents[1] / 'public/design-archive'
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
    (dest / 'compact').mkdir(exist_ok=True)
    for name in ['design.md', 'compact/design.md', 'thumbnail.jpg', 'screenshot.jpg', 'design-system.json', 'theme.css', 'variables.css', 'tokens.json']:
        shutil.copyfile(folder / name, dest / name)
    row = {key: entry[key] for key in ['slug', 'name', 'site_url', 'page_url', 'theme', 'industry', 'north_star', 'fonts']}
    row['video'] = entry['video']['url']
    if not all(row[key].startswith('https://') for key in ['site_url', 'page_url', 'video']):
        raise ValueError('Expected HTTPS source URLs')
    row['sha256'] = hashlib.sha256((folder / 'design.md').read_bytes()).hexdigest()
    rows.append(row)
(target / 'index.json').write_text(json.dumps(rows, ensure_ascii=False, separators=(',', ':')))
print(f'Imported {len(rows)} complete references')
