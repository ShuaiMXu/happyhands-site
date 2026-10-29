---
name: Slider
system: lime
kind: component
import: "import {Slider} from '@/components/lime/ui/slider'"
install: "npx shadcn@latest add https://happyhands.cc/r/lime/slider.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/slider
---

# Slider

Sets a number by dragging along a track, like volume or a daily limit.

## Use when
- A number on a range where the rough position matters: a monthly amount, a spending cap.
- A start and an end, as a range with two thumbs.

## Don't use when
- The exact number matters, such as an amount. Use [Input](/systems/lime/components/input.md).
- There are two to five named choices. Use [Segmented](/systems/lime/components/segmented.md).

## Minimal example
```tsx
<Slider aria-label="Monthly savings in dollars" defaultValue={[150]} min={0} max={500} showValue/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. slider-show-value SHOULD Set showValue when the number matters; the thumb gives only the rough position.
   - Correct: `<Slider defaultValue={[150]} showValue/>`
   - Wrong: `<Slider defaultValue={[150]}/>`
2. slider-name-thumbs MUST Pass thumbLabels on a two-thumb slider so the thumbs differ. Because otherwise a screen reader announces two thumbs with the same name.
   - Correct: `<Slider defaultValue={[8, 42]} thumbLabels={['Start', 'End']}/>`
   - Wrong: `<Slider defaultValue={[8, 42]}/>`
3. slider-name MUST Pass an aria-label that names the value and its unit. Because a screen reader reads 150 alone, and dollars, days and percent sound the same.
   - Correct: `<Slider aria-label="Monthly savings in dollars" defaultValue={[150]}/>`
   - Wrong: `<Slider aria-label="Length" defaultValue={[150]}/>`
4. slider-step SHOULD Set step when only some numbers make sense; do not round after the drag.
   - Correct: `<Slider min={0} max={500} step={5}/>`
   - Wrong: `<Slider min={0} max={500}/> // then Math.round`
5. slider-save-on-commit SHOULD Save in onValueCommitted once at the end of a drag, not on every move.
   - Correct: `<Slider onValueCommitted={save}/>`
6. slider-no-recolor NEVER Recolor the track or add a gradient; the fill is lime and the track grey. Because a gradient blurs where the lime fill ends, which is where the value is.
   - Correct: `<Slider/>`
   - Wrong: `<Slider className="[&_[data-slot=slider-track]]:bg-gradient-to-r"/>`
7. slider-touch-room SHOULD Leave vertical room around the slider on a phone; touch-none lets a finger drag the thumb, not scroll.
8. slider-one-value NEVER Render a slider whose min equals max; show the number instead. Because the thumb has no travel, so every drag and arrow key does nothing.
   - Correct: `<Amount value={bill.amount}/>`
   - Wrong: `<Slider min={bill.amount} max={bill.amount}/> // a fixed bill`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `value, defaultValue` | `number[]` |  | One number per thumb. Two make a range. |
| `onValueChange, onValueCommitted` | `(value: number[]) => void` |  | While dragging, and when the drag ends. |
| `min, max, step` | `number` | `0, 100, 1` | The range and the step. |
| `thumbLabels` | `string[]` |  | The accessible name of each thumb. |
| `showValue` | `boolean` | `false` | Prints the value beside the track. |
Other props pass through to the root element.

## Variants and states
- thumbs: one, two
- showValue: false, true
- states: rest, hover (thumb), focus-visible (thumb), disabled

## Accessibility
- [ ] Each thumb is role slider with aria-valuenow, min and max; the group is named by aria-label.
- [ ] Arrows step by step; Page keys and Shift move by ten steps; Home and End jump to the ends.
- [ ] Forced colors paints the track GrayText and the fill Highlight.
- [ ] The 20px thumb is under 44px; add room around it on a phone.
- [ ] Base UI reads direction from DirectionProvider, so wrap RTL pages in it.

## Edge cases
- Narrow container -> The track follows the container; the value keeps its width and the track gives way.
- Right to left -> Under a DirectionProvider the fill grows from the right and the value sits at the end; without one it stays left to right.
- Long range label -> The value keeps a 40px floor and shortens the track.
- No defaultValue -> The one thumb sits at the minimum.
- Inside a form -> The value submits through hidden inputs under the name.
- Reduced motion -> No hover or drag scale on the thumb.

## Tokens
--surface-3, --accent, --accent-line, --fg-disabled, --page, --ink, --shadow-card, --line-strong, --ring, --line-focus, --focus-offset, --dur-fast, --ease-out, --text-sm, --weight-medium

## Related
- [Input](/systems/lime/components/input.md): One line of text, such as a merchant name or a search.
- [Segmented](/systems/lime/components/segmented.md): A short row of exclusive options, such as Week, Month and Year.
- [Switch](/systems/lime/components/switch.md): A setting that applies at once, such as round-ups.
