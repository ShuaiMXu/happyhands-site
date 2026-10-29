---
name: Chip
system: lime
kind: component
import: "import {Chip, chipClass} from '@/components/lime/ui/chip'"
install: "npx shadcn@latest add https://design.how/r/lime/chip.json"
registryDependencies: [icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/chip
---

# Chip

Turns a filter on or off with a tap, like Food or This month.

## Use when
- A filter or topic that is on or off: Groceries, Vertical, Under $50.
- An applied filter the person removes with one press.
- Picking several tags from a short list.

## Don't use when
- Static metadata the person cannot act on. Use [Badge](/systems/lime/components/badge.md).
- Exactly one of a few. Use [Segmented](/systems/lime/components/segmented.md).
- An option on a form that waits for a Save. Use [Checkbox](/systems/lime/components/checkbox.md).

## Minimal example
```tsx
<Chip pressed={on} onPressedChange={setOn}>Groceries</Chip>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. chip-group-label MUST Wrap chips that share a question in role="group" with an aria-label. Because a screen reader otherwise reads a row of toggles with no question they answer.
   - Correct: `<div role="group" aria-label="Topics">...</div>`
   - Wrong: `<div><Chip>Groceries</Chip><Chip>Fun</Chip></div>`
2. chip-remove-label MUST Set removeLabel to name each close button, such as "Remove Vertical". Because removeLabel defaults to "Remove", so every close button reads the same.
   - Correct: `<Chip onRemove={drop} removeLabel="Remove Vertical">Vertical</Chip>`
   - Wrong: `<Chip onRemove={drop}>Vertical</Chip>`
3. chip-remove-focus MUST Move focus to the next chip or the group after a removal. Because the close button unmounts with its chip and focus falls to the body.
   - Correct: `onRemove={() => { setList(...); groupRef.current?.focus(); }}`
4. chip-empty-says-so SHOULD Say nothing is filtered when the last chip is removed instead of leaving a blank row.
   - Correct: `{filters.length === 0 && <span>No filters. Showing all transactions.</span>}`
5. chip-short-label SHOULD Use one to three words in sentence case; the label never wraps.
6. chip-not-badge NEVER Use a disabled Chip to show a status; use Badge for anything static. Because a disabled Chip is still announced as a toggle button, dimmed to fg-disabled.
   - Correct: `<Badge variant="success">Paid</Badge>`
   - Wrong: `<Chip pressed disabled>Paid</Chip>`
7. chip-row-wraps MUST Put chips in a flex-wrap row; they never shrink or wrap their label. Because chips are whitespace-nowrap, so an unwrapped row overflows a 390px screen.
   - Correct: `<div className="flex flex-wrap gap-2">...</div>`
   - Wrong: `<div className="flex gap-2">...</div>`
8. chip-no-nested-button NEVER Put your own button inside a Chip; onRemove already renders a sibling close button. Because a button inside the Chip's button is invalid HTML and its press also toggles the chip.
   - Correct: `<Chip onRemove={drop} removeLabel="Remove Dining">Dining</Chip>`
   - Wrong: `<Chip>Dining <button onClick={drop}>x</button></Chip>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `pressed, defaultPressed` | `boolean` | `false` | Controlled or uncontrolled chosen state. |
| `onPressedChange` | `(pressed: boolean, details) => void` |  | Called when pressed. |
| `onRemove` | `() => void` |  | Adds the close button and calls this when pressed. |
| `removeLabel` | `string` | `'Remove'` | The accessible name of the close button. |
| `disabled` | `boolean` | `false` | Disables the toggle, not the close button. |
Other props pass through to the root element.

## Variants and states
- onRemove: none, function
- states: rest, hover, focus-visible, chosen, disabled

## Accessibility
- [ ] Role button with aria-pressed true or false; the close button is a separate button.
- [ ] Space and Enter toggle; Tab visits each chip and close button in order.
- [ ] Chosen shows the wash, an olive edge and a check, so it reads without color.
- [ ] Focus shows a 2px olive outline offset 2px.

## Edge cases
- Long label -> Never wraps; the chip is as wide as its text and overflows a narrow row.
- Row in 160px -> A flex-wrap row wraps; a no-wrap row overflows.
- Right to left -> The toggle and close button mirror with logical edges.
- Zoom 200% -> The text grows and the 32px height stays.
- Touch -> The chip is 32px tall, under 44px; leave 8px between chips.
- Forced colors -> A chosen chip paints with Highlight; the check follows the text color.

## Tokens
--page, --line-strong, --fg, --control-sm, --radius-control, --surface, --accent-wash, --accent-line, --fg-disabled, --fg-3, --ring, --line-focus, --focus-offset, --dur-instant, --ease-out

## Related
- [Badge](/systems/lime/components/badge.md): A short fact that never changes on its own, such as Plus or New.
- [Segmented](/systems/lime/components/segmented.md): A short row of exclusive options, such as Week, Month and Year.
- [Checkbox](/systems/lime/components/checkbox.md): One option on or off, with a mixed state.
