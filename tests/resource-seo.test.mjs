import test from "node:test";
import assert from "node:assert/strict";
import { readFile, mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  archiveSeo,
  componentSeo,
  systemSeo,
  resourceSeoData,
} from "../packages/ui/resource-seo.ts";
import { renderResourceHtml } from "../scripts/prerender-resources.mjs";
import { enhanceSeoHtml } from "../packages/ui/site-seo.ts";
import { resourceRewritePath, resourcePreviewPlugin } from "../scripts/resource-preview-plugin.mjs";
const rules = JSON.parse(
  await readFile(new URL("../vercel.json", import.meta.url), "utf8"),
).rewrites;
const route = (query) => {
  const zh = resourceRewritePath(new URL("https://happyhands.cc/components/?" + query), rules);
  const en = resourceRewritePath(new URL("https://happyhands.cc/en/components/?" + query), rules);
  assert.equal(en, zh?.replace("/resource-pages/", "/resource-pages/en/"), "English routing parity: " + query);
  return zh;
};
test("query routing chooses each detail type before list fallback", () => {
  assert.equal(
    route("provider=design-md&design=example-123&utm_source=x"),
    "/resource-pages/design-md/example-123/index.html",
  );
  assert.equal(
    route("design=example-123&provider=refero"),
    "/resource-pages/design-md/example-123/index.html",
  );
  assert.equal(
    route("component=button"),
    "/resource-pages/cult-ui/button/index.html",
  );
  assert.equal(
    route("provider=cult-ui&component=button"),
    "/resource-pages/cult-ui/button/index.html",
  );
  assert.equal(
    route("provider=systems&system=quartz"),
    "/resource-pages/systems/quartz/index.html",
  );
  assert.equal(
    route("provider=systems&system=quartz&doc=foundations%2Fcolor.md"),
    "/resource-pages/systems/quartz/foundations/color.md/index.html",
  );
  assert.equal(
    route("provider=systems&system=quartz&component=button"),
    "/resource-pages/systems/quartz/index.html",
  );
  assert.equal(
    route("provider=design-md&component=button"),
    "/resource-pages/index.html",
  );
  assert.equal(
    route("provider=systems&system=quartz&doc=..%2Fsecret"),
    "/resource-pages/not-found.html",
  );
  assert.equal(
    route("provider=systems&system=quartz&doc=%252e%252e%252fsecret"),
    "/resource-pages/not-found.html",
  );
});
test("resource canonical excludes tracking, sorting and stale provider state", () => {
  const resource = archiveSeo({
    slug: "acme-1",
    name: "ACME",
    north_star: "Editorial",
    page_url: "https://example.com/ref",
  });
  assert.equal(
    resourceSeoData(resource).url,
    "https://happyhands.cc/components/?provider=design-md&design=acme-1",
  );
  assert.notEqual(
    resourceSeoData(resource).url,
    resourceSeoData(
      componentSeo({ id: "acme-1", title: "ACME", description: "Button" }),
    ).url,
  );
  assert.equal(
    new URL(
      resourceSeoData(
        systemSeo(
          { id: "quartz", name: "Quartz", summary: "Reference" },
          { path: "foundations/color.md", title: "Color" },
        ),
      ).url,
    ).searchParams.get("doc"),
    "foundations/color.md",
  );
});
test("static details contain escaped visible content, one canonical and accurate social/schema metadata", () => {
  const resource = archiveSeo({
    slug: "acme-1",
    name: "ACME <script>",
    north_star: "Paper & ink $&",
    page_url: "https://example.com/?a=1&b=2",
  });
  const shell = enhanceSeoHtml(
    '<html><head></head><body><div id="root"><noscript>Old</noscript></div></body></html>',
    "components",
  );
  const html = renderResourceHtml(shell, {
    seo: resource,
    body: "Full source <script>alert(1)</script> $&",
    download: "/design-archive/acme-1/design.md",
  });
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  assert.equal((html.match(/application\/ld\+json/g) || []).length, 1);
  assert.ok(html.includes('<main id="resource-static">'));
  assert.ok(
    html.includes("Full source &lt;script&gt;alert(1)&lt;/script&gt; $&"),
  );
  assert.ok(!html.includes("<noscript>"));
  assert.ok(html.includes("provider=design-md&amp;design=acme-1"));
  assert.ok(!html.includes("<script>alert"));
  const graph = JSON.parse(
    html.match(/type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],
  );
  const page = graph["@graph"].find((x) => x["@type"] === "WebPage");
  assert.equal(page.name, resource.title);
  assert.equal(page.url, resourceSeoData(resource).url);
  assert.ok(!graph["@graph"].some((x) => x["@type"] === "SoftwareApplication"));
});

test("identical overview and shared reading documents have one canonical identity", () => {
  const quartz = { id: "quartz", name: "Quartz", summary: "Quartz summary" },
    sodium = { id: "sodium", name: "Sodium", summary: "Sodium summary" };
  assert.deepEqual(
    systemSeo(quartz, { path: "index.md", title: "Quartz" }),
    systemSeo(quartz),
  );
  const shared = {
    path: "guides/approval-ui-for-ai-agents.md",
    title: "Approval UI",
  };
  assert.deepEqual(systemSeo(quartz, shared), systemSeo(sodium, shared));
  assert.equal(
    systemSeo(quartz, shared).query,
    "provider=systems&system=sodium&doc=guides%2Fapproval-ui-for-ai-agents.md",
  );
});

test("embedded tool routes ignore stale component identity", () => {
  for (const provider of ["studio", "setup"]) {
    assert.equal(
      route(`provider=${provider}&component=cosmic-button`),
      "/resource-pages/index.html",
    );
  }
});

test("malformed active resource selectors never fall back to the catalog", () => {
  const invalid = ["", "bad!", "../secret", "%2e%2e%2fsecret", "a b"];
  for (const value of invalid) {
    const encoded = encodeURIComponent(value);
    for (const query of [
      `provider=systems&system=${encoded}`,
      `provider=systems&system=quartz&doc=${encoded}`,
      `provider=systems&doc=${encoded}`,
      ...["design-md", "kage", "refero"].map(
        (provider) => `provider=${provider}&design=${encoded}`,
      ),
      `provider=cult-ui&component=${encoded}`,
      `component=${encoded}`,
    ]) assert.equal(route(query), "/resource-pages/not-found.html", query);
  }
  assert.equal(route("provider=design-md&design=does_not_exist"), "/resource-pages/not-found.html");
  assert.equal(route("component=does.not.exist"), "/resource-pages/not-found.html");
});

test("provider ownership preserves lists and ignores inactive stale selectors", () => {
  // Only selectors owned by the active provider are validated. The UI retains
  // unrelated query state when switching panels; tool panels own no resource.
  for (const query of [
    "", "provider=systems", "provider=design-md", "provider=kage", "provider=refero", "provider=cult-ui",
    "provider=systems&design=bad!&component=bad!",
    "provider=design-md&system=bad!&doc=bad!&component=bad!",
    ...["studio", "setup"].map(
      (provider) => `provider=${provider}&system=bad!&doc=bad!&design=bad!&component=bad!`,
    ),
  ]) assert.equal(route(query), "/resource-pages/index.html", query);
  assert.equal(route("provider=systems&system=quartz&design=bad!&component=bad!"), "/resource-pages/systems/quartz/index.html");
  assert.equal(route("provider=design-md&design=example-123&system=bad!&doc=bad!&component=bad!"), "/resource-pages/design-md/example-123/index.html");
  // Unknown providers follow the UI's existing Cult UI default.
  assert.equal(route("provider=unknown&component=button"), "/resource-pages/cult-ui/button/index.html");
  assert.equal(route("provider=unknown&component=bad!"), "/resource-pages/not-found.html");
});


test("preview middleware returns 404 for invalid selectors and 200 for provider lists", async () => {
  const root = await mkdtemp(join(tmpdir(), "happyhands-resource-routing-"));
  try {
    await mkdir(join(root, "dist/resource-pages/en"), { recursive: true });
    await writeFile(join(root, "vercel.json"), JSON.stringify({ rewrites: rules }));
    for (const prefix of ["", "en/"]) await writeFile(join(root, `dist/resource-pages/${prefix}index.html`), "Resource catalog");
    let middleware;
    resourcePreviewPlugin(root).configurePreviewServer({
      middlewares: { use(handler) { middleware = handler; } },
    });
    for (const [query, expectedStatus] of [
      ["provider=systems&system=bad!", 404],
      ["provider=systems&system=quartz&doc=bad!", 404],
      ["provider=design-md&design=does_not_exist", 404],
      ["provider=refero&design=", 404],
      ["provider=cult-ui&component=does.not.exist", 404],
      ["provider=cult-ui&component=", 404],
      // Valid-shaped but nonexistent details still fail at file resolution.
      ["provider=systems&system=not-a-real-system", 404],
      ["provider=design-md&design=not-a-real-design", 404],
      ["component=not-a-real-component", 404],
      ["provider=design-md", 200],
      ["provider=studio&component=bad!", 200],
      ["provider=setup&system=bad!&doc=bad!&design=bad!", 200],
    ]) {
      for (const prefix of ["", "/en"]) {
      let body;
      const response = { statusCode: 200, setHeader() {}, end(value) { body = value; } };
      await middleware({ url: prefix + "/components/?" + query }, response, () => assert.fail("Unexpected fallthrough"));
      assert.equal(response.statusCode, expectedStatus, query);
      assert.equal(String(body), expectedStatus === 404 ? "Not found" : "Resource catalog", query);
      }
    }
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
