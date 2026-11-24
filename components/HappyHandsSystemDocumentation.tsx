import { HappyHandsSystemSections, type SystemSection } from '../systems/happyhands/SystemSections';
import { DesignSystemDocumentation, SystemDocumentLink } from './DesignSystemDocumentation';
import { ResourceExport } from './ResourceExport';
import '../systems/happyhands/documentation.css';

const pages = [
  ['overview', 'system-preview', '系统预览', 'System preview'],
  ['foundations', 'system-foundations', '基础规范', 'Foundations'],
  ['components', 'system-components', '组件与状态', 'Components and states'],
  ['files', 'system-download', '接入与下载', 'Setup and downloads'],
] as const satisfies readonly (readonly [SystemSection, string, string, string])[];

export function HappyHandsSystemDocumentation({ lang, dark }: { lang: string; dark: boolean }) {
  const zh = lang === 'zh';
  return <DesignSystemDocumentation
    name="HappyHands"
    description={zh ? 'HappyHands 官网的品牌规范、设计令牌和交互组件。' : 'Brand guidelines, design tokens and interaction components for the HappyHands website.'}
    lang={lang}
    actions={<>
      <SystemDocumentLink href="#system-components" primary>{zh ? '试用组件' : 'Try components'}</SystemDocumentLink>
      <SystemDocumentLink href="/systems/happyhands/SKILL.md" download>{zh ? '下载 SKILL.md' : 'Download SKILL.md'}</SystemDocumentLink>
    </>}
    sections={pages.map(([section, id, cn, en]) => ({
      id,
      title: zh ? cn : en,
      content: <div className="hh-system-section">
        <HappyHandsSystemSections lang={lang} dark={dark} section={section} />
        {section === 'files' && (
          <ResourceExport lang={lang} files={[
            { label: 'SKILL.md', url: '/systems/happyhands/SKILL.md', name: 'SKILL.md' },
            { label: 'Tokens', url: '/systems/happyhands/tokens.json', name: 'happyhands-tokens.json' },
          ]} />
        )}
      </div>,
    }))}
  />;
}
