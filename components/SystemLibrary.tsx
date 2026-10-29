import {
  ResourceCard,
  ResourceDetailHeader,
  ResourceDetailContent,
} from "./ResourcePresentation";
import { ResourceToolbar } from "./ResourceToolbar";
import { DesignHowLibrary } from "./DesignHowLibrary";
import { ResourceExport } from "./ResourceExport";
import "./archive-gallery.css";
import React, { useEffect, useState, useRef } from "react";
const systems = [
  {
    id: "happyhands",
    name: "HappyHands",
    zh: "品牌规范与产品组件",
    en: "Brand rules and product components",
  },
  {
    id: "quartz",
    name: "Quartz",
    zh: "AI 工作流与专业工具",
    en: "AI workflows and professional tools",
  },
  {
    id: "lime",
    name: "Lime",
    zh: "个人助手与消费类应用",
    en: "Personal assistants and consumer apps",
  },
  {
    id: "sodium",
    name: "Sodium",
    zh: "基础设施与数据工具",
    en: "Infrastructure and data tools",
  },
  {
    id: "glaze",
    name: "Glaze",
    zh: "AI 产品与简洁黑白界面",
    en: "AI products with compact black and white interfaces",
  },
] as const;
export function SystemLibrary({ lang }: { lang: string }) {
  const t = (zh: string, en: string) => (lang === "zh" ? zh : en);
  const read = () =>
    systems.find(
      (system) =>
        system.id === new URLSearchParams(location.search).get("system"),
    )?.id || "";
  const [selected, setSelected] = useState(read);
  const [query, setQuery] = useState("");
  const filtered = systems.filter((s) =>
    `${s.name} ${s.zh} ${s.en}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  useEffect(() => {
    const update = () => setSelected(read());
    addEventListener("popstate", update);
    return () => removeEventListener("popstate", update);
  }, []);
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1200);
  useEffect(() => {
    setHeight(1200);
  }, [selected]);
  useEffect(() => {
    const resize = (event: MessageEvent) => {
      if (
        event.origin !== location.origin ||
        event.source !== frame.current?.contentWindow ||
        event.data?.type !== "system-content-height"
      )
        return;
      const value = event.data.height;
      if (typeof value === "number" && Number.isFinite(value) && value > 0)
        setHeight(Math.min(30000, Math.ceil(value)));
    };
    addEventListener("message", resize);
    return () => removeEventListener("message", resize);
  }, []);
  const name = systems.find((system) => system.id === selected)?.name || "";
  const base = `/systems/${selected}/`;
  return (
    <main id="catalog-main" className="system-library-full" tabIndex={-1}>
      {!selected && (
        <>
          <ResourceToolbar
            label={t("搜索设计系统", "Search design systems")}
            placeholder={t("搜索", "Search")}
            query={query}
            onQueryChange={setQuery}
            status={`${filtered.length} ${t("个结果", "results")}`}
          >
            {null}
          </ResourceToolbar>
          <nav
            className="provider-navigation system-cover-navigation"
            aria-label={t("资源来源", "Resource sources")}
          >
            {filtered.map(({ id, name, zh, en }) => (
              <ResourceCard
                title={name}
                description={t(zh, en)}
                media={
                  <img
                    src={`/system-covers/${id}.png`}
                    alt=""
                    width="1500"
                    height="938"
                    loading="lazy"
                  />
                }
                href={`?provider=systems&system=${id}`}
                key={id}
                aria-current={selected === id ? "page" : undefined}
                onClick={(e) => {
                  if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
                  e.preventDefault();
                  setSelected(id);
                  history.pushState(null, "", `?provider=systems&system=${id}`);
                }}
              />
            ))}
          </nav>
          {!filtered.length && (
            <div className="catalog-empty">
              <p>{t("没有匹配的设计系统", "No matching design systems")}</p>
              <button onClick={() => setQuery("")}>
                {t("清除筛选", "Clear filters")}
              </button>
            </div>
          )}
        </>
      )}
      {selected && (
        <>
          <ResourceDetailHeader
            title={name}
            backLabel={t("返回设计系统", "All design systems")}
            onBack={() => {
              setSelected("");
              history.pushState(null, "", "?provider=systems");
            }}
          />
          {selected !== "happyhands" ? (
            <DesignHowLibrary key={selected} system={selected} lang={lang} />
          ) : (
            <ResourceDetailContent lang={lang}>
              <div className="resource-detail-preview system-reference-layout">
                <iframe
                  ref={frame}
                  key={selected}
                  title={t(
                    `${name} 完整设计规范`,
                    `${name} complete design system`,
                  )}
                  src={`${base}?embedded=1&resource=1`}
                  style={{ height }}
                />
              </div>
              <ResourceExport
                key={selected}
                lang={lang}
                files={[
                  ...(selected === "happyhands"
                    ? [
                        {
                          label: "SKILL.md",
                          url: "/systems/happyhands/SKILL.md",
                          name: "SKILL.md",
                        },
                      ]
                    : []),
                  {
                    label: "Tokens",
                    url: `/systems/${selected}/tokens.json`,
                    name: `${selected}-tokens.json`,
                  },
                ]}
              />
            </ResourceDetailContent>
          )}
        </>
      )}
    </main>
  );
}
