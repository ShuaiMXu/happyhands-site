---
name: Toolbar
system: glaze
kind: component
import: "import {Toolbar, ToolbarGroup, ToolbarButton, ToolbarToggle, ToolbarSeparator} from '@/components/glaze/ui/toolbar'"
install: "npx shadcn@latest add https://design.how/r/glaze/toolbar.json"
registryDependencies: [button, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/toolbar
---

# Toolbar

Holds a row of actions on one thing.

## Use when
- Three or more actions on one thing: copy, retry and edit under an answer; run, export and wrap over an output.
- On or off settings for a view beside its actions (ToolbarToggle).
- A row that should be one tab stop, with the arrow keys inside it.

## Don't use when
- One or two actions; put Buttons side by side. Use [Button](/systems/glaze/components/button.md).
- Previous and next, or actions joined into one pill. Use [Button group](/systems/glaze/components/button-group.md).
- One view of several. Use [Segmented control](/systems/glaze/components/segmented-control.md).
- Actions on selected rows. Use [Bulk action bar](/systems/glaze/components/bulk-action-bar.md).
- Site navigation: use links in a nav.

## Minimal example
```tsx
<Toolbar aria-label="Answer">
  <ToolbarButton iconOnly aria-label="Copy answer"><Icon icon={Copy}/></ToolbarButton>
  <ToolbarButton iconOnly aria-label="Retry"><Icon icon={Retry}/></ToolbarButton>
  <ToolbarSeparator/>
  <ToolbarToggle iconOnly aria-label="Wrap lines"><Icon icon={Wrap}/></ToolbarToggle>
</Toolbar>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. toolbar-name MUST Name the Toolbar with aria-label for the thing its items act on. Because a screen reader announces "toolbar" alone, and two on one screen cannot be told apart.
   - Correct: `<Toolbar aria-label="Answer">…</Toolbar>`
   - Wrong: `<Toolbar>…</Toolbar>`
2. toolbar-icon-name MUST Give an iconOnly item an aria-label that says the action. Because an icon item has no text, so it is announced as "button" with no name.
   - Correct: `<ToolbarButton iconOnly aria-label="Copy answer"><Icon icon={Copy}/></ToolbarButton>`
   - Wrong: `<ToolbarButton iconOnly><Icon icon={Copy}/></ToolbarButton>`
3. toolbar-one-primary MUST Give a toolbar at most one variant="primary", "confirm" or "destructive" item, at the end; leave the rest ghost. Because the toolbar is one group of actions, and two glass pills in it split the eye.
   - Correct:
     ```tsx
     <ToolbarButton>Export</ToolbarButton>
     <ToolbarButton variant="primary">Run</ToolbarButton>
     ```
   - Wrong:
     ```tsx
     <ToolbarButton variant="primary">Run</ToolbarButton>
     <ToolbarButton variant="primary">Export</ToolbarButton>
     ```
4. toolbar-toggle MUST Use ToolbarToggle for an on or off setting; never a ToolbarButton that changes its own look. Because the toggle sets aria-pressed and the pressed wash, and a button restyled by hand is announced as a plain button.
   - Correct: `<ToolbarToggle pressed={wrap} onPressedChange={setWrap}>Wrap</ToolbarToggle>`
   - Wrong: `<ToolbarButton className={wrap ? 'bg-pressed' : ''} onClick={toggleWrap}>Wrap</ToolbarButton>`
5. toolbar-no-glass-toggle NEVER Put glass on a pressed ToolbarToggle. Because a pressed toggle is a thing you have your hand on, which takes the pressed wash; glass marks a value chosen inside a control or the one lead.
   - Correct: `<ToolbarToggle defaultPressed>Wrap</ToolbarToggle>`
   - Wrong: `<ToolbarToggle className="data-pressed:glass data-pressed:glass-ink">Wrap</ToolbarToggle>`
6. toolbar-no-box NEVER Draw a track, a border or a fill around the toolbar. Because Glaze toolbars are flat, and a grey track reads as a segmented control.
   - Correct: `<Toolbar aria-label="Answer">…</Toolbar>`
   - Wrong: `<Toolbar className="rounded-pill bg-field p-0.5">…</Toolbar>`
7. toolbar-separator-groups SHOULD Split items into ToolbarGroups with a ToolbarSeparator between kinds: actions, then settings.
8. toolbar-few SHOULD Keep it to about eight items; move the rest into a Dropdown menu behind a More item. Because the row never wraps, so items past the edge scroll out of sight.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Toolbar size` | `'default' \| 'sm'` | `'default'` | 32px or 26px items. |
| `Toolbar orientation, loopFocus, aria-label` | `Base UI Toolbar.Root` | `'horizontal', true` | Name it with aria-label. |
| `ToolbarButton variant` | `'ghost' \| 'secondary' \| 'primary' \| 'confirm' \| 'destructive'` | `'ghost'` | One glass item at most. |
| `ToolbarButton iconOnly, pending` | `boolean` | `false` | A square icon item; the pending arc. |
| `ToolbarToggle pressed, defaultPressed, onPressedChange` | `Base UI Toggle` |  | An on or off setting. |
| `ToolbarGroup disabled` | `boolean` | `false` | Turns every item in it off. |
| `ToolbarSeparator` | `Base UI Toolbar.Separator` |  | A 1px rule, 16px tall. |
Other props pass through to the toolbar div (Base UI Toolbar.Root).

## Variants and states
- size: default, sm
- item: text, icon, toggle, with primary
- states: rest, hover, held, focus-visible, pressed, disabled
- when states meet, the first wins: disabled > held > focus-visible > pressed > hover > rest

## Accessibility
- [ ] role="toolbar" named by aria-label; one Tab stop, arrow keys move between items, Home and End go to the ends.
- [ ] A toggle reports aria-pressed; the wash is not the only sign.
- [ ] Focus is the 2px ink ring on the item; the toolbar keeps 4px of room so a scrolling row never clips it.
- [ ] Arrow keys follow the reading direction in right to left.

## Keyboard
- `Tab`: Enters and leaves the toolbar.
- `Arrow left, Arrow right`: Moves between items, wrapping at the ends.
- `Home, End`: Goes to the first or last item.
- `Enter, Space`: Presses the item, or flips a toggle.

## Edge cases
- Wider than its container -> Scrolls sideways with no bar; items never wrap.
- Disabled item -> Turns grey and stays focusable, so arrow keys keep their place.
- Pending item -> Shows the arc at its size and refuses presses; the other items stay live.
- Toolbar on the shell footer -> Ghost items wash on the grey; pass size="sm" to match the footer's 26px actions.
- Dark theme -> The wash turns light; a primary turns to light glass with an ink label.

## Tokens
--hover, --pressed, --line, --text-1, --text-2, --text-disabled, --control, --control-sm, --radius-pill, --type-label, --type-label-sm

## Related
- [Button](/systems/glaze/components/button.md): Starts an action.
- [Button group](/systems/glaze/components/button-group.md): Joins related buttons into one control.
- [Segmented control](/systems/glaze/components/segmented-control.md): Switches between a few views of one thing.
- [Dropdown menu](/systems/glaze/components/dropdown-menu.md): Lists the actions on one thing.
