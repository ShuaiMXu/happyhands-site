import {ResourceSearchCard,type SearchResult} from "./ResourceSearchCard";
import React from "react";
import "./resource-controls.css";

/** One browsing pattern shared by archive and component resources. */
export function ResourceToolbar({ label, placeholder, query, onQueryChange, status, children, results }: {
  label: string; placeholder: string; query: string;
  onQueryChange: (value: string) => void;
  results?: SearchResult[]; status: string; children: React.ReactNode;
}) {
  return <div className="resource-toolbar" role="search" aria-label={label}>
    <ResourceSearchCard label={label} placeholder={placeholder} query={query} onQueryChange={onQueryChange} results={results} status={status}/>
    <div className="resource-facets">{children}</div>
    <span className="resource-result-count" role="status">{status}</span>
  </div>;
}
