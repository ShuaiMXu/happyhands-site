---
name: Empty state
system: glaze
kind: component
import: "import {Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyCode, EmptyRetry, emptyVariants} from '@/components/glaze/ui/empty-state'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/empty-state.json"
registryDependencies: [button, icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/empty-state
---

# Empty state

Explains why a region is empty.

## Use when
- A list, a table or a card has no rows yet, or a search matched none.
- The person cannot see a region, or it failed to load.

## Don't use when
- The content is still loading. Use [Skeleton](/systems/glaze/components/skeleton.md).
- A problem with content that is on screen. Use [Alert](/systems/glaze/components/alert.md).

## Minimal example
```tsx
<Empty>
  <EmptyHeader><EmptyTitle>No agents yet</EmptyTitle><EmptyDescription>An agent answers tickets.</EmptyDescription></EmptyHeader>
  <EmptyContent><Button size="sm" variant="secondary">Create agent</Button></EmptyContent>
</Empty>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. empty-state-reason MUST Set reason to why it is empty: empty, no-results, no-access or error. Because each picks its glyph and error adds role="alert" and the failure colour, so a failed load drawn as empty tells the person to create what already exists.
   - Correct: `<Empty reason="error"><EmptyTitle>Runs did not load</EmptyTitle></Empty>`
   - Wrong: `<Empty><EmptyTitle>Runs did not load</EmptyTitle></Empty>`
2. empty-state-query-back MUST Write the search or filter back in a no-results title, in <code>, and offer to clear it. Because a bare "No results" leaves the person guessing which filter emptied the list.
   - Correct: `<EmptyTitle>No runs match <code>timeout</code></EmptyTitle>`
   - Wrong: `<EmptyTitle>No results</EmptyTitle>`
3. empty-state-plain-inside MUST Use variant="plain" inside a Card, an ItemGroup or a table; panel only on its own. Because panel draws the white surface, and a panel inside a card's panel is a box in a box.
   - Correct: `<CardContent><Empty variant="plain" size="sm">...</Empty></CardContent>`
   - Wrong: `<CardContent><Empty>...</Empty></CardContent>`
4. empty-state-centred MUST Let Empty centre itself: the reason's glyph on top, then EmptyTitle, one line of EmptyDescription and EmptyContent, in one column. Because Empty draws the 40px light glyph in text-3 (32 at size="sm") and the compact rhythm, so a hand-built row or a start-aligned override breaks the one shape every empty region shares.
   - Correct:
     ```tsx
     <Empty>
       <EmptyHeader><EmptyTitle>No agents yet</EmptyTitle><EmptyDescription>An agent answers tickets.</EmptyDescription></EmptyHeader>
     </Empty>
     ```
   - Wrong: `<Empty className="items-start text-start">...</Empty>`
5. empty-state-no-art NEVER Add an illustration, a second glyph or your own icon tile; pass EmptyTitle icon to change the glyph. Because the region is compact, and art pushes the one action below the fold for no information.
   - Correct: `<EmptyTitle icon={Bot}>No agents yet</EmptyTitle>`
   - Wrong: `<div className="size-16 rounded-pill bg-field"><Icon icon={Bot} size={24}/></div>`
6. empty-state-retry MUST Retry a failed load with EmptyRetry and a promise that rejects when it fails again. Because EmptyRetry holds its box while it runs and says "Retry 2 failed at 14:03:12", so a dead endpoint never looks like a dead button.
   - Correct: `<EmptyRetry onRetry={load}/>`
   - Wrong: `<Button onClick={load}>Retry</Button>`
7. empty-state-one-way MUST Offer at most one action in EmptyContent: variant="secondary" by default, primary only when it is the only way forward. Because the region has one job, and an ink pill on every empty list makes creating things look like the page's next step.
   - Correct: `<EmptyContent><Button size="sm" variant="secondary">Create agent</Button></EmptyContent>`
   - Wrong:
     ```tsx
     <EmptyContent><Button size="sm">Create agent</Button><Button size="sm" variant="secondary">Import</Button></EmptyContent>
     ```
8. empty-state-one-line SHOULD Keep EmptyDescription to one line: why it is empty or what the action does. Because a paragraph centred under a glyph reads as a landing page, not a region waiting for rows.
9. empty-state-focus SHOULD Move focus to the first row after a successful retry. Because the Retry button that held focus is gone once the content replaces the Empty.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `reason` | `'empty' \| 'no-results' \| 'no-access' \| 'error'` | `'empty'` | Picks the glyph; error adds role="alert" and the failure colour. |
| `variant` | `'panel' \| 'plain'` | `'panel'` | Its own white panel, or none inside another surface. |
| `size` | `'default' \| 'sm'` | `'default'` | A 40 or 32px glyph and 24 or 16px of room; sm in tables and menus. |
| `EmptyTitle icon` | `GlazeIcon \| false` |  | Replaces or hides the reason's glyph over the title. |
| `EmptyRetry onRetry` | `() => Promise<unknown>` |  | Runs the retry; reject when it fails again. |
Other props pass through to the root div.

## Variants and states
- reason: empty, no-results, no-access, error
- size: default, sm
- states: rest, focus-visible, retrying, retry failed

## Accessibility
- [ ] The title is an h3; change the tag in the installed file where the page needs another level.
- [ ] error is role="alert"; the retry's second failure speaks once through a status line.
- [ ] The glyph is decorative; the title says the reason in words.
- [ ] Description is text-2, 5.5:1 on paper; the error title is fail-text, 5.9:1.

## Keyboard
- `Tab`: Moves to the action.
- `Enter`: Presses it; EmptyRetry blocks repeats while pending.

## Edge cases
- Long query -> The code in the title breaks anywhere rather than overflowing.
- Retry fails again -> The button returns to rest and the line says which retry failed and when.
- Narrow at 390 -> The column stays centred and the title and description wrap, balanced.
- Dark theme -> The panel and the words flip with the tokens.

## Tokens
--paper, --line-faint, --radius-panel, --text-1, --text-2, --text-3, --fail-text, --type-label, --type-body-sm, --type-caption, --measure-hint, --space-3, --space-4, --space-6

## Related
- [Skeleton](/systems/glaze/components/skeleton.md): Holds the shape of content while it loads.
- [Alert](/systems/glaze/components/alert.md): Reports a problem with the current view.
- [Card](/systems/glaze/components/card.md): Groups content about one thing.
