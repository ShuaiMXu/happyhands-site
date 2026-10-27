# Design reference archive

Imported the user-supplied design-archive collection into the existing Refero design-reference route. The default Design references tab now opens this collection; Kage's on-demand search and local Markdown import remain available.

1,342 entries include original extended DESIGN.md, compact DESIGN.md, 1440×900 viewport screenshot, thumbnail, upstream site/reference attribution and upstream scroll-video URL. All 5,368 copied files were compared byte-for-byte with the user's archive. Extended document hashes are recorded in the index. No skills or external reference text were shortened or rewritten.

Screenshots show one viewport, not the full page. Full-page viewing is offered as the source scroll video. Videos are external, loaded only when requested, and depend on upstream availability; 4.5 GB of video was not added to the repository. No claim of installed source components or inferred redistribution license is made.

The gallery paginates 24 entries, searches names/industry/fonts/style descriptions, filters themes and loads complete Markdown on selection. Markdown remains escaped text. Existing ReferenceActions handoff preserves the full document and asks the agent to compare against existing project rules before approved changes.

Validation: catalog integrity test, TypeScript, production build. Browser checks at desktop and 390×844: loaded images, filter/search, details, full original document and no phone horizontal overflow. Production publication and upstream video availability remain separate from local verification.

User-directed revision: replace provider-based reference navigation with Design systems / Design.md / Component libraries. Remove Refero and Kage UI and source-provider entries; legacy provider URLs resolve to Design.md. Keep original provenance in archived metadata and agent handoff. Remove the raw-video link. Existing skills remain unchanged.


## Detail presentation alignment

The Mercury reference was inspected in the browser. Detail pages now share a preview/specimen column and a sticky export panel, with 390px single-column fallback. DESIGN.md, Tailwind theme, CSS variables, tokens and structured design-system JSON are copied without editing from all 1,342 supplied entries. No proprietary font is downloaded or claimed as loaded; typography specimens show recorded family and metrics using the site font. Extracted color swatches preserve source colors while interface chrome keeps HappyHands tokens. Original source attribution stays in the collection metadata.

The owned system pages reuse the same export panel and full-height existing system reference iframe. HappyHands exposes its existing complete SKILL.md plus token JSON. Quartz and Lime expose local checked foundation snapshots, not invented DESIGN.md or upstream component source. The pre-existing dirty HappyHands system source remains excluded.

## Follow-up: missing specimens and inconsistent controls

The initial renderer omitted type scale, surfaces, layout, imagery, elevation and custom modules, and rendered components only as collapsed text. These modules now render from the complete archived JSON. Every component gets its name and description; supported patterns get an explicitly labeled reconstruction, and available archived HTML examples render in sandboxed, inert frames with a restrictive CSP. Reconstructions do not claim to be original source components. Proprietary fonts and missing original imagery are not fabricated. External token colors remain intact.

The Design.md filter bar now uses a flexible search column, compact shared Select and aligned result count; phone layout is search first, then filter/count. The component catalog recognizes all 17 legacy alias names in search and resolves old detail links to canonical previews. Exact-name matches rank first without adding duplicate tiles. Disclosure indicators and control dimensions are consistent.

Regression coverage renders all 1,342 archived design systems, checks Mercury's nine visible specimens and brand color, exercises all alias mappings, and verifies the preview sandbox/CSP contract. Browser checks include source component preview, expanded description, desktop/mobile archive specimens and search. Original documents and skills are unchanged.

## Gallery video previews and categories

Cards now start a muted loop on mouse hover or keyboard focus, with an explicit play/stop button for touch and reduced-motion users. Only one card mounts a video. Preview media is released on filtering, pagination, pointer exit, focus exit, leaving the viewport or hiding the document. Failed playback retains the thumbnail and detail link. Preview buttons are siblings of detail links, so playback does not open the detail page.

Industry categories use the supplied archive metadata: SaaS, agencies, e-commerce, AI, design, developer tools, finance, productivity, media, crypto/Web3 and other. Empty/unrecognized industry values join Other (145 initial entries). Category counts respond to search/theme. Theme uses four direct toggle buttons rather than a large native dropdown; the category menu retains the shared Select. Desktop and phone layouts keep 44px controls.

Validation: nine local regressions, typecheck and production build pass. Browser verification confirmed one playing muted video (readyState 4, currentTime advancing), finance + dark + mercury.com yielding one result, phone play without detail navigation, 390px layout without horizontal overflow, and zero videos initially. Video availability remains dependent on upstream hosting.
