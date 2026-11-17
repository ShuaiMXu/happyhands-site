import React, { useEffect, useRef, useState } from "react";
export const previewComponents = new Set([
  "button",
  "input",
  "textarea",
  "checkbox",
  "switch",
  "slider",
  "progress",
  "status",
  "badge",
  "avatar",
  "skeleton",
  "tabs",
  "card",
  "frame",
  "dialog",
  "popover",
  "select",
]);
export function SystemStylePreview({
  system,
  lang,
  component = "",
  compact = false,
}: {
  system: string;
  lang: string;
  component?: string;
  compact?: boolean;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(component ? 420 : 1600);
  const [expanded, setExpanded] = useState(false);
  const [theme, setTheme] = useState(
    document.documentElement.dataset.theme === "dark" ? "dark" : "light",
  );
  useEffect(() => {
    const observer = new MutationObserver(() =>
      setTheme(
        document.documentElement.dataset.theme === "dark" ? "dark" : "light",
      ),
    );
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    setHeight(component ? 420 : 1600);
    setExpanded(false);
  }, [system, component, theme]);
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (
        event.origin !== location.origin ||
        event.source !== frame.current?.contentWindow ||
        event.data?.type !== "design-system-preview-height"
      )
        return;
      if (
        typeof event.data.height === "number" &&
        Number.isFinite(event.data.height)
      )
        setHeight(Math.min(5000, Math.max(200, Math.ceil(event.data.height))));
    };
    addEventListener("message", receive);
    return () => removeEventListener("message", receive);
  }, []);
  const clipped = compact && !expanded;
  return (
    <div className={`system-style-preview${clipped ? " is-compact" : ""}`}>
      <iframe
        ref={frame}
        key={`${system}:${component}:${theme}`}
        title={`${system} ${lang === "zh" ? "实际样式预览" : "live style preview"}`}
        src={`/systems/preview/?system=${system}&theme=${theme}${component ? `&component=${component}` : ""}`}
        style={{ height }}
        loading="lazy"
      />
      {compact && (
        <div className="system-style-preview-bar">
          <span>{lang === "zh" ? "实时渲染" : "Live render"}</span>
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded
              ? lang === "zh"
                ? "收起预览"
                : "Collapse preview"
              : lang === "zh"
                ? "展开完整预览"
                : "Expand full preview"}
          </button>
        </div>
      )}
    </div>
  );
}
