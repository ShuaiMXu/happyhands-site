type CatalogEntry = {
  id: string;
  title: string;
  description: string;
  category: string;
  aliasOf?: string | null;
};
const normalize = (value: string) =>
  value.toLowerCase().replace(/[-_]/g, " ").replace(/\s+/g, " ").trim();
export function resolveCatalogItem<T extends CatalogEntry>(
  items: T[],
  id: string | null,
): T | undefined {
  const entry = items.find((item) => item.id === id);
  return entry?.aliasOf
    ? items.find((item) => item.id === entry.aliasOf)
    : entry;
}
export function searchCatalog<T extends CatalogEntry>(
  items: T[],
  query: string,
  group: string,
  labels: Record<string, [string, string]>,
): T[] {
  const needle = normalize(query);
  const matched = items.filter(
    (item) =>
      !item.aliasOf &&
      (group === "all" || item.category === group) &&
      normalize(
        [
          item.id,
          item.title,
          item.description,
          labels[item.category]?.join(" "),
          ...items
            .filter((alias) => alias.aliasOf === item.id)
            .flatMap((alias) => [alias.id, alias.title]),
        ].join(" "),
      ).includes(needle),
  );
  const exact = (item: T) =>
    needle &&
    [item, ...items.filter((alias) => alias.aliasOf === item.id)].some(
      (entry) =>
        [entry.id, entry.title].some((value) => normalize(value) === needle),
    )
      ? 1
      : 0;
  return matched.sort((a, b) => exact(b) - exact(a));
}
