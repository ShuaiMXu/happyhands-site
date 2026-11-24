import { createPortal } from 'react-dom';
import { SolidControlHost } from "../packages/ui/SolidControlHost";
import { mountResourceDetailTabs } from "./ResourceDetailTabs.solid";
import {Card} from "../packages/ui/shadcn/card";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
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
      <Card
        className={`resource-card-media ${mediaClassName}`}
        aria-hidden="true"
      >
        {media}
      </Card>
      <div className="resource-card-caption">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </a>
  );
});

export function ResourceProvenance({ lang, source, license, sha256 }: {
  lang: string;
  source?: string;
  license: string;
  sha256: string;
}) {
  const zh = lang === "zh";
  const title = source
    ? (zh ? "来源与版本" : "Source and version")
    : (zh ? "许可证与校验值" : "License and checksum");

  return (
    <details className="collections-provenance">
      <summary className="document-disclosure"><span>{title}</span></summary>
      <dl className="resource-provenance-fields">
        {source && <>
          <dt>{zh ? "上游来源" : "Upstream source"}</dt>
          <dd><a href={source} target="_blank" rel="noopener noreferrer">{source}</a></dd>
        </>}
        <dt>{zh ? "许可证" : "License"}</dt>
        <dd>{license}</dd>
        <dt>SHA-256</dt>
        <dd><code>{sha256}</code></dd>
      </dl>
    </details>
  );
}

export function ResourceDetailHeader({
  title,
  backLabel,
  headingLevel = 2,
  onBack,
  children,
  description,
  compact = false,
}: {
  title: string;
  backLabel: string;
  headingLevel?: 1 | 2;
  onBack: () => void;
  description?: string;
  compact?: boolean;
  children?: React.ReactNode;
}) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  return (
    <header className={`resource-detail-header${compact ? " component-detail-header" : ""}`}>
      <div className="resource-detail-header-actions">
        <Button variant={compact ? "ghost" : "secondary"} className={compact ? "component-detail-return" : "resource-back-button"} onClick={onBack}>
          {backLabel}
        </Button>
        {children}
      </div>
      <Heading>{title}</Heading>
      {description && <p>{description}</p>}
    </header>
  );
}

/** Common preview/document structure; source media remain isolated in their own renderer. */
export function ResourceDetailContent({
  lang,
  children,
  labels,
}: {
  lang: string;
  children: React.ReactNode;
  labels?: readonly string[];
}) {
  const panels = React.Children.toArray(children);
  const [targets, setTargets] = useState<Record<string, HTMLDivElement | null>>({});
  const onTarget = useCallback((id: string, element: HTMLDivElement | null) => {
    setTargets(previous => previous[id] === element ? previous : { ...previous, [id]: element });
  }, []);
  const count = panels.length;
  const tabs = useMemo(() => {
    const panelLabels = labels ?? (lang === 'zh' ? ['预览', '资料与下载'] : ['Preview', 'Files and downloads']);
    return {
      label: lang === 'zh' ? '资源内容' : 'Resource content',
      tabs: panelLabels.slice(0, count).map((label, i) => ({ id: String(i), label })),
      onTarget,
    };
  }, [lang, count, labels, onTarget]);
  return (
    <div className="resource-detail-content">
      <SolidControlHost mount={mountResourceDetailTabs} value={tabs} />
      {panels.map((panel, i) => targets[i] ? createPortal(panel, targets[i]!, String(i)) : null)}
    </div>
  );
}
