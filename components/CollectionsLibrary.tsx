import {PlatformDirectory} from "./PlatformDirectory";
import {platformFor} from "./platform-directory";
import {TokenSpecimens} from "./TokenSpecimens";
import {PlatformMedia} from "./PlatformMedia";
import { parseDesignDocument } from "./designmd-document";
import React, { useEffect, useMemo, useState, useRef } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "../packages/ui";
import { ResourceCard, ResourceDetailHeader } from "./ResourcePresentation";
import { ResourceToolbar } from "./ResourceToolbar";
import { DesignComponentDemo } from "./DesignComponentDemo";

const PresenceCards = React.lazy(() => import("./pinui/PresenceCards"));
import "./collections.css";
import { previewFor, sectionFor, resourceHref } from "./resource-directory";
type Entry = {
  id: string;
  name: string;
  type: string;
  path: string;
  collection: string;
  sha256: string;
  bytes: number;
  summary?: string;
  cover?: string;
  preview?: string;
  system?: string;
  installation?: { url: string };
  source: string;
  sourceUrl?: string;
  license: string;
};
type Collection = {
  id: string;
  name: string;
  nameEn: string;
  group: string;
  count: number;
  types?: string[];
  cover?: string;
  overview: string;
  access: string;
};
type Catalog = {
  schemaVersion: number;
  version: string;
  collections: Collection[];
  resources: Entry[];
};
const groups = [
  ["all", "全部", "All"],
  ["inspiration", "找参考", "Inspiration"],
  ["tokens", "设计变量", "Tokens"],
  ["systems", "设计系统", "Systems"],
  ["components", "组件源码", "Component source"],
  ["guidelines", "平台规范", "Guidelines"],
];
export function CollectionsLibrary({
  lang,
  embedded = false,
  initialResource,
}: {
  lang: string;
  embedded?: boolean;
  initialResource?: string;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const resize = (e: MessageEvent) => {
      if (
        e.origin === location.origin &&
        e.source === frame.current?.contentWindow &&
        e.data?.type === "design-system-preview-height" &&
        Number.isFinite(e.data.height)
      )
        frame.current!.style.height = `${Math.max(280, Math.min(900, e.data.height + 48))}px`;
    };
    addEventListener("message", resize);
    return () => removeEventListener("message", resize);
  }, []);
  const [tokenContext,setTokenContext]=useState("");
  const [previewTheme,setPreviewTheme]=useState(()=>document.documentElement.dataset.theme==='dark'?'dark':'light');
  useEffect(()=>{const observer=new MutationObserver(()=>setPreviewTheme(document.documentElement.dataset.theme==='dark'?'dark':'light'));observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});return()=>observer.disconnect()},[]);
  const Root = embedded ? "section" : "main";
  const zh = lang === "zh";
  const [catalog, setCatalog] = useState<Catalog | null>(null),
    [error, setError] = useState(""),
    [retry, setRetry] = useState(0),
    [query, setQuery] = useState(""),
    [group, setGroup] = useState("all"),
    [collection, setCollection] = useState(() =>
      typeof location === "undefined"
        ? ""
        : new URLSearchParams(location.search).get("collection") || "",
    ),
    [selected, setSelected] = useState<Entry | null>(null),
    [content, setContent] = useState(""),
    [loadError, setLoadError] = useState(""),
    [copyError, setCopyError] = useState(""),
    [page, setPage] = useState(1),
    [copied, setCopied] = useState(false);
  useEffect(() => {
    const c = new AbortController();
    setError("");
    fetch("/resources/v1/index.json", { signal: c.signal })
      .then((r) => {
        if (!r.ok) throw Error();
        return r.json();
      })
      .then((v) => {
        if (
          v.schemaVersion !== 1 ||
          !Array.isArray(v.resources) ||
          !Array.isArray(v.collections)
        )
          throw Error();
        setCatalog(v);
        if (initialResource)
          setSelected(
            v.resources.find((r: Entry) => r.id === initialResource) || null,
          );
      })
      .catch((e) => {
        if (e.name !== "AbortError")
          setError(
            zh ? "资源目录加载失败。" : "Could not load the resource catalog.",
          );
      });
    return () => c.abort();
  }, [retry, zh]);
  useEffect(()=>{
    setTokenContext("");
    if(!selected?.path.includes('/material3/'))return;
    const abort=new AbortController();
    fetch('/collections/platform-systems/material3/tokens.json',{signal:abort.signal}).then(r=>{if(!r.ok)throw Error();return r.text()}).then(setTokenContext).catch(()=>{});
    return ()=>abort.abort();
  },[selected?.path]);
  useEffect(() => {
    setContent("");
    setLoadError("");
    setCopyError("");
    setCopied(false);
    if (!selected) return;
    const c = new AbortController();
    fetch("/" + selected.path, { signal: c.signal })
      .then(async (r) => {
        if (!r.ok) throw Error();
        const bytes = await r.arrayBuffer();
        const hash = [
          ...new Uint8Array(await crypto.subtle.digest("SHA-256", bytes)),
        ]
          .map((v) => v.toString(16).padStart(2, "0"))
          .join("");
        if (hash !== selected.sha256) throw Error();
        return new TextDecoder("utf-8", {
          fatal: true,
          ignoreBOM: true,
        }).decode(bytes);
      })
      .then((value) => {
        if (!c.signal.aborted) setContent(value);
      })
      .catch((e) => {
        if (e.name !== "AbortError")
          setLoadError(
            zh
              ? "文件加载或来源校验失败，请重试。"
              : "The file could not be loaded or its source hash changed. Retry.",
          );
      });
    return () => c.abort();
  }, [selected, zh, retry]);
  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (catalog?.resources || []).filter(
      (row) =>
        row.collection === collection &&
        row.type !== "collection" &&
        (!q ||
          JSON.stringify([row.name, row.summary, row.type, row.system])
            .toLowerCase()
            .includes(q)),
    );
  }, [catalog, collection, query]);
  const visibleCollections = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (catalog?.collections || []).filter(
      (row) =>
        (group === "all" || row.group === group) &&
        (!q ||
          JSON.stringify([
            row.name,
            row.nameEn,
            ...(catalog?.resources || [])
              .filter((r) => r.collection === row.id)
              .map((r) => r.name),
          ])
            .toLowerCase()
            .includes(q)),
    );
  }, [catalog, group, query]);
  if (error)
    return (
      <Root
        id={embedded ? undefined : "catalog-main"}
        className="collections-library"
        role="alert"
      >
        <p>{error}</p>
        <Button onClick={() => setRetry((v) => v + 1)}>
          {zh ? "重试" : "Retry"}
        </Button>
      </Root>
    );
  if (!catalog)
    return (
      <Root
        id={embedded ? undefined : "catalog-main"}
        className="collections-library"
      >
        <p role="status">
          {zh ? "正在加载资源目录…" : "Loading resource catalog…"}
        </p>
      </Root>
    );
  const documentHref = (href: string) => {
    const url = new URL(href, location.origin + "/" + (selected?.path || ""));
    if (url.origin !== location.origin) return url.href;
    if(selected?.path.includes('apple-hig') && /human-interface-guidelines/i.test(url.pathname)){
      const slug=url.pathname.split('/').filter(Boolean).at(-1);
      const local=catalog.resources.find(r=>r.path.endsWith('design_human-interface-guidelines_'+slug+'.md'));
      return local?resourceHref(local,lang):'https://developer.apple.com'+url.pathname;
    }
    const path = url.pathname.slice(1);
    const row = catalog.resources.find(
      (r) =>
        r.path === path ||
        (selected?.system &&
          r.system === selected.system &&
          path.startsWith("systems/" + selected.system + "/") &&
          r.path.endsWith(
            path.replace("systems/" + selected.system + "/", "/"),
          )),
    );
    return row ? resourceHref(row, lang) + url.hash : url.href;
  };
  const platform=selected?platformFor(selected):undefined;
  const isPlatformOverview=platform?.overview===selected?.path;
  const platformRoot=platform?catalog.resources.find(r=>r.path===platform.overview):undefined;
  const current = catalog.collections.find((row) => row.id === collection);
  const open = (row: Entry) => {
    setContent("");
    setLoadError("");
    setSelected(row);
    setCopied(false);
  };
  const copy = async () => {
    setCopyError("");
    setCopied(false);
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
    } catch {
      setCopyError(
        zh
          ? "复制失败，请下载原文件。"
          : "Copy failed. Download the original file.",
      );
    }
  };
  return (
    <Root
      id={embedded ? undefined : "catalog-main"}
      className="collections-library resource-directory"
      aria-label={zh ? "资源合集" : "Resource collections"}
    >
      {selected ? (
        <>
          <ResourceDetailHeader
            title={isPlatformOverview ? platform!.name : selected.name.replace(/^r \/ /, "").replaceAll(" / ", " — ")}
            backLabel={platform && !isPlatformOverview ? (zh?"返回 ":"Back to ")+platform.name : zh ? "返回资源列表" : "Back to resources"}
            onBack={() => {
              if(platformRoot && !isPlatformOverview){location.href=resourceHref(platformRoot,lang);return;}
              if (initialResource)
                location.href = `?provider=${sectionFor(selected)}`;
              else setSelected(null);
            }}
          />
          {isPlatformOverview && <PlatformDirectory row={selected} rows={catalog.resources} lang={lang}/>}
          <div className="collections-actions">
            <a className="hh-button" href={"/" + selected.path} download>
              {zh ? "下载原文件" : "Download original"}
            </a>
            <Button disabled={!content} onClick={() => void copy()}>
              {copied
                ? zh
                  ? "已复制"
                  : "Copied"
                : zh
                  ? "复制原文"
                  : "Copy source"}
            </Button>
            {selected.preview && (
              <a className="hh-button" href={selected.preview}>
                {zh ? "查看交互预览" : "Open interactive preview"}
              </a>
            )}
          </div>
          {copyError && <p role="alert">{copyError}</p>}
          {selected.installation && (
            <details className="collections-install">
              <summary>{zh ? "安装到项目" : "Install in your project"}</summary>
              <pre>npx shadcn@latest add {selected.installation.url}</pre>
              <p>
                {zh
                  ? "先核对目标框架、依赖与许可证；此页面不会执行安装。"
                  : "Check target framework, dependencies and license. This page does not run installation commands."}
              </p>
            </details>
          )}
          {loadError ? (
            <div role="alert">
              <p>{loadError}</p>
              <Button onClick={() => setRetry((v) => v + 1)}>
                {zh ? "重试" : "Retry"}
              </Button>
            </div>
          ) : !content ? (
            <p role="status">
              {zh ? "正在读取原文件…" : "Loading original source…"}
            </p>
          ) : (
            <>
              {previewFor(selected) &&
                (selected.id === "component:pin-ui/presence-cards" ? (
                  <div className="directory-inline-preview">
                    <React.Suspense
                      fallback={
                        <p role="status">
                          {zh ? "正在加载组件…" : "Loading component…"}
                        </p>
                      }
                    >
                      <PresenceCards
                        theme={previewTheme === "dark" ? "dark" : "light"}
                      />
                    </React.Suspense>
                  </div>
                ) : (
                  <iframe
                    ref={frame}
                    className="directory-live-preview"
                    title={zh ? "实际组件预览" : "Live component preview"}
                    src={
                      previewFor(selected) +
                      `&theme=${previewTheme}`
                    }
                    sandbox="allow-scripts allow-same-origin"
                  />
                ))}
              {selected.cover && (
                <img
                  className="collections-preview"
                  src={selected.cover}
                  alt={selected.name}
                />
              )}
              {(selected.type === "tokens" || selected.path.endsWith(".css") || selected.path.endsWith("mobbin-archive/colors.md")) && <TokenSpecimens content={selected.path.endsWith("/baseline.css")?tokenContext:content} context={tokenContext} zh={zh}/> }
              {selected.path.endsWith("material3/DESIGN.md") && tokenContext && <TokenSpecimens content={tokenContext} zh={zh}/>}
              {selected.type === "design-md" && (
                <DesignComponentDemo markdown={content} lang={lang} />
              )}
              <details
                open={!previewFor(selected) && !isPlatformOverview}
                className="directory-source"
              >
                <summary>{zh ? "规范与源码" : "Guidelines and source"}</summary>
                <div className="design-document-body collections-document">
                  {selected.path.endsWith(".md") ? (
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      skipHtml
                      components={{
                        a: ({ href, children }) => (
                          <a
                            href={documentHref(href || "")}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        ),
                        img: ({src,alt}) => <PlatformMedia path={selected.path} src={typeof src === "string" ? src : ""} alt={alt} zh={zh} dark={previewTheme==="dark"}/>,
                        table: ({ children }) => (
                          <div className="collections-table" tabIndex={0}>
                            <table>{children}</table>
                          </div>
                        ),
                      }}
                    >
                      {parseDesignDocument(content).body}
                    </Markdown>
                  ) : (
                    <pre>{content}</pre>
                  )}
                </div>
              </details>
            </>
          )}
          {selected.system && (
            <nav
              className="directory-related"
              aria-label={zh ? "对应设计系统" : "Related design system"}
            >
              {catalog.resources
                .filter(
                  (r) =>
                    r.system === selected.system &&
                    r.id !== selected.id &&
                    r.type === "system" &&
                    (r.path.endsWith("/index.md") ||
                      r.path.endsWith(
                        "/components/" +
                          selected.path
                            .split("/")
                            .at(-1)
                            ?.replace(/\.[^.]+$/, ".md"),
                      )),
                )
                .map((r) => (
                  <a key={r.id} href={resourceHref(r, lang)}>
                    {r.name}
                  </a>
                ))}
            </nav>
          )}
          <details className="collections-provenance">
            <summary>{zh ? "来源与版本" : "Source and version"}</summary>
            <p>
              <a
                href={selected.sourceUrl || selected.source}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selected.sourceUrl || selected.source}
              </a>
            </p>
            <p>{selected.license}</p>
            <code>SHA-256 {selected.sha256}</code>
          </details>
        </>
      ) : (
        <>
          {current && (
            <ResourceDetailHeader
              title={zh ? current.name : current.nameEn}
              backLabel={zh ? "返回全部合集" : "All collections"}
              onBack={() => {
                setCollection("");
                setGroup("all");
                setQuery("");
                setPage(1);
              }}
            >
              <Button
                onClick={() =>
                  open(
                    catalog.resources.find(
                      (row) => row.id === current.overview,
                    )!,
                  )
                }
              >
                {zh ? "归档说明" : "Archive notes"}
              </Button>
            </ResourceDetailHeader>
          )}
          <ResourceToolbar
            label={zh ? "搜索资源" : "Search resources"}
            placeholder={
              zh
                ? "搜索名称、组件或规范"
                : "Search names, components or guidelines"
            }
            query={query}
            onQueryChange={(v) => {
              setQuery(v);
              setPage(1);
            }}
            status={
              current
                ? `${items.length} ${zh ? "份资源" : items.length === 1 ? "resource" : "resources"}`
                : `${visibleCollections.length} ${zh ? "个合集" : visibleCollections.length === 1 ? "collection" : "collections"}`
            }
          >
            {!current && (
              <div className="collections-filters">
                {groups.map(([id, cn, en]) => (
                  <Button
                    key={id}
                    variant={group === id ? "primary" : "ghost"}
                    aria-pressed={group === id}
                    onClick={() => setGroup(id)}
                  >
                    {zh ? cn : en}
                  </Button>
                ))}
              </div>
            )}
          </ResourceToolbar>
          {current ? (
            <>
              {current.access === "public-documents-only" && (
                <p>
                  {zh
                    ? "仅包含公开接入文档，不含付费 App 截图或流程。"
                    : "Public integration documents only. Paid app screenshots and flows are not included."}
                </p>
              )}
              <div className="collections-documents">
                {items.slice(0, page * 40).map((row) => (
                  <button key={row.id} type="button" onClick={() => open(row)}>
                    <span>{row.name}</span>
                    <span>
                      {row.type} / {Math.ceil(row.bytes / 1024)} KB
                    </span>
                  </button>
                ))}
              </div>
              {!items.length && (
                <p role="status">
                  {zh ? "没有找到匹配资源。" : "No matching resources."}
                </p>
              )}
              {items.length > page * 40 && (
                <Button onClick={() => setPage((v) => v + 1)}>
                  {zh ? "加载更多" : "Load more"}
                </Button>
              )}
            </>
          ) : (
            <>
              <div className="archive-grid">
                {visibleCollections.map((row) => (
                  <ResourceCard
                    key={row.id}
                    href={`?provider=collections&collection=${row.id}`}
                    title={zh ? row.name : row.nameEn}
                    mediaClassName={
                      row.cover
                        ? "archive-card-media"
                        : "collections-summary-media"
                    }
                    description={`${row.count} ${zh ? "份资源" : "resources"}`}
                    media={
                      row.cover ? (
                        <img src={row.cover} alt="" loading="lazy" />
                      ) : (
                        <div className="collections-type-preview">
                          {catalog.resources
                            .filter(
                              (item) =>
                                item.collection === row.id &&
                                item.type !== "collection" &&
                                (row.id !== "design-how-systems" ||
                                  !item.id.includes("/")) &&
                                (row.id !== "brand-systems" ||
                                  item.path.endsWith("/index.md")),
                            )
                            .slice(0, 4)
                            .map((item) => (
                              <span key={item.id}>
                                {row.id === "app-tokens"
                                  ? item.name.replace(/ \/ tokens$/, "")
                                  : item.name.split(" / ").at(-1)}
                              </span>
                            ))}
                        </div>
                      )
                    }
                    onClick={(e) => {
                      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey)
                        return;
                      e.preventDefault();
                      setCollection(row.id);
                      setQuery("");
                      setPage(1);
                    }}
                  />
                ))}
              </div>
              {!visibleCollections.length && (
                <p role="status">
                  {zh ? "没有找到匹配合集。" : "No matching collections."}
                </p>
              )}
            </>
          )}
        </>
      )}
    </Root>
  );
}
