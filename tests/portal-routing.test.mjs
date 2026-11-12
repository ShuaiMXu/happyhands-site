import test from 'node:test';
import assert from 'node:assert/strict';
import config from '../vite.config.js';

test('mirror directory middleware rejects decoded traversal and malformed encoding',()=>{
 let middleware;
 config.plugins.find(p=>p.name==='skillry-mirror-dir-index').configureServer({middlewares:{use(fn){middleware=fn;}}});
 for(const url of ['/skillry-full/%2e%2e/%2e%2e/','/skillry-full/%2e%2e%5c%2e%2e%5c','/skillry-full/%ZZ/']){
  let next=false;
  middleware({url},{setHeader(){assert.fail('must not serve a file outside the mirror');},end(){assert.fail('must not send filesystem contents');}},()=>{next=true;});
  assert.equal(next,true,url);
 }
});

test('Vite dev and preview serve the GitHub count as JSON at the exact API path', async t => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async url => {
    assert.equal(url, 'https://happyhands.cc/api/github-stars');
    return new Response(JSON.stringify({
      repository: 'https://github.com/ShuaiMXu/happyhands', count: 432,
      checkedAt: '2026-11-11T08:00:00Z', stale: false,
    }));
  };
  t.after(() => { globalThis.fetch = originalFetch; });

  const plugin = config.plugins.find(item => item.name === 'github-stars');
  for (const hook of ['configureServer', 'configurePreviewServer']) {
    let middleware;
    plugin[hook]({ middlewares: { use(handler) { middleware = handler; } } });
    const handle = async (method, url) => {
      const result = { statusCode: 200, headers: {} };
      const response = {
        statusCode: 200,
        setHeader(name, value) { result.headers[name] = value; },
        end(body) { result.statusCode = this.statusCode; result.body = body; },
      };
      await middleware({ method, url }, response, error => {
        if (error) throw error;
        result.next = true;
      });
      return result;
    };

    const ok = await handle('GET', '/api/github-stars?preview=1');
    assert.equal(ok.statusCode, 200);
    assert.match(ok.headers['Content-Type'], /^application\/json/);
    assert.equal(JSON.parse(ok.body).count, 432);
    assert.equal(JSON.parse(ok.body).stale, false);
    const method = await handle('POST', '/api/github-stars');
    assert.equal(method.statusCode, 405);
    assert.equal(method.headers.Allow, 'GET');
    assert.equal((await handle('GET', '/api/github-stars/other')).next, true);
  }
});
