import { systemCover } from '../packages/ui/resource-editorial-covers';
import { applyResourceMetadata } from "../packages/ui/resource-seo";
import { Button } from "../packages/ui";
import { ResourceCard } from "./ResourcePresentation";
import { ResourceToolbar } from "./ResourceToolbar";
import { DesignHowLibrary } from "./DesignHowLibrary";
import "./archive-gallery.css";
import React, { useEffect, useState } from "react";
const systems = [
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
  const current = systems.find(system => system.id === selected);
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
                    src={systemCover(id)}
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
      {selected && <DesignHowLibrary
        key={selected}
        system={selected}
        lang={lang}
        description={current && t(current.summaryZh, current.summaryEn)}
        useCase={current && t(current.zh, current.en)}
      />}
    </main>
  );
}
