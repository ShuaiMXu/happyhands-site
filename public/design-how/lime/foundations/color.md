---
name: Color
system: lime
kind: foundation
source: registry/lime/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/lime/foundations/color
---

# Color

The colors Lime uses, and where each one goes.

## Rules
1. color-one-lime MUST Make one action per view the primary variant; every other action is ink or a neutral. Because the lime is the only hue on the page, so two lime fills leave no single next step.
   - Correct: `<Button>Send money</Button> <Button variant="outline">Share</Button>`
2. color-roles-only MUST Read roles such as --fg, --surface and --accent; never write a hex value or a dark: variant. Because the dark theme and Customize swap the role values, and a hex or dark: pair stays behind.
   - Correct: `<p className="text-fg">`
   - Wrong: `<p className="text-[#0f0f0d] dark:text-white">`
3. color-not-background NEVER Fill a page, card, section or banner with lime; use --surface and a heading. Because a lime block outshouts the primary action, the one place the lime means "press here".
   - Correct: `<section className="bg-surface p-6">`
   - Wrong: `<section className="bg-accent p-6">Your goals</section>`
4. color-wash-selection MUST Tint a chosen row or option with --accent-wash and keep the text --fg. Because the wash holds ink at 17.6:1, where a full lime fill would read as a button.
   - Correct: `<li className="bg-accent-wash">Dining</li>`
5. color-line-step MUST Draw lines, rings and icons on a light surface with --accent-line, not --accent. Because the lime is about 1.2:1 on white and vanishes, the olive step is 3.95:1.
   - Correct: `border-accent-line`
   - Wrong: `border-accent`
6. color-on-accent NEVER Put white on the lime; text and icons on it use --on-accent. Because white on the lime is about 1.2:1 and the label disappears, ink is 15.6:1.
   - Correct: `bg-accent text-on-accent`
   - Wrong: `bg-accent text-white`
7. color-status-pair MUST Pair a status color with a word or an icon; there is no blue and no info hue. Because red and green alone fail people with color blindness and in forced colors.
8. color-glow-scarce MUST Use glow only on primary and destructive buttons, the balance chip and one featured card per view. Because the glow marks the next step, and a second glowing thing splits the eye.
   - Correct: `<Card variant="glow">...</Card>`
   - Wrong: `<Button variant="secondary" className="glow glow-accent">Share</Button>`
9. color-no-decor-gradient NEVER Add a gradient, a second hue or a colored shadow outside the glow. Because the glow is the only gradient, so any other one reads as a second action.
   - Wrong: `<Card className="bg-gradient-to-br from-accent to-emerald-300">`

## Tokens
| Token | Role | Use for | Not for | Light | Dark (blank: same as light) |
|-|-|-|-|-|-|
| `--page` | the page | app background | cards | `#ffffff` | `#0e0e0c` |
| `--surface` | warm grey: cards, wells, quiet panels | cards, wells, table header | floating layers | `#f6f5f2` | `#1a1a17` |
| `--surface-2` | a control at rest or a row on hover | control at rest, row hover | text fields | `#efeeea` | `#262622` |
| `--surface-3` | pressed, a track | pressed control, track | resting fills | `#e6e4df` | `#32322d` |
| `--raised` | a surface that floats above the page | popover, menu, dialog, sheet | cards on the page | `#ffffff` | `#1f1f1c` |
| `--field` | the fill of a text field | input, textarea, select trigger | cards | `#f6f5f2` | `#1a1a17` |
| `--scrim` | the layer behind a dialog or sheet | dialog, sheet |  | `rgb(15 15 13 / 0.5)` | `rgb(0 0 0 / 0.64)` |
| `--fg` | primary text, 17.6:1 on --surface | headings, body, labels | hints | `#0f0f0d` | `#f4f3ee` |
| `--fg-2` | secondary text, 9.0:1 on --page | descriptions, table cells | headings | `#4a4943` | `#c9c7be` |
| `--fg-3` | supporting text and icons, 5.4:1 on --page and 5.0:1 on --surface | hints, captions, icons | essential labels | `#6b6a63` | `#9a9890` |
| `--fg-disabled` | a disabled label; no contrast claim | disabled label | any live text | `#a6a49b` | `#5e5d57` |
| `--fg-inverse` | text on the solid ink fill | solid button, tooltip, toast |  | `#ffffff` | `#0f0f0d` |
| `--on-accent` | text and icons on the lime in both themes, 15.6:1 on --accent | text and icons on the lime | other fills | `#0f0f0d` |  |
| `--glow-accent-fg` | text and icons on the lime glow: ink, on the light body and the calmer dark one alike (Customize turns it white for a picked hue whose dark body runs deep) | primary button, balance chip, featured card |  | `#0f0f0d` |  |
| `--line` | a hairline between things; decorative | card edge, divider | control edges | `#e6e4df` | `#2e2e29` |
| `--line-strong` | a hairline that must read a little more | field edge, hovered edge |  | `#cfcdc6` | `#3f3f39` |
| `--control` | the outline of a control, 3.8:1 on --page, 3.5:1 on --surface and 3.3:1 on --surface-2, all over the minimum of WCAG 1.4.11; darkened one step from #8f8c84, which fell under it on --surface-2 | checkbox, radio, switch outline | dividers | `#85827a` | `#8a8880` |
| `--ink` | the ink fill: the second action beside the lime | solid button, tooltip, toast | text | `#0f0f0d` | `#f4f3ee` |
| `--ink-hover` | ink on hover | solid button |  | `#2a2a26` | `#e1dfd7` |
| `--ink-active` | ink pressed | solid button |  | `#3f3f3a` | `#cfcdc4` |
| `--accent` | the mark: the fill of a primary action, 15.6:1 with --on-accent | primary fill, selected segment, switch on | lines on white, backgrounds | `#e4f222` | `#cad649` |
| `--accent-hover` | the mark on hover, 13.7:1 with --on-accent | primary button |  | `#d6e41a` | `#d6e262` |
| `--accent-active` | the mark pressed, 11.5:1 with --on-accent | primary button |  | `#c4d211` | `#bac534` |
| `--accent-wash` | a soft highlight, 17.6:1 with --fg | selected row, highlighted option | the only cue | `#f5f9c4` | `#2b2e0c` |
| `--accent-line` | olive line step, 3.95:1 on --page and 3.62:1 on --surface | focus ring, outline, icon on white | fills | `#7c8700` | `#cad649` |
| `--ring` | the focus ring colour | every focus-visible state |  | `var(--accent-line)` |  |
| `--success` | success mark, 4.2:1 on --page | status dot, progress done |  | `#1e8e4a` | `#4ade80` |
| `--success-tint` | success wash | success badge, alert |  | `#e5f5ea` | `#12281a` |
| `--success-text` | success text, 6.1:1 on --page and 5.4:1 on --success-tint | success label | fills | `#17703a` | `#6ee79b` |
| `--warn` | warning mark, 3.5:1 on --page | status dot |  | `#c27a00` | `#ffb224` |
| `--warn-tint` | warning wash | warning badge, alert |  | `#fff3d6` | `#2e2209` |
| `--warn-text` | warning text, 6.4:1 on --page and 5.8:1 on --warn-tint | warning label |  | `#8a5200` | `#ffc85c` |
| `--danger` | error fill, 4.6:1 with --on-danger | destructive fill, invalid ring | text | `#d93636` | `#e5484d` |
| `--danger-hover` | error fill on hover, 5.8:1 with --on-danger | destructive button |  | `#c02c2c` | `#d33a3f` |
| `--danger-tint` | error wash | error badge, alert |  | `#fdebeb` | `#2d1415` |
| `--on-danger` | text on the error fill | destructive button |  | `#ffffff` | `#0f0f0d` |
| `--danger-text` | error text, 6.6:1 on --page and 5.7:1 on --danger-tint | error message, error label |  | `#b42323` | `#ff8a8a` |

## Glow tokens
Read only through their classes; never set or read them in a component.
`--glow-accent-from`, `--glow-accent-to`, `--glow-accent-edge`, `--glow-accent-bloom`, `--glow-accent-cast`, `--glow-accent-light`, `--glow-accent-from-lit`, `--glow-accent-to-lit`, `--glow-accent-edge-lit`, `--glow-accent-bloom-lit`, `--glow-accent-from-press`, `--glow-accent-to-press`, `--glow-danger-from`, `--glow-danger-to`, `--glow-danger-edge`, `--glow-danger-bloom`, `--glow-danger-cast`, `--glow-danger-light`, `--glow-danger-from-lit`, `--glow-danger-to-lit`, `--glow-danger-edge-lit`, `--glow-danger-bloom-lit`, `--glow-danger-from-press`, `--glow-danger-to-press`, `--glow-success-from`, `--glow-success-to`, `--glow-success-edge`, `--glow-success-bloom`, `--glow-success-cast`, `--glow-success-light`, `--glow-success-fg`, `--glow-success-from-lit`, `--glow-success-to-lit`, `--glow-success-edge-lit`, `--glow-success-bloom-lit`, `--glow-success-from-press`, `--glow-success-to-press`

## Contrast
[The table on the human page](https://design.how/systems/lime/foundations/color#contrast).

## Decision table
| You need | Use |
|-|-|
| Body text | `--fg` |
| Hint or caption | `--fg-3` |
| Main action fill | `--accent` |
| Selected row | `--accent-wash` |
| Focus ring on white | `--accent-line` |
| Text field fill | `--field` |
| Floating layer | `--raised` |

## Related
- [Typography](/systems/lime/foundations/typography.md): The typeface, sizes and weights Lime uses for every word and number.
- [Elevation](/systems/lime/foundations/elevation.md): How things stack, using grey steps and a soft shadow for what floats.
