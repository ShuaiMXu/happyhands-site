'use client';

import {useRef, useState} from 'react';
import {useScrollTabStop} from '@/lib/sodium/scroll';
import {cn} from '@/lib/sodium/utils';
import {CopyButton} from '@/components/sodium/ui/copy-button';
import {TokenLine, WrapToggle, gutterStyle, languageLabels, maxLinesStyle, parseLines, tokenize, type Language} from '@/components/sodium/ui/code-block';

// Sodium's code window: a file shown as a window onto a step of a pipeline, where Code block is a snippet to copy. It
// is one frame that opens with the region header every Sodium region has: the filename as written (the language's
// name when there is none; the extension already says the language), then wrap and copy as 26px icon cells at its
// end, wrap first and copy last. No window controls: squares that do nothing are decoration. Under the header's rule,
// the numbered lines sit on the page, not the well, because the window is a view of the file, not an inset in a page
// of prose. The numbers start 12px in, on the header's inset (--inset), and the lines have 12px above and below.
//
// Lines are always numbered, in text-3, in a gutter that copy and selection skip. A failing line (fail) takes a band
// of the failure wash across the whole window, its number in the failure word, and a FAIL label at its end, so the
// line that broke a run reads at a glance and in forced colours; the code on it stays ink, so it still reads. A
// highlighted line takes the selection wash. Syntax is Code block's: ink at its steps.

type CodeWindowProps = Omit<React.ComponentProps<'figure'>, 'children' | 'onCopy'> & {
  /** The source, one string. A trailing newline is dropped. */
  code: string;
  /** The tokenizer. */
  language?: Language;
  /** The window's title, as written: a path or a filename. Without one the language's name stands in. */
  filename?: string;
  /** The first line's number, for an excerpt from a longer file. */
  startLine?: number;
  /** 1-based lines that failed: [4] or "4,9". Each takes the failure band. */
  fail?: number[] | string;
  /** The label at the end of a failing line, in mono capitals. */
  failLabel?: string;
  /** 1-based lines to mark with the selection wash: [3] or "3-4". */
  highlight?: number[] | string;
  /** Start wrapped instead of scrolling sideways. */
  defaultWrap?: boolean;
  /** Past this many lines the body scrolls. */
  maxLines?: number;
  /** The copy cell in the title bar. */
  copy?: boolean;
  /** What is copied, for the copy cell's name. */
  copyLabel?: string;
  onCopy?: (text: string) => void;
};

function CodeWindow({code, language = 'text', filename, startLine = 1, fail, failLabel = 'Fail', highlight, defaultWrap = false, maxLines, copy = true, copyLabel = 'code', onCopy, className, ...props}: CodeWindowProps) {
  const [wrap, setWrap] = useState(defaultWrap);
  const body = useRef<HTMLDivElement>(null);
  const tab = useScrollTabStop(body);
  const source = code.replace(/\n$/, '');
  const lines = tokenize(source, language);
  const failed = parseLines(fail);
  const marked = parseLines(highlight);
  const name = filename ?? languageLabels[language];

  return <figure
    data-slot="code-window"
    data-status={failed.size ? 'fail' : undefined}
    className={cn('frame flex flex-col overflow-hidden text-text-1', className)}
    {...props}
  >
    <figcaption data-slot="code-window-header" className="panel-head shrink-0">
      <span data-slot="code-window-title" className="me-auto min-w-0 truncate text-text-1">{name}</span>
      <span data-slot="code-window-actions" className="panel-head-actions">
        <WrapToggle wrap={wrap} onWrap={setWrap}/>
        {copy && <CopyButton value={source} label={copyLabel} onCopy={onCopy}/>}
      </span>
    </figcaption>
    <div
      ref={body}
      data-slot="code-window-body"
      tabIndex={tab}
      role={tab === 0 ? 'region' : undefined}
      aria-label={tab === 0 ? name : undefined}
      dir="ltr"
      className={cn('min-h-0 overflow-auto overscroll-contain bg-page py-inset type-code focus-visible:focus-ring-inset', maxLines && 'max-h-(--code-max)')}
      // value-ok: the cap is the caller's number of lines, so it can only live inline as a custom property.
      style={maxLinesStyle(maxLines)}
    >
      <pre className={wrap ? 'w-full' : 'w-max min-w-full'}>
        <code className="block">
          {lines.map((tokens, i) => {
            const n = startLine + i;
            const bad = failed.has(n);
            const on = !bad && marked.has(n);
            return <span
              key={i}
              data-slot="code-window-line"
              data-fail={bad || undefined}
              data-highlighted={on || undefined}
              className={cn('flex pe-inset', bad && 'bg-fail-tint', on && 'bg-selected', (bad || on) && 'forced-colors:outline forced-colors:outline-1 forced-colors:-outline-offset-1')}
            >
              <span aria-hidden data-slot="code-window-number" className={cn('sticky start-0 w-(--gutter) shrink-0 px-inset text-end select-none', bad ? 'bg-fail-tint text-fail-text' : on ? 'bg-selected text-text-3' : 'bg-page text-text-3')} style={gutterStyle(startLine + lines.length - 1)}>{n}</span>
              {/* "Failed" and "Highlighted" are generated content: read aloud, never selected or copied. */}
              <span className={cn('min-w-0 flex-1', wrap ? 'whitespace-pre-wrap [overflow-wrap:anywhere]' : 'whitespace-pre', bad && "before:sr-only before:content-['Failed:_']", on && "before:sr-only before:content-['Highlighted:_']")}><TokenLine tokens={tokens}/></span>
              {bad && <span aria-hidden data-slot="code-window-fail" className="sticky end-inset ms-6 shrink-0 self-center bg-fail-tint ps-2 type-label-sm text-fail-text select-none">{failLabel}</span>}
            </span>;
          })}
        </code>
      </pre>
    </div>
  </figure>;
}

export {CodeWindow, type CodeWindowProps};
