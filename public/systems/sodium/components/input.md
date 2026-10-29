---
name: Input
system: sodium
kind: component
import: "import {Input, InputAction, InputControl, InputLeading, InputPending, InputRoot, InputTrailing} from '@/components/sodium/ui/input'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/input.json"
registryDependencies: [button, copy-button, field, icon, kbd, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/input
---

# Input

Takes one line of text.

## Use when
- The answer fits on one line: a name, an email, a URL, a bucket path, a limit.
- The person filters a list already on the page (mode="search").
- The person reads a value to paste elsewhere, like an endpoint or a connection string (mode="copy").

## Don't use when
- The answer runs to more than one line, like a query or a note. Use [Textarea](/systems/sodium/components/textarea.md).
- The value is one of a known list. Use [Select](/systems/sodium/components/select.md).
- The value is on or off and applies at once. Use [Switch](/systems/sodium/components/switch.md).

## Minimal example
```tsx
<Field>
  <FieldLabel>Pipeline name</FieldLabel>
  <Input placeholder="ingest-prod" autoComplete="off"/>
</Field>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. input-in-field MUST Put an Input in a Field with a FieldLabel, or give it aria-label when a visible label sits elsewhere. Because a placeholder vanishes on the first keystroke and is not a reliable accessible name.
   - Correct: `<Field><FieldLabel>Pipeline name</FieldLabel><Input/></Field>`
   - Wrong: `<Input placeholder="Pipeline name"/>`
2. input-slots-inside MUST Pass an icon, a scheme, a unit or a button as leading or trailing, never beside the Input. Because outside the edge it sits outside the line that turns gold on focus, and a press on it does not put the cursor in the text.
   - Correct: `<Input leading={<Icon icon={Search}/>}/>`
   - Wrong: `<div className="flex gap-2"><Icon icon={Search}/><Input/></div>`
3. input-action-component MUST Use InputAction for a button inside the field; it is a cell of the field, its full height and flush with the edge. Because a plain Button keeps its own height and edge, so it floats inside the field with a double line beside it.
   - Correct: `<Input trailing={<InputAction size="text" variant="primary">Connect</InputAction>}/>`
   - Wrong: `<Input trailing={<Button size="sm">Connect</Button>}/>`
4. input-one-slab MUST Give a primary InputAction only to a field that is a whole one-line form, with no other slab beside it. Because the slab at the field's end is the group's one action, and a second one next to it splits the eye.
   - Correct: `<Input trailing={<InputAction variant="primary" size="text">Connect</InputAction>}/>`
   - Wrong:
     ```tsx
     <Input trailing={<InputAction variant="primary" size="text">Connect</InputAction>}/>
     <Button>Continue</Button>
     ```
5. input-no-ring NEVER Draw a ring, an outline or a shadow on an Input to show focus. Because the field draws its own focus, a white body with the gold edge doubled inward and a 1px pale yellow halo, and a second ring outside it reads as another box.
   - Correct: `<Input/>`
   - Wrong: `<Input className="focus-within:ring-2 focus-within:ring-focus"/>`
6. input-size-prop NEVER Set an Input's height, corners, text size or side padding in className; pass size. Because corners are square, a fixed height clips at 200% zoom, and the size sets the inset so the nearest thing you see sits as far from the side as from the top: text 10px in at 32px, a glyph 7px, a key cap 5px, measured.
   - Correct: `<Input mode="search" size="lg"/>`
   - Wrong: `<Input mode="search" className="h-10 rounded-md px-3"/>`
7. input-mono-values MUST Set mono on a field that holds an ID, a key, a path or a command; leave names and emails in the sans. Because mono keeps every character the same width, so 0 and O, l and 1 are told apart, while a name in mono reads as code.
   - Correct: `<Input mono defaultValue="lake://events/2026-10-18"/>`
   - Wrong: `<Input defaultValue="lake://events/2026-10-18"/>`
8. input-search-mode MUST Use mode="search" for a search box, never an icon placed over an input. Because a hand-placed icon misses the clear button, Escape to clear, the pending mark and the key hint.
   - Correct: `<Input mode="search" aria-label="Search jobs"/>`
   - Wrong: `<div className="relative"><Icon icon={Search} className="absolute start-3"/><Input/></div>`
9. input-one-shortcut MUST Give shortcut to one search per page; pass shortcutOwner={false} on another that only shows the hint. Because only the first claiming field in document order gets the key, so a second claim does nothing.
   - Correct:
     ```tsx
     <Input mode="search" shortcut="/"/>
     <Input mode="search" shortcut="/" shortcutOwner={false}/>
     ```
   - Wrong:
     ```tsx
     <Input mode="search" shortcut="/"/>
     <Input mode="search" shortcut="/"/>
     ```
10. input-type-autocomplete SHOULD Set type and autoComplete on an email, a URL or a phone number. Because without type a phone shows the text keyboard and autofill cannot offer the address.
   - Correct: `<Input type="email" autoComplete="email" placeholder="ops@company.com"/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `mode` | `'text' \| 'password' \| 'search' \| 'copy'` | `'text'` | Picks the props below. |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | 26, 32 or 36px. Match the buttons beside it. |
| `leading, trailing` | `ReactNode` |  | Inside the edge. text takes both; password and copy take leading. |
| `mono` | `boolean` | `false` | The value in Commit Mono as written. copy defaults to true. |
| `aria-invalid` | `boolean` |  | Turns the edge red. A Field sets it for you. |
| `className, controlClassName` | `string` |  | className on the box (width, placement); controlClassName on the input. |
| `defaultRevealed` | `boolean` | `false` | password: starts shown. |
| `shortcut, shortcutOwner, pending, clearLabel` | `string, boolean, boolean, string` | `, true, false, 'Clear search'` | search. The first owner in document order takes the key. |
| `value, noun, onCopy` | `string, string, (v) => void` |  | copy: a read-only value with a Copy button; noun names it. |
| `InputAction size, variant` | `'icon' \| 'text', 'ghost' \| 'primary'` | `'icon', 'ghost'` | A cell of the field. Icon size needs aria-label. |
Other props pass through to the input element; className and style go to the box around it, controlClassName to the input.

## Variants and states
- mode: text, password, search, copy
- size: sm, default, lg
- states: rest, hover, focus, filled, invalid, disabled, read-only
- when states meet, the first wins: disabled > invalid > focus > read-only > hover > rest

## Accessibility
- [ ] The control is a native textbox named by FieldLabel or aria-label, with aria-invalid and aria-describedby from the Field.
- [ ] The edge is --line, the rule colour, 1.3:1 on the page, so the label, the placeholder and the off-white fill identify the field; focus turns it --focus at 2px, 6.2:1 in light and 12.9:1 in dark, with a pale halo outside, and forced colours draw a Highlight outline.
- [ ] Invalid adds the error sentence under the field, so it never rests on the red edge alone.
- [ ] The password toggle sets aria-pressed and names itself Show or Hide; its glyph changes with it.
- [ ] Escape in a search clears the query; a second Escape leaves the field. The key hint is aria-hidden.
- [ ] Text is 16px under a coarse pointer, so a phone browser never zooms the page on focus.

## Keyboard
- `Escape`: In a search, clears the query; with no query, leaves the field.
- `/ (or the shortcut)`: Focuses the search that owns it, from anywhere outside a field, dialog or menu.
- `Enter`: Submits the form around it.

## Edge cases
- Long value -> Scrolls inside the field; a copy value truncates and still copies all of it.
- Narrow row, 160px -> The text shrinks before any slot; slots and actions keep their size.
- Right to left -> Leading and trailing swap sides; a scheme like https:// keeps its own order.
- Zoom 200% -> The field grows with the text past its token, and its action cells grow with it.
- Slow search -> The magnifier turns into the pending mark in the same width, so the text never moves.
- Disabled Field or FieldSet -> The text, the slots and every action inside go quiet together.

## Tokens
--field-bg, --field-hover, --field-edge, --field-edge-hover, --field-ring-hover, --field-focus-bg, --field-ring-focus, --field-ring-fail, --field-inset-sm, --field-inset, --field-inset-lg, --well, --focus, --fail, --text-1, --text-2, --text-3, --text-disabled, --control-sm, --control, --control-lg, --line-width, --type-body-sm, --type-caption, --type-body, --type-code, --type-code-sm, --icon, --icon-sm, --pending-cell, --dur-light, --ease-soft

## Related
- [Field](/systems/sodium/components/field.md): Gives an input its label and error.
- [Textarea](/systems/sodium/components/textarea.md): Takes several lines of text.
- [Copy button](/systems/sodium/components/copy-button.md): Copies a value.
- [Combobox](/systems/sodium/components/combobox.md): Finds one or more values by typing.
