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
) {
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
      color(find(/card.*background|card.*surface|elevated.*surface/i)?.hex) ||
      bg;
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
    if (kind === "button")
      body = `<button style="${/ghost|outline|link/i.test(component.name) ? "background:transparent;color:var(--ink);border:.5px solid currentColor" : ""}">${label}<span aria-hidden="true"> ↗</span></button>`;
    if (kind === "input")
      body =
        '<form><label>Email address<input type="email" placeholder="you@example.com"></label><button type="button">Continue</button></form>';
    if (kind === "navigation")
      body =
        "<nav><strong>Brand</strong><a>Product</a><a>About</a><button>Get started</button></nav>";
    if (kind === "badge") body = `<span class="badge">${label}</span>`;
    if (kind === "card")
      body = `<article><h2>${label}</h2><p>${escape(component.role)}</p></article>`;
    if (kind === "section")
      body = `<section><h2>${label}</h2><p>${escape(component.role)}</p></section>`;
  }
  // Original HTML is inert and network-isolated. Never grant scripts, forms or origin access.
  return `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:; form-action 'none'; base-uri 'none'"><meta name="viewport" content="width=device-width,initial-scale=1"><style>:root{--canvas:${bg};--ink:${fg};--accent:${accent};--surface:${surface}}*{box-sizing:border-box}body{margin:0;min-height:100vh;padding:28px;background:var(--canvas);color:var(--ink);font:14px/1.6 system-ui;display:grid;place-items:center}button{font:inherit;padding:12px 20px;border:0;border-radius:${radius};background:var(--accent);color:${actionText};cursor:pointer}h2{font-size:24px;line-height:1.2;margin:0 0 16px}p{margin:0 0 20px;max-width:42ch}article{background:var(--surface);padding:${cardPadding};border:${cardBorder};border-radius:${cardRadius}}nav{display:flex;align-items:center;gap:20px;flex-wrap:wrap}nav strong{margin-right:auto}form{display:flex;align-items:end;gap:12px;flex-wrap:wrap}label{display:grid;gap:8px}input{font:inherit;max-width:100%;padding:12px;background:transparent;color:var(--ink);border:.5px solid currentColor;border-radius:${radius}}.badge{padding:6px 14px;border:.5px solid currentColor;border-radius:${radius}}section{padding-block:12px}a{color:inherit}button:focus-visible,input:focus-visible{outline:2px solid currentColor;outline-offset:3px}</style></head><body inert>${body}</body></html>`;
}
