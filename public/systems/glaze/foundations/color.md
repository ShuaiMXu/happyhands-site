---
name: Color
system: glaze
kind: foundation
source: registry/glaze/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/glaze/foundations/color
---

# Color

Ink and paper with greys as ink at alphas, and colour only for status.

## Rules
1. color-roles-only MUST Read a role such as text-text-2, bg-paper or border-line-faint; never write a hex, an rgb() or a dark: variant. Because the dark theme swaps every role's value, and a typed colour or a dark: pair stays behind.
   - Correct: `<p className="text-text-2">`
   - Wrong: `<p className="text-[#6c6c6c] dark:text-white">`
2. color-greys-are-ink MUST Make every grey from ink at one of its alphas (--ink-80 to --ink-03) through a role; there is no separate grey ramp. Because a grey that is ink at an alpha sits between the text and the page on paper, on the shell and in the dark theme alike.
   - Correct: `bg-hover text-text-2`
   - Wrong: `bg-gray-100 text-gray-500`
3. color-status-only NEVER Use green, amber or coral for anything but status: not a brand accent, a chart series, a link or a decoration. Because colour means something went right or wrong, so a coral heading reads as an error and a green chip as a pass.
   - Correct: `<h2 className="type-heading">New agents</h2>`
   - Wrong: `<h2 className="text-fail-text">New agents</h2>`
4. color-reading-text NEVER Set a sentence, a value or a hint in text-text-3; it is 3.3:1, for placeholders and icons beside a label. Because ink at 45% falls under the 4.5:1 a person needs to read, and text-text-2 at 5.5:1 is the floor.
   - Correct: `<p className="type-caption text-text-2">Runs older than 30 days are deleted.</p>`
   - Wrong: `<p className="type-caption text-text-3">Runs older than 30 days are deleted.</p>`
5. color-status-word MUST Pair a status colour with its word, such as Failed or Passed, never colour alone. Because green and coral alone fail people with colour blindness, in grayscale and in forced colours.
   - Correct: `<span className="type-caption text-fail-text">Failed</span>`
   - Wrong: `<span className="size-2 bg-fail"/>`
6. color-focus-ink MUST Keep focus in ink; never draw a coral or green ring. Because a coral ring reads as an error, so a focused field would look invalid.
   - Correct: `<Button>Run eval</Button>  // base.css draws the ink ring`
   - Wrong: `focus-visible:outline-fail`

## Tokens
| Token | Role | Use for | Not for | Light | Dark (blank: same as light) |
|-|-|-|-|-|-|
| `--page` | the page, a half step darker than paper: a paper overlay still lifts off it and the grey shell reads as the card | app background, behind cards and overlays | panels | `#fbfbfa` | `#0c0c0c` |
| `--paper` | paper: the panel inside a card, a field, an overlay | the card panel, fields, overlays | the page | `#ffffff` | `#1f1f1f` |
| `--shell` | the light grey shell a card's panel sits in, and the footer row on it | the card shell and its footer row | wells | `#f1f1f0` | `#161616` |
| `--field` | the one grey field: a well for output, a track | code, output, a track, a disabled control | containers | `#efefef` | `#2a2a2a` |
| `--code-surface` | where a block of code sits: paper, with the panel's hairline when it stands alone, so small dark mono reads on the lightest surface | code block, JSON view, log viewer |  | `var(--paper)` |  |
| `--hover` | ink at 6%: a row or a plain button under the pointer | menu item, row, ghost button |  | `rgb(5 5 5 / 0.06)` | `rgb(244 244 243 / 0.06)` |
| `--hover-row` | ink at 3.5%: a list row under the pointer, lighter than the selected row's --pressed | item, table row, data grid row |  | `rgb(5 5 5 / 0.035)` | `rgb(244 244 243 / 0.04)` |
| `--pressed` | ink at 10%: a plain button held, a selected row | ghost button active, selected row |  | `rgb(5 5 5 / 0.10)` | `rgb(244 244 243 / 0.10)` |
| `--scrim` | the dim behind a dialog: ink at 24% | dialog, sheet |  | `rgb(5 5 5 / 0.24)` | `rgb(0 0 0 / 0.64)` |
| `--ink` | solid ink, a neutral near-black: every text and line is this at an alpha | chart mark, tooltip |  | `#050505` | `#f4f4f3` |
| `--ink-80` | ink at 80%, 11.9:1 on paper: the text colour | text-1, focus ring |  | `rgb(5 5 5 / 0.80)` | `#f4f4f3` |
| `--ink-60` | ink at 60%, 5.5:1 on paper | text-2 |  | `rgb(5 5 5 / 0.60)` | `rgb(244 244 243 / 0.60)` |
| `--ink-45` | ink at 45%, 3.3:1 on paper: a mark or a control edge, not text | text-3, line-strong |  | `rgb(5 5 5 / 0.45)` | `rgb(244 244 243 / 0.45)` |
| `--ink-32` | ink at 32%: a focused field's line, about a third | line-focus, text-disabled |  | `rgb(5 5 5 / 0.32)` | `rgb(244 244 243 / 0.34)` |
| `--ink-15` | ink at 15%: a field's resting line | line-control |  | `rgb(5 5 5 / 0.15)` | `rgb(244 244 243 / 0.15)` |
| `--ink-10` | ink at 10%: an overlay's ring | line |  | `rgb(5 5 5 / 0.10)` | `rgb(244 244 243 / 0.10)` |
| `--ink-06` | ink at 6%: the shell's and the panel's edge, a row rule | line-faint |  | `rgb(5 5 5 / 0.06)` | `rgb(244 244 243 / 0.06)` |
| `--ink-03` | ink at 3%: the faintest wash | striped row, quiet hover on grey |  | `rgb(5 5 5 / 0.03)` | `rgb(244 244 243 / 0.03)` |
| `--text-1` | primary text, ink at 80%, 11.9:1 on paper | headings, body, labels, values |  | `rgb(5 5 5 / 0.80)` | `#f4f4f3` |
| `--text-2` | secondary text, 5.5:1 on paper and 5.3:1 on the page, the floor for reading | descriptions, hints, meta | placeholders | `rgb(5 5 5 / 0.60)` | `rgb(244 244 243 / 0.60)` |
| `--text-3` | placeholders and icons beside a label, 3.3:1; never a sentence | placeholders, icons beside a label | any sentence or value | `rgb(5 5 5 / 0.45)` | `rgb(244 244 243 / 0.45)` |
| `--text-disabled` | a disabled label; no contrast claim | disabled control |  | `rgb(5 5 5 / 0.32)` | `rgb(244 244 243 / 0.34)` |
| `--text-inverse` | text on solid ink | tooltip, ink glass label |  | `#ffffff` | `#050505` |
| `--ok` | done: a status mark | status mark, progress done |  | `#2c9a59` | `#3fbf75` |
| `--ok-text` | the done word, 5.7:1 on paper, 5.0:1 on its tint | status word, success message |  | `#1a7640` | `#6fd69a` |
| `--ok-tint` | the done ground | success badge, success alert |  | `#e6f4ea` | `#13261a` |
| `--warn` | a warning mark | status mark |  | `#d98a0b` | `#f0a531` |
| `--warn-text` | the warning word, 5.9:1 on paper, 5.2:1 on its tint | status word, warning message |  | `#8a5a00` | `#f5c065` |
| `--warn-tint` | the warning ground | warning badge, warning alert |  | `#fbf0d9` | `#2a2010` |
| `--fail` | coral: a failure mark and the coral glass's top | failure mark, invalid line, destructive glass | brand, focus | `#e35e49` | `#ec6f5a` |
| `--fail-text` | the failure word, 5.9:1 on paper, 5.0:1 on its tint | error message, status word |  | `#b23c29` | `#f2917f` |
| `--fail-tint` | the failure ground | error badge, error alert |  | `#fbe9e5` | `#2c1714` |

## Contrast
[The table on the human page](https://design.how/systems/glaze/foundations/color#contrast).

## Decision table
| You need | Use |
|-|-|
| Behind cards and overlays | `--page, a step darker than paper, so paper lifts without a shadow` |
| Body text, labels, values | `--text-1` |
| Description, hint, meta | `--text-2` |
| Placeholder | `--text-3` |
| Row or plain button under the pointer | `--hover` |
| A failure word | `--fail-text` |

## Reject list
- No brand accent, no gradient, no colour for decoration.
- No grey that is not ink at an alpha.

## Related
- [Elevation](/systems/glaze/foundations/elevation.md): No shadows: depth is drawn inside the shape, and overlays lift with a ring.
- [Borders and lines](/systems/glaze/foundations/borders-and-lines.md): One hairline weight, from the faint card edge to the field line that darkens on focus.
