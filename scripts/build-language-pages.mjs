import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {dirname} from 'node:path';
import {resourceSeoData,systemSeo} from '../packages/ui/resource-seo.ts';
import {seoHead} from '../packages/ui/site-seo.ts';
import * as zh from '../apps/portal/content.zh.js';
import * as en from '../apps/portal/content.en.js';
function translate(html,a,b){
 const pairs=[];const collect=(x,y)=>{if(typeof x==='string'&&typeof y==='string'&&x!==y&&!x.startsWith('/'))pairs.push([x,y]);else if(x&&y&&typeof x==='object')for(const k of Object.keys(x))collect(x[k],y[k]);};collect(a,b);
 for(const [x,y]of pairs.sort((a,b)=>b[0].length-a[0].length))html=html.replaceAll(x,y);
 return html;
}
function head(html,key){return html.replace(/<html[^>]*>/,'<html lang="en">').replace(/<title>[\s\S]*?<\/title>/gi,'').replace(/<meta\b[^>]*(?:name|property)="(?:description|og:[^"]+|twitter:[^"]+)"[^>]*>/gi,'').replace(/<link[^>]*(?:rel="canonical"|hreflang=)[^>]*>/gi,'').replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi,'').replace('</head>',seoHead(key,'en')+'</head>');}
for(const [key,path]of [['quartz','systems/quartz'],['lime','systems/lime'],['components','resource-pages/en']]){
 let html=await readFile(`dist/${path}/index.html`,'utf8');html=head(translate(html,zh,en),key);
 html=html.replaceAll('设计资源 / Design resources','Design resources').replaceAll('设计系统','Design systems').replaceAll('组件库','Components').replaceAll('接入详情','Setup details');
 const out=key==='components'?'dist/resource-pages/en/index.html':`dist/en/${path}/index.html`;await mkdir(dirname(out),{recursive:true});await writeFile(out,html);
}

for(const system of ['happyhands','glaze','sodium']) {
 const source=await readFile(`dist/systems/${system}/index.html`,'utf8');
 let html=head(source,'components').replaceAll('https://happyhands.cc/en/components/',`https://happyhands.cc/en/systems/${system}/`).replaceAll('https://happyhands.cc/components/',`https://happyhands.cc/systems/${system}/`).replace(/<title>.*?<\/title>/,`<title>${system} design system / HappyHands</title>`);
 if(system!=='happyhands') {
  const catalog=JSON.parse(await readFile('public/design-how/catalog.json','utf8'));
  const data=resourceSeoData(systemSeo(catalog.systems.find(s=>s.id===system)),'en');
  const escaped=data.url.replaceAll('&','&amp;');
  html=html.replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/,`<script id="site-structured-data" type="application/ld+json">${JSON.stringify(data.graph).replaceAll('<','\\u003c')}</script>`);
  html=html.replace(/(<link rel="canonical" href=")[^"]*/,(_,prefix)=>prefix+escaped).replace(/(<meta property="og:url" content=")[^"]*/,(_,prefix)=>prefix+escaped);
  html=html.replace(/<link[^>]*hreflang=[^>]*>/g,'').replace('</head>',`<link rel="alternate" hreflang="zh-CN" href="${escaped.replace('/en/components/','/components/')}"><link rel="alternate" hreflang="en" href="${escaped}"></head>`);
 }
 const out=`dist/en/systems/${system}/index.html`;await mkdir(dirname(out),{recursive:true});await writeFile(out,html);
}
try {await writeFile('dist/resource-pages/en/not-found.html',(await readFile('dist/resource-pages/not-found.html','utf8')).replace('lang="zh-CN"','lang="en"'));}catch(error){if(error.code!=='ENOENT')throw error;}

const sitemap=await readFile('dist/sitemap.xml','utf8');
const extra=['apps/portal','systems/quartz','systems/lime','systems/happyhands','components'].filter(path=>!sitemap.includes(`https://happyhands.cc/en/${path}/`)).map(path=>`<url><loc>https://happyhands.cc/en/${path}/</loc></url>`).join('\n');
await writeFile('dist/sitemap.xml',sitemap.replace('</urlset>',extra+'\n</urlset>'));
