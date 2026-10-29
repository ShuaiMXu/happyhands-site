import type { ReferenceSystem } from "./ReferenceSpecimen";
export type ReferenceComponent = {
  name: string;
  role: string;
  description: string;
  html?: string;
};
const escape = (v: unknown) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
const color = (v?: string) =>
  /^#(?:[a-f\d]{3}|[a-f\d]{4}|[a-f\d]{6}|[a-f\d]{8})$/i.test(v || "")
    ? v
    : undefined;
export function componentPreviewKind(name: string) {
  if (/input|search|field|capture|form/i.test(name)) return "input";
  if (/navigation.*link/i.test(name) && !/bar|header/i.test(name))
    return "button";
  if (/navigation|navbar|top.bar|header/i.test(name)) return "navigation";
  if (/hero|section|banner|footer|container|block/i.test(name))
    return "section";
  if (/button|cta|link/i.test(name)) return "button";
  if (/badge|tag|chip|pill/i.test(name)) return "badge";
  if (/card|panel|tile/i.test(name)) return "card";
  return null;
}
export function buildComponentPreview(
  component: ReferenceComponent,
  system: ReferenceSystem,
  lang = "en",
) {
  const t = (zh: string, en: string) => (lang === "zh" ? zh : en);
  const colors = system.colors || [],
    find = (pattern: RegExp) =>
      colors.find((c) => pattern.test(c.role + " " + c.name));
  const dark = system.theme === "dark",
    bg =
      color(find(/canvas|page background|base background/i)?.hex) ||
      (dark ? "#171717" : "#fafafa"),
    fg =
      color(find(/primary text|body text|text.*primary/i)?.hex) ||
      (dark ? "#fafafa" : "#171717"),
    accent =
      color(colors.find((c) => c.group === "brand")?.hex) ||
      color(find(/primary action|primary (?:cta|button)|accent color/i)?.hex) ||
      fg,
    surface =
      color(
        find(/card.*background|card.*surface|elevated.*surface|graphite card/i)
          ?.hex,
      ) || bg;
  const radius =
    String(system.spacing?.radius?.buttons || "4px").match(
      /^\d+(?:\.\d+)?px$/,
    )?.[0] || "4px";
  const rgb = (accent || "#171717").replace("#", "");
  const expanded =
    rgb.length <= 4
      ? rgb
          .slice(0, 3)
          .split("")
          .map((c) => c + c)
          .join("")
      : rgb.slice(0, 6);
  const luminance = [0, 2, 4]
    .map((i) => parseInt(expanded.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    .reduce((n, c, i) => n + c * [0.2126, 0.7152, 0.0722][i], 0);
  const actionText = luminance > 0.179 ? "#171717" : "#ffffff";
  const cardRadius =
    String(system.spacing?.radius?.cards || "4px").match(
      /^\d+(?:\.\d+)?px$/,
    )?.[0] || "4px";
  const cardPadding =
    String(system.spacing?.cardPadding || "24px").match(
      /^\d+(?:\.\d+)?px$/,
    )?.[0] || "24px";
  const cardBorder = /no border|borderless|zero border/i.test(
    component.description,
  )
    ? "0"
    : ".5px solid currentColor";
  const label = escape(component.name),
    kind = componentPreviewKind(component.name);
  let body = component.html || "";
  if (!body) {
    if (!kind) return null;
    const action = escape(t("继续", "Continue"));
    const sample = escape(t("示例项目", "Sample project"));
    if (kind === "button") {
      const variant = /ghost|outline|link/i.test(component.name)
        ? 'class="secondary"'
        : "";
      body = `<div class="state-grid">${[
        [t("默认", "Default"), `<button ${variant}>${action} ↗</button>`],
        [
          t("键盘聚焦", "Keyboard focus"),
          `<button ${variant} style="outline:2px solid var(--accent);outline-offset:4px">${action} ↗</button>`,
        ],
        [
          t("处理中", "Working"),
          `<button ${variant}>◌ ${escape(t("处理中", "Working"))}</button>`,
        ],
        [
          t("不可用", "Disabled"),
          `<button ${variant} disabled>${action} ↗</button>`,
        ],
      ]
        .map(
          ([title, content]) =>
            `<div class="sample"><small>${title}</small>${content}</div>`,
        )
        .join("")}</div>`;
    }
    if (kind === "input")
      body = `<div class="field-stack"><form><label>${t("邮箱地址", "Email address")}<input type="email" placeholder="you@example.com"></label><button type="button">${action}</button></form><label>${t("已填写", "Filled")}<input value="alex@example.com" readonly></label><label>${t("聚焦示例", "Focus example")}<input placeholder="you@example.com" style="outline:2px solid var(--accent);outline-offset:3px"></label><small>${t("填写邮箱以继续。", "Enter your email to continue.")}</small></div>`;
    if (kind === "navigation")
      body = `<div class="nav-example"><nav><strong>Brand</strong><a>${t("产品", "Product")}</a><a>${t("资源", "Resources")}</a><a>${t("关于", "About")}</a><button>${t("开始使用", "Get started")}</button></nav><div class="nav-context"><h2>${sample}</h2><p>${escape(component.role)}</p><div class="placeholder-lines"><i></i><i></i></div></div></div>`;
    if (kind === "badge")
      body = `<div class="state-grid"><div class="sample"><small>${t("默认", "Default")}</small><span class="badge">${label}</span></div><div class="sample"><small>${t("强调", "Emphasis")}</small><span class="badge accent">${label}</span></div></div>`;
    if (kind === "card")
      body = `<div class="card-grid"><article><small>01</small><h2>${sample}</h2><p>${escape(component.role)}</p><div class="placeholder-lines"><i></i><i></i></div></article><article><small>02</small><h2>${t("项目概览", "Project overview")}</h2><p>${escape(component.role)}</p><div class="placeholder-lines"><i></i><i></i></div></article></div>`;
    if (kind === "section") {
      if (/hero/i.test(component.name))
        body = `<section class="hero-example"><h2>${label}</h2><p>${escape(component.role)}</p><form><label><span>${t("邮箱地址", "Email address")}</span><input placeholder="you@example.com"></label><button>${action}</button></form></section>`;
      else if (/footer|disclaimer/i.test(component.name))
        body = `<section class="footer-example"><div class="footer-links"><strong>Brand</strong><a>${t("产品", "Product")}</a><a>${t("关于", "About")}</a><a>${t("联系", "Contact")}</a></div><p>${escape(component.role)}</p><small>${t("说明文字示例", "Example supporting text")}</small></section>`;
      else
        body = `<section class="layout-example"><h2>${label}</h2><p>${escape(component.role)}</p><div class="card-grid"><article><h3>${t("主要内容", "Primary content")}</h3><div class="placeholder-lines"><i></i><i></i></div></article><article><h3>${t("相关内容", "Related content")}</h3><div class="placeholder-lines"><i></i><i></i></div></article></div></section>`;
    }
  }
  // Original HTML is inert and network-isolated. Never grant scripts, forms or origin access.
  return `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:; form-action 'none'; base-uri 'none'"><meta name="viewport" content="width=device-width,initial-scale=1"><style>:root{--canvas:${bg};--ink:${fg};--accent:${accent};--surface:${surface}}*{box-sizing:border-box}body{margin:0;min-height:100vh;padding:28px;background:var(--canvas);color:var(--ink);font:14px/1.6 system-ui;display:grid;place-items:center}button{font:inherit;padding:12px 20px;border:0;border-radius:${radius};background:var(--accent);color:${actionText};cursor:pointer}h2{font-size:24px;line-height:1.2;margin:0 0 16px}p{margin:0 0 20px;max-width:42ch}article{background:var(--surface);padding:${cardPadding};border:${cardBorder};border-radius:${cardRadius}}nav{display:flex;align-items:center;gap:20px;flex-wrap:wrap}nav strong{margin-right:auto}form{display:flex;align-items:end;gap:12px;flex-wrap:wrap}label{display:grid;gap:8px}input{font:inherit;max-width:100%;padding:12px;background:transparent;color:var(--ink);border:.5px solid currentColor;border-radius:${radius}}.badge{padding:6px 14px;border:.5px solid currentColor;border-radius:${radius}}section{padding-block:12px}a{color:inherit}button:focus-visible,input:focus-visible{outline:2px solid currentColor;outline-offset:3px}.state-grid,.card-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;width:100%;max-width:760px}.sample{display:flex;flex-direction:column;align-items:flex-start;gap:16px;padding:12px 0}small{display:block;font-size:12px;opacity:.7}button:disabled{opacity:.4}button.secondary{background:transparent;color:var(--ink);border:.5px solid currentColor}.field-stack{display:grid;gap:20px;width:100%;max-width:600px}.field-stack input{width:100%;min-width:0}form label{flex:1;min-width:160px}form input{width:100%}.nav-example,.layout-example,.footer-example{width:100%}.nav-context{padding-top:40px}.placeholder-lines{display:grid;gap:12px;margin-top:24px}.placeholder-lines i{display:block;height:8px;background:var(--ink);opacity:.1}.placeholder-lines i:last-child{width:64%}.card-grid article{min-width:0}.card-grid h2{margin-top:16px}.card-grid p{font-size:14px}.accent{background:var(--accent);color:${actionText}}.hero-example{width:100%;text-align:center;max-width:680px;padding-block:40px}.hero-example p{margin:16px auto 28px}.hero-example h2{font-size:36px}.hero-example form{text-align:left;justify-content:center}.footer-links{display:flex;gap:24px;flex-wrap:wrap;margin-bottom:32px}h2,h3,p{overflow-wrap:anywhere}.footer-example{border-top:.5px solid currentColor;padding-top:32px}@media(max-width:480px){body{padding:20px}.card-grid{grid-template-columns:1fr;gap:16px}.card-grid article{padding:20px}.card-grid h2{font-size:20px}.hero-example h2{font-size:28px}.state-grid{gap:16px}button{padding:10px 14px}nav{gap:12px}.hero-example{padding-block:12px}}</style></head><body inert>${body}</body></html>`;
}
