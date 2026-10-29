---
name: Action receipt
system: glaze
kind: component
import: "import {ActionReceipt} from '@/components/glaze/ai/action-receipt'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/action-receipt.json"
registryDependencies: [activity, button, card, icon, relative-time, status, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/action-receipt
---

# Action receipt

Records what an agent did.

## Use when
- An agent finished an action that changed something outside the thread: a refund, an email sent, a deploy.
- Several changes from one request that should read as one record (steps).
- An action that can be reversed for a while.

## Don't use when
- A step while the agent is still working. Use [Tool call](/systems/glaze/components/tool-call.md).
- Asking before the action runs. Use [Tool call](/systems/glaze/components/tool-call.md).
- An answer that changed nothing. Use [Message](/systems/glaze/components/message.md).
- A short note that something saved. Use [Toast](/systems/glaze/components/toast.md).

## Minimal example
```tsx
<ActionReceipt
  title="Refunded $48.00 on order 4812"
  at={call.endedAt}
  by="Support agent"
  onUndo={undoRefund}
  undoUntil={call.undoUntil}
/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. action-receipt-past-tense MUST Write title and each step label in the past tense with the object and amount. Because the receipt is the record after the fact, and "Refunding" claims nothing happened.
   - Correct: `title="Refunded $48.00 on order 4812"`
   - Wrong: `title="Refunding order"`
2. action-receipt-undo-window MUST Pass onUndo with undoUntil set to the last moment the undo works; never leave Undo up past it. Because Undo leaves on its own at undoUntil, and an Undo that fails after the window breaks the one promise the receipt makes.
   - Correct: `<ActionReceipt title={t} onUndo={undo} undoUntil={refund.reversibleUntil}/>`
   - Wrong: `<ActionReceipt title={t} onUndo={undo}/>`
3. action-receipt-undo-states MUST Set undoing while the undo runs and undone when it lands. Because undoing holds Undo pending so it cannot run twice, and undone swaps the result for Undone and greys the steps.
   - Correct: `<ActionReceipt title={t} onUndo={undo} undoing={pending} undone={reversed}/>`
4. action-receipt-partial MUST Set result="partial" and mark the failed steps with failed and the reason in detail; keep the steps that worked. Because dropping the steps that worked hides changes that did happen, and only detail says why one failed.
   - Correct: `steps={[{label: 'Refunded $48.00'}, {label: 'Email not sent', detail: 'Address bounced', failed: true}]}`
5. action-receipt-ids-mono SHOULD Put an ID in a step's detail inside <code>, so it takes mono at 0.8.
   - Correct: `detail: <code>ord_4812</code>`
6. action-receipt-undo-flat NEVER Make Undo a glass button or add a second action beside it. Because reversing is not the next step the receipt leads to, and the footer holds meta and at most one quiet action.
   - Correct: `<ActionReceipt title={t} onUndo={undo} undoUntil={until}/>`
   - Wrong: `<Button variant="destructive">Undo</Button>`
7. action-receipt-no-wrap NEVER Wrap the receipt in another Card or panel. Because it is a card already, and a card in a card is a box in a box.
   - Correct: `<ActionReceipt title={t}/>`
   - Wrong: `<Card><ActionReceipt title={t}/></Card>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `title` | `ReactNode` |  | What was done, past tense. Required. |
| `steps` | `{label, detail?, failed?}[]` |  | One per change, when more than one. |
| `result` | `'done' \| 'partial' \| 'failed'` | `'done'` | The word at the header's end. |
| `at, now` | `Date \| string \| number` |  | When it happened; now freezes the clock. |
| `by` | `ReactNode` |  | The agent or tool, before the time. |
| `onUndo, undoUntil` | `() => void, Date \| string \| number` |  | Undo shows while both allow it. |
| `undoing, undone` | `boolean` | `false` | The undo runs; the undo landed. |
| `labels` | `{done?, partial?, failed?, undone?, undo?, undoing?}` | `English words` | Every word, for another language. |
Other props pass through to the card div.

## Variants and states
- result: done, steps, partial, failed
- states: undo open, undoing, undone, window passed
- when states meet, the first wins: undone > undoing > window passed > undo open

## Accessibility
- [ ] role="group" named by the title.
- [ ] The result is a word, never colour alone; each step reads its own word (Done, Failed, Undone) before the label.
- [ ] A polite status region says Undone when the undo lands.
- [ ] Undo keeps focus while pending and announces busy.

## Keyboard
- `Tab`: Reaches the time's hint, then Undo.
- `Enter, Space`: Undoes.

## Edge cases
- Window passes while open -> Undo leaves at that moment; the meta stays.
- Undo running at the deadline -> Undo stays pending until undone or the call settles.
- Failed result -> No Undo: nothing changed.
- Long title -> Wraps; the result word keeps the first line.
- Long step -> The label truncates, the detail truncates first.
- No time and no Undo -> No footer; the card is the panel alone.

## Tokens
--shell, --paper, --line-faint, --text-1, --text-2, --text-3, --ok-text, --warn-text, --fail-text, --menu-row-sm, --radius-shell, --radius-panel, --shell-inset, --type-label, --type-body-sm, --type-caption

## Related
- [Tool call](/systems/glaze/components/tool-call.md): Shows one tool an agent called.
- [Card](/systems/glaze/components/card.md): Groups content about one thing.
- [Status](/systems/glaze/components/status.md): Says where a piece of work stands.
- [Relative time](/systems/glaze/components/relative-time.md): Shows a time as distance from now.
