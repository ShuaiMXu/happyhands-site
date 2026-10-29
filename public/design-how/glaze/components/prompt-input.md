---
name: Prompt input
system: glaze
kind: component
import: "import {PromptInput, PromptInputModel, PromptAttachment, PromptQueue, PromptInputMic, serializePrompt, acceptsFile} from '@/components/glaze/ai/prompt-input'"
install: "npx shadcn@latest add https://design.how/r/glaze/prompt-input.json"
registryDependencies: [attachment, button, icon, input, mention, overlay, portal, send-button, status, theme, tooltip, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/prompt-input
---

# Prompt input

Takes the next message for an agent.

## Use when
- A person writes the next turn for an agent: text, @ mentions, / commands, files, a model.
- The agent may still be working and the composer must stop it or queue the next message.

## Don't use when
- A form field takes a few plain lines with no send. Use [Textarea](/systems/glaze/components/textarea.md).
- A search box filters a list. Use [Input](/systems/glaze/components/input.md).

## Minimal example
```tsx
const composer = useRef<PromptInputHandle>(null);
<PromptInput ref={composer} status={status} generation={run.id} onSubmit={value => send(value.serialized)} onStop={stop}
  mentions={files} commands={commands} attachments={files} onAttach={upload}
  tools={<DropdownMenu><DropdownMenuTrigger render={<PromptInputModel model={model}/>}/>...</DropdownMenu>}/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. prompt-input-serialized MUST Send value.serialized to the model and keep value.mentions; never rebuild the prompt from the editor DOM. Because serialized writes each chip as [label](type:id) and each collapsed paste in full; the DOM holds chip labels and a "Pasted 12 lines" stub.
   - Correct: `onSubmit={value => send(value.serialized, value.mentions)}`
   - Wrong: `onSubmit={() => send(editor.innerText)}`
2. prompt-input-status MUST Drive status from the run: submitted the moment it sends, streaming on the first byte, ready when it ends, and pass generation. Because Send turns into Stop from submitted, Escape stops only while working, and generation keeps a late stop from cancelling the next run.
   - Correct: `<PromptInput status={run.status} generation={run.id} onStop={id => cancel(id)}/>`
   - Wrong: `<PromptInput status={done ? 'ready' : 'streaming'}/>`
3. prompt-input-one-glass NEVER Put a primary Button in tools or meta; the model picker is PromptInputModel and every other tool variant="ghost". Because Send is the composer's one glass key, and a second one on the same row reads as two next steps.
   - Correct:
     ```tsx
     <PromptInput tools={<><PromptInputModel model="Glaze Large"/><Button size="sm" variant="ghost">Deep research</Button></>}/>
     ```
   - Wrong: `<PromptInput tools={<Button size="sm">Deep research</Button>}/>`
4. prompt-input-uncontrolled NEVER Control the text with value and setState; read it through onValueChange and drive it through the ref. Because chips are atomic nodes in a contenteditable, and re-rendering its text from state moves the caret and breaks every chip.
   - Correct:
     ```tsx
     <PromptInput ref={composer} onValueChange={v => setDraft(v)}/>
     composer.current?.insert('[run 4812](run:run_4812) ')
     ```
   - Wrong: `<PromptInput value={draft} onValueChange={v => setDraft(v.text)}/>`
5. prompt-input-uploads MUST Pass every file as an attachment with its status and progress, and onRetryAttachment for a failed one. Because Send waits for uploads and blocks on a failed file with its name in the status line, so nothing a person attached is dropped without a word.
6. prompt-input-queue SHOULD Pass messages written while the agent works as queue={<PromptQueue items={queued}/>}, with onSendQueuedNow and onEditQueued. Because the queue then sits in the composer's shell as a second panel, Enter on an empty prompt sends its head and ArrowUp edits its tail.
7. prompt-input-disabled-reason MUST Give disabled a disabledReason, and disabledAction when there is a way out. Because a composer that silently refuses input reads as broken; the reason sits in the panel and describes the editor.
   - Correct:
     ```tsx
     <PromptInput disabled={outOfCredits} disabledReason="Out of credits for this workspace" disabledAction={<Button size="sm" variant="secondary">See plans</Button>}/>
     ```
   - Wrong: `<PromptInput disabled={outOfCredits}/>`
8. prompt-input-draft SHOULD Set draftKey per thread, so a reload keeps what the person was writing. Because the draft saves 200ms after the last edit and clears on send; one key across threads would carry one thread's draft into another.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `onSubmit` | `(value: PromptValue, attachments) => void` |  | value has text, serialized, mentions and mode; attachments are the finished files. |
| `onValueChange` | `(value: PromptValue) => void` |  | Every edit. |
| `status, generation, onStop` | `SendStatus, string \| number, (generation) => void` | `'ready'` | Passed to SendButton; Escape stops too. |
| `layout` | `'stacked' \| 'inline'` | `'stacked'` | stacked puts the toolbar on the shell's footer row; inline is one row in the panel. |
| `mentions, commands` | `MentionItem[], CommandItem[]` | `[]` | What @ and / offer. |
| `shell, mode, onModeChange` | `boolean, 'normal' \| 'shell'` | `false` | ! on an empty prompt enters shell mode: mono, a $, sent with mode "shell". |
| `attachments, onAttach, onRemoveAttachment, onRetryAttachment, accept` | `Attachment[], handlers, string` |  | Files from the paperclip, a paste or a drop. Leave onAttach out to hide the paperclip. |
| `tools, meta, voice` | `ReactNode, ReactNode, PromptInputMicProps` |  | The model picker and other ghost tools; a context meter before Send; the mic. |
| `queue, onSendQueuedNow, onEditQueued` | `ReactNode, () => void, () => boolean` |  | A PromptQueue, a panel in the same shell above the text. |
| `disabled, disabledReason, disabledAction` | `boolean, ReactNode, ReactNode` |  | No input at all, with why and a way out. |
| `draftKey, defaultValue, maxLength` | `string, string, number` | `maxLength 100,000` | A saved draft wins over defaultValue; [label](type:id) tokens become chips. |
| `waitingCount, onReviewWaiting` | `number, () => void` | `0` | Calls waiting on the person, said in the status line with Review. |
| `ref` | `PromptInputHandle` |  | focus(), clear(), insert(text), getValue(). |
| `labels` | `PromptInputLabels` | `English` | Every word, Send's and the files' included. |
Other props pass through to the root element.

## Variants and states
- layout: stacked, inline
- states: empty, typing, focused, shell, working, queued, uploading, blocked, disabled
- when states meet, the first wins: disabled > shell > working > uploading > blocked > typing > empty

## Accessibility
- [ ] The editor is a multi-line textbox named by label, with aria-controls and aria-activedescendant on the @ and / list.
- [ ] The status line is a status region and describes the editor; uploads, a failed file and an undo are said there.
- [ ] A chip is one node: Backspace removes it whole and Mod+Z or the Undo link puts it back.
- [ ] Focus darkens the panel's edge to the focus line; the editor itself draws no ring.
- [ ] Escape is consumed only when it closes the list, leaves shell mode, cancels a held send or stops the run.

## Keyboard
- `Enter`: Sends; while working with an empty prompt, sends the queue's head.
- `Shift+Enter`: Breaks the line.
- `@ and /`: Open the mention list, or the command list.
- `Up, Down, Enter, Tab`: Move in the open list and pick.
- `Escape`: Closes the list, leaves shell mode, cancels a held send, stops the run, then blurs.
- `ArrowUp on empty`: Edits the last queued message.

## Edge cases
- IME composition -> Nothing fires while composing, including Enter.
- A paste of 3 lines or 150 characters -> Collapses into a "Pasted 12 lines" chip, sent in full; a click expands it.
- A paste past maxLength -> Refused, with how much fits in the status line.
- A file type accept refuses -> The drop overlay turns to the failure tint and says what fits before the drop.
- Send while uploading -> Held: the status line says it sends when they finish, with Cancel.
- Phone width -> The tools take their own row under 320px; Send stays on the bottom line.

## Tokens
--shell, --paper, --field, --line-faint, --line-focus, --radius-shell, --radius-panel, --shell-inset, --control-sm, --type-body, --type-code, --type-caption, --text-1, --text-2, --text-3, --fail, --fail-tint, --fail-text, --dur-state

## Related
- [Send button](/systems/glaze/components/send-button.md): Sends a prompt, or stops the reply.
- [Mention](/systems/glaze/components/mention.md): Names a resource inside a prompt or answer.
- [Textarea](/systems/glaze/components/textarea.md): Takes several lines of text.
- [Attachment](/systems/glaze/components/attachment.md): Shows a file and its upload state.
