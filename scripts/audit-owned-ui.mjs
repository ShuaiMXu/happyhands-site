import { globSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import postcss from "postcss";
const files = [
  ...globSync("packages/ui/*.css"),
  ...globSync("components/*.css"),
  ...globSync("apps/studio/*.css"),
  "guide/style.css",
  "apps/portal/resource-feed.css",
  "apps/portal/hero-connect.css",
  "systems/happyhands/style.css",
  "systems/lime/style.css",
  "apps/designer/style.css",
];
const excludedFiles = new Map([
  [
    "packages/ui/system-example.css",
    "External design-system specimens use their adopted theme.",
  ],
  [
    "packages/ui/system-scenes.css",
    "External design-system scene renderer preserves its theme.",
  ],
  [
    "systems/lime/style.css",
    "Lime is an external, separately adopted design system.",
  ],
  [
    "apps/studio/component-examples.css",
    "Editable project-theme samples preserve selected tokens.",
  ],
  [
    "apps/designer/style.css",
    "Historical, read-only evidence UI; not the active local workbench.",
  ],
]);
const exceptions = [],
  findings = [];
for (const file of files) {
  if (excludedFiles.has(file)) {
    exceptions.push({ file, reason: excludedFiles.get(file) });
    continue;
  }
  const root = postcss.parse(readFileSync(file, "utf8"), { from: file });
  root.walkDecls((decl) => {
    const selector = decl.parent.selector ?? decl.parent.name ?? "";
    if (
      /theme-preview|sample-|\.serif-sample|\.swatch|\.foundation-type|\.token-color/.test(
        selector,
      )
    ) {
      return;
    }
    const add = (rule) =>
      findings.push({
        file,
        line: decl.source.start.line,
        selector,
        rule,
        value: decl.value,
      });
    if (
      ["font-size", "font"].includes(decl.prop) &&
      [...decl.value.matchAll(/(?:^|\s)(\d+(?:\.\d+)?)px\b/g)].some(
        (match) => Number(match[1]) < 12,
      )
    )
      add("minimum-text-12");
    if (
      /^border(?:-(?:top|right|bottom|left|block|inline)(?:-(?:start|end))?)?(?:-width)?$/.test(
        decl.prop,
      ) &&
      [...decl.value.matchAll(/(-?(?:\d*\.)?\d+)px\b/g)].some(
        (match) => Number(match[1]) > 0.5,
      )
    )
      add("hairline-border");
    if (
      /^transition(?:-property)?$/.test(decl.prop) &&
      /\ball\b/.test(decl.value)
    )
      add("explicit-transition-properties");
    if (
      /^(?:color|background(?:-color)?|border(?:-color)?|box-shadow)$/.test(
        decl.prop,
      ) &&
      /(#[\da-f]{3,8}\b|rgba?\(|\b(?:white|black)\b)/i.test(decl.value)
    )
      add("semantic-color");
  });
}
const result = {
  scope:
    "Owned website shells and controls. Hero identity preserved; approved setup controls and homepage feed included; source themes and historical evidence are explicitly separated.",
  filesScanned: files.length - excludedFiles.size,
  exceptions,
  findings,
};
mkdirSync("docs/audits", { recursive: true });
writeFileSync(
  "docs/audits/owned-ui.json",
  JSON.stringify(result, null, 2) + "\n",
);
console.log(
  JSON.stringify(
    {
      filesScanned: result.filesScanned,
      exceptions: exceptions.length,
      findings,
    },
    null,
    2,
  ),
);
if (findings.length) process.exitCode = 1;
