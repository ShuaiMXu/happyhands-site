import { applyResourceMetadata, archiveSeo } from "../packages/ui/resource-seo";
import { randomizeArchive } from "./archive-order";
import { Button } from "../packages/ui";
import {
  ResourceDetailHeader,
  ResourceDetailContent,
} from "./ResourcePresentation";
import React, { useEffect, useMemo, useState } from "react";
import { ResourceExport } from "./ResourceExport";
import { ReferenceSpecimen, type ReferenceSystem } from "./ReferenceSpecimen";
import "./archive-gallery.css";
import { ArchiveFilter } from "./ArchiveFilter";
import { ResourceToolbar } from "./ResourceToolbar";
import { ArchiveCard } from "./ArchiveCard";
import {
  archiveTypes,
  archiveStyles,
  filterArchive,
  type ArchiveEntry as Entry,
} from "./archive-catalog";
export function ArchiveGallery({ lang }: { lang: string }) {
  const zh = lang === "zh",
    [entries, setEntries] = useState<Entry[]>([]),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true),
    [systemError, setSystemError] = useState(""),
    [systemRetry, setSystemRetry] = useState(0),
    [videoFailed, setVideoFailed] = useState(false),
    [videoRetry, setVideoRetry] = useState(0),
    [query, setQuery] = useState(""),
    [style, setStyle] = useState(""),
    [category, setCategory] = useState(""),
    [preview, setPreview] = useState<string | null>(null),
    [page, setPage] = useState(1),
    [selected, setSelected] = useState<Entry | null>(null),
    [system, setSystem] = useState<ReferenceSystem | null>(null),
    [retry, setRetry] = useState(0);
  useEffect(() => {
    const c = new AbortController();
    setError("");
    setLoading(true);
    fetch("/design-archive/index.json", { signal: c.signal })
      .then((r) => {
        if (!r.ok) throw Error();
        return r.json();
      })
      .then((value) => {
        if (!Array.isArray(value)) throw Error();
        setEntries(randomizeArchive(value));
      })
      .catch((e) => {
        if (e.name !== "AbortError")
          setError(
            zh
              ? "目录加载失败，请重试。"
              : "Could not load the collection. Please retry.",
          );
      })
      .finally(() => {
        if (!c.signal.aborted) setLoading(false);
      });
    return () => c.abort();
  }, [retry, zh]);
  useEffect(() => {
    setSystem(null);
    setSystemError("");
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
      .catch((error) => {
        if (error.name !== "AbortError")
          setSystemError(
            zh
              ? "设计规范加载失败，请重试。"
              : "Could not load the design rules. Please retry.",
          );
      });
    return () => c.abort();
  }, [selected, systemRetry, zh]);
  useEffect(() => {
    setVideoFailed(false);
    setVideoRetry(0);
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
  useEffect(() => {
    if (!loading) applyResourceMetadata(selected ? archiveSeo(selected) : null, lang);
  }, [selected, loading, lang]);
  const selectEntry = (entry: Entry | null) => {
    const url = new URL(location.href);
    url.searchParams.set("provider", "design-md");
    if (entry) url.searchParams.set("design", entry.slug);
    else url.searchParams.delete("design");
    history.pushState(null, "", url.pathname + url.search);
    setSelected(entry);
  };
  const queryEntries = useMemo(
    () => filterArchive(entries, query, "", ""),
    [entries, query],
  );
  const available = useMemo(
    () => filterArchive(queryEntries, "", "", "", style),
    [queryEntries, style],
  );
  const typed = useMemo(
    () => filterArchive(queryEntries, "", "", "", "", category),
    [queryEntries, category],
  );
  const filtered = useMemo(
    () => filterArchive(available, "", "", "", "", category),
    [available, category],
  );
  const styleCount = (id: string) =>
    typed.filter((entry) =>
      id === "unclassified"
        ? !entry.styles?.length
        : entry.styles?.includes(id),
    ).length;
  useEffect(() => setPreview(null), [page, query, style, category, selected]);
  return (
    <section
      className="archive-gallery"
      aria-label="Design.md"
      aria-busy={loading || undefined}
    >
      {selected ? (
        <>
          <ResourceDetailHeader
            title={selected.name}
            backLabel={zh ? "返回 Design.md" : "All Design.md"}
            onBack={() => {
              const slug = selected.slug;
              selectEntry(null);
              requestAnimationFrame(() =>
                document.getElementById(`archive-${slug}`)?.focus(),
              );
            }}
          >
            <a
              className="hh-button"
              href={`/apps/studio/?design=${encodeURIComponent(selected.slug)}`}
              target="_top"
            >
              {zh ? "接入设计系统" : "Use this design"}
            </a>
          </ResourceDetailHeader>
          <ResourceDetailContent key={selected.slug} lang={lang}>
            <div className="resource-detail-preview">
              <video
                key={`${selected.slug}:${videoRetry}`}
                onError={() => setVideoFailed(true)}
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
              {videoFailed && (
                <div role="alert" className="archive-detail-error">
                  <p>
                    {zh
                      ? "视频预览暂不可用。"
                      : "Video preview is unavailable."}
                  </p>
                  <Button
                    type="button"
                    onClick={() => {
                      setVideoFailed(false);
                      setVideoRetry((value) => value + 1);
                    }}
                  >
                    {zh ? "重试预览" : "Retry preview"}
                  </Button>
                </div>
              )}
              {!system && !systemError && (
                <p role="status">
                  {zh ? "正在加载设计规范…" : "Loading design rules…"}
                </p>
              )}
              {systemError && (
                <div role="alert" className="archive-detail-error">
                  <p>{systemError}</p>
                  <Button
                    type="button"
                    onClick={() => setSystemRetry((value) => value + 1)}
                  >
                    {zh ? "重试" : "Retry"}
                  </Button>
                </div>
              )}
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
                {
                  label: "Design JSON",
                  url: `/design-archive/${selected.slug}/design-system.json`,
                  name: "design-system.json",
                },
                {
                  label: "Compact",
                  url: `/design-archive/${selected.slug}/compact/design.md`,
                  name: "design-compact.md",
                },
              ]}
            />
          </ResourceDetailContent>
        </>
      ) : (
        <>
          <ResourceToolbar
            label={zh ? "搜索网站" : "Search websites"}
            placeholder={
              zh ? "网站、类型、风格或字体" : "Website, type, style or font"
            }
            query={query}
            onQueryChange={(value) => {
              setQuery(value);
              setPage(1);
            }}
            status={
              loading
                ? zh
                  ? "加载中…"
                  : "Loading…"
                : error
                  ? zh
                    ? "目录加载失败"
                    : "Collection unavailable"
                  : `${filtered.length} ${zh ? "个网站" : "websites"}`
            }
          >
            <ArchiveFilter
              label={zh ? "网站类型" : "Website type"}
              zh={zh}
              value={category}
              onChange={(value) => {
                setCategory(value);
                setPage(1);
              }}
              options={[
                {
                  value: "",
                  label: zh ? "全部类型" : "All types",
                  count: available.length,
                },
                ...archiveTypes.map(([id, cn, en]) => ({
                  value: id,
                  label: zh ? cn : en,
                  count: available.filter((entry) => entry.types?.includes(id))
                    .length,
                })),
                {
                  value: "unclassified",
                  label: zh ? "待分类" : "Unclassified",
                  count: available.filter((entry) => !entry.types?.length)
                    .length,
                },
              ]}
            />
            <ArchiveFilter
              label={zh ? "设计风格" : "Design style"}
              zh={zh}
              value={style}
              onChange={(value) => {
                setStyle(value);
                setPage(1);
              }}
              options={[
                {
                  value: "",
                  label: zh ? "全部风格" : "All styles",
                  count: typed.length,
                },
                ...archiveStyles.map(([id, cn, en]) => ({
                  value: id,
                  label: zh ? cn : en,
                  count: styleCount(id),
                })),
                {
                  value: "unclassified",
                  label: zh ? "待分类" : "Unclassified",
                  count: styleCount("unclassified"),
                },
              ]}
            />
          </ResourceToolbar>
          {error && (
            <p role="alert">
              {error}
              <Button onClick={() => setRetry((x) => x + 1)}>
                {zh ? "重试" : "Retry"}
              </Button>
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
          {!error && !loading && filtered.length === 0 && (
            <div className="catalog-empty"><p>{zh ? "没有匹配的参考。" : "No matching references."}</p><Button onClick={() => { setQuery(""); setStyle(""); setCategory(""); setPage(1); }}>{zh ? "清除筛选" : "Clear filters"}</Button></div>
          )}
          {filtered.length > 24 && (
            <nav
              className="archive-pagination"
              aria-label={zh ? "参考分页" : "Reference pagination"}
            >
              <Button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                {zh ? "上一页" : "Previous"}
              </Button>
              <span>
                {page} / {Math.ceil(filtered.length / 24)}
              </span>
              <Button
                disabled={page * 24 >= filtered.length}
                onClick={() => setPage((p) => p + 1)}
              >
                {zh ? "下一页" : "Next"}
              </Button>
            </nav>
          )}
        </>
      )}
    </section>
  );
}
