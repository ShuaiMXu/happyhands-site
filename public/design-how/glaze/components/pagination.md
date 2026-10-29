---
name: Pagination
system: glaze
kind: component
import: "import {Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis, PaginationInfo, PaginationNav, paginationRange} from '@/components/glaze/ui/pagination'"
install: "npx shadcn@latest add https://design.how/r/glaze/pagination.json"
registryDependencies: [icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/pagination
---

# Pagination

Moves through pages of results.

## Use when
- A list too long for one screen whose pages have addresses: runs, logs, audit events.
- The footer row of a Table or DataGrid card, at size="sm".
- A cursor API with no total: leave out pages and pass hasNext.

## Don't use when
- Rows the grid holds itself: DataGrid pages them with pageSize. Use [Data grid](/systems/glaze/components/data-grid.md).
- A feed that loads more as the person reads; use a Load more Button at the end. Use [Button](/systems/glaze/components/button.md).
- Switching between two to five views. Use [Segmented control](/systems/glaze/components/segmented-control.md).

## Minimal example
```tsx
<PaginationNav page={page} pages={24} hrefPattern="?page={page}"/>
<PaginationInfo from={51} to={100} total={1204} noun="runs"/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. pagination-links MUST Give every page an href, with getHref or hrefPattern; pass onPageChange only to route on the client. Because a page link without an href is not a link: it cannot open in a new tab and a screen reader calls it text.
   - Correct:
     ```tsx
     <PaginationNav page={page} pages={24} getHref={p => `?page=${p}`} onPageChange={(p, e) => { e.preventDefault(); setPage(p); }}/>
     ```
   - Wrong: `<PaginationNav page={page} pages={24} onPageChange={setPage}/> // no href`
2. pagination-nav MUST Use PaginationNav for pages from data; never build the number row by hand. Because PaginationNav keeps seven slots of one width, so Next never moves under the pointer, and it falls back to "Page 4 of 24" when the row does not fit.
   - Correct: `<PaginationNav page={page} pages={pages} hrefPattern="?page={page}"/>`
   - Wrong: `` {Array.from({length: pages}, (_, i) => <PaginationLink href={`?page=${i + 1}`}>{i + 1}</PaginationLink>)} ``
3. pagination-current-flat NEVER Put glass, a Button or an ink fill on the current page; isActive gives it the pressed wash and aria-current. Because the current page is where the person is, not a thing to press, and glass there would compete with the page's one primary.
   - Correct: `<PaginationLink href="?page=4" isActive>4</PaginationLink>`
   - Wrong: `<Button size="sm">4</Button>`
4. pagination-size-in-card MUST Set size="sm" when the pagination sits on a card's footer row. Because the footer row is 26px plus the shell's inset, and a 32px link pushes the shell open.
   - Correct: `<CardFooter><PaginationNav size="sm" page={2} pages={9}/></CardFooter>`
   - Wrong: `<CardFooter><PaginationNav page={2} pages={9}/></CardFooter>`
5. pagination-info SHOULD Pair the links with PaginationInfo, the range and the total, at the start of the row. Because the numbers say which page, the range says which records, and only the range answers "how many are there".
6. pagination-cursor MUST With a cursor API, leave out pages and pass hasNext; never invent a total. Because a guessed page count sends the person to pages that do not exist.
   - Correct: `<PaginationNav page={3} hasNext={!!cursor}/>`
   - Wrong: `<PaginationNav page={3} pages={99}/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `page` | `number` |  | The page shown, from 1. |
| `pages` | `number` |  | Total pages. Leave out for a cursor API. |
| `hasNext` | `boolean` |  | With a cursor API: whether Next goes anywhere. |
| `getHref` | `(page) => string` |  | Each page's href, from a client component. |
| `hrefPattern` | `string` | `'?page={page}'` | The href with {page} in it, from a server component. |
| `onPageChange` | `(page, event) => void` |  | For client routing; call event.preventDefault() to keep the URL. |
| `size` | `'sm' \| 'default'` | `'default'` | 26 or 32px pills. sm on a card's footer row. |
| `PaginationLink isActive, disabled` | `boolean` | `false` | The current page; a page that cannot be reached. |
| `PaginationInfo` | `{from, to, total?, noun?}` |  | "51–100 of 1,204 runs" in tabular figures. |
Other props pass through to the nav element (PaginationNav, Pagination).

## Variants and states
- size: sm, default
- mode: numbered, compact, cursor
- states: rest, hover, focus-visible, current, disabled
- when states meet, the first wins: disabled > current > focus-visible > hover > rest

## Accessibility
- [ ] The nav is named "Pagination"; each number is a link named "Page 4", the current one with aria-current="page".
- [ ] Previous and Next are named "Previous page" and "Next page" when only their arrows show.
- [ ] A page that cannot be reached keeps its place, takes aria-disabled and leaves the tab order (no href).
- [ ] Focus is the 2px ink ring inside the pill, so a clipping footer row never cuts it.
- [ ] Wrap PaginationInfo in role="status" where a page change should be announced without a navigation.

## Keyboard
- `Tab`: Moves through Previous, the page links and Next; a disabled end is skipped.
- `Enter`: Follows the link.

## Edge cases
- 1,204 pages -> Every slot is four digits wide on every page, so Next stays put.
- Narrow box -> The numbers give way to "Page 4 of 24" between the arrows; the arrows never leave the box.
- One page -> Both arrows are disabled; DataGrid hides the links and keeps the range.
- Right to left -> The row and the arrows mirror.
- Under 448px of room -> Previous and Next drop their words and keep their names.

## Tokens
--control, --control-sm, --radius-pill, --hover, --pressed, --text-1, --text-2, --text-3, --text-disabled, --type-label, --type-label-sm, --type-caption, --focus, --dur-state

## Related
- [Data grid](/systems/glaze/components/data-grid.md): Sorts, selects and pages records from data.
- [Table](/systems/glaze/components/table.md): Lists records that share the same fields.
- [Segmented control](/systems/glaze/components/segmented-control.md): Switches between a few views of one thing.
