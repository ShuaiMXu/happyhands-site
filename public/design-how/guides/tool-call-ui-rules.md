# How to design a tool call UI people can scan

> Tool call UI rules from Quartz, each with the code an agent gets wrong: a seq on every event, explicit status, and a denied call that is not an error.

By design.how, 2026-10-19. HTML: https://design.how/guides/tool-call-ui-rules

Design a tool call UI as a checklist the person can scan. Each call is one row with the tool's name, its arguments, a status and how long it took, folded away once it finishes and opened only when something needs a look. Quartz ships that row as the tool call component, and its docs carry the rules below, each with the code an agent writes by default and the fix.

## Design the tool call UI as a checklist

A tool call is a step of a checklist that opens onto what came back. That is how the Quartz docs describe the component, and it is the right model, because the person watching an agent wants two answers. What is it doing now, and did anything go wrong? A log answers neither at a glance. A checklist answers both, if every row looks the same until it has a reason to look different.

So the row carries the call's name, arguments, status, duration and output, and nothing else. The output stays closed until someone opens it. The duration sits at the end of the line, and the state sits in the glyph cell at the start. A status word appears only when the call failed, stopped or was denied, because a word on every row is a column of noise, and the word is what survives grayscale and forced colors when the red is gone.

Quartz writes a rule against one shortcut in particular, printing the input as JSON and calling it a tool call.

Rule `tool-call-no-raw-json` (never) from the Quartz docs (https://design.how/systems/quartz/components/tool-call). Never dump the input JSON as the body of a tool call. Because the registry renders the command, patch or capped output, and raw JSON shows escaped quotes with no cap.

Incorrect:

```tsx
<pre>{JSON.stringify(call.input)}</pre>
```

Correct:

```tsx
<ToolCall call={call}/>
```

Raw JSON shows escaped quotes and has no cap. The registry already renders the command, the patch or the capped output for the tools it knows, so hand it the call and let it pick.

## Give every event a seq

Tool calls arrive as a stream of events, and streams arrive out of order. A late running event can land after the completed one. With a plain state update, that late event wins and a finished call starts spinning again. People notice this, and they stop trusting every other row on the screen.

Quartz fixes it in the reducer. Every event carries a per-call seq and every event goes through `toolCallsReducer`, so a late event can't overwrite a call that already finished.

Rule `tool-call-seq` (must) from the Quartz docs (https://design.how/systems/quartz/components/tool-call). Give every event a per-call seq and dispatch all of them through toolCallsReducer. Because a plain setState applies a duplicate or late running event over completed, so a finished call spins again.

Incorrect:

```tsx
setCalls(cs => cs.map(c => c.id === e.id ? {...c, status: e.status} : c))
```

Correct:

```tsx
dispatch({type: 'result', seq: e.seq, id: e.id, status: 'completed', output})
```

The second half of the same contract is easy to miss. When a tool ends, send the status explicitly. The reducer reads a result with no status as an error, so a call that worked shows Failed. This is the right default. A missing status is a bug in the caller, and a bug should look like trouble on the screen instead of passing as success.

Rule `tool-call-explicit-status` (must) from the Quartz docs (https://design.how/systems/quartz/components/tool-call). Send status: 'completed' or 'error' explicitly when a tool ends. Because the reducer reads a result with no status as an error, so a call that worked shows Failed.

Incorrect:

```tsx
dispatch({type: 'result', seq, id, output})
```

Correct:

```tsx
dispatch({type: 'result', seq, id, status: 'completed', output})
```

## Fold finished calls and keep the trouble in view

A long agent turn can make dozens of calls. Showing every one of them buries the answer the person came for. Quartz's answer is `ToolCallList`, which folds finished calls into one line and keeps the newest visible. Stacking `ToolCall` rows in a plain div throws that away.

Rule `tool-call-no-standalone-stack` (never) from the Quartz docs (https://design.how/systems/quartz/components/tool-call). Never stack ToolCalls in a div. Put them in a ToolCallList. Because the list folds finished calls into one line and keeps the newest visible; a hand-made stack shows every row of a long turn.

Incorrect:

```tsx
<div>{calls.map(c => <ToolCall key={c.id} call={c}/>)}</div>
```

Correct:

```tsx
<ToolCallList calls={calls}/>
```

The tempting shortcut is to filter the list down to running calls. It looks tidy and it breaks the run. A hand filter for running drops the failed rows and the rows waiting for permission, so the agent sits on an approval no one can see. Use `hideCompleted` on the list, which hides only what finished well.

Rule `tool-call-show-trouble` (must) from the Quartz docs (https://design.how/systems/quartz/components/tool-call). Hide finished calls with ToolCallList hideCompleted, not a filter of your own. Because a hand filter for running drops failed and awaiting-permission rows, so the run stalls on an approval no one sees.

Incorrect:

```tsx
calls.filter(c => c.status === 'running')
```

Correct:

```tsx
<ToolCallList calls={calls} hideCompleted/>
```

Wired up, the list takes the reducer's calls and the reply handler and nothing else. This module compiles against the installed component as written:

```tsx
'use client';

import {ToolCallList, useToolCalls, type ToolCallData, type ToolReply} from '@/components/quartz/ai/tool-call';

export function TurnTools({initial, onAnswer}: {initial: ToolCallData[]; onAnswer: (call: ToolCallData, reply: ToolReply) => void}) {
  const [state] = useToolCalls(initial);
  return <ToolCallList calls={state.calls} hideCompleted onReply={onAnswer} />;
}
```

## Why is a denied call not an error?

Because the person chose it. When someone refuses a call, the call ends with status `denied` and their feedback as the reason. Marked as an error, the row opens on a failure message and counts as a failed call in the turn's summary line, which tells the person they broke something when they made a decision.

Rule `tool-call-denied-not-error` (must) from the Quartz docs (https://design.how/systems/quartz/components/tool-call). Use status: 'denied' with the person's feedback as reason for a refused call; never status: 'error'. Because a refusal is the person's choice; as an error it opens on a failure message and counts as a failed call in the turn's line.

Incorrect:

```tsx
<ToolCall call={{...c, status: 'error', error: 'Denied by user'}}/>
```

Correct:

```tsx
<ToolCall call={{...c, status: 'denied', reason}}/>
```

A call that waits for permission needs two things from the code around it. Put what the call does in `permission.message`, and pass `onReply` so the card can answer. Without the message, the person is asked a question with nothing to weigh. Without `onReply`, the card has no way to answer at all.

## Stop before the cancel returns

Stop is the button people press when the agent is doing something they don't want. The UI has to agree with them at once. Dispatch the stop before the network cancel returns, and open the next turn with a newer gen. If you await the cancel first, events that arrive in the meantime keep rows running after the person pressed Stop. If you reuse the stopped gen, the next turn is dropped.

Rule `tool-call-stop` (must) from the Quartz docs (https://design.how/systems/quartz/components/tool-call). Dispatch {type: 'stop', gen} before the network cancel returns, and open the next turn with a newer gen. Because events that arrive while the cancel is awaited keep rows running, and reusing the stopped gen drops the next turn.

Incorrect:

```tsx
await api.cancel(run); setStopped(true)
```

Correct:

```tsx
dispatch({type: 'stop', gen}); api.cancel(run)
```

## Name each tool once

Labels drift when every call site writes its own. One place says Refunding, another says Processing refund, and the list reads as if two different tools ran. Register each product tool once at module scope with `registerTool`, and give it three verbs: an active one ending in -ing, a done one in the past tense and an ask one in the imperative. Keep each to one or two words and put the object in the detail.

Rule `tool-call-verbs` (should) from the Quartz docs (https://design.how/systems/quartz/components/tool-call). Write active as an -ing verb, done in past tense and ask in the imperative, one or two words, with the object in detail.

Incorrect:

```tsx
active: 'Tool is now looking up the order'
```

Correct:

```tsx
active: 'Looking up', done: 'Looked up', ask: 'Look up', detail: input => input.orderId
```

## Let the component carry the rules

The component is one registry item. The command below adds it with what it depends on, including the Quartz theme.

```sh
npx shadcn@latest add https://design.how/r/quartz/tool-call.json
```

Then point your coding agent at the [tool call docs](/systems/quartz/components/tool-call) before it writes the first row. The theme also writes the Quartz skill to `.claude/skills/quartz/SKILL.md` and `.agents/skills/quartz/SKILL.md`, so the agent reads these rules on every change instead of rediscovering them from a stack trace. If the screen is a whole agent turn, start from the [Quartz system page](/systems/quartz) and its agent session block, which puts the tool calls under one live header with the answer and the composer.

A tool call UI earns trust by being boring, with identical rows and trouble that refuses to hide. Most of these rules live in the component's reducer and its list, where an agent can't forget them, so a hand-written row is the riskier place to start.

## Questions

### Should tool calls be collapsed by default?

Yes, once they finish. ToolCallList folds finished calls into one line and keeps the newest visible, and hideCompleted hides them without dropping failed or waiting rows.

### What should a tool call show while it waits for permission?

What the call will do, in permission.message, and a way to answer through onReply. Without the message the person is asked a question with nothing to weigh.

### Can I show the tool input as JSON?

Not as the body of the call. The registry renders the command, patch or capped output, and raw JSON shows escaped quotes with no cap.
