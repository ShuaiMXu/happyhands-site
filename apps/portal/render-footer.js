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
//
// Layout follows the pinui "synais" footer: near-black band, brand and one action
// block up top, link columns, fine print, then the cream wordmark closing the page.
export function portalFooter(lang = 'zh') {
  const language = lang === 'en' ? 'en' : 'zh';
  const english = language === 'en';
  const copy = (english ? en : zh).footer;
  const prefix = english ? '/en' : '';
  const of = kind => footerDirectory.filter(entry => entry.kind === kind);
  const link = entry => `<li><a href="${href(entry, english)}">${entry[language]}</a></li>`;
  const setup = of('guide').find(entry => entry.href === '/apps/setup/');
  const github = of('community')[0];
  const contact = of('cooperation')[0];
  const setupHref = setup ? href(setup, english) : `${prefix}/apps/setup/`;
  const logo = `<img class="sy__logo-light" src="/brand/happyhands-logo-ink.png" alt="" width="1400" height="301" loading="lazy"><img class="sy__logo-dark" src="/brand/happyhands-logo-cream.png" alt="" width="1400" height="301" loading="lazy">`;
  return `<div class="hh-synais-footer">
    <div class="sy__top">
      <div class="sy__brand">
        <a class="sy__logo" href="${prefix}/apps/portal/" aria-label="HappyHands">${logo}</a>
        <p class="sy__about">${english ? 'Better product experience.' : '让产品体验更好。'}</p>
        <ul class="sy__socials">
          <li><a class="sy__social" href="${github ? github.href : '#'}" aria-label="${english ? 'Source on GitHub' : '在 GitHub 查看源码'}" title="GitHub"><span class="sy__icon sy__icon-github" aria-hidden="true"></span></a></li>
          <li><a class="sy__social" href="${contact ? contact.href : '#'}" aria-label="${english ? 'Contact on X' : '在 X 联系'}" title="X"><span class="sy__icon sy__icon-x" aria-hidden="true"></span></a></li>
        </ul>
      </div>
      <div class="sy__cta">
        <p class="sy__cta-title">${english ? 'Start with a review' : '从一次审查开始'}</p>
        <p class="sy__cta-copy">${english ? 'Point HappyHands at your product. Read the review first, then decide which changes to take.' : '把产品交给 HappyHands：先看审查结论，再决定改哪一处。'}</p>
        <a class="sy__cta-link" href="${setupHref}">${english ? 'Setup details' : '接入详情'}<span aria-hidden="true"> →</span></a>
      </div>
    </div>
    <nav class="sy__guide" aria-labelledby="footer-guide-heading">
      <div class="sy__col">
        <h2 id="footer-guide-heading">${english ? 'Guides' : '使用指南'}</h2>
        <p class="sy__guide-note">${english ? 'Review and code changes run locally. You decide which changes to accept or reject.' : '审查与代码修改在本地执行，由你决定接受或拒绝修改。'}</p>
        <ul class="sy__guide-links">${of('guide').map(link).join('')}</ul>
      </div>
      <div class="sy__col">
        <h2>${english ? 'More' : '更多'}</h2>
        <ul class="sy__guide-links">${[...of('facts'), ...of('friend')].map(link).join('')}</ul>
      </div>
    </nav>
    <div class="sy__fine footer-meta">
      <p>${copy.left}</p>
      <p>${english ? 'Runs locally · you accept or reject each change' : '本地运行 · 由你决定接受或拒绝修改'}</p>
    </div>
    <div class="sy__word" aria-hidden="true">${logo}</div>
  </div>`;
}
