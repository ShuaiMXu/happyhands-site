import { footerDirectory } from './footer-directory.js';

const href = (entry, english) =>
  english && entry.href.startsWith('/') && entry.localize !== false ? `/en${entry.href}` : entry.href;

// The portal, resource pages and guides use the same localized directory.
export function portalFooter(lang = 'zh', currentPath = '') {
  const language = lang === 'en' ? 'en' : 'zh';
  const english = language === 'en';
  const prefix = english ? '/en' : '';
  const entries = kind => footerDirectory.filter(entry => entry.kind === kind);
  const link = (entry, icon = '') => `<a href="${href(entry, english)}"${entry.href === currentPath ? ' aria-current="page"' : ''}>${icon ? `<span class="sy__icon sy__icon-${icon}" aria-hidden="true"></span>` : ''}${entry[language]}</a>`;
  const column = (title, links, extra = '') => `<div class="sy__col"><h2>${title}</h2><ul class="sy__guide-links">${links.map(item => `<li>${item}</li>`).join('')}</ul>${extra}</div>`;
  const note = `<p class="sy__guide-note">${english ? 'Review and code changes run locally. You decide which changes to accept or reject.' : '审查与代码修改在本地执行，由你决定接受或拒绝修改。'}</p>`;
  return `<div class="hh-synais-footer">
    <nav class="sy__guide" aria-label="${english ? 'Site links' : '网站链接'}">
      ${column(english ? 'Guides' : '使用指南', entries('guide').map(entry => link(entry)), note)}
      ${column(english ? 'Design links' : '设计友链', entries('friend').map(entry => link(entry)))}
      ${column(english ? 'Follow me' : '关注我', [
        ...entries('cooperation').map(entry => link(entry, 'x')),
        ...entries('community').map(entry => link(entry, 'github')),
      ])}
    </nav>
    <div class="sy__fine">
      <a class="sy__logo" href="${prefix}/apps/portal/" aria-label="HappyHands">
        <img class="sy__logo-light" src="/brand/happyhands-logo-ink.png" alt="" width="1400" height="301" loading="lazy">
        <img class="sy__logo-dark" src="/brand/happyhands-logo-cream.png" alt="" width="1400" height="301" loading="lazy">
      </a>
      ${entries('facts').map(entry => link(entry)).join('')}
    </div>
  </div>`;
}
