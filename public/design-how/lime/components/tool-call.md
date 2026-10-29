---
name: Tool call
system: lime
kind: component
import: "import {ToolCall} from '@/components/lime/ai/tool-call'"
install: "npx shadcn@latest add https://design.how/r/lime/tool-call.json"
registryDependencies: [button, icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/tool-call
---

# Tool call

Tells you what the assistant did, one short line per step.

## Use when
- A step the assistant ran between a request and its answer: a search, a transfer, a lookup.
- A list of steps or checks in order, one line each, such as the checks before a payment.
- A failure the person can act on, with the reason.

## Don't use when
- The state of a job in a list, such as a payment in your activity. Use [Status](/systems/lime/components/status.md).
- The assistant's answer. Use [Message](/systems/lime/components/message.md).
- A notice or banner. Use an alert.

## Minimal example
```tsx
<ToolCall status="running" label="Splitting the bill" detail="Step 2 of 3"/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. tool-call-real-step MUST Name the real step; never "Thinking". Because Thinking gives the person nothing to check or stop before money moves.
   - Correct: `<ToolCall status="running" label="Splitting the bill" detail="Step 2 of 3"/>`
   - Wrong: `<ToolCall status="running" label="Thinking"/>`
2. tool-call-failure-reason MUST Put the failure reason in detail. Because without it the person cannot tell whether to top up, retry or give up.
   - Correct: `<ToolCall status="failed" label="Could not move money" detail="Not enough in Checking"/>`
   - Wrong: `<ToolCall status="failed" label="Something went wrong"/>`
3. tool-call-tense MUST Use present tense while running and past tense after. Because a done check beside Moving reads as a transfer still in flight.
   - Correct: `<ToolCall status="done" label="Moved $50 to Vacation fund"/>`
   - Wrong: `<ToolCall status="done" label="Moving $50 to Vacation fund"/>`
4. tool-call-no-chrome NEVER Wrap each step in a card with a title bar or chevron; keep the single line. Because a card per step pushes the assistant's answer below a stack of panels.
   - Correct: `<ToolCall status="done" label="Found 12 matching transactions"/>`
   - Wrong: `<Card><CardHeader>Step 1</CardHeader></Card>`
5. tool-call-live-region MUST Put steps that appear while waiting in a container with aria-live="polite". Because each row is role="status", but a live region added after load is not announced.
   - Correct: `<div aria-live="polite"><ToolCall/><ToolCall/></div>`
6. tool-call-short-label SHOULD Keep the label short with the key words first; it truncates to one line with no tooltip.
7. tool-call-position SHOULD Add a position such as "Step 2 of 3" in detail on a step that runs long.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `status` | `'running' \| 'done' \| 'failed'` | `required` | Sets the mark and the label color. |
| `label` | `string` | `required` | The step, present tense running and past tense after. |
| `detail` | `string` |  | A count, a position or a reason. Truncates before the label. |
Other props pass through to the root element.

## Variants and states
- status: running, done, failed
- detail: unset, a string
- states: running, done, failed

## Accessibility
- [ ] Each row is role status with a hidden state word (Running, Done, Failed) before the label.
- [ ] A change of state is announced politely.
- [ ] The spinner keeps turning under reduced motion; the marks swap at once.
- [ ] Failed is told by the warning shape and the word, not color alone.

## Edge cases
- Long label -> Truncates with an ellipsis; the full text is not reachable.
- Narrow container -> The detail truncates first so the label stays whole; the mark stays 16px.
- Right to left -> The mark sits at the start and the detail at the end.
- Reduced motion -> The spinner keeps turning by design.
- Empty label -> Only the mark draws; do not render it.
- Status swaps -> The mark changes at once with no layout shift.

## Tokens
--surface, --radius-field, --text-sm, --fg, --weight-medium, --danger-text, --success-text, --fg-2, --fg-3, --dur-spin

## Related
- [Status](/systems/lime/components/status.md): The state of a payment as a dot and a word.
- [Message](/systems/lime/components/message.md): One turn in a conversation with the assistant.
- [Chat input](/systems/lime/components/chat-input.md): The box a request to the assistant is written in, with the amount and send.
