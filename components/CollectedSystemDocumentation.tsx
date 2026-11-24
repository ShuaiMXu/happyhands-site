import React from 'react';
import { DesignSystemDocumentation, SystemDocumentLink, type SystemDocumentSection } from './DesignSystemDocumentation';
import { PlatformDirectory } from './PlatformDirectory';
import { ResourceProvenance } from './ResourcePresentation';
import { platformFor, systemEntryName } from './platform-directory';
import { resourceHref, type ResourceEntry } from './resource-directory';
import { SystemStylePreview } from './SystemStylePreview';

export function CollectedSystemDocumentation({ row, rows, lang, document, tokens, copy, preview }: {
  row: ResourceEntry;
  rows: ResourceEntry[];
  lang: string;
  document: React.ReactNode;
  preview?: React.ReactNode;
  tokens?: React.ReactNode;
  copy: React.ReactNode;
}) {
  const zh = lang === 'zh';
  const t = (cn: string, en: string) => zh ? cn : en;
  const platform = platformFor(row);
  const system = row.type === 'system' ? row.system : undefined;
  const source = row.sourceUrl || row.source;
  const foundations = system ? rows.filter((item) => item.system === system && item.path.includes('/foundations/')) : [];
  const components = system ? rows.filter((item) => item.system === system && item.type === 'system' && item.path.includes('/components/')) : [];
  const original = '/' + row.path;
  const download = <SystemDocumentLink href={original} download>{t('下载原文件', 'Download original')}</SystemDocumentLink>;
  const sections: SystemDocumentSection[] = [];
  if (system || preview) {
    sections.push({
      id: 'system-preview',
      title: t('系统预览', 'System preview'),
      content: preview || (system && <SystemStylePreview system={system} lang={lang} gallery="examples" />),
    });
  }
  if (row.type === "tokens" || tokens || foundations.length) {
    sections.push({
      id: 'system-foundations',
      title: row.type === 'tokens' ? t('设计变量', 'Design tokens') : t('基础规范', 'Foundations'),
      content: <>
        {system && <SystemStylePreview system={system} lang={lang} gallery="foundations" />}
        {tokens || (row.type === "tokens" ? document : null)}
        {!!foundations.length && <DocumentList rows={foundations} lang={lang} />}
      </>,
    });
  }
  if (row.collection === "beautiful-ui") {
    sections.push({
      id: 'system-components', title: t('组件', 'Components'),
      content: <DocumentList rows={rows.filter(item => item.collection === row.collection && item.type === 'component')} lang={lang} />,
    });
  }
  if (system && components.length) {
    sections.push({
      id: 'system-components',
      title: t('组件', 'Components'),
      content: <>
        <SystemStylePreview system={system} lang={lang} gallery="components" />
        <DocumentList rows={components} lang={lang} />
      </>,
    });
  }
  if (platform) {
    sections.push({
      id: 'system-guides',
      title: t('主题目录', 'Topics'),
      content: <PlatformDirectory row={row} rows={rows} lang={lang} />,
    });
  }
  sections.push({
    id: 'system-source',
    title: t('原始文档', 'Original document'),
    content: <>
      <div className="collections-actions">{copy}</div>
      {row.type === "tokens" && !tokens ? null : document}
      <ResourceProvenance lang={lang} source={source} license={row.license} sha256={row.sha256} />
    </>,
  });
  const descriptions: Record<string, [string, string]> = {
    'meridian-clay': ['面向消费产品的浅色设计系统，使用暖灰表面与蓝色主操作。', 'A light design system for consumer products, with warm gray surfaces and blue primary actions.'],
    'meridian-glass': ['用于呈现 AI 助手的计划、流程与审批。', 'A design system for AI assistant plans, procedures and approvals.'],
    'meridian-mono': ['面向运行监控和数据工具的设计系统。', 'A design system for operations monitoring and data tools.'],
    'meridian-slate': ['面向开发者工具的设计系统，涵盖运行会话、部署与环境管理。', 'A design system for developer tools, with sessions, deployments and environment management.'],
  };
  return <DesignSystemDocumentation
    name={systemEntryName(row)}
    description={system && descriptions[system] ? t(...descriptions[system]) : undefined}
    lang={lang}
    sections={sections}
    actions={<>
      <SystemDocumentLink href={`#${sections[0].id}`} primary>{sections[0].title}</SystemDocumentLink>
      {download}
    </>}
  />;
}

function DocumentList({ rows, lang }: { rows: ResourceEntry[]; lang: string }) {
  return <ul className="system-book-document-list">
    {rows.map((row) => (
      <li key={row.id}>
        <SystemDocumentLink href={resourceHref(row, lang)}>
          {row.name.replace(/^r \/ /, '').split(' / ').at(-1)}
        </SystemDocumentLink>
      </li>
    ))}
  </ul>;
}
