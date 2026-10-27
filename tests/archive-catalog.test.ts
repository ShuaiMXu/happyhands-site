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

test("website types and visual styles combine without dropping unclassified references", () => {
  const minimal = filterArchive(entries, "", "", "", "minimal");
  assert.ok(minimal.length > 0);
  assert.ok(minimal.every((entry) => entry.styles?.includes("minimal")));
  const combined = filterArchive(entries, "", "", "", "editorial", "fashion");
  assert.ok(combined.length > 0);
  assert.ok(
    combined.every(
      (entry) =>
        entry.styles?.includes("editorial") && entry.types?.includes("fashion"),
    ),
  );
  assert.equal(
    filterArchive(entries, "", "", "", "unclassified").length,
    entries.filter((entry) => !entry.styles?.length).length,
  );
  assert.equal(
    filterArchive(entries, "", "", "", "", "unclassified").length,
    entries.filter((entry) => !entry.types?.length).length,
  );
  assert.ok(
    filterArchive(entries, "瑞士网格", "", "").every((entry) =>
      entry.styles?.includes("swiss"),
    ),
  );
});

test("gallery cards expose one detail link and no manual playback control", async () => {
  const { createElement } = await import("react");
  const { renderToStaticMarkup } = await import("react-dom/server");
  const { ArchiveCard } = await import("../components/ArchiveCard");
  const props = {
    entry: entries[0],
    onPreview: () => {},
    onOpen: () => {},
    lang: "zh",
  };
  const resting = renderToStaticMarkup(
    createElement(ArchiveCard, { ...props, active: false }),
  );
  const previewing = renderToStaticMarkup(
    createElement(ArchiveCard, { ...props, active: true }),
  );
  assert.equal((resting.match(/<a\b/g) || []).length, 1);
  assert.doesNotMatch(resting, /<button\b|<video\b/);
  assert.equal((previewing.match(/<video\b/g) || []).length, 1);
  assert.match(previewing, /\bmuted\b/);
  assert.doesNotMatch(previewing, /<button\b|\bcontrols=/);
});
