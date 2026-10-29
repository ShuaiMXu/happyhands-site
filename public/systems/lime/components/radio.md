---
name: Radio
system: lime
kind: component
import: "import {RadioGroup, Radio} from '@/components/lime/ui/radio'"
install: "npx shadcn@latest add https://happyhands.cc/r/lime/radio.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/radio
---

# Radio

For choosing just one option when all of them fit on screen.

## Use when
- One of 2 to 6 options where seeing them all helps: a quality, a plan, a privacy level.
- Options that need a line of explanation beside each.

## Don't use when
- More than about six options. Use [Select](/systems/lime/components/select.md).
- A view switch that applies at once. Use [Segmented](/systems/lime/components/segmented.md).
- Any number of options may be on. Use [Checkbox](/systems/lime/components/checkbox.md).

## Minimal example
```tsx
<RadioGroup defaultValue="next" aria-label="Transfer speed">
  <label><Radio value="standard"/> Standard, free</label>
  <label><Radio value="next"/> Next day, $0.50</label>
</RadioGroup>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. radio-group-name MUST Put radios in a RadioGroup with an aria-label or a visible label. Because the arrow keys and the single choice live in RadioGroup, and its name is read on entry.
   - Correct: `<RadioGroup aria-label="Transfer speed">...</RadioGroup>`
   - Wrong: `<Radio value="standard"/> <Radio value="next"/>`
2. radio-label-wraps MUST Wrap the circle and its text in one label element. Because a loose span leaves the 20px circle as the only tap target and the radio unnamed.
   - Correct: `<label><Radio value="standard"/> Standard</label>`
   - Wrong: `<Radio value="standard"/> <span>Standard</span>`
3. radio-default SHOULD Set defaultValue when one option is safe; a chosen group cannot be cleared.
   - Correct: `<RadioGroup defaultValue="next">`
   - Wrong: `<RadioGroup>`
4. radio-parallel-labels SHOULD Write options in the same shape with the cost or difference last.
5. radio-no-card-grid NEVER Style one-line options as large cards; use rows unless each needs a paragraph. Because cards for three one-line choices push Continue below the fold on a phone.
   - Correct: `<label className="flex items-center gap-2"><Radio value="standard"/> Standard, free</label>`
   - Wrong: `<RadioGroup className="grid grid-cols-2">{speeds.map(s => <Card key={s}><Radio value={s}/></Card>)}`
6. radio-list-length MUST Use Select past about six options. Because each radio is a full row, so twelve of them push the rest of the form off the screen.
   - Correct: `<Select>...12 items...</Select>`
   - Wrong: `<RadioGroup>...12 radios...</RadioGroup>`
7. radio-missing-choice MUST Say what is missing in text beside the group. Because Radio has no invalid style, so nothing else tells the person a choice is needed.
   - Correct: `<p className="text-sm text-danger-text">Choose a transfer speed</p>`
8. radio-long-label SHOULD Use items-start on a label row that wraps, so the circle stays by the first line.
   - Correct: `<label className="flex items-start gap-2">`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `RadioGroup value, defaultValue` | `string` |  | Controlled or uncontrolled chosen value. |
| `RadioGroup onValueChange` | `(value: string, details) => void` |  | Called when the choice changes. |
| `RadioGroup name, disabled, required` | `native` |  | Submitted with a form. |
| `Radio value` | `string` | `required` | The value this radio sets. |
| `Radio disabled` | `boolean` | `false` | Skipped by arrow keys. |
Other props pass through to the root element.

## Variants and states
- checked: false, true
- states: not chosen, chosen, hover, focus-visible, disabled

## Accessibility
- [ ] RadioGroup is role radiogroup and needs a name; each Radio is role radio named by its label.
- [ ] Tab enters the group once; arrows move and choose; Space chooses the focused radio.
- [ ] Focus shows a 2px olive ring around the circle.
- [ ] The 20px circle is under 44px; the wrapping label makes the line the target.
- [ ] Forced colors paints a chosen circle Highlight and the dot HighlightText.

## Edge cases
- Long label -> Wraps beside the circle; use items-start so it stays by the first line.
- Right to left -> The circle moves to the right edge; arrows follow the reading direction.
- Chosen and hovered -> The lime fill stays; the edge darkens under the pointer.
- Many options -> The column grows; switch to Select.
- Inside a form -> The chosen value submits under the group name.
- Reduced motion -> Colors change at once.

## Tokens
--page, --control, --fg-2, --accent, --accent-line, --on-accent, --line-strong, --surface-2, --fg-disabled, --ring, --line-focus, --focus-offset, --dur-fast, --ease-out

## Related
- [Checkbox](/systems/lime/components/checkbox.md): One option on or off, with a mixed state.
- [Segmented](/systems/lime/components/segmented.md): A short row of exclusive options, such as Week, Month and Year.
- [Select](/systems/lime/components/select.md): One choice from a list, such as an account or a category.
- [Switch](/systems/lime/components/switch.md): A setting that applies at once, such as round-ups.
