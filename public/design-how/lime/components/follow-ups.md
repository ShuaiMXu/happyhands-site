---
name: Follow ups
system: lime
kind: component
import: "import {FollowUps} from '@/components/lime/ai/follow-ups'"
install: "npx shadcn@latest add https://design.how/r/lime/follow-ups.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/follow-ups
---

# Follow ups

Suggests a few next questions you can send with one tap.

## Use when
- Under the last answer in a conversation, to suggest what to ask next.
- After a result, to offer edits the assistant can make.
- Where the person might not know what the assistant can do next.

## Don't use when
- Filters or topics the person toggles. Use [Chip](/systems/lime/components/chip.md).
- A choice that sets a value. Use [Segmented](/systems/lime/components/segmented.md).
- Actions on an answer, such as copy. Put them in the actions of Message. Use [Message](/systems/lime/components/message.md).

## Minimal example
```tsx
<FollowUps
  suggestions={['Show recent deposits', 'Move it every Friday']}
  onSelect={text => send(text)}
/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. follow-ups-sent-as-written MUST Send the suggestion text as the next request on press; do not only fill the box. Because the person then has to find Send and press again for text they already chose.
   - Correct: `<FollowUps onSelect={text => send(text)}/>`
   - Wrong: `<FollowUps onSelect={text => setDraft(text)}/>`
2. follow-ups-remove-after-use MUST Remove the row or replace it with the new answer's once the next request is sent. Because old suggestions under a new answer send questions that are already settled.
   - Correct: `{done && <FollowUps suggestions={last.followUps} onSelect={send}/>}`
   - Wrong: `{messages.map(m => <FollowUps key={m.id} suggestions={m.followUps} onSelect={send}/>)}`
3. follow-ups-full-sentence SHOULD Write each suggestion as a short sentence that stands alone, such as Move it every Friday.
   - Correct: `<FollowUps suggestions={['Move it every Friday', 'Show recent deposits']}/>`
   - Wrong: `<FollowUps suggestions={['Shorter', 'Savings', 'More']}/>`
4. follow-ups-no-generic NEVER Use generic prompts such as Tell me more; write suggestions that use what is in the answer. Because "Tell me more" fits any answer, so it saves the person no typing.
   - Correct: `["Move it every Friday", "Show recent deposits"]`
   - Wrong: `["Tell me more", "Anything else?", "Explain"]`
5. follow-ups-three MUST Pass the best three. Because the row slices to three, so a fourth and fifth vanish without a message.
   - Correct: `suggestions={fiveItems.slice(0, 3)}`
   - Wrong: `suggestions={fiveItems}`
6. follow-ups-mount-when-done SHOULD Mount the row only when the answer is complete; unmount it while a request runs.
7. follow-ups-guard-double SHOULD Ignore a second onSelect call or remove the row; the component has no pressed state.
8. follow-ups-no-empty-strings MUST Filter empty strings out of suggestions. Because an empty string draws a blank pill that sends an empty request.
   - Correct: `suggestions={answer.followUps.filter(Boolean)}`
   - Wrong: `suggestions={answer.followUps}`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `suggestions` | `string[]` |  | Shows the first three. Empty renders nothing. Required. |
| `onSelect` | `(suggestion: string) => void` |  | Called with the pressed text. Required. |
| `labels` | `{group?}` | `{group: 'Suggested follow ups'}` | The row's name for screen readers, for another language. |
| `className` | `string` |  | Merged with cn; other div props pass through. |
Other props pass through to the root element.

## Variants and states
- suggestions: three, one, more than three, empty
- states: rest, hover, focus-visible

## Accessibility
- [ ] The row is role group named "Suggested follow ups"; each suggestion is a button.
- [ ] Tab moves through the suggestions; Enter and Space send.
- [ ] Focus shows the 2px olive ring; hover and focus can show together.
- [ ] Pills are 32px tall; hover only fires on devices that can hover.

## Edge cases
- Long suggestion -> Wraps inside its pill, which grows taller and stays start-aligned.
- Narrow to 120px -> Each suggestion takes its own row; never scrolls sideways.
- Right to left -> Pills start at the right and align text to the start.
- Send fails -> The row stays so the person can retry; it keeps no state.
- Inside a form -> The buttons are type button and do not submit.
- Forced colors -> The pills keep their 1px border.

## Tokens
--page, --line-strong, --fg, --radius-panel, --text-sm, --control-sm, --surface, --ring, --line-focus, --focus-offset, --dur-instant

## Related
- [Chip](/systems/lime/components/chip.md): A filter the person toggles, such as a spending category.
- [Segmented](/systems/lime/components/segmented.md): A short row of exclusive options, such as Week, Month and Year.
- [Message](/systems/lime/components/message.md): One turn in a conversation with the assistant.
- [Chat input](/systems/lime/components/chat-input.md): The box a request to the assistant is written in, with the amount and send.
