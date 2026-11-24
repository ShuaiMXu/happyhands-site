import {portalFooter} from "../apps/portal/render-footer.js";
import "../packages/ui/pinui/site-footer.css";
import {ResourceDirectory} from './ResourceDirectory';
import { CatalogComponentDetail } from "./CatalogComponentDetail";
import {ResourceToolPanels} from "../packages/ui/ResourceToolPanels";
import { designMdCatalogEnabled, isDesignMdCollection, isDesignMdProvider } from "../packages/ui/resource-navigation";
import {ResourceNavigation} from "../packages/ui/ResourceNavigation";
import "../packages/ui/resource-navigation.css";
import { Button } from "../packages/ui";
import { ResourceDetailHeader } from "./ResourcePresentation";
import { resolveCatalogItem, searchCatalog } from "./catalog-search";
import { applyResourceMetadata, componentSeo } from "../packages/ui/resource-seo";
import { ComponentTile } from "./ComponentTile";
import { ArchiveFilter } from "./ArchiveFilter";
import { ResourceToolbar } from "./ResourceToolbar";
import { DesignMdLibrary } from "./DesignMdLibrary";
import { SystemLibrary } from "./SystemLibrary";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Icon } from "../packages/ui/Icon";
import "../packages/ui/components.css";
import { SiteHeader } from "../packages/ui/SiteHeader";
import { useSitePreferences } from "../packages/ui/useSitePreferences";
import data from "../public/components/cult-ui/catalog.json";
import "../packages/design-tokens/happyhands.css";
import "../packages/ui/site-layout.css";
import "./style.css";
import "../packages/ui/owned-ui.css";
import "./resource-presentation.css";
const groups: Record<string, [string, string]> = {
  all: ["全部组件", "All components"],
  buttons: ["按钮", "Buttons"],
  inputs: ["输入与选择", "Inputs"],
  cards: ["卡片与投票", "Cards and polls"],
  navigation: ["导航与切换", "Navigation"],
  overlays: ["弹层与展开", "Overlays"],
  type: ["文字与数字", "Typography"],
  illustrations: ["插画与设备", "Illustrations"],
  sections: ["页面区块", "Sections"],
  effects: ["背景与效果", "Effects"],
};
type Item = (typeof data.items)[number];
const title = (x: Item) =>
  x.title.replace("Ui", "UI").replace("Svg", "SVG").replace("Ai ", "AI ");
const readSelection = () =>
  resolveCatalogItem(
    data.items,
    new URLSearchParams(location.search).get("component"),
  )?.id || "";

// Retired public tool: keep old bookmarks understandable without opening the editor.
if (new URLSearchParams(location.search).get('provider') === 'studio') location.replace('/apps/studio/');
function App() {
  const readProvider = () => {
    const value = new URLSearchParams(location.search).get("provider");
    if(value==='collections'){const collection=new URLSearchParams(location.search).get('collection')||'';return ['registry-own','brand-registry','cult-ui'].includes(collection)?'cult-ui':isDesignMdCollection(collection)&&designMdCatalogEnabled?'design-md':'systems';}
    if(value === "studio" || value === "setup") return value;
    return isDesignMdProvider(value)
      ? (designMdCatalogEnabled ? "design-md" : "systems")
      : value === "systems"
        ? "systems"
        : "cult-ui";
  };
  const [routeVersion,setRouteVersion]=useState(0);
  const [provider, setProvider] = useState(readProvider);
  const { lang, dark, toggleLanguage, toggleTheme } = useSitePreferences();
  const t = (zh: string, en: string) => (lang === "zh" ? zh : en);
  const archiveRouteDisabled = !designMdCatalogEnabled && isDesignMdProvider(new URLSearchParams(location.search).get("provider"));
  const [selected, setSelected] = useState(readSelection),
    [group, setGroup] = useState("all"),
    [query, setQuery] = useState("");
  const main = useRef<HTMLElement>(null);
  const lastTile = useRef("");
  const returning = useRef(false);
  useLayoutEffect(() => {
    if (!selected && returning.current) {
      returning.current = false;
      document
        .querySelector<HTMLAnchorElement>(
          `.component-tile[href$="component=${lastTile.current}"]`,
        )
        ?.focus();
    }
  }, [selected]);
  const item = data.items.find((x) => x.id === selected) || data.items[0];
  const [page, setPage] = useState(0);
  useEffect(() => setPage(0), [group, query]);
  useEffect(() => {
    if (selected) main.current?.focus();
  }, [selected]);
  useEffect(() => {
    if (provider === "cult-ui") applyResourceMetadata(selected ? componentSeo(item) : null, lang);
    // Embedded tools do not own the parent document's resource metadata.
    if (provider === "studio" || provider === "setup" || provider === "collections") applyResourceMetadata(null, lang);
  }, [lang, provider, selected]);
  useEffect(() => {
    const handle = () => {
      setProvider(readProvider());
      setSelected(readSelection());
    };
    addEventListener("popstate", handle);
    return () => removeEventListener("popstate", handle);
  }, []);
  function select(id: string) {
    lastTile.current = id;
    setSelected(id);
    history.pushState(
      null,
      "",
      `?provider=cult-ui&component=${encodeURIComponent(id)}`,
    );
    main.current?.focus();
  }
  const filtered = searchCatalog(data.items, query, group, groups);
  return (
    <>
      <a className="catalog-skip" href="#catalog-main">
        {t("跳到内容", "Skip to content")}
      </a>
      <SiteHeader navigation={false}
        lang={lang}
        dark={dark}
        onLanguage={toggleLanguage}
        onTheme={toggleTheme}
        active="/apps/portal/#explore"
      />
      <ResourceNavigation active={provider} lang={lang} onSelect={id=>{
        setProvider(id);setSelected("");setRouteVersion(v=>v+1);history.pushState(null,"",`?provider=${id}`);
      }}/>
      <ResourceToolPanels active={provider} lang={lang}/>
      {provider === "studio" || provider === "setup" ? null : archiveRouteDisabled || (!new URLSearchParams(location.search).has("design")&&!new URLSearchParams(location.search).has("system")&&!selected)||new URLSearchParams(location.search).has("resource") ? <ResourceDirectory key={`${provider}-${routeVersion}`} section={provider} lang={lang}/> : provider === "systems" ? (
        <SystemLibrary lang={lang} />
      ) : provider === "design-md" ? (
        <DesignMdLibrary lang={lang} />
      ) : (
        <div
          className={`library-layout ${selected ? "library-detail" : "library-browse"}`}
        >
          {!selected && (
            <>
              <ResourceToolbar
                suggestions={
                  lang === "zh"
                    ? ["按钮", "卡片", "导航", "弹层"]
                    : ["Buttons", "Cards", "Navigation", "Overlays"]
                }
                label={t("搜索组件", "Search components")}
                placeholder={t("搜索", "Search")}
                query={query}
                onQueryChange={setQuery}
                status={`${filtered.length} ${t("个结果", "results")}`}
              >
                <ArchiveFilter
                  label={t("组件分类", "Component category")}
                  zh={lang === "zh"}
                  value={group}
                  onChange={setGroup}
                  options={Object.entries(groups).map(([id, labels]) => ({
                    value: id,
                    label: labels[lang === "zh" ? 0 : 1],
                    count: searchCatalog(data.items, query, id, groups).length,
                  }))}
                />
              </ResourceToolbar>
              <main
                id="catalog-main"
                className="component-results"
                tabIndex={-1}
              >
                <div className="component-grid">
                  {filtered.slice(page * 18, (page + 1) * 18).map((entry) => (
                    <ComponentTile
                      key={entry.id}
                      id={entry.id}
                      name={title(entry)}
                      category={
                        groups[entry.category]?.[lang === "zh" ? 0 : 1] || ""
                      }
                      dark={dark}
                      lang={lang}
                      onSelect={select}
                    />
                  ))}
                </div>
                {!filtered.length && (
                  <div className="catalog-empty">
                    <h2>{t("没有匹配的组件", "No matching components")}</h2>
                    <Button
                      onClick={() => {
                        setQuery("");
                        setGroup("all");
                      }}
                    >
                      {t("清除筛选", "Clear filters")}
                    </Button>
                  </div>
                )}
                {filtered.length > 18 && (
                  <nav
                    className="gallery-pagination"
                    aria-label={t("组件分页", "Component pages")}
                  >
                    <Button
                      disabled={page === 0}
                      onClick={() => {
                        setPage(page - 1);
                        document.getElementById("catalog-main")?.focus();
                      }}
                    >
                      {t("上一页", "Previous")}
                    </Button>
                    <span>
                      {page + 1} / {Math.ceil(filtered.length / 18)}
                    </span>
                    <Button
                      disabled={(page + 1) * 18 >= filtered.length}
                      onClick={() => {
                        setPage(page + 1);
                        document.getElementById("catalog-main")?.focus();
                      }}
                    >
                      {t("下一页", "Next")}
                    </Button>
                  </nav>
                )}
              </main>
            </>
          )}
          {selected && (
            <main
              id="catalog-main"
              ref={main}
              tabIndex={-1}
              className="catalog-main"
            >
              <ResourceDetailHeader
                title={title(item)}
                backLabel={t("返回组件库", "All components")}
                onBack={() => {
                  returning.current = true;
                  setSelected("");
                  history.pushState(null, "", "?provider=cult-ui");
                }}
              />
              <CatalogComponentDetail
                key={item.id}
                item={item}
                title={title(item)}
                lang={lang}
                dark={dark}
                revision={data.revision}
                onSelect={select}
              />
            </main>
          )}
        </div>
      )}
      <footer className="hh-catalog-footer" dangerouslySetInnerHTML={{__html:portalFooter(lang)}}/>
    </>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
