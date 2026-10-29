---
name: Table
system: glaze
kind: component
import: "import {Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption, TableEmpty, TableLoading, TableTitle, TableToolbar, TableFrameBox, TableSortButton, TableRowActions, TableRowAction, TableRowActionsMenu, TableRowActionsItem, TableRowActionsSeparator, tableClassName, bodyClassName, rowClassName, headClassName, cellClassName} from '@/components/glaze/ui/table'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/table.json"
registryDependencies: [button, data-units, dropdown-menu, empty-state, icon, skeleton, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/table
---

# Table

Lists records that share the same fields.

## Use when
- A handful to a few hundred records a person compares across columns: runs, keys, deploys.
- Exact values that must line up: durations, counts, costs.
- A short list written by hand. For sorting, column menus and paging driven by data, use DataGrid.

## Don't use when
- Each row is one line of mixed content and no columns compare. Use [Item](/systems/glaze/components/item.md).
- Label and value pairs about one thing. Use [Data list](/systems/glaze/components/data-list.md).
- Thousands of rows, sorting, column hiding and paging. Use [Data grid](/systems/glaze/components/data-grid.md).

## Minimal example
```tsx
<Table aria-label="Runs">
  <TableHeader><TableRow><TableHead>Run</TableHead><TableHead numeric>Duration</TableHead></TableRow></TableHeader>
  <TableBody>{runs.map(r => <TableRow key={r.id}>
    <TableCell mono>{r.id}</TableCell><TableCell numeric>{r.duration}</TableCell>
  </TableRow>)}</TableBody>
</Table>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. table-label MUST Give every Table a title or an aria-label. Because a screen reader announces an unnamed "table", and a page with two cannot be told apart in the tables list.
   - Correct: `<Table aria-label="Runs">…</Table>`
   - Wrong: `<Table>…</Table>`
2. table-numeric MUST Set numeric on the TableHead and every TableCell of a column of numbers, and give the column one unit. Because numeric right-aligns in tabular figures, so the digits stack by place; mixed units (950ms beside 1.2s) make the eye compare the wrong digits.
   - Correct:
     ```tsx
     <TableCell numeric>0.95s</TableCell>
     <TableCell numeric>1.2s</TableCell>
     ```
   - Wrong:
     ```tsx
     <TableCell>950ms</TableCell>
     <TableCell>1.2s</TableCell>
     ```
3. table-mono-ids MUST Set mono on cells holding an ID, a key or a path; never put font-mono or code styling on a cell. Because mono sets type-code-sm, 0.8 of the 13px cells, so the wider Glaze Mono does not read a size bigger than the column beside it.
   - Correct: `<TableCell mono>run_8f2a</TableCell>`
   - Wrong: `<TableCell className="font-mono">run_8f2a</TableCell>`
4. table-status-word MUST Show a row's outcome with Status in its own cell; never tint the row or colour the text of other cells. Because colour means status only in Glaze and always comes with a word, and a red row loses its meaning in forced colours and to a screen reader.
   - Correct: `<TableCell className="text-end"><Status status="fail" size="sm"/></TableCell>`
   - Wrong: `<TableRow className="bg-fail-tint">…</TableRow>`
5. table-no-box NEVER Wrap a Table in a Card or another bordered box; it brings its own shell and panel, or use frame="none" inside a Card's flush content. Because a card around a card is two edges where one closes the group.
   - Correct:
     ```tsx
     <Card><CardHeader>…</CardHeader><CardContent flush><Table frame="none" aria-label="Runs">…</Table></CardContent></Card>
     ```
   - Wrong: `<Card><Table aria-label="Runs">…</Table></Card>`
6. table-empty-row MUST Show no rows with TableEmpty spanning every column, and loading with TableLoading, inside TableBody. Because the head row stays, so the columns do not jump when rows land, and the message sits where the first row would be.
   - Correct: `<TableBody>{rows.length ? rows.map(row) : <TableEmpty colSpan={4} title="No runs yet"/>}</TableBody>`
   - Wrong: `{rows.length ? <Table>…</Table> : <p>No runs</p>}`
7. table-sort-head MUST Make a column sortable with sort and onSort on its TableHead, never a click handler on the th. Because TableHead renders a real button and sets aria-sort, so the sort is reachable by Tab and announced with its direction.
   - Correct: `<TableHead numeric sort={sort} onSort={sortByDuration}>Duration</TableHead>`
   - Wrong: `<TableHead onClick={sortByDuration}>Duration</TableHead>`
8. table-select-column SHOULD Put the selection Checkbox first, name each one with its row ("Select run_8f2a"), and pass selected on the TableRow. Because the column keeps 40px and the selected wash, and "Select row 3" says nothing after a sort.
9. table-sticky SHOULD Pass stickyHeader with a maxHeight for a table longer than the screen. Because the heads say which column a value is in, and without them a long scroll loses the column names.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `frame` | `'card' \| 'none'` | `'card'` | card puts the table in the shell and panel; none is bare, for a Card's flush content. |
| `title` | `ReactNode` |  | The head row's title inside the panel. Names the table. |
| `count` | `ReactNode` |  | After the title, in tabular figures. |
| `actions` | `ReactNode` |  | At the end of the head row: ghost icon-sm buttons or one sm secondary. |
| `toolbar` | `ReactNode` |  | A strip under the head row for filters. |
| `footer` | `ReactNode` |  | The shell's footer row: pagination or totals. |
| `stickyHeader` | `boolean` | `false` | Keeps the heads in view while the rows scroll. Needs maxHeight. |
| `maxHeight` | `number \| string` |  | The scroll box's height. |
| `TableHead numeric, sort, onSort` | `boolean, 'asc' \| 'desc' \| false, (event) => void` |  | Right-aligns; makes the head a sort button with aria-sort. |
| `TableCell numeric, mono` | `boolean` | `false` | Tabular figures at the end; Glaze Mono at 0.8. |
| `TableRow selected, open` | `boolean` |  | The pressed wash, with aria-selected or aria-current. |
| `TableEmpty` | `{colSpan, title, description?, action?, reason?}` |  | The body's one row when there are no records. |
| `TableLoading` | `{rows?, columns, hidden?}` |  | Still placeholder rows the shape of the cells. |
Other props pass through to the table element (Table), the tr, th and td elements (the parts).

## Variants and states
- frame: card, none
- states: rest, hover, selected, sorted, loading, empty
- when states meet, the first wins: loading > empty > selected > open > hover > rest

## Accessibility
- [ ] Name the table with title or aria-label; a scroll box that overflows takes a tab stop and the same name.
- [ ] A sortable head is a button inside the th, which carries aria-sort ascending, descending or none.
- [ ] Selected rows set aria-selected and the open row aria-current; the wash is never the only sign, the checkbox is ticked.
- [ ] Heads are 12/500 text-2 (5.5:1), cells text-1; the row rule is decoration and needs no contrast.
- [ ] Set aria-busy on the Table while TableLoading shows; the placeholder rows are aria-hidden.

## Keyboard
- `Tab`: Moves to the scroll box while it overflows, then to each sort button, checkbox and row action.
- `Enter`: On a sort head, sorts; Space on a checkbox ticks it.
- `Arrow keys`: In the focused scroll box, scroll it.

## Edge cases
- Wider than its box -> The panel scrolls sideways; the shell and its footer stay put.
- Long value -> Cells never wrap; put a long value in Truncate inside the cell, which keeps the whole value.
- Missing number -> Write None in the cell; an empty cell reads as a rendering bug.
- Last row -> Drops the row rule; the panel's edge closes it.
- Touch screen -> Row actions and the unsorted sort mark always show, since nothing hovers.
- Dark theme -> The shell, panel and washes flip with their tokens; ticked checkboxes turn to light glass.

## Tokens
--shell, --paper, --line-faint, --hover, --pressed, --row, --control-sm, --text-1, --text-2, --text-3, --type-body-sm, --type-label-sm, --type-code-sm, --radius-shell, --radius-panel, --shell-inset, --z-raised

## Related
- [Data grid](/systems/glaze/components/data-grid.md): Sorts, selects and pages records from data.
- [Pagination](/systems/glaze/components/pagination.md): Moves through pages of results.
- [Bulk action bar](/systems/glaze/components/bulk-action-bar.md): Acts on the rows a person selected.
- [Item](/systems/glaze/components/item.md): Shows one thing as a row in a list.
- [Data list](/systems/glaze/components/data-list.md): Lists label and value pairs about one thing.
