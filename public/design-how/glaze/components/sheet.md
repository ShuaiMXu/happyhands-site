---
name: Sheet
system: glaze
kind: component
import: "import {Sheet, SheetTrigger, SheetClose, SheetPortal, SheetOverlay, SheetContent, SheetHeader, SheetBody, SheetFooter, SheetTitle, SheetDescription, SheetAction, SheetSection, SheetField, useSheet} from '@/components/glaze/ui/sheet'"
install: "npx shadcn@latest add https://design.how/r/glaze/sheet.json"
registryDependencies: [button, direction, icon, overlay, portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/sheet
---

# Sheet

Opens the details of one thing at the side.

## Use when
- The details of one item from a list the person keeps in mind: a run, a key, an integration.
- The details of the selected row beside its list, while the list stays usable (docked).
- A short choice on a phone, from the bottom edge.

## Don't use when
- A yes or no question, or a form of up to three fields. Use [Dialog](/systems/glaze/components/dialog.md).
- A few lines next to the control that opened them. Use [Popover](/systems/glaze/components/popover.md).
- The panel is the page's main subject. Give it a route.

## Minimal example
```tsx
<Sheet>
  <SheetTrigger render={<Button variant="secondary"/>}>Open run_8f2a91</SheetTrigger>
  <SheetContent>
    <SheetHeader><SheetTitle>run_8f2a91</SheetTitle></SheetHeader>
    <SheetBody>…</SheetBody>
    <SheetFooter><SheetClose>Close</SheetClose><SheetAction onAction={rerun}>Rerun</SheetAction></SheetFooter>
  </SheetContent>
</Sheet>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. sheet-parts MUST Build the inside from SheetHeader, SheetBody and SheetFooter; never plain padded divs. Because the header and body together are the paper panel, the body is the only part that scrolls, and the footer is the shell's row.
   - Correct: `<SheetContent><SheetHeader/><SheetBody>…</SheetBody><SheetFooter/></SheetContent>`
   - Wrong: `<SheetContent><div className="p-4">…60 fields…</div></SheetContent>`
2. sheet-one-ink MUST End the footer with SheetClose (paper) and at most one SheetAction. Because the footer is one group of actions, and two ink buttons in it split the eye.
   - Correct: `<SheetClose>Close</SheetClose><SheetAction>Rerun</SheetAction>`
   - Wrong: `<SheetAction>Rerun</SheetAction><SheetAction>Export</SheetAction>`
3. sheet-no-card-inside NEVER Put a shell card inside the body; group rows with SheetSection. Because the sheet is already the card, and a second shell inside its panel is a box in a box.
   - Correct: `<SheetBody><SheetSection title="Run">…</SheetSection></SheetBody>`
   - Wrong: `<SheetBody><div className="shell"><div className="panel">…</div></div></SheetBody>`
4. sheet-title-names-item MUST Title the sheet with the item's name or ID and put context in SheetDescription. Because the title is the sheet's accessible name, so "Details" tells a screen reader nothing about which run is open.
   - Correct:
     ```tsx
     <SheetTitle>run_8f2a91</SheetTitle>
     <SheetDescription>refund-agent, started 2 minutes ago</SheetDescription>
     ```
   - Wrong: `<SheetTitle>Details</SheetTitle>`
5. sheet-docked-for-selection SHOULD Use modal={false} for the details of a selected row; a modal sheet hides the list the person is working through.
   - Correct: `<Sheet modal={false} open={!!selected} onOpenChange={…}>…</Sheet>`
   - Wrong: `<Sheet open={!!selected}>…</Sheet>`
6. sheet-docked-opener MUST Open a docked panel with SheetTrigger and close it with SheetClose. Because the docked panel returns focus on Escape to the element SheetTrigger registered, so a plain button leaves focus lost.
   - Correct: `<SheetTrigger render={<Button variant="ghost" size="sm"/>}>Details</SheetTrigger>`
   - Wrong: `<Button onClick={() => setOpen(true)}>Details</Button>`
7. sheet-bottom-actions-default MUST Give actions in a side="bottom" sheet the default size: render={<Button variant="secondary"/>} on SheetClose and size="default" on SheetAction. Because a bottom sheet is the phone layout, and a 26px small button is too short a target for a thumb.
   - Correct: `<SheetContent side="bottom">…<SheetAction size="default">Copy link</SheetAction>`
   - Wrong: `<SheetContent side="bottom">…<SheetAction>Copy link</SheetAction>`
8. sheet-field-mono-ids SHOULD Pass mono to SheetField for an ID, a hash or a key.
   - Correct: `<SheetField label="Trace ID" mono>trc_5d1e0c9b7a2f</SheetField>`
   - Wrong: `<SheetField label="Trace ID">trc_5d1e0c9b7a2f</SheetField>`
9. sheet-no-shadow NEVER Add a shadow or a border to SheetContent; the ring and the scrim are its lift. Because Glaze has no shadows, and a border on top of the ring doubles the edge.
   - Correct: `<SheetContent>`
   - Wrong: `<SheetContent className="shadow-xl border-l">`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Sheet modal` | `boolean` | `true` | false docks it in the layout. |
| `Sheet open, defaultOpen, onOpenChange` | `boolean, (open) => void` | `false` | onOpenChange is not called while an action is pending. |
| `Sheet contained` | `boolean` | `false` | Open inside a frame without modal behaviour, for a docs specimen. |
| `SheetContent side` | `'start' \| 'end' \| 'top' \| 'right' \| 'bottom' \| 'left'` | `'end'` | start and end follow the reading direction. |
| `SheetContent showCloseButton` | `boolean` | `not on bottom` | The ghost X in the header corner. |
| `SheetContent defaultWidth, minWidth, maxWidth` | `number` | `360, 280, 640` | Docked: the resize range in px. |
| `SheetContent onWidthChange` | `(width) => void` |  | Docked: store it to keep the width. |
| `SheetFooter defaultAction, meta` | `'primary' \| 'dismiss' \| 'none', ReactNode` | `auto` | As in Dialog. |
| `SheetAction onAction, close` | `() => void \| Promise, boolean` |  | As in Dialog; size defaults to sm. |
| `SheetField mono` | `boolean` | `false` | Sets the value in mono and lets it break anywhere. |
Other props pass through to the root element.

## Variants and states
- side: end, start, bottom, top
- mode: modal, docked
- states: open, pending, failed, docked, resizing
- when states meet, the first wins: pending > failed > open

## Accessibility
- [ ] A modal sheet is a dialog named by SheetTitle; the page behind is inert and Tab cycles inside.
- [ ] A docked sheet is an aside labelled by its title; Escape inside it closes it and returns focus to its trigger.
- [ ] The resize handle is a focusable separator with its width as the value, moved by the arrow keys.
- [ ] The body takes a tab stop only while it has more to scroll.
- [ ] A failed action shows a role="alert" message above the footer.

## Keyboard
- `Escape`: Closes the sheet and returns focus to its trigger; nothing while an action runs.
- `Enter`: Presses the footer's default action when focus is not on a control.
- `Left and Right arrows`: On the docked handle: narrow or widen by 32px, 8px with Shift.
- `Home, End, Enter`: On the docked handle: the narrowest, the widest, the starting width.

## Edge cases
- Sixty fields -> Only the body scrolls; a hairline shows under the header once it has.
- Phone, 390 wide -> A side sheet leaves 40px of page beside it; a docked sheet takes the full width under its list.
- Right to left -> end is the left edge, the swipe to dismiss runs left and the resize handle moves to the panel's right.
- Swipe on touch -> The panel follows the finger toward its edge and the scrim fades with it.
- A slow action -> The arc turns; Close, the X, Escape, a swipe and the scrim wait for it.
- Reduced motion -> The panel fades without travelling.

## Tokens
--shell, --paper, --line, --line-faint, --line-control, --scrim, --radius-shell, --radius-panel, --shell-inset, --overlay, --overlay-lg, --space-2, --space-4, --space-5, --space-10, --row, --type-heading-sm, --type-body-sm, --type-code-sm, --fail-tint, --fail-text, --z-overlay, --dur-overlay, --dur-state, --ease-out

## Related
- [Dialog](/systems/glaze/components/dialog.md): Asks for a decision on top of the page.
- [Popover](/systems/glaze/components/popover.md): Shows a few lines next to a control.
