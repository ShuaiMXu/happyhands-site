---
name: Checkbox
system: sodium
kind: component
import: "import {Checkbox, CheckboxGroup} from '@/components/sodium/ui/checkbox'"
install: "npx shadcn@latest add https://design.how/r/sodium/checkbox.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/checkbox
---

# Checkbox

Turns one option on or off.

## Use when
- A form asks a yes or no that applies when the form is saved.
- The person picks any number from a short visible list, none included.
- Rows are selected for a bulk action, with select-all in the head.

## Don't use when
- The setting applies the moment it changes. Use [Switch](/systems/sodium/components/switch.md).
- Exactly one option can be chosen. Use [Radio group](/systems/sodium/components/radio-group.md).
- Two to five views of the same thing. Use [Segmented control](/systems/sodium/components/segmented-control.md).

## Minimal example
```tsx
<label className="flex items-center gap-3 type-label">
  <Checkbox name="retry" defaultChecked/>Retry failed partitions
</label>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. checkbox-label-wraps MUST Wrap the checkbox and its text in one <label> (or Label), or use a horizontal Field. Because a loose span is neither the accessible name nor the target, so a screen reader hears "checkbox" and only the 16px box toggles.
   - Correct: `<label className="flex items-center gap-3 type-label"><Checkbox/>Retry failed partitions</label>`
   - Wrong: `<Checkbox/> <span>Retry failed partitions</span>`
2. checkbox-parent-select-all MUST Build select-all as <Checkbox parent/> inside a CheckboxGroup with allValues; never work out mixed by hand. Because a hand toggle from mixed clears or fills everything, where parent cycles back to the set the person picked.
   - Correct: `<CheckboxGroup allValues={ids} value={value} onValueChange={setValue}><Checkbox parent/>…</CheckboxGroup>`
   - Wrong: `<Checkbox checked={all} indeterminate={some && !all} onCheckedChange={toggleAll}/>`
3. checkbox-no-yellow NEVER Fill a ticked box by hand, in yellow or a status colour; the checked recipe already fills it. Because a hand-set fill drops the ink tick, the gold edge and the light, and green or red reads as a job's status; the checked recipe is yellow under an ink tick in light and the yellow tint in dark.
   - Correct: `<Checkbox/>`
   - Wrong: `<Checkbox className="data-checked:bg-accent-fill"/>`
4. checkbox-invalid-after-try MUST Set aria-invalid only after a submit or a press on the action, never on the first render. Because a red box before the person has done anything blames them for nothing.
   - Correct: `<Checkbox aria-invalid={tried && !checked}/>`
   - Wrong: `<Checkbox aria-invalid={!checked}/>`
5. checkbox-mixed-glyph MUST Show mixed with indeterminate (the bar), never a lighter fill. Because a lighter fill reads as disabled, and forced colors drop it so mixed looks unticked.
   - Correct: `<Checkbox indeterminate/>`
   - Wrong: `<Checkbox className="opacity-50" checked/>`
6. checkbox-positive-label SHOULD Say what ticking does, in the positive. Because a negative label makes the person undo a double negative to know what happens.
   - Correct: `<label><Checkbox/>Write empty partitions</label>`
   - Wrong: `<label><Checkbox/>Do not skip empty partitions</label>`
7. checkbox-wrap-start SHOULD Use items-start on a row whose label can wrap or carries a description.
   - Correct: `<label className="flex items-start gap-3"><Checkbox/>…</label>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `checked, defaultChecked, onCheckedChange` | `Base UI Checkbox` |  | Controlled or not. |
| `indeterminate` | `boolean` | `false` | Mixed: the checked fill with a bar. |
| `parent` | `boolean` | `false` | Inside a CheckboxGroup with allValues: select-all. |
| `value` | `string` |  | Its value inside a CheckboxGroup. |
| `aria-invalid` | `boolean` | `false` | The red edge on an unticked box. |
| `disabled, readOnly, required, name` | `Base UI` |  | name submits through a hidden input. |
| `CheckboxGroup value, onValueChange, allValues` | `string[]` |  | One array for the set. |
Other props pass through to the checkbox root (Base UI Checkbox.Root).

## Variants and states
- checked: false, true, indeterminate
- states: rest, hover, held, focus-visible, ticked, mixed, invalid, disabled
- when states meet, the first wins: disabled > invalid > mixed > ticked > held > focus-visible > hover > rest

## Accessibility
- [ ] role="checkbox" with aria-checked true, false or mixed, named by the wrapping label.
- [ ] The unticked edge is --line-control, 3.5:1 on its body and 3.7:1 on it lifted to white (WCAG 1.4.11).
- [ ] Ticked is sodium yellow with a gold edge and an ink tick, 12.8:1, in light; the dark yellow tint with a yellow edge and tick, 9.0:1, in dark. The box is lit from below.
- [ ] The mark is aria-hidden; mixed reads without colour through the bar.
- [ ] The box is 16px with a 28px hit area, and the label makes the whole row the target.
- [ ] Focus is the 2px --focus ring, 2px out.

## Keyboard
- `Space`: Toggles; a parent cycles all, none, then the set the person picked.

## Edge cases
- Long wrapping label -> Use items-start so the box sits on the first line.
- No label -> Announced as "checkbox" with no name; pass aria-label.
- Inside a clickable row -> The box stops its click from bubbling, so the row does not open.
- Select-all over hundreds of values -> The parent reads the value array, not the rendered boxes.
- Forced colors -> Ticked takes Highlight with a HighlightText tick and no light; unticked draws a CanvasText edge.
- Reduced motion -> The fill and its light cut in with no fade.

## Tokens
--check-off, --check-off-hover, --well, --line-control, --line, --fail, --check-bg, --check-edge, --check-mark, --primary-light, --primary-light-hover, --focus, --dur-light, --dur-glow, --ease-soft

## Related
- [Switch](/systems/sodium/components/switch.md): Turns a setting on or off at once.
- [Radio group](/systems/sodium/components/radio-group.md): Picks one of a few choices.
- [Field](/systems/sodium/components/field.md): Gives an input its label and error.
