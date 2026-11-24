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
        <Button variant="secondary" className="resource-back-button" onClick={onBack}>
          {backLabel}
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
  const panels = React.Children.toArray(children);
  const [targets, setTargets] = useState<Record<string, HTMLDivElement | null>>({});
  const onTarget = useCallback((id: string, element: HTMLDivElement | null) => {
    setTargets(previous => previous[id] === element ? previous : { ...previous, [id]: element });
  }, []);
  const count = panels.length;
  const tabs = useMemo(() => {
    const labels = lang === 'zh' ? ['预览', '资料与下载'] : ['Preview', 'Files and downloads'];
    return {
      label: lang === 'zh' ? '资源内容' : 'Resource content',
      tabs: labels.slice(0, count).map((label, i) => ({ id: String(i), label })),
      onTarget,
    };
  }, [lang, count, onTarget]);
  return (
    <div className="resource-detail-content">
      <SolidControlHost mount={mountResourceDetailTabs} value={tabs} />
      {panels.map((panel, i) => targets[i] ? createPortal(panel, targets[i]!, String(i)) : null)}
    </div>
  );
}
