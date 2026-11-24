import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import test from "node:test";
import {
  ReferenceSpecimen,
  type ReferenceSystem,
} from "../components/ReferenceSpecimen";
import {
  buildOriginalComponentPreview,
  designSampleTokens,
  componentPreviewKind,
} from "../components/reference-component-preview";
const mercury = JSON.parse(
  readFileSync(
    new URL(
      "../public/design-archive/mercury-3172cd4d/design-system.json",
      import.meta.url,
    ),
    "utf8",
  ),
) as ReferenceSystem;
test("Mercury retains all declared components and guideline headings", () => {
  const html = renderToStaticMarkup(
    <ReferenceSpecimen system={mercury} lang="en" />,
  );
  assert.equal(
    (html.match(/data-specimen-family=/g) || []).length,
    mercury.components!.length,
  );
  assert.equal(
    (html.match(/<iframe /g) || []).length,
    0,
  );
  assert.ok(html.includes("Complete structured source"));
  for (const heading of [
    "Type scale",
    "Surfaces",
    "Components",
    "Imagery",
    "Layout",
    "Typography Philosophy",
    "Guidelines",
  ])
    assert.ok(html.includes(heading), heading);
  for (const component of mercury.components!)
    assert.ok(html.includes(component.name.replaceAll("&", "&amp;")));
});
test("input and navigation variants are classified correctly", () => {
  assert.equal(componentPreviewKind("Email Capture Input (Pill, Left-Half)"), "input");
  assert.equal(componentPreviewKind("Navigation Pill Link"), "button");
});
test("imported HTML stays in an inert network-restricted document", () => {
  const preview = buildOriginalComponentPreview(
    {
      name: "Example",
      role: "",
      description: "",
      html: '<a href="https://example.com">link</a><script>parent.location="https://example.com"</script>',
    },
    mercury,
  )!;
  assert.ok(preview.includes("default-src 'none'"));
  assert.ok(preview.includes("form-action 'none'"));
  assert.ok(preview.includes("<body inert>"));
  const html = renderToStaticMarkup(
    <ReferenceSpecimen
      system={{
        ...mercury,
        components: [
          {
            name: "Example",
            role: "",
            description: "",
            html: "<script>alert(1)</script>",
          },
        ],
      }}
      lang="en"
    />,
  );
  assert.ok(html.includes('sandbox=""'));
  assert.ok(!html.includes("allow-scripts"));
  assert.ok(!html.includes("<script>"));
});

test("all archived design systems render their available modules without runtime failures", () => {
  const entries = JSON.parse(
    readFileSync(
      new URL("../public/design-archive/index.json", import.meta.url),
      "utf8",
    ),
  );
  for (const entry of entries.filter((entry: {source?:string}) => entry.source !== "designmd.app")) {
    const system = JSON.parse(
      readFileSync(
        new URL(
          `../public/design-archive/${entry.slug}/design-system.json`,
          import.meta.url,
        ),
        "utf8",
      ),
    );
    assert.doesNotThrow(
      () =>
        renderToStaticMarkup(<ReferenceSpecimen system={system} lang="zh" />),
      entry.slug,
    );
  }
});

test("the borderless Graphite Card exposes its documented shape and spacing", () => {
  const card = mercury.components!.find((c) => c.name === "Graphite Card")!;
  const tokens = designSampleTokens(card);
  assert.equal(tokens.borderless, true);
  assert.equal(tokens.radius, "12px");
  assert.equal(tokens.padding, "32px");
});
