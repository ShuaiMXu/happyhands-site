---
name: Sheet
system: sodium
kind: component
import: "import {Sheet, SheetTrigger, SheetClose, SheetPortal, SheetOverlay, SheetContent, SheetHeader, SheetBody, SheetFooter, SheetTitle, SheetDescription, SheetAction, SheetSection, SheetField, useSheet} from '@/components/sodium/ui/sheet'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/sheet.json"
registryDependencies: [button, direction, icon, overlay, portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/sheet
---

# Sheet

Opens the details of one thing at the side.

## Use when
- The details of one row in a list: a job, a partition, a worker, read beside or over the list.
- A long form that needs the height of the screen: a pipeline's schedule and retries.
- On a phone, the bottom sheet for a short choice that a dialog would crowd.

## Don't use when
- One question or a short form that blocks the page. Use [Dialog](/systems/sodium/components/dialog.md).
- A few lines next to a control. Use [Popover](/systems/sodium/components/popover.md).
- Panels of one view the person switches between. Use [Tabs](/systems/sodium/components/tabs.md).

## Minimal example
```tsx
<Sheet>
  <SheetTrigger render={<Button variant="ghost" size="sm"/>}>Details</SheetTrigger>
  <SheetContent>
    <SheetHeader meta="ingest-events"><SheetTitle>job_4812</SheetTitle></SheetHeader>
    <SheetBody><SheetSection title="Run"><SheetField label="Job" code>job_4812</SheetField></SheetSection></SheetBody>
  </SheetContent>
</Sheet>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. sheet-one-primary MUST End the footer with SheetClose and at most one SheetAction. Because the footer is one group of actions, and the slab marks the one thing to act on.
   - Correct: `<SheetFooter><SheetClose>Close</SheetClose><SheetAction>Run</SheetAction></SheetFooter>`
   - Wrong: `<SheetFooter><SheetAction>Save</SheetAction><SheetAction>Run</SheetAction></SheetFooter>`
2. sheet-docked-beside-list SHOULD Dock the sheet (modal={false}) when the person moves through rows and reads each one's details; use the modal sheet for one look. Because a docked sheet keeps the list usable, so the next row is one press away without closing anything.
3. sheet-side-end MUST Leave side at "end" for details, or use "start" and "end", never "left" and "right", unless the panel belongs to a screen edge. Because end flips to the left in right-to-left text, where the reading order puts details.
   - Correct: `<SheetContent side="end">`
   - Wrong: `<SheetContent side="right">`
4. sheet-fields-code MUST Set an ID, a path or a number people compare with SheetField code; leave sentences in the sans. Because values compared character by character read in mono as written, while a sentence in mono reads slowly.
   - Correct: `<SheetField label="Job" code>job_4812</SheetField>`
   - Wrong: `<SheetField label="Job">job_4812</SheetField>`
5. sheet-action-promise MUST Return the request's promise from SheetAction's onAction; never close the sheet in onClick. Because onAction holds the sheet pending and shows a failure above the footer, where onClick closes over a failed request.
   - Correct: `<SheetAction variant="destructive" onAction={cancel}>Cancel job</SheetAction>`
   - Wrong: `<SheetAction onClick={() => { cancel(); setOpen(false); }}>Cancel job</SheetAction>`
6. sheet-region-parts MUST Name the sheet in SheetHeader in mono as written, put SheetDescription first in SheetBody, and leave the insets to the parts. Because the header is the 38px region header every frame opens with, and header, body and footer share the 12px inset that the list beside the sheet starts on too.
   - Correct: `<SheetHeader><SheetTitle>job_4812</SheetTitle></SheetHeader><SheetBody><SheetDescription>…`
   - Wrong: `<SheetHeader className="px-6"><SheetTitle>Job 4812</SheetTitle><SheetDescription>…`
7. sheet-no-box-inside NEVER Box the sections of a sheet in frames or panels; let SheetSection rule them. Because the sheet is the region's one edge, and a box inside it is a box in a box.
   - Correct: `<SheetBody><SheetSection title="Run">…</SheetSection></SheetBody>`
   - Wrong: `<SheetBody><div className="frame">…</div></SheetBody>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Sheet modal` | `boolean` | `true` | false docks the panel in the layout beside a list. |
| `Sheet open, defaultOpen, onOpenChange` | `Base UI` | `false` | onOpenChange is not called while an action is pending. |
| `SheetContent side` | `'end' \| 'start' \| 'top' \| 'bottom' \| 'left' \| 'right'` | `'end'` | The edge it comes from or docks on. |
| `SheetContent showCloseButton` | `boolean` | `not on bottom` | The ghost X, SheetHeader's last action. |
| `SheetHeader meta` | `ReactNode` |  | Meta at the header's end, before the X. |
| `SheetContent defaultWidth, minWidth, maxWidth` | `number` | `360, 280, 640` | Docked only: the width and how far the rule may drag it. |
| `SheetContent onWidthChange` | `(width) => void` |  | Docked only: store it to keep the width between visits. |
| `SheetFooter defaultAction, meta` | `as Dialog` | `auto` | What Enter presses; meta as written at the row's start. |
| `SheetAction onAction` | `() => void \| Promise` |  | A promise holds the sheet pending until it settles. |
| `SheetSection title` | `ReactNode` |  | A micro label over a group of fields. |
| `SheetField label, code` | `ReactNode, boolean` |  | A row with the faint rule between; code sets the value in mono as written. |
Other props pass through to the root element.

## Variants and states
- side: end, start, bottom, top
- modal: true, false
- states: open, pending, failed, docked
- when states meet, the first wins: pending > failed > open

## Accessibility
- [ ] A modal sheet is role="dialog", named by SheetTitle; the page behind is inert and focus returns to the trigger.
- [ ] A docked sheet is an aside named by its title; Escape inside it closes it and returns focus to its trigger.
- [ ] The docked resize rule is a focusable separator with its width as aria-valuenow; arrows step it by 32px, Shift by 8.
- [ ] Field labels are text-2 at 7.8:1 and 10.2:1; values text-1.

## Keyboard
- `Escape`: Closes the sheet and returns focus to the trigger; nothing while an action runs.
- `Tab`: Moves through the sheet's controls; a modal sheet wraps from last to first.
- `Left, Right`: On the docked resize rule: narrows or widens it by 32px, 8 with Shift.
- `Home, End, Enter`: On the docked resize rule: narrowest, widest, back to the starting width.

## Edge cases
- Phone, 390 wide -> A side sheet leaves 40px of page beside it; a docked sheet takes the full width.
- Swipe -> On touch, a swipe toward the sheet's edge dismisses it, and the scrim fades with the finger.
- Right to left -> end is the left edge; the edge line and the resize rule follow.
- Long values -> A code value breaks anywhere; a sentence wraps; the label column truncates.
- Dark theme -> The panel sits a step above the near-black page with its rule edge on the inner side.
- Reduced motion -> It fades without the 16px slide.

## Tokens
--panel, --page, --line-control, --line, --line-faint, --scrim, --overlay, --inset, --head, --space-4, --space-10, --row, --control-sm, --type-body-sm, --type-label-sm, --type-micro, --type-code, --type-code-sm, --text-1, --text-2, --text-3, --focus, --fail, --fail-tint, --fail-text, --z-overlay, --dur-overlay, --dur-state, --ease-out, --ease-in

## Related
- [Dialog](/systems/sodium/components/dialog.md): Asks for a decision on top of the page.
- [Popover](/systems/sodium/components/popover.md): Shows a few lines next to a control.
- [Frame](/systems/sodium/components/frame.md): Boxes a region once and divides it by rules.
