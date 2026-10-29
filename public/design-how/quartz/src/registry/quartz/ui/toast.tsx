'use client';

import {isValidElement, useEffect, useLayoutEffect, useRef, useState, type ReactNode} from 'react';
import {Toast as ToastPrimitive} from '@base-ui/react/toast';
import {useDomDirection} from '@/lib/quartz/direction';
import {cn} from '@/lib/quartz/utils';
import {cssNumber} from '@/lib/quartz/css-var';
import {useQuartzPortal} from '@/lib/quartz/portal';
import {Icon, Close as CloseIcon} from '@/components/quartz/icon';
import {buttonVariants} from '@/components/quartz/ui/button';
import {StatusArc} from '@/components/quartz/ui/status';

// Confirms an action or reports a background event, then leaves. Base UI's Toast underneath, with a
// function-style call (`toast('Published refund-prompt v14')`) on top. Mount one <Toaster/> per app; it portals
// into the Quartz root.
//
// The considered detail is the timer. A toast stays as long as it takes to read, not a fixed 5
// seconds: 3 seconds plus 60ms per character of title and description (about 200 words a minute),
// plus 3 seconds when it has an action to decide on, between 4 and 12 seconds. A 2px line along the
// bottom drains over exactly that time, so the person can see how long is left, and it stops while the
// pointer is over the stack, while focus is in it, and while the window is in the background, the same
// moments Base UI pauses the timer. fail and loading never time out.
//
// The look: paper like every other overlay, 10px frame radius and the overlay shadow (its 1px ring is the edge), stacked at the bottom end on
// desktop and full width at the bottom on phones. The title takes the warn or fail text colour, and a
// running arc leads a loading toast; the other kinds have nothing before the title.
//
// The limit (3) never hides a fail: fails always show, routine toasts fill what is left oldest first,
// and the newest routine toast waits with its timer stopped. A closed toast leaves at once, and the
// toasts around it glide to their new place over --dur-base.

const toastManager = ToastPrimitive.createToastManager();

type ToastKind = 'default' | 'success' | 'warn' | 'fail' | 'loading';

type ToastOptions = {
  description?: ReactNode;
  /** One action, like Undo or View. Adds 3 seconds to the timer. */
  action?: {label: ReactNode; onClick: () => void};
  /** ms before it leaves. 0 keeps it until closed. Defaults to the reading time; 0 for fail and loading. */
  timeout?: number;
  /** Reusing an id replaces that toast in place. */
  id?: string;
  onClose?: () => void;
};

/** Characters of readable text in a node, walking elements; a node it cannot read counts as 40. */
function textLength(node: ReactNode): number {
  if (node === null || node === undefined || typeof node === 'boolean') return 0;
  if (typeof node === 'string' || typeof node === 'number') return String(node).length;
  if (Array.isArray(node)) return node.reduce<number>((sum, n) => sum + textLength(n), 0);
  if (isValidElement<{children?: ReactNode}>(node)) return textLength(node.props.children);
  return 40;
}

/** The reading time in ms: 3s plus 60ms a character, plus 3s with an action, clamped to 4 to 12 seconds. */
function readingTimeout(title: ReactNode, description?: ReactNode, hasAction = false) {
  // The numbers are the --toast-read-* tokens, read off the Quartz root.
  const root = typeof document === 'undefined' ? null : document.querySelector('.quartz');
  const read = (name: string, fallback: number) => cssNumber(root, `--toast-read-${name}`, fallback);
  const ms = read('base', 3000) + read('char', 60) * (textLength(title) + textLength(description)) + (hasAction ? read('action', 3000) : 0);
  return Math.min(read('max', 12000), Math.max(read('min', 4000), Math.round(ms / 100) * 100));
}

function timeoutFor(kind: ToastKind, title: ReactNode, options: ToastOptions) {
  if (options.timeout !== undefined) return options.timeout;
  if (kind === 'fail' || kind === 'loading') return 0;
  return readingTimeout(title, options.description, !!options.action);
}

/**
 * Everything a toast shows, from one call's arguments. add and update both build through this, so an
 * update replaces the whole toast (an action left out is gone) and never drops a field add would set.
 */
function toastFields(kind: ToastKind, title: ReactNode, options: Omit<ToastOptions, 'id'>) {
  const {description, action, onClose} = options;
  const timeout = timeoutFor(kind, title, options);
  return {
    title,
    description,
    type: kind,
    timeout,
    priority: kind === 'fail' ? 'high' as const : 'low' as const,
    onClose,
    data: {timeout},
    actionProps: action ? {children: action.label, onClick: action.onClick} : undefined,
  };
}

function add(kind: ToastKind, title: ReactNode, options: ToastOptions = {}) {
  // A toast with no title is a box holding only a close button: drop it and return no id.
  if (textLength(title) === 0 && !isValidElement(title)) return '';
  return toastManager.add({id: options.id, ...toastFields(kind, title, options)});
}

/** Shows a toast and returns its id. */
const toast = Object.assign((title: ReactNode, options?: ToastOptions) => add('default', title, options), {
  success: (title: ReactNode, options?: ToastOptions) => add('success', title, options),
  warn: (title: ReactNode, options?: ToastOptions) => add('warn', title, options),
  fail: (title: ReactNode, options?: ToastOptions) => add('fail', title, options),
  loading: (title: ReactNode, options?: ToastOptions) => add('loading', title, options),
  /** Loading while the promise runs, then success or fail in the same toast. */
  promise: <T,>(promise: Promise<T>, labels: {loading: ReactNode; success: ReactNode | ((value: T) => ReactNode); fail: ReactNode | ((error: unknown) => ReactNode)}) =>
    toastManager.promise(promise, {
      loading: {title: labels.loading, type: 'loading', timeout: 0, data: {timeout: 0}},
      success: value => {
        const title = typeof labels.success === 'function' ? (labels.success as (v: T) => ReactNode)(value) : labels.success;
        const timeout = readingTimeout(title);
        return {title, type: 'success', timeout, data: {timeout}};
      },
      error: error => ({title: typeof labels.fail === 'function' ? (labels.fail as (e: unknown) => ReactNode)(error) : labels.fail, type: 'fail', priority: 'high', timeout: 0, data: {timeout: 0}}),
    }),
  /** Replaces a toast in place: its kind, title and every option, so pass the action again to keep it. */
  update: (id: string, kind: ToastKind, title: ReactNode, options: Omit<ToastOptions, 'id'> = {}) =>
    toastManager.update(id, toastFields(kind, title, options)),
  dismiss: (id?: string) => toastManager.close(id),
});

type ToasterProps = {
  /**
   * Renders the stack in place instead of fixed to the window, for docs and previews. An inline stack is a
   * specimen: a plain group, not a live "Notifications" region, so a page with several still has one.
   */
  inline?: boolean;
  /**
   * Most toasts visible at once. A fail toast always shows and takes a slot; routine toasts fill the rest
   * oldest first, and the newest routine toast waits, its timer stopped, until there is room.
   */
  limit?: number;
  /** A manager from createToastManager, for a toaster separate from toast(). */
  manager?: typeof toastManager;
  className?: string;
};

/** Mount once. Renders every toast created with toast(). */
function Toaster({inline, limit = 3, manager = toastManager, className}: ToasterProps) {
  const container = useQuartzPortal();
  const [away, setAway] = useState(false);
  // Base UI pauses timers while the window is in the background; the drain line pauses with them.
  useEffect(() => {
    const sync = () => setAway(!document.hasFocus());
    sync();
    window.addEventListener('blur', sync);
    window.addEventListener('focus', sync);
    return () => { window.removeEventListener('blur', sync); window.removeEventListener('focus', sync); };
  }, []);
  const viewport = <ToastPrimitive.Viewport
    data-slot="toast-viewport"
    data-away={away || undefined}
    {...(inline ? {role: 'group', 'aria-live': 'off' as const, 'aria-label': 'Example toasts'} : {})}
    className={cn(
      'group/toasts @container/toast flex w-full flex-col-reverse gap-2 outline-none',
      // On phones the stack clears the home indicator: the bottom padding is the gutter or the safe area, whichever is larger.
      inline ? 'relative' : 'fixed z-(--z-overlay) end-0 bottom-0 p-(--gutter-sm) pb-[max(var(--gutter-sm),env(safe-area-inset-bottom))] sm:end-(--gutter) sm:bottom-(--gutter) sm:w-toast sm:p-0',
      className,
    )}
  >
    <ToastList limit={limit} manager={manager}/>
  </ToastPrimitive.Viewport>;
  // Base UI's own limit hides the oldest, which would hide a held fail behind routine toasts
  // (trap/toast-errors). ToastList applies Quartz's limit instead, so Base UI's is off.
  return <ToastPrimitive.Provider toastManager={manager} limit={Number.MAX_SAFE_INTEGER}>
    {inline ? viewport : <ToastPrimitive.Portal container={container}>{viewport}</ToastPrimitive.Portal>}
  </ToastPrimitive.Provider>;
}

type ToastObject = ReturnType<typeof ToastPrimitive.useToastManager>['toasts'][number];

/**
 * Which toasts wait. Fail toasts always show. Routine toasts fill the slots left, oldest first, so the
 * newest routine toast is the one that waits. Leaving toasts take no slot.
 */
function waitingIds(toasts: ToastObject[], limit: number) {
  const live = toasts.filter(t => t.transitionStatus !== 'ending');
  const fails = live.filter(t => t.type === 'fail').length;
  // toasts come newest first; walk oldest first.
  const routine = live.filter(t => t.type !== 'fail').reverse();
  return new Set(routine.slice(Math.max(0, limit - fails)).map(t => t.id));
}

function ToastList({limit, manager}: {limit: number; manager: typeof toastManager}) {
  const {toasts} = ToastPrimitive.useToastManager();
  const waiting = waitingIds(toasts, limit);
  const key = [...waiting].join(' ');
  // A waiting toast's timer stops, so it cannot time out unseen; it starts over when the toast shows.
  const parked = useRef(new Set<string>());
  useEffect(() => {
    for (const t of toasts) {
      const ms = (t.data as {timeout?: number} | undefined)?.timeout ?? 0;
      if (!ms || t.transitionStatus === 'ending') continue;
      if (waiting.has(t.id) && !parked.current.has(t.id)) { parked.current.add(t.id); manager.update(t.id, {timeout: 0}); }
      else if (!waiting.has(t.id) && parked.current.has(t.id)) { parked.current.delete(t.id); manager.update(t.id, {timeout: ms}); }
    }
    // key captures the waiting set; toasts changes on every update.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, manager]);
  // When a toast leaves or arrives, the others glide to their new place instead of jumping (FLIP).
  const nodes = useRef(new Map<string, HTMLElement>());
  const tops = useRef(new Map<string, number>());
  useLayoutEffect(() => {
    const next = new Map<string, number>();
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    nodes.current.forEach((el, id) => {
      if (!el.offsetParent || !el.parentElement) return;
      const top = el.parentElement.getBoundingClientRect().top + el.offsetTop;
      next.set(id, top);
      const before = tops.current.get(id);
      if (before === undefined || Math.abs(before - top) < 1 || still) return;
      el.getAnimations().forEach(a => { if (a.id === 'toast-flip') a.cancel(); });
      const root = el.closest('.quartz');
      el.animate([{transform: `translateY(${before - top}px)`}, {transform: 'none'}], {
        id: 'toast-flip',
        duration: cssNumber(root, '--dur-base', 200),
        easing: root ? getComputedStyle(root).getPropertyValue('--ease-step').trim() || 'ease-out' : 'ease-out',
      });
    });
    tops.current = next;
  });
  const register = (id: string) => (el: HTMLElement | null) => { if (el) nodes.current.set(id, el); else nodes.current.delete(id); };
  return toasts.map(t => <ToastItem key={t.id} toast={t} waiting={waiting.has(t.id)} nodeRef={register(t.id)}/>);
}

/**
 * The drain line: 2px along the whole bottom edge that shrinks to nothing over the timeout and pauses with its timer.
 */
function ToastTimer({ms}: {ms: number}) {
  if (!ms) return null;
  return <span
    aria-hidden
    data-slot="toast-timer"
    className={cn(
      'pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left bg-text-3 rtl:origin-right',
      'animate-[quartz-toast-drain_linear_forwards] motion-reduce:hidden',
      'group-data-expanded/toasts:[animation-play-state:paused] group-data-away/toasts:[animation-play-state:paused]',
    )}
    style={{animationDuration: `${ms}ms`}}
  />;
}

function ToastItem({toast: t, waiting, nodeRef}: {toast: ToastObject; waiting: boolean; nodeRef: (el: HTMLElement | null) => void}) {
  const kind = (t.type ?? 'default') as ToastKind;
  const ms = (t.data as {timeout?: number} | undefined)?.timeout ?? t.timeout ?? 0;
  // The stack sits at the inline end, so a sideways swipe toward that edge dismisses: right, or left in right to left.
  const end = useDomDirection(useQuartzPortal()) === 'rtl' ? 'left' : 'right';
  const status = kind === 'warn' || kind === 'fail' ? kind : undefined;
  return <ToastPrimitive.Root
    ref={nodeRef}
    toast={t}
    data-slot="toast"
    data-kind-of-toast={kind}
    data-timeout={ms || undefined}
    data-waiting={waiting || undefined}
    // warn and fail: the title in the status text colour. A loading toast leads with its ring.
    data-status={status}
    swipeDirection={['down', end]}
    className={cn(
      // A grid so the action can drop under the text when the stack is narrow; the close stays on the first line.
      'relative grid w-full grid-cols-[minmax(0,1fr)_auto_auto] items-start gap-x-3 [grid-template-areas:"content_action_close"] overflow-hidden rounded-frame bg-page py-3 ps-4 pe-2 text-text-1 shadow-overlay select-none',
      '@max-[22rem]/toast:gap-y-1 @max-[22rem]/toast:[grid-template-areas:"content_content_close"_"action_action_action"]',
      'translate-x-(--toast-swipe-movement-x) translate-y-(--toast-swipe-movement-y)',
      'transition-[translate,opacity] duration-(--dur-base) ease-(--ease-step) data-swiping:transition-none',
      'data-starting-style:translate-y-2 data-starting-style:opacity-0',
      // A closed toast leaves at once: no fading box that still takes clicks, and the stack closes up in the same frame.
      'data-ending-style:hidden data-waiting:hidden motion-reduce:transition-none forced-colors:outline forced-colors:outline-1',
    )}
  >
    <ToastPrimitive.Content data-slot="toast-content" className="flex min-w-0 flex-1 items-start gap-2 [grid-area:content]">
      {kind === 'loading' && <span aria-hidden className="flex h-4 shrink-0 items-center"><StatusArc/></span>}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <ToastPrimitive.Title data-slot="toast-title" className={cn('type-label break-words', kind === 'fail' && 'text-fail-text', kind === 'warn' && 'text-warn-text')}/>
        <ToastPrimitive.Description data-slot="toast-description" className="type-body-sm break-words text-text-2 empty:hidden"/>
      </div>
    </ToastPrimitive.Content>
    {t.actionProps && <ToastPrimitive.Action data-slot="toast-action" className={buttonVariants({variant: 'secondary', size: 'xs', className: '-my-1 self-start [grid-area:action] @max-[22rem]/toast:my-0 @max-[22rem]/toast:ms-7 @max-[22rem]/toast:justify-self-start'})}/>}
    {/* 24px tall on a 16px title line: -my-1 centres it on that line without making the row taller. */}
    <ToastPrimitive.Close data-slot="toast-close" aria-label="Dismiss" className={buttonVariants({variant: 'ghost', size: 'icon-xs', className: '-my-1 self-start bg-transparent text-text-2 [grid-area:close] hover:text-text-1 active:bg-pressed'})}>
      <Icon icon={CloseIcon} size={16}/>
    </ToastPrimitive.Close>
    {!waiting && <ToastTimer key={`${t.id}-${ms}-${String(t.title)}`} ms={ms}/>}
  </ToastPrimitive.Root>;
}

export {Toaster, toast, toastManager, readingTimeout, type ToastKind, type ToastOptions, type ToasterProps};
