---
name: Textarea
system: sodium
kind: component
import: "import {Textarea} from '@/components/sodium/ui/textarea'"
install: "npx shadcn@latest add https://design.how/r/sodium/textarea.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/textarea
---

# Textarea

Takes several lines of text.

## Use when
- The answer runs past one line: a run note, a reason for a rollback, a description of a pipeline.
- The text has a soft length limit the person should see coming (limit).

## Don't use when
- The answer fits on one line. Use [Input](/systems/sodium/components/input.md).
- The text is code, SQL or JSON to edit: use a code editor, which keeps indentation and mono.

## Minimal example
```tsx
<Field>
  <FieldLabel>Run note</FieldLabel>
  <Textarea autoGrow limit={2000}/>
</Field>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. textarea-in-field MUST Put a Textarea in a Field with a FieldLabel. Because a placeholder vanishes on the first keystroke and is not a reliable accessible name.
   - Correct: `<Field><FieldLabel>Run note</FieldLabel><Textarea/></Field>`
   - Wrong: `<Textarea placeholder="Run note"/>`
2. textarea-limit-not-maxlength MUST Use limit for a length cap, never maxLength. Because maxLength cuts a paste without a word, while limit keeps every character, counts down near the end and marks the field invalid past it.
   - Correct: `<Textarea limit={2000}/>`
   - Wrong: `<Textarea maxLength={2000}/>`
3. textarea-square NEVER Round the corners or change the edge of a Textarea. Because every corner in Sodium is square, and the edge is the one that turns gold on focus and red when invalid.
   - Correct: `<Textarea/>`
   - Wrong: `<Textarea className="rounded-md border-line"/>`
4. textarea-no-ring NEVER Draw a ring, an outline or a shadow to show focus. Because a field shows focus itself, white with the gold edge doubled inward and a 1px pale yellow halo, and a ring outside that reads as a second box.
   - Correct: `<Textarea/>`
   - Wrong: `<Textarea className="focus:ring-2 focus:ring-focus"/>`
5. textarea-autogrow-bounds SHOULD With autoGrow, set maxRows so a long paste scrolls inside the box instead of pushing the form off the screen.
   - Correct: `<Textarea autoGrow minRows={3} maxRows={12}/>`
6. textarea-no-resize-with-grow SHOULD Leave resizable off when autoGrow is on; the box already fits its text. Because a dragged height fights the grown one on the next keystroke.
7. textarea-placeholder-example SHOULD Make the placeholder an example of a good answer, not the label again.
   - Correct: `<Textarea placeholder="Rolled back after the schema change dropped a column."/>`
   - Wrong: `<Textarea placeholder="Enter a note"/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `rows` | `number` | `3` | A fixed height in lines, without autoGrow. |
| `autoGrow` | `boolean` | `false` | Grows with the text from minRows to maxRows, then scrolls. |
| `minRows, maxRows` | `number` | `3, 10` | autoGrow's bounds, in lines. |
| `limit` | `number` |  | A soft character limit with a counter; past it the field is invalid. |
| `resizable` | `boolean` | `false` | Lets the person drag the height. |
| `onValueChange` | `(value: string) => void` |  | The plain value on every change. |
| `aria-invalid` | `boolean` |  | Turns the edge red. A Field sets it for you. |
Other props pass through to the textarea element (Base UI Input); with limit, className goes to the wrapper.

## Variants and states
- sizing: rows, autoGrow
- states: rest, hover, focus, near-limit, over-limit, invalid, disabled, read-only
- when states meet, the first wins: disabled > invalid > over-limit > focus > near-limit > read-only > hover > rest

## Accessibility
- [ ] A native textarea named by FieldLabel, with aria-invalid and aria-describedby from the Field.
- [ ] With limit, the counter joins aria-describedby, and a status region announces only crossing 80% and the limit, never every keystroke.
- [ ] Focus turns the edge --focus at 2px beside the caret; invalid adds the error sentence, so neither rests on colour alone.
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
- Dark theme -> The body is #181715 and lifts a step under the pointer; focus turns it the page with a yellow edge.

## Tokens
--field-bg, --field-hover, --field-edge-hover, --field-ring-hover, --field-focus-bg, --field-ring-focus, --field-ring-fail, --field-inset, --well, --line, --focus, --fail, --fail-text, --text-1, --text-2, --text-3, --text-disabled, --type-body-sm, --type-label-sm, --space-1-5, --dur-light, --ease-soft

## Related
- [Input](/systems/sodium/components/input.md): Takes one line of text.
- [Field](/systems/sodium/components/field.md): Gives an input its label and error.
