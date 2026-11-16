import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../packages/ui";
import { ResourceToolbar } from "./ResourceToolbar";
import { ResourceCard } from "./ResourcePresentation";
import { ArchiveCard } from "./ArchiveCard";
import { ArchiveFilter } from "./ArchiveFilter";
import {
  archiveStyles,
  archiveTypes,
  filterArchive,
  type ArchiveEntry,
} from "./archive-catalog";
import { randomizeArchive } from "./archive-order";
import { CollectionsLibrary } from "./CollectionsLibrary";
import {
  sectionFor,
  resourceHref,
  previewFor,
  type ResourceEntry,
} from "./resource-directory";
import "./collections.css";
import "./archive-gallery.css";
type Row = ResourceEntry & {
  aliasOf?: string;
  previewVideo?: string;
  tags?: string[];
};
type DirectoryState = {
  query?: string;
  filter?: string;
  style?: string;
  type?: string;
  page?: number;
};
export function ResourceDirectory({
  section,
  lang,
  embedded = false,
  initialState = {},
  onStateChange,
}: {
  section: string;
  lang: string;
  embedded?: boolean;
  initialState?: DirectoryState;
  onStateChange?: (state: DirectoryState) => void;
}) {
  const zh = lang === "zh",
    Root = embedded ? "section" : "main";
  const [rows, setRows] = useState<Row[]>([]),
    [archives, setArchives] = useState<ArchiveEntry[]>([]),
    [covers, setCovers] = useState<Record<string, string>>({}),
    [labels, setLabels] = useState<Record<string, string>>({}),
    [error, setError] = useState(false),
    [retry, setRetry] = useState(0),
    [query, setQuery] = useState(initialState.query || ""),
    [filter, setFilter] = useState(
      () =>
        initialState.filter ||
        new URLSearchParams(location.search).get("collection") ||
        "",
    ),
    [style, setStyle] = useState(initialState.style || ""),
    [type, setType] = useState(initialState.type || ""),
    [page, setPage] = useState(initialState.page || 1),
    [active, setActive] = useState<string | null>(null);
  const selected = new URLSearchParams(location.search).get("resource");
  useEffect(() => {
    const c = new AbortController();
    setError(false);
    const json = (path: string) =>
      fetch(path, { signal: c.signal }).then((r) => {
        if (!r.ok) throw Error();
        return r.json();
      });
    Promise.all([
      json("/resources/v1/index.json"),
      json("/resources/v1/covers.json"),
      json("/design-archive/index.json"),
    ])
      .then(([catalog, images, archive]) => {
        setRows(
          randomizeArchive<Row & { slug: string }>(
            catalog.resources.map((r: Row) => ({ ...r, slug: r.id })),
          ),
        );
        setCovers(images);
        setArchives(archive);
        setLabels(
          Object.fromEntries(
            catalog.collections.map((r: any) => [r.id, zh ? r.name : r.nameEn]),
          ),
        );
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError(true);
      });
    return () => c.abort();
  }, [retry, zh]);
  useEffect(
    () => onStateChange?.({ query, filter, style, type, page }),
    [query, filter, style, type, page, onStateChange],
  );
  const archiveMap = useMemo(
    () => new Map(archives.map((a) => [a.slug, a])),
    [archives],
  );
  const candidates = useMemo(
    () =>
      rows
        .filter(
          (r) =>
            r.type !== "collection" &&
            !r.aliasOf &&
            sectionFor(r) === section &&
            (section !== "systems" ||
              !r.system ||
              r.path.endsWith("/index.md")),
        )
        .sort((a, b) =>
          section === "design-md"
            ? 0
            : Number(Boolean(previewFor(b))) - Number(Boolean(previewFor(a))),
        ),
    [rows, section],
  );
  const archiveFor = (r: Row): ArchiveEntry =>
    archiveMap.get(r.path.split("/")[1]) || {
      slug: r.id,
      name: r.name,
      site_url: r.sourceUrl || r.source,
      page_url: r.sourceUrl || r.source,
      theme: "",
      industry: "other",
      north_star: r.summary || "",
      fonts: [],
      video: r.previewVideo || "",
      source: "designmd.app",
      cover: covers[r.id] || r.cover,
      styles: r.tags || [],
      types: r.tags || [],
    };
  const matches = (r: Row, st = style, ty = type) =>
    section === "design-md"
      ? filterArchive([archiveFor(r)], query, "", "", st, ty).length > 0
      : `${r.name} ${r.summary || ""} ${r.system || ""} ${r.type}`
          .toLowerCase()
          .includes(query.trim().toLowerCase());
  const filtered = candidates.filter(
    (r) => !filter || r.system === filter || r.collection === filter,
  );
  const term = query.trim().toLowerCase();
  const relevance = (row: Row) => { const name=row.name.toLowerCase(); return name===term?3:name.startsWith(term)?2:name.includes(term)?1:0; };
  const visible = filtered.filter((r) => matches(r)).sort((a,b)=>term ? relevance(b)-relevance(a) : 0);
  const cards = visible.filter(
    (row) => section !== "cult-ui" || previewFor(row),
  );
  const sourceFiles =
    section === "cult-ui" ? visible.filter((row) => !previewFor(row)) : [];
  const groups = [
    ...new Set(
      candidates.flatMap((r) => [
        r.collection,
        ...(r.system ? [r.system] : []),
      ]),
    ),
  ].sort();
  const change = (set: (v: string) => void) => (v: string) => {
    set(v);
    setPage(1);
    setActive(null);
  };
  if (selected)
    return (
      <CollectionsLibrary
        lang={lang}
        embedded={embedded}
        initialResource={selected}
      />
    );
  return (
    <Root
      id={embedded ? undefined : "catalog-main"}
      className="collections-library resource-directory"
    >
      <ResourceToolbar
        label={zh ? "搜索资源" : "Search resources"}
        placeholder={
          zh ? "搜索名称、用途或组件" : "Search names, tasks or components"
        }
        results={cards.slice(0,5).map(row=>({id:row.id,label:row.name,href:resourceHref(row,lang)}))}
        query={query}
        onQueryChange={change(setQuery)}
        status={`${visible.length} ${zh ? "项资源" : "resources"}`}
      >
        <ArchiveFilter
          label={zh ? "来源" : "Source"}
          value={filter}
          onChange={change(setFilter)}
          zh={zh}
          options={[
            {
              value: "",
              label: zh ? "全部来源" : "All sources",
              count: candidates.filter((r) => matches(r)).length,
            },
            ...groups.map((g) => ({
              value: g,
              label: labels[g] || g,
              count: candidates.filter(
                (r) => (r.system === g || r.collection === g) && matches(r),
              ).length,
            })),
          ]}
        />
        {section === "design-md" && (
          <>
            <ArchiveFilter
              label={zh ? "类型" : "Type"}
              value={type}
              onChange={change(setType)}
              zh={zh}
              options={[
                {
                  value: "",
                  label: zh ? "全部类型" : "All types",
                  count: filtered.filter((r) => matches(r, style, "")).length,
                },
                ...archiveTypes
                  .map(([id, cn, en]) => ({
                    value: id,
                    label: zh ? cn : en,
                    count: filtered.filter((r) => matches(r, style, id)).length,
                  }))
                  .filter((r) => r.count > 0),
              ]}
            />
            <ArchiveFilter
              label={zh ? "风格" : "Style"}
              value={style}
              onChange={change(setStyle)}
              zh={zh}
              options={[
                {
                  value: "",
                  label: zh ? "全部风格" : "All styles",
                  count: filtered.filter((r) => matches(r, "", type)).length,
                },
                ...archiveStyles
                  .map(([id, cn, en]) => ({
                    value: id,
                    label: zh ? cn : en,
                    count: filtered.filter((r) => matches(r, id, type)).length,
                  }))
                  .filter((r) => r.count > 0),
              ]}
            />
          </>
        )}
      </ResourceToolbar>
      {error ? (
        <div role="alert">
          <p>{zh ? "资源加载失败" : "Could not load resources"}</p>
          <Button onClick={() => setRetry((v) => v + 1)}>
            {zh ? "重试" : "Retry"}
          </Button>
        </div>
      ) : !rows.length ? (
        <p role="status">{zh ? "加载中…" : "Loading…"}</p>
      ) : (
        <>
          <div className="archive-grid">
            {section === "systems" && !filter && !query && (
              <ResourceCard
                href={`?provider=systems&system=happyhands`}
                title="HappyHands"
                description={zh ? "项目设计系统" : "Project design system"}
                mediaClassName="archive-card-media"
                media={
                  <img
                    src="/system-covers/happyhands.png"
                    alt=""
                    loading="lazy"
                  />
                }
              />
            )}
            {cards.slice(0, page * 36).map((row) =>
              section === "design-md" ? (
                <ArchiveCard
                  key={row.id}
                  entry={archiveFor(row)}
                  active={active === archiveFor(row).slug}
                  onPreview={setActive}
                  onOpen={() => {
                    location.href = resourceHref(row, lang);
                  }}
                  href={resourceHref(row, lang)}
                  lang={lang}
                />
              ) : (
                <ResourceCard
                  key={row.id}
                  href={resourceHref(row, lang)}
                  title={row.name
                    .replace(/^r \/ /, "")
                    .replaceAll(" / ", " — ")}
                  description={
                    row.system || labels[row.collection] || row.collection
                  }
                  mediaClassName="archive-card-media"
                  media={
                    <img
                      src={covers[row.id] || row.cover}
                      alt=""
                      loading="lazy"
                    />
                  }
                />
              ),
            )}
          </div>
          {sourceFiles.length > 0 && (
            <details className="directory-source">
              <summary>
                {zh ? "源码与配套文件" : "Source and supporting files"} (
                {sourceFiles.length})
              </summary>
              <div className="directory-source-files">
                {sourceFiles.map((row) => (
                  <a key={row.id} href={resourceHref(row, lang)}>
                    {row.name.replace(/^r \/ /, "").replaceAll(" / ", " — ")}
                  </a>
                ))}
              </div>
            </details>
          )}
          {!visible.length && (
            <p role="status">{zh ? "没有匹配资源" : "No matching resources"}</p>
          )}
          {cards.length > 0 && <div className="directory-pagination">
            <span role="status">{zh ? `已展示 ${Math.min(page*36,cards.length)} / ${cards.length} 项` : `Showing ${Math.min(page*36,cards.length)} of ${cards.length}`}</span>
            {cards.length > page * 36 && <Button onClick={() => setPage((p) => p + 1)}>
              {zh ? "加载更多" : "Load more"}
            </Button>}
          </div>}
        </>
      )}
    </Root>
  );
}
