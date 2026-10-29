---
name: Elevation
system: sodium
kind: foundation
source: registry/sodium/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/sodium/foundations/elevation
---

# Elevation

No shadows: an overlay is the panel with a rule edge, set apart by its fill and, for a dialog, the scrim.

## Rules
1. elevation-no-shadows NEVER Cast a shadow: no shadow-*, drop-shadow-* or box-shadow, on regions, buttons or overlays. The one box-shadow is the 1px halo the slab and edged recipes draw under the pointer: a ring flush with the edge, no blur, no offset. Because Sodium is drawn in 1px rules on flat fills, so a blur is the one soft edge on the screen, and every shadow class draws nothing here; a button reads as pressable by light from below inside its face and a hairline halo on hover (the slab and edged recipes), never by a shadow under it.
   - Correct: `<div className="overlay">`
   - Wrong: `<div className="overlay shadow-lg">`
2. elevation-overlay-edge MUST Draw a menu, popover or dialog with the overlay recipe: the panel fill and a 1px line edge, the rule a card draws. Because every bordered thing in Sodium shares one edge colour, so the overlay reads as one more ruled region, set apart by its panel fill and its place over the content.
   - Correct: `<div className="overlay">`
   - Wrong: `<div className="bg-page border border-line-control">`
3. elevation-scrim MUST Dim the page behind a dialog with --scrim: ink at 32% in light, black at 64% in dark. Because the dim says the page is inert until the dialog closes, and a near-black page needs the fixed dark to dim at all.
   - Correct: `<div className="fixed inset-0 bg-scrim"/>`
4. elevation-layers-under-docs MUST Keep a specimen's overlays on --z-overlay (50) and never higher, so the docs' own floating bar stays on top. Because an overlay opened in a preview that climbs past the docs bar covers the theme switch and the install button.
   - Correct: `className="z-(--z-overlay)"`
   - Wrong: `className="z-[100]"`

## Tokens
| Token | Role | Use for | Not for | Light | Dark (blank: same as light) |
|-|-|-|-|-|-|
| `--shadow-none` | the only shadow Sodium has: nothing casts one, overlays included; the buttons' 1px halo is a ring, not a shadow | the only shadow value | anything that lifts | `none` |  |
| `--z-raised` | a part lifted over its siblings inside a component | sticky header, focused cell |  | `10` |  |
| `--z-overlay` | every portalled layer, under the docs' own floating layers; the last opened sits on top | dialog, popover, menu, tooltip, toast |  | `50` |  |
| `--overlay-sm` | a small dialog | alert dialog |  | `400px` |  |
| `--overlay` | the default dialog and sheet width | dialog, sheet |  | `480px` |  |
| `--overlay-lg` | a wide dialog: a preview, the command palette | dialog lg, command |  | `640px` |  |
| `--popover` | a popover's width | popover |  | `288px` |  |
| `--toast` | a toast's width on a wide screen | toast |  | `360px` |  |
| `--menu-min` | the narrowest a menu opens | dropdown menu, select |  | `192px` |  |
| `--popup-max` | the tallest a list popup grows before it scrolls | select, combobox, menu |  | `320px` |  |
| `--tooltip-max` | a tooltip's line length before it wraps | tooltip |  | `256px` |  |
| `--label-col` | the widest a label column grows before its labels wrap | data list, key and value block |  | `160px` |  |
| `--meter` | the thickness of a meter or progress track | meter, progress |  | `8px` |  |
| `--measure` | a paragraph's longest line | prose, lead |  | `68ch` |  |
| `--measure-hint` | a description or hint's longest line | field hint, row description |  | `60ch` |  |
| `--scrim` | the dim behind a dialog: ink at 32% | behind a dialog or sheet | popovers | `rgb(22 21 18 / 0.32)` | `rgb(0 0 0 / 0.64)` |
| `--line` | the rule that divides content and the edge of a field, a boxed control and an overlay, 1.3:1 on the page | the overlay's edge, the same rule a card draws | checkbox, radio, switch | `#e2dfd5` | `#2c2a25` |
| `--panel` | a raised region, a hair warmer than the page, read by its rules more than its fill | the overlay's fill | the page | `#fafaf7` | `#1c1b19` |

## Decision table
| You need | Use |
|-|-|
| A region on the page | `frame, no lift` |
| A menu or popover | `overlay` |
| A dialog | `overlay over --scrim` |

## Scale
Levels: the page, a frame on it, an overlay (panel and a rule edge), a dialog (an overlay over the scrim). Nothing casts a shadow. The primary and secondary buttons are lit from below inside their own face and take a 1px halo on hover; they lighten and never lift.

## Reject list
- No shadows of any kind, overlays included; the buttons' 1px halo is a ring, not a shadow.
- No backdrop blur.

## Related
- [Color](/systems/sodium/foundations/color.md): White and warm near-black, rules for structure, and one sodium yellow that changes how it shows by theme.
- [Borders and lines](/systems/sodium/foundations/borders-and-lines.md): Rules divide content; a frame is a region's one outer edge.
