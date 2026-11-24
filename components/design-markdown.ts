import type { Element, Root, RootContent } from 'hast';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const markdown = unified().use(remarkParse).use(remarkGfm).use(remarkRehype);

function textOf(node: RootContent): string {
  if (node.type === 'text') return node.value;
  if (node.type !== 'element') return '';
  if (node.tagName === 'img') return String(node.properties.alt ?? '');
  return node.children.map(textOf).join('');
}

/** Parse Markdown and GFM without passing raw HTML or evaluating archive directives. */
export function designMarkdown(source: string) {
  const tree = markdown.runSync(markdown.parse(source)) as Root;
  const headings = new Map<Element, { id: string; title: string }>();
  for (const node of tree.children) {
    if (node.type === 'element' && (node.tagName === 'h1' || node.tagName === 'h2')) {
      headings.set(node, { id: `designmd-section-${headings.size}`, title: textOf(node) });
    }
  }
  return { tree, headings };
}

export function designDocumentHref(value: unknown) {
  if (typeof value !== 'string' || !value.trim()) return undefined;
  try {
    const url = new URL(value, 'https://happyhands.cc');
    if (['http:', 'https:', 'mailto:'].includes(url.protocol)) return value;
  } catch { /* malformed links stay non-interactive */ }
  return undefined;
}
