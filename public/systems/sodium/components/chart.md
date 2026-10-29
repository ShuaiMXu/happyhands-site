---
name: Chart
system: sodium
kind: component
import: "import {Chart, ChartFrame, ChartPlot, LineChart, ChartContainer, WithChart, useChart, useOptionalChart, useElementWidth, useElementDirection, useRovingPoints, useDrawn, seriesTone, ChartSwatch, ChartTooltip, ChartTooltipContent, ChartTooltipRow, ChartDataTable, ChartLegend, niceScale, tickCount, formatCompact, formatExact, unitFormat, numberAt, linearPath, stepPath, wipeStyle, drawStyle} from '@/components/sodium/ui/chart'
import {toneClass, toneFill, toneArea} from '@/components/sodium/ui/chart-parts'
import {EMPTY_VALUE, CHART_EMPTY} from '@/components/sodium/ui/chart-scale'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/chart.json"
registryDependencies: [button, direction, portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/chart
---

# Chart

Shows numbers over time as a line or an area.

## Use when
- A number over time a person reads for its shape: rows loaded per day, query time per hour.
- Two to four series of one unit on one axis: p50 and p95, primary and replica.
- A count with its failures, the failures as a status series.

## Don't use when
- A short run of periods read value by value, each printed. Use [Stem chart](/systems/sodium/components/stem-chart.md).
- One total split into named parts. Use [Bar blocks](/systems/sodium/components/bar-blocks.md).
- The order of steps across systems. Use [Swimlanes](/systems/sodium/components/swimlanes.md).
- One number and its change; write the label and the number in the type roles.

## Minimal example
```tsx
<Chart label="Rows loaded, last 14 days" data={rows} xKey="day" unit="count"
  config={{day: {label: 'Day'}, rows: {label: 'Rows loaded'}}}/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. chart-one-accent MUST Leave one series yellow, the one the chart is about: the first by default, accent="key" to move it, accent={false} for a chart with none. Because yellow marks the one thing that matters in Sodium, so two yellow series split the eye and a page of yellow charts says nothing.
   - Correct: `<Chart accent="p95" … /> beside <Chart accent={false} … />`
   - Wrong: `<Chart accent="p95" … /> beside <Chart accent="p50" … /> for one question`
2. chart-no-hues NEVER Give a series a colour to tell it apart; the rest are ink, then text-3, then both dashed, on their own. Because Sodium has one yellow and three status colours, so a blue series reads as a state and a fifth hue is a legend lookup on every glance.
   - Correct: `config={{main: {label: 'Primary'}, replica: {label: 'Replica'}}}`
   - Wrong: `config={{main: {label: 'Primary', color: 'blue'}, replica: {label: 'Replica', color: 'purple'}}}`
3. chart-status-series MUST Set status: 'fail', 'warn' or 'ok' only on a series that is that outcome, and leave its partner plain. Because the failures then show red against ink, and a green Finished series beside them pulls the eye off the failures.
   - Correct: `{finished: {label: 'Finished'}, failed: {label: 'Failed', status: 'fail'}}`
   - Wrong: `{finished: {label: 'Finished', status: 'ok'}, failed: {label: 'Failed', status: 'fail'}}`
4. chart-label MUST Give every Chart a label that says what and over when: "Rows loaded, last 14 days". Because it names the frame, the point group a keyboard tabs into and the data table a screen reader reads.
   - Correct: `<Chart label="Query time, last 14 days" … />`
   - Wrong: `<Chart label="Chart" … />`
5. chart-unit MUST Pass unit="duration" (ms), "count" or "bytes" with raw numbers instead of formatting values yourself. Because the axis, readout and table then share one unit from the largest value, so 950ms and 1.2s never sit on one axis.
   - Correct: `unit="duration"`
   - Wrong: `` valueFormat={v => v > 1000 ? `${v / 1000}s` : `${v}ms`} ``
6. chart-states MUST Pass loading, error with onRetry, and empty to the Chart; never swap it for a spinner or a paragraph. Because the chart holds its height and its outline while it loads, so a page of charts does not jump when the data lands.
   - Correct: `<Chart loading={loading} error={error && "Query timed out."} onRetry={refetch} … />`
   - Wrong: `{loading ? <Spinner/> : <Chart … />}`
7. chart-no-box NEVER Put a frame="frame" Chart inside another frame or panel; use frame="plain" there, or let the chart be the region. Because Sodium boxes a region once and divides inside it with rules, so a frame in a frame is two edges where one closes the group.
   - Correct: `<section className="frame"><Chart frame="plain" … /></section>`
   - Wrong: `<section className="frame"><Chart … /></section>`
8. chart-zero SHOULD Start a count's axis at zero (the default) and pass zero={false} only for values far from zero, like latency percentiles. Because a count line cut above zero makes a 5% change look like a doubling.
9. chart-area SHOULD Use type="area" for one series, or to fill under the yellow series of several; the other lines stay lines. Because two filled areas cover each other, and the fill is the yellow series' weight.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `type` | `'line' \| 'area'` | `'line'` | area fills under the yellow series down to zero. |
| `label` | `string` |  | Names the frame, the points and the table. |
| `data, xKey, config` | `ChartRow[], string, ChartConfig` |  | Rows, the x field, and each series' label and optional status or dashed. |
| `accent` | `string \| false` | `first series` | The one yellow series; false for none. |
| `frame` | `'frame' \| 'plain'` | `'frame'` | The region's edge with a panel-head and a ruled legend; or no chrome. |
| `title, value, description, actions` | `ReactNode` |  | The head: title defaults to label; value is the big number the chart explains. |
| `unit` | `'duration' \| 'count' \| 'bytes'` |  | One unit for axis, readout and table. |
| `height` | `number` | `200` | px. Held in every state. |
| `loading, error, onRetry, retrying, empty` | `boolean, ReactNode, () => void, boolean, ReactNode` |  | The frame's states. |
| `legend, defaultHidden` | `boolean, string[]` | `more than one series` | The legend under the plot; series off at first. |
| `curve, zero` | `'linear' \| 'step', boolean` | `'linear', true` | Straight or stepped segments; a y axis from zero. |
Other props pass through to none: the props are the chart's; the parts (LineChart, ChartPlot, ChartFrame, ChartLegend) are exported for a layout of your own.

## Variants and states
- type: line, area
- series: one, two, three, status
- frame: frame, plain
- states: loading, empty, error
- when states meet, the first wins: loading > error > empty > ready

## Accessibility
- [ ] Each x value is a button named with its values ("Oct 4: Rows loaded 214.3K"), one tab stop for the group, arrow keys between them.
- [ ] Every chart carries its data as a table for a screen reader, an empty one too.
- [ ] The yellow series draws in --accent-text, 6.2:1 on white, never in solid yellow; its heads and area are yellow edged in that line.
- [ ] Ink lines are 18.3:1 and 5.6:1; a third series repeats a step dashed rather than dropping under 3:1.
- [ ] A status series is named in the legend, the readout and the table, so colour is never the only sign.
- [ ] The legend's buttons are toggles with aria-pressed, the filled or empty square showing the state; loading sets aria-busy and an error is a status region.

## Keyboard
- `Tab`: Enters the chart at its last point, then the legend.
- `Arrow keys`: Move between points and show each in the readout; Shift moves seven.
- `Home / End`: Go to the first or last point.
- `Escape`: Hides the readout.

## Edge cases
- Missing value -> A gap in the line and None in the readout and table.
- One point -> A small square at the plot's centre.
- Many x labels -> They thin out to every nth so none overlaps; the last always shows.
- Short chart -> One y interval per 28px of plot, four at most, so labels never crowd.
- Right to left -> x runs from the right, the y axis sits on the right and the arrow keys follow the screen.
- Dark theme -> The yellow series turns yellow on the near-black page; ink flips to near-white.
- Reduced motion -> The line and the area are there at once; nothing draws or wipes.
- Forced colors -> Lines draw in CanvasText and the area drops; dashes keep series apart.

## Tokens
--data-1, --accent-text, --text-1, --text-2, --text-3, --fail, --ok, --warn, --line-faint, --line, --line-control, --panel, --type-micro, --type-code-sm, --type-label, --type-label-sm, --type-figure, --dur-draw, --dur-wipe, --z-overlay

## Related
- [Stem chart](/systems/sodium/components/stem-chart.md): Prints one value per period on a square-headed stem.
- [Bar blocks](/systems/sodium/components/bar-blocks.md): Splits one total into its parts as blocks as wide as their share.
- [Swimlanes](/systems/sodium/components/swimlanes.md): Shows the steps of a flow across the systems they run in.
