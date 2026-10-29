---
name: Number input
system: glaze
kind: component
import: "import {NumberInput} from '@/components/glaze/ui/number-input'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/number-input.json"
registryDependencies: [field, icon, input, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/number-input
---

# Number input

Takes a number and steps it.

## Use when
- A count or an amount the person nudges more than types: retries, a timeout, a token budget.
- A number with bounds the field should hold to (min, max).

## Don't use when
- A rough value on a scale where the exact number matters less. Use [Slider](/systems/glaze/components/slider.md).
- An ID, a code or a phone number; digits are not a quantity. Use [Input](/systems/glaze/components/input.md).
- A one-time code. Use [OTP input](/systems/glaze/components/otp-input.md).

## Minimal example
```tsx
<Field>
  <FieldLabel>Timeout</FieldLabel>
  <NumberInput defaultValue={30} min={1} max={300} unit="s"/>
</Field>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. number-input-unit MUST Pass the unit as unit, never in the label or as text beside the pill. Because unit sits inside the line and is read with the value ("30 s"); beside the pill it is outside the field and read separately.
   - Correct: `<NumberInput unit="ms"/>`
   - Wrong: `<div className="flex gap-2"><NumberInput/><span>ms</span></div>`
2. number-input-bounds MUST Set min and max when the value has limits. Because without them the steppers walk past the limit and the error arrives only on submit.
   - Correct: `<NumberInput defaultValue={3} min={0} max={10}/>`
   - Wrong: `<NumberInput defaultValue={3}/>`
3. number-input-label MUST Name it with a Field and FieldLabel, or aria-label. Because the steppers say Increase and Decrease, and nothing says what.
   - Correct: `<Field><FieldLabel>Retries</FieldLabel><NumberInput/></Field>`
   - Wrong: `<NumberInput/>`
4. number-input-not-ids NEVER Use it for an ID, a card number or a phone number. Because the steppers and the arrow keys change digits that are a name, not a quantity, and leading zeros are dropped.
   - Correct: `<Input aria-label="Order ID" inputMode="numeric" mono/>`
   - Wrong: `<NumberInput aria-label="Order ID"/>`
5. number-input-steps SHOULD Set step to the change a person makes, and largeStep to ten of them.
   - Correct: `<NumberInput step={1000} largeStep={10000} unit="tokens"/>`
6. number-input-format SHOULD Pass format for currency or percent instead of a unit.
   - Correct: `<NumberInput format={{style: 'currency', currency: 'USD'}}/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `value, defaultValue, onValueChange` | `number \| null` |  | null is empty. |
| `min, max` | `number` |  | A stepper turns off at its bound. |
| `step, smallStep, largeStep` | `number` | `1, 0.1, 10` | Alt steps small, Shift large. |
| `unit` | `string` |  | After the value, inside the pill. |
| `format, locale` | `Intl.NumberFormatOptions, string` |  | How the value reads. |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | 26, 32 or 36px. |
| `leading` | `ReactNode` |  | An icon before the step down. |
| `aria-invalid` | `boolean` |  | The coral line. A Field sets it for you. |
Other props pass through to Base UI NumberField.Root; className goes to the pill.

## Variants and states
- size: sm, default, lg
- unit: none, unit
- states: rest, focus, at a bound, invalid, disabled, read-only
- when states meet, the first wins: disabled > invalid > focus > read-only > rest

## Accessibility
- [ ] The text is a textbox with inputmode="decimal"; Base UI keeps the value clamped and announces the formatted number.
- [ ] The steppers are named Increase and Decrease and stay out of the tab order; the arrow keys do their job from the text.
- [ ] The unit is in the pill for the eye and read through the label or aria-describedby for a screen reader.
- [ ] Focus darkens the line to --line-focus, as Input does.

## Keyboard
- `Up, Down`: Step by step; with Shift by largeStep, with Alt by smallStep.
- `Home, End`: Go to min and max, when set.
- `Enter`: Submits the form around it.

## Edge cases
- Typed out of range -> Clamped to the bound on blur.
- Typed text that is not a number -> Reverts to the last number on blur.
- Stepper held -> Repeats until released or the bound, where it turns off.
- Narrow field -> The value shrinks before the steppers, which keep their size.
- Right to left -> The steppers swap ends; digits keep their order.

## Tokens
--paper, --field, --line-control, --line-focus, --line-faint, --fail, --hover, --pressed, --text-1, --text-3, --text-disabled, --control-sm, --control, --control-lg, --shell-inset, --radius-pill, --type-body-sm, --type-caption, --type-body

## Related
- [Input](/systems/glaze/components/input.md): Takes one line of text.
- [Slider](/systems/glaze/components/slider.md): Picks a number or a range.
- [Field](/systems/glaze/components/field.md): Gives an input its label and error.
