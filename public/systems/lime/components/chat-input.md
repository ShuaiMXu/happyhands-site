---
name: Chat input
system: lime
kind: component
import: "import {ChatInput} from '@/components/lime/ai/chat-input'"
install: "npx shadcn@latest add https://happyhands.cc/r/lime/chat-input.json"
registryDependencies: [amount, button, icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/chat-input
---

# Chat input

Where you type a request to the assistant and send it off.

## Use when
- The box of an in-app assistant, where a request is sent as written.
- Any place a single message is composed and sent, with an optional amount.
- A box that must show the money it moves before the person sends.

## Don't use when
- A form field that saves with a Save button. Use [Textarea](/systems/lime/components/textarea.md).
- A one-line search. Use [Input](/systems/lime/components/input.md).

## Minimal example
```tsx
<ChatInput amount={-50} available={400} onSubmit={text => send(text)}/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. chat-input-amount-before-send MUST Pass amount and available when sending moves money; Send turns off when funds cannot cover it. Because without them the person presses Send blind and Send never checks the balance.
   - Correct: `<ChatInput amount={-50} available={400} onSubmit={send}/>`
   - Wrong: `<ChatInput onSubmit={send}/> // on a paid action`
2. chat-input-stop-while-running MUST Set running and onStop while a request runs, so Send becomes Stop; do not disable the box. Because a disabled field drops focus to the body and leaves no way to cancel.
   - Correct: `<ChatInput running onStop={stop}/>`
   - Wrong: `<ChatInput disabled/> // while running`
3. chat-input-keep-draft-on-failure MUST Control value and restore the text on failure; the field clears when onSubmit returns. Because the field clears right after onSubmit, so a failed request loses the text.
   - Correct: `<ChatInput value={draft} onValueChange={setDraft} onSubmit={send}/>`
   - Wrong: `<ChatInput onSubmit={send}/> // uncontrolled`
4. chat-input-name-actions MUST Give each icon control in actions an aria-label. Because an icon-only Button reads as "button" with no name to a screen reader.
   - Correct: `<Button size="icon-sm" aria-label="Attach a receipt"><Icon/></Button>`
   - Wrong: `<Button size="icon-sm"><Icon/></Button>`
5. chat-input-one-lime NEVER Add a second colored button to the row; Send is the only lime, so extra controls stay ghost. Because a second lime control splits the next step in two beside Send.
   - Correct: `<Button variant="ghost" size="icon-sm" aria-label="Attach a receipt"/>`
   - Wrong: `<Button variant="primary">Attach</Button>`
6. chat-input-placeholder-example SHOULD Make the placeholder show a good request, such as "Ask about your money"; never "Type here...".
   - Correct: `placeholder="Ask about your money"`
   - Wrong: `placeholder="Type here..."`
7. chat-input-eight-lines MUST Keep the 8-line cap; the field scrolls inside 200px. Because a taller field pushes the last message and Send off a phone screen.
   - Wrong: `<ChatInput className="[&_textarea]:max-h-none" onSubmit={ask}/>`
8. chat-input-min-width SHOULD Give the composer at least 280px; with an action and an amount, less leaves the text too little room.
9. chat-input-two-actions SHOULD Keep actions to one or two 32px ghost icon buttons; put more behind one menu button.
   - Correct: `actions={<Button variant="ghost" size="icon-sm" aria-label="Attach a receipt">...</Button>}`
   - Wrong: `actions={<><Button size="md">Attach</Button><Button size="md">Model</Button></>}`
10. chat-input-no-nested-form NEVER Place a ChatInput inside another form; it is a form. Because nested forms are invalid HTML and the submit bubbles into the outer onSubmit.
   - Correct: `<ChatInput onSubmit={ask}/> // beside the goal form, not inside it`
   - Wrong: `<form onSubmit={saveGoal}><ChatInput onSubmit={ask}/></form>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `onSubmit` | `(text: string) => void` |  | Called with the trimmed text; the field then clears. Required. |
| `value, defaultValue, onValueChange` | `string` | `''` | Controlled or uncontrolled text. |
| `placeholder` | `string` | `'Ask about your money'` | The empty-box hint. |
| `amount, available` | `number` |  | Shows an Amount; Send is off when amount is above available. |
| `currency` | `string` | `'USD'` | ISO 4217 code for the pill. |
| `running, onStop` | `boolean, function` | `false` | Send becomes Stop. |
| `disabled` | `boolean` | `false` | Disables the field and Send. |
| `actions` | `ReactNode` |  | One or two 32px icon buttons before the text. |
| `labels` | `{message?, send?, stop?}` | `English words` | The field label and the names of Send and Stop, for another language. |
Other props pass through to the form element.

## Variants and states
- amount: none, affordable, too much
- actions: none, with controls
- states: empty, ready, focus, cannot-afford, running, disabled

## Accessibility
- [ ] The field is a textbox named by a visually hidden label, Message.
- [ ] Enter sends unless an IME is composing; Shift+Enter starts a new line.
- [ ] Send and Stop are buttons named "Send" and "Stop" unless labels says otherwise.
- [ ] The text is 16px so iOS does not zoom on focus; Send and Stop are 32px, inside a 44px row.

## Edge cases
- Long request -> The field grows to 8 lines then scrolls; Send stays on the last line.
- Phone at 320px -> The row holds; the text takes what the controls leave.
- Right to left -> The row follows the direction; the Send arrow points up in both.
- Spaces only -> Send stays off and Enter does nothing; trim() decides.
- Send fails -> The field already cleared; restore it from a controlled value.
- Enter held down -> Sends once, then the field is empty so repeats do nothing.
- Phone keyboard -> Enter sends; use the keyboard new-line key for a line break.
- Forced colors -> The panel keeps a 1px border; the focus border color change is overridden. Add an outline for focus.

## Tokens
--field, --line-strong, --radius-sheet, --accent-line, --fg, --fg-3, --text-base, --fg-disabled, --control-sm, --accent, --ink, --dur-instant

## Related
- [Textarea](/systems/lime/components/textarea.md): Several lines of text, such as a note on a payment.
- [Amount](/systems/lime/components/amount.md): A money amount with its sign, currency and tabular figures.
- [Message](/systems/lime/components/message.md): One turn in a conversation with the assistant.
- [Follow ups](/systems/lime/components/follow-ups.md): Suggested next requests under an answer.
