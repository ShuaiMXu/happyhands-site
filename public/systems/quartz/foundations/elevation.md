---
name: Elevation
system: quartz
kind: foundation
source: registry/quartz/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/quartz/foundations/elevation
---

# Elevation

Paper cards with one grey frame line on a fog canvas; controls sit a pixel above the page, overlays lift with one short shadow.

## Rules
1. elevation-overlay-shell MUST A dialog or sheet is a grey shell with the overlay shadow holding one white card 4px in, with the title, description, close and body in it; the actions sit on the grey. Because the shadow lifts the overlay, and the grey shell with its one white card tells the person where the content is and where the actions are.
   - Correct: `<DialogContent><DialogHeader/><DialogBody><Field/></DialogBody><DialogFooter/></DialogContent>`
   - Wrong: `<DialogContent><DialogHeader/><Field/><DialogFooter/></DialogContent>`
2. elevation-overlays-only MUST Shadow only overlays: menus, popovers, dialogs, sheets, the command palette, tooltips and toasts. Because a shadow says this floats above the page, and a shadowed card makes the person look for what it covers.
   - Correct: `<DropdownMenuContent/>  // shadow-overlay`
   - Wrong: `<Card className="shadow-md"/>`
3. elevation-one-shadow MUST Use shadow-overlay for every overlay; never write a shadow value. Its 1px frame line is part of shadow-overlay, so an overlay never adds frame. Because a written value keeps its light-theme strength in the dark theme, and frame inside a scrolling overlay scrolls away with the content.
   - Correct: `<div className="shadow-overlay">`
   - Wrong: `<div className="shadow-[0_8px_24px_#0003]">`
4. elevation-no-glass NEVER Blur or fade an overlay; use solid paper. Because the page shows through a translucent surface and pulls the menu text under its contrast floor.
   - Correct: `<div className="bg-page shadow-overlay">`
   - Wrong: `<PopoverContent className="bg-raised/70 backdrop-blur-md">`
5. elevation-well-not-container NEVER Use the grey field as a container; it is a well for code, output and read-only values inside a frame. Because a grey slab around a heading or a button is the box-in-a-box the frame replaces, and on paper it has no edge.
   - Correct: `<div className="frame"><pre className="well px-4 py-3">…</pre></div>`
   - Wrong: `<div className="bg-surface p-4"><h3>Runs</h3><Button/></div>`
6. elevation-dialog-scrim SHOULD Dim the page behind a dialog with --surface-overlay. Because the scrim tells the person the page is inert until the dialog closes.
7. elevation-no-xs-sm NEVER Use shadow-xs or shadow-sm; both are empty in Quartz. Because they draw nothing, so a model that reaches for them to lift a card ships a flat card and thinks it is raised.
   - Correct: `<Card/>`
   - Wrong: `<Card className="shadow-sm"/>`

## Tokens
| Token | Role | Use for | Not for | Light | Dark (blank: same as light) |
|-|-|-|-|-|-|
| `--ink` | solid ink | primary text, primary button |  | `oklch(var(--ink-c))` |  |
| `--paper` | solid paper | page background |  | `oklch(var(--paper-c))` |  |
| `--surface-canvas` | the cool fog an app sits on, behind its cards and frames | app background, docs preview |  | `oklch(var(--canvas-c))` |  |
| `--surface-page` | paper: the ground of every card, frame and panel | card, table, dialog |  | `var(--paper)` |  |
| `--surface-card` | the well: the grey field inside a frame for code, logs, shell output and read-only values; never a container | code, output and read-only values inside a frame | containers | `oklch(var(--grey-c))` |  |
| `--surface-frame` | a panel's outer frame: lighter than the well, so a page of panels stays bright | panel, overlay shell |  | `color-mix(in oklch, var(--surface-card) 55%, var(--paper))` |  |
| `--surface-raised` | a container inside a grey card | paper; a container inside a grey card | Quartz overlays, which use paper | `var(--paper)` |  |
| `--surface-hover` | row and item hover | row, menu item, ghost button |  | `oklch(var(--ink-c) / 0.05)` |  |
| `--surface-selected` | selected row with no kind, one step past hover | table, data table, tree |  | `oklch(var(--ink-c) / 0.09)` |  |
| `--surface-pressed` | active press | row, ghost button |  | `oklch(var(--ink-c) / 0.08)` | `oklch(var(--ink-c) / 0.28)` |
| `--surface-inverse` | a pressed chip or highlighted item on the page's own channels; whole panels use data-surface="inverse" | chip, segmented control |  | `var(--ink)` |  |
| `--surface-tile` | a media square behind an image or file icon, ink at 8% | attachment media |  | `oklch(var(--ink-c) / 0.08)` |  |
| `--surface-overlay` | dialog backdrop | dialog and sheet backdrop | popovers | `oklch(var(--ink-c) / 0.24)` |  |
| `--surface-thumb` | the selected segment: paper on the grey track in light, paper mixed with ink in dark so it reads lighter than the track | segmented control |  | `color-mix(in oklch, var(--paper), oklch(var(--ink-c)) var(--thumb-lift))` |  |
| `--focus-halo` | a field with the cursor: a soft ink halo around its ink edge, eased in | input, select, combobox, date picker, OTP, code editor, composer |  | `0 0 0 3px oklch(var(--ink-c) / 0.08)` |  |
| `--elev-control` | the lift under a paper control, so a button or field sits on the page instead of being drawn on it | a one-pixel drop under a paper control, so a secondary button, field or select sits on the page | cards, rows | `0 1px 2px -1px oklch(var(--text-on-field-c) / calc(var(--shadow-alpha) * 0.6))` |  |
| `--elev-none` | no lift, for a control that sits flat: disabled and read-only fields | field, select, checkbox, radio, switch, otp |  | `0 0 0 0 transparent` |  |
| `--elev-thumb` | the selected segment lifted off its grey track; in dark a 1px ring joins the shadow | a small shadow, plus a faint ring in the dark theme, that lifts the selected segment off its grey track | cards and overlays | `0 0 0 1px oklch(var(--ink-c) / var(--thumb-ring-alpha)), 0 1px 2px oklch(var(--text-on-field-c) / calc(var(--shadow-alpha) * 0.5))` |  |
| `--elev-overlay` | the overlay's edge plus one short shadow | 1px frame line plus one short shadow: menu, popover, dialog, sheet, tooltip, toast | cards | `0 0 0 1px var(--line-frame), 0 12px 24px -12px oklch(var(--text-on-field-c) / var(--shadow-alpha))` |  |
| `--shadow-alpha` | overlay shadow strength; the dark theme raises it | overlay shadow, raised in the dark theme | components | `0.20` | `0.6` |

## Ink and paper tokens
Read only through their classes; never set or read them in a component.
`--ink-c`, `--paper-c`, `--grey-c`, `--canvas-c`, `--text-on-field-c`, `--shadow-alpha`

## Decision table
| You need | Use |
|-|-|
| Card, panel, table | `the frame line, no shadow` |
| Code or output inside a frame | `well (--surface-card)` |
| Menu, popover, tooltip, toast | `--elev-overlay` |
| Dialog or sheet | `--elev-overlay and --surface-overlay behind` |

## Scale
Three levels: flow (a frame on paper), well (grey inside a frame, no line), overlay (frame line and one shadow). The segmented control's thumb is the one smaller lift, --elev-thumb.

## Reject list
- No colored shadows, gradients or backdrop blur.
- No grey slab as a container.

## Related
- [Borders and lines](/systems/quartz/foundations/borders-and-lines.md): Grey fields keep things apart, and hairlines go only where a field cannot.
- [Color](/systems/quartz/foundations/color.md): Five hues name the kind of thing, and amber and red mean trouble.
