---
name: Status
system: sodium
kind: component
import: "import {Status, StatusMark, statusVariants, statuses, statusLabels, statusRank} from '@/components/sodium/ui/status'
import {RunningMark} from '@/components/sodium/ui/running-mark'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/status.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/status
---

# Status

Says where a job or a run stands.

## Use when
- A row, header or strip cell shows work that moves from queued to running to an outcome.
- A column of jobs, sorted by statusRank so failures come first.
- A cell where only the mark fits beside a word that already names it (StatusMark).

## Don't use when
- A label that never changes, such as an environment or an engine. Use [Tag](/systems/sodium/components/tag.md).
- How far the work got. Use [Progress](/systems/sodium/components/progress.md).
- The outcome needs a sentence and an action. Use [Alert](/systems/sodium/components/alert.md).

## Minimal example
```tsx
<Status status={run.status} live/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. status-no-dot NEVER Show a status as a dot, a coloured square or a tinted word; use Status, a square mark and a word. Because a lone colour differs by hue only, which vanishes in grayscale and forced colours and says nothing to a screen reader, and a round dot is the one round part in a square system.
   - Correct: `<Status status="ok"/>`
   - Wrong: `<span className="size-2 bg-ok"/> Succeeded`
2. status-colour-outcomes MUST Keep green, orange and red for ok, warn and fail; work on the way stays ink. Because colour means an outcome, so a green running row reads as done before it is.
   - Correct: `<Status status="running"/>`
   - Wrong: `<Status status="ok">Running</Status>`
3. status-no-yellow NEVER Show a warning or a running job in the sodium yellow. Because yellow marks the one action, and warning has its own orange so the two never meet.
   - Correct: `<Status status="warn"/>`
   - Wrong: `<Status status="warn" className="text-accent-text"/>`
4. status-live-once MUST Set live on the one status the person is watching and on no other in the view. Because each live Status holds its own status region, so a page of rows reads out every job that settles.
   - Correct: `<Status status={job.status} live/>`
   - Wrong: `{jobs.map(j => <Status key={j.id} status={j.status} live/>)}`
5. status-no-pending-beside NEVER Add a pending mark or a spinner beside a running Status; its mark already steps. Because two moving marks on one row double the only loop Sodium has.
   - Correct: `<Status status="running"/>`
   - Wrong: `<span className="pending"/><Status status="running"/>`
6. status-sort-rank MUST Sort a status column by statusRank, failures first, never by the word. Because sorting by the word puts Failed between Idle and Queued, so failures never reach the top.
   - Correct: `rows.sort((a, b) => statusRank[b.status] - statusRank[a.status])`
   - Wrong: `rows.sort((a, b) => a.status.localeCompare(b.status))`
7. status-mark-label MUST Give a StatusMark with no word beside it a label. Because without one the mark is aria-hidden, so a screen reader skips the status entirely.
   - Correct: `<StatusMark status="fail" label="Failed"/>`
   - Wrong: `<StatusMark status="fail"/>`
8. status-word-short SHOULD Override the word with one to three words that keep the outcome, never a sentence.
   - Correct: `<Status status="fail">Load failed</Status>`
   - Wrong: `<Status status="fail">The load could not finish because</Status>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `status` | `'idle' \| 'queued' \| 'running' \| 'paused' \| 'ok' \| 'warn' \| 'fail'` | `'idle'` | Picks the mark, the word and its colour. |
| `size` | `'default' \| 'sm'` | `'default'` | 13 or 12px mono capitals. |
| `live` | `boolean` |  | Speaks once when the status settles on ok, warn, fail or paused. |
| `children` | `ReactNode` |  | Replaces the default word. |
| `StatusMark label` | `string` |  | Names a mark shown with no word beside it. |
Other props pass through to the span.

## Variants and states
- status: idle, queued, running, paused, ok, warn, fail
- size: default, sm
- states: idle, queued, running, paused, ok, warn, fail, live settled
- when states meet, the first wins: fail > warn > paused > running > queued > ok > idle

## Accessibility
- [ ] The word is the status; each mark has its own silhouette (hollow, hollow with a cell, four cells, two bars, solid, half, diamond), so colour is never the only signal.
- [ ] Succeeded, Warning and Failed are 5.6:1 or better on the page in both themes, mark and word in one colour; idle and queued are text-2, 7.8:1.
- [ ] The marks are 3:1 or better against the page in light and dark (WCAG 1.4.11): ok 6.5, warn 4.3, fail 6.5 on white.
- [ ] A live status speaks once through a polite status region when it settles; the visible word is aria-hidden meanwhile.
- [ ] Status is not focusable.

## Edge cases
- Long word -> Wraps under itself; the mark stays centred on the first line.
- Many running rows -> Every running mark steps in time on one clock; show one running count in the header instead of a dozen.
- Job never returns -> Stays running and live stays silent; the caller sets warn after its deadline.
- Right to left -> The mark sits at the start, and the running cell steps the other way round.
- Reduced motion -> The running mark stands still with its first cell lit; the word still says Running.
- Forced colours -> Marks draw in CanvasText; their shapes and the word carry the meaning.

## Tokens
--ok, --ok-text, --warn, --warn-text, --fail, --fail-text, --text-1, --text-2, --text-3, --marker, --pending-cell, --dur-pending, --type-label, --type-label-sm

## Related
- [Tag](/systems/sodium/components/tag.md): Labels what something is or how it stands.
- [Status strip](/systems/sodium/components/status-strip.md): Shows the few numbers to check first, in one ruled row.
- [Progress](/systems/sodium/components/progress.md): Shows how far a task got.
- [Alert](/systems/sodium/components/alert.md): Reports a problem or a change in the current view.
