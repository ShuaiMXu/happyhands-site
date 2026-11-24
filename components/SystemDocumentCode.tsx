// Adapted from Beautiful UI's CodeBlock, copyright 2026 Shane Levine (MIT).
import React, { useId, useState, type ReactNode } from 'react';
import { Code2 } from 'lucide-react';
import { Button } from '../packages/ui';
import './system-document-code.css';

const tokens = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`[^`]*`|\b\d+(?:\.\d+)?\b|\b(?:import|from|export|default|async|function|const|let|var|await|return|if|else|for|while|new|throw|try|catch|null|true|false|undefined)\b)/g;

function highlight(line: string) {
  return line.split(tokens).map((part, index) => {
    if (index % 2 === 0) return part;
    const value = /^["'`0-9]/.test(part);
    return <span key={index} className={value ? 'system-code-value' : 'system-code-keyword'}>{part}</span>;
  });
}

export function SystemDocumentCode({ source, lang, label, syntax }: {
  source: string;
  lang: string;
  label?: string;
  syntax?: string;
}) {
  const zh = lang === 'zh';
  const id = useId();
  const [result, setResult] = useState<'ready' | 'copied' | 'error'>('ready');
  const lines = source.replace(/\r?\n$/, '').split(/\r?\n/);
  const colorize = /^(js|jsx|javascript|ts|tsx|typescript|json)$/.test(syntax || '');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(source);
      setResult('copied');
    } catch {
      setResult('error');
    }
  };

  return <div className="system-code">
    <div className="system-code-toolbar">
      <span id={id}><Code2 size={16} aria-hidden="true" />{label || syntax || (zh ? '代码' : 'Code')}</span>
      <Button variant="ghost" onClick={() => void copy()}>
        {result === 'copied' ? (zh ? '已复制' : 'Copied') : (zh ? '复制代码' : 'Copy code')}
      </Button>
    </div>
    <pre tabIndex={0} aria-labelledby={id}><code>{lines.map((line, index) => (
      <span className="system-code-line" key={index}><span aria-hidden="true">{index + 1}</span><span>{colorize ? highlight(line) : line}</span>{'\n'}</span>
    ))}</code></pre>
    {result === 'error' && <p className="system-code-feedback" role="status">
      {zh ? '复制失败，可手动选中代码。' : 'Copy failed. Select the code to copy it manually.'}
    </p>}
    {result === 'copied' && <span className="sr-only" role="status">{zh ? '已复制代码' : 'Code copied'}</span>}
  </div>;
}

export function SystemDocumentMarkdownCode({ children, lang }: { children?: ReactNode; lang: string }) {
  if (!React.isValidElement<{ children?: ReactNode; className?: string }>(children) ||
    children.type !== 'code' || typeof children.props.children !== 'string') {
    return <pre tabIndex={0}>{children}</pre>;
  }
  const syntax = children.props.className?.match(/(?:^|\s)language-([\w+-]+)/)?.[1];
  return <SystemDocumentCode source={children.props.children} lang={lang} syntax={syntax} />;
}
