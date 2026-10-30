import { Input } from "../packages/ui";
import React, { useState } from "react";
import "./resource-controls.css";

/** One browsing pattern shared by archive and component resources. */
export function ResourceToolbar({ label, placeholder, query, onQueryChange, status, children }: {
  label: string; placeholder: string; query: string;
  onQueryChange: (value: string) => void;
  status: string; children: React.ReactNode;
}) {
  const [pointerFocus, setPointerFocus] = useState(false);
  return <div className="resource-toolbar" role="search" aria-label={label}>
    <label className="resource-search">
      <span className="resource-search-label">{label}</span>
      <svg className="resource-search-icon" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg>
      <Input type="search" data-pointer-focus={pointerFocus || undefined}
        onPointerDown={() => setPointerFocus(true)} onBlur={() => setPointerFocus(false)}
        value={query} placeholder={placeholder}
        onChange={event => onQueryChange(event.target.value)} />
    </label>
    <div className="resource-facets">{children}</div>
    <span className="resource-result-count" role="status">{status}</span>
  </div>;
}
