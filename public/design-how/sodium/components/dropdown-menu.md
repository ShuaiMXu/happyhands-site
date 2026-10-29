---
name: Dropdown menu
system: sodium
kind: component
import: "import {DropdownMenu, DropdownMenuPortal, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuLinkItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent} from '@/components/sodium/ui/dropdown-menu'"
install: "npx shadcn@latest add https://design.how/r/sodium/dropdown-menu.json"
registryDependencies: [icon, kbd, overlay, portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/dropdown-menu
---

# Dropdown menu

Lists the actions on one thing.

## Use when
- More actions on one thing than fit beside it: a job's replay, copy, open and cancel.
- A row's actions behind its More button, and the same list on a right click.
- View options for a table: which columns, which sort.

## Don't use when
- The person picks a value for a field. Use [Select](/systems/sodium/components/select.md).
- The person finds an action by typing. Use [Command](/systems/sodium/components/command.md).
- A few lines about the thing, not actions. Use [Popover](/systems/sodium/components/popover.md).

## Minimal example
```tsx
<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="secondary"/>}>Actions</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Replay job<DropdownMenuShortcut keys="shift+r"/></DropdownMenuItem>
    <DropdownMenuSeparator/>
    <DropdownMenuItem variant="destructive">Cancel job</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. dropdown-menu-verb MUST Start each item with a verb in sentence case, naming the object when the menu covers several; the row sets the capitals. Because an item is an action, and a label like "ID" does not say what pressing it does.
   - Correct: `<DropdownMenuItem>Copy job ID</DropdownMenuItem>`
   - Wrong: `<DropdownMenuItem>ID</DropdownMenuItem>`
2. dropdown-menu-destructive-last MUST Put a destructive item last, after a separator, with variant="destructive". Because the failure word and its tint mark the one item that loses work, and the rule keeps a slip of the arrow off it.
   - Correct:
     ```tsx
     <DropdownMenuItem>Replay job</DropdownMenuItem>
     <DropdownMenuSeparator/>
     <DropdownMenuItem variant="destructive">Cancel job</DropdownMenuItem>
     ```
   - Wrong:
     ```tsx
     <DropdownMenuItem>Cancel job</DropdownMenuItem>
     <DropdownMenuItem>Replay job</DropdownMenuItem>
     ```
3. dropdown-menu-link-item MUST Use DropdownMenuLinkItem for an item that goes to another page. Because a real link opens in a new tab and copies its address, which an onClick navigation cannot.
   - Correct: `<DropdownMenuLinkItem href="/jobs/4812">Open job</DropdownMenuLinkItem>`
   - Wrong: `<DropdownMenuItem onClick={() => router.push('/jobs/4812')}>Open job</DropdownMenuItem>`
4. dropdown-menu-context-path MUST Give every context menu a visible path too, usually the row's More button with the same items. Because a right click is invisible until tried, and a keyboard or touch user may never find it.
   - Correct:
     ```tsx
     <DropdownMenu trigger="contextmenu">…</DropdownMenu>
     <DropdownMenu><DropdownMenuTrigger aria-label="Job actions" …/></DropdownMenu>
     ```
   - Wrong: `<DropdownMenu trigger="contextmenu">…</DropdownMenu>`
5. dropdown-menu-shortcut-keys SHOULD Write a shortcut as keys="mod+c" on DropdownMenuShortcut. Because Kbd writes it for the reader's platform, Command on a Mac and Ctrl elsewhere.
6. dropdown-menu-no-fill NEVER Fill a checked or chosen item with the selection wash or any colour; its ink check is the mark. Because three ticked rows in a seven-row menu became three yellow bands, which reads as noise, not state; the wash belongs to a selected table row.
   - Correct: `<DropdownMenuCheckboxItem checked>Pipeline</DropdownMenuCheckboxItem>`
   - Wrong: `<DropdownMenuCheckboxItem checked className="data-checked:bg-selected">Pipeline</DropdownMenuCheckboxItem>`
7. dropdown-menu-no-shadow NEVER Add a shadow, padding or a rounded corner to DropdownMenuContent. Because Sodium has no shadows, only rules, and its rows run edge to edge so a highlighted row's lift and hairlines meet the edge.
   - Correct: `<DropdownMenuContent>`
   - Wrong: `<DropdownMenuContent className="shadow-lg p-1">`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `DropdownMenu trigger` | `'click' \| 'contextmenu'` | `'click'` | contextmenu opens at the pointer and marks the row. |
| `DropdownMenu onTargetChange` | `(row: HTMLElement \| null) => void` |  | The marked row on open, null on close. |
| `DropdownMenuTrigger selectable` | `boolean` | `false` | A context area keeps text selection. |
| `DropdownMenuContent size` | `'default' \| 'sm'` | `'default'` | 32px rows, or 26px in the 12px label. |
| `DropdownMenuItem variant` | `'default' \| 'destructive'` | `'default'` | destructive goes last, after a separator. |
| `DropdownMenuItem inset` | `boolean` | `false` | Lines a plain item up with checkbox items. |
| `DropdownMenuShortcut keys` | `string` |  | As Kbd writes it: "mod+c". |
| `DropdownMenuCheckboxItem, RadioItem` | `Base UI` |  | A check in the leading column marks the choice. |
Other props pass through to the root element.

## Variants and states
- size: default, sm
- trigger: click, contextmenu
- item variant: default, destructive
- states: closed, open, highlighted, destructive highlighted, disabled, checked, submenu open, target marked
- when states meet, the first wins: disabled > highlighted > checked > rest

## Accessibility
- [ ] The trigger carries aria-haspopup="menu" and aria-expanded; the popup is role="menu".
- [ ] The highlighted row lifts to white off the panel between two --line hairlines, in text-1 (18.3:1 and 13:1); that lift is the focus indicator, and forced colors draw a 2px outline.
- [ ] A checked item shows an ink check in a fixed leading column and no fill, so unchecked items line up with it.
- [ ] A disabled item stays reachable by arrows so its label is read; Enter does nothing.
- [ ] Checkbox and radio items are menuitemcheckbox and menuitemradio with aria-checked.
- [ ] A context menu takes its name through aria-label, since it has no trigger button.

## Keyboard
- `Enter, Space, Down`: On the trigger: opens with the first item highlighted.
- `Up, Down, a letter`: Moves the highlight; a letter jumps to the next item starting with it.
- `Right, Left`: Opens and closes a submenu, mirrored in right to left.
- `Shift+F10`: Opens a context menu at the focused row.
- `Escape`: Closes this menu only and returns focus to the trigger.

## Edge cases
- Long item label -> Wraps inside the popup, which stops at the available width.
- Forty items -> The popup scrolls past 320px; group them with labels, or use a Command.
- Near a viewport edge -> It flips or shifts to stay 8px inside.
- Touch -> A long press opens the context menu without selecting a word.
- Failed action -> Report it after the menu closes; the menu has no error state.
- Reduced motion -> It cuts in and out.

## Tokens
--panel, --line, --row-highlight, --row-highlight-edge, --field-inset, --field-inset-sm, --menu-min, --popup-max, --row-sm, --control-sm, --selected, --fail-tint, --fail-text, --type-label, --type-label-sm, --type-micro, --text-1, --text-3, --text-disabled, --icon, --z-overlay, --dur-overlay, --dur-state

## Related
- [Command](/systems/sodium/components/command.md): Finds and runs a command by typing.
- [Select](/systems/sodium/components/select.md): Picks one option from a list.
- [Button group](/systems/sodium/components/button-group.md): Joins related buttons into one control.
