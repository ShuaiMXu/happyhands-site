import {Tabs,TabsList,TabsTrigger,TabsContent} from "../packages/ui/shadcn/tabs";
import {Card} from "../packages/ui/shadcn/card";
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
  const panels = React.Children.toArray(children);
  const labels = lang === 'zh' ? ['预览','资料与下载'] : ['Preview','Files and downloads'];
  return <Tabs defaultValue="0" className="resource-detail-content"><TabsList variant="line" className="resource-content-tabs" aria-label={lang==='zh'?'资源内容':'Resource content'}>{panels.map((_,i)=><TabsTrigger key={i} value={String(i)}>{labels[i]}</TabsTrigger>)}</TabsList>{panels.map((panel,i)=><TabsContent key={i} value={String(i)} className="resource-content-panel">{panel}</TabsContent>)}</Tabs>;
}
