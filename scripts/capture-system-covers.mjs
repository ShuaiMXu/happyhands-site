// Capture real source components and theme tokens; never redraw third-party UI.
// Run against the built local site: SITE_URL=http://127.0.0.1:4216 node scripts/capture-system-covers.mjs
import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";
const base = process.env.SITE_URL || "http://127.0.0.1:4216";
await mkdir("public/system-covers", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const id of ["happyhands", "quartz", "lime", "sodium", "glaze"]) {
    const page = await browser.newPage({
      viewport: { width: 1000, height: 625 },
      deviceScaleFactor: 1.5,
      reducedMotion: "reduce",
    });
    await page.goto(
      `${base}${id === "happyhands" ? "/systems/happyhands/?lang=en" : `/systems/preview/?system=${id}&theme=light`}`,
    );
    await page
      .locator(
        id === "happyhands" ? ".system-example" : ".demo-block > :not(p)",
      )
      .first()
      .waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate((id) => {
      const owned = id === "happyhands";
      const source = document.querySelector(
        owned ? ".system-example" : ".demo-block > :not(p)",
      );
      const buttons = document.querySelector(
        owned ? "#components .actions" : ".demo-row",
      );
      const swatches = owned
        ? [
            "--hh-bg-raised",
            "--hh-bg-sunken",
            "--hh-line",
            "--hh-ink-muted",
            "--hh-ink",
          ]
        : [...document.querySelectorAll(".demo-swatches i")]
            .slice(0, 6)
            .map((el) => el.style.background);
      const stage = document.createElement("div");
      stage.id = "cover-stage";
      stage.innerHTML =
        '<div class="cover-specimen"><div class="cover-type">Aa</div><div class="cover-alphabet">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789</div><div class="cover-palette"></div><div class="cover-controls"></div></div><div class="cover-interface"></div>';
      for (const color of swatches) {
        const chip = document.createElement("i");
        chip.style.background = owned ? `var(${color})` : color;
        stage.querySelector(".cover-palette").append(chip);
      }
      for (const button of [...buttons.children].slice(0, 2))
        stage.querySelector(".cover-controls").append(button.cloneNode(true));
      stage.querySelector(".cover-interface").append(source);
      document.body.append(stage);
      const css = document.createElement("style");
      css.textContent = `body > :not(#cover-stage){display:none!important} body{overflow:hidden!important} #cover-stage{width:1000px;height:625px;box-sizing:border-box;display:grid;grid-template-columns:280px 1fr;gap:46px;align-items:center;padding:48px;background:var(--page,var(--surface-page,var(--hh-bg)))} .cover-type{font-size:132px;line-height:1.05;letter-spacing:-.065em;font-weight:500;margin-bottom:28px}.cover-alphabet{font-size:14px;line-height:1.8;letter-spacing:.035em;color:var(--text-2,var(--hh-ink-muted))}.cover-palette{display:flex;margin-top:28px;margin-bottom:32px;gap:8px}.cover-palette i{display:block;width:36px;height:44px;border:.5px solid var(--line,var(--hh-line));border-radius:0}.cover-controls{display:flex;gap:8px;flex-wrap:wrap}.cover-interface{min-width:0;display:flex;align-items:center;justify-content:center}.cover-interface > *{flex-shrink:0;width:100%;max-width:100%}.cover-interface .system-example{margin:0;width:100%;font-size:14px}.cover-interface .example-top{display:none}.cover-interface .system-example h2{font-size:24px}.cover-interface .system-example p{font-size:14px}`;
      if (id === "sodium")
        css.textContent +=
          ".cover-interface > *{width:800px;max-width:none;transform:scale(.69);transform-origin:center}";
      document.head.append(css);
    }, id);
    await page.screenshot({
      path: `public/system-covers/${id}.png`,
      animations: "disabled",
    });
    await page.close();
  }
} finally {
  await browser.close();
}
