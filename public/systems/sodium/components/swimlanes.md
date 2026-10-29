---
name: Swimlanes
system: sodium
kind: component
import: "import {Swimlanes, stepVariants} from '@/components/sodium/ui/swimlanes'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/swimlanes.json"
registryDependencies: [chart, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/swimlanes
---

# Swimlanes

Shows the steps of a flow across the systems they run in.

## Use when
- The order of a handful of steps and the system each runs in: a sync from source to warehouse to dashboard.
- Where a job hands back: an acknowledgement, a retry that returns to the queue.

## Don't use when
- When each step started and how long it took; that is a timeline, and a step's width here is lanes, not time.
- Numbers over time. Use [Chart](/systems/sodium/components/chart.md).
- More than five systems or eight steps; split the flow, or list it as a table.

## Minimal example
```tsx
<Swimlanes label="Nightly sync" lanes={[{id: 'source', label: 'Source'}, {id: 'warehouse', label: 'Warehouse'}]}
  steps={[{label: 'Extract', from: 'source'}, {label: 'Load', from: 'source', to: 'warehouse', tone: 'accent'}]}/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. swimlanes-one-accent MUST Set tone: 'accent' on at most one step, the one the view is about; leave the rest on the well. Because the yellow block is the one thing to look at, and two of them make the reader choose.
   - Correct: `steps={[{label: 'Load', …}, {label: 'Transform', tone: 'accent', …}]}`
   - Wrong: `steps={[{label: 'Load', tone: 'accent', …}, {label: 'Transform', tone: 'accent', …}]}`
2. swimlanes-one-edge NEVER Give a step its own edge or a status colour; every step keeps the one --line edge, and an outcome goes in meta as a word. Because state is fill and word only, so a green or dark edge is a second code beside the yellow that the reader has to learn, and colour alone is not a word.
   - Correct: `{label: 'Test', from: 'warehouse', meta: 'Passed'}`
   - Wrong: `<Swimlanes className="[&_li]:border-ok [&_li]:bg-ok-tint" … />`
3. swimlanes-order MUST Pass steps in the order they run, one per row; a step that runs in parallel is its own row too. Because rows are order, read top to bottom, and the connectors join each step to the one before it.
   - Correct: `steps={[{label: 'Extract', …}, {label: 'Publish', …}]}`
   - Wrong: `steps={[{label: 'Publish', …}, {label: 'Extract', …}]}`
4. swimlanes-not-time NEVER Stretch a step across lanes to show it took longer; a step spans the systems it touches. Because the columns are systems, so a long step drawn wide says it ran in the warehouse when it did not.
   - Correct: `{label: 'Transform', from: 'warehouse', meta: '42s'}`
   - Wrong: `{label: 'Transform', from: 'source', to: 'dashboard', meta: '42s'}`
5. swimlanes-label MUST Give it a label that says what moves where: "Nightly sync, source to dashboard". Because it is the figure's caption, the name a screen reader gives the ordered list of steps.
   - Correct: `<Swimlanes label="Nightly sync, source to dashboard" … />`
   - Wrong: `<Swimlanes label="Flow" … />`
6. swimlanes-names SHOULD Name lanes and steps in a word or two in sentence case, and put numbers in meta. Because lane heads and step names are mono capitals in a quarter or a third of the width, and a number in the name cannot line up with the others.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `label` | `string` |  | The figure's caption. |
| `lanes` | `{id: string; label: string}[]` |  | The systems, start to end. Two to five. |
| `steps` | `SwimlaneStep[]` |  | In order: label, from, to (defaults to from), tone, meta. |
| `steps[].tone` | `'well' \| 'accent'` | `'well'` | The fill: accent on the one step to act on. |
| `steps[].meta` | `ReactNode` |  | A value at the block's end, as written, or an outcome as a word. |
Other props pass through to the figure element.

## Variants and states
- lanes: 2, 3, 4
- tone: well, accent

## Accessibility
- [ ] It is a figure with an ordered list of steps; each reads its name, the lanes it spans and its meta.
- [ ] Lane heads and connectors are hidden from a screen reader, since every step already names its lanes.
- [ ] Step text clears 4.5:1 on both tones: ink on the yellow slab 12.8:1, yellow on the dark tint 9.0:1, ink on the well.
- [ ] An outcome is a word in meta, so it reads without colour.
- [ ] Connectors are --line-control, 3.7:1 on white, and end in a square.

## Edge cases
- Step back to an earlier lane -> An elbow runs down from the last step's end lane and back to the step's end edge.
- Step in the next lane on -> An elbow runs down and forward to the step's start edge.
- Overlapping steps -> No connector: the blocks stack --space-1 apart, so no two edges touch.
- Long step name -> Truncates with an ellipsis before the meta, which never shrinks.
- Narrow width -> Lanes share the width equally; at 390px a one-lane step of three holds a nine-letter name (TRANSFORM) whole, and its meta gives way first.
- Right to left -> Lanes run from the right; blocks and connectors mirror.
- Reduced motion -> Blocks and connectors are there at once.

## Tokens
--primary-bg, --primary-text, --well, --line, --line-control, --text-1, --text-2, --row-sm, --space-1, --type-label-sm, --type-micro, --type-code-sm, --dur-wipe, --dur-draw

## Related
- [Chart](/systems/sodium/components/chart.md): Shows numbers over time as a line or an area.
- [Bar blocks](/systems/sodium/components/bar-blocks.md): Splits one total into its parts as blocks as wide as their share.
