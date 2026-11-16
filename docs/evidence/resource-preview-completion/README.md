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

## System-document entry-point correction

The first rendering sweep covered source component URLs, but 452 matching component-document entries in the systems section did not connect to them. Those entries now embed the exact same source preview and reuse its captured cover. This does not add 452 distinct component implementations or inflate the 725-route evidence count. All eight systems' button-document entry points were browser-checked; results are in system-docs.json. Pure foundation guidance and platform documentation remain readable documents; this correction does not certify custom visualizations for every foundation article.

## Foundation and platform completion (supersedes the previous remaining-display note)

- All 72 archived foundation articles now have source-backed specimens or structured source rules/correct-and-wrong examples. Colors, typography, lengths, radii, shadows, and motion use the loaded system CSS variables. Grid starts with the documented container/sidebar/content/TOC layout rather than a generic twelve-column template. Pure principles remain rules, not fictitious controls. Original complete documents remain available.
- Full token inspection replaces the previous first-24-colors sample. All seven token resources plus Material CSS topics and Mobbin colors have visual samples, with 19 captured token/example covers. Alias resolution, nested values, search and reduced-motion behavior are covered by tests.
- 173 Apple HIG documents have official media mappings. All 2,246 distinct referenced light/dark image/video URLs were checked successfully. Illustrations are shown at their natural ratio and videos require user playback; upstream files are not copied into the repository. 157 article covers use actual illustrations. Network failures have a visible source fallback.
- 270 foundation/platform/token entry routes were checked. One transient sidebar-page timeout was retried successfully with its real image loaded. The runtime report contains no outstanding failures.
- Design-system listing now treats Apple HIG and Material 3 as one platform entry each. Topics remain nested inside the platform, with source-derived categories and search. Apple's 173 topics remain reachable. Topic back navigation returns to its platform. Mobbin is similarly grouped; redundant Material app-token entry is hidden from the top-level list without deleting it.
- Normal 390/1440px, light/dark, motion with reduced motion, platform search, article navigation and return paths were checked. No horizontal overflow in the sampled foundations. Full production build and final production compilation passed; typecheck and 15 focused tests passed. Records distinguish render checks from exhaustive native-platform interaction certification.

Reproduce: `node scripts/build-foundation-manifest.mjs`; `npm run test:resources:specimens`; `ONLY_FOUNDATIONS=1 node scripts/build-resource-covers.mjs`; `node scripts/build-token-covers.mjs`. Refresh official references explicitly with `node scripts/build-platform-media.mjs` followed by `node scripts/verify-platform-media.mjs` and `node scripts/link-guideline-covers.mjs`; network refresh does not run during normal builds.
