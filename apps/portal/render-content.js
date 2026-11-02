import { resourceFeed } from './resource-feed.js';

export function portalContent(lang = 'zh') {
  return resourceFeed(lang)+`<section class="workflow-links" aria-label="${lang==='zh'?'AI 设计与评审工作流':'AI design and review workflows'}"><h2>${lang==='zh'?'AI 网站设计与界面评审':'AI website design and UI review'}</h2><p>${lang==='zh'?'从 AI 生成的初稿出发，结合项目设计规范、截图证据和编码工具，改进已有界面。':'Improve an AI-generated first build with project design rules, screenshot evidence and coding agents.'}</p><a href="${lang==='en'?'/en':''}/ai-website-design/">${lang==='zh'?'AI 网站设计工作流':'AI website design workflow'}</a><a href="${lang==='en'?'/en':''}/ai-ui-review/">${lang==='zh'?'AI 界面评审与复核':'AI UI review and verification'}</a></section>`;
}
