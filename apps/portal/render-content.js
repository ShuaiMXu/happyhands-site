import { resourceFeed } from './resource-feed.js';
import { heroConnectMarkup } from './connect.js';

export function renderPortalHtml(html, lang) {
  return html
    .replace('<div id="hero-connect"></div>', () => `<div id="hero-connect">${heroConnectMarkup(lang)}</div>`)
    .replace('<div id="portal-content"></div>', () => `<div id="portal-content">${portalContent(lang)}</div>`);
}

export function portalContent(lang = 'zh') {
  const prefix = lang === 'en' ? '/en' : '';
  return resourceFeed(lang)+`<section class="workflow-links" aria-label="${lang==='zh'?'AI 设计与评审工作流':'AI design and review workflows'}"><h2>${lang==='zh'?'AI 网站设计与界面评审':'AI website design and UI review'}</h2><p>${lang==='zh'?'HappyHands 是开源的本地 AI 界面审阅工具，目前为 Local Web Alpha，可通过轻量 Skill 或可选工作台使用。它结合项目设计规范、截图证据和编码工具，改进已有界面。官网提供设计资源；审阅和代码修改在本地执行，需要可访问的项目仓库与可采集的页面，最终由人决定接受或拒绝修改。':'HappyHands is an open-source local AI-assisted UI review tool, currently a Local Web Alpha, available through a lightweight Skill or optional workbench. It combines project design rules, screenshot evidence and coding agents to improve existing interfaces. This website provides design resources; review and code changes run locally with an accessible repository and a page that can be captured. A person accepts or rejects the changes.'}</p><a href="${prefix}/guide/">${lang==='zh'?'使用指南与本地安装':'Product guide and local setup'}</a><a href="${prefix}/ai-website-design/">${lang==='zh'?'AI 网站设计工作流':'AI website design workflow'}</a><a href="${prefix}/ai-ui-review/">${lang==='zh'?'AI 设计审查与界面复核':'AI UI review and verification'}</a><a href="${prefix}/ai-ui-review/#ai-slop">${lang==='zh'?'检查 AI 味与产品体验问题':'Review AI slop and product experience'}</a></section>`;
}
