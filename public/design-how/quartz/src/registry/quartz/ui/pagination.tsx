'use client';

import * as React from 'react';
import {Icon, ChevronLeft, ChevronRight, OverflowMenuHorizontal} from '@/components/quartz/icon';
import {cn} from '@/lib/quartz/utils';

// Moves through pages of results: page links are plain <a> elements, so they keep the link
// role (open in a new tab, "link" to a screen reader). The nav is one strip of --control (32px) cells that share their
// lines (Previous, the numbers, the ellipses, Next), with only the outer corners round. The current page takes the
// selected wash and the darker edge, as a pressed chip does. Hover darkens a cell's edge. In a DataTable footer the strip
// sits beside its info line.
//
// The considered detail is that nothing moves under the pointer. PaginationNav always shows seven
// slots (first, last, the current page with one either side, and ellipses), and every number slot is
// as wide as the largest page number in tabular figures, so Next stays at the same x on page 1 and on
// page 1,204. Clicking Next ten times hits Next ten times. With pages unknown (a cursor API) it shows
// Previous and Next only, and the info line says "Page 3" instead of a total it does not have. When the
// container is narrower than the measured row (a hidden copy, so 4-digit page counts count), the slots
// give way to "Page 4 of 24" between the arrows, and the arrows never leave the box.

function Pagination({className, ...props}: React.ComponentProps<'nav'>) {
  return <nav aria-label="Pagination" data-slot="pagination" className={cn('@container/pagination flex w-full min-w-0 items-center justify-center', className)} {...props}/>;
}

function PaginationContent({className, ...props}: React.ComponentProps<'ul'>) {
  return <ul data-slot="pagination-content" className={cn('flex items-center', className)} {...props}/>;
}

function PaginationItem({className, ...props}: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" className={cn('frame-shared flex has-[a:hover:not([aria-disabled])]:frame-ink has-[a:hover:not([aria-disabled])]:[--frame-color:var(--line-control-hover)]! has-[[aria-current=page]]:frame-ink has-[[aria-current=page]]:[--frame-color:var(--line-control-hover)]!', className)} {...props}/>;
}

type PaginationLinkProps = {
  isActive?: boolean;
  /** A page that cannot be reached, like Previous on page 1. Stays visible and is skipped by Tab. */
  disabled?: boolean;
  size?: 'default' | 'icon';
} & React.ComponentProps<'a'>;

function PaginationLink({className, isActive, disabled, size = 'icon', href, children, ...props}: PaginationLinkProps) {
  return <a
    aria-current={isActive ? 'page' : undefined}
    aria-disabled={disabled || undefined}
    href={disabled ? undefined : href}
    data-slot="pagination-link"
    data-active={isActive || undefined}
    data-disabled={disabled || undefined}
    className={cn(
      'inline-flex h-(--control) min-w-(--control) items-center justify-center rounded-[inherit] whitespace-nowrap px-2 type-label text-text-1 transition-[background-color] duration-(--dur-fast) ease-(--ease-step) hover:bg-hover focus-visible:focus-ring-inset',
      size === 'icon' && 'px-1',
      isActive && 'pointer-events-none bg-selected forced-colors:outline forced-colors:outline-1',
      disabled && 'pointer-events-none text-text-disabled',
      className,
    )}
    {...props}
  >{typeof children === 'string' || typeof children === 'number' ? <span className="data">{children}</span> : children}</a>;
}

function PaginationPrevious({className, text = 'Previous', ...props}: React.ComponentProps<typeof PaginationLink> & {text?: string}) {
  return <PaginationLink aria-label="Previous page" size="default" className={cn('gap-1 ps-2 pe-3 @max-md/pagination:px-2', className)} {...props}>
    <Icon icon={ChevronLeft} size={16} data-icon="inline-start" className="rtl:-scale-x-100"/>
    <span className="hidden @md/pagination:block">{text}</span>
  </PaginationLink>;
}

function PaginationNext({className, text = 'Next', ...props}: React.ComponentProps<typeof PaginationLink> & {text?: string}) {
  return <PaginationLink aria-label="Next page" size="default" className={cn('gap-1 ps-3 pe-2 @max-md/pagination:px-2', className)} {...props}>
    <span className="hidden @md/pagination:block">{text}</span>
    <Icon icon={ChevronRight} size={16} data-icon="inline-end" className="rtl:-scale-x-100"/>
  </PaginationLink>;
}

function PaginationEllipsis({className, ...props}: React.ComponentProps<'span'>) {
  return <span aria-hidden data-slot="pagination-ellipsis" className={cn('flex h-(--control) min-w-(--control) items-center justify-center text-text-3', className)} {...props}>
    <Icon icon={OverflowMenuHorizontal} size={16}/>
  </span>;
}

/** "1–50 of 1,204 conversations". Tabular figures. Wrap it in role="status" to announce page changes. */
function PaginationInfo({className, from, to, total, noun, page, ...props}: React.ComponentProps<'p'> & {from: number; to: number; total?: number | null; noun?: string; page?: number}) {
  const f = (n: number) => n.toLocaleString('en-US');
  return <p data-slot="pagination-info" className={cn('type-body-sm text-text-3 data', className)} {...props}>
    <span className="text-text-1">{f(from)}–{f(to)}</span>
    {total !== undefined && total !== null ? <> of {f(total)}{noun ? ` ${noun}` : ''}</> : <>{noun ? ` ${noun}` : ''}{page ? `, page ${f(page)}` : ''}</>}
  </p>;
}

/**
 * The pages to show around the current one: always the first and last, the current and one either
 * side, with null where an ellipsis goes. Seven slots whenever there are seven pages or more.
 */
function paginationRange(page: number, pages: number): (number | null)[] {
  if (pages <= 7) return Array.from({length: pages}, (_, i) => i + 1);
  if (page <= 4) return [1, 2, 3, 4, 5, null, pages];
  if (page >= pages - 3) return [1, null, pages - 4, pages - 3, pages - 2, pages - 1, pages];
  return [1, null, page - 1, page, page + 1, null, pages];
}

type PaginationNavProps = Omit<React.ComponentProps<'nav'>, 'onChange'> & {
  page: number;
  /** Total pages. Leave out for a cursor API: Previous and Next only. */
  pages?: number;
  /** The href of a page, so each page is a real link that opens in a new tab. From a client component. */
  getHref?: (page: number) => string;
  /**
   * The same as a string with {page} in it, as in "?page={page}". A server component passes this one,
   * because a function cannot cross into a client component.
   */
  hrefPattern?: string;
  /** With a cursor API: whether a next page exists. */
  hasNext?: boolean;
  /** Called on a plain click, for client routing. Call event.preventDefault() to stop the link. */
  onPageClick?: (page: number, event: React.MouseEvent<HTMLAnchorElement>) => void;
};

/** Numbered or cursor pagination from data, with a fixed slot count and fixed slot widths. */
function PaginationNav({page, pages, getHref: getHrefProp, hrefPattern, hasNext, onPageClick, className, ...props}: PaginationNavProps) {
  const getHref = getHrefProp ?? ((p: number) => (hrefPattern ?? '?page={page}').replaceAll('{page}', String(p)));
  const cursor = pages === undefined;
  const nav = React.useRef<HTMLElement>(null);
  const measureRef = React.useRef<HTMLUListElement>(null);
  const [compact, setCompact] = React.useState(false);
  // Compact when the full row does not fit: measured from a hidden copy of the row at this page count.
  React.useLayoutEffect(() => {
    const el = nav.current;
    const r = measureRef.current;
    if (!el || !r) return;
    const fit = () => setCompact(r.getBoundingClientRect().width > el.clientWidth + 0.5);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    ro.observe(r);
    return () => ro.disconnect();
  }, [pages]);
  const last = pages ?? Infinity;
  const canNext = cursor ? !!hasNext : page < last;
  // Every number slot is as wide as the largest page number, so the row never changes width.
  const digits = (pages ?? page).toLocaleString('en-US').length;
  const slot = {minWidth: `max(var(--control), calc(${digits}ch + var(--space-4)))`};
  // Handlers only when the caller routes on the client, so a server-rendered nav passes no functions.
  const go = (p: number) => onPageClick ? (event: React.MouseEvent<HTMLAnchorElement>) => onPageClick(p, event) : undefined;
  const numbers = (live: boolean) => paginationRange(page, last).map((p, i) => <PaginationItem key={p ?? `gap-${i}`}>
    {p === null
      ? <PaginationEllipsis style={slot}/>
      : <PaginationLink href={live ? getHref(p) : undefined} isActive={p === page} style={slot} aria-label={`Page ${p}`} onClick={live ? go(p) : undefined}>{p.toLocaleString('en-US')}</PaginationLink>}
  </PaginationItem>);
  return <Pagination ref={nav} data-mode={cursor ? 'cursor' : compact ? 'compact' : 'numbered'} className={cn('relative', className)} {...props}>
    <PaginationContent className="min-w-0">
      <PaginationItem className="shrink-0"><PaginationPrevious href={getHref(page - 1)} disabled={page <= 1} onClick={go(page - 1)}/></PaginationItem>
      {!cursor && !compact && numbers(true)}
      {/* When the full row does not fit, the slots give way to "Page 4 of 24" between the arrows. */}
      {!cursor && compact && <PaginationItem className="min-w-0"><span data-slot="pagination-page" className="flex h-(--control) min-w-0 items-center px-2 type-label text-text-1"><span className="truncate data">Page {page.toLocaleString('en-US')} of {last.toLocaleString('en-US')}</span></span></PaginationItem>}
      {cursor && <PaginationItem><span data-slot="pagination-page" aria-current="page" className="flex h-(--control) items-center whitespace-nowrap px-2 type-label text-text-1"><span className="data">Page {page.toLocaleString('en-US')}</span></span></PaginationItem>}
      <PaginationItem className="shrink-0"><PaginationNext href={getHref(page + 1)} disabled={!canNext} onClick={go(page + 1)}/></PaginationItem>
    </PaginationContent>
    {/* The measure: the full numbered row, invisible and inert, for the fit above. */}
    {!cursor && <div aria-hidden inert className="pointer-events-none invisible absolute start-0 top-0 size-0 overflow-hidden">
      <PaginationContent ref={measureRef} className="w-max">
        <PaginationItem><PaginationPrevious/></PaginationItem>
        {numbers(false)}
        <PaginationItem><PaginationNext/></PaginationItem>
      </PaginationContent>
    </div>}
  </Pagination>;
}

export {Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationInfo, PaginationNav, paginationRange, type PaginationNavProps};
