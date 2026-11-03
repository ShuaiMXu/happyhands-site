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
    2148,
  );
  assert.equal(
    entries.filter((entry) => categoryOf(entry) === "other").length,
    951,
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
  assert.equal(filterArchive(entries, "", "", "").length, 2148);
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

test("document-only references never attempt video playback and keep missing-cover cards", async () => {
  const { createElement } = await import("react");
  const { renderToStaticMarkup } = await import("react-dom/server");
  const { ArchiveCard } = await import("../components/ArchiveCard");
  for (const entry of [entries.find(e=>e.source === 'designmd.app' && e.cover)!, entries.find(e=>e.source === 'designmd.app' && !e.cover)!]) {
    const html = renderToStaticMarkup(createElement(ArchiveCard, {entry,active:true,onPreview:()=>{},onOpen:()=>{},lang:'en'}));
    assert.doesNotMatch(html, /<video\b/);
    assert.equal((html.match(/<a\b/g)||[]).length,1);
    assert.match(html, new RegExp(entry.slug));
    if (!entry.cover) assert.match(html, /No cover available/);
  }
});

test("current archive has meaningful type and style coverage", () => {
  for (const entry of entries) {
    assert.ok(entry.types?.length, `${entry.slug}: missing type`);
    assert.ok(entry.styles?.length, `${entry.slug}: missing style`);
    assert.ok(!entry.types.includes("other"), `${entry.slug}: generic fallback`);
  }
});

test("reviewed purposes and newly supported styles are searchable", () => {
  for (const [slug, type] of [["mono-859f6be7", "hardware"], ["arva-15846be3", "agriculture"], ["drepute-523d3e7b", "launch"]]) {
    assert.ok(filterArchive(entries, "", "", "", "", type).some(e => e.slug === slug));
  }
  assert.ok(filterArchive(entries, "", "", "", "maximal").some(e => e.slug === "designmd-library-illuminated-manuscript"));
  assert.ok(!entries.find(e => e.slug === "ditto-2db41cd9")?.styles?.includes("glass"), "negated glassmorphism is not a style");
});
