import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  isSystemEntry,
  platformFor,
  platforms,
} from "../components/platform-directory";
const catalog = JSON.parse(
  await readFile("public/resources/v1/index.json", "utf8"),
);
const groups = JSON.parse(
  await readFile("public/resources/v1/platform-groups.json", "utf8"),
);
test("each platform has one catalog entry while every article keeps its stable ID", () => {
  for (const p of platforms) {
    const rows = catalog.resources.filter((r: any) =>
      r.path.startsWith(p.prefix),
    );
    assert.ok(rows.length > 1);
    assert.deepEqual(
      rows.filter(isSystemEntry).map((r: any) => r.path),
      [p.overview],
    );
    for (const row of rows) assert.equal(platformFor(row)?.id, p.id);
  }
});
test("all Apple and Material topics have a navigable category", () => {
  for (const row of catalog.resources.filter(
    (r: any) =>
      r.path.includes("apple-hig/docs/") ||
      r.path.includes("platform-systems/material3/"),
  ))
    assert.ok(groups[row.id], row.id);
});
