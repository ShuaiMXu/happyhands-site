---
name: Pagination
system: sodium
kind: component
import: "import {Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis, PaginationInfo, PaginationNav, paginationRange} from '@/components/sodium/ui/pagination'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/pagination.json"
registryDependencies: [icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/pagination
---

# Pagination

Moves through pages of results.

## Use when
- A list or a table too long for one page: jobs, runs, partitions.
- The person needs to say "page 4" or share a link to it.

## Don't use when
- A log that streams; let it scroll. Use [Button](/systems/sodium/components/button.md).
- Moving through the sections of one page. Use [Numbered tabs](/systems/sodium/components/numbered-tabs.md).

## Minimal example
```tsx
<div className="flex flex-col gap-2">
  <PaginationInfo from={51} to={100} total={1204} noun="jobs"/>
  <PaginationNav page={2} pages={25} hrefPattern="?page={page}"/>
</div>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. pagination-links MUST Give every page an href with getHref or hrefPattern, even when onPageChange handles the click. Because a real link opens in a new tab and can be shared, and the page survives a reload.
   - Correct: `<PaginationNav page={page} pages={25} hrefPattern="?page={page}" onPageChange={go}/>`
   - Wrong: `<PaginationNav page={page} pages={25} onPageChange={setPage}/>`
2. pagination-current-wash NEVER Mark the current page with the yellow slab or an edged box. Because the current page is where you are, so it takes the selection wash; the slab is for the one action.
   - Correct: `<PaginationLink isActive>4</PaginationLink>`
   - Wrong: `<PaginationLink isActive className="slab">4</PaginationLink>`
3. pagination-cursor MUST Leave out pages for a cursor API and pass hasNext. Because a made-up total promises pages that are not there.
   - Correct: `<PaginationNav page={3} hasNext={!!cursor}/>`
   - Wrong: `<PaginationNav page={3} pages={999}/>`
4. pagination-info SHOULD Pair it with PaginationInfo, saying the range and the total. Because the numbers say where you are; the range says what you are looking at.
5. pagination-size SHOULD Use size="sm" in a frame's footer row. Because the 26px cells sit in a 40px row with clear space.
6. pagination-disabled-stays NEVER Hide Previous on the first page or Next on the last. Because the row would shift, and the person aiming at Next would hit a number.
   - Correct: `<PaginationPrevious disabled={page <= 1} …/>`
   - Wrong: `{page > 1 && <PaginationPrevious …/>}`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `PaginationNav page` | `number` |  | The page shown, from 1. |
| `PaginationNav pages` | `number` |  | Total; leave out for a cursor API. |
| `PaginationNav hasNext` | `boolean` |  | Cursor only: a next page exists. |
| `PaginationNav getHref, hrefPattern` | `function, string` | `'?page={page}'` | Each page's link. |
| `PaginationNav onPageChange` | `(page, event) => void` |  | Client routing; preventDefault keeps the URL. |
| `PaginationNav size` | `'default' \| 'sm'` | `'default'` | 32 or 26px cells. |
| `PaginationInfo from, to, total, noun` | `number, number, number, string` |  | "51–100 of 1,204 jobs". |
Other props pass through to the root element.

## Variants and states
- mode: numbered, cursor, compact
- size: default, sm
- states: rest, hover, current, focus-visible, disabled
- when states meet, the first wins: current > disabled > focus-visible > hover > rest

## Accessibility
- [ ] A nav named "Pagination"; the current page has aria-current="page".
- [ ] Every page link is named "Page n"; Previous and Next keep their names when only the arrow shows.
- [ ] The current page is text-1 on the selection wash at 16.4:1 and 11.7:1; the others text-2 at 7.8:1.
- [ ] A disabled link has aria-disabled and no href, so it leaves the tab order.

## Keyboard
- `Tab`: Moves through Previous, the pages and Next.
- `Enter`: Follows the link.

## Edge cases
- Page 1 of 1,204 -> Seven slots, each as wide as "1,204", so Next never moves.
- Phone, 390 wide -> Previous and Next become arrows; if the numbers still do not fit, "Page 4 of 24".
- Cursor API -> Previous, "Page 3" and Next.
- Right to left -> The arrows mirror and the pages run right to left.
- Inside a flex row -> It measures its own width, so give it one (w-full or a basis); it has no width from its content.

## Tokens
--control, --control-sm, --selected, --hover, --pressed, --type-label, --type-label-sm, --type-code-sm, --text-1, --text-2, --text-3, --text-disabled, --space-4

## Related
- [Breadcrumb](/systems/sodium/components/breadcrumb.md): Shows where the page sits, as a path.
- [Button group](/systems/sodium/components/button-group.md): Joins related buttons into one control.
