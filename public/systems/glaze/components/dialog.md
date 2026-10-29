---
name: Dialog
system: glaze
kind: component
import: "import {Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogTitle, DialogDescription, DialogClose, DialogAction, DialogConfirmField, dialogVariants, useDialogFootSlot, useDialog} from '@/components/glaze/ui/dialog'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/dialog.json"
registryDependencies: [button, icon, overlay, portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/dialog
---

# Dialog

Asks for a decision on top of the page.

## Use when
- The person must finish or abandon a short task before the page makes sense again: publish a prompt, rotate a key.
- An action needs one yes or no before anything changes: stop a run, revert a release.
- The action cannot be undone and deletes something with a name: an agent, a workspace, a data source.

## Don't use when
- The task takes more than a screen of fields, or the page must stay in view beside it. Use [Sheet](/systems/glaze/components/sheet.md).
- A few lines next to a control, and the page stays usable. Use [Popover](/systems/glaze/components/popover.md).
- The message reports a result and needs no answer, or the action can be undone. Use [Toast](/systems/glaze/components/toast.md).

## Minimal example
```tsx
<Dialog>
  <DialogTrigger render={<Button variant="secondary"/>}>Publish prompt</DialogTrigger>
  <DialogContent>
    <DialogHeader><DialogTitle>Publish refund-prompt v14</DialogTitle></DialogHeader>
    <DialogFooter><DialogClose>Cancel</DialogClose><DialogAction onAction={publish}>Publish</DialogAction></DialogFooter>
  </DialogContent>
</Dialog>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. dialog-one-ink MUST End the footer with DialogClose (paper) and at most one DialogAction; make it variant="destructive" when the action cannot be undone. Because the footer is one group of actions, and a second ink button splits the eye; coral beside ink gives the group two leads.
   - Correct:
     ```tsx
     <DialogFooter>
       <DialogClose>Cancel</DialogClose>
       <DialogAction>Publish</DialogAction>
     </DialogFooter>
     ```
   - Wrong:
     ```tsx
     <DialogFooter>
       <DialogAction>Save draft</DialogAction>
       <DialogAction>Publish</DialogAction>
     </DialogFooter>
     ```
2. dialog-controlled-not-mounted MUST Pass open and onOpenChange; never render the dialog conditionally. Because a conditional dialog unmounts before its close fades and Base UI cannot return focus to the trigger.
   - Correct: `<Dialog open={editing} onOpenChange={setEditing}>…</Dialog>`
   - Wrong: `{editing && <Dialog open onOpenChange={setEditing}>…</Dialog>}`
3. dialog-action-promise MUST Return the request's promise from onAction; never close the dialog in onClick. Because closing in onClick drops a failed request without a word, where onAction holds the dialog pending and shows the error.
   - Correct: `<DialogAction onAction={() => publish()} pendingLabel="Publishing">Publish</DialogAction>`
   - Wrong: `<DialogAction onClick={() => { publish(); setOpen(false); }}>Publish</DialogAction>`
4. dialog-destructive-default-dismiss NEVER Set defaultAction="primary" beside a destructive action; leave it unset or "dismiss". Because Enter outside a field would then press Delete.
   - Correct: `<DialogFooter>…<DialogAction variant="destructive">Delete agent</DialogAction>`
   - Wrong: `<DialogFooter defaultAction="primary">…<DialogAction variant="destructive">Delete agent</DialogAction>`
5. dialog-typed-confirm-irreversible MUST Use role="alertdialog" with confirmText and a DialogConfirmField to delete for good a thing that holds others, such as an agent or a workspace; one record takes a plain alertdialog. Because a stray click or Enter deletes it for good, and typing the name makes the person read which one; typing for every record trains them to type through the real one.
   - Correct: `<Dialog role="alertdialog" confirmText="refund-agent">… <DialogConfirmField/> …`
   - Wrong: `<Dialog>… Delete refund-agent? <DialogAction variant="destructive">Delete</DialogAction>`
6. dialog-no-confirm-reversible NEVER Confirm an action that can be undone; do it and show a toast with Undo. Because a confirm on every undoable action trains people to click through, so they click through the real one too.
   - Correct: `toast('Run archived', {action: {label: 'Undo', onClick: restore}})`
   - Wrong: `<Dialog role="alertdialog">Archive run 4812?</Dialog>`
7. dialog-title-names-it MUST Title an alert as a question that names the thing ("Stop run 4812?") and work as a verb phrase ("Rotate support-key"); never "Are you sure?". Because a screen reader opening the dialog hears the title first, and "Are you sure?" names neither the action nor the object.
   - Correct: `<DialogTitle>Stop run 4812?</DialogTitle>`
   - Wrong: `<DialogTitle>Are you sure?</DialogTitle>`
8. dialog-title-required MUST Give every dialog a DialogTitle, with className="sr-only" when the design shows none. Because Base UI names the dialog from DialogTitle, so without one a screen reader announces only "dialog".
   - Correct: `<DialogContent><DialogTitle className="sr-only">Command palette</DialogTitle>…`
   - Wrong: `<DialogContent><Command>…</Command></DialogContent>`
9. dialog-no-shadow NEVER Add a shadow or a custom scrim to DialogContent; pass size or placement classes only. Because Glaze has no shadows, so the dialog lifts with its ring on the scrim, and a hand-made scrim stands apart from Sheet's.
   - Correct: `<DialogContent size="lg">`
   - Wrong: `<DialogContent className="shadow-2xl bg-paper">`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Dialog role` | `'dialog' \| 'alertdialog'` | `'dialog'` | alertdialog: the scrim does nothing, no X. |
| `Dialog confirmText` | `string` |  | The exact name to type; the action stays disabled until it matches. |
| `Dialog open, defaultOpen, onOpenChange` | `Base UI` | `false` | onOpenChange is not called while an action is pending. |
| `DialogContent size` | `'sm' \| 'default' \| 'lg'` | `'default'` | 400, 480 or 640px wide. |
| `DialogContent showCloseButton` | `boolean` | `role === dialog` | The ghost X in the header corner. |
| `DialogContent initialFocus, finalFocus` | `Base UI` | `from the footer, the trigger` | Pass finalFocus when the trigger is gone, such as a deleted row. |
| `DialogFooter defaultAction` | `'primary' \| 'dismiss' \| 'none'` | `auto` | What Enter presses. Auto is dismiss beside a destructive action. |
| `DialogFooter meta` | `ReactNode` |  | Caption text at the start of the footer row; it truncates. |
| `DialogAction onAction` | `() => void \| Promise` |  | A promise holds the dialog pending until it settles. |
| `DialogAction close` | `boolean` | `true with onAction` | Off for onClick or type="submit". |
| `DialogAction variant, size` | `ButtonProps` | `'primary', 'sm'` | destructive for coral. |
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
- [ ] A failed action shows a role="alert" message above the footer, in coral's word colour with an icon.
- [ ] The typed-confirm field is described by its hint and announces only the match, not every keystroke.

## Keyboard
- `Escape`: Closes this dialog only and returns focus to the trigger; nothing while an action runs.
- `Enter`: Presses the footer's default action when focus is not on a control; never confirms a typed name.
- `Tab`: Moves through the dialog's controls and wraps from the last to the first.

## Edge cases
- The deleted row is gone -> Pass finalFocus the next row's actions button, since the trigger left with the row.
- More rows than the screen holds -> The dialog stops 32px from the top and bottom and the body scrolls; past three screens use a Sheet.
- A 10-second action -> The action's arc turns; Cancel, the X, Escape and the scrim do nothing until it settles.
- Phone, 390 wide -> The dialog leaves 16px of page each side; the footer stays one row and its meta truncates first.
- A menu or a second dialog inside -> Escape closes the innermost; a parent dialog dims under its child.
- Reduced motion -> Open and close cut instead of fading; a running arc stays drawn.

## Tokens
--shell, --paper, --line, --line-faint, --scrim, --radius-shell, --radius-panel, --shell-inset, --overlay-sm, --overlay, --overlay-lg, --space-4, --space-5, --space-8, --type-heading, --type-body-sm, --type-caption, --text-1, --text-2, --fail-tint, --fail-text, --ok-text, --field, --z-overlay, --dur-overlay, --dur-state, --ease-out

## Related
- [Sheet](/systems/glaze/components/sheet.md): Opens the details of one thing at the side.
- [Popover](/systems/glaze/components/popover.md): Shows a few lines next to a control.
- [Toast](/systems/glaze/components/toast.md): Confirms an action or reports an event.
- [Command](/systems/glaze/components/command.md): Finds and runs a command by typing.
