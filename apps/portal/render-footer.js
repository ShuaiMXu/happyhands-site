import { footerDirectory } from './footer-directory.js';
import { iconMarkup } from '../../packages/ui/icons.ts';
import { ui as zh } from './content.zh.js';
import { ui as en } from './content.en.js';

// Both production SSR and runtime language changes consume the same pure markup.
export function portalFooter(lang = 'zh') {
  const language = lang === 'en' ? 'en' : 'zh';
  const english = language === 'en';
  const copy = (english ? en : zh).footer;
  const links = kind => footerDirectory.filter(entry => entry.kind === kind).map(entry => {
    const external = entry.href.startsWith('https://');
    const href = !external && english ? `/en${entry.href}` : entry.href;
    return `<a href="${href}"><span>${entry[language]}</span>${external ? iconMarkup('external') : ''}</a>`;
  }).join('');
  return `<div class="footer-directory">
    <section class="footer-resource-group" aria-labelledby="footer-resources-label"><h2 id="footer-resources-label">${english ? 'Design resources' : '设计资源'}</h2><div class="footer-directory-links">${links('resource')}</div></section>
    <section aria-labelledby="footer-community-label"><h2 id="footer-community-label">${english ? 'Community' : '社区'}</h2><div class="footer-directory-links">${links('community')}</div></section>
    <section class="footer-contact" aria-labelledby="footer-contact-label"><h2 id="footer-contact-label">${english ? 'Work with us' : '合作交流'}</h2><div class="footer-directory-links">${links('cooperation')}</div></section>
  </div>
  <div class="footer-friends" role="group" aria-labelledby="footer-friends-label"><span id="footer-friends-label">${copy.friends}</span>${links('friend')}</div>
  <div class="footer-meta"><span>${copy.left}</span><span>${copy.middle}</span></div>`;
}
