import { relative } from 'node:path';

const pages = new Set([
  'apps/portal/index.html', 'apps/studio/index.html', 'components/index.html',
  'systems/happyhands/index.html', 'systems/quartz/index.html', 'systems/lime/index.html',
  'guide/index.html', 'en/guide/index.html',
]);

export function siteAnalyticsPlugin(root) {
  return {
    name: 'owned-page-analytics',
    transformIndexHtml: { order: 'pre', handler(html, context) {
      const file = relative(root, context.filename).replaceAll('\\', '/');
      if (!pages.has(file)) return html;
      return { html, tags: [{ tag: 'script', attrs: {
        type: 'module', src: '/packages/ui/site-analytics.ts',
      }, injectTo: 'head' }] };
    } },
  };
}
