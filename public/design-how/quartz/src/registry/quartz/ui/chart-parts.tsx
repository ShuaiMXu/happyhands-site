'use client';

import {createContext, memo, useCallback, useContext, useId, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode} from 'react';
import {createPortal} from 'react-dom';
import {cva, type VariantProps} from 'class-variance-authority';
import type {Kind} from '@/lib/quartz/kind';
import {useQuartzPortal} from '@/lib/quartz/portal';
import {useDomDirection} from '@/lib/quartz/direction';
import {useScrollTabStop} from '@/lib/quartz/scroll-focus';
import {cn} from '@/lib/quartz/utils';
import {CHART_EMPTY, EMPTY_VALUE} from '@/lib/quartz/format';

// The pieces every Quartz chart shares: the config and legend state (ChartContainer), each series' tone and
// swatch, the measuring and roving-focus hooks, the tooltip, the data table and the legend. chart.tsx
// re-exports all of it; this file is where it lives.

type ChartSeriesConfig = {
  /** The series name, in the legend, tooltip, table and every point's accessible name. */
  label: string;
  /** The kind this series shows. Sets its hue. Leave out and the series is ink at a stepped alpha. */
  kind?: Kind;
  /** A series of trouble (retried, failed runs) takes a reserved hue instead of a kind's. */
  status?: 'warn' | 'fail';
  /**
   * Draw the line dashed, with a hollow swatch: a cue that does not depend on hue. Use it when two series
   * on one chart have hues that are hard to tell apart at 2px, like agent and model.
   */
  dashed?: boolean;
};

type ChartConfig = Record<string, ChartSeriesConfig>;

type ChartContextValue = {
  config: ChartConfig;
  keys: string[];
  /** Series switched off in the legend. */
  hidden: ReadonlySet<string>;
  toggle: (key: string) => void;
  /** The series the legend is pointing at; the others dim. */
  highlight: string | null;
  setHighlight: (key: string | null) => void;
};

const ChartContext = createContext<ChartContextValue | null>(null);

/** The config, hidden series and highlight of the nearest ChartContainer. Throws outside one. */
function useChart() {
  const context = useContext(ChartContext);
  if (!context) throw new Error('useChart must be used within a <ChartContainer/>');
  return context;
}

function useOptionalChart() {
  return useContext(ChartContext);
}

type ChartContainerProps = React.ComponentProps<'div'> & {
  config: ChartConfig;
  /** Series that start switched off. */
  defaultHidden?: string[];
};

/** Holds the config and the legend state for the charts and legend inside it. */
function ChartContainer({config, defaultHidden, className, children, ...props}: ChartContainerProps) {
  const [hidden, setHidden] = useState<ReadonlySet<string>>(() => new Set(defaultHidden));
  const [highlight, setHighlight] = useState<string | null>(null);
  const toggle = useCallback((key: string) => setHidden(prev => {
    const next = new Set(prev);
    if (next.has(key)) next.delete(key); else next.add(key);
    return next;
  }), []);
  const value = useMemo(() => ({config, keys: Object.keys(config), hidden, toggle, highlight, setHighlight}), [config, hidden, toggle, highlight]);
  return <ChartContext.Provider value={value}>
    <div data-slot="chart" className={cn('flex w-full min-w-0 flex-col gap-4', className)} {...props}>{children}</div>
  </ChartContext.Provider>;
}

/** Wraps a chart in its own container when it was given a config and is not inside one. */
function WithChart({config, children}: {config?: ChartConfig; children: ReactNode}) {
  const context = useOptionalChart();
  if (context || !config) return children;
  return <ChartContainer config={config}>{children}</ChartContainer>;
}

// ---------- Tone ----------

/**
 * Ink steps for series with no kind. Only ink (17:1) and --chart-ink-2 (5.6:1) clear 3:1 on paper; ink at
 * 45% is 2.9:1, so a third and fourth kind-less series reuse the two steps with a dashed line instead.
 * Measured with ds-explore/color.mjs over paper and the grey card.
 */
const inkSteps = ['var(--ink)', 'var(--chart-ink-2)'] as const;

/** data-kind or data-status, the ink step and the dash for one series. Spread it on what draws the series. */
function seriesTone(config: ChartConfig, key: string): {'data-kind'?: Kind; 'data-status'?: 'warn' | 'fail'; 'data-dashed'?: ''; style?: CSSProperties} {
  const {kind, status, dashed: forced} = config[key] ?? {};
  const dash = forced ? {'data-dashed': '' as const} : {};
  if (status) return {'data-status': status, ...dash};
  if (kind) return {'data-kind': kind, ...dash};
  const inkIndex = Math.max(0, Object.keys(config).filter(k => !config[k].kind && !config[k].status).indexOf(key));
  const step = inkSteps[inkIndex % 2];
  const dashed = inkIndex >= 2 || forced ? {'data-dashed': '' as const} : {};
  return inkIndex % 2 === 0 ? dashed : {...dashed, style: {'--accent-mark': step, '--accent-line': step} as CSSProperties};
}

/** The series' square: 8px, square corners, the same mark as a status dot. */
function ChartSwatch({config, series, className}: {config: ChartConfig; series: string; className?: string}) {
  const tone = seriesTone(config, series);
  // The swatch is the series' line step, the colour that draws it; a dashed series shows a hollow square.
  return <span
    data-slot="chart-swatch"
    aria-hidden
    {...tone}
    className={cn('inline-block size-(--mark-size) shrink-0 forced-colors:bg-[CanvasText]', tone['data-dashed'] !== undefined ? 'shadow-[inset_0_0_0_2px_var(--accent-line)]' : 'bg-accent-line', className)}
  />;
}

// ---------- Hooks ----------

/** The width of an element, kept current with a ResizeObserver. 0 until it mounts. */
function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(el.clientWidth);
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, width] as const;
}

/**
 * The element's own reading direction, so a chart under dir="rtl" mirrors whether or not a
 * DirectionProvider says so. 'ltr' until it mounts; read again only when a dir attribute changes.
 */
function useElementDirection(ref: React.RefObject<HTMLElement | null>): 'ltr' | 'rtl' {
  return useDomDirection(ref);
}

/**
 * Roving focus over a row of points. One point is in the tab order; arrow keys, Home and End move it.
 * In a right-to-left chart the side arrows follow the screen: Right moves to the point on the right.
 * Returns the key handler and the tabIndex for each index.
 */
function useRovingPoints(count: number, onMove: (index: number, el: HTMLElement | null) => void) {
  const [current, setCurrent] = useState(count - 1);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const safe = Math.min(Math.max(current, 0), count - 1);
  const move = (index: number) => {
    const next = Math.min(Math.max(index, 0), count - 1);
    setCurrent(next);
    const el = refs.current[next];
    el?.focus();
    onMove(next, el ?? null);
  };
  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const step = event.shiftKey ? 7 : 1;
    // Points run right to left in a right-to-left chart, so the side arrows swap; up and down keep their order.
    const back = getComputedStyle(event.currentTarget).direction === 'rtl' ? -1 : 1;
    const keys: Record<string, number> = {ArrowRight: index + step * back, ArrowDown: index + step, ArrowLeft: index - step * back, ArrowUp: index - step, Home: 0, End: count - 1};
    if (!(event.key in keys)) return;
    event.preventDefault();
    move(keys[event.key]);
  };
  return {
    current: safe,
    setCurrent,
    onKeyDown,
    tabIndex: (index: number) => (index === safe ? 0 : -1),
    ref: (index: number) => (el: HTMLElement | null) => { refs.current[index] = el; },
  };
}

// ---------- Tooltip ----------

const GAP = 8;
const EDGE = 8;

type ChartTooltipProps = {
  /** The point to point at, in viewport (client) pixels. null hides the tooltip. */
  anchor: {x: number; y: number} | null;
  children?: ReactNode;
  className?: string;
};

function ChartTooltip({anchor, children, className}: ChartTooltipProps) {
  const container = useQuartzPortal();
  const ref = useRef<HTMLDivElement>(null);
  const [place, setPlace] = useState<{left: number; top: number; side: 'top' | 'bottom'} | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!anchor || !el) { setPlace(null); return; }
    const {width, height} = el.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const side = anchor.y - GAP - height < EDGE ? 'bottom' : 'top';
    const top = side === 'top' ? anchor.y - GAP - height : anchor.y + GAP;
    const left = Math.min(Math.max(anchor.x - width / 2, EDGE), vw - width - EDGE);
    setPlace({left, top, side});
  }, [anchor, children]);

  if (!anchor || container === null) return null;
  const tooltip = <div
    ref={ref}
    data-slot="chart-tooltip"
    data-surface="inverse"
    data-side={place?.side}
    aria-hidden
    className={cn(
      'pointer-events-none fixed z-(--z-overlay) flex min-w-36 max-w-(--tooltip-max) flex-col gap-1.5 rounded-soft bg-page px-3 py-2 text-text-1 shadow-overlay',
      !place && 'invisible',
      className,
    )}
    style={{left: place?.left ?? 0, top: place?.top ?? 0}}
  >{children}</div>;
  return container ? createPortal(tooltip, container) : tooltip;
}

/** A title (the x value) over the rows. */
function ChartTooltipContent({title, children, className}: {title?: ReactNode; children?: ReactNode; className?: string}) {
  return <div data-slot="chart-tooltip-content" className={cn('flex flex-col gap-1', className)}>
    {title && <div data-slot="chart-tooltip-title" className="type-label-sm text-text-3">{title}</div>}
    {children}
  </div>;
}

/** One series: its swatch, its name and its value, the value right-aligned in tabular figures. */
function ChartTooltipRow({indicator, label, value, className}: {indicator?: ReactNode; label: ReactNode; value: ReactNode; className?: string}) {
  return <div data-slot="chart-tooltip-row" className={cn('flex items-center gap-2 type-label-sm', className)}>
    {indicator}
    <span className="min-w-0 flex-1 truncate text-text-2">{label}</span>
    <span className="data text-text-1">{value}</span>
  </div>;
}

// ---------- Data table ----------

type ChartDataTableColumn = {key: string; label: ReactNode};
type ChartDataTableRow = {key: string; label: ReactNode; values: Record<string, ReactNode>};

type ChartDataTableProps = {
  /** The table's name. Usually the chart title. */
  caption: ReactNode;
  /** The one row a table with no rows shows, so an empty chart still says so in its table. */
  empty?: ReactNode;
  /** The head of the first column, which names each row. */
  rowHeader?: ReactNode;
  columns: ChartDataTableColumn[];
  rows: ChartDataTableRow[];
  /** Show the table instead of hiding it for screen readers only. */
  visible?: boolean;
  className?: string;
};

const ChartDataTable = memo(function ChartDataTable({caption, rowHeader = 'Date', columns, rows, empty = CHART_EMPTY, visible, className}: ChartDataTableProps) {
  // A visible table scrolls past --popup-max; while it does, it takes a tab stop so a keyboard can scroll it.
  const box = useRef<HTMLDivElement>(null);
  const tab = useScrollTabStop(box, !!visible);
  // The scrolling region takes its name from the caption, whatever the caption holds: a string as the
  // label, anything else by reference.
  const captionId = useId();
  const named = tab === 0 ? (typeof caption === 'string' ? {'aria-label': caption} : {'aria-labelledby': captionId}) : {};
  return <div
    ref={box}
    data-slot="chart-data-table"
    data-visible={visible || undefined}
    tabIndex={tab}
    role={tab === 0 ? 'region' : undefined}
    {...named}
    className={cn(visible ? 'max-h-(--popup-max) overflow-auto bg-page' : 'sr-only', className)}
  >
    <table className="w-full text-start">
      <caption id={captionId} className={cn(visible ? 'px-4 py-2 text-start type-label text-text-1' : undefined)}>{caption}</caption>
      <thead>
        <tr>
          <th scope="col" className="sticky top-0 h-(--row-sm) bg-page px-4 text-start align-middle type-label-sm font-normal text-text-3 shadow-[inset_0_-1px_0_var(--line-row)]">{rowHeader}</th>
          {columns.map(column => <th key={column.key} scope="col" className="sticky top-0 h-(--row-sm) bg-page px-4 text-end align-middle type-label-sm font-normal text-text-3 shadow-[inset_0_-1px_0_var(--line-row)]">{column.label}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 && <tr data-slot="chart-data-table-empty" className="rule-row">
          <td colSpan={columns.length + 1} className="h-(--row-sm) px-4 text-start align-middle type-label-sm text-text-3">{empty}</td>
        </tr>}
        {rows.map(row => <tr key={row.key} className="rule-row">
          <th scope="row" className="h-(--row-sm) px-4 text-start align-middle type-label-sm font-normal whitespace-nowrap text-text-2">{row.label}</th>
          {columns.map(column => <td key={column.key} className="h-(--row-sm) px-4 text-end align-middle type-label-sm text-text-1">{row.values[column.key] ?? EMPTY_VALUE}</td>)}
        </tr>)}
      </tbody>
    </table>
  </div>;
});

// ---------- Legend ----------

const chartLegendVariants = cva('flex min-w-0', {
  variants: {
    layout: {
      row: 'flex-wrap items-center gap-x-1 gap-y-1',
      column: 'flex-col gap-0.5',
    },
  },
  defaultVariants: {layout: 'row'},
});

type ChartLegendProps = Omit<React.ComponentProps<'ul'>, 'children'> & VariantProps<typeof chartLegendVariants> & {
  /** Series to list. Defaults to every key in the config. */
  series?: string[];
  /** A value after each name, like the latest reading or a total. */
  values?: Record<string, ReactNode>;
  /** Let people switch series off. Off makes the legend a plain key. */
  toggle?: boolean;
};

function ChartLegend({series, values, toggle = true, layout = 'row', className, ...props}: ChartLegendProps) {
  const {config, keys, hidden, toggle: flip, highlight, setHighlight} = useChart();
  const list = series ?? keys;
  return <ul data-slot="chart-legend" data-layout={layout} className={cn(chartLegendVariants({layout}), className)} {...props}>
    {list.map(key => {
      const off = hidden.has(key);
      const dim = highlight !== null && highlight !== key;
      const body = <>
        <ChartSwatch config={config} series={key} className={cn(off && 'bg-transparent shadow-[inset_0_0_0_2px_var(--accent-line)]')}/>
        <span className={cn('min-w-0 truncate', off ? 'text-text-3' : 'text-text-1')}>{config[key]?.label ?? key}</span>
        {values?.[key] !== undefined && <span className="data ms-auto ps-2 text-text-2">{values[key]}</span>}
      </>;
      return <li key={key} className={cn('min-w-0 transition-opacity duration-(--dur-fast)', dim && 'opacity-(--dim-opacity)', layout === 'column' && 'w-full')}>
        {toggle
          ? <button
              type="button"
              data-slot="chart-legend-item"
              aria-pressed={!off}
              onClick={() => flip(key)}
              onPointerEnter={() => !off && setHighlight(key)}
              onPointerLeave={() => setHighlight(null)}
              onFocus={() => !off && setHighlight(key)}
              onBlur={() => setHighlight(null)}
              onKeyDown={event => { if (event.key === 'Escape') setHighlight(null); }}
              className="flex h-(--control-sm) w-full min-w-0 items-center gap-2 rounded-soft px-2 type-label transition-colors duration-(--dur-fast) ease-(--ease-step) hover:bg-hover"
            >{body}</button>
          : <span data-slot="chart-legend-item" className="flex h-(--control-sm) min-w-0 items-center gap-2 px-2 type-label">{body}</span>}
      </li>;
    })}
  </ul>;
}

export {
  ChartContainer, WithChart, useChart, useOptionalChart, useElementWidth, useElementDirection, useRovingPoints,
  seriesTone, inkSteps, ChartSwatch,
  ChartTooltip, ChartTooltipContent, ChartTooltipRow,
  ChartDataTable,
  ChartLegend, chartLegendVariants,
  type ChartConfig, type ChartSeriesConfig, type ChartContextValue,
  type ChartTooltipProps, type ChartDataTableProps, type ChartDataTableColumn, type ChartDataTableRow, type ChartLegendProps,
};
