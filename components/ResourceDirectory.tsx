import { systemDocumentCover, systemOfficialCover } from '../packages/ui/resource-editorial-covers';
import { designMdCatalogEnabled, isDesignMdCollection } from "../packages/ui/resource-navigation";
import { loadDirectoryData } from "./resource-directory-data";
import {isSystemEntry,systemEntryName} from "./platform-directory";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../packages/ui";
import { ResourceLoadMore } from "./ResourceLoadMore";
import { ResourceToolbar } from "./ResourceToolbar";
import { ResourceCard } from "./ResourcePresentation";
import { ComponentCollectionCards, componentCollection, componentCollectionName, groupComponentResources } from "./ComponentCollectionCards";
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
  const [sourcePage, setSourcePage] = useState(1);
  const [rows, setRows] = useState<Row[]>([]),
    [archives, setArchives] = useState<ArchiveEntry[]>([]),
    [covers, setCovers] = useState<Record<string, string>>({}),
    [labels, setLabels] = useState<Record<string, string>>({}),
    [error, setError] = useState(false),
    [retry, setRetry] = useState(0),
    [query, setQuery] = useState(initialState.query || ""),
    [filter, setFilter] = useState(
      () => {
        const collection = initialState.filter || new URLSearchParams(location.search).get("collection");
        return !designMdCatalogEnabled && isDesignMdCollection(collection) ? "" : collection || "";
      },
    ),
    [style, setStyle] = useState(initialState.style || ""),
    [type, setType] = useState(initialState.type || ""),
    [page, setPage] = useState(initialState.page || 1),
    [active, setActive] = useState<string | null>(null);
  const resourceList = useRef<HTMLDivElement>(null);
  const selected = new URLSearchParams(location.search).get("resource");
  useEffect(() => {
    const c = new AbortController();
    setError(false);
    loadDirectoryData(selected, c.signal, fetch, section === "design-md")
      .then((data) => {
        // Detail routes are owned by CollectionsLibrary, not the hidden list.
        if (!data || c.signal.aborted) return;
        const [catalog, images, archive] = data;
        setRows(
          randomizeArchive<Row & { slug: string }>(
            catalog.resources.map((r: Row) => ({ ...r, slug: r.id })),
          ),
        );
        setCovers(images);
        setArchives(archive || []);
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
  }, [retry, zh, selected, section]);
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
            (section !== "systems" || isSystemEntry(r)),
        )
        .map(r=>section==="systems"?{...r,name:systemEntryName(r)}:r)
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
  const grouped = section === "cult-ui" && !filter && !term;
  const collections = grouped ? groupComponentResources(candidates) : null;
  const itemHref = (row: Row) => {
    const href = resourceHref(row, lang);
    return section === "cult-ui" && filter ? `${href}&collection=${encodeURIComponent(filter)}` : href;
  };
  const relevance = (row: Row) => { const name=row.name.toLowerCase(); return name===term?3:name.startsWith(term)?2:name.includes(term)?1:0; };
  const visible = filtered.filter(row => matches(row)).sort((a, b) => {
    const rank = term ? relevance(b) - relevance(a) : 0;
    return rank || (section === "cult-ui" ? a.name.localeCompare(b.name) : 0);
  });
  const cards = visible.filter(
    (row) => section !== "cult-ui" || previewFor(row),
  );
  const sourceFiles =
    section === "cult-ui" ? visible.filter((row) => !previewFor(row)) : [];
  const groups = [
    ...new Set(
      candidates.flatMap((r) => section === "cult-ui"
        ? [componentCollection(r)]
        : [r.collection, ...(r.system ? [r.system] : [])]),
    ),
  ].sort();
  if (section === "cult-ui" && filter && !groups.includes(filter)) groups.push(filter);
  const change = (set: (v: string) => void) => (v: string) => {
    set(v);
    setPage(1);
    setSourcePage(1);
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
      {section === "cult-ui" && filter && <header className="component-collection-heading">
            <a href={`${zh ? "" : "/en"}/components/?provider=cult-ui`}>{zh ? "组件库" : "Components"}</a>
            <h1>{componentCollectionName(filter, labels)}</h1>
          </header>}
      <ResourceToolbar
        suggestions={
          section === "design-md"
            ? zh
              ? ["SaaS", "电商", "创意机构", "AI"]
              : ["SaaS", "E-commerce", "Agencies", "AI"]
            : section === "systems"
              ? ["Quartz", "Lime", "Sodium", "Glaze"]
              : section === "cult-ui"
                ? ["Button", "Card", "Form", "Modal"]
                : undefined
        }
        label={zh ? "搜索资源" : "Search resources"}
        placeholder={
          zh ? "搜索名称、用途或组件" : "Search names, tasks or components"
        }
        results={visible.slice(0,5).map(row=>({id:row.id,label:row.name,href:itemHref(row)}))}
        query={query}
        onQueryChange={change(setQuery)}
        status={collections ? `${collections.size} ${zh ? "个组件库" : "libraries"}` : `${visible.length} ${zh ? "项资源" : "resources"}`}
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
              label: section === "cult-ui" ? componentCollectionName(g, labels) : labels[g] || g,
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
                  .filter((r) => r.count > 0 || r.value === type),
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
                  .filter((r) => r.count > 0 || r.value === style),
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
      ) : collections ? (
        <ComponentCollectionCards groups={collections} labels={labels} covers={covers} lang={lang} />
      ) : (
        <>
          {section === "cult-ui" && cards.length > 0 && sourceFiles.length > 0 && <h2 className="component-group-heading">{zh ? "可预览组件" : "Interactive previews"}</h2>}
          <div ref={resourceList} className="archive-grid">
            {cards.slice(0, page * 36).map((row) => {
              if (section === "design-md") return (
                <ArchiveCard
                  key={row.id}
                  entry={archiveFor(row)}
                  active={active === archiveFor(row).slug}
                  onPreview={setActive}
                  onOpen={() => {
                    location.href = resourceHref(row, lang);
                  }}
                  href={itemHref(row)}
                  lang={lang}
                />
              );
              const cover = (section === 'systems' ? systemDocumentCover(row) : undefined) || covers[row.id] || row.cover;
              const officialCover = section === 'systems' ? systemOfficialCover(row.path) : undefined;
                return <ResourceCard
                  key={row.id}
                  href={itemHref(row)}
                  title={row.name
                    .replace(/^r \/ /, "")
                    .replaceAll(" / ", " — ")}
                  description={
                    row.collection === 'design-how-systems' ? 'design.how'
                    : section === 'systems' && row.collection === 'beautiful-ui' ? (zh ? 'Agent 界面组件' : 'Agent interface components')
                    : (section === 'cult-ui' ? row.system : undefined) || labels[row.collection] || row.collection
                  }
                  mediaClassName="archive-card-media"
                  media={
                    cover ? (
                      <img src={officialCover || cover} alt="" loading="lazy"
                        className={officialCover ? 'official-system-cover' : undefined}
                        referrerPolicy={officialCover ? 'no-referrer' : undefined}
                        onError={officialCover ? (event) => {
                          if (event.currentTarget.getAttribute('src') !== cover) {
                            event.currentTarget.src = cover;
                            event.currentTarget.classList.remove('official-system-cover');
                          }
                        } : undefined} />
                    ) : (
                      <div className="component-cover-fallback">{row.name}</div>
                    )
                  }
                />;
            })}
          </div>
          {sourceFiles.length > 0 && (
            <section className="component-source-section" aria-labelledby="component-source-heading">
              <h2 id="component-source-heading" className="component-group-heading">{zh ? "源码与配套文件" : "Source and supporting files"}</h2>
              <ul className="directory-source-files">
                {sourceFiles.slice(0, sourcePage * 24).map((row) => (
                  <li key={row.id}><a href={itemHref(row)}>
                    {row.name.replace(/^r \/ /, "").split(" / ").at(-1)}
                  </a></li>
                ))}
              </ul>
              {sourceFiles.length > sourcePage * 24 && <Button onClick={() => setSourcePage((page) => page + 1)}>
                {zh ? "查看更多源码" : "Show more source files"}
              </Button>}
            </section>
          )}
          {!visible.length && (
            <p role="status">{zh ? "没有匹配资源" : "No matching resources"}</p>
          )}
          <ResourceLoadMore
            list={resourceList}
            shown={page * 36}
            total={cards.length}
            lang={lang}
            onLoad={() => setPage((p) => p + 1)}
          />
        </>
      )}
    </Root>
  );
}
