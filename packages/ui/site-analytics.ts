/// <reference types="vite/client" />
import { inject, type BeforeSendEvent } from "@vercel/analytics";

const productionHosts = new Set([
  "happyhands.cc",
  "www.happyhands.cc",
  "happyhands-design.vercel.app",
]);
const publicPaths = new Set([
  "/apps/portal/",
  "/apps/studio/",
  "/components/",
  "/systems/happyhands/",
  "/systems/quartz/",
  "/systems/lime/",
  "/guide/",
  "/en/guide/",
]);

// Never send user-provided query parameters, hashes, project IDs or paths.
export function analyticsPageUrl(value: string): string | null {
  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      !productionHosts.has(url.hostname) ||
      url.port || url.username || url.password
    ) return null;
    const path = url.pathname === "/" ? "/apps/portal/" :
      url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`;
    return publicPaths.has(path) ? `https://happyhands.cc${path}` : null;
  } catch { return null; }
}

export function redactAnalyticsEvent(event: BeforeSendEvent): BeforeSendEvent | null {
  if (event.type !== "pageview") return null;
  const url = analyticsPageUrl(event.url);
  return url ? { type: "pageview", url } : null;
}

export function createPageViewFilter() {
  let previous: string | null = null;
  return (event: BeforeSendEvent) => {
    const clean = redactAnalyticsEvent(event);
    if (!clean || clean.url === previous) return null;
    previous = clean.url;
    return clean;
  };
}

export function analyticsAllowed(context: {
  production: boolean;
  url: string;
  topLevel: boolean;
  doNotTrack?: string | null;
  globalPrivacyControl?: boolean;
}) {
  return context.production && context.topLevel &&
    !["1", "yes"].includes(context.doNotTrack || "") &&
    !context.globalPrivacyControl && analyticsPageUrl(context.url) !== null;
}

let initialized = false;
export function initializeSiteAnalytics() {
  if (initialized || typeof window === "undefined") return;
  if (!analyticsAllowed({
    production: import.meta.env?.PROD === true,
    url: window.location.href,
    topLevel: window.top === window,
    doNotTrack: navigator.doNotTrack,
    globalPrivacyControl: (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl,
  })) return;
  initialized = true;
  // Page views only: no paid custom events, session replay or form tracking.
  inject({ mode: "production", debug: false, beforeSend: createPageViewFilter() });
}

initializeSiteAnalytics();
