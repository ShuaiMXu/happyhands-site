import { readFile, writeFile } from "node:fs/promises";
const c = JSON.parse(await readFile("public/resources/v1/index.json", "utf8"));
const base = "collections/platform-systems/apple-hig/docs/";
const docs = new Map();
for (const r of c.resources.filter(
  (r) => r.path.startsWith(base) && r.path.endsWith(".md"),
)) {
  const body = await readFile("public/" + r.path, "utf8");
  const slug = r.path.split("_").at(-1).replace(".md", "");
  docs.set(slug, { row: r, body });
}
const assignments = {};
function visit(slug, group, seen = new Set()) {
  if (seen.has(slug)) return;
  seen.add(slug);
  const doc = docs.get(slug);
  if (!doc) return;
  assignments[doc.row.id] ||= group;
  if (/"role"\s*:\s*"collectionGroup"/.test(doc.body)) {
    for (const match of doc.body.matchAll(
      /\]\(\/design\/Human-Interface-Guidelines\/([^/)]+)\)/gi,
    ))
      visit(match[1], group, seen);
  }
}
for (const [slug, group] of [
  ["foundations", "foundations"],
  ["components", "components"],
  ["patterns", "patterns"],
  ["inputs", "inputs"],
  ["technologies", "technologies"],
])
  visit(slug, group);
for (const [slug, doc] of docs) {
  if (slug.startsWith("designing-for-")) assignments[doc.row.id] = "platforms";
  assignments[doc.row.id] ||= "overview";
}
for (const r of c.resources.filter((r) =>
  r.path.startsWith("collections/platform-systems/material3/"),
)) {
  assignments[r.id] = r.path.includes("/css/")
    ? "foundations"
    : r.type === "tokens"
      ? "tokens"
      : "overview";
}
await writeFile(
  "public/resources/v1/platform-groups.json",
  JSON.stringify(assignments, null, 2) + "\n",
);
console.log("Platform topics grouped", Object.keys(assignments).length);
