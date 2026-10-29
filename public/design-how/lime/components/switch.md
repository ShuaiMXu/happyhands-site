---
name: Switch
system: lime
kind: component
import: "import {Switch} from '@/components/lime/ui/switch'"
install: "npx shadcn@latest add https://design.how/r/lime/switch.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/switch
---

# Switch

Turns a setting on or off right away.

## Use when
- A setting that applies at once: notifications, round-ups, instant transfers.
- A list of preferences, one switch per row with its label on the left.

## Don't use when
- The choice waits for a Save or Continue. Use [Checkbox](/systems/lime/components/checkbox.md).
- One of several named options. Use [Radio](/systems/lime/components/radio.md).
- One of two to five views. Use [Segmented](/systems/lime/components/segmented.md).
- The control starts an action. Use [Button](/systems/lime/components/button.md).

## Minimal example
```tsx
<label>Round up every purchase <Switch defaultChecked/></label>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. switch-applies-now MUST Use a Checkbox, not a Switch, when the setting needs a Save button. Because a switch says the change already took effect, so people leave before pressing Save.
   - Correct: `<Checkbox/> ... <Button>Save</Button>`
   - Wrong: `<Switch/> ... <Button>Save</Button>`
2. switch-label-wraps MUST Wrap the label and the switch in one label element, label first and switch at the end. Because a span beside the switch is not its name, and tapping the word does nothing.
   - Correct: `<label>Round-ups <Switch/></label>`
   - Wrong: `<Switch/> <span>Round-ups</span>`
3. switch-failure-reverts MUST Set the switch back and say why in text when the save fails. Because a switch left on after a failed save says round-ups are running when they are not.
   - Correct: `onCheckedChange={on => save(on).catch(() => setOn(!on))}`
   - Wrong: `onCheckedChange={save} // a failure leaves it on`
4. switch-label-setting SHOULD Name the setting, not the action, so the label is true in both positions.
5. switch-no-on-off-text NEVER Put On or Off text in the track; the position and fill say it. Because Switch renders only its knob and drops children, so the text never shows.
   - Correct: `<Switch/>`
   - Wrong: `<Switch>ON</Switch>`
6. switch-name MUST Pass aria-label when there is no visible text. Because a screen reader announces "switch, off" with nothing saying what it turns off.
   - Correct: `<Switch aria-label="Round-ups"/>`
   - Wrong: `<Switch/>`
7. switch-touch-row SHOULD Make the whole row the target, at least 44px high; the track is 24px.
   - Correct: `<label className="flex min-h-11 items-center justify-between">...<Switch/></label>`
8. switch-no-size NEVER Resize or recolor the switch; it is always 40 by 24px. Because the knob travels a fixed 16px, so a wider track leaves it short of the end.
   - Correct: `<Switch/>`
   - Wrong: `<Switch className="h-8 w-14 data-checked:bg-success"/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `checked, defaultChecked` | `boolean` |  | Controlled or uncontrolled. |
| `onCheckedChange` | `(checked: boolean, details) => void` |  | Called when pressed. |
| `disabled, readOnly, required, name` | `native` |  | Base UI. |
Other props pass through to the root element.

## Variants and states
- checked: false, true
- states: off, on, hover (off: darker track), focus-visible, disabled

## Accessibility
- [ ] The switch is role switch with aria-checked, named by its wrapping label or aria-label.
- [ ] Tab focuses it; Space or Enter flips it.
- [ ] The knob is white with a soft shadow and a hairline edge in both states; on and off differ by the side the knob sits on and the track color, never by color alone.
- [ ] Forced colors paints the thumb ButtonText and an on track Highlight.

## Edge cases
- Long label -> The label wraps in its own column; the switch is shrink-0.
- Narrow row -> The switch never shrinks; the label wraps beside it.
- Right to left -> The thumb travel turns around under dir="rtl".
- Slow save -> No pending state; the switch flips at once and the page handles the wait.
- Disabled and on -> The thumb stays at the end, so it still reads as on.
- Inside a form -> The state submits through a hidden input under its name.
- Reduced motion -> The thumb jumps at once.

## Tokens
--surface-3, --control, --accent, --accent-line, --ink, --surface-2, --line-strong, --fg-disabled, --ring, --line-focus, --focus-offset, --dur-fast, --ease-out

## Related
- [Checkbox](/systems/lime/components/checkbox.md): One option on or off, with a mixed state.
- [Radio](/systems/lime/components/radio.md): One choice from a short visible list, such as a transfer speed.
- [Segmented](/systems/lime/components/segmented.md): A short row of exclusive options, such as Week, Month and Year.
