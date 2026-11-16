import { readFile, writeFile } from "node:fs/promises";
const catalog = JSON.parse(
  await readFile("public/resources/v1/index.json", "utf8"),
);
const result = {};
for (const row of catalog.resources.filter(
  (r) => r.type === "system" && r.system && r.path.includes("/foundations/"),
)) {
  const content = await readFile("public/" + row.path, "utf8");
  const name = row.path.split("/").at(-1).replace(".md", "");
  result[row.system + "/" + name] = {
    path: row.path,
    content,
    title: content.match(/^# (.+)$/m)?.[1] || name,
    tokens: [
      ...new Set([...content.matchAll(/--[a-zA-Z][\w-]+/g)].map((m) => m[0])),
    ],
  };
}
await writeFile(
  "public/resources/v1/foundations.json",
  JSON.stringify(result, null, 2) + "\n",
);
console.log(Object.keys(result).length, "foundation articles");

await import("./build-platform-groups.mjs");
