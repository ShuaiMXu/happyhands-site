# Search and AI discovery

Public product pages use a shared metadata definition in `packages/ui/site-seo.ts`: production canonical URLs, language-aware titles/descriptions, Open Graph and Twitter previews, and a Schema.org entity graph linking the project, local application and public source. Ratings, prices and testimonials are not invented. Third-party system references retain attribution and licensing boundaries.

The guides at `/guide/` and `/en/guide/` contain complete Chinese/English setup and product-scope text in their initial HTML, including identical visible FAQ answers and FAQPage data. Reciprocal hreflang links refer only to these real translated URLs; browser preference switches on other pages are not falsely presented as separately crawlable translations. Shared app metadata updates with the visible language. Interactive resource pages offer a genuine no-JavaScript fallback linking to usable guides.

The existing production-domain redirects, portal prerender and exclusions for historical exports, component preview hosts and third-party mirrors remain intact. No custom bot group overrides those exclusions. Search discovery and model training are different choices; this change does not change the existing training-crawler policy.

`/llms.txt` is an optional concise reading aid linking to the same user-facing facts. It is not a search-engine requirement or a promise of rankings, indexing or AI citations. There is no special GEO schema or hidden keyword text.

The 1200×630 PNG social image is a browser rendering of the source in `scripts/social-card.html`, using the official HappyHands logo. This is a share asset, not a fabricated screenshot, testimonial or feature demonstration.

## Checks

Run `npm run test:seo`, `npm run typecheck`, `npm run build` and `npm run verify:alpha`. Check both guide URLs with JavaScript disabled, actual meta/JSON-LD after language changes, desktop/phone layouts, theme/menu controls and local links. A successful HTML contract does not establish accessibility, visual acceptance, ranking or a completed deployment.

After production deployment, submit `https://happyhands.cc/sitemap.xml` from the owner’s verified Google Search Console and Bing Webmaster accounts and inspect the guide URLs. Ownership verification and submissions are not claimed until actually performed. No verification tokens, analytics trackers or paid services are added by this change.

Sources:
- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [OpenAI crawler controls](https://developers.openai.com/api/docs/bots)
- [Bing: structured data](https://www.bing.com/webmasters/help/marking-up-your-site-with-structured-data-3a93e731)

Follow the project’s preview-confirmation rule before merging the website PR. Provider-generated preview deployments are not production acceptance.
