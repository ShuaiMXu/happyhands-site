---
name: Separator
system: lime
kind: component
import: "import {Separator} from '@/components/lime/ui/separator'"
install: "npx shadcn@latest add https://design.how/r/lime/separator.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/separator
---

# Separator

Draws a thin line between two groups of things.

## Use when
- Two groups in a card or panel that read as one block without a break.
- Items in a row, such as two counts, with a vertical line between.

## Don't use when
- Two cards or sections that already have a surface. Use [Card](/systems/lime/components/card.md).
- Rows of a table; Table draws its row lines. Use [Table](/systems/lime/components/table.md).
- A title over a section. Use a heading.

## Minimal example
```tsx
<Separator/>
<div className="flex h-5 items-center gap-3"><span>24</span><Separator orientation="vertical"/><span>12</span></div>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. separator-space-first SHOULD Try 24px of space, then a surface, before a line.
2. separator-vertical-height MUST Put a vertical separator in a row with a set height. Because it is h-full, which resolves to nothing in a row with no height, so the line vanishes.
   - Correct: `<div className="flex h-5 items-center"><span/><Separator orientation="vertical"/></div>`
   - Wrong: `<div className="flex"><span/><Separator orientation="vertical"/></div>`
3. separator-no-label NEVER Pass a label; write the word as text with a separator on each side. Because Separator has no label prop, so the word never renders.
   - Correct: `<Separator className="flex-1"/><span>or</span><Separator className="flex-1"/> // in a flex row`
   - Wrong: `<Separator label="or"/>`
4. separator-not-between-cards NEVER Put a separator between cards; each is already a grey surface. Because the gap between two grey cards already splits them, and the line adds a third edge.
   - Correct: `<Card/><Card/>`
   - Wrong: `<Card/><Separator/><Card/>`
5. separator-decorative MUST Pass decorative when markup already makes the split, so no separator role is announced. Because two lists already announce their ends, so a screen reader hears an extra separator.
   - Correct: `<ul/><Separator decorative/><ul/>`
   - Wrong: `<ul/><Separator/><ul/>`
6. separator-per-panel SHOULD Use at most three separators in a panel; regroup with headings past that.
7. separator-length-only MUST Set only the length in className; keep the 1px thickness. Because a thicker or darker line competes with the content it was meant to group.
   - Correct: `<Separator className="w-12"/>`
   - Wrong: `<Separator className="h-0.5 bg-fg"/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Vertical needs a parent with a height. |
| `decorative` | `boolean` | `false` | Role none, so no separator is announced. |
Other props pass through to the root element.

## Variants and states
- orientation: horizontal, vertical
- states: rest

## Accessibility
- [ ] The default role is separator with aria-orientation; pass decorative for a purely visual line.
- [ ] A separator takes no focus or input.
- [ ] The line is a background fill; verify it in forced colors, which may drop it.

## Edge cases
- Narrow container -> A horizontal line fills the column at any width.
- Right to left -> The line is symmetric; nothing mirrors.
- Vertical in a row with no height -> It collapses to nothing and is invisible.
- Inside a toolbar or menu -> Use their own separators.
- Zoom 200% -> The line stays 1px.

## Tokens
--line

## Related
- [Card](/systems/lime/components/card.md): A grouped block, such as a savings goal or a card, on warm grey, outlined or raised.
- [Table](/systems/lime/components/table.md): Rows of transactions you scan across, with amounts at the end.
- [Dropdown menu](/systems/lime/components/dropdown-menu.md): A list of commands behind a button.
