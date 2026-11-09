import {hostedDocument} from './hosted-document.mjs';
import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { pathToFileURL } from "node:url";
import assert from "node:assert/strict";
import { unzipEntries } from "./registry-zip.mjs";
export async function auditRegistry(
  root = resolve(import.meta.dirname, "../public"),
) {
  const json = async (path) =>
      JSON.parse(await readFile(resolve(root, path), "utf8")),
    hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
  const manifest = await json("r/provenance.json"),
    covered = new Set();
  for (const file of manifest.files) {
    assert.ok(
      !file.path.includes("..") && !file.path.startsWith("/"),
      "unsafe provenance path",
    );
    assert.ok(!covered.has(file.path), "duplicate provenance");
    covered.add(file.path);
    assert.equal(
      hash(await readFile(resolve(root, file.path))),
      file.sha256,
      file.path,
    );
  }
  const walk = async (dir) => {
    for (const entry of await readdir(resolve(root, dir), {
      withFileTypes: true,
    })) {
      const path = dir + "/" + entry.name;
      if (entry.isDirectory()) await walk(path);
      else if (path !== "r/provenance.json")
        assert.ok(covered.has(path), "uncovered " + path);
    }
  };
  await walk("r");
  for (const system of ["quartz", "lime"]) {
    const catalog = await json(`../systems/${system}/catalog.json`);
    assert.equal(catalog.sourceHashKind, "upstream-registry-bytes");
    assert.equal(catalog.publishedHash,
      hash(await readFile(resolve(root, `r/${system}/registry.json`))),
      `catalog publishedHash drift: ${system}`);
  }
  let items = 0,
    bytesBefore = 0,
    bytesAfter = 0;
  for (const system of ["quartz", "lime", "glaze", "sodium"]) {
    const registry = await json(`r/${system}/registry.json`),
      zip = unzipEntries(
        await readFile(resolve(root, `design-how/${system}.zip`)),
      );
    for (const name of await readdir(resolve(root, `r/${system}`)))
      assert.deepEqual(
        zip.get(`r/${system}/${name}`),
        await readFile(resolve(root, `r/${system}/${name}`)),
        `ZIP drift: ${system}/${name}`,
      );
    for (const item of registry.items) {
      items++;
      const path = `r/${system}/${item.name}.json`,
        payload = await json(path),
        original = await json(
          `design-how/${system}/registry/items/${item.name}.json`,
        );
      assert.deepEqual(
        payload.files,
        item.name === "skill" ? original.files.map(file=>({...file,content:hostedDocument(file.content)})) : original.files,
        "source or declared Skill adaptation changed",
      );
      for (const key of [
        "name",
        "type",
        "title",
        "description",
        "dependencies",
        "registryDependencies",
      ])
        assert.deepEqual(
          payload[key],
          item[key],
          `${system}/${item.name}: ${key}`,
        );
      const { files, ...metadata } = payload;
      assert.ok(
        !JSON.stringify(metadata).includes("https://design.how/r/"),
        "unhosted install metadata",
      );
      for (const dep of payload.registryDependencies || []) {
        assert.ok(dep.startsWith("https://happyhands.cc/r/"));
        assert.ok(covered.has(dep.replace("https://happyhands.cc/", "")));
      }
      for (const href of [payload.meta?.docs, payload.meta?.page])
        if (href?.startsWith("https://happyhands.cc/")) {
          const doc = await readFile(
            resolve(root, href.replace("https://happyhands.cc/", "")),
            "utf8",
          );
          assert.ok(!doc.includes("https://design.how/r/"));
        }
    }
    const size = async (hosted) => {
      const visited = new Set();
      let total = 0;
      async function visit(name) {
        if (visited.has(name)) return;
        visited.add(name);
        const p = await json(
          hosted
            ? `r/${system}/${name}.json`
            : `design-how/${system}/registry/items/${name}.json`,
        );
        for (const f of p.files || [])
          total += Buffer.byteLength(f.content || "");
        for (const dep of p.registryDependencies || []) {
          const m = dep.match(new RegExp(`/r/${system}/([^/]+)\\.json$`));
          if (m) await visit(m[1]);
        }
      }
      await visit("button");
      return total;
    };
    bytesBefore += await size(false);
    bytesAfter += await size(true);
  }
  const index = await json("r/registry.json");
  assert.equal(index.items.length, items);
  assert.equal(new Set(index.items.map((i) => i.name)).size, items);
  for (const alias of index.items)
    assert.deepEqual(await json(`r/${alias.name}.json`), alias);
  return {
    items,
    publishedArtifacts: covered.size,
    buttonBytesAcrossFourSystems: { before: bytesBefore, after: bytesAfter },
    source: "archived originals unchanged",
  };
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
)
  console.log(JSON.stringify(await auditRegistry(), null, 2));
