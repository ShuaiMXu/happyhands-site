# HappyHands component contracts

These supplement the complete eleven-rule profile. Apply to owned controls and page chrome, not embedded third-party examples or a project's editable theme. A frozen page remains frozen; check shared-selector reach before modifying it.

## Control geometry and states

| Component | Contract | Verify |
| --- | --- | --- |
| Button | Use existing `packages/ui` Button. Keep primary, secondary, ghost and danger meanings. Default controls and touch targets are at least 44px. Keep labels concise and stable while busy. Disable repeat execution, retain its accessible name, mark `aria-busy`; place a spinner over a layout-preserving label rather than adding width. | Default, hover, focus, pressed, disabled, busy, error/retry. |
| Input / textarea | Use a persistent, associated label. Put the hint after its field with `aria-describedby` when needed. Keep user values on error. Validation must say how to recover, not just “invalid”. Use 16px text on touch text inputs to avoid browser zoom where applicable. | Empty, entered, invalid, disabled, keyboard input, narrow widths. |
| Select | For short project form fields, reuse the native `Select` wrapper and retain native keyboard behavior. Resource facets with many options use the searchable `ArchiveFilter` based on Base UI Combobox (shared by Design.md and the component library), with a viewport-contained popup, separated counts, keyboard selection, Escape dismissal and focus return. Styling a native select does not style its OS popup. Reserve logical end padding for one non-interactive 16px chevron. Center it at 50% with translateY(-50%); call sites must not override it with a fixed top. Keep disabled and invalid states visible. | Long option, arrow alignment, native popup, keyboard selection, forced colors. |
| Tabs and filters | Use tabs only for panels and filters for narrowing results. Associate tabs with their panel and use the matching keyboard pattern. Label the filter by the decision the user makes, not an implementation term. Keep result counts consistent with combined filters. | Combined selection, empty results, reset, pagination reset, back navigation. |
| Disclosure | Use native `details/summary` or an adopted accessible primitive. Keep one caret, at least 44px trigger height, keyboard focus and an accurate expanded state. Essential actions stay visible. | Open/close, keyboard, long labels and nested disclosures. |
| Tooltip | Reserve for icon-only or genuinely ambiguous controls. Do not repeat visible text or hide essential setup instructions in a hover-only tip. It must work with keyboard focus and remain supplementary on touch devices. | Focus, hover, Escape, placement and contrast. |
| Dialog / floating panel | Keep nested radii concentric, use a 0.5px frame and reserve shadow for separation from the page. Give the dialog a name, initial focus, keyboard containment, Escape dismissal and focus return. | Open/close, keyboard, narrow viewport, long content, form errors. |
| Status / error | Use a persistent local result area with `role=status` or `role=alert` as appropriate. Explain failure and recovery next to the affected action. Do not mark unfinished work as passed. | Empty, pending, success, failure and retry without losing inputs. |

## Resource gallery

- Cards show the reference first, with its title and source domain below. No decorative play controls, marketing labels or raw-video links.
- On a hover-capable pointer, entering a card starts its muted, inline preview; leaving stops it. Keyboard focus provides equivalent access. Escape, focus leaving, scrolling out of view, hiding the tab and reduced-motion changes stop previews. Only one card video may be active. A failed video falls back to the thumbnail.
- Touch cards remain stable thumbnails; tapping opens their full detail preview. Do not autoplay every visible card or add a mobile play overlay.
- The detail page retains an explicitly controlled full preview and complete design-system/Design.md exports.
- Separate website purpose from visual style. Light/dark is source metadata, not the primary browsing taxonomy. Derive refinements from actual archived descriptions, account for negative instructions, and keep unmatched references available under Unclassified. Do not rewrite original design files to fit categories.
- Use `npm run archive:facets` after importing or updating archive data, then verify generated metadata and combined filters. Categories are source-derived search aids, not human-certified design conclusions.

## Spacing, type and media

Use the existing semantic Radix tokens. Keep three or four shell text sizes, minimum 12px; source typography specimens are separate from shell text. Put 8px between a label and control and 20–24px between field groups unless the established page has an approved rhythm. Use whitespace and weight before adding boxes, lines or explanatory labels.

Keep source artwork's intrinsic ratio. Scope image/SVG sizing to the media region; a broad card SVG selector must not enlarge caption icons. Inspect full-page captures so content below the hero is actually reviewed. Preserve wide command strings with local horizontal scrolling and keyboard access; do not force arbitrary word breaks.

Necessary transitions name their properties, use ease-out/250ms as a starting point, and respect reduced motion. Do not scale buttons, dim their whole label on hover, or animate an entire page into place merely for decoration.

## Review and handoff

Scan shared controls, then catalogue/list/detail pages, design-system pages, Theme Studio and guides at normal desktop and phone dimensions. Check 768px when filters or sidebars change structure. Include Chinese/English, light/dark, keyboard focus and actual states. Test the preview lifecycle and failure fallback, not just whether a video element exists.

Record static audit coverage and explicit exclusions separately from browser results. Never treat regex coverage as an accessibility or full visual pass. Preserve the complete original skill and its external packages when appending confirmed component contracts. Preview approval does not imply deployment or merge approval.

## Resource navigation and homepage

Use lightweight links with `aria-current=page` for the three resource routes, not tab roles for navigations. Align them to the page inset; mark the current route with an underline without pill backgrounds. Keep all three available at 390px. A catalog filter is a compact toolbar rather than a large setup form. Reuse `ResourceToolbar` and its `resource-controls.css` on both archive and component lists; do not copy the same role into page-specific CSS or assume equal declarations survive the cascade. Verify computed radius, height and surface in both routes. Keep list content inside the main landmark. The homepage presents real Design.md references, design-system covers and working component previews before optional onboarding. Keep full presets, local handoff and guides accessible; do not manufacture live metrics or claim automated online diagnosis. The approved Hero remains unchanged.

### Approved Hero onboarding exception

The user approved placing the core tool picker and copy action in the Hero on2026-10-27. Preserve the existing Hero identity while reusing the complete agent preset and one `copy-agent` action. Do not duplicate selection state, truncate prompts, imply copying runs a diagnosis, or remove the detailed project/design-source handoff. Verify the whole prompt, language-preserved selection and above-the-fold controls at normal phone and desktop widths.

## Interaction refinement (2026-10-27)
User-approved softer shared radius scale: 8/12/16/20px for small controls, fields, cards and large panels. Derive nested corners from outer radius minus inset. Search is immediately editable, with subtle pointer focus and a retained keyboard focus indicator; never add an activation click. Use 150ms color feedback, 250ms floating-surface entry and 150ms dismissal, without delaying filtering. Honor reduced motion and preserve external component demos. Verify pointer, keyboard, IME input, empty results, popup dismissal and narrow-screen containment, not only resting screenshots.
