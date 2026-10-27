# Resource UI refinement and component review

Date: 2026-10-27. Base: `7abc4d596f9a0de253268283f9418df03fd7d101` in `codex/design-reference-archive`.

Status: **local preview awaiting user review**. No deployment, merge, human acceptance or successful Harness agent execution is claimed by this record.

## Task and design decisions

Visitors should see resources, narrow the collection and open a complete preview before reading exports or integration instructions. The three resource destinations are routes, not switchable ARIA tab panels. Keep the approved HappyHands brand, semantic Radix tokens and full original guidance. The homepage Hero is unchanged; its body now begins with real resources rather than a long setup sequence.

The primary path is resource navigation → search/filter → effect grid → selected detail/export/integration. Navigation and filters should recede; reference imagery and real components carry the page. A single shared toolbar replaces the two previously separate implementations.

| Role | Final contract |
| --- | --- |
| Section navigation | Plain route links, `aria-current=page`, underline, no filled pills. Same alignment and spacing across three destinations. |
| Search | Shared `ResourceToolbar`, persistent accessible label, concise placeholder, 44px input, semantic surface, 4px token radius. |
| Resource facets | Shared `ArchiveFilter` using already-installed Base UI 1.9.0 Combobox. Search inside bounded popup, counts in a separate column, selected check, immediate single selection. No native OS popup or large form block. |
| Popup | 280px preferred width, viewport collision handling, bounded internal scrolling, visible focus, Escape and focus return. |
| Cards | Reference imagery or runnable original components. No decorative play button. Only one hovered/focused muted reference video at a time; touch remains a link to full detail. |
| Details | Keep full preview, design rules, original source and complete exports. Optional implementation details remain labeled disclosures. |
| Homepage | Three curated real archive references, three existing system covers and three runnable component previews. Full collection links preserve all resources. Setup controls stay available; process, FAQ and manual installation become optional disclosures. |

Source thumbnails and external component demonstrations retain their original palettes and typography. They are not HappyHands shell color/type violations. Source classifications are derived aids, not human-certified judgments.

## Applied guidance and scope

- Complete HappyHands UI eleven-rule profile and component contracts. Original internal/public SKILL.md files remain byte-for-byte prefixes; only appendices were added.
- Harness Taste v2 adapter, pinned main entry `6010f91a9935f1c167dfc500fb1a475681892e6b`, with the existing App Screen versus public-page distinction and project constraints. No style draw or framework migration was used for the scoped component refinement.
- Impeccable 4.5.2, pinned revision `2f98774f86bc05563876643db37e6c37c322850f`: complete Audit, Layout, Polish and Craft Floor playbooks used for technical inspection, structural assessment and final refinement.
- Existing OJO/Taste/Impeccable source packages were not edited or shortened. This report does not claim that every optional playbook was executed.
- [Base UI Combobox documentation](https://base-ui.com/react/components/combobox) and installed 1.9.0 declarations informed the searchable popup. No dependency or lockfile change was needed.

The Harness adapter's workflow boundaries take precedence over upstream launcher/overlay instructions: no external native launcher, new browser automation system, injected overlay or parallel acceptance database was started. CUA browser measurements and source/static checks are recorded here. This is not a newly completed CLI Harness run or independent visual QA verdict.

## Findings and fixes

| Priority | Evidence / problem | Root-level remedy | Verification |
| --- | --- | --- | --- |
| P2 | Large pill navigation and form-like filters dominate the mobile first screen. User browser comments and before screenshots. | Route navigation uses underline; results-first toolbar replaces stacked labeled forms. | Final 390/768/1280 resource captures. |
| P2 | Search and select have different corners; archive search can lose its radius to the global search selector. | Both lists render the same `ResourceToolbar`; one authoritative input rule outranks global defaults. | Both pages compute 4px radius and 44px height at all three widths. |
| P2 | Native style popup has uncontrolled platform presentation and a long unsearchable list. | Reuse one Base UI searchable facet component for archive and component collection. | Mobile popup stays from x94 to374 in390px viewport. Search 瑞士, ArrowDown, Enter gives38 results and returns focus. |
| P2 | System list links sat outside an otherwise empty main landmark. | One `main#catalog-main` contains list and detail states; it is focusable. | Three source links inside main at all measured widths. Independent source re-review confirmed. |
| P2 | Homepage component iframes were fixed to light mode. | Synchronize embedded preview query parameters at initial mount and theme change. | All three iframe URLs use dark with dark root; English/Chinese body renders checked. |
| P2 | A late error from removed video A could stop current preview B. | Guard error callback by video identity, matching the play-promise guard. | Independent source re-review confirmed. No synthetic race injection claim. |
| P2 | Text Animate could remain in its entrance opacity while motion was off. | A text-specimen-only static final-state rule in preview/runtime.css; original pinned demo unchanged, motion-on unchanged. | Final light/dark phone and desktop captures show readable Roll In / Whip In text. |
| P2 | Long onboarding preceded resource discovery and repeated steps. | Resource feed first, preserve complete setup controls and move optional process/FAQ/installation into disclosures. | Nine real resource links, full prompt textarea populated in both languages; contract tests pass. |

Additional shared-control work includes stable busy-button geometry, accessible busy name, removal of duplicate visible-label tooltips, 44px touch targets where changed, narrow command scrolling, and corrected owned borders/minimum type. See `owned-ui.json` for the exact static scope and exclusions; it is not a whole-site accessibility certificate.

## Browser verification

Final evidence lives in `../evidence/light-resource-ui/`. Files prefixed **final-** supersede earlier intermediate captures.

- `final-matrix.json`: all three routes at390/768/1280, Chinese/light, exactly one current navigation link, no horizontal overflow; search radius4px and height44px on both lists.
- `final-localized.json`: all three routes at390/1280, English/dark, no horizontal overflow. Actual component content was awaited before screenshots.
- `final-filter-interaction.json`: real popup bounds, keyboard selection, 38-result state, zero-result state and recovery.
- `final-hover.json`: real pointer entry played one muted video (`paused=false`, progressing currentTime); leaving removed it. Zero manual play buttons.
- `final-home-proof.json`: desktop1280/English/dark and phone390/Chinese/dark, nine real links, no horizontal overflow, full prompt field populated. Desktop iframe theme parameters all match dark.
- `final-home-feed-en-dark-desktop.png` is a normal viewport screenshot, not a stitched/cropped screenshot with a fixed-element artifact.
- `final-design-md-dark-mobile.png`, `final-design-md-dark-desktop.png`, `final-cult-ui-390.png`, `final-cult-ui-1280.png`, `final-cult-ui-dark-mobile.png` and `final-cult-ui-dark-desktop.png` show the final chrome and loaded previews.

Earlier `../evidence/design-md-refinement/` records retain the actual index503, design-system503 retry, video404/poster fallback, full Mercury detail exports and preview lifecycle. They cover the unchanged data/retry implementation; their older toolbar styling is not a final visual reference.

Earlier `../evidence/owned-components/` contains the broader shared component/studio/system/guide scan. `english-matrix-initial.json`, `button-states-initial.json` and `button-busy.png` are superseded diagnostic records, not pass evidence. Use `english-matrix.json`, `button-states.json` and `dialog-keyboard.json` for those measured states.

## Checks and preservation

- TypeScript check passed.
- 38 targeted archive/catalog/reference/profile/SEO/studio contract tests passed.
- Production build passed; existing dependency bundler warnings are not treated as a remote CI pass.
- Owned UI audit:18 files scanned,5 explicitly documented exclusions,0 findings.
- `git diff --check` passed after cleanup.
- Original1342 archive entries/metadata preserved except additive type/style facets; original design files/media unchanged. Coverage:1229 typed,1263 styled; unmatched resources remain available.
- Hero geometry, portal.css and whirl.js are unchanged. Subsequent user feedback explicitly changes only the secondary Hero action: 如何接入 / How to connect targets #connect-agent, with an in-page down icon. `main.js` additions only wire body resource preview lifecycle/theme synchronization.
- No package dependency/lockfile change, no OJO/Taste/Impeccable source mutation. Pre-existing `systems/happyhands/main.tsx` changes and `.taste-skill/` are preserved.

## Review and limits

An isolated read-only source reviewer used Impeccable Layout/Polish, identified the selector/theme/landmark/video-race issues, and confirmed the final landmark and identity-guard fixes with no remaining blocker in that narrow re-review. It did not independently operate a browser. The primary process performed the browser checks above.

Viewport checks are desktop browser emulation, not physical iOS/Android certification. Screen-reader output, forced colors, synthesized touch gestures, offline service behavior, production deployment and a fresh real AI-agent execution were not revalidated here. Do not label this as full WCAG compliance, a completed Harness acceptance run, user approval or a production release. Homepage resource selection is curated, not a live popularity/ranking feed. External preview videos still depend on their source host; stable poster/detail access remains the fallback.

## Follow-up: Hero secondary action

User browser feedback replaces the review-document action with onboarding. Static HTML and both language strings now agree with the runtime link to `#connect-agent`. The external-link icon is replaced with a down icon. The rest of the Hero remains unchanged; GitHub source links remain available elsewhere.

## Follow-up: compact resource search

User requested a narrower, single visible search UI with better screen efficiency. ResourceToolbar now places a search icon and short placeholder inside the field; the persistent accessible name remains. Component categories and counts share the row. Search is bounded to300px rather than520px. English navigation uses the concise Components label. The component results use a full-width block beneath the toolbar, avoiding the retired sidebar grid.

`../evidence/light-resource-ui/compact-search-checks.json` records both collections at390/691/1280. The component toolbar is44px tall at all three sizes, with search widths195.42/300/280px. Both toolbars are44px tall at691/1280; on390px Design.md deliberately retains two rows for its two facets (98px total). Both searches remain44px tall with4px radii. No measured horizontal overflow. A real empty query returned0 results and clearing it restored the collection. `compact-*.png` supersedes prior toolbar screenshots.

## Follow-up: core setup in the Hero

The user explicitly moved core onboarding into the Hero after the CTA-label change. Five compact tool choices now precede the single `copy-agent` primary button. `setupConnect` still supplies the unchanged complete `harnessPrompt`; `agent-presets.js` was not edited. The lower duplicated picker/copy button was removed. The setup guide retains the full prompt preview, local project/design-source configuration and a return-to-tool-selection link. Shared Get started navigation leads to the Hero; Setup guide leads to the detailed section. The existing brand, headline, illustration/motion and project handoff behavior remain.

`hero-onboarding-checks.json` covers Chinese/English at390/691/1280, all from scrollY0 with Hero opacity1, no horizontal overflow, five choices and one copy button. The copy button is fully above the fold in every recorded configuration. Clipboard checks after completion matched the entire1431-character English Codex and635-character Chinese Cursor prompts. An initial immediate clipboard read was stale; the subsequent post-write comparison matched. `hero-onboarding-agents.json` verifies all five tool presets match the full prompt field and the selected WorkBuddy remains selected after language switching. The guide still contains the original local project setup and prompt disclosure. No agent was launched by these UI checks.

Typecheck,11 SEO/project-handoff/studio contract checks and production build passed. Owned UI audit includes the new scoped Hero controls (19 files,5 documented exclusions,0 findings). The Vite HTML transform renders the same tool choices before hydration. This remains a local preview; no deployment, merge or new Harness execution acceptance is asserted.

## Shared interaction and softer geometry follow-up — 2026-10-27

User requested a full shared-control pass after pointer search felt like a selection step. Read complete HappyHands UI/component contracts and transitions-polish; existing user authorization covers implementing the refinements. Original skills were preserved; only additive component guidance was written.

Findings and changes:
- Text inputs match browser focus-visible even after pointer clicks. ResourceToolbar now tracks pointer focus until blur: immediate editing, quiet border feedback for pointer, unchanged keyboard ring. This is not a two-click search mode. Browser annotation blue outlines are separate from site CSS.
- Searchable resource popup now uses explicit 250ms entry/150ms exit, no input delay; pointer-open autofocus is quiet, keyboard opening retains focus indication. Escape is verified after transition completes (an immediate snapshot can still contain the closing popup).
- Shared radius source JSON and generated CSS now use 8/12/16/20px. Removed inconsistent fixed corners in owned archive, component tiles/actions, homepage feed, tooltip and studio shell. Edited-project theme and third-party specimens remain separate.
- Shared controls use explicit color-property feedback; disclosure carets transition without delaying content. Reduced-motion overrides retained. Portal toast no longer transitions every property.

Validation: typecheck and build passed (12.42s); 22 archive/search/profile/studio tests passed. Owned CSS audit: 19 files, 5 exclusions, zero findings. Browser observations: five routes (archive, component library, systems, studio, portal) at390/1280 had no horizontal overflow; additional691/768 inspection; English/light and Chinese/dark inspected. Pointer search outline style none; keyboard re-entry solid2px. Empty search gives0, clear restores1342, Chinese 极简 query and style selection give200. Component query shift gives1 with real loaded preview. Mobile popup x94/right374 at390, radius12 with6px inset corners. Escape removes popup and restores trigger focus after exit. Evidence is in ../evidence/light-resource-ui/interaction/.

Limits: this is shared website-shell interaction acceptance, not an exhaustive certification of every third-party demo or private workbench. Actual IME composition, reduced-motion OS preference, all error branches and slow-network performance were not rerun this pass. No production deploy or merge performed. Existing prior evidence remains available; latest screenshots supersede the older4px-radius views.
