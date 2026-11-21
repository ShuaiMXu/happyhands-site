import assert from 'node:assert/strict';
import test from 'node:test';
import { loadDirectoryData, createPublicDirectoryLoader } from '../components/resource-directory-data.ts';

const paths = ['/resources/v1/index.json', '/resources/v1/covers.json'];
function fixture() {
  const calls = [];
  const request = async (path, options) => {
    calls.push({ path, options });
    return { ok: true, json: async () => ({ path }) };
  };
  return { calls, request, signal: new AbortController().signal };
}

test('resource detail does not fetch hidden directory data', async () => {
  const f = fixture();
  for (const resource of ['component:pin-ui/liquid-tabs', 'component:radix-ui/button', 'unknown-resource']) {
    assert.equal(await loadDirectoryData(resource, f.signal, f.request), null);
  }
  assert.deepEqual(f.calls, []);
});

test('cold public list loads only catalog and covers, preserving signal and result order', async () => {
  const f = fixture();
  assert.deepEqual(await loadDirectoryData(null, f.signal, f.request), paths.map(path => ({ path })));
  assert.deepEqual(f.calls.map(call => call.path), paths);
  assert.ok(f.calls.every(call => call.options.signal === f.signal));
});

test('archive data is only requested by an archive list', async () => {
  const f = fixture();
  const archivePath = '/design-archive/index.json';
  const expected = [...paths, archivePath];
  assert.deepEqual(await loadDirectoryData(null, f.signal, f.request, true), expected.map(path => ({ path })));
  assert.deepEqual(f.calls.map(call => call.path), expected);
});

test('returning to list and retrying still fetch fresh list data', async () => {
  const f = fixture();
  await loadDirectoryData('component:pin-ui/liquid-tabs', f.signal, f.request);
  await loadDirectoryData('', f.signal, f.request);
  await loadDirectoryData(null, f.signal, f.request);
  assert.deepEqual(f.calls.map(call => call.path), [...paths, ...paths]);
});

test('failed and aborted requests remain failures, not an empty catalog', async () => {
  await assert.rejects(loadDirectoryData(null, new AbortController().signal,
    async () => ({ ok: false })), /Could not load resource directory/);
  const abort = new DOMException('Aborted', 'AbortError');
  await assert.rejects(loadDirectoryData(null, new AbortController().signal,
    async () => { throw abort; }), error => error === abort);
});


test('public lazy tabs reuse a successful catalog and covers within a minute', async () => {
  let now = 0;
  const calls = [];
  const catalog = { resources: [], collections: [] };
  const load = createPublicDirectoryLoader(async (path) => {
    calls.push(path);
    return { ok: true, json: async () => path === paths[0] ? catalog : {} };
  }, () => now);
  const signal = new AbortController().signal;
  await load(signal);
  now = 59_999;
  assert.equal((await load(signal))[0], catalog);
  assert.deepEqual(calls, paths);
  now = 60_000;
  await load(signal);
  await load(signal, true);
  assert.deepEqual(calls, [...paths, ...paths, ...paths]);
});

test('failed, malformed and aborted public loads do not poison a later mount', async () => {
  const signal = new AbortController().signal;
  for (const mode of ['failure', 'malformed', 'abort']) {
    const abort = new AbortController();
    let calls = 0;
    let first = true;
    const load = createPublicDirectoryLoader(async (path) => {
      calls++;
      if (first && mode === 'failure') return { ok: false };
      if (first && mode === 'abort') abort.abort();
      return { ok: true, json: async () =>
        path === paths[0] && !(first && mode === 'malformed') ? { resources: [], collections: [] } : {} };
    });
    if (mode === 'malformed') await load(abort.signal);
    else await assert.rejects(load(abort.signal));
    first = false;
    await load(signal);
    await load(signal);
    assert.equal(calls, 4, mode);
    if (mode === 'abort') await assert.rejects(load(abort.signal), { name: 'AbortError' });
  }
});
