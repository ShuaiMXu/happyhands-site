---
name: Autonomy rule
system: lime
kind: component
import: "import {AutonomyRule} from '@/components/lime/ai/autonomy-rule'"
install: "npx shadcn@latest add https://design.how/r/lime/autonomy-rule.json"
registryDependencies: [input, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/autonomy-rule
---

# Autonomy rule

Sets how far the assistant may go on its own, as a sentence you fill in.

## Use when
- A limit on what the assistant does without asking: an amount, a number of days, a count of payments.
- A settings screen of several such limits, one sentence each.

## Don't use when
- A setting that is only on or off, such as round-ups. Use [Switch](/systems/lime/components/switch.md).
- Picking an amount by feel along a range. Use [Slider](/systems/lime/components/slider.md).
- Asking once, before one payment. Use [Approval request](/systems/lime/components/approval-request.md).

## Minimal example
```tsx
<AutonomyRule
  before="Ask me before paying over"
  value={limit}
  onValueChange={setLimit}
/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. autonomy-rule-sentence MUST Write the rule so before, the value and after read as one plain sentence. Because before, the value and after join into the field label, so a screen reader hears only "Limit $50".
   - Correct: `before="Ask me before paying over"`
   - Wrong: `before="Limit"`
2. autonomy-rule-kind MUST Use kind="amount" for money and kind="number" for days or counts; never type the $ yourself. Because the amount field draws its own $ and strips typed ones, and a day count with $ reads "$3 days early".
   - Correct: `<AutonomyRule kind="number" before="Pay bills" after="days early" value="3"/>`
   - Wrong: `<AutonomyRule before="Pay bills" value="$3"/>`
3. autonomy-rule-short SHOULD Keep the sentence under about 30 characters so it stays on one line on a phone.
4. autonomy-rule-one-per-limit SHOULD Give each limit its own rule, stacked with a 12px gap; never two fields in one sentence.
5. autonomy-rule-save MUST Save on change or on leaving the field; do not add a Save button per sentence. Because a button inside each sentence breaks its one line on a phone, and an unsaved limit keeps the old one.
6. autonomy-rule-no-glow NEVER Put the lime or a glow on a rule; it is a setting, not the main action. Because the lime marks the one main action, and a lit setting competes with it.
   - Correct: `<AutonomyRule before="Ask me before paying over" value="50"/>`
   - Wrong: `<AutonomyRule className="glow glow-accent bg-accent" before="Ask me before paying over" value="50"/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `before` | `string` |  | The words before the field. Truncates first on a narrow screen. |
| `after` | `string` |  | The words after the field. |
| `value` | `string` | `required` | The limit as typed. Letters are dropped. |
| `onValueChange` | `(value: string) => void` |  | Called with the cleaned value. |
| `kind` | `'amount' \| 'number'` | `'amount'` | amount shows a dollar sign and allows a decimal point. |
| `size` | `'sm' \| 'inline'` | `'sm'` | inline sets the field into a line of other text, such as a list row's second line: one line tall, in that line's type, as wide as its value. |
| `disabled` | `boolean` | `false` | Greys the sentence and the field. |
Other props pass through to the root element.

## Variants and states
- kind: amount, number
- size: sm, inline
- states: set, empty, disabled

## Accessibility
- [ ] The whole sentence, with the current value, is the field's accessible name.
- [ ] The field opens the number keyboard on a phone through inputMode.
- [ ] The focus ring is the 2px olive ring of every Lime field.

## Edge cases
- Narrow screen -> The words before the field truncate first; the field and the words after keep their width.
- Empty value -> The field stays its width and the name reads the blank as an ellipsis.
- Long number -> At sm the field scrolls its text and never grows. Inline grows with its value, sized in ch, so it fits 16px touch text too.
- Inside a row that clips -> An inline field draws its focus ring inside its edge, so a truncating list line keeps it.
- Right to left -> The sentence and the dollar sign follow the direction.

## Tokens
--field, --line-strong, --fg, --fg-3, --fg-disabled, --ring, --radius-field, --text-sm, --control-sm

## Related
- [Switch](/systems/lime/components/switch.md): A setting that applies at once, such as round-ups.
- [Slider](/systems/lime/components/slider.md): A value or a range on a track, such as a monthly savings amount.
- [Approval request](/systems/lime/components/approval-request.md): The assistant asking before it moves money, with the amount, one reason, and Approve, Edit or Decline.
