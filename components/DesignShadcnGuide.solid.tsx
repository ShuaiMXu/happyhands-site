/** @jsxImportSource @solidjs/web */
import { createMemo, Show } from 'solid-js';
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from '@ui-sdk/solid/collapsible';
import { mountSolidControl } from '../packages/ui/mount-solid-control';
import { designDemoTheme } from './design-demo-theme';
import { designDocumentComponents } from './designmd-components';
import { designSampleFamily, type SampleFamily } from './reference-component-preview';
import type { ReferenceSystem } from './ReferenceSpecimen';

type Props = { markdown: string; lang: string; system?: ReferenceSystem };
const packages: Partial<Record<SampleFamily, string>> = {
  button:'button', input:'input', select:'select', toggle:'checkbox', card:'card', tabs:'tabs',
  disclosure:'collapsible', badge:'badge', divider:'separator', table:'table', notice:'alert',
  dialog:'dialog', progress:'progress', breadcrumb:'breadcrumb', avatar:'avatar', loading:'skeleton',
};

function Guide(props: { data: Props }) {
  const zh = () => props.data.lang === 'zh';
  const tokens = createMemo(() => designDemoTheme(props.data.markdown, props.data.system));
  const components = createMemo(() => [...new Set((props.data.system?.components?.length
    ? props.data.system.components
    : designDocumentComponents(props.data.markdown)).flatMap(component => {
      const family = designSampleFamily(component);
      return family !== 'original' && packages[family] ? [packages[family]] : [];
    }))].sort());
  const css = () => {
    const theme = tokens();
    const values = { background: theme.background, foreground: theme.ink, card: theme.surface,
      'card-foreground': theme.onSurface, primary: theme.accent,
      'primary-foreground': theme.onAccent, border: theme.border, radius: theme.radius };
    return `.design-theme {\n${Object.entries(values).map(([name, value]) => `  --${name}: ${value};`).join('\n')}\n}`;
  };
  return <Collapsible class="resource-shadcn-guide">
    <CollapsibleTrigger class="document-disclosure">{zh() ? '在 shadcn/ui 中使用' : 'Use in shadcn/ui'}</CollapsibleTrigger>
    <CollapsiblePanel>
      <p>{zh()
        ? '这是组件与令牌映射。将令牌合并到目标主题，再对照原规范检查状态。未提供的令牌使用示例默认值。'
        : 'This maps components and tokens. Merge the tokens into the target theme and check states against the original guidelines. Missing tokens use example defaults.'}</p>
      <Show when={components().length}>
        <h4>{zh() ? '相应的 shadcn 基础组件' : 'Matching shadcn primitives'}</h4>
        <pre tabindex={0}><code>{`npx shadcn@latest add ${components().join(' ')}`}</code></pre>
      </Show>
      <h4>{zh() ? '主题令牌' : 'Theme tokens'}</h4>
      <pre tabindex={0}><code>{css()}</code></pre>
    </CollapsiblePanel>
  </Collapsible>;
}

export function mountDesignShadcnGuide(element: HTMLElement, initial: Props) {
  return mountSolidControl(element, initial, props => <Guide data={props()} />);
}
