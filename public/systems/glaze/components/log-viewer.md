---
name: Log viewer
system: glaze
kind: component
import: "import {LogViewer} from '@/components/glaze/ui/log-viewer'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/log-viewer.json"
registryDependencies: [button, code-block, empty-state, icon, input, segmented-control, status, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/log-viewer
---

# Log viewer

Shows a run's output lines as they stream.

## Use when
- A run's, a deploy's or an eval's output, line by line, often while it still runs.
- Finding the failure in a long log: Next failure, and the toolbar's search and levels.

## Don't use when
- A file or a command to read and copy. Use [Code block](/systems/glaze/components/code-block.md).
- Structured data to fold. Use [JSON view](/systems/glaze/components/json-view.md).
- When each step started and how long it took. Use [Timeline](/systems/glaze/components/timeline.md).

## Minimal example
```tsx
<LogViewer label="Run run_8f2a91" lines={lines} streaming={running}/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. log-viewer-levels MUST Give every line a level ('debug', 'info', 'warn' or 'fail') and a stable id. Because the level sets the line's colour word, the counts and Next failure, and the id keeps the windowed rows and their measured heights in place as lines arrive.
   - Correct: `{id: 7, level: 'fail', source: 'payments.refund', message: 'POST /v1/refunds 402'}`
   - Wrong: `{message: "POST /v1/refunds 402"}`
2. log-viewer-streaming MUST Set streaming while lines arrive and append to lines; never replace the array with only the new ones. Because follow keeps the bottom in view and counts what arrived while the reader scrolled up, which needs every line.
   - Correct: `setLines(prev => [...prev, ...newLines])`
   - Wrong: `setLines(newLines)`
3. log-viewer-toolbar SHOULD Turn toolbar on for a log longer than a screen or two; leave it off for a short one. Because a search and four level filters over eight lines is more chrome than log.
4. log-viewer-no-color NEVER Colour a line or its message by level; the level word carries it. Because colour means status in Glaze and always comes with a word, and a red block of text is hard to read.
   - Correct: `{level: 'fail', message: 'Refund failed'}`
   - Wrong: `{level: 'fail', message: <span className="text-fail-text">Refund failed</span>}`
5. log-viewer-label MUST Give label a noun phrase that names whose log it is: "Deploy log for api@v314". Because it is the head row's title and the log region's name, so a page with two logs can be told apart.
   - Correct: `<LogViewer label="Run run_8f2a91" lines={lines}/>`
   - Wrong: `<LogViewer lines={lines}/>`
6. log-viewer-no-box NEVER Wrap a LogViewer in a Card or a CodeBlock; it is the card, or takes frame="none" inside one. Because a card around a card is two edges where one closes the group.
   - Correct: `<LogViewer label="Run" lines={lines}/>`
   - Wrong: `<Card><LogViewer lines={lines}/></Card>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `lines` | `LogLine[]` |  | {id, time?, level?, source?, message}. |
| `label` | `string` | `'Logs'` | The head row's title and the log's name. |
| `streaming` | `boolean` | `false` | Streaming with the running arc in the head row. |
| `follow` | `boolean` | `true` | Stick to the bottom; scrolling up pauses it. |
| `toolbar` | `boolean` | `false` | Search, level filters with counts, wrap. |
| `header` | `boolean` | `true` | The head row. |
| `timestamps` | `boolean` | `true` | The time column; hidden under 640px. |
| `wrap` | `boolean` | `true` | Long messages wrap; off, the log scrolls sideways. |
| `height` | `number` | `320` | px. The log scrolls inside it. |
| `frame` | `'card' \| 'none'` | `'card'` | The shell and panel, or bare inside a Card. |
Other props pass through to the root div.

## Variants and states
- toolbar: off, on
- states: rest, streaming, failed, waiting, empty
- when states meet, the first wins: empty > streaming > failed > rest

## Accessibility
- [ ] The lines are a role="log" region named by label, one tab stop, scrolled by the arrow keys; it does not announce every line.
- [ ] A status line says how many lines failed; Next failure is named "Next failure, 2 in this log".
- [ ] Level words are text-2, --warn-text or --fail-text, all 5.2:1 or more on --code-surface.
- [ ] Copy lines and a hand selection both copy "time LEVEL source message", one line each.
- [ ] The level filters are toggles with their counts read as descriptions; the search is a search field.

## Keyboard
- `Tab`: Moves through the head row's buttons, the toolbar and the log body.
- `Arrow keys, Page Up / Down`: Scroll the focused log.
- `Escape`: In the search, clears it.

## Edge cases
- 100,000 lines -> Only the lines in view render; Copy lines joins them only on press.
- Reader scrolled up while streaming -> Following stops and a flat pill counts the new lines and failures; it jumps back.
- No lines yet -> Shows a small centred empty state, "Waiting for the first line" while streaming and "No output" after, in a body that tall; it takes height when the first line arrives.
- Filter matches nothing -> Says which query or levels emptied it.
- Long line -> Wraps anywhere; with wrap off, the log scrolls sideways.
- Right-to-left page -> The log stays left to right, like code.

## Tokens
--shell, --paper, --code-surface, --line-faint, --pressed, --text-1, --text-2, --warn-text, --fail-text, --type-code-block, --type-label, --row, --control-sm

## Related
- [Code block](/systems/glaze/components/code-block.md): Shows code or commands to copy.
- [Timeline](/systems/glaze/components/timeline.md): Shows when each step of a run happened.
- [JSON view](/systems/glaze/components/json-view.md): Shows structured data as a foldable tree.
