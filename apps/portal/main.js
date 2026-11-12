import {createFeedback} from './feedback.js';
import "../../packages/ui/resource-image-hover.css";
import { ResourceToolPanels } from '../../packages/ui/ResourceToolPanels';
import { populateGitHubStars } from './github-stars.js';
import { ResourceFeedControls } from "./ResourceFeedControls";
import { applySiteMetadata } from "../../packages/ui/site-seo";
import {setupSiteMenu} from '../../packages/ui/site-menu.ts';
import '../../packages/ui/site-layout.css';
import '../../packages/ui/icons.css';
import {iconMarkup} from '../../packages/ui/icons.ts';
import {readTheme, savePreference} from '../../packages/ui/site-preferences.ts';
import {portalLanguage, portalPath} from './language.ts';
import * as zh from './content.zh.js';
import {siteNavigation} from '../../packages/ui/site-navigation.ts';
import '../../packages/ui/site-shell.css';
import './glass-header.css';
import {setupLiquidGlass} from './liquid-glass.js';
import { setupConnect, heroConnectMarkup } from './connect.js';
import './hero-connect.css';
import * as en from './content.en.js';
import { repositories, heroScreens } from './content.js';
import { startWhirl } from './whirl.js';
import { portalContent } from './render-content.js';
import { setupResourceFeed, syncResourceFeedTheme } from './resource-feed.js';
import './resource-feed.css';
let disposeResourceFeed;
import './resource-covers.css';
import { setupHomepageMotion } from './homepage-motion.js';
import './homepage-motion.css';
import "../../packages/ui/owned-ui.css";
let disposeHomepageMotion;

let lang = portalLanguage(location.pathname);
savePreference('pd-lang', lang);
const t = () => lang === 'zh' ? zh : en;
document.querySelector('.site-header').classList.add('hh-site-header','portal-glass-header','hh-glass-header');
document.querySelector('.header-cta')?.remove();

const systemTheme = matchMedia('(prefers-color-scheme: dark)');

function applyTheme(theme) {
  syncResourceFeedTheme(document, theme === 'dark' ? 'dark' : 'light');
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
});
applyTheme(readTheme());

// -- language switcher --
function syncLanguageLink() {
  const link = document.querySelector('#lang-switch a');
  const next = lang === 'zh' ? 'en' : 'zh';
  link.href = portalPath(next) + location.search + location.hash;
  link.hreflang = next === 'en' ? 'en' : 'zh-CN';
  link.lang = next === 'en' ? 'en' : 'zh-CN';
}
function renderLangSwitch() {
  syncLanguageLink();
  const link = document.querySelector('#lang-switch a');
  link.addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    history.pushState(history.state, '', link.href);
    setLang(portalLanguage(location.pathname));
  });
}

function setLang(code) {
  const y = window.scrollY;
  lang = code;
  savePreference('pd-lang', code);
  renderContent();
  syncLanguageLink();
  window.scrollTo({top:y,behavior:'instant'});
  document.querySelector('#lang-switch a')?.focus({preventScroll:true});
}
window.addEventListener('popstate', () => setLang(portalLanguage(location.pathname)));

function updateNavigation() {
  document.querySelectorAll('.desktop-nav a').forEach(link => {
    if (location.hash && new URL(link.href).pathname === location.pathname && new URL(link.href).hash === location.hash) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}
function routeLegacyResources(){if(location.hash==='#connect-agent'){location.replace('/apps/setup/');return;}if(location.hash==='#explore')location.replace('/components/?provider=systems');}
routeLegacyResources();
window.addEventListener('hashchange',()=>{routeLegacyResources();updateNavigation();syncLanguageLink();});

// -- render all sections from the active language pack --
function renderContent() {
  const c = t();
  document.querySelector('.skip-link').textContent=lang==='zh'?'跳到主要内容':'Skip to content';
  document.querySelector('.desktop-nav').setAttribute('aria-label',lang==='zh'?'主要导航':'Main navigation');
  document.querySelector('.wordmark').setAttribute('aria-label',lang==='zh'?'HappyHands 首页':'HappyHands home');
  document.querySelector('.desktop-nav').innerHTML=`<a href="${repositories.core}"><span>GitHub</span> ${iconMarkup('star')}<span data-github-stars hidden></span></a>`;
  populateGitHubStars(document.querySelector('.desktop-nav a'), repositories.core, lang);
  updateNavigation();
  applyTheme(document.documentElement.dataset.theme);

  document.querySelector('#lang-switch a').innerHTML = iconMarkup('globe') + '<span class="hh-tool-label">' + (lang === 'zh' ? 'English' : '中文') + '</span>';
  document.querySelector('#lang-switch a').setAttribute('aria-label',lang === 'zh' ? 'English' : '中文');
  disposeMenu?.();
  document.querySelector('.site-header').classList.add('portal-compact-header');
  // hero
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  applySiteMetadata(lang === 'en' ? 'portalEn' : 'portal',lang);
  const eyebrow = document.querySelector('.eyebrow');
  if (eyebrow) eyebrow.innerHTML = c.hero.eyebrow.map(s => `<span>${s}</span>`).join('');
  const h1 = document.querySelector('h1');
  if (h1) h1.innerHTML = `${c.hero.h1}<span>${c.hero.h1Accent}</span>${c.hero.h1Suffix}`;
  const heroCopy = document.querySelector('.hero-copy');
  if (heroCopy) heroCopy.textContent = c.hero.copy;
  document.querySelector('#hero-connect').innerHTML = heroConnectMarkup(lang);
  const primary = document.querySelector('.hero-actions .button-primary');
  if (primary) primary.innerHTML = `${iconMarkup('copy')} ${c.hero.cta}`;
  const secondary = document.querySelector('.hero-actions .button-secondary');
  if (secondary) {
    secondary.href = `${repositories.core}/blob/main/docs/harness.md`;
    secondary.innerHTML = `${c.hero.ctaSecondary} ${iconMarkup('external')}`;
  }
  const scrollNote = document.querySelector('.scroll-note');
  if (scrollNote) scrollNote.innerHTML = `${c.ui.scrollNote} ${iconMarkup('down')}`;

  // sections
  const content = document.querySelector('#portal-content');
  if (content) {
    const previous=disposeResourceFeed?.snapshot?.();
    disposeResourceFeed?.();
    content.innerHTML = portalContent(lang);
    disposeResourceFeed = setupResourceFeed(content, ResourceFeedControls, ResourceToolPanels,previous);
  }

  // footer
  const footer = document.querySelector('footer');
  if (footer) {
    footer.innerHTML = `<span>${c.ui.footer.left}</span><span>${c.ui.footer.middle}</span><a href="${repositories.core}">${c.ui.footer.right} ${iconMarkup('external')}</a><div class="footer-friends" role="group" aria-labelledby="footer-friends-label"><span id="footer-friends-label">${c.ui.footer.friends}</span><a href="https://icons.kubai.design/">Kubai Icons</a></div>`;
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
let heroWhirl = document.querySelector('.hero-whirl-host');
function setHeroHidden(hidden) {
 if(!heroCenter)return;
 if(hidden&&heroCenter.contains(document.activeElement))document.querySelector('[role=tab][aria-selected=true]')?.focus({preventScroll:true});
 heroCenter.inert=hidden;
 if(hidden)heroCenter.setAttribute('aria-hidden','true');else heroCenter.removeAttribute('aria-hidden');
}
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
    setHeroHidden(false);
    heroCenter?.style.removeProperty("opacity");
    heroCenter?.style.removeProperty("transform");
    const whirl = heroWhirl;
    whirl?.style.removeProperty("opacity");
    whirl?.style.removeProperty("transform");
    return;
  }
  const p = _progress();
  setHeroHidden(p >= .35);
  // 1. Text fades + shrinks over [0, 0.35]
  if (heroCenter) {
    heroCenter.style.opacity = _map(p, [0, .35], [1, 0]).toFixed(4);
    heroCenter.style.transform = `scale(${_map(p, [0, .35], [1, .88]).toFixed(4)})`;
  }
  // 2. Whirl expands (zooms past you) + 3. fades out over [0.4, 0.85].
  // Their CSS: scale(1 + p * 0.75) on the whirl, plus the outer fade.
  // The expansion makes the spiral feel like it's rushing outward as you scroll.
  const whirl = heroWhirl;
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
heroWhirl = whirlHost;
if (whirlHost && heroScreens?.length) {
  startWhirl(whirlHost, heroScreens);
  _apply();
}

// -- copy to clipboard --
const showToast=createFeedback(()=>document.querySelector('#toast'));
document.addEventListener('click', async e => {
  const btn = e.target.closest('[data-copy]');
  if (!btn) return;
  try {
    await navigator.clipboard.writeText(btn.dataset.copy);
    showToast(btn.id === 'copy-agent' ? (lang === 'zh' ? '已复制，请粘贴到所选 AI 工具' : 'Copied. Paste into your selected AI tool.') : (lang === 'zh' ? '已复制' : 'Copied'));
  } catch { showToast(btn.id === 'copy-agent' ? (lang === 'zh' ? '无法复制，请重试，或按 GitHub 接入指南操作。' : 'Copy unavailable. Retry or follow the setup guide on GitHub.') : (lang === 'zh' ? '无法复制，请手动选择上方命令。' : 'Copy unavailable. Select the command above manually.'),6000); }
});

// -- boot --
let disposeMenu;
renderLangSwitch();
renderContent();

import "../../packages/ui/resource-navigation.css";

const disposeLiquidGlass = setupLiquidGlass();
if (import.meta.hot) import.meta.hot.dispose(disposeLiquidGlass);
