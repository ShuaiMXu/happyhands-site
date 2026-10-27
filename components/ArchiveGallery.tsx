import React, { useEffect, useState } from "react";
import { ResourceExport } from "./ResourceExport";
import { ReferenceSpecimen, type ReferenceSystem } from "./ReferenceSpecimen";
import "./archive-gallery.css";
import { Select } from "../packages/ui/Select";
import { ArchiveCard } from "./ArchiveCard";
import {
  archiveCategories,
  categoryOf,
  filterArchive,
  type ArchiveEntry as Entry,
} from "./archive-catalog";
export function ArchiveGallery({ lang }: { lang: string }) {
  const zh = lang === "zh",
    [entries, setEntries] = useState<Entry[]>([]),
    [error, setError] = useState(""),
    [query, setQuery] = useState(""),
    [theme, setTheme] = useState(""),
    [category, setCategory] = useState(""),
    [preview, setPreview] = useState<string | null>(null),
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
  const available = filterArchive(entries, query, theme, "");
  const filtered = category
    ? available.filter((entry) => categoryOf(entry) === category)
    : available;
  useEffect(() => setPreview(null), [page, query, theme, category, selected]);
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
            <label className="archive-category">
              {zh ? "分类" : "Category"}
              <Select
                aria-label={zh ? "分类" : "Category"}
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">{zh ? "全部分类" : "All categories"}</option>
                {archiveCategories.map(([id, cn, en]) => (
                  <option key={id} value={id}>
                    {zh ? cn : en} (
                    {
                      available.filter((entry) => categoryOf(entry) === id)
                        .length
                    }
                    )
                  </option>
                ))}
              </Select>
            </label>
            <fieldset className="archive-theme">
              <legend>{zh ? "主题" : "Theme"}</legend>
              <div>
                {[
                  ["", zh ? "全部" : "All"],
                  ["light", zh ? "浅色" : "Light"],
                  ["dark", zh ? "深色" : "Dark"],
                  ["mixed", zh ? "混合" : "Mixed"],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={theme === id}
                    onClick={() => {
                      setTheme(id);
                      setPage(1);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>
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
            {filtered.slice((page - 1) * 24, page * 24).map((entry) => (
              <ArchiveCard
                key={entry.slug}
                entry={entry}
                active={preview === entry.slug}
                onPreview={setPreview}
                lang={lang}
                onOpen={() => {
                  selectEntry(entry);
                  document.getElementById("catalog-main")?.scrollIntoView();
                }}
              />
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
