import { applySiteMetadata } from "../../packages/ui/site-seo";
import {setupSiteMenu} from '../../packages/ui/site-menu.ts';
import '../../packages/ui/site-layout.css';
import '../../packages/ui/icons.css';
import {iconMarkup} from '../../packages/ui/icons.ts';
import {readLanguage, readTheme, savePreference} from '../../packages/ui/site-preferences.ts';
import * as zh from './content.zh.js';
import {siteNavigation} from '../../packages/ui/site-navigation.ts';
import '../../packages/ui/site-shell.css';
import { setupConnect } from './connect.js';
import * as en from './content.en.js';
import { repositories, heroScreens } from './content.js';
import { startWhirl } from './whirl.js';
import { portalContent } from './render-content.js';
import './resource-covers.css';
import { setupHomepageMotion } from './homepage-motion.js';
import './homepage-motion.css';
import "../../packages/ui/owned-ui.css";
let disposeHomepageMotion;

let lang = readLanguage();
const t = () => lang === 'zh' ? zh : en;
document.querySelector('.site-header').classList.add('hh-site-header');
document.querySelector('.header-cta')?.remove();

const systemTheme = matchMedia('(prefers-color-scheme: dark)');

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#111111' : '#f7f6f3';
  const button = document.getElementById('theme-toggle');
  if (button) {
    button.innerHTML = iconMarkup(theme === 'dark' ? 'sun' : 'moon') + '<span class="hh-tool-label">' + (lang === 'zh' ? (theme === 'dark' ? '浅色' : '深色') : (theme === 'dark' ? 'Light' : 'Dark')) + '</span>';
    button.setAttribute('aria-label', lang === 'zh' ? `切换到${theme === 'dark' ? '浅色' : '深色'}模式` : `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }
}
const themeButton = document.createElement('button');
themeButton.id = 'theme-toggle';
themeButton.type = 'button';
document.querySelector('.header-actions').prepend(themeButton);
themeButton.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  savePreference('hh-theme', next);
  applyTheme(next);
});
systemTheme.addEventListener('change', () => applyTheme(readTheme()));
window.addEventListener('storage', event => {
  if (event.key === 'hh-theme' || event.key === null) applyTheme(readTheme());
  if (event.key === 'pd-lang' || event.key === null) {lang = readLanguage(); renderContent();}
});
applyTheme(readTheme());

// -- language switcher --
function renderLangSwitch() {
  const existing = document.getElementById('lang-switch');
  if (existing) return;
  const actions = document.querySelector('.header-actions');
  if (!actions) return;
  const switcher = document.createElement('div');
  switcher.id = 'lang-switch';
  switcher.setAttribute('role', 'group');
  switcher.setAttribute('aria-label', 'Language / 语言');
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.addEventListener('click', () => setLang(lang === 'zh' ? 'en' : 'zh'));
  switcher.appendChild(btn);
  actions.appendChild(switcher);
}

function setLang(code) {
  lang = code;
  savePreference('pd-lang', code);
  renderContent();
}

function updateNavigation() {
  document.querySelectorAll('.desktop-nav a').forEach(link => {
    if (location.hash && new URL(link.href).pathname === location.pathname && new URL(link.href).hash === location.hash) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}
function routeLegacyResources(){if(location.hash==='#explore')location.replace('/components/?provider=systems');}
routeLegacyResources();
window.addEventListener('hashchange',()=>{routeLegacyResources();updateNavigation();});

// -- render all sections from the active language pack --
function renderContent() {
  const c = t();
  document.querySelector('.skip-link').textContent=lang==='zh'?'跳到主要内容':'Skip to content';
  document.querySelector('.desktop-nav').setAttribute('aria-label',lang==='zh'?'主要导航':'Main navigation');
  document.querySelector('.wordmark').setAttribute('aria-label','HappyHands');
  document.querySelector('.desktop-nav').innerHTML=siteNavigation.map(item=>`<a href="${item.href}">${lang==='zh'?item.zh:item.en}</a>`).join('');
  updateNavigation();
  applyTheme(document.documentElement.dataset.theme);

  document.querySelector('#lang-switch button').innerHTML = iconMarkup('globe') + '<span class="hh-tool-label">' + (lang === 'zh' ? 'English' : '中文') + '</span>';
  document.querySelector('#lang-switch button').setAttribute('aria-label',lang === 'zh' ? 'English' : '中文');
  disposeMenu?.();
  disposeMenu = setupSiteMenu(document.querySelector('.site-header'), lang);
  // hero
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  applySiteMetadata('portal',lang);
  const eyebrow = document.querySelector('.eyebrow');
  if (eyebrow) eyebrow.innerHTML = c.hero.eyebrow.map(s => `<span>${s}</span>`).join('');
  const h1 = document.querySelector('h1');
  if (h1) h1.innerHTML = lang === 'zh'
    ? `${c.hero.h1}<span>${c.hero.h1Accent}</span>${c.hero.h1Suffix}`
    : `${c.hero.h1}<span>${c.hero.h1Accent}</span>${c.hero.h1Suffix}`;
  const heroCopy = document.querySelector('.hero-copy');
  if (heroCopy) heroCopy.textContent = c.hero.copy;
  const primary = document.querySelector('.button-primary');
  if (primary) { primary.textContent = c.hero.cta; primary.href = '#apps'; }
  const secondary = document.querySelector('.button-secondary');
  if (secondary) secondary.innerHTML = `${c.hero.ctaSecondary} ${iconMarkup('external')}`;
  const scrollNote = document.querySelector('.scroll-note');
  if (scrollNote) scrollNote.innerHTML = `${c.ui.scrollNote} ${iconMarkup('down')}`;

  // sections
  const content = document.querySelector('#portal-content');
  if (content) {
    content.innerHTML = portalContent(lang);
  }

  // footer
  const footer = document.querySelector('footer');
  if (footer) {
    footer.innerHTML = `<span>${c.ui.footer.left}</span><span>${c.ui.footer.middle}</span><a href="${repositories.core}">${c.ui.footer.right} ${iconMarkup('external')}</a>`;
  }

  setupConnect(lang);
  disposeHomepageMotion?.();
  disposeHomepageMotion = setupHomepageMotion(lang);
}

// -- hero scroll (exact appllama motion model, smooth per-frame interpolation) --
// Their formula: scrollYProgress from useScroll, then:
//   opacity = map(p, [0,.35], [1,0]);  scale = map(p, [0,.35], [1,.88]);
//   bgOpacity = map(p, [.4,.85], [1,0]);
// We replicate with a rAF loop that lerps toward the scroll target each frame.
const heroStage = document.querySelector('.hero-scroll-stage');
const heroCenter = document.querySelector('.hero-center');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
let _raf = null;

function _map(v, [a, b], [c, d]) {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return c + t * (d - c);
}
function _progress() {
  if (!heroStage) return 0;
  const r = heroStage.getBoundingClientRect();
  // Progress denominator = full stage height (matches appllama's useScroll
  // with offset ["start start", "end start"] on the parent container).
  // Live-verified: scrollY=50 → p=50/1136=0.044; text gone at scrollY≈400.
  return r.height <= 0 ? 0 : Math.min(1, Math.max(0, -r.top / r.height));
}
// Direct scroll-linked animation: opacity/scale track scroll position exactly.
// rAF batches the style write for performance but adds zero smoothing —
// scroll down = text fades proportionally, scroll back up = text returns.
function _apply() {
  _raf = null;
  if (reduceMotion.matches) {
    heroCenter?.style.removeProperty("opacity");
    heroCenter?.style.removeProperty("transform");
    const whirl = document.querySelector(".hero-whirl-host");
    whirl?.style.removeProperty("opacity");
    whirl?.style.removeProperty("transform");
    return;
  }
  const p = _progress();
  // 1. Text fades + shrinks over [0, 0.35]
  if (heroCenter) {
    heroCenter.style.opacity = _map(p, [0, .35], [1, 0]).toFixed(4);
    heroCenter.style.transform = `scale(${_map(p, [0, .35], [1, .88]).toFixed(4)})`;
  }
  // 2. Whirl expands (zooms past you) + 3. fades out over [0.4, 0.85].
  // Their CSS: scale(1 + p * 0.75) on the whirl, plus the outer fade.
  // The expansion makes the spiral feel like it's rushing outward as you scroll.
  const whirl = document.querySelector('.hero-whirl-host');
  if (whirl) {
    const scale = 1 + p * 0.75;
    const fade = _map(p, [.4, .85], [1, 0]);
    whirl.style.opacity = fade.toFixed(4);
    whirl.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(4)})`;
  }
}
function _onScroll() {
  if (reduceMotion.matches) return;
  if (!_raf) _raf = requestAnimationFrame(_apply);
}
addEventListener('scroll', _onScroll, { passive: true });
reduceMotion.addEventListener('change', _apply);
_apply();

// -- appllama hero whirl (exact motion model, real screenshots) --
const whirlHost = document.querySelector('.hero-whirl-host') || (() => {
  // create the host if not in HTML
  const hero = document.querySelector('.hero');
  if (!hero) return null;
  const host = document.createElement('div');
  host.className = 'hero-whirl-host';
  const mask = document.createElement('div');
  mask.className = 'hero-whirl-mask';
  mask.setAttribute('aria-hidden', 'true');
  mask.appendChild(host);
  hero.insertBefore(mask, hero.firstChild);
  return host;
})();
if (whirlHost && heroScreens?.length) {
  startWhirl(whirlHost, heroScreens);
  _apply();
}

// -- copy to clipboard --
let toastTimer;
document.addEventListener('click', async e => {
  const btn = e.target.closest('[data-copy]');
  if (!btn) return;
  try {
    await navigator.clipboard.writeText(btn.dataset.copy);
    const toast = document.querySelector('#toast');
    if (toast) { toast.textContent = lang === 'zh' ? '已复制' : 'Copied'; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 1800); }
  } catch { const toast = document.querySelector('#toast'); if (toast) { toast.textContent = lang === 'zh' ? '无法复制，请手动选择上方命令。' : 'Copy unavailable. Select the command above manually.'; toast.classList.add('show'); } }
});

// -- boot --
let disposeMenu;
renderLangSwitch();
renderContent();
