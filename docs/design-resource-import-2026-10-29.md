# Design resource import, 2026-10-29

Imported from the owner-supplied `design-archive` and `design-how-systems` bundles. Source Markdown and component skills are reference content, not instructions executed during this import.

## Published content

- Updated 1,341 website references and retained the existing Refero reference (1,342 total). All full/compact text exports, raw extraction evidence, metadata, screenshots, thumbnails and video posters are available under `/design-archive/<slug>/`.
- Placeholder media hosts in published archive copies are remapped to HappyHands. Original supplied folders remain untouched. Index records retain both original and published Markdown hashes.
- Existing upstream video URLs are retained rather than duplicating 4.5 GB of video into the website repository. All 1,342 URLs returned HTTP 200 and `video/mp4` during validation. Videos still depend on the external media host.
- Published Sodium, Glaze, Quartz and Lime: 36 foundations, 226 component documents, four overview documents, 15 guide/article documents and 308 registry entries.
- Unmodified original docs and source files are under `/design-how/`; each system has a ZIP download including the original files and hosted registry. `/design-how/manifest.json` records SHA-256 for the original files.
- Hosted install payloads at `/r/<system>/<item>.json` remap registry dependencies and documentation links to `happyhands.cc`; author fields and `files` content/targets remain unchanged.
- Existing Quartz/Lime overview and example pages are retained and link to the complete document reader. Sodium/Glaze have standalone document pages. Homepage and system library expose all five systems including HappyHands.

## Validation

- Build and TypeScript checks passed.
- Archive integrity and hosted dependency/document closure checks passed.
- Existing Studio (18), analytics (6) and SEO (8) tests passed; Alpha verification passed.
- Browser checks passed at 390, 768 and 1440px in Chinese/English and light/dark modes (12 combinations): directory search, Markdown copy, reload deep links, load-error retry, archive detail exports, source downloads and standalone system entry routes.
- Normal desktop and phone screenshots reviewed before additional checks; new document shell uses four computed text sizes (12/14/16/24px), semantic site colors and scoped layouts.
- Owned UI audit reports no findings within its static coverage. It does not establish complete accessibility or visual acceptance.

## Release

A preview is required for user confirmation before merging, per repository AGENTS.md and `skills/happyhands-ui/SKILL.md`. The production domain is `happyhands.cc`; Vercel project `shakaka/happyhands-design`.
