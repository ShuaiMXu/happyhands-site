import { readFile, writeFile } from "node:fs/promises";
const catalog = JSON.parse(
  await readFile("public/resources/v1/index.json", "utf8"),
);
const media = JSON.parse(
  await readFile("public/resources/v1/platform-media.json", "utf8"),
);
const covers = JSON.parse(
  await readFile("public/resources/v1/covers.json", "utf8"),
);
let count = 0;
for (const row of catalog.resources) {
  const doc = media.documents[row.path];
  if (!doc) continue;
  const text = await readFile("public/" + row.path, "utf8");
  for (const match of text.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
    if (/availability|checkmark/.test(match[2])) continue;
    const key = match[2]
      .split("/")
      .at(-1)
      .replace(/~(dark|light)|@\dx/g, "");
    const ref = doc.media[key];
    if (ref?.light || ref?.dark) {
      covers[row.id] = new URL(
        (ref.light || ref.dark).replace(/^\/+/, ""),
        "https://developer.apple.com/tutorials/",
      ).href;
      count++;
      break;
    }
  }
}
try {
  const tokens = JSON.parse(
    await readFile("public/resources/v1/token-preview-evidence.json", "utf8"),
  );
  for (const e of tokens) {
    const row = catalog.resources.find((r) => r.id === e.id);
    if (row?.sha256 === e.sha256) covers[e.id] = e.cover;
  }
} catch (e) {
  if (e.code !== "ENOENT") throw e;
}
const hig = "collection:platform-systems/apple-hig/DESIGN.md";
const overview =
  media.documents["collections/platform-systems/apple-hig/docs/index.md"];
const poster =
  overview?.media["human-interface-guidelines-page-image-card.png"]?.light;
if (poster)
  covers[hig] = new URL(
    poster.replace(/^\/+/, ""),
    "https://developer.apple.com/tutorials/",
  ).href;
await writeFile(
  "public/resources/v1/covers.json",
  JSON.stringify(covers, null, 2) + "\n",
);
console.log("Linked official illustration covers", count);
