'use client';

import {memo, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {useVirtualizer} from '@tanstack/react-virtual';
import {Icon, ArrowDown, Search, ErrorOutline, Close, Return} from '@/components/quartz/icon';
import type {Kind} from '@/lib/quartz/kind';
import {useOffscreen} from '@/lib/quartz/use-offscreen';
import {cn} from '@/lib/quartz/utils';
import {CodeTag} from '@/components/quartz/ui/badge';
import {Button} from '@/components/quartz/ui/button';
import {CopyCodeButton, TokenLine, tokenize} from '@/components/quartz/ui/code-block';
import {Status} from '@/components/quartz/ui/status';

// Quartz's log viewer: a run's or an eval's output as it streams. One frame: a header (the label, the line
// count, Streaming or "2 failed", Next failure and Copy lines), a toolbar strip (search, the level cells, wrap) and
// the lines in a well. One row per line: time, level, source and message, in mono. Only warn and fail take hue,
// through data-status: a wash on the row and the level word in its text step beside it, so colour is never the
// only quartz. Debug drops to secondary text; info is plain text. While lines arrive the header says Streaming with a
// running arc; once a line fails it says how many failed.
//
// The level cells start unpressed, which shows every level. Pressing one narrows the log to the pressed levels,
// which fill, so a normal log never paints four filled cells.
//
// It sticks to the bottom while lines arrive. Scrolling up stops following and shows a count of new
// lines with a button back to the latest; reaching the bottom again resumes. Rows are windowed, so a
// 100,000-line log renders only what is on screen. Code stays left to right inside a right-to-left page.
//
// The detail that comes from the job: Next failure walks the fail lines by keyboard, so a failure 40,000 lines up is
// one press away. The jump button counts what arrived while the person read
// back, and how much of it failed: "38 new, 2 fail".

type LogLevel = 'debug' | 'info' | 'warn' | 'fail';
type LogLine = {
  id: string | number;
  /** A Date, epoch ms or a preformatted string. Shown as HH:MM:SS, in UTC unless preformatted. */
  time?: Date | number | string;
  level?: LogLevel;
  /** Where the line came from: a step, a tool, a model. */
  source?: string;
  message: string;
};

const levels: LogLevel[] = ['debug', 'info', 'warn', 'fail'];
const pad = (n: number) => String(n).padStart(2, '0');
const formatTime = (t: LogLine['time']) => {
  if (t === undefined) return '';
  if (typeof t === 'string') return t;
  const d = typeof t === 'number' ? new Date(t) : t;
  // UTC, like the logs it shows, and so the server and the browser print the same time.
  return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
};

function findAll(text: string, q: string): [number, number][] {
  if (!q) return [];
  const out: [number, number][] = [];
  const hay = text.toLowerCase();
  let at = hay.indexOf(q);
  while (at >= 0) { out.push([at, at + q.length]); at = hay.indexOf(q, at + q.length); }
  return out;
}

const lineText = (l: LogLine) => [formatTime(l.time), (l.level ?? 'info').toUpperCase(), l.source, l.message].filter(Boolean).join(' ');

/**
 * One row. Memoised: a scroll re-renders the viewer for the window's new rows, and the rows already on
 * screen keep their tokens and marks instead of being tokenised again every frame.
 */
const LogRow = memo(function LogRow({line, index, start, q, hit, timestamps, wrap, measure}: {
  line: LogLine; index: number; start: number; q: string; hit: boolean; timestamps: boolean; wrap: boolean; measure: (el: Element | null) => void;
}) {
  const level = line.level ?? 'info';
  const hot = level === 'warn' || level === 'fail';
  return <div
    data-index={index}
    ref={measure}
    data-slot="log-line"
    data-level={level}
    data-status={hot ? level : undefined}
    data-hit={hit || undefined}
    className={cn(
      // A row's layout never reaches outside it, so measuring one row does not lay out the rest.
      'absolute top-0 left-0 flex min-w-full items-start gap-3 px-4 type-code [contain:layout_style]',
      level === 'fail' && 'wash-row',
      level === 'debug' && 'text-text-2',
      // A search hit or the Next failure target: the full wash.
      'data-hit:bg-accent-wash forced-colors:data-hit:outline forced-colors:data-hit:outline-1',
    )}
    style={{transform: `translateY(${start}px)`}}
  >
    {timestamps && <span className="shrink-0 text-(--code-comment) data max-sm:hidden">{formatTime(line.time)}</span>}
    <span className="inline-flex h-5 w-(--log-level) shrink-0 items-center gap-1.5">
      <span className={hot ? (level === 'fail' ? 'text-fail-text' : 'text-warn-text') : 'text-(--code-comment)'}>{level}</span>
    </span>
    <span className={cn('min-w-0 flex-1', wrap ? 'whitespace-pre-wrap [overflow-wrap:anywhere]' : 'whitespace-pre')}>
      {line.source && <span className="text-(--code-comment)">{line.source} </span>}
      {/* No automatic ID underlines: in a log the most repeated ID would get the loudest mark. */}
      <TokenLine tokens={tokenize(line.message, 'text', {detectRefs: false})[0]} marks={findAll(line.message, q)}/>
    </span>
  </div>;
});

type LogViewerProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  lines: LogLine[];
  /** Stick to the bottom as lines arrive. Scrolling up pauses it; the jump button resumes it. */
  follow?: boolean;
  /** Lines are still arriving: "Streaming" with a running arc in the header. */
  streaming?: boolean;
  /** Show the toolbar strip: search, the level filters and the wrap toggle. Off by default; a long log a person searches turns it on. */
  toolbar?: boolean;
  /** Show the header: the label, the line count, the status, Next failure and Copy lines. */
  header?: boolean;
  /** Show the time column. */
  timestamps?: boolean;
  /** Start with long messages wrapped. Off, they run on and the log scrolls sideways. The toolbar toggle switches it. */
  wrap?: boolean;
  /** px. The log's fixed height; it scrolls inside. */
  height?: number;
  /** The header's title and the log's accessible name: a noun phrase, "Deploy log for api@v314". */
  label?: string;
  /** The kind of thing the log belongs to: an eval log is run, an agent log is agent. */
  kind?: Kind;
};

function LogViewer({lines, follow = true, streaming = false, toolbar = false, header = true, timestamps = true, wrap: defaultWrap = true, height = 360, label = 'Logs', kind, className, ...props}: LogViewerProps) {
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  // Empty means every level shows; pressing a level narrows the log to the pressed ones.
  const [shown, setShown] = useState<Set<LogLevel>>(() => new Set());
  const [wrap, setWrap] = useState(defaultWrap);
  const [following, setFollowing] = useState(follow);
  const [seenAt, setSeenAt] = useState(lines.length);
  const [hit, setHit] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const frameRef = useOffscreen<HTMLDivElement>(streaming);
  const q = query.trim().toLowerCase();

  const counts = useMemo(() => {
    const c: Record<LogLevel, number> = {debug: 0, info: 0, warn: 0, fail: 0};
    for (const line of lines) c[line.level ?? 'info'] += 1;
    return c;
  }, [lines]);
  const filtered = useMemo(
    () => lines.filter(l => (!shown.size || shown.has(l.level ?? 'info')) && (!q || l.message.toLowerCase().includes(q) || l.source?.toLowerCase().includes(q))),
    [lines, shown, q],
  );

  const virtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 20,
    overscan: 12,
    getItemKey: i => filtered[i].id,
    // Render the new window in React's next pass, not synchronously inside the scroll event, so the
    // browser lays the rows out once per frame instead of once per scroll event.
    useFlushSync: false,
  });

  // Follow: after new lines render, and again as their measured heights come in, pin to the bottom.
  const total = virtualizer.getTotalSize();
  useLayoutEffect(() => {
    if (!following || !filtered.length) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [filtered.length, following, total]);
  useEffect(() => { if (following) setSeenAt(lines.length); }, [following, lines.length]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el || !follow) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 8;
    if (atBottom !== following) setFollowing(atBottom);
  };
  // The jump button leaves once following resumes, so focus moves to the log body (one tab stop) first.
  const jump = () => { scrollRef.current?.focus({preventScroll: true}); setFollowing(true); virtualizer.scrollToIndex(filtered.length - 1, {align: 'end'}); };
  const unseen = Math.max(0, lines.length - seenAt);
  const unseenFails = useMemo(() => lines.slice(seenAt).filter(l => l.level === 'fail').length, [lines, seenAt]);
  const failures = counts.fail;
  const failIndexes = useMemo(() => filtered.flatMap((l, i) => (l.level === 'fail' ? [i] : [])), [filtered]);
  const goTo = (index: number) => {
    if (follow) setFollowing(false);
    setHit(index);
    virtualizer.scrollToIndex(index, {align: 'center'});
  };
  const nextFailure = () => {
    if (!failIndexes.length) return;
    const after = failIndexes.find(i => i > hit);
    goTo(after ?? failIndexes[0]);
  };
  const toggleLevel = (level: LogLevel) => setShown(prev => {
    const next = new Set(prev);
    if (next.has(level)) next.delete(level); else next.add(level);
    return next;
  });

  const empty = lines.length === 0
    ? <p className="px-4 py-6 type-body text-text-2">{streaming ? 'Waiting for the first line.' : 'No output.'}</p>
    : <p className="flex flex-wrap items-center gap-1.5 px-4 py-6 type-body text-text-2">{q ? <>No lines match <CodeTag>{query.trim()}</CodeTag></> : 'No lines at these levels.'}</p>;

  return <div
    ref={frameRef}
    data-slot="log-viewer"
    data-kind={kind}
    data-status={failures ? 'fail' : undefined}
    className={cn('frame flex min-w-0 flex-col bg-page text-text-1', className)}
    {...props}
  >
    {header && <div data-slot="log-viewer-header" className="frame-head rule-row">
      <span className="min-w-0 truncate type-label text-text-1">{label}</span>
      <span className="shrink-0 type-label text-text-3 data">{lines.length.toLocaleString('en-US')} {lines.length === 1 ? 'line' : 'lines'}</span>
      {streaming
        ? <Status status="running" className="ms-1 shrink-0">Streaming</Status>
        : failures > 0 && <Status status="fail" className="ms-1 shrink-0">{failures.toLocaleString('en-US')} failed</Status>}
      <span className="frame-head-action">
        {failIndexes.length > 0 && <Button data-slot="log-viewer-next-fail" variant="ghost" size="xs" onClick={nextFailure} aria-label={`Next failure, ${failIndexes.length} in this log`} className="px-2" data-status="fail">
          <Icon icon={ErrorOutline} size={16}/><span className="data">{failIndexes.length.toLocaleString('en-US')}</span>
        </Button>}
        {/* Built on press: joining 100,000 lines on every render made each scroll frame a long task. */}
        <CopyCodeButton size="icon-xs" text={() => filtered.map(lineText).join('\n')} label="Copy lines"/>
      </span>
    </div>}
    {toolbar && <div data-slot="log-viewer-toolbar" className="@container/logbar shrink-0 rule-row">
     {/* One row from 448px. Below it the search takes its own row and the level cells sit under it. The level
         counts show from 576px. */}
     <div className="flex flex-wrap items-stretch @md/logbar:flex-nowrap">
      <label className="search-row basis-full @md/logbar:basis-auto @md/logbar:flex-1">
        <Icon icon={Search} size={16}/>
        <input
          type="search"
          ref={searchRef}
          data-control=""
          aria-label={`Filter ${label}`}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => { if (e.key === 'Escape' && query) { e.preventDefault(); setQuery(''); } }}
          placeholder="Filter lines"
          className="search-field"
        />
        {q && <span className="shrink-0 type-label-sm text-text-3 data">{filtered.length.toLocaleString('en-US')}</span>}
        {query && <Button variant="ghost" size="icon-xs" aria-label="Clear filter" onClick={() => { setQuery(''); searchRef.current?.focus(); }} className="bg-transparent text-text-2 hover:text-text-1"><Icon icon={Close} size={16}/></Button>}
      </label>
      <div role="group" aria-label="Levels" className="flex min-w-0 flex-1 items-stretch @max-md/logbar:rule-top @md/logbar:flex-none">
        {levels.map(level => <button
          key={level}
          type="button"
          aria-pressed={shown.has(level)}
          onClick={() => toggleLevel(level)}
          className={cn(
            'inline-flex h-10 items-center gap-1.5 px-3 type-label-sm text-text-2 rule-col hover:bg-hover hover:text-text-1 focus-visible:focus-ring-inset @max-md/logbar:flex-1 @max-md/logbar:justify-center',
            'aria-pressed:bg-inverse aria-pressed:text-text-inverse aria-pressed:hover:bg-button-primary-hover aria-pressed:hover:text-text-inverse',
          )}
        >
          <span>{level}</span>
          <span className="hidden text-text-2 data @xl/logbar:inline">{counts[level].toLocaleString('en-US')}</span>
        </button>)}
        <button
          type="button"
          aria-label="Wrap lines"
          aria-pressed={wrap}
          onClick={() => setWrap(w => !w)}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-text-2 rule-col hover:bg-hover hover:text-text-1 focus-visible:focus-ring-inset aria-pressed:bg-pressed aria-pressed:text-text-1"
        ><Icon icon={Return} size={16}/></button>
      </div>
     </div>
    </div>}
    <div className="relative flex min-h-0 flex-col">
    <div
      ref={scrollRef}
      onScroll={onScroll}
      dir="ltr"
      data-slot="log-viewer-body"
      role="log"
      aria-live="off"
      aria-label={label}
      tabIndex={0}
      // Rows are flex rows, so a hand selection would copy one cell per line. Join each row's cells with
      // spaces, the way Copy lines writes them, time included.
      onCopy={event => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed || !selection.rangeCount) return;
        const rows = [...selection.getRangeAt(0).cloneContents().querySelectorAll('[data-slot=log-line]')];
        if (!rows.length) return;
        event.clipboardData.setData('text/plain', rows.map(row => [...row.children].map(cell => cell.textContent?.trim()).filter(Boolean).join(' ')).join('\n'));
        event.preventDefault();
      }}
      className={cn('min-h-0 well scroll-fade-y overflow-auto py-2 text-(--code-text) focus-visible:focus-ring-inset [scrollbar-width:thin]')}
      style={{height}}
    >
      {filtered.length === 0
        ? empty
        : <div className={cn('relative', !wrap && 'w-max min-w-full')} style={{height: virtualizer.getTotalSize()}}>
          {virtualizer.getVirtualItems().map(item => <LogRow
            key={item.key}
            line={filtered[item.index]}
            index={item.index}
            start={item.start}
            q={q}
            hit={item.index === hit}
            timestamps={timestamps}
            wrap={wrap}
            measure={virtualizer.measureElement}
          />)}
        </div>}
    </div>
    {!following && follow && filtered.length > 0 && <Button
      size="sm"
      onClick={jump}
      data-slot="log-viewer-jump"
      className="absolute end-5 bottom-3 shadow-overlay"
    >
      <Icon icon={ArrowDown} size={16}/>{unseen ? `${unseen.toLocaleString('en-US')} new${unseenFails ? `, ${unseenFails.toLocaleString('en-US')} fail` : ` ${unseen === 1 ? 'line' : 'lines'}`}` : 'Jump to latest'}
    </Button>}
    </div>
    <span role="status" className="sr-only">{failures ? `${failures} failed ${failures === 1 ? 'line' : 'lines'}` : ''}</span>
  </div>;
}

export {LogViewer, type LogLevel, type LogLine, type LogViewerProps};
