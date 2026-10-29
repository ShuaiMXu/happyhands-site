---
name: Segmented control
system: glaze
kind: component
import: "import {SegmentedControl, SegmentedControlItem, segmentedVariants} from '@/components/glaze/ui/segmented-control'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/segmented-control.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/segmented-control
---

# Segmented control

Switches between a few views of one thing.

## Use when
- Two to five views of the same content: all, errors, warnings; day, week, month.
- A filter where any number can be on at once (multiple).

## Don't use when
- A setting saved with a form, where each choice needs a sentence. Use [Radio group](/systems/glaze/components/radio-group.md).
- A single on or off. Use [Switch](/systems/glaze/components/switch.md).
- Pages with their own content and URL: use tabs.

## Minimal example
```tsx
<SegmentedControl defaultValue="all" aria-label="Log level">
  <SegmentedControlItem value="all">All</SegmentedControlItem>
  <SegmentedControlItem value="error">Errors</SegmentedControlItem>
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
4. segmented-control-no-hue NEVER Fill the track or a segment with a hue, or restyle the chosen thumb. Because the small glaze thumb is the chosen segment, the press recipe the ticked box and the switch share, and a hue reads as a status.
   - Correct: `<SegmentedControlItem value="all">All</SegmentedControlItem>`
   - Wrong: `<SegmentedControlItem className="data-checked:bg-ok"/>`
5. segmented-control-segments SHOULD Keep it to two to five segments with labels of one or two words. Because a sixth segment or a long label squeezes every segment, and a label that ends in an ellipsis hides the view's name.
6. segmented-control-countmax SHOULD Pass countMax when a count changes live, so its slot is reserved from the start.
   - Correct: `<SegmentedControl countMax={999}>…</SegmentedControl>`
7. segmented-control-size-match SHOULD Match size to the buttons in the same row: sm in a toolbar of sm buttons.

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
- [ ] The chosen segment reads from the glaze thumb under it and its white label, 6.7:1 or more, against text-2 ones, not from colour.
- [ ] A label cut by an ellipsis keeps its full text as the title and the name.
- [ ] Focus is the 2px ink ring around the segment.

## Keyboard
- `Arrow keys`: Single: move to the next segment and choose it. Multiple: move focus only.
- `Space`: Chooses the focused segment, or turns it on or off with multiple.
- `Tab`: Enters on the chosen segment and leaves the control.

## Edge cases
- Count goes from 99 to 100 -> The slot was reserved for the widest value seen, or countMax, so nothing moves.
- Narrow container -> Labels end in an ellipsis; with fill the segments share the width equally.
- Disabled segment -> Arrow keys skip it; its label turns the disabled colour.
- Right to left -> Segments run right to left and the arrows follow.
- Changing the choice -> Single: one thumb slides to the new segment and takes its width in --dur-slide while the labels crossfade, and reduced motion jumps. Multiple: each pressed segment is its own thumb, no slide.
- Dark theme -> The thumb turns light glaze with a dark label on the dark paper track.
- Forced colors -> The track draws a CanvasText border; the chosen segment takes Highlight.

## Tokens
--paper, --line-faint, --hover, --text-1, --text-2, --text-disabled, --glaze-sm-top, --glaze-sm-mid, --glaze-sm-bottom, --glaze-sm-highlight, --glaze-sm-rim, --glaze-sm-text, --control-sm, --control, --control-lg, --radius-pill, --type-label, --type-label-sm, --type-label-lg, --focus, --dur-slide, --ease-out

## Related
- [Radio group](/systems/glaze/components/radio-group.md): Picks one of a few choices.
- [Switch](/systems/glaze/components/switch.md): Turns a setting on or off at once.
- [Button group](/systems/glaze/components/button-group.md): Joins related buttons into one control.
