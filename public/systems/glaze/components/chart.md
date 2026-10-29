---
name: Chart
system: glaze
kind: component
import: "import {Chart, unitFormat, ChartContainer, ChartPlot, ChartSwatch, WithChart, useChart, useOptionalChart, useElementWidth, useElementDirection, useRovingPoints, seriesTone, seriesClass, niceScale, formatCompact, numberAt, ChartTooltip, ChartTooltipContent, ChartTooltipRow, ChartDataTable, ChartLegend, chartLegendVariants, LineChart, monotonePath, linearPath, stepPath, BarChart, Sparkline, sparklineVariants, StatusBar, statusBarVariants, ChartFrame} from '@/components/glaze/ui/chart'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/chart.json"
registryDependencies: [button, data-units, direction, icon, portal, segmented-control, skeleton, status, theme, tooltip, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/chart
---

# Chart

Shows numbers over time or by bucket.

## Use when
- A number over time a person reads for its shape: calls per day, latency per hour.
- Counts per bucket, with failures stacked on top: runs by hour by outcome.
- A trend beside a number (sparkline), or the health of the last 30 days at a glance (status).

## Don't use when
- One number and its change; write the label and the number in the type roles.
- Exact values a person compares or copies. Use [Table](/systems/glaze/components/table.md).
- How far one task got. Use [Progress](/systems/glaze/components/progress.md).
- When each step of one run started and how long it took. Use [Timeline](/systems/glaze/components/timeline.md).

## Minimal example
```tsx
<Chart type="line" label="Calls" data={calls} xKey="day" unit="count"
  config={{day: {label: 'Day'}, calls: {label: 'Calls'}}}/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. chart-ink-series NEVER Give a series a colour to tell it apart; leave it ink, and let the second take ink at 60% and the third dashed on their own. Because colour means status in Glaze, so a blue or purple series reads as a state, and a fourth hue is a legend lookup on every glance.
   - Correct: `config={{large: {label: 'glaze-large'}, small: {label: 'glaze-small'}}}`
   - Wrong: `config={{large: {label: 'glaze-large', color: 'blue'}, small: {label: 'glaze-small', color: 'purple'}}}`
2. chart-status-series MUST Set status: 'fail', 'warn' or 'ok' only on a series that is that outcome, and stack it on the plain ink series. Because the failure bar then pops in coral against ink, and a green Passed series next to it would take the eye off the failures.
   - Correct: `{passed: {label: 'Passed'}, failed: {label: 'Failed', status: 'fail'}}`
   - Wrong: `{passed: {label: 'Passed', status: 'ok'}, failed: {label: 'Failed', status: 'fail'}}`
3. chart-label MUST Give every Chart a label that says what and over when: "Runs, last 30 days". Because it names the frame, the point group a keyboard tabs into and the data table a screen reader reads.
   - Correct: `<Chart type="bar" label="Runs by hour" …/>`
   - Wrong: `<Chart type="bar" label="Chart" …/>`
4. chart-unit MUST Pass unit="duration" (ms) or unit="count" with raw numbers instead of formatting values yourself. Because the axis, tooltip and table then share one unit from the largest value, so 950ms and 1.2s never sit on one axis.
   - Correct: `unit="duration"`
   - Wrong: `` valueFormat={v => v > 1000 ? `${v / 1000}s` : `${v}ms`} ``
5. chart-states MUST Pass loading, error with onRetry, and empty to the Chart; never swap it for a spinner or a paragraph. Because the chart holds its height and shows its own shape while it loads, so the page does not jump when the data lands.
   - Correct: `<Chart loading={loading} error={error && "Query timed out"} onRetry={refetch} empty="No runs yet" …/>`
   - Wrong: `{loading ? <Spinner/> : <Chart …/>}`
6. chart-no-box NEVER Put a frame="card" Chart inside a Card; use frame="plain" there, or let the chart be the card. Because a card around a card is two edges where one closes the group.
   - Correct: `<Chart type="line" title="Calls" …/>`
   - Wrong: `<Card><CardContent><Chart type="line" …/></CardContent></Card>`
7. chart-zero SHOULD Start a count's axis at zero (the default) and pass zero={false} only for values far from zero, like latency percentiles. Because a bar or a count line cut above zero makes a 5% change look like a doubling.
8. chart-legend SHOULD Leave the legend on for more than one series and off for one; the title already names a single series. Because the legend is the only key to which ink step is which, and a one-entry legend repeats the title.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `type` | `'line' \| 'bar' \| 'sparkline' \| 'status'` |  | The chart. |
| `label` | `string` |  | Names the frame, the points and the table. |
| `data` | `ChartRow[] \| (number \| null)[] \| StatusBarBucket[]` |  | Rows for line and bar, values for sparkline, buckets for status. |
| `xKey, config` | `string, ChartConfig` |  | Line and bar: the x field, and each series' label and optional status. |
| `frame` | `'card' \| 'plain' \| 'none'` | `'card'` | Shell, panel and footer row; no chrome; the bare drawing (the sparkline's default). |
| `title, description, actions` | `ReactNode` |  | The header; title defaults to label. |
| `unit` | `'duration' \| 'count'` |  | One unit for axis, tooltip and table. |
| `height` | `number` | `200` | px. Held in every state. |
| `loading, error, onRetry, retrying, empty` | `boolean, ReactNode, () => void, boolean, ReactNode` |  | The frame's states. |
| `legend, table, defaultHidden` | `boolean, boolean, string[]` |  | Line and bar: the footer legend, a Chart / Table switch, series off at first. |
| `curve, area, zero` | `'monotone' \| 'linear' \| 'step', boolean, boolean` | `'monotone', false, true` | Line. |
| `stacked` | `boolean` | `false` | Bar: stack the series, with a total in the tooltip. |
| `status, variant, end, interactive` | `ChartStatus, 'line' \| 'bar', boolean, boolean` | `, 'line', true, false` | Sparkline. |
| `noun, range, onBucketClick` | `[string, string], [ReactNode, ReactNode] \| false, (bucket, i) => void` |  | Status bar. |
Other props pass through to none: the props are the chart's; the parts (LineChart, BarChart, Sparkline, StatusBar, ChartLegend) are exported for a layout of your own.

## Variants and states
- type: line, bar, sparkline, status
- series: one, two, three, status
- frame: card, plain, none
- states: loading, empty, error
- when states meet, the first wins: loading > error > empty > ready

## Accessibility
- [ ] Each x value is a button named with its values ("Oct 4: Calls 466"), one tab stop for the group, arrow keys between them.
- [ ] Every chart carries its data as a table for a screen reader, an empty one too; table adds a visible copy behind a switch.
- [ ] Ink lines and bars are 11.9:1 and 5.5:1 on paper; a third series repeats a step dashed rather than dropping under 3:1.
- [ ] Colour is never the only sign: a status series is named in the legend and tooltip, a status bucket in its cell's name.
- [ ] The legend's buttons are toggles with aria-pressed; loading sets aria-busy and an error is a status region.

## Keyboard
- `Tab`: Enters the chart at its last point, then the legend.
- `Arrow keys`: Move between points and show each in the tooltip; Shift moves seven.
- `Home / End`: Go to the first or last point.
- `Escape`: Hides the tooltip.

## Edge cases
- Missing value -> A gap in the line, no bar, and None in the tooltip and table.
- One point -> A small square at the plot's centre.
- Many x labels -> They thin out to every nth so none overlaps; the last always shows.
- Narrow card -> The plot shrinks to fit and the labels thin; the height stays.
- Right to left -> x runs from the right, the y axis sits on the right and the arrow keys follow the screen.
- Dark theme -> Ink flips to near-white, the second step with it; status colours take their dark values.
- Forced colors -> Lines and bars draw in CanvasText; dashes and hollow bars keep series apart.

## Tokens
--ink, --ink-60, --text-1, --text-2, --text-inverse, --ok, --warn, --fail, --line-faint, --line, --line-strong, --hover, --field, --paper, --shell, --type-caption, --type-label-sm, --radius-tag, --control-sm, --stale, --z-overlay

## Related
- [Table](/systems/glaze/components/table.md): Lists records that share the same fields.
- [Timeline](/systems/glaze/components/timeline.md): Shows when each step of a run happened.
- [Progress](/systems/glaze/components/progress.md): Shows how far a task got.
