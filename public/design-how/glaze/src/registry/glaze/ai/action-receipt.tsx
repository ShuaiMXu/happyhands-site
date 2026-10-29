'use client';

import {useEffect, useId, useState, type ReactNode} from 'react';
import {Icon, Undo} from '@/components/glaze/icon';
import {cn} from '@/lib/glaze/utils';
import {Button} from '@/components/glaze/ui/button';
import {Card, CardAction, CardContent, CardFooter, CardHeader, CardMeta, CardTitle} from '@/components/glaze/ui/card';
import {RelativeTime} from '@/components/glaze/ui/relative-time';
import {Status, type StatusValue} from '@/components/glaze/ui/status';
import {StepGlyph} from '@/components/glaze/ai/activity';

// The record of something an agent did, after it did it: what, the result, when, and Undo while it can be undone.
// It is the card: the title in the panel says the action in the past tense with its object and amount ("Refunded
// $48.00 on order 4812"), the result sits at the header's end as a Status word, the steps (if more than one thing
// changed) list under it with the step glyph a tool row uses, and the shell's footer holds who did it and when, then
// Undo.
//
// Undo is the flat secondary, never glass: reversing is not the next step the card leads to. It shows while onUndo is
// set and undoUntil has not passed, and leaves on its own at that moment. undoing holds it pending; undone swaps the
// result for the word Undone, greys the steps and drops the button.
//
// result is what happened: done, partial (some steps failed, and those keep their reason), failed (nothing changed).
// A failed receipt has nothing to undo, so it never shows Undo.

type ActionReceiptResult = 'done' | 'partial' | 'failed';

type ActionReceiptStep = {
  /** Past tense with its object: "Refunded $48.00". */
  label: ReactNode;
  /** A count, an amount, an ID, or why it failed. */
  detail?: ReactNode;
  failed?: boolean;
};

type ActionReceiptLabels = {
  done?: string;
  partial?: string;
  failed?: string;
  undone?: string;
  undo?: string;
  undoing?: string;
};

const defaultLabels: Required<ActionReceiptLabels> = {
  done: 'Done', partial: 'Partly done', failed: 'Failed', undone: 'Undone', undo: 'Undo', undoing: 'Undoing',
};

const resultStatus: Record<ActionReceiptResult, StatusValue> = {done: 'ok', partial: 'warn', failed: 'fail'};

type ActionReceiptProps = Omit<React.ComponentProps<'div'>, 'title' | 'children'> & {
  /** What the agent did, in the past tense with its object: "Refunded $48.00 on order 4812". */
  title: ReactNode;
  /** The steps, when more than one thing changed. Each keeps its own result. */
  steps?: ActionReceiptStep[];
  result?: ActionReceiptResult;
  /** When it happened. */
  at?: Date | string | number;
  /** Freeze "now" for the time, for tests and docs. */
  now?: Date | string | number;
  /** Who did it: the agent's or the tool's name. Before the time in the footer. */
  by?: ReactNode;
  /** Reverses the action. Undo shows only while it is set. */
  onUndo?: () => void;
  /** The last moment Undo works. Undo leaves when it passes. */
  undoUntil?: Date | string | number;
  /** The undo is running. */
  undoing?: boolean;
  /** The action was reversed. */
  undone?: boolean;
  /** Every word the receipt says, for another language. */
  labels?: ActionReceiptLabels;
};

const ms = (value: Date | string | number) => (value instanceof Date ? value.getTime() : typeof value === 'number' ? value : new Date(value).getTime());

/** True until the moment passes, then false; re-renders once, at that moment. */
function useBefore(until: Date | string | number | undefined, now?: Date | string | number) {
  const end = until === undefined ? undefined : ms(until);
  const frozen = now === undefined ? undefined : ms(now);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (end === undefined || frozen !== undefined) return;
    const left = end - Date.now();
    if (left <= 0) { setOpen(false); return; }
    setOpen(true);
    const timer = setTimeout(() => setOpen(false), Math.min(left, 2 ** 31 - 1));
    return () => clearTimeout(timer);
  }, [end, frozen]);
  if (end === undefined) return true;
  if (frozen !== undefined) return frozen < end;
  return open;
}

function ActionReceipt({title, steps, result = 'done', at, now, by, onUndo, undoUntil, undoing = false, undone = false, labels, className, ...props}: ActionReceiptProps) {
  const words = {...defaultLabels, ...labels};
  const titleId = useId();
  const inWindow = useBefore(undoUntil, now);
  const canUndo = !!onUndo && !undone && result !== 'failed' && (inWindow || undoing);
  // While the undo runs the result stands; Undo itself shows the arc, so the word is said once.
  const status: StatusValue = undone ? 'idle' : resultStatus[result];
  const word = undone ? words.undone : words[result];
  const meta = (by || at !== undefined) && <CardMeta>
    {by}{by && at !== undefined && ', '}{at !== undefined && <RelativeTime date={at} now={now}/>}
  </CardMeta>;

  return <Card
    data-slot="action-receipt"
    data-result={result}
    data-undone={undone || undefined}
    role="group"
    aria-labelledby={titleId}
    className={className}
    {...props}
  >
    <CardHeader>
      <CardTitle id={titleId} data-slot="action-receipt-title" className={cn(undone && 'text-text-2')}>{title}</CardTitle>
      {/* A block in the title's line box, so the smaller Status sits on the title's baseline. */}
      <CardAction className="my-0 block h-lh type-label">
        <Status status={status} size="sm" data-slot="action-receipt-result">{word}</Status>
      </CardAction>
    </CardHeader>
    {steps && steps.length > 0 && <CardContent className="gap-0 pt-0">
      <ul data-slot="action-receipt-steps" className="flex min-w-0 flex-col">
        {steps.map((step, i) => <li key={i} data-slot="action-receipt-step" data-failed={step.failed || undefined} className="flex min-h-(--menu-row-sm) min-w-0 items-center gap-2 type-body-sm">
          <StepGlyph state={undone ? 'stopped' : step.failed ? 'fail' : 'done'}/>
          <span className="sr-only">{step.failed ? `${words.failed}: ` : undone ? `${words.undone}: ` : `${words.done}: `}</span>
          <span className={cn('min-w-0 truncate', undone ? 'text-text-2' : 'text-text-1')}>{step.label}</span>
          {step.detail !== undefined && <span className={cn('ms-auto min-w-0 shrink truncate text-end data', step.failed && !undone ? 'text-fail-text' : 'text-text-2')}>{step.detail}</span>}
        </li>)}
      </ul>
    </CardContent>}
    {(meta || canUndo) && <CardFooter data-slot="action-receipt-footer">
      {meta}
      {canUndo && <Button size="sm" variant="secondary" pending={undoing} pendingLabel={words.undoing} onClick={onUndo} data-slot="action-receipt-undo">
        <Icon icon={Undo}/>{words.undo}
      </Button>}
    </CardFooter>}
    {/* Says the change once: the result settling, or Undone. */}
    <span role="status" className="sr-only">{undone ? words.undone : ''}</span>
  </Card>;
}

export {ActionReceipt, type ActionReceiptProps, type ActionReceiptStep, type ActionReceiptResult, type ActionReceiptLabels};
