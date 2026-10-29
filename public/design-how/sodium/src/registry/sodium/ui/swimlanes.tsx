'use client';

import {useRef, type ReactNode} from 'react';
import {cva} from 'class-variance-authority';
import {cn} from '@/lib/sodium/utils';
import {useDrawn, useElementDirection} from '@/components/sodium/ui/chart-parts';

// Sodium's swimlanes: a flow across the systems it passes through. Each lane is one system (a source, the warehouse,
// a consumer) with its name in micro capitals at the top; each step is one row, a block across the lanes it
// spans, top to bottom in order. Where the next step starts in a lane the last one did not reach, an elbow connector
// runs from the end of the last step down and across to it and ends in a square, so a hand-back reads as one line.
//
// It is for the order of a handful of steps and where each one runs: how a sync moves rows from a source through the
// warehouse to a dashboard, which system a job's stages land in. Two to five lanes, two to eight steps. It is not a
// timeline: rows are order, not time, so a step's width is the lanes it touches, never its duration.
//
// Lanes are not ruled: the lane heads name the columns and each step's position says which lane it runs in, so the
// only lines in the figure are the steps' own edges and the connectors. Rows sit --space-1 apart, so two stacked steps
// never share an edge and every line drawn is a single 1px line. A step is a block with one edge, --line, the card
// colour, on every tone. State is fill and word only: Sodium's yellow (the slab under ink in light, the tint with yellow text in
// dark) on the one step to act on, the well on every other step, and an outcome (passed, retried) said in the meta as
// a word, never as a coloured box or edge. Lane heads and step names are names in a chart, so they take type-micro
// like an axis, and a step's meta is a value as written at its end. A step is a block, not a region, so it takes 8px
// at its sides like a bar block: a nine-letter name (TRANSFORM, WAREHOUSE) fits a third of a 390px phone whole.
//
// The figure is an ordered list for a screen reader: each step reads its place, its name, the lanes it spans and its
// meta. The lane headers and connectors are drawn for the eye only.
//
// Motion is state: each step wipes in from its start edge in turn over --dur-wipe, linear, and each connector draws out
// from the step it leaves over --dur-draw, ease-out, the vertical then the horizontal. Reduced motion zeroes both.

type SwimlaneTone = 'well' | 'accent';

type Swimlane = {id: string; label: string};

type SwimlaneStep = {
  /** The step's name, in sentence case; the capitals come from the label role. */
  label: string;
  /** The lane it starts in. */
  from: string;
  /** The lane it ends in; the start lane by default. */
  to?: string;
  /** accent on the one step to act on; the well otherwise. */
  tone?: SwimlaneTone;
  /** A value at the block's end, as written: 1.2s, 48,210 rows, or an outcome as a word: Passed. */
  meta?: ReactNode;
};

const stepVariants = cva('relative flex h-(--row-sm) min-w-0 items-center justify-between gap-2 border border-line px-2', {
  variants: {
    tone: {
      accent: 'bg-primary text-primary-foreground',
      well: 'bg-well text-text-1',
    },
  },
  defaultVariants: {tone: 'well'},
});

/** The rows' heights, --row-sm for the lane heads and for a step, and the --space-1 gap between steps; the
 * connectors are placed on them. */
const HEAD = 32;
const ROW = 32;
const GAP = 4;

type SwimlanesProps = Omit<React.ComponentProps<'figure'>, 'children'> & {
  /** The flow's name, as the figure's caption: say what moves where. */
  label: string;
  lanes: Swimlane[];
  steps: SwimlaneStep[];
};

function Swimlanes({label, lanes, steps, className, ...props}: SwimlanesProps) {
  const ref = useRef<HTMLElement>(null);
  const rtl = useElementDirection(ref) === 'rtl';
  const drawn = useDrawn();
  const n = Math.max(lanes.length, 1);
  const index = (id: string | undefined) => Math.max(0, lanes.findIndex(lane => lane.id === id));
  const spans = steps.map(step => {
    const a = index(step.from), b = step.to === undefined ? a : index(step.to);
    return {start: Math.min(a, b), end: Math.max(a, b)};
  });
  const pct = (lane: number) => ((lane + 0.5) / n) * 100;
  const edge = (lane: number) => (lane / n) * 100;

  // An elbow wherever a step starts beyond the lanes the step before it reached: down from the bottom edge of the last
  // step, at the centre of its end lane, to the middle of the next row, then across to the next step's near edge.
  const connectors = steps.map((_, i) => {
    if (i === 0) return null;
    const prev = spans[i - 1], next = spans[i];
    const lane = prev.end;
    if (lane >= next.start && lane <= next.end) return null;
    const x = pct(lane);
    const back = next.end < lane;
    const to = back ? edge(next.end + 1) : edge(next.start);
    const row = HEAD + (ROW + GAP) * i;
    const top = row - GAP;
    const mid = row + ROW / 2;
    return {x, to, back, top, mid, i};
  });

  // value-ok: one equal column per lane, as many as the lanes given; it can only live inline.
  const columns = {gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`};

  return <figure ref={ref} data-slot="swimlanes" data-state={drawn ? 'drawn' : 'start'} className={cn('relative min-w-0', className)} {...props}>
    <figcaption className="sr-only">{label}</figcaption>
    <div aria-hidden data-slot="swimlanes-head" className="relative grid h-(--row-sm)" style={columns}>
      {lanes.map(lane => <span key={lane.id} className="mx-2 flex min-w-0 items-center">
        <span className="truncate type-micro text-text-2">{lane.label}</span>
      </span>)}
    </div>
    <ol className="relative grid gap-y-1" style={columns}>
      {steps.map((step, i) => {
        const {start, end} = spans[i];
        const lanesText = start === end ? lanes[start]?.label : `${lanes[start]?.label} to ${lanes[end]?.label}`;
        return <li
          key={i}
          data-slot="swimlane-step"
          data-tone={step.tone ?? 'well'}
          className={stepVariants({tone: step.tone})}
          // value-ok: the step's lanes and its row are data; the wipe's delay is its place in the flow.
          style={{
            gridColumn: `${start + 1} / ${end + 2}`,
            gridRow: i + 1,
            clipPath: drawn ? 'inset(0)' : rtl ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
            transition: `clip-path var(--dur-wipe) var(--ease-linear) calc(var(--dur-wipe) * ${i})`,
          }}
        >
          {/* The name wins the room: the meta shrinks first and truncates, so a narrow step still says what it is. */}
          <span className="max-w-full min-w-0 shrink-0 truncate type-micro">{step.label}</span>
          <span className="sr-only">, {lanesText}</span>
          {step.meta !== undefined && <span className="min-w-0 truncate type-code-sm">{step.meta}</span>}
        </li>;
      })}
    </ol>
    {connectors.map(c => c && <div key={c.i} aria-hidden data-slot="swimlane-connector">
      {/* Down from the last step. */}
      <span
        className="absolute w-px bg-line-control"
        // value-ok: placed on the measured lanes and rows; the draw waits for the step it leaves.
        style={{
          insetInlineStart: `${c.x}%`, top: c.top, height: c.mid - c.top,
          transformOrigin: 'top', scale: drawn ? '1' : '1 0',
          transition: `scale var(--dur-draw) var(--ease-out) calc(var(--dur-wipe) * ${c.i})`,
        }}
      />
      {/* Across to the next one, ending in a square. */}
      <span
        className="absolute h-px bg-line-control"
        style={{
          insetInlineStart: `${Math.min(c.x, c.to)}%`, width: `${Math.abs(c.x - c.to)}%`, top: c.mid,
          transformOrigin: c.back !== rtl ? 'right' : 'left', scale: drawn ? '1' : '0 1',
          transition: `scale var(--dur-draw) var(--ease-out) calc(var(--dur-wipe) * ${c.i} + var(--dur-draw))`,
        }}
      />
      <span
        className="absolute size-1.5 -translate-y-1/2 bg-line-control"
        style={{
          insetInlineStart: c.back ? `${c.to}%` : `calc(${c.to}% - var(--space-1-5))`, top: c.mid + 0.5,
          opacity: drawn ? 1 : 0,
          transition: `opacity 0ms linear calc(var(--dur-wipe) * ${c.i} + var(--dur-draw) * 2)`,
        }}
      />
    </div>)}
  </figure>;
}

export {Swimlanes, stepVariants, type SwimlanesProps, type Swimlane, type SwimlaneStep, type SwimlaneTone};
