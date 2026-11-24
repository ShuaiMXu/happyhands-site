import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';

const base = process.env.SITE_URL || 'http://127.0.0.1:4443';
const browser = await chromium.launch(process.env.BROWSER_PATH
  ? { executablePath: process.env.BROWSER_PATH } : { channel: 'chrome' });
const base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aR3sAAAAASUVORK5CYII=';
const file = { name: 'resource-catalog.png', mimeType: 'image/png', buffer: Buffer.from(base64, 'base64') };

async function open(page) {
  await page.goto(base + '/components/?provider=review');
  const frame = page.frameLocator('iframe[title="在线审查"]');
  await frame.getByRole('heading', { name: /你想审查什么/ }).waitFor();
  const surfaces = await frame.locator('html, body, main[data-beautiful-ui-harness], .review-conversation-pane').evaluateAll((nodes) =>
    nodes.map((element) => {
      const style = getComputedStyle(element);
      return [style.backgroundColor, style.backgroundImage];
    }),
  );
  assert.deepEqual(surfaces, Array.from({ length: 4 }, () => ['rgba(0, 0, 0, 0)', 'none']));
  const edge = await frame.locator('.review-conversation-pane').evaluate((element) => {
    const style = getComputedStyle(element);
    return [style.borderTopWidth, style.borderTopLeftRadius];
  });
  assert.deepEqual(edge, ['0px', '0px']);
  return frame;
}

try {
  const wide = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  wide.on('pageerror', (error) => errors.push(error.message));
  const offline = await open(wide);
  await offline.getByText('审查模型未连接').waitFor();
  await offline.getByRole('button', { name: 'Collapse sidebar' }).waitFor();
  await offline.getByRole('button', { name: 'Collapse sidebar' }).click();
  await offline.getByRole('button', { name: 'Expand sidebar' }).click();
  if (process.env.HH_REVIEW_SCREENSHOT) {
    await wide.locator('iframe[title="在线审查"]').screenshot({ path: process.env.HH_REVIEW_SCREENSHOT });
  }
  await offline.getByRole('textbox', { name: '审查指令' }).fill('检查首屏主操作是否清楚');
  await offline.getByRole('textbox', { name: '审查指令' }).press('Enter');
  const log = offline.getByRole('log');
  await log.getByText(/添加页面截图/).waitFor();
  await offline.getByRole('button', { name: '添加附件' }).click();
  const pickFile = wide.waitForEvent('filechooser');
  await offline.getByRole('button', { name: /添加截图/ }).click();
  await (await pickFile).setFiles(file);
  await offline.getByRole('button', { name: '发送指令' }).click();
  await log.getByText(/审查模型尚未连接/).waitFor();

  const phone = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  phone.on('pageerror', (error) => errors.push(error.message));
  const requests = [];
  const response = {
    summary: '主操作旁边有一处布局问题。',
    findings: [{ title: '主操作的位置', evidence: '按钮位于画面左侧。', recommendation: '对齐页面内容。', x: .2, y: .1 }],
  };
  let release;
  const pause = new Promise((resolve) => { release = resolve; });
  await phone.route('**/api/online-review', async (route) => {
    const request = route.request();
    if (request.method() === 'GET') return route.fulfill({ json: { enabled: true } });
    assert.equal(request.headers().authorization, 'Bearer local-test');
    requests.push(request.postDataJSON());
    await pause;
    return route.fulfill({ json: response });
  });
  const live = await open(phone);
  await live.getByRole('button', { name: /预览访问码/ }).click();
  await live.getByRole('dialog', { name: '预览访问码' }).getByLabel('预览访问码', { exact: true }).fill('local-test');
  await live.getByRole('button', { name: '完成', exact: true }).click();
  const mobileDraft = live.getByRole('textbox', { name: '审查指令' });
  await mobileDraft.fill('检查主要按钮');
  await mobileDraft.press('Shift+Enter');
  assert.equal(await mobileDraft.inputValue(), '检查主要按钮\n');
  await mobileDraft.press('Enter');
  await live.getByText(/请用输入框的/).waitFor();
  await live.locator('input[type=file]').setInputFiles(file);
  const first = phone.waitForResponse((item) => item.url().endsWith('/api/online-review') && item.request().method() === 'POST');
  await live.getByRole('button', { name: '发送指令' }).click();
  await live.getByRole('log').getByText('正在审查截图', { exact: true }).waitFor();
  release();
  await first;
  await live.getByText('1. 主操作的位置', { exact: true }).waitFor();
  assert.equal(requests[0].task, '检查主要按钮');
  assert.match(requests[0].image, /^data:image\/png;base64,/);
  await live.getByText('查看截图标注', { exact: true }).click();
  await live.getByRole('button', { name: '主操作的位置', exact: true }).waitFor();
  await mobileDraft.fill('只解释第一个问题');
  const second = phone.waitForResponse((item) => item.url().endsWith('/api/online-review') && item.request().method() === 'POST');
  await mobileDraft.press('Enter');
  await second;
  await live.getByText('1. 主操作的位置', { exact: true }).nth(1).waitFor();
  assert.equal(requests[1].task, '只解释第一个问题');
  assert.equal(requests[1].image, requests[0].image);
  assert.ok(requests[1].context.some(({ role, text }) => role === 'assistant' && text.includes(response.summary)));
  assert.equal(await live.locator('main[data-beautiful-ui-harness]').evaluate((element) => element.scrollWidth <= element.clientWidth + 1), true);
  await phone.getByRole('button', { name: 'English', exact: true }).click();
  const english = phone.frameLocator('iframe[title="Review online"]');
  await english.getByRole('log', { name: 'Review conversation' }).waitFor();
  await english.getByText('只解释第一个问题', { exact: true }).waitFor();
  assert.deepEqual(errors, []);
  console.log('Original Beautiful UI shell passed at 1280px and 390px. Local service offline path and fixture-backed responses both exercised.');
} finally {
  await browser.close();
}
