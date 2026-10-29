---
name: Approval request
system: lime
kind: component
import: "import {ApprovalRequest} from '@/components/lime/ai/approval-request'"
install: "npx shadcn@latest add https://happyhands.cc/r/lime/approval-request.json"
registryDependencies: [amount, button, card, collapsible, icon, status, theme, use-focus-when-replaced, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/approval-request
---

# Approval request

Asks you to say yes before the assistant does something for you.

## Use when
- The assistant is about to move money, pay a bill or change a goal.
- A check needs the person to decide.

## Don't use when
- Confirming a delete or another blocking choice. Use [Alert dialog](/systems/lime/components/alert-dialog.md).
- Reporting what the assistant already did. Use [Action receipt](/systems/lime/components/action-receipt.md).
- Something the assistant noticed that needs no decision. Use [Insight](/systems/lime/components/insight.md).

## Minimal example
```tsx
<ApprovalRequest
  title="Pay Lena for rent"
  amount={-450}
  reason="Due Friday, same as last month"
  onApprove={pay}
/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. approval-request-ask-first MUST Ask with an ApprovalRequest before the assistant moves any money; a payment the person starts uses a review step and Payment done instead. Because the assistant acting on its own is the case people need to stop.
2. approval-request-one-glow MUST Make Approve the one primary on the screen; turn other primaries secondary while it shows. Because two lime buttons leave the person unsure which one sends the payment.
   - Correct:
     ```tsx
     <Button variant="secondary">Add to savings</Button>
     <ApprovalRequest/>
     ```
   - Wrong:
     ```tsx
     <Button>Add to savings</Button>
     <ApprovalRequest/>
     ```
3. approval-request-signed-amount MUST Pass amount signed, negative for money out, and available when you know it. Because a positive amount reads as money in and never warns, and without available Approve stays on when short.
   - Correct: `<ApprovalRequest amount={-450} available={balance}/>`
4. approval-request-verb-title MUST Write the title as a verb and its object with the person named, under about 28 characters; a longer title truncates on a phone. Because the title is the group name a screen reader announces and the line the person decides on.
   - Correct: `title="Pay Lena for rent"`
   - Wrong: `title="Payment"`
5. approval-request-one-reason SHOULD Keep reason to one line; put more in reasons, behind the Why?.
   - Correct: `<ApprovalRequest reason="Due Friday" reasons={reasons}/>`
6. approval-request-reason-source MUST Give every entry in reasons a source: a rule you set or past activity. Because without a source the person has to take the assistant at its word before money moves.
   - Correct: `{text: 'Same as last month', source: '3 past payments'}`
   - Wrong: `{text: 'This looks normal'}`
7. approval-request-reasons-few SHOULD Pass two or three reasons, the strongest first.
8. approval-request-no-score NEVER Give a confidence score as a reason; name the evidence instead. Because a percentage gives the person nothing to check and reads as the assistant grading itself.
   - Correct: `{text: 'Same amount as March', source: '3 past payments'}`
   - Wrong: `{text: '94% confident', source: 'Model'}`
9. approval-request-short-off MUST Pass available so Approve turns off when the account cannot cover the amount; the card then says why and leaves Edit and Decline. Because Send in ChatInput is off for the same case, and an Approve that can only fail teaches people to press it blindly.
   - Correct: `<ApprovalRequest amount={-620} available={480}/>`
10. approval-request-pending SHOULD Set pending while the payment goes out, then state approved.
11. approval-request-decline-quiet NEVER Make Decline red or primary; keep it the quiet ghost button. Because red tells the person that saying no is risky, and a primary Decline takes the one glow from Approve.
   - Correct: `<Button variant="ghost" onClick={decline}>Decline</Button>`
   - Wrong: `<Button variant="destructive" onClick={decline}>Decline</Button>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `title` | `string` | `required` | The action, such as Pay Lena for rent. |
| `amount` | `number` | `required` | Signed. Negative is money out. |
| `available` | `number` |  | Tones the amount when it is tight or short. Short turns Approve off and shows why. |
| `reason` | `string` | `required` | One line. Truncates. |
| `state` | `'waiting' \| 'approved' \| 'declined'` | `'waiting'` | Buttons while waiting, a status line after. |
| `pending` | `boolean` |  | Approve shows its spinner; Edit and Decline disable. |
| `onApprove, onEdit, onDecline` | `() => void` |  | The three choices. |
| `reasons` | `{text, source, href?}[]` |  | More reasons behind a Why? under the reason line, each with where it came from. |
| `children` | `ReactNode` |  | Sits under the reason. |
| `labels` | `{approve?, decline?, edit?, why?, approved?, declined?, insufficient?}` | `English words` | The button and status words and the short line, for another language. |
Other props pass through to the root element.

## Variants and states
- state: waiting, approved, declined
- states: waiting, pending, approved, declined

## Accessibility
- [ ] The card is a group named by its title; Edit is a pencil button named Edit.
- [ ] The footer is a polite live region, so Approved or Declined is announced.
- [ ] Pending keeps focus on Approve and sets aria-busy.
- [ ] The amount is read with its sign and currency.

## Edge cases
- Long title -> Truncates; the amount stays whole.
- Long reason -> Truncates to one line; move detail into reasons.
- Amount above the balance -> With available, the amount turns danger, Approve turns off and a red line under the reason says why.
- Phone width -> Approve grows to fill the row; Edit and Decline keep their width, and the row fits 260px.
- Choice made -> The status line takes the buttons' height, so nothing below moves.

## Tokens
--surface, --radius-panel, --text-sm, --fg, --fg-2, --weight-medium, --control-md, --accent, --success, --fg-disabled, --danger-text

## Related
- [Tool call](/systems/lime/components/tool-call.md): One step the assistant took, such as Moved $50 to Vacation fund, as a single line.
- [Action receipt](/systems/lime/components/action-receipt.md): A message listing what the assistant just did, one line per action, with Undo.
- [Amount](/systems/lime/components/amount.md): A money amount with its sign, currency and tabular figures.
