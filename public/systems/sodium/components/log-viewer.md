---
name: Log viewer
system: sodium
kind: component
import: "import {LogViewer} from '@/components/sodium/ui/log-viewer'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/log-viewer.json"
registryDependencies: [button, code-block, copy-button, icon, input, scroll, segmented-control, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/log-viewer
---

# Log viewer

Shows a job's output lines as they stream.

## Use when
- A job's, a pipeline's or a worker's output, line by line, often while it still runs.
- Finding the failure in a long log: Next failure, and the toolbar's search and levels.

## Don't use when
- A file or a command to read and copy. Use [Code block](/systems/sodium/components/code-block.md).
- The step's source with the line that failed. Use [Code window](/systems/sodium/components/code-window.md).
- Structured data to fold. Use [JSON view](/systems/sodium/components/json-view.md).

## Minimal example
```tsx
<LogViewer name="run_8f2a91" lines={lines} streaming={running}/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. log-viewer-levels MUST Give every line a level ('debug', 'info', 'warn' or 'fail') and a stable id. Because the level sets the line's word, the failure band, the counts and Next failure, and the id keeps the windowed rows and their measured heights in place as lines arrive.
   - Correct: `{id: 7, level: 'fail', source: 'extract', message: 'NoSuchKey: lake://lake/events/2026-10-18T12'}`
   - Wrong: `{message: "NoSuchKey: lake://lake/events/2026-10-18T12"}`
2. log-viewer-streaming MUST Set streaming while lines arrive and append to lines; never replace the array with only the new ones. Because follow keeps the bottom in view and counts what arrived while the reader scrolled up, which needs every line.
   - Correct: `setLines(prev => [...prev, ...newLines])`
   - Wrong: `setLines(newLines)`
3. log-viewer-toolbar SHOULD Turn toolbar on for a log longer than a screen or two; leave it off for a short one. Because a search and four level filters over eight lines is more chrome than log.
4. log-viewer-no-colour NEVER Colour a message by its level; the level word and the failure band carry it. Because colour in Sodium is status and always comes with a word, and a block of red text is hard to read.
   - Correct: `{level: 'fail', message: 'Read failed'}`
   - Wrong: `{level: 'fail', message: <span className="text-fail-text">Read failed</span>}`
5. log-viewer-name MUST Give name the run, job or worker the log belongs to, as written; label stays the kind of log and is only shown when there is no name. Because the head row is the region header, the name first as written and the counts at the end, and label and name together name the log region for a screen reader, so a page with two logs can be told apart.
   - Correct: `<LogViewer name="run_8f2a91" lines={lines}/>`
   - Wrong: `<LogViewer label="Logs run_8f2a91" lines={lines}/>`
6. log-viewer-no-box NEVER Wrap a LogViewer in a panel, a frame or a CodeBlock. Because the log is a frame already, and a box in a box is two edges where Sodium draws one.
   - Correct: `<LogViewer name="run_8f2a91" lines={lines}/>`
   - Wrong: `<div className="panel"><LogViewer lines={lines}/></div>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `lines` | `LogLine[]` |  | {id, time?, level?, source?, message}. |
| `label` | `string` | `'Logs'` | The kind of log. Names the region with name; the head row's title when there is no name. |
| `name` | `string` |  | Whose log it is, the head row's title as written: "run_8f2a91". |
| `streaming` | `boolean` | `false` | Streaming with the pending mark in the head row. |
| `follow` | `boolean` | `true` | Stick to the bottom; scrolling up pauses it. |
| `toolbar` | `boolean` | `false` | Search and the level filters with their counts. |
| `header` | `boolean` | `true` | The head row. |
| `timestamps` | `boolean` | `true` | The time column; hidden under 640px. |
| `wrap` | `boolean` | `true` | Long messages wrap; off, the log scrolls sideways. |
| `height` | `number` | `320` | px. The log scrolls inside it. |
Other props pass through to the root div.

## Variants and states
- toolbar: off, on
- states: rest, streaming, failed, waiting, empty
- when states meet, the first wins: empty > streaming > failed > rest

## Accessibility
- [ ] The lines are a role="log" region named by label and name, one tab stop, scrolled by the arrow keys; it does not announce every line.
- [ ] A status line says how many lines failed; Next failure is named "Next failure, 2 in this log".
- [ ] Level words are text-3, --warn-text or --fail-text, 4.9:1 or more on the well and the failure band.
- [ ] Copy lines and a hand selection both copy "time LEVEL source message", one line each.
- [ ] The level filters are toggles with their counts read as descriptions; the search is a search field; wrap is a pressed button.

## Keyboard
- `Tab`: Moves through the head row's buttons, the toolbar and the log body.
- `Arrow keys, Page Up / Down`: Scroll the focused log.
- `Escape`: In the search, clears it.

## Edge cases
- 100,000 lines -> Only the lines in view render; Copy lines joins them only on press.
- Reader scrolled up while streaming -> Following stops and a button counts the new lines; it jumps back.
- No lines yet -> Says "Waiting for the first line." while streaming and "No output." after, in a body that tall; it takes height when the first line arrives.
- Filter matches nothing -> Says which query or levels emptied it.
- Long line -> Wraps anywhere; with wrap off, the log scrolls sideways.
- Right to left page -> The log stays left to right, like code.

## Tokens
--code-surface, --panel, --line, --selected, --fail-tint, --fail-text, --warn-text, --text-1, --text-2, --text-3, --type-code, --type-code-sm, --type-label, --row, --control-sm, --space-4

## Related
- [Code window](/systems/sodium/components/code-window.md): Shows a file as a numbered window, with the line that failed.
- [Filter bar](/systems/sodium/components/filter-bar.md): Narrows a table, a log or a list in one row.
- [JSON view](/systems/sodium/components/json-view.md): Shows structured data as a foldable tree.
