import { applyResourceMetadata, systemSeo } from "../packages/ui/resource-seo";
import { Input } from "../packages/ui";
import React, { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import catalog from "../public/design-how/catalog.json";
import { Button } from "../packages/ui";
import { Button as ShadcnButton } from "../packages/ui/shadcn/button";
import "./design-how.css";
import { DesignSystemDocumentation, SystemDocumentLink } from "./DesignSystemDocumentation";
import { SystemDocumentCode, SystemDocumentMarkdownCode } from "./SystemDocumentCode";
import { SystemStylePreview } from "./SystemStylePreview";

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
  description,
  useCase,
}: {
  system: string;
  lang: string;
  description?: string;
  useCase?: string;
}) {
  const data = catalog.systems.find((s) => s.id === system)!;
  const zh = lang === "zh",
    t = (cn: string, en: string) => (zh ? cn : en);
  const documents: Document[] = [...data.documents, ...catalog.reading];
  const [openPath, setOpenPath] = useState(
    () => new URLSearchParams(location.search).get("doc") || "",
  );
  const [text, setText] = useState(""),
    [error, setError] = useState(false),
    [loading, setLoading] = useState(Boolean(openPath));
  const [retry, setRetry] = useState(0),
    [notice, setNotice] = useState("");
  const [copyState, setCopyState] = useState<{
    path: string;
    ok: boolean;
  } | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const detail = useRef<HTMLElement>(null);
  const copyTimer = useRef<number | undefined>(undefined);
  const activeDoc = documents.find((d) => d.path === openPath);
  const title = activeDoc?.title || data.name;
  const fileFor = (path: string) =>
    `/systems/${
      path.startsWith("guides/") || path.startsWith("articles/")
        ? path
        : `${system}/${path}`
    }`;
  const file = openPath ? fileFor(openPath) : "";
  const foundations = documents.filter((d) => d.kind === "foundation");
  const components = documents.filter((d) => d.kind === "component");
  const guides = documents.filter(
    (d) => d.kind === "guides" || d.kind === "articles",
  );

  useEffect(() => {
    const update = () =>
      setOpenPath(new URLSearchParams(location.search).get("doc") || "");
    addEventListener("popstate", update);
    return () => removeEventListener("popstate", update);
  }, []);

  useEffect(() => {
    applyResourceMetadata(systemSeo(data, activeDoc), lang);
  }, [system, activeDoc, lang]);

  useEffect(() => {
    if (!openPath) {
      setText("");
      setError(false);
      setLoading(false);
      setNotice("");
      return;
    }
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
  }, [openPath, file, retry]);

  useEffect(() => {
    if (!openPath || loading) return;
    detail.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [openPath, loading]);

  async function copyDoc(path: string) {
    let ok = false;
    try {
      const response = await fetch(fileFor(path));
      if (!response.ok) throw Error("copy");
      await navigator.clipboard.writeText(await response.text());
      ok = true;
    } catch {
      ok = false;
    }
    setCopyState({ path, ok });
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopyState(null), 1800);
  }

  function entry(doc: Document, content: React.ReactNode) {
    const open = openPath === doc.path;
    const state = copyState?.path === doc.path ? copyState : null;
    return (
      <div
        key={doc.path}
        className={`system-book-entry${open ? " is-open" : ""}`}
      >
        <ShadcnButton
          type="button"
          variant="ghost"
          className="system-book-entry-open"
          aria-expanded={open}
          aria-controls={open ? "system-book-detail" : undefined}
          onClick={() => select(doc.path)}
        >
          {content}
        </ShadcnButton>
        <ShadcnButton
          type="button"
          variant="ghost"
          className="system-book-copy"
          onClick={() => copyDoc(doc.path)}
          title={t("复制 design.md", "Copy design.md")}
          aria-label={`${t("复制", "Copy")} ${doc.title} design.md`}
        >
          {state ? (state.ok ? t("已复制", "Copied") : t("失败", "Failed")) : t("复制", "Copy")}
        </ShadcnButton>
      </div>
    );
  }

  function select(next: string) {
    const url = new URL(location.href);
    url.searchParams.set("doc", next);
    history.pushState(null, "", url.pathname + url.search);
    setOpenPath(next);
    setNotice("");
    requestAnimationFrame(() => heading.current?.focus());
  }

  function closeDetail() {
    const url = new URL(location.href);
    url.searchParams.delete("doc");
    history.replaceState(null, "", url.pathname + url.search);
    setOpenPath("");
    setText("");
    setError(false);
    setLoading(false);
  }

  function renderDetail() {
    if (!activeDoc) return null;
    const slug = openPath.split("/").at(-1)!.replace(/\.md$/, "");
    const kind = openPath.startsWith("components/")
      ? t("组件", "Component")
      : openPath.startsWith("foundations/")
        ? t("基础规范", "Foundation")
        : openPath.startsWith("articles/")
          ? t("设计系统文章", "Article")
          : openPath.startsWith("guides/")
            ? t("使用指南", "Guide")
            : t("系统总纲", "Overview");
    return (
      <article
        ref={detail}
        id="system-book-detail"
        className="system-book-detail"
        aria-busy={loading}
      >
        <header className="system-book-detail-head">
          <div>
            <p className="design-how-kicker">
              {data.name} / {kind}
            </p>
            <h3 ref={heading} tabIndex={-1}>
              {openPath === "index.md" ? t("系统总纲", "System overview") : title}
            </h3>
          </div>
          <ShadcnButton
            type="button"
            variant="ghost"
            className="system-book-close"
            onClick={closeDetail}
          >
            {t("收起", "Collapse")} <span aria-hidden="true">×</span>
          </ShadcnButton>
        </header>
        {openPath.startsWith("foundations/") && slug !== "anti-slop" && (
          <SystemStylePreview
            system={system}
            lang={lang}
            foundation={slug}
            compact
            compactSpecimen
          />
        )}
        {openPath.startsWith("components/") && (
          <>
            <SystemStylePreview system={system} lang={lang} component={slug} />
            <div className="design-how-install">
              <SystemDocumentCode
                source={`npx shadcn@latest add https://happyhands.cc/r/${system}/${slug}.json`}
                lang={lang}
                label="shadcn"
              />
              <a href={`/r/${system}/${slug}.json`} download>
                {t("下载组件源码", "Download component source")}
              </a>
            </div>
          </>
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
                pre: ({ children }) => <SystemDocumentMarkdownCode lang={lang}>{children}</SystemDocumentMarkdownCode>,
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
                  <a href={designHowLink(href || "", system, openPath)}>
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
        <footer className="system-book-detail-actions">
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
          <a className="hh-button" data-variant="secondary" href={file} download>
            {t("下载 Markdown", "Download Markdown")}
          </a>
          <span role="status">{notice}</span>
        </footer>
      </article>
    );
  }

  return (
    <div className="design-how-library">
      <DesignSystemDocumentation
        name={data.name}
        description={description || data.summary}
        lang={lang}
        actions={<>
          <SystemDocumentLink href="#system-foundations" primary>{t("浏览规范", "Browse the system")}</SystemDocumentLink>
          <SystemDocumentLink href={data.download} download>{t("下载完整资料", "Download archive")}</SystemDocumentLink>
        </>}
        facts={[
          [t("来源", "Source"), "design.how"],
          ...(useCase ? [[t("适用场景", "Best for"), useCase] as const] : []),
          [t("技术基础", "Stack"), "React / Tailwind CSS / shadcn"],
        ]}
        sections={[
          {
            id: "system-preview",
            title: t("系统预览", "System preview"),
            description: t("选择并试用系统中的完整页面示例。", "Choose and try the system’s page examples."),
            content: <>
              <SystemStylePreview system={system} lang={lang} gallery="examples" />
              <div className="system-book-preview-actions">
                <a
                  href={`/systems/preview/?system=${system}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("独立打开预览", "Open preview")}
                </a>
                <ShadcnButton
                  type="button"
                  variant="ghost"
                  className="system-book-text-button"
                  onClick={() => select("index.md")}
                >
                  {t("展开系统总纲", "Expand the overview")}
                </ShadcnButton>
              </div>
              {openPath === "index.md" && renderDetail()}
            </>,
          },

          {
            id: "system-foundations",
            title: t("基础规范", "Foundations"),
            description: t("颜色、排版、间距、圆角、层级、动效和图标。", "Color, typography, spacing, radius, elevation, motion and icons."),
            content: <>
              <SystemStylePreview
                system={system}
                lang={lang}
                gallery="foundations"
              />
              <div className="system-book-list system-book-list--three">
                {foundations.map((doc) =>
                  entry(
                    doc,
                    <>
                      <span>{doc.title}</span>
                      <span className="system-book-entry-toggle" aria-hidden="true">
                        {openPath === doc.path ? "−" : "+"}
                      </span>
                    </>,
                  ),
                )}
              </div>
              {openPath.startsWith("foundations/") && renderDetail()}
            </>,
          },

          {
            id: "system-components",
            title: t("组件", "Components"),
            description: t("试用组件，展开各条目查看设计规范与安装方式。", "Try the components and open an entry for its design specification and installation instructions."),
            content: <>
              <SystemStylePreview
                system={system}
                lang={lang}
                gallery="components"
              />
              <div className="system-book-component-grid">
                {components.map((doc) =>
                  entry(doc, <span>{doc.title}</span>),
                )}
              </div>
              {openPath.startsWith("components/") && renderDetail()}
            </>,
          },

          {
            id: "system-guides",
            title: t("指南与文章", "Guides"),
            description: t("系统选型、接入与 AI 协作的实践说明。", "Practical notes on choosing, adopting and working with the system."),
            content: <>
              <div className="system-book-list system-book-list--two">
                {guides.map((doc) =>
                  entry(
                    doc,
                    <>
                      <span title={doc.title}>{doc.title}</span>
                      <span className="system-book-entry-toggle" aria-hidden="true">
                        {openPath === doc.path ? "−" : "+"}
                      </span>
                    </>,
                  ),
                )}
              </div>
              {openPath.startsWith("guides/") ||
              openPath.startsWith("articles/")
                ? renderDetail()
                : null}
            </>,
          },

        ]}
        footer={<footer className="design-how-source">
            {t("原始文档与组件来源：", "Original documents and components: ")}
            <a href={`https://design.how/systems/${system}`}>design.how</a> /{" "}
            {catalog.generatedAt.slice(0, 10)}
        </footer>}
      />
    </div>
  );
}
