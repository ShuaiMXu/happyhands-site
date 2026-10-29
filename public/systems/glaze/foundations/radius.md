---
name: Radius
system: glaze
kind: foundation
source: registry/glaze/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/glaze/foundations/radius
---

# Radius

Pills for every one-line control, 14 and 11 for the card, 10 for overlays, 6 for tags.

## Rules
1. radius-pill-controls MUST Round every one-line control to rounded-pill: buttons, fields, selects, chips, the segmented control. Because the pill is one of the three things only Glaze has, and a squared field beside a pill button reads as another system.
   - Correct: `<div className="field">`
   - Wrong: `<div className="field rounded-tag">`
2. radius-lines-of-text MUST Give a box that holds lines of text rounded-overlay (10px): a textarea, a menu, a popover, a dialog, a code block. Because a pill around several lines pinches the first and last line at the ends, and the text runs into the curve.
   - Correct: `<pre className="well rounded-overlay p-3">`
   - Wrong: `<pre className="well rounded-pill p-3">`
3. radius-card-concentric MUST Build a card from shell (14px) and panel (11px); never round a panel to the shell's corner. Because the panel sits 3px inside the shell, so 11px keeps the two corners concentric and 14px leaves a wedge at each corner.
   - Correct: `<div className="shell"><div className="panel">`
   - Wrong: `<div className="shell"><div className="panel rounded-shell">`
4. radius-tags SHOULD Round a box inside a row or an overlay, a menu item or a tag in a table, with rounded-tag (6px). Because a 6px corner inside a 10px overlay with 4px of padding stays concentric.
5. radius-named NEVER Write a stock or arbitrary corner such as rounded-md or rounded-[8px]. Because Glaze's theme has no stock corners, so the class draws nothing or a corner no other part uses.
   - Correct: `<div className="rounded-overlay">`
   - Wrong: `<div className="rounded-md">`

## Tokens
| Token | Role | Use for | Not for | Light |
|-|-|-|-|-|
| `--radius-pill` | every one-line control | every one-line control | boxes of text | `999px` |
| `--radius-shell` | a card's grey shell | the card shell | the panel inside it | `14px` |
| `--radius-panel` | the white panel inside the shell, 3px in, so the corners stay concentric | the card panel | overlays | `11px` |
| `--radius-overlay` | a box that holds lines of text: overlays and text areas | menu, popover, dialog, textarea, code block | controls | `10px` |
| `--radius-row-focus` | a focused row's corners: the panel's inner edge, so its ring follows the panel's corner | item, data grid row |  | `calc(var(--radius-panel) - var(--line-width))` |
| `--radius-tag` | a box inside a row or an overlay | menu item, tag in a row, kbd | controls | `6px` |

## Decision table
| You need | Use |
|-|-|
| Button, field, select, chip | `rounded-pill` |
| Card | `shell and panel` |
| Menu, popover, dialog, textarea | `rounded-overlay` |
| Menu item, tag in a row | `rounded-tag` |

## Scale
pill, 14, 11, 10 and 6px.

## Reject list
- No square controls, no stock corners, no arbitrary radii.

## Related
- [Space](/systems/glaze/foundations/space.md): A 4px grid, 32px controls and 36px rows.
- [Borders and lines](/systems/glaze/foundations/borders-and-lines.md): One hairline weight, from the faint card edge to the field line that darkens on focus.
