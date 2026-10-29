---
name: Slider
system: glaze
kind: component
import: "import {Slider} from '@/components/glaze/ui/slider'"
install: "npx shadcn@latest add https://design.how/r/glaze/slider.json"
registryDependencies: [direction, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/slider
---

# Slider

Picks a number or a range.

## Use when
- A number where the rough place matters more than the exact digit: temperature, a threshold, a budget.
- A range between two bounds (two thumbs).

## Don't use when
- The exact number matters, like a token limit or a price. Use [Input](/systems/glaze/components/input.md).
- A handful of named steps. Use [Segmented control](/systems/glaze/components/segmented-control.md).

## Minimal example
```tsx
<Field>
  <FieldLabel>Temperature</FieldLabel>
  <Slider defaultValue={0.7} min={0} max={2} step={0.1} showValue/>
</Field>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. slider-show-value MUST Set showValue, or show the value elsewhere, whenever the number itself matters. Because a thumb's place on a 200px track cannot tell 0.7 from 0.8, and the read-out reserves its width so the track never shifts.
   - Correct: `<Slider defaultValue={0.7} max={2} step={0.1} showValue/>`
   - Wrong: `<Slider defaultValue={0.7} max={2} step={0.1}/>`
2. slider-format MUST Format units through format, never by appending text to the read-out. Because format feeds the read-out and aria-valuetext, so a screen reader hears "$50" and not "50".
   - Correct: `<Slider showValue format={{style: 'currency', currency: 'USD'}}/>`
   - Wrong: `<Slider showValue/> <span>USD</span>`
3. slider-thumb-labels MUST Name each thumb of a range with thumbLabels. Because two unnamed thumbs are both announced with the field's label, so a screen reader cannot tell the low end from the high.
   - Correct: `<Slider defaultValue={[0, 50]} thumbLabels={['Smallest refund', 'Largest refund']}/>`
   - Wrong: `<Slider defaultValue={[0, 50]}/>`
4. slider-thumb-recipe NEVER Put the button's glass on the thumb or range, or grow the thumb on hover; both are small glaze (glaze-sm, the range run along the bar with glaze-sm-x). Because the button's glass scaled to 16px smears its catch-light into a smudge, and a growing thumb shifts under the pointer; the wash ring shows hover instead.
   - Correct: `<Slider/>`
   - Wrong: `<Slider className="[&_[data-slot=slider-thumb]]:glass [&_[data-slot=slider-thumb]]:hover:size-5"/>`
5. slider-step-sense SHOULD Pick a step the person can feel: about 20 to 100 stops across the track. Because a step of 1 across 0 to 10,000 makes every pixel a different value and the arrow keys useless.
6. slider-in-field SHOULD Put a Slider in a Field with a FieldLabel, and say what the value does in FieldDescription.
   - Correct: `<Field><FieldLabel>Temperature</FieldLabel><Slider/><FieldDescription>…</FieldDescription></Field>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `value, defaultValue, onValueChange` | `number \| number[]` |  | An array of two gives a range. |
| `min, max, step` | `number` | `0, 100, 1` | The bounds and the stop size. |
| `showValue` | `boolean` | `false` | The formatted value after the track, its width reserved. |
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
- [ ] The thumb is ink, 20:1 on paper, ringed in paper so it reads over the range; the track is ink at 10%, the range ink.
- [ ] Focus is the 2px ink ring on the thumb.
- [ ] The wash ring widens the target to 28px without moving the thumb.

## Keyboard
- `Arrow keys`: Move by one step.
- `Shift + arrow, Page Up, Page Down`: Move by ten steps.
- `Home, End`: Jump to min or max.

## Edge cases
- Value crosses a digit, 9 to 10 -> The read-out reserved the widest value, so the track does not shift.
- Fractional step -> The reserve checks one step in from each end, where 9.5 is wider than 10.
- Range thumbs meet -> They stop at each other; the later one in DOM order sits on top.
- Right to left -> The range fills from the right and the arrow keys follow.
- Dark theme -> The thumb and range turn light ink; the ring takes the dark paper.
- Forced colors -> The range is Highlight and the thumb CanvasText.

## Tokens
--line, --glaze-sm-top, --glaze-sm-mid, --glaze-sm-bottom, --glaze-sm-highlight, --glaze-sm-rim, --glaze-sm-text, --paper, --hover, --pressed, --text-1, --text-disabled, --radius-pill, --type-label, --focus, --dur-state

## Related
- [Input](/systems/glaze/components/input.md): Takes one line of text.
- [Segmented control](/systems/glaze/components/segmented-control.md): Switches between a few views of one thing.
