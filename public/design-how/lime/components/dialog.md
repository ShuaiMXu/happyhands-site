---
name: Dialog
system: lime
kind: component
import: "import {Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose, backdropClass, dialogVariants} from '@/components/lime/ui/dialog'"
install: "npx shadcn@latest add https://design.how/r/lime/dialog.json"
registryDependencies: [button, icon, portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/dialog
---

# Dialog

Opens a focused window for one quick task, like renaming a goal.

## Use when
- A short task that finishes or cancels before the person goes on: rename, share, pick a plan.
- A form of up to three fields that does not need the page behind it.
- A confirmation that is not destructive and can be dismissed by clicking away.

## Don't use when
- A decision that must not be dismissed by accident, such as deleting. Use [Alert dialog](/systems/lime/components/alert-dialog.md).
- Details, filters or a choice that should rise from the bottom on a phone. Use [Sheet](/systems/lime/components/sheet.md).
- A small panel anchored to a control. Use [Popover](/systems/lime/components/popover.md).

## Minimal example
```tsx
<Dialog>
  <DialogTrigger render={<Button variant="outline"/>}>Rename goal</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Rename goal</DialogTitle>
      <DialogDescription>The new name shows on your profile and in shared links.</DialogDescription>
    </DialogHeader>
  ...
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. dialog-always-title MUST Render DialogTitle in every dialog. Because without it a screen reader announces "dialog" with no name.
   - Correct: `<DialogContent><DialogTitle>Rename goal</DialogTitle>...</DialogContent>`
   - Wrong: `<DialogContent><p>Rename</p>...</DialogContent>`
2. dialog-verb-button MUST Name the confirming button for what it does, such as Save name; it is the one lime button. Because OK or Yes sends the person back to the body to learn what the press changes.
   - Correct: `<Button>Save name</Button>`
   - Wrong: `<Button>OK</Button>`
3. dialog-cancel-first MUST Put the quiet action before the primary in the footer markup; the footer reverses on a phone. Because DialogFooter is flex-col-reverse below sm, so this order puts the primary on top there and last on wide screens.
   - Correct: `<DialogFooter><Button variant="ghost">Cancel</Button><Button>Save name</Button></DialogFooter>`
   - Wrong: `<DialogFooter><Button>Save name</Button><Button variant="ghost">Cancel</Button></DialogFooter>`
4. dialog-not-for-delete NEVER Use Dialog for an action that cannot be undone; use AlertDialog, which ignores outside presses. Because a stray tap on the scrim closes a Dialog before the person has read what goes.
   - Correct: `<AlertDialog>... Delete goal ...</AlertDialog>`
   - Wrong: `<Dialog>... Delete goal ...</Dialog>`
5. dialog-title-is-the-task SHOULD Title the task in sentence case, such as Rename goal, not a question.
   - Correct: `<DialogTitle>Rename goal</DialogTitle>`
   - Wrong: `<DialogTitle>Would you like to rename this goal?</DialogTitle>`
6. dialog-no-nesting NEVER Open a Dialog from inside a Dialog; show the second step in the same dialog body. Because a second scrim stacks on the first and focus must climb back through two layers.
   - Correct: `<DialogContent>{step === 'confirm' ? <ConfirmTransfer/> : <EditTransfer/>}</DialogContent>`
   - Wrong: `<DialogContent><Dialog>...</Dialog></DialogContent>`
7. dialog-three-fields SHOULD Use a page or a Sheet for more than three fields.
8. dialog-error-in-body SHOULD Keep the dialog open on failure and show the error beside the field; there is no error part.
9. dialog-pending-save SHOULD Use Button pending for a slow save and disable Cancel if closing would lose work.
   - Correct: `<Button pending={saving}>Save name</Button>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Dialog` | `Base UI Root props` |  | open, defaultOpen, onOpenChange, modal. |
| `DialogTrigger` | `Base UI props` |  | Use `render={<Button/>}`. |
| `DialogContent.size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 384, 480 or 640px max width. |
| `DialogContent.showClose` | `boolean` | `true` | The corner close button. |
| `DialogContent.initialFocus` | `Base UI` |  | Which element takes focus on open. |
| `DialogClose` | `Base UI props` |  | Use `render={<Button/>}` for a footer action. |
Other props pass through to each part's own element; DialogContent passes them to the dialog panel.

## Variants and states
- size: sm, md, lg
- showClose: true, false
- states: closed, opening, open, closing

## Accessibility
- [ ] The panel is role dialog, named by DialogTitle and described by DialogDescription; the page behind is inert.
- [ ] Focus moves to the first control inside and returns to the trigger on close.
- [ ] Escape closes; Tab wraps inside the dialog.
- [ ] The corner close is a 32px button named Close.

## Edge cases
- Right to left -> Position uses start-1/2 with an rtl correction; the close button moves to the left.
- Long unbroken description -> It overflows; the description does not break words.
- Tall content -> The panel caps at 100dvh minus 2rem and scrolls inside.
- 320px phone -> The panel is 288px wide and the content wraps.
- Opened from a menu -> Let the menu close first; the dialog portals into the Lime scope.
- Reduced motion -> The dialog appears and leaves at once.
- Forced colors -> Fill and shadow drop, so the panel edge disappears; add a transparent border.

## Tokens
--raised, --radius-sheet, --shadow-overlay, --overlay-sm, --overlay, --overlay-lg, --scrim, --text-xl, --weight-semibold, --tracking-tight, --text-sm, --fg-2, --dur-slow, --dur-base, --dur-fast, --ease-out, --ease-in, --scale-enter

## Related
- [Alert dialog](/systems/lime/components/alert-dialog.md): A blocking decision, such as deleting a goal, that cannot be dismissed from outside.
- [Sheet](/systems/lime/components/sheet.md): A panel from an edge, such as transaction details, that keeps the page visible.
- [Popover](/systems/lime/components/popover.md): An anchored panel with controls, such as splitting a bill.
