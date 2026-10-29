---
name: Select
system: sodium
kind: component
import: "import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, NativeSelect, fieldTriggerClass, fieldTriggerSize} from '@/components/sodium/ui/select'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/select.json"
registryDependencies: [field, icon, overlay, portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/select
---

# Select

Picks one option from a list.

## Use when
- One choice from about five to thirty options known up front: a region, a warehouse size, a schedule.
- A form on phones or one built from a schema (native).

## Don't use when
- Two to five options that fit on screen. Use [Radio group](/systems/sodium/components/radio-group.md).
- More than thirty options, or the person types the name. Use [Combobox](/systems/sodium/components/combobox.md).
- The choice switches a view on this page. Use [Segmented control](/systems/sodium/components/segmented-control.md).
- A list of actions, not a value: use a menu, whose rows are actions in mono capitals.

## Minimal example
```tsx
<Field>
  <FieldLabel>Region</FieldLabel>
  <Select items={regions} defaultValue="eu-west-2">
    <SelectTrigger><SelectValue placeholder="Pick a region"/></SelectTrigger>
    <SelectContent>{regions.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}</SelectContent>
  </Select>
</Field>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. select-items-prop MUST Pass the options as items on Select as well as rendering SelectItems. Because Base UI reads the chosen label from items, so without it the trigger shows the raw value until the popup first opens.
   - Correct: `<Select items={regions} defaultValue="eu-west-2">…</Select>`
   - Wrong: `<Select defaultValue="eu-west-2">…</Select>`
2. select-label MUST Name the trigger with a Field and FieldLabel, or aria-label; its text is the value, not the question. Because a screen reader hears "eu-west-2, combobox" with no question.
   - Correct: `<Field><FieldLabel>Region</FieldLabel><Select items={regions}>…</Select></Field>`
   - Wrong: `<SelectTrigger><SelectValue/></SelectTrigger>`
3. select-placeholder MUST Say what to pick with SelectValue placeholder; never add a None option. Because a None row counts as a real value, so a required field passes empty and the list gains a fake row.
   - Correct: `<SelectValue placeholder="Pick a region"/>`
   - Wrong: `<SelectItem value="">None</SelectItem>`
4. select-thirty MUST Use Combobox past thirty options or for options that load. Because the popup stops at 320px, ten rows, and has no search or loading state to reach the rest.
   - Correct: `<ComboboxField items={allPipelines}/>`
   - Wrong: `<Select items={allPipelines}/>`
5. select-no-ring NEVER Draw a ring, an outline or a shadow on SelectTrigger to show focus or the open popup. Because the trigger is a field, and a field shows focus itself, white with the gold edge doubled inward and a 1px pale halo; a ring outside that reads as a second box.
   - Correct: `<SelectTrigger>`
   - Wrong: `<SelectTrigger className="focus-visible:ring-2 shadow-sm">`
6. select-rows-line-up NEVER Pad an option or a label in className, or move the check to the start. Because an option's text starts on the trigger's own text inset, 11.5px from the edge at 32px, so the value you chose and the list line up; a leading check column pushes every option 26px past the trigger's text.
   - Correct: `<SelectItem value="eu-west-2">eu-west-2</SelectItem>`
   - Wrong: `<SelectItem value="eu-west-2" className="ps-9">eu-west-2</SelectItem>`
7. select-size-prop NEVER Round the trigger or set its height in className; pass size. Because every corner in Sodium is square, and a fixed height clips the value at 200% zoom.
   - Correct: `<SelectTrigger size="lg">`
   - Wrong: `<SelectTrigger className="h-10 rounded-md">`
8. select-size-matches SHOULD Pass size="sm" to SelectContent when the trigger is size="sm", so 26px rows match the 26px trigger.
   - Correct:
     ```tsx
     <SelectTrigger size="sm">…</SelectTrigger>
     <SelectContent size="sm">
     ```
9. select-native-phones SHOULD Use native for a form used mostly on phones or generated from a schema.
   - Correct: `<Select native items={schema.enum.map(v => ({value: v, label: v}))} aria-label="Region"/>`
10. select-invalid SHOULD Set aria-invalid on the trigger after a submit and say why in the FieldError.
   - Correct:
     ```tsx
     <SelectTrigger aria-invalid>…</SelectTrigger>
     <FieldError>Pick the region the job runs in.</FieldError>
     ```

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Select items` | `{value, label, disabled?}[] \| Record` |  | The options. Required with native. |
| `Select value, defaultValue, onValueChange` | `string \| null` |  | null is no choice. |
| `Select native, size, placeholder` | `boolean, 'sm' \| 'default' \| 'lg', string` | `false, 'default'` | The platform select on the same field. |
| `SelectTrigger size` | `'sm' \| 'default' \| 'lg'` | `'default'` | 26, 32 or 36px. |
| `SelectTrigger aria-invalid` | `boolean` | `false` | The red edge. |
| `SelectValue placeholder` | `ReactNode` |  | In text-3 until a choice. |
| `SelectContent size` | `'default' \| 'sm'` | `'default'` | 32px rows, or 26px in the 13px caption. |
| `SelectContent side, align, alignItemWithTrigger` | `Base UI` | `'bottom', 'start', false` | Where the popup opens. |
| `SelectGroup, SelectLabel, SelectSeparator` | `Base UI` |  | Labelled groups of options. |
Other props pass through to the root element.

## Variants and states
- size: sm, default, lg
- native: false, true
- states: rest, placeholder, hover, focus, open, highlighted row, chosen row, invalid, disabled
- when states meet, the first wins: disabled > invalid > open > focus > hover > rest

## Accessibility
- [ ] The trigger is a combobox with aria-haspopup="listbox", aria-expanded and aria-invalid; the popup is a listbox of options with aria-selected.
- [ ] The highlighted row lifts to white between two --line hairlines, the focus indicator inside the popup, text-1 on it 18.3:1 and 13:1; forced colors draw a 2px outline on it.
- [ ] The chosen row has an ink check as well as aria-selected and no fill, so it never rests on colour.
- [ ] Focus or the open popup turn the trigger white with its edge --focus at 2px, 6.2:1 in light and 12.9:1 in dark, and a pale halo; the caret and the value stay.
- [ ] native keeps the platform picker, screen reader and keyboard, and sets 16px text under a coarse pointer.

## Keyboard
- `Enter, Space, Down, Up`: On the trigger: opens with the chosen row highlighted.
- `A letter`: Jumps to the next option starting with it, open or closed.
- `Enter`: Picks the highlighted row and returns focus to the trigger.
- `Escape`: Closes without a change.

## Edge cases
- Long value -> Truncates with an ellipsis in the trigger and the row; the popup stops at --popover wide.
- Forty options -> The list scrolls inside 320px between scroll arrows; use a Combobox.
- Near the viewport bottom -> The popup flips above the trigger and stays 8px inside.
- Right to left -> The check and the caret swap sides with the text.
- Zoom 200% -> The field grows past its token with the text.
- Inside a Dialog -> The popup portals above it; Escape closes the popup only.
- Disabled Field -> The trigger drops to the well with the Field.

## Tokens
--field-bg, --field-hover, --field-edge-hover, --field-ring-hover, --field-focus-bg, --field-ring-focus, --field-ring-fail, --field-inset-sm, --field-inset, --field-inset-lg, --row-highlight, --row-highlight-edge, --panel, --well, --line, --focus, --fail, --text-1, --text-3, --text-disabled, --control-sm, --control, --control-lg, --row-sm, --menu-min, --popup-max, --popover, --type-body-sm, --type-caption, --type-micro, --icon, --icon-sm

## Related
- [Combobox](/systems/sodium/components/combobox.md): Finds one or more values by typing.
- [Radio group](/systems/sodium/components/radio-group.md): Picks one of a few choices.
- [Segmented control](/systems/sodium/components/segmented-control.md): Switches between a few views of one thing.
- [Field](/systems/sodium/components/field.md): Gives an input its label and error.
