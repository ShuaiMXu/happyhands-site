import { Button } from "../packages/ui";
import React, { useEffect, useState } from "react";
export type ExportFile = { label: string; url: string; name: string };
export function ResourceExport({
  files,
  lang,
}: {
  files: ExportFile[];
  lang: string;
}) {
  const [active, setActive] = useState(0),
    [text, setText] = useState(""),
    [loading, setLoading] = useState(false),
    [error, setError] = useState(false),
    [notice, setNotice] = useState("");
  const file = files[active] || files[0],
    zh = lang === "zh";
  useEffect(() => {
    const c = new AbortController();
    setLoading(true);
    setText("");
    setError(false);
    setNotice("");
    fetch(file.url, { signal: c.signal })
      .then((r) => {
        if (!r.ok) throw Error();
        return r.text();
      })
      .then((value) => {
        if (!c.signal.aborted) setText(value);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError(true);
      })
      .finally(() => {
        if (!c.signal.aborted) setLoading(false);
      });
    return () => c.abort();
  }, [file.url]);
  return (
    <aside
      className="resource-export"
      aria-label={zh ? "规范文件" : "Guideline files"}
    >
      <div
        className="resource-export-tabs"
        role="tablist"
        aria-label={zh ? "文件格式" : "File format"}
      >
        {files.map((f, i) => (
          <button
            key={f.url}
            role="tab"
            aria-selected={i === active}
            aria-controls="resource-export-content"
            id={`resource-format-${i}`}
            tabIndex={i === active ? 0 : -1}
            onKeyDown={(e) => {
              if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
                e.preventDefault();
                const next =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? files.length - 1
                      : (i + (e.key === "ArrowRight" ? 1 : -1) + files.length) %
                        files.length;
                setActive(next);
                document.getElementById(`resource-format-${next}`)?.focus();
              }
            }}
            onClick={() => setActive(i)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="resource-export-actions">
        <span role="status">{notice}</span>
        <Button
          disabled={!text || loading || error}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(text);
              setNotice(zh ? "已复制" : "Copied");
            } catch {
              setNotice(zh ? "请选择正文复制" : "Select the text to copy");
            }
          }}
        >
          {zh ? "复制" : "Copy"}
        </Button>
        <a
          className="hh-button"
          data-variant="secondary"
          href={file.url}
          download={file.name}
        >
          {zh ? "下载" : "Download"}
        </a>
      </div>
      <pre
        id="resource-export-content"
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`resource-format-${active}`}
        aria-busy={loading}
      >
        {loading
          ? zh
            ? "加载中…"
            : "Loading…"
          : error
            ? zh
              ? "加载失败，请下载文件。"
              : "Could not load the file. Download is available."
            : text}
      </pre>
    </aside>
  );
}
