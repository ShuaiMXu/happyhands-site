# HappyHands design-language alignment

Source: user-supplied HappyHands brand/design-system package (`design-system/tokens.css`, `tokens.json`, README, Button specification and evaluator rules), reviewed 2026-09-28. The user's explicit instruction to use PingFang-first sans-serif for Chinese and English overrides the package's serif display-heading recommendation. The shell keeps this default. The optional Studio font library redistributes OFL-1.1 fonts for project previews; see `docs/open-font-library.md`.

## Shared foundation

`packages/design-tokens/happyhands.json` is the canonical light/dark shell palette, spacing, radius and font data. Run `node scripts/brand-tokens.mjs` after changing it; the generated CSS uses `--hh-*` names to avoid colliding with edited project variables. Portal aliases and Studio consume the same values. Appearance preference uses the existing `hh-theme` key; shell appearance is independent of the project preview mode.

The HappyHands project preset now uses ink/near-white primary actions, warm neutral backgrounds, brand-specified chart colors, 10px radius and no card shadow. Existing drafts are not silently replaced. Apply the updated preset or the Standards panel action; changes remain undoable and require normal Foundation approval.

## Added beyond theme editing

- Shared Button primitive with primary/secondary/ghost/danger variants, disabled/loading semantics and reduced-motion behavior. Studio uses one primary action at a time.
- Design standards panel: optional HappyHands profile or generic readability checks; both modes checked; results point to rules rather than producing a synthetic Experience Score. Checks flag contrast, non-neutral primary actions, missing PingFang fallback and card shadow deviation. Export includes the examined theme and leaves manual review pending.
- Component-state preview: empty, loading/cancel, error/retry, disabled with reason, completed/restart, keyboard focus. These are demonstrative states, not assertions about target application behavior.
- Imported Foundation brand/component counts are visible. Logo correctness, actual page hierarchy, brand-color area and real task behavior remain manual checks; source extraction and target-page state coverage cannot be inferred from token values.

## Validation

Core tests cover correct brand defaults and drift detection without mutation. Browser checks cover brand assets, standards/application, single primary action, state transitions, independent shell/preview modes, persisted appearance and 390px layout. Existing export/Harness tests remain in place. Product copy distinguishes local checks from verified application results.

## Component contracts, 2026-10-27

The owned UI now also follows the complete [HappyHands UI skill](../skills/happyhands-ui/SKILL.md) and its [component contracts](../skills/happyhands-ui/references/components.md). Historical warm-neutral prose above does not override the canonical semantic Radix palette. Existing project drafts and external-theme samples remain independent.

The shared native Select owns the chevron geometry; consumer styles must not override it with a fixed vertical offset. Button's busy indicator occupies the same grid area as its layout-preserving label, so caller flex rules must not override the component's display mode. It retains its accessible name and disables repeat actions while busy. Whole-control opacity/scale hover effects have been removed. Theme Studio uses 0.5px chrome borders and at least 12px helper text; duplicate token-name captions are omitted when they add no information.

See [the scoped audit and browser evidence](audits/design-md-and-components.md). The historical read-only workbench is not the active local Harness and is not counted as migrated. A paused/frozen homepage is a scope boundary, not a reason to remove its content.


## User-selected Luma profile (2026-10-30)

The user selected `shadcn init --preset b1VlItwO --base radix --template vite --monorepo --pointer`. This newer choice supersedes the older shell palette, font and radius rules above: use the exact Neutral light/dark semantic values from `docs/references/shadcn-luma/preset.json`, Inter for Latin with PingFang/Chinese fallbacks, and shared Lucide icons. Radix is the selected interaction foundation for new integrations; existing native and Base UI consumers remain explicitly identified until migrated.

Owned shell geometry (updated 2026-10-31): buttons, inputs and selects use 12px corners; cards, panels and floating surfaces use 16px. Segmented controls use a 16px outer frame, 4px inset and 12px options. Do not reintroduce the original Luma 22px/26px shell overrides. Circular avatars, switches and underline navigation retain their functional geometry. Preserve the user's 400 weight, no text-link underlines, 0.5px borders, 44px touch targets, keyboard focus and restrained shadows. These are deliberate HappyHands adaptations to the preset. Third-party previews and existing saved project themes retain their own values. Sources, generated reference components and deviations are recorded in `docs/references/shadcn-luma/README.md`.


## Actual shadcn integration (2026-10-30)

The shared owned UI now imports official radix-luma component source from `packages/ui/shadcn`, with Radix interaction primitives. This supersedes earlier descriptions of the shared Button/Select and resource facets as native/Base UI implementations. Button, Input, Textarea, Checkbox, Select, Tabs, Card, Popover/Command, Tooltip, Accordion, Dialog, Switch and Badge have real consumers across resource pages, the project design system, Studio and setup. Browser color/range/file widgets remain native deliberately. Third-party source previews retain their own implementations.

Use `npm run ui:build` to generate namespaced `sc:` utility CSS and the self-contained React component preview/export runtime. Never copy the three-component count into a claim that all 66 catalog entries are implemented: that count tracks configurable standalone export adapters, separately from page UI adoption.

## Portal clear-glass exception (2026-10-31)

The user requested liquid glass on the portal header and the HappyHands Hero icon, explicitly excluding an enclosing Hero text panel. The borderless header overlays the Hero from the first frame and uses a clear backdrop with an SVG displacement map generated from edge normals. The icon uses its original alpha silhouette with specular edge lighting, without a rounded tile. Foreground text is outside the filters. Pointer-driven header highlights stop for reduced motion and touch. Reduced transparency and forced colors use opaque semantic surfaces and the original logo. Browsers without SVG backdrop filters retain CSS highlights. This is a web material treatment, not a native platform Liquid Glass implementation. Studio controls, source screenshots and external themes are unaffected.
