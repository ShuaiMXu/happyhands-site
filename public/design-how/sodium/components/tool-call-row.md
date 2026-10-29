---
name: Tool-call row
system: sodium
kind: component
import: "import {ToolCallStack, ToolCallRow, formatElapsed, stepWords} from '@/components/sodium/ai/tool-call-row'"
install: "npx shadcn@latest add https://design.how/r/sodium/tool-call-row.json"
registryDependencies: [icon, theme, use-draw, use-scramble, use-typing, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/tool-call-row
---

# Tool-call row

Draws a run's steps as ruled boxes, joined by connectors.

## Use when
- A run, a job or an agent works through steps and the person watches them land in order.
- One step failed or waits on the person, and it has to be found at a glance among the rest.

## Don't use when
- The steps are an agent's tool calls with events, output and approvals. Use [Tool call](/systems/sodium/components/tool-call.md).
- One live line for the whole run. Use [Activity](/systems/sodium/components/activity.md).

## Minimal example
```tsx
<ToolCallStack>
  <ToolCallRow label="Read source" detail="lake://events/2026-10-18" state="done" duration={1240}/>
  <ToolCallRow label="Write partitions" detail="wh_events.events_raw" state="running" tab="Writing partitions"/>
  <ToolCallRow label="Compact files" state="queued"/>
</ToolCallStack>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. tool-call-row-in-stack MUST Put the rows of one run in a ToolCallStack, in the order they ran. Because the stack draws the spine and the connectors, keeps the 20px a tab sits in, and makes the rows one list.
   - Correct: `<ToolCallStack>{steps.map(s => <ToolCallRow key={s.id} {...s}/>)}</ToolCallStack>`
   - Wrong: `<div className="flex flex-col gap-2">{steps.map(s => <ToolCallRow key={s.id} {...s}/>)}</div>`
2. tool-call-row-no-frame NEVER Put a ToolCallStack inside a frame or a panel; set it in message flow or on the page. Because each step is already a box, and Sodium never draws a box in a box.
   - Correct: `<ToolCallStack>{rows}</ToolCallStack>`
   - Wrong: `<section className="frame"><ToolCallStack>{rows}</ToolCallStack></section>`
3. tool-call-row-label MUST Write the label in sentence case as a verb and its object, with no brackets; put what it acted on in detail, as written. Because the row draws the brackets and the capitals, and a path or a table name in capitals is a different name.
   - Correct: `<ToolCallRow label="Read source" detail="lake://events/2026-10-18"/>`
   - Wrong: `<ToolCallRow label="[READ lake://events]"/>`
4. tool-call-row-one-running SHOULD Keep one step running at a time in a stack, and give it a tab that names the work ("Writing partitions"). Because the running tab is the place the eye goes, and two of them split it.
5. tool-call-row-failed-word MUST Say what failed in the failed tab ("Write failed") and the cause in the body; never leave the tab as just the colour. Because red alone reads only as "something", and a person scanning a run needs the step and the cause.
   - Correct: `<ToolCallRow label="Write partitions" state="failed" tab="Write failed">{cause}</ToolCallRow>`
   - Wrong: `<ToolCallRow label="Write partitions" state="failed" tab=""/>`
6. tool-call-row-waiting-orange NEVER Show a step waiting on a person in yellow; use state="waiting", which is orange with its word. Because yellow is the one action on the screen, so a yellow step reads as the thing to press.
   - Correct: `<ToolCallRow state="waiting" label="Scale workers"/>`
   - Wrong: `<ToolCallRow className="border-accent-edge" label="Scale workers"/>`
7. tool-call-row-clock SHOULD Pass clock to the stack for a still picture (a test, a screenshot, a replay you drive); leave it out for live motion. Because given a clock the connectors and tab words draw that one moment and run no frame loop.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `ToolCallStack connectors` | `boolean` | `true` | Draws the spine and the connectors, one hop at a time. |
| `ToolCallStack typing` | `boolean` | `true` | Types each label in once its connector lands. |
| `ToolCallStack size` | `'default' \| 'sm'` | `'default'` | 40 or 32px rows for every row in it. |
| `ToolCallStack clock, play` | `number, boolean` |  | Elapsed ms for a still picture; play holds the connectors until true. |
| `label` | `string` | `required` | A verb and its object in sentence case. |
| `detail` | `ReactNode` |  | What it acted on, as written. Truncates first. |
| `state` | `'queued' \| 'running' \| 'waiting' \| 'done' \| 'failed' \| 'stopped'` | `'done'` | Running, waiting and failed get a tab; the rest a word at the end. |
| `tab, word` | `string` | `the state's word` | The tab's words, or the end word. |
| `duration` | `number` |  | ms, shown as 420ms, 1.2s or 2m 04s. |
| `children` | `ReactNode` |  | A body; the header then opens and closes it. |
| `open, defaultOpen, onOpenChange` | `boolean, boolean, function` | `false` | The body, controlled or not. |
| `words` | `Partial<StepWords>` | `English` | The state words, for another language. |
Other props pass through to the li (the div when the row stands alone).

## Variants and states
- state: queued, running, waiting, done, failed, stopped
- size: default, sm
- states: rest, hover, focus-visible, open, drawing, tab scrambling

## Accessibility
- [ ] The stack is an ordered list, so the steps are read in the order they ran.
- [ ] Every state has a word: the tab or the end word, read once after the label; the pending mark and the connectors are aria-hidden.
- [ ] A row with a body has a button header with aria-expanded and aria-controls, named by its label, detail, state and time.
- [ ] The failure tab is white on the failure red, 6.5:1 in light and 6.6:1 in dark; the waiting word is 5.2:1 on its tint.
- [ ] A running row sets aria-busy.

## Keyboard
- `Enter, Space`: Opens or closes a row's body.

## Edge cases
- Long label or detail -> The detail truncates first, then the label; the time and the word never do.
- Narrow screen -> The detail shrinks to nothing before the label shrinks.
- A step arrives later -> Its connector draws from the moment it arrives, after any hop still drawing.
- State flips -> The colour cuts at once; only the tab's words scramble in.
- Reduced motion -> Connectors, labels and tab words are all there from the first frame; the pending mark stands still.
- Forced colors -> The edges, the connectors, the tab and its word stay, in the system colours.

## Tokens
--row, --row-sm, --mark, --line, --line-control, --line-faint, --selected, --accent-edge, --warn, --warn-text, --warn-tint, --fail, --fail-text, --fail-tint, --ok-text, --text-1, --text-2, --text-3, --text-inverse, --type-label, --type-label-sm, --type-micro, --type-code-sm, --dur-draw, --dur-scramble, --ease-out

## Related
- [Tool call](/systems/sodium/components/tool-call.md): Shows one tool an agent called in a run.
- [Activity](/systems/sodium/components/activity.md): Says what a run is doing now.
