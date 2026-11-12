// Browser verification inputs are a declared scope, not inferred from frame names.
const ID = /^[a-z0-9][a-z0-9_-]{0,63}$/;
const homePath = path => ['/', '/apps/portal', '/en/apps/portal'].includes(path.replace(/\/+$/, '') || '/');
export const heroFrameNames = count => Array.from({length: count * 2 + 4}, (_, index) => `frame-${String(index + 1).padStart(2, '0')}.png`);
export function normalizeHeroContexts(value, base) {
  const origin = new URL(base).origin;
  const entries = Array.isArray(value) ? value : value?.states || value?.contexts;
  if (!Array.isArray(entries) || !entries.length || entries.length > 4) throw Error('Declare 1–4 captured Hero state/configuration contexts; two motion frames and four fallback originals fit the twelve-image limit.');
  const seen = new Set();
  return entries.map(entry => {
    if (!ID.test(entry.stateId || '') || !ID.test(entry.configurationId || '')) throw Error('Hero contexts require actual captured state and configuration IDs.');
    const key = `${entry.stateId}--${entry.configurationId}`;
    if (seen.has(key)) throw Error('Hero contexts must identify unique captured state/configuration pairs.');
    seen.add(key);
    const width = entry.width ?? entry.viewport?.width, height = entry.height ?? entry.viewport?.height;
    if (![width, height].every(n => Number.isInteger(n) && n >= 240 && n <= 7680)) throw Error('Hero contexts require the captured integer viewport dimensions.');
    const url = new URL(entry.finalUrl || entry.start?.url || entry.url || base);
    if (!['http:', 'https:'].includes(url.protocol) || url.origin !== origin || !homePath(url.pathname)) throw Error('Hero verification must use the bound preview origin and a homepage route.');
    const theme = entry.theme || entry.appearance?.theme || entry.dom?.appearance?.theme;
    if (!['light', 'dark'].includes(theme)) throw Error('Hero contexts require the captured light/dark appearance; do not guess it from an ID.');
    const lang = entry.lang || (url.pathname.startsWith('/en/') ? 'en' : 'zh');
    if (!['zh', 'en'].includes(lang)) throw Error('Hero language must be Chinese or English.');
    return {stateId: entry.stateId, configurationId: entry.configurationId, width, height, url: url.href, theme, lang};
  });
}
