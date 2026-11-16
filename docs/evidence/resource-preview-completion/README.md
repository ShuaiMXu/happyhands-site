# Resource preview verification — 2026-11-16

The integrated directory keeps Design.md, design systems and component source in their existing sections. PinUI's 31 registry entries now open isolated source previews. Utility modules remain source entries rather than fabricated visual components. Original archived source is unchanged; generated adapters supply documented fixture data and dependencies.

## Verified

- 725 distinct preview URLs rendered successfully in Chrome: 154 Cult entries (including aliases), 532 source examples across eight design systems, eight system overviews, and 31 PinUI entries.
- `public/resources/v1/preview-evidence.json` records resource IDs, source hashes, URLs and capture times. `preview-failures.json` is empty after retrying four transient load/screenshot failures.
- Captures reject loading placeholders and runtime error screens. Source covers are not counted as successful component renders.
- PinUI's separate 31-entry runtime check found no uncaught exceptions or preview-unavailable states. Its owner-hosted demonstration media remains external and is not redistributed as MIT artwork.
- Quartz, Lime, Sodium and Glaze detail tabs checked at 390 and 1440px: Home/End keyboard selection works, no page overflow, transparent backgrounds and square selection underlines. These tabs no longer inherit ordinary Button fills/radii. The same incorrect Button usage was removed from Cult detail tabs.
- TypeScript, production build, resource catalog, footer and portal checks passed. Refer to the final handoff for later checks.

## Limits

Rendering is not exhaustive interaction acceptance. Permission-dependent microphone, clipboard, file and WebGPU features need their appropriate browser capabilities. The checks do not certify every combination of third-party controls, Safari, or a physical iPhone. Existing build warnings for legacy view-layout images and Sodium fallback font paths remain outside this change. No formal Harness acceptance or user approval is implied by these browser records.
