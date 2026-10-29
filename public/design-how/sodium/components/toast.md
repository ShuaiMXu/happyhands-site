---
name: Toast
system: sodium
kind: component
import: "import {Toaster, toast, toastManager, readingTimeout} from '@/components/sodium/ui/toast'"
install: "npx shadcn@latest add https://design.how/r/sodium/toast.json"
registryDependencies: [button, direction, icon, portal, status, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/toast
---

# Toast

Reports something that happened out of view.

## Use when
- A job the person started finished while they looked elsewhere: an export, a backfill.
- A background event changed: replication fell behind, a worker came back.
- An action can be undone for a short time: pause with Undo.

## Don't use when
- A problem with the view on screen. Use [Alert](/systems/sodium/components/alert.md).
- A field's own error. Use [Field](/systems/sodium/components/field.md).
- A change the person can already see.

## Minimal example
```tsx
toast.success('Backfill finished', {
  description: '1,240 partitions loaded in 41 minutes.',
  action: {label: 'View run', onClick: openRun},
})
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. toast-one-toaster MUST Mount one Toaster per app, inside the Sodium scope and its SodiumPortalProvider. Because each Toaster is its own live region, and two of them announce every toast twice.
   - Correct: `<SodiumPortalProvider>{children}<Toaster/></SodiumPortalProvider>`
   - Wrong: `<Page><Toaster/></Page><Sidebar><Toaster/></Sidebar>`
2. toast-not-only-path MUST Make a toast's action reachable in the view too, such as Undo in the row's menu. Because the toast leaves on its timer, and a keyboard or screen reader user may never reach its button.
3. toast-no-slab NEVER Put a primary Button in a toast. Because a toast reports and never asks, and a slab in the corner takes the page's one primary.
   - Correct: `action: {label: 'View run', onClick: openRun}`
   - Wrong: `action: {label: <Button>Deploy</Button>}`
4. toast-no-confirm-everything NEVER Toast after a change already on screen. Because a toast for what the person can see teaches them to ignore the stack, including the failure that matters.
   - Correct: `The field shows the new name; no toast.`
   - Wrong: `onChange={() => { setName(v); toast('Name updated'); }}`
5. toast-fail-holds MUST Use toast.fail for a failure; it holds until closed and is never hidden by the limit. Because a failure that times out unread is a failure nobody saw.
   - Correct: `toast.fail('Export failed', {description: 'The bucket refused the write.'})`
   - Wrong: `toast('Export failed')`
6. toast-title-past SHOULD Write a success title in the past tense with its object, under 48 characters.
   - Correct: `toast.success('Export ready')`
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
- states: entering, shown, paused, waiting, leaving
- when states meet, the first wins: fail > loading > warn > success > default

## Accessibility
- [ ] The stack is a live region named Notifications; a fail toast is announced assertively, the rest politely.
- [ ] Status is the Status mark and a title that says it; the colour never stands alone.
- [ ] F6 moves focus into the stack; the timer and its line stop while focus or the pointer is in it.
- [ ] The close is a real button named Dismiss; the action is a real button.

## Keyboard
- `F6`: Moves focus into the toast stack.
- `Tab`: Moves between a toast's action and its Dismiss.
- `Escape`: Closes the focused toast.

## Edge cases
- A 120-character title -> Wraps; the reading time grows with it, up to 12 seconds.
- Five toasts at once -> Three show; the newest routine one waits with its timer stopped; a fail always shows.
- Phone, 390 wide -> The stack spans the width 16px in and clears the home indicator; a swipe down dismisses.
- A narrow stack -> The action drops under the text, and the X keeps the first line.
- Window in the background -> The timer and its line pause until it comes back.
- Reduced motion -> No slide and no timer line; the toast still leaves on time.

## Tokens
--panel, --line, --line-control, --toast, --space-4, --ok, --warn, --fail, --type-label, --type-body-sm, --text-1, --text-2, --z-overlay, --dur-overlay, --ease-out

## Related
- [Alert](/systems/sodium/components/alert.md): Reports a problem or a change in the current view.
- [Status](/systems/sodium/components/status.md): Says where a job or a run stands.
- [Button](/systems/sodium/components/button.md): Starts an action.
