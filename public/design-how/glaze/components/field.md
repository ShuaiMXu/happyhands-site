---
name: Field
system: glaze
kind: component
import: "import {Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldTitle, Form, FormActions, FormStatus, Label, LabelHint, labelClasses, useFieldDisabled} from '@/components/glaze/ui/field'"
install: "npx shadcn@latest add https://design.how/r/glaze/field.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/field
---

# Field

Gives an input its label and error.

## Use when
- Any Input, Textarea, Checkbox, Switch or Slider that a person fills in or sets.
- Several related questions share one title (FieldSet and FieldLegend).
- A set of fields is submitted together and checked together (Form).

## Don't use when
- A search box that filters the page, labelled by the page itself: give the Input aria-label.
- A value to read, not to change: show it as text, or Input mode="copy".

## Minimal example
```tsx
<Field validate={checkName}>
  <FieldLabel>Agent name</FieldLabel>
  <Input placeholder="refund-triage"/>
  <FieldDescription>Lowercase letters, digits and dashes.</FieldDescription>
  <FieldError/>
</Field>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. field-one-control MUST Put exactly one control in a Field; group several with FieldSet. Because Base UI binds the label, the description and the error to one control, so a second control is named by the first one's label.
   - Correct: `<FieldSet><FieldLegend variant="label">Region</FieldLegend><Field>…</Field><Field>…</Field></FieldSet>`
   - Wrong: `<Field><FieldLabel>Region</FieldLabel><Input/><Input/></Field>`
2. field-label-not-placeholder NEVER Let a placeholder stand in for FieldLabel. Because a placeholder vanishes on the first keystroke, is 3.3:1 grey and is not a reliable accessible name.
   - Correct: `<Field><FieldLabel>Agent name</FieldLabel><Input placeholder="refund-triage"/></Field>`
   - Wrong: `<Field><Input placeholder="Agent name"/></Field>`
3. field-error-sentence MUST Say in FieldError what is wrong with this value and how to fix it, in one sentence. Because the coral line only says something is wrong; the sentence is what a screen reader hears and what the person acts on.
   - Correct: `<FieldError>Use an https:// URL; the agent will not call plain http.</FieldError>`
   - Wrong: `<FieldError>Invalid input</FieldError>`
4. field-validate-late MUST Validate through the Field (validate, invalid or the control's constraints), never with your own onChange check. Because Field waits for blur before it shows an error and then clears it on the keystroke that fixes it, and a hand check shows coral on the first letter.
   - Correct: `<Field validate={checkName}><FieldLabel>Agent name</FieldLabel><Input/><FieldError/></Field>`
   - Wrong: `<Input aria-invalid={!isSlug(value)} onChange={…}/>`
5. field-no-red-asterisk NEVER Mark a required field with a red or coral asterisk; pass required or optional to FieldLabel. Because coral means something went wrong in Glaze, and an asterisk is a symbol a screen reader may skip.
   - Correct: `<FieldLabel required>Email</FieldLabel>`
   - Wrong: `<FieldLabel>Email <span className="text-fail-text">*</span></FieldLabel>`
6. field-mark-the-rarer SHOULD Mark whichever kind is rarer in the form: optional when most fields are required, required when most are optional. Because a word on every label is noise, and the few marked ones stand out.
7. field-server-errors MUST Route server errors back through Form errors by field name, and announce the result in FormStatus. Because Form focuses the first invalid field and Base UI ties the message to it, where a toast leaves the person hunting for the field.
   - Correct:
     ```tsx
     <Form errors={{name: 'An agent with this name already exists.'}}>…<FormStatus status="fail">Not created.</FormStatus></Form>
     ```
8. field-horizontal-toggles SHOULD Use orientation="horizontal" with FieldContent for a switch or a checkbox beside its label and description.
   - Correct:
     ```tsx
     <Field orientation="horizontal"><FieldContent><FieldLabel>…</FieldLabel><FieldDescription>…</FieldDescription></FieldContent><Switch/></Field>
     ```
9. field-description-short SHOULD Keep FieldDescription to one or two lines about the value's use or shape; put policy in the page, not under a field.
   - Correct: `<FieldDescription>Lowercase letters, digits and dashes.</FieldDescription>`
   - Wrong: `<FieldDescription>Please note that names are used in many places, so choose carefully …</FieldDescription>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Field orientation` | `'vertical' \| 'horizontal' \| 'responsive'` | `'vertical'` | responsive puts the label beside the control in a FieldGroup 448px or wider. |
| `Field validate, invalid, name` | `Base UI Field` |  | Checked on blur, then on every change while invalid. |
| `Field validationMode` | `'onBlur' \| 'onChange' \| 'onSubmit'` |  | Overrides Glaze's timing. |
| `FieldLabel required, optional` | `boolean` | `false` | A quiet word after the label. Also on Label and FieldTitle. |
| `FieldError errors` | `Array<{message?: string}>` |  | Schema errors; duplicates drop, two or more become a list. |
| `FieldSet disabled` | `boolean` | `false` | Disables every field and control inside. |
| `FieldLegend variant` | `'legend' \| 'label'` | `'legend'` | A 16px heading, or a 13px label for a short set in a form. |
| `Form pending, errors, onFormSubmit` | `boolean, Record<string, string>, (values) => void` |  | pending sets aria-busy and drops a second submit. |
| `FormStatus status` | `'ok' \| 'fail'` |  | role="status"; the word turns green or coral. |
Other props pass through to the div of each part (Base UI Field, Fieldset and Form parts).

## Variants and states
- orientation: vertical, horizontal, responsive
- states: rest, described, invalid, disabled
- when states meet, the first wins: disabled > invalid > described > rest

## Accessibility
- [ ] FieldLabel is a <label> bound to the control; FieldDescription and FieldError join its aria-describedby.
- [ ] FieldError appears when the field is invalid and is read with the control on focus; the control gets aria-invalid.
- [ ] FieldSet is a <fieldset> named by its <legend>, so each control inside is announced with the set's title.
- [ ] Form focuses the first invalid field on submit; FormStatus is role="status", rendered from the start so its change is heard.
- [ ] Required and optional are words, not symbols, so a screen reader reads them with the label.
- [ ] Description text is text-2, 5.5:1 on paper; the error word is --fail-text, 5.9:1.

## Keyboard
- `Tab`: Moves from field to field; the label and description are not stops.
- `Enter`: In a text field, submits the Form.

## Edge cases
- Error longer than the field -> Wraps under the control up to the 60ch hint measure.
- Several schema errors -> Duplicates drop and the rest become a list.
- Field inside a Field -> Development builds warn; the inner control would take the outer label.
- Description outside a Field -> Renders a plain paragraph, so it works under a FieldLegend.
- Disabled FieldSet -> Every label, description and control inside goes to the disabled text colour.
- Phone width -> A responsive field stacks its label above the control.
- Submit twice while pending -> Form drops the second submit, Enter in a field included.

## Tokens
--text-1, --text-2, --text-disabled, --fail-text, --ok-text, --line, --type-label, --type-body-sm, --type-heading-sm, --type-caption, --measure-hint, --label-col, --space-4, --space-6

## Related
- [Input](/systems/glaze/components/input.md): Takes one line of text.
- [Textarea](/systems/glaze/components/textarea.md): Takes several lines of text.
- [Checkbox](/systems/glaze/components/checkbox.md): Turns one option on or off.
- [Switch](/systems/glaze/components/switch.md): Turns a setting on or off at once.
