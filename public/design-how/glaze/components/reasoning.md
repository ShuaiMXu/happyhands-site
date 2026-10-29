---
name: Reasoning
system: glaze
kind: component
import: "import {Reasoning, ReasoningTrigger, ReasoningContent, reasoningHeading} from '@/components/glaze/ai/reasoning'"
install: "npx shadcn@latest add https://design.how/r/glaze/reasoning.json"
registryDependencies: [activity, conversation, response, status, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/reasoning
---

# Reasoning

Shows what the model thought before answering.

## Use when
- A model streams its reasoning before the answer and the person may want to read it.
- A turn should keep the answer on screen and the thinking one line away.

## Don't use when
- The steps are tool calls with results. Use [Tool call](/systems/glaze/components/tool-call.md).
- A plain section anyone can open, not tied to a stream. Use [Collapsible](/systems/glaze/components/collapsible.md).

## Minimal example
```tsx
<Reasoning streaming={phase === 'reasoning'} duration={seconds}>{reasoningParts}</Reasoning>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. reasoning-auto-open MUST Drive it with streaming, not open: it opens while the reasoning streams and folds when it ends. Because controlled open turns off the automatic fold and the person's pin, so the thinking stays over the answer or never shows.
   - Correct: `<Reasoning streaming={streaming} duration={seconds}>{text}</Reasoning>`
   - Wrong: `<Reasoning open={streaming}>{text}</Reasoning>`
2. reasoning-duration-seconds MUST Pass duration in seconds once the reasoning ends. Because the folded line reads "Thought for 12s"; milliseconds read as hours and no duration reads "a moment".
   - Correct: `<Reasoning duration={(endedAt - startedAt) / 1000}/>`
   - Wrong: `<Reasoning duration={endedAt - startedAt}/>`
3. reasoning-parts SHOULD Pass summary parts as an array of strings; the label follows the first heading of the newest part. Because a joined string labels the trigger with the first heading of the whole text, which goes stale as new parts arrive.
4. reasoning-not-answer NEVER Put the answer inside Reasoning; it sits above Response in the turn. Because the fold hides its body when the reasoning ends, so an answer inside it disappears.
   - Correct:
     ```tsx
     <Reasoning streaming={false} duration={12}>{thinking}</Reasoning>
     <Response>{answer}</Response>
     ```
   - Wrong: `<Reasoning>{thinking + answer}</Reasoning>`
5. reasoning-flat-row NEVER Restyle the trigger as a button with a fill or glass; it is a flat row like a folded tool group. Because it shows text, it does not act, and the turn's rows share one column and one look.
   - Correct: `<Reasoning streaming>{parts}</Reasoning>`
   - Wrong: `<ReasoningTrigger className="glass glass-paper"/>`
6. reasoning-empty SHOULD Keep Reasoning in the turn when a run stops before any reasoning arrives. Because its line then reads "Stopped before thinking", which says why there is no answer.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `children` | `string \| string[] \| ReactNode` |  | The reasoning, or its parts; compose ReasoningTrigger and ReasoningContent for your own. |
| `streaming` | `boolean` | `false` | Opens while true; folds when it ends unless pinned. |
| `duration` | `number` |  | Seconds, for "Thought for 12s". |
| `heading` | `string` | `from the text` | Overrides the heading taken from the newest part. |
| `defaultOpen, open, onOpenChange` | `boolean, boolean, (open) => void` | `false` | Controlled open turns off the automatic open and fold. |
| `labels` | `{thinking, stoppedEarly, thoughtFor, moment}` | `English` | The trigger's words. |
Other props pass through to the root element.

## Variants and states
- states: thinking, thinking with heading, folded, open, stopped early, hover, focus-visible
- when states meet, the first wins: focus-visible > hover > thinking > open > folded

## Accessibility
- [ ] The trigger is a button with aria-expanded; the arc beside it is aria-hidden and the label says Thinking.
- [ ] The body is marked aria-busy while it streams and takes a tab stop only when it scrolls.
- [ ] Focus is the inset ink ring on the row.

## Keyboard
- `Enter, Space`: Opens or folds the reasoning; opening after the fold pins it.

## Edge cases
- Person closes it while streaming -> It stays closed until the next stream.
- Person reopens it after the fold -> It opens from the top and stays open.
- Long reasoning -> The pane is 160px tall at most and follows new text until the person scrolls up.
- 59.6 seconds -> Reads "1m 00s", never "60s".
- Reduced motion -> The arc stands still and the caret jumps.

## Tokens
--hover, --pressed, --radius-tag, --control, --type-body-sm, --text-1, --text-2, --text-3, --focus, --dur-state, --dur-spin

## Related
- [Tool call](/systems/glaze/components/tool-call.md): Shows one tool an agent called.
- [Activity](/systems/glaze/components/activity.md): Says what the agent is doing now.
- [Collapsible](/systems/glaze/components/collapsible.md): Shows and hides a region.
