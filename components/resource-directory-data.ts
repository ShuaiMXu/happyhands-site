/** List-only data. A resource deep link renders CollectionsLibrary instead,
 * which owns its catalog/source requests; do not also load the hidden list. */
export async function loadDirectoryData(
  resource: string | null,
  signal: AbortSignal,
  request: typeof fetch = fetch,
  includeArchive = false,
) {
  if (resource) return null;
  return Promise.all([
    "/resources/v1/index.json",
    "/resources/v1/covers.json",
    ...(includeArchive ? ["/design-archive/index.json"] : []),
  ].map(async (path) => {
    const response = await request(path, { signal });
    if (!response.ok) throw Error("Could not load resource directory: " + path);
    return response.json();
  }));
}

/** Reuse completed list data across lazy tabs in one document. Never share
 * caller-owned abort signals or cache a failed/aborted request. This does not
 * change browser HTTP headers, detail-source verification, or the agent API. */
export function createPublicDirectoryLoader(request: typeof fetch = fetch, now = Date.now) {
  const ttlMs = 60_000;
  let completed: { data: Awaited<ReturnType<typeof loadDirectoryData>>; expires: number } | undefined;
  let sequence = 0;
  return async (signal: AbortSignal, refresh = false) => {
    signal.throwIfAborted();
    if (!refresh && completed && now() < completed.expires) return completed.data;
    const attempt = ++sequence;
    if (refresh) completed = undefined;
    const data = await loadDirectoryData(null, signal, request);
    signal.throwIfAborted();
    const [catalog, covers] = data ?? [];
    if (sequence === attempt && Array.isArray(catalog?.resources) &&
        Array.isArray(catalog?.collections) && covers && typeof covers === "object" && !Array.isArray(covers)) {
      completed = { data, expires: now() + ttlMs };
    }
    return data;
  };
}

export const loadPublicDirectoryData = createPublicDirectoryLoader();
