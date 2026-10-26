# Search discovery and indexing

## Observed on 2026-10-26

Production root redirects permanently to `/apps/portal/`, which returns HTML with HTTP 200. `www.happyhands.cc` redirects to the canonical host. Robots allows the public site and advertises the six-page sitemap; the homepage has a matching canonical and prerendered product content. No homepage noindex meta or X-Robots-Tag was observed. A request with a Googlebot user agent also returned 200; this does not prove access from Google's infrastructure. The public setup documentation returned 200.

A public search query returned no matching results. That is not authoritative proof of index exclusion or its cause. The owner confirmed Search Console has not been connected. Do not state that absence of Search Console prevents indexing.

This change makes the title and description identify website review, design-system extraction and scoped code improvement. Static JSON-LD links the website, page and software identity to the public repository, without invented reviews, prices or quality scores. Visible layout and full skills are unchanged. No special AI-only file is required for Google visibility.

## Owner setup and final production verification

1. Open https://search.google.com/search-console/ and add the URL-prefix property `https://happyhands.cc/` (or use a DNS-verified domain property if preferred).
2. For URL-prefix verification, choose HTML tag and provide the exact `google-site-verification` meta tag. It is a public ownership token, not an API key. Add it to the portal document head, deploy and then click Verify. Do not invent the token, claim verification or ask for credentials. Keep the tag after verification.
3. Submit `https://happyhands.cc/sitemap.xml` in Sitemaps.
4. Inspect `https://happyhands.cc/apps/portal/`. Record the indexing status, Google-selected canonical and last crawl. Run Test Live URL and request indexing if eligible. Inspect the other public sitemap pages when needed.
5. After this PR is approved and deployed, run `npm run check:search`. It checks HTTP responses, canonical URLs, index-blocking headers/meta, prerendered content and product structured data. This is a technical smoke check, not proof of indexing or a complete robots parser.
6. Revisit Search Console for crawl/index status and actual impressions. Do not promise immediate inclusion or a ranking. Search performance improvements need observable data, not repeated indexing requests.

The owner supplied `google85b2ad84383dc234.html` for HTML-file verification. It is preserved byte-for-byte in `public/` and must be served at `https://happyhands.cc/google85b2ad84383dc234.html` after deployment. Keep this file after verification; no meta tag is needed for this chosen method.

Pending: production deployment, live verification-file reachability, Search Console ownership verification and sitemap submission. No DNS or Google account settings have been changed.

References:
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/appearance/ai-features
