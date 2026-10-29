---
name: Status strip
system: sodium
kind: component
import: "import {StatusStrip, StatusStripCell, StatusStripLabel, StatusStripValue, StatusStripUnit, stripVariants} from '@/components/sodium/ui/status-strip'"
install: "npx shadcn@latest add https://design.how/r/sodium/status-strip.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/status-strip
---

# Status strip

Shows the few numbers to check first, in one ruled row.

## Use when
- The top or foot of a pipeline, cluster or warehouse page: the two to six numbers a person checks before reading anything else.
- A row of counts that filter the list under it (failed, running, queued), one of them chosen.

## Don't use when
- One big headline number with a caption. Use [Meter](/systems/sodium/components/meter.md).
- Many label and value pairs about one thing. Use [Data list](/systems/sodium/components/data-list.md).
- Picking one of a few views of the same data. Use [Segmented control](/systems/sodium/components/segmented-control.md).

## Minimal example
```tsx
<StatusStrip label="Cluster status">
  <StatusStripCell>
    <StatusStripLabel>Workers</StatusStripLabel>
    <StatusStripValue>48<StatusStripUnit>/ 64</StatusStripUnit></StatusStripValue>
  </StatusStripCell>
  <StatusStripCell selected render={<button type="button" onClick={showFailed}/>}>
    <StatusStripLabel>Failed</StatusStripLabel>
    <StatusStripValue>3</StatusStripValue>
  </StatusStripCell>
</StatusStrip>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. status-strip-few-cells MUST Keep a strip to two to six cells. Because past six, the cells wrap into rows on a laptop and the strip turns into a table nobody scans.
2. status-strip-one-selected MUST Select at most one cell, and only when it filters or locates the view under it. Because the yellow wash means "you are here", and two of them leave the person asking which one the list follows.
   - Correct: `<StatusStripCell selected={filter === "failed"}>…</StatusStripCell>`
   - Wrong:
     ```tsx
     <StatusStripCell selected>…</StatusStripCell>
     <StatusStripCell selected>…</StatusStripCell>
     ```
3. status-strip-button-cell MUST Render a cell that filters as a button with render={<button type="button"/>}. Because a div with onClick takes no focus and is not announced as a control.
   - Correct: `<StatusStripCell render={<button type="button" onClick={show}/>}>`
   - Wrong: `<StatusStripCell onClick={show}>`
4. status-strip-values-as-written NEVER Set a value in capitals or in a label role; values go in StatusStripValue as written. Because values are compared and copied, and capitals change what eu-west-2 or 90ms say.
   - Correct: `<StatusStripValue>90ms</StatusStripValue>`
   - Wrong: `<StatusStripValue className="type-label">90ms</StatusStripValue>`
5. status-strip-status-word MUST Show an outcome in a cell with a StatusMark beside a value that names it, never a coloured number alone. Because a red 3 reads as a red 3; the mark and the label say it is three failures.
   - Correct: `<StatusStripValue><StatusMark status="fail"/>3</StatusStripValue>`
   - Wrong: `<StatusStripValue className="text-fail-text">3</StatusStripValue>`
6. status-strip-no-box-in-frame NEVER Use the framed variant as a row inside a frame; use variant="plain" there. Because its own edge doubles the frame's rule, and a box inside a frame is the one thing Sodium never draws.
   - Correct: `<section className="frame"><StatusStrip variant="plain">…</StatusStrip></section>`
   - Wrong: `<section className="frame"><StatusStrip>…</StatusStrip></section>`
7. status-strip-label-names SHOULD Write labels as one or two nouns and keep the unit out of them; put it in StatusStripUnit.
   - Correct: `<StatusStripLabel>Latency</StatusStripLabel>`
   - Wrong: `<StatusStripLabel>Latency in ms</StatusStripLabel>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `variant` | `'framed' \| 'plain'` | `'framed'` | framed draws its own edge; plain is a row inside a frame. |
| `label` | `string` |  | Names the group for a screen reader. |
| `StatusStripCell selected` | `boolean` | `false` | The selection wash and aria-current. One per strip. |
| `StatusStripCell render` | `ReactElement` |  | A button for a cell that filters; adds hover and the inset focus ring. |
| `StatusStripValue` | `span` |  | The value as written in mono; a StatusMark or a Kbd may lead it. |
| `StatusStripUnit` | `span` |  | A unit or delta in text-2 after the value. |
Other props pass through to the outer div.

## Variants and states
- variant: framed, plain
- states: rest, hover, focus-visible, selected
- when states meet, the first wins: focus-visible > selected > hover > rest

## Accessibility
- [ ] The strip is a named group; each cell reads its label then its value.
- [ ] Labels are text-3, 5.6:1 on the page and 5.1:1 on the wash; values text-1, 18.3:1, and 16.5:1 on the wash.
- [ ] The selected cell sets aria-current="true"; the wash is never the only cue in forced colours, which draw an outline.
- [ ] A filtering cell is a real button with the 2px focus ring drawn inside its rules.

## Keyboard
- `Tab`: Moves between filtering cells.
- `Enter`: Chooses the focused cell.

## Edge cases
- Narrow screen -> Cells wrap into rows, each at least 160px; the rules still meet with no doubled edge.
- Long value -> Ends in an ellipsis inside its cell; give the full value a title or a tooltip.
- Missing value -> Write a dash and say why in the label's tooltip; never leave the cell blank.
- Dark theme -> The selected cell is the dark yellow tint under text-1, 11.7:1.

## Tokens
--line, --page, --selected, --selected-strong, --hover, --pressed, --text-1, --text-2, --text-3, --label-col, --type-label-sm, --type-code, --focus

## Related
- [Status](/systems/sodium/components/status.md): Says where a job or a run stands.
- [Data list](/systems/sodium/components/data-list.md): Lists label and value pairs about one thing.
- [Meter](/systems/sodium/components/meter.md): Shows how full something is.
