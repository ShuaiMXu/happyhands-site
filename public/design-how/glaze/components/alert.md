---
name: Alert
system: glaze
kind: component
import: "import {Alert, AlertTitle, AlertDescription, AlertAction, AlertClose, alertVariants} from '@/components/glaze/ui/alert'"
install: "npx shadcn@latest add https://design.how/r/glaze/alert.json"
registryDependencies: [button, icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/alert
---

# Alert

Reports a problem with the current view.

## Use when
- Something about this view needs the person's attention: a key expiring, an eval that failed.
- Good news worth a line where it happened: a prompt went live.
- A note that is part of the page: retention, a limit, a change.

## Don't use when
- Where one run stands, in a row. Use [Status](/systems/glaze/components/status.md).
- A region has nothing to show or failed to load. Use [Empty state](/systems/glaze/components/empty-state.md).
- A short label beside a name. Use [Badge](/systems/glaze/components/badge.md).

## Minimal example
```tsx
<Alert status="warn">
  <AlertTitle>Production key expires tomorrow</AlertTitle>
  <AlertAction><Button size="sm" variant="secondary">Rotate key</Button></AlertAction>
</Alert>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. alert-title-names MUST Name the thing in AlertTitle in words: "Production key expires tomorrow", never "Warning" or "Error". Because the tint and the icon already say how bad it is, so a title that repeats it leaves the person reading on to learn what.
   - Correct: `<AlertTitle>Production key expires tomorrow</AlertTitle>`
   - Wrong: `<AlertTitle>Warning</AlertTitle>`
2. alert-no-close-trouble NEVER Give a warn or fail Alert a close button; it stays until the problem is fixed. Because a dismissed failure is still a failure, and AlertClose renders nothing on warn and fail anyway.
   - Correct:
     ```tsx
     <Alert status="fail">...<AlertAction><Button size="sm" variant="secondary">Retry</Button></AlertAction></Alert>
     ```
   - Wrong: `<Alert status="fail">...<AlertClose/></Alert>`
3. alert-status-meaning MUST Pick status by the news: fail for a failure, warn for a risk, ok for good news, neutral for a note. Because colour means status, so a coral note about retention reads as a failure.
4. alert-one-action MUST Put at most one secondary action in AlertAction, size="sm", and never an ink one. Because the alert sits inside a view that has its own ink action, and an ink pill on a tint fights it.
   - Correct: `<AlertAction><Button size="sm" variant="secondary">Rotate key</Button></AlertAction>`
   - Wrong: `<AlertAction><Button size="sm">Rotate</Button><Button size="sm">Ignore</Button></AlertAction>`
5. alert-no-rail NEVER Draw a coloured bar on one edge or a shadow under an Alert. Because a side rail is the generated-UI tell Glaze rules out, and the tint already says the status.
   - Correct: `<Alert status="fail">`
   - Wrong: `<Alert className="border-s-4 border-fail">`
6. alert-dismiss-key SHOULD Give a dismissible notice a dismissKey that changes with its message. Because the same notice then stays gone across visits, and a new one shows again.
7. alert-announce-static SHOULD Set announce={false} on a note that is part of the page when it loads. Because a role="status" region on every page load reads the note to a screen reader each time.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `status` | `'neutral' \| 'ok' \| 'warn' \| 'fail'` | `'neutral'` | Paper with a line, or the status tint and icon. |
| `icon` | `boolean \| ReactNode` | `true` | The status icon, none, or another. |
| `announce` | `boolean` | `true` | role="alert" on warn and fail, role="status" otherwise. |
| `dismissKey` | `string` |  | Remembers a dismissal in localStorage. |
| `onDismiss` | `() => void` |  | Called after AlertClose. |
| `AlertClose label` | `string` | `'Dismiss'` | The close button's name. |
Other props pass through to the root div.

## Variants and states
- status: neutral, ok, warn, fail
- states: shown, dismissed

## Accessibility
- [ ] warn and fail are role="alert"; neutral and ok role="status"; announce={false} drops the role.
- [ ] Each status has its own icon shape, so it reads in grayscale.
- [ ] Words on the tints are 5.0:1 or better; the icon takes the status word colour.
- [ ] Dismissing moves focus to the next focusable thing after the alert.

## Keyboard
- `Tab`: Moves to the action, then the close button.
- `Enter`: Presses the focused action or dismisses.

## Edge cases
- Under 24rem -> The action drops under the text.
- No title -> The icon centres on the description's first line.
- Dismissed before -> Never flashes in: it waits for the stored dismissal.
- No children -> Renders nothing.
- Dark theme -> The tints turn dark and the words light.
- Forced colours -> A CanvasText border keeps the box.

## Tokens
--paper, --line, --ok-tint, --warn-tint, --fail-tint, --ok-text, --warn-text, --fail-text, --text-1, --text-2, --radius-overlay, --space-3, --type-label, --type-body-sm

## Related
- [Status](/systems/glaze/components/status.md): Says where a piece of work stands.
- [Empty state](/systems/glaze/components/empty-state.md): Explains why a region is empty.
- [Badge](/systems/glaze/components/badge.md): Labels what something is or how it stands.
