'use client';

import * as React from 'react';
import {Combobox as ComboboxPrimitive} from '@base-ui/react/combobox';
import {Icon, ChevronDown, Checkmark, CircleDash, Search, Add, Close} from '@/components/quartz/icon';
import {fieldBoxVariants, useFieldDisabled, type ControlSize} from '@/components/quartz/ui/field';
import {fieldActionClass} from '@/components/quartz/ui/input/parts';
import {useQuartzPortal} from '@/lib/quartz/portal';
import {cn, mergeClass, mergeRefs} from '@/lib/quartz/utils';
import {listGroupLabelClassName, listItemClassName, listPopupClassName, listSeparatorClassName} from '@/components/quartz/ui/select';
import {Kbd} from '@/components/quartz/ui/kbd';
import {CodeTag} from '@/components/quartz/ui/badge';
import {Empty} from '@/components/quartz/ui/empty-state';

// Quartz's combobox, on Base UI's Combobox: a searchable choice from a long list, single
// or multiple. With `multiple creatable` it also takes values that are not in the list, which is how it
// absorbed Tag input and Email list input: free entry becomes chips, Enter or a delimiter commits, a paste
// splits into many, and Backspace in an empty field removes the last chip. `preset="email"` adds email
// splitting, normalising and validation.
//
// The considered detail: the create row previews the value exactly as it will be committed, after
// normalising, with its verdict. Typing " Ada <ADA@Acme.example>" shows "Add ada@acme.example"; typing "ada@team"
// shows the reason it will fail before Enter. A pasted list keeps its invalid entries as marked chips, so
// nothing the person pasted disappears.
//
// The field is the shared field box; the popup is the same paper list as Select.

// The list popup and items are Select's, so every list overlay in Quartz is one style. The combobox
// popup holds its own input and list, so it drops Select's 4px padding.
const popupClassName = cn(listPopupClassName, 'p-0');
const itemClassName = listItemClassName;

// ---------- creatable ----------

const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

/** "Ada <ada@acme.example>" and " ADA@Acme.example " both become "ada@acme.example". */
function normalizeEmail(raw: string) {
  const angle = raw.match(/<([^>]+)>/);
  return (angle ? angle[1] : raw).trim().replace(/^mailto:/i, '').toLowerCase();
}

/**
 * Pulls the address out of every "Name <address>" first, then splits on commas, semicolons and space. A
 * quoted name may hold a comma, which is how a mail client copies "Lovelace, Ada" <ada@acme.example>, so quotes match as
 * a unit.
 */
function splitEmails(text: string) {
  return text.replace(/(?:"[^"]*"|[^"<>,;\n])*<([^>]+)>/g, ' $1 ').split(/[\s,;]+/);
}

function validateEmail(email: string) {
  return EMAIL.test(email) ? null : 'Not an email address';
}

type CreatableOptions = {
  /** Clean text before it becomes a value: trim, lowercase. Return '' to drop it. */
  normalize?: (raw: string) => string;
  /** A message for an invalid value, or nothing. Invalid values stay, marked, so the person can fix them. */
  validate?: (value: string, all: string[]) => string | null | undefined;
  /** Splits pasted text into values. Default: commas and new lines. */
  split?: (text: string) => string[];
  /** Keys that commit the typed text, besides Enter. Default [","]. */
  delimiters?: string[];
};

const presets: Record<'email', Required<CreatableOptions>> = {
  email: {normalize: normalizeEmail, validate: (v) => validateEmail(v), split: splitEmails, delimiters: [',', ';', ' ']},
};

type ComboboxContextValue = {
  creatable: boolean;
  pending: boolean;
  query: string;
  preview: string;
  previewError: string | null;
  canCreate: boolean;
  duplicate: boolean;
  commit: (raw: string[]) => void;
  errorOf: (value: string) => string | null;
  invalidCount: number;
  onChipsKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChipsPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  announce: string;
  /** The list is drawn in place, open, with no popup around it. */
  inline: boolean;
  /** A value that was typed again; its chip flashes. */
  repeated: string;
};

const idle: ComboboxContextValue = {
  creatable: false, pending: false, query: '', preview: '', previewError: null, canCreate: false, duplicate: false, commit: () => {}, errorOf: () => null,
  invalidCount: 0, onChipsKeyDown: () => {}, onChipsPaste: () => {}, announce: '', inline: false, repeated: '',
};
const ComboboxContext = React.createContext<ComboboxContextValue>(idle);

type ComboboxExtra = CreatableOptions & {
  /** With `multiple`, values not in `items` can be added. String values only. */
  creatable?: boolean;
  /** A creatable preset: "email" splits, normalises and validates addresses. */
  preset?: 'email';
  /** Results are loading. The list says so instead of "No results" (trap/select-async). */
  pending?: boolean;
};

type ComboboxProps<Value, Multiple extends boolean | undefined = false, Item = Value> = ComboboxPrimitive.Root.Props<Value, Multiple, Item> & ComboboxExtra;

function Combobox<Value, Multiple extends boolean | undefined = false, Item = Value>(props: ComboboxProps<Value, Multiple, Item>) {
  const {creatable = false, preset, normalize, validate, split, delimiters, pending = false, ...root} = props;
  const opts: Required<CreatableOptions> = {
    normalize: normalize ?? (preset ? presets[preset].normalize : (raw: string) => raw.trim()),
    validate: validate ?? (preset ? presets[preset].validate : () => null),
    split: split ?? (preset ? presets[preset].split : (text: string) => text.split(/[,\n]+/)),
    delimiters: delimiters ?? (preset ? presets[preset].delimiters : [',']),
  };
  const r = root as ComboboxPrimitive.Root.Props<string, true>;
  const [innerValue, setInnerValue] = React.useState<string[]>((r.defaultValue as string[] | undefined) ?? []);
  const value = (r.value as string[] | undefined) ?? innerValue;
  const [innerQuery, setInnerQuery] = React.useState((r.defaultInputValue as string | undefined) ?? '');
  const query = typeof r.inputValue === 'string' ? r.inputValue : innerQuery;
  const highlighted = React.useRef<unknown>(undefined);
  const [announce, setAnnounce] = React.useState('');
  const [repeated, setRepeated] = React.useState('');
  const inline = !!(root as {inline?: boolean}).inline;

  if (!creatable) {
    return <ComboboxContext.Provider value={{...idle, pending, inline}}>
      <ComboboxPrimitive.Root {...(root as ComboboxPrimitive.Root.Props<Value, Multiple, Item>)}/>
    </ComboboxContext.Provider>;
  }

  const setValue = (next: string[]) => {
    if (r.value === undefined) setInnerValue(next);
    (r.onValueChange as ((v: string[], d: unknown) => void) | undefined)?.(next, undefined);
  };
  const setQuery = (next: string) => {
    if (typeof r.inputValue !== 'string') setInnerQuery(next);
    (r.onInputValueChange as ((v: string, d: unknown) => void) | undefined)?.(next, undefined);
  };

  const items = (r.items as string[] | undefined) ?? [];
  const preview = opts.normalize(query);
  const previewError = preview ? opts.validate(preview, value) ?? null : null;
  const lower = (v: string) => v.toLowerCase();
  const known = items.some(i => lower(String(i)) === lower(preview));
  const duplicate = !!preview && value.some(v => lower(v) === lower(preview));
  const canCreate = !!preview && !known && !duplicate;

  // Compared without case, and a typed value that names a list item commits that item's own spelling, so
  // "VIP" never becomes a second "vip" chip and "ESCALATION" selects "escalation".
  const commit = (raws: string[]) => {
    const fresh: string[] = [];
    let skipped = '';
    for (const raw of raws) {
      const typed = opts.normalize(raw);
      if (!typed) continue;
      const v = items.find(i => lower(String(i)) === lower(typed)) ?? typed;
      if (value.some(x => lower(x) === lower(v)) || fresh.some(x => lower(x) === lower(v))) { skipped = v; continue; }
      fresh.push(v);
    }
    if (fresh.length) {
      setValue([...value, ...fresh]);
      setAnnounce(fresh.length === 1 ? `Added ${fresh[0]}` : `Added ${fresh.length}`);
    } else if (skipped) {
      // A repeat clears the text, so the next characters never append to it, and the chip that already
      // holds the value flashes where the person is looking.
      setAnnounce(`${skipped} is already added`);
      setRepeated(skipped);
      window.setTimeout(() => setRepeated(''), 700);
    }
    if (fresh.length || skipped) setQuery('');
  };

  const onChipsKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    // A space ends an email only once it has an @, so "Ada <ada@acme.example>" can be typed as well as pasted.
    // Nothing commits inside an open "<" or quote.
    const open = /<[^>]*$/.test(query) || (query.split('"').length % 2 === 0);
    const delimiter = opts.delimiters.includes(e.key) && !open && !(e.key === ' ' && preset === 'email' && !query.includes('@'));
    if ((e.key === 'Enter' && !highlighted.current) || (delimiter && query.trim())) {
      if (!query.trim()) return;
      e.preventDefault();
      (e as unknown as {preventBaseUIHandler?: () => void}).preventBaseUIHandler?.();
      commit([query]);
    }
  };

  const onChipsPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = query + e.clipboardData.getData('text');
    const parts = opts.split(text).filter(p => opts.normalize(p));
    if (parts.length < 2) return;
    e.preventDefault();
    commit(parts);
  };

  const errorOf = (v: string) => opts.validate(v, value) ?? null;
  const invalidCount = value.filter(v => errorOf(v)).length;

  return <ComboboxContext.Provider value={{creatable, pending, query, preview, previewError, canCreate, duplicate, commit, errorOf, invalidCount, onChipsKeyDown, onChipsPaste, announce, inline, repeated}}>
    <ComboboxPrimitive.Root
      {...r}
      multiple
      items={items}
      value={value}
      onValueChange={(next: string[]) => {
        const removed = value.filter(v => !next.includes(v));
        if (removed.length === 1) setAnnounce(`Removed ${removed[0]}`);
        setValue(next);
        setQuery('');
      }}
      inputValue={query}
      onInputValueChange={(next: string) => setQuery(next)}
      onItemHighlighted={(item: string | undefined, details: ComboboxPrimitive.Root.HighlightEventDetails) => { highlighted.current = item; r.onItemHighlighted?.(item, details); }}
    />
  </ComboboxContext.Provider>;
}

/** Forced states from the docs harness (data-force-*) belong on the field box, not the bare input. */
function splitForced<T extends object>(props: T) {
  const forced: Record<string, unknown> = {};
  const rest: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(props)) (k.startsWith('data-force-') ? forced : rest)[k] = v;
  return {forced, rest: rest as T};
}

// ---------- the single field ----------

function ComboboxValue(props: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props}/>;
}


function ComboboxTrigger({className, children, ...props}: ComboboxPrimitive.Trigger.Props) {
  return <ComboboxPrimitive.Trigger
    data-slot="combobox-trigger"
    // The chevron alone has no name; children of your own name it instead.
    aria-label={children ? undefined : 'Show options'}
    className={mergeClass(fieldActionClass(), className)}
    {...props}
  >
    {children ?? <Icon icon={ChevronDown} size={16} className="transition-transform duration-(--dur-fast) group-has-data-popup-open/field-box:rotate-180 motion-reduce:transition-none"/>}
  </ComboboxPrimitive.Trigger>;
}

function ComboboxClear({className, ...props}: ComboboxPrimitive.Clear.Props) {
  return <ComboboxPrimitive.Clear data-slot="combobox-clear" aria-label="Clear" className={mergeClass(fieldActionClass(), className)} {...props}>
    <Icon icon={Close} size={16}/>
  </ComboboxPrimitive.Clear>;
}

type ComboboxInputProps = Omit<ComboboxPrimitive.Input.Props, 'size'> & {
  size?: ControlSize;
  /** A leading magnifier, for search-first fields. */
  showSearchIcon?: boolean;
  showTrigger?: boolean;
  showClear?: boolean;
  'aria-invalid'?: boolean | 'true' | 'false';
};

/** The single-value field: the input, an optional clear, and the trigger, in the field box. */
function ComboboxInput({className, size = 'default', showSearchIcon = false, showTrigger = true, showClear = false, disabled: disabledProp, 'aria-invalid': invalid, children, ...all}: ComboboxInputProps) {
  const disabled = useFieldDisabled() || disabledProp;
  const isInvalid = invalid === true || invalid === 'true';
  const {forced, rest: props} = splitForced(all);
  const {pending} = React.useContext(ComboboxContext);
  return <ComboboxPrimitive.InputGroup
    data-slot="combobox-input-group"
    data-size={size}
    data-disabled={disabled || undefined}
    data-status={isInvalid ? 'fail' : undefined}
    className={mergeClass([fieldBoxVariants({size}), 'gap-2', size === 'sm' ? 'px-2 has-[button]:pe-1' : size === 'lg' ? 'px-4 has-[button]:pe-1' : 'px-3 has-[button]:pe-1'], className)}
    {...forced}
  >
    {(showSearchIcon || pending) && <Icon
      icon={pending ? CircleDash : Search}
      size={16}
      className={cn('text-text-2', pending && 'animate-spin motion-reduce:animate-none')}
    />}
    <ComboboxPrimitive.Input
      data-slot="combobox-input"
      data-control=""
      disabled={disabled}
      aria-invalid={isInvalid || undefined}
      className="h-full min-w-0 flex-1 bg-transparent placeholder:text-text-3 disabled:cursor-not-allowed pointer-coarse:text-base"
      {...props}
    />
    {showClear && <ComboboxClear disabled={disabled}/>}
    {showTrigger && <ComboboxTrigger disabled={disabled}/>}
    {children}
  </ComboboxPrimitive.InputGroup>;
}

// ---------- the popup ----------

type ComboboxContentProps = ComboboxPrimitive.Popup.Props & Pick<ComboboxPrimitive.Positioner.Props, 'side' | 'align' | 'sideOffset' | 'alignOffset' | 'anchor'>;

/** The paper list. With `creatable`, it ends with the create row; while `pending`, it says it is searching. */
function ComboboxContent({className, side = 'bottom', sideOffset = 4, align = 'start', alignOffset = 0, anchor, children, ...props}: ComboboxContentProps) {
  const container = useQuartzPortal();
  const {creatable, pending, inline} = React.useContext(ComboboxContext);
  if (inline) return <div
    data-slot="combobox-content"
    data-pending={pending || undefined}
    className={cn(popupClassName, 'group/combobox-content flex w-full flex-col', typeof className === 'string' && className)}
  >
    {pending && <p data-slot="combobox-pending" role="status" className="flex items-center gap-2 px-3 py-3 type-body-sm text-text-2">
      <Icon icon={CircleDash} size={16} className="animate-spin motion-reduce:animate-none"/>Searching
    </p>}
    {children as React.ReactNode}
    {creatable && <ComboboxCreate/>}
  </div>;
  return <ComboboxPrimitive.Portal container={container}>
    <ComboboxPrimitive.Positioner side={side} sideOffset={sideOffset} align={align} alignOffset={alignOffset} anchor={anchor} collisionPadding={8} className="isolate z-(--z-overlay) outline-none">
      <ComboboxPrimitive.Popup
        data-slot="combobox-content"
        data-pending={pending || undefined}
        className={mergeClass([popupClassName, 'group/combobox-content flex w-(--anchor-width) max-w-(--available-width) flex-col'], className)}
        {...props}
      >
        {pending && <p data-slot="combobox-pending" role="status" className="flex items-center gap-2 px-3 py-3 type-body-sm text-text-2">
          <Icon icon={CircleDash} size={16} className="animate-spin motion-reduce:animate-none"/>Searching
        </p>}
        {children as React.ReactNode}
        {creatable && <ComboboxCreate/>}
      </ComboboxPrimitive.Popup>
    </ComboboxPrimitive.Positioner>
  </ComboboxPrimitive.Portal>;
}

function ComboboxList({className, ...props}: ComboboxPrimitive.List.Props) {
  return <ComboboxPrimitive.List data-slot="combobox-list" className={mergeClass('max-h-(--popup-max) scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0', className)} {...props}/>;
}

// An inline list sits in the page, so keeping its highlighted item in view scrolls the list alone. The
// browser's scrollIntoView also scrolls the window, which jumps the page to the list when it mounts.
function scrollListOnly(item: HTMLElement | null) {
  if (!item) return;
  item.scrollIntoView = () => {
    const list = item.closest<HTMLElement>('[data-slot="combobox-list"]');
    if (!list) return;
    const a = item.getBoundingClientRect(), b = list.getBoundingClientRect();
    if (a.top < b.top) list.scrollTop -= b.top - a.top;
    else if (a.bottom > b.bottom) list.scrollTop += a.bottom - b.bottom;
  };
}

function ComboboxItem({className, children, ref, ...props}: ComboboxPrimitive.Item.Props) {
  const {inline} = React.useContext(ComboboxContext);
  const setRef = React.useMemo(() => mergeRefs<HTMLDivElement>(inline ? scrollListOnly : undefined, ref), [inline, ref]);
  return <ComboboxPrimitive.Item ref={setRef} data-slot="combobox-item" className={mergeClass(itemClassName, className)} {...props}>
    <span className="min-w-0 flex-1 truncate">{children}</span>
    <ComboboxPrimitive.ItemIndicator render={<span className="pointer-events-none absolute end-2 flex size-4 items-center justify-center"/>}>
      <Icon icon={Checkmark} size={16}/>
    </ComboboxPrimitive.ItemIndicator>
  </ComboboxPrimitive.Item>;
}

function ComboboxGroup({className, ...props}: ComboboxPrimitive.Group.Props) {
  return <ComboboxPrimitive.Group data-slot="combobox-group" className={className} {...props}/>;
}

function ComboboxLabel({className, ...props}: ComboboxPrimitive.GroupLabel.Props) {
  return <ComboboxPrimitive.GroupLabel data-slot="combobox-label" className={mergeClass(listGroupLabelClassName, className)} {...props}/>;
}

function ComboboxCollection(props: ComboboxPrimitive.Collection.Props) {
  return <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props}/>;
}

/** Says nothing matched. Hidden while pending, and while a create row offers the query. */
function ComboboxEmpty({className, ...props}: ComboboxPrimitive.Empty.Props) {
  const {pending, canCreate, duplicate, inline} = React.useContext(ComboboxContext);
  if (pending || canCreate || duplicate) return null;
  // Empty's plain look, top-left like every other empty state: the message is its title, in the 14px label role.
  return <ComboboxPrimitive.Empty
    data-slot="combobox-empty"
    render={<Empty variant="plain" size="sm"/>}
    className={mergeClass(['hidden type-label group-data-empty/combobox-content:flex', inline && 'flex empty:hidden'], className)}
    {...props}
  />;
}

function ComboboxSeparator({className, ...props}: ComboboxPrimitive.Separator.Props) {
  return <ComboboxPrimitive.Separator data-slot="combobox-separator" className={mergeClass(listSeparatorClassName, className)} {...props}/>;
}

/**
 * The create row: the query as it will be committed, after normalising, with its verdict. Rendered by
 * ComboboxContent when the root is creatable.
 */
function ComboboxCreate() {
  const {canCreate, duplicate, preview, previewError, commit, query} = React.useContext(ComboboxContext);
  if (duplicate) return <p data-slot="combobox-duplicate" className="px-3 py-2 type-body-sm text-text-2"><span className="text-text-1">{preview}</span> is already added.</p>;
  if (!canCreate) return null;
  return <div className="p-1 pt-0 group-data-empty/combobox-content:pt-1">
    <button
      type="button"
      data-slot="combobox-create"
      data-status={previewError ? 'fail' : undefined}
      onMouseDown={e => e.preventDefault()}
      onClick={() => commit([query])}
      className={cn(itemClassName, 'pe-2 text-start hover:bg-hover')}
    >
      <Icon icon={Add} size={16} className="text-text-2"/>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate">Add <CodeTag fill="outline" className="align-baseline">{preview}</CodeTag></span>
        {previewError && <span className="flex items-center gap-2 type-body-sm text-fail-text">{previewError}. It will be marked.</span>}
      </span>
      <Kbd className="shrink-0">Enter</Kbd>
    </button>
  </div>;
}

// ---------- multiple ----------

type ComboboxChipsProps = React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> & ComboboxPrimitive.Chips.Props & {
  size?: ControlSize;
  disabled?: boolean;
  'aria-invalid'?: boolean | 'true' | 'false';
};

/** The multiple-value field: chips and an input in one wrapping field box. Pass its ref as the popup anchor. */
function ComboboxChips({className, size = 'default', disabled: disabledProp, 'aria-invalid': invalid, ...props}: ComboboxChipsProps) {
  const {invalidCount} = React.useContext(ComboboxContext);
  const disabled = useFieldDisabled() || disabledProp;
  const isInvalid = invalid === true || invalid === 'true' || invalidCount > 0;
  return <ComboboxPrimitive.Chips
    data-slot="combobox-chips"
    data-size={size}
    data-disabled={disabled || undefined}
    data-status={isInvalid ? 'fail' : undefined}
    className={mergeClass([
      fieldBoxVariants({size}),
      'h-auto max-h-(--field-max-height) cursor-text flex-wrap gap-1 overflow-y-auto p-1',
      size === 'sm' ? 'min-h-(--control-sm) p-0.5' : size === 'lg' ? 'min-h-(--control-lg) p-2' : 'min-h-(--control)',
    ], className)}
    {...props}
  />;
}

/** One value in the field. With a creatable root, an invalid value is marked and says why. */
function ComboboxChip({className, children, showRemove = true, value, ...props}: ComboboxPrimitive.Chip.Props & {showRemove?: boolean; value?: string}) {
  const {errorOf, repeated} = React.useContext(ComboboxContext);
  const off = useFieldDisabled();
  const error = value !== undefined ? errorOf(value) : null;
  return <ComboboxPrimitive.Chip
    data-slot="combobox-chip"
    data-status={error ? 'fail' : undefined}
    data-repeated={value !== undefined && repeated !== '' && value.toLowerCase() === repeated.toLowerCase() ? '' : undefined}
    title={error ?? undefined}
    className={mergeClass([
      'flex h-6 max-w-full min-w-0 items-center gap-1 rounded-inner bg-page ps-2 type-label-sm text-text-1 control-edge outline-none forced-colors:border',
      // Invalid: the fail edge, no wash.
      'data-[status=fail]:[--frame-color:var(--fail-line)]',
      // The person's hand on a chip (highlighted, focused, or pasted again): ink, and its ring is paper.
      'data-repeated:bg-inverse data-repeated:text-text-inverse data-repeated:shadow-none',
      'data-highlighted:bg-inverse data-highlighted:text-text-inverse data-highlighted:shadow-none focus-within:bg-inverse focus-within:text-text-inverse focus-within:shadow-none focus-visible:focus-ring-ink group-data-disabled/field-box:text-text-disabled',
      showRemove ? 'pe-0' : 'pe-2',
    ], className)}
    {...props}
  >
    <span className="truncate">{children}</span>
    {error && <span className="sr-only">, invalid: {error}</span>}
    {showRemove && <ComboboxPrimitive.ChipRemove
      data-slot="combobox-chip-remove"
      disabled={off}
      aria-label={typeof children === 'string' ? `Remove ${children}` : 'Remove'}
      className="flex size-6 shrink-0 items-center justify-center rounded-inner text-text-2 transition-colors duration-(--dur-fast) ease-(--ease-step) hover:bg-hover hover:text-text-1 motion-reduce:transition-none"
    >
      <Icon icon={Close} size={12}/>
    </ComboboxPrimitive.ChipRemove>}
  </ComboboxPrimitive.Chip>;
}

function ComboboxChipsInput({className, onKeyDown, onPaste, ...props}: ComboboxPrimitive.Input.Props) {
  const {creatable, onChipsKeyDown, onChipsPaste, invalidCount, announce, pending} = React.useContext(ComboboxContext);
  return <>
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      data-control=""
      aria-invalid={invalidCount > 0 || undefined}
      onKeyDown={e => { onKeyDown?.(e); if (creatable) onChipsKeyDown(e); }}
      onPaste={e => { onPaste?.(e); if (creatable) onChipsPaste(e); }}
      className={mergeClass([
        'h-6 min-w-16 flex-1 bg-transparent ps-1 type-label placeholder:text-text-3 disabled:cursor-not-allowed pointer-coarse:text-base',
        // With no chip before it, the text starts where an Input's does: 8, 12 and 16px from the edge, past the box's 2, 4 and 8px padding.
        'first:ps-2 group-data-[size=sm]/field-box:first:ps-1.5',
      ], className)}
      {...props}
    />
    {pending && <Icon icon={CircleDash} size={16} className="me-2 shrink-0 text-text-2 animate-spin motion-reduce:animate-none"/>}
    {creatable && <span role="status" className="sr-only">{announce}{invalidCount > 0 ? `. ${invalidCount} invalid` : ''}</span>}
  </>;
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null);
}

// ---------- the composed field ----------

type ComboboxFieldProps = ComboboxExtra & {
  items?: string[];
  multiple?: boolean;
  value?: string | string[] | null;
  defaultValue?: string | string[] | null;
  onValueChange?: (value: string | string[] | null) => void;
  placeholder?: string;
  /** Shown when nothing matches. */
  emptyText?: string;
  size?: ControlSize;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  showClear?: boolean;
  /** Draw the open list in place, with no popup. For specimens of the popup states. */
  inline?: boolean;
  defaultInputValue?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  [forced: `data-force-${string}`]: unknown;
};

/**
 * The standard composition for string items: a single field with clear and trigger, or with `multiple`, a
 * chips field. Use the parts for object items, groups or custom rows.
 */
function ComboboxField({items = [], multiple, value, defaultValue, onValueChange, placeholder, emptyText = 'No matches', size = 'default', disabled, name, id, className, showClear, inline, defaultInputValue, creatable, preset, normalize, validate, split, delimiters, pending, 'aria-label': ariaLabel, 'aria-describedby': describedBy, 'aria-invalid': invalid, ...all}: ComboboxFieldProps) {
  const {forced} = splitForced(all);
  const anchor = useComboboxAnchor();
  const list = <ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList>;
  if (!multiple) {
    return <Combobox items={items} value={value as string | null | undefined} defaultValue={defaultValue as string | null | undefined} onValueChange={v => onValueChange?.(v as string | null)} disabled={disabled} name={name} pending={pending} {...(inline ? {inline: true, open: true, autoHighlight: 'always' as unknown as boolean, defaultInputValue} : {})}>
      <ComboboxInput id={id} size={size} placeholder={placeholder} showClear={showClear} aria-label={ariaLabel} aria-describedby={describedBy} aria-invalid={invalid} disabled={disabled} className={className} {...forced}/>
      <ComboboxContent>
        <ComboboxEmpty>{emptyText}</ComboboxEmpty>
        {list}
      </ComboboxContent>
    </Combobox>;
  }
  return <Combobox
    items={items}
    multiple
    value={value as string[] | undefined}
    defaultValue={(defaultValue as string[] | undefined) ?? []}
    onValueChange={v => onValueChange?.(v as string[])}
    disabled={disabled}
    name={name}
    creatable={creatable}
    preset={preset}
    normalize={normalize}
    validate={validate}
    split={split}
    delimiters={delimiters}
    pending={pending}
    {...(inline ? {inline: true, open: true, defaultInputValue} : {})}
  >
    <ComboboxChips ref={anchor} size={size} disabled={disabled} aria-invalid={invalid} className={className} {...forced}>
      <ComboboxValue>
        {(selected: string[]) => <>
          {selected.map(v => <ComboboxChip key={v} value={v}>{v}</ComboboxChip>)}
          <ComboboxChipsInput id={id} placeholder={selected.length ? '' : placeholder} aria-label={ariaLabel} aria-describedby={describedBy} disabled={disabled}/>
        </>}
      </ComboboxValue>
    </ComboboxChips>
    <ComboboxContent anchor={anchor}>
      {items.length > 0 && <ComboboxEmpty>{emptyText}</ComboboxEmpty>}
      {list}
    </ComboboxContent>
  </Combobox>;
}

export {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxCollection,
  ComboboxContent,
  ComboboxCreate,
  ComboboxEmpty,
  ComboboxField,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  normalizeEmail,
  splitEmails,
  useComboboxAnchor,
  validateEmail,
  type ComboboxFieldProps,
  type ComboboxProps,
};
