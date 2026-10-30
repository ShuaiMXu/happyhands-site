import {Tabs,TabsList,TabsTrigger,TabsContent} from "../packages/ui/shadcn/tabs";
import {Button as LinkButton} from "../packages/ui/shadcn/button";
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
    [retry, setRetry] = useState(0),
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
    if (!file) { setLoading(false); return () => c.abort(); }
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
  }, [file?.url, retry]);
  if (!file) return null;
  return (
    <aside
      className="resource-export"
      aria-label={zh ? "规范文件" : "Guideline files"}
    >
      <Tabs value={String(active)} onValueChange={v=>setActive(Number(v))}>
      <TabsList variant="line" className="resource-export-tabs" aria-label={zh?'文件格式':'File format'}>{files.map((f,i)=><TabsTrigger key={f.url} value={String(i)}>{f.label}</TabsTrigger>)}</TabsList>
      <TabsContent value={String(active)}>
      <div className="resource-export-actions">
        <span role="status">{notice}</span>
        {error && <Button onClick={() => setRetry(value => value + 1)}>{zh ? "重试" : "Retry"}</Button>}
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
        <LinkButton asChild variant="secondary"><a
          href={file.url}
          download={file.name}
        >
          {zh ? "下载" : "Download"}
        </a></LinkButton>
      </div>
      <pre
        tabIndex={0}
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
      </TabsContent></Tabs>
    </aside>
  );
}
