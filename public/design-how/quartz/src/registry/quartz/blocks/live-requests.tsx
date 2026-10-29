'use client';

import {useEffect, useMemo, useState} from 'react';
import type {Kind} from '@/lib/quartz/kind';
import {cn} from '@/lib/quartz/utils';
import {Filter as FilterIcon, Icon, Pause, Play} from '@/components/quartz/icon';
import {Badge, CodeTag} from '@/components/quartz/ui/badge';
import {Button} from '@/components/quartz/ui/button';
import {DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger} from '@/components/quartz/ui/dropdown-menu';
import {FilterBarChips, FilterChip} from '@/components/quartz/ui/filter-bar';
import {Input} from '@/components/quartz/ui/input';
import {PageHeader, PageHeaderContent, PageHeaderDescription, PageHeaderRow, PageHeaderTitle} from '@/components/quartz/ui/page-header';
import {Sheet, SheetBody, SheetContent, SheetField, SheetHeader, SheetSection, SheetTitle} from '@/components/quartz/ui/sheet';
import {Stat, StatGroup, StatLabel, StatUnit, StatValue} from '@/components/quartz/ui/stat';
import {StatusArc} from '@/components/quartz/ui/status';
import {DataTable, type ColumnDef} from '@/components/quartz/ui/table';

// A block: an agent's tool calls as they happen, set like an activity log. Each row reads the result, the tool, the agent
// that called it, how long it took and when: the result is a solid pill (ink for OK, the status line for Limited and
// Failed, with no wash on the row), the tool mono. Above the rows one 44px toolbar: a search and a Filter menu of fields
// (Tool, Result, Min latency); a field with a value shows as a removable chip on a second row, which exists only then. The newest row lands
// at the bottom and the list keeps to it while you are there; the Live control in the header runs the stream, one
// call every two seconds in this demo, and its Pause button stops it. Under reduced motion it starts paused. Took reads in
// ms under a second and in seconds above, per call. Time goes first and then Agent as the box narrows. Wire `next`
// to your tool-call stream.

type Request = {id: string; time: string; tool: string; agent: string; result: Result; ms: number};
type Result = 'ok' | 'limited' | 'failed';

const tools = ['lookup_order', 'search_policy', 'send_email', 'refund', 'lookup_order', 'search_policy'];
const agents = ['support-agent', 'triage', 'support-agent', 'support-agent', 'triage', 'triage'];
const results: Result[] = ['ok', 'ok', 'ok', 'failed', 'limited', 'ok', 'ok', 'ok', 'ok', 'ok', 'ok', 'ok', 'ok'];
const clock = (i: number) => {
  const s = 2 * 60 + 20 + i * 2;
  return `14:${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};

/** Stand-in for your stream: the call at position i, the same on the server and in the browser. */
function next(i: number): Request {
  const result = results[i % results.length];
  return {id: `call_${i}`, time: clock(i), tool: tools[(i * 5) % tools.length], agent: agents[(i * 5) % agents.length], result, ms: result === 'failed' ? 2_100 : result === 'limited' ? 12 : 18 + ((i * 7_919) % 240)};
}

/** 12 ms under a second, 2.1 s above it. One rule for every row, so a quick call never reads 0.0 s beside a slow one. */
const took = (ms: number) => (Math.round(ms) < 1000 ? `${Math.round(ms)} ms` : `${(Math.round(ms) / 1000).toFixed(1)} s`);

const resultWord = {ok: 'OK', limited: 'Limited', failed: 'Failed'} as const;
const resultStatus = {ok: 'neutral', limited: 'warn', failed: 'fail'} as const;

/** The result as a solid pill: ink, or the status line colour for Limited and Failed. */
const ResultTag = ({result}: {result: Result}) => <CodeTag status={resultStatus[result]} fill="solid">{resultWord[result]}</CodeTag>;

// Took stays at every width. Time goes once the five columns (480px) no longer fit, then Agent below the four (396px).
// Each agent keeps one tint down the column, so a reader follows an agent by color as well as by name. The slots
// come from the kinds; here they stand for which agent, not what kind of thing.
const agentKind: Record<string, Kind> = {'support-agent': 'agent', triage: 'deploy'};

const columns: ColumnDef<Request, any>[] = [
  {accessorKey: 'result', header: 'Result', size: 80, enableSorting: false, cell: ({getValue}) => <ResultTag result={getValue<Result>()}/>},
  {accessorKey: 'tool', header: 'Tool', size: 112, enableSorting: false, meta: {mono: true}},
  {accessorKey: 'agent', header: 'Agent', size: 128, enableSorting: false, meta: {hideBelow: 396}, cell: ({getValue}) => <Badge kind={agentKind[getValue<string>()] ?? 'agent'} label={getValue<string>()} size="sm"/>},
  {accessorKey: 'ms', header: 'Took', size: 76, minSize: 72, meta: {numeric: true}, cell: ({getValue}) => <span className="data">{took(getValue<number>())}</span>},
  {accessorKey: 'time', header: 'Time', size: 84, meta: {hideBelow: 480}, cell: ({getValue}) => <span className="text-text-2 data">{getValue<string>()}</span>},
];

/**
 * The stream: a call every 2s while live, the last 60 kept. Starts paused under reduced motion. `still`
 * holds the list as it is while it still reads live, for a picture of the screen.
 */
function useRequests(start = 18, still = false) {
  const [rows, setRows] = useState(() => Array.from({length: start}, (_, i) => next(i)));
  const [paused, setPaused] = useState(false);
  useEffect(() => { if (!still && matchMedia('(prefers-reduced-motion: reduce)').matches) setPaused(true); }, [still]);
  useEffect(() => {
    if (paused || still) return;
    const t = window.setInterval(() => setRows(r => [...r.slice(-59), next(Number(r[r.length - 1].id.slice(5)) + 1)]), 2_000);
    return () => window.clearInterval(t);
  }, [paused, still]);
  return {rows, paused, setPaused};
}

type Filter = {tool: string | null; result: string | null; latency: string | null};
const noFilter: Filter = {tool: null, result: null, latency: null};
const toolOptions = ['lookup_order', 'refund', 'search_policy', 'send_email'].map(t => ({value: t, label: t}));
const resultOptions = [{value: 'ok', label: 'OK'}, {value: 'limited', label: 'Limited'}, {value: 'failed', label: 'Failed'}];
const latencyOptions = [{value: '100', label: '100 ms'}, {value: '500', label: '500 ms'}, {value: '1000', label: '1 s'}];

const matches = (r: Request, f: Filter, query: string) =>
  (!f.tool || r.tool === f.tool) &&
  (!f.result || r.result === f.result) &&
  (!f.latency || r.ms >= Number(f.latency)) &&
  r.tool.includes(query.trim());

const fields = [
  {key: 'tool', label: 'Tool', options: toolOptions},
  {key: 'result', label: 'Result', options: resultOptions},
  {key: 'latency', label: 'Min latency', options: latencyOptions},
] as const;

/** One 44px toolbar row: the search and a Filter menu of fields. Applied filters are removable chips on a second row, only when there are any. */
function Filters({filter, setFilter, query, setQuery}: {filter: Filter; setFilter: (f: Filter) => void; query: string; setQuery: (q: string) => void}) {
  const applied = fields.filter(f => filter[f.key]);
  return <div className="flex w-full min-w-0 flex-col">
    <div className="flex h-11 items-center gap-2 px-2">
      <Input mode="search" size="sm" aria-label="Search tools" placeholder="Search tools" value={query} onValueChange={setQuery} className="min-w-0 flex-1"/>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="secondary" size="sm"/>}><Icon icon={FilterIcon} size={16}/>Filter</DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {fields.map(f => <DropdownMenuSub key={f.key}>
            <DropdownMenuSubTrigger>{f.label}</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={filter[f.key] ?? ''} onValueChange={v => setFilter({...filter, [f.key]: v})}>
                {f.options.map(o => <DropdownMenuRadioItem key={o.value} value={o.value}>{o.label}</DropdownMenuRadioItem>)}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>)}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    {applied.length > 0 && <FilterBarChips row aria-label="Filters">
      {applied.map(f => <FilterChip key={f.key} label={f.label} value={f.options.find(o => o.value === filter[f.key])?.label} onRemove={() => setFilter({...filter, [f.key]: null})}/>)}
    </FilterBarChips>}
  </div>;
}

/** The header's Live control: a turning arc and the word while the stream runs, "Paused" once it stops, and a ghost button that flips it. */
function LiveToggle({live, onChange}: {live: boolean; onChange: (live: boolean) => void}) {
  return <span className="inline-flex items-center gap-1">
    <span className={cn('inline-flex items-center gap-1.5 type-label', live ? 'text-text-2' : 'text-text-3')}>
      {live && <StatusArc/>}
      {live ? 'Live' : 'Paused'}
    </span>
    <Button variant="ghost" size="icon-xs" aria-label={live ? 'Pause' : 'Play'} onClick={() => onChange(!live)}>
      <Icon icon={live ? Pause : Play} size={16}/>
    </Button>
  </span>;
}

function RequestsTable({rows, agent, paused, setPaused, maxHeight, onRowClick, activeRowId}: {
  rows: Request[]; agent?: string; paused: boolean; setPaused: (p: boolean) => void; maxHeight: number;
  onRowClick?: (r: Request) => void; activeRowId?: string;
}) {
  const [filter, setFilter] = useState<Filter>(noFilter);
  const [query, setQuery] = useState('');
  const shown = useMemo(() => rows.filter(r => matches(r, filter, query)), [rows, filter, query]);
  return <DataTable
    aria-label="Activity"
    title={<>Activity <span className="ms-1 text-text-2">{agent ?? 'All agents'}</span></>}
    count={false}
    kind="run"
    columns={columns}
    data={shown}
    getRowId={r => r.id}
    enableRowSelection={false}
    enableColumnResizing={false}
    onRowClick={onRowClick}
    activeRowId={activeRowId}
    size="sm"
    maxHeight={maxHeight}
    follow
    actions={<LiveToggle live={!paused} onChange={live => setPaused(!live)}/>}
    toolbar={() => <Filters filter={filter} setFilter={setFilter} query={query} setQuery={setQuery}/>}
    className="min-w-0 flex-1"
  />;
}

/** The introduction's live activity: the table alone, six rows tall, at a preview box's width. */
export function LiveRequestsLook({still, rows: tall = 6, className}: {still?: boolean; rows?: number; className?: string}) {
  const {rows, paused, setPaused} = useRequests(18, still);
  return <section aria-label="Live activity" className={className ?? 'flex w-full max-w-md flex-col'}>
    <RequestsTable rows={rows} agent="support-agent" paused={paused} setPaused={setPaused} maxHeight={32 * (tall + 1)}/>
  </section>;
}

/** An agent's activity page: the agent, its numbers for the last minute, and the live table; a row opens docked beside it. */
export function LiveRequests() {
  const {rows, paused, setPaused} = useRequests(40);
  const [open, setOpen] = useState<Request | null>(null);
  return (
    <section aria-label="Live activity" className="flex w-full max-w-5xl flex-col gap-6 text-text-1">
      <PageHeader kind="run" size="sm">
        <PageHeaderRow>
          <PageHeaderContent>
            <PageHeaderTitle>support-agent</PageHeaderTitle>
            <PageHeaderDescription>Every tool call it makes, as it happens.</PageHeaderDescription>
          </PageHeaderContent>
        </PageHeaderRow>
      </PageHeader>
      <StatGroup kind="run">
        <Stat><StatLabel>Calls a minute</StatLabel><StatValue>38</StatValue></Stat>
        <Stat status="warn"><StatLabel>Limited</StatLabel><StatValue>0.7<StatUnit>%</StatUnit></StatValue></Stat>
        <Stat status="fail"><StatLabel>Failed</StatLabel><StatValue>0.2<StatUnit>%</StatUnit></StatValue></Stat>
        <Stat><StatLabel>p95</StatLabel><StatValue>212<StatUnit>ms</StatUnit></StatValue></Stat>
      </StatGroup>
      <div className="flex min-w-0 flex-col gap-6 @container/requests lg:flex-row lg:items-start">
        <RequestsTable
          rows={rows} agent="support-agent" paused={paused} setPaused={setPaused} maxHeight={480}
          onRowClick={setOpen} activeRowId={open?.id}
        />
        <Sheet modal={false} open={open !== null} onOpenChange={o => { if (!o) setOpen(null); }}>
          <SheetContent stackBelow="3xl" kind="run">
            {open && <>
              <SheetHeader><SheetTitle><span className="type-code text-text-1">{open.tool}</span> <span className="type-body-sm text-text-2">{open.agent}</span></SheetTitle></SheetHeader>
              <SheetBody>
                <SheetSection title="Call">
                  <SheetField label="Result"><ResultTag result={open.result}/></SheetField>
                  <SheetField label="Time"><span className="data">{open.time}</span></SheetField>
                  <SheetField label="Took"><span className="data">{took(open.ms)}</span></SheetField>
                  <SheetField label="ID" mono>{open.id}</SheetField>
                </SheetSection>
                <div className="flex flex-col gap-1.5">
                  <h3 className="type-label text-text-3">Output</h3>
                  <pre className="well overflow-x-auto p-4 type-code-sm">{JSON.stringify(open.result === 'failed' ? {error: 'timed out', retry_after: 10} : open.result === 'limited' ? {error: 'rate_limited', retry_after: 2} : {order: 'ord_4821', status: 'paid'}, null, 2)}</pre>
                </div>
              </SheetBody>
            </>}
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
}
