import React, { useState } from "react";
import { Button } from "../packages/ui";
import { resourceHref, type ResourceEntry } from "./resource-directory";
import { platformFor } from "./platform-directory";
import groups from "../public/resources/v1/platform-groups.json";
const labels: Record<string, [string, string]> = {
  overview: ["概览与指南", "Overview and guides"],
  platforms: ["设备平台", "Platforms"],
  foundations: ["基础规范", "Foundations"],
  components: ["组件", "Components"],
  patterns: ["交互模式", "Patterns"],
  inputs: ["输入方式", "Inputs"],
  technologies: ["技术与服务", "Technologies"],
  tokens: ["设计变量", "Design tokens"],
};
export function PlatformDirectory({
  row,
  rows,
  lang,
}: {
  row: ResourceEntry;
  rows: ResourceEntry[];
  lang: string;
}) {
  const platform = platformFor(row)!;
  const zh = lang === "zh";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const children = rows.filter(
    (r) =>
      r.path.startsWith(platform.prefix) &&
      r.id !== row.id &&
      r.type !== "collection",
  );
  const categoryFor = (r: ResourceEntry) =>
    (groups as Record<string, string>)[r.id] || "overview";
  const visible = children.filter(
    (r) =>
      (!category || categoryFor(r) === category) &&
      (r.name + " " + r.path).toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <section className="platform-directory" aria-label={platform.name}>
      <label className="platform-topic-search">
        {zh ? "搜索平台内的主题" : "Search topics in this platform"}
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <div className="platform-topic-filters">
        <Button
          variant={!category ? "secondary" : "ghost"}
          aria-pressed={!category}
          onClick={() => setCategory("")}
        >
          {zh ? "全部" : "All"} ({children.length})
        </Button>
        {Object.entries(labels)
          .filter(([key]) => children.some((r) => categoryFor(r) === key))
          .map(([key, label]) => (
            <Button
              key={key}
              variant={category === key ? "secondary" : "ghost"}
              aria-pressed={category === key}
              onClick={() => setCategory(key)}
            >
              {label[zh ? 0 : 1]}
            </Button>
          ))}
      </div>
      <div className="platform-topic-groups">
        {Object.entries(labels).map(([key, label]) => {
          const list = visible.filter((r) => categoryFor(r) === key);
          return list.length ? (
            <section key={key}>
              <h3>
                {label[zh ? 0 : 1]} <span>({list.length})</span>
              </h3>
              <ul>
                {list.map((r) => (
                  <li key={r.id}>
                    <a href={resourceHref(r, lang)}>{r.name}</a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null;
        })}
      </div>
      {!visible.length && (
        <p role="status">{zh ? "没有匹配的主题" : "No matching topics"}</p>
      )}
    </section>
  );
}
