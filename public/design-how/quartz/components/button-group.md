---
name: Button group
system: quartz
kind: component
import: "import {ButtonGroup, ButtonGroupMenu, ButtonGroupMenuGroup, ButtonGroupMenuItem, ButtonGroupMenuSeparator, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants} from '@/components/quartz/ui/button-group'"
install: "npx shadcn@latest add https://design.how/r/quartz/button-group.json"
registryDependencies: [button, icon, overlay, portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/quartz/components/button-group
---

# Button group

Joins a few related actions into one control.

## Use when
- Two to four actions work on the same thing: zoom out, fit, zoom in.
- One main action has close alternatives most people never need: Send reply, plus Send and close.
- A value sits between two buttons that change it: previous page, 2 of 9, next page.

## Don't use when
- The person picks one option and it stays picked. Use [Segmented control](/systems/quartz/components/segmented-control.md).
- The actions are unrelated and only share a row. Use [Button](/systems/quartz/components/button.md).
- More than four actions, or alternatives that are not variants of one action. Use [Dropdown menu](/systems/quartz/components/dropdown-menu.md).

## Minimal example
```tsx
<ButtonGroup>
  <Button onClick={send}>Send reply</Button>
  <ButtonGroupMenu label="More send options">
    <ButtonGroupMenuItem>Send and close</ButtonGroupMenuItem>
  </ButtonGroupMenu>
</ButtonGroup>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. button-group-split-pending MUST Pass the main action pending to ButtonGroupMenu so the caret locks while it runs. Because an open caret mid-run lets the person start a second variant of the same reply.
   - Correct:
     ```tsx
     <Button pending={sending}>Send reply</Button>
     <ButtonGroupMenu label="More send options" pending={sending}>…
     ```
   - Wrong:
     ```tsx
     <Button pending={sending}>Send reply</Button>
     <ButtonGroupMenu label="More send options">…
     ```
2. button-group-same-variant MUST Give every member the same variant and size. Because the shared line and the 1px paper split only read as one control when the fills match, and mixed heights break the squared inner corners.
   - Correct:
     ```tsx
     <ButtonGroup><Button size="sm" variant="secondary">Zoom out</Button><Button size="sm" variant="secondary">Fit</Button></ButtonGroup>
     ```
   - Wrong:
     ```tsx
     <ButtonGroup><Button size="sm">Zoom out</Button><Button size="sm" variant="secondary">Fit</Button></ButtonGroup>
     ```
3. button-group-three-labels SHOULD Keep text members to three in a 320px column; move the rest into a ButtonGroupMenu. Because the group is w-fit and never wraps, so a fourth label pushes it past a phone column.
   - Correct: `<ButtonGroup>{three buttons}<ButtonGroupMenu label="More views">…</ButtonGroupMenu></ButtonGroup>`
4. button-group-menu-label MUST Set the menu label to what the alternatives are, such as "More send options". Because label is the caret's only accessible name, and "More" does not say more of what.
   - Correct: `<ButtonGroupMenu label="More send options">`
   - Wrong: `<ButtonGroupMenu label="More">`
5. button-group-menu-items-variants SHOULD Start each menu item with the main verb and describe what differs.
   - Correct: `<ButtonGroupMenuItem description="Marks the conversation solved.">Send and close</ButtonGroupMenuItem>`
   - Wrong: `<ButtonGroupMenuItem>Settings</ButtonGroupMenuItem>`
6. button-group-stepper-focus MUST Pass focusableWhenDisabled on a member that disables at a limit and announce the value in a status line. Because a plain disabled button drops focus to the page body when the count hits its limit.
   - Correct: `<Button aria-label="Remove an agent" disabled={n <= 1} focusableWhenDisabled>`
   - Wrong: `<Button aria-label="Remove an agent" disabled={n <= 1}>`
7. button-group-name MUST Name the group with aria-label when its members do not say what they share. Because ButtonGroup sets role="group", and a screen reader announces an unnamed group as just "group".
   - Correct: `<ButtonGroup aria-label="Agents on the Billing queue"><Button aria-label="Remove an agent">…`
   - Wrong: `<ButtonGroup><Button aria-label="Remove">…`
8. button-group-no-borders NEVER Add a border to each member; the group draws one shared line, and ButtonGroupSeparator divides ghost members. Because a border doubles where two members meet and grows the member, so the group no longer lines up with a lone button.
   - Correct: `<ButtonGroup><Button variant="secondary">Day</Button>…`
   - Wrong: `<Button className="border-r">Day</Button>`
9. button-group-not-tabs NEVER Build view switching from a ButtonGroup and a highlighted member; use SegmentedControl. Because a highlighted Button has no pressed or selected state, so a screen reader cannot tell which view is on.
   - Correct: `<SegmentedControl value={v} onValueChange={setV}>…`
   - Wrong: `<Button variant={v === "day" ? "primary" : "secondary"}>Day</Button>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `ButtonGroup orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Logical corners, so RTL mirrors. |
| `ButtonGroup aria-label` | `string` |  | Names the group. |
| `ButtonGroupMenu label` | `string` | `required` | The caret's accessible name. |
| `ButtonGroupMenu variant, size` | `'primary' \| 'secondary' \| 'ghost', 'sm' \| 'default' \| 'lg'` | `'primary', 'default'` | Match the main action. |
| `ButtonGroupMenu pending` | `boolean` |  | Pass the main action's pending. |
| `ButtonGroupMenu align` | `'start' \| 'end'` | `'end'` | Where the menu opens. |
| `ButtonGroupMenuItem description` | `ReactNode` |  | Second line. |
| `ButtonGroupMenuItem variant` | `'default' \| 'destructive'` | `'default'` | As DropdownMenuItem: fail text at rest, the fail wash when highlighted. |
| `ButtonGroupSeparator orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | For ghost groups only. |
Other props pass through to the root element.

## Variants and states
- orientation: horizontal, vertical
- content: buttons, with text, with menu, with separator
- states: rest, member focus-visible, member hover, member disabled, split open, split pending

## Accessibility
- [ ] The root is role="group"; Tab moves between members, arrows do not.
- [ ] The caret is a menu button with aria-haspopup and aria-expanded, named by label.
- [ ] Name the group when the members do not say what they share.
- [ ] A member that disables at a limit keeps focus with focusableWhenDisabled.
- [ ] The focused member sits above its neighbours so the ring stays whole.
- [ ] Escape closes the menu and returns focus to the caret.

## Edge cases
- Long member label -> Labels never wrap, so the group widens; the menu caps at --popover and wraps descriptions.
- Icon-sm members -> 28px cells sharing one control line.
- No items in the menu -> Opens an empty popup; do not render ButtonGroupMenu with no items.
- Four members in 320px -> The joined row does not wrap and overflows; the menu shifts 8px inside the viewport.
- Right to left -> Corners are logical; the group mirrors whole.
- Zoom 200% -> Members stretch to the tallest; the joined shape holds.
- Main action pending -> The caret disables too and the box keeps its width.
- Failed alternative -> Report beside the group; the group has no error state.
- Escape in a menu inside a dialog -> Closes only the menu.
- Forced colors -> Each member draws a ButtonText border; the separator paints CanvasText.
- Reduced motion -> The caret turns without a transition; the menu appears at once.

## Tokens
--space-2, --line-control, --line-row, --surface-page, --text-2, --type-label, --radius-soft, --line-hair, --paper, --elev-overlay, --popover, --dur-base, --dur-fast, --ease-step, --surface-hover, --fail-text

## Related
- [Button](/systems/quartz/components/button.md): Starts an action now. States: pressed and pending, which keeps the label.
- [Segmented control](/systems/quartz/components/segmented-control.md): Two to five views, single or multiple.
- [Dropdown menu](/systems/quartz/components/dropdown-menu.md): Actions from a trigger or a right click.
