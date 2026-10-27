import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  archiveCategories,
  categoryOf,
  filterArchive,
  type ArchiveEntry,
} from "../components/archive-catalog";
const entries = JSON.parse(
  readFileSync(
    new URL("../public/design-archive/index.json", import.meta.url),
    "utf8",
  ),
) as ArchiveEntry[];
test("industry categories cover every archive entry exactly once", () => {
  const counts = archiveCategories.map(
    ([id]) => entries.filter((entry) => categoryOf(entry) === id).length,
  );
  assert.equal(
    counts.reduce((a, b) => a + b, 0),
    1342,
  );
  assert.equal(
    entries.filter((entry) => categoryOf(entry) === "other").length,
    145,
  );
});
test("search category and theme work together and empty states recover", () => {
  const result = filterArchive(entries, "mercury.com", "dark", "fintech");
  assert.equal(result.length, 1);
  assert.equal(result[0].name, "Mercury");
  assert.equal(
    filterArchive(entries, "mercury.com", "light", "fintech").length,
    0,
  );
  assert.equal(filterArchive(entries, "", "", "").length, 1342);
  assert.ok(
    filterArchive(entries, "金融", "", "").every(
      (entry) => entry.industry === "fintech",
    ),
  );
});
