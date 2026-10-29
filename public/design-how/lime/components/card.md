---
name: Card
system: lime
kind: component
import: "import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants} from '@/components/lime/ui/card'"
install: "npx shadcn@latest add https://design.how/r/lime/card.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/card
---

# Card

Holds one thing together, like a goal with its details and a button.

## Use when
- A thing the person manages as a unit: a goal, a plan, a card.
- A group of related facts and one or two actions.

## Don't use when
- Rows of data to scan across. Use [Table](/systems/lime/components/table.md).
- A modal task. Use [Dialog](/systems/lime/components/dialog.md).

## Minimal example
```tsx
<Card>
  <CardHeader>
    <CardTitle>Vacation fund</CardTitle>
    <CardDescription>$290 of $480, due in June</CardDescription>
  </CardHeader>
</Card>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. card-outline-on-grey MUST Use outline or raised for a card on a grey area. Because the default card is the same #f6f5f2 as bg-surface, so it loses its edge there.
   - Correct: `<Card variant="outline"/>`
   - Wrong: `<Card/> // on bg-surface`
2. card-one-glow MUST Light one glow card per view and keep the rest surface or outline. Because two lit cards split the eye, and the glow stops meaning the one thing to pick.
   - Correct: `<Card/><Card variant="glow"/>`
   - Wrong: `<Card variant="glow"/><Card variant="glow"/>`
3. card-no-gradient NEVER Write a gradient on a card; use variant="glow". Because a hand-made gradient misses the glow's hover power-up and its forced-colors fallback.
   - Correct: `<Card variant="glow">Upgrade to Plus</Card>`
   - Wrong: `<Card className="bg-gradient-to-br from-accent shadow-xl">Upgrade to Plus</Card>`
4. card-one-action SHOULD Give a card one main action in the footer and keep the rest ghost.
   - Correct: `<CardFooter><Button size="sm" variant="solid">Upgrade</Button></CardFooter>`
5. card-no-nesting NEVER Nest a Card in a Card; use spacing or a divider. Because an inner card is the same grey as the outer one, so it adds padding and a radius with no edge.
   - Correct: `<Card><CardContent>...</CardContent><Separator/><CardContent>...</CardContent></Card>`
   - Wrong: `<Card><CardTitle>Vacation fund</CardTitle><Card>...</Card></Card>`
6. card-title-noun SHOULD Title a card with the thing, in sentence case, not a sentence.
7. card-pressable-one-control MUST Make a whole-card press one control with interactive and href; put no button or link inside it. Because a button nested in the card's button is invalid HTML, and its press also opens the card.
   - Correct: `<Card interactive href="/goals/vacation">...</Card>`
   - Wrong: `<Card interactive onClick={open}><Button/></Card>`
8. card-grid-width SHOULD Take the width from the grid column, not a fixed w-*, which breaks on a phone.
   - Correct: `<div className="grid gap-4 sm:grid-cols-3"><Card/><Card/></div>`
9. card-no-empty MUST Render no Card with nothing in it; it has no empty state. Because an empty card still draws a grey 16px-radius block with 20px padding, a blank tile in the grid.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `variant` | `'surface' \| 'outline' \| 'raised' \| 'glow'` | `'surface'` | Grey, hairline, shadow, or the lit lime. |
| `interactive` | `boolean` | `false` | Hover and press fills and a focus ring; a link with href, else a native button. |
| `className` | `string` |  | Width and placement. |
Other props pass through to the root element.

## Variants and states
- variant: surface, outline, raised, glow
- interactive: false, true
- states: rest, hover, focus-visible, active

## Accessibility
- [ ] A plain card is a div and takes no focus; Tab goes to the first control inside.
- [ ] An interactive card is a link or a native button; Enter and Space run it and a ring shows.
- [ ] CardTitle is an h3; change the level to fit the page outline.
- [ ] Never put a button or link inside an interactive card.

## Edge cases
- Long title and link -> Text wraps at spaces and hyphens; a string with neither overflows. Add break-words where user text is shown.
- Narrow to 120px -> The 20px padding leaves 80px for text.
- Right to left -> Padding is symmetric and text aligns to the start.
- Forced colors -> Glow gets a 1px CanvasText border; surface and raised have no edge. Use outline where the boundary matters.
- Loading -> No loading state. Reserve the height while content loads.

## Tokens
--surface, --surface-2, --page, --raised, --line, --radius-panel, --shadow-card, --accent, --on-accent, --glow-accent-from, --glow-accent-to, --glow-accent-edge, --glow-accent-bloom, --glow-accent-cast, --glow-accent-from-lit, --glow-accent-to-lit, --glow-accent-from-press, --glow-accent-to-press, --fg, --fg-2, --text-sm, --text-lg, --weight-semibold, --leading-tight, --dur-instant, --dur-base, --ease-out

## Related
- [Table](/systems/lime/components/table.md): Rows of transactions you scan across, with amounts at the end.
- [List](/systems/lime/components/list.md): Rows of transactions, accounts or settings, each with a mark, a title and a value or a chevron.
- [Badge](/systems/lime/components/badge.md): A short fact that never changes on its own, such as Plus or New.
