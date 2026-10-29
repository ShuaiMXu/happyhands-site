---
name: Skeleton
system: glaze
kind: component
import: "import {Skeleton, SkeletonText, SkeletonSwap} from '@/components/glaze/ui/skeleton'"
install: "npx shadcn@latest add https://design.how/r/glaze/skeleton.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/skeleton
---

# Skeleton

Holds the shape of content while it loads.

## Use when
- A list, a card or a number loads on first view and its shape is known.
- The page should not move when the content lands.

## Don't use when
- Content already on screen is being refreshed; keep it and mark it busy. Use [Progress](/systems/glaze/components/progress.md).
- A button's action is running. Use [Button](/systems/glaze/components/button.md).
- Nothing came back. Use [Empty state](/systems/glaze/components/empty-state.md).

## Minimal example
```tsx
<SkeletonSwap loading={loading} fallback={<RowsSkeleton/>} label="Loading runs">
  <Rows/>
</SkeletonSwap>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. skeleton-still NEVER Animate a Skeleton with a pulse or a sweep. Because the pending arc is Glaze's one loop, and a second one draws the eye to the part of the page with nothing in it.
   - Correct: `<Skeleton className="h-4 w-24"/>`
   - Wrong: `<Skeleton className="animate-pulse h-4 w-24"/>`
2. skeleton-swap MUST Show a skeleton through SkeletonSwap, never with loading ? <Skeleton/> : content. Because SkeletonSwap waits 150ms and then holds 400ms, so a fast response never blinks the skeleton on and off.
   - Correct: `<SkeletonSwap loading={loading} fallback={<RowsSkeleton/>}><Rows/></SkeletonSwap>`
   - Wrong: `{loading ? <RowsSkeleton/> : <Rows/>}`
3. skeleton-same-shape MUST Shape the skeleton like the content: the same component, sizes and SkeletonText type roles. Because a skeleton of another height makes the page jump when the content lands, which is the one thing it is for.
   - Correct:
     ```tsx
     <Item><ItemMedia><Skeleton className="size-6"/></ItemMedia><ItemContent><SkeletonText type="label"/></ItemContent></Item>
     ```
   - Wrong: `<Skeleton className="h-40 w-full"/>`
4. skeleton-label MUST Pass label to SkeletonSwap naming what loads: "Loading runs". Because the skeleton is hidden from assistive tech, so the label is all a screen reader hears while it shows.
5. skeleton-not-reload NEVER Replace content the person is reading with a skeleton on a refresh. Because the text they were reading vanishes; SkeletonSwap keeps it, marks it busy and dims it after 150ms.
   - Correct: `<SkeletonSwap loading={refreshing} fallback={<RowsSkeleton/>}><Rows/></SkeletonSwap>`
   - Wrong: `{refreshing ? <RowsSkeleton/> : <Rows/>}`
6. skeleton-avatar-shape SHOULD Round a Skeleton that stands in for a person's avatar with rounded-pill; everything else keeps the tag corner.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Skeleton className` | `string` |  | The size of the real thing: size-6, h-(--control) w-24. |
| `SkeletonText type` | `'heading' \| 'heading-sm' \| 'body' \| 'body-sm' \| 'label' \| 'label-sm' \| 'caption' \| 'code' \| 'code-sm'` | `'body'` | The type role of the text it stands in for. |
| `SkeletonText lines` | `number` | `1` | Lines of that role. |
| `SkeletonText last` | `number` | `0.6` | The last line's width as a fraction. |
| `SkeletonSwap loading` | `boolean` |  | True while loading. |
| `SkeletonSwap fallback` | `ReactNode` |  | The skeleton. |
| `SkeletonSwap delay` | `number` | `--wait-show (150)` | ms before the skeleton shows. |
| `SkeletonSwap minDuration` | `number` | `--wait-hold (400)` | ms it stays once shown. |
| `SkeletonSwap label` | `string` | `'Loading'` | What a screen reader hears. |
Other props pass through to the div (Skeleton, SkeletonText).

## Variants and states
- states: hidden, shown, done, stale

## Accessibility
- [ ] Skeletons are aria-hidden; SkeletonSwap sets aria-busy and speaks its label once in a status region.
- [ ] A reload keeps the content readable and marks it aria-busy.
- [ ] Forced colours fill skeletons with GrayText.

## Edge cases
- Response under 150ms -> The skeleton never shows; the space is held and the content swaps in.
- Response at 170ms -> The skeleton shows and stays to 400ms, so it does not blink.
- Refresh with content shown -> The content stays, busy, and dims after 150ms.
- Request fails -> Set loading false and render an Empty with reason="error" as the content.
- Reduced motion -> Nothing changes: the skeleton is already still.
- Dark theme -> The field flips with the tokens.

## Tokens
--field, --radius-tag, --dur-state, --wait-show, --wait-hold, --stale, --type-body, --type-label

## Related
- [Empty state](/systems/glaze/components/empty-state.md): Explains why a region is empty.
- [Progress](/systems/glaze/components/progress.md): Shows how far a task got.
