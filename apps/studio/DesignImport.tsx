import { Input } from "../../packages/ui";
import { useEffect, useState } from "react";
import { Button } from "../../packages/ui";
import { importDesign } from "../../packages/component-studio/design-import";
import type { Draft } from "../../packages/contracts";
export function DesignImport({
  lang,
  onCreate,
}: {
  lang: "zh" | "en";
  onCreate: (draft: Draft) => boolean;
}) {
  const en = lang === "en",
    copy = (zh: string, eng: string) => (en ? eng : zh);
  const [open, setOpen] = useState(() =>
    new URLSearchParams(location.search).has("design"),
  );
  const [query, setQuery] = useState(""),
    [entries, setEntries] = useState<{ slug: string; name: string }[]>([]),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(false),
    [candidate, setCandidate] = useState<Draft | null>(null),
    [retry, setRetry] = useState(0);
  const [slug, setSlug] = useState(
    () => new URLSearchParams(location.search).get("design") || "",
  );
  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    fetch("/design-archive/index.json", { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw Error();
        return r.json();
      })
      .then((v) => {
        if (!Array.isArray(v)) throw Error();
        setEntries(v);
      })
      .catch((e) => {
        if (e.name !== "AbortError")
          setError(
            copy("目录加载失败，请重试。", "Could not load collection. Retry."),
          );
      });
    return () => controller.abort();
  }, [open, retry]);
  useEffect(() => {
    setCandidate(null);
    setError("");
    if (!slug) return;
    if (!/^[a-z0-9-]{1,100}$/.test(slug)) {
      setError(copy("无效的参考地址", "Invalid reference"));
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    Promise.all(
      ["design-system.json", "design.md"].map(async (file) => {
        const r = await fetch(`/design-archive/${slug}/${file}`, {
          signal: controller.signal,
        });
        if (!r.ok) throw Error();
        return file.endsWith(".json") ? r.json() : r.text();
      }),
    )
      .then(([system, markdown]) =>
        setCandidate(
          importDesign(slug, system, markdown, `design-${crypto.randomUUID()}`),
        ),
      )
      .catch((e) => {
        if (e.name !== "AbortError")
          setError(
            copy("参考加载失败，请重试。", "Could not load reference. Retry."),
          );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [slug, retry]);
  const matches = entries
    .filter((e) =>
      `${e.name} ${e.slug}`.toLowerCase().includes(query.toLowerCase()),
    )
    .slice(0, 30);
  return (
    <details
      className="studio-design-import"
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
    >
      <summary>{copy("从 Design.md 创建", "Create from Design.md")}</summary>
      <label>
        {copy("搜索参考", "Search references")}
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <div className="design-import-results">
        {matches.map((e) => (
          <Button
            key={e.slug}
            aria-pressed={slug === e.slug}
            onClick={() => setSlug(e.slug)}
          >
            {e.name}
          </Button>
        ))}
      </div>
      {!matches.length && entries.length > 0 && (
        <p>{copy("没有匹配参考", "No matching references")}</p>
      )}
      {loading && (
        <p role="status">
          {copy("正在读取设计规则…", "Loading design rules…")}
        </p>
      )}
      {error && (
        <p role="alert">
          {error}
          <Button onClick={() => setRetry((r) => r + 1)}>
            {copy("重试", "Retry")}
          </Button>
        </p>
      )}
      {candidate && (
        <section>
          <h2>{candidate.project}</h2>
          <p>
            {copy(
              "颜色按角色匹配；未匹配变量及另一明暗模式保留默认值。原始字体和组件形态尚未自动还原。",
              "Colors are matched by role. Unmatched tokens and the other mode keep defaults. Original fonts and component shapes are not yet reconstructed.",
            )}
          </p>
          <details>
            <summary>{copy("查看映射", "Review mappings")}</summary>
            {candidate.designSource?.mappings.map((m) => (
              <p key={m.key}>
                {m.key}: {m.value}
              </p>
            ))}
          </details>
          <Button
            onClick={() => {
              if (onCreate(candidate)) {
                setCandidate(null);
                setOpen(false);
                const url = new URL(location.href);
                url.searchParams.delete("design");
                window.history.replaceState(null, "", url);
              }
            }}
          >
            {copy("创建独立项目", "Create separate project")}
          </Button>
        </section>
      )}
    </details>
  );
}
