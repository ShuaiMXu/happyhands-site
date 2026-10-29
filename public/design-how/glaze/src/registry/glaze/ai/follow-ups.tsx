'use client';

import {cva} from 'class-variance-authority';
import {Icon, FollowUp} from '@/components/glaze/icon';
import {cn} from '@/lib/glaze/utils';

// Suggested next prompts under an agent's turn. Each is the whole prompt, written as the person would type it, and
// one press sends it as written. Three at most; the rest are cut, so pass the best ones first.
//
// Two layouts, both flat: no glass, because a suggestion is an offer and the composer's Send is the lead.
// - chips (the default): a wrapping row of 26px pills, the chip's paper and hairline, the line darkening under the
//   pointer as a filter chip's does. For short prompts. A prompt too long for the row ends in an ellipsis and keeps
//   its full text as the title and the accessible name.
// - rows: a column of 32px rows, a return arrow in text-3 before the prompt, the hover wash, the text wrapping onto a
//   second line. For prompts that run to a sentence. Rows sit edge to edge, so their ring is drawn inside the row.
//
// disabled holds every suggestion while a reply runs; render the row only under the newest finished turn.

type FollowUpsLabels = {
  /** The row's name, read by screen readers. */
  group?: string;
};

const defaultLabels: Required<FollowUpsLabels> = {group: 'Suggested follow-ups'};

const followUpVariants = cva(
  [
    'group/follow-up relative inline-flex min-w-0 cursor-pointer items-center text-start text-text-1 select-none [-webkit-tap-highlight-color:transparent]',
    'transition-[background-color,border-color,color,scale] duration-(--dur-state) ease-out',
    'disabled:cursor-not-allowed disabled:text-text-disabled',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  {
    variants: {
      layout: {
        chips: [
          'h-(--control-sm) max-w-full rounded-pill border border-line-control bg-paper px-2.5 type-label-sm whitespace-nowrap focus-sm',
          'hover:not-disabled:border-line-focus active:not-disabled:scale-(--scale-press) active:duration-(--dur-press)',
          'disabled:border-line-faint forced-colors:border-[ButtonText]',
        ],
        rows: [
          'min-h-(--control) w-full items-start gap-2 rounded-tag px-2 py-1.5 type-body-sm focus-visible:focus-ring-inset',
          'hover:not-disabled:bg-hover active:not-disabled:bg-pressed',
          '[&_svg]:size-(--icon) [&_svg]:text-text-3 disabled:[&_svg]:text-text-disabled',
        ],
      },
    },
    defaultVariants: {layout: 'chips'},
  },
);

type FollowUpsProps = Omit<React.ComponentProps<'div'>, 'onSelect' | 'children'> & {
  /** The prompts, best first. Empty strings are dropped; past max are cut. */
  suggestions: readonly string[];
  /** Sends the prompt. Called with its text and its place in the row. */
  onSelect: (suggestion: string, index: number) => void;
  /** chips for short prompts, rows for a sentence. */
  layout?: 'chips' | 'rows';
  /** How many show. */
  max?: number;
  /** A reply is running: every suggestion holds. */
  disabled?: boolean;
  /** The row's name, for another language. */
  labels?: FollowUpsLabels;
};

function FollowUps({suggestions, onSelect, layout = 'chips', max = 3, disabled, labels, className, ...props}: FollowUpsProps) {
  const words = {...defaultLabels, ...labels};
  const shown = suggestions.map(s => s.trim()).filter(Boolean).slice(0, max);
  if (!shown.length) return null;
  return <div
    data-slot="follow-ups"
    data-layout={layout}
    role="group"
    aria-label={words.group}
    className={cn('flex min-w-0', layout === 'chips' ? 'flex-wrap gap-1' : 'flex-col', className)}
    {...props}
  >
    {shown.map((text, index) => <button
      key={text}
      type="button"
      data-slot="follow-up"
      disabled={disabled}
      title={layout === 'chips' ? text : undefined}
      onClick={() => onSelect(text, index)}
      className={followUpVariants({layout})}
    >
      {/* The arrow sits on the first line when the prompt wraps. */}
      {layout === 'rows' && <span aria-hidden className="flex h-lh shrink-0 items-center"><Icon icon={FollowUp}/></span>}
      <span className={cn('min-w-0', layout === 'chips' ? 'truncate' : '[overflow-wrap:anywhere]')}>{text}</span>
    </button>)}
  </div>;
}

export {FollowUps, followUpVariants, type FollowUpsProps, type FollowUpsLabels};
