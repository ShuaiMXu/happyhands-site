import { githubStarsSnapshot } from '../packages/ui/github-stars-snapshot.js';

export async function readGitHubStars(fetcher = fetch) {
  try {
    const response = await fetcher('https://api.github.com/repos/ShuaiMXu/happyhands', {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'HappyHands-website' },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw Error('GitHub unavailable');
    const data = await response.json();
    if (!Number.isSafeInteger(data.stargazers_count) || data.stargazers_count < 0) throw Error('Invalid count');
    return { ...githubStarsSnapshot, count: data.stargazers_count, checkedAt: new Date().toISOString(), stale: false };
  } catch {
    return { ...githubStarsSnapshot, stale: true };
  }
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).end();
  }
  const result = await readGitHubStars();
  response.setHeader('Cache-Control', 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400');
  return response.status(200).json(result);
}
