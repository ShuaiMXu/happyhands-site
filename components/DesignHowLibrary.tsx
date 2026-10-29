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
  const reading = path.startsWith("guides/") || path.startsWith("articles/");
  const file = `/design-how/${reading ? path : `${system}/${path}`}`;
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
  const filtered = documents.filter((d) =>
    `${d.title} ${d.path}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  return (
    <div className="design-how-library">
      <div
        className="design-how-view-tabs resource-content-tabs"
        role="tablist"
        aria-label={t("查看方式", "View mode")}
      >
        {[
          ["preview", t("预览", "Preview")],
          ["documents", t("资料与下载", "Files and downloads")],
        ].map(([id, label], i) => (
          <button
            key={id}
            id={`system-view-${id}`}
            role="tab"
            aria-selected={view === id}
            aria-controls={`system-panel-${id}`}
            tabIndex={view === id ? 0 : -1}
            onClick={() => setView(id)}
            onKeyDown={(event) => {
              if (
                ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
              ) {
                event.preventDefault();
                const next =
                  event.key === "Home"
                    ? "preview"
                    : event.key === "End"
                      ? "documents"
                      : id === "preview"
                        ? "documents"
                        : "preview";
                setView(next);
                document.getElementById(`system-view-${next}`)?.focus();
              }
            }}
          >
            {label}
          </button>
        ))}
      </div>
      {view === "documents" && (
        <div className="design-how-summary">
          <p>
            {t(
              `${data.documents.filter((d) => d.kind === "foundation").length} 篇基础规范，${data.documents.filter((d) => d.kind === "component").length} 篇组件文档`,
              `${data.documents.filter((d) => d.kind === "foundation").length} foundations, ${data.documents.filter((d) => d.kind === "component").length} component documents`,
            )}
          </p>
          <div className="design-how-actions">
            <a className="hh-button" href={data.download} download>
              {t("下载完整资料", "Download complete archive")}
            </a>
            <a href={`/systems/${system}/`}>
              {t("系统概览", "System overview")}
            </a>
            <a
              href={`https://design.how/systems/${system}`}
              target="_blank"
              rel="noreferrer"
            >
              design.how ↗
            </a>
          </div>
        </div>
      )}
      {view === "preview" ? (
        <div
          role="tabpanel"
          id="system-panel-preview"
          aria-labelledby="system-view-preview"
        >
          <SystemStylePreview system={system} lang={lang} />
        </div>
      ) : (
        <div
          className="design-how-layout"
          role="tabpanel"
          id="system-panel-documents"
          aria-labelledby="system-view-documents"
        >
          <details
            className="design-how-directory"
            open={directoryOpen}
            onToggle={(e) => setDirectoryOpen(e.currentTarget.open)}
          >
            <summary>{t("文档目录", "Documents")}</summary>
            <label className="design-how-search">
              {t("搜索文档", "Search documents")}
              <input
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
                          onClick={(e) => {
                            if (
                              e.metaKey ||
                              e.ctrlKey ||
                              e.altKey ||
                              e.shiftKey
                            )
                              return;
                            e.preventDefault();
                            select(doc.path);
                          }}
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
          <article
            ref={content}
            className="design-how-document"
            aria-busy={loading}
          >
            <header>
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
