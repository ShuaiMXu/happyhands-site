'use client';

import {useId, useState} from 'react';
import {OTPField as OTPFieldPrimitive} from '@base-ui/react/otp-field';
import {cn} from '@/lib/glaze/utils';
import {useFieldDisabled} from '@/components/glaze/ui/field';
import type {InputSize} from '@/components/glaze/ui/input';

// Glaze's one-time code input, on Base UI's OTPField: one slot per character. Each slot is a one-character field, so
// it is the field recipe as a circle: paper, the 1px --line-control hairline, the size's height as its width. The
// slot with the cursor darkens its line to --line-focus, as any field does; a filled slot keeps the darker line, so
// progress through the code reads on the edges. Invalid turns every line coral. Codes of six or eight split in two
// halves with a short dash between.
//
// Base UI moves the cursor as each character lands, takes a pasted code whole, steps back on Backspace and fires
// onComplete when the last slot fills. A rejected character is announced ("Digits only"), never silently dropped.

type OtpInputProps = {
  /** Number of slots. */
  length: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Fires once every slot is filled, and again for a pasted full code. */
  onComplete?: (value: string) => void;
  /** Slots per group, split by a dash. Default: two halves for 6 or 8, else one group. */
  groups?: number[];
  validationType?: OTPFieldPrimitive.Root.Props['validationType'];
  /** 26, 32 or 36px slots. */
  size?: InputSize;
  name?: string;
  id?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  [forced: `data-force-${string}`]: unknown;
};

const slotSize: Record<InputSize, string> = {
  sm: 'size-(--control-sm) type-label-sm',
  default: 'size-(--control) type-label',
  lg: 'size-(--control-lg) type-label-lg',
};

function OtpInput({
  length, value, defaultValue = '', onValueChange, onComplete, groups, validationType = 'numeric', size = 'default', name, id, disabled: disabledProp, autoFocus,
  className, 'aria-label': ariaLabel, 'aria-describedby': describedBy, 'aria-invalid': invalid, ...all
}: OtpInputProps) {
  const disabled = useFieldDisabled() || !!disabledProp;
  // Base UI names the first slot from a label element, so the accessible name is one.
  const labelId = useId();
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  const [rejected, setRejected] = useState('');
  const split = groups ?? (length >= 6 && length % 2 === 0 ? [length / 2, length / 2] : [length]);
  const starts = split.map((_, i) => split.slice(0, i).reduce((a, b) => a + b, 0));
  const forced = Object.keys(all).some(k => k.startsWith('data-force-focus'));
  const slot = cn(
    'min-w-0 rounded-pill border border-line-control bg-paper p-0 text-center data text-text-1 caret-ink outline-none',
    'transition-[border-color,background-color] duration-(--dur-state) ease-out',
    'focus:border-line-focus data-filled:border-line-focus',
    'aria-invalid:border-fail data-disabled:cursor-not-allowed data-disabled:border-line-faint data-disabled:bg-field data-disabled:text-text-disabled',
    'forced-colors:border-[ButtonText]',
    slotSize[size],
  );
  return <OTPFieldPrimitive.Root
    data-slot="otp-input"
    data-size={size}
    length={length}
    value={current}
    onValueChange={v => { if (value === undefined) setInner(v); onValueChange?.(v); setRejected(''); }}
    onValueComplete={v => onComplete?.(v)}
    onValueInvalid={() => setRejected(validationType === 'numeric' ? 'Digits only' : validationType === 'alpha' ? 'Letters only' : 'Letters and digits only')}
    validationType={validationType}
    autoComplete="one-time-code"
    name={name}
    id={id}
    disabled={disabled}
    className={cn('flex w-fit items-center gap-2', className)}
    // A code reads left to right in every language, so its slots do too.
    dir="ltr"
  >
    {split.map((count, g) => <span key={g} className="contents">
      {g > 0 && <span aria-hidden data-slot="otp-input-separator" className="h-px w-2 shrink-0 bg-line-strong"/>}
      <span data-slot="otp-input-group" className="flex items-center gap-1">
        {Array.from({length: count}, (_, i) => {
          const index = starts[g] + i;
          return <OTPFieldPrimitive.Input
            key={index}
            data-slot="otp-input-slot"
            data-control=""
            autoFocus={autoFocus && index === 0}
            aria-label={index === 0 ? undefined : `Character ${index + 1} of ${length}`}
            aria-labelledby={index === 0 && ariaLabel ? labelId : undefined}
            aria-describedby={index === 0 ? describedBy : undefined}
            aria-invalid={invalid || undefined}
            // The docs' forced focus lands on the first empty slot, where the cursor would be.
            className={cn(slot, forced && index === current.length && 'border-line-focus', invalid && 'border-fail data-filled:border-fail')}
          />;
        })}
      </span>
    </span>)}
    {ariaLabel && <span id={labelId} className="sr-only">{ariaLabel}</span>}
    <span role="status" className="sr-only">{rejected}</span>
  </OTPFieldPrimitive.Root>;
}

export {OtpInput, type OtpInputProps};
