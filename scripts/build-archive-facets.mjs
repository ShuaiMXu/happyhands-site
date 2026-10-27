import { readFile, writeFile } from "node:fs/promises";
import {
  archiveStyles,
  archiveTypeRules,
} from "../components/archive-facets.ts";
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
for (const entry of entries) {
  const system = JSON.parse(
    await readFile(new URL(`${entry.slug}/design-system.json`, root), "utf8"),
  );
  const styleText = [
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
      ...(entry.industry && entry.industry !== "other" ? [entry.industry] : []),
      ...archiveTypeRules
        .filter(([, , , pattern]) => new RegExp(pattern, "i").test(purposeText))
        .map(([id]) => id),
    ]),
  ];
}
await writeFile(new URL("index.json", root), JSON.stringify(entries) + "\n");
console.log(
  JSON.stringify({
    entries: entries.length,
    styleCoverage: entries.filter((e) => e.styles.length).length,
    typeCoverage: entries.filter((e) => e.types.length).length,
  }),
);
