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
    document.addEventListener("visibilitychange", hide);
    return () => {
      observer.disconnect();
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
        if (
          e.pointerType === "mouse" &&
          !(e.target as Element).closest("button")
        )
          autoPreview();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") onPreview(null);
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
        onFocus={autoPreview}
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
      <button
        type="button"
        className="archive-card-play"
        aria-label={`${active ? (zh ? "停止预览" : "Stop preview") : zh ? "播放预览" : "Play preview"} ${entry.name}`}
        aria-pressed={active}
        onClick={() => onPreview(active ? null : entry.slug)}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          {active ? (
            <>
              <rect x="6" y="5" width="4" height="14" />
              <rect x="14" y="5" width="4" height="14" />
            </>
          ) : (
            <path d="m8 5 11 7-11 7z" />
          )}
        </svg>
      </button>
      {failed && (
        <span className="archive-preview-error" role="status">
          {zh ? "视频暂不可用" : "Video unavailable"}
        </span>
      )}
    </article>
  );
}
