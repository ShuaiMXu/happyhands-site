/** @jsxImportSource @solidjs/web */
import { Button } from '@ui-sdk/solid/button';
import { createEffect, createMemo, createSignal, onCleanup, onSettled, Show } from 'solid-js';
import { mountSolidControl } from '../packages/ui/mount-solid-control';
import { replacePreviewLocation } from '../packages/ui/preview-location';
import { SolidPortalTarget } from '../packages/ui/SolidPortalTarget.solid';
import { ResourceTabs } from './ResourceTabs.solid';
import { DesignDocumentBody } from './DesignDocumentBody.solid';

type DirectoryDetailProps = {
  name: string;
  lang: string;
  path: string;
  content: string;
  previewUrl: string;
  cover?: string;
  installUrl?: string;
  inline: boolean;
  onPreviewTarget: (node: HTMLDivElement | null) => void;
};

function LivePreview(props: { url: string; label: string }) {
  let frame: HTMLIFrameElement | undefined;
  createEffect(() => props.url, url => {
    if (frame) replacePreviewLocation(frame, { src: url });
  });
  onSettled(() => {
    const resize = (event: MessageEvent) => {
      if (frame && event.origin === location.origin &&
        event.source === frame.contentWindow &&
        event.data?.type === 'design-system-preview-height' &&
        Number.isFinite(event.data.height)) {
        frame.style.height = `${Math.max(280, Math.min(900, event.data.height + 48))}px`;
      }
    };
    window.addEventListener('message', resize);
    onCleanup(() => window.removeEventListener('message', resize));
  });
  return <iframe ref={frame} class="directory-live-preview" title={props.label} sandbox="allow-scripts allow-same-origin" />;
}

function DirectoryComponentDetail(props: { data: DirectoryDetailProps }) {
  const t = (zh: string, en: string) => props.data.lang === 'zh' ? zh : en;
  const hasPreview = () => Boolean(props.data.previewUrl || props.data.inline || props.data.cover);
  const tabs = createMemo(() => [
    ...(hasPreview() ? [{ id: 'preview', label: t('预览', 'Preview') }] : []),
    { id: 'source', label: t('规范与源码', 'Guidelines and source') },
    ...(props.data.installUrl ? [{ id: 'install', label: t('安装到项目', 'Install in your project') }] : []),
  ]);
  const [selected, setSelected] = createSignal<string>();
  const [notice, setNotice] = createSignal('');
  const active = () => tabs().some(tab => tab.id === selected()) ? selected()! : tabs()[0].id;
  async function copy() {
    try {
      await navigator.clipboard.writeText(props.data.content);
      setNotice(t('已复制', 'Copied'));
    } catch {
      setNotice(t('复制失败，请下载原文件。', 'Copy failed. Download the original file.'));
    }
  }
  const preview = () => (
    <>
      <Show when={props.data.inline} fallback={
        <Show when={props.data.previewUrl}>
          <LivePreview url={props.data.previewUrl} label={t('实际组件预览', 'Live component preview')} />
        </Show>
      }>
        <SolidPortalTarget onTarget={props.data.onPreviewTarget} />
      </Show>
      <Show when={props.data.cover && !props.data.previewUrl && !props.data.inline}>
        <img class="collections-preview" src={props.data.cover} alt={props.data.name} />
      </Show>
    </>
  );
  const source = () => (
    <>
      <div class="collections-actions">
        <a class="hh-button" href={'/' + props.data.path} download>{t('下载原文件', 'Download original')}</a>
        <Button class="hh-button" onClick={copy}>{t('复制原文', 'Copy source')}</Button>
      </div>
      <p role="status">{notice()}</p>
      <Show when={props.data.path.endsWith('.md')} fallback={<pre class="directory-source"><code>{props.data.content}</code></pre>}>
        <DesignDocumentBody text={props.data.content} lang={props.data.lang} />
      </Show>
    </>
  );
  const install = () => (
    <div class="collections-install">
      <pre>npx shadcn@latest add {props.data.installUrl}</pre>
      <p>{t('先核对目标框架、依赖与许可证。', 'Check the target framework, dependencies and license first.')}</p>
    </div>
  );
  return <ResourceTabs
    tabs={tabs()}
    label={t('组件内容', 'Component content')}
    listClass="resource-content-tabs"
    panelClass="resource-content-panel"
    value={active()}
    onChange={setSelected}
    panel={id => id === 'preview' ? preview() : id === 'install' ? install() : source()}
  />;
}

export function mountDirectoryComponent(element: HTMLElement, initial: DirectoryDetailProps) {
  return mountSolidControl(element, initial, props => <DirectoryComponentDetail data={props()} />);
}
