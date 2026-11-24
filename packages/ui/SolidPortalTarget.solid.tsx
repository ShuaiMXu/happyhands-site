/** @jsxImportSource @solidjs/web */
import { onSettled } from 'solid-js';

export function SolidPortalTarget(props: {
  onTarget: (target: HTMLDivElement | null) => void;
}) {
  let element: HTMLDivElement | undefined;
  onSettled(() => {
    if (element) props.onTarget(element);
    return () => props.onTarget(null);
  });
  return <div ref={element} style={{ display: 'contents' }} />;
}
