import React, { useLayoutEffect, useRef, type RefObject } from "react";
import { Button } from "../packages/ui";
import "./resource-controls.css";

export function ResourceLoadMore({ list, shown, total, lang, onLoad }: {
  list: RefObject<HTMLDivElement | null>;
  shown: number;
  total: number;
  lang: string;
  onLoad: () => void;
}) {
  const nextItem = useRef<number | null>(null);
  useLayoutEffect(() => {
    const index = nextItem.current;
    if (index === null) return;
    nextItem.current = null;
    const item = list.current?.children.item(index);
    const target = item instanceof HTMLElement && item.matches("a, button, [tabindex]")
      ? item : item?.querySelector<HTMLElement>("a, button");
    target?.focus();
  }, [list, shown]);

  if (shown >= total) return null;
  return (
    <div className="resource-load-more">
      <Button onClick={event => {
        // Keep the next keyboard stop at the first newly added card.
        if (event.detail === 0) nextItem.current = list.current?.childElementCount ?? null;
        onLoad();
      }}>
        {lang === "zh" ? "加载更多" : "Load more"}
      </Button>
    </div>
  );
}
