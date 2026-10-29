---
name: Empty
system: lime
kind: component
import: "import {Empty, EmptyIcon, EmptyTitle, EmptyDescription, EmptyActions} from '@/components/lime/ui/empty'"
install: "npx shadcn@latest add https://design.how/r/lime/empty.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/empty
---

# Empty

Fills a blank space with what goes there and how to start.

## Use when
- A list, grid or feed with no items yet, where an action makes the first.
- A search or filter that returned nothing.
- A tab or panel whose content has not been created.

## Don't use when
- Content is still loading. Show its shape. Use [Skeleton](/systems/lime/components/skeleton.md).
- Something failed to load. Say what failed and offer a retry. Use [Error state](/systems/lime/components/error-state.md).
- One missing field. Use the field hint or placeholder.

## Minimal example
```tsx
<Empty>
  <EmptyTitle>No transactions yet</EmptyTitle>
  <EmptyDescription>Add a card and your spending shows up here.</EmptyDescription>
  <EmptyActions><Button>Add a card</Button></EmptyActions>
</Empty>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. empty-one-lime-action MUST Make the action that fills the region the primary button; any second action is ghost. Because two lime buttons leave the person unsure which one fills the list.
   - Correct: `<EmptyActions><Button>Add a card</Button><Button variant="ghost">Link a bank</Button></EmptyActions>`
   - Wrong: `<EmptyActions><Button>Add a card</Button><Button>Link a bank</Button></EmptyActions>`
2. empty-filtered-vs-first MUST Say no matches and offer to clear when a filter emptied the list; never the first-use message. Because "No transactions yet" on a filtered list tells the person their money is gone.
   - Correct: `<EmptyTitle>No matches</EmptyTitle><Button variant="ghost" onClick={clearFilters}>Clear filters</Button>`
   - Wrong: `<EmptyTitle>No transactions yet</EmptyTitle> // a Dining filter is on`
3. empty-title-names-the-thing SHOULD Name what is missing in the title, sentence case, such as No transactions yet.
   - Correct: `<EmptyTitle>No transactions yet</EmptyTitle>`
   - Wrong: `<EmptyTitle>Oops! Nothing to see here</EmptyTitle>`
4. empty-help-says-how SHOULD Say how the region gets filled in one sentence with the real step; do not restate the title.
   - Correct: `<EmptyDescription>Add a card or link a bank to see your spending here.</EmptyDescription>`
   - Wrong: `<EmptyDescription>There are no transactions at the moment.</EmptyDescription>`
5. empty-no-illustration NEVER Add an illustration, mascot or emoji; keep the 24px icon in its well. Because an emoji brings its own platform colors and size into a well sized for a 24px icon.
   - Correct: `<EmptyIcon><Icon icon={Wallet} size={24}/></EmptyIcon>`
   - Wrong: `<EmptyIcon>🎬</EmptyIcon>`
6. empty-two-buttons MUST Show one or two buttons in EmptyActions, never more. Because a third button wraps to a second line at 390px and buries the one next step.
7. empty-after-load MUST Render Empty only after the load returns no items; show a skeleton while loading. Because an empty list during the fetch flashes "No transactions yet" at someone who has many.
   - Correct: `{loading ? <Skeleton/> : items.length === 0 && <Empty>...</Empty>}`
   - Wrong: `{items.length === 0 && <Empty>...</Empty>} // while loading`
8. empty-heading-level SHOULD Place EmptyTitle (a fixed h3) under an h2 so no heading level is skipped.
9. empty-no-frame SHOULD Put Empty straight in the region it empties; never wrap it in a card or give it a fill to frame it.
   - Correct: `<Empty>...</Empty>`
   - Wrong: `<Card><Empty>...</Empty></Card>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Empty` | `ComponentProps<'div'>` |  | The region, with no fill. className sets width. |
| `EmptyIcon` | `ComponentProps<'div'>` |  | A 48px well for a 24px Icon; aria-hidden. |
| `EmptyTitle` | `ComponentProps<'h3'>` |  | A fixed h3. |
| `EmptyDescription` | `ComponentProps<'p'>` |  | One line of help, up to 24rem. |
| `EmptyActions` | `ComponentProps<'div'>` |  | A centered wrapping row for one or two buttons. |
Other props pass through to the root element.

## Variants and states
- content: first use, no results, no action, two actions
- states: rest

## Accessibility
- [ ] The region is not focusable; Tab goes to the first action.
- [ ] EmptyTitle is a heading level 3; EmptyIcon is aria-hidden.
- [ ] Buttons carry their own states and focus ring.

## Edge cases
- Long title -> Wraps and stays centered; an unbroken string overflows.
- Narrow to 120px -> Buttons wrap onto separate lines; side padding stays 24px.
- Right to left -> Content is centered and nothing mirrors; action order follows the direction.
- No children -> A 40px padded gap that says nothing; always pass a title.
- Failed load -> Not an empty list; show an error with a retry instead.
- Forced colors -> Nothing to drop: the region has no fill or border, and the icon well loses its fill.

## Tokens
--surface, --fg-2, --text-lg, --weight-semibold, --leading-tight, --text-sm

## Related
- [Status](/systems/lime/components/status.md): The state of a payment as a dot and a word.
- [Card](/systems/lime/components/card.md): A grouped block, such as a savings goal or a card, on warm grey, outlined or raised.
- [Button](/systems/lime/components/button.md): Starts an action, such as Send money. The lime primary is the one glowing action on a screen.
