---
name: Sheet
system: lime
kind: component
import: "import {Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetBody, SheetFooter, SheetClose, useSheetSide} from '@/components/lime/ui/sheet'"
install: "npx shadcn@latest add https://happyhands.cc/r/lime/sheet.json"
registryDependencies: [button, icon, portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/sheet
---

# Sheet

Slides a panel in from the edge for details, filters or a quick choice.

## Use when
- Details about one item, such as a transaction, with the list still behind.
- Filters or sort options with several controls.
- A short choice on a phone, such as which account to pay from.

## Don't use when
- A short task with a few fields that stops the page. Use [Dialog](/systems/lime/components/dialog.md).
- A decision that must be answered. Use [Alert dialog](/systems/lime/components/alert-dialog.md).
- A small panel by a control. Use [Popover](/systems/lime/components/popover.md).
- A multi-step flow. Make it a page with its own address.

## Minimal example
```tsx
<Sheet>
  <SheetTrigger render={<Button variant="outline"/>}>Details</SheetTrigger>
  <SheetContent>
    <SheetHeader><SheetTitle>Corner Coffee</SheetTitle></SheetHeader>
    <SheetBody>...</SheetBody>
  </SheetContent>
</Sheet>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. sheet-side-auto SHOULD Leave side on auto: bottom below 640px, right from there. Fix it only when the layout needs one edge.
   - Correct: `<Sheet/>`
   - Wrong: `<Sheet side="right"/> // on a phone`
2. sheet-always-title MUST Include SheetTitle inside SheetHeader; the title names the sheet. Because a plain h2 is not tied to the dialog, so a screen reader announces an unnamed dialog.
   - Correct: `<SheetHeader><SheetTitle>Corner Coffee</SheetTitle></SheetHeader>`
   - Wrong: `<SheetContent><h2>Details</h2></SheetContent>`
3. sheet-body-scrolls MUST Put the content in SheetBody; it scrolls while the header and footer stay put. Because SheetContent is overflow-hidden, so rows outside SheetBody are cut off at 90% of the screen.
   - Correct: `<SheetContent><SheetHeader/><SheetBody>{rows}</SheetBody></SheetContent>`
   - Wrong: `<SheetContent><SheetHeader/>{rows}</SheetContent>`
4. sheet-done-closes SHOULD End a sheet of live settings with one Done button; no Save and Cancel pair.
   - Correct: `<SheetFooter><SheetClose render={<Button size="lg"/>}>Done</SheetClose></SheetFooter>`
   - Wrong: `<SheetFooter><Button>Save</Button><Button>Cancel</Button></SheetFooter>`
5. sheet-no-unsaved MUST Keep unsaved work out of a sheet. Because a swipe, a scrim tap or Escape closes it and drops the typing without asking.
   - Wrong: `<SheetBody><Textarea name="dispute"/></SheetBody> // a long dispute form`
6. sheet-physical-side MUST Pass side="left" in a right-to-left app that fixes the side. Because sides are physical, so "right" lands on the leading edge in a right-to-left app.
   - Correct: `<Sheet side="left"/> // dir="rtl"`
   - Wrong: `<Sheet side="right"/> // dir="rtl"`
7. sheet-not-a-page NEVER Build a multi-step flow in a sheet; make it a page. Because one swipe down closes the sheet and throws away every step before it.
   - Wrong: `<SheetBody>{step === 1 ? <PickPayee/> : <EnterAmount/>}</SheetBody>`
8. sheet-not-dialog NEVER Center a sheet or restyle a Dialog as one; a sheet is anchored to an edge. Because a restyled Dialog has no swipe to close, and a centered sheet swipes toward no edge.
   - Correct: `<Sheet><SheetContent>...</SheetContent></Sheet>`
   - Wrong: `<DialogContent className="bottom-0 w-full rounded-t-sheet">`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Sheet side` | `'auto' \| 'bottom' \| 'right' \| 'left'` | `'auto'` | The edge. Sets the swipe that dismisses it. |
| `Sheet` | `Base UI Drawer.Root props` |  | open, defaultOpen, onOpenChange, modal. |
| `SheetHeader showClose` | `boolean` | `true` | The round close button at the end of the header. |
| `SheetBody` | `Base UI Drawer.Content props` |  | The part that scrolls. |
| `SheetFooter` | `div props` |  | Full-width buttons in a bottom sheet, end-aligned on a side. |
| `SheetClose` | `Base UI props` |  | Use `render={<Button/>}` for a footer action. |
Other props pass through to each part's own element; SheetContent passes them to the panel.

## Variants and states
- side: auto, bottom, right, left
- states: closed, open, swiping

## Accessibility
- [ ] The sheet is a modal dialog: it traps focus, closes on Escape and returns focus to its trigger.
- [ ] SheetTitle names it and SheetDescription describes it; the round close button is named Close.
- [ ] The grab handle is decorative; the close button and Escape do the same as the swipe.
- [ ] The footer keeps clear of the home indicator with the safe-area inset.

## Edge cases
- Long content -> SheetBody scrolls; the bottom sheet caps at 90% of the screen height.
- Swipe -> The panel follows the finger and the scrim fades with it; a short swipe springs back.
- Bottom sheet on a wide screen -> The bottom sheet centers at 512px.
- Reduced motion -> The sheet appears in place at once.
- Dialog opened inside -> It stacks above with its own scrim.
- Inside a table or menu -> It portals into the Lime scope and keeps its tokens.

## Tokens
--raised, --radius-sheet, --sheet, --shadow-overlay, --scrim, --line-strong, --text-lg, --text-sm, --fg-2, --dur-slow, --ease-out

## Related
- [Dialog](/systems/lime/components/dialog.md): A focused task over a scrim, such as sending money.
- [Alert dialog](/systems/lime/components/alert-dialog.md): A blocking decision, such as deleting a goal, that cannot be dismissed from outside.
- [Popover](/systems/lime/components/popover.md): An anchored panel with controls, such as splitting a bill.
