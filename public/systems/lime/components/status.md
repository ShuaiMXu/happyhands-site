---
name: Status
system: lime
kind: component
import: "import {Status, STATUS_META} from '@/components/lime/ui/status'"
install: "npx shadcn@latest add https://happyhands.cc/r/lime/status.json"
registryDependencies: [button, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/status
---

# Status

Says where something stands, like Paid or Declined, with a colored dot.

## Use when
- The state of a job that takes time: a transfer, a statement export, an upload.
- A row in a list of jobs, where each needs a state to scan.
- Beside a title in a detail view, to say where the work stands.

## Don't use when
- A step the assistant took inside a chat. Use [Tool call](/systems/lime/components/tool-call.md).
- A category or plan label that never changes. Use [Badge](/systems/lime/components/badge.md).
- A percentage as a bar. Use a progress bar, or put the figure in label.

## Minimal example
```tsx
<Status status="running" label="Sending, 42%"/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. status-word-always MUST Show the word with the dot, even in a tight row. Because the green Paid and red Declined dots look alike to a red-green colorblind reader.
   - Correct: `<Status status="done"/>`
   - Wrong: `<span className="size-2 rounded-full bg-success"/>`
2. status-one-map MUST Use the default label or add detail to it; never invent a synonym. Because Complete on one screen and Paid on another read as two different states.
   - Correct: `<Status status="done"/>`
   - Wrong: `<Status status="done" label="Complete"/>`
3. status-detail-comma SHOULD Put a number or reason after a comma in label, such as Sending, 42%.
   - Correct: `<Status status="running" label="Sending, 42%"/>`
   - Wrong: `<Status status="running" label="42% complete, please wait"/>`
4. status-no-pulse NEVER Add a pulsing or pinging dot; the spinner is the only loop. Because a pulsing Scheduled dot looks like work in progress, which only the running spinner means.
   - Correct: `<Status status="queued"/>`
   - Wrong: `<Status status="queued" className="animate-pulse"/>`
5. status-five-states MUST Keep five states; express a sixth in label on the nearest state. Because STATUS_META has five keys, so an unknown status throws when it renders.
   - Correct: `<Status status="queued" label="Paused"/>`
   - Wrong: `<Status status="paused"/>`
6. status-live-region MUST Wrap a status that changes while watched in role="status". Because Status is a plain span, so a change to Declined is never announced.
   - Correct: `<div role="status"><Status status="done"/></div>`
   - Wrong: `<Status status="done"/> // swapped in silently`
7. status-undefined-label NEVER Pass label="" when there is no detail; pass undefined so the default word shows. Because the component keeps an empty string and leaves a bare colored dot.
   - Correct: `<Status status="failed" label={reason || undefined}/>`
   - Wrong: `<Status status="failed" label={reason ?? ''}/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `status` | `'queued' \| 'running' \| 'done' \| 'failed' \| 'canceled'` | `required` | Sets the dot, the spinner and the default word. |
| `label` | `string` | `from STATUS_META` | Replaces the word. Never an empty string. |
| `STATUS_META` | `Record<StatusName, {label, dot}>` |  | The single map of words and dot classes. |
Other props pass through to the root element.

## Variants and states
- status: queued, running, done, failed, canceled
- states: queued, running, done, failed, canceled

## Accessibility
- [ ] The word is always drawn, so the state never rests on color.
- [ ] Status is plain text and does not announce changes; use role="status" around it.
- [ ] The spinner keeps turning under reduced motion because it is the only sign that work runs.
- [ ] The dot is a background fill and may vanish in forced colors; the word carries the state.

## Edge cases
- Long label -> Wraps in the row; an unbroken string overflows, so keep labels short.
- Narrow container -> The dot centers against the wrapped text.
- Right to left -> The dot sits at the start and the word follows.
- Reduced motion -> The spinner keeps turning by design.
- Status swaps -> The mark and word change at once with no layout shift.
- Inside a link or cell -> It is an inline span; the dot keeps its own color.

## Tokens
--fg-2, --text-sm, --control, --success, --danger, --fg-disabled, --accent-line, --dur-spin

## Related
- [Badge](/systems/lime/components/badge.md): A short fact that never changes on its own, such as Plus or New.
- [Tool call](/systems/lime/components/tool-call.md): One step the assistant took, such as Moved $50 to Vacation fund, as a single line.
- [Amount](/systems/lime/components/amount.md): A money amount with its sign, currency and tabular figures.
- [Empty](/systems/lime/components/empty.md): An empty state with one action, such as Add a card.
