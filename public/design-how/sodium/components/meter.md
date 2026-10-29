---
name: Meter
system: sodium
kind: component
import: "import {Meter, MeterLabel, MeterValue, MeterStack, meterStatus} from '@/components/sodium/ui/meter'"
install: "npx shadcn@latest add https://design.how/r/sodium/meter.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/meter
---

# Meter

Shows how full something is.

## Use when
- A level inside a known range: credits against a quota, a disk, a queue against its limit.
- The parts of one whole on one line, such as storage by table (MeterStack).

## Don't use when
- A task moving to done. Use [Progress](/systems/sodium/components/progress.md).
- A value that changes over time; that is a chart.
- A number with no range. Use [Status strip](/systems/sodium/components/status-strip.md).

## Minimal example
```tsx
<Meter value={412} max={500}>
  <MeterLabel>Credits this month</MeterLabel>
  <MeterValue>{(_, v) => `${v} / 500`}</MeterValue>
</Meter>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. meter-not-progress MUST Use Meter for a level and Progress for a task; never a Meter that counts up to done. Because role="meter" is read as a gauge, so a screen reader says "412 of 500" with no sense that anything finishes.
   - Correct: `<Progress value={done} max={total}><ProgressLabel>Backfill</ProgressLabel></Progress>`
   - Wrong: `<Meter value={done} max={total}><MeterLabel>Backfill</MeterLabel></Meter>`
2. meter-label-and-value MUST Give every Meter a MeterLabel and a MeterValue. Because the yellow fill is 1.4:1 on white, so the reading is what carries the number; the bar only shows its shape.
   - Correct:
     ```tsx
     <Meter value={82}>
       <MeterLabel>Disk</MeterLabel>
       <MeterValue/>
     </Meter>
     ```
   - Wrong: `<Meter value={82}/>`
3. meter-thresholds SHOULD Set warnAt and failAt where the limit actually bites; null when the range has no trouble in it.
   - Correct: `<Meter value={workers} max={64} warnAt={null} failAt={null}/>`
   - Wrong: `<Meter value={workers} max={64} warnAt={0.8}/>`
4. meter-no-colour-by-hand NEVER Colour the fill by hand; pass warnAt and failAt, or status words through statusLabel. Because a hand-set red drops the word that says why, and the screen reader never hears it.
   - Correct: `<Meter value={98} failAt={0.95}/>`
   - Wrong: `<Meter value={98} className="[&_[data-slot=meter-indicator]]:bg-fail"/>`
5. meter-stack-six MUST Give MeterStack at most six parts and fold the rest into one "Other" part. Because there are six data colours, and a seventh part is dropped from the line.
   - Correct: `parts={[...tables.slice(0, 5), {label: "Other", value: rest}]}`
   - Wrong: `parts={tables}`
6. meter-stack-key MUST Keep the MeterStack key unless a table beside it lists every part with its value. Because the parts differ by colour alone on the line, and the key is where each one gets its name and number.
7. meter-value-as-written SHOULD Format the reading with its unit in MeterValue's children, as written: "412 / 500", "82%".

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `value, min, max` | `number` | `0 to 100` | The level and its range. |
| `size` | `'default' \| 'sm'` | `'default'` | 8px track, or 6px with a 4px fill. |
| `warnAt` | `number \| null` | `0.8` | Fraction where the fill turns orange, with a tick. |
| `failAt` | `number \| null` | `1` | Fraction where it turns red. |
| `statusLabel` | `ReactNode` | `'Near limit' \| 'At limit'` | The words past a threshold. |
| `MeterValue children` | `(formatted, value) => ReactNode` |  | Formats the reading. |
| `MeterStack parts, max, label` | `{label, value, display?}[], number, string` |  | Up to six parts of a whole; label names it. |
Other props pass through to the root (Base UI Meter).

## Variants and states
- kind: meter, stacked
- size: default, sm
- states: under, near limit, at limit
- when states meet, the first wins: at limit > near limit > under

## Accessibility
- [ ] role="meter" with aria-valuetext that adds the status words: "92%, Near limit".
- [ ] The track edge is the control edge, 3.7:1 on white and 3.6:1 on the dark page, so the range reads whatever the fill.
- [ ] The sodium fill is 1.4:1 on white and never the only cue: the reading and its words carry the value.
- [ ] MeterStack is a named group; its line is aria-hidden and its key lists every part as text.

## Edge cases
- Value past max -> The fill stops at the end of the track; the reading still says the real number.
- Zero -> The track shows empty with its edge; the reading says 0.
- A tiny stack part -> Keeps 2px on the line so it is not lost; its exact value is in the key.
- Narrow column -> The label truncates; the reading never does.
- Reduced motion -> The fill moves to its width at once.
- Forced colours -> The fill and parts draw in CanvasText inside a CanvasText edge.

## Tokens
--data-1, --data-2, --data-3, --data-4, --data-5, --data-6, --line-control, --warn, --warn-text, --fail, --fail-text, --meter, --marker, --dur-wipe, --type-label-sm, --type-code

## Related
- [Progress](/systems/sodium/components/progress.md): Shows how far a task got.
- [Status strip](/systems/sodium/components/status-strip.md): Shows the few numbers to check first, in one ruled row.
