import test from 'node:test';
import assert from 'node:assert/strict';
import { createOnlineReviewHandler } from '../api/online-review.mjs';

const example = {
  lang: 'zh', task: '找到筛选入口', rules: '',
  image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aR3sAAAAASUVORK5CYII=',
};
const env = { OPENAI_API_KEY: 'test-key', HH_ONLINE_REVIEW_MODEL: 'test-model', HH_ONLINE_REVIEW_PREVIEW_TOKEN: 'test-access' };
async function send(handler, method, body, authorization) {
  const response = { setHeader() {}, end(payload) { this.body = JSON.parse(payload); } };
  await handler({ method, body, headers: { authorization } }, response);
  return [response.statusCode, response.body];
}

test('online review stays disabled without complete configuration, and rejects missing access or invalid screenshot', async () => {
  const unreachable = () => assert.fail('The model should not be called');
  const disabled = createOnlineReviewHandler({ env: {}, fetcher: unreachable });
  assert.deepEqual(await send(disabled, 'GET'), [200, { enabled: false }]);
  assert.equal((await send(disabled, 'POST', example))[0], 503);
  const configured = createOnlineReviewHandler({ env, fetcher: unreachable });
  assert.equal((await send(configured, 'POST', example, 'Bearer bad'))[0], 401);
  assert.equal((await send(configured, 'POST', { ...example, image: 'data:image/png;base64,eA==' }, 'Bearer test-access'))[0], 400);
});

test('online review sends a screenshot to the configured model and returns bounded evidence markers', async () => {
  const details = { summary: '发现一处问题', findings: [{ title: '筛选位置', evidence: '入口距离搜索较远', recommendation: '与搜索同行', x: .75, y: .2 }] };
  const handler = createOnlineReviewHandler({
    env, fetcher: async (url, request) => {
      assert.equal(url, 'https://api.openai.com/v1/responses');
      const body = JSON.parse(request.body);
      assert.equal(body.model, 'test-model');
      assert.equal(body.store, false);
      assert.match(body.input[0].content[1].image_url, /^data:image\/png/);
      return Response.json({ status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text: JSON.stringify(details) }] }] });
    },
  });
  assert.deepEqual(await send(handler, 'POST', example, 'Bearer test-access'), [200, details]);
  details.findings[0].x = 1.5;
  assert.deepEqual(await send(handler, 'POST', example, 'Bearer test-access'), [502, { error: 'review-failed' }]);
});
