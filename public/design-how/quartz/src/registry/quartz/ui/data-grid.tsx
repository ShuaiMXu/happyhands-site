'use client';

import * as React from 'react';
import {Icon, Checkmark} from '@/components/quartz/icon';
import {cn} from '@/lib/quartz/utils';
import {Checkbox} from '@/components/quartz/ui/checkbox';
import {Input} from '@/components/quartz/ui/input';
import {Kbd} from '@/components/quartz/ui/kbd';
import {Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger} from '@/components/quartz/ui/popover';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/quartz/ui/select';
import {Status, StatusArc} from '@/components/quartz/ui/status';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/quartz/ui/table';
import {Textarea} from '@/components/quartz/ui/textarea';

// Quartz's data grid: Table's parts with spreadsheet behavior. The grid owns focus, editing, copy and
// paste and each cell's save state; the product owns the rows and what a commit does.
//
// - One tab stop. DataGridTable is role="grid" with a roving tabindex over its cells, and over the
//   header row too when focusableHeader is set. Arrows move, Home and End go to the row's ends,
//   Ctrl+Home and Ctrl+End to the corners, Page Up and Page Down move ten rows. Tab leaves the grid.
// - Enter, F2 or typing a character edits. In the editor Escape cancels, Enter commits and moves down,
//   Tab and Shift+Tab commit and move sideways, and clicking away commits.
// - Editors are typed: text and number use Input, long-text a Popover with a Textarea, select a Select
//   that opens in place, boolean a Checkbox that Space or a click toggles without an editor.
// - Cmd/Ctrl+C copies the active cell as text. Pasting tab-separated text fills cells right and down
//   from the active one and skips read-only cells. Delete or Backspace clears a cell.
// - A cell's onCommit may return a promise: the cell shows saving, then saved, or "Not saved:" and the
//   rejection's message on the fail wash. validate() marks a bad value "Invalid:" the same way, so it is
//   visible, not lost. A failed save says it did not save, never that a good value is invalid.
// - The active cell carries Quartz's focus ring, 2px ink drawn inside the cell, so a scroll box never
//   clips it. Every outcome is announced in one polite status region.

type CellValue = string | number | boolean | null;
type CellOption = {value: string; label: string};
type CellEditor = 'text' | 'long-text' | 'number' | 'select' | 'boolean';
type CellSaveState = {state: 'idle' | 'saving' | 'saved' | 'error'; message?: string};
type CellPosition = {row: number; col: number};
type MoveAfterEdit = 'down' | 'right' | 'left';

/** What the grid knows about a mounted cell, so keyboard, copy and paste can reach it by position. */
type CellEntry = {
  id: string;
  label: string;
  value: CellValue;
  editor?: CellEditor;
  options?: CellOption[];
  text: string;
  editable: boolean;
  onCommit?: (value: CellValue) => unknown;
};

type Editing = CellPosition & {draft: string; via: 'inline' | 'popover' | 'select'};

const SAVED_FOR = 1600;

const posKey = (p: CellPosition) => `${p.row}:${p.col}`;

/** The plain text a value stands for: what copy writes and what an editor starts from. */
function formatCellValue(value: CellValue | undefined, editor?: CellEditor, options?: CellOption[]): string {
  if (value == null) return '';
  if (editor === 'boolean' || typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (editor === 'select') return options?.find(o => o.value === value)?.label ?? String(value);
  return String(value);
}

/** Turns typed or pasted text into a value. Numbers that do not parse stay text, so validate can say so. */
function parseCellValue(text: string, editor?: CellEditor, options?: CellOption[]): CellValue {
  const t = text.trim();
  if (t === '') return null;
  if (editor === 'number') return Number.isFinite(Number(t)) ? Number(t) : t;
  if (editor === 'boolean') return /^(true|yes|y|1|x)$/i.test(t);
  if (editor === 'select') return options?.find(o => o.value === t || o.label.toLowerCase() === t.toLowerCase())?.value ?? t;
  return text;
}

type DataGridContextValue = {
  active: CellPosition;
  editing: Editing | null;
  focused: boolean;
  readOnly: boolean;
  rowCount: number;
  colCount: number;
  focusableHeader: boolean;
  setActive: (p: CellPosition) => void;
  move: (p: CellPosition) => void;
  startEdit: (p: CellPosition, seed?: string) => void;
  endEdit: (commit: boolean, then?: MoveAfterEdit, value?: string) => void;
  setDraft: (draft: string) => void;
  register: (p: CellPosition, entry: React.RefObject<CellEntry>) => () => void;
  entryAt: (p: CellPosition) => CellEntry | undefined;
  commit: (entry: CellEntry, value: CellValue) => void;
  statusOf: (id: string) => CellSaveState | undefined;
  /** Some cell is waiting on its onCommit. */
  saving: boolean;
  copy: () => void;
  announce: (text: string) => void;
  itemProps: (p: CellPosition) => {'data-cell': string; tabIndex: number; onFocus: (event: React.FocusEvent<HTMLElement>) => void};
  cellElement: (p: CellPosition) => HTMLElement | null;
  setFocused: (focused: boolean) => void;
  helpId: string;
};

const DataGridContext = React.createContext<DataGridContextValue | null>(null);

/** The grid's state, for toolbars, footers and menus rendered inside DataGrid. */
function useDataGrid() {
  const ctx = React.useContext(DataGridContext);
  if (!ctx) throw new Error('useDataGrid must be used inside <DataGrid>.');
  return ctx;
}

type DataGridProps = Omit<React.ComponentProps<'div'>, 'onChange'> & {
  /** Body rows, not counting the header. */
  rowCount: number;
  /** Columns in every row. */
  colCount: number;
  /** The header row joins the roving focus, for column menus. Its row index is -1. */
  focusableHeader?: boolean;
  /** Cells still take focus and copy; nothing edits or pastes. */
  readOnly?: boolean;
  /** The active cell, controlled. */
  activeCell?: CellPosition;
  /** The cell that starts active. */
  defaultActiveCell?: CellPosition;
  onActiveCellChange?: (cell: CellPosition) => void;
};

function DataGrid({
  rowCount, colCount, focusableHeader = false, readOnly = false, activeCell, defaultActiveCell, onActiveCellChange,
  className, children, ...props
}: DataGridProps) {
  const helpId = React.useId();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [ownActive, setOwnActive] = React.useState<CellPosition>(defaultActiveCell ?? {row: 0, col: 0});
  const [editing, setEditingState] = React.useState<Editing | null>(null);
  // The editor can close twice (Enter, then the input's blur as it unmounts); the ref makes the second a no-op.
  const editingRef = React.useRef<Editing | null>(null);
  const [focused, setFocused] = React.useState(false);
  const [status, setStatus] = React.useState<Record<string, CellSaveState>>({});
  const [announcement, setAnnouncement] = React.useState('');
  const focusNext = React.useRef(false);
  const cells = React.useRef(new Map<string, React.RefObject<CellEntry>>());
  const timers = React.useRef(new Map<string, number>());

  const minRow = focusableHeader ? -1 : 0;
  const clamp = (p: CellPosition): CellPosition => ({
    row: Math.max(minRow, Math.min(rowCount - 1, p.row)),
    col: Math.max(0, Math.min(colCount - 1, p.col)),
  });
  const active = clamp(activeCell ?? ownActive);

  const setEditing = (next: Editing | null) => {
    editingRef.current = next;
    setEditingState(next);
  };

  const setActive = (p: CellPosition) => {
    const next = clamp(p);
    if (activeCell === undefined) setOwnActive(next);
    if (next.row !== active.row || next.col !== active.col) onActiveCellChange?.(next);
  };

  const cellElement = (p: CellPosition) => rootRef.current?.querySelector<HTMLElement>(`[data-cell="${posKey(p)}"]`) ?? null;

  // Move focus to the active cell after a keyboard move or after an editor closes.
  React.useEffect(() => {
    if (!focusNext.current) return;
    focusNext.current = false;
    const el = cellElement(active);
    if (!el) return;
    el.focus();
    el.scrollIntoView?.({block: 'nearest', inline: 'nearest'});
    // A closing popover or select hands focus back to its trigger a frame later; take it back.
    requestAnimationFrame(() => { if (document.activeElement !== el && el.isConnected && !editingRef.current) el.focus(); });
  });

  React.useEffect(() => () => { timers.current.forEach(t => window.clearTimeout(t)); }, []);

  const announce = (text: string) => {
    setAnnouncement('');
    requestAnimationFrame(() => setAnnouncement(text));
  };

  const move = (p: CellPosition) => {
    focusNext.current = true;
    setActive(p);
  };

  const entryAt = (p: CellPosition) => cells.current.get(posKey(p))?.current;

  const commit = (entry: CellEntry, value: CellValue) => {
    if (!entry.onCommit) return;
    const id = entry.id;
    const result = entry.onCommit(value);
    if (!result || typeof (result as Promise<unknown>).then !== 'function') return;
    window.clearTimeout(timers.current.get(id));
    setStatus(s => ({...s, [id]: {state: 'saving'}}));
    announce(`Saving ${entry.label}`);
    (result as Promise<unknown>).then(
      () => {
        setStatus(s => ({...s, [id]: {state: 'saved'}}));
        announce(`Saved ${entry.label}`);
        timers.current.set(id, window.setTimeout(() => setStatus(s => {
          if (s[id]?.state !== 'saved') return s;
          const next = {...s};
          delete next[id];
          return next;
        }), SAVED_FOR));
      },
      (error: unknown) => {
        const message = error instanceof Error ? error.message : 'Could not save';
        setStatus(s => ({...s, [id]: {state: 'error', message}}));
        announce(`${entry.label} not saved. ${message}`);
      },
    );
  };

  const startEdit = (p: CellPosition, seed?: string) => {
    if (readOnly || p.row < 0) return;
    const entry = entryAt(p);
    if (!entry?.editable || !entry.editor) return;
    if (entry.editor === 'boolean') { commit(entry, !entry.value); return; }
    const via = entry.editor === 'select' ? 'select' : entry.editor === 'long-text' ? 'popover' : 'inline';
    setEditing({...p, via, draft: seed ?? (entry.value == null ? '' : String(entry.value))});
  };

  const endEdit = (save: boolean, then?: MoveAfterEdit, value?: string) => {
    const current = editingRef.current;
    if (!current) return;
    const entry = entryAt(current);
    if (save && entry) {
      const next = parseCellValue(value ?? current.draft, entry.editor, entry.options);
      if (next !== (entry.value ?? null)) commit(entry, next);
    }
    setEditing(null);
    focusNext.current = true;
    const p = {row: current.row, col: current.col};
    setActive(then === 'down' ? {...p, row: p.row + 1} : then === 'right' ? {...p, col: p.col + 1} : then === 'left' ? {...p, col: p.col - 1} : p);
  };

  const setDraft = (draft: string) => {
    if (editingRef.current) setEditing({...editingRef.current, draft});
  };

  const copy = () => {
    const entry = active.row >= 0 ? entryAt(active) : undefined;
    if (!entry) return;
    navigator.clipboard?.writeText(entry.text).catch(() => {});
    announce(entry.text ? `Copied ${entry.text.length > 40 ? `${entry.text.slice(0, 40)}…` : entry.text}` : 'Copied an empty cell');
  };

  const register = React.useCallback((p: CellPosition, entry: React.RefObject<CellEntry>) => {
    const key = posKey(p);
    cells.current.set(key, entry);
    return () => { if (cells.current.get(key) === entry) cells.current.delete(key); };
  }, []);

  const itemProps = (p: CellPosition) => ({
    'data-cell': posKey(p),
    tabIndex: active.row === p.row && active.col === p.col && !(editing && editing.row === p.row && editing.col === p.col) ? 0 : -1,
    onFocus: (event: React.FocusEvent<HTMLElement>) => { if (event.target === event.currentTarget) setActive(p); },
  });

  const ctx: DataGridContextValue = {
    active, editing, focused, readOnly, rowCount, colCount, focusableHeader,
    setActive, move, startEdit, endEdit, setDraft, register, entryAt, commit,
    statusOf: id => status[id], saving: Object.values(status).some(s => s.state === 'saving'), copy, announce, itemProps, cellElement, setFocused, helpId,
  };

  return <DataGridContext.Provider value={ctx}>
    <div ref={rootRef} data-slot="data-grid" className={cn('flex min-w-0 flex-col gap-3', className)} {...props}>
      {children}
      <p role="status" aria-live="polite" className="sr-only">{announcement}</p>
    </div>
  </DataGridContext.Provider>;
}

type DataGridTableProps = React.ComponentProps<typeof Table> & {
  /** The grid's accessible name. */
  'aria-label': string;
};

/** The role="grid" table: one tab stop, the keyboard map and paste. */
function DataGridTable({className, size = 'sm', onKeyDownCapture, onPaste, onFocus, onBlur, ...props}: DataGridTableProps) {
  const grid = useDataGrid();
  const {active, editing, readOnly, rowCount, colCount, focusableHeader} = grid;

  const onKeyDown = (event: React.KeyboardEvent<HTMLTableElement>) => {
    onKeyDownCapture?.(event);
    if (event.defaultPrevented || editing) return;
    const target = event.target as HTMLElement;
    if (!target.closest('[data-cell]')) return;
    const mod = event.metaKey || event.ctrlKey;
    const {row, col} = active;
    // Runs in the capture phase, so a header cell's menu button never sees the arrows.
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();
    }
    switch (event.key) {
      case 'ArrowUp': grid.move({row: row - 1, col}); return;
      case 'ArrowDown': grid.move({row: row + 1, col}); return;
      case 'ArrowLeft': grid.move({row, col: col - 1}); return;
      case 'ArrowRight': grid.move({row, col: col + 1}); return;
      case 'Home': grid.move(mod ? {row: 0, col: 0} : {row, col: 0}); return;
      case 'End': grid.move(mod ? {row: rowCount - 1, col: colCount - 1} : {row, col: colCount - 1}); return;
      case 'PageDown': grid.move({row: row + 10, col}); return;
      case 'PageUp': grid.move({row: Math.max(0, row - 10), col}); return;
    }
    if (row < 0) return; // Header cells are the product's buttons; Enter and Space are theirs.
    if (mod && event.key.toLowerCase() === 'c') { event.preventDefault(); grid.copy(); return; }
    if (mod) return;
    const entry = grid.entryAt(active);
    if (event.key === 'Enter' || event.key === 'F2') { event.preventDefault(); grid.startEdit(active); return; }
    if (!entry?.editable || readOnly) return;
    if (event.key === ' ' && entry.editor === 'boolean') { event.preventDefault(); grid.startEdit(active); return; }
    if (event.key === 'Delete' || event.key === 'Backspace') {
      // An empty cell is already clear: no second onCommit(null), no save mark.
      if (entry.editor !== 'boolean') { event.preventDefault(); if (entry.value != null && entry.value !== '') grid.commit(entry, null); }
      return;
    }
    if (event.key.length === 1 && !event.altKey) {
      if (entry.editor === 'text' || entry.editor === 'long-text' || entry.editor === 'number') { event.preventDefault(); grid.startEdit(active, event.key); }
      else if (entry.editor === 'select') { event.preventDefault(); grid.startEdit(active); }
    }
  };

  const paste = (event: React.ClipboardEvent<HTMLTableElement>) => {
    onPaste?.(event);
    if (event.defaultPrevented || editing || readOnly || active.row < 0) return;
    const text = event.clipboardData.getData('text/plain');
    if (!text) return;
    event.preventDefault();
    const lines = text.replace(/\r/g, '').replace(/\n$/, '').split('\n').map(line => line.split('\t'));
    let count = 0, same = 0;
    lines.forEach((cells, dr) => cells.forEach((value, dc) => {
      const entry = grid.entryAt({row: active.row + dr, col: active.col + dc});
      if (!entry?.editable || !entry.editor) return;
      const next = parseCellValue(value, entry.editor, entry.options);
      // A cell whose last save failed is saved again even when it already shows the value: what it shows
      // is not what was stored. A cell that already holds the value is left alone and counted apart.
      if (next !== (entry.value ?? null) || grid.statusOf(entry.id)?.state === 'error') { grid.commit(entry, next); count++; }
      else same++;
    }));
    const cellsWord = (n: number) => `${n} ${n === 1 ? 'cell' : 'cells'}`;
    grid.announce(count
      ? `Pasted into ${cellsWord(count)}${same ? `, ${same} already held that value` : ''}`
      : same ? `${cellsWord(same)} already held that value` : 'Nothing to paste into here');
  };

  return <Table
    data-slot="data-grid-table"
    scrollFocus={false}
    size={size}
    role="grid"
    aria-rowcount={rowCount + 1}
    aria-colcount={colCount}
    aria-readonly={readOnly || undefined}
    aria-describedby={grid.helpId}
    onKeyDownCapture={onKeyDown}
    onPaste={paste}
    onFocus={event => { grid.setFocused(true); onFocus?.(event); }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) grid.setFocused(false); onBlur?.(event); }}
    className={cn('w-max min-w-full', className)}
    {...props}
  />;
}

function DataGridHeader({className, ...props}: React.ComponentProps<typeof TableHeader>) {
  return <TableHeader data-slot="data-grid-header" className={cn('sticky top-0 z-(--z-raised) bg-page', className)} {...props}/>;
}

const DataGridBody = TableBody;

/** A row. index is the body row, from 0; the header row is -1. */
function DataGridRow({index, ...props}: React.ComponentProps<typeof TableRow> & {index: number}) {
  return <TableRow data-slot="data-grid-row" role="row" aria-rowindex={index + 2} {...props}/>;
}

/**
 * A column head. With focusableHeader set it takes the roving focus itself, unless focusable is false
 * because a button inside it does: spread useDataGrid().itemProps({row: -1, col}) on that button.
 */
function DataGridHead({col, focusable, className, ...props}: React.ComponentProps<typeof TableHead> & {col: number; focusable?: boolean}) {
  const grid = useDataGrid();
  const own = (focusable ?? grid.focusableHeader) ? grid.itemProps({row: -1, col}) : undefined;
  const active = grid.active.row === -1 && grid.active.col === col;
  return <TableHead
    data-slot="data-grid-head"
    role="columnheader"
    aria-colindex={col + 1}
    {...own}
    className={cn(own && 'outline-none', own && active && grid.focused && 'focus-ring-inset!', className)}
    {...props}
  />;
}

type DataGridCellProps = Omit<React.ComponentProps<'td'>, 'children' | 'onChange'> & {
  row: number;
  col: number;
  /** A stable id, such as `${rowId}:${colId}`, so save state follows the cell when rows sort. */
  cellId?: string;
  /** Names the cell in its editor and in announcements: "Priority for TKT-1042". */
  label: string;
  value?: CellValue;
  /** The editor. Without one the cell is read-only. */
  editor?: CellEditor;
  /** select: the choices. */
  options?: CellOption[];
  /** Saves a value. Return a promise to show saving and saved, or reject with an Error to mark the cell. */
  onCommit?: (value: CellValue) => void | Promise<unknown>;
  /** Returns why a value is invalid, or null. Invalid cells are marked and say why. */
  validate?: (value: CellValue) => string | null;
  /** Save state set by the product. Wins over the grid's own. */
  status?: CellSaveState;
  readOnly?: boolean;
  /** What copy writes. Defaults to the value as text. */
  text?: string;
  /** Shown in an empty cell. */
  placeholder?: string;
  /** Set the value in mono, for IDs. */
  mono?: boolean;
  /** Custom display. The editor, marks and focus still come from the grid. */
  children?: React.ReactNode;
};

function DataGridCell({
  row, col, cellId, label, value = null, editor, options, onCommit, validate, status, readOnly, text, placeholder, mono,
  className, children, onMouseDown, onDoubleClick, onContextMenu, ...props
}: DataGridCellProps) {
  const grid = useDataGrid();
  const p = {row, col};
  const id = cellId ?? posKey(p);
  const editable = !!editor && !readOnly && !grid.readOnly;
  const entry = React.useRef<CellEntry>(null!);
  entry.current = {
    id, label, value, editor, options, onCommit, editable: editable && !!onCommit,
    text: text ?? formatCellValue(value, editor, options),
  };
  const {register} = grid;
  React.useEffect(() => register({row, col}, entry), [register, row, col]);

  const isActive = grid.active.row === row && grid.active.col === col;
  const editing = grid.editing && grid.editing.row === row && grid.editing.col === col ? grid.editing : null;
  const st = status ?? grid.statusOf(id);
  const invalid = validate ? validate(value) : null;
  const failed = st?.state === 'error' ? st.message ?? 'Could not save' : null;
  const error = failed ?? invalid;
  const numeric = editor === 'number';

  return <TableCell
    data-slot="data-grid-cell"
    role="gridcell"
    aria-colindex={col + 1}
    aria-readonly={!entry.current.editable || undefined}
    aria-invalid={invalid ? true : undefined}
    aria-busy={st?.state === 'saving' || undefined}
    data-active={isActive || undefined}
    data-editing={editing ? editing.via : undefined}
    data-save={st && st.state !== 'idle' ? st.state : undefined}
    data-status={error ? 'fail' : undefined}
    {...grid.itemProps(p)}
    onMouseDown={event => { onMouseDown?.(event); if (!editing) grid.move(p); }}
    onDoubleClick={event => { onDoubleClick?.(event); grid.startEdit(p); }}
    onContextMenu={event => { onContextMenu?.(event); grid.setActive(p); }}
    className={cn(
      'relative max-w-80 outline-none',
      numeric && 'text-end data',
      error && 'wash-row',
      // Inset, and important: on the focused cell base.css's :focus-visible ring outranks a plain utility, and
      // that ring sits outside the cell, where the scrolling wrapper clips it.
      isActive && (grid.focused || editing) && editing?.via !== 'inline' && 'focus-ring-inset!',
      editing?.via === 'inline' && 'py-0',
      className,
    )}
    {...props}
  >
    {editing?.via === 'inline'
      ? <Input
          size="sm"
          autoFocus
          aria-label={label}
          inputMode={numeric ? 'decimal' : undefined}
          value={editing.draft}
          onChange={event => grid.setDraft(event.target.value)}
          onBlur={() => grid.endEdit(true)}
          onKeyDown={event => {
            event.stopPropagation();
            if (event.key === 'Escape') { event.preventDefault(); grid.endEdit(false); }
            else if (event.key === 'Enter') { event.preventDefault(); grid.endEdit(true, 'down'); }
            else if (event.key === 'Tab') { event.preventDefault(); grid.endEdit(true, event.shiftKey ? 'left' : 'right'); }
          }}
          className={cn('min-w-24', numeric && 'text-end', mono && 'type-tag')}
        />
      : editing?.via === 'select'
        ? <Select
            open
            value={(value as string | null) ?? null}
            onOpenChange={open => { if (!open) grid.endEdit(false); }}
            onValueChange={next => grid.endEdit(true, undefined, (next as string | null) ?? '')}
          >
            <SelectTrigger size="sm" aria-label={label} className="min-w-full">
              <SelectValue placeholder={placeholder ?? 'Choose'}>{(v: string | null) => options?.find(o => o.value === v)?.label ?? placeholder ?? 'Choose'}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {options?.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
        : <CellDisplay
            p={p}
            label={label}
            value={value}
            editor={editor}
            options={options}
            placeholder={placeholder}
            mono={mono}
            editable={entry.current.editable}
            error={failed ? {kind: 'failed', message: failed} : invalid ? {kind: 'invalid', message: invalid} : null}
            save={st?.state}
            popover={editing?.via === 'popover' ? editing : null}
          >{children}</CellDisplay>}
  </TableCell>;
}

function CellDisplay({p, label, value, editor, options, placeholder, mono, editable, error, save, popover, children}: {
  p: CellPosition; label: string; value: CellValue; editor?: CellEditor; options?: CellOption[]; placeholder?: string; mono?: boolean;
  editable: boolean; error: {kind: 'failed' | 'invalid'; message: string} | null; save?: CellSaveState['state']; popover: Editing | null; children?: React.ReactNode;
}) {
  const grid = useDataGrid();
  let body: React.ReactNode = children;
  if (body === undefined) {
    if (editor === 'boolean') body = <Checkbox
      checked={!!value}
      tabIndex={-1}
      readOnly={!editable}
      onCheckedChange={() => { if (editable) { grid.setActive(p); grid.startEdit(p); } }}
      aria-label={`${label}: ${value ? 'yes' : 'no'}`}
    />;
    else if (value == null || value === '') body = <span className="text-text-3">{placeholder ?? (editor === 'select' ? 'Choose' : '')}</span>;
    else body = <span className="block truncate">{formatCellValue(value, editor, options)}</span>;
  }

  const marks = <>
    {error && <Status status="fail">{`${error.kind === 'failed' ? 'Not saved' : 'Invalid'}: ${error.message}`}</Status>}
    {save === 'saving' && <StatusArc name="Saving"/>}
    {save === 'saved' && <Icon icon={Checkmark} size={12} label="Saved" className="text-text-2"/>}
  </>;

  const content = <span className={cn('flex min-w-0 items-center gap-2', editor === 'number' && 'justify-end', mono && 'type-tag')}>
    {editor === 'number' && marks}
    <span className={cn('min-w-0', editor === 'boolean' ? 'inline-flex' : 'flex-1')}>{body}</span>
    {editor !== 'number' && marks}
  </span>;

  if (editor !== 'long-text') return content;
  return <Popover
    open={!!popover}
    onOpenChange={(open, details) => { if (!open && popover) grid.endEdit(details.reason !== 'escape-key'); }}
  >
    <PopoverTrigger nativeButton={false} render={<span className="block min-w-0"/>} tabIndex={-1}>
      {content}
    </PopoverTrigger>
    {popover && <PopoverContent align="start" side="bottom" sideOffset={4} className="w-80" finalFocus={() => grid.cellElement(p)}>
      <div className="flex flex-col gap-1">
        <PopoverTitle className="type-label">{label}</PopoverTitle>
        <PopoverDescription className="type-body-sm text-text-3">Enter saves. Shift+Enter adds a line. Esc cancels.</PopoverDescription>
      </div>
      <Textarea
        autoFocus
        aria-label={label}
        maxRows={8}
        value={popover.draft}
        onChange={event => grid.setDraft(event.target.value)}
        onFocus={event => { const end = event.currentTarget.value.length; event.currentTarget.setSelectionRange(end, end); }}
        onKeyDown={event => {
          event.stopPropagation();
          if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); grid.endEdit(true, 'down'); }
        }}
      />
    </PopoverContent>}
  </Popover>;
}

/** The keyboard hint the grid's aria-describedby points at. It shows at every width; hide it yourself on a narrow layout. */
function DataGridHelp({className, children, ...props}: React.ComponentProps<'p'>) {
  const grid = useDataGrid();
  return <p id={grid.helpId} data-slot="data-grid-help" className={cn('flex flex-wrap items-center gap-x-3 gap-y-1 type-body-sm text-text-3', className)} {...props}>
    {children ?? <>
      <span className="flex items-center gap-1"><Kbd keys="enter"/>edits</span>
      <span className="flex items-center gap-1"><Kbd keys="esc"/>cancels</span>
      <span className="flex items-center gap-1"><Kbd keys="mod+c"/>copies</span>
      <span>Paste fills from here</span>
    </>}
  </p>;
}

export {
  DataGrid, DataGridTable, DataGridHeader, DataGridBody, DataGridRow, DataGridHead, DataGridCell, DataGridHelp, useDataGrid,
  formatCellValue, parseCellValue,
  type CellValue, type CellOption, type CellEditor, type CellSaveState, type CellPosition, type DataGridProps, type DataGridCellProps,
};
