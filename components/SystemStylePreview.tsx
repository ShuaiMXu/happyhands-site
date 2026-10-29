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
}: {
  system: string;
  lang: string;
  component?: string;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(component ? 420 : 1600);
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
  return (
    <div className="system-style-preview">
      <iframe
        ref={frame}
        key={`${system}:${component}:${theme}`}
        title={`${system} ${lang === "zh" ? "实际样式预览" : "live style preview"}`}
        src={`/systems/preview/?system=${system}&theme=${theme}${component ? `&component=${component}` : ""}`}
        style={{ height }}
        loading="lazy"
      />
    </div>
  );
}
