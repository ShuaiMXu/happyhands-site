"""Publish supplied collections as reference data and one shared website/MCP catalog.
Never execute archived scripts. Existing archive/system assets are reused, not duplicated.
"""
from pathlib import Path
import hashlib,json,re,shutil,sys
ROOT=Path(__file__).resolve().parents[1]; PUBLIC=ROOT/'public'
SOURCE=Path(sys.argv[1]).resolve(); BASE='https://happyhands.cc'; assets={}
def sha(b): return hashlib.sha256(b).hexdigest()
def read(p): return json.loads(p.read_text())
def write(p,v):
 p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
def publish(src,dest):
 if src.is_symlink(): raise ValueError('Archive symlink: '+str(src))
 dest.parent.mkdir(parents=True,exist_ok=True)
 if not dest.exists() or sha(src.read_bytes())!=sha(dest.read_bytes()): shutil.copyfile(src,dest)
 path=str(dest.relative_to(PUBLIC));assets[path]={'path':path,'sha256':sha(dest.read_bytes()),'bytes':dest.stat().st_size};return path
settings=[
 ('design-archive','站点风格库','Website references','inspiration','https://happyhands.cc','website'),
 ('designmd-archive','Design.md 素材库','Design.md library','inspiration','https://designmd.app','website'),
 ('ottermind','落地页参考','Landing page references','inspiration','https://ottermind.ai','website'),
 ('app-tokens','App 设计变量','App design tokens','tokens','https://github.com','mobile'),
 ('platform-systems','平台设计规范','Platform guidelines','guidelines','https://developer.apple.com/design/human-interface-guidelines','mobile'),
 ('design-how-systems','原版设计系统','Original design systems','systems','https://design.how','web'),
 ('registry-own','原版组件源','Original component source','components','https://design.how','web'),
 ('brand-systems','Meridian 品牌系统','Meridian design systems','systems','https://design.how','web'),
 ('brand-registry','Meridian 组件源','Meridian component source','components','https://design.how','web'),
 ('mobbin-archive','Mobbin 接入文档','Mobbin integration docs','guidelines','https://mobbin.com','mobile')]
collections=[];resources={}
def add(id,name,type,path,collection,**extra):
 p=PUBLIC/path
 if not p.is_file(): raise ValueError('Missing published resource: '+path)
 row=dict(id=id,name=name,type=type,path=path,collection=collection,sha256=sha(p.read_bytes()),bytes=p.stat().st_size,mimeType={'.json':'application/json','.css':'text/css','.scss':'text/plain'}.get(p.suffix,'text/markdown'),source=next(s[4] for s in settings if s[0]==collection),license='Reference archive. Check the original source license before code or media reuse.',authority='reference-data-only',platform=next(s[5] for s in settings if s[0]==collection),**extra)
 if collection=='platform-systems' and '/material3/' in path:row['source']='https://m3.material.io'
 if collection=='app-tokens':
  library=path.split('/')[2];row['source']={'nutui':'https://github.com/jd-opensource/nutui','antd-mobile':'https://github.com/ant-design/ant-design-mobile','vant':'https://github.com/youzan/vant','tdesign-mobile-vue':'https://github.com/Tencent/tdesign-mobile-vue','varlet':'https://github.com/varletjs/varlet','material3':'https://github.com/material-foundation/material-tokens'}.get(library,row['source'])
 if id in resources and resources[id]!=row: raise ValueError('Duplicate resource ID: '+id)
 resources[id]=row;return row
for id,zh,en,group,source,platform in settings:
 readme=SOURCE/id/'README.md'
 publish(readme,PUBLIC/'collections'/id/'README.md')
 collections.append(dict(id=id,name=zh,nameEn=en,group=group,source=source,platform=platform,overview=f'collection:{id}/README.md',access='public-documents-only' if id=='mobbin-archive' else 'reference-archive'))
 add(f'collection:{id}/README.md',zh,'collection',f'collections/{id}/README.md',id,summary=en)
# Keep collection overview as data, never an installation instruction.
publish(SOURCE/'COLLECTIONS.md',PUBLIC/'collections/COLLECTIONS.md')
for row in read(PUBLIC/'design-archive/index.json'):
 group='designmd-archive' if row.get('source')=='designmd.app' else 'design-archive'
 add('design-md:'+row['slug'],row['name'],'design-md',f"design-archive/{row['slug']}/design.md",group,summary=row.get('north_star',''),tags=[row.get('industry',''),*row.get('styles',[]),*row.get('types',[])],cover=row.get('cover') or (None if row.get('source')=='designmd.app' else f"/design-archive/{row['slug']}/thumbnail.jpg"),preview=f"/components/?provider=design-md&design={row['slug']}",sourceUrl=row.get('sourceDocument') or row.get('page_url') or row.get('site_url'))
for system in read(PUBLIC/'design-how/catalog.json')['systems']:
 for doc in system['documents']:
  path=doc['path'];id='system:'+system['id']+('' if path=='index.md' else '/'+path)
  add(id,system['name']+' / '+doc['title'],'system',f"design-how/{system['id']}/{path}",'design-how-systems',system=system['id'],summary=system.get('summary',''),tags=[doc['kind'],system['id']],preview=f"/components/?provider=systems&system={system['id']}")
for row in read(PUBLIC/'r/index.json')['items']:
 deps=row.get('registryDependencies',[])
 if len(deps)!=1 or not deps[0].startswith(BASE+'/'):continue
 path=deps[0].removeprefix(BASE+'/')
 add('component:'+row['name'],row.get('title',row['name']),'component',path,'registry-own',system=row.get('meta',{}).get('system',''),summary=row.get('description',''),installation=dict(url=BASE+'/'+path,status='source-payload; inspect dependencies and target stack'),tags=[row['name'],'component'])
# New reference documents and assets. Preserve their original bytes.
allowed={'.md','.json','.css','.scss','.tsx','.ts','.js','.jsx','.woff2','.webp','.jpg','.png','.txt'}
for collection in ['ottermind','app-tokens','platform-systems','brand-systems','brand-registry','mobbin-archive']:
 for file in sorted((SOURCE/collection).rglob('*')):
  if not file.is_file() or file.suffix.lower() not in allowed and file.name not in {'LICENSE','NOTICE','COPYING'} or file.name.startswith('.') or file.name.startswith('errors'):continue
  rel=file.relative_to(SOURCE/collection).as_posix()
  publish(file,PUBLIC/'collections'/collection/rel)
  if collection=='brand-registry' and rel.startswith('r/') and file.suffix=='.json':
   hosted=PUBLIC/rel;hosted.parent.mkdir(parents=True,exist_ok=True);hosted.write_text(file.read_text().replace('http://localhost:8080',BASE))
  if file.suffix.lower() not in {'.md','.json','.css','.scss','.txt'} or rel in {'README.md','index.json'}:continue
  if collection=='ottermind' and file.name!='design.md':continue
  if collection in {'app-tokens','platform-systems'} and file.name=='SKILL.md':continue
  if collection=='app-tokens' and file.name!='tokens.json':continue
  if collection=='brand-systems' and file.suffix!='.md':continue
  if collection=='brand-registry' and (not rel.startswith('r/') or file.name in {'registry.json','index.json'}):continue
  text=file.read_text();match=re.search(r'^# (.+)$',text,re.M)
  name=match.group(1) if match else rel.replace('/',' / ').removesuffix(file.suffix)
  type='design-md' if collection=='ottermind' else 'tokens' if file.name=='tokens.json' else 'component' if collection=='brand-registry' else 'system' if collection=='brand-systems' else 'guideline'
  extra=dict(summary=name,tags=[collection,*rel.split('/')[:-1]])
  if collection=='ottermind':
   entry=read(file.parent/'entry.json');name=entry['title'];extra.update(summary=entry.get('summary',name),cover=f'/collections/ottermind/{file.parent.relative_to(SOURCE/collection).as_posix()}/poster.webp',sourceUrl=entry.get('source',{}).get('url'),tags=[entry.get('industry',''),entry.get('section','')],previewVideo=entry.get('media',{}).get('preview'),relatedSource=entry.get('source',{}))
  if collection in {'brand-systems','brand-registry'}:extra['system']=rel.split('/')[1 if collection=='brand-registry' else 0];extra['derivedFrom']='design.how; supplied Meridian brand derivative'
  if collection=='brand-registry':
   # Preserve the supplied original above; publish a separately derived host-ready payload.
   hosted=PUBLIC/rel
   hosted.parent.mkdir(parents=True,exist_ok=True)
   hosted.write_text(text.replace('http://localhost:8080',BASE))
   extra['installation']=dict(url=BASE+'/'+rel,status='hosted-payload; URL substitutions only; inspect target compatibility',originalSha256=sha(file.read_bytes()))
   add('component:'+extra['system']+'-'+file.stem,name,type,rel,collection,**extra);continue
  add('collection:'+collection+'/'+rel,name,type,'collections/'+collection+'/'+rel,collection,**extra)
# Preserve the existing feature-component library in the same machine catalog.
cult_file=PUBLIC/'components/cult-ui/catalog.json'
if not cult_file.exists():raise ValueError('Run npm run catalog:build before importing collections.')
cult=read(cult_file)
settings.append(('cult-ui','Cult UI 组件','Cult UI components','components','https://cult-ui.com','web'))
cult_notes=PUBLIC/'collections/cult-ui/README.md';cult_notes.parent.mkdir(parents=True,exist_ok=True)
cult_notes.write_text('# Cult UI source library\n\nExisting pinned website component library.\n\nSource: https://cult-ui.com\nRevision: '+cult['revision']+'\n\nSource payloads remain unchanged. Browser previews may use explicit fixture/framework adapters; original source and preview adaptation are different. Installation must inspect actual dependencies, framework and license. Aliases do not constitute additional implementations. No project design-system approval is implied.\n')
collections.append(dict(id='cult-ui',name='Cult UI 组件',nameEn='Cult UI components',group='components',source='https://cult-ui.com',platform='web',origin='existing-website',overview='collection:cult-ui/README.md',access='reference-archive'))
add('collection:cult-ui/README.md','Cult UI','collection','collections/cult-ui/README.md','cult-ui')
for item in cult['items']:
 row=add('component:cult-ui/'+item['id'],item['title'],'component',item['source'].lstrip('/'),'cult-ui',summary=item['description'],tags=[item['id'],item['category']],preview='/components/?provider=cult-ui&component='+item['id'],aliasOf=item.get('aliasOf'),sourceRevision=item['revision'])
 row['license']=item['license'];row['integration']=item.get('integration',{})

# Fonts referenced by derived registry payloads use the same host path.
fonts=SOURCE/'brand-registry/fonts'
if fonts.exists():
 for file in fonts.rglob('*.woff2'):publish(file,PUBLIC/'fonts'/file.relative_to(fonts))
for collection in collections:
 rows=[row for row in resources.values() if row['collection']==collection['id'] and row['type']!='collection']
 collection['count']=len(rows);collection['cover']=next((row['cover'] for row in rows if row.get('cover')),None)
 collection['types']=sorted(set(row['type'] for row in rows))
write(PUBLIC/'resources/v1/assets.json',{'schemaVersion':1,'files':sorted(assets.values(),key=lambda row:row['path'])})
collection_bytes=json.dumps(collections,ensure_ascii=False,sort_keys=True).encode()
version=sha(json.dumps(assets,sort_keys=True).encode()+collection_bytes+json.dumps(resources,ensure_ascii=False,sort_keys=True).encode())
write(PUBLIC/'resources/v1/index.json',dict(schemaVersion=1,version=version,assetManifest='resources/v1/assets.json',collections=collections,resources=sorted(resources.values(),key=lambda r:r['id'])))
print(json.dumps(dict(version=version,resources=len(resources),collections=[dict(id=c['id'],count=c['count']) for c in collections]),ensure_ascii=False,indent=2))

# Keep separately registered PinUI source previews when refreshing the archive.
if (PUBLIC/'components/pin-ui/registry.json').exists():
 import subprocess
 subprocess.run(['node', 'scripts/register-pinui.mjs'], cwd=ROOT, check=True)
