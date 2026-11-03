import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import test from "node:test";
const root = new URL("../public/design-archive/", import.meta.url);
const entries = JSON.parse(readFileSync(new URL("index.json", root), "utf8"));
test("every reference retains its full document and source-supported assets", () => {
  assert.equal(entries.length, 2148);
  assert.equal(entries.filter(e=>e.source === "designmd.app").length, 806);
  assert.equal(new Set(entries.map((e) => e.slug)).size, entries.length);
  for (const entry of entries) {
    assert.match(entry.slug, /^[a-z0-9-]+$/);
    const bytes = readFileSync(new URL(`${entry.slug}/design.md`, root));
    assert.equal(
      createHash("sha256").update(bytes).digest("hex"),
      entry.sha256,
    );
    if (entry.source === "designmd.app") {
      assert.equal(entry.sha256, entry.sourceSha256);
      if (entry.cover) assert.ok(existsSync(new URL(`${entry.slug}/cover.png`, root)));
      assert.equal(entry.video, "");
      continue;
    }
    for (const file of [
      "compact/design.md",
      "thumbnail.jpg",
      "screenshot.jpg",
      "design-system.json",
      "theme.css",
      "variables.css",
      "tokens.json",
    ])
      assert.ok(existsSync(new URL(`${entry.slug}/${file}`, root)));
    for (const field of ["site_url", "page_url", "video"])
      assert.equal(new URL(entry[field]).protocol, "https:");
  }
});

test("all designmd.app kinds and missing covers remain discoverable", () => {
  const source = entries.filter(e=>e.source === "designmd.app");
  assert.equal(source.filter(e=>e.sourceKind === "library").length,759);
  assert.equal(source.filter(e=>e.sourceKind === "brands").length,47);
  assert.equal(source.filter(e=>!e.cover).length,5);
  for(const entry of source) assert.ok(entry.types.includes(entry.sourceKind === "library" ? "style-template" : "brand-reference"));
});
