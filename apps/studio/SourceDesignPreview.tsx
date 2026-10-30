import { useState } from "react";
import {
  ReferenceSpecimen,
  type ReferenceSystem,
} from "../../components/ReferenceSpecimen";
import type { DesignSource } from "../../packages/component-studio/design-import";
import "../../components/archive-gallery.css";
export function SourceDesignPreview({
  source,
  lang,
}: {
  source: DesignSource;
  lang: "zh" | "en";
}) {
  const [failed, setFailed] = useState(false),
    zh = lang === "zh";
  return (
    <section
      className="source-design-preview"
      aria-label={zh ? "所选网站的设计预览" : "Selected website design preview"}
    >
      <div className="source-design-heading">
        <h2>{source.name}</h2>
        <a
          target="_top"
          href={`/components/?provider=design-md&design=${source.slug}`}
        >
          {zh ? "查看 Design.md" : "View Design.md"} →
        </a>
      </div>
      <p>
        {zh
          ? "页面记录与设计规范来自所选网站。下方组件使用当前项目主题，可继续调整。"
          : "Page capture and design rules from your selected website. The components below use your editable project theme."}
      </p>
      {failed ? (
        <p role="status">
          {zh
            ? "页面记录暂不可用，设计规范和组件预览仍可查看。"
            : "The page capture is unavailable. Design rules and component previews remain available."}
        </p>
      ) : (
        <img
          src={`/design-archive/${source.slug}/screenshot.jpg`}
          alt={
            zh
              ? `${source.name} 原站页面记录`
              : `${source.name} original page capture`
          }
          onError={() => setFailed(true)}
        />
      )}
      <details>
        <summary>
          {zh
            ? "查看完整设计规范与来源组件"
            : "Explore design rules and source components"}
        </summary>
        <ReferenceSpecimen
          system={source.system as ReferenceSystem}
          lang={lang}
        />
      </details>
    </section>
  );
}
