---
name: Breadcrumb
system: sodium
kind: component
import: "import {Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis, BreadcrumbValue, BreadcrumbTrail} from '@/components/sodium/ui/breadcrumb'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/breadcrumb.json"
registryDependencies: [button, dropdown-menu, icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/breadcrumb
---

# Breadcrumb

Shows where the page sits, as a path.

## Use when
- A page deep in a hierarchy: a run of a pipeline in a project.
- The person needs one press back to any level above.

## Don't use when
- Panels of one view. Use [Tabs](/systems/sodium/components/tabs.md).
- The steps of an order. Use [Numbered tabs](/systems/sodium/components/numbered-tabs.md).

## Minimal example
```tsx
<BreadcrumbTrail items={[
  {label: 'Pipelines', href: '/pipelines'},
  {label: 'ingest-events', href: '/pipelines/ingest-events', value: true},
  {label: 'Runs', href: '/pipelines/ingest-events/runs'},
  {label: 'run_8f2a91c0d4e5b6a7', value: true},
]}/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. breadcrumb-values-as-written MUST Mark a name a person gave a thing (a pipeline, a table, a run ID) as a value, so it reads in mono as written. Because the label role capitalises, and INGEST-EVENTS is not the pipeline's name; a value is compared by its characters.
   - Correct: `{label: 'ingest-events', href: '/pipelines/ingest-events', value: true}`
   - Wrong: `{label: 'ingest-events', href: '/pipelines/ingest-events'}`
2. breadcrumb-current-not-link MUST End with the current page as BreadcrumbPage, not a link. Because a link to the page you are on goes nowhere, and aria-current="page" tells a screen reader where you are.
   - Correct: `<BreadcrumbPage>4812</BreadcrumbPage>`
   - Wrong: `<BreadcrumbLink href="/runs/4812">4812</BreadcrumbLink>`
3. breadcrumb-trail-from-data SHOULD Build the trail from data with BreadcrumbTrail. Because it folds the middle into a menu and truncates the page when the row runs out, so it never wraps.
4. breadcrumb-slash NEVER Replace the slash with a chevron or an arrow. Because a trail of places in a data tool is a path, and a chevron reads as "next step".
   - Correct: `<BreadcrumbSeparator/>`
   - Wrong: `<BreadcrumbSeparator><Icon icon={ChevronRight}/></BreadcrumbSeparator>`
5. breadcrumb-not-title NEVER Use the breadcrumb as the page title. Because it is navigation; the page still needs its one h1.
   - Correct:
     ```tsx
     <BreadcrumbTrail items={…}/>
     <h1 className="type-title">Run 4812</h1>
     ```
   - Wrong: `<BreadcrumbTrail items={…}/>`
6. breadcrumb-router-link SHOULD Pass renderLink for a router's Link. Because every crumb then navigates without a full reload.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `BreadcrumbTrail items` | `{label, href?, value?}[]` |  | Root first, current page last. |
| `BreadcrumbTrail renderLink` | `(href) => ReactElement` |  | A router's Link. |
| `BreadcrumbValue children` | `string` |  | Mono as written; past 22 characters the middle is cut. |
| `BreadcrumbLink render` | `ReactElement` | `<a>` | Renders another link element. |
| `BreadcrumbSeparator children` | `ReactNode` | `'/'` | The slash in text-3. |
Other props pass through to the root element.

## Variants and states
- content: labels, labels and values
- fit: full, folded
- states: rest, link hover, link focus-visible, folded

## Accessibility
- [ ] A nav named "Breadcrumb" holding an ordered list; the current page has aria-current="page".
- [ ] Separators are hidden from screen readers.
- [ ] A cut value keeps its whole text as the accessible name.
- [ ] Links are text-2 at 7.8:1 and turn text-1 with an underline under the pointer.

## Keyboard
- `Tab`: Moves from link to link, then to the fold button.
- `Enter`: Follows a link, or opens the fold menu.

## Edge cases
- Phone, 390 wide -> Middle crumbs fold into the More menu first, then the page truncates.
- A long run ID -> Cut in the middle with its prefix kept: run_8f2a…e5b6a7.
- One level -> Only the page shows, and truncates if it must.
- Right to left -> The trail runs right to left; the slash stays a slash.

## Tokens
--text-1, --text-2, --text-3, --line-control, --type-label, --type-code, --control-sm, --popover

## Related
- [Tabs](/systems/sodium/components/tabs.md): Switches between panels of one view.
- [Pagination](/systems/sodium/components/pagination.md): Moves through pages of results.
