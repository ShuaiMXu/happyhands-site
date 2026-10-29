---
name: Motion
system: lime
kind: foundation
source: registry/lime/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/lime/foundations/motion
---

# Motion

How things move, quickly and only when something changes.

## Rules
1. motion-answers MUST Animate only to answer a press or report a change; nothing decorates or loops except the spinner. Because motion that answers nothing delays the person and teaches them to ignore the motion that does.
2. motion-one-curve MUST Use --ease-out to open, move and fade; use --ease-in only for an element leaving. Because ease-out lands the element at once and then settles, so the screen answers within the first frames.
   - Correct: `transition: color var(--dur-instant) var(--ease-out)`
   - Wrong: `transition: all 300ms ease`
3. motion-duration-tokens MUST Take a duration from --dur-instant, --dur-fast, --dur-base or --dur-slow; leaving is faster than arriving. Because reduced motion zeros the tokens, and a typed duration keeps moving for people who asked it to stop.
   - Correct: `duration-(--dur-base)`
   - Wrong: `duration-[250ms]`
4. motion-properties NEVER Animate width or height except on a collapsing panel; animate color, opacity, scale and translate. Because width and height re-run layout every frame, so the text beside it reflows and the motion stutters.
   - Wrong: `<div className="transition-[width] duration-(--dur-base)" style={{width: open ? 320 : 0}}>`
5. motion-reduced MUST Let prefers-reduced-motion zero every duration but the spinner, and skip the 0.98 press scale. Because sliding and scaling make some people dizzy, and the spinner is the one sign work is running.
   - Correct: `motion-reduce:active:scale-100`
6. motion-no-label-swap NEVER Change a button label to show work; set pending so the spinner turns. Because the new label changes the width and the accessible name while the press is running.
   - Correct: `<Button pending={sending}>Send</Button>`
   - Wrong: `<Button>{sending ? 'Sending...' : 'Send'}</Button>`

## Tokens
| Token | Role | Use for | Not for | Light |
|-|-|-|-|-|
| `--dur-instant` | hover and press colour | hover and press color | overlays | `80ms` |
| `--dur-fast` | a small state change | switch, checkbox, chip, tooltip, closing | dialogs opening | `140ms` |
| `--dur-base` | a popup or tab opening | popover, menu, tab underline, panel height | hover | `200ms` |
| `--dur-slow` | a dialog or sheet moving | dialog or sheet opening | small controls | `280ms` |
| `--dur-spin` | one turn of the spinner, the only looping motion | one turn of the spinner | other loops | `900ms` |
| `--ease-out` | the house curve | every transition | leaving | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-in` | an element leaving | an element leaving | arriving | `cubic-bezier(0.4, 0, 1, 1)` |
| `--scale-enter` | a popup's starting scale | starting scale of a popup | press feedback | `0.97` |
| `--scale-press` | a control's scale while pressed | button, balance, keypad key |  | `0.98` |

## Decision table
| You need | Use |
|-|-|
| Press: hover or press color, and the press scale | `--dur-instant, --ease-out, --scale-press` |
| A small state change: switch, chip, checkbox | `--dur-fast, --ease-out` |
| Enter: a menu, popover or tooltip opens | `--dur-base, --ease-out, opacity and --scale-enter` |
| Exit: it closes | `--dur-fast, --ease-in` |
| Overlay: a dialog or sheet opens | `--dur-slow, --ease-out` |
| Collapse: a panel opens or shuts | `--dur-base, --ease-out, height` |

## Scale
Durations 80, 140, 200, 280ms, spinner 900ms. Popups start at 0.97 scale.

## Reject list
- No looping or decorative animation, no spring bounce, no transition: all.

## Related
- [Elevation](/systems/lime/foundations/elevation.md): How things stack, using grey steps and a soft shadow for what floats.
- [Color](/systems/lime/foundations/color.md): The colors Lime uses, and where each one goes.
