# Shared resource presentation

Design systems, Design.md archives and the component library now share `ResourceCard`, `ResourceDetailHeader` and `ResourceDetailContent` where applicable. One stylesheet controls list geometry, media ratio, typography, search rows, tabs, preview borders and content spacing. The three collections use identical 1.6-ratio cards with 16px titles and 12px metadata, with three/two/one columns at the same breakpoints.

Detail pages share the return action and heading, followed by Preview and files/documentation. Component Source and Integration retain their separate content tabs in the same visual pattern. Design.md exports moved from the sticky side column into Files and downloads. Design system metadata and downloads live in the documentation view. HappyHands uses the shared preview/files container as well. Source documents, videos, iframe isolation and third-party themes remain intact.

Validation:
- Production build and TypeScript passed.
- `test:resources:browser`: 18 list/detail combinations across 390/768/1440px and light Chinese/dark English. Compared actual card widths, top/left alignment, aspect ratios, radii and type sizes across all collections; checked empty search, reset, tab keyboard navigation, back navigation, viewport containment and archive video hover start/stop.
- Existing design import browser checks: all 12 viewport/theme/language combinations passed, including document copy, deep link/reload, retry, exports and standalone system links.
- All 1,342 reference systems render through the existing specimen test suite (5 tests passed).
- HappyHands files tab and export loading checked separately.
- UI audit: 21 files, 5 documented source/demo exceptions, zero findings.
- Normal desktop and phone screenshots reviewed in `test-results/resource-presentation/`. Source preview styling is intentionally retained, including external animation appearance.

Local preview is ready. Await user preview confirmation before merging to production.
