import { footerDirectory } from './footer-directory.js';

const href = (entry, english) => {
  if (entry.href.startsWith('https://')) return entry.href;
  return english && entry.localize !== false ? `/en${entry.href}` : entry.href;
};

// Production HTML and runtime language changes share this navigation.
export function portalFooter(lang = 'zh') {
  const language = lang === 'en' ? 'en' : 'zh';
  const english = language === 'en';
  const prefix = english ? '/en' : '';
  const of = kind => footerDirectory.filter(entry => entry.kind === kind);
  const link = entry => {
    const brand = entry.kind === 'community' ? 'github' : entry.kind === 'follow' ? 'x' : null;
    const icon = brand ? `<span class="sy__icon sy__icon-${brand}" aria-hidden="true"></span>` : '';
    return `<li><a href="${href(entry, english)}">${icon}${entry[language]}</a></li>`;
  };
  return `<div class="hh-synais-footer">
    <nav class="sy__guide" aria-label="${english ? 'Footer' : '页脚导航'}">
      <div class="sy__col sy__guide-main">
        <h2 id="footer-guide-heading">${english ? 'Guides' : '使用指南'}</h2>
        <ul class="sy__guide-links">${of('guide').map(link).join('')}</ul>
        <p class="sy__guide-note">${english ? 'Review and code changes run locally. You decide which changes to accept or reject.' : '审查与代码修改在本地执行，由你决定接受或拒绝修改。'}</p>
      </div>
      <div class="sy__col">
        <h2>${english ? 'Design friends' : '设计友链'}</h2>
        <ul class="sy__guide-links">${of('friend').map(link).join('')}</ul>
      </div>
      <div class="sy__col">
        <h2>${english ? 'Follow' : '关注我'}</h2>
        <ul class="sy__guide-links">${[...of('follow'), ...of('community')].map(link).join('')}</ul>
      </div>
    </nav>
    <div class="sy__fine footer-meta">
      <a class="sy__logo" href="${prefix}/apps/portal/" aria-label="HappyHands">
        <img class="sy__logo-light" src="/brand/happyhands-logo-ink.png" alt="" width="1400" height="301" loading="lazy">
        <img class="sy__logo-dark" src="/brand/happyhands-logo-cream.png" alt="" width="1400" height="301" loading="lazy">
      </a>
      <ul class="sy__guide-links">${of('facts').map(link).join('')}</ul>
    </div>
  </div>`;
}
