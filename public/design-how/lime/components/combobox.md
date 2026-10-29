---
name: Combobox
system: lime
kind: component
import: "import {Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxEmpty} from '@/components/lime/ui/combobox'"
install: "npx shadcn@latest add https://design.how/r/lime/combobox.json"
registryDependencies: [icon, input, popup, portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/combobox
---

# Combobox

Narrows a long list as you type, so you find the right item fast.

## Use when
- A long list: more than about 20 options.
- The person knows the name: a friend, a merchant, a country.

## Don't use when
- Up to about 20 options and no need to type. Use [Select](/systems/lime/components/select.md).
- Free text with no list. Use [Input](/systems/lime/components/input.md).
- Two to five options. Use [Radio](/systems/lime/components/radio.md).

## Minimal example
```tsx
<Field name="friend">
  <FieldLabel>Send to</FieldLabel>
  <Combobox items={friends}>
    <ComboboxInput placeholder="Find a friend"/>
    <ComboboxContent>
      <ComboboxEmpty>No friends match that name.</ComboboxEmpty>
      <ComboboxList>{(name: string) => <ComboboxItem key={name} value={name}>{name}</ComboboxItem>}</ComboboxList>
    </ComboboxContent>
  </Combobox>
</Field>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. combobox-in-field MUST Put a Combobox in a form inside Field with a FieldLabel; use aria-label only where there is no visible label, such as a toolbar. Because the visible label names the input for everyone, and a placeholder vanishes once the person types.
   - Correct: `<Field name="friend"><FieldLabel>Send to</FieldLabel><Combobox items={friends}>...</Combobox></Field>`
   - Wrong: `<p>Send to</p><Combobox items={friends}>...</Combobox>`
2. combobox-name MUST Pass aria-label to ComboboxInput when there is no visible label; the placeholder is not a name. Because without it a screen reader announces an unnamed combobox once typing hides the placeholder.
   - Correct: `<ComboboxInput aria-label="Find a friend" placeholder="Find a friend"/>`
   - Wrong: `<ComboboxInput placeholder="Find a friend"/>`
3. combobox-empty-message MUST Include a ComboboxEmpty that says what was searched. Because ComboboxList hides itself when empty, so the popup opens on nothing.
   - Correct:
     ```tsx
     <ComboboxContent><ComboboxEmpty>No friends match that name.</ComboboxEmpty><ComboboxList>...</ComboboxList></ComboboxContent>
     ```
   - Wrong: `<ComboboxContent><ComboboxList>...</ComboboxList></ComboboxContent>`
4. combobox-list-function MUST Pass items to the root and render ComboboxList with a function; do not map the array yourself. Because a mapped array skips the root's filter, so typing never narrows the list.
   - Correct: `<ComboboxList>{(name: string) => <ComboboxItem key={name} value={name}>{name}</ComboboxItem>}</ComboboxList>`
   - Wrong: `<ComboboxList>{friends.map(c => <ComboboxItem/>)}</ComboboxList>`
5. combobox-server-filter SHOULD Filter on the server and control inputValue when the list is too large to send.
   - Correct: `<Combobox items={matches} inputValue={q} onInputValueChange={setQ}>`
   - Wrong: `<Combobox items={allTransactions}> // 50,000`
6. combobox-item-label MUST Set itemToStringLabel when items are objects. Because an object with no label key shows and filters on its serialized JSON.
   - Correct: `<Combobox items={people} itemToStringLabel={p => p.name}>`
7. combobox-placeholder SHOULD Name the thing to find in the placeholder, not Search...
8. combobox-no-datalist NEVER Write an input with a datalist; use this Combobox. Because a datalist draws browser chrome that ignores Lime's tokens and has no empty message.
   - Correct: `<Combobox items={friends}>...</Combobox>`
   - Wrong: `<input list="friends"/><datalist id="friends">...</datalist>`
9. combobox-touch-hide-trigger SHOULD Use hideTrigger on phones; the 28px buttons are under the touch guideline and typing opens the list.
   - Correct: `<ComboboxInput hideTrigger aria-label="Find a friend"/>`
10. combobox-keep-list-height NEVER Remove the list max height; it scrolls at 288px. Because 200 countries then run past the screen edge with no scroll inside the popup.
   - Correct: `<ComboboxList>{renderCountry}</ComboboxList> // scrolls at max-h-72`
   - Wrong: `<ComboboxList className="max-h-none">`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `items` | `Array` |  | On Combobox. Base UI filters it as the person types. |
| `value, defaultValue, onValueChange` | `Value` |  | Controlled or uncontrolled chosen item. |
| `inputValue, onInputValueChange` | `string` |  | The input text, for server filtering. |
| `itemToStringLabel` | `(item) => string` |  | Required for object items. |
| `ComboboxInput showClear` | `boolean` | `false` | Adds a clear button. |
| `ComboboxInput hideTrigger` | `boolean` | `false` | Removes the caret button. |
| `disabled` | `boolean` | `false` | On Combobox. |
Other props pass through to each part's own element; ComboboxInput passes them to the input.

## Variants and states
- buttons: trigger, showClear, hideTrigger
- states: rest, selected, hover, focus-visible, open, highlighted, empty, invalid, disabled

## Accessibility
- [ ] The input is role combobox with aria-expanded, aria-controls and aria-activedescendant; the list is a listbox of options.
- [ ] Typing filters; Arrow Down and Up open and move the highlight; Enter chooses; Escape closes, then clears.
- [ ] Focus stays in the input while the list is open.
- [ ] The clear and caret buttons are named "Clear" and "Show options".

## Edge cases
- Long names -> Items truncate with an ellipsis and no tooltip; keep names short.
- 500 items -> Render and scroll inside the 288px list; the popup follows the input width.
- Right to left -> The buttons and the check move to the end edge on the left.
- No items -> The list hides and ComboboxEmpty shows; an empty query shows the whole list.
- Server filtering -> No loading row; keep the previous items until the new ones arrive.
- Inside a dialog -> The popup portals into the Lime scope; Escape closes the list first.
- Forced colors -> The input keeps its border; the highlighted item takes Highlight.

## Tokens
--field, --line-strong, --control, --accent-line, --ring, --danger, --radius-field, --fg-3, --surface-2, --fg, --raised, --shadow-menu, --radius-panel, --radius-md, --fg-disabled, --dur-base, --dur-fast, --ease-out, --scale-enter

## Related
- [Select](/systems/lime/components/select.md): One choice from a list, such as an account or a category.
- [Input](/systems/lime/components/input.md): One line of text, such as a merchant name or a search.
- [Field](/systems/lime/components/field.md): A label, a control, a hint and an error, wired together.
