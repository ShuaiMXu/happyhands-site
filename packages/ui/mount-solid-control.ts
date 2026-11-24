import { render } from '@solidjs/web';
import type { JSX } from '@solidjs/web';
import { createSignal, type Accessor } from 'solid-js';

export function mountSolidControl<Props>(
  element: HTMLElement,
  initial: Props,
  view: (props: Accessor<Props>) => JSX.Element,
) {
  const [props, setProps] = createSignal({ data: initial });
  const dispose = render(() => view(() => props().data), element);
  return {
    update: (next: Props) => setProps({ data: next }),
    dispose,
  };
}

export type SolidControl<Props> = ReturnType<typeof mountSolidControl<Props>>;
