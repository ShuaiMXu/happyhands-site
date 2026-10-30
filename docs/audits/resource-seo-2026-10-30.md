# Resource SEO and legacy URL repair

## Scope

Independent branch from `main` (`fd886c3`), separate from the ongoing UI redesign. No changes to the approved hero, external source archives, source media, or third-party component code. Requires preview confirmation before merging.

- Restore five exact legacy entry points, with and without trailing slashes, using permanent redirects. Preserve query parameters and existing production-host redirects.
- Prerender resource details from the pinned local catalogs and original documents. Serve the same HTML to all clients, with real visible content before JavaScript loads; the existing React application takes over normally.
- Keep the existing `/components/?provider=…` URLs. Metadata and canonical URLs use only the validated resource identity, excluding tracking and filter state. Component aliases resolve to the primary component's canonical URL. System index documents canonicalize to their overview; shared reading documents use one stable reader URL across system contexts.
- Generate a separate resource sitemap and advertise it in the built robots.txt. The original sitemap and crawler exclusions remain intact. The plain resource index links to every canonical resource.
- Keep browser titles, descriptions, canonical links, social metadata and structured data in sync with resource selection and history navigation.

## Routing

Vercel query rewrites are ordered: system documents, invalid document fallback, systems, Design.md, components, then list. Document captures allow only safe Markdown path segments. Unknown valid-looking resource IDs resolve to missing static files, yielding 404 rather than a fabricated resource page.

The post-build step moves the generic components HTML to `resource-pages`, so a static `/components/index.html` cannot shadow query-aware routing. Asset URLs produced by Vite remain absolute. `vite preview` models the same rewrite rules for local regression testing. Production query matching must be verified on the Vercel preview; the local model alone is not deployment evidence.

## Validation

- `npm run typecheck`: passed.
- `npm run build`: passed; 1,827 resource snapshots and 1,761 unique canonical URLs.
- `npm run test:seo`: 15 passed, including legacy redirects, query normalization, safe document routing, visible escaped content, metadata, structured data and existing SEO checks.
- `npm run test:design-resources`: 4 passed; original archive/document hashes preserved.
- `npm run test:analytics`: 6 passed.
- `git diff --check`: passed.
- Browser regression script added: `npm run test:seo:resources:browser`. Browser execution is not yet verified in this environment. It covers no-JavaScript resource content, normal desktop/phone viewports, canonical metadata, invalid IDs and component Back/Forward navigation.

Remaining gates: real Vercel query rewrites and HTTP redirects; browser desktop/phone and language/navigation checks; user preview confirmation. These changes do not prove search-engine indexing, rankings or analytics collection.
