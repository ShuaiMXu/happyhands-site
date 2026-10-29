---
name: Field
system: sodium
kind: component
import: "import {Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldTitle, Form, FormActions, FormStatus, Label, LabelHint, labelClasses, useFieldDisabled} from '@/components/sodium/ui/field'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/field.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/field
---

# Field

Gives an input its label and error.

## Use when
- Any Input, Textarea, Select, Checkbox, Switch or Slider that a person fills in or sets.
- Several related questions share one title (FieldSet and FieldLegend).
- A set of fields is submitted together and checked together (Form).

## Don't use when
- A search box that filters the page, labelled by the page itself: give the Input aria-label.
- A value to read, not to change: show it as text, or Input mode="copy".

## Minimal example
```tsx
<Field validate={checkName}>
  <FieldLabel>Pipeline name</FieldLabel>
  <Input placeholder="ingest-prod"/>
  <FieldDescription>Lowercase letters, digits and dashes.</FieldDescription>
  <FieldError/>
</Field>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. field-one-control MUST Put exactly one control in a Field; group several with FieldSet. Because Base UI binds the label, the description and the error to one control, so a second control is named by the first one's label.
   - Correct: `<FieldSet><FieldLegend variant="label">Schedule</FieldLegend><Field>…</Field><Field>…</Field></FieldSet>`
   - Wrong: `<Field><FieldLabel>Schedule</FieldLabel><Input/><Input/></Field>`
2. field-label-not-placeholder NEVER Let a placeholder stand in for FieldLabel. Because a placeholder vanishes on the first keystroke and is not a reliable accessible name.
   - Correct: `<Field><FieldLabel>Pipeline name</FieldLabel><Input placeholder="ingest-prod"/></Field>`
   - Wrong: `<Field><Input placeholder="Pipeline name"/></Field>`
3. field-label-sentence-case MUST Write FieldLabel in sentence case, a noun for the value, with no colon; it sets the capitals. Because the label role uppercases it on screen while a screen reader reads the source, and typed capitals are spelled out.
   - Correct: `<FieldLabel>Pipeline name</FieldLabel>`
   - Wrong: `<FieldLabel>PIPELINE NAME:</FieldLabel>`
4. field-error-sentence MUST Say in FieldError what is wrong with this value and how to fix it, in one sentence. Because the red edge only says something is wrong; the sentence is what a screen reader hears and what the person acts on.
   - Correct: `<FieldError>Use a lake:// path; the job cannot read plain https.</FieldError>`
   - Wrong: `<FieldError>Invalid input</FieldError>`
5. field-validate-late MUST Validate through the Field (validate, invalid or the control's constraints), never with your own onChange check. Because Field waits for blur before it shows an error and then clears it on the keystroke that fixes it, and a hand check shows red on the first letter.
   - Correct: `<Field validate={checkName}><FieldLabel>Pipeline name</FieldLabel><Input/><FieldError/></Field>`
   - Wrong: `<Input aria-invalid={!isSlug(value)} onChange={…}/>`
6. field-no-red-asterisk NEVER Mark a required field with a red asterisk; pass required or optional to FieldLabel. Because red means something went wrong in Sodium, and an asterisk is a symbol a screen reader may skip.
   - Correct: `<FieldLabel required>Bucket</FieldLabel>`
   - Wrong: `<FieldLabel>Bucket <span className="text-fail-text">*</span></FieldLabel>`
7. field-mark-the-rarer SHOULD Mark whichever kind is rarer in the form: optional when most fields are required, required when most are optional. Because a word on every label is noise, and the few marked ones stand out.
8. field-server-errors MUST Route server errors back through Form errors by field name, and announce the result in FormStatus. Because Form focuses the first invalid field and Base UI ties the message to it, where a toast leaves the person hunting for the field.
   - Correct:
     ```tsx
     <Form errors={{name: 'A pipeline with this name already exists.'}}>…<FormStatus status="fail">Not created.</FormStatus></Form>
     ```
9. field-horizontal-toggles SHOULD Use orientation="horizontal" with FieldContent for a switch or a checkbox beside its label and description.
   - Correct:
     ```tsx
     <Field orientation="horizontal"><FieldContent><FieldLabel>…</FieldLabel><FieldDescription>…</FieldDescription></FieldContent><Switch/></Field>
     ```

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Field orientation` | `'vertical' \| 'horizontal' \| 'responsive'` | `'vertical'` | responsive puts the label beside the control in a FieldGroup 448px or wider. |
| `Field validate, invalid, name` | `Base UI Field` |  | Checked on blur, then on every change while invalid. |
| `Field validationMode` | `'onBlur' \| 'onChange' \| 'onSubmit'` |  | Overrides Sodium's timing. |
| `FieldLabel required, optional` | `boolean` | `false` | A quiet word after the label. Also on Label and FieldTitle. |
| `FieldError errors` | `Array<{message?: string}>` |  | Schema errors; duplicates drop, two or more become a list. |
| `FieldSet disabled` | `boolean` | `false` | Disables every field and control inside. |
| `FieldLegend variant` | `'legend' \| 'label'` | `'legend'` | An 18px sans heading, or a mono label for a short set in a form. |
| `Form pending, errors, onFormSubmit` | `boolean, Record<string, string>, (values) => void` |  | pending sets aria-busy and drops a second submit. |
| `FormStatus status` | `'ok' \| 'fail'` |  | role="status"; the sentence turns green or red. |
Other props pass through to the div of each part (Base UI Field, Fieldset and Form parts).

## Variants and states
- orientation: vertical, horizontal, responsive
- states: rest, described, invalid, disabled
- when states meet, the first wins: disabled > invalid > described > rest

## Accessibility
- [ ] FieldLabel is a <label> bound to the control; FieldDescription and FieldError join its aria-describedby.
- [ ] The label's capitals come from CSS, so a screen reader reads the sentence-case source.
- [ ] FieldError appears when the field is invalid and is read with the control on focus; the control gets aria-invalid.
- [ ] FieldSet is a <fieldset> named by its <legend>, so each control inside is announced with the set's title.
- [ ] Form focuses the first invalid field on submit; FormStatus is role="status", rendered from the start so its change is heard.
- [ ] The label and description are text-2, 7.8:1 on the page; the error word is --fail-text, 6.5:1.

## Keyboard
- `Tab`: Moves from field to field; the label and description are not stops.
- `Enter`: In a text field, submits the Form.

## Edge cases
- Error longer than the field -> Wraps under the control up to the 60ch hint measure.
- Several schema errors -> Duplicates drop and the rest become a list.
- Field inside a Field -> Development builds warn; the inner control would take the outer label.
- Description outside a Field -> Renders a plain paragraph, so it works under a FieldLegend.
- Long label -> Wraps at any character, so a long mono label never pushes the field wider.
- Phone width -> A responsive field stacks its label above the control.
- Submit twice while pending -> Form drops the second submit, Enter in a field included.

## Tokens
--text-1, --text-2, --text-3, --text-disabled, --fail-text, --ok-text, --line, --type-label-sm, --type-caption, --type-heading-sm, --type-micro, --measure-hint, --label-col, --space-4, --space-6

## Related
- [Input](/systems/sodium/components/input.md): Takes one line of text.
- [Textarea](/systems/sodium/components/textarea.md): Takes several lines of text.
- [Select](/systems/sodium/components/select.md): Picks one option from a list.
