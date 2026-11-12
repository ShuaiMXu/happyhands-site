import {agentPresets} from '../../apps/portal/agent-presets.js';
import React, {useEffect, useRef, useState} from 'react';
import {HistorySafeFrame} from './HistorySafeFrame';
import {autoSizeFrame} from './frame-sizing';
import {resourceTools} from './resource-navigation';

type Props = {active: string; lang: string; tabPrefix?: string};
const resume = (frame: HTMLIFrameElement | null) =>
  frame?.contentWindow?.postMessage({type: 'hh:tool-active'}, location.origin);
const syncLanguage = (frame: HTMLIFrameElement | null, lang: string) =>
  frame?.contentWindow?.postMessage({type: 'hh:tool-language', lang}, location.origin);

function ToolPanel({tool, active, lang, tabPrefix}: Props & {tool: typeof resourceTools[number]}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const visible = active === tool.id;
  const [visited, setVisited] = useState(visible);
  // Later language changes must not reload the frame and discard its draft.
  const initialLanguage = useRef<string | null>(null);
  const initialAgent = useRef(typeof location==='undefined'?null:new URLSearchParams(location.search).get('agent'));
  if (visited && initialLanguage.current === null) initialLanguage.current = lang;
  useEffect(() => { if (visible) setVisited(true); }, [visible]);
  useEffect(() => {
    if (visited && frame.current) return autoSizeFrame(frame.current);
  }, [visited]);
  useEffect(() => { if (visible) resume(frame.current); }, [visible, visited]);
  useEffect(() => { if (visited) syncLanguage(frame.current, lang); }, [lang, visited]);
  useEffect(() => {
    if (tool.id !== 'setup') return;
    const receive = (event: MessageEvent) => {
      if (event.origin !== location.origin || event.source !== frame.current?.contentWindow ||
          event.data?.type !== 'hh:setup-agent' || !agentPresets.some(agent => agent.id === event.data.agent)) return;
      const url = new URL(location.href);
      url.searchParams.set('agent', event.data.agent);
      history.replaceState(history.state, '', url.pathname + url.search + url.hash);
    };
    window.addEventListener('message', receive);
    return () => window.removeEventListener('message', receive);
  }, [tool.id]);
  const title = lang === 'zh' ? tool.zh : tool.en;
  // The host URL tracks selection for reload; the live frame keeps its draft.
  const agent=initialAgent.current;
  const source=`${tool.href}?embedded=1&lang=${encodeURIComponent(initialLanguage.current || lang)}${tool.id==='setup'&&agent?'&agent='+encodeURIComponent(agent):''}`;
  return <section hidden={!visible} className="resource-tool-panel" aria-label={title}
    role={tabPrefix ? 'tabpanel' : undefined}
    id={tabPrefix ? `${tabPrefix}-panel-${tool.id}` : undefined}
    aria-labelledby={tabPrefix ? `${tabPrefix}-tab-${tool.id}` : undefined}>
    {visited && <HistorySafeFrame ref={frame} title={title} src={source}
      onLoad={() => { syncLanguage(frame.current, lang); if (visible) resume(frame.current); }} />}
  </section>;
}

/** Both resource entry points retain visited tools until their host unmounts. */
export function ResourceToolPanels(props: Props) {
  return <>{resourceTools.map(tool => <ToolPanel key={tool.id} tool={tool} {...props} />)}</>;
}
