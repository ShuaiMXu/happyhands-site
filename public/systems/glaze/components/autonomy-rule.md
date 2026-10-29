---
name: Autonomy rule
system: glaze
kind: component
import: "import {AutonomyRule} from '@/components/glaze/ai/autonomy-rule'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/autonomy-rule.json"
registryDependencies: [item, segmented-control, select, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/autonomy-rule
---

# Autonomy rule

Sets what an agent may do alone.

## Use when
- A settings page of what an agent does without asking: refunds under a limit, emails to customers, deploys to staging.
- One action with a limit in its name, set to Do it, Ask first or Never.

## Don't use when
- A setting that is only on or off. Use [Switch](/systems/glaze/components/switch.md).
- Asking once, for one call. Use [Tool call](/systems/glaze/components/tool-call.md).
- Picking a number for the limit itself. Use [Number input](/systems/glaze/components/number-input.md).

## Minimal example
```tsx
<ItemGroup aria-label="Refund agent permissions">
  <AutonomyRule title="Refunds under $50" value={rules.refundSmall} onValueChange={v => save('refundSmall', v)}/>
  <AutonomyRule title="Refunds over $50" value={rules.refundLarge} onValueChange={v => save('refundLarge', v)}/>
</ItemGroup>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. autonomy-rule-title MUST Write title as the action with its limit, such as "Refunds under $50". Because the title names the control, so a screen reader hears "Refunds under $50, Ask first", and "Refunds" alone hides the limit.
   - Correct: `title="Refunds under $50"`
   - Wrong: `title="Refunds"`
2. autonomy-rule-in-group MUST Put rules in an ItemGroup named for the agent, one rule per row. Because the group draws the panel and the hairlines between rows, and its name says whose permissions these are.
   - Correct:
     ```tsx
     <ItemGroup aria-label="Refund agent permissions">{rules.map(r => <AutonomyRule key={r.id} {...r}/>)}</ItemGroup>
     ```
   - Wrong: `<div>{rules.map(r => <AutonomyRule key={r.id} {...r}/>)}</div>`
3. autonomy-rule-save-on-change MUST Save in onValueChange; never add a Save button per row. Because the control looks set the moment it is pressed, and a row that waits for Save leaves the agent on the old rule.
   - Correct: `<AutonomyRule title={t} value={v} onValueChange={next => save(id, next)}/>`
   - Wrong:
     ```tsx
     <AutonomyRule title={t} value={v} onValueChange={setDraft}/>
     <Button>Save</Button>
     ```
4. autonomy-rule-select SHOULD Pass control="select" for more than three levels or a column under 24rem. Because a segmented control of four labels at 26px runs out of room and drops under the title on most phones.
5. autonomy-rule-locked SHOULD Pass disabled for a rule set elsewhere, and say who set it in description.
   - Correct: `<AutonomyRule title="Refunds over $500" value="never" disabled description="Set by your workspace admin"/>`
6. autonomy-rule-no-colour NEVER Colour a level, such as coral for Never or green for Do it. Because colour in Glaze means a status, and a level is a setting; the chosen one is the glass thumb.
   - Correct: `<AutonomyRule title={t} value="never"/>`
   - Wrong: `<AutonomyRule className="[&_[data-checked]]:glass-coral" …/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `title` | `ReactNode` |  | The action and its limit; names the control. Required. |
| `description` | `ReactNode` |  | One line under it, up to two. |
| `value, defaultValue, onValueChange` | `'auto' \| 'ask' \| 'never'` |  | The level; a custom options list sets its own values. |
| `options` | `{value, label}[]` | `Do it, Ask first, Never` | The levels, most freedom first. |
| `control` | `'segmented' \| 'select'` | `'segmented'` | A 26px segmented control or a 26px select. |
| `disabled` | `boolean` | `false` | Set elsewhere; the row greys. |
Other props pass through to the Item row.

## Variants and states
- control: segmented, select
- states: set, unset, with description, disabled
- when states meet, the first wins: disabled > set > unset

## Accessibility
- [ ] The segmented control is a radio group named by the title; arrow keys move and choose.
- [ ] The select's trigger is named by the title and reads its value.
- [ ] The chosen level is the glass thumb and a checked radio, not colour.
- [ ] Inside an ItemGroup each rule is a listitem.

## Keyboard
- `Tab`: Moves to the rule's control.
- `Arrow keys`: Choose the next or previous level (segmented).
- `Enter, Space`: Opens the select.

## Edge cases
- Narrow row -> The control drops under the title, aligned to the end.
- No value -> No segment is chosen and the select is empty; pass the current level.
- Long title -> Truncates on one line; put the rest in description.
- Right to left -> The control sits at the start of the row's end, levels in reading order.
- Dark theme -> The thumb turns light glass with an ink label.

## Tokens
--field, --row, --control-sm, --line-faint, --text-1, --text-2, --text-disabled, --radius-pill, --type-label, --type-label-sm, --type-body-sm

## Related
- [Segmented control](/systems/glaze/components/segmented-control.md): Switches between a few views of one thing.
- [Select](/systems/glaze/components/select.md): Picks one option from a list.
- [Item](/systems/glaze/components/item.md): Shows one thing as a row in a list.
- [Tool call](/systems/glaze/components/tool-call.md): Shows one tool an agent called.
