---
name: Scroll area
system: lime
kind: component
import: "import {ScrollArea} from '@/components/lime/ui/scroll-area'"
install: "npx shadcn@latest add https://happyhands.cc/r/lime/scroll-area.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/scroll-area
---

# Scroll area

Gives long content its own scrolling box.

## Use when
- A list inside a panel or popover with a fixed height, such as a merchant picker.
- A code block or wide strip of chips that scrolls sideways.
- A panel that must cap its height.

## Don't use when
- The page itself. Let the browser scroll it.
- A long list inside a Select, which caps and scrolls its own popup. Use [Select](/systems/lime/components/select.md).
- A table wider than its column; Table scrolls in its own wrapper. Use [Table](/systems/lime/components/table.md).

## Minimal example
```tsx
<ScrollArea className="h-48 w-64" aria-label="Merchants">
  <ul>...</ul>
</ScrollArea>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. scroll-area-height MUST Give a vertical scroll area a height or max height. Because without one the area grows with its rows and never scrolls.
   - Correct: `<ScrollArea className="h-48"><List/></ScrollArea>`
   - Wrong: `<ScrollArea><List/></ScrollArea>`
2. scroll-area-hint-edge SHOULD Let a row be cut by the edge; the thumb is hidden at rest, so a cut item says there is more.
3. scroll-area-label SHOULD Pass aria-label such as "Merchants"; the viewport is a focus stop and needs a name.
   - Correct: `<ScrollArea aria-label="Merchants">...</ScrollArea>`
   - Wrong: `<ScrollArea>...</ScrollArea>`
4. scroll-area-no-hidden-bar NEVER Hide the scrollbar with CSS; use ScrollArea, which keeps native scrolling and a thumb. Because a hidden bar never shows, even on hover, so a mouse user cannot tell the list scrolls.
   - Correct: `<ScrollArea className="h-48"/>`
   - Wrong: `<div className="overflow-auto [scrollbar-width:none]"/>`
5. scroll-area-one-axis SHOULD Prefer vertical; use orientation="both" only for tables and frames.
   - Correct: `<ScrollArea orientation="vertical">`
   - Wrong: `<ScrollArea orientation="both"> // on a list`
6. scroll-area-focusable MUST Keep the viewport focusable so arrow keys scroll it; never tabIndex -1. Because a keyboard user cannot reach an unfocusable region, so rows below the fold are lost.
   - Correct: `<ScrollArea>...</ScrollArea>`
   - Wrong: `<div className="overflow-auto" tabIndex={-1}/>`
7. scroll-area-overscroll SHOULD Set overscroll-contain in a popover or dialog so scrolling does not chain to the page.
   - Correct: `<ScrollArea className="h-48 overscroll-contain">`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `orientation` | `'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | Which scrollbars to draw. both also draws the corner. |
| `className` | `string` |  | Set the height or width here. |
Other props pass through to the root element.

## Variants and states
- orientation: vertical, horizontal, both
- states: rest, hovering, focus-visible, nothing to scroll

## Accessibility
- [ ] The viewport is a Tab stop that scrolls with arrow keys, Page and Home or End.
- [ ] Focus shows a 2px olive ring inside the edge.
- [ ] Name the region with aria-label.
- [ ] Native scrolling and momentum are kept; the 10px thumb is not for finger dragging.
- [ ] The thumb is a background fill and may vanish in forced colors; scrolling still works.

## Edge cases
- Right to left -> The vertical bar moves to the left edge, following the writing direction. The specimen keeps the thumb shown.
- Long unbroken string -> It overflows sideways and scrolls only if orientation includes horizontal.
- Short content -> No thumb; the area keeps the height you gave it.
- Thousands of items -> Use a virtual list; 500 nodes scroll natively.
- More loads on scroll -> Add your own sentinel; the area has no loading part.
- Reduced motion -> The thumb appears and goes at once.

## Tokens
--line-strong, --control, --scrollbar-thumb, --dur-fast

## Related
- [Table](/systems/lime/components/table.md): Rows of transactions you scan across, with amounts at the end.
- [Select](/systems/lime/components/select.md): One choice from a list, such as an account or a category.
- [Popover](/systems/lime/components/popover.md): An anchored panel with controls, such as splitting a bill.
