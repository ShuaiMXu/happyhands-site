const requests = new Map();

// Share one request across language changes; keep the link usable if GitHub is unavailable.
export async function populateGitHubStars(link, repository, language) {
  link.setAttribute('aria-label', language === 'zh' ? '在 GitHub 查看 HappyHands 并点 Star' : 'View and star HappyHands on GitHub');
  if (!requests.has(repository)) {
    const path = new URL(repository).pathname.replace(/\/$/, '');
    requests.set(repository, fetch(`https://api.github.com/repos${path}`, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: AbortSignal.timeout(8000),
    }).then(response => {
      if (!response.ok) throw new Error('GitHub unavailable');
      return response.json();
    }).then(data => Number.isSafeInteger(data.stargazers_count) && data.stargazers_count >= 0 ? data.stargazers_count : null)
      .catch(() => null));
  }
  const count = await requests.get(repository);
  if (count === null || !link.isConnected) return;
  const badge = link.querySelector('[data-github-stars]');
  badge.textContent = new Intl.NumberFormat(language === 'zh' ? 'zh-CN' : 'en', { notation: 'compact', maximumFractionDigits: 1 }).format(count);
  badge.hidden = false;
  link.setAttribute('aria-label', `HappyHands · GitHub · ${count} stars`);
  link.title = `${count.toLocaleString()} GitHub stars`;
}
