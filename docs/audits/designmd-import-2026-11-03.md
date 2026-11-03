# Design.md archive import

Imported the user-supplied `designmd-archive/index.json`: 806 documents (759 library templates, 47 brands) and 801 original PNG covers. Retained all 1,342 existing references; the catalog now contains 2,148 entries.

Documents are copied byte-for-byte with SHA-256 provenance, stable source URLs and namespaced slugs. The importer validates paths and identities before writing. Run `python3 scripts/import-designmd-app.py /path/to/designmd-archive` followed by `npm run archive:facets` to repeat the import.

These references expose their original cover and Design.md download. They do not claim video, CSS/token exports or Studio import support: those source artifacts are absent. Five brand references have no cover and show an explicit fallback. Source contents are preserved as reference material, not executed.

Validation:
- All 806 imported documents independently compared byte-for-byte against the source.
- TypeScript check passed; archive/catalog tests: 7 passed; SEO tests: 19 passed.
- Production build completed, prerendering 2,633 pages.
- Browser: new type filters/counts, Aurora UI search/detail/cover/document, and missing-cover fallback verified. Desktop and 390px phone document layouts checked.

Not published to production. Existing archive content and unrelated local audit notes are preserved.
