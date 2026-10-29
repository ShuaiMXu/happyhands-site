---
name: Anti-slop
system: lime
kind: foundation
last-updated: 2026-10-26
human: https://design.how/systems/lime/foundations/anti-slop
---

# Anti-slop

The habits of generated UI to avoid, and what to do instead.

## Rules
1. anti-slop-no-eyebrow NEVER Put a small label, a category or a number such as 01 above a title or a section. Because the heading already names the section, and the label only adds a second voice saying less.
   - Correct: `<h2 className="text-lg font-semibold">Spending</h2>`
   - Wrong: `<p className="text-xs font-medium text-fg-3">Overview</p><h2>Spending</h2>`
2. anti-slop-no-stat-cards NEVER Lay out a row of equal cards each holding one number; show one Balance, a List or a sentence. Because equal boxes make every number equally loud, so the one that matters is lost.
   - Correct: `<Balance value={1240}/><p>You spent $820 of $2,100 this month.</p>`
   - Wrong: `<Card>Income</Card><Card>Spent</Card><Card>Saved</Card>`
3. anti-slop-earn-surface MUST Group with space first; use a Card only around one thing the person acts on, and never put a Card in a Card. Because boxes around everything flatten the page into equal tiles and the eye has nowhere to start.
   - Correct: `<section className="flex flex-col gap-3"><h2>Recent</h2><List/></section>`
   - Wrong: `<Card><Card><List/></Card></Card>`
4. anti-slop-no-icon-tiles NEVER Put an icon in a tinted tile, or beside a heading or a stat as decoration; ListIcon in a List row is the one round mark. Because a decorative icon carries no meaning and pulls the eye from the words.
   - Correct: `<ListItem leading={<ListIcon icon={Wallet}/>} title="Checking"/>`
   - Wrong: `<span className="rounded-panel bg-accent-wash p-2"><Icon icon={Wallet}/></span>`
5. anti-slop-no-side-rail NEVER Mark a card, row or quote with a colored bar on one edge; use --accent-wash for a chosen row. Because the bar reads as a status nobody defined.
   - Correct: `<li className="bg-accent-wash">`
   - Wrong: `<div className="border-s-4 border-accent">`
6. anti-slop-no-decoration NEVER Add a gradient, blob, texture, grid or dot background, glass blur, or a glow beyond the sanctioned ones. Because decoration competes with the one glowing action, which is the only light Lime allows.
   - Correct: `<div className="bg-page">`
   - Wrong: `<div className="bg-gradient-to-br from-accent to-surface backdrop-blur">`
7. anti-slop-sticky-edge MUST Give a sticky header a --line bottom edge once content scrolls under it, and none at the top. Because without the edge, scrolled text slides under the title with nothing to say where the header ends.
   - Correct: `<header className={cn("sticky top-0 bg-page", scrolled && "border-b border-line")}>`
8. anti-slop-icon-first-line MUST Align a leading icon to the first line of its text, not the middle of a block that wraps. Because a centered icon drifts away from the line it labels once the text runs to two lines.
   - Correct: `<div className="flex items-start gap-2"><Icon className="mt-0.5"/><p>{long}</p></div>`
   - Wrong: `<div className="flex items-center gap-2"><Icon/><p>{long}</p></div>`
9. anti-slop-no-small-prose NEVER Set a sentence the person must read, such as a fee or a limit, in text-xs or --fg-3; use text-sm in --fg or --fg-2. A FieldDescription hint is the exception. Because small grey text fails people reading in sunlight or with low vision, and a sentence is meant to be read.
   - Correct: `<p className="text-sm text-fg-2">Transfers over $1,000 take one extra day to arrive.</p>`
   - Wrong: `<p className="text-xs text-fg-3">Transfers over $1,000 take one extra day to arrive.</p>`
10. anti-slop-peer-amounts MUST Set amounts that are peers, such as the rows of one list, at one size and weight. Because a bigger or bolder peer reads as more important when it is not.
   - Correct: `trailing={formatAmount(-4.8)} on every row`
   - Wrong: `<Amount size="lg"/> next to <Amount size="sm"/>`
11. anti-slop-no-caps NEVER Set text in capitals or spread its letters out; keep sentence case. Because capitals are slower to read and shout.
   - Correct: `<Status status="queued"/>`
   - Wrong: `<span className="uppercase tracking-widest">Queued</span>`
12. anti-slop-no-hype NEVER Write instant, secure, effortless, seamless or invented urgency such as Only 2 hours left; say what happens and when. Because people trust an app that states the fact, and hype reads as a sales pitch over their money.
   - Correct: `Arrives today if you send before 5pm.`
   - Wrong: `Instant, secure transfers. Act now!`
13. anti-slop-no-emoji NEVER Use emoji in copy, titles, buttons or as icons; use words and the Icon set. Because emoji render differently on every device and turn a money app into a chat thread.
   - Correct: `<Button>Send money</Button>`
   - Wrong: `<Button>Send 💸</Button>`
14. anti-slop-no-fake-data SHOULD Fill examples with believable data: real-looking names, amounts with cents, dates near today; never Lorem ipsum, John Doe or $1,234.56. Because placeholder data hides truncation and alignment problems that real data shows at once.
   - Correct: `title="Maya Chen" trailing={formatAmount(-24.5)}`
   - Wrong: `title="John Doe" trailing="$1,234.56"`
15. anti-slop-no-stream-effects NEVER Blink a cursor, sweep a shimmer or fade in each word of a streamed answer; let the text arrive as it is. Because the effect slows reading and makes the layout jitter while the person tries to read.
   - Correct: `<Message name="Lime">{text}</Message>`
   - Wrong: `<span className="animate-pulse">▍</span>`
16. anti-slop-no-scroll-reveal NEVER Fade, slide or scale content in as it scrolls into view. Because content that hides until scrolled is missed, and motion that answers nothing is decoration.
   - Correct: `<section>`
   - Wrong: `<motion.section whileInView={{opacity: 1, y: 0}}>`
17. anti-slop-dialog-controlled MUST Open a Dialog, Sheet or AlertDialog with open and onOpenChange; never mount it only while open. Because a dialog that unmounts skips its exit motion and loses the trigger it returns focus to.
   - Correct: `<Dialog open={open} onOpenChange={setOpen}>...</Dialog>`
   - Wrong: `{open && <Dialog open>...</Dialog>}`
18. anti-slop-keep-one-glow MUST Keep one glowing primary action on every view while removing the rest; never flatten a screen to grey. Because Lime without its one lime action is a grey page with nowhere to go next.
   - Correct: `<Button>Send money</Button>`
   - Wrong: `<Button variant="secondary">Send money</Button> // the only action`

## Decision table
| You need | Use |
|-|-|
| Name a section | `an h2 at text-lg font-semibold` |
| Show several numbers | `one Balance, a List or a sentence` |
| Mark a chosen row | `--accent-wash` |
| Show work in progress | `Button pending or Skeleton, both still` |

## Reject list
- Eyebrows, section numbers, stat card rows, icon tiles, side bars.
- Gradients, blobs, glass, extra glow, scroll reveals, streaming effects.
- Capitals, emoji, hype, small grey sentences.

## Related
- [Color](/systems/lime/foundations/color.md): The colors Lime uses, and where each one goes.
- [Typography](/systems/lime/foundations/typography.md): The typeface, sizes and weights Lime uses for every word and number.
- [Motion](/systems/lime/foundations/motion.md): How things move, quickly and only when something changes.
