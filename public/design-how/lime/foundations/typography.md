---
name: Typography
system: lime
kind: foundation
source: registry/lime/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/lime/foundations/typography
---

# Typography

The typeface, sizes and weights Lime uses for every word and number.

## Rules
1. typography-text-roles MUST Set titles, labels and copy with the text-role utilities: title-page, title-overlay, label, body and caption. Because a role keeps size, leading, weight and tracking together, so two screens never drift apart.
   - Correct: `<h1 className="title-page">`
   - Wrong: `<h1 className="text-2xl font-semibold tracking-tight">`
2. typography-scale-only MUST Pick a size from the seven text-* steps by its job; never write an arbitrary px size. Because a 15px size sits between body and controls, and neither reader nor agent can tell its job.
   - Correct: `<p className="text-sm">`
   - Wrong: `<p className="text-[15px]">`
3. typography-sentence-case MUST Set buttons, headings, menu items and tabs in sentence case; never title case or all capitals. Because title case makes every label look like a product name, and capitals lose the word shapes people scan by.
   - Correct: `<Button>Send money</Button>`
   - Wrong: `<Button>Send Money Now</Button>`
4. typography-weight-hierarchy MUST Use 600 for headings, 500 for controls and labels, 400 for the rest; no 700. Because each weight means one thing, and bold body text reads as a heading the outline does not have.
   - Correct: `<h2 className="font-semibold">`
   - Wrong: `<h2 className="font-bold">`
5. typography-tracking NEVER Track letters out; only text-xl and larger take --tracking-tight. Because spaced-out small capitals are the stock dashboard label, and they read slower than plain words.
   - Wrong: `<p className="text-xs uppercase tracking-wider text-fg-3">Balance</p>`
6. typography-tabular MUST Set figures that change or line up in tabular numerals. Because proportional figures change width as a balance updates, so the number jitters and columns stop aligning.
   - Correct: `<span className="tabular-nums">$1,240.00</span>`
7. typography-section-heading MUST Head a section with an h2 at text-lg font-semibold; never a text-sm or text-xs label set above the content. Because heading navigation skips a small label, and it reads as a second, weaker title.
   - Correct: `<h2 className="text-lg font-semibold">Bills</h2>`
   - Wrong: `<p className="text-xs font-medium text-fg-3">Bills</p>`
8. typography-heading-color NEVER Color a heading to brand it; headings are --fg and support text is --fg-2 or --fg-3. Because a lime heading is about 1.2:1 on white, and an olive one competes with the primary action.
   - Correct: `<h2 className="text-lg font-semibold">Goals</h2>`
   - Wrong: `<h2 className="text-lg font-semibold text-accent-line">Goals</h2>`
9. typography-measure SHOULD Cap prose at 65ch; dense UI text is 14px.
   - Correct: `<p className="max-w-[65ch]">`
10. typography-phone-input MUST Leave text fields at 16px on touch screens; base.css sets it, so never set text-xs on an input. Because iOS Safari zooms the page into any field under 16px and leaves it zoomed after typing.
   - Correct: `<Input/>`
   - Wrong: `<Input className="text-xs"/>`

## Tokens
| Token | Role | Use for | Not for | Light |
|-|-|-|-|-|
| `--font-sans` | every word | every word | code | `"Hanken Grotesk", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif` |
| `--font-mono` | code and keys only | code and keys | labels, amounts | `ui-monospace, "SF Mono", Menlo, Consolas, monospace` |
| `--text-xs` | captions, counters | captions, counters, badges | body | `12px` |
| `--text-sm` | controls and body | controls, menu items, dense body | phone fields | `14px` |
| `--text-base` | prose, large controls | prose, messages, large button | dense rows | `16px` |
| `--text-lg` | a small heading | card and empty state titles | body | `18px` |
| `--text-xl` | a section or overlay heading | dialog and section headings | controls | `22px` |
| `--text-2xl` | a page heading | a page title | section headings | `28px` |
| `--text-3xl` | a display figure | a display figure such as the balance | headings | `36px` |
| `--leading-tight` | headings | text-lg and up | prose | `1.2` |
| `--leading-snug` | labels and short copy | buttons, cards, short copy | prose | `1.35` |
| `--leading-normal` | prose | prose | headings | `1.5` |
| `--tracking-tight` | large headings only; Lime never tracks out | text-xl and up | small text | `-0.01em` |
| `--weight-normal` | body | body | headings | `400` |
| `--weight-medium` | controls and labels | controls and labels | body | `500` |
| `--weight-semibold` | headings | headings and titles | long runs | `600` |

## Decision table
| You need | Use |
|-|-|
| Caption, hint, badge | `--text-xs` |
| Button, input, menu item | `--text-sm` |
| Message, prose, large button | `--text-base` |
| Card, empty state or page section heading | `--text-lg` |
| Dialog or sheet title | `title-overlay (--text-xl)` |
| Page title | `title-page (--text-xl on a phone, --text-2xl from sm)` |
| Control label, list title | `label` |
| Body copy in a screen | `body` |
| Account balance | `--text-3xl` |

## Scale
Sizes 12, 14, 16, 18, 22, 28, 36px. Weights 400, 500, 600. Leading 1.5 prose, 1.35 short copy, 1.2 headings.

## Reject list
- No second family, no weight 700, no letter-spaced capitals.

## Related
- [Color](/systems/lime/foundations/color.md): The colors Lime uses, and where each one goes.
- [Spacing](/systems/lime/foundations/spacing.md): How much room goes between things, and how tall controls are.
