import { githubStarsSnapshot } from '../../packages/ui/github-stars-snapshot.js';
let request;

export async function populateGitHubStars(link, repository, language) {
  if (!link || repository !== githubStarsSnapshot.repository) return;
  const render = data => {
    const badge = link.querySelector('[data-github-stars]');
    if (!badge || !link.isConnected) return;
    badge.textContent = new Intl.NumberFormat(language === 'zh' ? 'zh-CN' : 'en', { notation: 'compact', maximumFractionDigits: 1 }).format(data.count);
    badge.hidden = false;
    link.setAttribute('aria-label', `HappyHands GitHub / ${data.count} stars`);
    const date = new Date(data.checkedAt).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en');
    link.title = `${data.count.toLocaleString()} GitHub stars / ${language === 'zh' ? '更新于' : 'Checked'} ${date}`;
  };
  render(githubStarsSnapshot);
  request ??= fetch('/api/github-stars', { signal: AbortSignal.timeout(7000) })
    .then(response => { if (!response.ok) throw Error('Unavailable'); return response.json(); })
    .then(data => data.repository === repository && Number.isSafeInteger(data.count) && data.count >= 0 && Number.isFinite(Date.parse(data.checkedAt)) ? data : githubStarsSnapshot)
    .catch(() => githubStarsSnapshot);
  render(await request);
}
