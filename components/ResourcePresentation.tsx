import React, { forwardRef, useId, useState } from "react";
import { Button } from "../packages/ui";

export const ResourceCard = forwardRef<
  HTMLAnchorElement,
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "title" | "media"> & {
    title: string;
    description: string;
    media: React.ReactNode;
    mediaClassName?: string;
  }
>(function ResourceCard(
  { title, description, media, mediaClassName = "", className = "", ...props },
  ref,
) {
  return (
    <a {...props} ref={ref} className={`resource-card ${className}`}>
      <div
        className={`resource-card-media ${mediaClassName}`}
        aria-hidden="true"
      >
        {media}
      </div>
      <div className="resource-card-caption">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </a>
  );
});

export function ResourceDetailHeader({
  title,
  backLabel,
  onBack,
  children,
}: {
  title: string;
  backLabel: string;
  onBack: () => void;
  children?: React.ReactNode;
}) {
  return (
    <header className="resource-detail-header">
      <div className="resource-detail-header-actions">
        <Button variant="ghost" onClick={onBack}>
          ← {backLabel}
        </Button>
        {children}
      </div>
      <h2>{title}</h2>
    </header>
  );
}

/** Common preview/document structure; source media remain isolated in their own renderer. */
export function ResourceDetailContent({
  lang,
  children,
}: {
  lang: string;
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const id = useId();
  const panels = React.Children.toArray(children);
  const labels =
    lang === "zh" ? ["预览", "资料与下载"] : ["Preview", "Files and downloads"];
  return (
    <div className="resource-detail-content">
      <div
        className="resource-content-tabs"
        role="tablist"
        aria-label={lang === "zh" ? "资源内容" : "Resource content"}
      >
        {panels.map((_, i) => (
          <button
            key={i}
            id={`${id}-tab-${i}`}
            role="tab"
            aria-selected={active === i}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(event) => {
              if (
                !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
              )
                return;
              event.preventDefault();
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? panels.length - 1
                    : (i +
                        (event.key === "ArrowRight" ? 1 : -1) +
                        panels.length) %
                      panels.length;
              setActive(next);
              document.getElementById(`${id}-tab-${next}`)?.focus();
            }}
          >
            {labels[i]}
          </button>
        ))}
      </div>
      {panels.map((panel, i) => (
        <section
          key={i}
          id={`${id}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${i}`}
          hidden={active !== i}
          className="resource-content-panel"
        >
          {active === i && panel}
        </section>
      ))}
    </div>
  );
}
