# PR #62 completeness re-review

Reviewed merged source 28242cfb against the original audit. This is a source/contract review, not a new full-site visual acceptance.

## Confirmed incomplete work

- P1: `publishedHash` is written into Quartz/Lime catalogs but was not asserted by the registry audit. Added explicit catalog-to-published-bytes checks in this review.
- P1: feedback and Studio-retirement regression tests existed but were not included in any CI command. Added the two suites to the workflow. GitHub account billing still prevents proving remote execution.
- P1: explicit Skill installation still delivers instructions pointing to design.how. Removing implicit installation fixes ordinary component installs, but does not complete the explicit Skill path. Preserve originals in the archive; provide clearly identified hosted instruction adaptations and test their instructions separately from component source.
- P2: adaptation version metadata does not provide a lockable version URL. Need immutable version paths whose complete transitive dependency graph stays on the same version. Current aliases always resolve mutable canonical URLs.
- P2: language switching preserves catalog filters, but still replaces portal-content and unmounts embedded setup. Setup disclosure/interaction state is outside the snapshot contract. Do not claim full interaction-state retention. Runtime impact needs a targeted setup-language regression.
- P2: published Markdown rewrites installation URLs only; system/document links can still lead upstream. Original attribution is legitimate, but hosted document navigation needs a link-by-link distinction and resolution checks.
- P2: independent English resource URLs, broader legacy CSS cleanup, and upstream drift reporting remain unimplemented. These must not be represented as completed audit findings. No scheduled job or automated issue creation has been authorized or created in this review.

## Verified existing repairs

The registry audit passes for 308 items and 907 published artifacts: source-preservation, hosted dependency graph, namespace aliases, ZIP consistency and provenance. Previous production verification and actual production namespace installation remain the evidence for the deployed build. Studio is retired and ordinary component installs do not install agent Skills. These results do not resolve the incomplete items above.

## Delivery boundary

This review adds only missing CI wiring and catalog hash assertions. It does not silently change archived Skill instructions, routing architecture or published component source. Remaining work must include real consumer installation, same-version transitive dependencies, hosted doc navigation, setup state retention and remote CI evidence before claiming the whole audit is closed.

## Implemented follow-up

- Added CI suites and catalog hash assertions; seven initial checks passed.
- Hosted Skill adaptation changes only install/navigation URLs. Original archive hashes and executable component contents remain unchanged.
- Published immutable `r/v/2026-11-09.2/` graph, including namespace aliases and both explicit Skill clients. Rebuilding changed bytes at the same version fails. Older releases remain covered by provenance. Npm dependency ranges remain upstream-defined; this locks registry source, not the entire npm resolution.
- Hosted Markdown navigation normalizes extensionless and system-root URLs. All resulting local document targets are checked.
- Setup state persists in tab session storage: project fields, selected agent and disclosure state. Real browser verified English-to-Chinese-to-English retention with Kimi and a fixture project. Storage-disabled environments retain existing in-memory behavior only.
- Added weekly read-only upstream check and manual dispatch. Reports changes and unavailability as a failing run with an artifact, without automatically adopting changes or posting issues. Local run checked 312 upstream payloads and found no drift or failures. Hosted scheduled execution remains subject to the account billing restriction.
- Real shadcn installation via the version namespace installed Button plus opt-in Skill; both client Skill files contain pinned HappyHands commands. Test server redirected dependency transport only.

Independent English URL expansion and broad legacy CSS removal were explicitly separate projects in the original audit; this implementation closes the concrete delivery/state defects above, not those architecture projects.
