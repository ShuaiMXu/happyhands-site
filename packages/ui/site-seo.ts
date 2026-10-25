export const siteOrigin = "https://happyhands.cc";
const core = "https://github.com/ShuaiMXu/happyhands";
export type SeoLanguage = "zh" | "en";
export const seoPages = {
  portal: {path:"/apps/portal/",file:"apps/portal/index.html",zh:["HappyHands / 开源 AI 界面审阅工作台","HappyHands 是面向 AI 编程项目的本地设计审阅工作台：采集页面、定位 UI 问题、确认修改范围，再对照前后截图复核。原始核心代码采用 MIT，当前处于 Alpha。"],en:["HappyHands / Open-source UI design review for coding agents","Review UI issues, confirm scoped changes, and compare screenshots in a local workbench for products built with coding agents. Original core code is MIT licensed. Local Web Alpha."]},
  components:{path:"/components/",file:"components/index.html",zh:["设计系统、组件与设计参考 / HappyHands","探索 HappyHands、Quartz 和 Lime 设计系统，查看 Cult UI 组件预览、Kage 设计参考与 Refero DESIGN.md 导入。第三方资源保留来源与各自许可。"],en:["Design systems, components and references / HappyHands","Explore HappyHands, Quartz and Lime design systems, Cult UI component previews, Kage references, and Refero DESIGN.md import. Third-party resources retain their sources and licenses."]},
  studio:{path:"/apps/studio/",file:"apps/studio/index.html",zh:["主题工作室 / 配色、字体与设计变量 / HappyHands","在 HappyHands 主题工作室选择预设，调整配色、字体和设计变量，实时预览浅色与深色界面，并导出 CSS、Tailwind 或设计基础审批文件。"],en:["Theme Studio / Colors, typography and design tokens / HappyHands","Choose a theme preset, customize colors, typography and design tokens, preview light and dark interfaces, and export CSS, Tailwind or a Harness Foundation approval file."]},
  happyhands:{path:"/systems/happyhands/",file:"systems/happyhands/index.html",zh:["HappyHands 设计系统 / 变量、组件与界面状态","查看 HappyHands 设计系统的语义变量、按钮、表单、反馈状态和页面示例；按项目已有规范确认采用范围，再接入编码工具。"],en:["HappyHands design system / Tokens, components and UI states","Inspect HappyHands semantic tokens, buttons, forms, feedback states and page examples. Confirm adoption against your product’s existing rules before implementation."]},
  quartz:{path:"/systems/quartz/",file:"systems/quartz/index.html",zh:["Quartz 设计系统参考 / AI 工作流与专业工具 / HappyHands","查看 Quartz 的使用场景、设计变量、组件、页面目录和接入说明。Quartz 来源于 design.how，使用前核对其上游版本、许可与技术要求。"],en:["Quartz design system reference / AI workflows / HappyHands","Explore Quartz use cases, design tokens, components, screens and integration guidance. Quartz comes from design.how; check its upstream version, license and stack requirements before use."]},
  lime:{path:"/systems/lime/",file:"systems/lime/index.html",zh:["Lime 设计系统参考 / 个人助手与消费应用 / HappyHands","查看 Lime 的设计变量、组件状态、页面示例和接入指令。Lime 来源于 design.how，保留上游来源，并在使用前核对技术兼容性与许可。"],en:["Lime design system reference / Consumer apps / HappyHands","Inspect Lime tokens, component states, screen examples and integration guidance. Lime comes from design.how; verify upstream licensing and technical compatibility before adoption."]},
  guide:{path:"/guide/",file:"guide/index.html",zh:["HappyHands 使用指南 / AI 界面审阅、设计系统与本地安装","了解 HappyHands 的本地安装、页面诊断、设计系统选择、主题自定义、编码工具接入与前后复核流程，以及 Alpha 范围、数据处理和第三方许可。"],en:["HappyHands guide / UI review, design systems and local setup","Learn local setup, UI diagnosis, design systems, theme customization, coding-agent integration and before/after review, with Alpha scope, data handling and licensing details."]},
  guideEn:{path:"/en/guide/",file:"en/guide/index.html",zh:["HappyHands 使用指南","HappyHands 本地设计审阅指南。"],en:["HappyHands guide / UI review, design systems and local setup","Learn local setup, UI diagnosis, design systems, theme customization, coding-agent integration and before/after review, with Alpha scope, data handling and licensing details."]},
} as const;
export type SeoPage = keyof typeof seoPages;
export const guideFaq = {
 zh:[
  ["HappyHands 是什么？","HappyHands 是面向 AI 编程项目的本地设计审阅工作台。它把页面截图、项目设计来源、问题、修改计划和复核记录放在同一流程中，最终由人决定接受或拒绝修改。"],
  ["官网可以直接输入网址并自动改代码吗？","官网提供接入提示词、设计资源和主题工作室。本地工作台与 Harness 执行审阅流程；提供网址后，编码工具仍需核对预览和采集条件。代码修改需要可访问的本地仓库、确认的范围与执行适配器。"],
  ["支持哪些编码工具？","Codex CLI 可用于模型诊断、截图复核与代码执行。Claude Code 有代码执行适配器，完整端到端验证仍在进行。Cursor、Kimi Code、WorkBuddy 在具备本地浏览器、终端及仓库访问能力时可操作 Harness，目前没有各自的专用执行适配器。"],
  ["如何使用现有设计规范？","提供项目自己的 DESIGN.md、样式 token 和组件源码。提取到的设计规则先作为待确认候选，不能自动成为已批准规范。主题工作室可导出兼容 Harness 的设计基础审批文件。"],
  ["源码是否开源？使用是否产生费用？","自有 HappyHands 核心源码采用 MIT 许可。第三方代码、素材与依赖保留各自许可，tldraw 的生产使用有独立要求。你配置的模型服务可能另行计费。"],
  ["数据会发送到哪里？","运行记录保存在本地 .harness/。模型辅助步骤通过配置的 CLI 将选中的源码上下文和截图发送给模型服务，并非所有计算都在本机完成。分享导出记录前应检查敏感信息。"],
  ["当前版本有哪些边界？","当前为 Local Web Alpha。审阅范围由采集计划和已完成检查决定；没有查看的页面和没有测试的交互不属于已通过范围。模型复核不能替代人工验收。"],
 ],
 en:[
  ["What is HappyHands?","HappyHands is a local design review workbench for products built with coding agents. It connects screenshots, project design sources, findings, change plans and review records. A person makes the final accept or reject decision."],
  ["Can I enter a URL on the website and have code fixed automatically?","The website provides setup prompts, design resources and Theme Studio. The local workbench and Harness run the review workflow. Your coding tool must check preview and capture requirements; code changes require an accessible local repository, confirmed scope and an implementation adapter."],
  ["Which coding tools can I use?","Codex CLI supports model diagnosis, screenshot-aware review and implementation. Claude Code has an implementation adapter; complete end-to-end validation remains open. Cursor, Kimi Code and WorkBuddy can operate the Harness with local browser, terminal and repository access, but do not have dedicated implementation adapters here."],
  ["How do I use my existing design system?","Provide your project’s DESIGN.md, style tokens and component source. Extracted rules start as candidates for review, not approved constraints. Theme Studio can export a Harness-compatible Foundation approval file."],
  ["Is the source open, and does using it cost money?","Original HappyHands core code is MIT licensed. Third-party code, assets and dependencies retain their own terms, including tldraw’s separate production-use requirements. Your configured model provider may charge separately."],
  ["Where does my data go?","Run records stay in the local .harness/ directory. Model-assisted steps use your configured CLI to send selected source context and screenshots to the model service; processing is not entirely local. Check exports for sensitive information before sharing."],
  ["What are the current limitations?","HappyHands is a Local Web Alpha. Coverage follows the capture plan and completed checks. Unseen pages and untested interactions remain unreviewed. A model review cannot replace human acceptance."],
 ],
} as const;
const esc=(s:string)=>s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]!));
export function seoData(key:SeoPage,language:SeoLanguage="zh") {
 const page=seoPages[key],lang=key==="guideEn"?"en":key==="guide"?"zh":language;
 const [title,description]=page[lang],url=siteOrigin+page.path;
 const graph:Record<string,unknown>[]=[
  {"@type":"Organization","@id":siteOrigin+"/#project",name:"HappyHands",url:siteOrigin,logo:siteOrigin+"/brand/happyhands-logo-ink.png",sameAs:[core,core+"-site"]},
  {"@type":"WebSite","@id":siteOrigin+"/#website",url:siteOrigin,name:"HappyHands",inLanguage:["zh-CN","en"],publisher:{"@id":siteOrigin+"/#project"}},
  {"@type":"SoftwareApplication","@id":siteOrigin+"/#workbench",name:"HappyHands",url:siteOrigin+"/apps/portal/",applicationCategory:"DeveloperApplication",description:seoPages.portal[lang][1],softwareVersion:"0.1.0 Alpha",license:core+"/blob/main/LICENSE"},
  {"@type":"SoftwareSourceCode","@id":siteOrigin+"/#source",name:"HappyHands core source",url:core,codeRepository:core,license:core+"/blob/main/LICENSE",programmingLanguage:["JavaScript","TypeScript"],about:{"@id":siteOrigin+"/#workbench"}},
  {"@type":key.startsWith("guide")?"FAQPage":"WebPage","@id":url+"#page",url,name:title,description,inLanguage:lang==="zh"?"zh-CN":"en",isPartOf:{"@id":siteOrigin+"/#website"},about:{"@id":siteOrigin+"/#workbench"},...(key.startsWith("guide")?{mainEntity:guideFaq[lang].map(([name,text])=>({"@type":"Question",name,acceptedAnswer:{"@type":"Answer",text}}))}:{})},
 ];
 return {title,description,url,lang,image:siteOrigin+"/brand/happyhands-social.png",graph:{"@context":"https://schema.org","@graph":graph}};
}
export function seoHead(key:SeoPage,language:SeoLanguage="zh") {
 const x=seoData(key,language),tags:Record<string,string>={"og:type":"website","og:site_name":"HappyHands","og:title":x.title,"og:description":x.description,"og:url":x.url,"og:image":x.image,"og:image:width":"1200","og:image:height":"630","og:image:alt":"HappyHands / Open-source UI design review","og:locale":x.lang==="zh"?"zh_CN":"en_US","twitter:card":"summary_large_image","twitter:title":x.title,"twitter:description":x.description,"twitter:image":x.image,"twitter:image:alt":"HappyHands / Open-source UI design review"};
 const alternates=key.startsWith("guide")?`<link rel="alternate" hreflang="zh-CN" href="${siteOrigin}/guide/"><link rel="alternate" hreflang="en" href="${siteOrigin}/en/guide/"><link rel="alternate" hreflang="x-default" href="${siteOrigin}/en/guide/">`:"";
 return `<title>${esc(x.title)}</title><meta name="description" content="${esc(x.description)}"><link rel="canonical" href="${x.url}">${Object.entries(tags).map(([k,v])=>`<meta ${k.startsWith("og:")?"property":"name"}="${k}" content="${esc(v)}">`).join("")}${alternates}<script id="site-structured-data" type="application/ld+json">${JSON.stringify(x.graph).replace(/</g,"\\u003c")}</script>`;
}
export function enhanceSeoHtml(html:string,key:SeoPage) {
 return html.replace(/<title>[\s\S]*?<\/title>/gi,"").replace(/<meta\b[^>]*(?:name|property)=["'](?:description|og:[^"']+|twitter:[^"']+)["'][^>]*>/gi,"").replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi,"").replace("</head>",seoHead(key)+"</head>");
}
export function applySiteMetadata(key:SeoPage,lang:SeoLanguage) {
 const x=seoData(key,lang);document.title=x.title;
 const set=(selector:string,attributes:Record<string,string>)=>{let el=document.head.querySelector(selector);if(!el){el=document.createElement("meta");document.head.append(el)}for(const[k,v]of Object.entries(attributes))el.setAttribute(k,v)};
 set('meta[name="description"]',{name:"description",content:x.description});
 for(const[name,content]of Object.entries({"og:title":x.title,"og:description":x.description,"og:url":x.url,"og:image":x.image,"og:locale":x.lang==="zh"?"zh_CN":"en_US"}))set(`meta[property="${name}"]`,{property:name,content});
 for(const[name,content]of Object.entries({"twitter:card":"summary_large_image","twitter:title":x.title,"twitter:description":x.description,"twitter:image":x.image}))set(`meta[name="${name}"]`,{name,content});
 let schema=document.getElementById("site-structured-data");if(!schema){schema=document.createElement("script");schema.id="site-structured-data";schema.setAttribute("type","application/ld+json");document.head.append(schema)}schema.textContent=JSON.stringify(x.graph).replace(/</g,"\\u003c");
}
