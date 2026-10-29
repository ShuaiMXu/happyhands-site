---
name: Skeleton
system: sodium
kind: component
import: "import {Skeleton, SkeletonText, SkeletonRows, SkeletonSwap} from '@/components/sodium/ui/skeleton'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/skeleton.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/skeleton
---

# Skeleton

Holds the shape of content while it loads.

## Use when
- A region waits on its first load and its shape is known: a list of rows, a data list, a header.

## Don't use when
- A task with a count. Use [Progress](/systems/sodium/components/progress.md).
- A button waiting on its own action. Use [Button](/systems/sodium/components/button.md).
- The load failed or returned nothing. Use [Empty state](/systems/sodium/components/empty-state.md).

## Minimal example
```tsx
<SkeletonSwap loading={!tables} label="Loading tables" fallback={<SkeletonRows rows={8}/>}>
  <TableList tables={tables}/>
</SkeletonSwap>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. skeleton-still NEVER Animate a skeleton: no pulse, no sweep. Because Sodium has one loop, the pending mark, and a moving block is a second one that says nothing the block does not.
   - Correct: `<Skeleton className="h-4 w-32"/>`
   - Wrong: `<Skeleton className="h-4 w-32 animate-pulse"/>`
2. skeleton-swap MUST Show a skeleton through SkeletonSwap, not a bare loading ternary. Because SkeletonSwap waits 150ms before it shows and holds 400ms once shown, so a fast load never flashes.
   - Correct: `<SkeletonSwap loading={loading} fallback={<SkeletonRows/>}><List/></SkeletonSwap>`
   - Wrong: `{loading ? <SkeletonRows/> : <List/>}`
3. skeleton-not-on-refresh NEVER Swap content already on screen back to a skeleton on a refresh. Because the person loses their place in what they were reading; SkeletonSwap keeps the content and marks it busy.
   - Correct: `<SkeletonSwap loading={isLoading}>`
   - Wrong: `<SkeletonSwap loading={isFetching}>`
4. skeleton-text-role MUST Pass SkeletonText the type role of the text it stands in for. Because each line is one line box of that role, so the heights match and nothing moves when the text lands.
   - Correct: `<SkeletonText type="body-sm" lines={3}/>`
   - Wrong: `<SkeletonText lines={3}/>`
5. skeleton-square NEVER Round a skeleton, even one for an avatar. Because every corner in Sodium is square, the avatar included.
   - Correct: `<Skeleton className="size-6"/>`
   - Wrong: `<Skeleton className="size-6 rounded-full"/>`
6. skeleton-rows-page SHOULD Give SkeletonRows the page size, so the frame keeps its height when the rows land.
   - Correct: `<SkeletonRows rows={pageSize}/>`
   - Wrong: `<SkeletonRows/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Skeleton className` | `string` |  | The size of the real thing. |
| `SkeletonText type, lines, last` | `TextRole, number, number` | `'body', 1, 0.6` | Line boxes of a role; last is the last line's width. |
| `SkeletonRows rows` | `number` | `4` | 40px rows on the faint rules. |
| `SkeletonSwap loading, fallback, label` | `boolean, ReactNode, string` |  | Shows the fallback without a flash. |
| `SkeletonSwap delay, minDuration` | `number` | `150, 400` | ms before it shows, and the least it stays. |
Other props pass through to the root element.

## Variants and states
- shape: block, text, rows
- states: hidden for 150ms, shown, refreshing

## Accessibility
- [ ] Every skeleton is aria-hidden; SkeletonSwap holds a status region that says the label once it shows.
- [ ] The region is aria-busy while loading and while refreshing.

## Edge cases
- Load under 150ms -> The skeleton never shows; its space is held, so nothing moves.
- Load at 170ms -> The skeleton shows for 400ms, so it does not blink.
- Refresh -> The content stays and the region is aria-busy.
- Forced colours -> Blocks draw in GrayText.

## Tokens
--well, --row, --line-faint, --marker

## Related
- [Empty state](/systems/sodium/components/empty-state.md): Explains why a region is empty.
- [Progress](/systems/sodium/components/progress.md): Shows how far a task got.
