import { useEffect, useRef, useState } from "react";
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
  const zh = lang === "zh",
    create = useRef(onCreate);
  create.current = onCreate;
  const [slug, setSlug] = useState(
    () => new URLSearchParams(location.search).get("design") || "",
  );
  const [error, setError] = useState(false),
    [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!slug) return;
    const controller = new AbortController();
    setError(false);
    if (!/^[a-z0-9-]{1,100}$/.test(slug)) {
      setError(true);
      return;
    }
    Promise.all(
      ["design-system.json", "design.md"].map(async (file) => {
        const response = await fetch(`/design-archive/${slug}/${file}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw Error("Reference unavailable");
        return file.endsWith(".json") ? response.json() : response.text();
      }),
    )
      .then(([system, markdown]) => {
        if (controller.signal.aborted) return;
        const draft = importDesign(
          slug,
          system,
          markdown,
          `design-${crypto.randomUUID()}`,
        );
        if (!create.current(draft)) throw Error("Could not save project");
        const url = new URL(location.href);
        url.searchParams.delete("design");
        window.history.replaceState(null, "", url);
        setSlug("");
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError(true);
      });
    return () => controller.abort();
  }, [slug, retry]);
  return (
    <div className="studio-reference-entry">
      {slug ? (
        <p role={error ? "alert" : "status"}>
          {error
            ? zh
              ? "未能接入所选参考，请重试。"
              : "Could not connect the selected reference. Retry."
            : zh
              ? "正在创建所选网站的设计预览…"
              : "Creating your selected website’s design preview…"}
        </p>
      ) : (
        <span>{zh ? "从喜欢的网站开始" : "Start with a website you like"}</span>
      )}
      {error && (
        <Button onClick={() => setRetry((v) => v + 1)}>
          {zh ? "重试" : "Retry"}
        </Button>
      )}
      <a href="/components/?provider=design-md" target="_top">
        {zh ? "浏览 Design.md" : "Browse Design.md"} →
      </a>
    </div>
  );
}
