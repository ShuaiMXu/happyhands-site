---
name: Filter bar
system: sodium
kind: component
import: "import {FilterBar, FilterBarSearch, FilterToggle, FilterBarSelect, FilterBarClear, FilterBarCount, useFilteredRows} from '@/components/sodium/ui/filter-bar'"
install: "npx shadcn@latest add https://design.how/r/sodium/filter-bar.json"
registryDependencies: [button, icon, input, overlay, portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/filter-bar
---

# Filter bar

Narrows a table, a log or a list in one row.

## Use when
- Above a table or a list of jobs, partitions or runs longer than a screen, that a person narrows by text and by a few fields.
- In a Table's toolbar row, where it fills the row.

## Don't use when
- One search over a short list, with nothing else to narrow by. Use [Input](/systems/sodium/components/input.md).
- Switching between two to five views of the same thing. Use [Segmented control](/systems/sodium/components/segmented-control.md).

## Minimal example
```tsx
<FilterBar aria-label="Filter jobs">
  <FilterBarSearch value={q} onValueChange={setQ} placeholder="Search jobs"/>
  <FilterBarSelect multiple label="Status" value={status} onValueChange={setStatus} options={statusOptions}/>
  <FilterToggle pressed={failedOnly} onPressedChange={setFailedOnly}>Failed only</FilterToggle>
  <FilterBarCount shown={rows.length} total={jobs.length} noun="jobs"/>
</FilterBar>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. filter-bar-one-row MUST Keep the bar to one row of 26px controls: the search, then the filters, then the count and Clear. Because every control at one height with one 1px edge reads as one ruled row; a 32px field or a second row of chips beside it breaks the line.
   - Correct:
     ```tsx
     <FilterBar aria-label="Filter jobs"><FilterBarSearch value={q} onValueChange={setQ}/><FilterBarSelect label="Status" options={o}/></FilterBar>
     ```
   - Wrong: `<FilterBar><Input mode="search"/><FilterBarSelect label="Status" options={o}/></FilterBar>`
2. filter-bar-long-lists NEVER Put a filter bar over a list that fits on one screen. Show one only once the rows run past a screen. Because six rows are read faster than they are filtered, so a search and two filters above them are a row of chrome that pushes the rows down.
   - Correct: `<Table rows={runs}/>  // 6 runs: no bar`
   - Wrong:
     ```tsx
     <FilterBar aria-label="Filter runs">{search}{status}</FilterBar>
     <Table rows={runs}/>  // 6 runs
     ```
3. filter-bar-no-primary NEVER Put a primary Button in the bar, or style a set filter as one. Because a row of filters has no lead, and in dark a tint with a yellow line is the primary button, so a filter drawn that way reads as the action.
   - Correct: `<FilterBar aria-label="Filter jobs"><FilterBarSearch value={q} onValueChange={setQ}/></FilterBar>`
   - Wrong: `<FilterBar><FilterBarSearch value={q} onValueChange={setQ}/><Button>Apply</Button></FilterBar>`
4. filter-bar-count MUST Show the count with FilterBarCount, "128 of 1,204 jobs", whenever a filter can narrow the list. Because the count says the filters worked, and its status region tells a screen reader once typing pauses.
   - Correct: `<FilterBarCount shown={rows.length} total={jobs.length} noun="jobs"/>`
   - Wrong: `<span>{rows.length}</span>`
5. filter-bar-option-counts SHOULD Pass each option a count from useFilteredRows. Because the counts are taken against every other filter, so an option that would empty the list sinks under "None left" before it is picked.
6. filter-bar-values-as-written MUST Give options their values as written: failed, eu-west-2, events_daily. Because the field is the label in capitals and the value is data; a capitalised region or table name is a different string from the one in the rows.
   - Correct: `{value: 'eu-west-2', label: 'eu-west-2'}`
   - Wrong: `{value: 'eu-west-2', label: 'EU-WEST-2'}`
7. filter-bar-clear SHOULD Render FilterBarClear only while something is set. Because a Clear with nothing to clear is a dead control, and it hands focus back to the search when it goes.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `FilterBar` | `div props` |  | role="search"; name it with aria-label. |
| `FilterBarSearch value, onValueChange` | `string, (value) => void` |  | Input's search mode at 26px, filling the spare width. |
| `FilterBarSearch shortcut` | `string \| null` | `'/'` | The key that focuses it from anywhere; null turns it off. |
| `FilterBarSelect label, options` | `string, FilterOption[]` |  | The field in capitals; options are {value, label, count?, disabled?}. |
| `FilterBarSelect multiple` | `boolean` | `false` | Checkbox rows that stay open; value is string[]. |
| `FilterBarSelect showAllOption, allLabel` | `boolean, string` | `false, 'All'` | A row at the top that clears the filter. |
| `FilterToggle pressed, onPressedChange` | `boolean, (pressed) => void` |  | A quick filter on Base UI Toggle. |
| `FilterBarCount shown, total, noun` | `number, number, string` |  | "128 of 1,204 jobs", announced once typing pauses. |
| `FilterBarClear` | `Button props` | `'Clear'` | A small ghost button at the end. |
| `useFilteredRows` | `(rows, {search, match, fields, filters, where}) => {rows, counts}` |  | The rows that pass, and each option's count against the others. |
Other props pass through to the div (FilterBar), the Base UI part (each filter).

## Variants and states
- filter: select, select, set, multiple, set, toggle, toggle, on
- states: rest, hover, focus-visible, open, set, several set, disabled
- when states meet, the first wins: disabled > open > set > focus-visible > hover > rest

## Accessibility
- [ ] The bar is role="search", named by aria-label.
- [ ] A filter's name says its value: "Status: failed, queued"; the caret is decoration.
- [ ] A quick filter is a toggle with aria-pressed; the selection wash is never the only sign, the name says what it does.
- [ ] The count speaks once through a status region, 500ms after typing pauses.
- [ ] Focus is Sodium's 2px gold ring 2px out on each cell; an open menu turns the cell white with its edge --focus doubled inward and a pale halo, as a field with the cursor in it.
- [ ] In the menu the highlighted option lifts to white between two hairlines and a chosen one carries an ink check, no fill.

## Keyboard
- `/`: Focuses the search from anywhere outside a field, dialog or menu.
- `Escape`: In the search, clears it; in a menu, closes it.
- `Enter or Space`: Opens a filter's menu, or turns a quick filter on or off.
- `Arrow keys`: Move through a menu's options.

## Edge cases
- Narrow bar, under 28rem -> The search takes its own row; the filters, count and Clear go under it.
- Very narrow, under 18rem -> The count is only heard, not shown.
- Long value -> The cell ends its value in an ellipsis; the name keeps the whole value.
- Several values chosen -> The cell shows how many; the name lists them.
- Option that would empty the list -> Sinks below a rule under "None left with the other filters" and cannot be picked.
- Dark theme -> A set filter takes the dark yellow tint under text-1 with its rule edge, never a yellow line.

## Tokens
--control-sm, --field-bg, --field-hover, --field-edge, --field-edge-hover, --field-ring-hover, --field-focus-bg, --field-ring-focus, --field-inset-sm, --row-highlight, --line, --focus, --selected, --selected-strong, --well, --text-1, --text-2, --text-3, --text-disabled, --type-label-sm, --type-code-sm, --type-caption, --icon-sm, --dur-state

## Related
- [Table](/systems/sodium/components/table.md): Lists records that share the same fields.
- [Input](/systems/sodium/components/input.md): Takes one line of text.
- [Log viewer](/systems/sodium/components/log-viewer.md): Shows a job's output lines as they stream.
