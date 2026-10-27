import React, { useEffect, useState } from "react";
import { ReferenceActions } from "./ReferenceActions";
import "./archive-gallery.css";
type Entry = {
  slug: string;
  name: string;
  site_url: string;
  page_url: string;
  theme: string;
  industry: string;
  north_star: string;
  fonts: string[];
  video: string;
};
export function ArchiveGallery({ lang }: { lang: string }) {
  const zh = lang === "zh",
    [entries, setEntries] = useState<Entry[]>([]),
    [error, setError] = useState(""),
    [query, setQuery] = useState(""),
    [theme, setTheme] = useState(""),
    [page, setPage] = useState(1),
    [selected, setSelected] = useState<Entry | null>(null),
    [content, setContent] = useState(""),
    [docError, setDocError] = useState(false),
    [loading, setLoading] = useState(false),
    [retry, setRetry] = useState(0);
  useEffect(() => {
    const c = new AbortController();
    setError("");
    fetch("/design-archive/index.json", { signal: c.signal })
      .then((r) => {
        if (!r.ok) throw Error();
        return r.json();
      })
      .then(setEntries)
      .catch((e) => {
        if (e.name !== "AbortError")
          setError(
            zh
              ? "目录加载失败，请重试。"
              : "Could not load the collection. Please retry.",
          );
      });
    return () => c.abort();
  }, [retry, zh]);
  useEffect(() => {
    setContent("");
    setDocError(false);
    if (!selected) return;
    const c = new AbortController();
    setLoading(true);
    fetch(`/design-archive/${selected.slug}/design.md`, { signal: c.signal })
      .then((r) => {
        if (!r.ok) throw Error();
        return r.text();
      })
      .then(setContent)
      .catch((e) => {
        if (e.name !== "AbortError") {
          setDocError(true);
          setContent(
            zh
              ? "规范加载失败，请下载原文件。"
              : "Could not load guidelines. Download the original file.",
          );
        }
      })
      .finally(() => {
        if (!c.signal.aborted) setLoading(false);
      });
    return () => c.abort();
  }, [selected, zh]);
  const filtered = entries.filter(
    (x) =>
      (!theme || x.theme === theme) &&
      `${x.name} ${x.industry} ${x.fonts.join(" ")} ${x.north_star}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <section
      className="archive-gallery"
      aria-label={zh ? "网站设计参考" : "Website design references"}
    >
      {selected ? (
        <>
          <button
            onClick={() => {
              const slug = selected.slug;
              setSelected(null);
              requestAnimationFrame(() =>
                document.getElementById(`archive-${slug}`)?.focus(),
              );
            }}
          >
            {zh ? "返回参考网格" : "Back to references"}
          </button>
          <div className="archive-title">
            <h2>{selected.name}</h2>
            <a href={selected.site_url} target="_blank" rel="noreferrer">
              {zh ? "访问网站" : "Visit website"} ↗
            </a>
          </div>
          <div className="archive-detail">
            <section>
              <h3>{zh ? "页面截图" : "Page screenshot"}</h3>
              <a
                href={`/design-archive/${selected.slug}/screenshot.jpg`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="archive-large"
                  src={`/design-archive/${selected.slug}/screenshot.jpg`}
                  alt={`${selected.name} — 1440 × 900`}
                />
              </a>
              <details>
                <summary>
                  {zh ? "查看整页滚动预览" : "Full-page scroll preview"}
                </summary>
                <video
                  controls
                  preload="none"
                  poster={`/design-archive/${selected.slug}/screenshot.jpg`}
                  src={selected.video}
                />
                <a href={selected.video} target="_blank" rel="noreferrer">
                  {zh ? "打开原始视频" : "Open original video"} ↗
                </a>
              </details>
            </section>
            <section>
              <div className="archive-title">
                <h3>DESIGN.md</h3>
                <a href={`/design-archive/${selected.slug}/design.md`} download>
                  {zh ? "下载完整规范" : "Download guidelines"}
                </a>
              </div>
              <a
                href={`/design-archive/${selected.slug}/compact/design.md`}
                download
              >
                {zh ? "下载精简版" : "Download compact version"}
              </a>
              <p>{selected.north_star}</p>
              <a href={selected.page_url} target="_blank" rel="noreferrer">
                Refero Styles ↗
              </a>
              <pre className="archive-document" aria-busy={loading}>
                {loading ? (zh ? "加载中…" : "Loading…") : content}
              </pre>
              {content && !loading && !docError && (
                <ReferenceActions
                  lang={lang}
                  content={content}
                  source={selected.page_url}
                />
              )}
            </section>
          </div>
        </>
      ) : (
        <>
          <div className="archive-filters">
            <label>
              {zh
                ? "搜索网站、行业或字体"
                : "Search websites, industries or fonts"}
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
              />
            </label>
            <label>
              {zh ? "主题" : "Theme"}
              <select
                value={theme}
                onChange={(e) => {
                  setTheme(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">{zh ? "全部" : "All themes"}</option>
                <option value="light">{zh ? "浅色" : "Light"}</option>
                <option value="dark">{zh ? "深色" : "Dark"}</option>
                <option value="mixed">{zh ? "混合" : "Mixed"}</option>
              </select>
            </label>
            <span role="status">
              {entries.length
                ? `${filtered.length} ${zh ? "个网站" : "websites"}`
                : zh
                  ? "加载中…"
                  : "Loading…"}
            </span>
          </div>
          {error && (
            <p role="alert">
              {error}
              <button onClick={() => setRetry((x) => x + 1)}>
                {zh ? "重试" : "Retry"}
              </button>
            </p>
          )}
          <div className="archive-grid">
            {filtered.slice((page - 1) * 24, page * 24).map((x) => (
              <button
                id={`archive-${x.slug}`}
                key={x.slug}
                className="archive-card"
                onClick={() => {
                  setSelected(x);
                  document.getElementById("catalog-main")?.scrollIntoView();
                }}
              >
                <img
                  loading="lazy"
                  width="480"
                  height="300"
                  src={`/design-archive/${x.slug}/thumbnail.jpg`}
                  alt=""
                />
                <span>
                  <strong>{x.name}</strong>
                  <small>{new URL(x.site_url).hostname}</small>
                </span>
              </button>
            ))}
          </div>
          {!error && entries.length > 0 && filtered.length === 0 && (
            <p>{zh ? "没有匹配的参考。" : "No matching references."}</p>
          )}
          {filtered.length > 24 && (
            <nav
              className="archive-pagination"
              aria-label={zh ? "参考分页" : "Reference pagination"}
            >
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                {zh ? "上一页" : "Previous"}
              </button>
              <span>
                {page} / {Math.ceil(filtered.length / 24)}
              </span>
              <button
                disabled={page * 24 >= filtered.length}
                onClick={() => setPage((p) => p + 1)}
              >
                {zh ? "下一页" : "Next"}
              </button>
            </nav>
          )}
        </>
      )}
    </section>
  );
}
