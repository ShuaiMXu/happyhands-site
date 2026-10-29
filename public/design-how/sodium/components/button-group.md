---
name: Button group
system: sodium
kind: component
import: "import {ButtonGroup, ButtonGroupMenu, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants} from '@/components/sodium/ui/button-group'"
install: "npx shadcn@latest add https://design.how/r/sodium/button-group.json"
registryDependencies: [button, dropdown-menu, icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/button-group
---

# Button group

Joins related buttons into one control.

## Use when
- Two or three actions of one kind that belong together: previous and next, zoom out and in, pause and resume.
- A value between the buttons that change it (ButtonGroupText).
- A row of quiet ghost actions split into halves (ButtonGroupSeparator).
- One action with a few close alternatives behind a caret (ButtonGroupMenu, the split button).

## Don't use when
- One view of several is chosen. Use [Segmented control](/systems/sodium/components/segmented-control.md).
- Unrelated actions that only share a row; space them 8px apart. Use [Button](/systems/sodium/components/button.md).

## Minimal example
```tsx
<ButtonGroup aria-label="Partitions">
  <Button variant="secondary" size="icon" aria-label="Previous partition"><Icon icon={ChevronLeft}/></Button>
  <ButtonGroupText>2 of 14</ButtonGroupText>
  <Button variant="secondary" size="icon" aria-label="Next partition"><Icon icon={ChevronRight}/></Button>
</ButtonGroup>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. button-group-no-slab MUST Make every member variant="secondary" or "ghost"; put the one slab beside the group, not in it. Because the group is one control, and a yellow cell joined to edged ones reads as a chosen segment rather than the next step.
   - Correct:
     ```tsx
     <ButtonGroup><Button variant="secondary">Previous</Button><Button variant="secondary">Next</Button></ButtonGroup>
     ```
   - Wrong: `<ButtonGroup><Button>Previous</Button><Button>Next</Button></ButtonGroup>`
2. button-group-same-size MUST Give every member the same size and variant. Because mixed heights break the seams, and mixed surfaces make one cell look chosen.
   - Correct:
     ```tsx
     <ButtonGroup><Button variant="secondary" size="sm">Zoom out</Button><Button variant="secondary" size="sm">Zoom in</Button></ButtonGroup>
     ```
   - Wrong:
     ```tsx
     <ButtonGroup><Button variant="secondary" size="sm">Out</Button><Button variant="ghost">In</Button></ButtonGroup>
     ```
3. button-group-named MUST Name the group with aria-label when its members do not say what they act on. Because "Previous, Next" means nothing without the thing they page through.
   - Correct: `<ButtonGroup aria-label="Partitions">…</ButtonGroup>`
   - Wrong: `<ButtonGroup>…</ButtonGroup>`
4. button-group-not-selection NEVER Show a chosen member by giving it the slab or the selection wash; that is a segmented control. Because every member of a group is an action, and a member styled as chosen reads as a view switcher with no radio semantics.
   - Correct: `<SegmentedControl value={range} onValueChange={setRange} aria-label="Range">…</SegmentedControl>`
   - Wrong: `<ButtonGroup><Button variant={range === 'day' ? 'primary' : 'secondary'}>Day</Button>…</ButtonGroup>`
5. button-group-no-gap NEVER Add a gap or margins between members. Because the members share one 1px seam, and a gap turns the one control into loose buttons with doubled edges.
   - Correct: `<ButtonGroup aria-label="Zoom">…</ButtonGroup>`
   - Wrong: `<ButtonGroup className="gap-1">…</ButtonGroup>`
6. button-group-few SHOULD Keep a group to two or three members, plus a ButtonGroupText. Because a long joined row is hard to aim at and reads as a segmented control.
7. button-group-text-value SHOULD Use ButtonGroupText for the value the buttons change, and announce it with aria-live="polite".
   - Correct: `<ButtonGroupText aria-live="polite">{page} of {total}</ButtonGroupText>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | A column joins on horizontal seams. |
| `aria-label` | `string` |  | What the members act on. |
| `ButtonGroupText` | `div (render)` |  | A value inside the group, edged to join its seams. |
| `ButtonGroupMenu label, size, variant` | `string, sm \| default \| lg, secondary \| ghost` | `'default', 'secondary'` | The split button's caret; its menu anchors to the whole group. |
| `ButtonGroupMenu pending` | `boolean` |  | Locks the alternatives while the main action runs. |
| `ButtonGroupSeparator orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | A 1px rule between halves of ghost members. |
Other props pass through to the group div.

## Variants and states
- orientation: horizontal, vertical
- content: text, separator, split
- states: rest, hover, held, focus-visible, disabled
- when states meet, the first wins: disabled > held > focus-visible > hover > rest

## Accessibility
- [ ] role="group" named by aria-label; each member is its own button in the tab order.
- [ ] Icon members need aria-label; ButtonGroupText with aria-live announces the new value.
- [ ] The focused member rises over its neighbours and draws its 2px ring on its own edge, so the ring shows whole.
- [ ] ButtonGroupText is text-2 on the page, 7.8:1 and 10.2:1.

## Keyboard
- `Tab`: Moves from member to member.
- `Enter, Space`: Presses the focused member.

## Edge cases
- Member held -> The fill steps darker and nothing scales, so the seams never open.
- Member disabled -> Drops to the disabled label in place; the seams stay.
- Group of groups -> Groups nested in a ButtonGroup sit 8px apart, each its own ruled row.
- Right to left -> Members run right to left and the seams follow.
- Dark theme -> Members sit on the near-black page; their --line edges make the seams.
- Split button -> The caret's menu lines up under the whole group and is at least as wide; the caret turns at once while it is open.
- Split button while running -> Pass the main action's pending to ButtonGroupMenu, so the alternatives lock with it.

## Tokens
--line, --secondary-bg, --text-2, --control, --z-raised, --type-label, --focus

## Related
- [Button](/systems/sodium/components/button.md): Starts an action.
- [Segmented control](/systems/sodium/components/segmented-control.md): Switches between a few views of one thing.
- [Dropdown menu](/systems/sodium/components/dropdown-menu.md): Lists the actions on one thing.
