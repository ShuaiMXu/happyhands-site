'use client';

import {useState} from 'react';
import {Card, CardAction, CardContent, CardHeader, CardTitle} from '@/components/quartz/ui/card';
import {DataList, DataListItem, DataListLabel, DataListValue} from '@/components/quartz/ui/data-list';
import {JsonView} from '@/components/quartz/ui/json-view';
import {Status} from '@/components/quartz/ui/status';
import {formatCount, formatDurations} from '@/lib/quartz/format';
import {Timeline, type TimelineSpan} from '@/components/quartz/ui/timeline';
import {cn} from '@/lib/quartz/utils';

// A block: one agent run as a span tree beside a waterfall, answering "where did the time go". The names nest by
// depth with a model call's tokens and cost after them; each span is a bar on one clock in its kind's hue (agent cyan, model mint,
// tool and run blue), so the shape and the mix of the run read first. A slow retry is amber and a failed step red. The step still running
// ends at `now`. Open a span and its input and output tokens, cost and model sit in a strip under the waterfall,
// in the same frame. The full block adds the span's output beside it.
// The demo run is fixed, so the total reads the same on every load. Replace the spans with your tracer's, in ms from
// the run's start, and tick `now` from your stream.

// value-ok: an order number, not a color
const order = '#4821';

type Detail = {model?: string; tokensIn?: number; tokensOut?: number; cost?: string; output: unknown};

const spans: TimelineSpan[] = [
  {id: 'plan', label: 'plan', start: 0, end: 520, kind: 'agent', figure: '$0.003'},
  {id: 'model', label: 'model-l', start: 520, kind: 'model', end: 2_640, meta: 'draft', figure: <>5.5k tok <span className="ms-1">$0.021</span></>},
  {id: 'search', label: 'search_policy', start: 2_640, kind: 'run', end: 3_200},
  {id: 'lookup', label: 'lookup_order', start: 3_200, kind: 'run', end: 4_900},
  {id: 'try1', label: 'attempt 1', start: 3_200, kind: 'run', end: 4_000, depth: 1, status: 'warn'},
  {id: 'try2', label: 'attempt 2', start: 4_000, kind: 'run', end: 4_900, depth: 1},
  {id: 'draft', label: 'draft_reply', start: 4_900, kind: 'run', end: 5_700, meta: `order ${order}`},
  {id: 'send', label: 'send_email', start: 5_700, kind: 'run', status: 'running'},
];

const details: Record<string, Detail> = {
  plan: {model: 'model-s', tokensIn: 820, tokensOut: 140, cost: '$0.003', output: {steps: ['check the refund policy', 'look up the order', 'draft the reply', 'send it']}},
  model: {model: 'model-l', tokensIn: 4_812, tokensOut: 655, cost: '$0.021', output: {reply: `Refund order ${order} and tell the customer.`, finish: 'stop'}},
  search: {output: {query: 'refund policy', matches: 3}},
  lookup: {output: {order, customer: 'Maya Chen', total: 640}},
  try1: {output: {error: 'timed out after 800ms', retry: true}},
  try2: {output: {order, status: 'paid twice'}},
  draft: {output: {order, words: 62}},
  send: {output: {to: 'maya@example.com', sending: true}},
};

/** Where the run stands: the last step has been going for 1.5s. Fixed, so the demo's total never drifts. */
const NOW = 7_200;

const ms = (n: number) => formatDurations([n]).values[0];

/** The open span's numbers in a strip: tokens, cost and model for a model call, else when it started and how long it took. */
function SpanStrip({span}: {span: TimelineSpan}) {
  const d = details[span.id];
  const cells: [string, string][] = d.model
    ? [['Input', `${formatCount(d.tokensIn ?? 0)} tok`], ['Output', `${formatCount(d.tokensOut ?? 0)} tok`], ['Cost', d.cost ?? ''], ['Model', d.model]]
    : [['Started', ms(span.start)], [span.end === undefined ? 'So far' : 'Took', ms((span.end ?? NOW) - span.start)]];
  return <dl aria-label={`Details of ${span.label}`} className={cn('grid gap-x-4 gap-y-1.5 px-4 py-3', d.model ? 'grid-cols-2 @sm/trace:grid-cols-4' : 'grid-cols-2')}>
    {cells.map(([label, value]) => <div key={label} className="min-w-0">
      <dt className="type-label-sm text-text-3">{label}</dt>
      <dd className="truncate type-code data text-text-1">{value}</dd>
    </div>)}
  </dl>;
}

/** The introduction's run trace: span tree and waterfall in one frame, a span open, up to 720px wide. */
export function RunTraceLook({className}: {className?: string}) {
  const [open, setOpen] = useState('model');
  const span = spans.find(s => s.id === open) ?? spans[0];
  return <div className={cn('@container/trace w-full max-w-3xl', className)}>
    <Timeline
      size="sm" label="Run conv_8f2a91" kind="run" spans={spans} now={NOW} activeId={open} onSpanClick={s => setOpen(s.id)}
      footer={<SpanStrip span={span}/>} className="w-full"
    />
  </div>;
}

/** One run: the waterfall with a step open, and that step's model, tokens, cost and output beside it. */
export function RunTrace() {
  const [open, setOpen] = useState('model');
  const span = spans.find(s => s.id === open) ?? spans[0];
  const detail = details[span.id];
  const running = span.end === undefined;
  return (
    <section aria-label="Run trace" className="@container/trace w-full max-w-5xl text-text-1">
      <div className="grid grid-cols-1 gap-6 @3xl/trace:grid-cols-[2fr_1fr]">
        <Timeline size="sm" label="Run conv_8f2a91" kind="run" spans={spans} now={NOW} activeId={open} onSpanClick={s => setOpen(s.id)} className="min-w-0 self-start"/>
        <div className="flex min-w-0 flex-col gap-6">
          <Card kind="run">
            <CardHeader>
              <CardTitle className="truncate">{span.label}</CardTitle>
              <CardAction>{running ? <Status status="running"/> : span.status === 'warn' ? <Status status="warn">Timed out</Status> : <Status status="ok"/>}</CardAction>
            </CardHeader>
            <CardContent>
              <DataList>
                {detail.model && <DataListItem><DataListLabel>Model</DataListLabel><DataListValue mono>{detail.model}</DataListValue></DataListItem>}
                {detail.tokensIn !== undefined && <DataListItem><DataListLabel>Tokens in</DataListLabel><DataListValue numeric>{formatCount(detail.tokensIn)}</DataListValue></DataListItem>}
                {detail.tokensOut !== undefined && <DataListItem><DataListLabel>Tokens out</DataListLabel><DataListValue numeric>{formatCount(detail.tokensOut)}</DataListValue></DataListItem>}
                {detail.cost && <DataListItem><DataListLabel>Cost</DataListLabel><DataListValue numeric>{detail.cost}</DataListValue></DataListItem>}
                <DataListItem><DataListLabel>Started</DataListLabel><DataListValue numeric>{ms(span.start)}</DataListValue></DataListItem>
                <DataListItem><DataListLabel>{running ? 'So far' : 'Took'}</DataListLabel><DataListValue numeric>{ms((span.end ?? NOW) - span.start)}</DataListValue></DataListItem>
              </DataList>
            </CardContent>
          </Card>
          <JsonView key={span.id} label={`Output of ${span.label}`} data={detail.output} toolbar={false} maxHeight={240}/>
        </div>
      </div>
    </section>
  );
}
