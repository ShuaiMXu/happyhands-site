/** One randomized order per page visit, shared by filtering and pagination. */
const ranks = new Map<string, number>();
export function randomizeArchive<T extends { slug: string }>(entries: readonly T[]): T[] {
  for (const entry of entries) {
    if (!ranks.has(entry.slug)) ranks.set(entry.slug, Math.random());
  }
  return [...entries].sort((a, b) => ranks.get(a.slug)! - ranks.get(b.slug)! || a.slug.localeCompare(b.slug));
}
