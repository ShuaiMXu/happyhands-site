import { resourceFeed } from './resource-feed.js';
import { heroConnectMarkup } from './connect.js';

export function renderPortalHtml(html, lang) {
  return html
    .replace('<div id="hero-connect"></div>', () => `<div id="hero-connect">${heroConnectMarkup(lang)}</div>`)
    .replace('<div id="portal-content"></div>', () => `<div id="portal-content">${portalContent(lang)}</div>`);
}

export function portalContent(lang = 'zh') {
  const english = lang === 'en';
  const prefix = english ? '/en' : '';
  const entries = english ? [
    ['/guide/', 'Quick start', 'Set up your local tools and run a first review.'],
    ['/ai-website-design/', 'Design workflow', 'Take an existing website from brief to scoped changes.'],
    ['/ai-ui-review/', 'UI review', 'Review evidence, confirm scope and compare results.'],
    ['/ai-ui-review/#ai-slop', 'AI slop review', 'Separate generic styling from verifiable usability issues.'],
  ] : [
    ['/guide/', '快速开始', '配置本地工具，完成第一次界面审查。'],
    ['/ai-website-design/', '设计工作流', '从设计目标出发，逐步改进已有网站。'],
    ['/ai-ui-review/', '界面审查', '检查页面证据，确认范围并对照修改结果。'],
    ['/ai-ui-review/#ai-slop', 'AI Slop检查', '区分风格雷同与可验证的使用体验问题。'],
  ];
  return resourceFeed(lang) + `<section class="workflow-links" aria-labelledby="workflow-heading">
    <div class="workflow-intro"><h2 id="workflow-heading">${english ? 'Guides' : '使用指南'}</h2>
    <p>${english ? 'Review and code changes run locally. You decide which changes to accept or reject.' : '审查与代码修改在本地执行，由你决定接受或拒绝修改。'}</p></div>
    <ul class="workflow-entries">${entries.map(([path, title, purpose]) => `<li><a href="${prefix}${path}"><span class="workflow-title">${title}</span><span class="workflow-purpose">${purpose}</span></a></li>`).join('')}</ul>
  </section>`;
}
