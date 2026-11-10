import { useEffect, useState } from "react";
import { readLanguage, readTheme, savePreference } from "./site-preferences";

export function useSitePreferences({embeddedLanguage = false}: {embeddedLanguage?: boolean} = {}) {
  const embedded = embeddedLanguage && typeof location !== 'undefined' && new URLSearchParams(location.search).get('embedded') === '1';
  const [lang, setLang] = useState(() => {
    const requested = embedded ? new URLSearchParams(location.search).get('lang') : null;
    return requested === 'zh' || requested === 'en' ? requested : readLanguage();
  });
  const [theme, setTheme] = useState(readTheme);
  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.hhTheme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [lang, theme]);
  useEffect(() => {
    if (!embedded) return;
    const receive = (event: MessageEvent) => {
      if (event.source === window.parent && event.origin === location.origin &&
          event.data?.type === 'hh:tool-language' &&
          (event.data.lang === 'zh' || event.data.lang === 'en')) setLang(event.data.lang);
    };
    window.addEventListener('message', receive);
    return () => window.removeEventListener('message', receive);
  }, [embedded]);
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      if (!embedded) setLang(readLanguage());
      setTheme(readTheme());
    };
    window.addEventListener("storage", sync);
    media.addEventListener("change", sync);
    return () => {
      window.removeEventListener("storage", sync);
      media.removeEventListener("change", sync);
    };
  }, [embedded]);
  return {
    lang,
    dark: theme === "dark",
    toggleLanguage: () => {
      const next = lang === "zh" ? "en" : "zh";
      savePreference("pd-lang", next);
      setLang(next);
    },
    toggleTheme: () => {
      const next = theme === "dark" ? "light" : "dark";
      savePreference("hh-theme", next);
      setTheme(next);
    },
  };
}
