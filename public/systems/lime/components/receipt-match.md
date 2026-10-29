---
name: Receipt match
system: lime
kind: component
import: "import {ReceiptMatch} from '@/components/lime/ai/receipt-match'"
install: "npx shadcn@latest add https://happyhands.cc/r/lime/receipt-match.json"
registryDependencies: [amount, icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/receipt-match
---

# Receipt match

Shows a file next to the item it belongs to, and whether they match.

## Use when
- The assistant paired a receipt photo with a card payment.
- A list of payments that still need a receipt, for expenses or taxes.
- A receipt that does not agree with its payment and needs a look.

## Don't use when
- A payment with no receipt involved. Use [List](/systems/lime/components/list.md).
- Uploading the receipt file itself. Use [Dropzone](/systems/lime/components/dropzone.md).

## Minimal example
```tsx
<ReceiptMatch merchant="Corner Market" date="Oct 2" amount={-41.2} state="matched"/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. receipt-match-say-difference MUST Give a review match a note that says what differs. Because the default review note is "Check the receipt", which never says what to check.
   - Correct: `<ReceiptMatch state="review" note="Receipt says $44.20"/>`
   - Wrong: `<ReceiptMatch state="review"/>`
2. receipt-match-missing-add MUST Pass onAdd with a missing match; the empty paper is the add button. Because without onAdd the paper is still a focusable button that does nothing.
   - Correct: `<ReceiptMatch state="missing" onAdd={openCamera}/>`
3. receipt-match-signed MUST Pass the amount signed, negative for money out. Because Amount prints a positive value with no minus, so a payment reads as money in.
   - Correct: `amount={-4.8}`
   - Wrong: `amount={4.8}`
4. receipt-match-src SHOULD Pass the receipt photo as src when you have it; the drawn paper is a stand-in.
5. receipt-match-stack SHOULD Stack matches with a 12px gap and no hairlines; the papers already set the rhythm.
6. receipt-match-no-card NEVER Wrap a match in a Card or a grey panel; it is a row. Because the paper thumbnail is already the frame, so a card puts a box around a box.
   - Correct: `<ReceiptMatch merchant="Corner Coffee" date="Oct 2" amount={-4.8} state="matched"/>`
   - Wrong: `<Card><ReceiptMatch merchant="Corner Coffee" date="Oct 2" amount={-4.8} state="matched"/></Card>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `merchant` | `string` | `required` | Who was paid. |
| `date` | `string` | `required` | When, such as Oct 2. |
| `amount` | `number` | `required` | Signed: negative is money out. |
| `state` | `'matched' \| 'review' \| 'missing'` | `required` | Sets the mark on the paper and the default note. |
| `note` | `string` | `a word for the state` | The line after the date. |
| `src` | `string` |  | A photo of the receipt. |
| `onAdd` | `() => void` |  | Called by the empty paper of a missing match. |
Other props pass through to the root element.

## Variants and states
- state: matched, review, missing
- states: matched, review, missing

## Accessibility
- [ ] The match is said in the note, not only by the mark.
- [ ] The empty paper is a button named "Add a receipt for" and the merchant.
- [ ] The drawn paper is decorative and hidden from screen readers.

## Edge cases
- Long merchant name -> Truncates with an ellipsis; the amount keeps its width.
- Narrow screen -> The note truncates; the paper stays 40 by 48.
- Right to left -> The paper sits at the start and its mark moves to the other corner.

## Tokens
--raised, --line, --surface-3, --success-text, --warn-text, --warn, --control, --fg-3, --radius-field

## Related
- [List](/systems/lime/components/list.md): Rows of transactions, accounts or settings, each with a mark, a title and a value or a chevron.
- [Dropzone](/systems/lime/components/dropzone.md): A target for receipts and statements, with type and size checks.
- [Amount](/systems/lime/components/amount.md): A money amount with its sign, currency and tabular figures.
