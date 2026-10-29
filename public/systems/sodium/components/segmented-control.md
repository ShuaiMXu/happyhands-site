---
name: Segmented control
system: sodium
kind: component
import: "import {SegmentedControl, SegmentedControlItem, segmentedVariants} from '@/components/sodium/ui/segmented-control'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/segmented-control.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/segmented-control
---

# Segmented control

Switches between a few views of one thing.

## Use when
- Two to five views of the same content: all, errors, warnings; hour, day, week.
- A filter where any number can be on at once (multiple).

## Don't use when
- A setting saved with a form, where each choice needs a sentence. Use [Radio group](/systems/sodium/components/radio-group.md).
- A single on or off. Use [Switch](/systems/sodium/components/switch.md).
- Actions side by side, nothing chosen. Use [Button group](/systems/sodium/components/button-group.md).

## Minimal example
```tsx
<SegmentedControl defaultValue="all" aria-label="Log level">
  <SegmentedControlItem value="all">All</SegmentedControlItem>
  <SegmentedControlItem value="error" count={12}>Errors</SegmentedControlItem>
</SegmentedControl>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. segmented-control-value MUST Pass value or defaultValue to a single control. Because nothing is chosen until the first press, and a radio can never go back to none, so the view below has no state to show.
   - Correct: `<SegmentedControl defaultValue="all" aria-label="Log level">…</SegmentedControl>`
   - Wrong: `<SegmentedControl aria-label="Log level">…</SegmentedControl>`
2. segmented-control-named MUST Name the control with aria-label or aria-labelledby. Because a screen reader announces "radio group" with no question, then the bare segment names.
   - Correct: `<SegmentedControl defaultValue="all" aria-label="Log level">…</SegmentedControl>`
   - Wrong: `<SegmentedControl defaultValue="all">…</SegmentedControl>`
3. segmented-control-count-prop MUST Put a number in count, never in the label. Because count is tabular, reserves its width and is read as a description, so the name stays "Errors" while it ticks and the segments never move.
   - Correct: `<SegmentedControlItem value="error" count={12}>Errors</SegmentedControlItem>`
   - Wrong: `<SegmentedControlItem value="error">Errors (12)</SegmentedControlItem>`
4. segmented-control-no-width NEVER Give the control or a segment a fixed width; let the labels size it, or pass fill. Because a fixed width clips a longer label or a translation, and the track is meant to be as wide as its words.
   - Correct: `<SegmentedControl fill aria-label="Range">…</SegmentedControl>`
   - Wrong: `<SegmentedControl className="w-48" aria-label="Range">…</SegmentedControl>`
5. segmented-control-no-slab NEVER Show the chosen segment with the slab recipe or a status colour. Because the slab is the one action on the screen and a chosen view is not an action; the checked recipe draws it in yellow as a state, with an ink label and no halo, which is how Sodium shows a value chosen.
   - Correct: `<SegmentedControlItem value="all">All</SegmentedControlItem>`
   - Wrong: `<SegmentedControlItem className="data-checked:bg-accent-fill"/>`
6. segmented-control-segments SHOULD Keep it to two to five segments with labels of one or two words. Because a sixth segment or a long label squeezes every segment, and a label that ends in an ellipsis hides the view's name.
7. segmented-control-size-match SHOULD Match size to the buttons in the same row: sm in a panel head of sm buttons.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `multiple` | `boolean` | `false` | Any number on (aria-pressed); value becomes string[]. |
| `value, defaultValue, onValueChange` | `string \| string[]` |  | One value, or an array with multiple. |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | 26, 32 or 36px, like Button. |
| `fill` | `boolean` | `false` | Stretches to the container; segments share the width. |
| `countMax` | `number` |  | The widest count expected; its width is reserved. |
| `SegmentedControlItem value, count, countMax, disabled` | `string, number, number, boolean` |  | One segment. |
Other props pass through to the group div (Base UI RadioGroup, or ToggleGroup with multiple).

## Variants and states
- size: sm, default, lg
- multiple: false, true
- states: rest, hover, held, focus-visible, chosen, disabled
- when states meet, the first wins: disabled > chosen > held > focus-visible > hover > rest

## Accessibility
- [ ] Single is a radiogroup with one tab stop; each segment is a radio. Multiple is a group of toggle buttons with aria-pressed.
- [ ] The count is aria-hidden and reaches the segment as its description.
- [ ] The chosen segment is yellow with a gold edge and an ink label (12.8:1) in light and the yellow tint with a yellow edge and label (9.0:1) in dark; the others are text-2 on the off-white body, 7.3:1 (9.9:1 in dark).
- [ ] A label cut by an ellipsis keeps its full text as the title and the name.
- [ ] Focus is the 2px --focus ring around the segment, raised over its neighbours.

## Keyboard
- `Arrow keys`: Single: move to the next segment and choose it. Multiple: move focus only.
- `Space`: Chooses the focused segment, or turns it on or off with multiple.
- `Tab`: Enters on the chosen segment and leaves the control.

## Edge cases
- Count goes from 99 to 100 -> The slot was reserved for the widest value seen, or countMax, so nothing moves.
- Longer label -> The segment grows with it; nothing clips. With fill the segments share the width and a label too long ends in an ellipsis.
- Disabled segment -> Arrow keys skip it; its label turns the disabled colour.
- Right to left -> Segments run right to left and the arrows follow.
- Changing the choice -> The fills crossfade on --dur-light and the new segment's light rises; nothing slides.
- Forced colors -> Segments draw ButtonText edges; the chosen one takes Highlight, unlit.

## Tokens
--check-off, --check-off-hover, --well, --line, --text-1, --text-2, --text-disabled, --check-bg, --check-edge, --check-mark, --primary-light, --primary-light-hover, --dur-light, --dur-glow, --ease-soft, --control-sm, --control, --control-lg, --z-raised, --type-label, --type-label-sm, --type-label-lg, --focus, --dur-state

## Related
- [Radio group](/systems/sodium/components/radio-group.md): Picks one of a few choices.
- [Switch](/systems/sodium/components/switch.md): Turns a setting on or off at once.
- [Button group](/systems/sodium/components/button-group.md): Joins related buttons into one control.
