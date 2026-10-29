---
name: Progress
system: lime
kind: component
import: "import {Progress} from '@/components/lime/ui/progress'"
install: "npx shadcn@latest add https://design.how/r/lime/progress.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/progress
---

# Progress

Shows how close something is to done, like 3 of 5 steps.

## Use when
- A savings goal, in a card or a list row.
- A budget spent so far this month, or a card limit used.
- A goal tile on a home screen, as a ring with the percentage inside.

## Don't use when
- Work that is running, such as a transfer or an upload. Use [Status](/systems/lime/components/status.md).
- A value the person sets. Use [Slider](/systems/lime/components/slider.md).

## Minimal example
```tsx
<Progress value={640} max={1000} label="Saved toward Vacation fund" valueText="$640 of $1,000"/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. progress-label MUST Pass label naming what is measured, such as "Saved toward Vacation fund". Because a meter with no name is read as a bare number with nothing to say what it measures.
   - Correct: `<Progress value={640} max={1000} label="Saved toward Vacation fund"/>`
   - Wrong: `<Progress value={640} max={1000}/>`
2. progress-value-text MUST Pass valueText for money, such as "$640 of $1,000". Because without it a screen reader hears "64%" and never the amount.
   - Correct: `<Progress value={640} max={1000} label="..." valueText="$640 of $1,000"/>`
3. progress-figure-visible MUST Show the figure as text beside a bar or inside a ring. Because the bar renders no text, so a sighted person guesses the amount from the fill length.
   - Correct: `<p>$640 of $1,000</p><Progress value={640} max={1000} label="Saved toward Vacation fund"/>`
4. progress-real-max SHOULD Pass the real max and value, such as 640 of 1000, not a percentage you worked out.
   - Correct: `<Progress value={640} max={1000}/>`
   - Wrong: `<Progress value={64}/>`
5. progress-ring-size SHOULD Leave the sm ring empty; 40px has no room for a figure, so put it beside.
6. progress-not-running NEVER Use it for a task that is running; it has no indeterminate state. Because it is role meter, so a reader hears a fixed amount while nothing tells them work is moving.
   - Correct: `<Button pending={sending}>Send</Button>`
   - Wrong: `<Progress value={50} label="Sending payment"/> // while the request runs`
7. progress-one-color NEVER Recolor the fill per goal or turn it red past a limit; say over budget in words. Because the fill clamps at max, so a red bar cannot show how far over and fails color-blind readers.
   - Correct: `<p>$80 over your Dining budget</p><Progress value={spent} max={budget} label="Dining budget"/>`
   - Wrong: `<Progress value={spent} max={budget} label="Dining" className="[&_[data-slot=progress-indicator]]:bg-danger"/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `value, max` | `number` | `0, 100` | The amount and the goal. value is clamped to min and max. |
| `label` | `string` |  | The accessible name. Required. |
| `valueText` | `string` |  | The value in words for a screen reader. |
| `shape` | `'bar' \| 'ring'` | `'bar'` | A full-width 8px bar or a ring. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | The ring at 40, 64 or 96px. |
| `children` | `ReactNode` |  | The figure inside a ring. |
Other props pass through to the root element.

## Variants and states
- shape: bar, ring
- size: sm, md, lg
- states: empty, part, full

## Accessibility
- [ ] The root is role meter with aria-valuenow, aria-valuemin, aria-valuemax and the label as its name.
- [ ] valueText becomes aria-valuetext, so money is read as money.
- [ ] The lime fill has an olive edge, 3.95:1 on the page, so the filled part reads on grey.
- [ ] The ring and the bar are hidden from assistive tech; the figure inside a ring is read as text too.

## Edge cases
- Over the goal -> The fill stops at full; say how much over in the text.
- Nothing saved -> Only the grey track shows.
- Right to left -> The bar fills from the right; the ring runs the other way.
- Narrow container -> The bar takes the width; the ring keeps its size.
- Value changes -> The fill moves over 200ms, at once under reduced motion.
- max of 0 -> It draws empty instead of dividing by zero.

## Tokens
--surface-3, --accent, --accent-line, --fg, --text-sm, --text-lg, --text-xs, --dur-base, --ease-out

## Related
- [Slider](/systems/lime/components/slider.md): A value or a range on a track, such as a monthly savings amount.
- [Status](/systems/lime/components/status.md): The state of a payment as a dot and a word.
- [Card](/systems/lime/components/card.md): A grouped block, such as a savings goal or a card, on warm grey, outlined or raised.
