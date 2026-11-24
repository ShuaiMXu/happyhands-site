/** @jsxImportSource @solidjs/web */
import type { Element, RootContent } from 'hast';
import { Dynamic, type JSX } from '@solidjs/web';
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from '@ui-sdk/solid/collapsible';
import { createMemo, For, Show } from 'solid-js';
import { mountSolidControl } from '../packages/ui/mount-solid-control';
import { designDocumentHref, designMarkdown } from './design-markdown';
import { parseDesignDocument } from './designmd-document';
import './design-document.css';

type DocumentProps = { text: string; lang: string; supplement?: boolean };
type DocumentTree = ReturnType<typeof designMarkdown>;
const inline = new Set(['p', 'em', 'strong', 'del', 'br', 'hr', 'blockquote', 'pre', 'code', 'ul', 'ol', 'li', 'thead', 'tbody', 'tr', 'th', 'td', 'sup', 'section']);

function Markup(props: { node: RootContent; doc: DocumentTree }) {
  const children = (node: Element) => <For each={node.children}>{child => <Markup node={child} doc={props.doc} />}</For>;
  const element = () => {
    const node = props.node;
    if (node.type === 'text') return node.value;
    if (node.type !== 'element') return null;
    const tag = node.tagName;
    const id = props.doc.headings.get(node)?.id;
    if (tag === 'h1' || tag === 'h2') return <h3 id={id}>{children(node)}</h3>;
    if (/^h[3-6]$/.test(tag)) return <h4>{children(node)}</h4>;
    if (tag === 'table') return <div class="design-document-table" tabindex={0}><table>{children(node)}</table></div>;
    if (tag === 'img') return <span>{String(node.properties.alt ?? '')}</span>;
    if (tag === 'input') return <input type="checkbox" checked={node.properties.checked === true} disabled />;
    if (tag === 'a') {
      const href = designDocumentHref(node.properties.href);
      return href ? <a href={href} target={href.startsWith('#') ? undefined : "_blank"} rel="noopener noreferrer">{children(node)}</a> : children(node);
    }
    if (!inline.has(tag)) return children(node);
    const align = node.properties.align;
    const marker = node.properties.id;
    const attributes = {
      ...(typeof marker === 'string' && /^user-content-[\w-]+$/.test(marker) ? { id: marker } : {}),
      ...(tag === 'ol' && typeof node.properties.start === 'number' ? { start: node.properties.start } : {}),
      ...((tag === 'th' || tag === 'td') && (align === 'left' || align === 'center' || align === 'right')
        ? { style: `text-align:${align}` } : {}),
    };
    return <Dynamic component={tag as keyof JSX.IntrinsicElements} {...attributes}>{children(node)}</Dynamic>;
  };
  return <>{element()}</>;
}

export function DesignDocumentBody(props: DocumentProps) {
  const doc = createMemo(() => parseDesignDocument(props.text));
  const markup = createMemo(() => designMarkdown(doc().body));
  const zh = () => props.lang === 'zh';
  const label = () => zh() ? '设计规范' : 'Design guidelines';
  const content = () => (
    <section class="design-document" aria-label={label()}>
      <h2>{label()}</h2>
      <Show when={markup().headings.size}>
        <nav aria-label={zh() ? '规范目录' : 'Guideline sections'}>
          <For each={[...markup().headings.values()]}>
            {section => <a href={`#${section.id}`}>{section.title}</a>}
          </For>
        </nav>
      </Show>
      <Show when={doc().colors.length}>
        <section aria-label={zh() ? '文档配色' : 'Document colors'} class="design-document-colors">
          <For each={doc().colors}>
            {color => <div><span style={{ 'background-color': color }} /><code>{color}</code></div>}
          </For>
        </section>
      </Show>
      <div class="design-document-body">
        <For each={markup().tree.children}>{node => <Markup node={node} doc={markup()} />}</For>
      </div>
      <Show when={doc().frontmatter}>
        <Collapsible>
          <CollapsibleTrigger class="document-disclosure">{zh() ? '原始结构化参数' : 'Original structured parameters'}</CollapsibleTrigger>
          <CollapsiblePanel><pre>{doc().frontmatter}</pre></CollapsiblePanel>
        </Collapsible>
      </Show>
    </section>
  );
  return (
    <Show when={props.supplement} fallback={content()}>
      <Collapsible class="design-document">
        <CollapsibleTrigger class="document-disclosure">{zh() ? '完整 Design.md 原文' : 'Complete Design.md reference'}</CollapsibleTrigger>
        <CollapsiblePanel>{content()}</CollapsiblePanel>
      </Collapsible>
    </Show>
  );
}

export function mountDesignDocument(element: HTMLElement, initial: DocumentProps) {
  return mountSolidControl(element, initial, props => <DesignDocumentBody text={props().text} lang={props().lang} supplement={props().supplement} />);
}
