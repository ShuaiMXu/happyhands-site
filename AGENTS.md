# HappyHands website

For owned UI implementation and review, read the complete [HappyHands UI skill](skills/happyhands-ui/SKILL.md). It supplements existing complete design skills; do not replace or shorten them. Preserve third-party component source, external theme demonstrations and evidence. Normal desktop and phone screenshots precede supplemental zoom checks. PR previews require user confirmation before merge.

## Component lineage

When implementing or reviewing Design.md, component previews, or shared navigation and controls, follow the [component lineage review](docs/component-lineage.md). Same-purpose UI must reuse a shared component and use its token or variant API. CI runs `npm run check:component-lineage` for the archive renderer. Review decisions require source links and evidence from affected states.
