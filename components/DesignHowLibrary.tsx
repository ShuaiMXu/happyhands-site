import { applyResourceMetadata, systemSeo } from "../packages/ui/resource-seo";
import { Input } from "../packages/ui";
import React, { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import catalog from "../public/design-how/catalog.json";
import { Button } from "../packages/ui";
import "./design-how.css";
import { SystemStylePreview, previewComponents } from "./SystemStylePreview";

type Document = { path: string; title: string; kind: string };
export const designHowSystems = catalog.systems;
export function designHowLink(href: string, system: string, path: string) {
  const base =
    path.startsWith("guides/") || path.startsWith("articles/")
      ? `https://design.how/${path}`
      : `https://design.how/systems/${system}/${path}`;
  let url: URL;
  try {
    url = new URL(href, base);
  } catch {
    return href;
  }
  if (
    url.origin !== "https://design.how" &&
    url.origin !== "https://happyhands.cc"
  )
    return href;
  if (url.pathname.startsWith("/r/"))
    return url.pathname + url.search + url.hash;
  const match = url.pathname.match(
    /^\/systems\/(sodium|glaze|quartz|lime)(?:\/(.*))?$/,
  );
  if (match) {
    const id = match[1],
      doc = (match[2] || "index.md").replace(/\/$/, "");
    const filename = doc.endsWith(".md") ? doc : `${doc}.md`;
    if (
      catalog.systems
        .find((s) => s.id === id)
        ?.documents.some((d) => d.path === filename)
    )
      return `/components/?provider=systems&system=${id}&doc=${encodeURIComponent(filename)}${url.hash}`;
  }
  const reading = url.pathname.replace(/^\//, "").replace(/\/$/, "");
  const filename = reading.endsWith(".md") ? reading : `${reading}.md`;
  if (catalog.reading.some((d) => d.path === filename))
    return `/components/?provider=systems&system=${system}&doc=${encodeURIComponent(filename)}${url.hash}`;
  return href;
}

export function DesignHowLibrary({
  system,
  lang,
}: {
  system: string;
  lang: string;
}) {
  const data = catalog.systems.find((s) => s.id === system)!;
  const zh = lang === "zh",
    t = (cn: string, en: string) => (zh ? cn : en);
  const documents: Document[] = [...data.documents, ...catalog.reading];
  const read = () => {
    const path = new URLSearchParams(location.search).get("doc");
    return documents.find((d) => d.path === path)?.path || "index.md";
  };
  const [view, setView] = useState(() =>
    new URLSearchParams(location.search).has("doc") ? "documents" : "preview",
  );
  const [path, setPath] = useState(read),
    [query, setQuery] = useState("");
  const [text, setText] = useState(""),
    [error, setError] = useState(false),
    [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(0),
    [notice, setNotice] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const content = useRef<HTMLElement>(null);
  const [directoryOpen, setDirectoryOpen] = useState(
    () => matchMedia("(min-width: 900px)").matches,
  );
  const [activeSection, setActiveSection] = useState("system-preview");
  const reading = path.startsWith("guides/") || path.startsWith("articles/");
  const file = `/systems/${reading ? path : `${system}/${path}`}`;
  const title = documents.find((d) => d.path === path)?.title || data.name;
  useEffect(() => {
    const update = () => {
      setPath(read());
      setView(
        new URLSearchParams(location.search).has("doc")
          ? "documents"
          : "preview",
      );
    };
    addEventListener("popstate", update);
    return () => removeEventListener("popstate", update);
  }, [system]);
  useEffect(() => {
    applyResourceMetadata(systemSeo(data, view === 'documents' ? documents.find(d => d.path === path) : undefined), lang);
  }, [system, path, view, lang]);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    setText("");
    setNotice("");
    fetch(file, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw Error("document");
        return response.text();
      })
      .then((value) => {
        if (!controller.signal.aborted) setText(value);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [file, retry]);
  useEffect(() => {
    const media = matchMedia("(min-width: 900px)");
    const update = () => setDirectoryOpen(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (view !== "preview") return;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".system-book-section"),
    );
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-88px 0px -58% 0px", threshold: [0, 0.1, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [view]);
  useEffect(() => {
    if (!loading && location.hash) {
      const target = content.current?.querySelector(
        `[id="${CSS.escape(decodeURIComponent(location.hash.slice(1)))}"]`,
      );
      target?.scrollIntoView();
    }
  }, [loading, path]);
  function select(next: string) {
    const url = new URL(location.href);
    url.searchParams.set("doc", next);
    history.pushState(null, "", url.pathname + url.search);
    setPath(next);
    setView("documents");
    if (innerWidth < 900) setDirectoryOpen(false);
    requestAnimationFrame(() => heading.current?.focus());
  }
  const foundations = documents.filter((d) => d.kind === "foundation");
  const components = documents.filter((d) => d.kind === "component");
  const guides = documents.filter(
    (d) => d.kind === "guides" || d.kind === "articles",
  );
  const filtered = documents.filter((d) =>
    `${d.title} ${d.path}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const sections = [
    ["system-preview", "01", t("预览", "Preview")],
    ["system-foundations", "02", t("基础规范", "Foundations")],
    ["system-components", "03", t("组件", "Components")],
    ["system-guides", "04", t("指南与文章", "Guides")],
    ["system-download", "05", t("资料与下载", "Files and downloads")],
  ] as const;
  function openDocument(event: React.MouseEvent<HTMLAnchorElement>, next: string) {
    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    event.preventDefault();
    select(next);
  }
  function backToBook(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    event.preventDefault();
    const url = new URL(location.href);
    url.searchParams.delete("doc");
    history.pushState(null, "", url.pathname + url.search);
    setPath("index.md");
    setView("preview");
    setActiveSection("system-preview");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <div className="design-how-library">
      {view === "preview" ? (
        <div className="system-book">
          <aside className="system-book-toc">
            <p className="system-book-toc-title">
              {t("本页目录", "On this page")}
            </p>
            <nav aria-label={t("本页目录", "On this page")}>
              {sections.map(([id, number, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={activeSection === id ? "location" : undefined}
                >
                  <span>{number}</span>
                  {label}
                </a>
              ))}
            </nav>
            <div className="system-book-toc-meta">
              <span>{data.documents.length} {t("篇文档", "documents")}</span>
              <span>{components.length} {t("个组件", "components")}</span>
            </div>
            <a className="system-book-top" href="#system-preview">
              {t("回到顶部", "Back to top")} <span aria-hidden="true">↑</span>
            </a>
          </aside>
          <div className="system-book-content">
            <section id="system-preview" className="system-book-section">
              <header className="system-book-heading">
                <span className="system-book-number">01</span>
                <div>
                  <h2>{t("系统预览", "System preview")}</h2>
                  <p>
                    {t(
                      "同一套视觉规则下的页面、表单与组件状态。示例由系统样式实时渲染，不是截图。",
                      "Pages, forms and component states under one set of rules. Rendered from the live system styles, not a screenshot.",
                    )}
                  </p>
                </div>
              </header>
              <SystemStylePreview system={system} lang={lang} compact />
              <div className="system-book-preview-actions">
                <a
                  href={`/systems/preview/?system=${system}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("独立打开预览", "Open preview")}
                  <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={`?provider=systems&system=${system}&doc=index.md`}
                  onClick={(event) => openDocument(event, "index.md")}
                >
                  {t("阅读系统总纲", "Read the overview")}
                </a>
              </div>
            </section>
            <section id="system-foundations" className="system-book-section">
              <header className="system-book-heading">
                <span className="system-book-number">02</span>
                <div>
                  <h2>{t("基础规范", "Foundations")}</h2>
                  <p>
                    {t(
                      "颜色、排版、间距、圆角、层级、动效与图标的使用约定。",
                      "Rules for colour, typography, space, radius, elevation, motion and iconography.",
                    )}
                  </p>
                </div>
              </header>
              <div className="system-book-list system-book-list--three">
                {foundations.map((doc, index) => (
                  <a
                    key={doc.path}
                    href={`?provider=systems&system=${system}&doc=${encodeURIComponent(doc.path)}`}
                    onClick={(event) => openDocument(event, doc.path)}
                  >
                    <span className="system-book-list-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{doc.title}</span>
                    <span aria-hidden="true">→</span>
                  </a>
                ))}
              </div>
            </section>
            <section id="system-components" className="system-book-section">
              <header className="system-book-heading">
                <span className="system-book-number">03</span>
                <div>
                  <h2>{t("组件", "Components")}</h2>
                  <p>
                    {t(
                      `${components.length} 个组件的用法、状态与可安装源码。`,
                      `Usage, states and installable source for ${components.length} components.`,
                    )}
                  </p>
                </div>
              </header>
              <div className="system-book-component-grid">
                {components.map((doc) => {
                  const slug = doc.path.split("/").at(-1)!.replace(/\.md$/, "");
                  return (
                    <a
                      key={doc.path}
                      href={`?provider=systems&system=${system}&doc=${encodeURIComponent(doc.path)}`}
                      onClick={(event) => openDocument(event, doc.path)}
                    >
                      <span>{doc.title}</span>
                      {previewComponents.has(slug) && (
                        <span className="system-book-live">
                          {t("示例", "Live")}
                        </span>
                      )}
                    </a>
                  );
                })}
              </div>
            </section>
            <section id="system-guides" className="system-book-section">
              <header className="system-book-heading">
                <span className="system-book-number">04</span>
                <div>
                  <h2>{t("指南与文章", "Guides")}</h2>
                  <p>
                    {t(
                      "从系统选型、接入到 AI 协作的实践说明。",
                      "Practical notes on choosing, adopting and working with the system.",
                    )}
                  </p>
                </div>
              </header>
              <div className="system-book-list system-book-list--two">
                {guides.map((doc) => (
                  <a
                    key={doc.path}
                    href={`?provider=systems&system=${system}&doc=${encodeURIComponent(doc.path)}`}
                    onClick={(event) => openDocument(event, doc.path)}
                    title={doc.title}
                  >
                    <span>{doc.title}</span>
                    <span aria-hidden="true">→</span>
                  </a>
                ))}
              </div>
            </section>
            <section id="system-download" className="system-book-section">
              <header className="system-book-heading">
                <span className="system-book-number">05</span>
                <div>
                  <h2>{t("资料与下载", "Files and downloads")}</h2>
                  <p>
                    {t(
                      "完整资料包、组件源码与上游来源。",
                      "Complete archive, component source and upstream reference.",
                    )}
                  </p>
                </div>
              </header>
              <div className="system-book-download">
                <div>
                  <h3>{t("完整资料包", "Complete archive")}</h3>
                  <p>
                    {t(
                      "包含全部基础规范、组件文档与安装说明，可离线阅读。",
                      "All foundations, component documents and setup notes for offline reading.",
                    )}
                  </p>
                </div>
                <div className="system-book-download-actions">
                  <a
                    className="system-detail-action system-detail-action--primary"
                    href={data.download}
                    download
                  >
                    {t("下载完整资料", "Download archive")}
                  </a>
                  <a
                    className="system-detail-action"
                    href={`https://design.how/systems/${system}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    design.how <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
              <dl className="system-book-stats">
                <div>
                  <dt>{t("基础规范", "Foundations")}</dt>
                  <dd>{foundations.length}</dd>
                </div>
                <div>
                  <dt>{t("组件", "Components")}</dt>
                  <dd>{components.length}</dd>
                </div>
                <div>
                  <dt>{t("指南与文章", "Guides")}</dt>
                  <dd>{guides.length}</dd>
                </div>
              </dl>
              <p className="system-book-note">
                {t(
                  "由 HappyHands 整理资料与预览；组件示例只用于阅读规范，不在本站安装上游组件。",
                  "Curated by HappyHands for reading and preview; upstream components are not installed on this site.",
                )}
              </p>
            </section>
            <footer className="design-how-source">
              {t("原始文档与组件来源：", "Original documents and components: ")}
              <a href="https://design.how">design.how</a> /{" "}
              {catalog.generatedAt.slice(0, 10)}
            </footer>
          </div>
        </div>
      ) : (
        <div className="design-how-layout">
          <aside className="design-how-directory">
            <a
              className="design-how-back"
              href={`?provider=systems&system=${system}`}
              onClick={backToBook}
            >
              <span aria-hidden="true">←</span> {t("系统总览", "System overview")}
            </a>
            <details
              open={directoryOpen}
              onToggle={(e) => setDirectoryOpen(e.currentTarget.open)}
            >
              <summary>{t("文档目录", "Documents")}</summary>
              <label className="design-how-search">
                {t("搜索文档", "Search documents")}
                <Input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("名称或组件", "Title or component")}
                />
              </label>
              <nav aria-label={t("设计系统文档", "Design system documents")}>
                {[
                  ["overview", t("总纲", "Overview")],
                  ["foundation", t("基础规范", "Foundations")],
                  ["component", t("组件", "Components")],
                  ["guides", t("使用指南", "Guides")],
                  ["articles", t("设计系统文章", "Articles")],
                ].map(([kind, label]) => {
                  const items = filtered.filter((d) => d.kind === kind);
                  return (
                    items.length > 0 && (
                      <div className="design-how-group" key={kind}>
                        <h3>{label}</h3>
                        {items.map((doc) => (
                          <a
                            key={doc.path}
                            aria-current={path === doc.path ? "page" : undefined}
                            href={`?provider=systems&system=${system}&doc=${encodeURIComponent(doc.path)}`}
                            onClick={(event) => openDocument(event, doc.path)}
                          >
                            {doc.title}
                          </a>
                        ))}
                      </div>
                    )
                  );
                })}
                {filtered.length === 0 && (
                  <p role="status">
                    {t("没有匹配的文档。", "No matching documents.")}
                  </p>
                )}
              </nav>
            </details>
          </aside>
          <article
            ref={content}
            className="design-how-document"
            aria-busy={loading}
          >
            <header>
              <p className="design-how-kicker">
                {data.name} /{" "}
                {path.startsWith("guides/")
                  ? t("使用指南", "Guide")
                  : path.startsWith("articles/")
                    ? t("设计系统文章", "Article")
                    : path.startsWith("components/")
                      ? t("组件", "Component")
                      : path.startsWith("foundations/")
                        ? t("基础规范", "Foundation")
                        : t("系统总纲", "Overview")}
              </p>
              <h2 ref={heading} tabIndex={-1}>
                {path === "index.md" ? t("系统总纲", "System overview") : title}
              </h2>
              <div className="design-how-actions">
                <Button
                  disabled={!text || loading || error}
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(text);
                      setNotice(t("已复制", "Copied"));
                    } catch {
                      setNotice(
                        t(
                          "复制失败，请下载文件。",
                          "Could not copy. Download the file instead.",
                        ),
                      );
                    }
                  }}
                >
                  {t("复制 Markdown", "Copy Markdown")}
                </Button>
                <a
                  className="hh-button"
                  data-variant="secondary"
                  href={file}
                  download
                >
                  {t("下载 Markdown", "Download Markdown")}
                </a>
                <span role="status">{notice}</span>
              </div>
            </header>
            {path.startsWith("components/") &&
              previewComponents.has(
                path.split("/").at(-1)!.replace(/\.md$/, ""),
              ) && (
                <SystemStylePreview
                  system={system}
                  lang={lang}
                  component={path.split("/").at(-1)!.replace(/\.md$/, "")}
                />
              )}
            {path.startsWith("components/") && (
              <div className="design-how-install">
                <code>
                  npx shadcn@latest add https://happyhands.cc/r/{system}/
                  {path.split("/").at(-1)!.replace(/\.md$/, ".json")}
                </code>
                <a
                  href={`/r/${system}/${path.split("/").at(-1)!.replace(/\.md$/, ".json")}`}
                  download
                >
                  {t("下载组件源码", "Download component source")}
                </a>
              </div>
            )}
            {loading && (
              <p role="status">{t("正在加载文档…", "Loading document…")}</p>
            )}
            {error && (
              <div role="alert">
                <p>
                  {t(
                    "文档加载失败，请重试。",
                    "Could not load this document. Please retry.",
                  )}
                </p>
                <Button onClick={() => setRetry((n) => n + 1)}>
                  {t("重试", "Retry")}
                </Button>
              </div>
            )}
            {!loading && !error && (
              <div className="design-how-prose" lang="en">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeSlug]}
                  components={{
                    h1: () => null,
                    pre: ({ children }) => <pre tabIndex={0}>{children}</pre>,
                    table: ({ children }) => (
                      <div
                        className="design-how-table"
                        tabIndex={0}
                        role="region"
                        aria-label={t("文档表格", "Document table")}
                      >
                        <table>{children}</table>
                      </div>
                    ),
                    a: ({ href, children }) => (
                      <a href={designHowLink(href || "", system, path)}>
                        {children}
                      </a>
                    ),
                  }}
                >
                  {text
                    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "")
                    .replace(
                      /^(?:kind|version|last-updated|install-base|human):.*\r?$/gm,
                      "",
                    )}
                </Markdown>
              </div>
            )}
            <footer className="design-how-source">
              {t("原始文档与组件来源：", "Original documents and components: ")}
              <a href="https://design.how">design.how</a> /{" "}
              {catalog.generatedAt.slice(0, 10)}
            </footer>
          </article>
        </div>
      )}
    </div>
  );
}
