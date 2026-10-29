---
name: Progress
system: glaze
kind: component
import: "import {Progress, ProgressLabel, ProgressValue, meterStatus} from '@/components/glaze/ui/progress'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/progress.json"
registryDependencies: [icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/progress
---

# Progress

Shows how far a task got.

## Use when
- A task with a known end runs for more than a second: an eval, an upload, an index build.
- A level inside a range: tokens against a plan, seats used (mode="meter").
- A task with no count yet: value={null} slides a short segment along the track.

## Don't use when
- Where a run stands, not how far. Use [Status](/systems/glaze/components/status.md).
- A button's own action. Use [Button](/systems/glaze/components/button.md).
- Content loading into a known shape. Use [Skeleton](/systems/glaze/components/skeleton.md).

## Minimal example
```tsx
<Progress value={done} max={200}>
  <ProgressLabel>Refund eval</ProgressLabel>
  <ProgressValue>{(_, v) => `${v} of 200 tickets`}</ProgressValue>
</Progress>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. progress-meter-for-levels MUST Use mode="meter" for a level in a range, and the default progress mode only for a task moving to done. Because a screen reader announces a progressbar as work under way, so tokens used read as a task that never finishes.
   - Correct: `<Progress mode="meter" value={tokens} max={limit}/>`
   - Wrong: `<Progress value={tokens} max={limit}/>`
2. progress-label MUST Give every Progress a ProgressLabel, or aria-label when the words beside it already say what it is. Because a bar alone is announced as "progress bar, 40%" with nothing to say of what.
   - Correct: `<Progress value={40}><ProgressLabel>Uploading policy.pdf</ProgressLabel></Progress>`
   - Wrong: `<Progress value={40}/>`
3. progress-no-own-sweep NEVER Build a sliding or pulsing bar of your own for an unknown amount; pass value={null}. Because value={null} is the one sweep the motion foundation allows, and it stops as a half fill with the still arc under reduced motion, which a hand-made loop does not.
   - Correct: `<Progress value={null}><ProgressLabel>Indexing</ProgressLabel><ProgressValue/></Progress>`
   - Wrong: `<div className="h-1 animate-pulse bg-ink"/>`
4. progress-fill-recipe NEVER Restyle the fill with bg-ink or another flat colour; the fill is small glaze run along the bar (glaze-sm glaze-sm-x). Because the fill is the same recipe as the slider's range and a ticked box, so a flat ink bar beside them reads as a different product.
   - Correct: `<Progress value={40}/>`
   - Wrong: `<Progress className="[&_[data-slot=progress-indicator]]:bg-ink" value={40}/>`
5. progress-size SHOULD Use size="sm" (4px) in a row or a card footer, the default (6px) in a panel, and size="lg" (8px) only for the one task a screen is about. Because a thick bar in a dense row outweighs the label beside it.
6. progress-colour-limits NEVER Colour a fill green, amber or coral by hand to decorate it; let warnAt and failAt or status do it. Because colour means status, and the thresholds add the words "Near limit" or "At limit" so the colour is never alone.
   - Correct: `<Progress mode="meter" value={92} warnAt={0.8}/>`
   - Wrong: `<Progress className="[&_[data-slot=progress-indicator]]:bg-ok" value={100}/>`
7. progress-reading-units SHOULD Write the reading in the task's own units through ProgressValue's function: "120 of 200 tickets", "1.2 of 4.8 MB". Because a percentage hides how much is left, and the units say what is being counted.
8. progress-done-gone SHOULD Replace a finished progress with the result, such as a Status, within a few seconds. Because a full bar left on screen reads as still working.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `value` | `number \| null` | `null` | min to max; null is indeterminate (progress mode). |
| `min, max` | `number` | `0, 100` | The range. |
| `mode` | `'progress' \| 'meter'` | `'progress'` | A task, or a level in a range. |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | The bar: 4, 6 or 8px. |
| `warnAt` | `number \| null` | `0.8` | Meter: the fraction where it turns amber and draws a tick. |
| `failAt` | `number \| null` | `1` | Meter: the fraction where it turns coral, with a tick when under 1. |
| `status` | `'warn' \| 'fail'` |  | Sets the status by hand on either mode. |
| `statusLabel` | `ReactNode` |  | The words after the reading; Near limit and At limit by default. |
| `ProgressValue children` | `(formatted, value) => ReactNode` |  | Formats the reading. |
Other props pass through to the root div (Base UI Progress or Meter).

## Variants and states
- mode: progress, meter
- size: sm, default, lg
- states: indeterminate, partial, complete, warn, fail
- when states meet, the first wins: fail > warn > complete > partial > indeterminate

## Accessibility
- [ ] Progress is role="progressbar" and a meter role="meter", named by ProgressLabel.
- [ ] A screen reader hears the reading, then the status words: "92%, Near limit". On screen the glyph and the words come first, so the status never rests on hue alone. A statusLabel that is not a string is heard as the default words.
- [ ] Indeterminate reads "In progress"; under reduced motion the segment stands still as a half fill beside the still arc.
- [ ] The fill reads against the field track at 4.6:1 at its lightest (the start) in light and 7.6:1 at its darkest end in dark, past the 3:1 a graphic needs.

## Edge cases
- Value past max -> Clamps to full; a meter turns coral at failAt.
- Negative value -> Clamps to empty.
- max of 0 -> Reads as empty instead of dividing by zero.
- Long label -> Truncates; the reading keeps its room at the end.
- Reduced motion -> The fill jumps instead of easing; indeterminate is a still half fill with the still arc.
- Tiny value -> Any value above zero shows at least a circle as wide as the bar is thick, so the round ends never squash.
- Threshold at the end -> failAt of 1 draws no tick: the end of the track is the limit.
- Right to left -> The fill, the ticks and the sweep run from the right.
- Forced colours -> The track takes an outline and the fill CanvasText.

## Tokens
--progress-bar-sm, --progress-bar, --progress-bar-lg, --progress-sweep, --field, --line-faint, --line-strong, --glaze-sm-top, --glaze-sm-mid, --glaze-sm-bottom, --glaze-sm-highlight, --warn, --fail, --warn-text, --fail-text, --radius-pill, --type-label, --type-caption, --text-1, --text-2, --dur-state, --dur-sweep

## Related
- [Status](/systems/glaze/components/status.md): Says where a piece of work stands.
- [Skeleton](/systems/glaze/components/skeleton.md): Holds the shape of content while it loads.
