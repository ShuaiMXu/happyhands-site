---
name: Keypad
system: lime
kind: component
import: "import {Keypad, pressKey} from '@/components/lime/ui/keypad'"
install: "npx shadcn@latest add https://design.how/r/lime/keypad.json"
registryDependencies: [icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/keypad
---

# Keypad

A number pad for typing numbers on a phone.

## Use when
- The amount step of send, request or move money, full screen on a phone.
- A savings target or a split share, with decimal off for whole units.

## Don't use when
- An amount inside a form on a wide screen, where a keyboard is at hand. Switch at the sm breakpoint: the Keypad in sm:hidden and an Input with inputMode="decimal" in hidden sm:block, sharing one value. Use [Input](/systems/lime/components/input.md).
- A few fixed amounts, such as $10, $20 and $50. Use [Chip](/systems/lime/components/chip.md).
- A PIN or a code. Use a one-time code field that hides the digits.

## Minimal example
```tsx
const [value, setValue] = useState('');
<Keypad value={value} onValueChange={setValue}/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. keypad-string-value MUST Keep value as the string the pad returns and parse it once on Continue. Because Number("12.") is 12, so the point and the trailing zero of 12.50 vanish mid-entry.
   - Correct: `onValueChange={setValue} // Number(value || '0') on Continue`
   - Wrong: `onValueChange={v => setAmount(Number(v))}`
2. keypad-figure-above MUST Show the figure above the pad in an output with aria-live="polite", at text-3xl. Because the keys announce single digits, so the live output is how a screen reader hears the amount.
   - Correct: `<output aria-live="polite" className="text-3xl">{formatAmount(Number(value || '0'))}</output>`
3. keypad-one-action MUST Put one lime Continue under the pad, off at zero and over the balance. Because a Continue that stays on lets the person send nothing or more than they have.
   - Correct: `<Button disabled={amount === 0 || amount > balance}>Continue</Button>`
4. keypad-say-limit SHOULD Say why Continue is off under the figure, such as More than your $400.00.
5. keypad-decimal-off SHOULD Set decimal={false} for whole units; the point key leaves a blank cell.
6. keypad-no-native NEVER Open the phone keyboard as well; no input takes focus on this screen. Because the system keyboard slides over the pad and two inputs edit one amount.
   - Correct: `<output aria-live="polite">{formatAmount(Number(value || '0'))}</output>`
   - Wrong: `<Input inputMode="decimal" autoFocus value={value}/> // above the Keypad`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `value, onValueChange` | `string, (value: string) => void` |  | The typed amount, such as "42.5". Required. |
| `decimal` | `boolean` | `true` | Shows the point key and allows two decimals. |
| `maxDigits` | `number` | `7` | The most digits before the point. |
| `disabled` | `boolean` | `false` | Turns every key off. |
| `pressKey` | `(value, key, options) => string` |  | The rules alone, for tests or a custom pad. |
Other props pass through to the root element.

## Variants and states
- decimal: true, false
- states: rest, hover, focus-visible, pressed, disabled

## Accessibility
- [ ] The pad is a group named Amount keypad; every key is a button.
- [ ] The point is named Decimal point and the delete key Delete.
- [ ] With focus inside, the keys 0 to 9, the point and Backspace type as well.
- [ ] Keys are 56px tall, over the 44px touch target.
- [ ] The figure above is the screen's output with aria-live="polite", so each change is read.

## Edge cases
- Leading zero -> 0 then 5 gives 5; the point after nothing gives 0.
- Third decimal -> The key does nothing once there are two digits after the point.
- Second point -> Ignored.
- Over maxDigits -> Digits stop at the cap; the cents can still be typed.
- Over the balance -> The pad still types; the screen turns Continue off and says why.
- Narrow phone -> The keys share the width; the pad never scrolls.

## Tokens
--radius-panel, --text-2xl, --text-3xl, --fg, --fg-3, --fg-disabled, --surface-2, --surface-3, --ring, --focus-offset, --danger-text, --dur-instant

## Related
- [Amount](/systems/lime/components/amount.md): A money amount with its sign, currency and tabular figures.
- [Input](/systems/lime/components/input.md): One line of text, such as a merchant name or a search.
- [Chip](/systems/lime/components/chip.md): A filter the person toggles, such as a spending category.
