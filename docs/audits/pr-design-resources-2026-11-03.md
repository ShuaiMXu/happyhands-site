# Design resources PR review

## Scope and findings

Reviewed the complete application diff against origin/main, with particular attention to imported source handling, preview execution, filter persistence, shared navigation and responsive controls. Original documents remain reference data. Markdown uses React Markdown without raw HTML; generated preview values are allowlisted. Original HTML remains inert under restrictive CSP; generated scripts run in isolated frames without same-origin privileges. Height messages are checked against the owning frame window.

Found and fixed a verification portability issue: archive rendering tests imported CSS but depended on a temporary local loader. The loader and its registration are now in tests/helpers, exposed through npm run test:archive and included in CI. Wiki tests are included in CI as well.

No claim is made that all examples reproduce original custom assets. The coverage inventory explicitly includes schematic examples. Classification coverage is complete; classifications remain source-derived search aids.

## Visual evidence

Existing local review captures include:
- /tmp/designmd-import-review/classified-resources.png
- /tmp/designmd-import-review/type-scale-desktop.png
- /tmp/designmd-import-review/type-scale-mobile.png
- /tmp/designmd-import-review/studio-tablet.png
- /tmp/designmd-import-review/studio-mobile.png

Checks covered archive filtering, imported/legacy component interaction, image/video hover exclusions, desktop and phone type-scale alignment, and Studio editing at 988px/390px with a return to wide-screen split layout. These captures are local review artifacts, not hosted PR attachments.

## Follow-ups

See ../plans/design-resources-followups-2026-11-03.md for prioritized incomplete work. The unrelated untracked project-redundancy audit is not included in this PR.

A second review fix preserves non-Latin component names during deduplication; previously different Chinese names could collapse to an empty ASCII key. A regression test verifies distinct declarations are retained.

Local checks: archive, Wiki, SEO, Studio and analytics suites; TypeScript; full production build (2,633 prerendered pages). Final hosted CI remains the merge gate. Build warnings about existing unresolved demo assets are tracked separately in follow-ups.
