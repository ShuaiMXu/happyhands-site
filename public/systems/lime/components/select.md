---
name: Select
system: lime
kind: component
import: "import {Select, SelectGroup, SelectLabel, SelectTrigger, SelectContent, SelectItem, triggerVariants} from '@/components/lime/ui/select'"
install: "npx shadcn@latest add https://happyhands.cc/r/lime/select.json"
registryDependencies: [icon, popup, portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/select
---

# Select

Picks one option from a list that pops up.

## Use when
- One of 6 to 20 options: an account, a currency, a country.
- A form where a list of radios would take too much room.

## Don't use when
- Two to five options fit in a row. Use [Segmented](/systems/lime/components/segmented.md).
- The options are a short list of radios. Use [Radio](/systems/lime/components/radio.md).
- More than about 20 options, or the person knows the name. Use [Combobox](/systems/lime/components/combobox.md).
- The options are commands, not values. Use [Dropdown menu](/systems/lime/components/dropdown-menu.md).

## Minimal example
```tsx
<Select items={accounts} defaultValue="savings">
  <SelectTrigger aria-label="Pay from"/>
  <SelectContent>
    {accounts.map(a => <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>)}
  </SelectContent>
</Select>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. select-items-prop MUST Pass items to the root so the trigger shows the label before the popup opens. Because without items the trigger shows the raw value, such as savings, until the first open.
   - Correct: `<Select items={accounts} defaultValue="savings">`
   - Wrong: `<Select defaultValue="savings">`
2. select-placeholder MUST Use placeholder on the trigger; never an item called "Select...". Because an empty item can be picked, checked and submitted as a real answer.
   - Correct: `<SelectTrigger placeholder="Choose an account"/>`
   - Wrong: `<SelectItem value="">Select...</SelectItem>`
3. select-short-lists SHOULD Show five or fewer options as Radio or Segmented when there is room.
4. select-no-native NEVER Use a native select; this Select matches the popup, check and focus. Because the native picker is drawn by the OS, with no Lime panel, check mark or accent edge.
   - Correct: `<Select items={accounts}>...</Select>`
   - Wrong: `<select name="account"><option>Savings</option><option>Checking</option></select>`
5. select-name MUST Pass aria-label to the trigger when there is no visible label. Because a screen reader reads the chosen account with nothing saying what it pays from.
   - Correct: `<SelectTrigger aria-label="Pay from"/>`
   - Wrong: `<SelectTrigger/>`
6. select-in-field MUST Wrap the select in Field with a FieldLabel, and put errors in FieldError. Because Field ties the label and the error to the trigger, so both are read with it.
   - Correct: `<Field name="account"><FieldLabel>Pay from</FieldLabel><Select>...</Select></Field>`
   - Wrong: `<label>Pay from</label><Select>...</Select>`
7. select-label-order SHOULD Write short sentence-case noun labels with the distinguishing word first.
8. select-popup-height NEVER Lift the popup height cap; lists scroll inside --popup-max. Because a long account list runs past the screen edge instead of scrolling inside the panel.
   - Correct: `<SelectContent>`
   - Wrong: `<SelectContent className="max-h-none">`
9. select-phone-size SHOULD Use size="lg" on the trigger in a phone form; items are 36px.
   - Correct: `<SelectTrigger size="lg"/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `items` | `Array<{value, label}> \| Record` |  | On Select. Lets the trigger show a label early. |
| `value, defaultValue, onValueChange` | `Value` |  | Base UI. Controlled or uncontrolled. |
| `SelectTrigger size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 32, 40 or 48px. |
| `SelectTrigger placeholder` | `string` |  | Shown while nothing is chosen. |
| `SelectItem value` | `Value` | `required` | The value this item sets. |
Other props pass through to each part's own element; SelectTrigger passes them to the trigger button.

## Variants and states
- size: sm, md, lg
- states: rest, placeholder, hover, focus-visible, open (item selected), invalid, disabled

## Accessibility
- [ ] The trigger is role combobox with aria-expanded; the popup is a listbox of options.
- [ ] Enter, Space or Arrow Down opens; arrows, Home, End and type-ahead move; Enter chooses; Escape closes.
- [ ] Focus returns to the trigger on close; Escape in a dialog closes the popup first.
- [ ] A highlighted item has only a fill, so forced colors paints it with Highlight.

## Edge cases
- Long label -> Trigger and items truncate with an ellipsis; keep labels short or widen the trigger.
- Narrow container -> The trigger has a 160px floor; set w-full min-w-0 to follow the container.
- Right to left -> Caret, padding and check mirror.
- No items -> The popup opens empty; render text instead of an empty Select.
- List loads late -> There is no loading row; render the select when items arrive.
- Inside a dialog -> The popup portals into the Lime scope and keeps the tokens.

## Tokens
--field, --line-strong, --fg, --fg-3, --control, --accent-line, --ring, --line-focus, --danger, --surface-2, --fg-disabled, --raised, --shadow-menu, --radius-panel, --radius-md, --popup-max, --dur-base, --dur-fast, --ease-out, --scale-enter

## Related
- [Combobox](/systems/lime/components/combobox.md): A searchable choice from a long list, such as friends or merchants.
- [Radio](/systems/lime/components/radio.md): One choice from a short visible list, such as a transfer speed.
- [Segmented](/systems/lime/components/segmented.md): A short row of exclusive options, such as Week, Month and Year.
- [Field](/systems/lime/components/field.md): A label, a control, a hint and an error, wired together.
