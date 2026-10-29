---
name: Insight
system: lime
kind: component
import: "import {Insight} from '@/components/lime/ai/insight'"
install: "npx shadcn@latest add https://happyhands.cc/r/lime/insight.json"
registryDependencies: [button, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/insight
---

# Insight

Tells you one thing the assistant noticed, with the number behind it.

## Use when
- A change in spending, saving or income the person would want to know about.
- A short feed of findings on a home or summary screen.

## Don't use when
- The assistant wants to move money now and needs a yes. Use [Approval request](/systems/lime/components/approval-request.md).
- The assistant answering something the person asked. Use [Message](/systems/lime/components/message.md).
- Progress toward a goal. Use [Progress](/systems/lime/components/progress.md).
- A record of what the assistant already did. Use [Action receipt](/systems/lime/components/action-receipt.md).

## Minimal example
```tsx
<Insight
  title="Groceries are up this month"
  figure="+18%"
  basis="vs. 3 month average"
  points={[310, 298, 335, 362, 390]}
/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. insight-one-finding MUST Say one finding per Insight, as a plain sentence. Because the title truncates to one line and the single figure can prove only one claim.
   - Correct: `title="Groceries are up this month"`
   - Wrong: `title="Spending summary"`
2. insight-figure-proves MUST Make the figure the number that proves the title, and say what it compares against in basis. Because the sparkline is hidden from screen readers, so the figure and basis carry the whole proof.
   - Correct: `figure="+18%" basis="vs. 3 month average"`
3. insight-points SHOULD Pass four to twelve points, oldest first; fewer than two draws no line.
4. insight-one-action SHOULD Offer at most one action, as a few words such as Set a budget.
5. insight-no-card NEVER Put an Insight in a Card with buttons; it is a line of reading, not a request. Because a card with a button row reads as a task to clear and buries the one action link.
   - Correct: `<Insight title="Groceries are up" figure="+18%" points={weeks} action="Set a budget"/>`
   - Wrong: `<Card><Insight title="Groceries are up" figure="+18%" points={weeks}/><Button>Dismiss</Button></Card>`
6. insight-no-color NEVER Color the figure green or red; the sentence says which way it went. Because savings up in red or spending up in green tells the person the opposite of the title.
   - Correct: `<Insight title="Groceries are up this month" figure="+18%" basis="vs. 3 month average" points={weeks}/>`
   - Wrong: `<Insight title="Groceries are up" figure="+18%" className="[&_.tabular-nums]:text-success" points={weeks}/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `title` | `string` | `required` | The finding as a sentence. |
| `figure` | `string` | `required` | The number that proves it, already formatted. |
| `basis` | `string` |  | What the figure compares against. Truncates first. |
| `points` | `number[]` | `required` | The sparkline, oldest first. |
| `action` | `string` |  | The words of the one action. |
| `onAction` | `() => void` |  | Called by the action. |
Other props pass through to the root element.

## Variants and states
- action: unset, a string
- states: default

## Accessibility
- [ ] The sparkline is hidden from screen readers; the title and figure say what it shows.
- [ ] The action is a real button with its words as the name.

## Edge cases
- Narrow screen -> The title and basis truncate; the figure, the line and the action keep their width.
- Flat data -> Equal points draw a flat line through the middle.
- One point -> No line is drawn; the figure stands alone.

## Tokens
--fg, --fg-3, --text-sm, --text-xl, --text-xs, --weight-semibold

## Related
- [Progress](/systems/lime/components/progress.md): How far a goal has come, such as $640 of $1,000 saved, as a bar or a ring.
- [Amount](/systems/lime/components/amount.md): A money amount with its sign, currency and tabular figures.
- [Action receipt](/systems/lime/components/action-receipt.md): A message listing what the assistant just did, one line per action, with Undo.
