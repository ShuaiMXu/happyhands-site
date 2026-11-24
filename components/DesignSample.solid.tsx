/** @jsxImportSource @solidjs/web */
import { createSignal, For, Show } from 'solid-js';
import { Dynamic, type JSX } from '@solidjs/web';
import { Button } from '@ui-sdk/solid/button';
import { Input } from '@ui-sdk/solid/input';
import { Checkbox, CheckboxIndicator } from '@ui-sdk/solid/checkbox';
import { Select, SelectContent, SelectItem, SelectItemIndicator, SelectList, SelectTrigger } from '@ui-sdk/solid/select';
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from '@ui-sdk/solid/collapsible';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@ui-sdk/solid/dialog';
import { visualExamples } from './DesignVisualSample.solid';
import { ResourceTabs } from './ResourceTabs.solid';
import { mountSolidControl } from '../packages/ui/mount-solid-control';
import type { DemoTheme } from './design-demo-theme';
import { contrastInk, contrastRatio } from './design-demo-theme';
import type { designSampleTokens, ReferenceComponent, SampleFamily } from './reference-component-preview';
import './design-samples.css';

export type DesignSampleProps = {
  specimen: ReferenceComponent;
  family: SampleFamily;
  tokens: ReturnType<typeof designSampleTokens>;
  theme: DemoTheme;
  lang: string;
  referenceName?: string;
  sourceHref?: string;
};

type Copy = ReturnType<typeof sampleCopy>;
function sampleCopy(zh: boolean) {
  return {
    sample: zh ? '网站改版' : 'Website redesign',
    project: zh ? '项目' : 'Project',
    all: zh ? '全部项目' : 'All projects',
    overview: zh ? '概览' : 'Overview',
    activity: zh ? '动态' : 'Activity',
    progress: zh ? '进行中' : 'In progress',
    complete: zh ? '已完成' : 'Complete',
    save: zh ? '保存' : 'Save',
    saved: zh ? '已保存' : 'Saved',
    cancel: zh ? '取消' : 'Cancel',
    email: zh ? '电子邮件' : 'Email address',
    search: zh ? '搜索项目' : 'Search projects',
    name: zh ? '项目名称' : 'Project name',
    notice: zh ? '接收项目更新' : 'Receive project updates',
    summary: zh ? '集中查看设计稿、反馈和待办。' : 'See design files, feedback, and tasks in one place.',
    recent: zh ? '最近更新了首页设计稿。' : 'The homepage design was updated recently.',
    details: zh ? '查看详情' : 'View details',
    status: zh ? '状态' : 'Status',
    close: zh ? '关闭' : 'Close',
    empty: zh ? '还没有项目' : 'No projects yet',
    preview: zh ? '示例位置' : 'Sample position',
  };
}

type ExampleProps = DesignSampleProps & { copy: Copy; variables: JSX.CSSProperties };

function Action(props: { children: JSX.Element; variant?: 'secondary' | 'ghost'; type?: 'button' | 'submit'; disabled?: boolean; onClick?: () => void }) {
  return <Button type={props.type ?? 'button'} class="design-sample-action" data-variant={props.variant ?? 'primary'}
    disabled={props.disabled} onClick={props.onClick}>{props.children}</Button>;
}

function Status(props: { children: JSX.Element }) {
  return <span class="design-sample-badge">{props.children}</span>;
}

function Card(props: { title: string; children: JSX.Element; borderless?: boolean }) {
  return <div class="design-sample-card" data-borderless={props.borderless || undefined}>
    <strong>{props.title}</strong>
    {props.children}
  </div>;
}

function ButtonExample(props: ExampleProps) {
  const [saved, setSaved] = createSignal(false);
  const variant = () => /ghost|text|link|tertiary/i.test(props.specimen.name) &&
    !/outline/i.test(props.specimen.name) ? 'ghost' : /outline|secondary/i.test(props.specimen.name) ? 'secondary' : undefined;
  return <div class="design-sample-row">
    <Action variant={variant()} onClick={() => setSaved(true)}>{saved() ? props.copy.saved : props.copy.save}</Action>
    <Action variant={variant()} disabled>{props.copy.save}</Action>
    <span class="design-sample-sr" role="status">{saved() ? props.copy.saved : ''}</span>
  </div>;
}

function InputExample(props: ExampleProps) {
  const [saved, setSaved] = createSignal(false);
  const email = () => /email|邮箱/i.test(props.specimen.name);
  const search = () => /search|搜索/i.test(props.specimen.name);
  return <form class="design-sample-fields" onSubmit={event => { event.preventDefault(); setSaved(true); }}>
    <label class="design-sample-field">
      <span>{email() ? props.copy.email : search() ? props.copy.search : props.copy.name}</span>
      <Input class="design-sample-input" type={email() ? 'email' : search() ? 'search' : 'text'}
        required placeholder={email() ? 'name@example.com' : props.copy.sample} onInput={() => setSaved(false)} />
    </label>
    <Show when={!search()}>
      <Action type="submit">{props.copy.save}</Action>
      <span class="design-sample-feedback" role="status">{saved() ? props.copy.saved : ''}</span>
    </Show>
  </form>;
}

function SelectExample(props: ExampleProps) {
  const [selected, setSelected] = createSignal<'all' | 'progress' | 'complete'>('all');
  return <Select<'all' | 'progress' | 'complete'> value={selected()} onValueChange={value => setSelected(value ?? 'all')} modal={false}>
    <SelectTrigger class="design-sample-select-trigger" aria-label={props.copy.status}>
      {props.copy[selected()]}
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
    </SelectTrigger>
    <SelectContent class="design-sample-popup" style={props.variables} align="start" sideOffset={6} collisionPadding={16}>
      <SelectList aria-label={props.copy.status}>
        <For each={['all', 'progress', 'complete'] as const}>
          {option => <SelectItem class="design-sample-option" value={option} label={props.copy[option]}>
            {props.copy[option]} <SelectItemIndicator aria-hidden="true">✓</SelectItemIndicator>
          </SelectItem>}
        </For>
      </SelectList>
    </SelectContent>
  </Select>;
}

function ToggleExample(props: ExampleProps) {
  return <label class="design-sample-option-label">
    <Checkbox class="design-sample-check"><CheckboxIndicator aria-hidden="true">✓</CheckboxIndicator></Checkbox>
    {props.copy.notice}
  </label>;
}

function TabsExample(props: ExampleProps) {
  const [active, setActive] = createSignal('overview');
  return <ResourceTabs label={props.copy.project}
    tabs={[{ id: 'overview', label: props.copy.overview }, { id: 'activity', label: props.copy.activity }]}
    value={active()} onChange={setActive} listClass="design-sample-tabs" panelClass="design-sample-tab-panel"
    panel={id => <p>{id === 'overview' ? props.copy.summary : props.copy.recent}</p>} />;
}

function DialogExample(props: ExampleProps) {
  return <Dialog>
    <DialogTrigger class="design-sample-action">{props.copy.details}</DialogTrigger>
    <DialogContent class="design-sample-dialog" style={props.variables}>
      <DialogTitle>{props.copy.sample}</DialogTitle>
      <DialogDescription>{props.copy.summary}</DialogDescription>
      <DialogClose class="design-sample-action" data-variant="secondary">{props.copy.close}</DialogClose>
    </DialogContent>
  </Dialog>;
}

function ProjectTable(props: ExampleProps) {
  return <table class="design-sample-table">
    <thead><tr><th scope="col">{props.copy.project}</th><th scope="col">{props.copy.status}</th></tr></thead>
    <tbody><tr><td>{props.copy.sample}</td><td><Status>{props.copy.progress}</Status></td></tr></tbody>
  </table>;
}

function ProgressExample(props: ExampleProps) {
  return <div class="design-sample-stack"><span>{props.copy.progress}</span>
    <progress class="design-sample-range" max="100" value="65" aria-label={props.copy.progress} />
  </div>;
}

function PositionExample(props: ExampleProps) {
  const [position, setPosition] = createSignal(50);
  return <label class="design-sample-stack">
    <span>{props.copy.preview}</span>
    <input class="design-sample-range" type="range" min="0" max="100" value={position()}
      onInput={event => setPosition(event.currentTarget.valueAsNumber)} />
    <output>{position()}%</output>
  </label>;
}

const examples: Record<SampleFamily, (props: ExampleProps) => JSX.Element> = {
  ...visualExamples,
  button: ButtonExample,
  input: InputExample,
  select: SelectExample,
  toggle: ToggleExample,
  card: props => <Card title={props.copy.sample} borderless={props.tokens.borderless}><p>{props.copy.summary}</p></Card>,
  tabs: TabsExample,
  disclosure: props => <Collapsible>
    <CollapsibleTrigger class="design-sample-action" data-variant="secondary">{props.copy.details}</CollapsibleTrigger>
    <CollapsiblePanel><p class="design-sample-tab-panel">{props.copy.summary}</p></CollapsiblePanel>
  </Collapsible>,
  badge: props => <Status>{props.copy.progress}</Status>,
  divider: props => <div class="design-sample-stack"><strong>{props.copy.overview}</strong><hr /><span>{props.copy.activity}</span></div>,
  table: ProjectTable,
  typography: props => <div class="design-sample-stack"><strong class="design-sample-title">{props.copy.sample}</strong><p>{props.copy.summary}</p></div>,
  list: props => <ul class="design-sample-list"><li>{props.copy.overview}</li><li>{props.copy.activity}</li></ul>,
  notice: props => <Card title={props.copy.status}><p>{props.copy.recent}</p></Card>,
  navigation: TabsExample,
  section: props => <div class="design-sample-stack"><strong class="design-sample-title">{props.copy.sample}</strong>
    <p>{props.copy.summary}</p><DialogExample {...props} />
  </div>,
  composition: props => <div class="design-sample-grid">
    <Card title={props.copy.overview}><p>{props.copy.summary}</p></Card>
    <Card title={props.copy.activity}><p>{props.copy.recent}</p></Card>
  </div>,
  empty: props => <Card title={props.copy.empty}><p>{props.copy.summary}</p></Card>,
  code: () => <code class="design-sample-code">const project = 'Website redesign';</code>,
  rating: props => <meter class="design-sample-range" min="0" max="5" value="4" aria-label={props.copy.status}>4 / 5</meter>,
  loading: props => <progress class="design-sample-range" aria-label={props.copy.progress} />,
  compare: PositionExample,
  carousel: TabsExample,
  dialog: DialogExample,
  metric: props => <div class="design-sample-stack"><span>{props.copy.complete}</span><strong class="design-sample-title">8 / 12</strong></div>,
  chat: props => <div class="design-sample-stack"><Status>{props.copy.activity}</Status><Card title={props.copy.project}><p>{props.copy.recent}</p></Card></div>,
  palette: props => <ul class="design-sample-colors">
    <For each={[props.theme.accent, props.theme.surface, props.theme.ink]}>{color => <li><i style={{ 'background-color': color }} /><code>{color}</code></li>}</For>
  </ul>,
  progress: ProgressExample,
  breadcrumb: props => <p class="design-sample-row"><span>{props.copy.all}</span><span aria-hidden="true">/</span><strong>{props.copy.sample}</strong></p>,
  status: props => <Status>{props.copy.complete}</Status>,
  quote: props => <blockquote>{props.copy.summary}</blockquote>,
};

function DesignSample(props: DesignSampleProps) {
  const variables = (): JSX.CSSProperties => {
    const { theme, family } = props;
    const { radius, padding, fill, ink } = props.tokens;
    const action = family === 'button' && fill ? fill : theme.accent;
    const surface = family === 'card' && fill ? fill : theme.surface;
    const art = fill ?? theme.accent;
    const readable = (color: string, canvas: string) => contrastRatio(color, canvas) >= 4.5
      ? color : contrastInk(canvas);
    return {
      '--sample-canvas': theme.background, '--sample-ink': theme.ink,
      '--sample-art': art, '--sample-on-art': readable(ink ?? theme.onAccent, art),
      '--sample-art-ink': readable(art, theme.background),
      '--sample-action': action,
      '--sample-on-action': readable(family === 'button' && ink || theme.onAccent, action),
      '--sample-surface': surface, '--sample-on-surface': readable(family === 'card' && ink || theme.onSurface, surface),
      '--sample-border': theme.border, '--sample-font': theme.font,
      '--sample-size': theme.size, '--sample-weight': theme.weight,
      '--sample-radius': family === 'button' && radius ? radius : theme.radius,
      '--sample-padding': family === 'button' && padding ? padding : theme.padding,
      '--sample-input-radius': family === 'input' && radius ? radius : theme.inputRadius,
      '--sample-card-radius': family === 'card' && radius ? radius : theme.cardRadius,
      '--sample-card-padding': family === 'card' && padding ? padding : theme.cardPadding,
    };
  };
  return <div class="design-sample-surface" data-component-family={props.family} style={variables()}>
    <Dynamic component={examples[props.family]} {...props} copy={sampleCopy(props.lang === 'zh')} variables={variables()} />
  </div>;
}

export function mountDesignSample(element: HTMLElement, initial: DesignSampleProps) {
  return mountSolidControl(element, initial, props => <DesignSample {...props()} />);
}
