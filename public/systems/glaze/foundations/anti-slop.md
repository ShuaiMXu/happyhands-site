---
name: Anti-slop
system: glaze
kind: foundation
last-updated: 2026-10-26
human: https://design.how/systems/glaze/foundations/anti-slop
---

# Anti-slop

The habits of generated UI to avoid, and what to do instead.

## Rules
1. anti-slop-no-glass-sprawl NEVER Spread the glass past what is pressed: no glass cards, headers, badges or inputs. Because glass on everything turns the signature into a theme, and nothing reads as the thing to press.
   - Correct: `<header className="bg-page">`
   - Wrong: `<header className="glass glass-paper">`
2. anti-slop-no-decoration NEVER Add a gradient, a blob, a texture, a grid or dot background, a glow or a backdrop blur. Because Glaze is black and white, and decoration competes with the one ink action.
   - Correct: `<div className="bg-page">`
   - Wrong: `<div className="bg-linear-to-br from-paper to-field backdrop-blur">`
3. anti-slop-no-shadow-reflex NEVER Reach for a shadow to make a card or a menu stand out. Because Glaze draws none; a card is a shell, an overlay is paper with a ring.
   - Correct: `<div className="overlay">`
   - Wrong: `<div className="rounded-overlay bg-paper shadow-lg">`
4. anti-slop-no-stat-cards NEVER Lay out a row of equal cards each holding one number. Because equal boxes make every number equally loud, so the one that matters is lost.
   - Correct: `<p className="type-body">412 runs today, 4 failed.</p>`
   - Wrong: `<Card>Runs</Card><Card>Evals</Card><Card>Cost</Card>`
5. anti-slop-no-icon-tiles NEVER Put an icon in a tinted tile or circle beside a heading. Because the tile says nothing the heading does not and reads as a button.
   - Correct: `<h2 className="type-heading">Agents</h2>`
   - Wrong: `<span className="rounded-tag bg-field p-2"><Icon icon={Bot}/></span><h2>Agents</h2>`
6. anti-slop-no-side-rail NEVER Mark a card, row or message with a coloured bar on one edge. Because the bar reads as a status nobody defined.
   - Correct: `<div className="bg-pressed">`
   - Wrong: `<div className="border-s-4 border-ink">`
7. anti-slop-no-status-dots NEVER Mark a status, an unread count, today or a series with a small round dot; a status is a glyph and a word. Because a dot says only that something is there, so its meaning rides on hue alone and every dot on the page reads the same.
   - Correct: `<Status status="ok"/>`
   - Wrong: `<span className="size-1.5 rounded-pill bg-ok"/> Passed`
8. anti-slop-earn-the-card MUST Group with space first; use a card around one thing a person acts on, and never a card in a card. Because a card around everything flattens the page into equal tiles.
   - Correct: `<section className="flex flex-col gap-3">`
   - Wrong: `<div className="shell"><div className="shell">`
9. anti-slop-no-eyebrow NEVER Put a small label, a category or a number above a title. Because the heading already names the section, and the label is a second voice saying less.
   - Correct: `<h2 className="type-heading">Runs</h2>`
   - Wrong: `<p className="type-caption text-text-2">Overview</p><h2>Runs</h2>`
10. anti-slop-no-caps NEVER Set text in capitals or spread its letters. Because capitals are slower to read and shout.
   - Correct: `<span className="type-caption">Queued</span>`
   - Wrong: `<span className="uppercase tracking-widest">Queued</span>`
11. anti-slop-no-emoji NEVER Use emoji in copy, titles or buttons, or as icons. Because emoji render differently on every device and turn a tool into a chat thread.
   - Correct: `<Button>Run eval</Button>`
   - Wrong: `<Button>Run 🚀</Button>`
12. anti-slop-no-hype NEVER Write seamless, effortless, supercharge, unleash or blazing; say what happens. Because people trust a product that states the fact.
   - Correct: `Runs retry twice before they fail.`
   - Wrong: `Supercharge your agents.`
13. anti-slop-no-mono-cosplay NEVER Set labels, headings or numbers in mono to look technical; mono is for what a person copies. Because mono everywhere reads as a terminal costume and hides which value is the ID.
   - Correct: `<h2 className="type-heading">Agents</h2>`
   - Wrong: `<h2 className="mono">Agents</h2>`
14. anti-slop-no-fake-data SHOULD Fill examples with believable data; never Lorem ipsum, John Doe or 1,234. Because placeholder data hides the truncation and alignment problems real data shows.
   - Correct: `title="Maya Chen"`
   - Wrong: `title="John Doe"`
15. anti-slop-no-stream-effects NEVER Blink a cursor, sweep a shimmer or fade in each word of a streamed answer. Because the effect slows reading and makes the layout jitter.
   - Correct: `<p className="type-body">{text}</p>`
   - Wrong: `<span className="animate-pulse">▍</span>`
16. anti-slop-no-scroll-reveal NEVER Fade or slide content in as it scrolls into view. Because content that hides until scrolled is missed.
   - Correct: `<section>`
   - Wrong: `<motion.section whileInView={{opacity: 1}}>`
17. anti-slop-dialog-controlled MUST Open a Dialog with open and onOpenChange; never mount it only while open. Because a dialog that unmounts skips its exit and loses the trigger it returns focus to.
   - Correct: `<Dialog open={open} onOpenChange={setOpen}>...</Dialog>`
   - Wrong: `{open && <Dialog open>...</Dialog>}`

## Decision table
| You need | Use |
|-|-|
| Make something stand out | `space and the one ink button, not a shadow or a colour` |
| Show several numbers | `a sentence or a table` |
| Show work in progress | `Button pending` |

## Reject list
- Glass off pressables, shadows, gradients, blur, side rails, icon tiles, stat card rows.
- Eyebrows, capitals, emoji, hype, mono cosplay.

## Related
- [Color](/systems/glaze/foundations/color.md): Ink and paper with greys as ink at alphas, and colour only for status.
- [Typography](/systems/glaze/foundations/typography.md): Glaze Sans for every word, Glaze Mono at 0.8 of the text around it.
- [Elevation](/systems/glaze/foundations/elevation.md): No shadows: depth is drawn inside the shape, and overlays lift with a ring.
