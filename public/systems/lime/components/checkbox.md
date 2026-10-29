---
name: Checkbox
system: lime
kind: component
import: "import {Checkbox} from '@/components/lime/ui/checkbox'"
install: "npx shadcn@latest add https://happyhands.cc/r/lime/checkbox.json"
registryDependencies: [icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/checkbox
---

# Checkbox

Ticks one or more options on or off before you hit Save.

## Use when
- A yes or no option on a form that waits for a button: add captions, accept the terms.
- Several independent options where any number can be on.
- Select all above a list, using the mixed state.

## Don't use when
- The change applies as soon as it is pressed. Use [Switch](/systems/lime/components/switch.md).
- Exactly one of a few options. Use [Radio](/systems/lime/components/radio.md).
- A filter or topic toggled in a row. Use [Chip](/systems/lime/components/chip.md).

## Minimal example
```tsx
<label><Checkbox defaultChecked/> Round up every purchase</label>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. checkbox-label-wraps MUST Wrap the box and its text in one label so the whole line is the press target. Because a loose span beside the 20px box neither names it nor toggles it when pressed.
   - Correct: `<label><Checkbox/> Round up purchases</label>`
   - Wrong: `<Checkbox/> <span>Round up purchases</span>`
2. checkbox-name MUST Pass aria-label when there is no visible text beside the box. Because without it a screen reader announces "checkbox" with no name.
   - Correct: `<Checkbox aria-label="Select Vacation fund"/>`
   - Wrong: `<Checkbox/>`
3. checkbox-mixed-parent MUST Set indeterminate on a parent when only some children are checked; pressing it sets all or none. Because a plain unchecked parent reads as none selected while some bills are on.
   - Correct: `<Checkbox checked={all} indeterminate={some}/>`
   - Wrong: `<Checkbox checked={all}/>`
4. checkbox-top-align SHOULD Align the box to the first line with items-start when the label can wrap.
   - Correct: `<label className="flex items-start gap-2">`
   - Wrong: `<label className="flex items-center gap-2">`
5. checkbox-label-positive SHOULD State the option as what turning it on does; never a negative or a question.
6. checkbox-no-lime-card NEVER Fill a checked row with lime; use bg-accent-wash on the row if needed. Because the checked box is lime too, so it disappears into a lime row.
   - Correct: `<div className="bg-accent-wash">...<Checkbox/></div>`
   - Wrong: `<div className="bg-accent">...<Checkbox/></div>`
7. checkbox-touch-row SHOULD Give the row at least 44px of height on touch surfaces; the box is 20px.
   - Correct: `<label className="flex min-h-11 items-center gap-2"><Checkbox/> ...</label>`
8. checkbox-error-field SHOULD Set aria-invalid for an error and put the reason in FieldError.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `checked, defaultChecked` | `boolean` |  | Controlled or uncontrolled. |
| `onCheckedChange` | `(checked: boolean, details) => void` |  | Called when pressed. |
| `indeterminate` | `boolean` | `false` | The mixed state; stays until the parent clears it. |
| `aria-invalid` | `boolean` |  | Red outline. |
| `disabled, required, name, value` | `native` |  | Submitted through a hidden input. |
Other props pass through to the root element.

## Variants and states
- checked: false, true, indeterminate
- states: rest, hover, focus-visible, invalid, disabled

## Accessibility
- [ ] Role checkbox named by the wrapping label or aria-label; aria-checked is true, false or mixed.
- [ ] Space toggles; Tab skips a disabled box.
- [ ] Focus shows a 2px olive outline offset 2px.
- [ ] Outline contrast is 3.4:1 on the page; the check on lime is 15.6:1.

## Edge cases
- Long label -> The label wraps beside the 20px box; use items-start.
- Right to left -> The box moves to the right edge; the check has no direction.
- No label -> No accessible name and a 20px target.
- Forced colors -> A checked or mixed box paints with Highlight and the check with HighlightText.
- Saves on press -> There is no pending state; use a Switch.

## Tokens
--page, --control, --radius-sm, --fg-2, --accent, --accent-hover, --accent-line, --on-accent, --danger, --line-strong, --surface-2, --fg-disabled, --ring, --line-focus, --focus-offset, --dur-fast, --ease-out

## Related
- [Switch](/systems/lime/components/switch.md): A setting that applies at once, such as round-ups.
- [Radio](/systems/lime/components/radio.md): One choice from a short visible list, such as a transfer speed.
- [Chip](/systems/lime/components/chip.md): A filter the person toggles, such as a spending category.
