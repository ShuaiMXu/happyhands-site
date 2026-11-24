import { chromium } from "playwright-core";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.SITE_URL || "http://127.0.0.1:4216";
const folder = "test-results/design-system-live";
await mkdir(folder, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
try {
  for (const system of ["sodium", "glaze", "quartz", "lime"])
    for (const width of [390, 1280])
      for (const theme of ["light", "dark"]) {
        const context = await browser.newContext({
          viewport: { width, height: 900 },
          reducedMotion: "reduce",
        });
        const page = await context.newPage();
        const errors = [];
        page.on("pageerror", (e) => errors.push(e.message));
        await page.goto(
          `${base}/systems/preview/?system=${system}&theme=${theme}`,
        );
        await page.locator(".demo-root").waitFor();
        await page
          .getByRole("button", { name: "Save changes", exact: true })
          .waitFor();
        await page
          .getByRole("button", { name: "Save changes", exact: true })
          .click();
        await page
          .getByRole("button", { name: "Saved", exact: true })
          .waitFor();
        await page
          .getByRole("textbox", { name: "Project name", exact: true })
          .fill("New project");
        const toggle = page.getByRole("switch", { name: "Automatic updates" });
        await toggle.click();
        await assert.equal(await toggle.getAttribute("aria-checked"), "false");
        await page.getByRole("tab", { name: "Activity", exact: true }).click();
        await page
          .getByText("Your changes have been saved.", { exact: true })
          .waitFor();
        await page
          .getByRole("button", { name: "Open dialog", exact: true })
          .click();
        await page.getByRole("dialog").waitFor();
        await page.keyboard.press("Escape");
        await page.getByRole("dialog").waitFor({ state: "hidden" });
        await page
          .getByRole("button", { name: "Open popover", exact: true })
          .click();
        await page
          .getByText("A useful detail, beside its action.", { exact: true })
          .waitFor();
        await page.keyboard.press("Escape");
        assert.equal(
          await page.locator("body").getAttribute("data-theme"),
          theme,
        );
        assert.ok(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          "responsive preview",
        );
        assert.equal(
          await page
            .getByText("Could not load the example.", { exact: false })
            .count(),
          0,
        );
        await page.screenshot({
          path: `${folder}/${system}-${width}-${theme}.png`,
          fullPage: true,
        });
        assert.deepEqual(errors, []);
        results.push({ system, width, theme, passed: true });
        if (width === 1280 && theme === "light") {
          const picker = page.getByRole("combobox", { name: "Scenario", exact: true });
          await picker.press("Enter");
          const list = page.getByRole("listbox");
          const examples = await list.getByRole("option").allTextContents();
          assert.ok(examples.length > 1);
          await page.keyboard.press("Escape");
          await list.waitFor({ state: "hidden" });
          for (const example of examples) {
            await picker.press("Enter");
            await list.getByRole("option", { name: example, exact: true }).click();
            await page.waitForTimeout(120);
            await page.locator(".demo-block").evaluate(async (node) => {
              for (
                let i = 0;
                i < 40 && node.textContent.includes("Loading preview");
                i++
              )
                await new Promise((r) => setTimeout(r, 50));
            });
            assert.ok(
              !(await page.locator(".demo-block").innerText()).includes(
                "Could not load the example.",
              ),
              `${system} ${example}`,
            );
            results.push({ system, example, passed: true });
          }
          assert.deepEqual(errors, []);
        }
        console.log(`Passed live ${system} ${width} ${theme}`);
        await context.close();
      }
  // Verify the same picker inside the resource detail's live preview.
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${base}/components/?provider=systems&resource=collection%3Abrand-systems%2Fmeridian-glass%2Findex.md#system-preview`);
  const preview = page.frameLocator("#system-preview iframe");
  const picker = preview.getByRole("combobox", { name: "示例场景", exact: true });
  await preview.getByText("Build a returns agent for our shoe store.", { exact: true }).waitFor();
  const waitForPreviewResize = async () => {
    await page.waitForFunction(() => {
      const frame = document.querySelector("#system-preview iframe");
      const size = frame?.contentDocument?.querySelector(".demo-root")?.getBoundingClientRect().height;
      return size && Math.abs(frame.clientHeight - Math.max(200, size)) <= 2;
    });
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  };
  await waitForPreviewResize();
  await picker.press("Enter");
  const options = preview.getByRole("listbox");
  await options.getByRole("option", { name: "代理计划", exact: true, selected: true }).waitFor();
  await page.keyboard.press("ArrowDown");
  const focused = options.locator('[role="option"]:focus');
  await focused.filter({ hasText: "代理执行流程" }).waitFor();
  await page.keyboard.press("Enter");
  await options.waitFor({ state: "hidden" });
  assert.equal(await picker.innerText(), "代理执行流程");
  await preview.locator(".demo-block > :not([role=status])").first().waitFor();
  assert.equal(await preview.locator(".demo-block [role=alert]").count(), 0);
  await waitForPreviewResize();
  await picker.press("Enter");
  await options.waitFor();
  await page.keyboard.press("Escape");
  await options.waitFor({ state: "hidden" });
  await page.waitForFunction(() => {
    const doc = document.querySelector("#system-preview iframe")?.contentDocument;
    return doc?.activeElement?.matches(".hh-preview-scenario [data-slot=select-trigger]");
  });
  await page.screenshot({ path: `${folder}/meridian-glass-phone.png` });
  await writeFile(`${folder}/results.json`, JSON.stringify(results, null, 2));
  console.log(`Passed ${results.length} preview and original block checks.`);
} finally {
  await browser.close();
}
