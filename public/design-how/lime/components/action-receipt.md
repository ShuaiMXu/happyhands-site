---
name: Action receipt
system: lime
kind: component
import: "import {ActionReceipt} from '@/components/lime/ai/action-receipt'"
install: "npx shadcn@latest add https://design.how/r/lime/action-receipt.json"
registryDependencies: [button, icon, message, status, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/action-receipt
---

# Action receipt

Tells you what the assistant just did, one line per action, with Undo.

## Use when
- The assistant finished work that changed money, bills or goals.
- Several actions that should read as one record.

## Don't use when
- A step while the assistant is still working. Use [Tool call](/systems/lime/components/tool-call.md).
- Asking before the money moves. Use [Approval request](/systems/lime/components/approval-request.md).
- A plain answer with nothing changed. Use [Message](/systems/lime/components/message.md).

## Minimal example
```tsx
<ActionReceipt
  lines={[{label: 'Moved $50 to savings'}]}
  onUndo={undo}
/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. action-receipt-past-tense MUST Write each line in the past tense with its amount. Because a screen reader reads each line after "Done:", so "Done: Moving money" claims nothing finished.
   - Correct: `{label: 'Moved $50 to savings'}`
   - Wrong: `{label: 'Moving money'}`
2. action-receipt-undo MUST Pass onUndo for anything that moved money; set undone once it is reversed. Because without onUndo there is no Undo to press, and without undone the lines stay green after it.
   - Correct: `<ActionReceipt lines={lines} undone={undone} onUndo={undo}/>`
3. action-receipt-failed-reason MUST Mark a line failed and put the reason in detail; keep the lines that worked. Because dropping the lines that worked hides money that did move, and only detail says why one failed.
   - Correct: `{label: 'Phone bill failed', detail: 'Card expired', failed: true}`
4. action-receipt-one-per-action SHOULD Write one line per action, at most five; group small ones.
5. action-receipt-summary SHOULD Keep summary to one sentence or leave it out.
6. action-receipt-no-card NEVER Wrap the receipt in a Card or a grey panel. Because it renders as an assistant Message, and a box around it splits it from the conversation.
   - Correct: `<ActionReceipt lines={lines} onUndo={undo}/>`
   - Wrong: `<Card><ActionReceipt lines={lines} onUndo={undo}/></Card>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `lines` | `{label, detail?, failed?}[]` | `required` | One per action. |
| `summary` | `string` |  | One sentence above the lines. |
| `undone` | `boolean` | `false` | Greys the lines and swaps Undo for Undone. |
| `onUndo` | `() => void` |  | Reverses the actions. Undo shows only when it is set. |
| `name` | `string` | `'Assistant'` | The assistant name, read out by screen readers. |
| `labels` | `{undo?, undone?, done?, failed?}` | `English words` | Undo, the Undone status and the hidden word per line, for another language. |
Other props pass through to the root element.

## Variants and states
- state: complete, partial, undone
- states: complete, partial, undone

## Accessibility
- [ ] Each line has a hidden word (Done, Failed, Undone) before its label.
- [ ] Undo and Undone sit in a polite live region, so the change is announced.
- [ ] A failed line is told by the warning shape and the word, not color alone.

## Edge cases
- Long line -> Truncates; the detail truncates first.
- Every line failed -> Send a plain message with the reason instead.
- Undo no longer possible -> Leave onUndo out and say why in the summary.

## Tokens
--text-sm, --text-base, --fg, --fg-3, --success-text, --danger-text, --control-sm

## Related
- [Tool call](/systems/lime/components/tool-call.md): One step the assistant took, such as Moved $50 to Vacation fund, as a single line.
- [Message](/systems/lime/components/message.md): One turn in a conversation with the assistant.
- [Approval request](/systems/lime/components/approval-request.md): The assistant asking before it moves money, with the amount, one reason, and Approve, Edit or Decline.
