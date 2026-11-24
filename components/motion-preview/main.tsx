import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig, useReducedMotion } from 'motion/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './generated/accordion';
import { AnimatedNumber } from './generated/animated-number';
import { Disclosure, DisclosureTrigger, DisclosureContent } from './generated/disclosure';
import { TransitionPanel } from './generated/transition-panel';
import './preview.css';

const params = new URLSearchParams(location.search);
const zh = params.get('lang') !== 'en';
const text = (zhText: string, enText: string) => zh ? zhText : enText;
const copy = [
  [text('审查范围', 'Review scope'), text('选择要检查的页面和交互。', 'Choose the pages and interactions to inspect.')],
  [text('对照证据', 'Comparison evidence'), text('查看相同状态下的前后截图。', 'Compare before and after captures of the same state.')],
];
const panelMotion = { enter: { opacity: 0, y: 6 }, center: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 } };

function AccordionSample() {
  return <Accordion>{copy.map(([title, body]) => (
    <AccordionItem value={title} key={title}><AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent><p>{body}</p></AccordionContent>
    </AccordionItem>
  ))}</Accordion>;
}

function DisclosureSample() {
  const [open, setOpen] = useState(false);
  return <Disclosure open={open} onOpenChange={setOpen}>
    <DisclosureTrigger><button type="button">{text('查看审查范围', 'View review scope')}</button></DisclosureTrigger>
    <DisclosureContent><p>{copy[0][1]}</p></DisclosureContent>
  </Disclosure>;
}

function NumberSample() {
  const [value, setValue] = useState(12);
  const reduced = useReducedMotion();
  return <div className="motion-number">
    <div><strong>{reduced ? value : <AnimatedNumber value={value} />}</strong><p>{text('已审查页面', 'Pages reviewed')}</p></div>
    <button type="button" onClick={() => setValue(v => v === 12 ? 48 : 12)}>{text('更新计数', 'Update count')}</button>
  </div>;
}

function TransitionSample() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  return <>
    <div className="motion-tabs">{copy.map(([title], index) => (
      <button key={title} type="button" aria-pressed={active === index} onClick={() => setActive(index)}>{title}</button>
    ))}</div>
    <TransitionPanel activeIndex={active} variants={panelMotion} transition={{ duration: reduced ? 0 : 0.2 }}>
      {copy.map(([title, body]) => <p key={title}>{body}</p>)}
    </TransitionPanel>
  </>;
}

const samples = new Map([
  ['accordion', AccordionSample],
  ['disclosure', DisclosureSample],
  ['animated-number', NumberSample],
  ['transition-panel', TransitionSample],
]);

function App() {
  const Sample = samples.get(params.get('component') || '');
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (parent !== window) parent.postMessage({
        type: 'design-system-preview-height',
        height: document.querySelector('main')!.getBoundingClientRect().height,
      }, location.origin);
    });
    observer.observe(document.querySelector('main')!);
    return () => observer.disconnect();
  }, []);
  return (
    <main className="motion-specimen" data-theme={params.get('theme') === 'dark' ? 'dark' : 'light'}>
      <MotionConfig reducedMotion="user">
        <div className="motion-specimen-inner">
          {Sample ? <Sample /> : <p role="alert">{text('预览不可用。', 'Preview unavailable.')}</p>}
        </div>
      </MotionConfig>
    </main>
  );
}
document.documentElement.lang = zh ? 'zh-CN' : 'en';
createRoot(document.getElementById('root')!).render(<App />);
