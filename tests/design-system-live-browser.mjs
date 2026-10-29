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
            .getByText("This example could not render.", { exact: false })
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
          const examples = await page
            .locator('select[aria-label="Page example"] option')
            .evaluateAll((nodes) =>
              nodes.map((n) => ({ name: n.value, label: n.textContent })),
            );
          for (const example of examples) {
            await page.getByLabel("Page example").selectOption(example.name);
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
                "This example could not render.",
              ),
              `${system} ${example.name}`,
            );
            results.push({ system, example: example.name, passed: true });
          }
          assert.deepEqual(errors, []);
        }
        console.log(`Passed live ${system} ${width} ${theme}`);
        await context.close();
      }
  // The resource detail now opens the styled view and switches to complete docs.
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${base}/components/?provider=systems&system=lime`);
  await page.getByRole("tab", { name: "样式预览", exact: true }).waitFor();
  await page
    .frameLocator(".system-style-preview iframe")
    .getByRole("button", { name: "Save changes", exact: true })
    .waitFor();
  assert.equal(
    await page
      .getByRole("tab", { name: "样式预览", exact: true })
      .getAttribute("aria-selected"),
    "true",
  );
  await page.screenshot({
    path: `${folder}/library-lime-phone.png`,
    fullPage: true,
  });
  await page.getByRole("tab", { name: "规范文档", exact: true }).click();
  await page.locator(".design-how-prose").waitFor();
  await writeFile(`${folder}/results.json`, JSON.stringify(results, null, 2));
  console.log(`Passed ${results.length} preview and original block checks.`);
} finally {
  await browser.close();
}
