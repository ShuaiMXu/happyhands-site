---
name: Prompt input
system: sodium
kind: component
import: "import {PromptInput} from '@/components/sodium/ai/prompt-input'"
install: "npx shadcn@latest add https://design.how/r/sodium/prompt-input.json"
registryDependencies: [button, icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/prompt-input
---

# Prompt input

Takes the next instruction for an agent.

## Use when
- A person tells an agent what to do next with a pipeline, a job or a table.
- The foot of a run's thread, or one line at the head of a run's page (inline).

## Don't use when
- A form field that takes several lines of a value. Use [Textarea](/systems/sodium/components/textarea.md).
- A search or a filter over a list. Use [Input](/systems/sodium/components/input.md).

## Minimal example
```tsx
<PromptInput placeholder="Ask about this run" status={run.status}
  onSubmit={text => send(text)} onStop={() => stop(run.id)} onAttach={pickFile}/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. prompt-input-one-primary NEVER Add a second primary inside the composer; your tools are ghost buttons or values, and Send stays the one slab. Because Send is the one action the composer leads with, and a second slab beside it splits the eye.
   - Correct: `<PromptInput tools={<Button variant="ghost" size="sm">Attach run</Button>}/>`
   - Wrong: `<PromptInput tools={<Button>Run now</Button>}/>`
2. prompt-input-status MUST Pass the run's status and onStop, so Send turns into Stop while the agent works. Because without them the person can only wait, and Escape has nothing to stop.
   - Correct: `<PromptInput onSubmit={send} status={run.status} onStop={stop}/>`
   - Wrong: `<PromptInput onSubmit={send}/>`
3. prompt-input-keep-text MUST On a failed send, set status="error" and error to a sentence; keep the text. Because the edge turns red and the sentence says why, and an instruction the person wrote is never lost.
   - Correct: `catch { setStatus('error'); setError('Not sent. The agent is offline.') }`
   - Wrong: `catch { setValue('') }`
4. prompt-input-placeholder SHOULD Write the placeholder as an example of an instruction for this place ("Backfill yesterday for eu-west-2"). Because a concrete example says what the agent can do here, where "Type a message" says nothing.
5. prompt-input-no-border-restyle NEVER Restyle the composer's edge, corners or height; place it with className only. Because the edge and the body carry the rest, hover, focus and failure states, and every control sits 6px inside that edge so Send is as far from the end as Attach is from the start.
   - Correct: `<PromptInput className="w-full"/>`
   - Wrong: `<PromptInput className="rounded-lg border-2 border-accent-edge"/>`
6. prompt-input-tools-height MUST Make a tool in the footer 26px (--control-sm), a small Button or a value in a 26px box. Because Attach, your tools, the hint and Send share one centre line 6px above the bottom edge, and a 32px tool pushes the row taller than Send.
   - Correct: `<PromptInput tools={<Button variant="ghost" size="sm">Attach run</Button>}/>`
   - Wrong: `<PromptInput tools={<Button variant="ghost">Attach run</Button>}/>`
7. prompt-input-trim MUST Read the sent text from onSubmit, which trims it and never fires on an empty prompt. Because reading the textarea on a click sends spaces and sends twice on Enter.
   - Correct: `<PromptInput onSubmit={text => send(text)}/>`
   - Wrong: `<Button onClick={() => send(ref.current.value)}>Send</Button>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `onSubmit` | `(text: string) => void` |  | The trimmed text, on Enter or Send. |
| `status` | `'ready' \| 'submitted' \| 'streaming' \| 'error'` | `'ready'` | submitted and streaming turn Send into Stop. |
| `onStop` | `() => void` |  | Shows Stop while the agent works; Escape calls it too. |
| `onAttach` | `() => void` |  | Shows the attach button. |
| `layout` | `'stacked' \| 'inline'` | `'stacked'` | Text over a footer, or one row. |
| `value, defaultValue, onValueChange` | `string, string, function` | `''` | Controlled or not; cleared after a send when not. |
| `tools` | `ReactNode` |  | Your controls in the footer. |
| `error` | `string` |  | The sentence under a failed send. |
| `minRows, maxRows` | `number` | `2, 10 (inline 1, 6)` | Lines at rest and before it scrolls. |
| `disabled` | `boolean` | `false` | Drops the composer to the well. |
| `labels` | `PromptInputLabels` | `English` | Send, Stop, the attach name, the hint, the field's name. |
Other props pass through to the form.

## Variants and states
- layout: stacked, inline
- states: empty, with text, hover, focus, working, not sent, disabled
- when states meet, the first wins: disabled > not sent > working > focus > hover > rest

## Accessibility
- [ ] The textarea is named "Message the agent" (labels.label); the hint is decoration.
- [ ] Send stays in the tab order while the prompt is empty, so it can be found, and refuses the press.
- [ ] A failed send sets aria-invalid and describes the field by its error sentence.
- [ ] Focus turns the body white with the edge --focus doubled inward and a pale halo, as in every Sodium field; Send is the real Button, so its disabled look and focus ring are the button's.

## Keyboard
- `Enter`: Sends; nothing fires while an IME is composing.
- `Shift+Enter`: Breaks the line.
- `Escape`: Stops the run while the agent works.

## Edge cases
- Long instruction -> Grows to ten lines (six inline), then scrolls.
- Enter while working -> Still sends, so the product can queue it.
- Only spaces -> Never sends.
- No field-sizing in the browser -> Grows by measuring its scroll height instead.
- Dark theme -> Send becomes the yellow tint with a yellow line and label.

## Tokens
--field-bg, --field-hover, --field-edge-hover, --field-ring-hover, --field-focus-bg, --field-ring-focus, --field-ring-fail, --line, --focus, --fail, --fail-text, --well, --text-1, --text-3, --type-body-sm, --type-micro, --type-caption, --control-sm, --space-1-5, --primary-bg, --primary-text, --primary-edge, --dur-light

## Related
- [Message](/systems/sodium/components/message.md): Shows one turn of a run's thread.
- [Response](/systems/sodium/components/response.md): Renders an agent's answer as it streams.
- [Textarea](/systems/sodium/components/textarea.md): Takes several lines of text.
