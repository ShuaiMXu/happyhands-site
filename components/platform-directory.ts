import type { ResourceEntry } from "./resource-directory";
export const platforms = [
  {
    id: "apple-hig",
    name: "Apple HIG",
    prefix: "collections/platform-systems/apple-hig/",
    overview: "collections/platform-systems/apple-hig/DESIGN.md",
  },
  {
    id: "material3",
    name: "Material 3",
    prefix: "collections/platform-systems/material3/",
    overview: "collections/platform-systems/material3/DESIGN.md",
  },
  {
    id: "mobbin",
    name: "Mobbin",
    prefix: "collections/mobbin-archive/",
    overview: "collections/mobbin-archive/index.md",
  },
];
export function platformFor(row: Pick<ResourceEntry, "path">) {
  return platforms.find((p) => row.path.startsWith(p.prefix));
}
export function isSystemEntry(row: ResourceEntry) {
  const platform = platformFor(row);
  if (platform) return row.path === platform.overview;
  if (row.path === "collections/app-tokens/material3/tokens.json") return false;
  return !row.system || row.path.endsWith("/index.md");
}
export function systemEntryName(row: ResourceEntry) {
  const platform = platformFor(row);
  if (platform && platform.overview === row.path) return platform.name;
  if (row.system && row.path.endsWith("/index.md"))
    return row.system
      .split("-")
      .map((s) => s[0].toUpperCase() + s.slice(1))
      .join(" ");
  if (row.collection === "app-tokens") {
    const names: Record<string, string> = {
      "antd-mobile": "Ant Design Mobile",
      nutui: "NutUI",
      "tdesign-mobile-vue": "TDesign Mobile",
      vant: "Vant",
      varlet: "Varlet",
      material3: "Material 3",
    };
    return names[row.path.split("/")[2]] || row.name;
  }
  return row.name;
}
