---
name: Timeline
system: glaze
kind: component
import: "import {Timeline} from '@/components/glaze/ui/timeline'"
install: "npx shadcn@latest add https://design.how/r/glaze/timeline.json"
registryDependencies: [chart, data-units, skeleton, status, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/timeline
---

# Timeline

Shows when each step of a run happened.

## Use when
- One run's steps on one clock: an agent's plan, its tool calls and its reply, nested by depth.
- Finding where the time went and which step broke.
- A live run, with now ticking once a second and the running span growing.

## Don't use when
- Many runs compared by duration. Use [Table](/systems/glaze/components/table.md).
- A number over time. Use [Chart](/systems/glaze/components/chart.md).
- The steps of a plan that has not run. Use [Item](/systems/glaze/components/item.md).

## Minimal example
```tsx
<Timeline label="Run run_8f2a91" spans={[
  {id: 'plan', label: 'Plan', start: 0, end: 820, status: 'ok'},
  {id: 'search', label: 'Search orders', start: 820, end: 4100, status: 'ok', depth: 1, meta: 'orders.search'},
]}/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. timeline-ms MUST Give start and end in milliseconds from the run's start; leave end out while the span runs or waits. Because the track, the ticks and every duration share one unit picked from the total, and a timestamp or seconds would set a scale a thousand times off.
   - Correct: `{id: 'plan', label: 'Plan', start: 0, end: 820}`
   - Wrong: `{id: 'plan', label: 'Plan', start: 1729152000000, end: 1729152000820}`
2. timeline-now MUST Pass now, ticking once a second, while any span runs or waits. Because an open span runs to now, so without it a running step has no width and the total stops.
   - Correct: `<Timeline label="Run" spans={spans} now={elapsed}/>`
   - Wrong: `<Timeline label="Run" spans={spans}/> // a span with no end`
3. timeline-status MUST Mark a failed step status: 'fail' and a slow one 'warn'; never colour a span any other way. Because only trouble takes colour, so the coral bar and its word are what the eye finds in a long trace.
   - Correct: `{id: 'llm', label: 'Draft', start: 0, end: 900, status: 'fail'}`
   - Wrong: `{id: 'llm', label: 'Draft', start: 0, end: 900, className: 'bg-ok'}`
4. timeline-waiting MUST Mark a step held for a person status: 'waiting', with waitingLabel when it is not you. Because a waiting step is a hollow capsule to now with its word, so it never reads as a slow step that is working.
5. timeline-depth SHOULD Nest tool calls under the step that made them with depth, one level per call. Because the indent and its guide line make the names a tree, so a slow call is read with the step it slowed.
6. timeline-meta-mono SHOULD Put the tool name or an ID in meta and costs or tokens in figure, never in the label. Because meta sets mono at 0.8 and figure tabular figures at the column's end, and both drop on a narrow card so the name keeps its room.
7. timeline-no-box NEVER Wrap a Timeline in a Card; it is the card, or takes frame="none" inside one. Because a card around a card is two edges where one closes the group.
   - Correct: `<Timeline label="Run" spans={spans}/>`
   - Wrong: `<Card><Timeline label="Run" spans={spans}/></Card>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `label` | `string` |  | The head row's title and the timeline's name. |
| `spans` | `TimelineSpan[]` |  | {id, label, start, end?, status?, waitingLabel?, depth?, meta?, figure?}, ms from the start. |
| `now` | `number` |  | ms from the start, for spans with no end. |
| `activeId, onSpanClick` | `string, (span) => void` |  | The open span; makes the rows one tab stop that opens on Enter. |
| `maxHeight` | `number` |  | px. The rows scroll, and window past 200. |
| `loading` | `boolean` | `false` | Placeholder bars. |
| `footer` | `ReactNode` |  | The shell's footer row: the open span's details. |
| `frame` | `'card' \| 'none'` | `'card'` | The shell and panel, or bare inside a Card. |
Other props pass through to the section element.

## Variants and states
- run: passed, failed, running, waiting
- states: rest, open, loading, empty
- when states meet, the first wins: loading > empty > open > hover > rest

## Accessibility
- [ ] The timeline is a named section; the rows are a list, or a listbox of options with onSpanClick.
- [ ] Each row is named "Search orders, started at 0.8s, took 3.3s, warning"; the drawing is aria-hidden.
- [ ] A screen-reader table carries step, start, duration and status for every span.
- [ ] Trouble is never colour alone: the status column names it, and the row's name says it.
- [ ] Bars are ink at 45%, 3.3:1 on paper; durations are text-2, 5.5:1, or the status word colours.

## Keyboard
- `Tab`: With onSpanClick, enters the rows at the open span.
- `Arrow Up / Down, Home, End`: Moves between spans.
- `Enter / Space`: Opens the focused span.

## Edge cases
- A step with no width -> Its bar keeps a 4px capsule, and its duration still shows.
- A bar ending at the total -> Its duration sits before the bar, inside the track.
- Narrow card -> The name takes two fifths, meta and figure drop, the status column goes and the bar and its duration carry the outcome.
- Long run -> The ticks pick one unit from the total (ms, s, min, h) and fall on whole steps of it.
- Reduced motion -> A running bar jumps once a second instead of gliding.
- Dark theme -> The bars, washes and status colours take their dark values; the open bar turns near-white.

## Tokens
--shell, --paper, --line-faint, --line, --line-strong, --ink, --fail, --warn, --fail-text, --warn-text, --hover, --pressed, --row, --label-col, --type-label, --type-caption, --type-code-xs, --space-3

## Related
- [Chart](/systems/glaze/components/chart.md): Shows numbers over time or by bucket.
- [Table](/systems/glaze/components/table.md): Lists records that share the same fields.
- [Log viewer](/systems/glaze/components/log-viewer.md): Shows a run's output lines as they stream.
