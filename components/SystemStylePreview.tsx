import React, { useEffect, useRef, useState } from "react";
import { Button } from "../packages/ui/shadcn/button";
import { SystemPreviewFrame, SystemPreviewSurface } from "../packages/ui/SystemPreviewSurface";
import "./system-style-preview.css";
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
  foundation = "",
  gallery = "",
  compact = false,
  compactSpecimen = false,
}: {
  system: string;
  lang: string;
  component?: string;
  foundation?: string;
  gallery?: "foundations" | "components" | "examples" | "";
  compact?: boolean;
  compactSpecimen?: boolean;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const initialHeight = component ? 420 : gallery === "examples" ? 520 : gallery === "foundations" ? 900 : 1600;
  const [height, setHeight] = useState(initialHeight);
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
    setHeight(initialHeight);
    setExpanded(false);
  }, [system, component, foundation, gallery, theme]);
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
      ) {
        const contentHeight = Math.max(200, Math.ceil(event.data.height));
        setHeight(gallery === "components" ? contentHeight : Math.min(5000, contentHeight));
      }
    };
    addEventListener("message", receive);
    return () => removeEventListener("message", receive);
  }, [gallery]);
  const clipped = compact && !expanded;
  return (
    <SystemPreviewSurface className={clipped ? "is-compact" : undefined}>
      <SystemPreviewFrame
        ref={frame}
        key={`${system}:${component}:${foundation}:${gallery}:${compactSpecimen}:${theme}`}
        title={`${system} ${lang === "zh" ? "实际样式预览" : "live style preview"}`}
        src={`/systems/preview/?system=${system}&theme=${theme}&lang=${lang}${component ? `&component=${component}` : ""}${foundation ? `&foundation=${foundation}` : ""}${gallery ? `&gallery=${gallery}` : ""}${compactSpecimen ? "&compact=1&detail=1" : ""}`}
        style={{ height }}
        loading="lazy"
      />
      {compact && (
        <div className="system-style-preview-bar">
          <span>{lang === "zh" ? "实时渲染" : "Live render"}</span>
          <Button
            type="button"
            variant="outline"
            size="sm"
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
          </Button>
        </div>
      )}
    </SystemPreviewSurface>
  );
}
