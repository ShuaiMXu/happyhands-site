---
name: Switch
system: sodium
kind: component
import: "import {Switch} from '@/components/sodium/ui/switch'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/switch.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/switch
---

# Switch

Turns a setting on or off at once.

## Use when
- A setting takes effect at once, with no Save button: auto-retry, alerts, a schedule paused or running.
- A list of independent settings, each saved on its own.

## Don't use when
- The choice is saved with a form. Use [Checkbox](/systems/sodium/components/checkbox.md).
- Two to five views of the same thing. Use [Segmented control](/systems/sodium/components/segmented-control.md).
- The action starts something rather than setting a state. Use [Button](/systems/sodium/components/button.md).

## Minimal example
```tsx
<Field orientation="horizontal">
  <FieldLabel>Auto-retry</FieldLabel>
  <Switch checked={on} onCheckedChange={save} pending={saving}/>
</Field>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. switch-applies-now MUST Apply the change on onCheckedChange; never put a Switch in a form that waits for Save. Because a switch promises the change happened, so a Save button after it leaves the person unsure which one counted.
   - Correct: `<Switch checked={on} onCheckedChange={next => save({retry: next})}/>`
   - Wrong: `<form><Switch name="retry"/><Button type="submit">Save</Button></form>`
2. switch-pending-save MUST Pass pending while the change saves, and set checked back if it fails, with the reason beside it. Because pending holds the switch read-only so a second flip cannot race the first, and a switch left on after a failed save lies.
   - Correct: `<Switch checked={on} pending={saving} onCheckedChange={flip}/>`
3. switch-labelled MUST Name the switch with a FieldLabel in a horizontal Field, or aria-label. Because a bare switch is announced as "switch, on" with nothing to say what is on.
   - Correct: `<Field orientation="horizontal"><FieldLabel>Auto-retry</FieldLabel><Switch/></Field>`
   - Wrong: `<span>Auto-retry</span><Switch/>`
4. switch-label-not-state NEVER Write the state into the label ("On", "Enabled") or change the label when it flips. Because the knob already shows the state and a screen reader says it, so a changing label reads as a different setting.
   - Correct: `<FieldLabel>Auto-retry</FieldLabel>`
   - Wrong: `<FieldLabel>{on ? 'Retry on' : 'Retry off'}</FieldLabel>`
5. switch-no-colour NEVER Fill the track by hand, green or yellow, when on; the checked recipe already draws on. Because green is a job's done colour, and a hand-set yellow drops the ink knob, the gold edge and the light; on reads from the checked fill, its ink knob and the knob's place.
   - Correct: `<Switch/>`
   - Wrong: `<Switch className="data-checked:bg-ok"/>`
6. switch-size-in-lists SHOULD Use size="sm" in a dense list of 32px rows, the default beside a label and description.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `checked, defaultChecked, onCheckedChange` | `Base UI Switch` |  | Apply the change in onCheckedChange. |
| `size` | `'sm' \| 'default'` | `'default'` | 16 by 28 or 20 by 36px. |
| `pending` | `boolean` | `false` | Saving: the pending mark in the track, aria-busy, further flips ignored. |
| `aria-invalid` | `boolean` | `false` | Turns the edge red. |
| `disabled, readOnly, name` | `Base UI` |  | name submits through a hidden input. |
Other props pass through to the switch root (Base UI Switch.Root).

## Variants and states
- checked: false, true
- size: sm, default
- states: rest, hover, held, focus-visible, on, pending, invalid, disabled
- when states meet, the first wins: disabled > pending > invalid > held > focus-visible > hover > rest

## Accessibility
- [ ] role="switch" with aria-checked, named by its label; pending sets aria-busy and keeps focus.
- [ ] On reads from the checked fill and the ink knob at the end (12.8:1 on the yellow), not from a hue; off has a 3.5:1 edge and a 3.5:1 knob on its body.
- [ ] The hit area reaches 28px around a 20px switch.
- [ ] Announce a failed save in text beside the switch, not only by the knob moving back.

## Keyboard
- `Space`: Flips the switch.
- `Enter`: Flips the switch.

## Edge cases
- Save fails -> The caller sets checked back; the knob returns and the reason shows beside it.
- Double press while saving -> Pending makes it read-only, so the second press is ignored.
- Right to left -> The knob starts at the right and moves left when on.
- Dark theme -> On is the dark yellow tint with a yellow edge and a yellow knob.
- Forced colors -> The track draws a CanvasText edge and turns Highlight, unlit, when on; the knob is CanvasText.
- Reduced motion -> The knob cuts to its place, and the pending mark stands still.

## Tokens
--check-off, --check-off-hover, --well, --line-control, --line, --fail, --text-2, --text-disabled, --check-bg, --check-edge, --check-mark, --primary-light, --primary-light-hover, --pending-cell, --dur-light, --dur-glow, --ease-soft, --focus

## Related
- [Checkbox](/systems/sodium/components/checkbox.md): Turns one option on or off.
- [Segmented control](/systems/sodium/components/segmented-control.md): Switches between a few views of one thing.
- [Field](/systems/sodium/components/field.md): Gives an input its label and error.
