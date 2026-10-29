---
name: Radius
system: lime
kind: foundation
source: registry/lime/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/lime/foundations/radius
---

# Radius

How round each corner is, from pill buttons to softer panels.

## Rules
1. radius-by-kind MUST Round by the kind of element: control, field, panel or sheet. Because the corner tells the person what a shape does, a pill presses and a 12px box takes text.
   - Correct: `<div className="rounded-panel">`
2. radius-no-pill-field NEVER Round a field to a pill or give a button 12px corners. Because a pill field reads as a button to press and a 12px button reads as a box to type in.
   - Correct: `<Input placeholder="Search"/>`
   - Wrong: `<Input className="rounded-full" placeholder="Search"/>`
3. radius-concentric MUST Give an element inside a rounded panel a smaller radius than the panel. Because an inner corner as round as the outer one leaves a thick wedge of gap at each corner.
   - Correct: `<Menu className="rounded-panel p-1"><Item className="rounded-md"/></Menu>`
4. radius-token-class MUST Use rounded-control for a button shape; keep rounded-full for dots and avatars. Because a retuned --radius-control reaches every button, and one set to rounded-full stays behind.
   - Correct: `<Button/>`
   - Wrong: `<button className="rounded-full">`
5. radius-media-sheet SHOULD Use rounded-sheet for a media tile and the panel that opens beside it.

## Tokens
| Token | Role | Use for | Not for | Light |
|-|-|-|-|-|
| `--radius-sm` | a tiny inner shape | checkbox, kbd | panels | `6px` |
| `--radius-md` | a menu item | menu item, tab | fields | `10px` |
| `--radius-field` | a text field | input, textarea, select trigger | buttons | `12px` |
| `--radius-panel` | a card, popover or dialog | card, popover, menu, alert | controls | `16px` |
| `--radius-sheet` | a dialog or sheet | dialog, sheet edge, large media tile | small panels | `24px` |
| `--radius-control` | a button, chip, badge, segment | button, chip, badge, segmented, switch | fields | `999px` |

## Decision table
| You need | Use |
|-|-|
| Button, chip, badge | `rounded-control` |
| Text field | `rounded-field` |
| Card, popover, menu | `rounded-panel` |
| Dialog, sheet, media tile | `rounded-sheet` |
| Menu item inside a menu | `rounded-md` |

## Scale
Steps: pill, 12px, 16px, 24px, plus 10px and 6px for inner shapes.

## Reject list
- No ad hoc radii in px.

## Related
- [Elevation](/systems/lime/foundations/elevation.md): How things stack, using grey steps and a soft shadow for what floats.
- [Spacing](/systems/lime/foundations/spacing.md): How much room goes between things, and how tall controls are.
