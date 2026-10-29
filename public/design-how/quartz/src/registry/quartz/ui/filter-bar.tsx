'use client';

import * as React from 'react';
import {Menu as MenuPrimitive} from '@base-ui/react/menu';
import {Icon, Add, Checkmark} from '@/components/quartz/icon';
import type {Kind} from '@/lib/quartz/kind';
import {useQuartzPortal} from '@/lib/quartz/portal';
import {overlayMotion, overlaySurface} from '@/lib/quartz/overlay';
import {cn} from '@/lib/quartz/utils';
import {Chip, ChipButton, ChipGroupContext, type ChipProps} from '@/components/quartz/ui/chip';
import {Input, type SearchModeProps} from '@/components/quartz/ui/input';

// Quartz's filter bar: the row above a list or table that narrows it. One row of separate 28px controls, 8px
// apart, each on its own edge like any field or chip: the search grows ("/" focuses it from anywhere, Escape
// clears it), then the filter menus (FilterBarSelect, was Dropdown select) and the quick filters that sit pressed
// (FilterToggle). The count and Clear all sit at the row's end and the count drops out when the row is narrow;
// applied filters go on a second row as removable chips. Passed to DataTable's toolbar, the row sits in the
// table's 40px toolbar band, its controls 6px from the band's rules.
//
// The detail that comes from the job: each option in a filter menu shows how many rows it would leave,
// counted against the search, every other filter and every pressed toggle, not against the whole list. An
// option that would leave nothing sinks below a divider and dims, so a person sees before picking that it
// empties the table. useFilteredRows computes the rows and those facet counts in one pass.

// The controls: separate, each on its own edge, wrapping to a second line before anything squeezes.
const stripClassName = 'flex min-w-0 flex-1 flex-wrap items-center gap-2';

/** Whether a child goes in the strip: the search, the filter menus and the quick filters. */
const inStrip = (child: React.ReactNode) => React.isValidElement(child) && (child.type === FilterBarSearch || child.type === FilterBarSelect || child.type === FilterToggle);

function FilterBar({className, children, ...props}: React.ComponentProps<'div'>) {
  const strip: React.ReactNode[] = [];
  const rest: React.ReactNode[] = [];
  React.Children.forEach(children, child => { (inStrip(child) ? strip : rest).push(child); });
  return <div
    role="search"
    data-slot="filter-bar"
    className={cn(
      '@container flex w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-2 in-data-[slot=table-toolbar]:px-2 in-data-[slot=table-toolbar]:py-1.5',
      // The count and Clear all keep the row's end; the count goes when the row is too narrow to hold it beside the controls.
      '[&>[data-slot=filter-bar-count]]:ms-auto @max-lg:[&>[data-slot=filter-bar-count]]:hidden',
      className,
    )}
    {...props}
  >
    {strip.length > 0 && <ChipGroupContext.Provider value="wrap">
      <div data-slot="filter-bar-strip" className={stripClassName}>{strip}</div>
    </ChipGroupContext.Provider>}
    {rest}
  </div>;
}

// ---------- Search ----------

type FilterBarSearchProps = Omit<SearchModeProps, 'mode' | 'value' | 'defaultValue' | 'onValueChange' | 'shortcut' | 'shortcutOwner'> & {
  value: string;
  onValueChange: (value: string) => void;
  /** Press this key anywhere outside a field, dialog or menu to focus the search. null turns it off. */
  shortcut?: string | null;
};

/** The bar's search: Input's search mode at 28px, named by its placeholder, filling the strip up to --search-max. */
function FilterBarSearch({shortcut = '/', placeholder = 'Search', size = 'sm', className, 'aria-label': ariaLabel, ...props}: FilterBarSearchProps) {
  return <Input
    mode="search"
    size={size}
    shortcut={shortcut ?? undefined}
    placeholder={placeholder}
    aria-label={ariaLabel ?? placeholder}
    aria-keyshortcuts={shortcut ?? undefined}
    className={cn('min-w-(--search-min) flex-1 max-w-(--search-max)', className)}
    {...props}
  />;
}

// ---------- Chips and toggles ----------

/** Holds the applied filter chips on their own row, 4px apart; gives removal its focus scope. `row` makes it a 40px toolbar row inset 8px, for the second row under a frame's toolbar. */
function FilterBarChips({row, className, ...props}: React.ComponentProps<'div'> & {row?: boolean}) {
  return <div data-slot="chip-group" className={cn('flex min-w-0 flex-wrap items-center gap-1', row && 'min-h-(--row) px-2 py-2', className)} {...props}/>;
}

type FilterChipProps = Omit<React.ComponentProps<'span'>, 'children' | 'onChange'> & {
  /** The field: "Status", "Agent". */
  label: string;
  /** The value: "Failed", "support-agent". Several values read "a, b". */
  value: React.ReactNode;
  /** The value names a kind. Sets data-kind on the chip. */
  kind?: Kind;
  onRemove: () => void;
};

/**
 * An applied filter, "Status Failed", that the person can remove. Focus moves to the next chip after. When
 * the last chip goes (and often its row with it), focus returns to the select that set the filter, found
 * by its data-filter label, instead of falling to the page.
 */
function FilterChip({label, value, kind, onRemove, ...props}: FilterChipProps) {
  const remove = () => {
    // Find the select while the chip is still in the document; after removal it is detached.
    let select: HTMLElement | null = null;
    for (let scope = (document.activeElement as HTMLElement | null)?.parentElement; scope && !select; scope = scope.parentElement) {
      select = scope.querySelector<HTMLElement>(`[data-slot=filter-bar-select][data-filter="${CSS.escape(label)}"]`);
    }
    onRemove();
    // Chip moves focus to a sibling in the next frame; land only if nothing took it.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (document.activeElement && document.activeElement !== document.body) return;
      if (select?.isConnected) select.focus();
    }));
  };
  return <Chip onRemove={remove} removeLabel={`Remove ${label} filter`} kind={kind} data-filter={label} {...(props as object)}>
    <span className="text-text-2">{label}</span> {value}
  </Chip>;
}

/** A quick filter that sits pressed: "Failed only", "Mine". A Chip, so it reads like every other toggle. */
function FilterToggle(props: Extract<ChipProps, {onRemove?: undefined}>) {
  return <Chip data-filter-toggle="" {...props}/>;
}

/** Clears everything. It unmounts once nothing is set, so focus moves to the bar's search afterwards. */
function FilterBarClear({className, children = 'Clear all', onClick, ...props}: React.ComponentProps<'button'>) {
  return <button
    type="button"
    data-slot="filter-bar-clear"
    onClick={event => {
      const bar = event.currentTarget.closest('[data-slot=filter-bar]');
      onClick?.(event);
      requestAnimationFrame(() => {
        if (document.activeElement && document.activeElement !== document.body) return;
        bar?.querySelector<HTMLElement>('[data-mode=search] [data-control], [data-slot=filter-bar-select]')?.focus();
      });
    }}
    className={cn('inline-flex h-(--control-sm) items-center rounded-soft px-2 type-label text-text-2 underline-offset-4 decoration-1 transition-colors duration-(--dur-fast) ease-(--ease-step) hover:text-text-1 hover:underline', className)}
    {...props}
  >{children}</button>;
}

/**
 * "128 of 1,204 conversations". Put it in the bar or above the list. The visible count updates at once; the
 * announcement waits until typing pauses for 500ms, so a screen reader hears one count, not one per key.
 */
function FilterBarCount({shown, total, noun, className, ...props}: React.ComponentProps<'div'> & {shown: number; total: number; noun?: string}) {
  const f = (n: number) => n.toLocaleString('en-US');
  const text = shown === total ? `${f(total)}${noun ? ` ${noun}` : ''}` : `${f(shown)} of ${f(total)}${noun ? ` ${noun}` : ''}`;
  const [said, setSaid] = React.useState(text);
  React.useEffect(() => {
    const id = window.setTimeout(() => setSaid(text), 500);
    return () => window.clearTimeout(id);
  }, [text]);
  // plaintext keeps "48 of 240 conversations" in its own order on a right-to-left page.
  // A div, not a p: the count sits in a flex row, and a user's paragraph spacing would push it off the row's line.
  return <div data-slot="filter-bar-count" className={cn('type-body-sm whitespace-nowrap text-text-3 data [unicode-bidi:plaintext]', className)} {...props}>
    <span aria-hidden>{shown === total ? <><span className="text-text-1">{f(total)}</span> {noun}</> : <><span className="text-text-1">{f(shown)}</span> of {f(total)}{noun ? ` ${noun}` : ''}</>}</span>
    <span role="status" className="sr-only">{said}</span>
  </div>;
}

// ---------- Select (was Dropdown select) ----------

type FilterOption = {
  value: string;
  label: React.ReactNode;
  /** Plain text for the trigger and the accessible name when label is not a string. */
  textValue?: string;
  /** How many rows this option leaves, against the other filters. From useFilteredRows. */
  count?: number;
  /** The option is a kind. */
  kind?: Kind;
  /** The option is a status. Its label is the status word. */
  status?: 'idle' | 'queued' | 'running' | 'ok' | 'warn' | 'fail' | 'waiting';
  disabled?: boolean;
};

type FilterBarSelectBase = {
  /** The filter's name, on the chip and in the accessible name. */
  label: string;
  options: FilterOption[];
  /** Adds an "All" item at the top that clears the filter. */
  showAllOption?: boolean;
  allLabel?: string;
  /** Sink options whose count is 0 below a divider. On when any option has a count. */
  sinkEmpty?: boolean;
  /**
   * Show the choice on the trigger ("Status: Failed", or a count). Turn it off when applied-filter chips
   * already show the values, so a filter never reads twice; the filled trigger still says it is set.
   */
  showValue?: boolean;
  size?: 'xs' | 'sm' | 'default';
  disabled?: boolean;
  className?: string;
};
type FilterBarSelectSingle = FilterBarSelectBase & {multiple?: false; value?: string | null; defaultValue?: string | null; onValueChange?: (value: string | null) => void};
type FilterBarSelectMultiple = FilterBarSelectBase & {multiple: true; value?: string[]; defaultValue?: string[]; onValueChange?: (value: string[]) => void};
type FilterBarSelectProps = FilterBarSelectSingle | FilterBarSelectMultiple;

const ALL = '__all__';
const optionText = (o: FilterOption) => o.textValue ?? (typeof o.label === 'string' ? o.label : o.value);

function useControllable<T>(value: T | undefined, defaultValue: T, onChange?: (v: T) => void) {
  const [inner, setInner] = React.useState<T>(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? value : inner;
  const set = (v: T) => { if (!controlled) setInner(v); onChange?.(v); };
  return [current, set] as const;
}

// The popup and its rows are styles.css's menu-popup and menu-item, so every list popup in Quartz reads the same. The check
// sits at the end, as in Select, so a row reserves 32px there.
const popupClassName = cn('menu-popup max-h-[min(var(--available-height),var(--popup-max))]', overlaySurface, overlayMotion);
const itemClassName = 'menu-item pe-8 data-[empty]:text-text-3';
const indicatorClassName = 'pointer-events-none absolute end-2 flex size-4 items-center justify-center';
function OptionBody({option}: {option: FilterOption}) {
  return <>
    <span className="min-w-0 flex-1 truncate">{option.label}</span>
    {option.count !== undefined && <span data-slot="filter-option-count" className="type-label-sm data text-text-3">{option.count.toLocaleString('en-US')}</span>}
  </>;
}

/**
 * A filter on a chip that opens a checkable menu. Names the filter while nothing is chosen ("Status"),
 * shows the choice once one is ("Status: Failed", or a count for several), and takes the selected wash while it
 * narrows the list. Single uses radio items and closes on pick; multiple uses checkbox items and stays
 * open. Options with a count of 0 sink below a divider.
 */
function FilterBarSelect(props: FilterBarSelectProps) {
  const {label, options, showAllOption = false, allLabel = 'All', size = 'default', disabled, className, showValue = true} = props;
  const container = useQuartzPortal();
  const [single, setSingle] = useControllable<string | null>(props.multiple ? undefined : props.value, props.multiple ? null : props.defaultValue ?? null, props.multiple ? undefined : props.onValueChange);
  const [many, setMany] = useControllable<string[]>(props.multiple ? props.value : undefined, props.multiple ? props.defaultValue ?? [] : [], props.multiple ? props.onValueChange : undefined);

  const chosen = props.multiple ? many : single ? [single] : [];
  const active = chosen.length > 0;
  const first = options.find(o => o.value === chosen[0]);
  const summary = !active || !showValue ? null : chosen.length > 1 ? null : first ? optionText(first) : null;
  const accessibleName = `${label}: ${!active ? allLabel : options.filter(o => chosen.includes(o.value)).map(optionText).join(', ')}`;

  const sink = props.sinkEmpty ?? options.some(o => o.count !== undefined);
  const live = sink ? options.filter(o => o.count !== 0 || chosen.includes(o.value)) : options;
  const empty = sink ? options.filter(o => o.count === 0 && !chosen.includes(o.value)) : [];

  const renderItem = (o: FilterOption, isEmpty = false) => props.multiple
    ? <MenuPrimitive.CheckboxItem
        key={o.value}
        data-slot="filter-option"
        data-empty={isEmpty || undefined}
        disabled={o.disabled || isEmpty}
        className={itemClassName}
        checked={many.includes(o.value)}
        onCheckedChange={c => setMany(c ? [...many, o.value] : many.filter(v => v !== o.value))}
        closeOnClick={false}
      >
        <OptionBody option={o}/>
        <MenuPrimitive.CheckboxItemIndicator className={indicatorClassName}><Icon icon={Checkmark} size={16}/></MenuPrimitive.CheckboxItemIndicator>
      </MenuPrimitive.CheckboxItem>
    : <MenuPrimitive.RadioItem key={o.value} value={o.value} closeOnClick disabled={o.disabled || isEmpty} data-slot="filter-option" data-empty={isEmpty || undefined} className={itemClassName}>
        <OptionBody option={o}/>
        <MenuPrimitive.RadioItemIndicator className={indicatorClassName}><Icon icon={Checkmark} size={16}/></MenuPrimitive.RadioItemIndicator>
      </MenuPrimitive.RadioItem>;

  const sunkBody = <>
    <MenuPrimitive.GroupLabel className="menu-label">No rows with the other filters</MenuPrimitive.GroupLabel>
    {empty.map(o => renderItem(o, true))}
  </>;
  // GroupLabel needs a group: a Group of its own in multiple mode; the RadioGroup already is one.
  const sunk = empty.length > 0 && <>
    <MenuPrimitive.Separator className="menu-separator"/>
    {props.multiple ? <MenuPrimitive.Group>{sunkBody}</MenuPrimitive.Group> : sunkBody}
  </>;

  return <MenuPrimitive.Root>
    <MenuPrimitive.Trigger
      disabled={disabled}
      aria-label={accessibleName}
      render={<ChipButton chevron size={size} count={showValue && props.multiple && chosen.length > 1 ? chosen.length : undefined}/>}
      data-slot="filter-bar-select"
      data-filter={label}
      data-active={active || undefined}
      className={className}
    >
      {summary != null ? `${label}: ${summary}` : label}
    </MenuPrimitive.Trigger>
    <MenuPrimitive.Portal container={container}>
      <MenuPrimitive.Positioner sideOffset={4} align="start" collisionPadding={8} className="isolate z-(--z-overlay) outline-none">
        <MenuPrimitive.Popup data-slot="filter-bar-select-content" className={cn(popupClassName, 'min-w-[max(var(--anchor-width),var(--menu-min))] max-w-[min(var(--available-width),var(--popover))]')}>
          {props.multiple
            ? <>
                {showAllOption && <>
                  <MenuPrimitive.CheckboxItem className={itemClassName} checked={!active} onCheckedChange={() => setMany([])} closeOnClick={false}>
                    {allLabel}
                    <MenuPrimitive.CheckboxItemIndicator className={indicatorClassName}><Icon icon={Checkmark} size={16}/></MenuPrimitive.CheckboxItemIndicator>
                  </MenuPrimitive.CheckboxItem>
                  <MenuPrimitive.Separator className="menu-separator"/>
                </>}
                {live.map(o => renderItem(o))}
                {sunk}
              </>
            : <MenuPrimitive.RadioGroup value={single ?? ALL} onValueChange={v => setSingle(v === ALL ? null : v as string)}>
                {showAllOption && <>
                  <MenuPrimitive.RadioItem value={ALL} closeOnClick className={itemClassName}>
                    {allLabel}
                    <MenuPrimitive.RadioItemIndicator className={indicatorClassName}><Icon icon={Checkmark} size={16}/></MenuPrimitive.RadioItemIndicator>
                  </MenuPrimitive.RadioItem>
                  <MenuPrimitive.Separator className="menu-separator"/>
                </>}
                {live.map(o => renderItem(o))}
                {sunk}
              </MenuPrimitive.RadioGroup>}
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  </MenuPrimitive.Root>;
}

// ---------- Add filter ----------

type FilterBarAddProps = {
  /** The field: "Method", "Code". On the dashed chip after a plus, and on the filled chip before the value. */
  label: string;
  /** The values to pick from. Each may carry a count, like FilterBarSelect's. */
  options: FilterOption[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  size?: 'xs' | 'sm' | 'default';
  disabled?: boolean;
  className?: string;
};

/**
 * A filter that is not on yet: a chip with a dashed edge and a plus, "+ Method". It opens a menu of values; picking
 * one turns it into the filled chip "Method: POST" with a remove button, and removing that puts the dashed chip back
 * and returns focus to it. A row of these says which fields can narrow the list; a row of applied chips says which do.
 * Put them in FilterBarChips or a ChipGroup. One value per field; use FilterBarSelect for several.
 */
function FilterBarAdd({label, options, size = 'default', disabled, className, ...props}: FilterBarAddProps) {
  const container = useQuartzPortal();
  const [value, setValue] = useControllable<string | null>(props.value, props.defaultValue ?? null, props.onValueChange);
  const trigger = React.useRef<HTMLButtonElement>(null);
  const chosen = options.find(o => o.value === value);
  if (chosen) return <Chip
    size={size}
    data-slot="filter-bar-add-value"
    data-filter={label}
    onRemove={() => setValue(null)}
    removeLabel={`Remove ${label} filter`}
    focusAfterEmpty={trigger}
    className={className}
  ><span className="text-text-2">{label}:</span> {optionText(chosen)}</Chip>;
  return <MenuPrimitive.Root>
    <MenuPrimitive.Trigger
      ref={trigger}
      disabled={disabled}
      aria-label={`Add ${label} filter`}
      render={<ChipButton size={size}/>}
      data-slot="filter-bar-add"
      data-filter={label}
      className={cn('bg-transparent shadow-none text-text-2 hover:not-data-disabled:text-text-1 before:border-dashed [--frame-color:var(--line-control-hover)]', className)}
    >
      <Icon icon={Add} size={12} data-slot="chip-icon"/>
      {label}
    </MenuPrimitive.Trigger>
    <MenuPrimitive.Portal container={container}>
      <MenuPrimitive.Positioner sideOffset={4} align="start" collisionPadding={8} className="isolate z-(--z-overlay) outline-none">
        <MenuPrimitive.Popup data-slot="filter-bar-add-content" className={cn(popupClassName, 'min-w-[max(var(--anchor-width),var(--menu-min))] max-w-[min(var(--available-width),var(--popover))]')}>
          <MenuPrimitive.RadioGroup value={value ?? ''} onValueChange={v => setValue(v as string)}>
            {options.map(o => <MenuPrimitive.RadioItem key={o.value} value={o.value} closeOnClick disabled={o.disabled} data-slot="filter-option" className={itemClassName}>
              <OptionBody option={o}/>
              <MenuPrimitive.RadioItemIndicator className={indicatorClassName}><Icon icon={Checkmark} size={16}/></MenuPrimitive.RadioItemIndicator>
            </MenuPrimitive.RadioItem>)}
          </MenuPrimitive.RadioGroup>
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  </MenuPrimitive.Root>;
}

// ---------- Facets ----------

type FacetField<T> = {
  /** The filter id, the key in `filters` and in the returned counts. */
  id: string;
  /** The row's value or values for this field. */
  value: (row: T) => string | readonly string[];
};

/**
 * Filters rows by a search and any number of multi-value filters, and counts, for every option of every
 * field, how many rows it would leave given the search and the other filters. Feed the counts to
 * FilterBarSelect options.
 */
function useFilteredRows<T>(rows: readonly T[], {search = '', match, fields, filters, where}: {
  search?: string;
  /**
   * Pressed toggles ("Mine", "Failed only") as row tests. A row must pass every one to show or to count,
   * so facet counts agree with what a pick would leave. Pass a stable array (useMemo); falsy entries are off.
   */
  where?: readonly (((row: T) => boolean) | false | null | undefined)[];
  /** Whether a row matches the search. Lower-cased query in. */
  match?: (row: T, query: string) => boolean;
  fields: FacetField<T>[];
  /** Field id to chosen values. An empty list or a missing field filters nothing. */
  filters: Record<string, readonly string[] | null | undefined>;
}) {
  return React.useMemo(() => {
    const q = search.trim().toLowerCase();
    const values = (f: FacetField<T>, row: T) => { const v = f.value(row); return typeof v === 'string' ? [v] : v; };
    const passes = (f: FacetField<T>, row: T) => { const chosen = filters[f.id]; return !chosen?.length || values(f, row).some(v => chosen.includes(v)); };
    const counts: Record<string, Record<string, number>> = Object.fromEntries(fields.map(f => [f.id, {}]));
    const out: T[] = [];
    const tests = (where ?? []).filter((t): t is (row: T) => boolean => typeof t === 'function');
    for (const row of rows) {
      if (q && match && !match(row, q)) continue;
      if (!tests.every(t => t(row))) continue;
      const pass = fields.map(f => passes(f, row));
      if (pass.every(Boolean)) out.push(row);
      fields.forEach((f, i) => {
        // A row counts toward this field's options when it passes every other field.
        if (!pass.every((p, j) => j === i || p)) return;
        for (const v of values(f, row)) counts[f.id][v] = (counts[f.id][v] ?? 0) + 1;
      });
    }
    return {rows: out, counts};
  }, [rows, search, match, fields, filters, where]);
}

export {
  FilterBar, FilterBarSearch, FilterBarChips, FilterChip, FilterToggle, FilterBarSelect, FilterBarAdd, FilterBarClear, FilterBarCount, useFilteredRows,
  type FilterBarSearchProps, type FilterBarAddProps, type FilterBarSelectProps, type FilterChipProps, type FilterOption, type FacetField,
};
