import { chromium } from "playwright-core";
import assert from "node:assert/strict";
import { writeFile, mkdir } from "node:fs/promises";
const browser = await chromium.launch({
    channel: process.env.BROWSER_CHANNEL || "chrome",
  }),
  results = [];
const base = process.env.SITE_URL || "http://127.0.0.1:4253";
await mkdir("test-results/studio-reference", { recursive: true });
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  await context.addInitScript(() => {
    try {
      localStorage.setItem("pd-lang", "zh");
      localStorage.setItem("hh-theme", "dark");
    } catch {}
  });
  const p = await context.newPage(),
    errors = [];
  p.on("pageerror", (e) => errors.push(e.message));
  await p.goto(base + "/apps/studio/");
  await p.locator(".controls").waitFor();
  await p
    .getByRole("textbox", { name: "项目名称", exact: true })
    .fill("Saved original");
  await p.waitForFunction(() => localStorage.getItem("hh-studio:my-product"));
  const original = await p.evaluate(
    () => JSON.parse(localStorage.getItem("hh-studio:my-product"))?.styles,
  );
  await p.goto(base + "/apps/studio/?design=figma-60793669");
  await p.waitForFunction(
    () =>
      location.search.includes("project=design-") &&
      !location.search.includes("design="),
  );
  await p.locator(".source-design-heading h2").waitFor();
  assert.equal(
    await p.locator(".source-design-heading h2").innerText(),
    "Figma",
  );
  const id = new URL(p.url()).searchParams.get("project");
  const draft = await p.evaluate(
    (id) => JSON.parse(localStorage.getItem("hh-studio:" + id)),
    id,
  );
  assert.equal(draft.styles.light.foreground, "#000000");
  assert.equal(draft.styles.light.card, "#ffffff");
  assert.equal(draft.styles.light.primary, "#4d49fc");
  assert.deepEqual(
    await p.evaluate(
      () => JSON.parse(localStorage.getItem("hh-studio:my-product")).styles,
    ),
    original,
  );
  await p
    .locator(".source-design-preview > img")
    .evaluate((img) => img.decode());
  assert.ok(
    await p
      .locator(".source-design-preview > img")
      .evaluate((e) => e.naturalWidth > 0),
  );
  const iframe = p.locator(".component-workbench iframe");
  await iframe.scrollIntoViewIfNeeded();
  let frame = await (await iframe.elementHandle()).contentFrame();
  await frame.locator(".runtime-overview").waitFor();
  assert.equal(
    await frame.locator(".runtime-grid > [data-slot=card]").count(),
    4,
  );
  const text = p.locator("#token-primary input:not([type=color])");
  await text.fill("#cc4400");
  await text.press("Enter");
  await iframe.scrollIntoViewIfNeeded();
  await frame.waitForFunction(
    () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim() === "#cc4400",
  );
  await p.getByRole("button", { name: "撤销", exact: true }).click();
  await frame.waitForFunction(
    () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim() === "#4d49fc",
  );
  await p.getByRole("button", { name: "重做", exact: true }).click();
  await frame.waitForFunction(
    () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim() === "#cc4400",
  );
  await p.locator(".component-workbench").scrollIntoViewIfNeeded();
  await p.screenshot({
    path: "test-results/studio-reference/figma-desktop.png",
  });
  await p.reload();
  await p.locator(".source-design-heading h2").waitFor();
  const stored = await p.evaluate(
    (id) => JSON.parse(localStorage.getItem("hh-studio:" + id)),
    id,
  );
  assert.equal(stored.styles.light.primary, "#cc4400");
  assert.equal(stored.designSource.name, "Figma");
  await p.setViewportSize({ width: 390, height: 844 });
  await p.waitForTimeout(350);
  assert.equal(
    await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
    false,
  );
  const mobileFrame = await (await iframe.elementHandle()).contentFrame();
  await mobileFrame.locator(".runtime-overview").waitFor();
  const rootHeight = await mobileFrame
    .locator("#component-root")
    .evaluate((e) => e.getBoundingClientRect().height);
  await p.waitForFunction(
    (h) =>
      document
        .querySelector(".component-workbench iframe")
        .getBoundingClientRect().height >=
      h + 40,
    rootHeight,
    { timeout: 3000 },
  );
  await iframe.evaluate((e) =>
    window.scrollTo(0, e.getBoundingClientRect().top + scrollY - 20),
  );
  await p.waitForTimeout(300);
  await p.screenshot({ path: "test-results/studio-reference/figma-phone.png" });
  results.push({
    flow: "Figma import / edit / undo / redo / reload / phone",
    originalPreserved: true,
    mappedColors: true,
    previewCards: 4,
    reloadPreserved: true,
    mobileOverflow: false,
  });
  await p.setViewportSize({ width: 1440, height: 1000 });
  const other = await context.newPage();
  await other.goto(base + "/guide/");
  await text.fill("#009900");
  await text.press("Enter");
  await other.evaluate((id) => {
    const key = "hh-studio:" + id;
    const data = JSON.parse(localStorage.getItem(key));
    data.project = "Updated in another window";
    data.revision++;
    localStorage.setItem(key, JSON.stringify(data));
  }, id);
  await p.getByRole("alert").filter({ hasText: "另一个窗口" }).waitFor();
  const external = await other.evaluate(
    (id) => localStorage.getItem("hh-studio:" + id),
    id,
  );
  await p.reload();
  await p.locator(".source-design-heading h2").waitFor();
  const reloaded = JSON.parse(
    await other.evaluate((id) => localStorage.getItem("hh-studio:" + id), id),
  );
  const expected = JSON.parse(external);
  assert.equal(reloaded.project, expected.project);
  assert.deepEqual(reloaded.styles, expected.styles);
  await other.close();
  results.push({
    flow: "cross-window conflict / reload",
    externalChangePreserved: true,
  });
  await p.route(
    "**/design-archive/figma-60793669/design-system.json",
    (route) => route.fulfill({ status: 503, body: "Unavailable" }),
  );
  await p.goto(base + "/apps/studio/?design=figma-60793669");
  await p.getByRole("alert").filter({ hasText: "未能接入" }).waitFor();
  assert.equal(await p.locator(".source-design-preview").count(), 0);
  await p.unroute("**/design-archive/figma-60793669/design-system.json");
  await p.getByRole("button", { name: "重试", exact: true }).click();
  await p.waitForFunction(() => location.search.includes("project=design-"));
  await p.locator(".source-design-heading h2").waitFor();
  assert.equal(
    await p.locator(".source-design-heading h2").innerText(),
    "Figma",
  );
  assert.notEqual(new URL(p.url()).searchParams.get("project"), id);
  assert.deepEqual(errors, []);
  results.push({
    flow: "failure / retry",
    recovered: true,
    newProject: true,
    errors,
  });
  await writeFile(
    "test-results/studio-reference/figma.json",
    JSON.stringify(results, null, 2),
  );
  console.log(JSON.stringify(results));
  await context.close();
} finally {
  await browser.close();
}
