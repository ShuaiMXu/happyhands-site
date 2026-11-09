import {hostedDocument, registryVersion} from "./hosted-document.mjs";
import { zipEntries } from "./registry-zip.mjs";
// Preserve executable component source; adapt only opt-in Skill navigation and install URLs.
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
const root = resolve(import.meta.dirname, "../public"),
  base = "https://happyhands.cc",
  upstream = "https://design.how";
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
const encode = (v) => JSON.stringify(v, null, 2) + "\n";
const files = [];
async function publish(path, bytes) {
  await mkdir(resolve(root, path, ".."), { recursive: true });
  await writeFile(resolve(root, path), bytes);
  files.push({ path, sha256: sha(bytes), bytes: Buffer.byteLength(bytes) });
}
function hosted(value) {
  if (Array.isArray(value)) return value.map(hosted);
  if (value && typeof value === "object") {
    const result = {};
    for (const [key, item] of Object.entries(value)) {
      if (key === "files") result[key] = item;
      else if (
        ["docs", "page"].includes(key) &&
        typeof item === "string" &&
        item.startsWith(upstream + "/systems/")
      ) {
        let path = item
          .slice((upstream + "/systems/").length)
          .replace(/\.md$/, "")
          .replace(/\/$/, "");
        if (!path.includes("/")) path += "/index";
        result[key] = `${base}/systems/${path}.md`;
      } else result[key] = hosted(item);
    }
    return result;
  }
  if (typeof value !== "string") return value;
  return value
    .replaceAll(upstream + "/r/", base + "/r/")
    .replaceAll(upstream + "/systems/", base + "/systems/");
}
// Verify the pinned archive before adapting or packaging any third-party input.
for (const entry of JSON.parse(
  await readFile(resolve(root, "design-how/manifest.json"), "utf8"),
)) {
  if (
    !entry.path.startsWith("design-how/") ||
    entry.path.includes("..") ||
    sha(await readFile(resolve(root, entry.path))) !== entry.sha256
  )
    throw Error("Archived source integrity failure: " + entry.path);
}
const aggregate = [];
for (const system of ["quartz", "lime", "glaze", "sodium"]) {
  const original = JSON.parse(
    await readFile(
      resolve(root, `design-how/${system}/registry/index.json`),
      "utf8",
    ),
  );
  const names = new Set();
  for (const item of original.items) {
    if (!/^[a-z][a-z0-9-]{0,80}$/.test(item.name) || names.has(item.name))
      throw Error("Invalid registry item name");
    names.add(item.name);
    const path = `design-how/${system}/registry/items/${item.name}.json`,
      source = await readFile(resolve(root, path));
    const payload = hosted(JSON.parse(source));
    if (item.name === "skill") payload.files = payload.files.map(file => ({...file, content: hostedDocument(file.content)}));
    if (item.name === "theme")
      payload.registryDependencies = (
        payload.registryDependencies || []
      ).filter((dep) => dep !== `${base}/r/${system}/skill.json`);
    payload.meta = {
      ...payload.meta,
      happyhands: {
        version: registryVersion,
        source: path,
        sourceSha256: sha(source),
        adaptation:
          "hosted metadata and opt-in Skill links; executable component source preserved",
      },
    };
    await publish(`r/${system}/${item.name}.json`, encode(payload));
    const alias = {
      name: `${system}-${item.name}`,
      type: "registry:item",
      title: `${system} / ${item.title || item.name}`,
      description: item.description || `${system} ${item.name}`,
      registryDependencies: [`${base}/r/${system}/${item.name}.json`],
      meta: { system, item: item.name, version: registryVersion },
    };
    aggregate.push(alias);
    await publish(`r/${alias.name}.json`, encode(alias));
  }
  const index = hosted(original);
  index.homepage = `${base}/systems/${system}/`;
  // Keep index metadata and item payload dependencies synchronized.
  index.items = index.items.map((item) =>
    item.name === "theme"
      ? {
          ...item,
          registryDependencies: (item.registryDependencies || []).filter(
            (dep) => dep !== `${base}/r/${system}/skill.json`,
          ),
        }
      : item,
  );
  await publish(`r/${system}/registry.json`, encode(index));
  // sourceHash remains the upstream fingerprint; publishedHash has a separate boundary.
  if (["quartz", "lime"].includes(system)) {
    const path = resolve(root, `../systems/${system}/catalog.json`),
      catalog = JSON.parse(await readFile(path, "utf8"));
    catalog.sourceHashKind = "upstream-registry-bytes";
    catalog.publishedHash = sha(
      await readFile(resolve(root, `r/${system}/registry.json`)),
    );
    await writeFile(path, encode(catalog));
  }
  const walk = async (folder, prefix = "") => {
    for (const entry of await readdir(folder, { withFileTypes: true })) {
      const relative = prefix + entry.name;
      if (entry.isDirectory())
        await walk(resolve(folder, entry.name), relative + "/");
      else if (
        entry.name.endsWith(".md") &&
        (relative === "index.md" ||
          relative.startsWith("components/") ||
          relative.startsWith("foundations/"))
      )
        await publish(
          `systems/${system}/${relative}`,
          hostedDocument(await readFile(resolve(folder, entry.name), "utf8")),
        );
    }
  };
  await walk(resolve(root, `design-how/${system}`));
}
// Reading guides are published adaptations too; originals remain in design-how/.
for (const section of ['guides','articles']) {
 for(const name of await readdir(resolve(root,`design-how/${section}`))) {
  if(name.endsWith('.md'))await publish(`systems/${section}/${name}`,hostedDocument(await readFile(resolve(root,`design-how/${section}/${name}`),'utf8')));
 }
}
// Archives expose the same hosted install payloads while retaining original source folders.
for (const system of ["quartz", "lime", "glaze", "sodium"]) {
  const entries = [];
  async function add(folder, prefix) {
    for (const entry of (await readdir(folder, { withFileTypes: true })).sort(
      (a, b) => a.name.localeCompare(b.name),
    )) {
      if (entry.isDirectory())
        await add(resolve(folder, entry.name), prefix + entry.name + "/");
      else
        entries.push([
          prefix + entry.name,
          await readFile(resolve(folder, entry.name)),
        ]);
    }
  }
  await add(resolve(root, `design-how/${system}`), system + "/");
  await add(resolve(root, `r/${system}`), `r/${system}/`);
  await publish(`design-how/${system}.zip`, zipEntries(entries));
}
const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "happyhands",
  homepage: base,
  items: aggregate,
};
await publish("r/registry.json", encode(registry));
await publish("r/index.json", encode(registry));
await publish('r/README.md', `# HappyHands registry

Current adaptation: ${registryVersion}. Original sources remain archived under /design-how/.

Install a pinned component:

\`npx shadcn@latest add https://happyhands.cc/r/v/${registryVersion}/quartz/button.json\`

Opt-in hosted Skill (both agent clients):

\`npx shadcn@latest add https://happyhands.cc/r/v/${registryVersion}/quartz/skill.json\`

For a pinned namespace, set components.json registries to:

\`{"@happyhands":"https://happyhands.cc/r/v/${registryVersion}/{name}.json"}\`

Then install \`@happyhands/quartz-button\`. Unversioned URLs follow the current adaptation. Versioned registry dependencies remain pinned; upstream npm dependencies retain their source ranges.

Import only the generated styles.css once; tokens.css and base.css are bundled source references, not additional imports. Skill prose has only hosted navigation/install URLs adapted; executable components and original archives retain their source.
`);
// Immutable releases keep their entire registry dependency graph on the same version.
for (const entry of [...files].filter(f => f.path.startsWith('r/') && f.path.endsWith('.json'))) {
  const path = entry.path.replace('r/', `r/v/${registryVersion}/`);
  const payload = JSON.parse(await readFile(resolve(root, entry.path), 'utf8'));
  const pin = value => {
    if (typeof value === 'string') return value.replaceAll(base+'/r/', base+`/r/v/${registryVersion}/`);
    if (Array.isArray(value)) return value.map(pin);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,k==='files' && payload.name!=='skill' ? v : pin(v)]));
    return value;
  };
  const bytes=encode(pin(payload));
  try { if (await readFile(resolve(root,path),'utf8') !== bytes) throw Error('Immutable release changed: '+path); }
  catch(error) { if(error.code!=='ENOENT') throw error; }
  await publish(path,bytes);
}
// Retain and cover older immutable releases as newer adaptations are published.
async function coverVersions(dir) {
 for(const entry of await readdir(resolve(root,dir),{withFileTypes:true})) {
  const path=dir+'/'+entry.name;
  if(entry.isDirectory()) await coverVersions(path);
  else if(!files.some(f=>f.path===path)) {const bytes=await readFile(resolve(root,path));files.push({path,sha256:sha(bytes),bytes:bytes.length});}
 }
}
await coverVersions('r/v');
await publish(
  "r/provenance.json",
  encode({
    schemaVersion: 1,
    source: "design-how/manifest.json",
    files: files.sort((a, b) => a.path.localeCompare(b.path)),
  }),
);
console.log(
  `Published ${aggregate.length} hosted items; source bytes retained; Skills install separately.`,
);
