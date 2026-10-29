---
name: Filter bar
system: glaze
kind: component
import: "import {FilterBar, FilterBarSearch, FilterBarChips, FilterChip, FilterToggle, FilterBarSelect, FilterBarAdd, FilterBarClear, FilterBarCount, useFilteredRows} from '@/components/glaze/ui/filter-bar'"
install: "npx shadcn@latest add https://design.how/r/glaze/filter-bar.json"
registryDependencies: [button, chip, dropdown-menu, icon, input, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/filter-bar
---

# Filter bar

Narrows a long list.

## Use when
- Above a list or a table of twenty or more rows that people narrow by text and by known fields.
- Filters that combine: a status and an agent and a model at once.

## Don't use when
- Switching between two to five fixed views of the same data. Use [Segmented control](/systems/glaze/components/segmented-control.md).
- Searching the whole product and running commands. Use [Command](/systems/glaze/components/command.md).
- A value a form submits. Use [Select](/systems/glaze/components/select.md).

## Minimal example
```tsx
<FilterBar aria-label="Filter runs">
  <FilterBarSearch value={query} onValueChange={setQuery} placeholder="Search runs"/>
  <FilterBarSelect label="Status" multiple options={options} value={status} onValueChange={setStatus}/>
  <FilterBarCount shown={rows.length} total={runs.length} noun="runs"/>
  {anySet && <FilterBarClear onClick={clear}/>}
</FilterBar>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. filter-bar-facet-counts MUST Pass each option's count from useFilteredRows, counted against the search, the other filters and the pressed toggles. Because a count against the whole list promises rows the other filters already hide, so the pick empties the list.
   - Correct: `count: counts.status[s] ?? 0`
   - Wrong: `count: runs.filter(r => r.status === s).length`
2. filter-bar-count MUST Put a FilterBarCount in every bar. Because its status region is the only thing a screen reader hears when the list changes.
   - Correct: `<FilterBar><FilterBarSearch …/><FilterBarCount shown={12} total={240} noun="runs"/></FilterBar>`
   - Wrong: `<FilterBar><FilterBarSearch …/></FilterBar>`
3. filter-bar-landmark MUST Give FilterBar an aria-label naming what it filters. Because the bar is a search landmark, and unnamed ones read alike in the landmark list.
   - Correct: `<FilterBar aria-label="Filter runs">`
   - Wrong: `<FilterBar>`
4. filter-bar-clear-when-set MUST Render FilterBarClear only while a filter or the search is set. Because a Clear all with nothing to clear is a dead tab stop that suggests a filter is still on.
   - Correct: `{anySet && <FilterBarClear onClick={clear}/>}`
   - Wrong: `<FilterBarClear onClick={clear}/>`
5. filter-bar-one-shortcut MUST Keep shortcut="/" on the page's main bar and pass shortcut={null} to every other bar. Because only the first claiming search takes "/", so a second bar shows a hint for a key that focuses another field.
   - Correct: `<FilterBarSearch shortcut={null} …/>`
   - Wrong: `<FilterBarSearch …/> {/* a second bar */}`
6. filter-bar-no-glass NEVER Make a filter chip a primary Button or give it glass to show it is set. Because a row of filters has no lead; a set filter takes the pressed wash, and glass would make it read as the page's main action.
   - Correct: `<FilterBarSelect label="Status" value="fail" …/>`
   - Wrong: `<Button size="sm">Status: Failed</Button>`
7. filter-bar-no-apply NEVER Add an Apply button; apply each change as it happens. Because until the press the chips say one thing and the list another, and the count announces nothing.
   - Correct: `<FilterBar>…<FilterBarCount …/></FilterBar>`
   - Wrong: `<FilterBar>…<Button>Apply filters</Button></FilterBar>`
8. filter-bar-show-value SHOULD Pass showValue={false} to a FilterBarSelect whose values also show as FilterChips. Because otherwise the same filter reads twice, on the chip in the bar and on the chip below it.
   - Correct: `<FilterBarSelect label="Status" showValue={false} …/>`
9. filter-bar-select-label SHOULD Name a filter with the column's one-word name; the chip adds the value.
   - Correct: `<FilterBarSelect label="Status"/>`
   - Wrong: `<FilterBarSelect label="Filter by status"/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `FilterBar` | `div props` |  | role="search"; one row, the count and Clear all at its end. |
| `FilterBarSearch value, onValueChange, shortcut` | `string, (v) => void, string \| null` | `, , '/'` | Input's search mode at 26px. |
| `FilterBarSelect label, options` | `string, {value, label, count?, disabled?}[]` |  | A chip that opens a menu. |
| `FilterBarSelect multiple, value, onValueChange` | `boolean, string \| string[]` | `false` | Checkbox rows that stay open, or radio rows. |
| `FilterBarSelect showValue, showAllOption, sinkEmpty` | `boolean` | `true, false, with counts` | What the chip and the menu show. |
| `FilterBarAdd label, options, value` | `string, FilterOption[], string \| null` |  | The dashed chip; one value per field. |
| `FilterToggle` | `Chip props` |  | A quick filter that sits pressed. |
| `FilterBarChips, FilterChip label, value, onRemove` | `div; string, ReactNode, () => void` |  | Applied filters, removable. |
| `FilterBarCount shown, total, noun` | `number, number, string` |  | A status region. |
| `useFilteredRows` | `(rows, {search, match, fields, filters, where})` |  | Returns {rows, counts}. |
Other props pass through to the root element.

## Variants and states
- chip: select, toggle, add, add, set, applied
- states: rest, hover, focus, set, open, option empty, disabled
- when states meet, the first wins: disabled > open > set > focus > hover > rest

## Accessibility
- [ ] The bar is a search landmark named by aria-label.
- [ ] A filter chip is a menu button named by the filter and its value ("Status: Failed, Waiting").
- [ ] The count speaks once typing pauses for 500ms, not on every key.
- [ ] Removing a chip moves focus to the next chip, or back to the filter that set it; Clear all hands focus to the search.
- [ ] A sunk option says why under its label, so its quiet text is not the only cue.

## Keyboard
- `/`: Focuses the bar's search from outside a field, dialog or menu.
- `Escape`: In the search, clears it; in a menu, closes it.
- `Enter, Space, Down`: On a filter chip: opens its menu.
- `Backspace, Delete`: On an applied chip's remove button: removes it.

## Edge cases
- Narrow row -> Under 28rem of bar the search takes its own row; the chips, the count and Clear all go under it, the count still at the end. Under 18rem the count is only announced.
- Option that leaves nothing -> Sinks under a rule, quiet, with "None left with the other filters" above it.
- Several values -> The chip shows the filter name and a count; the menu stays open between picks.
- Nothing left -> The count reads 0 of 240; show an EmptyState in the list with Clear all.
- Right to left -> The row runs right to left; the count keeps its own number order.

## Tokens
--paper, --line-control, --line-focus, --line-faint, --pressed, --hover, --text-1, --text-2, --text-3, --text-disabled, --control-sm, --menu-row-sm, --popover, --radius-pill, --type-label-sm, --type-caption

## Related
- [Chip](/systems/glaze/components/chip.md): Shows a filter or a chosen value.
- [Input](/systems/glaze/components/input.md): Takes one line of text.
- [Dropdown menu](/systems/glaze/components/dropdown-menu.md): Lists the actions on one thing.
- [Combobox](/systems/glaze/components/combobox.md): Finds one or more values by typing.
