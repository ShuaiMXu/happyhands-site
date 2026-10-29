---
name: Iconography
system: lime
kind: foundation
source: registry/lime/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/lime/foundations/iconography
---

# Iconography

One set of simple line icons, drawn in the same color as the text.

## Rules
1. iconography-one-source MUST Import Icon and the glyph from '@/components/lime/icon'; never from @carbon/icons-react, and use only the names that file exports. Because the set is swapped in one file, and a name it does not export is a build error.
   - Correct: `import {Add, Icon} from '@/components/lime/icon'`
   - Wrong: `import {Add} from '@carbon/icons-react'`
2. iconography-current-color MUST Draw an icon in currentColor; quiet icons use text-fg-3. Because the icon then follows its button through hover, disabled, the dark theme and forced colors.
   - Correct: `<Icon icon={Search} className="text-fg-3"/>`
3. iconography-label MUST Keep decorative icons aria-hidden, and give a meaningful icon a label or its button an aria-label. Because Icon is aria-hidden without a label, so an icon-only button is announced as "button" and nothing more.
   - Correct: `<Button size="icon" aria-label="Close"><Icon icon={Close}/></Button>`
   - Wrong: `<Button size="icon"><Icon icon={Close}/></Button>`
4. iconography-not-alone NEVER Let an icon carry a status alone; pair a warning glyph with words. Because the glyph is hidden from screen readers, and a small red triangle does not say what went wrong.
   - Correct: `<Icon icon={Warning} className="text-danger"/> Card declined`
   - Wrong: `<Icon icon={Warning} className="text-danger"/>`
5. iconography-no-lime-on-white NEVER Color an icon with --accent on a light surface; use --accent-line or keep it near-black. Because the lime is about 1.2:1 on white and the glyph disappears, the olive step is 3.95:1.
   - Correct: `<Icon icon={Checkmark} className="text-accent-line"/>`
   - Wrong: `<Icon icon={Checkmark} className="text-accent"/>`
6. iconography-rtl MUST Flip a directional icon in right to left with rtl:rotate-180 or rtl:-scale-x-100. Because an arrow that points against the reading order sends the person back instead of forward.
   - Correct: `<Icon icon={ArrowRight} className="rtl:-scale-x-100"/>`

## Tokens
| Token | Role | Use for | Not for | Light | Dark (blank: same as light) |
|-|-|-|-|-|-|
| `--fg` | primary text, 17.6:1 on --surface | icon beside body text | quiet icons | `#0f0f0d` | `#f4f3ee` |
| `--fg-3` | supporting text and icons, 5.4:1 on --page and 5.0:1 on --surface | secondary and inline icons | the only cue | `#6b6a63` | `#9a9890` |
| `--accent-line` | olive line step, 3.95:1 on --page and 3.62:1 on --surface | icon on white that needs the accent | fills | `#7c8700` | `#cad649` |
| `--on-accent` | text and icons on the lime in both themes, 15.6:1 on --accent | icon on the primary fill | white surfaces | `#0f0f0d` |  |

## Decision table
| You need | Use |
|-|-|
| Icon in a button label | `size 16` |
| Icon button, send arrow | `size 20` |
| Empty state mark | `size 24` |
| Feature mark | `size 32` |

## Scale
Sizes 12 (inside a small pill), 16, 20, 24, 32.
Names exported by @/components/lime/icon: Add, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Attachment, Cafe, Checkmark, CheckmarkFilled, ChevronDown, ChevronLeft, ChevronRight, ChevronSort, ChevronUp, CircleDash, Close, Copy, Delete, Edit, ErrorFilled, Folder, Image, Information, Location, Locked, Menu, Notification, OverflowMenuHorizontal, Pause, PiggyBank, Play, Plus, Receipt, Renew, Search, Send, ShoppingBag, Star, Subtract, Time, Undo, Upload, Wallet, Warning, WarningFilled. To use another Carbon glyph, add it to that file first.

## Reject list
- No second icon set, no emoji as icons.

## Related
- [Color](/systems/lime/foundations/color.md): The colors Lime uses, and where each one goes.
- [Spacing](/systems/lime/foundations/spacing.md): How much room goes between things, and how tall controls are.
