---
name: Field
system: lime
kind: component
import: "import {Field, FieldLabel, FieldDescription, FieldError} from '@/components/lime/ui/field'"
install: "npx shadcn@latest add https://happyhands.cc/r/lime/field.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/field
---

# Field

Puts a label, a hint and any error around an input.

## Use when
- Any control that collects a value in a form.
- A control that can show an error the person has to fix.

## Don't use when
- A single control with its own visible label, such as a switch row. Wrap it in a label. Use [Switch](/systems/lime/components/switch.md).
- A search box in a toolbar. Use aria-label. Use [Input](/systems/lime/components/input.md).

## Minimal example
```tsx
<Field name="handle" validationMode="onBlur" validate={checkHandle}>
  <FieldLabel>Payment handle</FieldLabel>
  <Input placeholder="mayaslens"/>
  <FieldDescription>Letters and numbers, shown after the @.</FieldDescription>
  <FieldError/>
</Field>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. field-label-wired MUST Use FieldLabel, not a loose label; it sets the for and id pair that names the control. Because without the pair a screen reader announces an unnamed text box.
   - Correct: `<Field><FieldLabel>Handle</FieldLabel><Input/></Field>`
   - Wrong:
     ```tsx
     <label>Handle</label>
     <Input/>
     ```
2. field-validate-on-blur SHOULD Set validationMode="onBlur" and a validate function; do not check on every key.
   - Correct: `<Field validationMode="onBlur" validate={check}>...`
   - Wrong: `<Field validationMode="onChange">...`
3. field-one-message SHOULD Show the error and drop the hint when invalid; Field renders both lines.
   - Correct: `{invalid ? <FieldError match>...</FieldError> : <FieldDescription>...</FieldDescription>}`
4. field-error-text MUST Say what went wrong and what to do in the error, such as "Use at least 8 characters"; never "Invalid". Because "Invalid" names no fix, so the person retypes the same value.
   - Correct: `<FieldError match>Add a full email, like maya@example.com.</FieldError>`
   - Wrong: `<FieldError match>Invalid</FieldError>`
5. field-keeps-input MUST Keep what the person typed and mark the field; never clear a wrong value. Because a cleared field makes the person retype a whole IBAN to fix one digit.
   - Correct: `onSubmit: setInvalid(true) // value stays`
   - Wrong: `onSubmit: setValue("")`
6. field-label-sentence SHOULD Label with a short noun in sentence case, not a question or capitals.
   - Correct: `<FieldLabel>Display name</FieldLabel>`
   - Wrong: `<FieldLabel>WHAT SHOULD WE CALL YOUR PROFILE?</FieldLabel>`
7. field-no-red-label NEVER Turn the label red for an error; the red belongs to the control edge and the message. Because the edge and FieldError already carry the red, so a red label reads as a second error.
   - Correct: `<FieldError match>...</FieldError>`
   - Wrong: `<FieldLabel className="text-danger">Handle</FieldLabel>`
8. field-width SHOULD Cap a field with max-w-sm or a column; Field is w-full.
   - Correct: `<div className="max-w-sm"><Field>...</Field></div>`
9. field-name MUST Set name for form submission and server errors. Because without it the value is missing from FormData and server errors match no field.
   - Correct: `<Field name="handle">...</Field>`
   - Wrong: `<Field><FieldLabel>Handle</FieldLabel><Input/></Field>`
10. field-input-type MUST Set type, autoComplete and inputMode for what the field holds, such as email, tel, one-time-code or decimal. Because the phone then shows the right keyboard and the browser can fill the value.
   - Correct: `<Input type="email" autoComplete="email" inputMode="email"/>`
   - Wrong: `<Input name="email"/>`
11. field-enter-submits MUST Put fields in a form with a type="submit" Button, so Enter in any field submits. Because keyboard and phone users expect Enter or Go to send the form.
   - Correct: `<form onSubmit={save}>...<Button type="submit">Save</Button></form>`
12. field-focus-invalid MUST Move focus to the first invalid field after a failed submit. Because the error may be off screen, and a screen reader hears nothing until focus lands on it.
   - Correct: `form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `name` | `string` |  | The form key; required for submission and server errors. |
| `invalid` | `boolean` |  | Marks the field invalid by hand. |
| `disabled` | `boolean` | `false` | Disables the control inside. |
| `validate` | `(value, formValues) => string \| string[] \| null` |  | Returns a message, or null when fine. |
| `validationMode` | `'onBlur' \| 'onChange' \| 'onSubmit'` | `'onBlur'` | When validate runs. |
| `FieldError match` | `boolean \| keyof ValidityState` |  | true shows it whenever invalid; a key for one native rule. |
Other props pass through to the root element.

## Variants and states
- control: Input, Textarea, Select
- states: rest, focus-visible, invalid, disabled

## Accessibility
- [ ] FieldLabel names the control; a click on it focuses the control.
- [ ] The control gets aria-invalid when invalid and aria-describedby for the hint and the error.
- [ ] The label, hint and error are not tab stops.
- [ ] The error is text under the control, so it survives forced colors.

## Edge cases
- Long label and error -> Both wrap; nothing is clipped.
- Narrow to 160px -> The column fits and the control shrinks.
- Right to left -> Label, hint and error align to the start edge.
- No FieldLabel -> The control has no name.
- Async validate -> Holds the old state until it resolves; note the wait in FieldDescription.
- Error appears -> No animation; the control moves down one line.

## Tokens
--text-sm, --fg, --weight-medium, --fg-3, --text-xs, --danger-text

## Related
- [Input](/systems/lime/components/input.md): One line of text, such as a merchant name or a search.
- [Textarea](/systems/lime/components/textarea.md): Several lines of text, such as a note on a payment.
- [Select](/systems/lime/components/select.md): One choice from a list, such as an account or a category.
- [Checkbox](/systems/lime/components/checkbox.md): One option on or off, with a mixed state.
