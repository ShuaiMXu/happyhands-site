# Design resources and Harness follow-ups

Updated: 2026-11-03. These items are not completed by the archive/import PR.

## P1 — Product-led Harness design workflow

- [ ] Capture user groups, entry scenarios, core tasks and success criteria before selecting a visual reference.
- [ ] Build a route/flow map and content inventory for the HappyHands journey: discover → filter → assess a reference → create a Studio project → connect an Agent.
- [ ] Review layout, grouping, hierarchy, component relationships, spacing and actual copy together. Record evidence, decision, trade-off and verification for each proposed change.
- [ ] Present a structural proposal for the key pages before implementation; apply Design.md only after task and content decisions.
- [ ] Run one complete website optimization cycle with before/after evidence and human acceptance. Keep usability hypotheses separate from verified results.

Acceptance: one traceable run connects product context, structural decisions, implementation, regression checks and acceptance. Changing tokens alone does not satisfy this item.

## P1 — Reference-to-Studio import

- [ ] Support importing the newly added Markdown references into Studio through an explicit token mapping review. The current imported references are browseable and previewable; this is not a completed Studio import path.
- [ ] Show supported fields, omitted fields and fallback values before creating a project; preserve provenance and undo/export behavior.

Acceptance: import representative structured and prose-only documents, reject unsafe values, preview both modes, export and reopen without losing the reviewed mapping.

## P2 — Fidelity beyond preview coverage

- [ ] Replace schematic brand/media/custom-composition examples with source-supported implementations where usable assets and specifications exist.
- [ ] Expand layout, typography and per-component token extraction. Keep missing fonts and defaulted values visible; do not claim pixel-exact reconstruction.
- [ ] Supply the five missing covers from verified source assets if available; keep the explicit missing-cover state otherwise.
- [ ] Spot-check inferred classification quality across the archive. Zero unclassified entries measures coverage, not human-certified accuracy.

Acceptance: track fidelity separately from the existing zero-missing-preview inventory; retain original source documents and distinguish illustrative content.

## P2 — Studio component export coverage

- [ ] Continue the component integration ledger beyond the three configurable export adapters. The 12 interactive showcase examples and 66 catalog entries are different coverage measures.
- [ ] Add real states, interactions and export checks for each adapter as it is implemented.

## P2 — Build asset warnings

- [ ] Audit the existing unresolved `/ui/view-grid-generated.webp`, `/ui/view-row-generated.webp` and Sodium font references. Determine which consumers need assets versus a declared fallback; avoid substituting invented source artwork.

## Delivered in the current PR

806 documents and 801 covers imported; 2,148 references retain source content; source-aware detail rendering; declared component examples; image-only hover zoom; classification metadata and persistent review overrides; shared navigation; type-scale alignment; narrow Studio editor layout. Tests and review evidence are recorded in the accompanying audit.
