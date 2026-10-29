---
name: Data grid
system: glaze
kind: component
import: "import {DataGrid, DataGridColumnHeader, DataGridColumnsMenu, selectColumn, severitySort, statusSeverity} from '@/components/glaze/ui/data-grid'"
install: "npx shadcn@latest add https://design.how/r/glaze/data-grid.json"
registryDependencies: [button, checkbox, data-units, dropdown-menu, icon, pagination, status, table, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/data-grid
---

# Data grid

Sorts, selects and pages records from data.

## Use when
- Records from data that a person sorts, picks in bulk, pages through or trims to the columns they need.
- A run, key or deploy list on a phone, where the less important columns drop out by width.
- A long list in a fixed height: maxHeight sticks the heads, and rows past virtualizeFrom render only in view.

## Don't use when
- A short list written by hand, with no sorting or paging. Use [Table](/systems/glaze/components/table.md).
- Each record is one line of mixed content. Use [Item](/systems/glaze/components/item.md).

## Minimal example
```tsx
const columns: ColumnDef<Run, any>[] = [
  selectColumn<Run>(),
  {accessorKey: 'id', header: 'Run', meta: {mono: true}},
  {accessorKey: 'ms', header: 'Duration', meta: {unit: 'duration'}},
  {accessorKey: 'status', header: 'Status', meta: {severity: true}, cell: ({getValue}) => <Status status={getValue()} size="sm"/>},
];
<DataGrid aria-label="Runs" title="Runs" columns={columns} data={runs} getRowId={r => r.id} pageSize={50} noun="runs"/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. data-grid-row-id MUST Pass getRowId from a stable id, and rowName to name each row's checkbox. Because TanStack keys rows by index without it, so a selection lands on other rows after a sort or a new page of data, and "Select row 3" says nothing.
   - Correct: `<DataGrid aria-label="Runs" columns={columns} data={runs} getRowId={r => r.id} rowName={r => r.id}/>`
   - Wrong: `<DataGrid aria-label="Runs" columns={columns} data={runs}/>`
2. data-grid-severity MUST Set meta.severity on a status column, and open with defaultSorting={[{id: 'status', desc: true}]} when the list is about what broke. Because sorted by the alphabet, Failed lands between Done and Passed, where a person scanning for trouble misses it.
   - Correct: `{accessorKey: 'status', header: 'Status', meta: {severity: true}}`
   - Wrong: `{accessorKey: 'status', header: 'Status'}`
3. data-grid-units MUST Give a column of durations or counts meta.unit and raw numbers, never preformatted strings. Because the grid picks one unit from the column's largest value and sorts by the number, while strings sort "9.0s" after "41.0s" and mix units.
   - Correct: `{accessorKey: 'ms', header: 'Duration', meta: {unit: 'duration'}} // 950, 1240`
   - Wrong: `{accessorKey: 'duration', header: 'Duration'} // '950ms', '1.2s'`
4. data-grid-hide-below SHOULD Give every column but the name, the main number and the status a meta.hideBelow, widest first to go. Because a phone then keeps the columns that answer the question, and the columns menu brings the rest back on demand.
5. data-grid-mono MUST Set meta.mono on an ID, key or path column; never render a <code> or font-mono in the cell. Because meta.mono sets type-code-sm, 0.8 of the cells, so the wider Glaze Mono does not read a size bigger than its neighbours.
   - Correct: `{accessorKey: 'id', header: 'Run', meta: {mono: true}}`
   - Wrong: `cell: ({getValue}) => <code>{getValue()}</code>`
6. data-grid-paging MUST Page rows the grid holds with pageSize and noun; for rows paged by the server, pass footer with PaginationInfo and PaginationNav size="sm". Because the range and the links sit on the shell's footer row, and a hand-made pager above the grid splits the record count from the records.
   - Correct: `<DataGrid aria-label="Runs" pageSize={50} noun="runs" …/>`
   - Wrong:
     ```tsx
     <PaginationNav page={page} pages={pages}/>
     <DataGrid aria-label="Runs" …/>
     ```
7. data-grid-no-wrapper NEVER Wrap a DataGrid in a Card or a bordered box; it brings the shell and panel, or takes frame="none" inside a Card's flush content. Because a card around the grid's card is two edges where one closes the group.
   - Correct: `<DataGrid aria-label="Runs" title="Runs" …/>`
   - Wrong: `<Card><DataGrid aria-label="Runs" …/></Card>`
8. data-grid-bulk SHOULD Act on the selected rows with a BulkActionBar fed by rowSelection, above the grid or floating, never with buttons in each row. Because the bar names the count and clears with Escape, and per-row buttons repeat the same action down the page.
9. data-grid-row-click SHOULD Open a row with onRowClick and show which is open with activeRowId, apart from selection. Because the rows become one tab stop with arrow keys, and the open row takes aria-current without ticking a checkbox.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `columns` | `ColumnDef<TData>[]` |  | TanStack column definitions; meta takes numeric, mono, label, hideBelow, severity, unit. |
| `data` | `TData[]` |  | The rows. |
| `getRowId` | `(row, index) => string` |  | Stable ids, so selection survives sorting and paging. |
| `rowName` | `(row) => string` |  | Names each row's checkbox: "Select run_8f2a". |
| `title, count, actions` | `ReactNode` |  | The head row in the panel. count defaults to the row count; false hides it. |
| `toolbar` | `(table) => ReactNode` |  | A strip under the head row: filters, DataGridColumnsMenu. |
| `pageSize, noun` | `number, string` |  | The grid pages itself; the range and links sit on the footer row. |
| `footer` | `ReactNode` |  | The footer row, for paging done on the server. |
| `loading, loadingRows` | `boolean, number` | `false, 5` | Placeholder rows after --wait-show, held --wait-hold. |
| `empty` | `ReactNode` | `'No rows'` | A string is the TableEmpty title; or pass a TableEmpty. |
| `maxHeight, virtualizeFrom` | `number \| string, number` | `, 200` | A scroll box with sticky heads; windowed rows past the count. |
| `sorting, defaultSorting, onSortingChange` | `SortingState` | `[]` | Controlled or first sort. Shift adds a column. |
| `rowSelection, onRowSelectionChange` | `RowSelectionState` | `{}` | Controlled selection, keyed by row id. |
| `columnVisibility, defaultColumnVisibility` | `VisibilityState` | `{}` | Columns turned off; hideBelow adds to it by width. |
| `onRowClick, activeRowId` | `(row) => void, string` |  | Rows open on press or Enter; the open one takes aria-current. |
| `rowActions, rowIndicator` | `(row) => ReactNode` |  | Actions at the row's end, shown on hover or focus. |
| `frame` | `'card' \| 'none'` | `'card'` | The shell and panel, or bare inside a Card. |
Other props pass through to the frame div (the shell, or the bare wrapper with frame="none").

## Variants and states
- rows: paged, scrolled
- states: rest, sorted, selected, loading, empty
- when states meet, the first wins: loading > empty > selected > open > hover > rest

## Accessibility
- [ ] The table carries aria-label, aria-busy while loading and aria-rowcount for every row, paged or not.
- [ ] Each head is a sort button named "Duration, sorted descending. Sort", with aria-sort on the th; its menu button is named for the column.
- [ ] Checkboxes are named by rowName; the head one is "Select all rows" and shows mixed for some.
- [ ] A polite status line says the row count, the selection, the sort and the page after each change.
- [ ] Resize handles are separators with aria-valuenow, moved by the arrow keys; hiding a column moves focus to its neighbour.

## Keyboard
- `Shift + click`: On a head, adds that column to the sort; on a checkbox, ticks or clears the range from the last one pressed.
- `Arrow Left / Right`: On a resize handle, narrows or widens the column by 16px, 64px with Shift; Enter resets it.
- `Arrow Up / Down, Home, End, Page Up / Down`: With onRowClick, moves between rows.
- `Enter`: On a row with onRowClick, opens it.

## Edge cases
- Missing number -> A unit column shows None and leaves it out of the unit choice; it sorts last.
- Narrow grid -> Columns with hideBelow wider than the grid hide; one turned on in the columns menu stays.
- Reload -> The rows stay until the placeholders are due, so a fast refetch does not flash.
- Sort while paged -> Goes back to page 1; the selection is kept across pages.
- Head label longer than the column -> The column grows to fit its head, so no label is cut.
- Cut value -> The cell ends in an ellipsis and shows the whole value on hover.

## Tokens
--shell, --paper, --line-faint, --line, --hover, --pressed, --field, --row, --control-sm, --text-1, --text-2, --text-3, --type-body-sm, --type-label-sm, --type-code-sm, --wait-show, --wait-hold, --z-raised

## Related
- [Table](/systems/glaze/components/table.md): Lists records that share the same fields.
- [Pagination](/systems/glaze/components/pagination.md): Moves through pages of results.
- [Bulk action bar](/systems/glaze/components/bulk-action-bar.md): Acts on the rows a person selected.
- [Item](/systems/glaze/components/item.md): Shows one thing as a row in a list.
