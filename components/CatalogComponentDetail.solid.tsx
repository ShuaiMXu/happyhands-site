/** @jsxImportSource @solidjs/web */
import { Button } from '@ui-sdk/solid/button';
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from '@ui-sdk/solid/collapsible';
import { Textarea } from '@ui-sdk/solid/textarea';
import { createEffect, createMemo, createSignal, For, Match, onCleanup, Show, Switch } from 'solid-js';
import { mountSolidControl } from '../packages/ui/mount-solid-control';
import { ComponentDetailPreview } from './ComponentDetailPreview.solid';
import type catalog from '../public/components/cult-ui/catalog.json';
import { ShadcnInstall } from './ShadcnInstall.solid';
import { ResourceTabs } from './ResourceTabs.solid';
import { ComponentSourceFiles, registrySourceFiles, type SourceFile } from './ComponentSourceFiles.solid';

type Item = (typeof catalog.items)[number];
type DetailProps = {
  item: Item;
  title: string;
  lang: string;
  dark: boolean;
  onSelect: (id: string) => void;
};

function CatalogComponentDetail(props: { data: DetailProps }) {
  const item = () => props.data.item;
  const t = (zh: string, en: string) => props.data.lang === 'zh' ? zh : en;
  const [tab, setTab] = createSignal('preview');
  const [notice, setNotice] = createSignal('');
  const [example, setExample] = createSignal('meeting');
  const [retry, setRetry] = createSignal(0);
  const [source, setSource] = createSignal<{ files?: SourceFile[]; error?: boolean }>();
  const sourceUrl = createMemo(() => tab() === 'source' ? item().source : undefined);

  createEffect(() => ({ url: sourceUrl(), retry: retry() }), ({ url }) => {
    if (!url) return;
    const controller = new AbortController();
    onCleanup(() => controller.abort());
    setSource(undefined);
    fetch(url, { signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error('Source could not load');
        return registrySourceFiles(await response.text());
      })
      .then(files => {
        if (!controller.signal.aborted) setSource({ files });
      })
      .catch(() => {
        if (!controller.signal.aborted) setSource({ error: true });
      });
  });

  const previewUrl = () => '/components/preview/?' + new URLSearchParams({
    component: item().id,
    theme: props.data.dark ? 'dark' : 'light',
    lang: props.data.lang,
    motion: 'on',
    ...(item().id === 'expandable' ? { example: example() } : {}),
  });

  const guidance = () => t(
    `评估 Cult UI 的 ${item().id} 是否适合当前项目。固定源码版本：${item().revision}。\n先读取 ${location.origin}${item().source} 和 ${location.origin}/components/cult-ui/catalog.json，核对 MIT 许可、源码 SHA-256：${item().sourceSha256}、React/Tailwind 兼容性、npm 依赖和 registryDependencies。\n读取目标项目的设计规范，列出颜色、字体、间距、圆角和组件状态映射。不得直接覆盖全局主题或为演示引入无关服务。\n当前条目只是候选组件，站内可预览不等于项目适配通过。确认范围后再接入，验证键盘、触屏、减少动态效果、深浅色、响应式及原有业务流程。交付差异、验证证据与未解决限制。`,
    `Evaluate Cult UI ${item().id} for this project. Pinned source revision: ${item().revision}.\nRead ${location.origin}${item().source} and ${location.origin}/components/cult-ui/catalog.json. Verify MIT licensing, source SHA-256: ${item().sourceSha256}, React/Tailwind compatibility, npm dependencies and registryDependencies.\nRead project design rules and map colors, typography, spacing, corners and states. Do not overwrite global themes or add unrelated services.\nThis entry is a candidate; a preview is not project approval. Confirm scope before integration. Validate keyboard, touch, reduced motion, themes, responsive layout and business flows. Deliver the diff, evidence and limitations.`,
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(guidance());
      setNotice(t('接入说明已复制。', 'Guidance copied.'));
    } catch {
      setNotice(t('无法自动复制，请选择下方文本复制。', 'Copy unavailable. Select and copy the text below.'));
    }
  }

  function limitation(reason: string) {
    if (reason.startsWith('dependency:')) return t('需要运行依赖：', 'Requires dependency: ') + reason.slice(11);
    if (reason.startsWith('module:')) return t('需要配套模块：', 'Requires module: ') + reason.slice(7);
    const labels: Record<string, [string, string]> = {
      'host-api': ['需要网络或宿主环境能力', 'Needs network or host capabilities'],
      'media-or-host-setup': ['需要媒体资源或服务配置', 'Needs media or service setup'],
      'pixel-font-setup': ['需要配套像素字体', 'Needs matching pixel fonts'],
      'device-frame-asset': ['需要设备边框素材及许可核对', 'Needs device frame assets and license review'],
      'no-demo': ['上游未提供独立示例', 'No standalone upstream example'],
    };
    return labels[reason] ? t(...labels[reason]) : reason;
  }

  const preview = () => (
    <Show when={item().preview} fallback={
      <div class="catalog-unavailable">
        <h3>{item().aliasOf ? t('请使用当前组件名称', 'Use the current component name') : t('源码已收录，预览尚需配置', 'Source available; preview needs setup')}</h3>
        <p>{item().aliasOf ? t('此名称是上游保留的兼容别名。', 'This is an upstream compatibility alias.') : t('此组件需要额外依赖、媒体或框架配置。可在源码与接入规范中查看条件。', 'This component needs additional dependencies, media or framework setup. See Source and Integration for details.')}</p>
        <Show when={item().aliasOf} fallback={<ul><For each={item().limitations}>{reason => <li>{limitation(reason)}</li>}</For></ul>}>
          <Button class="hh-button" onClick={() => { const id = item().aliasOf; if (id) props.data.onSelect(id); }}>{item().aliasOf}</Button>
        </Show>
      </div>
    }>
      <ComponentDetailPreview
        lang={props.data.lang}
        title={`${props.data.title} ${t('交互预览', 'interactive preview')}`}
        src={previewUrl()}
        hint={item().id === 'expandable' ? t('选择卡片即可展开', 'Select the card to expand it') : undefined}
        toolbar={<Show when={item().id === 'expandable'}>
          <label class="component-preview-select">
            <span>{t('示例', 'Example')}</span>
            <select class="hh-select-native" value={example()} onChange={event => setExample(event.currentTarget.value)}>
              <option value="meeting">{t('会议', 'Meeting')}</option>
              <option value="product">{t('商品', 'Product')}</option>
              <option value="weather">{t('天气', 'Weather')}</option>
            </select>
          </label>
        </Show>}
        sandbox={item().id === 'bg-image-texture' ? 'allow-scripts allow-downloads' : 'allow-scripts'}
      />
    </Show>
  );

  const sourcePanel = () => (
    <>
      <div class="collections-actions">
        <a class="hh-button catalog-download" href={item().source} download>{t('下载源码清单', 'Download source registry')}</a>
        <Show when={item().demoSource}><a class="hh-button" href={item().demoSource || undefined} download>{t('下载示例源码', 'Download demo source')}</a></Show>
      </div>
      <Collapsible class="upstream-description">
        <CollapsibleTrigger class="document-disclosure">{t('上游组件说明（英文）', 'Component description')}</CollapsibleTrigger>
        <CollapsiblePanel><p>{item().description}</p></CollapsiblePanel>
      </Collapsible>
      <Switch fallback={<p role="status">{t('正在读取源码…', 'Loading source…')}</p>}>
        <Match when={source()?.error}>
          <div role="alert">
            <p>{t('源码读取失败，请重试或下载文件。', 'Source could not load. Retry or download the file.')}</p>
            <Button class="hh-button" onClick={() => setRetry(value => value + 1)}>{t('重试', 'Retry')}</Button>
          </div>
        </Match>
        <Match when={source()?.files}>
          <Show when={(source()?.files?.length || 0) > 0} fallback={<p>{t('此条目没有独立源码文件。', 'This entry has no separate source files.')}</p>}>
            <ComponentSourceFiles files={source()?.files || []} lang={props.data.lang} />
          </Show>
        </Match>
      </Switch>
    </>
  );

  const integration = () => (
    <>
      <Show when={!item().aliasOf}>
        <ShadcnInstall url={new URL(item().source, 'https://happyhands.cc').href} lang={props.data.lang} />
      </Show>
      <h3>{t('接入前核对', 'Before integration')}</h3>
      <dl class="integration-facts">
        <div><dt>{t('源码版本', 'Revision')}</dt><dd><code>{item().revision}</code></dd></div>
        <div><dt>{t('许可', 'License')}</dt><dd><a href="/components/cult-ui/LICENSE.txt">MIT / Cult UI / Jordan Gilliam</a></dd></div>
        <div><dt>{t('运行依赖', 'Runtime dependencies')}</dt><dd>{item().dependencies.join(', ') || t('注册表未额外声明；仍需 React 与 Tailwind 环境。', 'No additional packages declared; React and Tailwind are still required.')}</dd></div>
        <div><dt>{t('组件依赖', 'Registry dependencies')}</dt><dd>{item().registryDependencies.join(', ') || t('无额外声明', 'None declared')}</dd></div>
      </dl>
      <p>{t('本站预览与目标项目的正式接入分别验证。先匹配项目技术栈和设计规范，再决定是否采用。', 'Verify previews and target integration separately. Match the project stack and design rules before adoption.')}</p>
      <h3>{t('交给项目代理', 'Guidance for your project agent')}</h3>
      <Textarea class="hh-textarea" aria-label={t('接入说明', 'Integration guidance')} readonly value={guidance()} rows={10} />
      <div class="catalog-actions">
        <Button class="hh-button" onClick={copy}>{t('复制接入说明', 'Copy guidance')}</Button>
        <a href="/components/cult-ui/catalog.json" download>{t('下载 Harness 组件目录', 'Download Harness catalog')}</a>
      </div>
      <p role="status">{notice()}</p>
      <p class="catalog-footnote">{t('目录可供 Harness 读取；当前未连接自动选用或自动安装。', 'The catalog is readable by Harness; automatic selection and installation are not connected.')}</p>
    </>
  );

  return (
    <>
      <ResourceTabs
        tabs={[{ id: 'preview', label: t('预览', 'Preview') }, { id: 'source', label: t('源码', 'Source') }, { id: 'integration', label: t('接入', 'Integration') }]}
        label={t('组件内容', 'Component content')}
        value={tab()}
        onChange={setTab}
        listClass="resource-content-tabs component-detail-tabs"
        panelClass="resource-content-panel component-detail-panel"
        panel={id => id === 'preview' ? preview() : id === 'source' ? sourcePanel() : integration()}
      />

    </>
  );
}

export function mountCatalogComponentDetail(element: HTMLElement, initial: DetailProps) {
  return mountSolidControl(element, initial, props => <CatalogComponentDetail data={props()} />);
}
