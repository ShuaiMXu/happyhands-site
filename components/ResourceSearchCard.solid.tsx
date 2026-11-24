/** @jsxImportSource @solidjs/web */
import { createMemo, createSignal, createUniqueId, For, onSettled, Show } from 'solid-js';
import { Button } from '@ui-sdk/solid/button';
import { Input } from '@ui-sdk/solid/input';
import { mountSolidControl } from '../packages/ui/mount-solid-control';
import { handleSearchKeyDown, type SearchResult } from './resource-search-keydown';
import './search-card.css';

// PinUI Search Card, adapted to the live catalogue. The source demo remains in the registry.

const RECENTS_KEY = 'hh:search-recents';
const MAX_RECENTS = 4;
const MAX_RESULTS = 6;
const TILE_GRADIENTS = [
  'linear-gradient(140deg,#f6cffc 0%,#d79bf3 50%,#a75be6 100%)',
  'linear-gradient(150deg,#7cc0ff 0%,#3d8af5 55%,#2266e3 100%)',
  'linear-gradient(150deg,#9ee98f 0%,#5cd062 55%,#38b54a 100%)',
  'linear-gradient(150deg,#ffd28a 0%,#ffa25c 55%,#f47b36 100%)',
];
const GLOWS = ['rgba(167,91,230,.45)', 'rgba(34,102,227,.45)', 'rgba(56,181,74,.45)', 'rgba(244,123,54,.45)'];

const SearchIcon = ({ size = 17, stroke = 2.2 }: { size?: number; stroke?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={stroke} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="m21 21-4.34-4.34" />
    <circle cx="11" cy="11" r="8" />
  </svg>
);
const XIcon = ({ size = 15, stroke = 2.2 }: { size?: number; stroke?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={stroke} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);
const ClockIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l2.5 2.5" />
  </svg>
);
const TrashIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M3 6h18" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const PROVIDERS: Record<string, string> = {
  'cult-ui': 'Cult UI',
  'design-md': 'Design.md',
  pinui: 'PinUI',
  systems: 'Design system',
};

function resultMeta(href: string) {
  try {
    const url = new URL(href, 'https://happyhands.cc');
    const provider = url.searchParams.get('provider');
    if (provider) return PROVIDERS[provider] || provider.replace(/-/g, ' ');
    const system = url.searchParams.get('system');
    if (system) return system === 'happyhands' ? 'HappyHands' : system.charAt(0).toUpperCase() + system.slice(1);
    return url.hostname.replace(/^www\./, '');
  } catch {
    return href;
  }
}

function Tile({ index }: { index: number }) {
  return (
    <span class="psearch__tile" aria-hidden="true">
      <span
        class="psearch__tile-art"
        style={{ background: TILE_GRADIENTS[index % TILE_GRADIENTS.length], "box-shadow": `inset 0 1px 1px rgba(255,255,255,.6), 0 6px 14px -6px ${GLOWS[index % GLOWS.length]}` }}
      >
        <span class="psearch__tile-glyph">{String.fromCharCode(65 + (index % 26))}</span>
      </span>
    </span>
  );
}

type SearchProps = {
  label: string;
  placeholder: string;
  query: string;
  onQueryChange: (value: string) => void;
  results?: SearchResult[];
  suggestions?: string[];
};

function ResourceSearchCard(props: { data: SearchProps }) {
  const zh = () => /[\u3400-\u9fff]/.test(props.data.label);
  const [open, setOpen] = createSignal(false);
  const [recents, setRecents] = createSignal<string[]>([]);
  const [cleared, setCleared] = createSignal<string[] | null>(null);
  const [mac, setMac] = createSignal(false);
  const query = createMemo(() => props.data.query.trim());
  const hasResults = () => props.data.results !== undefined;
  const results = createMemo(() => (props.data.results ?? []).slice(0, MAX_RESULTS));
  const suggestions = () => props.data.suggestions?.length
    ? props.data.suggestions
    : zh() ? ['落地页', '表单', '定价页', '设计系统'] : ['Landing page', 'Forms', 'Pricing', 'Design systems'];
  const id = createUniqueId();
  let input: HTMLInputElement | undefined;
  let root: HTMLDivElement | undefined;

  function store(next: string[]) {
    setRecents(next);
    try { localStorage.setItem(RECENTS_KEY, JSON.stringify(next)); } catch { /* storage is optional */ }
  }

  function remember(value: string) {
    if (!value) return;
    store([value, ...recents().filter(item => item !== value)].slice(0, MAX_RECENTS));
    setCleared(null);
  }

  function dismiss() {
    setOpen(false);
    remember(query());
  }

  onSettled(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(RECENTS_KEY) ?? '[]');
      if (Array.isArray(stored)) {
        setRecents(stored.filter((item): item is string => typeof item === 'string').slice(0, MAX_RECENTS));
      }
    } catch { /* storage is optional */ }

    const onPointer = (event: PointerEvent) => {
      if (open() && !root?.contains(event.target as Node)) dismiss();
    };
    const onShortcut = (event: KeyboardEvent) => {
      if (event.isComposing || !(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'k') return;
      if (!root?.getClientRects().length) return;
      event.preventDefault();
      if (document.activeElement === input && open()) {
        input?.blur();
        dismiss();
      } else {
        input?.focus();
        setOpen(true);
      }
    };

    document.addEventListener('pointerdown', onPointer);
    window.addEventListener('keydown', onShortcut);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('keydown', onShortcut);
    };
  });

  function pick(value: string) {
    props.data.onQueryChange(value);
    setOpen(true);
    input?.focus();
  }

  return (
    <div
      class="resource-search psearch"
      ref={root}
      onFocusIn={() => setOpen(true)}
      onFocusOut={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) dismiss();
      }}
      onKeyDown={event => {
        if (event.target === input || event.key !== 'Escape' || event.isComposing) return;
        event.preventDefault();
        input?.focus();
        setOpen(false);
      }}
    >
      <div class={`psearch__card${open() ? ' psearch__card--open' : ''}`}>
        <div class="psearch__bar">
          <span class="psearch__glass" aria-hidden="true" onPointerDown={() => input?.focus()}><SearchIcon /></span>
          <label for={id} class="resource-search-label">{props.data.label}</label>
          <Input
            id={id}
            ref={element => { input = element; }}
            class="psearch__input"
            type="search"
            value={props.data.query}
            placeholder={open() ? props.data.placeholder : zh() ? '搜索' : 'Search'}
            aria-expanded={open() ? 'true' : 'false'}
            aria-controls={open() ? `${id}-panel` : undefined}
            onClick={() => setOpen(true)}
            onValueChange={value => {
              props.data.onQueryChange(value);
              setOpen(true);
            }}
            onKeyDown={event => handleSearchKeyDown(event, {
              input,
              query: props.data.query,
              results: props.data.results,
              expanded: open() && Boolean(query()) && hasResults(),
              setOpen,
              focusInput: () => input?.focus(),
              focusFirstResult: () => root?.querySelector<HTMLAnchorElement>('.psearch__row-link')?.focus(),
            })}
          />
          <Show when={open()} fallback={<kbd class="psearch__kbd">{mac() ? '⌘K' : 'Ctrl K'}</kbd>}>
            <Button
              class="psearch__close"
              aria-label={query()
                ? (zh() ? '清空搜索' : 'Clear search')
                : (zh() ? '关闭搜索' : 'Close search')}
              onClick={() => {
                if (query()) pick('');
                else {
                  input?.focus();
                  setOpen(false);
                }
              }}
            >
              <XIcon />
            </Button>
          </Show>
        </div>

        <Show when={open()}>
          <div id={`${id}-panel`} class="psearch__body">
            <div class="psearch__panel">
              <div class="psearch__head">
                <span class="psearch__head-label">
                  {query()
                    ? zh() ? '搜索结果' : 'Search results'
                    : zh() ? '最近搜索' : 'Recent'}
                </span>
                <Show when={!query()}>
                  <Show when={recents().length} fallback={
                    <Show when={cleared()}>
                      <Button class="psearch__action" onClick={() => {
                        const previous = cleared();
                        if (previous) store(previous);
                        setCleared(null);
                        input?.focus();
                      }}>{zh() ? '恢复' : 'Restore'}</Button>
                    </Show>
                  }>
                    <Button class="psearch__action" onClick={() => {
                      setCleared(recents());
                      store([]);
                      input?.focus();
                    }}>{zh() ? '清空' : 'Clear all'}</Button>
                  </Show>
                </Show>
              </div>
              <ul class="psearch__list">
                <Show when={query()} fallback={
                  <For each={recents()} fallback={
                    <li class="psearch__empty"><div>{zh() ? '还没有搜索记录，试试下面的关键词。' : 'No recent searches yet. Try a suggestion below.'}</div></li>
                  }>
                    {item => (
                      <li class="psearch__row">
                        <div class="psearch__row-body">
                          <Button class="psearch__row-main" onClick={() => pick(item)}>
                            <span class="psearch__tile psearch__tile--recent" aria-hidden="true">
                              <span class="psearch__tile-art"><ClockIcon size={26} /></span>
                            </span>
                            <span class="psearch__row-text">
                              <span class="psearch__row-title">{item}</span>
                              <span class="psearch__row-sub">{zh() ? '再次搜索' : 'Search again'}</span>
                            </span>
                          </Button>
                          <Button
                            class="psearch__remove"
                            aria-label={(zh() ? '删除 ' : 'Remove ') + item}
                            onClick={() => {
                              store(recents().filter(value => value !== item));
                              input?.focus();
                            }}
                          ><TrashIcon /></Button>
                        </div>
                      </li>
                    )}
                  </For>
                }>
                  <Show when={hasResults()} fallback={
                    <li class="psearch__empty"><div>
                      {zh() ? `下方结果已按 “${query()}” 筛选。` : `The grid below is filtered by “${query()}”.`}
                    </div></li>
                  }>
                    <For each={results()} keyed={false} fallback={
                      <li class="psearch__empty"><div>
                        {zh() ? `没有匹配 “${query()}” 的结果。` : `No results for “${query()}”.`}
                      </div></li>
                    }>
                      {(result, index) => (
                        <li class="psearch__row">
                          <a class="psearch__row-body psearch__row-link" href={result().href} onClick={() => remember(query())}>
                            <Tile index={index} />
                            <span class="psearch__row-text">
                              <span class="psearch__row-title">{result().label}</span>
                              <span class="psearch__row-sub">{resultMeta(result().href)}</span>
                            </span>
                          </a>
                        </li>
                      )}
                    </For>
                  </Show>
                </Show>
              </ul>
            </div>

            <div class="psearch__chips">
              <For each={suggestions()}>
                {suggestion => <Button class="psearch__chip" onClick={() => pick(suggestion)}>{suggestion}</Button>}
              </For>
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
}

export function mountResourceSearch(element: HTMLElement, initial: SearchProps) {
  return mountSolidControl(element, initial, props => <ResourceSearchCard data={props()} />);
}
