/** @jsxImportSource @solidjs/web */
import { Button } from '@ui-sdk/solid/button';
import { createMemo, createSignal, Show } from 'solid-js';
import { mountSolidControl } from '../packages/ui/mount-solid-control';
import { ComponentDetailPreview } from './ComponentDetailPreview.solid';
import { SolidPortalTarget } from '../packages/ui/SolidPortalTarget.solid';
import { ShadcnInstall } from './ShadcnInstall.solid';
import { ResourceTabs } from './ResourceTabs.solid';
import { ComponentSourceFiles, registrySourceFiles } from './ComponentSourceFiles.solid';
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

function DirectoryComponentDetail(props: { data: DirectoryDetailProps }) {
  const t = (zh: string, en: string) => props.data.lang === 'zh' ? zh : en;
  const hasPreview = () => Boolean(props.data.previewUrl || props.data.inline || props.data.cover);
  const tabs = createMemo(() => [
    ...(hasPreview() ? [{ id: 'preview', label: t('预览', 'Preview') }] : []),
    { id: 'source', label: t('源码', 'Source') },
    ...(props.data.installUrl ? [{ id: 'install', label: t('接入', 'Integration') }] : []),
  ]);
  const files = createMemo(() => {
    if (!props.data.path.endsWith('.json')) return [];
    try { return registrySourceFiles(props.data.content); } catch { return []; }
  });
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
    <ComponentDetailPreview lang={props.data.lang} title={`${props.data.name} ${t('交互预览', 'interactive preview')}`}
      src={props.data.inline ? undefined : props.data.previewUrl} cover={props.data.cover} inline={props.data.inline} resizes>
      <Show when={props.data.inline}><SolidPortalTarget onTarget={props.data.onPreviewTarget} /></Show>
    </ComponentDetailPreview>
  );
  const source = () => (
    <>
      <div class="collections-actions">
        <a class="hh-button" href={'/' + props.data.path} download>{t('下载原文件', 'Download original')}</a>
        <Button class="hh-button" onClick={copy}>{t('复制原文', 'Copy source')}</Button>
      </div>
      <p role="status">{notice()}</p>
      <Show when={props.data.path.endsWith('.md')} fallback={
        <Show when={files().length > 0} fallback={<pre class="directory-source" tabindex="0"><code>{props.data.content}</code></pre>}>
          <ComponentSourceFiles files={files()} lang={props.data.lang} />
        </Show>
      }>
        <DesignDocumentBody text={props.data.content} lang={props.data.lang} />
      </Show>
    </>
  );
  const install = () => (
    <Show when={props.data.installUrl} keyed>
      {url => <ShadcnInstall url={url} lang={props.data.lang} />}
    </Show>
  );
  return <ResourceTabs
    tabs={tabs()}
    label={t('组件内容', 'Component content')}
    listClass="resource-content-tabs component-detail-tabs"
    panelClass="resource-content-panel component-detail-panel"
    value={active()}
    onChange={setSelected}
    panel={id => id === 'preview' ? preview() : id === 'install' ? install() : source()}
  />;
}

export function mountDirectoryComponent(element: HTMLElement, initial: DirectoryDetailProps) {
  return mountSolidControl(element, initial, props => <DirectoryComponentDetail data={props()} />);
}
