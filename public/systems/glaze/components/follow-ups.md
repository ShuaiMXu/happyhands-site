---
name: Follow-ups
system: glaze
kind: component
import: "import {FollowUps, followUpVariants} from '@/components/glaze/ai/follow-ups'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/follow-ups.json"
registryDependencies: [icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/follow-ups
---

# Follow-ups

Suggests next prompts to send.

## Use when
- Under the newest finished agent turn, to offer the likely next prompts.
- After a result the agent can change: "Refund the other two", "Email the customer".
- In an empty thread, as starting prompts (layout="rows").

## Don't use when
- Filters a person turns on and off. Use [Chip](/systems/glaze/components/chip.md).
- Actions on the answer itself, such as copy or retry. Use [Toolbar](/systems/glaze/components/toolbar.md).
- A yes or no the agent is waiting on. Use [Tool call](/systems/glaze/components/tool-call.md).

## Minimal example
```tsx
{done && <FollowUps
  suggestions={turn.followUps}
  onSelect={text => send(text)}
/>}
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. follow-ups-send MUST Send the text as the next prompt in onSelect; never only fill the composer. Because the person chose the words already, and filling the box makes them find Send and press again.
   - Correct: `<FollowUps suggestions={s} onSelect={text => send(text)}/>`
   - Wrong: `<FollowUps suggestions={s} onSelect={setDraft}/>`
2. follow-ups-newest-only MUST Render follow-ups only under the newest finished turn; remove them once a prompt is sent. Because old suggestions under an earlier turn send prompts the thread has moved past.
   - Correct: `{last.done && <FollowUps suggestions={last.followUps} onSelect={send}/>}`
   - Wrong: `{turns.map(t => <FollowUps key={t.id} suggestions={t.followUps} onSelect={send}/>)}`
3. follow-ups-disabled SHOULD Pass disabled while a reply runs, if the row stays on screen.
4. follow-ups-specific NEVER Offer prompts that fit any answer, such as Tell me more. Because a generic prompt saves no typing and says nothing about what the agent can do next.
   - Correct: `['Refund the other two', 'Email the customer']`
   - Wrong: `['Tell me more', 'Explain', 'Anything else?']`
5. follow-ups-as-typed SHOULD Write each one as the person would type it, in the first person and imperative.
   - Correct: `['Refund the other two', 'Show the policy']`
6. follow-ups-layout SHOULD Use layout="chips" for prompts of a few words and layout="rows" for prompts that run to a sentence. Because a chip ends a long prompt in an ellipsis, and rows wrap it.
7. follow-ups-no-glass NEVER Make a follow-up glass or a primary Button. Because a suggestion is an offer, and the composer's Send is the one lead in a thread.
   - Correct: `<FollowUps suggestions={s} onSelect={send}/>`
   - Wrong: `{s.map(t => <Button key={t} onClick={() => send(t)}>{t}</Button>)}`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `suggestions` | `readonly string[]` |  | Best first. Empty strings are dropped. Required. |
| `onSelect` | `(suggestion: string, index: number) => void` |  | Sends the prompt. Required. |
| `layout` | `'chips' \| 'rows'` | `'chips'` | 26px pills that wrap, or 32px rows. |
| `max` | `number` | `3` | How many show. |
| `disabled` | `boolean` | `false` | Holds every suggestion while a reply runs. |
| `labels` | `{group?}` | `{group: 'Suggested follow-ups'}` | The group's name, for another language. |
Other props pass through to the group div.

## Variants and states
- layout: chips, rows
- states: rest, hover, held, focus-visible, disabled
- when states meet, the first wins: disabled > held > focus-visible > hover > rest

## Accessibility
- [ ] role="group" named "Suggested follow-ups"; each suggestion is a button named by its full text.
- [ ] Tab moves between suggestions; Enter and Space send.
- [ ] A chip takes the small focus ring; a row draws the ring inside its edge, since rows touch.
- [ ] A truncated chip keeps its full text as its name and its title.

## Keyboard
- `Tab`: Moves to the next suggestion.
- `Enter, Space`: Sends the suggestion.

## Edge cases
- More than max -> The first max show; the rest are cut.
- No suggestions -> Renders nothing.
- Long prompt as a chip -> Ends in an ellipsis at the row's width.
- Long prompt as a row -> Wraps; the arrow stays on the first line.
- Right to left -> Chips start at the right; text aligns to the start.
- Dark theme -> Chips turn near-black with a light hairline; rows take the light wash.

## Tokens
--paper, --line-control, --line-focus, --line-faint, --hover, --pressed, --text-1, --text-3, --text-disabled, --control, --control-sm, --radius-pill, --radius-tag, --type-label-sm, --type-body-sm

## Related
- [Message](/systems/glaze/components/message.md): Shows one turn of a conversation.
- [Prompt input](/systems/glaze/components/prompt-input.md): Takes the next message for an agent.
- [Chip](/systems/glaze/components/chip.md): Shows a filter or a chosen value.
- [Toolbar](/systems/glaze/components/toolbar.md): Holds a row of actions on one thing.
