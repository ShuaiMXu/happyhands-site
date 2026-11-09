# English discovery and portal CSS follow-up

Base: 6d2b3542. Completes the remaining PR #62 English resource discovery and old portal stylesheet cleanup scope.

- English homepage: /en/apps/portal/. Resource index and details: /en/components/ with the same query parameters. Both languages are prerendered with distinct canonical URLs and reciprocal language alternates. Original resource text remains verbatim; this does not claim translated third-party source documents.
- English system entry points are generated for all five systems. Glaze/Sodium retain the shared resource reader canonical; rich system pages retain their dedicated canonical. Slug parsing handles the English prefix.
- Site-owned navigation retains the explicit language route; changing language updates the URL while preserving query/hash and existing state retention. Preview middleware follows the same ordered query routing rules as production.
- Resource sitemap contains 5134 canonical resource URLs. Dedicated English entries are added to the main sitemap. Verification resolves each resource canonical through deployment routing and checks its built visible content.
- Removed 207 obsolete legacy homepage module rules and the duplicate dark/light variable definitions. Current portal color aliases continue to resolve through the canonical token stylesheet. Original media, third-party demonstrations and approved Hero effects retain their presentation.
- Narrow-screen review found a clipped GitHub count. The compact header now gives the count enough room while retaining both touch controls.

Validation: typecheck, full build, 24 SEO/language tests, five design-resource tests and release verification pass. Browser checked English homepage to English Mercury detail, Chinese URL switching, light/dark views and 390px viewport; viewport override reset afterward. No whole-site accessibility certification is claimed. Production checks follow merge/deploy. Hosted Actions remain subject to the account billing restriction.
