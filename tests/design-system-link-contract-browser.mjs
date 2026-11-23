import assert from "node:assert/strict";
import { chromium } from "playwright-core";

const base = process.env.SITE_URL || "http://127.0.0.1:4216";
const consumers = [
  { url: "/components/?provider=systems&system=quartz", system: "quartz" },
  { url: "/systems/glaze/", system: "glaze" },
];
const browser = await chromium.launch({ channel: "chrome", headless: true });
let checked = 0;
try {
  for (const { url, system } of consumers) {
    for (const width of [390, 1440]) {
      const page = await browser.newPage({
        viewport: { width, height: 900 },
        reducedMotion: "reduce",
      });
      try {
        await page.goto(new URL(url, base).href);
        const links = [
          {
            locator: page.locator(".system-book-preview-actions a"),
            label: "独立打开预览",
            href: `/systems/preview/?system=${system}`,
          },
          {
            locator: page.locator('.system-book-download-actions a[href^="https://design.how/"]'),
            label: "design.how",
            href: `https://design.how/systems/${system}`,
          },
        ];
        for (const { locator, label, href } of links) {
          await locator.waitFor({ state: "visible" });
          assert.equal(await locator.innerText(), label, `${system}, ${width}: plain link label`);
          assert.equal(await locator.getAttribute("href"), href);
          assert.equal(await locator.getAttribute("target"), "_blank");
          await locator.focus();
          await page.keyboard.press("Shift+Tab");
          await page.keyboard.press("Tab");
          assert.ok(await locator.evaluate(node => node === document.activeElement && node.matches(":focus-visible")));
          checked++;
        }
      } finally {
        await page.close();
      }
    }
  }
} finally {
  await browser.close();
}
console.log(`${checked} rendered links preserve labels, destinations and keyboard focus.`);
