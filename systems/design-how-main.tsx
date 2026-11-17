import React from "react";
import { createRoot } from "react-dom/client";
import { SiteHeader } from "../packages/ui/SiteHeader";
import { SystemBreadcrumb } from "../packages/ui/SystemBreadcrumb";
import { useSitePreferences } from "../packages/ui/useSitePreferences";
import {
  DesignHowLibrary,
  designHowSystems,
} from "../components/DesignHowLibrary";
import "../packages/design-tokens/happyhands.css";
import "../packages/ui/site-layout.css";
import "../packages/ui/system-page.css";
import "../packages/ui/owned-ui.css";
function App() {
  const { lang, dark, toggleTheme, toggleLanguage } = useSitePreferences();
  const system = location.pathname.replace(/^\/en\//,"/").split("/")[2];
  const data = designHowSystems.find((s) => s.id === system);
  if(!data)return <main><h1>{lang==='zh'?'找不到设计系统':'Design system not found'}</h1><a href="/components/?provider=systems">{lang==='zh'?'浏览设计系统':'Browse design systems'}</a></main>;
  return (
    <>
      <SiteHeader
        lang={lang}
        dark={dark}
        onTheme={toggleTheme}
        onLanguage={toggleLanguage}
      />
      <main className="design-how-page system-landing" id="main-content">
        <SystemBreadcrumb current={data.name} lang={lang} />
        <section className="system-introduction design-how-introduction">
          <div>
            <p className="eyebrow">
              {lang === "zh" ? "外部设计系统 / design.how" : "External design system / design.how"}
            </p>
            <h1>{data.name}</h1>
            <p className="lead">{data.summary}</p>
            <div className="actions">
              <a className="action" href="?doc=index.md">
                {lang === "zh" ? "阅读完整文档" : "Read the docs"}
              </a>
              <a className="action secondary" href={data.download} download>
                {lang === "zh" ? "下载完整资料" : "Download archive"}
              </a>
            </div>
          </div>
          <aside className="system-facts" aria-label={lang === "zh" ? "系统概况" : "System overview"}>
            <dl>
              <div>
                <dt>{lang === "zh" ? "来源" : "Source"}</dt>
                <dd>design.how</dd>
              </div>
              <div>
                <dt>{lang === "zh" ? "技术基础" : "Stack"}</dt>
                <dd>React / Tailwind CSS / shadcn</dd>
              </div>
              <div>
                <dt>{lang === "zh" ? "收录内容" : "In this catalog"}</dt>
                <dd>
                  {lang === "zh"
                    ? `${data.documents.length} 篇基础规范与组件文档`
                    : `${data.documents.length} foundation and component documents`}
                </dd>
              </div>
            </dl>
            <p className="note">
              {lang === "zh"
                ? "由 HappyHands 整理资料与预览；组件示例仅用于查看规范，不在本站安装上游组件。"
                : "Curated by HappyHands for reading and preview; upstream components are not installed on this site."}
            </p>
          </aside>
        </section>
        <div id="preview">
          <DesignHowLibrary system={system} lang={lang} />
        </div>
      </main>
    </>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
