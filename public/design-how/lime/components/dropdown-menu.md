---
name: Dropdown menu
system: lime
kind: component
import: "import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator} from '@/components/lime/ui/dropdown-menu'"
install: "npx shadcn@latest add https://design.how/r/lime/dropdown-menu.json"
registryDependencies: [icon, popup, portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/dropdown-menu
---

# Dropdown menu

Keeps a few extra actions, like rename or delete, behind one button.

## Use when
- Commands that act on one item: rename, duplicate, share, delete.
- Settings that stay on or off (checkbox items) or one of a few (radio items).
- An icon button that would otherwise need five icon buttons beside it.

## Don't use when
- Choosing one value for a field from a list. Use [Select](/systems/lime/components/select.md).
- The only action on the row. Use [Button](/systems/lime/components/button.md).
- A panel with inputs. Use [Popover](/systems/lime/components/popover.md).

## Minimal example
```tsx
<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline"/>}>Vacation fund</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Rename</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuItem>Share</DropdownMenuItem>
    <DropdownMenuSeparator/>
    <DropdownMenuItem destructive>Delete goal</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. dropdown-menu-destructive-last MUST Mark a deleting command destructive and put it last, after a separator. Because at the top Delete is the first item a hurried tap or the arrow keys reach.
   - Correct:
     ```tsx
     <DropdownMenuItem>Rename</DropdownMenuItem><DropdownMenuSeparator/><DropdownMenuItem destructive>Delete goal</DropdownMenuItem>
     ```
   - Wrong: `<DropdownMenuItem destructive>Delete goal</DropdownMenuItem><DropdownMenuItem>Rename</DropdownMenuItem>`
2. dropdown-menu-confirm-delete MUST Open an AlertDialog from a destructive item; never delete on one press. Because an item runs on one press or Enter, so a slip deletes the goal for good.
   - Correct: `<DropdownMenuItem destructive onClick={askToDelete}>Delete goal</DropdownMenuItem>`
   - Wrong: `<DropdownMenuItem destructive onClick={remove}>Delete goal</DropdownMenuItem>`
3. dropdown-menu-choice-items MUST Use a checkbox or radio item for a setting that stays on or one of a few. Because a plain item has no checked state, so nobody can tell the setting is on.
   - Correct: `<DropdownMenuCheckboxItem>Show pending</DropdownMenuCheckboxItem>`
   - Wrong: `<DropdownMenuItem>Show pending</DropdownMenuItem>`
4. dropdown-menu-name-icon-trigger MUST Give an icon trigger an aria-label such as More actions. Because an icon-only trigger is announced as a menu button with no name.
   - Correct: `<DropdownMenuTrigger render={<Button size="icon" aria-label="More actions"/>}>...`
   - Wrong: `<DropdownMenuTrigger render={<Button size="icon"/>}><Icon/></DropdownMenuTrigger>`
5. dropdown-menu-verb-first SHOULD Start each item with a verb in one to three words, sentence case.
   - Correct: `<DropdownMenuItem>Rename</DropdownMenuItem>`
   - Wrong: `<DropdownMenuItem>Project Renaming</DropdownMenuItem>`
6. dropdown-menu-no-icons-everywhere SHOULD Leave icons off items unless they separate items that read alike.
7. dropdown-menu-seven-items SHOULD Group with labels or move to a page past about seven items.
8. dropdown-menu-one-submenu-level NEVER Nest a submenu in a submenu; one level only. Because on a 390px screen a second side-opening level covers the menus it came from.
   - Wrong: `<DropdownMenuSubContent><DropdownMenuSub>...</DropdownMenuSub></DropdownMenuSubContent>`
9. dropdown-menu-end-align SHOULD Set align="end" for an icon button at the end of a row.
   - Correct: `<DropdownMenuContent align="end">`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `DropdownMenu` | `Base UI Root props` |  | open, defaultOpen, onOpenChange, loopFocus. |
| `DropdownMenuTrigger` | `Base UI props` |  | Use `render={<Button/>}`. |
| `DropdownMenuContent.side, align` | `string` | `'bottom', 'start'` | Flips on collision. |
| `DropdownMenuContent.sideOffset` | `number` | `6` |  |
| `DropdownMenuItem.destructive` | `boolean` | `false` | Red text and red-tinted highlight. |
| `DropdownMenuCheckboxItem` | `Base UI props` |  | checked, defaultChecked, onCheckedChange. |
| `DropdownMenuRadioGroup` | `Base UI props` |  | value, defaultValue, onValueChange; value on each RadioItem. |
Other props pass through to each part's own element; DropdownMenuContent passes them to the menu panel.

## Variants and states
- item: item, destructive, checkbox item, radio item, submenu
- align: start, end
- states: closed, open, highlighted, checked, disabled, submenu-open

## Accessibility
- [ ] The trigger has aria-haspopup="menu" and aria-expanded; the panel is role menu with menuitem children.
- [ ] Enter, Space or Arrow Down opens; Arrows move and loop; letters jump; Enter runs and closes.
- [ ] Arrow Right opens a submenu and Left closes it (mirrored in right to left); Escape closes.
- [ ] Checkbox and radio items carry aria-checked.

## Edge cases
- Submenu in right to left -> The chevron rotates and the panel opens on the left.
- Long item -> The panel has no max width; a long item widens it.
- Short screen -> The panel caps at the available height and clips; use a ScrollArea for a very long list.
- No items -> Opens an empty panel; disable the trigger instead.
- Command opens a dialog -> Let the menu close first; focus returns to the menu trigger.
- Forced colors -> The highlight fill is replaced and may show no difference; add an outline.
- Reduced motion -> The menu appears at once.

## Tokens
--raised, --radius-panel, --shadow-menu, --popup-max, --fg, --radius-md, --text-sm, --surface-2, --danger-text, --danger-tint, --fg-disabled, --fg-3, --text-xs, --line, --dur-base, --dur-fast, --ease-out, --ease-in, --scale-enter

## Related
- [Popover](/systems/lime/components/popover.md): An anchored panel with controls, such as splitting a bill.
- [Select](/systems/lime/components/select.md): One choice from a list, such as an account or a category.
- [Toolbar](/systems/lime/components/toolbar.md): A row of related controls with one tab stop.
- [Alert dialog](/systems/lime/components/alert-dialog.md): A blocking decision, such as deleting a goal, that cannot be dismissed from outside.
