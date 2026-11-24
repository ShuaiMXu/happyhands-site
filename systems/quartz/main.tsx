import { Button } from "../../packages/ui";
import { DesignSystemDocumentation, SystemDocumentLink } from "../../components/DesignSystemDocumentation";
import { applySiteMetadata } from "../../packages/ui/site-seo";
import { FoundationSpecimen } from "../../packages/ui/FoundationSpecimen";
import { SystemScenes } from "../../packages/ui/SystemScenes";
import { QuartzCatalog } from "./QuartzCatalog";
import { SystemExample } from "../../packages/ui/SystemExample";
import { Icon } from "../../packages/ui/Icon";
import { useSitePreferences } from "../../packages/ui/useSitePreferences";
import { SiteHeader } from "../../packages/ui/SiteHeader";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "../../packages/design-tokens/happyhands.css";
import "../../packages/ui/site-layout.css";
import "../../packages/ui/system-page.css";
import "../../packages/ui/owned-ui.css";
// @ts-ignore The catalog prompt is shared with the plain-JS portal.
import { quartzPrompt } from "../../apps/portal/design-systems.js";

function App() {
  const { lang, dark, toggleLanguage, toggleTheme } = useSitePreferences();
  const [existing, setExisting] = useState(true);
  const [status, setStatus] = useState("");
  React.useEffect(() => {
    applySiteMetadata('quartz',lang);
  }, [lang]);
  const t = (cn: string, en: string) => (lang === "zh" ? cn : en);

  const prompt = quartzPrompt(lang, existing);
  return (
    <>
      <SiteHeader
        lang={lang}
        dark={dark}
        onTheme={toggleTheme}
        onLanguage={toggleLanguage}
      />
      <div className="system-landing">
        <main>
          <DesignSystemDocumentation
            name="Quartz"
            description={t("面向 AI 产品和代理工作流，涵盖工具审批、运行追踪与代理会话。", "For AI products and agent workflows, including tool approvals, run traces and agent sessions.")}
            lang={lang}
            actions={<>
              <SystemDocumentLink href={`${lang === "en" ? "/en" : ""}/components/?provider=systems&system=quartz`} primary>
                {t("阅读完整文档", "Read full documentation")}
              </SystemDocumentLink>
              <SystemDocumentLink href="/design-how/quartz.zip" download>
                {t("下载完整资料", "Download archive")}
              </SystemDocumentLink>
            </>}
            sections={[
              {
                id: "system-preview",
                title: t("系统预览", "System preview"),
                content: <div id="overview">
                  <div id="example" className="system-book-local-content">
                    <p className="eyebrow">{t("效果预览", "See it in use")}</p>
                    <h3>
                      {t(
                        "文件修改确认",
                        "File change approval",
                      )}
                    </h3>
                    <div className="system-example-layout">
                      <div>
                        <p>
                          {t(
                            "通过文件列表与主要操作呈现修改范围。切换外观、选择文件，预览选择与确认状态。",
                            "A file list and primary action define the scope. Switch appearance and select files to preview selection and confirmation states.",
                          )}
                        </p>
                        <p className="micro">
                          {t(
                            "HappyHands 编写的交互示例，配色与圆角参考 Quartz。使用系统字体；并非上游组件的原样展示，也不会访问你的文件。",
                            "An interactive example authored by HappyHands, using Quartz palette and corner values with system fonts. It is not an upstream component demo and cannot access your files.",
                          )}
                        </p>
                        <a
                          href="https://design.how/r/quartz/theme.json"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {t("查看配色来源", "Palette source")}
                        </a>
                      </div>
                      <SystemExample system="quartz" lang={lang} dark={dark} />
                    </div>
                  </div>
                  <SystemScenes system="quartz" lang={lang} dark={dark} />
                </div>,
              },
              {
                id: "system-foundations",
                title: t("基础规范", "Foundations"),
                content: <div id="foundations" className="system-book-local-content">
                  <FoundationSpecimen system="quartz" lang={lang} />
                  <h3>
                    {t(
                      "颜色、状态与组件的使用约定",
                      "Rules for colors, states and components",
                    )}
                  </h3>
                  <div className="rules">
                    <article>
                      <h3>{t("中性框架", "Neutral structure")}</h3>
                      <p>
                        {t(
                          "黑白框架承载内容，类别通过文字识别；暖色保留给警告与失败。",
                          "A neutral structure carries content, kinds are named in words, and warm colors are reserved for warnings and failures.",
                        )}
                      </p>
                    </article>
                    <article>
                      <h3>{t("按角色使用变量", "Role-based tokens")}</h3>
                      <p>
                        {t(
                          "组件使用语义变量，不在页面临时拼颜色、字号与阴影。",
                          "Components use role tokens rather than ad hoc colors, sizes and shadows.",
                        )}
                      </p>
                    </article>
                    <article>
                      <h3>{t("组件优先", "Components first")}</h3>
                      <p>
                        {t(
                          "先选已有组件，再组合页面；保留键盘、焦点、加载与错误反馈。",
                          "Compose screens from existing components while preserving keyboard, focus, loading and error behavior.",
                        )}
                      </p>
                    </article>
                  </div>
                  </div>,
              },
              {
                id: "system-components",
                title: t("组件目录", "Components"),
                content: <div id="components" className="system-book-local-content">
                  <p>
                    {t(
                      "按操作、导航、反馈和工作流分类查找，也可搜索全部注册项。展开条目，在本站查看用途和接入方式；实际组件接口以来源为准。",
                      "Search all registered entries, or browse actions, navigation, feedback and workflow categories. Open an entry here for its purpose and setup. Refer to upstream for component APIs.",
                    )}
                  </p>
                  <QuartzCatalog lang={lang} />
                  </div>,
              },
              {
                id: "system-guides",
                title: t("页面模板", "Screen blocks"),
                content: <div id="patterns" className="system-book-local-content">
                  <div className="rules">
                    {[
                      [
                        "项目首页",
                        "Workspace home",
                        "项目概况与待处理事项",
                        "Project overview and pending work",
                      ],
                      [
                        "代理会话",
                        "Agent session",
                        "输入、回复与工具调用",
                        "Input, responses and tool calls",
                      ],
                      [
                        "工具审批",
                        "Tool approval",
                        "查看操作范围并做出决定",
                        "Inspect scope and make a decision",
                      ],
                      [
                        "运行追踪",
                        "Run trace",
                        "查看执行过程与结果",
                        "Inspect execution and results",
                      ],
                      [
                        "实时活动",
                        "Live activity",
                        "浏览持续产生的事件",
                        "Browse ongoing events",
                      ],
                      [
                        "访问密钥",
                        "API keys",
                        "创建、查看与撤销密钥",
                        "Create, inspect and revoke keys",
                      ],
                      [
                        "发布详情",
                        "Prompt release",
                        "发布检查与回退",
                        "Release checks and rollback",
                      ],
                    ].map(([cn, en, desc, eng]) => (
                      <article key={en}>
                        <h3>{t(cn, en)}</h3>
                        <p>{t(desc, eng)}</p>
                      </article>
                    ))}
                  </div>
                  </div>,
              },
              {
                id: "system-setup",
                title: t("接入方式", "Setup"),
                content: <div id="adopt" className="system-book-local-content">
                  <p>
                    {t(
                      "需要 React、Tailwind 和兼容的 shadcn 配置。先检查技术栈与已有品牌，再逐页迁移。复制指令不会安装或执行命令。",
                      "Requires React, Tailwind and compatible shadcn configuration. Check the stack and existing brand before migrating screen by screen. Copying does not install or execute anything.",
                    )}
                  </p>
                  <label>
                    {t("接入方式", "Setup mode")}
                    <select
                      value={existing ? "existing" : "new"}
                      onChange={(e) => setExisting(e.target.value === "existing")}
                    >
                      <option value="existing">
                        {t("已有项目", "Existing project")}
                      </option>
                      <option value="new">{t("新项目", "New project")}</option>
                    </select>
                  </label>
                  <textarea
                    aria-label={t("接入指令", "Setup prompt")}
                    value={prompt}
                    readOnly
                    rows={12}
                  />
                  <div className="actions">
                    <Button
                      className="action"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(prompt);
                          setStatus(t("已复制", "Copied"));
                        } catch {
                          setStatus(
                            t(
                              "复制失败，请手动选择指令。",
                              "Copy unavailable. Select the prompt manually.",
                            ),
                          );
                        }
                      }}
                    >
                      {t("复制接入指令", "Copy setup prompt")}
                    </Button>
                    <a href="https://github.com/ShuaiMXu/creative-os/blob/main/docs/local-workbench.md">
                      {t("本地工作台指引", "Local workbench guide")}
                    </a>
                  </div>
                  </div>,
              },
            ]}
          />
          <footer>
            <div className="system-related">
              <div>
                <p className="eyebrow">
                  {t("我们的设计系统", "Our design system")}
                </p>
                <h2>HappyHands</h2>
                <p>
                  {t(
                    "也可以从官网正在使用的规范与组件开始。",
                    "Explore the rules and components used by this website.",
                  )}
                </p>
              </div>
              <a className="action secondary" href="/systems/happyhands/">
                {t("探索 HappyHands", "Explore HappyHands")}{" "}
                <Icon name="right" />
              </a>
            </div>
            <div className="system-return"><a href="/components/?provider=systems">{t("返回设计系统", "All design systems")}</a><a href="/systems/lime/">{t("了解 Lime", "Explore Lime")} <Icon name="right" /></a></div>
            <details>
              <summary>
                {t("来源、版本与许可", "Sources, versions & licensing")}
              </summary>
              <p>
                {t(
                  "资料核对于 2026-10-16，未锁定上游发布版本。未转载组件源码、字体和官方截图。使用时请核对上游许可、依赖及锁文件。",
                  "Documentation checked on 2026-10-16; no upstream release is pinned. Component source, fonts and screenshots are not redistributed. Check upstream licenses, dependencies and lockfiles before adoption.",
                )}
              </p>
              <a href="https://design.how/systems/quartz">
                {t(
                  "原始设计系统文档（外部）",
                  "Original documentation (external)",
                )}
              </a>{" "}
               / {" "}
              <a href="https://design.how/r/quartz/registry.json">
                {t("上游组件注册表（外部）", "Upstream registry (external)")}
              </a>
            </details>
          </footer>
        </main>
      </div>
      <output className="notice" aria-live="polite">
        {status}
      </output>
    </>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
import '../../packages/ui/system-embed';
