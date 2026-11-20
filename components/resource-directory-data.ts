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
