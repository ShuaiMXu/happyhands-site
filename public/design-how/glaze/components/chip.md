---
name: Chip
system: glaze
kind: component
import: "import {Chip, ChipCount, ChipGroup, chipVariants, chipToggleClasses, chipValueClasses, chipRemoveClasses} from '@/components/glaze/ui/chip'"
install: "npx shadcn@latest add https://design.how/r/glaze/chip.json"
registryDependencies: [icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/chip
---

# Chip

Shows a filter or a chosen value.

## Use when
- Values a person added and can take back: stop sequences, tags, recipients, allowed domains.
- Filters over a list that can be on together, each with how many items it matches.

## Don't use when
- One view of several, exactly one at a time. Use [Segmented control](/systems/glaze/components/segmented-control.md).
- A status or a label nobody acts on: use a badge.
- An action that starts something. Use [Button](/systems/glaze/components/button.md).

## Minimal example
```tsx
<ChipGroup aria-label="Stop sequences">
  <Chip onRemove={() => remove(s)}>{s}</Chip>
</ChipGroup>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. chip-in-group MUST Put removable chips in a ChipGroup, and pass focusAfterEmpty pointing at the field that adds them. Because the group is the scope removal moves focus within, and without focusAfterEmpty removing the last chip drops focus to the page.
   - Correct:
     ```tsx
     <ChipGroup aria-label="Tags">{tags.map(t => <Chip onRemove={…} focusAfterEmpty={inputRef}>{t}</Chip>)}</ChipGroup>
     ```
   - Wrong: `<div>{tags.map(t => <Chip onRemove={…}>{t}</Chip>)}</div>`
2. chip-onremove MUST Make a chip removable with onRemove, never with a Button or an icon placed inside it. Because onRemove gives a named remove button, Backspace and Delete, and moves focus to the next chip.
   - Correct: `<Chip onRemove={remove}>beta</Chip>`
   - Wrong: `<Chip>beta <Button size="icon-sm" onClick={remove}><Icon icon={Close}/></Button></Chip>`
3. chip-count-prop MUST Put a number in count, not in the label. Because count sets tabular figures in text-2, so the label stays the name and the number reads as a number.
   - Correct: `<Chip count={12}>Failed</Chip>`
   - Wrong: `<Chip>Failed (12)</Chip>`
4. chip-no-glass NEVER Put glass or ink on a chip, on or off. Because glass marks the action a group leads with, and a row of filters has no lead; on is the pressed wash and the darker line.
   - Correct: `<Chip defaultPressed>Failed</Chip>`
   - Wrong: `<Chip className="glass glass-ink">Failed</Chip>`
5. chip-invalid-reason SHOULD Mark a value the field will not take with invalid, and say why in the Field's error.
   - Correct: `<Chip invalid onRemove={…}>example</Chip>`
6. chip-short SHOULD Keep a chip's label to one to three words; it ends in an ellipsis past its row.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `pressed, defaultPressed, onPressedChange` | `Base UI Toggle` |  | A filter chip, on or off. |
| `count` | `number` |  | After the label, tabular, text-2. |
| `onRemove` | `() => void` |  | Makes it a removable value, with a remove button. |
| `removeLabel` | `string` | `'Remove' + text` | The remove button's name. |
| `focusAfterEmpty` | `RefObject<HTMLElement>` |  | Where focus goes after the last chip goes. |
| `invalid, disabled` | `boolean` | `false` | invalid turns the line coral. |
| `ChipGroup` | `div` |  | A row 4px apart that wraps; name it with aria-label. |
Other props pass through to the button (Base UI Toggle), or the span of a removable chip.

## Variants and states
- kind: filter, value
- states: rest, hover, held, focus-visible, on, invalid, disabled
- when states meet, the first wins: disabled > invalid > on > held > focus-visible > hover > rest

## Accessibility
- [ ] A filter chip is a toggle button with aria-pressed; on also reads from the wash and the darker line.
- [ ] A removable chip is text with a remove button named "Remove" and the value; Backspace and Delete on it remove too.
- [ ] After a removal, focus moves to the next remove button, else the previous, else focusAfterEmpty.
- [ ] An invalid chip adds "(not accepted)" for a screen reader beside the coral line.
- [ ] Focus is the 2px ink ring on the chip or on its remove button.

## Keyboard
- `Space, Enter`: Turns a filter chip on or off; on a remove button, removes.
- `Backspace, Delete`: On a remove button, removes the chip.

## Edge cases
- Long value -> Ends in an ellipsis; the remove button keeps its size and its full name.
- Last chip removed -> Focus goes to focusAfterEmpty, usually the field that adds values.
- Many chips -> The group wraps onto more lines, 4px apart.
- Chip inside a 32px field -> It sits 3px inside the line, concentric with the pill.
- Dark theme -> Paper turns near-black; on takes the light wash.

## Tokens
--paper, --hover, --pressed, --line-control, --line-focus, --line-faint, --fail, --text-1, --text-2, --text-3, --text-disabled, --control-sm, --shell-inset, --radius-pill, --type-label-sm, --icon-sm, --scale-press, --dur-state

## Related
- [Segmented control](/systems/glaze/components/segmented-control.md): Switches between a few views of one thing.
- [Input](/systems/glaze/components/input.md): Takes one line of text.
