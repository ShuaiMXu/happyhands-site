---
name: Radius
system: quartz
kind: foundation
source: registry/quartz/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/quartz/foundations/radius
---

# Radius

Three corners by role, and round means a person.

## Rules
1. radius-roles MUST Pick the corner by what the box is: rounded-frame (10px) for a component's outer edge and every overlay, rounded-soft (6px) for a control, rounded-inner (4px) for a box inside a control or a row. Components already carry theirs, and the frame utility sets the frame corner, so a rounded-* class beside it only fights it. Because the corner says how a box nests, so a button reads as sitting inside a card and a selected segment as sitting inside its track.
   - Correct: `<div className="frame"/>`
   - Wrong: `<div className="frame rounded-md"/>`
2. radius-nesting MUST Round a box inside another by the outer radius minus the padding between them, and never below 0. A 6px track with 2px of padding holds a 4px thumb. Because when the inner corner is as big as the outer one, the gap between them is wider at the corner than on the sides.
   - Correct: `<div className="rounded-soft p-0.5"><span className="rounded-inner"/></div>`
   - Wrong: `<div className="rounded-soft p-0.5"><span className="rounded-soft"/></div>`
3. radius-frame-var SHOULD To change the corner of a frame, set --frame-radius on it; the frame utility reads it and falls back to --radius-frame. Because a frame draws its edge and its clip from one radius, and an override on only one of them leaves a gap or a cut-off corner.
   - Correct: `<div className="frame [--frame-radius:var(--radius-soft)]"/>`
4. radius-person MUST Use the full radius only for a person (an avatar, the presence mark) and for the two controls whose shape is round: the radio and the switch, track and thumb. Because round is how a person is told apart from an agent or a source at a glance, so a round tag spends that meaning.
   - Correct: `<Avatar name="Ana Li"/>  <Avatar type="agent" name="triage"/>`
   - Wrong: `<Avatar type="agent" className="rounded-full"/>`
5. radius-no-pill NEVER Round a label, tag or filter fully. Because a pill reads as a toggle, so people click a static tag, and a round box next to the radio reads as one more option.
   - Correct: `<Badge>Beta</Badge>`
   - Wrong: `<span className="rounded-full px-2 type-label-sm">beta</span>`
6. radius-shared-straight MUST In a ButtonGroup or any frame-shared strip, round only the outer corners; the edges cells share stay straight. Because a corner on a shared edge leaves a notch in the one line two cells draw together.
   - Correct: `<ButtonGroup>…</ButtonGroup>`
   - Wrong: `<div className="flex gap-px">{cells.map(c => <span className="rounded-soft frame-shared"/>)}</div>`

## Tokens
| Token | Role | Use for | Not for | Light |
|-|-|-|-|-|
| `--radius-0` | a straight edge: the shared edges of cells in a strip, bitmap pixels | the shared edges of cells in a strip, bitmap pixels | outer corners | `0px` |
| `--radius-inner` | a box inside a control or a row: the selected segment, badges, chips, row fills, a menu item | a box inside a control or a row: the selected segment, badge, chip parts, menu item, code tag, kbd | a component's outer edge | `4px` |
| `--radius-soft` | a control: buttons, fields, the segmented track, code tags | a control: button, input, select, the segmented track, chip | cards and overlays | `6px` |
| `--radius-frame` | a component's outer edge and every overlay | a component's outer edge and every overlay: card, table, dialog, popover, menu, toast | controls, and the tooltip, which is control-sized and takes --radius-soft | `10px` |
| `--radius-full` | round means a person: avatars and the presence mark, plus the radio so it never reads as a checkbox | avatars, the presence mark, the radio, the switch track and thumb | labels and tags | `999px` |

## Decision table
| You need | Use |
|-|-|
| Card, table, dialog, popover, menu, toast | `--radius-frame (rounded-frame)` |
| Button, input, select, chip, segmented track | `--radius-soft (rounded-soft)` |
| Selected segment, badge, menu item, code tag, kbd | `--radius-inner (rounded-inner)` |
| Edge between two cells of a strip | `--radius-0` |
| Avatar, presence, radio, switch | `--radius-full` |

## Scale
Three corners: 4px inside, 6px on a control, 10px on a frame. Full for a person. Chips are rounded-soft; kbd and small badge variants are rounded-inner. Tailwind's rounded-xs and rounded-sm map to 4px, rounded-md to 6px, rounded-lg and rounded-xl to 10px, but write the role name.

## Reject list
- No pills.
- No corner outside the three roles.
- No rounded corner on a shared edge.
- No inner box with the same radius as its outer box.

## Related
- [Borders and lines](/systems/quartz/foundations/borders-and-lines.md): Grey fields keep things apart, and hairlines go only where a field cannot.
- [Space](/systems/quartz/foundations/space.md): How much room goes between things, in steps of 4px.
