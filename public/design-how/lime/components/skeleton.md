---
name: Skeleton
system: lime
kind: component
import: "import {Skeleton, skeletonVariants} from '@/components/lime/ui/skeleton'"
install: "npx shadcn@latest add https://design.how/r/lime/skeleton.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/skeleton
---

# Skeleton

Holds the place of content that is loading, in the shape it will take.

## Use when
- A list, card or figure is loading and its shape is known, such as recent activity or a balance.
- The first load of a screen, so the layout is in place before the words arrive.

## Don't use when
- A piece of work the person started, such as sending money. Use [Button](/systems/lime/components/button.md).
- Work that runs on its own and has a word for its state. Use [Status](/systems/lime/components/status.md).
- The load failed. Use [Error state](/systems/lime/components/error-state.md).

## Minimal example
```tsx
<section aria-busy="true">
  <span className="sr-only">Loading recent activity</span>
  <Skeleton shape="circle"/> <Skeleton className="w-32"/>
</section>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. skeleton-still NEVER Animate a skeleton with a pulse or a sweep; Lime has one looping motion, the spinner. Because a second loop on the page and the spinner stops being the one sign of work.
   - Correct: `<Skeleton className="w-32"/>`
   - Wrong: `<Skeleton className="w-32 animate-pulse"/>`
2. skeleton-busy-region MUST Set aria-busy on the loading region and put one sr-only line in it that says what is loading. Because every Skeleton is aria-hidden, so without the line a screen reader hears nothing load.
   - Correct: `<section aria-busy="true"><span className="sr-only">Loading recent activity</span>...</section>`
3. skeleton-same-shape MUST Match the real content: the same row height, mark size and line count. Because a shorter stand-in pushes the balance and buttons below it down when the data lands.
4. skeleton-vary-widths SHOULD Give lines different widths, as real titles and dates have.
   - Correct: `<Skeleton className="w-32"/><Skeleton className="w-20"/>`
   - Wrong: `<Skeleton/><Skeleton/>`
5. skeleton-few-rows SHOULD Show three to five rows of a list, not a screenful.
6. skeleton-not-for-actions NEVER Put a skeleton in place of a button or a field the person needs; show the control disabled. Because a grey bar takes no focus and has no name, so Send is missing until data lands.
   - Correct: `<Button disabled={loading}>Send</Button>`
   - Wrong: `{loading ? <Skeleton className="h-10 w-24"/> : <Button>Send</Button>}`
7. skeleton-no-lime NEVER Fill a skeleton with lime or a status hue; it is always the grey surface. Because lime marks the next step and status hues mean paid or declined, so a tinted bar reads as one.
   - Correct: `<Skeleton className="w-24"/>`
   - Wrong: `<Skeleton className="w-24 bg-accent"/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `shape` | `'text' \| 'circle' \| 'block'` | `'text'` | A 12px line, a 40px circle or a 96px panel. |
| `className` | `string` |  | Width, and for circle and block the size, to match the content. |
Other props pass through to the root element.

## Variants and states
- shape: text, circle, block

## Accessibility
- [ ] Every skeleton is aria-hidden; the region says Loading once, in an sr-only line.
- [ ] aria-busy on the region tells a screen reader to wait for the content.
- [ ] Nothing moves, so there is nothing to stop under reduced motion.

## Edge cases
- Slow network -> The skeleton stays; after about 10 seconds, say so in the region or show an Error state.
- Fast load -> Show it only if loading takes over 300ms, so it does not flash.
- Dark theme -> The second surface still reads on the dark page.
- Inside a grouped list -> Sits on the warm-grey card one step darker.

## Tokens
--surface-2, --radius-sm, --radius-panel

## Related
- [Error state](/systems/lime/components/error-state.md): What failed to load, in its place, with Try again.
- [Empty](/systems/lime/components/empty.md): An empty state with one action, such as Add a card.
- [Status](/systems/lime/components/status.md): The state of a payment as a dot and a word.
- [List](/systems/lime/components/list.md): Rows of transactions, accounts or settings, each with a mark, a title and a value or a chevron.
