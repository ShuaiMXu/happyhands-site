---
name: Card
system: glaze
kind: component
import: "import {Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter, CardMeta, CardLink} from '@/components/glaze/ui/card'"
install: "npx shadcn@latest add https://design.how/r/glaze/card.json"
registryDependencies: [panel, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/card
---

# Card

Groups content about one thing.

## Use when
- One topic needs its own box on a page: an agent, a run, a decision, this week's usage.
- A decision ends in one action with a way out beside it, in the footer.
- A prompt and its output belong together: two panels in one shell.

## Don't use when
- A list of similar things, one per row, with no header. Use [Item](/systems/glaze/components/item.md).
- A white surface for rows inside your own layout. Use [Panel](/systems/glaze/components/panel.md).
- A message about trouble the person must see. Use [Alert](/systems/glaze/components/alert.md).
- Nothing is here yet. Use [Empty state](/systems/glaze/components/empty-state.md).

## Minimal example
```tsx
<Card>
  <CardHeader><CardTitle>Promote prompt v14</CardTitle><CardDescription>It passed 196 of 200 tickets.</CardDescription></CardHeader>
  <CardFooter>
    <CardMeta>Eval finished 2m ago</CardMeta>
    <Button size="sm" variant="secondary">Not now</Button><Button size="sm">Promote</Button>
  </CardFooter>
</Card>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. card-one-ink MUST Give a CardFooter at most one variant="primary" (ink) Button; make every other action beside it variant="secondary". Because two ink pills side by side split the eye and neither reads as the next step, and the lint's one-primary fails the second.
   - Correct:
     ```tsx
     <CardFooter><Button size="sm" variant="secondary">Not now</Button><Button size="sm">Promote</Button></CardFooter>
     ```
   - Wrong: `<CardFooter><Button size="sm">Not now</Button><Button size="sm">Promote</Button></CardFooter>`
2. card-footer-small MUST Use size="sm" on every Button in a CardFooter, after the CardMeta. Because the footer row is 26px plus the 3px inset, so a default Button pushes the shell open and loses the 3px edge.
   - Correct: `<CardFooter><CardMeta>2m ago</CardMeta><Button size="sm">Promote</Button></CardFooter>`
   - Wrong: `<CardFooter><Button>Promote</Button></CardFooter>`
3. card-no-hand-panel NEVER Draw the shell or the panel by hand around a Card's parts, or add a border or a shadow to Card. Because Card already wraps its body in the panel, so a second box stacks two edges, and every shadow class draws nothing in Glaze.
   - Correct: `<Card><CardHeader>...</CardHeader><CardContent>...</CardContent></Card>`
   - Wrong: `<Card className="shadow-md"><div className="panel p-3">...</div></Card>`
4. card-no-nested NEVER Put a Card or a Panel inside a Card's panel; split rows with rule-row in CardContent flush. Because a box in a box gives two edges where one closes the group, and no one can tell which group a line ends.
   - Correct: `<CardContent flush><div className="rule-row px-3">...</div></CardContent>`
   - Wrong: `<CardContent><Card>...</Card></CardContent>`
5. card-footer-direct MUST Make CardFooter a direct child of Card, after the header and content. Because Card finds its footer among its direct children; a footer wrapped in another element lands inside the panel.
   - Correct: `<Card><CardHeader>...</CardHeader><CardFooter>...</CardFooter></Card>`
   - Wrong: `<Card><Section><CardFooter>...</CardFooter></Section></Card>`
6. card-no-glass NEVER Put glass, an ink fill or a status tint on a Card; the shell is grey and the panel paper. Because glass marks what is pressed and a tinted card reads as an alert, so the card stops being the quiet frame.
   - Correct: `<Card>`
   - Wrong: `<Card className="glass glass-paper">`
7. card-link-whole MUST Open a page from a card with CardLink inside CardTitle, and put no Button in that card. Because CardLink covers the card with one tab stop and rings the shell, and a button under a link is pressed and followed at once.
   - Correct: `<CardTitle><CardLink href="/runs/8f2a">Run run_8f2a</CardLink></CardTitle>`
   - Wrong: `<a href="/runs/8f2a"><Card>...</Card></a>`
8. card-group-label MUST Give a card that holds a form role="group" and aria-labelledby its CardTitle's id. Because Card is a plain div, so a screen reader tabbing into its fields never hears what they belong to.
   - Correct: `<Card role="group" aria-labelledby="invite"><CardHeader><CardTitle id="invite">Invite</CardTitle>...`
9. card-meta-quiet SHOULD Keep CardMeta to a time, a count or a model in a few words; put a sentence in CardDescription. Because the footer is one row, and meta ends in an ellipsis before an action moves.
10. card-title-topic SHOULD Name the topic in 1 to 4 words, sentence case.
   - Correct: `<CardTitle>Usage this week</CardTitle>`
   - Wrong: `<CardTitle>Here you can see this week's usage</CardTitle>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Card children` | `ReactNode` |  | Header and content go in one panel; direct Panel children are used as the panels; CardFooter goes on the shell. |
| `CardContent flush` | `boolean` | `false` | No padding, rows to the panel's edge, a rule under the header. |
| `CardAction` | `ReactNode` |  | One size="sm" ghost or secondary Button at the end of the header. |
| `CardMeta` | `ReactNode` |  | Footer text; the first one pushes the actions to the end. |
| `CardLink` | `a props` |  | Inside CardTitle: covers the card, one tab stop, the ring on the shell. |
Other props pass through to the shell div (Card); each part takes its own element's props.

## Variants and states
- footer: none, meta, actions
- content: padded, flush
- panels: one, two
- states: rest, link hover, link focus-visible

## Accessibility
- [ ] Card is a plain div; add role="group" and aria-labelledby when it holds controls.
- [ ] CardLink is one tab stop; its ring is the 2px ink outline round the whole shell.
- [ ] Meta and description use text-2, 5.5:1 on paper and on the shell.
- [ ] Forced colours keep the shell's and the panel's edges as CanvasText.

## Keyboard
- `Tab`: Moves to the CardLink, then to each action in the header and footer.
- `Enter`: Follows the CardLink.

## Edge cases
- Very long title -> Wraps; the header action stays at the top end.
- Long meta beside actions -> The meta ends in an ellipsis; the actions keep their size.
- Narrow at 390 -> The footer stays one row; meta truncates before a Button shrinks.
- Footer with no meta -> The actions sit at the end.
- Empty body -> Show an Empty state inside the panel, not an empty shell.
- Zoom 200% -> The header and footer grow with the text; the 3px inset stays.
- Dark theme -> The shell is a step lighter than the page and the panel a step darker than the shell.

## Tokens
--shell, --paper, --line-faint, --radius-shell, --radius-panel, --shell-inset, --space-3, --type-label, --type-body-sm, --type-caption, --text-1, --text-2, --focus, --focus-width, --z-raised

## Related
- [Panel](/systems/glaze/components/panel.md): Holds a few rows inside a card.
- [Item](/systems/glaze/components/item.md): Shows one thing as a row in a list.
- [Empty state](/systems/glaze/components/empty-state.md): Explains why a region is empty.
