---
name: Radius
system: sodium
kind: foundation
source: registry/sodium/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/sodium/foundations/radius
---

# Radius

Zero, everywhere.

## Rules
1. radius-zero NEVER Round a corner: no rounded-* class on a control, a region, a tag, an overlay or an avatar. Because square corners are how Sodium meets its rules: a rounded box beside a 1px rule leaves a gap at the corner and reads as another system.
   - Correct: `<span className="bg-well px-2">Queued</span>`
   - Wrong: `<span className="rounded-md bg-well px-2">Queued</span>`
2. radius-stock-names-draw-nothing SHOULD Delete a stock corner class rather than leaving it; every one draws 0 in Sodium's theme, and the lint flags it. Because a dead rounded-lg tells the next reader the corner was meant to round.
3. radius-round-things MUST Draw a thing that is round in the world (a person's photo, a radio) as a square too; the radio's dot is a square. Because one rounded part in a square system is the part everyone notices, and a square radio still reads as one of a set by its group label.
   - Correct: `<img className="size-6"/>`
   - Wrong: `<img className="size-6 rounded-full"/>`

## Tokens
| Token | Role | Use for | Not for | Light |
|-|-|-|-|-|
| `--radius` | every corner: controls, panels, overlays, tags | every corner | nothing | `0px` |

## Decision table
| You need | Use |
|-|-|
| Any corner | `nothing: base.css sets 0 and the theme's stock corners are 0` |

## Scale
One value: 0.

## Reject list
- No rounded corners anywhere, avatars and radios included.

## Related
- [Borders and lines](/systems/sodium/foundations/borders-and-lines.md): Rules divide content; a frame is a region's one outer edge.
- [Space](/systems/sodium/foundations/space.md): A 4px grid, 32px controls and 40px rows.
