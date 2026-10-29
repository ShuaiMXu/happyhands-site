'use client';

import {useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type ChangeEvent, type ComponentProps} from 'react';
import {Input as InputPrimitive} from '@base-ui/react/input';
import {fieldControlVariants} from '@/components/quartz/ui/field';
import {cn, mergeRefs} from '@/lib/quartz/utils';

// Quartz's textarea: the same paper field with a control edge as Input (same 14px label type, on a 20px line), rendered as a <textarea> through
// Base UI's Input so a Field labels and validates it. It grows with its content from `minRows` to
// `maxRows`, then scrolls. field-sizing does the growing where the browser has it, with the width pinned to the container (w-full, 12rem at least) so only the height follows the text (contain: inline-size keeps a shrink-wrapped parent from sizing to the text); elsewhere the height
// follows scrollHeight on input.
//
// The considered detail: a `limit` that never cuts the text. The counter stays silent until 80% of the
// limit, then counts the characters left in tabular figures; past the limit it turns to the fail slot and
// counts how far over, and the field turns invalid. A paste over the limit keeps every character, so
// nothing the person wrote is lost (a native maxLength truncates the paste without a word).

type TextareaProps = ComponentProps<'textarea'> & {
  /** Lines before it starts to scroll. Default 12. */
  maxRows?: number;
  /** Lines at rest. Default 3, or `rows` when given. */
  minRows?: number;
  /** Let the person drag the corner to resize. Off by default, because the box already grows. */
  resizable?: boolean;
  /** A soft character limit with a counter. The text is never cut; past it the field is invalid. */
  limit?: number;
  /** Fires with the plain value, as Input's onValueChange does. */
  onValueChange?: (value: string) => void;
};

const supportsFieldSizing = () => typeof CSS !== 'undefined' && CSS.supports('field-sizing', 'content');

function Textarea({className, maxRows = 12, rows, minRows = rows ?? 3, resizable = false, limit, style, value, defaultValue, onChange, onValueChange, ref: callerRef, ...props}: TextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const setRef = useMemo(() => mergeRefs(ref, callerRef), [callerRef]);
  const counterId = useId();
  const [length, setLength] = useState(() => String(value ?? defaultValue ?? '').length);
  const [fallback, setFallback] = useState(false);

  useEffect(() => { setFallback(!supportsFieldSizing()); }, []);
  useEffect(() => { if (value !== undefined) setLength(String(value).length); }, [value]);

  // Without field-sizing, grow by measuring: reset to auto, then take the content height.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!fallback || !el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  });

  const over = limit !== undefined && length > limit;
  const near = limit !== undefined && length >= Math.floor(limit * 0.8);
  const left = limit !== undefined ? limit - length : 0;
  const primitiveProps = props as unknown as Omit<InputPrimitive.Props, 'className' | 'style'>;
  const invalid = over || props['aria-invalid'] === true || props['aria-invalid'] === 'true';

  const textarea = <InputPrimitive
    // The caller's props first, so the counter's describedby, the limit's invalid state and the sizing below stay.
    {...primitiveProps}
    data-slot="textarea"
    data-status={invalid ? 'fail' : undefined}
    render={<textarea ref={setRef}/>}
    value={value as string | undefined}
    defaultValue={defaultValue as string | undefined}
    onChange={(e: ChangeEvent<HTMLInputElement>) => { const el = e.target as unknown as HTMLTextAreaElement; setLength(el.value.length); onChange?.(e as unknown as ChangeEvent<HTMLTextAreaElement>); onValueChange?.(el.value); }}
    aria-invalid={invalid || undefined}
    aria-describedby={cn(props['aria-describedby'], limit !== undefined && counterId) || undefined}
    style={{
      minHeight: `calc(${minRows}lh + 2 * var(--space-2))`,
      maxHeight: `calc(${maxRows}lh + 2 * var(--space-2))`,
      ...style,
    }}
    className={cn(
      fieldControlVariants({size: 'default'}),
      // field-sizing sizes both axes, so the width is pinned: only the height follows the content.
      'h-auto w-full min-w-48 [contain:inline-size] field-sizing-content px-3 py-2 leading-5! pointer-coarse:text-base',
      // At its max height the text scrolls, and each edge with more behind it fades, so no line is cut in half without a cue.
      'scroll-fade-y focus-visible:mask-none',
      resizable ? 'resize-y' : 'resize-none',
      'read-only:cursor-default',
      limit === undefined && className,
    )}
  />;

  if (limit === undefined) return textarea;
  return <div data-slot="textarea-limit" className={cn('relative flex w-full min-w-0 flex-col gap-1', className)}>
    {textarea}
    <p
      id={counterId}
      data-slot="textarea-counter"
      data-status={over ? 'fail' : undefined}
      data-near={near || undefined}
      className={cn(
        'flex items-center justify-end gap-2 self-end type-label-sm text-text-3',
        !near && 'sr-only',
        over && 'text-text-1',
        'data-[status=fail]:text-fail-text',
      )}
    >
      {over ? `${(-left).toLocaleString('en-US')} over the ${limit.toLocaleString('en-US')} limit` : `${left.toLocaleString('en-US')} left`}
    </p>
    {/* Announce only crossings, never every keystroke. */}
    <span role="status" className="sr-only">{over ? `Over the ${limit} character limit` : near ? 'Near the character limit' : ''}</span>
  </div>;
}

export {Textarea, type TextareaProps};
