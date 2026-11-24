import React, { useLayoutEffect, useRef } from 'react';
import type { SolidControl } from './mount-solid-control';

export function SolidControlHost<Props>(props: {
  mount: (element: HTMLElement, initial: Props) => SolidControl<Props>;
  value: Props;
}) {
  const element = useRef<HTMLDivElement>(null);
  const control = useRef<SolidControl<Props> | null>(null);
  const latest = useRef(props.value);
  latest.current = props.value;
  useLayoutEffect(() => {
    const instance = props.mount(element.current!, latest.current);
    control.current = instance;
    return () => {
      instance.dispose();
      control.current = null;
    };
  }, [props.mount]);
  useLayoutEffect(() => {
    control.current?.update(props.value);
  }, [props.value]);
  return <div ref={element} data-solid-control="" style={{ display: 'contents' }} />;
}
