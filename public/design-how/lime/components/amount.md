---
name: Amount
system: lime
kind: component
import: "import {Amount, amountAffordability, formatAmount, spokenAmount, toMoney, amountVariants} from '@/components/lime/ui/amount'"
install: "npx shadcn@latest add https://design.how/r/lime/amount.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/amount
---

# Amount

Shows a number with its unit, and flags when there is not enough.

## Use when
- Next to a button or send control that moves money, so the sum is known before the press.
- A list of options with different prices, such as a transfer speed picker.
- A bill share or a fee beside the choice it belongs to.

## Don't use when
- How much the person has left. Use [Balance](/systems/lime/components/balance.md).
- A static fact about a plan, such as $4 a month. Use [Badge](/systems/lime/components/badge.md).
- The state of a payment, such as Paid. Use [Status](/systems/lime/components/status.md).
- The amount at the end of a transaction row; write formatAmount text so the column stays quiet. Use [List](/systems/lime/components/list.md).

## Minimal example
```tsx
<Amount value={-50} available={available}/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. amount-available-prop MUST Pass available and let the pill pick its tone; do not set tone="danger" by hand. Because a hand-set tone never turns amber when tight and skips the spoken "more than you have available".
   - Correct: `<Amount value={-50} available={available}/>`
   - Wrong: `<Amount value={-50} tone="danger"/>`
2. amount-before-press MUST Show the sum before the press, on or beside the control that moves money. Because a sum that appears only after the press is a receipt, and the money has already moved.
3. amount-block-when-short MUST Disable the action or turn it into Add money when the payment exceeds available; keep the red pill. Because a payment the account cannot cover fails only after the press, and the red pill alone offers no way on.
   - Correct: `<Button variant="outline">Add money</Button> <Amount value={-50} available={20}/>`
4. amount-major-units MUST Pass major units (dollars), not cents. Because 1250 cents renders as $1,250.00, a hundred times the real sum.
   - Correct: `<Amount value={cents / 100}/>`
   - Wrong: `<Amount value={1250}/> // 1250 cents`
5. amount-no-hand-format NEVER Build the sum as a template string; use Amount. Because a hand-built string drops the minus, the separators or the tabular figures.
   - Correct: `<Amount value={total}/>`
   - Wrong: `<span>${total}</span>`
6. amount-sign-and-colour NEVER Signal a tone by color alone; keep the amount and its sign. Because a red tint says nothing to a screen reader, while Amount speaks the signed sum and the shortfall.
   - Correct: `<Amount value={-50} available={20}/>`
   - Wrong: `<span className="bg-danger-tint text-danger-text">50</span> // red means out`
7. amount-one-per-action SHOULD Show one pill per control that moves money; two pills make the person add them up.
8. amount-row-wraps SHOULD Put the pill in a row that can wrap; it is shrink-0 and nowrap.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `value` | `number` |  | The sum in major units. Negative is money out. Required. |
| `currency` | `string` | `'USD'` | ISO 4217 code. |
| `available` | `number \| null` |  | Money in the account. Tight under 20% left, insufficient when the payment is above it. |
| `signed` | `boolean` | `false` | A plus on money in. |
| `tone` | `'neutral' \| 'accent' \| 'warn' \| 'danger'` | `from available` | Overrides the tone available picks. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 20, 24 or 28px tall. |
| `compact` | `boolean` | `false` | Whole units, no cents. |
| `approximate` | `boolean` | `false` | A tilde before the amount; wins over atLeast. |
| `atLeast` | `boolean` | `false` | A plus after the amount. |
| `amountAffordability(value, available)` | `function` |  | Returns unknown, insufficient, tight or comfortable; use it to disable the action. |
Other props pass through to the root element.

## Variants and states
- tone: neutral, accent, warn, danger
- size: sm, md, lg
- format: exact, approximate, atLeast, compact
- signed: false, true
- states: comfortable, tight, insufficient, unknown

## Accessibility
- [ ] The spoken amount is real sr-only text, such as "minus 50.00 US dollars"; the visible text is aria-hidden.
- [ ] An insufficient payment adds ", more than you have available" to the spoken text.
- [ ] Not focusable; data-affordability is a styling hook, not an ARIA state.
- [ ] Tone never carries the warning alone; the amount and sign stay.

## Edge cases
- Very large sum -> $1,234,567.89 stays on one line; it never wraps or truncates.
- Sub-dollar and compact -> 0.5 reads $0.50; compact rounds to $1.
- Zero or NaN -> 0 reads $0.00 with no sign; a value that is not a number reads Unavailable, a numeric string reads as its number, and a NaN available stays neutral.
- Narrow to 120px -> The pill stays on one line and overflows; put it in a row that wraps.
- Right to left -> The sum is isolated left to right, so the minus stays before the digits.
- Zoom 200% -> The pill keeps its fixed height and the text clips rather than wraps.
- Funds still loading -> Omit available; the pill tones when it arrives, with no layout shift.
- Forced colors -> Tint fills drop; tone reads from the sign and the spoken label only.

## Tokens
--surface-2, --fg, --fg-2, --radius-control, --accent-wash, --warn-tint, --warn-text, --danger-tint, --danger-text, --text-xs, --text-sm, --weight-medium

## Related
- [Balance](/systems/lime/components/balance.md): The amount left in an account, kept in the header.
- [Badge](/systems/lime/components/badge.md): A short fact that never changes on its own, such as Plus or New.
- [Status](/systems/lime/components/status.md): The state of a payment as a dot and a word.
- [Button](/systems/lime/components/button.md): Starts an action, such as Send money. The lime primary is the one glowing action on a screen.
