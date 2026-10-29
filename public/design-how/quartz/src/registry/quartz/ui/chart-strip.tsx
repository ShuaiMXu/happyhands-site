'use client';

import {useRef, useState} from 'react';
import {cva, type VariantProps} from 'class-variance-authority';
import type {Kind} from '@/lib/quartz/kind';
import {cn} from '@/lib/quartz/utils';
import {CHART_EMPTY, EMPTY_VALUE} from '@/lib/quartz/format';
import {ChartDataTable, ChartTooltip, ChartTooltipContent, ChartTooltipRow, useElementWidth, useRovingPoints} from '@/components/quartz/ui/chart-parts';
import {Status} from '@/components/quartz/ui/status';

// The two charts that are a strip rather than a plot: the sparkline beside a number and the status bar of
// buckets. chart.tsx re-exports both; this file is where they live. Both read right to left under
// dir="rtl": the status cells are a flex row, and the sparkline mirrors its drawing.

// ---------- Sparkline ----------

const sparklineVariants = cva('relative inline-block min-w-0 align-middle', {
  variants: {
    size: {
      sm: 'h-4',
      default: 'h-(--control-xs)',
      lg: 'h-(--row-sm)',
    },
  },
  defaultVariants: {size: 'default'},
});

type SparklineProps = Omit<React.ComponentProps<'div'>, 'children'> & VariantProps<typeof sparklineVariants> & {
  /** Values in order, oldest first. null is a gap. */
  data: (number | null)[];
  /** What the values are: "Runs per hour". Names the table and the points. */
  label: string;
  /** The kind the values belong to. Sets the hue; ink without one. */
  kind?: Kind;
  variant?: 'line' | 'bar';
  /** A flat wash under the line. */
  area?: boolean;
  /** Mark the last value. On for lines. */
  end?: boolean;
  /** Names for each point, for the table and tooltip: dates or bucket labels. */
  labels?: string[];
  valueFormat?: (value: number) => string;
  /** Focus and hover each point, with a tooltip. */
  interactive?: boolean;
};

const VIEW_H = 100;
const PAD = 8;

/** The sentence a screen reader hears for the values: "up from 412 to 549, low 401, high 549". */
function trendWords(values: number[], format: (v: number) => string) {
  if (!values.length) return 'no data';
  const first = values[0], last = values[values.length - 1];
  const direction = last > first ? 'up' : last < first ? 'down' : 'flat';
  return `${direction} from ${format(first)} to ${format(last)}, low ${format(Math.min(...values))}, high ${format(Math.max(...values))}`;
}

function Sparkline({data, label, kind, variant = 'line', area, end = variant === 'line', labels, valueFormat = v => v.toLocaleString('en-US'), interactive, size = 'default', className, ...props}: SparklineProps) {
  const values = data.filter((v): v is number => v !== null && Number.isFinite(v));
  const n = data.length;
  const lo = variant === 'bar' ? Math.min(0, ...values) : Math.min(...values);
  const hi = Math.max(...values, lo + 1);
  const viewW = Math.max(n - 1, 1) * 10;
  const y = (v: number) => PAD + (1 - (v - lo) / (hi - lo || 1)) * (VIEW_H - PAD * 2);
  const x = (i: number) => variant === 'bar' ? (i + 0.5) * (viewW / n) : n === 1 ? viewW / 2 : (i / (n - 1)) * viewW;
  const nameAt = (i: number) => labels?.[i] ?? `Point ${i + 1}`;

  const segments: {x: number; y: number}[][] = [];
  let run: {x: number; y: number}[] = [];
  data.forEach((v, i) => {
    if (v === null || !Number.isFinite(v)) { if (run.length) segments.push(run); run = []; return; }
    run.push({x: x(i), y: y(v)});
  });
  if (run.length) segments.push(run);

  const lastIndex = data.findLastIndex(v => v !== null && Number.isFinite(v));
  const svgRef = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [anchor, setAnchor] = useState<{x: number; y: number} | null>(null);
  const show = (i: number) => {
    setActive(i);
    const svg = svgRef.current;
    const rect = svg?.getBoundingClientRect();
    const v = data[i];
    if (!svg || !rect) return;
    // The drawing is mirrored in a right-to-left sparkline, so its points count from the right edge.
    const along = (x(i) / viewW) * rect.width;
    const rtl = getComputedStyle(svg).direction === 'rtl';
    setAnchor({x: rtl ? rect.right - along : rect.left + along, y: rect.top + ((v === null ? VIEW_H : y(v)) / VIEW_H) * rect.height});
  };
  const hide = () => { setActive(null); setAnchor(null); };
  const roving = useRovingPoints(n, i => show(i));
  const pct = (px: number, total: number) => `${(px / total) * 100}%`;

  // A div, not a span: it holds the data table. It stays inline-block, so it still sits in a line of text; do not put it inside a <p>.
  return <div data-slot="sparkline" data-kind={kind} data-variant={variant} className={cn(sparklineVariants({size}), 'w-24', className)} {...props}>
    <ChartDataTable
      caption={`${label}: ${trendWords(values, valueFormat)}`}
      empty={CHART_EMPTY}
      rowHeader="Point"
      columns={[{key: 'v', label}]}
      rows={data.map((v, i) => ({key: String(i), label: nameAt(i), values: {v: v === null ? EMPTY_VALUE : valueFormat(v)}}))}
    />
    {/* Right to left mirrors the drawing, which has no text, so the first value sits at the right like the first point button. */}
    <svg ref={svgRef} aria-hidden viewBox={`0 0 ${viewW} ${VIEW_H}`} preserveAspectRatio="none" className="block size-full overflow-visible rtl:-scale-x-100">
      {variant === 'bar'
        ? data.map((v, i) => v !== null && Number.isFinite(v) && <rect key={i} x={x(i) - (viewW / n) * 0.35} width={(viewW / n) * 0.7} y={Math.min(y(v), y(0))} height={Math.max(Math.abs(y(0) - y(v)), 2)} className={cn('fill-accent-line', active !== null && active !== i && 'opacity-40')}/>)
        : <>
            {area && segments.map((pts, i) => pts.length > 1 && <path key={`a${i}`} d={`M${pts[0].x},${VIEW_H}${pts.map(p => `L${p.x},${p.y}`).join('')}L${pts[pts.length - 1].x},${VIEW_H}Z`} className="fill-accent-wash"/>)}
            {/* A point with gaps on both sides is a dot, as in LineChart: a zero-length stroke with round caps, so
                the stretched viewBox cannot squash it into an oval. */}
            {segments.map((pts, i) => pts.length === 1 && <path key={`d${i}`} d={`M${pts[0].x},${pts[0].y}h0`} fill="none" vectorEffect="non-scaling-stroke" strokeLinecap="round" className="stroke-accent-line" style={{strokeWidth: 'var(--space-1)'}}/>)}
            {segments.map((pts, i) => pts.length > 1 && <path key={i} d={pts.map((p, j) => `${j ? 'L' : 'M'}${p.x},${p.y}`).join('')} fill="none" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" className="stroke-accent-line" style={{strokeWidth: size === 'sm' ? 'var(--line-hair)' : 'var(--line-accent)'}}/>)}
          </>}
    </svg>
    {variant === 'line' && (active ?? (end ? lastIndex : -1)) >= 0 && (() => {
      const i = active ?? lastIndex;
      const v = data[i];
      if (v === null || !Number.isFinite(v)) return null;
      return <span aria-hidden data-slot="sparkline-end" className="pointer-events-none absolute size-1.5 -translate-x-1/2 -translate-y-1/2 bg-accent-line rtl:translate-x-1/2" style={{insetInlineStart: pct(x(i), viewW), top: pct(y(v), VIEW_H)}}/>;
    })()}
    {interactive && n > 0 && <>
      <span role="group" aria-label={label} aria-roledescription="chart" className="absolute inset-0 flex" onPointerLeave={hide}>
        {data.map((v, i) => <button
          key={i}
          ref={roving.ref(i)}
          type="button"
          tabIndex={roving.tabIndex(i)}
          aria-label={`${nameAt(i)}: ${v === null ? 'no data' : valueFormat(v)}`}
          onPointerEnter={() => { roving.setCurrent(i); show(i); }}
          onFocus={() => { roving.setCurrent(i); show(i); }}
          onBlur={event => { if (!event.currentTarget.parentElement?.contains(event.relatedTarget as Node)) hide(); }}
          onKeyDown={event => { if (event.key === 'Escape') hide(); else roving.onKeyDown(event, i); }}
          className="h-full min-w-0 flex-1 rounded-inner focus-visible:focus-ring-inset"
        />)}
      </span>
      <ChartTooltip anchor={active !== null ? anchor : null}>
        {active !== null && <ChartTooltipContent title={nameAt(active)}>
          <ChartTooltipRow label={label} value={data[active] === null ? EMPTY_VALUE : valueFormat(data[active]!)}/>
        </ChartTooltipContent>}
      </ChartTooltip>
    </>}
  </div>;
}

// ---------- Status ----------

type StatusBarBucket = {
  /** The bucket's name: a date, an hour. Shown under the strip ends and in the tooltip. */
  label: string;
  /** Runs, deploys, requests in the bucket. 0 is a quiet cell. */
  count: number;
  /** The worst outcome in the bucket. warn and fail override the kind's hue. */
  status?: 'ok' | 'warn' | 'fail';
  /** How many of the count failed or warned, for the tooltip. */
  issues?: number;
  /** Replaces the generated count text in the tooltip and the cell's name: "12 runs, 2 failed, 1 with warnings". */
  description?: string;
};

const statusBarVariants = cva('flex w-full min-w-0', {
  variants: {
    size: {
      sm: 'h-4',
      default: 'h-(--row-sm)',
      lg: 'h-(--row)',
    },
  },
  defaultVariants: {size: 'default'},
});

type StatusBarProps = Omit<React.ComponentProps<'div'>, 'children'> & VariantProps<typeof statusBarVariants> & {
  data: StatusBarBucket[];
  /** What the strip shows: "Runs, last 90 days". Names the cells group and the table. */
  label: string;
  /** The kind of thing being counted. Sets the activity hue; ink without one. */
  kind?: Kind;
  /** The noun for count, singular and plural. */
  unit?: [string, string];
  /** Text under the strip's left and right ends. Defaults to the first and last bucket labels. */
  range?: [React.ReactNode, React.ReactNode] | false;
  /** Called when a cell is clicked or pressed with Enter or Space, e.g. to open the logs for that bucket. */
  onBucketClick?: (bucket: StatusBarBucket, index: number) => void;
};

const statusWords = {ok: 'OK', warn: 'Warning', fail: 'Failed'} as const;

function StatusBar({data, label, kind, unit = ['run', 'runs'], range, onBucketClick, size = 'default', className, ...props}: StatusBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [anchor, setAnchor] = useState<{x: number; y: number} | null>(null);
  const cells = useRef<(HTMLElement | null)[]>([]);
  const show = (i: number, el?: HTMLElement | null) => {
    setActive(i);
    const rect = (el ?? cells.current[i])?.getBoundingClientRect();
    if (rect) setAnchor({x: rect.left + rect.width / 2, y: rect.top});
  };
  const hide = () => { setActive(null); setAnchor(null); };
  const roving = useRovingPoints(data.length, (i, el) => show(i, el));
  const noun = (n: number) => `${n.toLocaleString('en-US')} ${n === 1 ? unit[0] : unit[1]}`;
  const describe = (b: StatusBarBucket) => {
    if (b.description) return b.description;
    const parts = [b.count ? noun(b.count) : `No ${unit[1]}`];
    if (b.status && b.status !== 'ok') parts.push(`${b.issues ?? ''} ${b.status === 'fail' ? 'failed' : 'with warnings'}`.trim());
    return parts.join(', ');
  };
  const ends = range === false ? null : range ?? [data[0]?.label, data[data.length - 1]?.label];
  // Whole-pixel cells: the strip's width shared out in integers, a pixel more to some cells than others,
  // so no cell edge lands between pixels and blurs at 1x. Until measured, cells flex.
  const [stripRef, stripWidth] = useElementWidth<HTMLDivElement>();
  const gapPx = data.length > 60 ? 1 : 2;
  const avail = stripWidth - gapPx * (data.length - 1);
  const cellWidth = (i: number) => (stripWidth && avail >= data.length ? Math.floor(((i + 1) * avail) / data.length) - Math.floor((i * avail) / data.length) : undefined);

  return <div ref={ref} data-slot="status-bar" data-kind={kind} className={cn('flex w-full min-w-0 flex-col gap-2', className)} {...props}>
    <ChartDataTable
      caption={label}
      rowHeader="Bucket"
      columns={[{key: 'count', label: unit[1][0].toUpperCase() + unit[1].slice(1)}, {key: 'status', label: 'Status'}]}
      rows={data.map((b, i) => ({key: String(i), label: b.label, values: {count: b.count.toLocaleString('en-US'), status: b.count ? statusWords[b.status ?? 'ok'] : EMPTY_VALUE}}))}
      empty={CHART_EMPTY}
    />
    <div
      ref={stripRef}
      role="group"
      aria-label={label}
      aria-roledescription="status bar"
      className={cn(statusBarVariants({size}), data.length > 60 ? 'gap-px' : 'gap-0.5')}
      onPointerLeave={() => { if (!ref.current?.contains(document.activeElement)) hide(); }}
    >
      {data.map((b, i) => {
        const tone = b.count === 0 ? 'quiet' : b.status === 'warn' || b.status === 'fail' ? b.status : 'active';
        return <button
          key={i}
          ref={el => { cells.current[i] = el; roving.ref(i)(el); }}
          type="button"
          tabIndex={roving.tabIndex(i)}
          data-slot="status-bar-cell"
          data-tone={tone}
          data-status={tone === 'warn' || tone === 'fail' ? tone : undefined}
          aria-label={`${b.label}: ${describe(b)}`}
          onPointerEnter={event => { roving.setCurrent(i); show(i, event.currentTarget); }}
          onFocus={event => { roving.setCurrent(i); show(i, event.currentTarget); }}
          onBlur={event => { if (!event.currentTarget.parentElement?.contains(event.relatedTarget as Node)) hide(); }}
          onKeyDown={event => { if (event.key === 'Escape') hide(); else roving.onKeyDown(event, i); }}
          onClick={onBucketClick && (() => onBucketClick(b, i))}
          style={cellWidth(i) ? {width: cellWidth(i), flex: 'none'} : undefined}
          className={cn(
            'h-full min-w-px flex-1 rounded-none transition-opacity duration-(--dur-fast)',
            tone === 'quiet' ? 'bg-cell-quiet forced-colors:bg-[Canvas]' : 'bg-accent-line forced-colors:bg-[CanvasText]',
            tone !== 'quiet' && 'forced-colors:outline forced-colors:outline-1 forced-colors:-outline-offset-1',
            active !== null && active !== i && 'opacity-(--stale-opacity)',
          )}
        />;
      })}
    </div>
    {ends && <div aria-hidden className="flex justify-between gap-4 type-label-sm text-text-3"><span>{ends[0]}</span><span>{ends[1]}</span></div>}
    <ChartTooltip anchor={active !== null ? anchor : null}>
      {active !== null && data[active] && <ChartTooltipContent title={data[active].label}>
        <ChartTooltipRow
          indicator={<Status status={data[active].count === 0 ? 'idle' : data[active].status ?? 'ok'}/>}
          label={data[active].count ? statusWords[data[active].status ?? 'ok'] : 'Quiet'}
          value={describe(data[active])}
        />
      </ChartTooltipContent>}
    </ChartTooltip>
  </div>;
}

export {
  Sparkline, sparklineVariants,
  StatusBar, statusBarVariants,
  type SparklineProps, type StatusBarProps, type StatusBarBucket,
};
