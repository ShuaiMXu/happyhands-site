---
name: Empty state
system: sodium
kind: component
import: "import {Empty, EmptyIcon, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyCode, EmptyRetry, emptyVariants} from '@/components/sodium/ui/empty-state'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/empty-state.json"
registryDependencies: [button, icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/empty-state
---

# Empty state

Explains why a region is empty.

## Use when
- A list, table or frame has nothing to show yet, and the person can make the first one.
- A search or filter matched nothing.
- The person cannot see this, or it failed to load.

## Don't use when
- It is still loading. Use [Skeleton](/systems/sodium/components/skeleton.md).
- Part of a view failed and the rest is fine. Use [Alert](/systems/sodium/components/alert.md).

## Minimal example
```tsx
<Empty reason="no-results">
  <EmptyIcon/>
  <EmptyHeader>
    <EmptyTitle>No tables match orders_v</EmptyTitle>
    <EmptyDescription>Clear the filter to see all 214 tables.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent><Button variant="secondary">Clear filter</Button></EmptyContent>
</Empty>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. empty-state-reason MUST Set reason to why it is empty: empty, no-results, no-access or error. Because the reason picks the glyph, and error adds role="alert" and the failure colour.
   - Correct: `<Empty reason="error"><EmptyTitle>Could not load runs</EmptyTitle></Empty>`
   - Wrong: `<Empty><EmptyTitle>Could not load runs</EmptyTitle></Empty>`
2. empty-state-one-action MUST Give it at most one action, secondary unless it is the only way forward on the page. Because an empty region with two buttons asks the person to choose before they know what is there.
   - Correct: `<EmptyContent><Button>Create pipeline</Button></EmptyContent>`
   - Wrong: `<EmptyContent><Button>Create</Button><Button>Import</Button></EmptyContent>`
3. empty-state-no-illustration NEVER Add an illustration, a big icon or a tinted tile. Because Sodium is rules and words; the glyph in its ruled square is all the picture an empty region gets.
   - Correct: `<Empty><EmptyIcon/></Empty>`
   - Wrong: `<Empty><img src="/empty-box.svg"/></Empty>`
4. empty-state-plain-in-frame MUST Use variant="plain" inside a frame, a list or a table. Because the framed variant draws its own edge, a box inside the frame.
   - Correct: `<section className="frame"><Empty variant="plain">`
   - Wrong: `<section className="frame"><Empty>`
5. empty-state-error-id SHOULD Show the request ID in EmptyCode on an error, so the person can quote it.
   - Correct: `<EmptyDescription>Request <EmptyCode>req_8f2a91</EmptyCode> timed out.</EmptyDescription>`
6. empty-state-title-sentence SHOULD Write the title as a sentence that names what is missing, in sentence case.
   - Correct: `<EmptyTitle>No pipelines yet</EmptyTitle>`
   - Wrong: `<EmptyTitle>Empty</EmptyTitle>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `reason` | `'empty' \| 'no-results' \| 'no-access' \| 'error'` | `'empty'` | The glyph; error adds role="alert" and the failure colour. |
| `variant` | `'framed' \| 'plain'` | `'framed'` | plain inside a frame, a list or a table. |
| `size` | `'default' \| 'sm'` | `'default'` | A 40 or 32px glyph square, and less padding. |
| `EmptyIcon icon` | `SodiumIcon` |  | Another glyph from Sodium's icon file in place of the reason's. |
| `EmptyRetry onRetry` | `() => Promise` |  | Pending while it runs; a failed retry says so in place. |
Other props pass through to the root div.

## Variants and states
- reason: empty, no-results, no-access, error
- size: default, sm
- states: rest, retry failed

## Accessibility
- [ ] error is role="alert", so it is announced when it replaces the content.
- [ ] The title is an h3; give it the level the page needs with render or a heading of your own.
- [ ] Titles text-1 18.3:1, error titles fail-text 6.5:1, descriptions text-2 7.8:1; the glyph is aria-hidden.
- [ ] EmptyRetry keeps its box while pending and reports a failed retry in a status region.

## Edge cases
- Narrow column -> The description wraps at the hint measure; the action wraps under it.
- Retry fails again -> Says "Retry 2 failed at 14:03:12" beside the button.
- Retry succeeds -> The caller swaps in the content and moves focus to it.

## Tokens
--line, --page, --text-1, --text-2, --text-3, --fail, --fail-text, --measure-hint, --type-heading-sm, --type-body-sm, --type-body

## Related
- [Skeleton](/systems/sodium/components/skeleton.md): Holds the shape of content while it loads.
- [Alert](/systems/sodium/components/alert.md): Reports a problem or a change in the current view.
