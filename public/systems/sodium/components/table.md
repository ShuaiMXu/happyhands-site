---
name: Table
system: sodium
kind: component
import: "import {Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption, TableEmpty, TableLoading, TableTitle, TableToolbar, TableSortButton, TableRowActions, TableRowAction, tableClassName, bodyClassName, rowClassName, headClassName, cellClassName} from '@/components/sodium/ui/table'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/table.json"
registryDependencies: [button, empty-state, icon, scroll, skeleton, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/table
---

# Table

Lists records that share the same fields.

## Use when
- A handful to a few hundred records a person compares across columns: jobs, partitions, tables, workers.
- Exact values that must line up: row counts, durations, bytes.

## Don't use when
- A job's output, line by line. Use [Log viewer](/systems/sodium/components/log-viewer.md).
- One record's nested fields. Use [JSON view](/systems/sodium/components/json-view.md).

## Minimal example
```tsx
<Table title="Jobs" count={jobs.length}>
  <TableHeader><TableRow><TableHead>Job</TableHead><TableHead numeric>Rows</TableHead></TableRow></TableHeader>
  <TableBody>{jobs.map(j => <TableRow key={j.id}>
    <TableCell mono>{j.id}</TableCell><TableCell numeric>{j.rows}</TableCell>
  </TableRow>)}</TableBody>
</Table>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. table-label MUST Give every Table a title or an aria-label. Because a screen reader announces an unnamed "table", and a page with two cannot be told apart in the tables list.
   - Correct: `<Table title="Jobs">…</Table>`
   - Wrong: `<Table>…</Table>`
2. table-numeric MUST Set numeric on the TableHead and every TableCell of a column of numbers, and give the column one unit. Because numeric right-aligns the column in Commit Mono, so the digits stack by place; 950ms beside 1.2s makes the eye compare the wrong digits.
   - Correct:
     ```tsx
     <TableCell numeric>0.95s</TableCell>
     <TableCell numeric>1.20s</TableCell>
     ```
   - Wrong:
     ```tsx
     <TableCell>950ms</TableCell>
     <TableCell>1.2s</TableCell>
     ```
3. table-mono-ids MUST Set mono on cells holding an ID, a key or a path; never type-label or font-mono on a cell. Because mono sets type-code, 13px as written, level with the 14px sans; a label role would put the ID in capitals and change what it says.
   - Correct: `<TableCell mono>job_4f2a91</TableCell>`
   - Wrong: `<TableCell className="type-label">job_4f2a91</TableCell>`
4. table-no-row-colour NEVER Tint a row or colour the text of its cells to show its outcome. Because colour in Sodium is status and always comes with a word, and a red row loses its meaning in forced colours and to a screen reader.
   - Correct: `<TableCell>{statusWord}</TableCell>`
   - Wrong: `<TableRow className="bg-fail-tint">…</TableRow>`
5. table-no-box NEVER Wrap a Table in a panel, a frame or another bordered box. Because the table is a frame already, and a box in a box is two edges where Sodium draws one.
   - Correct: `<Table title="Jobs">…</Table>`
   - Wrong: `<div className="panel"><Table title="Jobs">…</Table></div>`
6. table-empty-row MUST Show no rows with TableEmpty spanning every column, and loading with TableLoading, inside TableBody. Because the heads stay, so the columns do not jump when rows land, and the message sits where the first row would be.
   - Correct: `<TableBody>{rows.length ? rows.map(row) : <TableEmpty colSpan={3} title="No jobs yet."/>}</TableBody>`
   - Wrong: `{rows.length ? <Table>…</Table> : <p>No jobs</p>}`
7. table-sort-head MUST Make a column sortable with sort and onSort on its TableHead, never a click handler on the th. Because TableHead renders a real button and sets aria-sort, so the sort is reachable by Tab and announced with its direction.
   - Correct: `<TableHead numeric sort={sort} onSort={sortByRows}>Rows</TableHead>`
   - Wrong: `<TableHead onClick={sortByRows}>Rows</TableHead>`
8. table-select-column SHOULD Put the selection Checkbox first, name each one with its row ("Select job_4f2a91"), and pass selected on the TableRow. Because the column keeps 40px and the selection wash, and "Select row 3" says nothing after a sort.
9. table-dense SHOULD Use size="sm" only for a table that shares the screen with other regions, such as a list beside a log. Because 32px rows fit more on screen but are a smaller target, and a table alone on its page has the room for 40.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `size` | `'default' \| 'sm'` | `'default'` | 40px rows, or 32px for a dense table. |
| `title` | `ReactNode` |  | The head row's title as a mono label. Names the table. |
| `count` | `ReactNode` |  | After the title, in text-3. |
| `actions` | `ReactNode` |  | At the end of the head row: size="sm" buttons, one primary at most. |
| `toolbar` | `ReactNode` |  | A row under the head row for a FilterBar. |
| `footer` | `ReactNode` |  | The footer row on the panel: pagination or totals. |
| `stickyHeader` | `boolean` | `false` | Keeps the heads in view while the rows scroll. Needs maxHeight. |
| `maxHeight` | `number \| string` |  | The scroll box's height. |
| `TableHead numeric, sort, onSort` | `boolean, 'asc' \| 'desc' \| false, (event) => void` |  | Right-aligns; makes the head a sort button with aria-sort. |
| `TableCell numeric, mono` | `boolean` | `false` | Commit Mono at 13px; numeric also right-aligns. |
| `TableRow selected, open` | `boolean` |  | The selection wash, with aria-selected or aria-current. |
| `TableEmpty` | `{colSpan, title, description?, action?, reason?}` |  | The body's one row when there are no records. |
| `TableLoading` | `{rows?, columns}` |  | Still placeholder rows the shape of the cells. |
Other props pass through to the table element (Table), the tr, th and td elements (the parts).

## Variants and states
- size: default, sm
- title: none, title
- states: rest, hover, selected, sorted, loading, empty
- when states meet, the first wins: loading > empty > selected > open > hover > rest

## Accessibility
- [ ] Name the table with title or aria-label; a scroll box that overflows takes a tab stop and the same name.
- [ ] A sortable head is a button inside the th, which carries aria-sort ascending, descending or none.
- [ ] Selected rows set aria-selected and the open row aria-current; the wash is never the only sign, the checkbox is ticked.
- [ ] Heads are text-3 on the page, 5.6:1 in light; cells are text-1; the row rule is decoration and needs no contrast.
- [ ] Set aria-busy on the Table while TableLoading shows; the placeholder rows are aria-hidden.

## Keyboard
- `Tab`: Moves to the scroll box while it overflows, then to each sort button, checkbox and row action.
- `Enter`: On a sort head, sorts; Space on a checkbox ticks it.
- `Arrow keys`: In the focused scroll box, scroll it.

## Edge cases
- Wider than its box -> The rows scroll sideways inside the frame; the head and footer rows stay put.
- Long value -> Cells never wrap; the row scrolls sideways rather than break an ID.
- Missing number -> Write None in the cell; an empty cell reads as a rendering bug.
- Last row -> Drops the row rule; the frame's edge closes it.
- Touch screen -> Row actions and the unsorted sort mark always show, since nothing hovers.
- Dark theme -> The frame, panel and rules flip with their tokens; the selection wash turns into the dark yellow tint under text-1.

## Tokens
--page, --panel, --line, --line-faint, --hover, --selected, --selected-strong, --row, --row-sm, --control-sm, --text-1, --text-2, --text-3, --type-body-sm, --type-label, --type-label-sm, --type-code, --z-raised

## Related
- [Filter bar](/systems/sodium/components/filter-bar.md): Narrows a table, a log or a list in one row.
- [Log viewer](/systems/sodium/components/log-viewer.md): Shows a job's output lines as they stream.
- [JSON view](/systems/sodium/components/json-view.md): Shows structured data as a foldable tree.
