import { readFile, writeFile } from "node:fs/promises";
import {
  archiveStyles,
  archiveTypeRules,
} from "../components/archive-facets.ts";
import { archiveCategories } from "../components/archive-catalog.ts";
const root = new URL("../public/design-archive/", import.meta.url);
const positiveMatch = (text, pattern) =>
  [...text.matchAll(new RegExp(pattern, "ig"))].some((match) => {
    const before = text.slice(Math.max(0, match.index - 65), match.index);
    const after = text.slice(
      match.index + match[0].length,
      match.index + match[0].length + 45,
    );
    return (
      !/\b(no|without|avoid(?:ing)?|never|zero|absence of|rather than|not)\b[^.!?;:]{0,60}$/i.test(
        before,
      ) && !/^\s+(?:is|are)\s+(?:not|absent|avoided|forbidden)/i.test(after)
    );
  });
const entries = JSON.parse(await readFile(new URL("index.json", root), "utf8"));
const overrides = JSON.parse(await readFile(new URL("archive-facet-overrides.json", import.meta.url), "utf8"));
const validStyles = new Set(archiveStyles.map(([id]) => id));
const validTypes = new Set([...archiveCategories, ...archiveTypeRules].map(([id]) => id));
for (const [slug, review] of Object.entries(overrides)) {
  if (!entries.some((entry) => entry.slug === slug)) throw new Error(`Unknown reviewed archive: ${slug}`);
  for (const [field, valid] of [["styles", validStyles], ["types", validTypes]]) {
    for (const id of review[field] ?? []) {
      if (!valid.has(id) || id === "other") throw new Error(`Invalid ${field} classification: ${slug}/${id}`);
    }
  }
}
for (const entry of entries) {
  const system = entry.source === "designmd.app" ? {description: entry.north_star} : JSON.parse(
    await readFile(new URL(`${entry.slug}/design-system.json`, root), "utf8"),
  );
  const document = entry.source === "designmd.app" ? await readFile(new URL(`${entry.slug}/design.md`, root), "utf8") : "";
  const overview = document.match(/## Overview\s*\n([\s\S]*?)(?=\n## |$)/i)?.[1] || "";
  const styleText = [
    entry.name,
    overview,
    system.description,
    system.northStar,
    entry.north_star,
  ].join(" ");
  const purposeText = [
    entry.name,
    entry.site_url,
    String(system.description ?? "").slice(0, 800),
  ].join(" ");
  entry.styles = archiveStyles
    .filter(([, , , pattern]) => positiveMatch(styleText, pattern))
    .map(([id]) => id);
  entry.types = [
    ...new Set([
      ...(entry.sourceKind ? [entry.sourceKind === "library" ? "style-template" : "brand-reference"] : []),
      ...(entry.industry && entry.industry !== "other" ? [entry.industry] : []),
      ...archiveTypeRules
        .filter(([, , , pattern]) => new RegExp(pattern, "i").test(purposeText))
        .map(([id]) => id),
    ]),
  ];
  const review = overrides[entry.slug];
  // Reviewed classifications survive regeneration; unreviewed additions still
  // remain unclassified when no evidence matches, rather than using a fallback.
  for (const field of ["styles", "types"]) {
    if (review?.[field]) entry[field] = [...new Set([...entry[field], ...review[field]])];
  }
}
await writeFile(new URL("index.json", root), JSON.stringify(entries) + "\n");
console.log(
  JSON.stringify({
    entries: entries.length,
    styleCoverage: entries.filter((e) => e.styles.length).length,
    typeCoverage: entries.filter((e) => e.types.length).length,
  }),
);
