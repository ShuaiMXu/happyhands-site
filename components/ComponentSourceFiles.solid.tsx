/** @jsxImportSource @solidjs/web */
import { Button } from '@ui-sdk/solid/button';
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from '@ui-sdk/solid/collapsible';
import { createSignal, For, Show } from 'solid-js';

export type SourceFile = { path: string; content: string };

export function registrySourceFiles(text: string): SourceFile[] {
  const payload = JSON.parse(text);
  if (!Array.isArray(payload?.files)) return [];
  return payload.files.filter((file: SourceFile) =>
    typeof file?.path === 'string' && typeof file?.content === 'string',
  );
}

export function ComponentSourceFiles(props: { files: SourceFile[]; lang: string }) {
  const t = (zh: string, en: string) => props.lang === 'zh' ? zh : en;
  const [status, setStatus] = createSignal<{ path: string; message: string }>();
  return <div class="component-source-files">
    <For each={props.files}>{file => (
      <Collapsible class="component-source-file" defaultOpen={props.files.length === 1}>
        <CollapsibleTrigger class="document-disclosure">{file.path}</CollapsibleTrigger>
        <CollapsiblePanel>
          <div class="component-source-file-actions">
            <Button class="hh-button" onClick={async () => {
              try {
                await navigator.clipboard.writeText(file.content);
                setStatus({ path: file.path, message: t('已复制代码', 'Code copied') });
              } catch {
                setStatus({ path: file.path, message: t('复制失败，可手动选中代码。', 'Select the code to copy it manually.') });
              }
            }}>{t('复制代码', 'Copy code')}</Button>
            <Show when={status()?.path === file.path}><span role="status">{status()?.message}</span></Show>
          </div>
          <pre tabindex="0" aria-label={file.path}><code>{file.content}</code></pre>
        </CollapsiblePanel>
      </Collapsible>
    )}</For>
  </div>;
}
