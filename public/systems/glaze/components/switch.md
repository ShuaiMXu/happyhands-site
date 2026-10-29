---
name: Switch
system: glaze
kind: component
import: "import {Switch} from '@/components/glaze/ui/switch'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/switch.json"
registryDependencies: [icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/switch
---

# Switch

Turns a setting on or off at once.

## Use when
- A setting takes effect at once, with no Save button: a tool on or off, logging, notifications.
- A list of independent settings, each saved on its own.

## Don't use when
- The choice is saved with a form. Use [Checkbox](/systems/glaze/components/checkbox.md).
- Two to five views of the same thing. Use [Segmented control](/systems/glaze/components/segmented-control.md).
- The action starts something rather than setting a state. Use [Button](/systems/glaze/components/button.md).

## Minimal example
```tsx
<Field orientation="horizontal">
  <FieldLabel>Live web search</FieldLabel>
  <Switch checked={on} onCheckedChange={save} pending={saving}/>
</Field>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. switch-applies-now MUST Apply the change on onCheckedChange; never put a Switch in a form that waits for Save. Because a switch promises the change happened, so a Save button after it leaves the person unsure which one counted.
   - Correct: `<Switch checked={on} onCheckedChange={next => save({search: next})}/>`
   - Wrong: `<form><Switch name="search"/><Button type="submit">Save</Button></form>`
2. switch-pending-save MUST Pass pending while the change saves, and set checked back if it fails, with the reason beside it. Because pending holds the switch read-only so a second flip cannot race the first, and a switch left on after a failed save lies.
   - Correct: `<Switch checked={on} pending={saving} onCheckedChange={flip}/>`
3. switch-labelled MUST Name the switch with a FieldLabel in a horizontal Field, or aria-label. Because a bare switch is announced as "switch, on" with nothing to say what is on.
   - Correct: `<Field orientation="horizontal"><FieldLabel>Live web search</FieldLabel><Switch/></Field>`
   - Wrong: `<span>Live web search</span><Switch/>`
4. switch-label-not-state NEVER Write the state into the label ("On", "Enabled") or change the label when it flips. Because the knob already shows the state and a screen reader says it, so a changing label reads as a different setting.
   - Correct: `<FieldLabel>Live web search</FieldLabel>`
   - Wrong: `<FieldLabel>{on ? 'Search enabled' : 'Search disabled'}</FieldLabel>`
5. switch-no-colour NEVER Colour the track green or the knob in a hue when on. Because colour means status in Glaze; on reads from the small glaze track and the knob's place.
   - Correct: `<Switch/>`
   - Wrong: `<Switch className="data-checked:bg-ok"/>`
6. switch-size-in-lists SHOULD Use size="sm" in a dense list of 36px rows, the default beside a label and description.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `checked, defaultChecked, onCheckedChange` | `Base UI Switch` |  | Apply the change in onCheckedChange. |
| `size` | `'sm' \| 'default'` | `'default'` | 16 by 28 or 20 by 36px. |
| `pending` | `boolean` | `false` | Saving: the arc in the knob, aria-busy, further flips ignored. |
| `aria-invalid` | `boolean` | `false` | Rings the track in coral. |
| `disabled, readOnly, name` | `Base UI` |  | name submits through a hidden input. |
Other props pass through to the switch root (Base UI Switch.Root).

## Variants and states
- checked: false, true
- size: sm, default
- states: rest, hover, held, focus-visible, pending, invalid, disabled
- when states meet, the first wins: disabled > pending > invalid > held > focus-visible > hover > rest

## Accessibility
- [ ] role="switch" with aria-checked, named by its label; pending sets aria-busy and keeps focus.
- [ ] On is shown by the small glaze track and the knob's place, not by a hue; the knob's ring marks it on the grey off track.
- [ ] The hit area reaches 28px around a 20px switch.
- [ ] Announce a failed save in text beside the switch, not only by the knob moving back.

## Keyboard
- `Space`: Flips the switch.
- `Enter`: Flips the switch.

## Edge cases
- Save fails -> The caller sets checked back; the knob returns and the reason shows beside it.
- Double press while saving -> Pending makes it read-only, so the second press is ignored.
- Right to left -> The knob starts at the right and moves left when on.
- Dark theme -> Off is a light knob on light ink at 15%; on, the track is light glaze and the knob dark.
- Disabled -> The track drops to the flat grey field and the knob's ring fades.
- Forced colors -> The track draws a CanvasText border and turns Highlight when on; the knob is CanvasText.
- Reduced motion -> The knob jumps instead of gliding.

## Tokens
--switch-off, --switch-knob, --field, --line-control, --line-faint, --fail, --text-2, --glaze-sm-top, --glaze-sm-mid, --glaze-sm-bottom, --glaze-sm-highlight, --glaze-sm-rim, --glaze-sm-text, --focus-width-sm, --radius-pill, --scale-press, --dur-state, --ease-out, --focus

## Related
- [Checkbox](/systems/glaze/components/checkbox.md): Turns one option on or off.
- [Segmented control](/systems/glaze/components/segmented-control.md): Switches between a few views of one thing.
- [Field](/systems/glaze/components/field.md): Gives an input its label and error.
