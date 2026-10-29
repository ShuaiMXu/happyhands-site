---
name: Balance
system: lime
kind: component
import: "import {Balance, balanceVariants} from '@/components/lime/ui/balance'"
install: "npx shadcn@latest add https://happyhands.cc/r/lime/balance.json"
registryDependencies: [amount, icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/balance
---

# Balance

Keeps the number that matters most at the top, one tap from topping it up.

## Use when
- The header of an account screen, where the balance is always in sight.
- A sheet or settings page that shows the balance and leads to adding money.
- The balance is both a read-out and a way to add more.

## Don't use when
- One payment or fee. Use [Amount](/systems/lime/components/amount.md).
- A plan name or a count that is not a balance. Use [Badge](/systems/lime/components/badge.md).
- A static number with no action. Use plain text.

## Minimal example
```tsx
<Balance value={1240} onClick={openTopUp}/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. balance-opens-top-up MUST Give Balance an onClick (or render) that opens the add money flow; its label ends with Add money. Because its spoken label ends in Add money, so without onClick it promises an action that never runs.
   - Correct: `<Balance value={1240} onClick={openTopUp}/>`
   - Wrong: `<Balance value={1240}/>`
2. balance-low-limit SHOULD Set low under a limit your product chooses, before the person is stopped, not at zero.
   - Correct: `<Balance value={18.4} low/>`
3. balance-value-dollars MUST Pass value in major units (dollars); the chip adds the symbol, separators and cents. Because a string such as "$1,240" formats as $NaN, and cents read a hundred times too high.
   - Correct: `<Balance value={1240}/>`
   - Wrong: `<Balance value="$1,240"/>`
4. balance-no-hand-glow NEVER Restyle the chip with gradients or fills; it is lime with the subtle glow, amber when low. Because the switch to amber is the low warning, and a hand-set fill hides it.
   - Correct: `<Balance value={18.4} low/>`
   - Wrong: `<Balance value={18.4} low className="bg-gradient-to-b from-accent to-warn"/>`
5. balance-one-per-view SHOULD Show one Balance per screen; two can differ for a moment and look like a bug.
6. balance-loading MUST Render a skeleton or nothing while the balance loads; never a stale or NaN number. Because an undefined value prints $NaN in the header, and a stale one invites a payment the account cannot cover.
7. balance-render-link SHOULD Use render to make it a link; do not nest a button in a link.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `value` | `number` |  | The amount left in major units. Required. |
| `low` | `boolean` | `false` | Flat amber with the word left and no glow; hover draws an amber edge. |
| `currency` | `string` | `'USD'` | ISO 4217 code. |
| `actionLabel` | `string` | `'Add money'` | The action spoken after the amount. |
| `onClick` | `function` |  | Opens the add money flow. |
Other props pass through to the root element.

## Variants and states
- low: false, true
- states: rest, hover, focus-visible, active, disabled

## Accessibility
- [ ] The button label is the spoken amount, then "running low" when low, then the action.
- [ ] The visible text is aria-hidden; the label covers it.
- [ ] Enter and Space run onClick; focus shows a 2px olive ring.
- [ ] Low also adds the word left, so color is not the only signal.

## Edge cases
- Very large balance -> Renders in full on one line; the pill grows.
- Zero -> Reads $0.00.
- Container narrower than the pill -> It overflows; it does not wrap or shrink.
- Right to left -> The wallet sits at the start and the number follows.
- Zoom 200% -> The pill keeps h-8 and text can clip; put it in a header that grows.
- Forced colors -> The glow drops and the chip takes a 1px ButtonText border.
- Missing balance -> A value that is not a number reads Unavailable; a numeric string such as "12.40" is read as the number. While loading, show a Skeleton.

## Tokens
--accent, --on-accent, --glow-accent-from, --glow-accent-to, --glow-accent-edge, --glow-accent-bloom, --glow-accent-cast, --glow-accent-from-lit, --glow-accent-to-lit, --glow-accent-edge-lit, --glow-accent-from-press, --glow-accent-to-press, --surface-2, --fg-disabled, --warn-tint, --warn-text, --radius-control, --text-sm, --weight-medium, --dur-base, --ease-out

## Related
- [Amount](/systems/lime/components/amount.md): A money amount with its sign, currency and tabular figures.
- [Badge](/systems/lime/components/badge.md): A short fact that never changes on its own, such as Plus or New.
- [Button](/systems/lime/components/button.md): Starts an action, such as Send money. The lime primary is the one glowing action on a screen.
