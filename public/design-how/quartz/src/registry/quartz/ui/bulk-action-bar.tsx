'use client';

import * as React from 'react';
import {Toolbar as ToolbarPrimitive} from '@base-ui/react/toolbar';
import {Icon, Close} from '@/components/quartz/icon';
import {cn, mergeClass} from '@/lib/quartz/utils';
import {Button, type ButtonProps} from '@/components/quartz/ui/button';

// Quartz's bulk action bar: actions for the rows a person has selected. An inverse surface
// (data-surface="inverse": ink on a light page, paper in the dark theme) so it reads as a different
// layer from the table it acts on, 44px tall on the frame corner, with the count 16px from the
// left edge, the actions after it and a clear button 8px from the right edge. It is a toolbar (Base UI Toolbar): one tab
// stop, arrow keys between actions, and Escape clears the selection. It hides when nothing is selected,
// but its status region stays mounted so "3 runs selected" and "Selection cleared" are announced.

type BulkActionBarProps = Omit<ToolbarPrimitive.Root.Props, 'children'> & {
  /** How many rows are selected. 0 hides the bar. */
  count: number;
  /** The thing selected, singular and plural: ['run', 'runs']. */
  noun?: [string, string];
  /** Clears the selection. Bound to the clear button and to Escape. */
  onClear?: () => void;
  /** Where the bar sits. inline: above the table, in flow. floating: fixed to the bottom of the viewport. */
  position?: 'inline' | 'floating';
  children?: React.ReactNode;
};

function BulkActionBar({count, noun = ['item', 'items'], onClear, position = 'inline', className, children, onKeyDown, ...props}: BulkActionBarProps) {
  const label = `${count} ${count === 1 ? noun[0] : noun[1]} selected`;
  const [announcement, setAnnouncement] = React.useState('');
  const previous = React.useRef(count);
  React.useEffect(() => {
    if (count === previous.current) return;
    setAnnouncement(count === 0 ? 'Selection cleared' : label);
    previous.current = count;
  }, [count, label]);

  return <>
    <ToolbarPrimitive.Root
      data-slot="bulk-action-bar"
      data-surface="inverse"
      data-position={position}
      aria-label={`Actions for ${label}`}
      hidden={count === 0}
      onKeyDown={event => {
        if (event.key === 'Escape' && onClear) { event.preventDefault(); onClear(); }
        onKeyDown?.(event);
      }}
      className={mergeClass([
        'flex h-(--control-lg) max-w-full items-center gap-1 rounded-frame bg-page py-2 pe-2 ps-4 text-text-1',
        'data-[position=floating]:fixed data-[position=floating]:bottom-6 data-[position=floating]:left-1/2 data-[position=floating]:z-(--z-drop) data-[position=floating]:-translate-x-1/2 data-[position=floating]:shadow-overlay',
        count === 0 && 'hidden',
      ], className)}
      {...props}
    >
      <span data-slot="bulk-action-bar-count" className="me-2 shrink-0 type-label whitespace-nowrap"><span className="data">{count}</span> selected</span>
      <span aria-hidden className="me-1 h-5 w-px shrink-0 bg-strong"/>
      <div className="flex min-w-0 items-center gap-1 overflow-x-auto">{children}</div>
      {onClear && <ToolbarPrimitive.Button
        render={<Button variant="ghost" size="icon-sm"/>}
        aria-label="Clear selection"
        onClick={onClear}
        className="ms-auto shrink-0"
      ><Icon icon={Close} size={16}/></ToolbarPrimitive.Button>}
    </ToolbarPrimitive.Root>
    <span role="status" className="sr-only">{announcement}</span>
  </>;
}

type BulkActionProps = Omit<ButtonProps, 'variant' | 'size'> & {
  /** fail: for delete and revoke. It keeps the ghost look and sets the label in the fail text color. */
  status?: 'default' | 'fail';
  /** @deprecated Use status="fail". */
  tone?: 'default' | 'destructive';
};

/** One action in the bar: a small ghost button that joins the toolbar's arrow-key order. */
function BulkAction({status, tone, className, children, ...props}: BulkActionProps) {
  return <ToolbarPrimitive.Button
    data-slot="bulk-action"
    render={<Button variant="ghost" size="sm"/>}
    className={mergeClass(['shrink-0', (status === 'fail' || tone === 'destructive') && 'text-fail-text'], className)}
    {...(props as ToolbarPrimitive.Button.Props)}
  >
    {children}
  </ToolbarPrimitive.Button>;
}

export {BulkActionBar, BulkAction, type BulkActionBarProps, type BulkActionProps};
