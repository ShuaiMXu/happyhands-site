---
name: Elevation
system: lime
kind: foundation
source: registry/lime/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/lime/foundations/elevation
---

# Elevation

How things stack, using grey steps and a soft shadow for what floats.

## Rules
1. elevation-float-only MUST Shadow only what floats and can be dismissed: a raised card, a menu, a dialog. Because a shadow tells the person the thing sits above the page and will go away.
   - Correct: `<Card variant="raised">`
2. elevation-no-stack NEVER Stack a shadow and a hairline on the same edge in the light theme. Because the two draw a doubled, smudged edge, and the card reads heavier than a menu.
   - Correct: `<Card variant="raised">`
   - Wrong: `<Card variant="raised" className="border border-line">`
3. elevation-shadow-tokens MUST Use shadow-card, shadow-menu or shadow-overlay by level; never write a shadow value. Because the tokens tint the shadow warm and add the dark-theme ring, which a typed value misses.
   - Correct: `<div className="shadow-menu">`
   - Wrong: `<div className="shadow-[0_8px_24px_#0003]">`
4. elevation-no-color-shadow NEVER Color a shadow or add a gradient; the lime glow is the one exception. Because a colored cast looks like the glow and pulls the eye off the primary action.
   - Wrong: `<Card className="shadow-lg shadow-accent/40">`
5. elevation-dark-ring SHOULD Add a 1px --line ring to menus and overlays in the dark theme, where shadows barely show.

## Tokens
| Token | Role | Use for | Not for | Light | Dark (blank: same as light) |
|-|-|-|-|-|-|
| `--shadow-ink` | the shadow channel | the warm ink every shadow uses | pure black | `40 36 20` | `0 0 0` |
| `--shadow-card` | a raised card | card with the raised prop | flat cards | `0 1px 2px rgb(var(--shadow-ink) / 0.06), 0 1px 1px rgb(var(--shadow-ink) / 0.04)` | `0 1px 2px rgb(var(--shadow-ink) / 0.4)` |
| `--shadow-menu` | a menu, popover or select popup | popover, dropdown, select, combobox | dialogs | `0 8px 24px -6px rgb(var(--shadow-ink) / 0.16), 0 2px 6px rgb(var(--shadow-ink) / 0.06)` | `0 8px 24px -6px rgb(var(--shadow-ink) / 0.6), 0 0 0 1px var(--line)` |
| `--shadow-overlay` | a dialog or sheet | dialog, alert dialog, sheet | menus | `0 24px 48px -12px rgb(var(--shadow-ink) / 0.24), 0 4px 12px rgb(var(--shadow-ink) / 0.08)` | `0 24px 48px -12px rgb(var(--shadow-ink) / 0.7), 0 0 0 1px var(--line)` |
| `--thumb` | the knob of a switch, white | switch |  | `#ffffff` |  |
| `--switch-on` | a switch's track when on | switch |  | `var(--accent)` |  |
| `--switch-on-thumb` | a switch's knob when on: white on the lime | switch |  | `var(--thumb)` |  |
| `--shadow-thumb` | the knob's lift, like a phone's switch: a soft drop, a contact shadow and a hairline edge | switch |  | `0 2px 5px rgb(var(--shadow-ink) / 0.1), 0 1px 1px rgb(var(--shadow-ink) / 0.07), 0 0 0 0.5px rgb(var(--shadow-ink) / 0.1)` | `0 2px 5px rgb(0 0 0 / 0.22), 0 1px 1px rgb(0 0 0 / 0.16), 0 0 0 0.5px rgb(0 0 0 / 0.2)` |
| `--z-dialog` | a dialog or sheet and its scrim | dialog, alert-dialog, sheet |  | `40` |  |
| `--z-popover` | a popup anchored to a control, above the dialog it opens from | popover, menu, select, combobox, tooltip |  | `50` |  |
| `--z-toast` | a toast, above everything else | toast |  | `60` |  |
| `--raised` | a surface that floats above the page | any floating layer | cards on the page | `#ffffff` | `#1f1f1c` |
| `--scrim` | the layer behind a dialog or sheet | behind a dialog or sheet | popovers | `rgb(15 15 13 / 0.5)` | `rgb(0 0 0 / 0.64)` |

## Decision table
| You need | Use |
|-|-|
| Flat card | `--surface, no shadow` |
| Card that floats | `shadow-card` |
| Menu or popover | `shadow-menu` |
| Dialog or sheet | `shadow-overlay` |

## Scale
Levels: page, surface, raised card, menu, overlay.

## Reject list
- No colored shadows, no blur as decoration.

## Related
- [Color](/systems/lime/foundations/color.md): The colors Lime uses, and where each one goes.
- [Radius](/systems/lime/foundations/radius.md): How round each corner is, from pill buttons to softer panels.
