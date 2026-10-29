---
name: Stem chart
system: sodium
kind: component
import: "import {StemChart} from '@/components/sodium/ui/stem-chart'"
install: "npx shadcn@latest add https://design.how/r/sodium/stem-chart.json"
registryDependencies: [chart, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/stem-chart
---

# Stem chart

Prints one value per period on a square-headed stem.

## Use when
- A short run of periods a person reads value by value: jobs per month, loads per day this week.
- The one figure a panel is about, under its big number, where every value should be on the page.

## Don't use when
- More than about 14 periods, or several series. Use [Chart](/systems/sodium/components/chart.md).
- One total split into named parts. Use [Bar blocks](/systems/sodium/components/bar-blocks.md).

## Minimal example
```tsx
<StemChart label="Jobs run, Jul to Dec" data={runs} xKey="month" valueKey="runs" valueLabel="Jobs run"/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. stem-chart-one-accent MUST Give the yellow heads (tone="accent", the default) to one stem chart in a view, the one the view is about; set tone="ink" on the rest. Because yellow marks the one thing that matters, so a row of yellow stem charts gives the eye nowhere to land.
   - Correct:
     ```tsx
     <StemChart … />
     <StemChart tone="ink" … />
     ```
   - Wrong:
     ```tsx
     <StemChart … />
     <StemChart … />
     ```
2. stem-chart-periods MUST Keep it to 3 to 14 periods; past that use Chart. Because every value is printed on a quarter turn, and past 14 the printed values touch at phone width.
   - Correct: `<Chart data={last90Days} … />`
   - Wrong: `<StemChart data={last90Days} … />`
3. stem-chart-label MUST Give every stem chart a label that says what and over when, and a valueLabel for the table. Because the label names the point group a keyboard tabs into and the table a screen reader reads, where Value means nothing.
   - Correct: `<StemChart label="Jobs run, Jul to Dec" valueLabel="Jobs run" … />`
   - Wrong: `<StemChart label="Chart" … />`
4. stem-chart-short-periods MUST Name periods in three or four characters (Jul, Mon, 14:00); the label role sets the capitals. Because the period names turn a quarter, and a long name takes the plot's height from the stems.
   - Correct: `xFormat={m => m.toLocaleString('en', {month: 'short'})}`
   - Wrong: `xFormat={m => m.toLocaleString('en', {month: 'long'})}`
5. stem-chart-no-hues NEVER Colour single stems to call them out; the heads carry one tone for the whole chart. Because a red or green head reads as a status the data does not have, and the printed value already says which is high.
   - Correct: `<StemChart … />`
   - Wrong: `<StemChart className="[&_[data-slot=stem]:nth-child(4)_rect]:fill-fail" … />`
6. stem-chart-unit SHOULD Leave values exact (1,925) unless they pass five characters; then pass unit to compact them. Because the printed value is the point of the chart, so it rounds only when it would not fit its quarter turn.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `label` | `string` |  | Names the point group and the table. |
| `data, xKey, valueKey` | `ChartRow[], string, string` |  | One row per period. |
| `xLabel, valueLabel` | `string` | `'Period', 'Value'` | The table's column heads. |
| `tone` | `'accent' \| 'ink'` | `'accent'` | Yellow heads for the one chart that matters; ink for the rest. |
| `area` | `boolean` | `true` | The well under the line through the heads. |
| `height` | `number` | `240` | px, labels included. |
| `valueFormat, unit` | `(v: number) => string, 'duration' \| 'count' \| 'bytes'` | `exact` | How the printed values read. |
Other props pass through to none.

## Variants and states
- tone: accent, ink
- periods: 6, 12
- states: missing value, empty

## Accessibility
- [ ] Each stem is a button named with its period and value ("Oct: 140"), one tab stop for the group, arrow keys between them.
- [ ] The data is a table for a screen reader; the printed values and the drawing are hidden from it, so each is heard once.
- [ ] Accent heads are yellow edged in --accent-text, 6.2:1 on white; ink heads are 18.3:1. The stems are --data-3, 3.1:1.
- [ ] The printed values are text-2 (7.8:1) and the periods text-3 (5.6:1).

## Keyboard
- `Tab`: Enters the chart at its last stem.
- `Arrow keys`: Move between stems; Shift moves seven.
- `Home / End`: Go to the first or last stem.

## Edge cases
- Missing value -> No head and no stem; the area breaks there and the printed value and table say None.
- Narrow width -> Stems close up; the quarter-turned labels keep fitting down to 14 periods at 390px.
- Long values -> The top room grows with the longest printed value, and the plot shortens to fit.
- Right to left -> Periods run from the right and the arrow keys follow the screen.
- Dark theme -> Accent heads stay sodium yellow, edged in yellow; stems take the dark khaki.
- Reduced motion -> Stems, heads and area are there at once.
- Forced colors -> Stems and heads draw in CanvasText and the area drops.

## Tokens
--data-1, --data-3, --accent-text, --text-1, --text-2, --text-3, --well, --line, --line-faint, --marker, --type-micro, --type-code-sm, --dur-wipe, --dur-draw

## Related
- [Chart](/systems/sodium/components/chart.md): Shows numbers over time as a line or an area.
- [Bar blocks](/systems/sodium/components/bar-blocks.md): Splits one total into its parts as blocks as wide as their share.
