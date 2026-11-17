import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { handleSearchKeyDown, type SearchResult } from './resource-search-keydown';
import './search-card.css';
export type { SearchResult };

/**
 * PinUI Search Card (https://www.pinui.xyz/r/search-card.json) adapted to the
 * live catalogue. Registry copy: public/components/pin-ui/search-card.json.
 *
 * Rest: a 300px pill with a ⌘K hint. Focus: it unfolds into a card with a panel
 * and suggestion chips. The panel lists recent queries while the field is empty
 * and live catalogue matches once the visitor types; results stay real links,
 * so Enter and click both navigate.
 */

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
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m21 21-4.34-4.34" />
    <circle cx="11" cy="11" r="8" />
  </svg>
);
const XIcon = ({ size = 15, stroke = 2.2 }: { size?: number; stroke?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);
const ClockIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l2.5 2.5" />
  </svg>
);
const TrashIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
    <span className="psearch__tile" aria-hidden="true">
      <span
        className="psearch__tile-art"
        style={{ background: TILE_GRADIENTS[index % TILE_GRADIENTS.length], boxShadow: `inset 0 1px 1px rgba(255,255,255,.6), 0 6px 14px -6px ${GLOWS[index % GLOWS.length]}` }}
      >
        <span className="psearch__tile-glyph">{String.fromCharCode(65 + (index % 26))}</span>
      </span>
    </span>
  );
}

export function ResourceSearchCard({
  label,
  placeholder,
  query,
  onQueryChange,
  results,
  status,
  suggestions: providedSuggestions,
}: {
  label: string;
  placeholder: string;
  query: string;
  onQueryChange: (value: string) => void;
  results?: SearchResult[];
  status: string;
  suggestions?: string[];
}) {
  const zh = /[\u3400-\u9fff]/.test(label);
  const [open, setOpen] = useState(false);
  const [recents, setRecents] = useState<string[]>([]);
  const [cleared, setCleared] = useState<string[] | null>(null);
  const [mac, setMac] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const id = useId();
  const reduced = useReducedMotion();

  const suggestions =
    providedSuggestions && providedSuggestions.length > 0
      ? providedSuggestions
      : zh
        ? ['落地页', '表单', '定价页', '设计系统']
        : ['Landing page', 'Forms', 'Pricing', 'Design systems'];

  const q = query.trim();
  const filtering = !!q;
  const hasLiveResults = results !== undefined;
  const expanded = open && filtering && hasLiveResults;
  const visibleResults = (results ?? []).slice(0, MAX_RESULTS);

  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    try {
      const stored = JSON.parse(window.localStorage.getItem(RECENTS_KEY) || '[]');
      if (Array.isArray(stored)) setRecents(stored.filter((item): item is string => typeof item === 'string').slice(0, MAX_RECENTS));
    } catch {
      /* storage can be unavailable in private modes; the card still works */
    }
  }, []);

  const store = (next: string[]) => {
    setRecents(next);
    try {
      window.localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
    } catch {
      /* ignore quota/privacy failures */
    }
  };
  const remember = (value: string) => {
    const text = value.trim();
    if (!text) return;
    store([text, ...recents.filter(item => item !== text)].slice(0, MAX_RECENTS));
    setCleared(null);
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (event: PointerEvent) => {
      if (root.current?.contains(event.target as Node)) return;
      setOpen(false);
      if (q) remember(q);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  });

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'k') return;
      event.preventDefault();
      if (document.activeElement === input.current) {
        input.current?.blur();
        setOpen(false);
      } else {
        input.current?.focus();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const pick = (value: string) => {
    onQueryChange(value);
    setOpen(true);
    input.current?.focus();
  };

  return (
    <div
      className="resource-search psearch"
      ref={root}
      onFocus={() => setOpen(true)}
      onKeyDown={event => {
        if (event.key !== 'Escape' || event.target === input.current) return;
        event.preventDefault();
        setOpen(false);
      }}
      onBlur={event => {
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
        setOpen(false);
        if (q) remember(q);
      }}
    >
      <motion.div
        className={`psearch__card${open ? ' psearch__card--open' : ''}`}
        layout
        transition={{ duration: reduced ? 0 : 0.3, ease: [0.45, 0, 0.15, 1] }}
        onClick={() => { if (!open) input.current?.focus(); }}
      >
        <div className="psearch__bar">
          <span className="psearch__glass"><SearchIcon /></span>
          <label htmlFor={id} className="resource-search-label">{label}</label>
          <input
            id={id}
            ref={input}
            className="psearch__input"
            type="search"
            value={query}
            placeholder={open ? placeholder : zh ? '搜索' : 'Search'}
            aria-expanded={open}
            aria-controls={open ? `${id}-panel` : undefined}
            onFocus={() => setOpen(true)}
            onClick={() => setOpen(true)}
            onChange={event => { onQueryChange(event.target.value); setOpen(true); }}
            onKeyDown={event => handleSearchKeyDown(event, {
              input: input.current,
              query,
              results,
              expanded,
              setOpen,
              focusInput: () => input.current?.focus(),
              focusFirstResult: () => root.current?.querySelector<HTMLAnchorElement>('.psearch__row-link')?.focus(),
            })}
          />
          <AnimatePresence mode="popLayout" initial={false}>
            {open ? (
              <motion.button
                key="close"
                type="button"
                className="psearch__close"
                aria-label={q ? (zh ? '清空搜索' : 'Clear search') : (zh ? '关闭搜索' : 'Close search')}
                initial={{ opacity: 0, scale: 0.7, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.7, rotate: -45 }}
                transition={{ duration: reduced ? 0 : 0.24 }}
                onClick={event => {
                  event.stopPropagation();
                  if (q) {
                    onQueryChange('');
                    input.current?.focus();
                  } else {
                    setOpen(false);
                    input.current?.blur();
                  }
                }}
              >
                <XIcon />
              </motion.button>
            ) : (
              <motion.kbd
                key="kbd"
                className="psearch__kbd"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: reduced ? 0 : 0.18 }}
              >
                {mac ? '⌘K' : 'Ctrl K'}
              </motion.kbd>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              id={`${id}-panel`}
              className="psearch__body"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto', transition: { duration: reduced ? 0 : 0.26, ease: [0.23, 1, 0.32, 1] } }}
              exit={{ opacity: 0, height: 0, transition: { duration: reduced ? 0 : 0.14 } }}
            >
              <div className="psearch__panel">
                <div className="psearch__head">
                  <span className="psearch__head-label">{filtering ? (hasLiveResults ? status : zh ? '筛选结果' : 'Filtering') : zh ? '最近搜索' : 'Recent'}</span>
                  {filtering ? (
                    q ? (
                      <button type="button" className="psearch__action" onClick={() => { onQueryChange(''); input.current?.focus(); }}>
                        {zh ? '清除' : 'Clear'}
                      </button>
                    ) : null
                  ) : recents.length ? (
                    <button type="button" className="psearch__action" onClick={() => { setCleared(recents); store([]); }}>
                      {zh ? '清空' : 'Clear all'}
                    </button>
                  ) : cleared ? (
                    <button type="button" className="psearch__action" onClick={() => { store(cleared); setCleared(null); }}>
                      {zh ? '恢复' : 'Restore'}
                    </button>
                  ) : null}
                </div>

                <ul className="psearch__list">
                  {filtering && hasLiveResults
                    ? visibleResults.map((result, index) => (
                        <li key={result.id} className="psearch__row">
                          <a
                            className="psearch__row-body psearch__row-link"
                            href={result.href}
                            onClick={() => remember(q)}
                          >
                            <Tile index={index} />
                            <span className="psearch__row-text">
                              <span className="psearch__row-title">{result.label}</span>
                              <span className="psearch__row-sub">{resultMeta(result.href)}</span>
                            </span>
                          </a>
                        </li>
                      ))
                    : recents.map((item, index) => (
                        <li key={item} className="psearch__row">
                          <div className="psearch__row-body">
                            <button type="button" className="psearch__row-main" onClick={() => pick(item)}>
                              <span className="psearch__tile psearch__tile--recent" aria-hidden="true">
                                <span className="psearch__tile-art">
                                  <ClockIcon size={26} />
                                </span>
                              </span>
                              <span className="psearch__row-text">
                                <span className="psearch__row-title">{item}</span>
                                <span className="psearch__row-sub">{zh ? '再次搜索' : 'Search again'}</span>
                              </span>
                            </button>
                            <button
                              type="button"
                              className="psearch__remove"
                              aria-label={(zh ? '删除 ' : 'Remove ') + item}
                              onClick={() => store(recents.filter(value => value !== item))}
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </li>
                      ))}

                  {!filtering && !recents.length && (
                    <li className="psearch__empty">
                      <div>{zh ? '还没有搜索记录，试试下面的关键词。' : 'No recent searches yet. Try a suggestion below.'}</div>
                    </li>
                  )}
                  {filtering && hasLiveResults && !visibleResults.length && (
                    <li className="psearch__empty">
                      <div>{zh ? `没有匹配 “${q}” 的结果。` : `No results for “${q}”.`}</div>
                    </li>
                  )}
                  {filtering && !hasLiveResults && (
                    <li className="psearch__empty">
                      <div>{zh ? `下方结果已按 “${q}” 筛选。` : `The grid below is filtered by “${q}”.`}</div>
                    </li>
                  )}
                </ul>
              </div>

              <div className="psearch__chips">
                {suggestions.map(suggestion => (
                  <button key={suggestion} type="button" className="psearch__chip" onClick={() => pick(suggestion)}>
                    {suggestion}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
