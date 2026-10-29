---
name: Breadcrumb
system: glaze
kind: component
import: "import {Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis, BreadcrumbId, BreadcrumbTrail} from '@/components/glaze/ui/breadcrumb'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/breadcrumb.json"
registryDependencies: [button, dropdown-menu, icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/breadcrumb
---

# Breadcrumb

Shows where the page sits.

## Use when
- The page is three or more levels deep: workspace, agent, run.
- A detail page needs a way back to its list and to the levels above it.

## Don't use when
- The page is a peer of its neighbours, such as Runs beside Settings. Use [Tabs](/systems/glaze/components/tabs.md).
- The person moves through a flow in order. Use [Steps](/systems/glaze/components/steps.md).
- The page is one level below home: the page title is enough.

## Minimal example
```tsx
<BreadcrumbTrail items={[
  {label: 'Agents', href: '/agents'},
  {label: 'refund-agent', href: '/agents/refund-agent'},
  {label: 'run_8f2a91c0d4e5b6a7', id: true},
]} renderLink={href => <Link href={href}/>}/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. breadcrumb-trail-from-data SHOULD Use BreadcrumbTrail with items; compose the parts by hand only for a fixed trail of three or fewer. Because the trail measures its container and folds crumbs into a menu in a fixed order, which hand-built parts never do.
   - Correct: `<BreadcrumbTrail items={items}/>`
   - Wrong: `<Breadcrumb><BreadcrumbList>{items.map(renderCrumb)}</BreadcrumbList></Breadcrumb>`
2. breadcrumb-last-is-page MUST Make the last item the current page, with no href. Because the current page is text-1 and not a link, and aria-current="page" tells a screen reader where it is.
   - Correct: `{label: 'Runs'}`
   - Wrong: `{label: 'Runs', href: '/runs'}`
3. breadcrumb-root-first MUST Order items from the root to the current page. Because the trail folds from the left and keeps the current page last, so a reversed list folds the wrong crumbs.
4. breadcrumb-ids-mono MUST Mark an ID crumb with id: true, or wrap it in BreadcrumbId. Because it sets the ID in mono at 0.8 and cuts the middle while keeping the type prefix, so run_8f2a…e5b6a7 stays readable and the line keeps its height.
   - Correct: `{label: 'run_8f2a91c0d4e5b6a7', id: true}`
   - Wrong: `{label: 'run_8f2a91c0d4e5b6a7'}`
5. breadcrumb-router-link MUST Pass renderLink with the router's link, or render on BreadcrumbLink. Because without it every crumb is a plain anchor and each press reloads the page.
   - Correct: `<BreadcrumbTrail items={items} renderLink={href => <Link href={href}/>}/>`
   - Wrong: `<BreadcrumbTrail items={items}/>`
6. breadcrumb-one-per-page NEVER Render two breadcrumbs on one page. Because each is a nav landmark named Breadcrumb, so a screen reader cannot tell them apart.
   - Correct: `<BreadcrumbTrail items={run}/>`
   - Wrong:
     ```tsx
     <BreadcrumbTrail items={agent}/>
     <BreadcrumbTrail items={run}/>
     ```
7. breadcrumb-labels-match-titles SHOULD Use each page's title as its crumb label, and a short plural noun for a list level. Because a crumb that names a page differently from its heading sends the person somewhere they do not recognise.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `items` | `Crumb[]` | `required` | Root first, current page last. A Crumb is {label, href?, id?}. |
| `renderLink` | `(href: string) => ReactElement` |  | Renders each link and each folded item, for a router. |
| `Crumb id` | `boolean` | `false` | Mono with the middle cut (BreadcrumbId). |
| `Breadcrumb parts` | `BreadcrumbList, Item, Link, Page, Separator, Ellipsis, Id` |  | For a fixed trail. BreadcrumbLink takes render. |
| `className` | `string` |  | Placement, on the nav. Give it a width; the trail fits itself to it. |
Other props pass through to the nav.

## Variants and states
- fit: full, folded, cut
- states: link, hover, focus-visible, current

## Accessibility
- [ ] The root is a nav named Breadcrumb holding an ordered list; the chevrons are aria-hidden.
- [ ] The current page has aria-current="page" and is not a link.
- [ ] The fold button names its count ("2 more levels") and opens a menu of real links with arrow keys and Escape.
- [ ] A cut current page carries its full text as a title; a cut ID keeps the whole ID for screen readers.
- [ ] Links are text-2 at 5.5:1 and underline under the pointer, so a link is never told by colour alone; focus is the 2px ink ring.

## Keyboard
- `Tab`: Moves through the links and the fold button; the current page is not a stop.
- `Enter, Space`: Follows a link, or opens the fold menu.

## Edge cases
- Trail too wide -> Middle crumbs fold into the menu from the left, then the current page truncates, then the root joins the menu.
- Current page -> Never shrinks below 80px, and the trail never ends in a chevron.
- One item -> Renders the current page alone and truncates it if it does not fit.
- Long ID -> Past 18 characters it shows the type prefix and 4 characters, an ellipsis and the last 6.
- First paint -> It measures a hidden copy before it decides, so nothing jumps while it folds.
- Container resizes -> It measures again and unfolds as room returns.
- Right to left -> The trail mirrors and the chevrons turn; labels take dir="auto".
- Zoom 200% -> Crumbs fold sooner, and every folded one stays one menu press away.

## Tokens
--text-1, --text-2, --text-3, --line-strong, --hover, --pressed, --control-sm, --radius-tag, --popover, --type-label, --mono-scale, --focus, --dur-state

## Related
- [Tabs](/systems/glaze/components/tabs.md): Switches between panels of one view.
- [Dropdown menu](/systems/glaze/components/dropdown-menu.md): Lists the actions on one thing.
