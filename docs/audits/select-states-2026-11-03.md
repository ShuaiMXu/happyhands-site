# Generated preview select review — 2026-11-03

## Scope and result

The two authored Design.md renderers now share a bundled Radix Select runtime. The OS select popup no longer opens behind a custom chevron/focus frame. Source HTML and vendor demonstrations remain untouched. Existing website facets and Studio already use Radix; their controls were checked rather than replaced.

The hidden native field retains its form value. Selection emits input/change, reset synchronizes the displayed value, labels target the visible trigger, disabled fields/options remain disabled. The runtime is included only in standalone examples that contain an authored select. Scripts remain inline in the existing isolated sandbox/CSP; no external network or same-origin permission was added.

A defect found during review: Radix's scroll lock changes body geometry, causing the preview's ResizeObserver to resize the iframe and immediately dismiss the popup. Height reporting now pauses while a listbox is open. Standalone selects reserve 300px of canvas so the popup has useful space.

## Browser evidence

- Manga detail, desktop: pointer open, Team selection, End/Enter selection, Escape focus return, reset to Private; popup spacing, one chevron and one selected check inspected.
- Manga detail, confirmed 390 × 844 viewport: open popup stays inside preview, readable options and inset check.
- Standalone generated Dropdown: ArrowDown open, End/Enter selects Complete, Escape closes.
- Temporary dark test fixture, confirmed 390 × 844: long option wraps without overlapping check; closed text truncates; keyboard skips disabled option; disabled trigger is not enabled. Fixture removed before delivery.
- Design.md filter: search Minimal, select, reopen and Escape.
- Studio project selector: existing selected indicator and spacing inspected, without changing saved project data.
- Evidence: /tmp/designmd-import-review/select-desktop.png and select-mobile-dark.png.

This is shared-component/state coverage, not a claim of manual review of all 2148 references. Legacy apps/designer prototype and third-party original HTML retain their own controls.

## Checks

28 archive tests and TypeScript passed, including source-isolation coverage. Full production build generated 2633 resource pages. No remote CI result is inferred from these local checks.
