import { applySiteMetadata } from "../../packages/ui/site-seo";
import { Icon } from "../../packages/ui/Icon";
import { useSitePreferences } from "../../packages/ui/useSitePreferences";
import { SiteHeader } from "../../packages/ui/SiteHeader";
import React from "react";
import { HappyHandsSystemDocumentation } from "../../components/HappyHandsSystemDocumentation";
import { createRoot } from "react-dom/client";
import "../../packages/design-tokens/happyhands.css";
import "../../packages/ui/components.css";
import "../../packages/ui/site-layout.css";
import "../../packages/ui/system-page.css";
import "./style.css";
import "../../packages/ui/owned-ui.css";

function App() {
  const { lang, dark, toggleLanguage, toggleTheme } = useSitePreferences();

  React.useEffect(() => applySiteMetadata('happyhands', lang), [lang]);
  const t = (zh: string, en: string) => (lang === 'zh' ? zh : en);
  const localized = (path: string) => `${lang === 'en' ? '/en' : ''}${path}`;
  const source = 'https://github.com/ShuaiMXu/happyhands-site/tree/main';
  return (
    <>
      <a className="skip" href="#main">
        {t("跳到内容", "Skip to content")}
      </a>
      <SiteHeader
        lang={lang}
        dark={dark}
        onTheme={toggleTheme}
        onLanguage={toggleLanguage}
      />
      <main className="happyhands-document-page" id="main" tabIndex={-1}>
        <HappyHandsSystemDocumentation lang={lang} dark={dark} />
        <div className="system-landing happyhands-system">
          <footer>
            <div className="system-related">
              <div>
                <p className="eyebrow">
                  {t("把规范用到你的项目", "Apply the rules to your project")}
                </p>
                <h2>
                  {t("按项目规范接入", "Adopt within your project")}
                </h2>
                <p>
                  {t(
                    "核对设计文档、组件源码与许可，确认采用范围后再在本地项目中实施。",
                    "Check design documents, component source and licensing, then confirm the scope before implementing in your local project.",
                  )}
                </p>
              </div>
              <a className="action secondary" href={localized("/guide/") + "#design"}>
                {t("阅读接入指南", "Read the setup guide")} <Icon name="right" />
              </a>
            </div>
            <div className="system-return">
              <a href={localized("/components/") + "?provider=systems"}>
                {t("返回设计系统", "All design systems")}
              </a>
              <a href="/systems/quartz/">
                {t("了解 Quartz", "Explore Quartz")} <Icon name="right" />
              </a>
              <a href="/systems/lime/">{t("了解 Lime", "Explore Lime")} <Icon name="right" /></a>
            </div>
            <details>
              <summary>
                {t("范围、源码与进度", "Scope, source and progress")}
              </summary>
              <p>
                {t(
                  "官网使用这套设计变量。审阅工作台属于独立工程，组件统一仍在进行。",
                  "The portal uses these design tokens. The review workbench is a separate project; component alignment is still in progress.",
                )}
              </p>
              {t(
                "来源：HappyHands 既有品牌规范与组件。页面复核见对齐记录。",
                "Source: existing HappyHands brand rules and components. See the alignment record for page validation.",
              )}{" "}
              <a href={source + "/docs/website-detail-alignment.md"}>
                {t("对齐记录", "Alignment record")}
              </a>
              <p>
                {t(
                  "暂无 npm / shadcn 安装包或完整自动 lint。品牌素材不因此授予第三方商标使用权。",
                  "No npm/shadcn installer or comprehensive automated lint is published. Brand assets do not grant third-party trademark rights.",
                )}
              </p>
            </details>
          </footer>
        </div>
      </main>
    </>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
import '../../packages/ui/system-embed';
