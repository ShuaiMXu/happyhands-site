---
name: Tool call
system: glaze
kind: component
import: "import {ToolCall, ToolCallGroup, ToolCallList, CappedOutput, DiffCount, toolCallsReducer, useToolCalls, groupToolCalls, registerTool, resolveTool, summarizeToolCalls, toolActivity, toolLabel, formatDuration, cleanOutput, isTerminal} from '@/components/glaze/ai/tool-call'
import {RequestTicker, RequestSummary, ShowMoreRow, summarizeRequests, codeClass} from '@/components/glaze/ai/request-ticker'"
install: "npx shadcn@latest add https://design.how/r/glaze/tool-call.json"
registryDependencies: [activity, badge, button, card, status, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/tool-call
---

# Tool call

Shows one tool an agent called.

## Use when
- An agent calls a tool and the person should see what it asked for and what came back.
- A call is paused for the person's permission, or was refused.

## Don't use when
- A long shell session the person reads in full. Use [Code block](/systems/glaze/components/code-block.md).
- One live phrase for the whole turn. Use [Activity](/systems/glaze/components/activity.md).

## Minimal example
```tsx
const [state, dispatch] = useToolCalls();
dispatch({type: 'result', seq: 40, id, status: 'completed', output});
<ToolCallList calls={state.calls} onReply={(call, reply) => dispatch({type: 'reply', seq, id: call.id, reply})}/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. tool-call-seq MUST Give every event a per-call seq and dispatch all of them through toolCallsReducer (useToolCalls). Because a plain setState applies a duplicate or late running event over completed, so a finished call spins again.
   - Correct: `dispatch({type: 'result', seq: e.seq, id: e.id, status: 'completed', output})`
   - Wrong: `setCalls(cs => cs.map(c => c.id === e.id ? {...c, status: e.status} : c))`
2. tool-call-explicit-status MUST Send status: 'completed' or 'error' explicitly when a tool ends. Because the reducer reads a result with no status as an error, so a call that worked shows Failed.
   - Correct: `dispatch({type: 'result', seq, id, status: 'completed', output})`
   - Wrong: `dispatch({type: 'result', seq, id, output})`
3. tool-call-stop MUST Dispatch {type: 'stop', gen} before the network cancel returns, and open the next turn with a newer gen. Because events that arrive while the cancel is awaited keep rows running, and reusing the stopped gen drops the next turn.
   - Correct: `dispatch({type: 'stop', gen}); api.cancel(run)`
   - Wrong: `await api.cancel(run); setStopped(true)`
4. tool-call-approval MUST Pass onReply to a waiting call and put what allowing does in permission.message. Because the card shows the question, that sentence and the detail in full with a flat Deny and the one green Allow; with no message the person decides blind.
   - Correct: `<ToolCall call={waiting} onReply={reply => dispatch({type: 'reply', seq, id, reply})}/>`
   - Wrong: `<ToolCall call={waiting} actions={<><Button>Deny</Button><Button>Allow</Button></>}/>`
5. tool-call-allow-green NEVER Make Deny a primary or Allow ink in custom actions; Deny is variant="secondary" and Allow variant="confirm". Because green glass is Glaze's yes to something proposed, and two glass keys in one footer split the eye.
   - Correct:
     ```tsx
     <Button size="sm" variant="secondary">Deny</Button>
     <Button size="sm" variant="confirm">Allow</Button>
     ```
   - Wrong:
     ```tsx
     <Button size="sm" variant="destructive">Deny</Button>
     <Button size="sm">Allow</Button>
     ```
6. tool-call-denied-not-error MUST Use status: 'denied' with the person's feedback as reason for a refused call; never status: 'error'. Because a refusal is the person's choice; as an error it opens on a failure message and counts as failed in the turn's line.
   - Correct: `<ToolCall call={{...c, status: 'denied', reason}}/>`
   - Wrong: `<ToolCall call={{...c, status: 'error', error: 'Denied by user'}}/>`
7. tool-call-list NEVER Stack ToolCalls in a div; put a turn's calls in a ToolCallList, with hideCompleted to hide finished ones. Because the list folds finished calls into one line and keeps running, waiting and failed rows in view; a hand filter drops the approval nobody then sees.
   - Correct: `<ToolCallList calls={calls} hideCompleted/>`
   - Wrong: `<div>{calls.filter(c => c.status === 'running').map(c => <ToolCall key={c.id} call={c}/>)}</div>`
8. tool-call-register SHOULD Call registerTool(name, renderer, aliases) once at module scope for a product tool, with -ing, past and imperative verbs. Because every row, card question and turn summary reads its words from the registry; a label per call site drifts.
   - Correct:
     ```tsx
     registerTool('refund', {active: 'Refunding', done: 'Refunded', ask: 'Refund', noun: 'refund', lines: 8, summary})
     ```
   - Wrong: `<ToolCall call={c} label="Refunding"/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `call` | `ToolCallData` | `required` | id, tool, status, input, metadata, output, error, permission, reason, startedAt, endedAt, seq. |
| `size` | `'default' \| 'sm'` | `'default'` | 32 or 28px line. |
| `onReply` | `(reply: 'once' \| 'reject') => void` |  | Shows Deny and Allow on a waiting call's card. |
| `actions` | `ReactNode` |  | Your own footer actions on the card; onReply wins. |
| `label, doneLabel, detail, detailMono` | `string, string, string, boolean` | `from the registry` | Overrides for one row. |
| `duration` | `number` |  | Milliseconds, when the data has no times. |
| `children` | `ReactNode` |  | A custom body in the well. |
| `ToolCallList calls, live, hideCompleted, orphanTtl, onReply, actions` | `list props` | `live: any call not ended` | Folds a done turn into "Worked for 14s" and the earlier calls of a live one into one line. |
| `useToolCalls(initial)` | `[state, dispatch]` |  | Events: call, input, start, progress, ask, reply, result, stop, turn, reset. |
| `registerTool(name, renderer, aliases)` | `function` |  | Built in: shell, edit, read, glob, grep, list, webfetch, http (RequestTicker), websearch, task. |
| `labels` | `ToolCallLabels` | `English` | Status words, the cap, the folded line, Allow and Deny. |
Other props pass through to the root element.

## Variants and states
- size: default, sm
- tool: shell, edit, http, any other tool
- list: live, done
- states: pending, running, completed, failed, awaiting permission, denied, stopped, orphan, hover, focus-visible, open

## Accessibility
- [ ] A row that opens is a button with aria-expanded, named by its verb, detail, status word and time.
- [ ] Every status has a word, read aloud when not shown; the glyph is aria-hidden; pending and running set aria-busy.
- [ ] The approval card is a group named by its question; Deny comes before Allow in the tab order.
- [ ] When Allow and Deny go, the row takes focus.
- [ ] A result before its call waits 2s, then shows as "Orphaned result", never Done.

## Keyboard
- `Enter, Space`: Opens or closes the row's body; on the card, presses Deny or Allow.

## Edge cases
- Long path or command -> The detail truncates first on a wide screen and wraps on a phone; the card shows it in full.
- No body -> A plain row: no caret and no wash, the glyph cell kept.
- Long output -> Shell shows 24 lines, others 8, and 20,000 characters in all, with the cut said.
- ANSI colours or a progress bar -> Escapes are stripped and a carriage return keeps the last frame.
- Duplicate or late events -> Dropped and counted; a stale stop never cancels the next turn.
- Failed call -> Opens on its message at once.

## Tokens
--hover, --pressed, --field, --radius-tag, --radius-overlay, --control, --menu-row-sm, --type-body-sm, --type-code-sm, --text-1, --text-2, --text-3, --fail-text, --glass-green-base, --shell, --paper

## Related
- [Activity](/systems/glaze/components/activity.md): Says what the agent is doing now.
- [Reasoning](/systems/glaze/components/reasoning.md): Shows what the model thought before answering.
- [Code block](/systems/glaze/components/code-block.md): Shows code or commands to copy.
