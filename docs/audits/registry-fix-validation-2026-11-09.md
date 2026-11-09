# PR #62 repair and verification

Baseline: a7a1502, including the submitted read-only audit. This change accompanies Theme Studio retirement. Original archived documents, component source and Skill bodies retain their original hashes.

| Audit item | Disposition and evidence |
|---|---|
| Install URLs / document routing | Repaired: user-facing system docs, copy/download actions, prompts and prerendered system pages use hosted registry/docs. Original archive and attribution remain upstream data. Browser Button docs show hosted commands. |
| Integrity | Added a separate published-artifact manifest and build-time original-archive verification. `sourceHash` still describes upstream bytes, explicitly labeled; catalog `publishedHash` separately binds the hosted registry. Comparing the two different boundaries was not a valid failure test. |
| Install size | Theme no longer implicitly depends on Skill. Explicit Skill installation retains complete originals for both clients. A clean CLI namespace installation of Quartz Button created eight files and no Skill folders. Across the four Button dependency graphs, installed source bytes fall from 658875 to 342087. CSS remains source-preserved; existing theme docs specify one styles.css import. |
| Distribution | Added aggregate registry/index, @happyhands namespace aliases, version/provenance metadata and bounded CDN caching. Canonical per-system item URLs remain compatible. Metadata versions identify an adaptation; no claim of immutable historical version URLs is made. |
| ZIP downloads | Rebuilt deterministically from preserved originals plus the exact hosted registry; audit compares every downloaded registry entry byte for byte. |
| Contrast | Updated the two legacy label declarations and rail focus token. The reported label selectors are absent from the current homepage DOM, so this is defensive source repair rather than proof of a current visible AA failure. Current portal tokens resolve through the existing canonical alias layer. |
| Hidden Hero focus | Fade threshold sets inert/aria-hidden, restores them on return or reduced motion and moves focus out if necessary. Browser at resource tab: opacity 0, inert present, aria-hidden=true. |
| Copy feedback | Both success and failure use one cancellable transient notice; failure remains for six seconds. Timer replacement/expiry is unit-tested. |
| Small JS issues | Removed duplicate heading branches, cached the whirl host, restored the home label and preserved feed query/category/limit/active tab across language rerender. Browser Mercury filter remains selected after switching to English; language control retains focus and scroll position. |
| Theme layers | A canonical alias layer already loads after portal/layout CSS in index.html. Counting dormant literals alone did not establish that Studio exports were ineffective. Broader removal of legacy presentation styles is a separate cleanup; no blanket recoloring of previews was performed. |
| Language indexing | The audit's blanket statement needs narrowing: four guide/workflow pairs already have independent /en/ URLs. Portal/system client-switched English indexing remains an explicit future routing/SEO change; this patch repairs interaction retention, not that larger URL expansion. |
| System page templates | Different richness alone is not an evidenced defect and does not justify removing existing Quartz/Lime examples. Shared resource-detail routes already use DesignHowLibrary. Added safe handling for an unknown system rather than a non-null crash. |
| CI | Added component catalog, design-resource graph and hosted-artifact audits. Build also verifies archived inputs before publishing. |

## Verification boundaries

The clean-install test served pending registry metadata on loopback and redirected only registry dependencies to that server; embedded source was unchanged. It used the actual shadcn CLI and a clean consumer project. Production URL checks occur after deployment. Original Skill instructions are deliberately not rewritten; they are explicit opt-in historical upstream material, and can still describe upstream endpoints.

The audit document remains unchanged as the baseline. No scheduled network drift watcher was created. Published-artifact audits check pinned inputs and local outputs, without silently fetching or adopting new upstream code.
