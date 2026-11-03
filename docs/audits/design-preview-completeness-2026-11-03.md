# Design reference preview completeness

Scope: all 2,148 references, including 806 imported Design.md documents and 1,342 legacy design systems.

## Implemented

- All references render an isolated interactive showcase: primary/secondary/disabled buttons, editable/read-only/disabled fields, email validation, save feedback, card favorite state, disclosure, checkbox, select and keyboard-operable tabs. No form data is sent or persisted.
- Theme extraction accepts bounded scalar color, font, size, padding and radius values from structured frontmatter, legacy JSON and explicit document descriptions. Token references are resolved with a depth limit. Missing values are identified as defaults; unavailable fonts use system fallback. The showcase is illustrative, not an exact reconstruction of the original website.
- Added 1,244 standalone legacy component previews for typography, dividers, tables, lists, notices, disclosures, selectors and toggles. Reconstructed native controls are no longer inert. Original HTML remains inert and script/network restricted.
- Legacy description, north-star statement, typography roles, scale line-height/tracking, component roles and related references are exposed. Full Markdown and structured source remain accessible, including nonstandard fields.
- Sandbox isolation applies to all samples. Only the authored showcase script runs; source Markdown, HTML, CSS and directives are not executed. The host accepts height messages only from the corresponding frame window.

## Coverage and limits

Legacy source contains 15,214 components: 12,540 reconstructed previews and 165 original HTML previews. The remaining 2,509 have no reliable standalone reconstruction. Their descriptions and source data remain visible, with an explicit limitation. Examples include custom brand marks, logos, imagery and bespoke compositions. Full per-reference inventory: `design-component-coverage-2026-11-03.json`.

The common showcase covers every reference; that does not mean every custom source component is reproduced. Source-provided borders, shape and typography remain separate from the HappyHands shell. This pass does not fabricate missing media or install unavailable proprietary fonts.

## Verification

- Automated checks cover theme generation for all 2,148 references and rendering all 1,342 legacy systems. Unsafe CSS values and missing token references fall back safely. Source-specific Swiss and Neumorphism geometry and Mercury palette are asserted.
- Ten focused tests pass; TypeScript check passes.
- Browser verification: Swiss desktop save feedback, invalid and valid email input, card favorite, tabs; Mercury desktop and 390px phone dark palette, card and controls, keyboard tab switching. Embedded frames resize with content and viewport.
- Preview screenshots saved during review. Production publication and merge are not part of this change.


## Follow-up: complete preview coverage and image hover

The former 2,509 entries without previews now have rendered examples. All 15,214 legacy component entries render: 165 preserve original HTML and the others use authored, isolated examples. The 806 imported documents additionally expose 4,924 individually declared components. See the refreshed JSON inventory for category counts and the explicit schematic subset; zero missing previews does not imply pixel-exact fidelity or possession of original brand/media assets.

Added dedicated treatments for brand layout, avatars, ratings, loaders, carousels, before/after comparison, tabs, dialogs, diagrams, metrics, chat, palettes, progress, breadcrumbs, icons, media frames, quotations, code and custom compositions. Unknown compositions receive labeled role-based diagrams, not falsely attributed original artwork. Generic interactive samples remain available. Authored comparison sliders support keyboard input. Generated frames resize to their content; imported HTML stays inert and network restricted. Only generated markup runs the owned height/interaction scripts.

Image-only Design.md cards in both homepage and catalog scale to 1.045 on hover or keyboard focus with a 250ms ease-out transition. Video cards are excluded by metadata, even if playback fails. Reduced-motion and coarse-pointer contexts do not animate images. Card layout, captions and image aspect ratios remain unchanged.

Validation: 14 focused tests pass, including every legacy component, every imported declared component, original HTML isolation, missing asset labels and hover exclusions. TypeScript and production build pass. Browser checks covered image hover/focus, video hover without image scaling, homepage focus preview, new document individual buttons, legacy comparison slider keyboard control and 390px mobile layout. Screenshot evidence is retained in the local review output. No merge or production deployment.

Re-run the inventory with `node --import tsx scripts/audit-component-previews.ts --write`.
