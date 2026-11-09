import {languagePath,hasLanguageRoute} from './language-route';
export type SiteLanguage = "zh" | "en";
let sessionLanguage: SiteLanguage = "zh";
let sessionTheme: "light" | "dark" | undefined;

export function readLanguage(): SiteLanguage {
  if(typeof location!=='undefined' && hasLanguageRoute(location.pathname)) return location.pathname.startsWith('/en/')?'en':'zh';
  try {
    return localStorage.getItem("pd-lang") === "en" ? "en" : "zh";
  } catch {
    return sessionLanguage;
  }
}

export function readTheme(): "light" | "dark" {
  try {
    const saved = localStorage.getItem("hh-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    if (sessionTheme) return sessionTheme;
  }
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function savePreference(key: "pd-lang" | "hh-theme", value: string) {
  if (key === "pd-lang") {
    sessionLanguage = value === "en" ? "en" : "zh";
    if(typeof location!=='undefined' && hasLanguageRoute(location.pathname)) history.replaceState(history.state,'',languagePath(location.pathname,sessionLanguage)+location.search+location.hash);
  }
  if (key === "hh-theme") sessionTheme = value === "dark" ? "dark" : "light";
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Session remains usable. */
  }
}

// Keep owned internal navigation on the explicit language route, including newly rendered cards.
if(typeof document!=='undefined') document.addEventListener('click',event=>{
 const link=(event.target as Element)?.closest?.('a[href]');if(!link||link.hasAttribute('download')||link.hasAttribute('hreflang'))return;
 const url=new URL(link.getAttribute('href')!,location.href);
 if(url.origin===location.origin && hasLanguageRoute(url.pathname) && readLanguage()==='en') link.setAttribute('href',languagePath(url.pathname,'en')+url.search+url.hash);
},true);
