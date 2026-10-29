---
name: Select
system: glaze
kind: component
import: "import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, NativeSelect, fieldTriggerClass, fieldTriggerSize} from '@/components/glaze/ui/select'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/select.json"
registryDependencies: [field, icon, overlay, portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/select
---

# Select

Picks one option from a list.

## Use when
- One choice from about five to thirty options known up front: a model, a region, a reply language.
- A form on phones or one built from a schema (native).

## Don't use when
- Two to five options that fit on screen. Use [Radio group](/systems/glaze/components/radio-group.md).
- More than thirty options, or the person types the name. Use [Combobox](/systems/glaze/components/combobox.md).
- The choice switches a view on this page. Use [Segmented control](/systems/glaze/components/segmented-control.md).
- A list of actions, not a value. Use [Dropdown menu](/systems/glaze/components/dropdown-menu.md).

## Minimal example
```tsx
<Field>
  <FieldLabel>Model</FieldLabel>
  <Select items={models} defaultValue="glaze-large">
    <SelectTrigger><SelectValue placeholder="Pick a model"/></SelectTrigger>
    <SelectContent>{models.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}</SelectContent>
  </Select>
</Field>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. select-items-prop MUST Pass the options as items on Select as well as rendering SelectItems. Because Base UI reads the chosen label from items, so without it the trigger shows the raw value until the popup first opens.
   - Correct: `<Select items={models} defaultValue="glaze-large">…</Select>`
   - Wrong: `<Select defaultValue="glaze-large">…</Select>`
2. select-label MUST Name the trigger with a Field and FieldLabel, or aria-label; its text is the value, not the question. Because a screen reader hears "glaze-large, combobox" with no question.
   - Correct: `<Field><FieldLabel>Model</FieldLabel><Select items={models}>…</Select></Field>`
   - Wrong: `<SelectTrigger><SelectValue/></SelectTrigger>`
3. select-placeholder MUST Say what to pick with SelectValue placeholder; never add a None option. Because a None row counts as a real value, so a required field passes empty and the list gains a fake row.
   - Correct: `<SelectValue placeholder="Pick a model"/>`
   - Wrong: `<SelectItem value="">None</SelectItem>`
4. select-thirty MUST Use Combobox past thirty options or for options that load. Because the popup stops at 320px, about nine rows, and has no search or loading state to reach the rest.
   - Correct: `<ComboboxField items={allAgents}/>`
   - Wrong: `<Select items={allAgents}/>`
5. select-no-ring NEVER Draw a ring, a shadow or a black line on SelectTrigger to show focus or the open popup. Because the trigger is a field, and a field shows focus by darkening its own line; a ring makes it read as a button.
   - Correct: `<SelectTrigger>`
   - Wrong: `<SelectTrigger className="focus-visible:ring-2 shadow-sm">`
6. select-pill NEVER Square off the trigger or set its height in className; pass size. Because every one-line control is a pill, and a fixed height clips the value at 200% zoom.
   - Correct: `<SelectTrigger size="lg">`
   - Wrong: `<SelectTrigger className="h-10 rounded-tag">`
7. select-size-matches SHOULD Pass size="sm" to SelectContent when the trigger is size="sm", so 28px rows match the 26px trigger.
   - Correct:
     ```tsx
     <SelectTrigger size="sm">…</SelectTrigger>
     <SelectContent size="sm">
     ```
8. select-native-phones SHOULD Use native for a form used mostly on phones or generated from a schema.
   - Correct: `<Select native items={schema.enum.map(v => ({value: v, label: v}))} aria-label="Region"/>`
9. select-invalid SHOULD Set aria-invalid on the trigger after a submit and say why in the FieldError.
   - Correct:
     ```tsx
     <SelectTrigger aria-invalid>…</SelectTrigger>
     <FieldError>Pick the model replies use.</FieldError>
     ```

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Select items` | `{value, label, disabled?}[] \| Record` |  | The options. Required with native. |
| `Select value, defaultValue, onValueChange` | `string \| null` |  | null is no choice. |
| `Select native, size, placeholder` | `boolean, 'sm' \| 'default' \| 'lg', string` | `false, 'default'` | The platform select on the pill. |
| `SelectTrigger size` | `'sm' \| 'default' \| 'lg'` | `'default'` | 26, 32 or 36px. |
| `SelectTrigger aria-invalid` | `boolean` | `false` | The coral line. |
| `SelectValue placeholder` | `ReactNode` |  | In text-3 until a choice. |
| `SelectContent size` | `'default' \| 'sm'` | `'default'` | 32px rows, or 28px in the 12px label. |
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
- [ ] The highlighted row's wash is the focus indicator inside the popup; forced colors draw a 2px outline on it.
- [ ] The chosen row has a check as well as aria-selected, so it never rests on colour.
- [ ] Focus darkens the trigger's line to --line-focus (2.3:1 on paper); the caret and the value stay.
- [ ] native keeps the platform picker, screen reader and keyboard, and sets 16px text under a coarse pointer.

## Keyboard
- `Enter, Space, Down, Up`: On the trigger: opens with the chosen row highlighted.
- `A letter`: Jumps to the next option starting with it, open or closed.
- `Enter`: Picks the highlighted row and returns focus to the trigger.
- `Escape`: Closes without a change.

## Edge cases
- Long label -> Truncates with an ellipsis in the trigger and the row; the popup stops at --popover wide.
- Forty options -> The list scrolls inside 320px between scroll arrows; use a Combobox.
- Near the viewport bottom -> The popup flips above the trigger and stays 8px inside.
- Right to left -> The check and the caret swap sides.
- Zoom 200% -> The pill grows past its token with the text.
- Inside a Dialog -> The popup portals above it; Escape closes the popup only.
- Disabled Field -> The trigger goes grey with the Field.

## Tokens
--paper, --field, --line-control, --line-focus, --line-faint, --line, --fail, --flat-hover, --hover, --text-1, --text-3, --text-disabled, --control-sm, --control, --control-lg, --menu-row, --menu-row-sm, --menu-min, --popup-max, --popover, --radius-pill, --radius-overlay, --radius-tag, --type-body-sm, --type-label

## Related
- [Combobox](/systems/glaze/components/combobox.md): Finds one or more values by typing.
- [Radio group](/systems/glaze/components/radio-group.md): Picks one of a few choices.
- [Segmented control](/systems/glaze/components/segmented-control.md): Switches between a few views of one thing.
- [Dropdown menu](/systems/glaze/components/dropdown-menu.md): Lists the actions on one thing.
- [Field](/systems/glaze/components/field.md): Gives an input its label and error.
