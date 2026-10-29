---
name: Slider
system: sodium
kind: component
import: "import {Slider} from '@/components/sodium/ui/slider'"
install: "npx shadcn@latest add https://design.how/r/sodium/slider.json"
registryDependencies: [direction, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/slider
---

# Slider

Picks a number or a range.

## Use when
- A number where the rough place matters more than the exact digit: workers, a retry backoff, a sample rate.
- A range between two bounds (two thumbs), such as autoscaling's minimum and maximum.

## Don't use when
- The exact number matters, like a row limit or a port. Use [Input](/systems/sodium/components/input.md).
- A handful of named steps. Use [Segmented control](/systems/sodium/components/segmented-control.md).

## Minimal example
```tsx
<Field>
  <FieldLabel>Workers</FieldLabel>
  <Slider defaultValue={16} min={1} max={64} showValue/>
</Field>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. slider-show-value MUST Set showValue, or show the value elsewhere, whenever the number itself matters. Because a thumb's place on a 200px track cannot tell 16 from 17, and the read-out reserves its width so the track never shifts.
   - Correct: `<Slider defaultValue={16} min={1} max={64} showValue/>`
   - Wrong: `<Slider defaultValue={16} min={1} max={64}/>`
2. slider-format MUST Format units through format, never by appending text to the read-out. Because format feeds the read-out and aria-valuetext, so a screen reader hears "25%" and not "0.25".
   - Correct: `<Slider showValue format={{style: 'percent'}} min={0} max={1} step={0.05}/>`
   - Wrong: `<Slider showValue/> <span>%</span>`
3. slider-thumb-labels MUST Name each thumb of a range with thumbLabels. Because two unnamed thumbs are both announced with the field's label, so a screen reader cannot tell the low end from the high.
   - Correct: `<Slider defaultValue={[4, 32]} thumbLabels={['Fewest workers', 'Most workers']}/>`
   - Wrong: `<Slider defaultValue={[4, 32]}/>`
4. slider-square-thumb NEVER Round the thumb, colour the range yellow in light, or grow the thumb on hover. Because every corner is square, a yellow range on white is 1.4:1, and a growing thumb shifts under the pointer; the square wash shows hover instead.
   - Correct: `<Slider/>`
   - Wrong: `<Slider className="[&_[data-slot=slider-thumb]]:rounded-full [&_[data-slot=slider-range]]:bg-accent-fill"/>`
5. slider-step-sense SHOULD Pick a step the person can feel: about 20 to 100 stops across the track. Because a step of 1 across 0 to 10,000 makes every pixel a different value and the arrow keys useless.
6. slider-in-field SHOULD Put a Slider in a Field with a FieldLabel, and say what the value does in FieldDescription.
   - Correct: `<Field><FieldLabel>Workers</FieldLabel><Slider/><FieldDescription>…</FieldDescription></Field>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `value, defaultValue, onValueChange` | `number \| number[]` |  | An array of two gives a range. |
| `min, max, step` | `number` | `0, 100, 1` | The bounds and the stop size. |
| `showValue` | `boolean` | `false` | The formatted value after the track, in mono, its width reserved. |
| `format, locale` | `Intl.NumberFormatOptions, string` | `, 'en-US'` | For the read-out and aria-valuetext. |
| `thumbLabels` | `string[]` |  | One name per thumb. |
| `orientation, disabled, name` | `Base UI Slider` |  | vertical stands the track up. |
Other props pass through to the slider root (Base UI Slider.Root).

## Variants and states
- thumbs: one, two
- states: rest, hover, dragging, focus-visible, disabled
- when states meet, the first wins: disabled > dragging > focus-visible > hover > rest

## Accessibility
- [ ] Each thumb is a slider with aria-valuenow and aria-valuetext from format, named by the Field label or thumbLabels.
- [ ] The range is dark gold, 5.6:1 on the well, and the thumb yellow with a gold edge, lit from below, in light; in dark the range is yellow and the thumb the yellow-edged tint.
- [ ] Focus is the 2px --focus ring on the thumb.
- [ ] The square wash widens the target to 28px without moving the thumb.

## Keyboard
- `Arrow keys`: Move by one step.
- `Shift + arrow, Page Up, Page Down`: Move by ten steps.
- `Home, End`: Jump to min or max.

## Edge cases
- Value crosses a digit, 9 to 10 -> The read-out reserved the widest value, so the track does not shift.
- Fractional step -> The reserve checks one step in from each end, where 9.5 is wider than 10.
- Range thumbs meet -> They stop at each other; the later one in DOM order sits on top.
- Right to left -> The range fills from the right and the arrow keys follow.
- Forced colors -> The range is Highlight and the thumb CanvasText, unlit.

## Tokens
--well, --line, --check-bg, --check-edge, --check-range, --primary-light, --primary-light-hover, --hover, --pressed, --text-1, --text-disabled, --type-code, --focus, --dur-state

## Related
- [Input](/systems/sodium/components/input.md): Takes one line of text.
- [Segmented control](/systems/sodium/components/segmented-control.md): Switches between a few views of one thing.
