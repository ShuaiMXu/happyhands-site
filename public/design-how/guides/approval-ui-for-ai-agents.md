# Approval UI for AI agents that people read

> An approval UI for an AI agent asks inside the turn, says what the call will do and ends a refusal as denied. The rules and block Quartz ships for it.

By design.how, 2026-10-19. HTML: https://design.how/guides/approval-ui-for-ai-agents

An approval UI for an AI agent asks one question at the moment the agent needs an answer, inside the agent's turn, with what the call will do written out and two choices, Allow and Deny. Quartz's tool approval block does this for an agent about to send a refund, and the rules under it decide whether people read the card or click through it.

## Put the approval inside the agent's turn

The approval belongs in the same place as the call it answers. In Quartz the waiting call is a tool call row like every other, and the ask card opens from it. The person sees what the agent did before this step, what it wants to do now and the answer it has written so far, all in one column. The tool approval block is exactly that screen: the agent asks before it sends a refund, Allow and Deny sit on the card, and the outcome takes focus after a choice.

Keep approvals out of modal dialogs for this reason. A modal covers the turn that explains why the agent is asking, so the person decides with less information than the screen already had. The card in the thread costs nothing and keeps the evidence on screen.

Don't wrap the agent's turn in a frame or a bubble to make the card stand out, either. The Quartz message docs ban it, because a frame around the whole turn nests the approval card in a second box.

Rule `message-no-agent-bubble` (never) from the Quartz docs (https://design.how/systems/quartz/components/message). Never put the agent's turn in a bubble or a frame. It is flow: sections and a footer, with no name line or avatar. Because a bubble squeezes code blocks and tool rows, and a frame around a whole turn nests the approval card and the code wells in a second box.

Incorrect:

```tsx
<MessageBubble><Response>{answer}</Response></MessageBubble>
```

Correct:

```tsx
<MessageContent><MessageHeader>...</MessageHeader><Response>{answer}</Response></MessageContent>
```

## Write what the call does on the approval card

The card shows its detail in full under the question and the cost, and the person decides on those. So the most important line in an approval UI is the one the agent's developer writes: `permission.message`. A call with no message asks "Allow?" with nothing to weigh. A card with a hand-made Allow button and no `onReply` has no way to answer at all.

Rule `tool-call-approval-card` (must) from the Quartz docs (https://design.how/systems/quartz/components/tool-call). Pass onReply to a waiting call, and put what the call does in permission.message. Because the ask card shows the detail in full under the question and the cost, and the person decides on those; a call with no message asks the question with nothing to weigh, and with no onReply the card has no way to answer.

Incorrect:

```tsx
<ToolCall call={waiting} actions={<Button>Allow</Button>}/>
```

Correct:

```tsx
<ToolCall call={waiting} onReply={reply => dispatch({type: 'reply', seq, id, reply})}/>
```

What goes in the message is the action in plain words and its object. "Refund the order to the original payment method" is a decision a person can make. "Run refund tool" is a question about plumbing. The component renders whatever the call passes, so the quality of the approval is decided at the call site.

## Keep the header honest while the turn waits

An agent's turn has one status, and it lives in the message header as `MessageStatus`. The running tool row is the live state. When the turn stops to wait for an approval, a word like Working in the header goes stale on the spot, and the screen says two different things about the same moment.

Rule `message-no-header-word` (never) from the Quartz docs (https://design.how/systems/quartz/components/message). Never put a Working or Paused word, a badge or the model in the agent header. The running tool row is the live state; the model goes in the footer. Because a word in the header and the arc in a row say the same thing twice, and the header word goes stale the moment the turn waits on an approval.

Incorrect:

```tsx
<MessageHeader>support-agent<Badge kind="agent"/><Status status="running">Working</Status></MessageHeader>
```

Correct:

```tsx
<MessageHeader>support-agent<MessageStatus state="live"/></MessageHeader>
```

That sounds minor, yet a person looking for why the agent stopped then finds two answers, a header that says working and a row that says waiting, and has to guess which one is current.

## Never hide a call that waits for permission

Long turns get noisy, so the natural move is to show only what is running. That filter is the worst bug an approval UI can ship, because a call waiting for permission is not running. It vanishes, the agent stalls on an approval nobody can see, and the person thinks the agent froze.

Rule `tool-call-show-trouble` (must) from the Quartz docs (https://design.how/systems/quartz/components/tool-call). Hide finished calls with ToolCallList hideCompleted, not a filter of your own. Because a hand filter for running drops failed and awaiting-permission rows, so the run stalls on an approval no one sees.

Incorrect:

```tsx
calls.filter(c => c.status === 'running')
```

Correct:

```tsx
<ToolCallList calls={calls} hideCompleted/>
```

`ToolCallList` with `hideCompleted` hides only the calls that finished well. Failed rows and waiting rows stay in view, which is the whole point of the list.

## What happens when the person says no?

The call ends as denied, with the person's feedback as the reason. It never becomes an error. Marked as an error, the row opens on a failure message and counts as a failed call in the turn's line, which blames the agent, or worse the person, for a choice that was theirs to make.

Rule `tool-call-denied-not-error` (must) from the Quartz docs (https://design.how/systems/quartz/components/tool-call). Use status: 'denied' with the person's feedback as reason for a refused call; never status: 'error'. Because a refusal is the person's choice; as an error it opens on a failure message and counts as a failed call in the turn's line.

Incorrect:

```tsx
<ToolCall call={{...c, status: 'error', error: 'Denied by user'}}/>
```

Correct:

```tsx
<ToolCall call={{...c, status: 'denied', reason}}/>
```

After either answer the outcome takes focus, so a keyboard or screen reader user lands on what their choice did instead of on a card that no longer asks anything. That is also why the card should never be the only record of the answer. Once it closes, the denied row and its reason are what the person can still read back.

## Wire the answer back through the reducer

The block is one registry item. It brings the tool call, message and response components it is built from, and the Quartz theme.

```sh
npx shadcn@latest add https://design.how/r/quartz/tool-approval.json
```

The part the block can't write is the call site in your own app. This module is the smallest working version of it, and it compiles against the installed component as written. The waiting call carries its `permission.message`, and the answer goes back through `useToolCalls` like every other event, with a newer seq than the call's own, so a late event from the stream can't undo what the person chose.

```tsx
'use client';

import {ToolCallList, useToolCalls, type ToolCallData, type ToolReply} from '@/components/quartz/ai/tool-call';

const refund: ToolCallData = {
  id: 'call_1',
  tool: 'refund.create',
  status: 'awaiting-permission',
  input: {order: 'ord_1042', amount: 4200},
  permission: {patterns: ['refund.create'], message: 'Refund order ord_1042 to the original payment method.'},
  seq: 3,
};

export function RefundApproval() {
  const [state, dispatch] = useToolCalls([refund]);
  const answer = (call: ToolCallData, reply: ToolReply) => dispatch({type: 'reply', seq: call.seq + 1, id: call.id, reply});
  return <ToolCallList calls={state.calls} onReply={answer} />;
}
```

Two details in it matter more than they look. The message names the action and the order, which is the thing the person weighs before they press anything. And `onReply` is the only way the card can answer, so a version without it shows a question nobody can close.

Swap the sample refund for your own call and keep the shape: a waiting tool call, a message that names the action, `onReply` wired to your reducer. For the whole turn around it, the [Quartz system page](/systems/quartz) shows the agent session block, and the [tool call docs](/systems/quartz/components/tool-call) hold the rest of the rules a waiting call follows.

An approval card people read is one that tells them exactly what will happen and then gets out of the way. Write the message first, and treat the rest as wiring the block already did.

## Questions

### Should an agent ask for approval in a modal dialog?

Keep it in the turn. The tool approval block puts Allow and Deny on a card in the thread, next to the call they answer, and moves focus to the outcome after a choice.

### What should the approval card say?

What the call will do, passed as permission.message. The card shows that detail in full under the question and the cost, so it is the line people decide on.

### Is a denied tool call an error?

No. It ends with status denied and the person's feedback as the reason, so it never counts as a failed call in the turn.
