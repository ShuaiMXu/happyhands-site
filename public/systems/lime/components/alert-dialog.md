---
name: Alert dialog
system: lime
kind: component
import: "import {AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogClose} from '@/components/lime/ui/alert-dialog'"
install: "npx shadcn@latest add https://happyhands.cc/r/lime/alert-dialog.json"
registryDependencies: [dialog, portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/alert-dialog
---

# Alert dialog

Stops and asks before something big, like deleting your account.

## Use when
- A destructive or irreversible action: delete a goal, discard a draft, remove a member.
- A payment above a limit, where the amount is confirmed once.
- A choice that loses unsaved work when the person leaves.

## Don't use when
- The dialog has fields or a task. Use [Dialog](/systems/lime/components/dialog.md).
- The action reports a result. Show a message in the page.
- The person can undo afterwards. Do the action and offer undo.

## Minimal example
```tsx
<AlertDialog>
  <AlertDialogTrigger render={<Button variant="outline"/>}>Delete goal</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete Vacation fund?</AlertDialogTitle>
      <AlertDialogDescription>The goal and its 3 deposits are removed for good. The $240 saved goes back to Checking.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
  ...
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. alert-dialog-safe-first MUST Put the safe choice first in the footer markup so focus starts there. Because focus starts on the first control, so Enter on a destructive first button deletes at once.
   - Correct: `<AlertDialogFooter><Keep/><Delete/></AlertDialogFooter>`
   - Wrong: `<AlertDialogFooter><Delete/><Keep/></AlertDialogFooter>`
2. alert-dialog-repeat-verb MUST Name the confirm button with the verb and noun of the trigger; never OK. Because a screen reader tabbing to "OK, button" hears nothing about deleting the goal.
3. alert-dialog-name-the-safe-choice SHOULD Name the other button for what it keeps, such as Keep goal, not Cancel.
4. alert-dialog-say-what-is-lost MUST Say what is lost and where the money goes in the description. Because the description is read out when the dialog opens and is the last word before money moves.
   - Correct:
     ```tsx
     <AlertDialogDescription>The goal and its 3 deposits are removed. The $240 goes back to Checking.</AlertDialogDescription>
     ```
   - Wrong: `<AlertDialogDescription>Are you sure? This cannot be undone.</AlertDialogDescription>`
5. alert-dialog-no-are-you-sure NEVER Title the dialog Are you sure; ask the specific question, such as Delete Vacation fund? Because the title names the dialog for a screen reader, and "Are you sure?" names no action.
   - Correct: `<AlertDialogTitle>Delete Vacation fund?</AlertDialogTitle>`
   - Wrong: `<AlertDialogTitle>Are you sure?</AlertDialogTitle>`
6. alert-dialog-two-buttons MUST Give the footer exactly two buttons; three or fields make it a Dialog. Because the panel is the small size, built for one yes or no; more choices or a field need Dialog.
7. alert-dialog-title-description MUST Render AlertDialogTitle and AlertDialogDescription. Because they name and describe the panel, and without them a screen reader announces an unnamed alert dialog.
8. alert-dialog-async-controlled MUST Control open for async confirms; AlertDialogClose closes at once. Keep the dialog open on failure and show the reason in the description. Because AlertDialogClose closes before the request settles, so a failed payment vanishes with the dialog.
   - Correct: `<AlertDialog open={open} onOpenChange={setOpen}>...</AlertDialog>`
9. alert-dialog-render-button MUST Render the trigger and close parts as a Button with `render={<Button/>}`. Because the parts render a bare button with none of the Button sizes, focus ring or glow.
   - Correct: `<AlertDialogClose render={<Button variant="secondary"/>}>Keep goal</AlertDialogClose>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `AlertDialog` | `Base UI Root props` |  | open, defaultOpen, onOpenChange. |
| `AlertDialogTrigger` | `Base UI props` |  | Use `render={<Button/>}`. |
| `AlertDialogContent` | `Base UI Popup props` |  | Always the 384px size. Takes initialFocus, finalFocus. |
| `AlertDialogClose` | `Base UI props` |  | Closes the dialog. Use `render={<Button/>}`. |
Other props pass through to each part's own element; AlertDialogContent passes them to the dialog panel.

## Variants and states
- confirm: destructive, primary
- states: closed, open, closing

## Accessibility
- [ ] The panel has role alertdialog, named by the title and described by the description.
- [ ] Focus moves to the first button and returns to the trigger on close.
- [ ] Escape closes without confirming; a press on the scrim does nothing.
- [ ] Tab wraps between the two buttons.

## Edge cases
- Long goal name -> The title wraps; a long unbroken name overflows. Truncate it yourself.
- 320px phone -> The panel is 288px and the footer stacks with the confirm button on top.
- Right to left -> Padding and position use logical properties; the footer row reverses.
- Reduced motion -> The panel appears and leaves at once.
- Opened from a menu -> Open it after the menu item closes the menu.
- Forced colors -> The panel edge relies on fill and shadow; add a transparent border.

## Tokens
--raised, --radius-sheet, --shadow-overlay, --overlay-sm, --scrim, --text-xl, --text-sm, --fg-2, --danger, --danger-hover, --on-danger, --dur-slow, --dur-fast, --ease-out, --ease-in, --scale-enter

## Related
- [Dialog](/systems/lime/components/dialog.md): A focused task over a scrim, such as sending money.
- [Sheet](/systems/lime/components/sheet.md): A panel from an edge, such as transaction details, that keeps the page visible.
- [Button](/systems/lime/components/button.md): Starts an action, such as Send money. The lime primary is the one glowing action on a screen.
