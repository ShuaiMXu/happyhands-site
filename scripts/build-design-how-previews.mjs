import { readFile, writeFile, mkdir, cp, readdir } from "node:fs/promises";
import { compile } from "@tailwindcss/node";
import path from "node:path";
const root = process.cwd();
const generated = path.join(root, "systems/preview/generated");
await mkdir(generated, { recursive: true });
const catalog = {};
async function files(dir) {
  const all = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (["lint", ".agents"].includes(entry.name)) continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) all.push(...(await files(file)));
    else if (/\.(tsx?|css)$/.test(entry.name)) all.push(file);
  }
  return all;
}
for (const system of ["sodium", "glaze", "quartz", "lime"]) {
  const source = path.join(
    root,
    "public/design-how",
    system,
    "src/registry",
    system,
  );
  const dest = path.join(generated, system);
  await cp(source, dest, { recursive: true });
  const sourceFiles = await files(source);
  const allCode =
    (await Promise.all(sourceFiles.map((f) => readFile(f, "utf8")))).join(
      "\n",
    ) +
    "\n" +
    (await readFile(path.join(root, "systems/preview/main.tsx"), "utf8"));
  let css = (await readFile(path.join(source, "styles.css"), "utf8")).replace(
    /^@source .*;\s*$/gm,
    "",
  );
  const compiler = await compile(css, { base: source, onDependency() {} });
  await writeFile(
    path.join(dest, "compiled.css"),
    compiler.build([
      ...new Set([
        ...(allCode.match(/[^\s"'`<>]+/g) || []),
        ...(allCode.match(/[^\s"'`<>]*\[[^\]\n]+\][^\s"'`<>]*/g) || []),
      ]),
    ]),
  );
  catalog[system] = { blocks: [] };
  for (const file of sourceFiles.filter(
    (f) => f.includes("/blocks/") && f.endsWith(".tsx"),
  )) {
    const text = await readFile(file, "utf8");
    const exports = [...text.matchAll(/export function (\w+)\([^)]*\)/g)].map(
      (m) => m[1],
    );
    for (const name of exports)
      catalog[system].blocks.push({ file: path.basename(file, ".tsx"), name });
  }
}
await writeFile(
  path.join(generated, "catalog.json"),
  JSON.stringify(catalog, null, 2),
);
console.log(
  "Built original design-system CSS and source preview modules for four systems.",
);
