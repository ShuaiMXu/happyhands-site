import {ResourceSearchCard,type SearchResult} from "./ResourceSearchCard";
import React from "react";
import "./resource-controls.css";

/** One browsing pattern shared by archive and component resources. */
export function ResourceToolbar({ label, placeholder, query, onQueryChange, status, children, results, suggestions }: {
  label: string; placeholder: string; query: string;
  onQueryChange: (value: string) => void;
  results?: SearchResult[]; status: string; children: React.ReactNode;
  suggestions?: string[];
}) {
  return <div className="resource-toolbar" role="search" aria-label={label}>
    <ResourceSearchCard label={label} placeholder={placeholder} query={query} onQueryChange={onQueryChange} results={results} suggestions={suggestions}/>
    <div className="resource-facets">{children}</div>
    <span className="resource-result-count" role="status">{status}</span>
  </div>;
}
