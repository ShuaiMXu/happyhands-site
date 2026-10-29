---
name: Borders and lines
system: glaze
kind: foundation
source: registry/glaze/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/glaze/foundations/borders-and-lines
---

# Borders and lines

One hairline weight, from the faint card edge to the field line that darkens on focus.

## Rules
1. borders-and-lines-one-weight MUST Draw every line 1px (--line-width); only the focus ring is 2px. Because a 2px edge outweighs the glass ring beside it and reads as a selected or focused state.
   - Correct: `<div className="border border-line">`
   - Wrong: `<div className="border-2 border-line">`
2. borders-and-lines-by-role MUST Pick the line by its job: line-faint for a card and a row rule, line for an overlay ring, line-control for a field, line-strong for an empty checkbox. Because each step is ink at one alpha, and a field drawn in line-faint vanishes on paper while a card in line-control looks like an input.
   - Correct: `<div className="shell">`
   - Wrong: `<div className="shell border-line-control">`
3. borders-and-lines-field-focus MUST Show a field's focus by darkening its line to --line-focus, ink at about a third; never to black and never with a ring. Because a black line or a ring around a pill reads as an error or a second control, and the field recipe already darkens it softly.
   - Correct: `<div className="field">`
   - Wrong: `<div className="field focus-within:border-ink">`
4. borders-and-lines-no-box-in-box NEVER Nest a bordered box inside a bordered box, except the card's panel inside its shell. Because two edges a few px apart read as a double line and nobody can tell which group it closes.
   - Correct: `<div className="shell"><div className="panel p-3">`
   - Wrong: `<div className="border border-line p-3"><div className="border border-line p-3">`
5. borders-and-lines-rule-rows SHOULD Split rows with rule-row, which drops the last rule so the panel's edge closes the list. Because a rule right above the panel's edge doubles the line at the bottom.

## Tokens
| Token | Role | Use for | Not for | Light | Dark (blank: same as light) |
|-|-|-|-|-|-|
| `--line-faint` | the shell's and the panel's edge, the rule between rows | card shell and panel edges, row rules | fields | `rgb(5 5 5 / 0.06)` | `rgb(244 244 243 / 0.06)` |
| `--line` | an overlay's 1px ring and a divider that must read | overlay ring, a divider that must read | card edges | `rgb(5 5 5 / 0.10)` | `rgb(244 244 243 / 0.10)` |
| `--line-control` | a field's hairline at rest | a field at rest | cards | `rgb(5 5 5 / 0.15)` | `rgb(244 244 243 / 0.15)` |
| `--line-focus` | a field's hairline with the cursor in it: darker, never black | a field with the cursor in it | the focus ring | `rgb(5 5 5 / 0.32)` | `rgb(244 244 243 / 0.34)` |
| `--line-strong` | the edge of an empty control, 3.3:1 on paper (WCAG 1.4.11) | an empty checkbox, radio or switch, 3.3:1 | dividers | `rgb(5 5 5 / 0.45)` | `rgb(244 244 243 / 0.45)` |
| `--focus` | the focus ring: ink at the text's 80%, so focus never reads as an error | the 2px focus ring on every focusable | fields | `rgb(5 5 5 / 0.80)` | `#f4f4f3` |
| `--line-width` | every line: rings, edges, rules | glass ring, field, shell, overlay |  | `1px` |  |
| `--focus-width` | the focus ring | every focusable |  | `2px` |  |
| `--focus-offset` | the gap between a control and its ring | every focusable |  | `2px` |  |
| `--focus-width-sm` | the ring on a control under 20px, so it does not outweigh the control | checkbox, radio, switch |  | `1.5px` |  |
| `--focus-offset-sm` | the gap on a control under 20px | checkbox, radio, switch |  | `1px` |  |

## Decision table
| You need | Use |
|-|-|
| A card | `shell and panel (line-faint)` |
| Between rows | `rule-row` |
| A menu or dialog edge | `overlay (line)` |
| A text field | `field (line-control, line-focus)` |

## Scale
Every line is 1px. Ink at 6, 10, 15, 32 and 45%; the focus ring is 2px of ink, 2px out.

## Reject list
- No 2px edges, no coloured side bars, no box in a box.

## Related
- [Color](/systems/glaze/foundations/color.md): Ink and paper with greys as ink at alphas, and colour only for status.
- [Elevation](/systems/glaze/foundations/elevation.md): No shadows: depth is drawn inside the shape, and overlays lift with a ring.
