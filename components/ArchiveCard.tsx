import React, { useEffect, useState, useRef } from "react";
import type { ArchiveEntry } from "./archive-catalog";
export function ArchiveCard({
  entry,
  active,
  onPreview,
  onOpen,
  lang,
}: {
  entry: ArchiveEntry;
  active: boolean;
  onPreview: (slug: string | null) => void;
  onOpen: () => void;
  lang: string;
}) {
  const root = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false),
    [failed, setFailed] = useState(false),
    zh = lang === "zh";
  useEffect(() => {
    setPlaying(false);
    setFailed(false);
  }, [active]);
  useEffect(() => {
    if (!active || !root.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) onPreview(null);
    });
    observer.observe(root.current);
    const hide = () => {
      if (document.hidden) onPreview(null);
    };
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const reduce = () => {
      if (motion.matches) onPreview(null);
    };
    motion.addEventListener("change", reduce);
    document.addEventListener("visibilitychange", hide);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", reduce);
      document.removeEventListener("visibilitychange", hide);
    };
  }, [active, onPreview]);
  const autoPreview = () => {
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
      onPreview(entry.slug);
  };
  return (
    <article
      ref={root}
      className="archive-card"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") autoPreview();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") onPreview(null);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onPreview(null);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null))
          onPreview(null);
      }}
    >
      <a
        id={`archive-${entry.slug}`}
        className="archive-card-open"
        href={`?provider=design-md&design=${entry.slug}`}
        onFocus={(event) => {
          if (event.currentTarget.matches(":focus-visible")) autoPreview();
        }}
        onClick={(e) => {
          if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          onOpen();
        }}
      >
        <div className="archive-card-media">
          <img
            loading="lazy"
            width="480"
            height="300"
            src={`/design-archive/${entry.slug}/thumbnail.jpg`}
            alt=""
          />
          {active && !failed && (
            <video
              key={entry.slug}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster={`/design-archive/${entry.slug}/thumbnail.jpg`}
              src={entry.video}
              aria-hidden="true"
              className={playing ? "is-playing" : ""}
              onPlaying={() => setPlaying(true)}
              onError={() => setFailed(true)}
            />
          )}
        </div>
        <span className="archive-card-caption">
          <strong>{entry.name}</strong>
          <small>{new URL(entry.site_url).hostname}</small>
        </span>
      </a>
      {failed && (
        <span className="archive-preview-error" role="status">
          {zh ? "视频暂不可用" : "Video unavailable"}
        </span>
      )}
    </article>
  );
}
