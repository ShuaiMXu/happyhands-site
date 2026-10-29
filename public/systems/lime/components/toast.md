---
name: Toast
system: lime
kind: component
import: "import {ToastProvider, useToast, createToastManager} from '@/components/lime/ui/toast'"
install: "npx shadcn@latest add https://happyhands.cc/r/lime/toast.json"
registryDependencies: [icon, portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/toast
---

# Toast

Confirms an action the person just took, briefly, with an optional Undo.

## Use when
- A quick action finished and the screen does not show the change, such as moving money from a list.
- An action that can be reversed for a moment, with Undo.

## Don't use when
- Something failed to load and needs a retry. Use [Error state](/systems/lime/components/error-state.md).
- What the assistant did on its own. Use [Action receipt](/systems/lime/components/action-receipt.md).
- A form error. Show it on the field, where it can be fixed.

## Minimal example
```tsx
<ToastProvider>{app}</ToastProvider>

const toast = useToast();
toast.show({title: 'Moved $50 to Vacation fund', action: {label: 'Undo', onClick: undoMove}});
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. toast-one-provider MUST Mount one ToastProvider inside the Lime scope and call useToast().show() under it. Because each provider keeps its own one-at-a-time queue, so two stack toasts on top of each other.
   - Correct: `<div className="lime"><ToastProvider><App/></ToastProvider></div>`
2. toast-past-tense MUST Write the title as what happened, past tense, with the amount or the name. Because Success! never says what moved, and the toast is gone in 5 seconds.
   - Correct: `toast.show({title: 'Moved $50 to Vacation fund'})`
   - Wrong: `toast.show({title: 'Success!'})`
3. toast-one-action MUST Give a toast at most one action, and make it Undo or a way back to the thing. Because there is one action slot and 8 seconds to reach it.
   - Correct: `action: {label: 'Undo', onClick: undoMove}`
   - Wrong: `action: {label: 'Undo or edit', onClick}`
4. toast-not-only-place MUST Show the result on the screen too; never make a toast the only record. Because it closes itself, so a person who looked away never learns the transfer went through.
5. toast-no-errors NEVER Use a toast for an error the person must act on. Because it closes in 5 seconds and the polite region reads it late, so the decline goes unseen.
   - Correct: `<ErrorState title="Payment declined" description="Card ending 4242 expired"/>`
   - Wrong: `toast.show({title: 'Payment declined'})`
6. toast-no-timeout-zero SHOULD Keep the timeout; set 0 only in a preview, since a toast that never leaves covers the page.
7. toast-undo-confirms SHOULD After Undo, show a second toast that says it was undone.
   - Correct: `onClick: () => { undoMove(); toast.show({title: 'Move undone'}); }`
8. toast-short SHOULD Keep it to the title; add description only when the title cannot carry it.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `ToastProvider.timeout` | `number` | `5000` | Milliseconds before a toast with no action closes. |
| `ToastProvider.contained` | `boolean` | `false` | Shows toasts in the nearest positioned parent. |
| `ToastProvider.toastManager` | `createToastManager()` |  | Shows a toast from outside React. |
| `useToast().show` | `({title, description?, action?, timeout?, id?}) => string` |  | Shows a toast, replacing the one showing. Returns its id. |
| `show action` | `{label, onClick}` |  | One action. Runs onClick, then closes. The timeout becomes 8000. |
| `useToast().close` | `(id?) => void` |  | Closes one toast, or all. |
Other props pass through to the root element.

## Variants and states
- action: none, undo
- description: none, one line
- states: entering, showing, paused, leaving

## Accessibility
- [ ] The viewport is a polite live region named Notifications; a toast is read after the current speech.
- [ ] Hover, focus or a touch on the toast pauses its timer, so Undo can always be reached.
- [ ] F6 moves focus to the toast from anywhere; Escape closes it.
- [ ] The close button is named Dismiss; the action is a real button with its own label.
- [ ] White on ink is 17.6:1, and the focus ring inside the toast is white on ink in both themes.

## Edge cases
- Two in a row -> The new toast replaces the one showing; there is never a stack.
- Long title -> Wraps to a second line; the toast grows upward and the buttons stay centred.
- Phone -> 16px from the sides and bottom, full width up to 384px.
- Swipe down -> Closes it, like Dismiss.
- Reduced motion -> It appears and leaves without moving or fading.
- Inside a dialog -> Sits above the dialog and its scrim (--z-toast).

## Tokens
--ink, --ink-hover, --ink-active, --fg-inverse, --radius-panel, --shadow-overlay, --control-sm, --control-lg, --z-toast, --dur-base, --dur-fast, --ease-out, --ease-in

## Related
- [Action receipt](/systems/lime/components/action-receipt.md): A message listing what the assistant just did, one line per action, with Undo.
- [Error state](/systems/lime/components/error-state.md): What failed to load, in its place, with Try again.
- [Status](/systems/lime/components/status.md): The state of a payment as a dot and a word.
