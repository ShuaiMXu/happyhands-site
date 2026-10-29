import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
const root = new URL("../public/", import.meta.url);
const read = (path) => JSON.parse(readFileSync(new URL(path, root), "utf8"));
const catalog = read("design-how/catalog.json");
test("all supplied documents and source files retain their original hashes", () => {
  const manifest = read("design-how/manifest.json");
  assert.ok(manifest.length > 900);
  for (const file of manifest)
    assert.equal(
      createHash("sha256")
        .update(readFileSync(new URL(file.path, root)))
        .digest("hex"),
      file.sha256,
      file.path,
    );
  assert.equal(catalog.systems.length, 4);
  assert.equal(
    catalog.systems.reduce((n, s) => n + s.documents.length, 0),
    266,
  );
  assert.equal(catalog.reading.length, 15);
});
test("the hosted registry resolves all dependencies and docs, preserving component code", () => {
  let count = 0;
  for (const system of catalog.systems) {
    const registry = read(`r/${system.id}/registry.json`);
    assert.equal(registry.items.length, system.registryCount);
    for (const item of registry.items) {
      count++;
      const payload = read(`r/${system.id}/${item.name}.json`);
      const original = read(
        `design-how/${system.id}/registry/items/${item.name}.json`,
      );
      assert.deepEqual(payload.files, original.files);
      assert.equal(payload.author, original.author);
      for (const dep of payload.registryDependencies || []) {
        if (!dep.startsWith("https://")) continue;
        assert.ok(dep.startsWith("https://happyhands.cc/r/"), dep);
        assert.ok(
          existsSync(new URL(dep.replace("https://happyhands.cc/", ""), root)),
          dep,
        );
      }
      for (const href of [payload.meta?.docs, payload.meta?.page])
        if (href?.startsWith("https://happyhands.cc/"))
          assert.ok(
            existsSync(
              new URL(href.replace("https://happyhands.cc/", ""), root),
            ),
            href,
          );
    }
    for (const doc of system.documents) {
      assert.ok(
        existsSync(new URL(`design-how/${system.id}/${doc.path}`, root)),
      );
      if (doc.kind === "component")
        assert.ok(
          existsSync(
            new URL(
              `r/${system.id}/${doc.path.split("/").at(-1).replace(".md", ".json")}`,
              root,
            ),
          ),
          doc.path,
        );
    }
    assert.ok(existsSync(new URL(system.download.slice(1), root)));
  }
  assert.equal(count, 308);
});
test("published archives contain no placeholder media hosts", () => {
  const entries = read("design-archive/index.json");
  for (const entry of entries) {
    assert.ok(!entry.video.includes("example.com"));
    const system = read(`design-archive/${entry.slug}/design-system.json`);
    assert.ok(
      !JSON.stringify(system).includes("assets.example.com"),
      entry.slug,
    );
  }
});
