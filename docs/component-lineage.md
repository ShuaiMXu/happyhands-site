# Component lineage review

Before editing, locate the established component and identify the surfaces that consume it. Examples in imported Design.md and structured archive records must both use `DesignComponentSpecimens`. It maps declarations to one registered family in `DesignSample.solid.tsx`. A button, input or card used in a composition should come from the same family as the standalone example.

- Use shared tokens and documented variants for changes in color, type, size, shape or state. Avoid per-resource styling and document-generated UI markup. Parse source values through the validated token resolver.
- If a new family is necessary, record the different task or behavior, the API gap, expected consumers, variants and states. Add it to the shared family contract and include browser evidence. Use the shared visual families for asset-dependent entries and link to the page reference when available. Label the result as illustrative. Keep any original third-party example in its isolated viewer.
- In code review, follow the source from each changed route to the shared component. Compare another affected consumer and verify default, selected, expanded, focus and disabled states as applicable. Include loading and recovery when the component performs asynchronous work. Use normal desktop and phone viewports.
- Return a proven, unjustified parallel implementation for revision. Ask for evidence when the relationship or relevant states are unclear. Record the matching source, shared family or variant, and the browser case reviewed.

`npm run check:component-lineage` enforces the archive rendering entry points and guards against custom interactive markup or frames bypassing the shared layer. `npm run test:design-md:publish:browser` verifies real rendering, keyboard interaction and downloads. Review the semantics, design and state coverage alongside these checks.
