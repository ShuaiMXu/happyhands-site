import { footerDirectory } from './footer-directory.js';
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
    return `<a href="${href}"><span>${entry[language]}</span></a>`;
  }).join('');
  const prefix = english ? '/en' : '';
  // The contact action is directory data, not a second hard-coded link.
  const contactEntry = footerDirectory.find(entry => entry.kind === 'cooperation');
  const contact = contactEntry
    ? `<a class="sy__contact" href="${contactEntry.href}">${contactEntry[language]}</a>`
    : '';
  const brand = `<img class="footer-logo-ink" src="/brand/happyhands-logo-ink.png" alt="" width="1400" height="301" loading="lazy"><img class="footer-logo-paper" src="/brand/happyhands-logo-paper.png" alt="" width="1400" height="301" loading="lazy">`;
  return `<div class="hh-synais-footer">
    <div class="sy__top"><div class="sy__brand"><a class="sy__logo" href="${prefix}/apps/portal/" aria-label="HappyHands">${brand}</a><p class="sy__about">${english ? 'Improve your product experience.' : '让产品体验更好。'}</p></div>${contact}</div>
    <div class="sy__cols footer-directory">
      <section class="footer-resource-group" aria-labelledby="footer-resources-label"><h2 id="footer-resources-label">${english ? 'Design resources' : '设计资源'}</h2><div class="footer-directory-links">${links('resource')}</div></section>
      <section aria-labelledby="footer-guide-label"><h2 id="footer-guide-label">${english ? 'Guides' : '使用指南'}</h2><div class="footer-directory-links"><a href="${prefix}/guide/">${english ? 'Getting started' : '快速开始'}</a><a href="${prefix}/ai-ui-review/">${english ? 'Interface review' : '界面审查'}</a><a href="${prefix}/apps/setup/">${english ? 'Setup details' : '接入详情'}</a></div></section>
      <section aria-labelledby="footer-community-label"><h2 id="footer-community-label">${english ? 'Community' : '社区'}</h2><div class="footer-directory-links">${links('community')}</div></section>
      <section class="footer-friends" aria-labelledby="footer-friends-label"><h2 id="footer-friends-label">${copy.friends}</h2><div class="footer-directory-links">${links('friend')}</div></section>
    </div>
    <div class="sy__fine footer-meta"><span>${copy.left}</span><span>${copy.middle}</span></div>
    <div class="sy__word" aria-hidden="true">${brand}</div>
  </div>`;
}
