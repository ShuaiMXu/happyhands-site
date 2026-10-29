---
name: Motion
system: glaze
kind: foundation
source: registry/glaze/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/glaze/foundations/motion
---

# Motion

Glass gives to 0.99 in 50ms and comes back in 200ms; an overlay comes from the control that opened it; nothing springs.

## Rules
1. motion-press MUST Answer a press on glass with its own motion: scale to --scale-press-glass (0.99) in --dur-glass-press (50ms), the sheen gone and the centre darker, and back in --dur-glass-release (200ms); a flat control scales to --scale-press (0.97) in --dur-press (120ms). Because the press is Glaze's signature motion, and a control that answers on its own curve feels like a different product.
   - Correct: `<Button>Join</Button>`
   - Wrong: `active:scale-90 transition-transform duration-300`
2. motion-overlay MUST Bring an overlay in with overlay-motion: anchored, it slides --overlay-shift from its trigger's side; modal, it settles from --scale-overlay; it leaves the same way on --dur-state. Because the 4px says which control opened it and the 0.97 says a dialog sits above the page; one recipe keeps every overlay on the same path.
   - Correct: `className={cn(overlaySurface, overlayMotion)}`
   - Wrong: `data-starting-style:scale-50 data-starting-style:opacity-0`
3. motion-no-springs NEVER Use a spring, a bounce or an overshoot; every move eases out and stops. Because an overshoot makes a 120ms press read as a toy and delays the moment the control settles; at these lengths a damped spring lands where the ease-out does.
   - Correct: `transition-timing-function: var(--ease-out)`
   - Wrong: `transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1)`
4. motion-durations MUST Take every duration from --dur-press, --dur-state, --dur-overlay, --dur-slide, --dur-spin or --dur-sweep. Because reduced motion zeroes the tokens, and a typed duration keeps moving for people who asked it to stop.
   - Correct: `duration-(--dur-state)`
   - Wrong: `duration-[250ms]`
5. motion-name-properties NEVER Write transition-all; name the properties: colour, opacity, scale, translate. Because transition-all also tweens width and padding, so a hover shifts the layout around it.
   - Correct: `className="transition-[background-color,scale]"`
   - Wrong: `className="transition-all"`
6. motion-one-loop NEVER Loop anything but the pending arc and an indeterminate Progress: no pulse, glow or bounce of your own. Because a loop pulls the eye from the one thing that changed, and the arc and the progress sweep are the only signs work is running.
   - Correct: `<Button pending>Run eval</Button>`
   - Wrong: `<div className="animate-pulse bg-field"/>`
7. motion-reduced MUST Let prefers-reduced-motion zero the durations and the press scale; the arc stays as a still mark. Because scaling and fading make some people dizzy, and a still arc still says the button is working.

## Tokens
| Token | Role | Use for | Not for | Light |
|-|-|-|-|-|
| `--dur-press` | a press on a flat control: the scale | a press | overlays | `120ms` |
| `--dur-glass-press` | glass going down: the scale and the layers | glass active |  | `50ms` |
| `--dur-glass-release` | glass coming back up | glass |  | `200ms` |
| `--dur-state` | a state change: hover, a field's line, a check | hover, a field line, a check; an overlay leaving | presses | `160ms` |
| `--dur-overlay` | an overlay in; it leaves on --dur-state | an overlay arriving | hover | `200ms` |
| `--overlay-shift` | how far an anchored overlay travels in from its trigger, and back out | an anchored overlay coming in from its trigger | a dialog | `4px` |
| `--scale-overlay` | the scale a modal overlay settles from and leaves to | a dialog settling in | anchored overlays, presses | `0.97` |
| `--dur-spin` | one turn of the pending arc, a loop | button pending, spinner |  | `800ms` |
| `--dur-slide` | a selection mark sliding to its new place: the segmented thumb, the pill tab | segmented control, tabs |  | `200ms` |
| `--dur-sweep` | one pass of the indeterminate segment along a progress track, the other loop | progress indeterminate |  | `1400ms` |
| `--wait-show` | how long a load waits before its skeleton or dim shows, so a fast answer never flashes | skeleton swap |  | `150ms` |
| `--wait-hold` | how long a skeleton stays once it shows, so it never blinks | skeleton swap |  | `400ms` |
| `--stale` | the opacity of content that is reloading behind a busy mark | skeleton swap |  | `0.6` |
| `--ease-out` | the house curve: arrives fast, settles | every transition |  | `cubic-bezier(0.2, 0.8, 0.2, 1)` |
| `--ease-in` | an element leaving | overlay exit |  | `cubic-bezier(0.4, 0, 1, 1)` |
| `--scale-press-flat` | the scale a held secondary settles at, barely moving | secondary button |  | `0.99` |
| `--scale-press` | the scale a held flat control settles at | a held control | overlays | `0.97` |
| `--scale-press-glass` | the scale held glass settles at, a slight give | glass |  | `0.99` |

## Decision table
| You need | Use |
|-|-|
| Press: glass settles at --scale-press-glass in 50ms, the sheen goes and the dark centre deepens to --glass-core-held; it comes back in --dur-glass-release. A flat control settles at --scale-press in --dur-press | `--dur-glass-press, --ease-out` |
| State: hover brightness, a field's line, a row wash; a tick wipes in from its start edge (tick-draw) and goes at once; an opened section's text fades in while its height cuts | `--dur-state, --ease-out` |
| Overlay in: a menu, popover, select or tooltip fades in as it slides --overlay-shift (4px) from its trigger; a dialog fades in as it settles from --scale-overlay (0.97). One recipe, overlay-motion | `--dur-overlay, --ease-out` |
| Overlay out: it leaves the way it came, faster | `--dur-state, --ease-in` |
| Slide: a selection mark moves to the new choice: the segmented thumb, the pill tab's paper; the labels crossfade | `--dur-slide, --ease-out` |
| Pending: the arc turns, a loop | `--dur-spin, linear` |
| Indeterminate: a short glaze segment slides along a progress track, the other loop | `--dur-sweep, linear` |

## Scale
Durations 50 (glass down), 120, 160 and 200ms (overlays, a sliding thumb), the arc 800ms a turn, the progress sweep 1400ms a pass. One curve out, one in. No springs. Overlays travel 4px or settle from 0.97.

## Reject list
- No springs, bounces or overshoot.
- No transition-all.
- No loops but the arc and the progress sweep.
- No overlay that grows from nothing, and no dialog that slides.
- No height that animates; a section's height cuts.

## Related
- [Elevation](/systems/glaze/foundations/elevation.md): No shadows: depth is drawn inside the shape, and overlays lift with a ring.
