---
name: Color
system: sodium
kind: foundation
source: registry/sodium/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/sodium/foundations/color
---

# Color

White and warm near-black, rules for structure, and one sodium yellow that changes how it shows by theme.

## Rules
1. color-roles-only MUST Read a role such as text-text-2, bg-panel or border-line; never write a hex, an rgb() or a dark: variant. Because the dark theme swaps every role's value, and a typed colour or a dark: pair stays behind.
   - Correct: `<p className="text-text-2">`
   - Wrong: `<p className="text-[#55524a] dark:text-white">`
2. color-yellow-rules NEVER Set text, an icon or a lone line in solid yellow (accent-fill); yellow-family text is text-accent-text, and a yellow fill always sits under ink. Because sodium yellow on white is 1.4:1, so a yellow word or icon disappears in the light theme, which is the default.
   - Correct: `<span className="text-accent-text">Running</span>`
   - Wrong: `<span className="text-accent-fill">Running</span>`
3. color-one-slab MUST Keep solid yellow to the one primary button in a view, a chart series and a value chosen inside a small control (the checked recipe); a place you are takes the selected wash, not the slab. Because the slab is how a person finds the next action, and a second slab on the screen splits that in two; a checked box, radio, switch or segment takes yellow as a state, not an action, and it is small and carries an ink mark, so it does not compete with the slab.
   - Correct: `<div className="selected p-3">Current job</div>`
   - Wrong: `<div className="bg-accent-fill p-3">Current job</div>`
4. color-warn-orange MUST Show a warning in orange (warn, warn-text, warn-tint) with its word, never in yellow. Because yellow is the brand and already means "act here", so a yellow warning reads as the primary action.
   - Correct: `<span className="bg-warn-tint px-1 type-label-sm text-warn-text">Over budget</span>`
   - Wrong: `<span className="bg-selected text-accent-text">Over budget</span>`
5. color-status-word MUST Pair a status colour with its word, such as Failed or Passed, never colour alone. Because green, orange and red alone fail people with colour blindness, in grayscale and in forced colours.
   - Correct: `<span className="type-label-sm text-fail-text">Failed</span>`
   - Wrong: `<span className="size-2 bg-fail"/>`
6. color-text-tiers SHOULD Use text-1 for values and labels, text-2 for descriptions, text-3 for axes, placeholders and column heads at rest; all three read at 4.5:1 or more. Because the tiers are a hierarchy of attention, not of legibility, so a dense table stays readable down to its axis ticks.

## Tokens
| Token | Role | Use for | Not for | Light | Dark (blank: same as light) |
|-|-|-|-|-|-|
| `--page` | the page: white, so the rules and the one yellow slab carry the screen | the app background, white in light | raised regions | `#ffffff` | `#141412` |
| `--panel` | a raised region, a hair warmer than the page, read by its rules more than its fill | a raised region, a header row, an overlay | the page | `#fafaf7` | `#1c1b19` |
| `--well` | an inset: code, output, a track | code, output, a track, a disabled control | regions | `#f4f3ee` | `#22211e` |
| `--code-surface` | where a block of code sits | code block, log viewer, code window |  | `var(--well)` |  |
| `--hover` | ink at 4%: a row or a plain button under the pointer | row, ghost button, menu item |  | `rgb(22 21 18 / 0.04)` | `rgb(245 243 238 / 0.04)` |
| `--pressed` | ink at 8%: a plain control held | ghost button, destructive button, segmented control, row active |  | `rgb(22 21 18 / 0.08)` | `rgb(245 243 238 / 0.08)` |
| `--selected` | the selection wash, like a terminal selection: a place you are, under ink | the selection wash: a place you are, a highlighted line | the primary action | `#fff4bf` | `#3a3107` |
| `--selected-strong` | the selection wash under the pointer or held | selected row hover |  | `#ffec99` | `#4a3f09` |
| `--scrim` | the dim behind a dialog: ink at 32% | dialog, sheet |  | `rgb(22 21 18 / 0.32)` | `rgb(0 0 0 / 0.64)` |
| `--text-1` | primary text, a warm near-black, 18.3:1 on the page | headlines, body, labels, values |  | `#161512` | `#f5f3ee` |
| `--text-2` | secondary text, 7.8:1 on the page, 7.0:1 on the well | descriptions, hints, meta |  | `#55524a` | `#c4c0b6` |
| `--text-3` | tertiary text, 5.6:1 on the page, 5.1:1 on the well and the wash: still reads | axes, placeholders, column heads at rest; still 4.5:1 | values | `#6b675e` | `#a19c90` |
| `--text-disabled` | a disabled label; no contrast claim | disabled control |  | `#a8a499` | `#5e5a52` |
| `--text-inverse` | text on solid ink | tooltip, checked mark |  | `#ffffff` | `#141412` |
| `--accent` | sodium yellow, solid: the primary slab, a data series | the primary slab, a checked control, a chart series | text, icons or lone lines on light | `#ffd400` |  |
| `--accent-text` | yellow-family text on a light ground: a dark gold, 6.2:1 on the page, 5.6:1 on the wash | yellow-family text: dark gold in light, yellow in dark | fills | `#7a5d00` | `#ffd400` |
| `--accent-edge` | the line around a wash; decoration beside a word, never the only cue | running step tab, selected tab index |  | `#c9a700` | `#ffd400` |
| `--primary-bg` | light: the solid yellow slab, the one solid yellow on the screen | primary button |  | `#ffd400` | `#3a3107` |
| `--primary-text` | ink on the slab, 12.8:1 | primary button |  | `#161512` | `#ffd400` |
| `--primary-edge` | the slab's 1px edge, so its corner holds on white | primary button |  | `#d9b400` | `#ffd400` |
| `--primary-hover` | the slab under the pointer: lighter, never darker, as if lit from below | primary button hover |  | `#ffdf3d` | `#4a3f09` |
| `--primary-edge-hover` | the slab's edge under the pointer, lighter with the fill | primary button hover |  | `#f0cf2c` | `#ffd400` |
| `--primary-pressed` | the slab held: back to the rest fill, and the light goes out | primary button active |  | `#ffd400` | `#2e2705` |
| `--primary-light` | the light under the slab at rest: white rising from below its bottom edge, fainter across its top | primary button |  | `rgb(255 255 255 / 0.55)` | `rgb(255 212 0 / 0.22)` |
| `--primary-light-hover` | that light under the pointer | primary button hover |  | `rgb(255 255 255 / 0.85)` | `rgb(255 212 0 / 0.36)` |
| `--primary-ring` | the hairline halo: a 1px ring flush outside the slab's edge under the pointer and held, no blur | primary button hover |  | `#fff9df` | `rgb(255 212 0 / 0.1)` |
| `--ok` | done: a mark | status mark, meter done |  | `#2c6a3a` | `#8cc79a` |
| `--ok-text` | the done word, 6.5:1 on the page, 5.7:1 on its tint | status word, success message |  | `#2c6a3a` | `#8cc79a` |
| `--ok-tint` | the done ground | success tag, success row |  | `#e8f2ea` | `#17271b` |
| `--warn` | a warning mark: orange, because yellow is the brand | a warning mark, in orange | the brand | `#c25e00` | `#ff9a52` |
| `--warn-text` | the warning word, 6.0:1 on the page, 5.2:1 on its tint | status word, warning message |  | `#a14b00` | `#ff9a52` |
| `--warn-tint` | the warning ground | warning tag, warning row |  | `#fdeee0` | `#33200f` |
| `--fail` | a failure mark, an invalid field's edge, a destructive action | status mark, invalid field, destructive button |  | `#b3261e` | `#ff6b57` |
| `--fail-text` | the failure word, 6.5:1 on the page, 5.7:1 on its tint | error message, status word, failed row |  | `#b3261e` | `#ff6b57` |
| `--fail-tint` | the failure ground | error tag, failed row, failing code line |  | `#fdecea` | `#3a1915` |

## Contrast
[The table on the human page](https://design.how/systems/sodium/foundations/color#contrast).

## Decision table
| You need | Use |
|-|-|
| The page | `--page, white in light, warm near-black in dark` |
| A raised region or its header row | `--panel, read by its rules more than its fill` |
| The one action to take | `the primary: a yellow slab in light, a yellow tint with a yellow line in dark` |
| Where you are, a selected row, a highlighted line | `--selected, the wash under ink` |
| A word in the yellow family | `--accent-text` |
| A ticked box or a chosen radio | `the checked roles: yellow under an ink mark in light, the yellow tint in dark` |
| A warning | `--warn-text and its word, orange` |

## Reject list
- No yellow text, icons or lone lines on a light ground.
- No yellow warning; no second slab.
- No gradient but a button's light from below, no colour for decoration.

## Related
- [Typography](/systems/sodium/foundations/typography.md): Mono capitals for the interface, Inter Display for headlines and prose, one weight.
- [Borders and lines](/systems/sodium/foundations/borders-and-lines.md): Rules divide content; a frame is a region's one outer edge.
