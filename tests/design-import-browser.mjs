import { chromium } from "playwright-core";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.SITE_URL || "http://127.0.0.1:4216";
const dir = "test-results/design-import";
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
try {
  for (const width of [390, 768, 1440])
    for (const theme of ["light", "dark"])
      for (const lang of ["zh", "en"]) {
        const context = await browser.newContext({
          viewport: { width, height: 960 },
          colorScheme: theme,
          reducedMotion: "reduce",
        });
        await context.addInitScript(
          ({ theme, lang }) => {
            if (window !== window.top) return;
            localStorage.setItem("hh-theme", theme);
            localStorage.setItem("pd-lang", lang);
            Object.defineProperty(navigator, "clipboard", {
              configurable: true,
              value: {
                writeText: async (text) => {
                  window.copied = text;
                },
              },
            });
          },
          { theme, lang },
        );
        const page = await context.newPage();
        const errors = [];
        page.on("pageerror", (e) => errors.push(e.message));
        const check = async () => {
          assert.ok(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
            "page fits viewport",
          );
          assert.deepEqual(errors, []);
        };
        await page.goto(`${base}/components/?provider=systems`);
        await page.locator(".system-cover-navigation a").last().waitFor();
        assert.equal(
          await page.locator(".system-cover-navigation a").count(),
          5,
        );
        await page.screenshot({
          path: `${dir}/systems-${width}-${theme}-${lang}.png`,
          fullPage: true,
        });
        await check();
        await page.getByRole("link", { name: /Sodium/ }).click();
        await page.locator(".design-how-prose").waitFor();
        await page.screenshot({
          path: `${dir}/sodium-${width}-${theme}-${lang}.png`,
          fullPage: true,
        });
        await check();
        if (width < 900)
          await page.locator(".design-how-directory summary").click();
        await page.locator(".design-how-search input").fill("button");
        await page
          .locator(".design-how-group a")
          .filter({ hasText: /^Button$/ })
          .click();
        await page.locator(".design-how-prose").waitFor();
        assert.match(
          await page.locator(".design-how-install code").innerText(),
          /happyhands.cc\/r\/sodium\/button.json/,
        );
        await page
          .getByRole("button", {
            name: lang === "zh" ? "复制 Markdown" : "Copy Markdown",
            exact: true,
          })
          .click();
        assert.ok(
          (await page.evaluate(() => window.copied)).includes("# Button"),
        );
        await check();
        await page.reload();
        await page.locator(".design-how-prose").waitFor();
        assert.equal(
          await page.locator(".design-how-document > header h2").innerText(),
          "Button",
        );
        await page.screenshot({
          path: `${dir}/button-${width}-${theme}-${lang}.png`,
          fullPage: true,
        });
        // Error recovery keeps the selected document and exposes a retry action.
        await page.route("**/design-how/sodium/components/button.md", (route) =>
          route.fulfill({ status: 503, body: "Unavailable" }),
        );
        await page.reload();
        await page.locator(".design-how-document [role=alert]").waitFor();
        await page.unroute("**/design-how/sodium/components/button.md");
        await page.locator(".design-how-document [role=alert] button").click();
        await page.locator(".design-how-prose").waitFor();
        await page.goto(
          `${base}/components/?provider=systems&system=glaze&doc=guides%2Ftool-call-ui-rules.md`,
        );
        await page.locator(".design-how-prose").waitFor();
        await check();
        await page.goto(
          `${base}/components/?provider=design-md&design=dot-connect-981d90e9`,
        );
        await page.locator(".reference-specimen").waitFor();
        await page.waitForFunction(
          () =>
            document
              .querySelector(".resource-export pre")
              ?.getAttribute("aria-busy") === "false",
        );
        await check();
        await page
          .getByRole("tab", { name: "Design JSON", exact: true })
          .click();
        await page.waitForFunction(() =>
          document
            .querySelector(".resource-export pre")
            ?.textContent.includes("northStar"),
        );
        await page.screenshot({
          path: `${dir}/archive-${width}-${theme}-${lang}.png`,
          fullPage: true,
        });
        for (const path of [
          "/r/sodium/button.json",
          "/r/glaze/theme.json",
          "/design-how/quartz.zip",
          "/design-how/lime/index.md",
        ]) {
          const response = await context.request.get(base + path);
          assert.equal(response.status(), 200, path);
        }
        console.log(`Passed ${width} ${theme} ${lang}`);
        results.push({ width, theme, lang, passed: true });
        await context.close();
      }
  // Standalone new systems and existing system entry links.
  const page = await browser.newPage();
  for (const system of ["sodium", "glaze"]) {
    await page.goto(`${base}/systems/${system}/`);
    await page.locator(".design-how-prose").waitFor();
    assert.equal(
      await page.locator("main > h1").innerText(),
      system[0].toUpperCase() + system.slice(1),
    );
  }
  for (const system of ["quartz", "lime"]) {
    await page.goto(`${base}/systems/${system}/`);
    assert.ok(
      (await page
        .locator(`a[href="/components/?provider=systems&system=${system}"]`)
        .count()) > 0,
    );
  }
  await writeFile(`${dir}/results.json`, JSON.stringify(results, null, 2));
  console.log(
    `Passed ${results.length} viewport/theme/language combinations, document copy, reload, error recovery, data routes and standalone system entries.`,
  );
} finally {
  await browser.close();
}
