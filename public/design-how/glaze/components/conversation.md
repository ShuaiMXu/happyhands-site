---
name: Conversation
system: glaze
kind: component
import: "import {Conversation, ConversationProvider, ConversationViewport, ConversationContent, ConversationItem, ConversationTail, ConversationJump, ConversationTimeline, ConversationRetry, ConversationError, useConversation, useStickToBottom, useStableRows, useCountdown, STICK, REATTACH} from '@/components/glaze/ai/conversation'"
install: "npx shadcn@latest add https://design.how/r/glaze/conversation.json"
registryDependencies: [badge, button, icon, message, status, theme, tool-call, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/conversation
---

# Conversation

Holds a thread that follows new replies.

## Use when
- An agent streams replies into a thread and the view should follow them until the person scrolls away.
- A thread mixes turns, a thinking row, retries, errors and dividers.

## Don't use when
- A static transcript that never grows. Use [Message](/systems/glaze/components/message.md).
- A log of lines with levels and search. Use [Code block](/systems/glaze/components/code-block.md).

## Minimal example
```tsx
<Conversation status={status}>
  <ConversationViewport aria-label="Refund agent">
    <ConversationContent><ConversationTimeline rows={rows} onRetry={retry}/></ConversationContent>
  </ConversationViewport>
  <ConversationJump/>
</Conversation>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. conversation-status MUST Set status to streaming while a turn runs and to idle, stopped or error when it ends. Because it drives aria-busy, the height floor that keeps the view from jumping, the thinking row and the one announcement per turn end.
   - Correct: `<Conversation status={run.status}>...</Conversation>`
   - Wrong: `<Conversation>{rows}</Conversation>`
2. conversation-snap-on-send MUST Call snap() from useConversation when the person sends; wrap the composer in ConversationProvider to reach it. Because the view lets go only on a gesture, so a person reading earlier turns would send and not see their own message.
   - Correct:
     ```tsx
     <ConversationProvider status={status}><Conversation>...</Conversation><Composer onSubmit={() => { send(); snap(); }}/></ConversationProvider>
     ```
3. conversation-no-auto-scroll NEVER Scroll the viewport yourself on every delta. Because it fights the person who scrolled up to read; the viewport follows while attached and lets go only on a wheel, swipe, key or scrollbar drag up.
   - Correct: `<ConversationViewport>...</ConversationViewport>`
   - Wrong: `useEffect(() => viewport.scrollTo(0, viewport.scrollHeight), [text])`
4. conversation-typed-rows SHOULD Pass rows to ConversationTimeline as typed data and keep each row object stable. Because structurally equal rows keep their identity, so a delta re-renders only the row it touched.
5. conversation-abort-divider MUST Show a stopped turn as a divider row with reason "interrupted", never as an error row. Because the person stopped it on purpose, and an error says something broke.
   - Correct: `{type: 'divider', id, reason: 'interrupted'}`
   - Wrong: `{type: 'error', id, kind: 'server', message: 'Aborted'}`
6. conversation-no-card NEVER Put the thread in a card or a panel; it is a scroll column on the page. Because the person's bubbles are the only boxes in a thread, and a shell around it adds a frame to everything inside.
   - Correct: `<Conversation className="h-full">...</Conversation>`
   - Wrong: `<Card><Conversation>...</Conversation></Card>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `status` | `'idle' \| 'streaming' \| 'stopped' \| 'error'` | `'idle'` | On Conversation, or on ConversationProvider when the composer sits outside. |
| `ConversationViewport aria-label, labels` | `string, {complete, stopped, failed}` | `"Conversation"` | The log's name and the announcement when a turn ends. |
| `ConversationTimeline rows` | `ConversationRow[]` | `required` | user, assistant, thinking, retry, error, diff and divider rows. |
| `ConversationTimeline renderRow, onRetry, labels` | `functions, ConversationLabels` |  | Replace a row's renderer, retry an error row, other words. |
| `ConversationJump waiting` | `boolean` | `true` | Goes to a call waiting on the person when one is out of view. |
| `ConversationItem rowKey, pinned` | `string, boolean` |  | A custom row: its key keeps the place on a prepend; pinned is always laid out. |
| `useConversation()` | `{attached, distance, atEnd, scrollToEnd, snap, detach}` |  | The thread's state and controls. |
| `useStickToBottom(ref)` | `hook` |  | The same follow model for any pane that streams. |
Other props pass through to the root element.

## Variants and states
- row: user, assistant, thinking, retry, error, divider, diff
- states: idle, streaming, stopped, error

## Accessibility
- [ ] The viewport is role="log" with aria-live off and one status region that says complete, stopped or failed when a turn ends.
- [ ] The viewport is focusable with the inset ink ring; ArrowUp, PageUp and Home let go of the end, End returns.
- [ ] Jump to latest is inert while near the end; when it hides with focus, focus moves to the thread.
- [ ] Waiting on you goes to the waiting call and focuses its first action, Deny.

## Keyboard
- `ArrowUp, PageUp, Home`: Scroll up and stop following.
- `End`: Returns to the end and follows again.

## Edge cases
- Selecting text while it streams -> Following pauses until the selection collapses.
- A loader replaced by shorter text -> The height floor holds while streaming, so the view never jumps.
- History prepended above -> The row under the reader stays where it was.
- Long thread -> Offscreen rows skip layout; the last user row and the last row are always laid out.
- Reduced motion -> Jumps scroll at once instead of smoothly.

## Tokens
--page, --fail-tint, --fail-text, --radius-overlay, --control, --row, --z-raised, --focus, --dur-state

## Related
- [Message](/systems/glaze/components/message.md): Shows one turn of a conversation.
- [Prompt input](/systems/glaze/components/prompt-input.md): Takes the next message for an agent.
- [Activity](/systems/glaze/components/activity.md): Says what the agent is doing now.
