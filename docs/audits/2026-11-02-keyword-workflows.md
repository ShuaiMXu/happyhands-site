# AI website design and UI review intent pages

Base: main `85af8ecc8195f7ba5deffb25b5bc1a6f5a9deccb` (previous SEO PR #48 merged).

## Scope and intent

- `/ai-ui-review/` + `/en/ai-ui-review/`: AI UI review, AI design review, AI website design review; AI 界面评审、AI 设计审阅、网站 UI 评审. Evidence, review checklist, scoped repair and comparison with code review/screenshot diff.
- `/ai-website-design/` + `/en/ai-website-design/`: AI website design workflow, improve AI-generated UI; AI 网站设计、AI 网页设计优化、优化 AI 生成网站. An honest post-generation workflow rather than a hosted no-code website builder claim.
- Existing guide remains installation/configuration intent. Homepage and guide add contextual links; no doorway-page expansion or keyword-density targets.

Product claims checked against the current official ShuaiMXu/HappyHands README. Built-in diagnosis/screenshot review requires Codex CLI; arbitrary CLI workflow does not imply every adapter is validated. Local Web Alpha and model-context sharing caveats are visible. Examples are explicitly hypothetical, not conversion evidence. No search-volume, ranking or indexing assertions.

## Discovery

Four static, bilingual HTML routes with unique title/description/H1; self canonicals and reciprocal zh-CN/en/x-default alternates; existing factual WebPage entity graph. Added sitemap/llms entries and existing analytics/release-validator coverage. Reused guide navigation and controls; scoped new pages to 400-weight headings and non-underlined links.

## Verification

- SEO suite: 19/19 passing, including new intent/metadata/static content/link tests.
- Existing analytics suite: 6/6 passing.
- Narrow TypeScript check of new workflow modules and their imports: passing.
- Independent source/copy/style review: no remaining source blocker; diff whitespace check clean.
- Full typecheck and production build attempted but terminated with exit 137 in this cloud environment, including bounded-memory retry. Build reached Vite transformation; no successful full build is claimed.
- Normal local Chromium launch failed before navigation (crashpad startup), also with writable HOME/XDG directories. Cloud browser unavailable. Desktop/mobile visual QA remains pending; source checks are not screenshot acceptance.

This is a draft-only change; no merge or production deployment. Preview CI/build and visual verification must be checked before merge.
