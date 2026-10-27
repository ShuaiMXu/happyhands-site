export const archiveCategories = [
  ["saas", "SaaS", "SaaS"],
  ["agency", "创意机构", "Agencies"],
  ["ecommerce", "电商", "E-commerce"],
  ["ai", "AI", "AI"],
  ["design", "设计", "Design"],
  ["devtools", "开发工具", "Developer tools"],
  ["fintech", "金融", "Finance"],
  ["productivity", "效率工具", "Productivity"],
  ["media", "内容与媒体", "Media"],
  ["crypto", "加密与 Web3", "Crypto & Web3"],
  ["other", "其他", "Other"],
] as const;
export type ArchiveEntry = {
  slug: string;
  name: string;
  site_url: string;
  page_url: string;
  theme: string;
  industry: string;
  north_star: string;
  fonts: string[];
  video: string;
};
export const categoryOf = (entry: ArchiveEntry) =>
  archiveCategories.some(([id]) => id === entry.industry)
    ? entry.industry
    : "other";
export function filterArchive(
  entries: ArchiveEntry[],
  query: string,
  theme: string,
  category: string,
) {
  const term = query.trim().toLowerCase();
  return entries.filter(
    (entry) =>
      (!theme || entry.theme === theme) &&
      (!category || categoryOf(entry) === category) &&
      [
        entry.name,
        entry.site_url,
        entry.slug,
        entry.industry,
        entry.north_star,
        ...entry.fonts,
        ...(archiveCategories.find(([id]) => id === categoryOf(entry)) || []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(term),
  );
}
