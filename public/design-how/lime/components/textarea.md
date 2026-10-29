---
name: Textarea
system: lime
kind: component
import: "import {Textarea} from '@/components/lime/ui/textarea'"
install: "npx shadcn@latest add https://design.how/r/lime/textarea.json"
registryDependencies: [input, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/textarea
---

# Textarea

A bigger box for writing a few lines, like a note or a reply.

## Use when
- A description, note or request that takes several lines.
- A message composer that grows with what is typed (autoGrow).

## Don't use when
- The answer is one line: a title, a handle, a link. Use [Input](/systems/lime/components/input.md).
- It is the chat box of an AI conversation with a cost and a send button. Use [Chat input](/systems/lime/components/chat-input.md).

## Minimal example
```tsx
<Field name="request">
  <FieldLabel>Request</FieldLabel>
  <Textarea autoGrow/>
</Field>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. textarea-autogrow-requests SHOULD Set autoGrow for a request or message so the whole text stays in view.
   - Correct: `<Textarea autoGrow/>`
   - Wrong: `<Textarea/> // for a request`
2. textarea-in-field MUST Wrap a textarea that collects a value in Field with a FieldLabel. Because a placeholder is gone at the first keystroke, and the field loses its name with it.
   - Correct:
     ```tsx
     <Field name="description">
       <FieldLabel>Description</FieldLabel>
       <Textarea/>
     </Field>
     ```
   - Wrong: `<Textarea placeholder="Description"/>`
3. textarea-visible-limit MUST Show the count in a FieldDescription before the limit; never cut the text silently. Because maxLength drops pasted text past the limit with no message.
   - Correct:
     ```tsx
     <Textarea/>
     <FieldDescription>312 of 500</FieldDescription>
     ```
   - Wrong: `<Textarea maxLength={500}/>`
4. textarea-placeholder-example SHOULD Show an example answer as the placeholder, never the label.
5. textarea-name MUST Pass aria-label when there is no visible label. Because some screen readers skip a placeholder as the name, and it vanishes once typing starts.
   - Correct: `<Textarea aria-label="Notes"/>`
   - Wrong: `<Textarea placeholder="Notes"/>`
6. textarea-no-fixed-height NEVER Set an h-* class; use rows or autoGrow. Because autoGrow writes an inline height over it, and rows counts lines at the current type size.
   - Correct: `<Textarea rows={6}/>`
   - Wrong: `<Textarea className="h-64"/>`
7. textarea-height-range MUST Expect 80px minimum and 240px maximum; never lift max-h on autoGrow. Because past 240px a long note pushes the Send button off a phone screen.
   - Correct: `<Textarea autoGrow/>`
   - Wrong: `<Textarea autoGrow className="max-h-none"/>`
8. textarea-submit-button MUST Submit with a button or Ctrl+Enter; Enter adds a line. Because Enter in a textarea inserts a newline, so a form that waits for Enter never sends.
   - Correct: `<Button type="submit">Send request</Button>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `autoGrow` | `boolean` | `false` | Grow with the text to 240px, then scroll. Turns the resize handle off. |
| `rows` | `number` |  | Native. The box is never shorter than 80px. |
| `aria-invalid` | `boolean` |  | Red border. Field sets it. |
Other props pass through to the textarea element.

## Variants and states
- autoGrow: false, true
- states: rest, filled, hover, focus-visible, invalid, disabled

## Accessibility
- [ ] Name the textarea from FieldLabel or aria-label.
- [ ] Tab moves focus past it and never inserts a tab character.
- [ ] Invalid is only a border color; FieldError carries the message.
- [ ] base.css lifts the font to 16px on a coarse pointer so iOS does not zoom.

## Edge cases
- Long value with autoGrow -> Grows to 240px, then scrolls inside; measured on mount.
- Narrow container -> w-full and min-w-0, so it wraps at 160px.
- Right to left -> Text aligns to the start edge; the resize handle follows the direction.
- Touch -> The resize handle is small; use autoGrow on phones.
- Inside a form -> Enter adds a line and does not submit.
- Forced colors -> The border stays visible; the focus outline survives.

## Tokens
--field, --line-strong, --fg, --fg-3, --control, --accent-line, --ring, --line-focus, --danger, --surface-2, --fg-disabled, --radius-field

## Related
- [Input](/systems/lime/components/input.md): One line of text, such as a merchant name or a search.
- [Field](/systems/lime/components/field.md): A label, a control, a hint and an error, wired together.
- [Chat input](/systems/lime/components/chat-input.md): The box a request to the assistant is written in, with the amount and send.
