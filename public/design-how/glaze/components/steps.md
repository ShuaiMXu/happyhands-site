---
name: Steps
system: glaze
kind: component
import: "import {Steps, Step, StepTrigger, StepIndicator, StepText, StepTitle, StepDescription, StepSeparator} from '@/components/glaze/ui/steps'"
install: "npx shadcn@latest add https://design.how/r/glaze/steps.json"
registryDependencies: [icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/steps
---

# Steps

Shows the steps of a flow.

## Use when
- A flow has two to six steps in a fixed order and the person needs to see where they are: a setup, an import.
- Work runs through stages and each stage has a state: a deploy, an agent's plan.

## Don't use when
- The panels can be read in any order. Use [Tabs](/systems/glaze/components/tabs.md).
- Only the share done matters, with no named steps. Use [Progress](/systems/glaze/components/progress.md).
- The events have times and a log of what happened. Use [Item](/systems/glaze/components/item.md).

## Minimal example
```tsx
<Steps value={2} aria-label="Deploy">
  <Step step={1}>
    <StepTrigger><StepIndicator/><StepText><StepTitle>Build</StepTitle><StepDescription>1m 12s</StepDescription></StepText></StepTrigger>
    <StepSeparator/>
  </Step>
  <Step step={2}>…</Step>
</Steps>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. steps-name MUST Give Steps an aria-label naming the flow: "Deploy", "Connect a data source". Because the list is read as "list, 4 items" with no name, so a screen reader cannot tell a deploy's stages from a setup.
   - Correct: `<Steps value={2} aria-label="Deploy">`
   - Wrong: `<Steps value={2}>`
2. steps-number-in-order MUST Number each Step from 1 in the order it renders, and pass the current one as value. Because done, current, upcoming and how far the track fills are all worked out from step against value, so a gap or a repeat marks the wrong steps done.
   - Correct:
     ```tsx
     <Step step={1}>…</Step>
     <Step step={2}>…</Step>
     ```
   - Wrong:
     ```tsx
     <Step step={0}>…</Step>
     <Step step={2}>…</Step>
     ```
3. steps-state-override MUST Set state="pending" on a step while it runs and state="error" when it failed; never colour a title or a marker by hand. Because the state draws the arc or the coral cross and says "running" or "Failed", so a hand-set colour is a status nobody hears and a dot nobody can name.
   - Correct: `<Step step={3} state="error">…<StepTitle>Migrate</StepTitle>…</Step>`
   - Wrong: `<StepTitle className="text-fail-text">Migrate</StepTitle>`
4. steps-separator SHOULD Put a StepSeparator in every Step, after its StepTrigger; the last step draws none. Because the track is what joins the markers into one flow, and its gradient fill up to the current step is the progress at a glance.
5. steps-no-restyle NEVER Restyle a marker with glass, a hue or a status dot, or set the done gradient on any other state. Because the small glaze means done and nothing else on the row, so a glazed current marker reads as finished, and a green or dotted one as a status badge.
   - Correct: `<StepIndicator/>`
   - Wrong:
     ```tsx
     <StepIndicator className="glass glass-ink"/>
     <StepIndicator className="bg-ok"/>
     ```
6. steps-go-back SHOULD Pass onValueChange only when the person can go back to a step, and leave linear on unless the steps are independent. Because a step that looks like a button but does nothing is a dead control, and a later step picked out of order skips the ones it needs.
7. steps-short-titles SHOULD Title each step with a verb or a noun of one or two words, and keep the detail to one line of StepDescription. Because horizontal steps share the width and both lines truncate, so a long title loses its end.
8. steps-size SHOULD Use size="sm" inside a card, a panel header or a dialog, and the default on a page of its own. Because the 16px marker and 12px label sit with the 26px small controls around them; the default 20px marker beside them looks loud.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Steps value` | `number` | `required` | The current step, from 1. Steps before it are done and their tracks filled. |
| `Steps onValueChange` | `(step: number) => void` |  | Makes each step a button that goes back to it. |
| `Steps orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | A row that shares the width, or a column. |
| `Steps size` | `'sm' \| 'default'` | `'default'` | sm: a 16px marker and 12px labels. default: a 20px marker and 13px labels. |
| `Steps linear` | `boolean` | `true` | With onValueChange, only steps up to the current one can be picked. |
| `Step step, state, disabled` | `number, 'done' \| 'current' \| 'upcoming' \| 'pending' \| 'error', boolean` | `state from value` | One step. |
| `StepIndicator children` | `ReactNode` | `by state` | Replaces the check, numeral, arc or cross. |
| `StepTitle errorText` | `ReactNode` | `'Failed'` | The word an error step shows beside its label. |
| `StepTrigger, StepText, StepDescription, StepSeparator` | `parts` |  | The marker and the text, one line of detail, and the track to the next step. |
Other props pass through to the ol.

## Variants and states
- orientation: horizontal, vertical
- size: sm, default
- states: done, current, upcoming, pending, error
- when states meet, the first wins: error > pending > done > current > upcoming

## Accessibility
- [ ] Steps is an ordered list, so a screen reader reads the order and the count; name it with aria-label.
- [ ] The current step carries aria-current="step".
- [ ] Each marker says its state as hidden text (done, current, running); error says "Failed" as visible text beside the label, so no state is told by shape or colour alone.
- [ ] With onValueChange each step is a button with its label as its name; steps past the current one are disabled when linear.
- [ ] The white check on the small glaze is about 6:1 at the glyph's top and 9.5:1 at its middle (4.8:1 only at the marker's top edge, where no glyph sits); in dark the ink check on the light glaze is 9:1 or better.
- [ ] The current numeral is text-1 on paper (11.9:1). The upcoming numeral is text-3 (3.3:1), a mark and not the step's name: the label beside it is text-2 at 5.5:1. The error word is the failure text at 5.9:1.
- [ ] The track is decoration (aria-hidden); the fill slides on --dur-overlay and jumps under reduced motion.

## Keyboard
- `Tab`: With onValueChange, moves through the steps that can be picked.
- `Enter, Space`: Goes back to the focused step.

## Edge cases
- Narrow container -> Horizontal labels and descriptions truncate; under 480px use orientation="vertical".
- More than six steps -> Group them into stages; a row of seven markers is too dense to read.
- A step fails -> state="error" on it, and the steps after it stay upcoming until the person retries; its track stays empty.
- A step is running -> state="pending" turns the arc in its marker; under reduced motion the arc stands still.
- Value jumps several steps -> Every track between fills at once over --dur-overlay.
- Every step done -> Pass value one past the last step, so every marker is a check, every track full and none current.
- Right to left -> The steps run right to left and the fill grows from the right.
- Dark theme -> The small glaze turns light with an ink check, and the track fill follows it.

## Tokens
--glaze-sm-top, --glaze-sm-mid, --glaze-sm-bottom, --glaze-sm-text, --paper, --field, --ink, --line, --text-1, --text-2, --text-3, --fail, --fail-tint, --fail-text, --radius-pill, --type-label, --type-label-sm, --type-caption, --dur-overlay, --dur-state, --ease-out, --dur-spin

## Related
- [Progress](/systems/glaze/components/progress.md): Shows how far a task got.
- [Tabs](/systems/glaze/components/tabs.md): Switches between panels of one view.
- [Breadcrumb](/systems/glaze/components/breadcrumb.md): Shows where the page sits.
