---
name: Radio group
system: sodium
kind: component
import: "import {RadioGroup, RadioGroupItem, RadioGroupOption} from '@/components/sodium/ui/radio-group'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/radio-group.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/radio-group
---

# Radio group

Picks one of a few choices.

## Use when
- Exactly one of two to six choices, each needing a line about its consequence.
- A form setting saved with the form, where the person should compare before choosing.

## Don't use when
- Two to five views of the same thing, switched at once. Use [Segmented control](/systems/sodium/components/segmented-control.md).
- Any number can be on. Use [Checkbox](/systems/sodium/components/checkbox.md).
- More than six choices. Use [Select](/systems/sodium/components/select.md).

## Minimal example
```tsx
<RadioGroup defaultValue="hourly" aria-label="Schedule">
  <RadioGroupOption value="hourly" label="Hourly" description="24 runs a day."/>
  <RadioGroupOption value="nightly" label="Nightly" description="One run at 02:00 UTC."/>
</RadioGroup>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. radio-group-option MUST Use RadioGroupOption for each choice so its label and description share one target and are read together. Because a loose RadioGroupItem with text beside it has no name, and only the 16px square takes the press.
   - Correct: `<RadioGroupOption value="hourly" label="Hourly" description="24 runs a day."/>`
   - Wrong: `<RadioGroupItem value="hourly"/><span>Hourly</span>`
2. radio-group-named MUST Name the group with a FieldLegend in a FieldSet, or aria-label. Because arrowing into an unnamed group, a screen reader announces the options with no question.
   - Correct: `<RadioGroup aria-label="Schedule">…</RadioGroup>`
   - Wrong: `<RadioGroup>…</RadioGroup>`
3. radio-group-default MUST Give the group a value or defaultValue unless choosing nothing is a real answer. Because a radio cannot be cleared once chosen, so an empty start the person must fix looks like a missing default.
   - Correct: `<RadioGroup aria-label="Schedule" defaultValue="hourly">…</RadioGroup>`
   - Wrong: `<RadioGroup aria-label="Schedule">…</RadioGroup>`
4. radio-group-square-dot NEVER Round the radio or its dot to tell it from a checkbox. Because every corner in Sodium is square; the radio tells itself apart by its square dot and by the group it sits in.
   - Correct: `<RadioGroupItem value="hourly" aria-label="Hourly"/>`
   - Wrong: `<RadioGroupItem className="rounded-full"/>`
5. radio-group-sentence-case MUST Write label in sentence case and description as a sentence; the label role sets the capitals. Because a screen reader reads the source, and typed capitals are spelled out.
   - Correct: `<RadioGroupOption label="Hourly" description="24 runs a day."/>`
   - Wrong: `<RadioGroupOption label="HOURLY" description="24 RUNS A DAY"/>`
6. radio-group-disabled-reason SHOULD Say why a disabled option is out of reach in its description.
   - Correct: `<RadioGroupOption value="minute" label="Every minute" description="Needs a dedicated worker." disabled/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `value, defaultValue, onValueChange` | `Base UI RadioGroup` |  | The chosen value. |
| `aria-invalid` | `boolean` | `false` | On the group: every unchosen edge turns red. |
| `disabled, readOnly, required, name` | `Base UI` |  | On the group or one item. |
| `RadioGroupOption label, description` | `ReactNode` |  | The choice and its consequence, one target. |
| `RadioGroupItem value` | `string` |  | A bare radio, for custom rows; name it. |
Other props pass through to the group div (Base UI RadioGroup); RadioGroupOption passes the rest to the radio.

## Variants and states
- checked: false, true
- states: rest, hover, held, focus-visible, chosen, invalid, disabled
- when states meet, the first wins: disabled > invalid > chosen > held > focus-visible > hover > rest

## Accessibility
- [ ] role="radiogroup" with one tab stop; each radio is named by its label and described by its consequence.
- [ ] The open edge is --line-control, 3.5:1 on its body; the chosen one is yellow with an ink square dot, 12.8:1, in light, the yellow tint with a yellow dot, 9.0:1, in dark.
- [ ] Each radio is 16px with a 28px hit area, and the whole option row is the target.
- [ ] Focus is the 2px --focus ring on the radio.

## Keyboard
- `Arrow keys`: Move to the next or previous option and choose it, wrapping at the ends.
- `Space`: Chooses the focused option.
- `Tab`: Enters on the chosen option and leaves the group.

## Edge cases
- Long description -> Wraps under the label; the radio stays on the first line.
- Nothing chosen -> Tab lands on the first enabled option.
- Disabled option -> Arrow keys skip it; its text turns the disabled colour.
- Right to left -> The radio moves to the start with the label, and the arrows follow the reading order.
- Forced colors -> The chosen radio takes Highlight with a HighlightText dot and no light.

## Tokens
--check-off, --check-off-hover, --well, --line-control, --line, --text-1, --text-2, --fail, --check-bg, --check-edge, --check-mark, --primary-light, --primary-light-hover, --type-label, --type-caption, --focus, --dur-light, --dur-glow, --ease-soft

## Related
- [Segmented control](/systems/sodium/components/segmented-control.md): Switches between a few views of one thing.
- [Checkbox](/systems/sodium/components/checkbox.md): Turns one option on or off.
- [Select](/systems/sodium/components/select.md): Picks one option from a list.
