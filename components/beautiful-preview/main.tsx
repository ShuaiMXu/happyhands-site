/// <reference types="vite/client" />
import React from 'react';
import { createRoot } from 'react-dom/client';
import records from './catalog.json';
import './generated.css';

const OnlineReview = React.lazy(() => import('./IceCreamHarness'));

const params = new URLSearchParams(location.search);
const zh = params.get('lang') !== 'en';
const t = (cn: string, en: string) => zh ? cn : en;
document.documentElement.lang = zh ? 'zh-CN' : 'en';
document.documentElement.classList.toggle('dark', params.get('theme') === 'dark');
const modules = import.meta.glob('./upstream/*/*.tsx');
const labels = { completed: t('已完成', 'Completed'), failed: t('失败', 'Failed') };
const actions = t('查看详情', 'View details');
const code = 'npx shadcn add https://www.beautifului.dev/r/task-rows.json';
const examples: Record<string, Record<string, unknown>> = {
  'task-rows': { variant: 'List', labels, rows: [
    { key: 'capture', label: t('采集当前页面', 'Capture current page'), amount: t('桌面与手机', 'Desktop and phone'), status: 'done', details: [{ label: t('保存原始截图', 'Saved original captures'), meta: '2 PNG' }] },
    { key: 'review', label: t('检查页面交互', 'Check page interaction'), amount: t('焦点与展开态', 'Focus and expanded state'), status: 'done', details: [{ label: t('核对键盘操作', 'Checked keyboard operation'), meta: t('示例', 'Example') }] },
  ] },
  'code-block': { filename: 'shadcn', lines: [code], code, labels: { copy: t('复制', 'Copy'), copied: t('已复制', 'Copied') } },
  button: { children: actions },
  'glide-menu': { children: <div className="grid gap-1">{[t('预览', 'Preview'), t('基础规范', 'Foundations'), t('源码', 'Source')].map((label) =>
    <button key={label} data-menu-row className="relative z-10 w-full rounded-lg px-4 py-2 text-left">{label}</button>)}</div> },
  'entity-chip': { name: 'HappyHands' },
  'value-pill': { children: labels.completed, tone: 'green' },
  shimmer: { children: t('正在审查', 'Reviewing') },
  'stream-text': { text: t('检查页面交互与设计规范的一致性。', 'Compare the page interaction with its design guidance.') },
  'streaming-text': { loop: false },
};
const registry = records as Record<string, readonly string[] | null>;

function Foundation() {
  return <div className="beautiful-swatches">{['page', 'surface', 'ink', 'line', 'accent', 'green', 'orange', 'red'].map((token) =>
    <span className="beautiful-swatch" key={token}><i style={{ background: `var(--${token})` }} />{token}</span>)}</div>;
}

function load(name: string) {
  const entry = registry[name];
  if (!entry) return Foundation;
  const [path, symbol] = entry;
  return React.lazy(async () => {
    const source = await modules[`./upstream/${path}.tsx`]() as Record<string, React.ComponentType<Record<string, unknown>>>;
    return { default: source[symbol] };
  });
}

const requested = params.get('component');
const specimens = requested && Object.hasOwn(registry, requested) ? [requested] : ['task-rows', 'code-block'];
const review = params.get('mode') === 'review';
if (review) {
  document.documentElement.dataset.review = params.get('embedded') === '1' ? 'embedded' : '';
  document.title = t('HappyHands 在线审查', 'HappyHands Review');
}
createRoot(document.getElementById('preview')!).render(review ? (
  <React.Suspense fallback={null}><OnlineReview /></React.Suspense>
) : (
  <main className="beautiful-preview">
    {!requested && <p className="beautiful-preview-note">{t('交互示例（示例数据）', 'Interactive examples with sample data')}</p>}
    {specimens.map((name) => {
      const Specimen = load(name);
      return <React.Suspense key={name} fallback={<p role="status">{t('正在加载组件…', 'Loading component…')}</p>}>
        <div data-preview-specimen={name}><Specimen {...examples[name]} /></div>
      </React.Suspense>;
    })}
  </main>
));
const reportHeight = () => {
  if (!review && window.parent !== window) {
    const height = Math.ceil(document.getElementById('preview')!.getBoundingClientRect().bottom + 10);
    window.parent.postMessage({ type: 'design-system-preview-height', height }, location.origin);
  }
};
new ResizeObserver(reportHeight).observe(document.getElementById('preview')!);
window.addEventListener('message', (event) => {
  if (event.origin === location.origin && event.source === window.parent && event.data?.type === 'hh:tool-active') reportHeight();
});
