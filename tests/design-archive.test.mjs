import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import test from "node:test";
const root = new URL("../public/design-archive/", import.meta.url);
const entries = JSON.parse(readFileSync(new URL("index.json", root), "utf8"));
test("every reference retains its full document and both image sizes", () => {
  assert.equal(entries.length, 1342);
  assert.equal(new Set(entries.map((e) => e.slug)).size, entries.length);
  for (const entry of entries) {
    assert.match(entry.slug, /^[a-z0-9-]+$/);
    const bytes = readFileSync(new URL(`${entry.slug}/design.md`, root));
    assert.equal(
      createHash("sha256").update(bytes).digest("hex"),
      entry.sha256,
    );
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
