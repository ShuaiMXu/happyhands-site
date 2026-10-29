---
name: Bar blocks
system: sodium
kind: component
import: "import {BarBlocks, blockVariants} from '@/components/sodium/ui/bar-blocks'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/bar-blocks.json"
registryDependencies: [chart, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/bar-blocks
---

# Bar blocks

Splits one total into its parts as blocks as wide as their share.

## Use when
- A total split into two to six named parts read by number and by size: rows by source, storage by tier.
- The headline split of a panel, where each part's number should be on the page.

## Don't use when
- Numbers over time. Use [Chart](/systems/sodium/components/chart.md).
- One value per period. Use [Stem chart](/systems/sodium/components/stem-chart.md).
- Parts that do not add up to one whole; widths would claim shares that are not there.

## Minimal example
```tsx
<BarBlocks label="Rows by source, last sync" unit="count"
  data={[{label: 'Orders DB', value: 1240000}, {label: 'Event stream', value: 612000}]}/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. bar-blocks-lead MUST Put the part that matters first: it takes the yellow wash, and the rest sit on the well. Because the first block is the one the eye lands on and the only yellow, so a minor part first spends it on the wrong thing.
   - Correct: `data={[{label: 'Orders DB', value: 1240000}, {label: 'Webhooks', value: 94000}]}`
   - Wrong: `data={[{label: 'Webhooks', value: 94000}, {label: 'Orders DB', value: 1240000}]}`
2. bar-blocks-whole MUST Pass parts of one whole only, all in one unit and none negative. Because a block's width is its share of the sum, so parts that overlap or differ in unit draw shares that do not exist.
   - Correct: `data={[{label: 'Loaded', value: 48210}, {label: 'Skipped', value: 6930}]}`
   - Wrong: `data={[{label: 'Rows', value: 48210}, {label: 'Seconds', value: 42}]}`
3. bar-blocks-count MUST Keep it to two to six parts, and to four at phone width; group the rest as Other. Because each block has a floor so its number and name fit, and six floors are wider than a phone.
   - Correct: `data={[...topThree, {label: 'Other', value: rest}]}`
   - Wrong: `data={allTwelveSources}`
4. bar-blocks-status MUST Set tone: 'fail', 'warn' or 'ok' only on a part that is that outcome, named so. Because the tint is a state, and Rejected in red reads at a glance where a red Event stream block reads as a fault.
   - Correct: `{label: 'Rejected', value: 2410, tone: 'fail'}`
   - Wrong: `{label: 'Event stream', value: 612000, tone: 'fail'}`
5. bar-blocks-short-numbers MUST Pass unit (count, bytes or duration) when a value passes five characters, so every number fits its block. Because the number is the truth and the width only the impression, so a number cut off by its block loses the part.
   - Correct: `<BarBlocks unit="count" data={sources} … />`
   - Wrong: `<BarBlocks data={sources} … />`
6. bar-blocks-one-edge NEVER Give a block a solid fill, its own colour or its own edge through className; pass tone, and every block keeps a light fill, text-1 and the one --line edge. Because tone is a quiet fill and a word, every fill is checked for 4.5:1 text in both themes, a solid slab of yellow or ink outshouts the panel it sits in, and a coloured edge is a second code the reader has to learn.
   - Correct: `data={[{label: 'Archive', value: 300, tone: 'well'}]}`
   - Wrong: `<BarBlocks className="[&_li]:bg-primary [&_li]:border-accent-edge" … />`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `label` | `string` |  | The figure's caption: what is split, and when. |
| `data` | `{label: string; value: number; tone?: BarBlockTone}[]` |  | The parts, the one that matters first. |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | 90, 180 or 252px tall; the number is type-code and the name type-micro at every size. |
| `unit, valueFormat` | `'count' \| 'bytes' \| 'duration', (v: number) => string` | `exact` | How the numbers read. |
| `empty` | `ReactNode` |  | Shown when the parts sum to zero. |
Other props pass through to the figure element.

## Variants and states
- size: sm, default, lg
- parts: two, four, status
- states: empty

## Accessibility
- [ ] It is a figure with a list; each part reads its name, its value and its share ("Orders DB: 1.2M, 56% of the total").
- [ ] The printed number and the turned name are hidden from a screen reader, so each part is heard once.
- [ ] Text is text-1 on every plain tone and clears 4.5:1 in both themes: 16.5:1 on the yellow wash and 16.4:1 on the well in light, 11.7:1 and 14.5:1 in dark.

## Edge cases
- Tiny part -> Its block keeps a floor wide enough for its number, so widths stop being exact shares below it.
- Zero or negative part -> Left out; the empty state shows when nothing is left.
- Long name -> The turned name truncates up the block's height.
- Narrow width -> Four default blocks fit 390px; more overflow, so group them as Other.
- Dark theme -> The lead block takes the dark yellow wash and the rest the dark well, all with near-white text under the same --line edge.
- Right to left -> Blocks run from the right and wipe in from there.
- Reduced motion -> All blocks are there at once.

## Tokens
--selected, --well, --text-1, --line, --space-1, --fail-tint, --type-code, --type-micro, --dur-wipe

## Related
- [Chart](/systems/sodium/components/chart.md): Shows numbers over time as a line or an area.
- [Stem chart](/systems/sodium/components/stem-chart.md): Prints one value per period on a square-headed stem.
