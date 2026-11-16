import { readFile, writeFile } from "node:fs/promises";
const path = "public/resources/v1/platform-media.json";
const data = JSON.parse(await readFile(path, "utf8"));
const checks = new Map();
const refs = [];
const key = (s) =>
  s
    .split("/")
    .at(-1)
    .replace(/~(dark|light)|@\dx/g, "");
const abs = (s) =>
  new URL(s.replace(/^\/+/, ""), "https://developer.apple.com/tutorials/").href;
for (const [path, doc] of Object.entries(data.documents)) {
  const text = await readFile("public/" + path, "utf8");
  for (const m of text.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
    const src = m[2],
      k = key(src);
    if (!doc.media[k])
      doc.media[k] = src.endsWith(".mp4")
        ? { video: "/" + src }
        : { light: "/" + src };
    const asset = doc.media[k];
    for (const variant of ["light", "dark", "video"])
      if (asset[variant]) {
        const url = abs(asset[variant]);
        checks.set(url, null);
        refs.push({ path, key: k, variant, url, alt: m[1] });
      }
  }
}
const urls = [...checks.keys()];
let i = 0,
  done = 0;
async function worker() {
  while (i < urls.length) {
    const url = urls[i++];
    try {
      const r = await fetch(url, {
        method: "HEAD",
        signal: AbortSignal.timeout(15000),
      });
      checks.set(url, {
        status: r.status,
        type: r.headers.get("content-type"),
      });
    } catch (e) {
      checks.set(url, { status: 0, error: e.message });
    }
    done++;
    if (done % 200 === 0) console.log("Checked", done, "/", urls.length);
  }
}
await Promise.all(Array.from({ length: 10 }, worker));
const failures = refs.filter((r) => checks.get(r.url).status !== 200);
data.mediaVerification = {
  checkedAt: new Date().toISOString(),
  uniqueUrls: urls.length,
  failures,
};
await writeFile(path, JSON.stringify(data, null, 2) + "\n");
console.log("Verified", urls.length, "failed refs", failures.length);
console.log(failures.slice(0, 10));
