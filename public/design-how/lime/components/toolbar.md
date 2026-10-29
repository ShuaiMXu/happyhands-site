---
name: Toolbar
system: lime
kind: component
import: "import {Toolbar, ToolbarGroup, ToolbarButton, ToolbarToggle, ToolbarSeparator} from '@/components/lime/ui/toolbar'"
install: "npx shadcn@latest add https://design.how/r/lime/toolbar.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/toolbar
---

# Toolbar

Keeps a row of buttons that all work on the same thing.

## Use when
- Controls that act on the same thing: receipt, split and repeat on a transaction.
- Filters above a list, such as Income and Spending.
- Four or more small controls that would add four tab stops.

## Don't use when
- One or two separate actions. Use [Button](/systems/lime/components/button.md).
- Choosing one value from a short list. Use [Segmented](/systems/lime/components/segmented.md).
- Commands behind one button. Use [Dropdown menu](/systems/lime/components/dropdown-menu.md).
- Site navigation. Use links in a nav element.

## Minimal example
```tsx
<Toolbar aria-label="Transaction tools">
  <ToolbarButton>Split</ToolbarButton>
  <ToolbarSeparator/>
  <ToolbarToggle defaultPressed>Repeat</ToolbarToggle>
</Toolbar>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. toolbar-name-icon-items MUST Give an icon-only item an aria-label. Because a screen reader reads "button" with no name for an icon item.
   - Correct: `<ToolbarButton aria-label="Add receipt"><Icon icon={Receipt}/></ToolbarButton>`
   - Wrong: `<ToolbarButton><Icon icon={Receipt}/></ToolbarButton>`
2. toolbar-name MUST Give the Toolbar an aria-label such as "Transaction tools". Because with two toolbars on a screen, a screen reader hears "toolbar" twice and cannot tell them apart.
   - Correct: `<Toolbar aria-label="Transaction tools">...</Toolbar>`
   - Wrong: `<Toolbar>...</Toolbar>`
3. toolbar-short-labels SHOULD Label a text item with one word, such as Split or Hide.
4. toolbar-not-nav NEVER Build site navigation as a toolbar; links need their own tab stops. Because a toolbar is one tab stop with arrow keys, and its buttons never show in the links list.
   - Correct: `<nav><a href="/">Home</a></nav>`
   - Wrong: `<Toolbar><ToolbarButton>Home</ToolbarButton></Toolbar>`
5. toolbar-eight-items MUST Move rare items past about eight into a Dropdown menu. Because the track does not wrap; it scrolls sideways, and the last items hide past the edge.
6. toolbar-toggle-state MUST Use ToolbarToggle for an on or off setting; it sets aria-pressed and the lime wash. Because a ToolbarButton has no pressed state, so nobody can tell the Income filter is on.
   - Correct: `<ToolbarToggle defaultPressed>Income</ToolbarToggle>`
   - Wrong: `<ToolbarButton onClick={toggleIncome}>Income</ToolbarButton>`
7. toolbar-pending-outside SHOULD Run a slow command from a Button with pending outside the toolbar; items show no progress.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Toolbar` | `Base UI Toolbar.Root props` |  | orientation, loopFocus, aria-label. |
| `ToolbarGroup` | `Base UI Toolbar.Group props` |  | disabled disables every item inside. |
| `ToolbarButton` | `Base UI Toolbar.Button props` |  | onClick, disabled, focusableWhenDisabled. |
| `ToolbarToggle` | `Base UI Toggle props` |  | pressed, defaultPressed, onPressedChange. |
Other props pass through to the root element.

## Variants and states
- item: button, toggle, group, separator
- states: rest, hover, focus-visible, pressed (toggle), disabled

## Accessibility
- [ ] Toolbar is role toolbar: one Tab stop, arrows move between items, and loopFocus wraps at the ends.
- [ ] A toggle reports aria-pressed; the lime wash is a fill, so check a pressed toggle in forced colors.
- [ ] Arrow keys are mirrored in RTL by Base UI.
- [ ] Items are 32px tall; put phone controls in a larger Button row.

## Edge cases
- Long item text -> Items stay nowrap and the toolbar scrolls sideways at the container width.
- Narrow container -> The toolbar scrolls sideways inside its pill instead of wrapping.
- Right to left -> The row reverses; separator margins are symmetric.
- Empty toolbar -> A 40px grey pill; never render it.
- Disabled item -> Arrow keys skip it unless focusableWhenDisabled.
- Tooltip on an item -> It opens on keyboard focus as the arrows move.

## Tokens
--surface, --radius-control, --fg-2, --text-sm, --weight-medium, --surface-2, --fg, --accent-wash, --fg-disabled, --line-strong

## Related
- [Segmented](/systems/lime/components/segmented.md): A short row of exclusive options, such as Week, Month and Year.
- [Dropdown menu](/systems/lime/components/dropdown-menu.md): A list of commands behind a button.
- [Button](/systems/lime/components/button.md): Starts an action, such as Send money. The lime primary is the one glowing action on a screen.
