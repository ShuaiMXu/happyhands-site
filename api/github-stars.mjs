import { githubStarsSnapshot } from '../packages/ui/github-stars-snapshot.js';

export async function readGitHubStars(fetcher = fetch, timeoutMs = 5000) {
  try {
    const response = await fetcher('https://api.github.com/repos/ShuaiMXu/happyhands', {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'HappyHands-website' },
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!response.ok) throw Error('GitHub unavailable');
    const data = await response.json();
    if (!Number.isSafeInteger(data.stargazers_count) || data.stargazers_count < 0) throw Error('Invalid count');
    return { ...githubStarsSnapshot, count: data.stargazers_count, checkedAt: new Date().toISOString(), stale: false };
  } catch {
    return { ...githubStarsSnapshot, stale: true };
  }
}

// Local previews can reuse the production cache when GitHub limits the local IP.
export async function readPreviewGitHubStars(fetcher = fetch) {
  try {
    const response = await fetcher('https://happyhands.cc/api/github-stars', {
      signal: AbortSignal.timeout(2500),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.repository === githubStarsSnapshot.repository && data.stale === false &&
          Number.isSafeInteger(data.count) && data.count >= 0 && Number.isFinite(Date.parse(data.checkedAt))) {
        return { ...githubStarsSnapshot, count: data.count, checkedAt: data.checkedAt, stale: false };
      }
    }
  } catch {
    // The direct GitHub request still has a bounded chance to refresh the preview.
  }
  return readGitHubStars(fetcher, 3500);
}

export function createGitHubStarsHandler(read = readGitHubStars) {
  return async function handler(request, response) {
    if (request.method !== 'GET') {
      response.setHeader('Allow', 'GET');
      response.statusCode = 405;
      response.end();
      return;
    }
    const result = await read();
    response.setHeader('Cache-Control', 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400');
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.end(JSON.stringify(result));
  };
}

export default createGitHubStarsHandler();
