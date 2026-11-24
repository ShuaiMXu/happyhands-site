/** @jsxImportSource @solidjs/web */
import { For, Show } from 'solid-js';
import { Avatar, AvatarFallback } from '@ui-sdk/solid/avatar';
import type { JSX } from '@solidjs/web';
import type { DesignSampleProps } from './DesignSample.solid';

function local(props: DesignSampleProps, zh: string, en: string) {
  return props.lang === 'zh' ? zh : en;
}

function VisualFigure(props: DesignSampleProps & { children: JSX.Element }) {
  return <figure class="design-sample-visual">
    <div class="design-sample-visual-body">{props.children}</div>
    <figcaption>
      <span>{local(props, '形态示意', 'Illustrative specimen')}</span>
      <Show when={props.sourceHref}>
        <a href={props.sourceHref}>{local(props, '查看页面参考', 'View page reference')}</a>
      </Show>
    </figcaption>
  </figure>;
}

function MediaExample(props: DesignSampleProps) {
  const window = () => /browser|screen|window|device|mock.?up|product preview/i.test(props.specimen.name);
  return <VisualFigure {...props}>
    <div class="design-sample-media-frame" data-window={window() || undefined}
      style={{ 'border-radius': props.tokens.radius ?? 'var(--sample-card-radius)' }}>
      <Show when={window()}><div class="design-sample-window-bar" aria-hidden="true"><i /><i /><i /></div></Show>
      <div class="design-sample-media-slot">{local(props, '图像区域', 'Image area')}</div>
    </div>
  </VisualFigure>;
}

function BrandExample(props: DesignSampleProps) {
  const name = () => props.referenceName || local(props, '品牌名称', 'Brand name');
  const wordmark = () => /wordmark|logotype|watermark/i.test(props.specimen.name);
  const grouped = () => /grid|strip|row|marquee/i.test(props.specimen.name);
  return <VisualFigure {...props}>
    <div class="design-sample-lockup">
      <Show when={!wordmark()}>
        <For each={grouped() ? ['A', 'B', 'C'] : [name().slice(0, 1)]}>
          {mark => <span class="design-sample-mark" aria-label={local(props, '标志占位', 'Mark placeholder')}>{mark}</span>}
        </For>
      </Show>
      <Show when={!grouped()}><span class="design-sample-wordmark">{name()}</span></Show>
    </div>
  </VisualFigure>;
}

function AvatarExample(props: DesignSampleProps) {
  const grouped = () => /stack|cluster|group|pair|row|overlap/i.test(props.specimen.name + ' ' + props.specimen.description);
  const initials = () => grouped() ? ['AL', 'JL', 'MK'] : ['AL'];
  return <VisualFigure {...props}>
    <div class="design-sample-avatar-group" data-grouped={grouped() || undefined}>
      <For each={initials()}>
        {initial => <Avatar class="design-sample-avatar" style={{ '--sample-avatar-size': props.tokens.size ?? '36px' }}>
          <AvatarFallback>{initial}</AvatarFallback>
        </Avatar>}
      </For>
    </div>
  </VisualFigure>;
}

const chartValues = [24, 48, 40, 64, 56, 86];
const diagramPoints = ['20,28', '46,52', '80,26', '109,58', '136,34'] as const;
function DiagramExample(props: DesignSampleProps) {
  const columns = () => /bar|histogram|equalizer|benchmark/i.test(props.specimen.name);
  return <VisualFigure {...props}>
    <Show when={columns()} fallback={
      <svg class="design-sample-diagram" viewBox="0 0 156 84" role="img" aria-label={local(props, '示例节点关系', 'Sample node relationships')}>
        <path d="M20 28 L46 52 L80 26 L109 58 L136 34 M46 52 L109 58" fill="none" stroke="currentColor" stroke-width="1.5" />
        <For each={diagramPoints}>{point =>
          <circle cx={point.split(',')[0]} cy={point.split(',')[1]} r="4" fill="var(--sample-art-ink)" />
        }</For>
      </svg>
    }>
      <div class="design-sample-bars" role="img" aria-label={local(props, '用示例数据绘制的柱状图', 'Bar chart using sample data')}>
        <For each={chartValues}>{value => <i aria-hidden="true" style={{ height: value + '%' }} />}</For>
      </div>
    </Show>
  </VisualFigure>;
}

function iconPath(name: string) {
  if (/menu|hamburger/i.test(name)) return 'M5 7h14M5 12h14M5 17h14';
  if (/cart|bag/i.test(name)) return 'M5 9h14l1 11H4L5 9Zm4 1V7a3 3 0 0 1 6 0v3';
  if (/check|verification/i.test(name)) return 'm5 12 4 4 10-10';
  if (/search|magnifier/i.test(name)) return 'M10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm4-2 5 5';
  if (/scroll|down/i.test(name)) return 'M12 4v15m-5-5 5 5 5-5';
  if (/close|dismiss/i.test(name)) return 'm6 6 12 12M18 6 6 18';
  if (/arrow|chevron/i.test(name)) return 'm9 6 6 6-6 6';
  return 'M12 4 20 12 12 20 4 12Z';
}

function IconExample(props: DesignSampleProps) {
  const size = () => props.tokens.size ?? '20px';
  return <VisualFigure {...props}>
    <span class="design-sample-icon-box" style={{ '--sample-glyph-size': size() }}>
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d={iconPath(props.specimen.name)} />
      </svg>
    </span>
  </VisualFigure>;
}

function ShapeExample(props: DesignSampleProps) {
  const circular = () => /circle|disc|round|ring|orb/i.test(props.specimen.name);
  return <VisualFigure {...props}>
    <div class="design-sample-shape" data-circular={circular() || undefined}
      style={{ '--sample-shape-radius': props.tokens.radius ?? 'var(--sample-card-radius)' }} />
  </VisualFigure>;
}

export const visualExamples = {
  media: MediaExample,
  brand: BrandExample,
  avatar: AvatarExample,
  diagram: DiagramExample,
  icon: IconExample,
  shape: ShapeExample,
};
