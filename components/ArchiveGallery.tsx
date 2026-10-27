import React, { useEffect, useState } from "react";
import { ResourceExport } from "./ResourceExport";
import { ReferenceSpecimen, type ReferenceSystem } from "./ReferenceSpecimen";
import "./archive-gallery.css";
import { Select } from "../packages/ui/Select";
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
    [system, setSystem] = useState<ReferenceSystem | null>(null),
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
    setSystem(null);
    if (!selected) return;
    const c = new AbortController();
    fetch(`/design-archive/${selected.slug}/design-system.json`, {
      signal: c.signal,
    })
      .then((r) => {
        if (!r.ok) throw Error();
        return r.json();
      })
      .then((value) => {
        if (!c.signal.aborted) setSystem(value);
      })
      .catch(() => {});
    return () => c.abort();
  }, [selected]);
  useEffect(() => {
    const restore = () => {
      const slug = new URLSearchParams(location.search).get("design");
      setSelected(entries.find((entry) => entry.slug === slug) || null);
    };
    restore();
    addEventListener("popstate", restore);
    return () => removeEventListener("popstate", restore);
  }, [entries]);
  const selectEntry = (entry: Entry | null) => {
    const url = new URL(location.href);
    url.searchParams.set("provider", "design-md");
    if (entry) url.searchParams.set("design", entry.slug);
    else url.searchParams.delete("design");
    history.pushState(null, "", url.pathname + url.search);
    setSelected(entry);
  };
  const filtered = entries.filter(
    (x) =>
      (!theme || x.theme === theme) &&
      `${x.name} ${x.site_url} ${x.slug} ${x.industry} ${x.fonts.join(" ")} ${x.north_star}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <section className="archive-gallery" aria-label="Design.md">
      {selected ? (
        <>
          <button
            onClick={() => {
              const slug = selected.slug;
              selectEntry(null);
              requestAnimationFrame(() =>
                document.getElementById(`archive-${slug}`)?.focus(),
              );
            }}
          >
            {zh ? "返回 Design.md" : "All Design.md"}
          </button>
          <div className="resource-detail-heading">
            <h2>{selected.name}</h2>
          </div>
          <div className="resource-detail-layout">
            <div className="resource-detail-preview">
              <video
                key={selected.slug}
                controls
                playsInline
                preload="metadata"
                poster={`/design-archive/${selected.slug}/screenshot.jpg`}
                src={selected.video}
                aria-label={
                  zh
                    ? `${selected.name} 整页预览`
                    : `${selected.name} full-page preview`
                }
              />
              {system && <ReferenceSpecimen system={system} lang={lang} />}
            </div>
            <ResourceExport
              key={selected.slug}
              lang={lang}
              files={[
                {
                  label: "Design.md",
                  url: `/design-archive/${selected.slug}/design.md`,
                  name: `${selected.slug}-design.md`,
                },
                {
                  label: "Tailwind v4",
                  url: `/design-archive/${selected.slug}/theme.css`,
                  name: "theme.css",
                },
                {
                  label: "CSS Variables",
                  url: `/design-archive/${selected.slug}/variables.css`,
                  name: "variables.css",
                },
                {
                  label: "Tokens",
                  url: `/design-archive/${selected.slug}/tokens.json`,
                  name: "tokens.json",
                },
              ]}
            />
          </div>
        </>
      ) : (
        <>
          <div className="archive-filters">
            <label className="archive-search">
              {zh ? "搜索" : "Search"}
              <input
                type="search"
                placeholder={
                  zh ? "网站、行业或字体" : "Website, industry or font"
                }
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
              />
            </label>
            <label>
              {zh ? "主题" : "Theme"}
              <Select
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
              </Select>
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
                  selectEntry(x);
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
