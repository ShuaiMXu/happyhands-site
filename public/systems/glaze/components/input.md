---
name: Input
system: glaze
kind: component
import: "import {Input, InputAction, InputControl, InputLeading, InputRoot, InputTrailing} from '@/components/glaze/ui/input'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/input.json"
registryDependencies: [button, copy-button, field, icon, kbd, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/input
---

# Input

Takes one line of text.

## Use when
- The answer fits on one line: a name, an email, a URL, an ID, an amount.
- The person filters a list already on the page (mode="search").
- The person reads a value to paste elsewhere, like an endpoint (mode="copy").

## Don't use when
- The answer runs to more than one line, like a prompt. Use [Textarea](/systems/glaze/components/textarea.md).
- The value is on or off and applies at once. Use [Switch](/systems/glaze/components/switch.md).
- The person picks one of two to five views. Use [Segmented control](/systems/glaze/components/segmented-control.md).

## Minimal example
```tsx
<Field>
  <FieldLabel>Agent name</FieldLabel>
  <Input placeholder="refund-triage" autoComplete="off"/>
</Field>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. input-in-field MUST Put an Input in a Field with a FieldLabel, or give it aria-label when a visible label sits elsewhere. Because a placeholder vanishes on the first keystroke and is not a reliable accessible name.
   - Correct: `<Field><FieldLabel>Agent name</FieldLabel><Input/></Field>`
   - Wrong: `<Input placeholder="Agent name"/>`
2. input-slots-inside MUST Pass an icon, a scheme, a unit or a button as leading or trailing, never beside the Input. Because outside the pill it sits outside the line that darkens on focus, and a press on it does not put the cursor in the text.
   - Correct: `<Input leading={<Icon icon={Globe}/>}/>`
   - Wrong: `<div className="flex gap-2"><Icon icon={Globe}/><Input/></div>`
3. input-action-component MUST Use InputAction for a button inside the pill; it sits 3px inside the line at every size. Because a plain Button keeps its own height and spills past the pill, or leaves an uneven gap.
   - Correct: `<Input trailing={<InputAction size="text" variant="primary">Join</InputAction>}/>`
   - Wrong: `<Input trailing={<Button size="sm">Join</Button>}/>`
4. input-one-ink MUST Give an ink InputAction only to a field that is a whole one-line form, with no other ink Button beside it. Because the action inside the pill is the group's one lead, and a second ink pill next to it splits the eye.
   - Correct: `<Input trailing={<InputAction variant="primary" size="text">Join</InputAction>}/>`
   - Wrong:
     ```tsx
     <Input trailing={<InputAction variant="primary" size="text">Join</InputAction>}/>
     <Button>Continue</Button>
     ```
5. input-no-ring NEVER Draw a ring, a black line or a shadow on an Input to show focus. Because Glaze shows a field's focus by darkening its own line to ink at about a third, and a ring around a pill reads as a button.
   - Correct: `<Input/>`
   - Wrong: `<Input className="focus-within:ring-2 focus-within:ring-ink"/>`
6. input-pill NEVER Square off an Input with a radius class or set its height or text size in className. Because every one-line control in Glaze is a pill, and a fixed height clips the text at 200% zoom.
   - Correct: `<Input size="lg"/>`
   - Wrong: `<Input className="h-10 rounded-tag text-xs"/>`
7. input-search-mode MUST Use mode="search" for a search box, never an icon placed over an input. Because a hand-placed icon misses the clear button, Escape to clear, the pending arc and the key hint.
   - Correct: `<Input mode="search" aria-label="Search runs"/>`
   - Wrong: `<div className="relative"><Icon icon={Search} className="absolute start-3"/><Input/></div>`
8. input-one-shortcut MUST Give shortcut to one search per page; pass shortcutOwner={false} on another that only shows the hint. Because only the first claiming field in document order gets the key, so a second claim does nothing.
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
9. input-type-autocomplete MUST Set type and autoComplete on an email, a URL or a phone number. Because without type a phone shows the text keyboard and autofill cannot offer the address.
   - Correct: `<Input type="email" autoComplete="email" placeholder="you@company.com"/>`
   - Wrong: `<Input placeholder="you@company.com"/>`
10. input-invalid-late SHOULD Let Field validate on blur, or set aria-invalid after a submit, never on the first render. Because a coral line before the person has typed blames them for nothing.
11. input-placeholder-example SHOULD Make the placeholder an example of the value in its format, not the label again.
   - Correct: `<Input placeholder="you@company.com"/>`
   - Wrong: `<Input placeholder="Enter your email"/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `mode` | `'text' \| 'password' \| 'search' \| 'copy'` | `'text'` | Picks the props below. |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | 26, 32 or 36px. Match the buttons beside it. |
| `leading, trailing` | `ReactNode` |  | Inside the pill. text takes both; password and copy take leading. |
| `aria-invalid` | `boolean` |  | Turns the line coral. A Field sets it for you. |
| `mono` | `boolean` | `false` | The value in mono at 0.8 of the text, for IDs, keys and paths. copy defaults to true. |
| `className, controlClassName` | `string` |  | className on the pill (width, placement); controlClassName on the input. |
| `defaultRevealed` | `boolean` | `false` | password: starts shown. |
| `shortcut, shortcutOwner, pending, clearLabel` | `string, boolean, boolean, string` | `, true, false, 'Clear search'` | search. The first owner in document order takes the key. |
| `value, noun, onCopy` | `string, string, (v) => void` |  | copy: a read-only value with a Copy button; noun names it. |
| `InputAction size, variant` | `'icon' \| 'text', Button variant` | `'icon', 'ghost'` | A Button 3px inside the line. Icon size needs aria-label. |
Other props pass through to the input element; className and style go to the pill around it, controlClassName to the input.

## Variants and states
- mode: text, password, search, copy
- size: sm, default, lg
- states: rest, focus, filled, invalid, disabled, read-only
- when states meet, the first wins: disabled > invalid > focus > read-only > rest

## Accessibility
- [ ] The control is a native textbox named by FieldLabel or aria-label, with aria-invalid and aria-describedby from the Field.
- [ ] Focus darkens the line to --line-focus (ink at about a third, 2.3:1 on paper) beside the caret; invalid adds the error sentence, so neither rests on colour alone.
- [ ] Icon-only InputActions need aria-label; the password toggle sets aria-pressed and names itself Show or Hide.
- [ ] Escape in a search clears the query; a second Escape leaves the field. The key hint is aria-hidden.
- [ ] Text is 16px under a coarse pointer, so a phone browser never zooms the page on focus.
- [ ] Forced colors keep the 1px line in the system colour, and the caret marks focus.

## Keyboard
- `Escape`: In a search, clears the query; with no query, leaves the field.
- `/ (or the shortcut)`: Focuses the search that owns it, from anywhere outside a field, dialog or menu.
- `Enter`: Submits the form around it.

## Edge cases
- Long value -> Scrolls inside the pill; a copy value truncates and still copies all of it.
- Narrow row, 160px -> The text shrinks before any slot; slots and actions keep their size.
- Right to left -> Leading and trailing swap sides; a scheme like https:// keeps its own order.
- Zoom 200% -> The pill grows with the text past its token, and an action inside keeps its 3px.
- Slow search -> The magnifier turns to the arc and the pill keeps its size; the caller owns the timeout.
- Disabled Field or FieldSet -> The text, the slots and every action inside go quiet together.

## Tokens
--paper, --field, --line-control, --line-focus, --line-faint, --fail, --text-1, --text-2, --text-3, --text-disabled, --control-sm, --control, --control-lg, --shell-inset, --line-width, --radius-pill, --space-3, --type-body-sm, --type-caption, --type-body, --icon-sm, --icon, --icon-lg, --dur-state, --ease-out

## Related
- [Field](/systems/glaze/components/field.md): Gives an input its label and error.
- [Textarea](/systems/glaze/components/textarea.md): Takes several lines of text.
- [Copy button](/systems/glaze/components/copy-button.md): Copies a value.
- [Kbd](/systems/glaze/components/kbd.md): Shows a key or a shortcut.
