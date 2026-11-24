// Capture the real system renderer and original documentation in one cover format.
// SITE_URL=http://127.0.0.1:4443 node scripts/capture-system-covers.mjs
import { chromium } from 'playwright-core';
import { execFileSync } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const base = process.env.SITE_URL || 'http://127.0.0.1:4443';
const index = JSON.parse(await readFile('public/resources/v1/index.json', 'utf8'));
const output = 'public/resource-covers/systems';
const scratch = await mkdtemp(join(tmpdir(), 'happyhands-system-covers-'));
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const options = { viewport: { width: 1120, height: 700 }, reducedMotion: 'reduce' };
const styles = `
  html, body { margin: 0!important; width: 1120px!important; height: 700px!important; overflow:hidden!important; }
  body > :not(#system-cover) { display:none!important; }
  #system-cover, #system-cover * { box-sizing:border-box; }
  #system-cover { position:fixed; inset:0; display:grid; grid-template-columns: 360px minmax(0,1fr); gap:38px;
    place-items:center stretch; padding:64px; color:var(--cover-ink); background: var(--cover-page);
    font-family:var(--cover-font); overflow:hidden; }
  .cover-foundation { min-width:0; display:grid; align-content:center; gap:28px; position:relative; }
  .cover-heading { margin:0; font: 500 45px/1.08 var(--cover-font); letter-spacing:-.05em; }
  .cover-type { font-size:164px; line-height:.95; letter-spacing:-.086em; font-weight:500; }
  .cover-swatches { display:flex; height:50px; max-width:310px; }
  .cover-swatch { flex:1; border:.5px solid rgba(127,127,127,.16); }
  .cover-swatch:first-child { border-radius:8px 0 0 8px; } .cover-swatch:last-child { border-radius:0 8px 8px 0; }
  .cover-window { position:relative; isolation:isolate; padding:18px; min-width:0; border:1px solid var(--cover-line);
    border-radius:22px; background:var(--cover-surface); box-shadow:0 22px 65px rgba(16,16,16,.12); overflow:hidden; }
  .cover-sample { display:flex; align-items:center; justify-content:center; height:440px; width:100%; overflow:hidden; }
  .cover-sample > :not(.cover-token-grid) { flex:none; }
  .cover-ui { width:max-content; max-width:none; display:grid; place-items:center; }
  .cover-ui > * { width: var(--cover-source-width, 500px); max-width:none!important; }
  .cover-token-grid { align-self:stretch; display:grid; width:100%; grid-template-columns:repeat(2,minmax(0,1fr)); grid-auto-rows:1fr; gap:8px; }
  .cover-token { display:grid; align-content:space-between; min-width:0; min-height:88px; padding:12px; border:1px solid var(--cover-line);
    border-radius:10px; background:var(--cover-page); color:var(--cover-ink); font: 13px/1.4 ui-monospace,monospace; }
  .cover-token > span { display:block; height:48px; border-radius:6px; border:1px solid var(--cover-line); }
  .cover-token > code { overflow-wrap:anywhere; font:inherit; }
  .cover-topic-list { width:100%; display:grid; gap:0; }
  .cover-topic { border-bottom:1px solid var(--cover-line); padding:22px 10px; display:flex; align-items:center; gap:20px; font-size:24px; font-weight:500; }
  .cover-topic span { font:14px ui-monospace,monospace; opacity:.62; }
`;

const renderers = [
  ['quartz', 'Quartz', 'dark', 'DeployHistory'],
  ['lime', 'Lime', 'light', 'SplitDinner'],
  ['glaze', 'Glaze', 'light', 'BookingApproval'],
  ['sodium', 'Sodium', 'light', 'JobRuns'],
  ['meridian-clay', 'Meridian Clay', 'light', 'PaydayRule'],
  ['meridian-glass', 'Meridian Glass', 'light', 'AgentPlan'],
  ['meridian-mono', 'Meridian Mono', 'light', 'WarehouseCapacity'],
  ['meridian-slate', 'Meridian Slate', 'light', 'EnvironmentCard'],
];
const tokenDocs = [
  ['antd-mobile', 'Ant Design Mobile'],
  ['nutui', 'NutUI'],
  ['tdesign-mobile-vue', 'TDesign Mobile'],
  ['vant', 'Vant'],
  ['varlet', 'Varlet'],
  ['material3', 'Material 3', 'collections/platform-systems/material3/DESIGN.md'],
];
const platformDocs = [
  ['apple-hig', 'Apple HIG', 'collections/platform-systems/apple-hig/DESIGN.md'],
  ['mobbin', 'Mobbin', 'collections/mobbin-archive/index.md'],
];
function detail(path) {
  const row = index.resources.find((entry) => entry.path === path);
  if (!row) throw new Error('Missing system documentation: ' + path);
  return base + '/en/components/?provider=systems&resource=' + encodeURIComponent(row.id);
}
async function cover(page, id, name, mode) {
  await page.evaluate(() => document.fonts.ready);
  const { foreground } = await page.evaluate(({ name, mode, styles }) => {
    const create = (tag, className, text) => {
      const node = document.createElement(tag);
      node.className = className;
      if (text) node.textContent = text;
      return node;
    };
    const demo = document.querySelector('.demo-block > :not(p)');
    const colors = mode === 'renderer'
      ? [...document.querySelectorAll('.demo-swatches i')].map((node) => ({
        color: getComputedStyle(node).backgroundColor, name: node.nextElementSibling.textContent,
      }))
      : [...document.querySelectorAll('.token-sample-color')].map((node) => ({
        color: getComputedStyle(node).backgroundColor, name: node.parentElement.textContent.trim().split(/\s+/)[0],
      }));
    const get = (names, fallback) => {
      const css = getComputedStyle(document.body);
      return names.map((token) => css.getPropertyValue(token).trim()).find(Boolean) || fallback;
    };
    const preferred = mode === 'tokens' ? colors.filter(({ name }) => /(primary|brand|theme|accent|success|warning|danger|error)/i.test(name)) : colors;
    const swatches = [...new Map([...preferred, ...colors].map((item) => [item.color, item])).values()].filter(({ color }) =>
      color !== 'transparent' && color !== 'rgba(0, 0, 0, 0)'
    ).slice(0, 8);
    const pageColor = get(['--page', '--surface-page', '--hh-bg'], '#f6f6f6');
    const surface = get(['--surface', '--surface-card', '--paper', '--hh-bg-sunken'], '#fff');
    const foreground = get(['--fg', '--text-1', '--ink', '--hh-ink'], '#191919');
    const line = get(['--line', '--hh-line'], '#d7d7d7');
    const stage = create('div', '');
    stage.id = 'system-cover';
    Object.entries({
      '--cover-page': pageColor, '--cover-surface': surface, '--cover-ink': foreground,
      '--cover-line': line, '--cover-font': mode === 'renderer' ? getComputedStyle(document.querySelector('.demo-root')).fontFamily : 'Inter,system-ui,sans-serif',
    }).forEach(([key, value]) => stage.style.setProperty(key, value));
    const foundation = create('div', 'cover-foundation');
    foundation.append(create('h1', 'cover-heading', name));
    if (mode === 'renderer') foundation.append(create('div', 'cover-type', 'Aa'));
    if (swatches.length) {
      const palette = create('div', 'cover-swatches');
      for (const swatch of swatches) {
        const chip = create('i', 'cover-swatch');
        chip.style.backgroundColor = swatch.color;
        palette.append(chip);
      }
      foundation.append(palette);
    }
    const window = create('div', 'cover-window');
    const sample = create('div', 'cover-sample');
    window.append(sample);
    if (mode === 'renderer') {
      if (!demo || demo.getBoundingClientRect().height < 40) throw new Error('Live system source did not render');
      const ui = create('div', 'cover-ui');
      ui.append(demo.cloneNode(true));
      sample.append(ui);
    } else if (mode === 'tokens') {
      if (swatches.length < 4) throw new Error('Missing source color tokens');
      const grid = create('div', 'cover-token-grid');
      for (const item of swatches.slice(0, 6)) {
        const tile = create('div', 'cover-token');
        const chip = create('span', '');
        chip.style.backgroundColor = item.color;
        tile.append(chip, create('code', '', item.name));
        grid.append(tile);
      }
      sample.append(grid);
    } else {
      const topics = [...document.querySelectorAll('#system-guides a')].map((link) => link.textContent.trim()).filter(Boolean);
      if (topics.length < 3) throw new Error('Missing original topic links');
      const list = create('div', 'cover-topic-list');
      for (const [index, name] of [...new Set(topics)].slice(0, 5).entries()) {
        const topic = create('div', 'cover-topic');
        topic.append(create('span', '', String(index + 1).padStart(2, '0')), document.createTextNode(name));
        list.append(topic);
      }
      sample.append(list);
    }
    stage.append(foundation, window);
    document.body.append(stage);
    const css = document.createElement('style');
    css.textContent = styles;
    document.head.append(css);
    const source = sample.querySelector('.cover-ui');
    if (source) {
      const width = /Sodium|Meridian Mono/.test(name) ? 780 : 520;
      source.style.setProperty('--cover-source-width', width + 'px');
      const fit = Math.min(1, sample.clientWidth / source.scrollWidth, sample.clientHeight / source.scrollHeight);
      source.style.transform = `scale(${fit})`;
    }
    return { foreground };
  }, { name, mode, styles });
  if (!foreground) throw new Error('Missing foreground for ' + id);
  const png = join(scratch, id + '.png');
  await page.locator('#system-cover').screenshot({ path: png, animations: 'disabled' });
  execFileSync('cwebp', ['-quiet', '-q', '85', png, '-o', join(output, id + '.webp')]);
  console.log('Captured ' + id);
}
try {
  for (const [id, name, theme, block] of renderers) {
    const page = await browser.newPage(options);
    await page.goto(base + '/systems/preview/?' + new URLSearchParams({ system: id, theme, lang: 'en', example: block }));
    const selected = await page.getByRole('combobox', { name: 'Page example' }).inputValue();
    if (selected !== block) throw new Error('Unexpected selected block for ' + id);
    await page.locator('.demo-block > :not(p)').first().waitFor();
    await cover(page, id, name, 'renderer');
    await page.close();
  }
  for (const [id, name, path] of tokenDocs) {
    const page = await browser.newPage(options);
    await page.goto(detail(path || 'collections/app-tokens/' + id + '/tokens.json'));
    await page.locator('.token-sample-color').first().waitFor();
    await cover(page, id, name, 'tokens');
    await page.close();
  }
  for (const [id, name, path] of platformDocs) {
    const page = await browser.newPage(options);
    await page.goto(detail(path));
    await page.locator('#system-guides a').first().waitFor();
    await cover(page, id, name, 'platform');
    await page.close();
  }
} finally {
  await browser.close();
  await rm(scratch, { recursive: true, force: true });
}
