import examples from "../public/resources/v1/examples.json";
export type ResourceEntry = {
  id: string;
  name: string;
  type: string;
  path: string;
  collection: string;
  sha256: string;
  bytes: number;
  summary?: string;
  cover?: string;
  preview?: string;
  system?: string;
  installation?: { url: string };
  source: string;
  sourceUrl?: string;
  license: string;
};
export const controls = new Set([
  "button",
  "button-group",
  "copy-button",
  "input",
  "textarea",
  "checkbox",
  "switch",
  "slider",
  "progress",
  "tabs",
  "badge",
  "status",
  "avatar",
  "skeleton",
  "dialog",
  "popover",
  "select",
  "card",
  "frame",
]);
export function sectionFor(row: ResourceEntry) {
  return row.type === "design-md"
    ? "design-md"
    : row.type === "component"
      ? "cult-ui"
      : "systems";
}
export function previewFor(row: ResourceEntry) {
  if(row.collection === "pin-ui" && row.type === "component") return `/components/pinui-preview/?component=${row.id.split("/").at(-1)}`;
  const name = row.path
    .split("/")
    .at(-1)!
    .replace(/\.[^.]+$/, "");
  if (
    row.type === "component" &&
    row.system &&
    (controls.has(name) ||
      Boolean(
        (examples as Record<string, Record<string, unknown>>)[row.system]?.[
          name
        ],
      ))
  )
    return `/systems/preview/?system=${row.system}&component=${name}`;
  if (row.type === "system" && row.system && row.path.endsWith("/index.md"))
    return `/systems/preview/?system=${row.system}`;
  if (row.collection === "cult-ui")
    return `/components/preview/?component=${row.id.split("/").at(-1)}&motion=off`;
  return "";
}
export function resourceHref(row: ResourceEntry, lang: string) {
  if (
    row.preview?.startsWith("/components/?") &&
    row.collection !== "brand-registry"
  )
    return `${lang === "en" ? "/en" : ""}${row.preview}`;
  return `${lang === "en" ? "/en" : ""}/components/?provider=${sectionFor(row)}&resource=${encodeURIComponent(row.id)}`;
}
