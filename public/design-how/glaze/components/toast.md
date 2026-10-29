---
name: Toast
system: glaze
kind: component
import: "import {Toaster, toast, toastManager, readingTimeout} from '@/components/glaze/ui/toast'"
install: "npx shadcn@latest add https://design.how/r/glaze/toast.json"
registryDependencies: [button, direction, icon, overlay, portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/toast
---

# Toast

Confirms an action or reports an event.

## Use when
- The result of what the person just did is not visible where they are: copied, published.
- A background event finished or changed: an eval passed, a sync fell behind.
- An action can be undone for a short time: archive with Undo.

## Don't use when
- The person must decide before going on. Use [Dialog](/systems/glaze/components/dialog.md).
- The message must stay until its cause is fixed. Put it on the page.
- A form field is wrong. Say so under the field.

## Minimal example
```tsx
toast.success('Published refund-prompt v14', {
  description: 'The support agent answers with v14 from its next conversation.',
  action: {label: 'View', onClick: openRelease},
})
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. toast-one-action MUST Give a toast at most one action, through the action option; never put buttons in the title or description. Because a toast is a line that leaves on a timer, and two choices in it ask for a decision it cannot wait for.
   - Correct: `toast('Archived 3 runs', {action: {label: 'Undo', onClick: restore}})`
   - Wrong: `toast('Archived 3 runs', {description: <><Button>Undo</Button><Button>View</Button></>})`
2. toast-errors-held MUST Report a failure with toast.fail, never toast() with failure words. Because a plain toast() times out and waits behind the limit, while toast.fail stays until closed and always shows.
   - Correct: `toast.fail("Couldn't save support-key", {description: 'The name is taken.'})`
   - Wrong: `toast("Couldn't save")`
3. toast-reading-time MUST Leave timeout unset so the reading time applies; pass timeout: 0 only to hold a toast. Because a fixed 3000ms takes the toast away before the person reads it and decides on Undo.
   - Correct: `toast('Archived 3 runs', {action: undo})`
   - Wrong: `toast('Archived 3 runs', {timeout: 3000, action: undo})`
4. toast-one-host MUST Mount one Toaster at the app root and call toast() from anywhere. Because every Toaster reads the same manager, so two mounted Toasters show each toast twice.
   - Correct: `<Toaster/> once in the app shell`
   - Wrong: `<Toaster/> in every panel`
5. toast-update-in-place MUST Use toast.promise, or reuse the id with toast.update, when work finishes later. Because toast.loading never times out, so a separate success toast leaves "Running eval" on screen beside "Eval passed".
   - Correct: `toast.promise(runEval(), {loading: 'Running eval', success: 'Eval passed', fail: 'Eval did not finish'})`
   - Wrong: `toast.loading('Running eval'); …; toast.success('Eval passed')`
6. toast-not-only-path MUST Make a toast's action reachable in the view too, such as Undo in the row's menu. Because the toast leaves on its timer, and a keyboard or screen reader user may never reach its button.
7. toast-no-confirm-everything NEVER Toast after a change already on screen; toast only when the result is out of view. Because a toast for what the person can see teaches them to ignore the stack, including the failure that matters.
   - Correct: `The field shows the new name; no toast.`
   - Wrong: `onChange={() => { setName(v); toast('Name updated'); }}`
8. toast-title-past SHOULD Write a success title in the past tense with its object, under 48 characters: 'Published refund-prompt v14'.
   - Correct: `toast.success('Key created')`
   - Wrong: `toast.success('Success!')`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `toast(title, options)` | `(ReactNode, ToastOptions) => id` |  | Also .success, .warn, .fail, .loading. |
| `toast.promise(promise, labels)` | `{loading, success, fail}` |  | One toast from loading to its result. |
| `toast.update(id, kind, title, options)` | `replaces in place` |  | Pass the action again to keep it. |
| `toast.dismiss(id?)` | `(string?) => void` |  | Closes one, or all. |
| `options description, action, id, onClose` | `ReactNode, {label, onClick}, string, () => void` |  | One action at most; an id replaces that toast. |
| `options timeout` | `number` | `reading time` | 0 holds it; fail and loading hold anyway. |
| `Toaster limit, inline, manager` | `number, boolean, manager` | `3, false` | inline renders a non-live specimen in place. |
Other props pass through to the root element.

## Variants and states
- kind: default, success, warn, fail, loading
- action: none, one
- states: entering, shown, paused, waiting, leaving
- when states meet, the first wins: fail > loading > warn > success > default

## Accessibility
- [ ] The stack is a live region named Notifications; a fail toast is announced assertively, the rest politely.
- [ ] Status is a coloured mark and a title that says it; the colour never stands alone.
- [ ] F6 moves focus into the stack; the timer and the drain line stop while focus or the pointer is in it.
- [ ] The close button is named Dismiss; the action is a real button.

## Keyboard
- `F6`: Moves focus into the toast stack.
- `Tab`: Moves between a toast's action and its Dismiss.
- `Escape`: Closes the focused toast.

## Edge cases
- A 120-character title -> Wraps; the reading time grows with it, up to 12 seconds.
- Five toasts at once -> Three show; the newest routine one waits with its timer stopped; a fail always shows.
- Phone, 390 wide -> The stack spans the width 16px in and clears the home indicator; a swipe down dismisses.
- A narrow stack -> The action drops under the text, and the X keeps the first line.
- Window in the background -> The timer and the drain line pause until it comes back.
- Reduced motion -> No slide and no drain line; the toast still leaves on time.

## Tokens
--paper, --line, --line-control, --radius-overlay, --toast, --space-4, --ok, --warn, --fail, --type-label, --type-body-sm, --text-1, --text-2, --z-overlay, --dur-overlay, --ease-out

## Related
- [Dialog](/systems/glaze/components/dialog.md): Asks for a decision on top of the page.
- [Button](/systems/glaze/components/button.md): Starts an action.
