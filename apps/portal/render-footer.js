import { footerDirectory } from './footer-directory.js';
import { ui as zh } from './content.zh.js';
import { ui as en } from './content.en.js';

const href = (entry, english) => {
  if (entry.href.startsWith('https://')) return entry.href;
  return english && entry.localize !== false ? `/en${entry.href}` : entry.href;
};

// Both production SSR and runtime language changes consume the same pure markup.
// The footer carries exactly one link group: guides live here and nowhere else on
// the page, so a visitor never reads the same navigation twice.
export function portalFooter(lang = 'zh') {
  const language = lang === 'en' ? 'en' : 'zh';
  const english = language === 'en';
  const copy = (english ? en : zh).footer;
  const prefix = english ? '/en' : '';
  const of = kind => footerDirectory.filter(entry => entry.kind === kind);
  const link = entry => `<li><a href="${href(entry, english)}">${entry[language]}</a></li>`;
  const plainLink = entry => `<a href="${href(entry, english)}">${entry[language]}</a>`;
  const contactEntry = of('cooperation')[0];
  const contact = contactEntry
    ? `<a class="sy__contact" href="${contactEntry.href}">${contactEntry[language]}</a>`
    : '';
  const brand = `<img class="footer-logo-ink" src="/brand/happyhands-logo-ink.png" alt="" width="1400" height="301" loading="lazy"><img class="footer-logo-paper" src="/brand/happyhands-logo-paper.png" alt="" width="1400" height="301" loading="lazy">`;
  return `<div class="hh-synais-footer">
    <div class="sy__top"><div class="sy__brand"><a class="sy__logo" href="${prefix}/apps/portal/" aria-label="HappyHands">${brand}</a><p class="sy__about">${english ? 'Improve your product experience.' : '让产品体验更好。'}</p></div>${contact}</div>
    <nav class="sy__guide" aria-labelledby="footer-guide-heading">
      <div class="sy__guide-intro"><h2 id="footer-guide-heading">${english ? 'Guides' : '使用指南'}</h2><p>${english ? 'Review and code changes run locally. You decide which changes to accept or reject.' : '审查与代码修改在本地执行，由你决定接受或拒绝修改。'}</p></div>
      <ul class="sy__guide-links">${of('guide').map(link).join('')}</ul>
    </nav>
    <div class="sy__fine footer-meta"><span>${copy.left}</span><span class="footer-meta-links">${[...of('community'), ...of('facts'), ...of('friend')].map(plainLink).join('')}</span></div>
    <div class="sy__word" aria-hidden="true">${brand}</div>
  </div>`;
}
