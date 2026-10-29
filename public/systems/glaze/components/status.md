---
name: Status
system: glaze
kind: component
import: "import {Status, StatusMark, statusVariants, statusGlyph, statuses, statusLabels, statusRank} from '@/components/glaze/ui/status'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/status.json"
registryDependencies: [icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/status
---

# Status

Says where a piece of work stands.

## Use when
- A row, header or card shows work that moves from queued to running to an outcome.
- Work stops until a person acts: status="waiting".
- A column of runs, sorted by statusRank so failures come first.

## Don't use when
- A label that never changes, such as a version or an environment. Use [Badge](/systems/glaze/components/badge.md).
- How far the work got. Use [Progress](/systems/glaze/components/progress.md).
- The outcome needs a sentence and an action. Use [Alert](/systems/glaze/components/alert.md).

## Minimal example
```tsx
<Status status={run.status} live/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. status-word-always NEVER Show a status as a coloured dot, square or tint, with or without a word; use Status, a glyph and a word. Because a dot says only that something is there, so ok, warn and fail differ by hue alone, which vanishes in grayscale and forced colours, and a screen reader reads nothing.
   - Correct: `<Status status="ok"/>`
   - Wrong: `<span className="size-1.5 rounded-pill bg-ok"/> Passed`
2. status-no-glyph-on-the-way NEVER Give queued or idle a glyph of their own; they take none, with the word in text-2. Because a glyph is how the eye finds a row that needs it, so a mark on every waiting row buries the one that failed.
   - Correct: `<Status status="queued"/>`
   - Wrong: `<span className="flex gap-1"><Icon icon={Time}/>Queued</span>`
3. status-colour-outcomes MUST Keep green, amber and coral for ok, warn and fail; work on the way stays ink. Because colour means an outcome in Glaze, so a green running row reads as done before it is.
   - Correct: `<Status status="running"/>`
   - Wrong: `<Status status="ok">Running</Status>`
4. status-live-once MUST Set live on the one status the person is watching and on no other in the view. Because each live Status holds its own status region, so a page of rows reads every run that settles, one over another.
   - Correct: `<Status status={run.status} live/>`
   - Wrong: `{runs.map(r => <Status key={r.id} status={r.status} live/>)}`
5. status-no-spinner NEVER Add a spinner beside a running Status; its glyph is the arc. Because two turning marks on one row double the only loop Glaze allows.
   - Correct: `<Status status="running"/>`
   - Wrong: `<Icon icon={Pending} className="animate-spin"/><Status status="running"/>`
6. status-sort-rank MUST Sort a status column by statusRank, fail first, never by the word. Because sorting by the word puts Failed between Idle and Passed, so failures never reach the top.
   - Correct: `rows.sort((a, b) => statusRank[b.status] - statusRank[a.status])`
   - Wrong: `rows.sort((a, b) => a.status.localeCompare(b.status))`
7. status-waiting-not-warn NEVER Show work paused on a person as warn; use status="waiting". Because an approval is a normal step, and an amber row sends the operator looking for a fault that is not there.
   - Correct: `<Status status="waiting"/>`
   - Wrong: `<Status status="warn">Waiting on you</Status>`
8. status-word-short SHOULD Override the word with one to three words that keep the outcome, never a sentence.
   - Correct: `<Status status="fail">Refund failed</Status>`
   - Wrong: `<Status status="fail">The refund could not finish because</Status>`
9. status-mark-label MUST Give a StatusMark on its own a label. Because without one the glyph is aria-hidden, and queued and idle draw nothing, so a screen reader skips the status entirely.
   - Correct: `<StatusMark status="fail" label="Failed"/>`
   - Wrong: `<StatusMark status="fail"/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `status` | `'idle' \| 'queued' \| 'running' \| 'ok' \| 'warn' \| 'fail' \| 'waiting'` | `'idle'` | Picks the glyph, the word and its colour. |
| `size` | `'default' \| 'sm'` | `'default'` | 13 or 12px label type. |
| `live` | `boolean` |  | Speaks once when the status settles on ok, warn, fail or waiting. |
| `children` | `ReactNode` |  | Replaces the default word. |
| `StatusMark label` | `string` |  | Names a glyph shown with no word beside it. |
Other props pass through to the span.

## Variants and states
- status: idle, queued, running, ok, warn, fail, waiting
- size: default, sm
- states: idle, queued, running, ok, warn, fail, waiting, live settled
- when states meet, the first wins: fail > waiting > warn > running > queued > ok > idle

## Accessibility
- [ ] The word is the status; colour is never the only signal, and each glyph differs in shape: check in a ring, triangle, cross in a ring, hourglass, arc.
- [ ] Passed, Warning and Failed are 5.7:1 or better on paper in light and dark, glyph and word in one colour; queued and idle are text-2, 5.5:1.
- [ ] A live status speaks once through a polite status region when it settles; the visible word is aria-hidden meanwhile.
- [ ] The glyph is aria-hidden beside the word; a lone StatusMark is role="img" with its label, or only its label when queued or idle.
- [ ] Status is not focusable.

## Edge cases
- Long word -> Wraps under itself; the glyph stays on the first line.
- Many running rows -> Show one running count in the header instead of a dozen turning arcs.
- Run never returns -> Stays running and live stays silent; the caller sets warn after its deadline.
- Right to left -> The glyph sits at the start and the word follows.
- Reduced motion -> The arc stops, stays drawn, and the word still says Running.
- Forced colours -> Glyphs draw in CanvasText; their shapes and the word carry the meaning.

## Tokens
--ok-text, --warn-text, --fail-text, --text-1, --text-2, --icon-sm, --type-label, --type-label-sm, --dur-spin

## Related
- [Badge](/systems/glaze/components/badge.md): Labels what something is or how it stands.
- [Progress](/systems/glaze/components/progress.md): Shows how far a task got.
- [Alert](/systems/glaze/components/alert.md): Reports a problem with the current view.
