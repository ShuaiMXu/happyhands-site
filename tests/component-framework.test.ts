import { test } from "node:test";
import assert from "node:assert/strict";
import {
  registry,
  defaultConfig,
  validateConfig,
} from "../packages/component-studio/registry";
import { componentDocument } from "../packages/component-studio/document";
import { presetStyles } from "../packages/theme-core";
import { newDraft, validateDraft } from "../packages/theme-core/project";
test("coverage distinguishes catalog entries from implemented adapters", () => {
  assert.equal(registry.length, 66);
  assert.equal(new Set(registry.map((i) => i.id)).size, 66);
  assert.deepEqual(
    registry
      .filter((i) => i.capabilities.export)
      .map((i) => i.id)
      .sort(),
    ["button", "card", "input"],
  );
  assert.ok(
    registry
      .filter((i) => !i.capabilities.preview)
      .every((i) => i.implementation === null && i.exportEntry === null),
  );
});
test("old drafts remain valid; configured drafts round-trip and reject unsupported components", () => {
  const draft = newDraft("test", "Test");
  assert.equal(validateDraft(draft).componentConfig, undefined);
  assert.deepEqual(
    validateDraft({ ...draft, componentConfig: defaultConfig }).componentConfig,
    defaultConfig,
  );
  assert.throws(() =>
    validateDraft({
      ...draft,
      componentConfig: { ...defaultConfig, component: "dialog" },
    }),
  );
  assert.throws(() => validateConfig({ ...defaultConfig, variant: "bad" }));
});
test("every supported variant exports deterministic self-contained documents in both modes", () => {
  for (const component of ["button", "input", "card"] as const)
    for (const variant of ["solid", "outline", "soft"] as const)
      for (const mode of ["light", "dark"] as const) {
        const c = { ...defaultConfig, component, variant };
        const styles = presetStyles("happyhands");
        const html = componentDocument(c, styles, mode);
        assert.equal(html, componentDocument(c, styles, mode));
        assert.ok(html.includes(`color-scheme:${mode}`));
        assert.ok(html.includes("Content-Security-Policy"));
        assert.ok(!html.includes('src="http'));
        assert.ok(html.includes('window.__HH_COMPONENT__='));
        const payload = JSON.parse(html.split("window.__HH_COMPONENT__=")[1].split(";")[0]);
        assert.deepEqual(payload.config, c);
      }
});
test("user labels cannot escape into markup or script and disabled state is explicit", () => {
  const html = componentDocument(
    {
      ...defaultConfig,
      label: "</button><script>alert(1)</script>",
      state: "disabled",
    },
    presetStyles("happyhands"),
    "light",
  );
  assert.ok(!html.includes("<script>alert(1)</script>"));
  assert.ok(html.includes("\\u003cscript\\u003e"));
  const payload = JSON.parse(html.split("window.__HH_COMPONENT__=")[1].split(";")[0]);
  assert.equal(payload.config.state, "disabled");
  assert.equal(payload.config.label, "</button><script>alert(1)</script>");
});
import { readFileSync } from "node:fs";
import { importDesign } from "../packages/component-studio/design-import";
test("archive import preserves evidence and maps Mercury and a light reference without overwriting defaults", () => {
  for (const slug of ["mercury-3172cd4d", "dot-connect-981d90e9"]) {
    const raw = JSON.parse(
      readFileSync(`public/design-archive/${slug}/design-system.json`, "utf8"),
    );
    const markdown = readFileSync(
      `public/design-archive/${slug}/design.md`,
      "utf8",
    );
    const d = importDesign(slug, raw, markdown, "reference-test");
    assert.equal(d.designSource?.markdown, markdown);
    assert.deepEqual(d.designSource?.system, raw);
    assert.ok(d.designSource!.mappings.length > 0);
    assert.deepEqual(validateDraft(d).designSource, d.designSource);
    if (slug.startsWith("mercury")) {
      assert.equal(d.styles.dark.background, "#171721");
      assert.equal(d.styles.dark.primary, "#5266eb");
    }
  }
  assert.throws(() => importDesign("../private", {}, "", "test"));
});
