/** @jsxImportSource @solidjs/web */
import { For, createMemo } from 'solid-js';
import {
  Select, SelectContent, SelectEmpty, SelectInput, SelectItem,
  SelectItemIndicator, SelectList, SelectTrigger,
} from '@ui-sdk/solid/select';
import { mountSolidControl } from '../packages/ui/mount-solid-control';
import './resource-controls.css';

export type FilterOption = { value: string; label: string; count: number };

type FilterProps = {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  zh: boolean;
};

function ArchiveFilter(props: { data: FilterProps }) {
  const selected = createMemo(() =>
    props.data.options.find(option => option.value === props.data.value),
  );
  return (
    <Select<string>
      value={props.data.value}
      onValueChange={value => props.data.onChange(value ?? '')}
      modal={false}
    >
      <SelectTrigger
        class="archive-filter-trigger"
        data-filter-active={String(Boolean(props.data.value))}
        aria-label={`${props.data.label}: ${selected()?.label ?? ''}`}
      >
        <span>{selected()?.label ?? props.data.label}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </SelectTrigger>
      <SelectContent class="archive-filter-popup archive-sdk-select" align="start" alignItemWithTrigger={false} sideOffset={8} collisionPadding={16}>
        <SelectInput
          class="archive-filter-search"
          aria-label={props.data.zh ? `搜索${props.data.label}` : `Search ${props.data.label.toLowerCase()}`}
          placeholder={props.data.zh ? '搜索选项…' : 'Search options…'}
        />
        <SelectEmpty class="archive-filter-empty">
          {props.data.zh ? '没有匹配选项' : 'No matching options'}
        </SelectEmpty>
        <SelectList class="archive-filter-viewport" aria-label={props.data.label}>
          <For each={props.data.options} keyed={false}>
            {item => (
              <SelectItem value={item().value} label={item().label} class="archive-filter-option">
                <span>{item().label}</span>
                <span class="archive-filter-count" aria-hidden="true">{item().count}</span>
                <SelectItemIndicator class="archive-filter-check" aria-hidden="true">✓</SelectItemIndicator>
              </SelectItem>
            )}
          </For>
        </SelectList>
      </SelectContent>
    </Select>
  );
}

export function mountArchiveFilter(element: HTMLElement, initial: FilterProps) {
  return mountSolidControl(element, initial, props => <ArchiveFilter data={props()} />);
}
