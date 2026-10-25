import * as zh from './content.zh.js';
import * as en from './content.en.js';
import { repositories } from './content.js';
import { connectMarkup } from './connect.js';
import { resourceCovers } from './resource-covers.js';
import { iconMarkup } from '../../packages/ui/icons.ts';

const quickstartCommand = `git clone https://github.com/ShuaiMXu/happyhands.git
cd happyhands
pnpm install --frozen-lockfile
pnpm workbench`;

// Shared by the build and language switcher: crawlers receive the same content as visitors.
export function portalContent(lang = 'zh') {
  const c = lang === 'zh' ? zh : en;
  return `
    ${connectMarkup(lang)}
    <section class="content-section section-apps" id="apps">
      <div class="section-head"><div><h2>${c.sections.apps.title}</h2></div><div><p>${c.sections.apps.copy}</p><a class="text-link" href="${repositories.core}">${c.sections.apps.link} ${iconMarkup('external')}</a></div></div>
      <div class="apps-grid">${c.apps.map(appCard).join('')}</div>
    </section>
    <section class="content-section section-delivery" id="harness">
      <div class="section-head"><div><h2>${c.delivery.title}</h2></div><p>${c.delivery.copy}</p></div>
      <dl class="delivery-list">${c.delivery.items.map(([title,copy]) => `<div><dt>${title}</dt><dd>${copy}</dd></div>`).join('')}</dl>
      <p class="capability-note">${c.delivery.status}</p><a class="text-link" href="${repositories.core}/blob/main/docs/harness.md">${c.delivery.link} ${iconMarkup('external')}</a>
    </section>
    <section class="content-section" id="design-resources"><div class="section-head"><div><h2>${lang === 'zh' ? '设计资源' : 'Design resources'}</h2></div><p>${lang === 'zh' ? '选择设计系统，或在主题工作室调整项目的视觉规范。' : 'Choose a design system or refine your project’s visual rules in Theme Studio.'}</p></div>${resourceCovers(lang)}</section>
    <section class="content-section" id="screens">
      <div class="section-head"><div><h2>${lang === 'zh' ? '实际项目中的设计改进' : 'Design improvements in practice'}</h2></div><p>${lang === 'zh' ? '查看修改过程与对照记录，试用组件的交互状态。' : 'Explore a documented change and try component interactions.'}</p></div>
      <div class="case-links">
        <article><h3>HappyClaw</h3><p>${lang === 'zh' ? '为长命令补充滚动提示，帮助用户发现被隐藏的内容。' : 'A scroll hint helps users discover the hidden part of a long command.'}</p><a class="text-link" href="https://github.com/ShuaiMXu/happyhands/blob/main/docs/counter-evidence-review-2026-10-21.md">${lang === 'zh' ? '查看修改记录' : 'View change record'} ${iconMarkup('external')}</a><details><summary>${lang === 'zh' ? '复核状态' : 'Review status'}</summary><p>${lang === 'zh' ? '本次局部修改已通过独立重审，人工接受仍待记录。原失败记录保留；此案例不代表全站验收或线上部署。' : 'This scoped change passed independent re-review; human acceptance is pending. The original failure is retained. It does not represent whole-site acceptance or deployment.'}</p></details></article>
        <article><h3>HappyHands</h3><p>${lang === 'zh' ? '试用按钮、表单与反馈状态，查看同一套规范如何应用到界面。' : 'Try buttons, forms and feedback states to see the system in use.'}</p><a class="text-link" href="/systems/happyhands/#components">${lang === 'zh' ? '试用组件' : 'Try components'} ${iconMarkup('right')}</a></article>
      </div>
    </section>
    <section class="get-started" id="get-started">
      <div class="get-started-copy"><h2>${c.sections.getStarted.title}<br><span>${c.sections.getStarted.titleLine2}</span></h2><p>${c.sections.getStarted.copy}</p></div>
      <div class="steps-grid">${c.steps.map(stepCard).join('')}</div>
      <div class="command-card"><div><span>${c.sections.getStarted.quickstartLabel}</span><strong>${c.sections.getStarted.quickstartTitle}</strong></div><pre><code>${quickstartCommand}</code></pre><button type="button" data-copy="${quickstartCommand}">${iconMarkup('copy')} ${c.sections.getStarted.copyBtn}</button></div>
      <p class="quickstart-note">${lang === 'zh' ? '先准备 Git、Node.js 22.15+ 和 pnpm 11.19.0。逐行执行，前一步成功后再继续。已有工程时，进入 happyhands 目录执行 pnpm workbench 即可。' : 'Requires Git, Node.js 22.15+, pnpm 11.19.0. Run each line after the previous step succeeds. For an existing installation, run pnpm workbench from the happyhands directory.'}</p>
      <div class="final-actions"><a class="button button-secondary" href="${lang === 'zh' ? '/guide/' : '/en/guide/'}">${lang === 'zh' ? '完整使用指南' : 'Read the guide'}</a><a class="button button-primary" href="${repositories.core}">GitHub ${iconMarkup('external')}</a></div>
    </section>`;
}

function appCard(item) {
  return `<article class="app-card"><div class="card-top"><span>${item.index}</span><span class="state">${item.state}</span></div><h3>${item.title}</h3><p>${item.description}</p><ul>${item.meta.map(v => `<li>${v}</li>`).join('')}</ul><a href="${item.href || repositories.core}">${item.action} ${iconMarkup('external')}</a></article>`;
}
function stepCard(item) {
  return `<article class="step-card"><span>${item[0]}</span><h3>${item[1]}</h3><p>${item[2]}</p></article>`;
}
