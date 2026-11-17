/// <reference types="vite/client" />
import React, { Component, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import catalog from './generated/catalog.json';
import './preview.css';
const params = new URLSearchParams(location.search);
const name = params.get('component') || 'theme-switch';
const modules = import.meta.glob('./generated/*.tsx');
const item = (catalog as Record<string, { entry: string }>)[name];
class PreviewBoundary extends Component<React.PropsWithChildren, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <p role="alert">Preview unavailable</p> : this.props.children; }
}
function App() {
  const [theme, setTheme] = useState(params.get('theme') === 'dark' ? 'dark' : 'light');
  const [View, setView] = useState<React.ComponentType<any> | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const load = item && modules['./generated/' + item.entry];
    if (!load) { setFailed(true); return; }
    let active = true;
    load().then((mod: any) => { if(active) setView(() => mod.default); })
      .catch(() => { if(active) setFailed(true); });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (parent !== window) parent.postMessage({ type: 'design-system-preview-height', height: document.documentElement.scrollHeight }, location.origin);
    });
    observer.observe(document.getElementById('root')!);
    return () => observer.disconnect();
  }, []);
  return <main data-theme={theme}><PreviewBoundary>{failed ? <p role="alert">Preview unavailable</p> : View ? <View theme={theme} onThemeChange={setTheme} sound={false} /> : <p role="status">Loading preview…</p>}</PreviewBoundary></main>;
}
createRoot(document.getElementById('root')!).render(<App />);
