---
name: Radio group
system: glaze
kind: component
import: "import {RadioGroup, RadioGroupItem, RadioGroupOption} from '@/components/glaze/ui/radio-group'"
install: "npx shadcn@latest add https://design.how/r/glaze/radio-group.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/radio-group
---

# Radio group

Picks one of a few choices.

## Use when
- Exactly one of two to six choices, each needing a line about its consequence.
- A form setting saved with the form, where the person should compare before choosing.

## Don't use when
- Two to five views of the same thing, switched at once. Use [Segmented control](/systems/glaze/components/segmented-control.md).
- Any number can be on. Use [Checkbox](/systems/glaze/components/checkbox.md).
- A single on or off that applies at once. Use [Switch](/systems/glaze/components/switch.md).

## Minimal example
```tsx
<RadioGroup defaultValue="balanced" aria-label="Reply speed">
  <RadioGroupOption value="fast" label="Fast" description="About 2 seconds a reply."/>
  <RadioGroupOption value="balanced" label="Balanced" description="About 6 seconds."/>
</RadioGroup>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. radio-group-option MUST Use RadioGroupOption for each choice so its label and description share one target and are read together. Because a loose RadioGroupItem with text beside it has no name, and only the 16px circle takes the press.
   - Correct: `<RadioGroupOption value="fast" label="Fast" description="About 2 seconds a reply."/>`
   - Wrong: `<RadioGroupItem value="fast"/><span>Fast</span>`
2. radio-group-named MUST Name the group with a FieldLegend in a FieldSet, or aria-label. Because arrowing into an unnamed group, a screen reader announces the options with no question.
   - Correct: `<RadioGroup aria-label="Reply speed">…</RadioGroup>`
   - Wrong: `<RadioGroup>…</RadioGroup>`
3. radio-group-default MUST Give the group a value or defaultValue unless choosing nothing is a real answer. Because a radio cannot be cleared once chosen, so an empty start the person must fix looks like a missing default.
   - Correct: `<RadioGroup aria-label="Reply speed" defaultValue="balanced">…</RadioGroup>`
   - Wrong: `<RadioGroup aria-label="Reply speed">…</RadioGroup>`
4. radio-group-no-hue NEVER Colour the chosen radio or swap its small glaze for a flat fill. Because small glaze (glaze-sm) is how Glaze shows a chosen small control, and colour means status.
   - Correct: `<RadioGroupItem value="fast"/>`
   - Wrong: `<RadioGroupItem className="data-checked:bg-ok"/>`
5. radio-group-disabled-reason SHOULD Say why a disabled option is out of reach in its description.
   - Correct: `<RadioGroupOption value="ap" label="Tokyo" description="Available on the Scale plan." disabled/>`
6. radio-group-count SHOULD Keep a group to about six options; past that, use a select. Because a long column of circles pushes the rest of the form down and is slow to compare.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `value, defaultValue, onValueChange` | `Base UI RadioGroup` |  | The chosen value. |
| `aria-invalid` | `boolean` | `false` | On the group: every unchosen circle turns coral. |
| `disabled, readOnly, required, name` | `Base UI` |  | On the group or one item. |
| `RadioGroupOption label, description` | `ReactNode` |  | The choice and its consequence, one target. |
| `RadioGroupItem value` | `string` |  | A bare circle, for custom rows; name it. |
Other props pass through to the group div (Base UI RadioGroup); RadioGroupOption passes the rest to the radio.

## Variants and states
- checked: false, true
- states: rest, hover, held, focus-visible, chosen, invalid, disabled
- when states meet, the first wins: disabled > invalid > chosen > held > focus-visible > hover > rest

## Accessibility
- [ ] role="radiogroup" with one tab stop; each radio is named by its label and described by its consequence.
- [ ] The open circle is --line-strong, 3.3:1 on paper; the chosen one is small glaze with a white dot (9.5:1 at the centre), so it reads without colour.
- [ ] Each circle is 16px with a 28px hit area, and the whole option row is the target.
- [ ] Focus is the 2px ink ring on the circle.

## Keyboard
- `Arrow keys`: Move to the next or previous option and choose it, wrapping at the ends.
- `Space`: Chooses the focused option.
- `Tab`: Enters on the chosen option and leaves the group.

## Edge cases
- Long description -> Wraps under the label; the circle stays on the first line.
- Nothing chosen -> Tab lands on the first enabled option.
- Disabled option -> Arrow keys skip it; its text turns the disabled colour.
- Right to left -> The circle moves to the start with the label, and the arrows follow the reading order.
- Dark theme -> The chosen circle turns light glaze with a dark dot.
- Forced colors -> The chosen circle takes Highlight with a HighlightText dot.

## Tokens
--paper, --field, --pressed, --line-strong, --line-faint, --text-1, --text-2, --fail, --glaze-sm-top, --glaze-sm-mid, --glaze-sm-bottom, --glaze-sm-highlight, --glaze-sm-rim, --glaze-sm-text, --radius-pill, --type-label, --type-body-sm, --focus

## Related
- [Segmented control](/systems/glaze/components/segmented-control.md): Switches between a few views of one thing.
- [Checkbox](/systems/glaze/components/checkbox.md): Turns one option on or off.
- [Field](/systems/glaze/components/field.md): Gives an input its label and error.
