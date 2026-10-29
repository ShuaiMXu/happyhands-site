---
name: Checkbox
system: glaze
kind: component
import: "import {Checkbox, CheckboxGroup} from '@/components/glaze/ui/checkbox'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/checkbox.json"
registryDependencies: [icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/checkbox
---

# Checkbox

Turns one option on or off.

## Use when
- A form asks a yes or no that applies when the form is saved.
- The person picks any number from a short visible list, none included.
- Rows are selected for a bulk action, with select-all in the head.

## Don't use when
- The setting applies the moment it changes. Use [Switch](/systems/glaze/components/switch.md).
- Exactly one option can be chosen. Use [Radio group](/systems/glaze/components/radio-group.md).
- Two to five views of the same thing. Use [Segmented control](/systems/glaze/components/segmented-control.md).

## Minimal example
```tsx
<label className="flex items-center gap-3 type-label">
  <Checkbox name="redact" defaultChecked/>Redact emails in logs
</label>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. checkbox-label-wraps MUST Wrap the checkbox and its text in one <label> (or Label), or use a horizontal Field. Because a loose span is neither the accessible name nor the target, so a screen reader hears "checkbox" and only the 16px box toggles.
   - Correct: `<label className="flex items-center gap-3 type-label"><Checkbox/>Redact emails in logs</label>`
   - Wrong: `<Checkbox/> <span>Redact emails in logs</span>`
2. checkbox-parent-select-all MUST Build select-all as <Checkbox parent/> inside a CheckboxGroup with allValues; never work out mixed by hand. Because a hand toggle from mixed clears or fills everything, where parent cycles back to the set the person picked.
   - Correct: `<CheckboxGroup allValues={ids} value={value} onValueChange={setValue}><Checkbox parent/>…</CheckboxGroup>`
   - Wrong: `<Checkbox checked={all} indeterminate={some && !all} onCheckedChange={toggleAll}/>`
3. checkbox-invalid-after-try MUST Set aria-invalid only after a submit or a press on the action, never on the first render. Because a coral box before the person has done anything blames them for nothing.
   - Correct: `<Checkbox aria-invalid={tried && !checked}/>`
   - Wrong: `<Checkbox aria-invalid={!checked}/>`
4. checkbox-glaze-stays-ink NEVER Colour a ticked box or replace its small glaze with a flat fill. Because small glaze (glaze-sm) is how Glaze shows a chosen small control, and a coloured tick reads as a status.
   - Correct: `<Checkbox/>`
   - Wrong: `<Checkbox className="data-checked:bg-ok"/>`
5. checkbox-mixed-glyph MUST Show mixed with indeterminate (the minus), never a lighter fill. Because a lighter fill reads as disabled, and forced colors drop it so mixed looks unticked.
   - Correct: `<Checkbox indeterminate/>`
   - Wrong: `<Checkbox className="opacity-50" checked/>`
6. checkbox-positive-label SHOULD Say what ticking does, in the positive. Because a negative label makes the person undo a double negative to know what happens.
   - Correct: `<label><Checkbox/>Review flagged replies</label>`
   - Wrong: `<label><Checkbox/>Do not skip flagged replies</label>`
7. checkbox-wrap-start SHOULD Use items-start on a row whose label can wrap or carries a description.
   - Correct: `<label className="flex items-start gap-3"><Checkbox/>…</label>`
8. checkbox-list-length SHOULD Keep a list of boxes to about eight; past that, search belongs in front of it.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `checked, defaultChecked, onCheckedChange` | `Base UI Checkbox` |  | Controlled or not. |
| `indeterminate` | `boolean` | `false` | Mixed: small glaze with a dash. |
| `parent` | `boolean` | `false` | Inside a CheckboxGroup with allValues: select-all. |
| `value` | `string` |  | Its value inside a CheckboxGroup. |
| `aria-invalid` | `boolean` | `false` | The coral line on an unticked box. |
| `disabled, readOnly, required, name` | `Base UI` |  | name submits through a hidden input. |
| `CheckboxGroup value, onValueChange, allValues` | `string[]` |  | One array for the set. |
Other props pass through to the checkbox root (Base UI Checkbox.Root).

## Variants and states
- checked: false, true, indeterminate
- states: rest, hover, held, focus-visible, ticked, mixed, invalid, disabled
- when states meet, the first wins: disabled > invalid > mixed > ticked > held > focus-visible > hover > rest

## Accessibility
- [ ] role="checkbox" with aria-checked true, false or mixed, named by the wrapping label.
- [ ] The unticked line is --line-strong, 3.3:1 on paper (WCAG 1.4.11); ticked is small glaze, a lifted grey to ink, its white tick 6.7:1 or more where it sits (4.8:1 at the very top row).
- [ ] The glyph is aria-hidden; mixed reads without colour through the minus.
- [ ] The box is 16px with a 28px hit area, and the label makes the whole row the target.
- [ ] A group is role="group" named by aria-labelledby.
- [ ] Focus is the 2px ink ring, 2px out.

## Keyboard
- `Space`: Toggles; a parent cycles all, none, then the set the person picked.

## Edge cases
- Long wrapping label -> Use items-start so the box sits on the first line.
- No label -> Announced as "checkbox" with no name; pass aria-label.
- Inside a clickable row -> The box stops its click from bubbling, so the row does not open.
- Select-all over hundreds of values -> The parent reads the value array, not the rendered boxes.
- Dark theme -> Ticked turns light glaze with a dark glyph, 10.5:1 or more; unticked is near-black with a 45% line.
- Forced colors -> The glaze drops to Highlight with a HighlightText glyph; unticked draws a CanvasText border.
- Reduced motion -> No press scale; the tick appears at once.

## Tokens
--paper, --field, --pressed, --line-strong, --line-faint, --text-2, --fail, --glaze-sm-top, --glaze-sm-mid, --glaze-sm-bottom, --glaze-sm-highlight, --glaze-sm-rim, --glaze-sm-text, --radius-tag, --focus, --dur-state, --dur-press

## Related
- [Switch](/systems/glaze/components/switch.md): Turns a setting on or off at once.
- [Radio group](/systems/glaze/components/radio-group.md): Picks one of a few choices.
- [Field](/systems/glaze/components/field.md): Gives an input its label and error.
