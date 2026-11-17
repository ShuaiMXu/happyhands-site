import { portalFooter } from './render-footer.js';
import { resourceFeed } from './resource-feed.js';
import { heroConnectMarkup } from './connect.js';

export function renderPortalHtml(html, lang) {
  return html
    .replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/, () => `<footer class="site-footer portal-footer">${portalFooter(lang)}</footer>`)
    .replace('<div id="hero-connect"></div>', () => `<div id="hero-connect">${heroConnectMarkup(lang)}</div>`)
    .replace('<div id="portal-content"></div>', () => `<div id="portal-content">${portalContent(lang)}</div>`);
}

export function portalContent(lang = 'zh') {
  // Guides are collected in the footer (portalFooter) so the homepage never shows
  // the same four destinations twice.
  return resourceFeed(lang);
}
