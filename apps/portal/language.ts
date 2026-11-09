export type PortalLanguage = "zh" | "en";

// The URL, not a previous browser preference, defines this indexable document.
export function portalLanguage(pathname: string): PortalLanguage {
  return pathname.startsWith("/en/") ? "en" : "zh";
}

export function portalPath(language: PortalLanguage): string {
  return language === "en" ? "/en/apps/portal/" : "/apps/portal/";
}
