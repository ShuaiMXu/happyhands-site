export type SpecimenToken = { name: string; value: string };
export function extractTokens(content: string): SpecimenToken[] {
  const result = new Map<string, string>();
  try {
    const walk = (value: unknown, path = "") => {
      if (value && typeof value === "object") {
        for (const [k, v] of Object.entries(value)) {
          if (k === "$value" || k === "value") {
            if (typeof v === "string" || typeof v === "number")
              result.set(path, String(v));
            else walk(v, path);
          } else walk(v, path ? path + "." + k : k);
        }
      } else if (typeof value === "string" || typeof value === "number")
        result.set(path, String(value));
    };
    walk(JSON.parse(content));
  } catch {
    for (const match of content.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+);/g))
      result.set(match[1], match[2].trim());
    for (const line of content.split("\n")) {
      if (!/^\|\s*`--/.test(line)) continue;
      const cells = line.split("|").map((s) => s.trim());
      const name = cells[1].replaceAll("`", "");
      const value = cells[5]?.replaceAll("`", "");
      if (value) result.set(name, value);
    }
    if (!result.size)
      for (const color of content.matchAll(/#[0-9a-fA-F]{6}\b/g))
        result.set(color[0], color[0]);
  }
  return [...result].map(([name, value]) => ({ name, value }));
}
export function resolveToken(
  value: string,
  values: Record<string, string>,
  seen = new Set<string>(),
): string {
  return value.replace(
    /var\(\s*(--[\w-]+)(?:\s*,\s*([^()]+))?\s*\)/g,
    (_, name, fallback) =>
      seen.has(name)
        ? ""
        : resolveToken(
            values[name] ?? fallback ?? "",
            values,
            new Set([...seen, name]),
          ),
  );
}
