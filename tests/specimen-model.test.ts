import test from "node:test";
import assert from "node:assert/strict";
import { extractTokens, resolveToken } from "../components/specimen-model";
test("keeps all token values including aliases and nested DTCG values", () => {
  const source = Object.fromEntries(
    Array.from({ length: 60 }, (_, i) => ["--color-" + i, "#112233"]),
  );
  assert.equal(extractTokens(JSON.stringify(source)).length, 60);
  assert.deepEqual(extractTokens('{"size":{"$value":"16px"}}'), [
    { name: "size", value: "16px" },
  ]);
});
test("resolves aliases with fallbacks and stops cycles", () => {
  assert.equal(
    resolveToken("var(--a)", { "--a": "var(--b)", "--b": "12px" }),
    "12px",
  );
  assert.equal(resolveToken("var(--missing, 8px)", {}), "8px");
  assert.equal(resolveToken("var(--a)", { "--a": "var(--a)" }), "");
});
test("extracts CSS declarations without executing source", () => {
  assert.deepEqual(
    extractTokens(":root { --radius: 12px; --color: rgb(1, 2, 3); }"),
    [
      { name: "--radius", value: "12px" },
      { name: "--color", value: "rgb(1, 2, 3)" },
    ],
  );
});
