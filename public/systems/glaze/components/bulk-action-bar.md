---
name: Bulk action bar
system: glaze
kind: component
import: "import {BulkActionBar, BulkAction} from '@/components/glaze/ui/bulk-action-bar'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/bulk-action-bar.json"
registryDependencies: [button, icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/bulk-action-bar
---

# Bulk action bar

Acts on the rows a person selected.

## Use when
- A Table or DataGrid with a selection column, and actions that apply to every selected row.
- A long list where the selection outlives the scroll: position="floating".

## Don't use when
- An action on one row; put it in the row's actions. Use [Table](/systems/glaze/components/table.md).
- Actions on the page as a whole. Use [Button group](/systems/glaze/components/button-group.md).

## Minimal example
```tsx
<BulkActionBar count={selected.length} noun={['run', 'runs']} onClear={clear}>
  <BulkAction onClick={retry}>Retry</BulkAction>
  <BulkAction variant="destructive" onClick={remove}>Delete</BulkAction>
</BulkActionBar>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. bulk-action-bar-one-primary MUST Keep every BulkAction flat (the default secondary) except at most one, which leads as variant="destructive" for what cannot be undone or "primary". Because the bar is a group of actions, and two glass pills side by side split the eye; green confirm never fits a bulk action.
   - Correct:
     ```tsx
     <BulkAction>Retry</BulkAction>
     <BulkAction variant="destructive">Delete</BulkAction>
     ```
   - Wrong:
     ```tsx
     <BulkAction variant="primary">Retry</BulkAction>
     <BulkAction variant="destructive">Delete</BulkAction>
     ```
2. bulk-action-bar-count MUST Pass count from the selection and noun as the singular and plural, and keep the bar mounted at 0. Because the bar hides itself at 0 but keeps its status line, so "Selection cleared" is heard; unmounting it drops that.
   - Correct: `<BulkActionBar count={selected.length} noun={['run', 'runs']} onClear={clear}>…</BulkActionBar>`
   - Wrong: `{selected.length > 0 && <BulkActionBar count={selected.length}>…</BulkActionBar>}`
3. bulk-action-bar-clear MUST Pass onClear. Because it draws the clear button and binds Escape, the two ways out of a selection a person can see and reach.
   - Correct: `<BulkActionBar count={3} onClear={() => setSelection({})}>…</BulkActionBar>`
   - Wrong: `<BulkActionBar count={3}>…</BulkActionBar>`
4. bulk-action-bar-actions NEVER Put a plain Button in the bar; use BulkAction. Because BulkAction joins the toolbar's arrow-key order and takes the bar's 26px size, and a plain Button adds a tab stop at 32px.
   - Correct: `<BulkActionBar count={3} onClear={clear}><BulkAction>Retry</BulkAction></BulkActionBar>`
   - Wrong: `<BulkActionBar count={3} onClear={clear}><Button>Retry</Button></BulkActionBar>`
5. bulk-action-bar-few SHOULD Hold the bar to two to four actions, with a DropdownMenu at the end for the rest. Because the actions scroll sideways once they outgrow the pill, and a hidden action is a missing one.
6. bulk-action-bar-place SHOULD Set position="inline" above the rows for a short table and "floating" for a list longer than the screen. Because a floating bar stays in reach while the person scrolls to pick more rows; above a short table it would cover the rows it acts on.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `count` | `number` |  | How many rows are selected; 0 hides the bar. |
| `noun` | `[string, string]` | `['item', 'items']` | Singular and plural, for the name and the announcement. |
| `onClear` | `() => void` |  | Clears the selection. The clear button and Escape. |
| `position` | `'inline' \| 'floating'` | `'inline'` | In flow, or fixed to the bottom centre of the viewport. |
| `BulkAction variant` | `'secondary' \| 'primary' \| 'destructive'` | `'secondary'` | Flat unless it is the one that leads. |
Other props pass through to the toolbar div (Base UI Toolbar).

## Variants and states
- lead: none, destructive, primary
- count: 1, 1,204

## Accessibility
- [ ] The bar is a toolbar named "Actions for 3 runs selected": one tab stop, arrow keys between its controls.
- [ ] A status line announces the count when it changes, and "Selection cleared" at 0.
- [ ] The clear button is named "Clear selection"; Escape anywhere in the bar does the same.
- [ ] Floating, it sits in the reading order where it is written; put it after the table it acts on.

## Keyboard
- `Tab`: Enters the bar at the last focused control and leaves it.
- `Arrow Left / Right`: Moves between the actions and the clear button.
- `Escape`: Clears the selection.

## Edge cases
- Nothing selected -> The bar hides; its status line stays mounted and says "Selection cleared".
- Too many actions for the width -> The actions scroll sideways inside the pill; the count and clear keep their place.
- Floating on a phone -> The bar spans the viewport less 16px each side and centres.
- A pending action -> Pass pending to that BulkAction; it keeps its size and blocks a second press.
- Dark theme -> Paper and the ring flip with their tokens; the coral lead turns to light glass.

## Tokens
--paper, --line, --control-lg, --control-sm, --radius-pill, --type-label, --text-1, --z-sticky, --space-6

## Related
- [Data grid](/systems/glaze/components/data-grid.md): Sorts, selects and pages records from data.
- [Table](/systems/glaze/components/table.md): Lists records that share the same fields.
- [Button](/systems/glaze/components/button.md): Starts an action.
