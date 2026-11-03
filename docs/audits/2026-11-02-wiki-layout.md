# Shared guide / SEO Wiki layout

Initial reviewed base: `af7cd57dd65573951ee8c243d00545fd55345ae8` (PR #52). Latest main `24110e9c834738f0c6aabec8f95cc17c71ae144b` (PR #51) was subsequently merged into this branch without conflicts; its three Studio/theme-core files are preserved unchanged.
Scope: `/guide/`, `/en/guide/`, and the four existing localized AI UI review / AI website design pages. No homepage, resource-preview, URL, metadata, sitemap, robots, or article-copy changes.

## Implementation

- Static shared renderer provides the page list, complete section outline, actual GitHub issue/documentation help links, previous/next pages, and mobile dialog markup. Content remains in server-rendered HTML.
- Article and footer scroll normally. Sidebar and outline are independently sticky within the columns; the column end bounds their sticky range.
- The original header slot remains in flow. The header floats only after the hero bottom crosses the viewport top. User-requested 320ms entry / 120ms exit are explicit motion exceptions; exit reversal does not replay entry. Theme tokens preserve light and dark colors.
- Sidebar masks/arrows appear only with actual overflow. Storage failures are nonfatal. The saved position is restored before ensuring that the current page is visible.
- Active section is the last section heading above the 20% viewport line. Anchor IDs are unchanged.
- Tablet/phone bottom navigation opens native modal dialogs, with a transparent backdrop, keyboard dismissal and focus return. The phone hides the desktop page list; tablet hides the desktop outline. Motion honors reduced-motion preference. Narrow-screen navigation remains inline until JavaScript enhancement succeeds, so disabled JS never leaves dead navigation buttons.
- Footer groups existing guide, resource, support and product-information links; its layout is at least 55svh tall. No new background artwork or third-party libraries were introduced.

## Changed files and selectors

| File | Changes / selectors |
| --- | --- |
| `guide/content.ts` | Existing guide body retained; shared renderer helpers and complete outline entries. |
| `workflows/content.ts` | Existing workflow bodies retained; same shared helpers. |
| `guide/wiki-navigation.ts` | `.wiki-layout`, `.wiki-header-slot`, `.wiki-columns`, `.wiki-pages`, `.wiki-page-scroll`, `.wiki-outline`, `.wiki-article-end`, `.wiki-help`, `.wiki-pagination`, `.wiki-mobile-bar`, `.wiki-current-section`, `.wiki-sheet`, `.wiki-sheet-heading`, `.wiki-footer-grid`, `.wiki-footer-brand`, `.wiki-footer-section`; existing `.hh-site-header`, `.guide-footer`. |
| `guide/wiki-layout.css` | Docs-scoped header `.is-floating` / `.is-entering` / `.is-leaving`; `.guide-shell`, `.guide-heading`, `.guide-body`; classes above; `data-more-above`, `data-more-below`, `data-wiki-scroll`, `aria-current`; responsive 1100px / 600px and reduced-motion rules. |
| `guide/wiki-layout.ts` | Enhancements targeting the shared classes; `data-wiki-open`, `data-wiki-close`, `aria-expanded`, dialog IDs `wiki-pages-dialog` / `wiki-outline-dialog`. |
| `guide/main.ts` | Imports shared CSS and initializes runtime. |
| `package.json` | Adds `test:wiki` and `test:wiki:browser`. |
| `tests/wiki-layout.test.mjs` | Six localized static layouts, section coverage, help/pagination order, CSS contracts. |
| `tests/wiki-runtime.test.mjs` | Reading line, scroll edges, timed header cancellation. |
| `tests/wiki-browser.mjs` | Reusable browser acceptance and screenshots (requires a working browser environment). |
| This file | Verification record and explicit remaining gates. |

## Verification

- Six article body strings compared byte-for-byte against base renderers: unchanged.
- `npm run test:seo`: 19 passed.
- `npm run test:wiki`: 11 passed again after latest-main integration.
- `node --import tsx --test tests/studio-core.test.ts`: 18 passed after integration; all three incoming Studio files exactly match latest main.
- `NODE_OPTIONS=--max-old-space-size=768 npm run typecheck`: passed before final no-JS fallback patch. Subsequent standalone and latest-main full typecheck reruns were killed with exit 137; do not count them as fresh passes.
- `npm run ui:audit`: 24 files scanned, no findings (narrow static audit only).
- `git diff --check`: passed.
- Six-route scoped production Vite build (existing config/plugins, input limited to Wiki routes, public asset copy disabled): passed. This verifies changed page bundles, not the full site.
- Full `npm run build`: UI/catalog/system-preview generation completed; Vite transform was killed by the cloud environment. This is **not** a successful full build.
- Cloud browser could not reach local preview (`ERR_CONNECTION_REFUSED`). No screenshots or visual acceptance are claimed from that attempt.

## Remaining acceptance gates

Run full build and `SITE_URL=<local or preview URL> npm run test:wiki:browser` in a functioning environment. Inspect actual page top, middle, end, and phone-width screenshots, plus menus, theme, active-section behavior, and keyboard interactions. Record exact commit and evidence before treating visual acceptance as complete. Keep PR draft; no merge or production deployment is authorized by this implementation task.


## Mac acceptance and resulting fixes

At exact remote head `fc9b547877dc19ae90059e7da42f3d478f54da17`, the Mac QA task reported full typecheck, Wiki 11 / SEO 19 tests, six-route browser matrix and 43 captures, plus sidebar overflow/masks/arrows/storage and header/outline/dialog keyboard checks. Its local full build could not complete because the sparse checkout omitted public design-archive assets, not because of a confirmed source error. Vercel deployment build for this head succeeded.

Actual QA also found a mobile modal background-scroll defect: at 390×844, opening a sheet at scrollY900 and wheeling outside moved the background to1340. The follow-up patch adds a scroll/style-preserving modal body lock and regression checks for close, Escape, outside click, resize and anchor navigation. The same patch aligns the hero's left edge with the article and fills the tall footer with grouped, existing guide/resource/help destinations. No article copy or theme tokens changed.

These fixes require a new exact-head Mac browser run and refreshed four-state screenshots; the previous screenshots are historical evidence, not acceptance of the follow-up patch.

Follow-up source verification: independent review passed, Wiki 14/14 and SEO 19/19 passed, isolated runtime strict TypeScript and browser-runner syntax passed, scoped six-route Vite build passed. Scrollbar compensation and same-breakpoint resize cleanup are included. Fresh browser evidence is still required for this follow-up.
