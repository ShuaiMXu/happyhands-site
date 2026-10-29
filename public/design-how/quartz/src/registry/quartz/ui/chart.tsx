'use client';

import {useEffect, useRef, useState, type ReactNode} from 'react';
import {cva} from 'class-variance-authority';
import {Icon, Renew, ChartLine, DataTable} from '@/components/quartz/icon';
import type {Kind} from '@/lib/quartz/kind';
import {useOffscreen} from '@/lib/quartz/use-offscreen';
import {cn} from '@/lib/quartz/utils';
import {CHART_EMPTY, EMPTY_VALUE} from '@/lib/quartz/format';
import {Button, ButtonSize} from '@/components/quartz/ui/button';
import {SegmentedControl, SegmentedControlItem} from '@/components/quartz/ui/segmented-control';
import {Status} from '@/components/quartz/ui/status';
import {
  ChartContainer, ChartDataTable, ChartLegend, ChartSwatch, ChartTooltip, ChartTooltipContent, ChartTooltipRow, WithChart,
  chartLegendVariants, inkSteps, seriesTone, useChart, useElementDirection, useElementWidth, useOptionalChart, useRovingPoints,
  type ChartConfig, type ChartContextValue, type ChartDataTableColumn, type ChartDataTableProps, type ChartDataTableRow,
  type ChartLegendProps, type ChartSeriesConfig, type ChartTooltipProps,
} from '@/components/quartz/ui/chart-parts';
import {BarChart, ChartPlot, LineChart, type BarChartProps, type ChartPlotProps, type ChartScale, type LineChartProps} from '@/components/quartz/ui/chart-plot';
import {formatCompact, linearPath, monotonePath, niceScale, numberAt, stepPath, unitFormat, type ChartRow, type ChartUnit, type Curve} from '@/components/quartz/ui/chart-scale';
import {Sparkline, StatusBar, sparklineVariants, statusBarVariants, type SparklineProps, type StatusBarBucket, type StatusBarProps} from '@/components/quartz/ui/chart-strip';

// Quartz's chart: one component, <Chart type="line" | "bar" | "sparkline" | "status">, with the frame
// (title, loading, error, retry, empty), the legend, the tooltip and the data table built in (was Line
// chart, Bar chart, Sparkline, Status bar, Chart frame, Chart legend, Chart tooltip and Chart data table).
// Drawn in plain SVG: no chart library. The parts stay exported for a chart that needs its own layout.
//
// Colour means a kind, or warn and fail, and nothing else. Every line draws in its line step (--accent-line),
// which clears 3:1 on paper and on the well for every kind and both statuses. A bar is its mark step with a 2px cap
// in the line step on its value end, so the 3:1 edge lives in the cap. A series with no kind is ink, then ink at
// 66%; past two, they repeat dashed, because ink at 45% is 2.9:1. The active point is a square: round means a person.
//
// The detail that comes from the job: a chart holds its exact height in every state, and its loading
// silhouette is its own type (bars for bar, a line for line, cells for status), so a dashboard of eight
// charts never jumps as they load, and a person can tell which chart is which before data arrives. The
// axis, tooltip and table share one unit picked from the largest value (unit="duration" or "count").
//
// ChartPlot is the cartesian frame line and bar share: nice y ticks, gridlines in ink at 5%, the zero
// line at 8%, x labels that thin out to fit, one focusable column per x value (roving tabindex, arrow
// keys), a crosshair or band highlight, the portalled tooltip and a screen-reader table.
//
// Every chart keeps its data table, empty ones too: a chart with no rows has a table with one row that
// says so. Under dir="rtl" each chart reads right to left: x runs from the right, the y axis sits on the
// right and the side arrows follow the screen.
//
// The files: chart-scale.ts (ticks, formats, paths), chart-parts.tsx (config, tone, hooks, tooltip, table,
// legend), chart-plot.tsx (ChartPlot, line, bar), chart-strip.tsx (sparkline, status bar) and this one, the
// frame and Chart. Import everything from here.

// ---------- Frame ----------

// panel is the chart as a widget, so it takes the Panel's anatomy (ui/panel.tsx): a grey outer with the frame edge, the
// 40px header and the legend on the grey, the description and the plot in a white bordered body 4px in. plain has no
// chrome, for a chart inside a stat or a block that has its frame. `card` is the old name for panel.
const panelFrame = 'overflow-hidden bg-(--surface-frame) frame forced-colors:outline forced-colors:outline-1';
const chartFrameVariants = cva('flex min-w-0 flex-col', {
  variants: {
    variant: {
      panel: panelFrame,
      card: panelFrame,
      plain: 'gap-4',
    },
  },
  defaultVariants: {variant: 'panel'},
});

type ChartFrameStyle = 'panel' | 'plain';

type ChartFrameProps = Omit<React.ComponentProps<'section'>, 'title'> & {
  /** panel: the widget anatomy, with the frame edge. plain: no chrome. */
  frame?: ChartFrameStyle | 'card';
  /** @deprecated Use `frame`. `card` is `panel`. */
  variant?: ChartFrameStyle | 'card';
  title: ReactNode;
  description?: ReactNode;
  /** Controls at the top right: a range select, a menu. */
  actions?: ReactNode;
  /** Under the chart, usually a ChartLegend. */
  footer?: ReactNode;
  /** px. The body's height in every state. */
  height?: number;
  loading?: boolean;
  /** What failed. Shows the error state instead of the chart. */
  error?: ReactNode;
  onRetry?: () => void;
  /** True while a retry is running. */
  retrying?: boolean;
  /** No data. Pass the sentence to show: "No runs in the last 24 hours". */
  empty?: ReactNode;
  /** The data as a visible table (a ChartDataTable with visible). Adds a Chart / Table switch. */
  table?: ReactNode;
  /** The loading silhouette's shape: the chart's own type. */
  shape?: 'bar' | 'line' | 'status' | 'sparkline';
  /** A chart of one kind. */
  kind?: Kind;
  /** The data is still arriving: a running status in the header. */
  live?: boolean;
};

const silhouette = [38, 52, 44, 66, 58, 72, 49, 61, 80, 68, 74, 90];

/** The loading shape of each chart type, still and in the skeleton fill, so the chart is recognisable before data. */
function Silhouette({shape}: {shape: 'bar' | 'line' | 'status' | 'sparkline'}) {
  if (shape === 'bar') return <>{silhouette.map((h, i) => <span key={i} aria-hidden className="flex-1 bg-(--surface-skeleton) forced-colors:bg-[GrayText]" style={{height: `${h}%`}}/>)}</>;
  if (shape === 'status') return <span aria-hidden className="flex h-(--row-sm) w-full gap-0.5 self-center">{Array.from({length: 30}, (_, i) => <span key={i} className="min-w-1 flex-1 bg-cell-quiet forced-colors:bg-[GrayText]"/>)}</span>;
  const points = silhouette.map((h, i) => `${(i / (silhouette.length - 1)) * 100},${100 - h}`).join(' ');
  return <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="size-full overflow-visible">
    <polyline points={points} fill="none" vectorEffect="non-scaling-stroke" strokeLinejoin="round" className="stroke-(--surface-skeleton) forced-colors:stroke-[GrayText]" style={{strokeWidth: shape === 'line' ? 'var(--space-1)' : 'var(--line-accent)'}}/>
  </svg>;
}

function ChartFrame({title, description, actions, footer, height = 200, loading, error, onRetry, retrying, empty, table, shape = 'bar', frame: frameProp, variant, kind, live, className, children, ...props}: ChartFrameProps) {
  const [view, setView] = useState<'chart' | 'table'>('chart');
  const state = loading ? 'loading' : error ? 'error' : empty ? 'empty' : 'ready';
  // Retry unmounts with the error. If it had focus, focus moves to the chart's title rather than the page.
  const titleRef = useRef<HTMLHeadingElement>(null);
  const retryFocused = useRef(false);
  useEffect(() => {
    if (state === 'error' || !retryFocused.current) return;
    retryFocused.current = false;
    if (!document.activeElement || document.activeElement === document.body) titleRef.current?.focus();
  }, [state]);
  const showTable = table && view === 'table' && state === 'ready';
  const card = (frameProp ?? variant ?? 'panel') !== 'plain';
  const frameRef = useOffscreen<HTMLElement>(!!live && card);

  return <section
    ref={frameRef}
    data-slot="chart-frame"
    data-state={state}
    data-kind={kind}
    data-status={state === 'error' ? 'fail' : undefined}
    aria-busy={loading || undefined}
    className={cn(chartFrameVariants({variant: card ? 'panel' : 'plain'}), className)}
    {...props}
  >
    <header data-slot="chart-frame-header" className={cn(card ? 'frame-head justify-between' : 'flex min-w-0 flex-wrap items-center justify-between gap-x-4 gap-y-2')}>
      <div className="flex min-w-0 flex-col gap-0.5">
        <h3 ref={titleRef} tabIndex={-1} data-slot="chart-frame-title" className={cn('type-label text-text-1', card && 'truncate')}>{title}</h3>
        {description && !card && <p data-slot="chart-frame-description" className="type-body-sm text-text-3">{description}</p>}
      </div>
      {(actions || table || live) && <div data-slot="chart-frame-actions" className="flex shrink-0 items-center gap-2">
        <ButtonSize size="xs">
          {live && <Status status="running" label="Live"/>}
          {actions}
        </ButtonSize>
        {table && <SegmentedControl size="xs" aria-label="View" value={view} onValueChange={next => setView(next as 'chart' | 'table')}>
          <SegmentedControlItem value="chart" aria-label="Chart"><Icon icon={ChartLine} size={16}/></SegmentedControlItem>
          <SegmentedControlItem value="table" aria-label="Table"><Icon icon={DataTable} size={16}/></SegmentedControlItem>
        </SegmentedControl>}
      </div>}
    </header>
    <div data-slot={card ? 'chart-frame-inset' : undefined} className={cn(card && 'frame mx-1 mb-1 min-w-0 bg-page [--frame-color:var(--line-row)] [--frame-radius:calc(var(--radius-frame)-4px)] has-[+[data-slot=chart-frame-footer]]:mb-0')}>
    {description && card && <p data-slot="chart-frame-description" className="px-4 pt-3 type-body-sm text-text-3">{description}</p>}
    <div data-slot="chart-frame-plot" className={cn('min-w-0', card && 'px-4 pt-3 pb-4')}>
    <div data-slot="chart-frame-body" className="relative min-w-0" style={showTable ? undefined : {height}}>
      {state === 'loading' && <div data-slot="chart-frame-loading" data-shape={shape} className="flex h-full items-end gap-1">
        <span className="sr-only">Loading {typeof title === 'string' ? title : 'chart'}</span>
        <Silhouette shape={shape}/>
      </div>}
      {/* Top-left in the chart's own frame, which keeps its height. */}
      {state === 'error' && <div role="status" className="flex h-full flex-col items-start gap-3 pt-1">
        <Status status="fail">{error}</Status>
        {onRetry && <Button size="sm" variant="secondary" pending={!!retrying} onFocus={() => { retryFocused.current = true; }} onBlur={event => { if (event.relatedTarget) retryFocused.current = false; }} onClick={onRetry}><Icon icon={Renew} size={16}/>Retry</Button>}
      </div>}
      {state === 'empty' && <div className="relative h-full type-body text-text-2">
        {empty}
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-line-row"/>
      </div>}
      {state === 'ready' && (showTable ? table : children)}
    </div>
    </div>
    </div>
    {/* The footer keeps its room in every state, so the legend landing never moves what is below. */}
    {footer && !showTable && <footer data-slot="chart-frame-footer" aria-hidden={state !== 'ready' || undefined} inert={state !== 'ready' || undefined} className={cn('min-w-0', card && 'px-2 py-1.5', state !== 'ready' && 'invisible')}>{footer}</footer>}
  </section>;
}

// ---------- Chart ----------

type ChartCommon = {
  /** The chart's name: the frame title, the point group and the data table caption. */
  label: string;
  /** Shown above the chart. Leave out for a chart with no frame header. */
  title?: ReactNode;
  description?: ReactNode;
  /** Controls at the top end of the frame: a range select. */
  actions?: ReactNode;
  /** panel: the chart as a widget, in the Panel's anatomy (grey outer with the frame edge, white body). plain: no chrome, inside a stat or a block's frame. none: no frame at all (sparkline default). */
  frame?: 'panel' | 'plain' | 'none' | 'card';
  /** A chart of one kind ("Runs, 30 days" is run). */
  kind?: Kind;
  /** The data is still arriving: a running status in the header. */
  live?: boolean;
  /** px. The body holds it in every state. */
  height?: number;
  loading?: boolean;
  /** What failed. Shows the error state with Retry when onRetry is set. */
  error?: ReactNode;
  onRetry?: () => void;
  retrying?: boolean;
  /** The sentence for no data. Shown when data is empty. */
  empty?: ReactNode;
  /** Axis, tooltip and table share one unit picked from the largest value. */
  unit?: ChartUnit;
  valueFormat?: (value: number) => string;
  className?: string;
};

type CartesianChartProps = ChartCommon & {
  type: 'line' | 'bar';
  data: ChartRow[];
  /** The field that names each row on the x axis. */
  xKey: string;
  config: ChartConfig;
  series?: string[];
  xFormat?: (value: unknown, index: number) => string;
  /** Show the legend under the chart. On when there is more than one series. */
  legend?: boolean;
  /** Add a Chart / Table switch to the frame. */
  table?: boolean;
  /** Series switched off at first. */
  defaultHidden?: string[];
  /** line */
  curve?: Curve;
  area?: boolean;
  zero?: boolean;
  /** bar */
  stacked?: boolean;
};

type SparklineChartProps = ChartCommon & Omit<SparklineProps, 'label' | 'className' | 'size' | 'valueFormat'> & {
  type: 'sparkline';
  size?: SparklineProps['size'];
};

type StatusChartProps = ChartCommon & Omit<StatusBarProps, 'label' | 'className' | 'size' | 'data' | 'unit'> & {
  type: 'status';
  data: StatusBarBucket[];
  size?: StatusBarProps['size'];
  /** The noun for a bucket's count, singular and plural: ['run', 'runs']. */
  noun?: [string, string];
};

type ChartProps = CartesianChartProps | SparklineChartProps | StatusChartProps;

/** One chart: line, bar, sparkline or status buckets, with its frame states, legend, tooltip and table. */
function Chart(props: ChartProps) {
  const {type, label, title, description, actions, height, loading, error, onRetry, retrying, empty, unit, className} = props;
  const frameKind = props.type === 'line' || props.type === 'bar' ? props.kind : undefined;
  const live = props.live;
  const frameProp = props.frame ?? (type === 'sparkline' ? 'none' : 'panel');
  // `card` is the old name for panel.
  const frame = frameProp === 'card' ? 'panel' : frameProp;
  let values: number[];
  if (props.type === 'line' || props.type === 'bar') {
    const keys = props.series ?? Object.keys(props.config);
    values = [];
    for (const row of props.data as ChartRow[]) for (const key of keys) { const v = numberAt(row, key); if (v !== null) values.push(v); }
  } else if (props.type === 'sparkline') values = props.data.filter((v): v is number => typeof v === 'number');
  else values = (props.data as StatusBarBucket[]).map(b => b.count);
  const format = props.valueFormat ?? unitFormat(unit, values);
  const isEmpty = !loading && !error && props.data.length === 0;
  // An empty chart still has its table, one row saying so, for a screen reader; the sentence it shows is
  // hidden from one, so it is heard once.
  const emptyText = empty ?? CHART_EMPTY;
  const emptyColumns = props.type === 'line' || props.type === 'bar'
    ? (props.series ?? Object.keys(props.config)).map(key => ({key, label: props.config[key]?.label ?? key}))
    : props.type === 'status' ? [{key: 'count', label: 'Count'}, {key: 'status', label: 'Status'}] : [{key: 'v', label}];
  const emptyState = isEmpty
    ? <><span aria-hidden>{emptyText}</span><ChartDataTable caption={label} rowHeader={props.type === 'line' || props.type === 'bar' ? props.config[props.xKey]?.label ?? 'Date' : props.type === 'status' ? 'Bucket' : 'Point'} columns={emptyColumns} rows={[]} empty={emptyText}/></>
    : undefined;
  const bodyHeight = height ?? (type === 'status' ? (props.size === 'sm' ? 16 : props.size === 'lg' ? 40 : 32) + 24 : type === 'sparkline' ? 24 : 200);

  let chart: ReactNode;
  let footer: ReactNode = null;
  let tableNode: ReactNode = null;
  if (type === 'line' || type === 'bar') {
    const {data, xKey, config, series, xFormat, curve, area, zero, stacked, defaultHidden} = props;
    const shown = series ?? Object.keys(config);
    const showLegend = props.legend ?? shown.length > 1;
    chart = type === 'line'
      ? <LineChart data={data} xKey={xKey} series={series} label={label} height={bodyHeight} curve={curve} area={area} zero={zero} xFormat={xFormat} valueFormat={format} empty={empty}/>
      : <BarChart data={data} xKey={xKey} series={series} label={label} height={bodyHeight} stacked={stacked} xFormat={xFormat} valueFormat={format} empty={empty}/>;
    if (showLegend) footer = <ChartLegend series={series}/>;
    if (props.table) {
      const f = format ?? formatCompact;
      tableNode = <ChartDataTable visible caption={label} rowHeader={config[xKey]?.label ?? 'Date'} columns={shown.map(key => ({key, label: config[key]?.label ?? key}))}
        rows={data.map((row, i) => ({key: String(i), label: (xFormat ?? (v => String(v)))(row[xKey], i), values: Object.fromEntries(shown.map(key => { const v = numberAt(row, key); return [key, v === null ? EMPTY_VALUE : f(v)]; }))}))}/>;
    }
    const inner = <ChartFrame title={title ?? label} description={description} actions={actions} footer={footer} height={bodyHeight} loading={loading} error={error} onRetry={onRetry} retrying={retrying} empty={emptyState} table={tableNode} shape={type} frame={frame === 'panel' ? 'panel' : 'plain'} kind={frameKind} live={live} data-chart-type={type} className={className}>{chart}</ChartFrame>;
    return <ChartContainer config={config} defaultHidden={defaultHidden} className="min-w-0">{inner}</ChartContainer>;
  }

  if (props.type === 'sparkline') {
    const {data, kind, variant, area, end, labels, interactive, size} = props;
    chart = <Sparkline data={data} label={label} kind={kind} variant={variant} area={area} end={end} labels={labels} interactive={interactive} size={size} valueFormat={format} className={frame === 'none' ? className : 'w-full'}/>;
  } else if (props.type === 'status') {
    const {data, kind, noun, range, onBucketClick, size} = props;
    chart = <StatusBar data={data} label={label} kind={kind} unit={noun} range={range} onBucketClick={onBucketClick} size={size} className={frame === 'none' ? className : undefined}/>;
  }
  if (frame === 'none') {
    if (loading) return <span data-slot="chart-frame-loading" data-shape={type} aria-busy className={cn('inline-flex', type === 'sparkline' ? 'h-(--control-xs) w-24' : 'h-(--row-sm) w-full', className)} style={{height: type === 'status' ? bodyHeight - 24 : undefined}}><span className="sr-only">Loading {label}</span><Silhouette shape={type}/></span>;
    return chart;
  }
  return <ChartFrame title={title ?? label} description={description} actions={actions} height={bodyHeight} loading={loading} error={error} onRetry={onRetry} retrying={retrying} empty={emptyState} shape={type} frame={frame === 'panel' ? 'panel' : 'plain'} kind={props.kind} live={live} data-chart-type={type} className={className}>{chart}</ChartFrame>;
}

export {
  Chart, unitFormat,
  ChartContainer, ChartPlot, ChartSwatch, WithChart, useChart, useOptionalChart, useElementWidth, useElementDirection, useRovingPoints,
  seriesTone, inkSteps, niceScale, formatCompact, numberAt,
  ChartTooltip, ChartTooltipContent, ChartTooltipRow,
  ChartDataTable,
  ChartLegend, chartLegendVariants,
  LineChart, monotonePath, linearPath, stepPath,
  BarChart,
  Sparkline, sparklineVariants,
  StatusBar, statusBarVariants,
  ChartFrame, chartFrameVariants,
  type ChartProps, type ChartUnit, type ChartConfig, type ChartSeriesConfig, type ChartContextValue, type ChartRow, type ChartScale, type ChartPlotProps,
  type ChartTooltipProps, type ChartDataTableProps, type ChartDataTableColumn, type ChartDataTableRow, type ChartLegendProps,
  type LineChartProps, type Curve, type BarChartProps, type SparklineProps, type StatusBarProps, type StatusBarBucket, type ChartFrameProps,
};
