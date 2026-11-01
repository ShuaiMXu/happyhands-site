import { applySiteMetadata, siteOrigin, seoData } from "./site-seo";
export type ResourceSeo = {
  title: string;
  description: string;
  query: string;
  name: string;
  source?: string;
};
const query = (values: Record<string, string>) =>
  new URLSearchParams(values).toString();
export function archiveSeo(entry: {
  name: string;
  slug: string;
  north_star: string;
  page_url: string;
}): ResourceSeo {
  return {
    name: entry.name,
    title: `${entry.name} / Design.md / HappyHands`,
    description: entry.north_star,
    query: query({ provider: "design-md", design: entry.slug }),
    source: entry.page_url,
  };
}
export function componentSeo(entry: {
  id: string;
  title: string;
  description: string;
}): ResourceSeo {
  return {
    name: entry.title,
    title: `${entry.title} / Cult UI / HappyHands`,
    description: entry.description,
    query: query({ provider: "cult-ui", component: entry.id }),
    source: "https://github.com/nolly-studio/cult-ui",
  };
}
export function systemSeo(
  system: { id: string; name: string; summary: string },
  doc?: { path: string; title: string },
): ResourceSeo {
  // The index document repeats the system overview. Shared reading is identical
  // in each system context; use one stable existing reader URL for discovery.
  const document = doc?.path === "index.md" ? undefined : doc;
  const shared = !!document && /^(guides|articles)\//.test(document.path);
  const name = shared
    ? document!.title
    : document
      ? `${system.name} / ${document.title}`
      : system.name;
  return {
    name,
    title: `${name} / ${shared ? "Design.how" : "Design system"} / HappyHands`,
    description: shared
      ? `${document!.title}. Design.how reference guide.`
      : document
        ? `${document.title} — ${system.name} design system reference. ${system.summary}`
        : system.summary,
    query: query({
      provider: "systems",
      system: shared ? "sodium" : system.id,
      ...(document ? { doc: document.path } : {}),
    }),
    source: shared
      ? `https://design.how/${document!.path}`
      : system.id === "happyhands"
        ? "https://github.com/ShuaiMXu/happyhands"
        : `https://design.how/systems/${system.id}`,
  };
}

export function resourceSeoData(
  resource: ResourceSeo,
  lang: "zh" | "en" = "zh",
) {
  const base = seoData("components", lang),
    url = `${siteOrigin}/components/?${resource.query}`;
  // A reference page describes the source resource, not the HappyHands software.
  const graph = base.graph["@graph"].filter(
    (node) => node["@type"] === "Organization" || node["@type"] === "WebSite",
  );
  graph.push({
    "@type": "WebPage",
    "@id": url + "#webpage",
    url,
    name: resource.title,
    description: resource.description,
    inLanguage: lang === "zh" ? "zh-CN" : "en",
    isPartOf: { "@id": siteOrigin + "/#website" },
    ...(resource.source ? { citation: resource.source } : {}),
  });
  return {
    ...base,
    title: resource.title,
    description: resource.description,
    url,
    graph: { "@context": "https://schema.org", "@graph": graph },
  };
}
export function applyResourceMetadata(
  resource: ResourceSeo | null,
  lang: string,
) {
  applySiteMetadata("components", lang === "en" ? "en" : "zh");
  if (!resource) return;
  const data = resourceSeoData(resource, lang === "en" ? "en" : "zh");
  document.title = data.title;
  document
    .querySelector('link[rel="canonical"]')
    ?.setAttribute("href", data.url);
  for (const [selector, value] of [
    ['meta[name="description"]', data.description],
    ['meta[property="og:title"]', data.title],
    ['meta[property="og:description"]', data.description],
    ['meta[property="og:url"]', data.url],
    ['meta[name="twitter:title"]', data.title],
    ['meta[name="twitter:description"]', data.description],
  ])
    document.querySelector(selector)?.setAttribute("content", value);
  const graph = document.getElementById("site-structured-data");
  if (graph)
    graph.textContent = JSON.stringify(data.graph).replace(/</g, "\\u003c");
}
