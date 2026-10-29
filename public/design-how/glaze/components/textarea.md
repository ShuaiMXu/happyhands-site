---
name: Textarea
system: glaze
kind: component
import: "import {Textarea} from '@/components/glaze/ui/textarea'"
install: "npx shadcn@latest add https://design.how/r/glaze/textarea.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/textarea
---

# Textarea

Takes several lines of text.

## Use when
- The answer runs past one line: a system prompt, instructions, feedback on a run, a reason.
- The text has a soft length limit the person should see coming (limit).

## Don't use when
- The answer fits on one line. Use [Input](/systems/glaze/components/input.md).
- The person chats with an agent: use the prompt input, which carries send and attachments.
- The text is code or JSON to read: show it in a code block.

## Minimal example
```tsx
<Field>
  <FieldLabel>System prompt</FieldLabel>
  <Textarea autoGrow limit={4000}/>
</Field>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. textarea-in-field MUST Put a Textarea in a Field with a FieldLabel. Because a placeholder vanishes on the first keystroke and is not a reliable accessible name.
   - Correct: `<Field><FieldLabel>System prompt</FieldLabel><Textarea/></Field>`
   - Wrong: `<Textarea placeholder="System prompt"/>`
2. textarea-limit-not-maxlength MUST Use limit for a length cap, never maxLength. Because maxLength cuts a paste without a word, while limit keeps every character, counts down near the end and marks the field invalid past it.
   - Correct: `<Textarea limit={4000}/>`
   - Wrong: `<Textarea maxLength={4000}/>`
3. textarea-overlay-corner NEVER Make a Textarea a pill or change its corner. Because pills are for one line; a box of text takes the 10px overlay corner, and a pill would clip its first and last lines.
   - Correct: `<Textarea/>`
   - Wrong: `<Textarea className="rounded-pill"/>`
4. textarea-no-ring NEVER Draw a ring, a black line or a shadow to show focus. Because a field shows focus by darkening its own line to ink at about a third, and a ring reads as a pressable thing.
   - Correct: `<Textarea/>`
   - Wrong: `<Textarea className="focus:ring-2 focus:ring-ink"/>`
5. textarea-autogrow-bounds SHOULD With autoGrow, set maxRows so a long paste scrolls inside the box instead of pushing the form off the screen.
   - Correct: `<Textarea autoGrow minRows={3} maxRows={12}/>`
6. textarea-no-resize-with-grow SHOULD Leave resizable off when autoGrow is on; the box already fits its text. Because a dragged height fights the grown one on the next keystroke.
7. textarea-placeholder-example SHOULD Make the placeholder an example of a good answer, not the label again.
   - Correct: `<Textarea placeholder="The agent refunded a $120 order without asking."/>`
   - Wrong: `<Textarea placeholder="Enter feedback"/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `rows` | `number` | `3` | A fixed height in lines, without autoGrow. |
| `autoGrow` | `boolean` | `false` | Grows with the text from minRows to maxRows, then scrolls. |
| `minRows, maxRows` | `number` | `3, 10` | autoGrow's bounds, in lines. |
| `limit` | `number` |  | A soft character limit with a counter; past it the field is invalid. |
| `resizable` | `boolean` | `false` | Lets the person drag the height. |
| `onValueChange` | `(value: string) => void` |  | The plain value on every change. |
| `aria-invalid` | `boolean` |  | Turns the line coral. A Field sets it for you. |
Other props pass through to the textarea element (Base UI Input); with limit, className goes to the wrapper.

## Variants and states
- sizing: rows, autoGrow
- states: rest, focus, near-limit, over-limit, invalid, disabled, read-only
- when states meet, the first wins: disabled > invalid > over-limit > focus > near-limit > read-only > rest

## Accessibility
- [ ] A native textarea named by FieldLabel, with aria-invalid and aria-describedby from the Field.
- [ ] With limit, the counter joins aria-describedby, and a status region announces only crossing 80% and the limit, never every keystroke.
- [ ] Focus darkens the line to --line-focus beside the caret; invalid adds the error sentence, so neither rests on colour alone.
- [ ] Text is 16px under a coarse pointer, so a phone browser never zooms on focus.

## Keyboard
- `Enter`: Adds a line; it never submits the form.
- `Tab`: Leaves the textarea; it never types a tab.

## Edge cases
- Paste over the limit -> Keeps every character, counts how far over in the failure word and marks the field invalid.
- Long paste with autoGrow -> Grows to maxRows, then scrolls inside the box.
- Browser without field-sizing -> autoGrow measures scrollHeight on every input instead.
- Narrow container -> The width follows the container; only the height follows the text.
- Right to left -> Text and the counter align to the reading direction.
- Dark theme -> Paper turns near-black and the line stays ink at 15%.

## Tokens
--paper, --field, --line-control, --line-focus, --line-faint, --fail, --fail-text, --text-1, --text-2, --text-3, --text-disabled, --radius-overlay, --type-body-sm, --type-caption, --space-2, --space-3, --dur-state, --ease-out

## Related
- [Input](/systems/glaze/components/input.md): Takes one line of text.
- [Field](/systems/glaze/components/field.md): Gives an input its label and error.
