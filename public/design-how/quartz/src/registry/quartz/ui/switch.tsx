'use client';

import {Switch as SwitchPrimitive} from '@base-ui/react/switch';
import {cn, mergeClass} from '@/lib/quartz/utils';

// Quartz's switch, on Base UI's Switch. A setting that applies the moment it flips.
// A standard track with a round thumb, both fully rounded. Off: a paper track with a 1px control edge at --border-control,
// ink on hover, and a grey thumb at the start. On: an ink track and a paper-white thumb at the end. The state reads from the
// thumb's position and the fill, never from hue. The thumb glides along the reading direction, so it mirrors
// in RTL.
//
// Because the change applies at once, saving it can take time or fail. `pending` covers that: the thumb
// moves the moment it is pressed, then dims to 50% and holds still until the save settles. The switch stays focusable but read-only, so a second flip cannot race
// the first. If the save fails, the caller sets `checked` back and the thumb returns.

type SwitchProps = SwitchPrimitive.Root.Props & {
  size?: 'sm' | 'default';
  /** The change is saving. The thumb dims and further flips are ignored until it settles. */
  pending?: boolean;
  'aria-invalid'?: boolean | 'true' | 'false';
};

function Switch({className, size = 'default', pending, readOnly, 'aria-invalid': invalid, ...props}: SwitchProps) {
  const isInvalid = invalid === true || invalid === 'true';
  return <SwitchPrimitive.Root
    data-slot="switch"
    data-size={size}
    data-status={isInvalid ? 'fail' : undefined}
    data-pending={pending || undefined}
    aria-invalid={isInvalid || undefined}
    aria-busy={pending || undefined}
    readOnly={readOnly || pending}
    className={mergeClass([
      'group/switch peer relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5 [-webkit-tap-highlight-color:transparent]',
      'bg-page control-edge [--frame-color:var(--border-control)] transition-[background-color,box-shadow,outline-color] duration-(--dur-fast) ease-(--ease-step) motion-reduce:transition-none',
      'not-pointer-coarse:after:absolute not-pointer-coarse:after:-inset-x-1 not-pointer-coarse:after:-inset-y-1.5 touch-target',
      'data-[size=default]:h-5 data-[size=default]:w-9 data-[size=sm]:h-4 data-[size=sm]:w-7',
      'hover:not-data-disabled:not-data-readonly:data-unchecked:not-aria-invalid:[--frame-color:var(--ink)]',
      'data-checked:bg-ink',
      'active:not-data-disabled:not-data-readonly:data-unchecked:bg-pressed active:not-data-disabled:not-data-readonly:data-checked:bg-button-primary-hover active:not-data-disabled:not-data-readonly:duration-(--dur-press)',
      'aria-invalid:[--frame-color:var(--fail-line)]',
      'data-disabled:cursor-not-allowed data-disabled:bg-page data-disabled:[--frame-color:var(--text-disabled)] data-disabled:[--control-lift:var(--elev-none)] data-disabled:data-checked:bg-text-disabled',
      'data-readonly:cursor-default data-pending:cursor-progress',
      'forced-colors:border forced-colors:border-solid forced-colors:border-[CanvasText] forced-colors:data-disabled:border-[GrayText]',
      'forced-colors:data-checked:[forced-color-adjust:none] forced-colors:data-checked:bg-[Highlight]!',
    ], className)}
    {...props}
  >
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={cn(
        'pointer-events-none block rounded-full bg-text-2 transition-[translate,background-color] duration-(--dur-fast) ease-(--ease-step) motion-reduce:transition-none',
        'group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3',
        'data-checked:bg-paper',
        'group-data-[size=default]/switch:data-checked:translate-x-4 group-data-[size=sm]/switch:data-checked:translate-x-3',
        'rtl:group-data-[size=default]/switch:data-checked:-translate-x-4 rtl:group-data-[size=sm]/switch:data-checked:-translate-x-3',
        'group-data-disabled/switch:bg-text-disabled group-data-disabled/switch:data-checked:bg-paper',
        'group-data-pending/switch:opacity-(--stale-opacity)',
        'forced-colors:[forced-color-adjust:none] forced-colors:bg-[CanvasText] forced-colors:data-checked:bg-[HighlightText] forced-colors:group-data-disabled/switch:bg-[GrayText]',
      )}
    />
  </SwitchPrimitive.Root>;
}

export {Switch, type SwitchProps};
