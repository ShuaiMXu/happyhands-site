import React, { useMemo, useRef, useState } from "react";
import {
  extractTokens,
  resolveToken,
  type SpecimenToken,
} from "./specimen-model";
import { Input } from "../packages/ui";
import { ResourceLoadMore } from "./ResourceLoadMore";
import "./token-specimens.css";

const pageSize = 36;
export function TokenSpecimens({
  content,
  tokens,
  context,
  zh = false,
  bare = false,
}: {
  context?: string;
  content?: string;
  tokens?: SpecimenToken[];
  zh?: boolean;
  bare?: boolean;
}) {
  const all = useMemo(() => {
    if (tokens) return tokens;
    const own = extractTokens(content || "");
    if (own.length || !context) return own;
    const inherited = extractTokens(context);
    const names = new Set(
      [...(content || "").matchAll(/var\(\s*(--[\w-]+)/g)].map((m) => m[1]),
    );
    return names.size
      ? inherited.filter((t) => names.has(t.name))
      : /@import/.test(content || "")
        ? inherited
        : [];
  }, [content, tokens, context]);
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(pageSize);
  const [playing, setPlaying] = useState<string | null>(null);
  const list = useRef<HTMLDivElement>(null);
  const values = useMemo(() => Object.fromEntries(
    [...extractTokens(context || ""), ...all].map((t) => [t.name, t.value]),
  ), [all, context]);
  const term = query.trim().toLowerCase();
  const filtered = all.filter((t) =>
    (t.name + " " + t.value).toLowerCase().includes(term),
  );
  const visible = bare ? filtered : filtered.slice(0, shown);
  if (!all.length) return null;
  return (
    <section
      className="token-specimens"
      aria-label={zh ? "设计规范实物示例" : "Design token specimens"}
    >
      {!bare && (
        <div className="token-specimens-toolbar">
          <label>
            {zh ? "查找设计变量" : "Find a token"}
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShown(pageSize);
              }}
              type="search"
            />
          </label>
          {filtered.length > 0 && <span role="status">
            {visible.length} / {filtered.length}
          </span>}
        </div>
      )}
      <div className="token-specimens-grid" ref={list}>
        {visible.map((t) => {
          const value = resolveToken(t.value, values);
          const name = t.name.toLowerCase();
          const metadata =
            /(?:unit|family|axis-value|text-transform)$/.test(name) &&
            /^\d/.test(value);
          let view: React.ReactNode = null;
          if (
            !metadata &&
            CSS.supports("color", value) &&
            !["unset", "inherit", "initial", "currentcolor", "none"].includes(
              value.toLowerCase(),
            )
          )
            view = (
              <div
                className="token-sample-color"
                style={{ background: value }}
              />
            );
          else if (
            /(duration|dur-|motion.*time)/.test(name) &&
            CSS.supports("animation-duration", value)
          )
            view = (
              <button
                type="button"
                className="token-sample-motion"
                onClick={() =>
                  setPlaying((v) => (v === t.name ? null : t.name))
                }
                aria-label={zh ? "播放动效" : "Play motion"}
              >
                <span
                  style={{
                    transform:
                      playing === t.name ? "translateX(80px)" : "translateX(0)",
                    transitionDuration: value,
                  }}
                />
                {zh ? "播放" : "Play"}
              </button>
            );
          else if (
            /(ease|easing)/.test(name) &&
            CSS.supports("animation-timing-function", value)
          )
            view = (
              <button
                type="button"
                className="token-sample-motion"
                onClick={() =>
                  setPlaying((v) => (v === t.name ? null : t.name))
                }
                aria-label={zh ? "播放动效" : "Play motion"}
              >
                <span
                  style={{
                    transform:
                      playing === t.name ? "translateX(80px)" : "translateX(0)",
                    transitionTimingFunction: value,
                  }}
                />
                {zh ? "播放" : "Play"}
              </button>
            );
          else if (
            /opacity|alpha/.test(name) &&
            Number.isFinite(Number(value)) &&
            Number(value) >= 0 &&
            Number(value) <= 1
          )
            view = (
              <div
                className="token-sample-color"
                style={{ background: "currentColor", opacity: Number(value) }}
              />
            );
          else if (
            /shadow|elevation/.test(name) &&
            CSS.supports("box-shadow", value)
          )
            view = (
              <div className="token-sample-box" style={{ boxShadow: value }} />
            );
          else if (
            !metadata &&
            /radius|corner/.test(name) &&
            CSS.supports("border-radius", value)
          )
            view = (
              <div
                className="token-sample-box"
                style={{ borderRadius: value }}
              />
            );
          else if (/type-|typography/.test(name) && CSS.supports("font", value))
            view = (
              <div className="token-sample-type" style={{ font: value }}>
                Aa 字 0123
              </div>
            );
          else if (/font|type|tracking|line-height|weight/.test(name)) {
            const style: React.CSSProperties = {};
            if (/family|font-sans|font-mono/.test(name))
              style.fontFamily = value;
            else if (/size/.test(name) && CSS.supports("font-size", value))
              style.fontSize = value;
            else if (/weight/.test(name) && CSS.supports("font-weight", value))
              style.fontWeight = value;
            else if (
              /tracking|letter/.test(name) &&
              CSS.supports("letter-spacing", value)
            )
              style.letterSpacing = value;
            else if (
              /line-height/.test(name) &&
              CSS.supports("line-height", value)
            )
              style.lineHeight = value;
            view = (
              <div className="token-sample-type" style={style}>
                Aa 字 0123
              </div>
            );
          } else if (
            !metadata &&
            /space|gap|padding|margin|size|width|height/.test(name) &&
            CSS.supports("width", value)
          )
            view = (
              <div className="token-sample-measure">
                <span style={{ width: value, maxWidth: "100%" }} />
              </div>
            );
          else if (
            /border|stroke/.test(name) &&
            CSS.supports("border-width", value)
          )
            view = (
              <div
                className="token-sample-line"
                style={{ borderTopWidth: value }}
              />
            );
          return (
            <article key={t.name} tabIndex={bare ? undefined : -1}>
              {view}
              <div className="token-sample-caption">
                <code>{t.name}</code>
                <span>{t.value}</span>
                {value && value !== t.value && <small>{value}</small>}
              </div>
            </article>
          );
        })}
      </div>
      {!bare && <ResourceLoadMore
        list={list}
        shown={shown}
        total={filtered.length}
        lang={zh ? "zh" : "en"}
        onLoad={() => setShown((count) => count + pageSize)}
      />}
      {!filtered.length && (
        <p role="status">{zh ? "没有匹配的设计变量" : "No matching tokens"}</p>
      )}
    </section>
  );
}
