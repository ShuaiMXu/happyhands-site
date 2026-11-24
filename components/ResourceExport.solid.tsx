/** @jsxImportSource @solidjs/web */
import { Button } from '@ui-sdk/solid/button';
import { createEffect, createMemo, createSignal, onCleanup, Show } from 'solid-js';
import { mountSolidControl } from '../packages/ui/mount-solid-control';
import { ResourceTabs } from './ResourceTabs.solid';

export type ExportFile = { label: string; url: string; name: string };
type ExportProps = { files: ExportFile[]; lang: string };

function ResourceExport(props: { data: ExportProps }) {
  const [active, setActive] = createSignal('0');
  const [retry, setRetry] = createSignal(0);
  const [result, setResult] = createSignal<{ url: string; text: string; error: boolean }>();
  const [notice, setNotice] = createSignal('');
  const file = createMemo(() => props.data.files[Number(active())] ?? props.data.files[0]);
  const url = createMemo(() => file()?.url);
  const current = createMemo(() => {
    const loaded = result();
    return loaded?.url === url() ? loaded : undefined;
  });
  const t = (zh: string, en: string) => props.data.lang === 'zh' ? zh : en;

  createEffect(() => ({ url: url(), retry: retry() }), ({ url }) => {
    const controller = new AbortController();
    onCleanup(() => controller.abort());
    setNotice('');
    setResult(undefined);
    if (!url) return;
    fetch(url, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error('Could not read export');
        return response.text();
      })
      .then(text => {
        if (!controller.signal.aborted) setResult({ url, text, error: false });
      })
      .catch(() => {
        if (!controller.signal.aborted) setResult({ url, text: '', error: true });
      });
  });

  async function copy() {
    const source = current();
    if (!source?.text) return;
    try {
      await navigator.clipboard.writeText(source.text);
      if (url() === source.url) setNotice(t('已复制', 'Copied'));
    } catch {
      if (url() === source.url) setNotice(t('请选择正文复制', 'Select the text to copy'));
    }
  }

  const panel = () => (
    <>
      <div class="resource-export-actions">
        <span role="status">{notice()}</span>
        <Show when={current()?.error}>
          <Button class="hh-button" onClick={() => setRetry(value => value + 1)}>{t('重试', 'Retry')}</Button>
        </Show>
        <Button class="hh-button" disabled={!current()?.text || current()?.error} onClick={copy}>{t('复制', 'Copy')}</Button>
        <a class="hh-button" href={file()?.url} download={file()?.name}>{t('下载', 'Download')}</a>
      </div>
      <pre tabindex={0} aria-busy={current() ? 'false' : 'true'}>
        {!current() ? t('加载中…', 'Loading…')
          : current()?.error ? t('加载失败，请下载文件。', 'Could not load the file. Download is available.')
          : current()?.text}
      </pre>
    </>
  );
  return (
    <Show when={file()}>
      <aside class="resource-export" aria-label={t('规范文件', 'Guideline files')}>
        <ResourceTabs
          tabs={props.data.files.map((entry, index) => ({ id: String(index), label: entry.label }))}
          label={t('文件格式', 'File format')}
          listClass="resource-export-tabs"
          value={active()}
          onChange={setActive}
          panel={panel}
        />
      </aside>
    </Show>
  );
}

export function mountResourceExport(element: HTMLElement, initial: ExportProps) {
  return mountSolidControl(element, initial, props => <ResourceExport data={props()} />);
}
