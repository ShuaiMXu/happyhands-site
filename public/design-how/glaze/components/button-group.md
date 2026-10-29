---
name: Button group
system: glaze
kind: component
import: "import {ButtonGroup, ButtonGroupMenu, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants} from '@/components/glaze/ui/button-group'"
install: "npx shadcn@latest add https://design.how/r/glaze/button-group.json"
registryDependencies: [button, dropdown-menu, icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/button-group
---

# Button group

Joins related buttons into one control.

## Use when
- Two or three actions of one kind that belong together: previous and next, fewer and more, zoom out and in.
- A value between the buttons that change it (ButtonGroupText).
- A row of quiet ghost actions split into halves (ButtonGroupSeparator).
- One action with a few close alternatives behind a caret (ButtonGroupMenu, a split button).

## Don't use when
- One view of several is chosen. Use [Segmented control](/systems/glaze/components/segmented-control.md).
- Unrelated actions that only share a row; space them 8px apart. Use [Button](/systems/glaze/components/button.md).

## Minimal example
```tsx
<ButtonGroup aria-label="Transcripts">
  <Button variant="secondary" size="icon" aria-label="Previous transcript"><Icon icon={ChevronLeft}/></Button>
  <ButtonGroupText>2 of 14</ButtonGroupText>
  <Button variant="secondary" size="icon" aria-label="Next transcript"><Icon icon={ChevronRight}/></Button>
</ButtonGroup>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. button-group-one-ink MUST Make every member variant="secondary" or "ghost"; put the one ink action beside the group, not in it. Because the group is one control, and an ink cell in a flat pill reads as a second lead next to the real one.
   - Correct:
     ```tsx
     <ButtonGroup><Button variant="secondary">Previous</Button><Button variant="secondary">Next</Button></ButtonGroup>
     ```
   - Wrong: `<ButtonGroup><Button>Previous</Button><Button>Next</Button></ButtonGroup>`
2. button-group-same-size MUST Give every member the same size and variant. Because mixed heights break the seams, and mixed keys make one cell look chosen.
   - Correct:
     ```tsx
     <ButtonGroup><Button variant="secondary" size="icon-sm" aria-label="Fewer">…</Button><Button variant="secondary" size="icon-sm" aria-label="More">…</Button></ButtonGroup>
     ```
   - Wrong: `<ButtonGroup><Button variant="secondary" size="sm">−</Button><Button variant="ghost">+</Button></ButtonGroup>`
3. button-group-named MUST Name the group with aria-label when its members do not say what they act on. Because "Previous, Next" means nothing without the thing they page through.
   - Correct: `<ButtonGroup aria-label="Transcripts">…</ButtonGroup>`
   - Wrong: `<ButtonGroup>…</ButtonGroup>`
4. button-group-not-selection NEVER Show a chosen member by making it ink or pressed-looking; that is a segmented control. Because every member of a group is an action, and a member styled as chosen reads as a view switcher with no radio semantics.
   - Correct: `<SegmentedControl value={view} onValueChange={setView} aria-label="Range">…</SegmentedControl>`
   - Wrong: `<ButtonGroup><Button variant={view === 'day' ? 'primary' : 'secondary'}>Day</Button>…</ButtonGroup>`
5. button-group-split-menu MUST Make a split button with ButtonGroupMenu as the last member, matching the main action's variant and size. Because a separate DropdownMenu beside the group opens under the caret alone and reads as a second control, and a mismatched caret breaks the seam.
   - Correct:
     ```tsx
     <ButtonGroup aria-label="Run eval">
       <Button variant="secondary">Run eval</Button>
       <ButtonGroupMenu label="More run options">…</ButtonGroupMenu>
     </ButtonGroup>
     ```
   - Wrong:
     ```tsx
     <ButtonGroup><Button variant="secondary">Run eval</Button></ButtonGroup>
     <DropdownMenu>…</DropdownMenu>
     ```
6. button-group-few SHOULD Keep a group to two or three members, plus a ButtonGroupText. Because a long joined pill is hard to aim at and reads as a segmented control.
7. button-group-text-value SHOULD Use ButtonGroupText for the value the buttons change, and announce it with aria-live="polite".
   - Correct: `<ButtonGroupText aria-live="polite">{page} of {total}</ButtonGroupText>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | A column takes the 10px corner at its ends. |
| `aria-label` | `string` |  | What the members act on. |
| `ButtonGroupText` | `div (render)` |  | A flat value inside the group, joined to its seams. |
| `ButtonGroupMenu label, variant, size` | `string, 'secondary' \| 'ghost', 'sm' \| 'default' \| 'lg'` | `, 'secondary', 'default'` | The split caret; DropdownMenuItems as children. |
| `ButtonGroupMenu pending, align` | `boolean, 'start' \| 'end'` | `false, 'end'` | Locks with the main action; lines up under the group. |
| `ButtonGroupSeparator orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | A 1px rule between halves of ghost members. |
Other props pass through to the group div.

## Variants and states
- orientation: horizontal, vertical
- split: closed, open
- states: rest, hover, held, focus-visible, disabled
- when states meet, the first wins: disabled > held > focus-visible > hover > rest

## Accessibility
- [ ] role="group" named by aria-label; each member is its own button in the tab order.
- [ ] Icon members need aria-label; ButtonGroupText with aria-live announces the new value.
- [ ] The focused member rises over its neighbours so its 2px ink ring shows whole.

## Keyboard
- `Tab`: Moves from member to member.
- `Enter, Space`: Presses the focused member.

## Edge cases
- Member held -> No press scale, so the seams never open.
- Member disabled -> Turns flat grey in place; the seams stay.
- Group of groups -> Groups nested in a ButtonGroup sit 8px apart, each its own pill.
- Split button open -> The menu opens under the whole group, at least as wide as it, aligned to its end.
- Split button while the action runs -> Pass pending to ButtonGroupMenu; the caret locks so a second variant cannot start.
- Right to left -> The rounded ends follow the reading direction.
- Dark theme -> Paper members turn near-black; their rings make the seams.

## Tokens
--flat-ring, --flat-bg, --line, --text-2, --radius-pill, --radius-overlay, --control, --z-raised, --type-label

## Related
- [Button](/systems/glaze/components/button.md): Starts an action.
- [Segmented control](/systems/glaze/components/segmented-control.md): Switches between a few views of one thing.
