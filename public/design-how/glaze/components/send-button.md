---
name: Send button
system: glaze
kind: component
import: "import {SendButton} from '@/components/glaze/ai/send-button'"
install: "npx shadcn@latest add https://design.how/r/glaze/send-button.json"
registryDependencies: [button, icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/send-button
---

# Send button

Sends a prompt, or stops the reply.

## Use when
- A composer sends a prompt and the same spot stops the reply while the agent works.
- A custom composer needs the send and stop rules PromptInput already uses.

## Don't use when
- The whole composer is wanted: text, attachments, model picker and send. Use [Prompt input](/systems/glaze/components/prompt-input.md).
- The action is not sending a message, such as Run or Publish. Use [Button](/systems/glaze/components/button.md).

## Minimal example
```tsx
<SendButton status={status} generation={runId} empty={!draft} onClick={send} onStop={stop}/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. send-button-stop-early MUST Set status="submitted" the moment the prompt leaves, before any byte comes back, so the button is already Stop. Because a button that stays Send or goes disabled while a request is in flight leaves a slow or stuck run with no way to cancel it.
   - Correct: `<SendButton status={sending ? (firstToken ? 'streaming' : 'submitted') : 'ready'}/>`
   - Wrong: `<SendButton status={firstToken ? 'streaming' : 'ready'} disabled={sending}/>`
2. send-button-generation MUST Pass the run id as generation and settle only the run onStop names. Because Stop fires once per generation; without one a late stop echo from the last run can cancel the next.
   - Correct: `<SendButton status="streaming" generation={run.id} onStop={id => cancel(id)}/>`
   - Wrong: `<SendButton status="streaming" onStop={() => cancel(currentRun)}/>`
3. send-button-one-primary NEVER Put a second primary Button (ink, coral or green) in the composer beside it; attach, the mic and the model picker are variant="ghost". Because Send is the composer's one glass key, and a second glass pill beside it splits the eye.
   - Correct:
     ```tsx
     <Button size="icon-sm" variant="ghost" aria-label="Attach"><Icon icon={Add}/></Button>
     <SendButton/>
     ```
   - Wrong:
     ```tsx
     <Button size="icon-sm" aria-label="Attach"><Icon icon={Add}/></Button>
     <SendButton/>
     ```
4. send-button-blocked-reason MUST Use blockedReason, with the same words in visible text beside it, when uploads or a failed file stop the send. Because blockedReason keeps the button focusable with its reason as the description; a bare disabled button tells nobody why.
   - Correct: `<SendButton blockedReason="Waiting for 2 uploads"/>`
   - Wrong: `<SendButton disabled={uploading > 0}/>`
5. send-button-no-children NEVER Pass children, a variant or a label of your own; it draws the arrow and the square and names itself. Because its name follows its state (Send, Stop, Stopping, Send again) and a label in children never changes with it.
   - Correct: `<SendButton labels={{send: 'Envoyer', stop: 'Arrêter'}}/>`
   - Wrong: `<SendButton>Send</SendButton>`
6. send-button-error-words MUST Say a failed send in words next to it; status="error" only renames it Send again. Because the key stays ink, since coral glass means an action that cannot be undone, so without the words nothing says it failed.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `status` | `'ready' \| 'submitted' \| 'streaming' \| 'stopping' \| 'error'` | `'ready'` | submitted, streaming and stopping draw Stop; error draws Send again. |
| `onStop` | `(generation) => void` |  | Called once per generation from Stop. |
| `generation` | `string \| number` |  | The run Stop applies to; a new one re-arms it. |
| `empty` | `boolean` | `false` | Nothing to send: the disabled pill. Ignored while working. |
| `blockedReason` | `string` |  | Disabled but focusable, with this as its description. |
| `size` | `'icon-sm' \| 'icon' \| 'icon-lg'` | `'icon-sm'` | 26px in a composer row, 32 or 36 elsewhere. |
| `labels` | `{send, stop, stopping, sendAgain}` | `English` | The names in each state, for another language. |
Other props pass through to the button element (Glaze Button).

## Variants and states
- size: icon-sm, icon, icon-lg
- states: ready, empty, blocked, stop, stopping, error, hover, held, focus-visible
- when states meet, the first wins: stopping > stop > blocked > empty > error > held > focus-visible > hover > ready

## Accessibility
- [ ] Its name is the state: Send, Stop, Stopping or Send again; the glyph is aria-hidden.
- [ ] aria-keyshortcuts says Enter while ready and Escape while working.
- [ ] Blocked stays in the tab order with the reason as its description; stopping sets aria-busy and keeps focus.
- [ ] Focus is the 2px ink ring on every state.

## Keyboard
- `Enter, Space`: Sends, or stops while the agent works.

## Edge cases
- Double click on Stop -> The second press is dropped; onStop runs once for the generation.
- A new run starts while stopping -> A new generation re-arms Stop for that run.
- Dark theme -> The ink glass turns light with an ink arrow; disabled is the same flat grey pill.
- Forced colors -> The glass drops to ButtonText edges; the stop square takes CanvasText.

## Tokens
--glass-ink-base, --glass-rim, --glass-ink-text, --control-sm, --control, --control-lg, --icon-sm, --field, --text-disabled, --focus

## Related
- [Prompt input](/systems/glaze/components/prompt-input.md): Takes the next message for an agent.
- [Button](/systems/glaze/components/button.md): Starts an action.
