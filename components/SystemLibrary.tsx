import { applyResourceMetadata, systemSeo } from "../packages/ui/resource-seo";
import { Button } from "../packages/ui";
import {
  ResourceCard,
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
    summaryZh: "本站自用的品牌规范、语义 token 与产品组件，也是这份站点本身的视觉底稿。",
    summaryEn: "The brand rules, semantic tokens and product components this site is built on.",
  },
  {
    id: "quartz",
    name: "Quartz",
    zh: "AI 工作流与专业工具",
    en: "AI workflows and professional tools",
    summaryZh: "黑白底盘配五种柔和语义色，面向 AI 支持产品与 Agent 控制台。",
    summaryEn: "A black-and-white chassis with five muted semantic hues for AI support products and agent consoles.",
  },
  {
    id: "lime",
    name: "Lime",
    zh: "个人助手与消费类应用",
    en: "Personal assistants and consumer apps",
    summaryZh: "白页面、暖灰表面与酸性青柠主操作色，面向消费级个人助手。",
    summaryEn: "White pages, warm-grey surfaces and one acid-lime primary action for consumer apps.",
  },
  {
    id: "sodium",
    name: "Sodium",
    zh: "基础设施与数据工具",
    en: "Infrastructure and data tools",
    summaryZh: "紧凑、克制的基础设施系统：白与暖近黑、1px 结构线、等宽大写。",
    summaryEn: "Compact and ruled: white and warm near-black grounds, 1px rules and mono capitals.",
  },
  {
    id: "glaze",
    name: "Glaze",
    zh: "AI 产品与简洁黑白界面",
    en: "AI products with compact black and white interfaces",
    summaryZh: "AI 产品的紧凑黑白系统：墨与纸、灰阶透明，颜色只留给状态。",
    summaryEn: "Compact black and white for AI products: ink and paper, greys as ink alphas, colour only for status.",
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
  useEffect(() => {
    if (!selected) applyResourceMetadata(null, lang);
    if (selected === 'happyhands') applyResourceMetadata(systemSeo({id:'happyhands',name:'HappyHands',summary:'HappyHands brand rules, semantic tokens and product components.'}),lang);
  }, [selected,lang]);
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
  const current = systems.find((system) => system.id === selected);
  const name = current?.name || "";
  const base = `/systems/${selected}/`;
  return (
    <main id="catalog-main" className="system-library-full" tabIndex={-1}>
      {!selected && (
        <>
          <ResourceToolbar
            suggestions={["Quartz", "Lime", "Sodium", "Glaze"]}
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
              <Button onClick={() => setQuery("")}>
                {t("清除筛选", "Clear filters")}
              </Button>
            </div>
          )}
        </>
      )}
      {selected && (
        <>
          <header className="resource-detail-header system-detail-hero">
            <nav className="system-detail-crumbs" aria-label={t("当前位置", "Breadcrumb")}>
              <a
                href="?provider=systems"
                onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                  event.preventDefault();
                  setSelected("");
                  history.pushState(null, "", "?provider=systems");
                }}
              >
                {t("设计系统", "Design systems")}
              </a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{name}</span>
            </nav>
            <div className="system-detail-grid">
              <div>
                <p className="system-detail-eyebrow">
                  {selected === "happyhands"
                    ? t("我们的设计系统", "Our design system")
                    : t("外部设计系统 / design.how", "External design system / design.how")}
                </p>
                <h2>{name}</h2>
                <p className="system-detail-lead">
                  {lang === "zh" ? current?.summaryZh : current?.summaryEn}
                </p>
              </div>
              <div className="system-detail-actions">
                {selected === "happyhands" ? (
                  <>
                    <a className="system-detail-action system-detail-action--primary" href="/systems/happyhands/">
                      {t("浏览完整规范", "Browse the system")}
                    </a>
                    <a className="system-detail-action" href="/systems/happyhands/SKILL.md" download>
                      {t("下载 SKILL.md", "Download SKILL.md")}
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      className="system-detail-action system-detail-action--primary"
                      href={`?provider=systems&system=${selected}&doc=index.md`}
                    >
                      {t("阅读完整文档", "Read the docs")}
                    </a>
                    <a
                      className="system-detail-action"
                      href={`/design-how/${selected}.zip`}
                      download
                    >
                      {t("下载完整资料", "Download archive")}
                    </a>
                  </>
                )}
              </div>
            </div>
            <dl className="system-detail-meta" aria-label={t("系统概况", "System overview")}>
              <div>
                <dt>{t("来源", "Source")}</dt>
                <dd>{selected === "happyhands" ? "HappyHands" : "design.how"}</dd>
              </div>
              <div>
                <dt>{t("适用场景", "Best for")}</dt>
                <dd>{lang === "zh" ? current?.zh : current?.en}</dd>
              </div>
              <div>
                <dt>{t("技术基础", "Stack")}</dt>
                <dd>React / Tailwind CSS / shadcn</dd>
              </div>
            </dl>
          </header>
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
