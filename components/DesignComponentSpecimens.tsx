import React, { useMemo } from 'react';
import { HistorySafeFrame } from '../packages/ui/HistorySafeFrame';
import { SolidControlHost } from '../packages/ui/SolidControlHost';
import { designDemoTheme, designTokenLookup, type DemoTheme } from './design-demo-theme';
import { parseDesignDocument } from './designmd-document';
import { designDocumentComponents } from './designmd-components';
import { mountDesignSample } from './DesignSample.solid';
import { buildOriginalComponentPreview, designSampleFamily, designSampleTokens, type ReferenceComponent } from './reference-component-preview';
import type { ReferenceSystem } from './ReferenceSpecimen';

function ComponentSpecimen({ component, theme, system, lang, getToken, referenceName, sourceHref }: {
  component: ReferenceComponent;
  theme: DemoTheme;
  referenceName?: string;
  sourceHref?: string;
  getToken: ReturnType<typeof designTokenLookup>;
  system?: ReferenceSystem;
  lang: string;
}) {
  const family = designSampleFamily(component);
  const zh = lang === 'zh';
  return (
    <article className="reference-component" data-specimen-family={family}>
      <h4>{component.name}</h4>
      {component.role && component.role !== component.name && <p>{component.role}</p>}
      {family === 'original' ? (
        <HistorySafeFrame title={`${component.name} ${zh ? '原始示例' : 'original example'}`}
          srcDoc={buildOriginalComponentPreview(component, system)} sandbox="" loading="lazy"
          tabIndex={-1} referrerPolicy="no-referrer" data-kind="source" />
      ) : (
        <SolidControlHost mount={mountDesignSample} value={{ specimen: component, theme, lang, family, referenceName, sourceHref, tokens: designSampleTokens(component, getToken) }} />
      )}
      {component.description && <p className="reference-component-rules">{component.description}</p>}
    </article>
  );
}

export function DesignComponentSpecimens({ markdown = '', system, lang, headingId, referenceName, sourceHref }: {
  markdown?: string;
  system?: ReferenceSystem;
  lang: string;
  headingId?: string;
  referenceName?: string;
  sourceHref?: string;
}) {
  const components = useMemo(() => system?.components?.length
    ? system.components
    : designDocumentComponents(markdown), [markdown, system]);
  const getToken = useMemo(() => designTokenLookup(parseDesignDocument(markdown).frontmatter), [markdown]);
  const theme = useMemo(() => designDemoTheme(markdown, system), [markdown, system]);
  const zh = lang === 'zh';
  if (!components.length) return null;
  return (
    <section className="reference-component-section">
      <h3 id={headingId}>{zh ? '组件' : 'Components'} <span>{components.length}</span></h3>
      <p>{zh
        ? '使用共享组件演示常见状态，样式取自可读取的设计令牌。'
        : 'Shared components demonstrate common states with available design tokens.'}
      </p>
      {components.map((component, index) => (
        <ComponentSpecimen key={`${component.name}-${index}`} component={component}
          theme={theme} system={system} lang={lang} getToken={getToken} referenceName={referenceName} sourceHref={sourceHref} />
      ))}
    </section>
  );
}
