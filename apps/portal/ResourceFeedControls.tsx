import React from "react";
import { ResourceToolbar } from "../../components/ResourceToolbar";
import { ArchiveFilter } from "../../components/ArchiveFilter";
import { Button } from "../../packages/ui";
export function ResourceFeedControls({
  zh,
  query,
  onQueryChange,
  category,
  onCategoryChange,
  options,
  count,
  loading,
  error,
  onRetry,
}: {
  zh: boolean;
  query: string;
  onQueryChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  options: { value: string; label: string; count: number }[];
  count: number;
  loading: boolean;
  error: boolean;
  onRetry: () => void;
}) {
  return (
    <ResourceToolbar
      label={zh ? "搜索资源" : "Search resources"}
      placeholder={
        zh ? "搜索名称、类型或关键词" : "Search names, categories or keywords"
      }
      query={query}
      onQueryChange={onQueryChange}
      status={
        loading
          ? zh
            ? "加载目录…"
            : "Loading catalog…"
          : error
            ? zh
              ? "目录加载失败"
              : "Catalog unavailable"
            : `${count} ${zh ? "个结果" : "results"}`
      }
    >
      {options.length > 1 && (
        <ArchiveFilter
          label={zh ? "资源分类" : "Resource category"}
          zh={zh}
          value={category}
          onChange={onCategoryChange}
          options={options}
        />
      )}
      {error && <Button onClick={onRetry}>{zh ? "重试" : "Retry"}</Button>}
    </ResourceToolbar>
  );
}
