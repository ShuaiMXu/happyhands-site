import assert from 'node:assert/strict';
import test from 'node:test';
import { loadDirectoryData } from '../components/resource-directory-data.ts';

const paths = ['/resources/v1/index.json', '/resources/v1/covers.json', '/design-archive/index.json'];
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

test('cold list fetches all three resources once, preserving abort and result order', async () => {
  const f = fixture();
  assert.deepEqual(await loadDirectoryData(null, f.signal, f.request), paths.map(path => ({ path })));
  assert.deepEqual(f.calls.map(call => call.path), paths);
  assert.ok(f.calls.every(call => call.options.signal === f.signal));
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
