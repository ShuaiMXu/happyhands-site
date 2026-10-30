---
name: happyhands-ui
description: Apply HappyHands UI copy, Radix color, typography and interaction rules when implementing or reviewing HappyHands-owned interfaces, or a target project that has explicitly adopted this profile.
---

# HappyHands UI rules

User-approved profile, 2026-10-23. Read all eleven rules during implementation and independent review. These rules supplement the complete OJO, Taste and Impeccable packages; never truncate or replace their original files. They govern HappyHands-owned UI. A reviewed project's approved design system and third-party component demonstration are separate scopes: do not recolor source screenshots or overwrite an external brand without its adoption of this profile. Record conflicts explicitly. No rule implies approval, automatic installation or permission to merge.

1. **No middle-dot separators.** Do not use “·” to separate UI copy. Prefer distinct layout items, normal sentences or a meaningful label. Preserve verbatim external source text, code syntax and evidence.
2. **No redundant explanation.** Remove descriptions that repeat a title, button or obvious interaction. Keep decision-changing limits and errors beside their control. Put optional implementation details in existing disclosure or documentation, never hide essential instructions.
3. **Audience-appropriate copy.** Review every label for the actual audience and task. Use familiar, precise terms, professional natural wording and a length appropriate to the control. Avoid chatty phrasing, invented terms and redundant text. Review both Chinese and English. User-confirmed resource UI rule: text links must not use underlines in default, hover or focus states. Keep keyboard focus outlines and active navigation/tab indicators; preserve third-party source previews.
4. **Radix UI Colors.** All owned UI colors must derive from Radix scales through semantic tokens, including dark mode and interaction states. Steps 1–2: backgrounds; 3–5: default/hover/selected surfaces; 6–8: borders; 9–10: solid actions; 11–12: secondary/primary text. Check actual contrast, especially foregrounds on bright scales. Do not mechanically replace a color with the nearest hex and ignore its role. Source: https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale . Original media and external demonstration themes retain their identity.
5. **Optical alignment.** Align text baselines, icon weight, controls and visual centers, checking screenshots rather than bounding boxes alone. For nested rounded surfaces use concentric radii: inner radius approximately max(0, outer radius minus inset), adjusted for visual alignment.
6. **Hairline borders.** Use 0.5px for UI borders and dividing lines. Do not use a border as a substitute for all spacing. Preserve a clearly visible keyboard focus indicator; focus outlines are not decorative borders. SVG icon strokes are not UI borders.
7. **Restrained motion.** Remove nonessential entrance and decoration animations. Necessary state transitions use ease-out and 250ms as the starting point, scoped to explicit properties. Honor reduced motion. Preserve a separately user-approved motion exception only when documented.
8. **At most four text sizes per page; prefer three.** Minimum 12px. Use weight, semantic color, spacing and line-height for hierarchy instead of adding sizes. Count rendered computed sizes at normal desktop and phone dimensions; zoom must remain usable. Third-party samples and original screenshots are not shell typography.
9. **Fewer decisions.** Remove unnecessary confirmation and selection steps. Necessary choices belong where the user intends to choose. Order content by the current task and place the main action with the information required to take it. Preserve real approval and destructive-action boundaries.
10. **Purposeful shape and elevation.** Avoid gratuitous radius, shadows and colored left-edge card stripes. Use a small, role-based radius scale and reserve shadows for floating content where separation needs it; review nested radii together.
11. **No decorative eyebrows.** Remove heading-adjacent small labels and uppercase overlines when they duplicate a title or add only decoration. Keep them only for unique category, scope or critical context. Build hierarchy through type weight, space and composition.

## Acceptance

Review complete pages at normal desktop and phone sizes first, including navigation, empty/error/loading states and interactions. Inspect computed type sizes, color-token roles and focus, then visually check optical alignment and content hierarchy. Keep 200% zoom as a supplemental check; do not introduce arbitrary word breaks to satisfy it. Record screenshots, changed files, source/version, checks and remaining limitations. Static lint and source availability do not constitute visual acceptance. Await the user's requested preview confirmation before merging.

## Component review

When changing HappyHands-owned controls or resource pages, read [component contracts](references/components.md). Review shared primitives and their call sites together. Keep approved homepage freezes, external themes and source media as explicit scope boundaries. `npm run ui:audit` checks a narrow set of CSS rules; a clean report does not replace full-page and interaction verification.


## User-selected Luma profile (2026-10-30)

The user selected `shadcn init --preset b1VlItwO --base radix --template vite --monorepo --pointer`. This newer choice supersedes the older shell palette, font and radius rules above: use the exact Neutral light/dark semantic values from `docs/references/shadcn-luma/preset.json`, Inter for Latin with PingFang/Chinese fallbacks, and shared Lucide icons. Radix is the selected interaction foundation for new integrations; existing native and Base UI consumers remain explicitly identified until migrated.

Owned shell geometry (updated 2026-10-31): buttons, inputs and selects use 12px corners; cards, panels and floating surfaces use 16px. Segmented controls use a 16px outer frame, 4px inset and 12px options. Do not reintroduce the original Luma 22px/26px shell overrides. Circular avatars, switches and underline navigation retain their functional geometry. Preserve the user's 400 weight, no text-link underlines, 0.5px borders, 44px touch targets, keyboard focus and restrained shadows. These are deliberate HappyHands adaptations to the preset. Third-party previews and existing saved project themes retain their own values. Sources, generated reference components and deviations are recorded in `docs/references/shadcn-luma/README.md`.


## Actual shadcn integration (2026-10-30)

The shared owned UI now imports official radix-luma component source from `packages/ui/shadcn`, with Radix interaction primitives. This supersedes earlier descriptions of the shared Button/Select and resource facets as native/Base UI implementations. Button, Input, Textarea, Checkbox, Select, Tabs, Card, Popover/Command, Tooltip, Accordion, Dialog, Switch and Badge have real consumers across resource pages, the project design system, Studio and setup. Browser color/range/file widgets remain native deliberately. Third-party source previews retain their own implementations.

Use `npm run ui:build` to generate namespaced `sc:` utility CSS and the self-contained React component preview/export runtime. Never copy the three-component count into a claim that all 66 catalog entries are implemented: that count tracks configurable standalone export adapters, separately from page UI adoption.
