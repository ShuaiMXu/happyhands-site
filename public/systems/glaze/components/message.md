---
name: Message
system: glaze
kind: component
import: "import {MessageGroup, Message, AgentTurn, MessageContent, MessageHeader, MessageMeta, MessageTime, MessageModel, MessageStatus, MessageFooter, MessageWorked, MessageBubble, MessageBubbleContent, MessageReactions, MessageSendState, MessageDivider, messageVariants, bubbleVariants, dividerVariants} from '@/components/glaze/ai/message'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/message.json"
registryDependencies: [button, icon, status, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/message
---

# Message

Shows one turn of a conversation.

## Use when
- A thread shows what a person wrote and what an agent did and said.
- A point in the thread needs marking: context compacted, a run interrupted, a handoff.

## Don't use when
- A one-off notice about the page, not a turn. Use [Alert](/systems/glaze/components/alert.md).
- A list of runs or tickets. Use [Item](/systems/glaze/components/item.md).

## Minimal example
```tsx
<Message from="user"><MessageContent>
  <MessageHeader>Maya<MessageTime>14:01</MessageTime></MessageHeader>
  <MessageBubble><MessageBubbleContent>{text}</MessageBubbleContent></MessageBubble>
</MessageContent></Message>
<AgentTurn name="Refund agent" state="done"><ToolCallList calls={calls}/><Response>{answer}</Response><MessageFooter>...</MessageFooter></AgentTurn>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. message-agent-turn MUST Build every agent turn with AgentTurn, its sections in order: reasoning, tool calls, the answer, the footer. Because every turn in a thread then shares one column and one header, read aloud, and a turn that failed or stopped shows its word in the same place.
   - Correct: `<AgentTurn name="Refund agent" state="done"><Response>{answer}</Response></AgentTurn>`
   - Wrong: `<div className="shell"><div className="panel p-3">{answer}</div></div>`
2. message-no-card NEVER Put an agent turn in a card or a bubble; it is plain flow at the full width. Because the person's bubble is the only box in a thread, so a boxed answer reads as a second speaker and doubles every edge.
   - Correct: `<AgentTurn name="Refund agent"><Response>{answer}</Response></AgentTurn>`
   - Wrong: `<Message from="agent"><MessageBubble>{answer}</MessageBubble></Message>`
3. message-failed-send MUST Keep a message that did not send in the thread with MessageBubble status="fail" and MessageSendState state="failed" with onRetry. Because dropping it loses what the person wrote; the coral edge and "Not sent" say what happened and Retry sends the same text.
   - Correct: `<MessageBubble status="fail">...</MessageBubble><MessageSendState state="failed" onRetry={retry}/>`
   - Wrong: `setMessages(m => m.filter(x => x.id !== failed.id))`
4. message-footer-ghost MUST Make the footer's actions ghost icon-sm Buttons or CopyButton, each with an aria-label. Because they show on hover and focus over a quiet line, and a glass key there would claim to be the turn's next step.
   - Correct: `<MessageFooter><CopyButton value={answer} label="answer" size="icon-sm"/></MessageFooter>`
   - Wrong: `<MessageFooter><Button>Copy</Button></MessageFooter>`
5. message-model SHOULD Name the model that answered with MessageModel, and pass requested when a fallback answered. Because a turn answered by another model than the one picked should say so, and the footer is where a person looks.
6. message-divider-reason SHOULD Mark compaction, interruption, a new day and a handoff with MessageDivider reason, not a rule of your own. Because reason sets the words, the glyph and the form, and a handoff to a person is the one centred line a thread has.
   - Correct: `<MessageDivider reason="interrupted"/>`
   - Wrong: `<hr/><p>Interrupted</p>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Message from` | `'agent' \| 'user'` | `'agent'` | user puts the content at the end as a bubble. |
| `Message size` | `'default' \| 'sm'` | `'default'` | 14 or 13px text. |
| `AgentTurn name, time, state` | `string, ReactNode, 'live' \| 'waiting' \| 'fail' \| 'stopped' \| 'done'` | `state 'done'` | The header is read aloud; drawn only for fail and stopped. live and waiting hide the footer. |
| `MessageBubble variant, status` | `'default' \| 'outline', 'fail'` | `'default'` | outline for a quoted draft; fail turns the edge coral. |
| `MessageBubbleContent render` | `ReactElement` |  | A button or link that reopens the draft. |
| `MessageSendState state, onRetry` | `'sending' \| 'sent' \| 'failed', () => void` |  | sent renders nothing. |
| `MessageFooter, MessageWorked, MessageModel, MessageMeta` | `parts` |  | The footer line: worked for, actions, the model, a summary. |
| `MessageDivider reason, to` | `'compaction' \| 'interrupted' \| 'handoff' \| 'day', 'person' \| 'agent'` | `to 'person'` | Children replace the default words. |
Other props pass through to the root element.

## Variants and states
- from: user, agent
- bubble: default, outline
- divider: compaction, interrupted, day, handoff
- states: sent, sending, not sent, agent done, footer in focus, agent failed, agent stopped

## Accessibility
- [ ] Each turn has a header with the speaker and time, read aloud even where it is not drawn.
- [ ] A failed or stopped agent turn says so in a word; the footer hides while the turn is live.
- [ ] Footer buttons show on hover where there is a pointer, always on touch, and on keyboard focus.
- [ ] A divider is role="separator" named by its words.

## Edge cases
- Long word or URL in a bubble -> Breaks anywhere; the bubble never passes 85% of the row.
- A message that did not send -> Keeps its text, the edge turns coral, "Not sent" and Retry sit under it.
- Fallback model -> MessageModel reads "glaze-small for glaze-large".
- Right to left -> The person's bubble sits at the start of the row instead of the end.
- Dark theme -> The bubble takes the dark shell, a step under the panel.

## Tokens
--shell, --paper, --line-faint, --line-control, --line, --fail, --radius-overlay, --type-body, --type-caption, --text-1, --text-2, --measure

## Related
- [Conversation](/systems/glaze/components/conversation.md): Holds a thread that follows new replies.
- [Response](/systems/glaze/components/response.md): Renders an answer as it streams.
- [Tool call](/systems/glaze/components/tool-call.md): Shows one tool an agent called.
