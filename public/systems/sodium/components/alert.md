---
name: Alert
system: sodium
kind: component
import: "import {Alert, AlertTitle, AlertDescription, AlertAction, AlertClose, alertVariants} from '@/components/sodium/ui/alert'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/alert.json"
registryDependencies: [button, icon, status, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/alert
---

# Alert

Reports a problem or a change in the current view.

## Use when
- Something about this view needs reading before the rest: a failed partition, a quota near its limit.
- A note that stays with the page, such as a schedule changed by someone else.

## Don't use when
- The result of an action that is already out of view. Use [Toast](/systems/sodium/components/toast.md).
- A field's own error. Use [Field](/systems/sodium/components/field.md).
- Where one job stands, in a row. Use [Status](/systems/sodium/components/status.md).

## Minimal example
```tsx
<Alert status="fail">
  <AlertTitle>Load at line 6</AlertTitle>
  <AlertDescription>The source dropped column region on Oct 18.</AlertDescription>
  <AlertAction>
    <Button variant="secondary" size="sm">Skip column</Button>
    <Button size="sm">Retry load</Button>
  </AlertAction>
</Alert>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. alert-status-outcome MUST Pick status by what happened: fail for a fault, warn for a risk, ok for good news, neutral for a note. Because the status sets the lead Status, the role and whether it can be closed.
   - Correct: `<Alert>Schedule changed by Ana</Alert>`
   - Wrong: `<Alert status="fail">Schedule changed by Ana</Alert>`
2. alert-one-surface NEVER Tint an Alert, colour its edge or add a bar down one side. Because the Status already says the outcome once; a pink fill and a red edge say it twice more and drown the title.
   - Correct: `<Alert status="fail">`
   - Wrong: `<Alert status="fail" className="border-fail bg-fail-tint">`
3. alert-no-yellow NEVER Draw a warning in the sodium yellow. Because yellow marks the one fix; warn has its own orange so a warning never looks like a button.
   - Correct: `<Alert status="warn"><AlertTitle>Quota at 92%</AlertTitle></Alert>`
   - Wrong: `<Alert className="bg-selected">Quota at 92%</Alert>`
4. alert-fail-stays MUST Leave warn and fail alerts without a close; clear them when the problem is fixed. Because a dismissed failure is still a failure, and the next person on the page never sees it.
   - Correct: `<Alert status="fail">…</Alert>`
   - Wrong: `<Alert status="fail">…<AlertClose/></Alert>`
5. alert-one-action MUST Give an Alert at most two size="sm" actions, and make only the one fix primary. Because the fix is the next step the failure asks for, so it takes the view's one slab and the way around it stays secondary.
   - Correct:
     ```tsx
     <AlertAction><Button variant="secondary" size="sm">Skip column</Button><Button size="sm">Retry load</Button></AlertAction>
     ```
   - Wrong: `<AlertAction><Button size="sm">Skip column</Button><Button size="sm">Retry load</Button></AlertAction>`
6. alert-title-names SHOULD Name the thing in the title and let the Status say what happened; the cause goes in the description.
   - Correct: `<AlertTitle>Load at line 6</AlertTitle>`
   - Wrong: `<AlertTitle>Load failed</AlertTitle>`
7. alert-one-sentence MUST Write the AlertDescription as one short sentence that names the cause. Because an alert is read in one glance; a second sentence telling the reader what to do repeats the buttons.
   - Correct: `<AlertDescription>The source dropped column region on Oct 18.</AlertDescription>`
   - Wrong:
     ```tsx
     <AlertDescription>The source dropped the column region on Oct 18. Map it to a new column or skip it to resume.</AlertDescription>
     ```
8. alert-actions-row-end MUST Put buttons in AlertAction, which sets them at the row's end and under the text only when the alert is narrow. Because AlertAction measures the alert, not the window, so the sentence keeps its width at any size.
   - Correct: `<AlertDescription>…</AlertDescription><AlertAction><Button size="sm">Retry</Button></AlertAction>`
   - Wrong: `<AlertDescription className="flex justify-between">…<Button size="sm">Retry</Button></AlertDescription>`
9. alert-dismiss-key SHOULD Give a dismissible note a dismissKey that changes with its message.
   - Correct: `<Alert dismissKey="schedule-2026-10-19">`
   - Wrong: `<Alert dismissKey="banner">`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `status` | `'neutral' \| 'ok' \| 'warn' \| 'fail'` | `'neutral'` | The lead Status (none on neutral), the role and whether it closes. Never the box. |
| `announce` | `boolean` | `true` | false for a static note that is part of the page. |
| `dismissKey` | `string` |  | Remembers a dismissal in localStorage. |
| `onDismiss` | `() => void` |  | Called after AlertClose. |
Other props pass through to the alert div.

## Variants and states
- status: neutral, ok, warn, fail
- states: title only, with description, with actions, narrow, dismissible

## Accessibility
- [ ] warn and fail are role="alert"; neutral and ok role="status"; announce={false} for neither.
- [ ] The Status says the outcome in a word as well as a mark (solid square, half square, diamond), so colour is never alone.
- [ ] Title text-1 and description text-2 on the page, both past 4.5:1 in both themes.
- [ ] Dismissing moves focus to the next focusable thing after the alert.

## Keyboard
- `Enter`: On the close button, dismisses a neutral or ok alert.

## Edge cases
- Narrow -> Under 24rem of its own width the actions wrap under the text, on its start edge.
- No title -> The description takes the title's place beside the Status.
- Dismissed before -> With the same dismissKey it never renders, so it never flashes.
- Forced colours -> The edge draws in CanvasText; the Status word carries the status.

## Tokens
--page, --line, --inset, --ok-text, --warn-text, --fail-text, --text-1, --text-2, --type-label-sm, --type-body, --type-body-sm

## Related
- [Toast](/systems/sodium/components/toast.md): Reports something that happened out of view.
- [Status](/systems/sodium/components/status.md): Says where a job or a run stands.
- [Empty state](/systems/sodium/components/empty-state.md): Explains why a region is empty.
