import {wikiHeader,wikiColumnsStart,wikiColumnsEnd,wikiFooter,type WikiSection} from '../guide/wiki-navigation.ts';
import {guideFaq} from "../packages/ui/site-seo.ts";
import {iconMarkup} from "../packages/ui/icons.ts";

const core="https://github.com/ShuaiMXu/happyhands";
export function guideContent(lang:"zh"|"en") {
 const t=(zh:string,en:string)=>lang==="zh"?zh:en;
 const sections=lang==="zh"?[
  ["workflow","从发现问题到复核结果","采集确认范围内的页面、设备和交互状态；结合截图、源码和项目设计规则检查问题。选定问题并确认计划后，由编码 Agent 在隔离的 Git 工作副本中修改，再复采对照、执行适用检查并独立复核。最终由你接受或拒绝。"],
  ["design","选择设计系统与组件","设计资源页提供 HappyHands、Quartz、Lime 系统入口，以及组件和设计参考。先核对项目已有规范、上游许可与技术兼容性，再决定采用范围。外部示例和参考不等于已安装到你的项目。"],
  ["setup","在本地启动","准备 Git、Node.js 22.15+、pnpm 11.19.0 和 Chrome 或 Edge。模型诊断与截图复核需要已配置并登录的 Codex CLI。以下命令在本机终端执行，打开工作台后再连接你有权审阅的项目。"],
  ["agents","配合已有编码工具","Codex CLI 支持诊断、截图复核和代码执行；Claude Code 提供执行适配器，完整端到端验证仍在进行。Cursor、Kimi Code、WorkBuddy 可在具备本地浏览器、终端及仓库访问能力时按 Harness 流程操作，没有各自的专用执行适配器。"],
  ["scope","数据、许可与 Alpha 范围","运行记录在本地 .harness/；模型辅助步骤会把选定源码上下文和截图发送给配置的模型服务。自有核心代码采用 MIT，第三方资源保留各自许可；模型服务费用另计。当前为 Local Web Alpha，未检查的页面与交互仍属未审阅范围。"],
 ]:[
  ["workflow","From finding an issue to reviewing the result","Capture the agreed pages, devices and interaction states. Review screenshots alongside source code and the product’s own design rules. Choose an issue and confirm a plan; your coding agent implements it in an isolated Git worktree. Capture the result, run applicable checks and independent review, then make your own accept or reject decision."],
  ["design","Choose design systems and components","The resource library includes HappyHands, Quartz and Lime systems, component previews and design references. Check your existing rules, upstream licensing and technical compatibility before adopting anything. An external example or reference is not an installation into your project."],
  ["setup","Start the local workbench","Prepare Git, Node.js 22.15+, pnpm 11.19.0 and Chrome or Edge. Model diagnosis and screenshot review require a configured, signed-in Codex CLI. Run these commands in your local terminal, then connect a project you have permission to review."],
  ["agents","Use your existing coding tools","Codex CLI supports diagnosis, screenshot-aware review and implementation. Claude Code has an implementation adapter; full end-to-end validation remains open. Cursor, Kimi Code and WorkBuddy can operate the Harness with local browser, terminal and repository access, but have no dedicated implementation adapters here."],
  ["scope","Data, licensing and Alpha scope","Run records stay in the local .harness/ directory. Model-assisted steps send selected source context and screenshots to your configured model provider. Original core code is MIT licensed; third-party resources retain their own terms, and provider charges are separate. This is a Local Web Alpha: unseen pages and untested interactions remain unreviewed."],
 ];
 const wikiPath='/guide/';
 const wikiSections:WikiSection[]=[...sections.map(([id,title])=>[id,title] as const),['workflows',t('按任务了解工作流','Explore the workflows')],['faq',t('常见问题','Frequently asked questions')]];
 return `<div class="wiki-layout"><a class="guide-skip" href="#main">${t("跳到内容","Skip to content")}</a>
 ${wikiHeader(lang,wikiPath)}
 <main id="main" class="guide-shell"><div class="guide-heading"><h1>${t("HappyHands 使用指南","The HappyHands guide")}</h1><p>${t("面向 AI 编程项目的本地设计审阅工作台。从页面问题出发，确定修改范围，再核对实际效果。","A local design review workbench for products built with coding agents. Find UI issues, confirm scoped changes, and check the result.")}</p><div class="guide-actions"><a href="#setup">${t("本地安装","Local setup")}</a><a href="${core}">GitHub ${iconMarkup("external")}</a><a href="${core}/blob/main/docs/harness.md">${t("Harness 文档","Harness documentation")} ${iconMarkup("external")}</a></div></div>
 ${wikiColumnsStart(lang,wikiPath,wikiSections)}
 <div class="guide-body">${sections.map(([id,title,copy])=>`<section id="${id}"><h2>${title}</h2><p>${copy}</p>${id==="setup"?`<pre><code>git clone ${core}.git\ncd happyhands\npnpm install --frozen-lockfile\npnpm workbench</code></pre><p>${t("打开","Open")} <a href="http://127.0.0.1:4190/apps/designer/">http://127.0.0.1:4190/apps/designer/</a>${lang==='zh'?'。':'. '}${t("提供本地仓库、可运行预览、核心任务和设计规范来源；采集前确认页面、设备和状态。","Provide your repository, working preview, user task and design sources. Confirm pages, devices and states before capture.")}</p>`:""}${id==="design"?`<ul><li><a href="/systems/happyhands/">HappyHands</a> / ${t("品牌规范与产品组件","Brand rules and product components")}</li><li><a href="/systems/quartz/">Quartz</a> / ${t("AI 工作流与专业工具","AI workflows and professional tools")} / <a href="https://design.how/systems/quartz">${t("上游来源","Upstream source")}</a></li><li><a href="/systems/lime/">Lime</a> / ${t("个人助手与消费应用","Personal assistants and consumer apps")} / <a href="https://design.how/systems/lime">${t("上游来源","Upstream source")}</a></li><li><a href="/components/">${t("组件预览与设计参考","Component previews and design references")}</a></li></ul>`:""}${id==="scope"?`<p><a href="${core}/blob/main/LICENSE">MIT</a> / <a href="${core}/blob/main/THIRD_PARTY_NOTICES.md">${t("第三方许可声明","Third-party notices")}</a> / <a href="${core}/blob/main/docs/local-workbench.md">${t("数据与执行说明","Data and execution details")}</a></p>`:""}</section>`).join("")}
 <section id="workflows"><h2>${t("按任务了解工作流","Explore the workflows")}</h2><p><a href="${lang==='en'?'/en':''}/ai-ui-review/">${t("AI 界面评审与截图复核","AI UI review and screenshot evidence")}</a> / <a href="${lang==='en'?'/en':''}/ai-website-design/">${t("AI 网站设计与初稿优化","AI website design and post-generation improvement")}</a></p></section><section id="faq"><h2>${t("常见问题","Frequently asked questions")}</h2>${guideFaq[lang].map(([q,a])=>`<article class="guide-answer"><h3>${q}</h3><p>${a}</p></article>`).join("")}</section></div>${wikiColumnsEnd(lang,wikiPath)}</main>
 ${wikiFooter(lang,wikiPath,wikiSections)}</div>`;
}
