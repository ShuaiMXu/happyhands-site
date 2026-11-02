import React, {useEffect, useRef, useState} from 'react';
import {HistorySafeFrame} from './HistorySafeFrame';
import {autoSizeFrame} from './frame-sizing';
import {resourceTools} from './resource-navigation';

type Props = {active: string; lang: string; tabPrefix?: string};
const resume = (frame: HTMLIFrameElement | null) =>
  frame?.contentWindow?.postMessage({type: 'hh:tool-active'}, location.origin);

function ToolPanel({tool, active, lang, tabPrefix}: Props & {tool: typeof resourceTools[number]}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const visible = active === tool.id;
  const [visited, setVisited] = useState(visible);
  useEffect(() => { if (visible) setVisited(true); }, [visible]);
  useEffect(() => {
    if (visited && frame.current) return autoSizeFrame(frame.current);
  }, [visited]);
  useEffect(() => { if (visible) resume(frame.current); }, [visible, visited]);
  const title = lang === 'zh' ? tool.zh : tool.en;
  return <section hidden={!visible} className="resource-tool-panel" aria-label={title}
    role={tabPrefix ? 'tabpanel' : undefined}
    id={tabPrefix ? `${tabPrefix}-panel-${tool.id}` : undefined}
    aria-labelledby={tabPrefix ? `${tabPrefix}-tab-${tool.id}` : undefined}>
    {visited && <HistorySafeFrame ref={frame} title={title} src={`${tool.href}?embedded=1`}
      onLoad={() => { if (visible) resume(frame.current); }} />}
  </section>;
}

/** Both resource entry points retain visited tools until their host unmounts. */
export function ResourceToolPanels(props: Props) {
  return <>{resourceTools.map(tool => <ToolPanel key={tool.id} tool={tool} {...props} />)}</>;
}
