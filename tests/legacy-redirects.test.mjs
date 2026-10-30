import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const config = JSON.parse(
  await readFile(new URL("../vercel.json", import.meta.url), "utf8"),
);
const aliases = {
  portal: "/apps/portal/",
  quartz: "/systems/quartz/",
  lime: "/systems/lime/",
  happyhands: "/systems/happyhands/",
  studio: "/apps/studio/",
};

test("legacy entry points have exact permanent redirects with and without a trailing slash", () => {
  for (const [slug, destination] of Object.entries(aliases)) {
    for (const suffix of ["/", ""]) {
      const source = `/${slug}${suffix}`;
      const rules = config.redirects.filter((rule) => rule.source === source);
      assert.equal(rules.length, 1, source);
      assert.deepEqual(rules[0], { source, destination, permanent: true });
    }
  }
});

test("legacy aliases retain query forwarding and do not capture assets or current routes", () => {
  // Vercel forwards incoming query parameters when the destination supplies no
  // replacement query. Keep these aliases unconditional and pathname-only.
  for (const [slug, destination] of Object.entries(aliases)) {
    const rules = config.redirects.filter(
      (rule) => rule.source === `/${slug}` || rule.source === `/${slug}/`,
    );
    for (const rule of rules) {
      assert.ok(!rule.destination.includes("?"));
      assert.ok(!rule.has && !rule.missing);
      assert.ok(!rule.source.includes(":") && !rule.source.includes("*"));
      assert.notEqual(rule.source, destination);
    }
    assert.ok(
      !config.redirects.some((rule) => rule.source.startsWith(`/${slug}/:`)),
      slug,
    );
    assert.ok(
      !config.redirects.some(
        (rule) => !rule.has && rule.source === destination,
      ),
      destination,
    );
  }
});

test("old production host canonicalization stays scoped and precedes path aliases", () => {
  const hostRules = config.redirects.filter((rule) =>
    rule.has?.some((condition) => condition.type === "host"),
  );
  assert.equal(hostRules.length, 3);
  for (const rule of hostRules) {
    assert.deepEqual(rule.has, [
      { type: "host", value: "happyhands-design.vercel.app" },
    ]);
    assert.equal(rule.permanent, true);
    assert.ok(rule.destination.startsWith("https://happyhands.cc/"));
    assert.ok(
      config.redirects.indexOf(rule) <
        config.redirects.findIndex(
          (candidate) => candidate.source === "/portal/",
        ),
    );
  }
  assert.deepEqual(
    config.redirects.find((rule) => rule.source === "/" && !rule.has),
    {
      source: "/",
      destination: "/apps/portal/",
      permanent: true,
    },
  );
});
