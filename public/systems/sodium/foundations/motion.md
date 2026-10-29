---
name: Motion
system: sodium
kind: foundation
source: registry/sodium/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/sodium/foundations/motion
---

# Motion

Typing, scrambles, wipes and connectors that draw; ease-out, no springs.

## Rules
1. motion-mechanical MUST Move things the way a machine would: a cut for a state flip, a linear wipe along a rule, typing for text, ease-out only for a move across the screen. The one soft change is a button lighting under the pointer. Because Sodium reads as instruments, and a soft fade or a drift on a status change hides the moment it changed.
   - Correct: `className="wipe"`
   - Wrong: `className="transition-opacity duration-700"  // a failed run fading in`
2. motion-no-springs NEVER Use a spring, a bounce, an overshoot or a press scale; every move eases out and stops. Because an overshoot reads as a toy in an ops tool and delays the moment the thing settles.
   - Correct: `transition-timing-function: var(--ease-out)`
   - Wrong: `transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1)`
3. motion-type-once MUST Type or scramble a label once, when it first appears or its value changes, and never on a value a person is reading or editing. Because a value that keeps moving cannot be read or copied, and a scramble on every render is noise.
   - Correct: `<Scramble text={label} trigger="mount"/>`
   - Wrong: `<Scramble text={rows} loop/>`
4. motion-caret-while-typing NEVER Leave a caret blinking at rest; it shows only while text types and goes when the text is done. Because a blinking caret pulls the eye after the words are there, and it reads as a field waiting for input.
   - Correct: `{typing && <span className="caret"/>}`
   - Wrong: `<span className="caret animate-[blink_1s_steps(1)_infinite]"/>`
5. motion-durations MUST Take every duration from the motion tokens. Because reduced motion zeroes the tokens, and a typed duration keeps moving for people who asked it to stop.
   - Correct: `duration-(--dur-state)`
   - Wrong: `duration-[250ms]`
6. motion-name-properties NEVER Write transition-all; name the properties: colour, opacity, translate, clip-path. Because transition-all also tweens width and padding, so a hover shifts the layout around it.
   - Correct: `className="transition-[background-color]"`
   - Wrong: `className="transition-all"`
7. motion-loops NEVER Loop anything but the pending mark: no pulse, no glow, no light sweeping across, no scanlines. Because a loop pulls the eye from the one thing that changed, and the pending mark is the only sign work is running.
   - Correct: `<span className="pending"/>`
   - Wrong: `<div className="animate-pulse bg-well"/>`
8. motion-reduced MUST Let prefers-reduced-motion zero the wipes, draws, typing, scrambles and a button's light, so text, lines and colour are there at once; the pending mark stays still. Because moving text makes some people dizzy, and a still mark still says work is running.

## Tokens
| Token | Role | Use for | Not for | Light |
|-|-|-|-|-|
| `--dur-press` | a press: the colour step, no scale | a press | overlays | `80ms` |
| `--dur-state` | a state change: hover, an edge, a check | hover, an edge, a check; an overlay leaving | wipes | `120ms` |
| `--dur-overlay` | an overlay in; it leaves on --dur-state | an overlay arriving | hover | `160ms` |
| `--dur-wipe` | a region wiping in along its rule, start to end | a region or fill arriving along its rule | text | `240ms` |
| `--dur-draw` | a connector drawing out, one hop | tool-call connector, swimlane elbow |  | `300ms` |
| `--dur-type` | one character typing in, about 55 a second | typing | values being read | `18ms` |
| `--dur-scramble` | a mono label resolving from random glyphs, start to end | a label resolving | prose | `400ms` |
| `--dur-pending` | one cycle of the pending mark, four steps | button pending, tool call running |  | `800ms` |
| `--overlay-shift` | how far an anchored overlay travels in from its trigger | menu, popover, select, tooltip |  | `4px` |
| `--dur-light` | a button's fill and edge lightening under the pointer and settling back | a button's fill and edge lightening | a status change | `240ms` |
| `--dur-glow` | a button's light from below rising and fading, a beat behind its fill | a button's light from below | anything but slab and edged | `320ms` |
| `--ease-out` | the house curve: arrives fast and stops, no overshoot | every transition |  | `cubic-bezier(0.2, 0.8, 0.2, 1)` |
| `--ease-soft` | a softer arrival for light, no overshoot | primary button, secondary button hover |  | `cubic-bezier(0.22, 0.8, 0.24, 1)` |
| `--ease-in` | an element leaving | overlay exit |  | `cubic-bezier(0.4, 0, 1, 1)` |
| `--ease-linear` | wipes, typing and the pending steps | wipe, draw, type |  | `linear` |

## Decision table
| You need | Use |
|-|-|
| Press: the fill steps to its held colour and a button's light goes out; nothing scales | `--dur-press, --ease-out` |
| Light: a primary or secondary button's fill and edge lighten under the pointer and settle back after; its light from below follows on --dur-glow | `--dur-light, --ease-soft` |
| State: hover washes, a field's edge, a check; a state flip on a run (running to failed) is a cut | `--dur-state, --ease-out` |
| Overlay in: a menu, popover or tooltip fades in as it slides --overlay-shift from its trigger; a dialog only fades (overlay-motion) | `--dur-overlay, --ease-out` |
| Overlay out: it leaves the way it came, faster | `--dur-state, --ease-in` |
| Wipe: a region, a meter fill or a bar arrives along its rule from the start edge (wipe) | `--dur-wipe, --ease-linear` |
| Draw: a connector draws out from its node, one hop at a time, and ends in a square (draw) | `--dur-draw, --ease-out` |
| Type: a label or a headline types in a character at a time behind the caret, then the caret goes | `--dur-type, --ease-linear` |
| Scramble: a mono label resolves from random glyphs, start to end, once, when it first appears or its value changes | `--dur-scramble, --ease-linear` |
| Pending: one lit square steps along four, a loop | `--dur-pending, steps(4)` |

## Scale
80, 120 and 160ms for presses, states and overlays; 240 and 320ms for a button's fill and its light from below, on the softer --ease-soft; 240ms wipes, 300ms a connector hop; 18ms a typed character, 400ms a scramble; the pending mark 800ms a cycle in four steps. One curve out, a softer one for a button's light, one in, linear for wipes and typing. No springs, no scale.

## Reject list
- No springs, bounces, overshoot or press scale.
- No transition-all.
- No loops but the pending mark.
- No caret blinking at rest.
- No scroll reveals.

## Related
- [Elevation](/systems/sodium/foundations/elevation.md): No shadows: an overlay is the panel with a rule edge, set apart by its fill and, for a dialog, the scrim.
