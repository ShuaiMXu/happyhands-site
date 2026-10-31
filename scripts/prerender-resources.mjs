import { readFile, writeFile, mkdir, rename } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { pathToFileURL } from "node:url";
import {
  archiveSeo,
  componentSeo,
  systemSeo,
  resourceSeoData,
} from "../packages/ui/resource-seo.ts";
const esc = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const json = async (path) => JSON.parse(await readFile(path, "utf8"));
export async function resourceEntries(root) {
  const entries = [],
    archive = await json(resolve(root, "public/design-archive/index.json"));
  const components = await json(
    resolve(root, "public/components/cult-ui/catalog.json"),
  );
  const systems = await json(resolve(root, "public/design-how/catalog.json"));
  for (const entry of archive)
    entries.push({
      seo: archiveSeo(entry),
      file: `design-md/${entry.slug}/index.html`,
      body: await readFile(
        resolve(root, `public/design-archive/${entry.slug}/design.md`),
        "utf8",
      ),
      download: `/design-archive/${entry.slug}/design.md`,
    });
  for (const entry of components.items) {
    const target = entry.aliasOf
      ? components.items.find((x) => x.id === entry.aliasOf)
      : entry;
    if (!target) throw Error(`Missing component alias: ${entry.id}`);
    entries.push({
      seo: componentSeo(target),
      file: `cult-ui/${entry.id}/index.html`,
      body: [
        target.description,
        `Category: ${target.category}`,
        `License: ${target.license}`,
        `Source revision: ${target.revision}`,
        `Dependencies: ${target.dependencies.join(", ") || "None listed"}`,
        `Registry dependencies: ${target.registryDependencies.join(", ") || "None listed"}`,
        `Limitations: ${target.limitations.join(", ") || "No catalog limitations listed; validate in your project."}`,
        "Candidate component. Confirm framework, licensing, accessibility and project design requirements before use.",
      ].join("\n\n"),
      download: target.source,
    });
  }
  const own = {
    id: "happyhands",
    name: "HappyHands",
    summary: "HappyHands brand rules, semantic tokens and product components.",
  };
  entries.push({
    seo: systemSeo(own),
    file: "systems/happyhands/index.html",
    body: own.summary,
    download: "/systems/happyhands/",
  });
  for (const system of systems.systems) {
    const overview = await readFile(
      resolve(root, `public/design-how/${system.id}/index.md`),
      "utf8",
    );
    entries.push({
      seo: systemSeo(system),
      file: `systems/${system.id}/index.html`,
      body: overview,
      download: `/design-how/${system.id}/index.md`,
    });
    for (const doc of [...system.documents, ...systems.reading]) {
      const filename =
        doc.path.startsWith("guides/") || doc.path.startsWith("articles/")
          ? doc.path
          : `${system.id}/${doc.path}`;
      entries.push({
        seo: systemSeo(system, doc),
        file: `systems/${system.id}/${doc.path}/index.html`,
        body: await readFile(
          resolve(root, `public/design-how/${filename}`),
          "utf8",
        ),
        download: `/design-how/${filename}`,
      });
    }
  }
  return entries;
}
export function renderResourceHtml(shell, entry) {
  const data = resourceSeoData(entry.seo);
  let html = shell
    .replace(
      /<title>[\s\S]*?<\/title>/gi,
      () => `<title>${esc(data.title)}</title>`,
    )
    .replace(
      /(<meta\b[^>]*(?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*/gi,
      (_, prefix) => prefix + esc(data.description),
    )
    .replace(
      /(<meta\b[^>]*(?:name|property)="(?:og:title|twitter:title)" content=")[^"]*/gi,
      (_, prefix) => prefix + esc(data.title),
    )
    .replace(
      /(<link\b[^>]*rel="canonical" href=")[^"]*/gi,
      (_, prefix) => prefix + esc(data.url),
    )
    .replace(
      /(<meta\b[^>]*property="og:url" content=")[^"]*/gi,
      (_, prefix) => prefix + esc(data.url),
    )
    .replace(
      /<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi,
      () =>
        `<script id="site-structured-data" type="application/ld+json">${JSON.stringify(data.graph).replace(/</g, "\\u003c")}</script>`,
    );
  const content = `<main id="resource-static"><nav><a href="/components/">设计资源 / Design resources</a></nav><h1>${esc(entry.seo.name)}</h1><p>${esc(entry.seo.description)}</p><p>第三方参考保留原始来源与许可。请核对上游要求后使用。 Third-party references retain their sources and licenses.</p>${entry.seo.source ? `<p><a href="${esc(entry.seo.source)}">原始来源 / Source</a></p>` : ""}<p><a href="${esc(entry.download)}">完整资源 / Full resource</a></p><pre style="white-space:pre-wrap;overflow-wrap:anywhere">${esc(entry.body)}</pre></main>`;
  return html.replace(
    /<div id="root">[\s\S]*?<\/div>/,
    () => `<div id="root">${content}</div>`,
  );
}
export async function prerender(root = process.cwd()) {
  const dist = resolve(root, "dist"),
    shell = await readFile(resolve(dist, "components/index.html"), "utf8"),
    entries = await resourceEntries(root);
  const out = resolve(dist, "resource-pages");
  await mkdir(out, { recursive: true });
  // /components/ is routed explicitly, so query rewrites run before any static index.
  const links = [...new Map(entries.map((x) => [x.seo.query, x])).values()]
    .map(
      (x) =>
        `<li><a href="/components/?${esc(x.seo.query)}">${esc(x.seo.name)}</a></li>`,
    )
    .join("");
  const list = shell.replace(
    /<div id="root">[\s\S]*?<\/div>/,
    () =>
      `<div id="root"><main><h1>设计资源 / Design resources</h1><ul>${links}</ul></main></div>`,
  );
  await writeFile(resolve(out, "index.html"), list);
  await rename(
    resolve(dist, "components/index.html"),
    resolve(out, "shell.html"),
  );
  for (const entry of entries) {
    const file = resolve(out, entry.file);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, renderResourceHtml(shell, entry));
  }
  const urls = [
    ...new Set(entries.map((entry) => resourceSeoData(entry.seo).url)),
  ];
  await writeFile(
    resolve(dist, "resource-sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `<url><loc>${esc(url)}</loc></url>`).join("\n")}\n</urlset>\n`,
  );
  await writeFile(
    resolve(dist, "robots.txt"),
    (await readFile(resolve(dist, "robots.txt"), "utf8")) +
      "\nSitemap: https://happyhands.cc/resource-sitemap.xml\n",
  );
  console.log(
    `Prerendered ${entries.length} resource pages; ${urls.length} canonical URLs.`,
  );
  return entries;
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
)
  await prerender();
