---
name: Message
system: lime
kind: component
import: "import {Message, messageVariants} from '@/components/lime/ai/message'"
install: "npx shadcn@latest add https://happyhands.cc/r/lime/message.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/message
---

# Message

One turn in a chat, from you or from the assistant.

## Use when
- Each turn in a chat between a person and an assistant.
- A request and its answer, in order, with copy and retry under the answer.

## Don't use when
- A step the assistant took. Use [Tool call](/systems/lime/components/tool-call.md).
- The assistant asking before it moves money. Use [Approval request](/systems/lime/components/approval-request.md).
- Something the assistant noticed without being asked. Use [Insight](/systems/lime/components/insight.md).
- A comment thread between people, with names and times. Build it from Avatar and text.
- A notice or an error banner. Use an alert.

## Minimal example
```tsx
<Message from="user">Move $50 to Vacation fund.</Message>
<Message name="Lime" actions={actions}>Done. Vacation fund is now $290.</Message>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. message-assistant-plain MUST Leave the assistant answer as plain text without a bubble. Because the grey bubble marks the person's own turns, so a boxed answer blurs who said what.
   - Correct: `<Message name="Lime">{answer}</Message>`
   - Wrong: `<div className="rounded-panel bg-surface p-4">{answer}</div>`
2. message-actions-under-answer MUST Pass actions only on an assistant message; they sit under the answer. Because Message drops actions when from="user", so they never render.
   - Correct: `<Message name="Lime" actions={actions}>...</Message>`
   - Wrong: `<Message from="user" actions={actions}/>`
3. message-name SHOULD Pass the assistant product name as name so screen readers say who is speaking.
   - Correct: `<Message name="Lime">...</Message>`
   - Wrong: `<Message>...</Message>`
4. message-no-rail-time NEVER Add a rail, timestamp or read receipt to every turn. Because a line of metadata under each turn doubles the scroll and buries the answers.
   - Correct: `<Message name="Lime">{answer}</Message>`
   - Wrong: `<Message name="Lime">{answer}<time className="text-xs text-fg-3">9:41</time></Message>`
5. message-measure NEVER Widen an answer past the 65 character measure. Because past max-w-prose the eye loses its place on the way back to each line start.
   - Correct: `<Message name="Lime">...</Message>`
   - Wrong: `<Message name="Lime" className="[&>div]:max-w-none">{answer}</Message>`
6. message-speaker MUST Add a visually hidden "You: " before a user message. Because Message reads the assistant name aloud but says nothing before a user turn.
   - Correct: `<Message from="user"><span className="sr-only">You: </span>Move it every Friday</Message>`
7. message-no-empty NEVER Render a message with no children. Because an empty turn still reads the assistant name aloud and leaves a blank gap.
   - Correct: `{answer && <Message name="Lime">{answer}</Message>}`
   - Wrong: `<Message name="Lime">{answer}</Message> // while answer is still ""`
8. message-failure-tool-call SHOULD Show a failed step as a Tool call in failed state or a line of text; Message has no error state.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `from` | `'user' \| 'assistant'` | `'assistant'` | Whose turn it is. Sets side and shape. |
| `name` | `string` | `'Assistant'` | The assistant name, read out before its answer by screen readers. |
| `actions` | `ReactNode` |  | A row under an assistant message. |
Other props pass through to the root element.

## Variants and states
- from: assistant, user
- actions: none, with actions
- states: rest, action hover, action focus-visible

## Accessibility
- [ ] The assistant answer starts with its name for screen readers only; a user message has none, so add a hidden speaker word.
- [ ] Put turns in a list inside a scrolling region.
- [ ] The user bubble is a fill with no border and may lose its shape in forced colors; the text stays readable.
- [ ] Action buttons are 32px and need aria-labels.

## Edge cases
- Long answer -> Wraps at 65 characters; a long URL breaks anywhere.
- Narrow container -> The text wraps; the user bubble caps at 85%.
- Right to left -> Sides follow the writing direction; the squared corner is logical.
- One-word user message -> A small bubble at the end edge.
- Streaming answer -> Render children as they arrive; the layout grows down with no jump.
- Stacked turns -> Use a flex column with 20px gaps in a scrolling region.

## Tokens
--surface-2, --fg, --radius-panel, --text-base, --leading-normal, --fg-3

## Related
- [Tool call](/systems/lime/components/tool-call.md): One step the assistant took, such as Moved $50 to Vacation fund, as a single line.
- [Chat input](/systems/lime/components/chat-input.md): The box a request to the assistant is written in, with the amount and send.
- [Follow ups](/systems/lime/components/follow-ups.md): Suggested next requests under an answer.
