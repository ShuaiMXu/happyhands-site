---
name: Motion
system: quartz
kind: foundation
source: registry/quartz/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/quartz/foundations/motion
---

# Motion

State changes answer in 60 to 180ms on one standard ease.

## Rules
1. motion-quartzs-snap MUST Change a quartz with a cut or a short ease on --ease-step (cubic-bezier(0.2, 0, 0, 1)); nothing glides. Because a status that fades from running to failed shows a half state an operator can misread, and a slow ease makes the change look late.
   - Correct: `<Status status={status}/>`
   - Wrong: `<Status status={status} className="transition-all duration-700"/>`
2. motion-declare-transitions MUST Give every interactive element a transition: color, background and outline over --dur-fast. Because transition: all also tweens width and padding, which shifts layout on hover, and an element with none cuts while its neighbour tweens.
   - Correct: `transition: color var(--dur-fast), background-color var(--dur-fast)`
   - Wrong: `transition: all`
3. motion-hue-cuts NEVER Ease a hue change; border and wash changes may ease. Because mid-tween the color passes through other kinds, so cyan easing to orchid shows the run blue for a moment.
   - Correct: `<Badge kind={kind}/>`
   - Wrong: `<Badge kind={kind} className="transition-colors duration-300"/>`
4. motion-one-thing NEVER Animate for its own sake: no parallax or looping decoration. The running arc and an indeterminate bar are the only loops. Because motion pulls the eye, and a looping decoration takes it from the one row that changed.
   - Correct: `<Status status="running"/>`
   - Wrong: `<Badge kind="agent" className="animate-bounce">Live</Badge>`
5. motion-running-arc MUST Show running work as the 3/4 arc before the word, turning smoothly once per --dur-spin. Because the arc stops but stays under reduced motion and pauses offscreen, which a hand-made spinner does not.
   - Correct: `<Status status="running"/>`
   - Wrong: `<span className="animate-spin">...</span> Running`
6. motion-no-grow NEVER Grow or scale an overlay in; it appears. Because a grow pulls the eye to the motion instead of the content and makes a fast menu feel slow.
   - Correct: `<PopoverContent/>`
   - Wrong: `<PopoverContent className="data-starting-style:scale-95"/>`
7. motion-collapse-cuts MUST Open and close a panel with a cut; never tween its height. Because a height tween reflows everything below it for 200ms, and the content arrives after the person already looked.
   - Correct: `<CollapsibleContent/>`
   - Wrong: `<CollapsiblePanel className="transition-[height]"/>`
8. motion-reduced MUST Honour prefers-reduced-motion: base and slow durations and the sheet shift go to zero, loops stop; hover colour stays. Because sliding sheets and loops can make people with vestibular disorders sick, while a 60ms press still tells them the click landed.
   - Correct: `motion-safe:animate-run`
9. motion-pause-offscreen SHOULD Pause any loop while it is offscreen. Because a loop nobody can see still costs frames and battery.

## Tokens
| Token | Role | Use for | Not for | Light | Dark (blank: same as light) |
|-|-|-|-|-|-|
| `--dur-press` | press feedback | press feedback | hover | `60ms` |  |
| `--dur-fast` | hover: color, wash and edge changes on every interactive element, and a menu, popover or tooltip leaving, on --ease-step | hover color, wash and edge changes, and an overlay leaving | dialogs | `120ms` |  |
| `--dur-base` | menus, popovers, selects, tooltips and toasts in, opacity only; they leave on the shorter --dur-fast | menus, popovers, tooltips and toasts in | hover | `160ms` |  |
| `--dur-slow` | dialogs and sheets: opacity, plus --sheet-shift for a sheet | dialogs and sheets | menus | `180ms` |  |
| `--dur-spin` | one turn of a pending ring (--ease-spin) | one turn of a pending ring | hover | `800ms` |  |
| `--dur-run` | one turn of the running status arc (animate-run) | one turn of the running status arc | hover | `1000ms` |  |
| `--dur-slide` | one pass of the indeterminate progress segment (animate-slide) | one pass of the indeterminate progress segment | hover | `1200ms` |  |
| `--ease-spin` | the pending ring turns smoothly | the pending ring, turning smoothly | state changes | `linear` |  |
| `--thumb-lift` | how much ink the selected segment takes beyond paper; the dark theme raises it | surface-thumb |  | `0%` | `20%` |
| `--thumb-ring-alpha` | the ink alpha of the selected segment's 1px ring; the dark theme raises it | elev-thumb |  | `0` | `0.16` |
| `--skeleton-step` | how much ink the skeleton fill takes beyond the grey field; the dark theme raises it | skeleton |  | `0%` | `8%` |
| `--dur-skeleton-delay` | wait before a skeleton shows, so fast loads never flash one | skeleton swap |  | `150ms` |  |
| `--dur-skeleton-hold` | shortest time a shown skeleton stays, so it never blinks | skeleton swap |  | `400ms` |  |
| `--toast-read-base` | reading time every toast gets | toast |  | `3000ms` |  |
| `--toast-read-char` | reading time per character of title and description | toast |  | `60ms` |  |
| `--toast-read-action` | extra time when the toast carries an action | toast |  | `3000ms` |  |
| `--toast-read-min` | shortest a toast stays | toast |  | `4000ms` |  |
| `--toast-read-max` | longest a toast stays before it waits for the person | toast |  | `12000ms` |  |
| `--scale-press` | the scale a pressed button or chip settles at | pressed chip or tile | overlays | `0.98` |  |
| `--ease-step` | the standard curve for every state change: hover, press, chip toggle, row select, tab switch | the standard ease for every state change and every overlay; it eases out, it does not snap | loops | `cubic-bezier(0.2, 0, 0, 1)` |  |
| `--sheet-shift` | how far a sheet travels from its edge as it appears | how far a sheet travels in | menus | `8px` |  |
| `--surface-skeleton` | the skeleton fill: the grey field, one step stronger in the dark theme | skeleton box |  | `color-mix(in oklch, oklch(var(--grey-c)), oklch(var(--ink-c)) var(--skeleton-step))` |  |
| `--stale-opacity` | content that is reloading, still shown and still readable, 5:1 of ink at 60% | skeleton swap region while it reloads |  | `0.6` |  |
| `--dim-opacity` | content set aside while something else is the point: a muted legend entry, a dimmed series, a tool row in shell mode, a disabled thumbnail, a disabled primary key | chart legend, chart series, prompt input, attachment |  | `0.4` |  |

## Decision table
| You need | Use |
|-|-|
| Hover: color, wash and edge on every interactive element | `--dur-fast, --ease-step` |
| Press: a button or chip settles at --scale-press | `--dur-press, --ease-step` |
| Enter: a menu, popover, select, tooltip or toast appears: opacity only, it never grows | `--dur-base, --ease-step` |
| Exit: any overlay leaves faster than it came | `--dur-fast, --ease-step` |
| Overlay: a dialog appears; a sheet adds an 8px slide (--sheet-shift) from its edge; the backdrop fades | `--dur-slow, --ease-step` |
| Collapse: panels open and close with a cut; no height moves | `0ms, --ease-step` |
| Running: the status arc turns | `--dur-spin, --ease-spin` |
| Hover or focus color | `--dur-fast` |
| A hue or status change | `no transition, a cut` |

## Scale
Durations: 0, 60, 120, 160, 180ms, all on --ease-step. Spin: 800ms a turn, linear.

## Reject list
- No decorative loops.
- No transition: all.
- No eased hue swaps.
- No overlay that grows.
- No height tweens.

## Related
- [Elevation](/systems/quartz/foundations/elevation.md): Everything is flat, and only overlays get a shadow.
- [Color](/systems/quartz/foundations/color.md): Five hues name the kind of thing, and amber and red mean trouble.
