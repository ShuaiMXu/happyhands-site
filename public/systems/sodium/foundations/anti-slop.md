---
name: Anti-slop
system: sodium
kind: foundation
last-updated: 2026-10-26
human: https://design.how/systems/sodium/foundations/anti-slop
---

# Anti-slop

The habits of generated UI to avoid, and what to do instead.

## Rules
1. anti-slop-no-cell-grid NEVER Draw a cell grid or a dot field behind the page or behind content. Because the owner ruled it out: a grid behind every word fights the rules that carry the layout, and it is the first thing a generated "technical" screen reaches for.
   - Correct: `<main className="min-h-dvh bg-page">`
   - Wrong: `<main className="dots min-h-dvh">`
2. anti-slop-no-terminal-costume NEVER Dress a screen as a terminal: green or amber on black, scanlines, a > prompt before a headline, ASCII boxes. Because Sodium takes the discipline of a terminal, not its look, and a costume makes a real tool read as a toy.
   - Correct: `<h1 className="type-title">Pipelines</h1>`
   - Wrong: `<h1 className="text-ok-text">&gt; pipelines_</h1>`
3. anti-slop-no-decoration NEVER Add a gradient, a blob, a glow or a backdrop blur; the one gradient is the light from below that the slab and edged recipes draw on a button. Because Sodium is flat fills and 1px rules, and decoration competes with the one yellow action.
   - Correct: `<div className="bg-page">`
   - Wrong: `<div className="bg-linear-to-br from-page to-well backdrop-blur">`
4. anti-slop-no-rounding NEVER Round a corner to soften a region, a control or an avatar. Because every corner is square, and one round corner is the part everyone sees.
   - Correct: `<div className="frame">`
   - Wrong: `<div className="frame rounded-xl">`
5. anti-slop-no-yellow-everywhere NEVER Spread yellow past the one primary, the selection and a chart series: no yellow headers, header squares, borders, icons or badges. Because yellow marks the thing to act on, and yellow everywhere marks nothing.
   - Correct: `<header className="panel-head">`
   - Wrong: `<header className="bg-accent-fill">`
6. anti-slop-no-stat-cards NEVER Lay out a row of equal cards each holding one number. Because equal boxes make every number equally loud; a status strip puts them on one ruled row where they can be compared.
   - Correct: `<div className="frame flex">{cells.map(c => <div className="flex-1 rule-col px-inset">…</div>)}</div>`
   - Wrong: `<div className="grid grid-cols-4 gap-4"><div className="frame">…</div>…</div>`
7. anti-slop-no-box-in-box NEVER Box a part inside a frame; divide it with a rule. Because two edges a few px apart read as a double line.
   - Correct: `<div className="frame"><div className="rule-row">`
   - Wrong: `<div className="frame"><div className="frame">`
8. anti-slop-no-side-rail NEVER Mark a row with a coloured bar on one edge. Because the bar reads as a status nobody defined; a chosen row takes the selection wash, and a row draws nothing at its start.
   - Correct: `<div className="selected">`
   - Wrong: `<div className="border-s-4 border-accent-edge">`
9. anti-slop-no-status-dots NEVER Mark a status with a round dot; a status is a square mark and a word. Because a round dot is the one curve on a square screen, and its meaning rides on hue alone.
   - Correct: `<span className="type-label-sm text-ok-text">Passed</span>`
   - Wrong: `<span className="size-2 rounded-full bg-ok"/> Passed`
10. anti-slop-no-label-above-title NEVER Put a small label, a category or a number above a headline. Because the headline already names the section; a name belongs in a panel header row, never stacked over a title.
   - Correct: `<div className="panel-head"><span>Runs</span></div>`
   - Wrong: `<p className="type-label">Overview</p><h2 className="type-heading">Runs</h2>`
11. anti-slop-no-caps-sentences NEVER Set a sentence, a description or a headline in mono capitals. Because mono capitals are for words a person scans, and a sentence in them reads slowly and shouts.
   - Correct: `<p className="type-body">The backfill wrote 1,204 partitions.</p>`
   - Wrong: `<p className="type-label">The backfill wrote 1,204 partitions.</p>`
12. anti-slop-no-emoji NEVER Use emoji in copy, titles or buttons, or as icons. Because emoji render differently on every device and turn a tool into a chat thread.
   - Correct: `<Button>Deploy</Button>`
   - Wrong: `<Button>Deploy 🚀</Button>`
13. anti-slop-no-hype NEVER Write seamless, effortless, supercharge, unleash or blazing; say what happens. Because people trust a tool that states the fact.
   - Correct: `Each job retries twice before it fails.`
   - Wrong: `Blazing-fast pipelines.`
14. anti-slop-no-brackets-everywhere SHOULD Keep brackets for a machine action, a tool call or a step an agent took; never around a person's button. Because the bracket says a machine did this, and on a person's action it blurs who acted.
15. anti-slop-no-fake-data SHOULD Fill examples with believable data; never Lorem ipsum, John Doe or 1,234. Because placeholder data hides the truncation and alignment problems real data shows.
   - Correct: `title="Maya Chen"`
   - Wrong: `title="John Doe"`
16. anti-slop-no-blinking-caret NEVER Leave a caret blinking at rest, or type text a person is waiting to read. Because the caret belongs to typing; at rest it reads as a field waiting for input, and slow typing hides an answer behind an effect.
   - Correct: `{typing && <span className="caret"/>}`
   - Wrong: `<span className="caret animate-[blink_1s_steps(1)_infinite]"/>`
17. anti-slop-no-scroll-reveal NEVER Fade or slide content in as it scrolls into view. Because content that hides until scrolled is missed.
   - Correct: `<section>`
   - Wrong: `<motion.section whileInView={{opacity: 1}}>`
18. anti-slop-dialog-controlled MUST Open a Dialog with open and onOpenChange; never mount it only while open. Because a dialog that unmounts skips its exit and loses the trigger it returns focus to.
   - Correct: `<Dialog open={open} onOpenChange={setOpen}>...</Dialog>`
   - Wrong: `{open && <Dialog open>...</Dialog>}`

## Decision table
| You need | Use |
|-|-|
| Make something stand out | `the one yellow primary, or the selection wash` |
| Show several numbers | `a status strip: one ruled row of cells` |
| Fill an empty gutter | `dots, 20px or wider, at most one or two per view` |

## Reject list
- Cell grids, terminal costume, gradients, blur, rounding, yellow sprawl, stat card rows, boxes in boxes.
- Labels above titles, sentences in capitals, emoji, hype.
- A caret blinking at rest, scroll reveals.

## Related
- [Color](/systems/sodium/foundations/color.md): White and warm near-black, rules for structure, and one sodium yellow that changes how it shows by theme.
- [Typography](/systems/sodium/foundations/typography.md): Mono capitals for the interface, Inter Display for headlines and prose, one weight.
- [Borders and lines](/systems/sodium/foundations/borders-and-lines.md): Rules divide content; a frame is a region's one outer edge.
