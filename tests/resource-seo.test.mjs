import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  archiveSeo,
  componentSeo,
  systemSeo,
  resourceSeoData,
} from "../packages/ui/resource-seo.ts";
import { renderResourceHtml } from "../scripts/prerender-resources.mjs";
import { enhanceSeoHtml } from "../packages/ui/site-seo.ts";
import { resourceRewritePath } from "../scripts/resource-preview-plugin.mjs";
const rules = JSON.parse(
  await readFile(new URL("../vercel.json", import.meta.url), "utf8"),
).rewrites;
const route = (query) =>
  resourceRewritePath(
    new URL("https://happyhands.cc/components/?" + query),
    rules,
  );
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
