import React, { useState } from "react";
import "./resource-controls.css";
import { Combobox } from "@base-ui/react/combobox";

export type FilterOption = { value: string; label: string; count: number };

/** Searchable catalog facet; project form selects keep their native behavior. */
export function ArchiveFilter({ label, options, value, onChange, zh }: {
  label: string; options: FilterOption[]; value: string;
  onChange: (value: string) => void; zh: boolean;
}) {
  const [pointerOpen, setPointerOpen] = useState(false);
  return <Combobox.Root items={options} value={options.find(item => item.value === value) ?? null}
    isItemEqualToValue={(a, b) => a.value === b.value}
    onValueChange={item => onChange(item?.value ?? "")}>
    <Combobox.Trigger onPointerDown={() => setPointerOpen(true)} onKeyDown={() => setPointerOpen(false)} className="archive-filter-trigger" aria-label={`${label}: ${options.find(item => item.value === value)?.label ?? ""}`}>
      <Combobox.Value />
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor"><path d="m4 6 4 4 4-4" /></svg>
    </Combobox.Trigger>
    <Combobox.Portal>
      <Combobox.Positioner className="archive-filter-positioner" align="start" sideOffset={6} collisionPadding={16}>
        <Combobox.Popup data-pointer-open={pointerOpen || undefined} onKeyDown={event => { if (event.key === "Tab") setPointerOpen(false); }} className="archive-filter-popup" aria-label={label}>
          <Combobox.Input className="archive-filter-search" aria-label={zh ? `搜索${label}` : `Search ${label.toLowerCase()}`} placeholder={zh ? "搜索选项…" : "Search options…"} />
          <div className="archive-filter-viewport">
            <Combobox.Empty className="archive-filter-empty">{zh ? "没有匹配选项" : "No matching options"}</Combobox.Empty>
            <Combobox.List>
              {(item: FilterOption) => <Combobox.Item className="archive-filter-option" key={item.value} value={item}>
                <span>{item.label}</span><span className="archive-filter-count">{item.count}</span>
                <Combobox.ItemIndicator className="archive-filter-check"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor"><path d="m3 8 3 3 7-7" /></svg></Combobox.ItemIndicator>
              </Combobox.Item>}
            </Combobox.List>
          </div>
        </Combobox.Popup>
      </Combobox.Positioner>
    </Combobox.Portal>
  </Combobox.Root>;
}
