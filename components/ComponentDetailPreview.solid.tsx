/** @jsxImportSource @solidjs/web */
import { Button } from '@ui-sdk/solid/button';
import { createEffect, createSignal, onCleanup, onSettled, Show } from 'solid-js';
import type { JSX } from '@solidjs/web';
import { replacePreviewLocation } from '../packages/ui/preview-location';

export function ComponentDetailPreview(props: {
  lang: string;
  title: string;
  src?: string;
  cover?: string;
  hint?: string;
  sandbox?: string;
  resizes?: boolean;
  toolbar?: JSX.Element;
  inline?: boolean;
  children?: JSX.Element;
}) {
  const t = (zh: string, en: string) => props.lang === 'zh' ? zh : en;
  const [narrow, setNarrow] = createSignal(false);
  const [height, setHeight] = createSignal<number>();
  let frame: HTMLIFrameElement | undefined;

  function reset(src: string) {
    if (!frame) return;
    setHeight(undefined);
    replacePreviewLocation(frame, { src });
  }
  createEffect(() => props.src, (url) => { if (url) reset(url); });
  onSettled(() => {
    if (!props.resizes) return;
    const resize = (event: MessageEvent) => {
      if (event.origin !== location.origin || event.source !== frame?.contentWindow ||
          event.data?.type !== 'design-system-preview-height') return;
      const next = event.data.height;
      if (typeof next === 'number' && Number.isFinite(next)) setHeight(Math.max(320, Math.min(900, Math.ceil(next + 24))));
    };
    window.addEventListener('message', resize);
    onCleanup(() => window.removeEventListener('message', resize));
  });

  return <div class="component-detail-preview">
    <Show when={props.src}>
      <div class="component-preview-bar">
        <div class="component-preview-context">
          {props.toolbar}
          {props.hint && <span>{props.hint}</span>}
        </div>
        <div class="component-preview-actions">
          <Button class="hh-button" aria-pressed={narrow() ? 'true' : 'false'} onClick={() => setNarrow(value => !value)}>
            {t('手机宽度', 'Phone width')}
          </Button>
          <Button class="hh-button" onClick={() => { if (props.src) reset(props.src); }}>
            {t('重置', 'Reset')}
          </Button>
        </div>
      </div>
    </Show>
    <div class={`component-preview-surface${narrow() ? ' is-phone-width' : ''}`}>
      <Show when={props.src} fallback={
        props.inline ? props.children : <img class="component-detail-image" src={props.cover} alt="" />
      }>
        <iframe ref={frame} class="directory-live-preview" title={props.title}
          style={{ height: height() ? height() + 'px' : undefined }}
          sandbox={props.sandbox || 'allow-scripts allow-same-origin'}
          referrerpolicy="no-referrer" />
      </Show>
    </div>
  </div>;
}
