import { defineConfig } from 'vite';
import { resolve, dirname, join, relative, isAbsolute } from 'node:path';
import { existsSync, statSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import kageHandler from './api/kage.mjs';
import { portalContent } from './apps/portal/render-content.js';
import { heroConnectMarkup } from './apps/portal/connect.js';
import { seoPages, seoData, enhanceSeoHtml } from './packages/ui/site-seo.ts';
import { guideContent } from './guide/content.ts';
import { siteAnalyticsPlugin } from './scripts/site-analytics-plugin.mjs';

const root = dirname(fileURLToPath(import.meta.url));

// The public/skillry-full mirror uses directory-style URLs (/skillry-full/skills/x/).
// Vite's public middleware only serves exact file paths, so directory requests
// would fall through to the SPA fallback. Serve their index.html directly.
function mirrorIndex(urlPath) {
  let rel;
  try { rel = decodeURIComponent(urlPath.replace(/^\/skillry-full\/?/, '').replace(/\/+$/, '')); } catch { return null; }
  const allowed = resolve(root, 'public', 'skillry-full');
  const base = resolve(allowed, rel);
  const inside = relative(allowed, base);
  if (inside.startsWith('..') || isAbsolute(inside)) return null;
  const idx = join(base, 'index.html');
  try {
    if (statSync(base).isDirectory() && existsSync(idx)) return idx;
  } catch { /* not a directory */ }
  return null;
}

export default defineConfig({
  server: { cors: { origin: [/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/, 'null'] }, port: 4173, strictPort: true, fs: { strict: true } },
  plugins: [siteAnalyticsPlugin(root),{
    name: 'public-page-content-and-metadata',
    transformIndexHtml(html, context) {
      const filename=relative(root,context.filename).replaceAll('\\','/');
      const entry=Object.entries(seoPages).find(([,page])=>page.file===filename);
      if(!entry)return html;
      const [key]=entry;
      html=enhanceSeoHtml(html,key);
      if(key==='portal')return html.replace('<div id="hero-connect"></div>', `<div id="hero-connect">${heroConnectMarkup('zh')}</div>`).replace('<div id="portal-content"></div>', `<div id="portal-content">${portalContent('zh')}</div>`);
      if(key==='guide'||key==='guideEn')return html.replace('<div id="guide-content"></div>',`<div id="guide-content">${guideContent(key==='guideEn'?'en':'zh')}</div>`);
      const data=seoData(key);
      return html.replace('<div id="root"></div>',`<div id="root"><noscript><main><h1>${data.title}</h1><p>${data.description}</p><p>交互预览需要启用 JavaScript。<a href="/guide/">阅读使用指南</a> / <a href="/en/guide/">Read the English guide</a></p><nav aria-label="设计资源"><a href="/systems/happyhands/">HappyHands</a> / <a href="/systems/quartz/">Quartz</a> / <a href="/systems/lime/">Lime</a> / <a href="/apps/studio/">主题工作室</a> / <a href="/components/">组件与参考</a></nav></main></noscript></div>`);
    }
  },{name:'kage-reference-search',configureServer(server){server.middlewares.use('/api/kage',kageHandler)},configurePreviewServer(server){server.middlewares.use('/api/kage',kageHandler)}},{
    name: 'skillry-mirror-dir-index',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || !req.url.startsWith('/skillry-full')) return next();
        const path = req.url.split('?')[0];
        if (/\.[a-z0-9]+$/i.test(path)) return next(); // exact file → public middleware
        const file = mirrorIndex(path);
        if (!file) return next();
        res.setHeader('content-type', 'text/html; charset=utf-8');
        res.end(readFileSync(file));
      });
    }
  }],
  build: { rollupOptions: { input: {
    home: resolve('index.html'),
    happyhands: resolve('systems/happyhands/index.html'),
    quartz: resolve('systems/quartz/index.html'),
    lime: resolve('systems/lime/index.html'),
    sodium: resolve('systems/sodium/index.html'),
    glaze: resolve('systems/glaze/index.html'),
    'component-preview': resolve('components/preview/index.html'),
    components: resolve('components/index.html'),
    portal: resolve('apps/portal/index.html'),
    guide: resolve('guide/index.html'),
    'guide-en': resolve('en/guide/index.html'),
    studio: resolve('apps/studio/index.html'),
    web: resolve('apps/web/index.html'),
    designer: resolve('apps/designer/index.html'),
    appllama: resolve('apps/appllama/index.html'),
    'appllama-full': resolve('apps/appllama-full/index.html')
  } } }
});
