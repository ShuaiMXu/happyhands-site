# PR #62 completion follow-up

Base: merged source 28242cfb. This follow-up addresses concrete delivery and state defects left after PR #63, using the original audit as evidence rather than treating every recommendation as an observed runtime bug.

| Finding | Delivered behavior | Evidence |
| --- | --- | --- |
| Catalog integrity assertion missing | Quartz/Lime publishedHash must equal published registry bytes | Registry audit |
| Tests absent from CI | Feedback and Studio-retirement tests are now explicit workflow steps | Local suites pass; hosted job did not start because of account billing |
| Opt-in Skill sends users upstream | Hosted Skill navigation/install URLs point to HappyHands; original archive and executable components remain source-preserved | Original hash checks; actual installation of both agent-client Skills |
| Version metadata is not lockable | Immutable r/v/2026-11-09.2 registry, namespace aliases and full registry dependency graph; rewriting an existing version fails | Full graph tests; repeated build; actual namespace installation |
| Hosted Markdown has broken/foreign navigation | System roots and extensionless links resolve to hosted Markdown | All hosted document targets tested; 286 initially invalid targets corrected |
| Language change loses setup state | Tab session retains fields, agent selection and disclosure states | Browser English/Chinese/English switch retains fixture project, task, Kimi and expanded project section |
| Upstream changes have no signal | Weekly/manual read-only workflow checks source and uploads a report; changed/unavailable files fail the run | Local run checked 312 files with no drift or unavailability |

## Validation

Typecheck, full production build, verify:alpha and 23 SEO checks pass. Resource/hosted-registry/retirement/feedback checks pass. Published provenance covers 1530 artifacts, including immutable aliases and release payloads. Actual shadcn installation used the version namespace and installed Quartz Button plus opt-in Skill; both client Skill files contain version-pinned HappyHands commands. Test transport redirected registry dependency requests to loopback; source content was not altered by the test server. Production verification follows deployment.

## Explicit boundaries

- Registry versions lock registry source, not upstream npm dependency ranges.
- Persistence uses tab-scoped session storage; browser storage restrictions retain existing in-memory fallback only. No project data is transmitted by persistence.
- Original source attribution and archived originals intentionally retain upstream URLs. Hosted Skill changes are confined to navigation/install URLs, not rewritten design guidance.
- The scheduled workflow reports evidence and never adopts upstream changes or posts issues. Hosted execution is still blocked by GitHub account billing; local success is not remote CI success.
- Independent English resource URL architecture and broad legacy CSS removal were separate projects in the original audit. They remain architectural follow-up work and are not counted as fixed by this PR. Existing canonical token aliases and intentionally distinct source system demos are preserved.
