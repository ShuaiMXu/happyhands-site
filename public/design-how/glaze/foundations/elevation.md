---
name: Elevation
system: glaze
kind: foundation
source: registry/glaze/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/glaze/foundations/elevation
---

# Elevation

No shadows: depth is drawn inside the shape, and overlays lift with a ring.

## Rules
1. elevation-no-shadows NEVER Cast a shadow: no shadow-*, drop-shadow-* or box-shadow, on cards, buttons or overlays. Because Glaze has none, so every shadow class draws nothing here, and a hand-written one blurs the clean edge the system is built on.
   - Correct: `<div className="shell">`
   - Wrong: `<div className="shell shadow-md">`
2. elevation-inside-the-shape MUST Draw depth inside the shape: the glass's sheen, dark centre and rim on what is pressed, the shell around a card's panel. Because a layer inside the edge reads as depth without blurring the edge, and it looks the same on paper, on the page and in the dark theme.
   - Correct: `<Button>Run eval</Button>`
   - Wrong: `<Button className="shadow-lg">Run eval</Button>`
3. elevation-overlay-ring MUST Lift a menu or popover with the overlay recipe: paper and a 1px --line ring on the page, a step darker than paper. A dialog is a shell with a panel in it, like a card. Because the step from the page to paper and the ring close the overlay's edge, so it reads above the page with no shadow.
   - Correct: `<div className="overlay">`
   - Wrong: `<div className="rounded-overlay bg-paper shadow-xl">`
4. elevation-ring-not-shadow NEVER Fix an overlay that gets lost on a white page with a shadow; strengthen the ring. Because a shadow there is the first one in the system and every later overlay copies it.
   - Correct: `<div className="overlay border-line-control">`
   - Wrong: `<div className="overlay shadow-md">`
5. elevation-scrim MUST Dim the page behind a dialog with --scrim: ink at 24% in light, black at 64% in dark. Because the dim says the page is inert until the dialog closes, and a dark page needs the fixed dark to dim at all.
   - Correct: `<div className="fixed inset-0 bg-scrim"/>`

## Tokens
| Token | Role | Use for | Not for | Light | Dark (blank: same as light) |
|-|-|-|-|-|-|
| `--shadow-none` | the only shadow Glaze has: nothing casts one, overlays included | the only shadow value | anything that lifts | `none` |  |
| `--z-raised` | a part lifted over its siblings inside a component | sticky header, focused segment |  | `10` |  |
| `--z-sticky` | a bar that sticks to the page | sticky toolbar, bulk action bar |  | `20` |  |
| `--z-overlay` | every portalled layer; the last opened sits on top by DOM order | dialog, popover, menu, tooltip, toast |  | `50` |  |
| `--scrim` | the dim behind a dialog: ink at 24% | behind a dialog or sheet | popovers | `rgb(5 5 5 / 0.24)` | `rgb(0 0 0 / 0.64)` |
| `--line` | an overlay's 1px ring and a divider that must read | the overlay ring | card edges | `rgb(5 5 5 / 0.10)` | `rgb(244 244 243 / 0.10)` |
| `--page` | the page, a half step darker than paper: a paper overlay still lifts off it and the grey shell reads as the card | the step under every overlay | the overlay itself | `#fbfbfa` | `#0c0c0c` |

## Glass tokens
Read only through their classes; never set or read them in a component.
`--glass-ink-base`, `--glass-ink-text`, `--glass-ink-ring`, `--glass-coral-base`, `--glass-coral-text`, `--glass-coral-ring`, `--glass-green-base`, `--glass-green-text`, `--glass-green-ring`, `--glass-sheen`, `--glass-sheen-hover`, `--glass-core`, `--glass-core-held`, `--glass-rim`, `--glass-glaze`, `--glass-gloss`, `--glass-blur`, `--gloss-inset`, `--gloss-top`, `--gloss-height`

## Flat tokens
Read only through their classes; never set or read them in a component.
`--flat-bg`, `--flat-ring`, `--flat-text`, `--flat-hover`

## Decision table
| You need | Use |
|-|-|
| A card | `shell and panel, no shadow` |
| A button | `Button: the primary is glass, the secondary flat, neither casts a shadow` |
| A menu or popover | `overlay` |
| A dialog | `overlay and --scrim behind` |

## Scale
Levels: the page, a card (shell and panel on the page), an overlay (paper and a ring on the page), a dialog (an overlay over the scrim). The glass on pressables is the one depth drawn on a control.

## Reject list
- No shadows of any kind, overlays included.
- No backdrop blur.

## Related
- [Color](/systems/glaze/foundations/color.md): Ink and paper with greys as ink at alphas, and colour only for status.
- [Borders and lines](/systems/glaze/foundations/borders-and-lines.md): One hairline weight, from the faint card edge to the field line that darkens on focus.
