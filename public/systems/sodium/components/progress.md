---
name: Progress
system: sodium
kind: component
import: "import {Progress, ProgressLabel, ProgressValue} from '@/components/sodium/ui/progress'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/progress.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/progress
---

# Progress

Shows how far a task got.

## Use when
- A task with a known end moves toward it: a backfill over partitions, an export, an index build.
- A task with no known end yet (value null), until the first count arrives.

## Don't use when
- A level inside a range, such as a quota. Use [Meter](/systems/sodium/components/meter.md).
- Where a job stands rather than how far. Use [Status](/systems/sodium/components/status.md).
- A button waiting on its own action. Use [Button](/systems/sodium/components/button.md).

## Minimal example
```tsx
<Progress value={done} max={1240}>
  <ProgressLabel>Backfill</ProgressLabel>
  <ProgressValue>{(_, v) => `${v} / 1,240`}</ProgressValue>
</Progress>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. progress-label-and-value MUST Give every Progress a ProgressLabel and a ProgressValue. Because the cells show a shape, and the reading is what says how many are left.
   - Correct:
     ```tsx
     <Progress value={620} max={1240}>
       <ProgressLabel>Backfill</ProgressLabel>
       <ProgressValue/>
     </Progress>
     ```
   - Wrong: `<Progress value={620} max={1240}/>`
2. progress-null-not-zero MUST Pass value={null} until the first count arrives; never 0 for unknown. Because 0 reads as "nothing done", and the pending mark is what says "working, count not known yet".
   - Correct: `<Progress value={count ?? null}/>`
   - Wrong: `<Progress value={count ?? 0}/>`
3. progress-ink-not-yellow NEVER Fill a Progress in the sodium yellow. Because yellow is the action and the first data series; a task is work, so it is ink, and a yellow bar beside the slab reads as a second action.
   - Correct: `<Progress value={620} max={1240}/>`
   - Wrong: `<Progress className="[&_[data-slot=progress-indicator]]:bg-accent-fill"/>`
4. progress-status-word MUST Show a task in trouble with status="fail" or "warn", which brings its word; never a red fill alone. Because hue alone vanishes in grayscale, and the status word joins what a screen reader hears.
   - Correct: `<Progress value={620} max={1240} status="fail"/>`
   - Wrong: `<Progress className="[&_[data-slot=progress-indicator]]:bg-fail"/>`
5. progress-no-second-loop NEVER Add a spinner or a sweeping bar beside an indeterminate Progress. Because its reading already shows the pending mark, the one loop Sodium allows.
   - Correct: `<Progress value={null}/>`
   - Wrong: `<Progress value={null}/><span className="pending"/>`
6. progress-one-per-task SHOULD Show one Progress per task the person started; roll many small tasks into one count.
   - Correct: `<Progress value={filesDone} max={files.length}/>`
   - Wrong: `{files.map(f => <Progress key={f.id} value={f.done}/>)}`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `value, min, max` | `number \| null` | `null, 0, 100` | null is indeterminate. |
| `size` | `'default' \| 'sm'` | `'default'` | 8px or 4px of cells. |
| `status` | `'warn' \| 'fail'` |  | Turns the done cells orange or red and adds the word. |
| `statusLabel` | `ReactNode` | `'Slow' \| 'Failed'` | The status words. |
| `ProgressValue children` | `(formatted, value) => ReactNode` |  | Formats the reading. |
Other props pass through to the root (Base UI Progress).

## Variants and states
- size: default, sm
- states: indeterminate, running, complete, warn, fail
- when states meet, the first wins: fail > warn > indeterminate > complete > running

## Accessibility
- [ ] role="progressbar" with aria-valuetext that adds the status word: "50%, Failed"; indeterminate reads "In progress".
- [ ] The done cells are ink on the empty rule-coloured cells, 13.7:1 in light; the reading text-1 on the page, 18.3:1.
- [ ] The pending mark in the reading is aria-hidden; the role already says the task is working.

## Edge cases
- Value past max -> Every cell fills; the reading says the real count.
- Partial cell -> The last done cell may be cut part way; the reading carries the exact count.
- Right to left -> The cells run from the right edge and fill toward the left.
- Reduced motion -> The fill moves at once and the pending mark stands still with its first cell lit.
- Forced colours -> Done cells draw in CanvasText over GrayText cells.

## Tokens
--text-1, --line, --warn, --warn-text, --fail, --fail-text, --meter, --space-1, --space-0-5, --dur-wipe, --dur-pending, --type-label-sm, --type-code

## Related
- [Meter](/systems/sodium/components/meter.md): Shows how full something is.
- [Status](/systems/sodium/components/status.md): Says where a job or a run stands.
- [Skeleton](/systems/sodium/components/skeleton.md): Holds the shape of content while it loads.
