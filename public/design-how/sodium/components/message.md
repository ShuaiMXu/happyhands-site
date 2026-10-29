---
name: Message
system: sodium
kind: component
import: "import {Message, MessageGroup, MessageDivider} from '@/components/sodium/ai/message'"
install: "npx shadcn@latest add https://design.how/r/sodium/message.json"
registryDependencies: [button, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/message
---

# Message

Shows one turn of a run's thread.

## Use when
- A person and an agent take turns on a run: an instruction, then the steps and the answer.
- A log of what was asked and done on a pipeline, read top to bottom.

## Don't use when
- The steps alone, with no one asking. Use [Tool-call row](/systems/sodium/components/tool-call-row.md).
- One line of what the run is doing. Use [Activity](/systems/sodium/components/activity.md).

## Minimal example
```tsx
<MessageGroup>
  <Message from="person" name="Mira" time="02:14">Backfill yesterday for eu-west-2.</Message>
  <Message name="Agent" time="02:14" state="running"><ToolCallList calls={calls}/></Message>
</MessageGroup>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. message-group MUST Put the turns in a MessageGroup, in order, on the page or in message flow; never in a frame. Because turns are divided by faint rules, and a ToolCallList inside a turn draws boxes that would sit in a box.
   - Correct: `<MessageGroup>{turns}</MessageGroup>`
   - Wrong: `<section className="frame">{turns}</section>`
2. message-order MUST Order an agent's turn as Activity, then ToolCallList, then Response, leaving out what it does not have. Because the person reads what it is doing, then what it did, then what it says, in every turn.
   - Correct: `<Message name="Agent"><ToolCallList calls={calls}/><Response>{answer}</Response></Message>`
   - Wrong: `<Message name="Agent"><Response>{answer}</Response><ToolCallList calls={calls}/></Message>`
3. message-state-word MUST Pass state for a turn that is working, waiting, failed or stopped; leave it out when the turn is done. Because the word in the label column is how a scan finds the turn that needs the person, and done is the normal end.
   - Correct: `<Message name="Agent" state="waiting">`
   - Wrong: `<Message name="Agent" state="done">`
4. message-no-bubble NEVER Wrap a person's words in a bubble, a box or a fill. Because Sodium reads a thread as a log, and the > before their words already says who wrote them.
   - Correct: `<Message from="person" name="Mira">{text}</Message>`
   - Wrong: `<Message from="person" name="Mira"><div className="panel p-3">{text}</div></Message>`
5. message-not-sent MUST Keep a person's turn that did not send, with state="not-sent" and onRetry. Because their words stay where they wrote them, Not sent says what happened and Retry is the way on.
   - Correct: `<Message from="person" name="Mira" state="not-sent" onRetry={retry}>{text}</Message>`
   - Wrong: `setTurns(turns.filter(t => t.id !== failed.id))`
6. message-footer-ghost SHOULD Put an agent turn's actions in footer as ghost buttons: copy, replay. Because the thread is read, not acted on, and the composer below holds the one primary.
7. message-divider SHOULD Mark a point in the thread with MessageDivider and a short name ("Run 4812 started"). Because a rule with a micro label splits the log where something changed, without a turn of its own.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `from` | `'agent' \| 'person'` | `'agent'` | A person's words sit behind a >. |
| `name` | `string` | `required` | Who, as a mono label. |
| `time` | `ReactNode` |  | When, as written; a <time> is best. |
| `state` | `'done' \| 'running' \| 'waiting' \| 'failed' \| 'stopped' \| 'sending' \| 'not-sent'` | `'done'` | A word in the label column; done says nothing. |
| `footer` | `ReactNode` |  | Ghost actions under the turn. |
| `onRetry` | `() => void` |  | Retry on a turn that did not send. |
| `labels` | `MessageLabels` | `English` | The state words and Retry. |
| `MessageGroup, MessageDivider` | `div` |  | The thread, and a named point in it. |
Other props pass through to the article.

## Variants and states
- from: agent, person
- states: done, working, waiting, failed, stopped, sending, not sent

## Accessibility
- [ ] Each turn is an article with its name as a heading, so a screen reader can move turn by turn.
- [ ] The state is a word, never only a colour; the pending mark and the > are aria-hidden.
- [ ] A working or sending turn sets aria-busy.

## Edge cases
- Narrow turn -> Under 512px wide the label column folds into one line above the turn, by the turn's own width.
- Long unbroken text -> Breaks inside the word rather than widening the thread.
- Line breaks in a person's words -> Kept as they wrote them.
- Long name -> Truncates in the label column.

## Tokens
--label-col, --line-faint, --line, --text-1, --text-2, --text-3, --warn-text, --fail-text, --type-label-sm, --type-code-sm, --type-code, --type-body, --type-micro, --pending-cell

## Related
- [Response](/systems/sodium/components/response.md): Renders an agent's answer as it streams.
- [Tool call](/systems/sodium/components/tool-call.md): Shows one tool an agent called in a run.
- [Prompt input](/systems/sodium/components/prompt-input.md): Takes the next instruction for an agent.
