import { newDraft } from "../theme-core/project";
import { validateValue, type Key, type Mode } from "../theme-core";
import type { Draft } from "../contracts";
import { defaultConfig } from "./registry";
export type DesignSource = {
  slug: string;
  name: string;
  mode: Mode;
  markdown: string;
  system: unknown;
  mappings: { key: string; value: string; source: string }[];
  warnings: string[];
};
export function importDesign(
  slug: string,
  system: unknown,
  markdown: string,
  id: string,
): Draft {
  if (
    !/^[a-z0-9-]{1,100}$/.test(slug) ||
    typeof markdown !== "string" ||
    markdown.length > 500000 ||
    JSON.stringify(system).length > 500000
  )
    throw Error("Invalid design source");
  const s = system as {
    meta?: { siteName?: string };
    theme?: string;
    colors?: { hex?: string; role?: string; name?: string }[];
    spacing?: { radius?: { default?: string }; baseUnit?: number };
    typography?: { family?: string }[];
  };
  if (!s || !Array.isArray(s.colors) || !s.colors.length)
    throw Error("Design source has no structured color rules");
  const name =
    typeof s.meta?.siteName === "string" ? s.meta.siteName.slice(0, 200) : slug;
  const draft = newDraft(id, name);
  const mode: Mode = s.theme === "dark" ? "dark" : "light";
  const mappings: DesignSource["mappings"] = [];
  const rules: [Key, RegExp][] = [
    ["background", /page background|dominant.*background|canvas/i],
    ["foreground", /primary (?:text|typography)|dominant foreground/i],
    ["card", /card.*surface|card.*background|elevated card|(?:elevated|floating).*panel.*base/i],
    ["muted-foreground", /muted.*text|muted.*copy|secondary.*text/i],
    ["primary", /primary\s+(?:action|button|cta)|action color/i],
    [
      "primary-foreground",
      /text.*on.*primary|text.*on.*cobalt|text.*on.*button/i,
    ],
    ["border", /structural border|divider|border/i],
    ["secondary", /secondary button|secondary.*surface/i],
  ];
  for (const [key, pattern] of rules) {
    const color = s.colors.find(
      (c) => typeof c.role === "string" && pattern.test(c.role),
    );
    if (!color?.hex) continue;
    try {
      validateValue(key, color.hex);
      draft.styles[mode][key] = color.hex;
      mappings.push({
        key: `${mode}.${key}`,
        value: color.hex,
        source: color.role || color.name || "",
      });
    } catch {
      /* Keep unresolved data in source. */
    }
  }
  for (const [from, to] of [
    ["foreground", "card-foreground"],
    ["foreground", "popover-foreground"],
    ["card", "popover"],
    ["border", "input"],
    ["primary", "ring"],
  ] as [Key, Key][]) {
    const value = draft.styles[mode][from];
    if (value) {
      draft.styles[mode][to] = value;
      mappings.push({ key: `${mode}.${to}`, value, source: `derived:${from}` });
    }
  }
  for (const [key, value] of [
    ["radius", s.spacing?.radius?.default],
    ["spacing", s.spacing?.baseUnit ? `${s.spacing.baseUnit}px` : undefined],
  ] as [Key, string | undefined][]) {
    if (!value) continue;
    try {
      validateValue(key, value);
      draft.styles.light[key] = value;
      draft.styles.dark[key] = value;
      mappings.push({ key: `shared.${key}`, value, source: `spacing.${key}` });
    } catch {}
  }
  const warnings = [
    "颜色角色为规则匹配建议，请检查映射。",
    "另一明暗模式及未映射变量保留默认值。",
    "字体保留当前可用字体；原始字体名称和组件规范随来源保存，尚未自动还原。",
  ];
  draft.designSource = {
    slug,
    name,
    mode,
    markdown,
    system: structuredClone(system),
    mappings,
    warnings,
  };
  draft.componentConfig = { ...defaultConfig, label: "Continue" };
  draft.provenance = {
    source: `design-md:${slug}`,
    revision: "design-import-0.1",
  };
  draft.baseline = structuredClone(draft.styles);
  return draft;
}
export function validateDesignSource(input: unknown): DesignSource {
  const s = input as DesignSource;
  if (
    !s ||
    !/^[a-z0-9-]{1,100}$/.test(s.slug) ||
    typeof s.name !== "string" ||
    !["light", "dark"].includes(s.mode) ||
    typeof s.markdown !== "string" ||
    s.markdown.length > 500000 ||
    !Array.isArray(s.mappings) ||
    !Array.isArray(s.warnings) ||
    !s.system ||
    JSON.stringify(s.system).length > 500000 ||
    s.warnings.some((w) => typeof w !== "string") ||
    s.mappings.some(
      (m) =>
        !m ||
        typeof m.key !== "string" ||
        typeof m.value !== "string" ||
        typeof m.source !== "string",
    )
  )
    throw Error("Invalid design source record");
  return structuredClone(s);
}
