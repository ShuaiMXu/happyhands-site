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
  buildComponentPreview,
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
test("complete Mercury modules and all nine components are visible, rather than collapsed descriptions", () => {
  const html = renderToStaticMarkup(
    <ReferenceSpecimen system={mercury} lang="en" />,
  );
  assert.equal(
    (html.match(/class="reference-component"/g) || []).length,
    mercury.components!.length,
  );
  assert.equal(
    (html.match(/<iframe /g) || []).length,
    mercury.components!.length,
  );
  assert.ok(!html.includes("<details"));
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
test("source primary action keeps Cobalt; input and navigation variants are classified correctly", () => {
  const preview = buildComponentPreview(mercury.components![0], mercury)!;
  assert.ok(preview.includes("--accent:#5266eb"));
  assert.equal(
    componentPreviewKind("Email Capture Input (Pill, Left-Half)"),
    "input",
  );
  assert.equal(componentPreviewKind("Navigation Pill Link"), "button");
});
test("imported HTML stays in an inert network-restricted document", () => {
  const preview = buildComponentPreview(
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
  for (const entry of entries) {
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

test("the borderless Graphite Card does not gain an invented border or action", () => {
  const card = mercury.components!.find((c) => c.name === "Graphite Card")!;
  const preview = buildComponentPreview(card, mercury)!;
  assert.ok(preview.includes("border:0;"));
  assert.ok(!preview.includes("<button"));
});
