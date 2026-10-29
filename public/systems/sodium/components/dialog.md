---
name: Dialog
system: sodium
kind: component
import: "import {Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogTitle, DialogDescription, DialogClose, DialogAction, DialogConfirmField, dialogVariants, useDialog} from '@/components/sodium/ui/dialog'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/dialog.json"
registryDependencies: [button, icon, overlay, portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/dialog
---

# Dialog

Asks for a decision on top of the page.

## Use when
- The person must finish or abandon a short task before the page makes sense again: rename a pipeline, add a worker.
- An action needs one yes or no before anything changes: cancel a running job, pause a queue.
- The action cannot be undone and destroys something with a name: drop a table, delete a pipeline.

## Don't use when
- The task needs more than a screen of fields, or the list must stay in view beside it. Use [Sheet](/systems/sodium/components/sheet.md).
- A few lines next to a control, and the page stays usable. Use [Popover](/systems/sodium/components/popover.md).
- The action can be undone; do it and say so. Use [Button](/systems/sodium/components/button.md).

## Minimal example
```tsx
<Dialog>
  <DialogTrigger render={<Button variant="secondary"/>}>Deploy</DialogTrigger>
  <DialogContent>
    <DialogHeader><DialogTitle>deploy ingest-events v14</DialogTitle></DialogHeader>
    <DialogBody><DialogDescription>Runs in flight finish on v13.</DialogDescription></DialogBody>
    <DialogFooter meta="3 changes"><DialogClose>Cancel</DialogClose><DialogAction onAction={deploy}>Deploy</DialogAction></DialogFooter>
  </DialogContent>
</Dialog>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. dialog-one-primary MUST End the footer with DialogClose and at most one DialogAction; make it variant="destructive" when the action loses data. Because the footer is one group of actions, and a second slab splits the eye; the slab and the destructive are one family, so both count.
   - Correct:
     ```tsx
     <DialogFooter>
       <DialogClose>Cancel</DialogClose>
       <DialogAction>Deploy</DialogAction>
     </DialogFooter>
     ```
   - Wrong:
     ```tsx
     <DialogFooter>
       <DialogAction>Save draft</DialogAction>
       <DialogAction>Deploy</DialogAction>
     </DialogFooter>
     ```
2. dialog-controlled-not-mounted MUST Pass open and onOpenChange; never render the dialog conditionally. Because a conditional dialog unmounts before its close fades and Base UI cannot return focus to the trigger.
   - Correct: `<Dialog open={renaming} onOpenChange={setRenaming}>…</Dialog>`
   - Wrong: `{renaming && <Dialog open onOpenChange={setRenaming}>…</Dialog>}`
3. dialog-action-promise MUST Return the request's promise from onAction; never close the dialog in onClick. Because closing in onClick drops a failed request without a word, where onAction holds the dialog pending and shows the error.
   - Correct: `<DialogAction onAction={() => deploy()} pendingLabel="Deploying">Deploy</DialogAction>`
   - Wrong: `<DialogAction onClick={() => { deploy(); setOpen(false); }}>Deploy</DialogAction>`
4. dialog-destructive-default-dismiss NEVER Set defaultAction="primary" beside a destructive action; leave it unset or "dismiss". Because Enter outside a field would then press Drop.
   - Correct: `<DialogFooter>…<DialogAction variant="destructive">Drop table</DialogAction>`
   - Wrong: `<DialogFooter defaultAction="primary">…<DialogAction variant="destructive">Drop table</DialogAction>`
5. dialog-typed-confirm MUST Use role="alertdialog" with confirmText and a DialogConfirmField to destroy a thing that holds others, such as a table or a pipeline; one row takes a plain alertdialog. Because a stray click or Enter destroys it for good, and typing the name makes the person read which one; typing for every row trains them to type through the real one.
   - Correct: `<Dialog role="alertdialog" confirmText="events_raw">… <DialogConfirmField/> …`
   - Wrong: `<Dialog>… Drop events_raw? <DialogAction variant="destructive">Drop</DialogAction>`
6. dialog-title-names-it MUST Title the dialog name first in the header voice, mono as written: the action and the thing's name ("deploy ingest-events v14", "cancel job_4812?"); never "Are you sure?". Because a screen reader opening the dialog hears the title first, and "Are you sure?" names neither the action nor the object.
   - Correct: `<DialogTitle>cancel job_4812?</DialogTitle>`
   - Wrong: `<DialogTitle>Are you sure?</DialogTitle>`
7. dialog-region-parts MUST Keep DialogHeader to the title, meta and X; open DialogBody with DialogDescription; leave the insets to the parts. Because the header is the 38px region header every frame opens with, and header, body and footer share the 12px inset, so a sentence or a padding class in the header breaks the one edge they start on.
   - Correct: `<DialogHeader><DialogTitle>…</DialogTitle></DialogHeader><DialogBody><DialogDescription>…`
   - Wrong: `<DialogHeader className="px-6"><DialogTitle>…</DialogTitle><DialogDescription>…`
8. dialog-title-required MUST Give every dialog a DialogTitle, with className="sr-only" when the design shows none. Because Base UI names the dialog from DialogTitle, so without one a screen reader announces only "dialog".
   - Correct: `<DialogContent><DialogTitle className="sr-only">Command palette</DialogTitle>…`
   - Wrong: `<DialogContent><Command>…</Command></DialogContent>`
9. dialog-no-shadow NEVER Add a shadow, a blur or a rounded corner to DialogContent; pass size or placement classes only. Because a dialog stands out by the scrim behind it and its rule edge, not by a shadow.
   - Correct: `<DialogContent size="lg">`
   - Wrong: `<DialogContent className="shadow-2xl rounded-lg">`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Dialog role` | `'dialog' \| 'alertdialog'` | `'dialog'` | alertdialog: the scrim does nothing, no X. |
| `Dialog confirmText` | `string` |  | The exact name to type; the action stays disabled until it matches. |
| `Dialog open, defaultOpen, onOpenChange` | `Base UI` | `false` | onOpenChange is not called while an action is pending. |
| `DialogContent size` | `'sm' \| 'default' \| 'lg'` | `'default'` | 400, 480 or 640px wide. |
| `DialogContent showCloseButton` | `boolean` | `role === dialog` | The ghost X, DialogHeader's last action. |
| `DialogHeader meta` | `ReactNode` |  | Meta at the header's end, before the X. |
| `DialogFooter defaultAction` | `'primary' \| 'dismiss' \| 'none'` | `auto` | What Enter presses. Auto is dismiss beside a destructive action. |
| `DialogFooter meta` | `ReactNode` |  | Meta as written at the start of the footer row; it truncates. |
| `DialogAction onAction` | `() => void \| Promise` |  | A promise holds the dialog pending until it settles. |
| `DialogAction close` | `boolean` | `true with onAction` | Off for onClick or type="submit". |
| `DialogConfirmField label` | `(name) => ReactNode` | `"Type <name> to confirm"` | Native input props pass through. |
Other props pass through to the root element.

## Variants and states
- role: dialog, alertdialog, alertdialog + confirmText
- size: sm, default, lg
- defaultAction: primary, dismiss, none
- states: open, pending, failed, typed differs, typed matched, nested parent
- when states meet, the first wins: pending > failed > typed differs > open

## Accessibility
- [ ] The popup is role="dialog" or "alertdialog", named by DialogTitle and described by DialogDescription.
- [ ] Focus lands from the footer default or a data-autofocus element; Tab cycles inside; the page behind is inert.
- [ ] The edge is --line, the rule colour; the scrim sets the dialog apart from the page, and its title names it.
- [ ] A failed action shows a role="alert" row above the footer, the failure word on its tint at 5.7:1, with an icon.
- [ ] The typed-confirm field is described by its hint and announces only the match, not every keystroke.

## Keyboard
- `Escape`: Closes this dialog only and returns focus to the trigger; nothing while an action runs.
- `Enter`: Presses the footer's default action when focus is not on a control; never confirms a typed name.
- `Tab`: Moves through the dialog's controls and wraps from the last to the first.

## Edge cases
- The dropped row is gone -> Pass finalFocus the next row's actions button, since the trigger left with the row.
- More rows than the screen holds -> The dialog stops 32px from the top and bottom; the body scrolls under the ruled header.
- A 10-second action -> The action shows the pending mark; Cancel, the X, Escape and the scrim do nothing until it settles.
- Phone, 390 wide -> The dialog leaves 16px of page each side; the footer wraps its buttons before they shrink.
- A menu or a second dialog inside -> Escape closes the innermost; a parent dialog dims under its child.
- Reduced motion -> Open and close cut instead of fading; the pending mark stands still.

## Tokens
--panel, --line, --line-faint, --scrim, --overlay-sm, --overlay, --overlay-lg, --inset, --head, --control-sm, --space-4, --space-8, --type-code, --type-code-sm, --type-body-sm, --type-caption, --type-label-sm, --text-1, --text-2, --well, --fail, --fail-tint, --fail-text, --ok-text, --z-overlay, --dur-overlay, --dur-state, --ease-out, --ease-in

## Related
- [Sheet](/systems/sodium/components/sheet.md): Opens the details of one thing at the side.
- [Popover](/systems/sodium/components/popover.md): Shows a few lines next to a control.
- [Command](/systems/sodium/components/command.md): Finds and runs a command by typing.
