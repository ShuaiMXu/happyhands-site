---
name: Tool call
system: sodium
kind: component
import: "import {ToolCall, ToolCallList, toolCallsReducer, useToolCalls, registerTool, resolveTool, isTerminal, cleanOutput} from '@/components/sodium/ai/tool-call'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/tool-call.json"
registryDependencies: [button, theme, tool-call-row, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/tool-call
---

# Tool call

Shows one tool an agent called in a run.

## Use when
- An agent calls tools inside a run and the person should see what each asked for and what came back.
- A call is paused for the person's approval, or was refused or stopped.

## Don't use when
- Steps you draw yourself, with no events behind them. Use [Tool-call row](/systems/sodium/components/tool-call-row.md).
- One live line for the whole run. Use [Activity](/systems/sodium/components/activity.md).

## Minimal example
```tsx
const [state, dispatch] = useToolCalls();
dispatch({type: 'result', seq: 40, id, status: 'completed', output});
<ToolCallList calls={state.calls} onReply={(call, reply) => dispatch({type: 'reply', seq, id: call.id, reply})}/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. tool-call-seq MUST Give every event a per-call seq and dispatch all of them through toolCallsReducer (useToolCalls). Because a plain setState applies a late running event over completed, so a finished call runs again.
   - Correct: `dispatch({type: 'result', seq: e.seq, id: e.id, status: 'completed', output})`
   - Wrong: `setCalls(cs => cs.map(c => c.id === e.id ? {...c, status: e.status} : c))`
2. tool-call-explicit-status MUST Send status: 'completed' or 'error' explicitly when a tool ends. Because the reducer reads a result with no status as an error, so a call that worked shows Failed.
   - Correct: `dispatch({type: 'result', seq, id, status: 'completed', output})`
   - Wrong: `dispatch({type: 'result', seq, id, output})`
3. tool-call-stop MUST Dispatch {type: 'stop', gen} before the network cancel returns, and open the next turn with a newer gen. Because events that arrive while the cancel is awaited keep rows running, and reusing the stopped gen drops the next turn.
   - Correct: `dispatch({type: 'stop', gen}); api.cancel(run)`
   - Wrong: `await api.cancel(run); setStopped(true)`
4. tool-call-approval MUST Pass onReply for a waiting call and put what allowing does in permission.message. Because the row then shows the question, that sentence and the exact patterns over Deny and the one Allow; without the sentence the person decides blind.
   - Correct: `<ToolCall call={waiting} onReply={reply => dispatch({type: 'reply', seq, id, reply})}/>`
   - Wrong: `<ToolCall call={waiting} actions={<><Button>Deny</Button><Button>Allow</Button></>}/>`
5. tool-call-allow-primary NEVER Make Deny a primary or a destructive in custom actions; Deny is variant="secondary" and Allow the primary. Because saying no loses nothing, and two slabs in one approval split the eye.
   - Correct:
     ```tsx
     <Button size="sm" variant="secondary">Deny</Button>
     <Button size="sm">Allow</Button>
     ```
   - Wrong:
     ```tsx
     <Button size="sm" variant="destructive">Deny</Button>
     <Button size="sm">Allow</Button>
     ```
6. tool-call-denied-not-error MUST Use status: 'denied' with the person's words as reason for a refused call; never status: 'error'. Because a refusal is the person's choice, and as an error it turns the row red and reads as a failed run.
   - Correct: `<ToolCall call={{...c, status: 'denied', reason}}/>`
   - Wrong: `<ToolCall call={{...c, status: 'error', error: 'Denied by user'}}/>`
7. tool-call-list MUST Put a run's calls in a ToolCallList, with hideCompleted to hide finished ones. Because the list is one stack with connectors, keeps waiting and failed calls in view and holds back an orphaned result.
   - Correct: `<ToolCallList calls={calls} hideCompleted/>`
   - Wrong: `<div>{calls.filter(c => c.status === 'running').map(c => <ToolCall key={c.id} call={c}/>)}</div>`
8. tool-call-register SHOULD Call registerTool(name, words, aliases) once at module scope for a product tool, with its verb, -ing words and noun. Because every row, tab and approval reads its words from the registry, and a label per call site drifts.
   - Correct: `registerTool('backfill', {verb: 'Backfill table', active: 'Backfilling', noun: 'backfill', lines: 8})`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `call` | `ToolCallData` | `required` | id, tool, status, input, output, error, permission, reason, startedAt, endedAt, seq. |
| `onReply` | `(reply: 'once' \| 'reject') => void` |  | Shows Deny and Allow on a waiting call. |
| `actions` | `ReactNode` |  | Your own buttons on a waiting call; onReply wins. |
| `label, detail` | `string` | `from the registry` | Overrides for one row. |
| `children` | `ReactNode` |  | A custom body in place of the output. |
| `labels` | `ToolCallLabels` | `English` | Show all, Allow, Deny, the failed and denied words. |
| `ToolCallList calls, hideCompleted, orphanTtl, onReply, actions` | `list props` | `orphanTtl: 2000` | One stack for a run; plus the stack's size, connectors and clock. |
| `useToolCalls(initial)` | `[state, dispatch]` |  | Events: call, input, start, progress, ask, reply, result, stop, turn, reset. |
| `registerTool(name, words, aliases)` | `function` |  | Built in: query, read, write, shell, http, scale. |
Other props pass through to the row (ToolCallRow).

## Variants and states
- tool: query, shell, http, any other tool
- states: pending, running, completed, failed, awaiting permission, denied, stopped, orphaned

## Accessibility
- [ ] A call with a body has a button header with aria-expanded, named by its label, detail, state word and time.
- [ ] Every status has a word; the pending mark is aria-hidden and a running call sets aria-busy.
- [ ] The approval is a group named by its question; Deny comes before Allow in the tab order.
- [ ] A result before its call waits 2s, then shows as Orphaned result, never Done.

## Keyboard
- `Enter, Space`: Opens or closes the body; in an approval, presses Deny or Allow.

## Edge cases
- Failed or waiting call -> Opens on its error or its question the moment it arrives.
- Long output -> A shell shows 24 lines, others 8, then Show all; 20,000 characters at most, with the cut said.
- ANSI colours or a progress bar -> Escapes are stripped, and a carriage return keeps the last frame.
- Duplicate or late events -> Dropped and counted; a stale stop never cancels the next turn.
- Unknown tool -> Its name in sentence case is the label and its first useful argument the detail.

## Tokens
--row, --well, --line-faint, --fail, --fail-text, --fail-tint, --warn, --warn-text, --warn-tint, --selected, --text-1, --text-2, --text-3, --type-code-sm, --type-body-sm, --type-caption, --popup-max, --measure-hint

## Related
- [Tool-call row](/systems/sodium/components/tool-call-row.md): Draws a run's steps as ruled boxes, joined by connectors.
- [Activity](/systems/sodium/components/activity.md): Says what a run is doing now.
- [Message](/systems/sodium/components/message.md): Shows one turn of a run's thread.
