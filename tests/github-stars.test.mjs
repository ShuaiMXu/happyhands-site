import test from 'node:test';
import assert from 'node:assert/strict';
import githubStarsHandler, { readGitHubStars, readPreviewGitHubStars } from '../api/github-stars.mjs';
import { githubStarsSnapshot } from '../packages/ui/github-stars-snapshot.js';
import {readFile} from 'node:fs/promises';

test('initial HTML exposes the verified count before JavaScript or network refresh', async () => {
  const html=await readFile(new URL('../apps/portal/index.html',import.meta.url),'utf8');
  assert.ok(html.includes(`<span data-github-stars>${githubStarsSnapshot.count}</span>`));
  assert.ok(html.includes(`HappyHands GitHub / ${githubStarsSnapshot.count} stars`));
  assert.ok(!html.includes('data-github-stars hidden'));
});

test('GitHub count accepts zero and real counts', async () => {
  for (const count of [0, 33, 1500]) {
    const result = await readGitHubStars(async () => ({ok:true,json:async()=>({stargazers_count:count})}));
    assert.equal(result.count,count);assert.equal(result.stale,false);
  }
});
test('rate limits, timeout and invalid data retain the verified snapshot', async () => {
  for(const fetcher of [async()=>({ok:false}),async()=>{throw Error('timeout')},async()=>({ok:true,json:async()=>({stargazers_count:-1})})]){
    const result=await readGitHubStars(fetcher);
    assert.equal(result.count,githubStarsSnapshot.count);assert.equal(result.checkedAt,githubStarsSnapshot.checkedAt);assert.equal(result.stale,true);
  }
});
test('browser keeps a visible snapshot when same-origin refresh fails', async () => {
  const previous=globalThis.fetch;
  globalThis.fetch=async()=>{throw Error('offline')};
  try {
    const {populateGitHubStars}=await import('../apps/portal/github-stars.js');
    const badge={hidden:true,textContent:''};
    const attributes={};
    const link={isConnected:true,querySelector:()=>badge,setAttribute:(k,v)=>attributes[k]=v};
    await populateGitHubStars(link,githubStarsSnapshot.repository,'zh');
    assert.equal(badge.hidden,false);assert.equal(badge.textContent,String(githubStarsSnapshot.count));
    assert.match(link.title,/更新于/);
    assert.match(attributes['aria-label'],/stars/);
  } finally {globalThis.fetch=previous}
});

test('preview returns a valid production cache without requesting GitHub', async () => {
  const cached = { ...githubStarsSnapshot, count: 432, checkedAt: '2026-11-11T08:00:00Z', stale: false };
  const requests = [];
  const result = await readPreviewGitHubStars(async (url, options) => {
    requests.push(url);
    assert.ok(options.signal instanceof AbortSignal);
    return new Response(JSON.stringify(cached));
  });
  assert.deepEqual(requests, ['https://happyhands.cc/api/github-stars']);
  assert.deepEqual(result, cached);
});

test('preview rejects unavailable or invalid production cache data and refreshes from GitHub', async () => {
  const valid = { ...githubStarsSnapshot, count: 432, stale: false };
  const cacheResponses = [
    async () => { throw Error('offline'); },
    async () => new Response(null, { status: 503 }),
    async () => new Response('<html>not JSON</html>'),
    ...[
      null,
      { ...valid, repository: 'https://github.com/another/repository' },
      { ...valid, count: -1 },
      { ...valid, count: '432' },
      { ...valid, count: Number.MAX_SAFE_INTEGER + 1 },
      { ...valid, checkedAt: 'not a date' },
      { ...valid, stale: undefined },
    ].map(data => async () => new Response(JSON.stringify(data))),
  ];
  for (const cacheResponse of cacheResponses) {
    const requests = [];
    const result = await readPreviewGitHubStars(async url => {
      requests.push(url);
      if (requests.length === 1) return cacheResponse();
      assert.equal(url, 'https://api.github.com/repos/ShuaiMXu/happyhands');
      return new Response(JSON.stringify({ stargazers_count: 401 }));
    });
    assert.deepEqual(requests, [
      'https://happyhands.cc/api/github-stars',
      'https://api.github.com/repos/ShuaiMXu/happyhands',
    ]);
    assert.equal(result.count, 401);
    assert.equal(result.stale, false);
  }
});

test('production handler remains independent of its own cache and rejects other methods without fetching', async t => {
  const originalFetch = globalThis.fetch;
  const requests = [];
  globalThis.fetch = async url => {
    requests.push(url);
    assert.equal(url, 'https://api.github.com/repos/ShuaiMXu/happyhands');
    return new Response(JSON.stringify({ stargazers_count: 401 }));
  };
  t.after(() => { globalThis.fetch = originalFetch; });
  const handle = async method => {
    const response = {
      statusCode: 200,
      headers: {},
      setHeader(name, value) { this.headers[name] = value; },
      end(body) { this.body = body; },
    };
    await githubStarsHandler({ method }, response);
    return response;
  };
  const ok = await handle('GET');
  assert.equal(ok.statusCode, 200);
  assert.equal(ok.headers['Content-Type'], 'application/json; charset=utf-8');
  assert.equal(ok.headers['Cache-Control'], 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400');
  assert.equal(JSON.parse(ok.body).count, 401);
  assert.equal(JSON.parse(ok.body).stale, false);
  for (const method of ['HEAD', 'POST', 'PUT']) {
    const rejected = await handle(method);
    assert.equal(rejected.statusCode, 405);
    assert.equal(rejected.headers.Allow, 'GET');
    assert.equal(rejected.body, undefined);
  }
  assert.deepEqual(requests, ['https://api.github.com/repos/ShuaiMXu/happyhands']);
});

test('preview retries GitHub when the production cache is stale and retains a snapshot if both fail', async () => {
  for (const gitHubAvailable of [true, false]) {
    const requests = [];
    const result = await readPreviewGitHubStars(async url => {
      requests.push(url);
      if (requests.length === 1) {
        return new Response(JSON.stringify({ ...githubStarsSnapshot, stale: true }));
      }
      return gitHubAvailable
        ? new Response(JSON.stringify({ stargazers_count: 401 }))
        : new Response(null, { status: 403 });
    });
    assert.deepEqual(requests, [
      'https://happyhands.cc/api/github-stars',
      'https://api.github.com/repos/ShuaiMXu/happyhands',
    ]);
    assert.equal(result.count, gitHubAvailable ? 401 : githubStarsSnapshot.count);
    assert.equal(result.stale, !gitHubAvailable);
  }
});
