---
name: Dropdown menu
system: glaze
kind: component
import: "import {DropdownMenu, DropdownMenuPortal, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuLinkItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent} from '@/components/glaze/ui/dropdown-menu'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/dropdown-menu.json"
registryDependencies: [icon, kbd, overlay, portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/dropdown-menu
---

# Dropdown menu

Lists the actions on one thing.

## Use when
- Three or more actions on one item would crowd its row.
- A row where people expect a right click, with the same actions on a visible More button.
- A few view settings that toggle: columns, sort, density.

## Don't use when
- One or two actions; show them. Use [Button](/systems/glaze/components/button.md).
- Finding one of many commands by name. Use [Command](/systems/glaze/components/command.md).
- A few lines of content or a small form. Use [Popover](/systems/glaze/components/popover.md).

## Minimal example
```tsx
<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="secondary"/>}>Actions</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Retry run</DropdownMenuItem>
    <DropdownMenuSeparator/>
    <DropdownMenuItem variant="destructive">Delete run</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. dropdown-menu-destructive-last MUST Put a destructive item last, after a DropdownMenuSeparator, with variant="destructive". Because a destructive item first sits under the pointer and the first arrow press, one slip from Delete.
   - Correct:
     ```tsx
     <DropdownMenuItem>Retry run</DropdownMenuItem>
     <DropdownMenuSeparator/>
     <DropdownMenuItem variant="destructive">Delete run</DropdownMenuItem>
     ```
   - Wrong:
     ```tsx
     <DropdownMenuItem variant="destructive">Delete run</DropdownMenuItem>
     <DropdownMenuItem>Retry run</DropdownMenuItem>
     ```
2. dropdown-menu-no-coral-class NEVER Colour an item by className; use variant="destructive". Because a hand-set colour skips the fail tint on highlight and the dark theme's coral.
   - Correct: `<DropdownMenuItem variant="destructive">Delete run</DropdownMenuItem>`
   - Wrong: `<DropdownMenuItem className="text-fail-text">Delete run</DropdownMenuItem>`
3. dropdown-menu-visible-path MUST Put the same actions behind a visible More button on every row a contextmenu trigger covers. Because a right click or a long press is invisible, so a person who never tries one never finds the actions.
   - Correct:
     ```tsx
     <Button size="icon-sm" variant="ghost" aria-label="Actions for run_8f2a91">…</Button>
     <DropdownMenu trigger="contextmenu">…</DropdownMenu>
     ```
   - Wrong: `<DropdownMenu trigger="contextmenu">…</DropdownMenu>`
4. dropdown-menu-link-item MUST Use DropdownMenuLinkItem for an item that navigates; never an item with router.push. Because router.push leaves a menu item with no href, so open in a new tab and copy link do nothing.
   - Correct: `<DropdownMenuLinkItem href="/runs/8f2a91">Open run</DropdownMenuLinkItem>`
   - Wrong: `<DropdownMenuItem onClick={() => router.push('/runs/8f2a91')}>Open run</DropdownMenuItem>`
5. dropdown-menu-icon-trigger-name MUST Name an icon trigger with the object it acts on. Because every row's trigger reads "More", so a screen reader cannot tell which row it opens.
   - Correct: `<Button size="icon-sm" aria-label="Actions for run_8f2a91">`
   - Wrong: `<Button size="icon-sm" aria-label="More">`
6. dropdown-menu-size-matches SHOULD Pass size="sm" to DropdownMenuContent opened from a small control or a row, so 28px rows match the 26px trigger.
   - Correct:
     ```tsx
     <DropdownMenuTrigger render={<Button size="icon-sm" …/>}/>
     <DropdownMenuContent size="sm">
     ```
7. dropdown-menu-item-verb SHOULD Start each item with a verb in sentence case, naming the object when the menu covers several.
   - Correct: `<DropdownMenuItem>Copy run ID</DropdownMenuItem>`
   - Wrong: `<DropdownMenuItem>ID</DropdownMenuItem>`
8. dropdown-menu-no-shadow NEVER Add a shadow to DropdownMenuContent; the ring on paper is its edge. Because Glaze has no shadows, and every shadow class draws nothing here.
   - Correct: `<DropdownMenuContent>`
   - Wrong: `<DropdownMenuContent className="shadow-lg">`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `DropdownMenu trigger` | `'click' \| 'contextmenu'` | `'click'` | contextmenu opens at the pointer and marks the row. |
| `DropdownMenu onTargetChange` | `(row: HTMLElement \| null) => void` |  | The marked row on open, null on close. |
| `DropdownMenuTrigger selectable` | `boolean` | `false` | A context trigger keeps text selection. |
| `DropdownMenuContent size` | `'default' \| 'sm'` | `'default'` | 32px rows, or 28px in the 12px label. |
| `DropdownMenuItem variant` | `'default' \| 'destructive'` | `'default'` | destructive goes last, after a separator. |
| `DropdownMenuItem inset` | `boolean` | `false` | Lines a plain item up with checkbox items. |
| `DropdownMenuShortcut keys` | `string[]` |  | One cap per key at the row's end. |
| `DropdownMenuCheckboxItem, RadioItem` | `Base UI` |  | closeOnClick keeps the menu open. |
Other props pass through to the root element.

## Variants and states
- size: default, sm
- trigger: click, contextmenu
- item variant: default, destructive
- states: closed, open, highlighted, destructive highlighted, disabled, checked, submenu open, target marked
- when states meet, the first wins: disabled > highlighted > checked > rest

## Accessibility
- [ ] The trigger carries aria-haspopup="menu" and aria-expanded; the popup is role="menu".
- [ ] The highlighted row's wash is the focus indicator; forced colors draw a 2px outline on it.
- [ ] A disabled item stays reachable by arrows so its label is read; Enter does nothing.
- [ ] Checkbox and radio items are menuitemcheckbox and menuitemradio with aria-checked.
- [ ] A context menu takes the row's name through aria-label, since it has no trigger button.

## Keyboard
- `Enter, Space, Down`: On the trigger: opens with the first item highlighted.
- `Up, Down, a letter`: Moves the highlight; a letter jumps to the next item starting with it.
- `Right, Left`: Opens and closes a submenu, mirrored in right to left.
- `Shift+F10`: Opens a context menu at the focused row.
- `Escape`: Closes this menu only and returns focus to the trigger.

## Edge cases
- Long item label -> Wraps inside the panel, which stops at the available width.
- Forty items -> The panel scrolls past 320px; group them with labels, or use a Command.
- Near a viewport edge -> It flips or shifts to stay 8px inside.
- Touch -> A long press opens the context menu without selecting a word.
- Failed action -> Report it in a toast after the menu closes; the menu has no error state.
- Reduced motion -> It cuts in and out.

## Tokens
--paper, --line, --line-faint, --radius-overlay, --radius-tag, --menu-min, --menu-row, --menu-row-sm, --popup-max, --hover, --pressed, --fail-tint, --fail-text, --type-label, --type-label-sm, --type-caption, --type-code-xs, --text-1, --text-2, --text-3, --text-disabled, --ink

## Related
- [Command](/systems/glaze/components/command.md): Finds and runs a command by typing.
- [Popover](/systems/glaze/components/popover.md): Shows a few lines next to a control.
- [Kbd](/systems/glaze/components/kbd.md): Shows a key or a shortcut.
