---
name: Input
system: lime
kind: component
import: "import {Input, fieldControl} from '@/components/lime/ui/input'"
install: "npx shadcn@latest add https://happyhands.cc/r/lime/input.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/input
---

# Input

A box for typing one line, like a name or an email.

## Use when
- A short free text answer: a title, a handle, an email, a search.
- A value the person types or pastes: a link, a code.

## Don't use when
- The answer runs to several lines. Use [Textarea](/systems/lime/components/textarea.md).
- The answer is one of a known list. Use [Select](/systems/lime/components/select.md).
- The answer is a number on a range. Use [Slider](/systems/lime/components/slider.md).

## Minimal example
```tsx
<Field name="title">
  <FieldLabel>Goal name</FieldLabel>
  <Input placeholder="Vacation fund"/>
</Field>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. input-in-field MUST Wrap an input that collects a value in Field with a FieldLabel. Because a placeholder disappears on the first keystroke and gives the input no accessible name.
   - Correct:
     ```tsx
     <Field name="title">
       <FieldLabel>Goal name</FieldLabel>
       <Input/>
     </Field>
     ```
   - Wrong: `<Input placeholder="Goal name"/>`
2. input-error-text MUST Say what is wrong in a FieldError; never only turn the border red. Because a red edge tells a color-blind person and a screen reader nothing about the fix.
   - Correct: `<Field invalid>...<FieldError match>Add a full email</FieldError></Field>`
   - Wrong: `<Input aria-invalid/>`
3. input-type MUST Set type, inputMode and autoComplete for an email, link or number. Because Input defaults to type="text", so the phone shows the letter keyboard and autofill skips it.
   - Correct: `<Input type="email" inputMode="email" autoComplete="email" aria-label="Email"/>`
   - Wrong: `<Input aria-label="Email"/>`
4. input-placeholder-example SHOULD Make the placeholder an example answer, never the label.
5. input-name MUST Pass aria-label when the input has no visible label. Because without it a screen reader announces an unnamed edit text.
   - Correct: `<Input aria-label="Search transactions"/>`
   - Wrong: `<Input placeholder="Search"/>`
6. input-label-above NEVER Build a floating or inside label; the label sits above in sentence case. Because a label inside the 40px field overlaps the typed value and loses the Field wiring.
   - Correct: `<Field><FieldLabel>Email</FieldLabel><Input/></Field>`
   - Wrong: `<div className="relative"><input/><label className="absolute top-1">Email</label></div>`
7. input-phone-font NEVER Set text-xs on an input; the size prop sets the type. Because base.css lifts touch fields back to 16px against iOS zoom, so the field renders two sizes.
   - Correct: `<Input/>`
   - Wrong: `<Input className="text-xs"/>`
8. input-phone-size SHOULD Use size="lg" (48px) in a phone form.
   - Correct: `<Input size="lg"/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 32, 40 or 48px tall. |
| `type` | `string` | `'text'` | Any native input type. |
| `aria-invalid` | `boolean` |  | Red border. Field sets it when invalid. |
| `onValueChange` | `(value: string, details) => void` |  | Base UI: called with the new string. |
Other props pass through to the input element.

## Variants and states
- size: sm, md, lg
- states: rest, filled, hover, focus-visible, invalid, disabled, read-only

## Accessibility
- [ ] Name the input from FieldLabel or aria-label; a placeholder is not a name.
- [ ] Focus shows a 2px olive outline; invalid keeps the red border under it.
- [ ] FieldError carries the message; forced colors flattens the red border.
- [ ] Text on the field is 17.6:1; the edge is a 1px hairline, so the ring carries the shape.

## Edge cases
- Long value -> Scrolls inside the input and never wraps.
- Narrow container -> min-w-0 lets it shrink in a flex row.
- Right to left -> Text aligns to the right; set dir="ltr" on a link or email field.
- Zoom 200% -> The value grows inside the fixed height.
- Waiting on a server check -> No pending state; put the wait message in Field.
- Inside a form -> Enter submits through the default button.
- Forced colors -> The border stays a system color; the focus outline survives.

## Tokens
--field, --line-strong, --fg, --fg-3, --control, --accent-line, --ring, --line-focus, --danger, --surface-2, --fg-disabled, --control-sm, --control-md, --control-lg, --radius-field

## Related
- [Textarea](/systems/lime/components/textarea.md): Several lines of text, such as a note on a payment.
- [Field](/systems/lime/components/field.md): A label, a control, a hint and an error, wired together.
- [Select](/systems/lime/components/select.md): One choice from a list, such as an account or a category.
- [Combobox](/systems/lime/components/combobox.md): A searchable choice from a long list, such as friends or merchants.
