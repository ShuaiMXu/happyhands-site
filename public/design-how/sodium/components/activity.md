---
name: Activity
system: sodium
kind: component
import: "import {Activity, pastTense} from '@/components/sodium/ai/activity'"
install: "npx shadcn@latest add https://design.how/r/sodium/activity.json"
registryDependencies: [theme, tool-call-row, use-scramble, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/activity
---

# Activity

Says what a run is doing now.

## Use when
- A run, a job or an agent turn needs one line that says what it is doing now, and then what it did.
- The head of a run's page, a message, or a dense panel where the steps themselves are folded away.

## Don't use when
- Every step should show, in order. Use [Tool-call row](/systems/sodium/components/tool-call-row.md).
- An action the person started from a button. Use [Button](/systems/sodium/components/button.md).

## Minimal example
```tsx
<Activity active={running} label={step.active} elapsed={now - startedAt}
  summary="Wrote 1,204 partitions and compacted 12 files." status={failed ? 'fail' : 'ok'}/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. activity-phrase MUST Write the live label as an -ing verb and its object in sentence case ("Writing partitions"). Because Activity sets it in mono capitals and turns it into the past tense for the summary, which only works from an -ing verb.
   - Correct: `<Activity active label="Writing partitions"/>`
   - Wrong: `<Activity active label="PARTITION WRITE IN PROGRESS"/>`
2. activity-summary-sentence MUST Pass the finished summary as a sentence with a full stop, and the outcome as status. Because the summary is prose in the sans, and the end word in its colour carries how it ended.
   - Correct: `<Activity summary="Wrote 1,204 partitions." status="ok"/>`
   - Wrong: `<Activity summary="DONE: 1204 PARTITIONS"/>`
3. activity-one-per-run SHOULD Show one Activity per run, at its head. Because its pending mark is the one loop on the screen, and two of them make the eye pick.
4. activity-no-fake-steps NEVER Cycle invented phrases on a timer to look busy. Because each phrase scrambles in and holds a second, so a fake loop is a moving label that says nothing true.
   - Correct: `<Activity active label={currentStep.active}/>`
   - Wrong: `setInterval(() => setLabel(next(phrases)), 800)`
5. activity-warn-orange NEVER Paint a warning in yellow; status="warn" shows Warnings in the warning orange. Because yellow is the one action on the screen, and a yellow warning reads as a button.
   - Correct: `<Activity summary="Wrote 1,204 partitions." status="warn"/>`
   - Wrong: `<span className="text-accent-text">Warnings</span>`
6. activity-announce-once MUST Pass announce={false} when a parent already announces the end of the run. Because two polite regions read the same summary twice.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `label` | `string` |  | The live phrase, an -ing verb and its object. |
| `active` | `boolean` | `false` | A step is running now. |
| `waiting` | `boolean` | `false` | Nothing has happened yet; shows Starting after delay. |
| `elapsed` | `number` |  | ms the run has gone, after the live phrase. |
| `summary` | `string` | `the past tense of the last phrase` | The finished sentence. |
| `status` | `'ok' \| 'warn' \| 'fail' \| 'stopped'` | `'ok'` | The end word and its colour. |
| `size` | `'default' \| 'sm'` | `'default'` | 13px or 12px labels. |
| `minDisplay, settle, delay, minLoader` | `number` | `1000, 400, 150, 400` | The hold, settle and anti-flicker times in ms. |
| `clock` | `number` |  | Elapsed ms for the scramble, for a still picture. |
| `announce` | `boolean` | `true` | Owns a polite region for Starting and the summary. |
Other props pass through to the root element.

## Variants and states
- size: default, sm
- states: waiting, active, scrambling, done, warnings, failed, stopped

## Accessibility
- [ ] A polite status region reads Starting and the finished summary with its end word; live phrases are not read out.
- [ ] The scrambled glyphs are aria-hidden and the real phrase is read in their place.
- [ ] The pending mark is aria-hidden; the line sets aria-busy while it moves.
- [ ] End words: done green 6.5:1, warning orange 6.0:1, failure red 6.5:1 on the light page.

## Edge cases
- Burst of steps -> Each phrase holds a second; the ones between are skipped.
- Run answers at once -> Starting never shows, since it waits 150ms first.
- Long phrase -> Truncates at the line's end; the time never does.
- Reduced motion -> A new phrase lands at once and the pending mark stands still.

## Tokens
--type-label, --type-label-sm, --type-micro, --type-code-sm, --type-body-sm, --type-caption, --text-1, --text-2, --text-3, --ok-text, --warn-text, --fail-text, --dur-scramble, --dur-pending, --pending-cell, --control, --control-sm

## Related
- [Tool-call row](/systems/sodium/components/tool-call-row.md): Draws a run's steps as ruled boxes, joined by connectors.
- [Tool call](/systems/sodium/components/tool-call.md): Shows one tool an agent called in a run.
- [Message](/systems/sodium/components/message.md): Shows one turn of a run's thread.
