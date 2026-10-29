---
name: Spacing
system: lime
kind: foundation
source: registry/lime/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/lime/foundations/spacing
---

# Spacing

How much room goes between things, and how tall controls are.

## Rules
1. spacing-scale-only MUST Space with the 4px scale (p-1 is 4px, p-4 is 16px); never an arbitrary pixel value. Because an off-scale gap sits beside 12px and 16px ones and the edges stop lining up.
   - Correct: `<div className="p-3">`
   - Wrong: `<div className="p-[13px]">`
2. spacing-group-first MUST Keep related things 8px apart and separate groups by 24px or more before adding a line. Because space shows the grouping on its own, and every extra line is one more thing to read past.
3. spacing-control-height MUST Give controls that sit side by side the same size prop so their edges line up. Because a 32px input beside a 40px button leaves a step at the top and bottom edges.
   - Correct: `<Input size="sm"/> <Button size="sm">Search</Button>`
4. spacing-touch-target MUST Keep a tap target at least 32px tall, and a primary action on a phone at 48px (size="lg"). Because a smaller target gets missed by a thumb, and a missed Cancel can land on Pay.
5. spacing-no-odd NEVER Patch a layout with odd values such as 13px or 22px; change the layout instead. Because the patch fits one width and one string, and breaks at 390px or in a longer language.
   - Correct: `<div className="mt-3 pl-6">`
   - Wrong: `<div className="mt-[13px] pl-[22px]">`
6. spacing-overlay-width MUST Size a dialog with --overlay, --overlay-sm or --overlay-lg, never to its content. Because a content-sized dialog jumps in width when an error or a long name appears.

## Tokens
| Token | Role | Use for | Not for | Light |
|-|-|-|-|-|
| `--control-sm` | a compact control | compact row | touch actions | `32px` |
| `--control-md` | the default control | default control | phone main action | `40px` |
| `--control-lg` | a primary mobile action | primary phone action, chat input | dense rows | `48px` |
| `--overlay-sm` | a small dialog | alert dialog | forms | `384px` |
| `--overlay` | the default dialog | default dialog | popovers | `480px` |
| `--overlay-lg` | a wide dialog | wide dialog | alerts | `640px` |
| `--popover` | a popover's width | popover width | dialogs | `320px` |
| `--sheet` | a side sheet's width, so the page stays in view beside it | sheet |  | `400px` |
| `--popup-max` | the tallest a list popup grows before it scrolls | list popup height before it scrolls | widths | `320px` |
| `--focus-offset` | the gap between a control and its ring | every focus-visible state |  | `2px` |
| `--line-focus` | the ring weight | every focus-visible state |  | `2px` |
| `--scrollbar-thumb` | the scrollbar thumb | scroll-area, native scrollbars |  | `var(--line-strong)` |

## Decision table
| You need | Use |
|-|-|
| Icon and label gap | `gap-2 (8px)` |
| Card padding | `p-5 (20px), gap-4` |
| Dialog or sheet padding | `p-6 (24px), gap-4` |
| Between fields | `gap-4 (16px)` |
| Between page sections | `32 to 48px` |

## Scale
Unit 4px: 1, 2, 3, 4, 5, 6, 8, 10, 12, 16 steps. Control heights 32, 40, 48px.

## Reject list
- No arbitrary pixel padding, no odd values.

## Related
- [Radius](/systems/lime/foundations/radius.md): How round each corner is, from pill buttons to softer panels.
- [Typography](/systems/lime/foundations/typography.md): The typeface, sizes and weights Lime uses for every word and number.
