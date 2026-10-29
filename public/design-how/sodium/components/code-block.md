---
name: Code block
system: sodium
kind: component
import: "import {CodeBlock, TokenLine, WrapToggle, tokenize, parseLines, commandLines, maskSecret, gutterStyle, maxLinesStyle, matchClass, currentMatchClass, languageLabels} from '@/components/sodium/ui/code-block'"
install: "npx shadcn@latest add https://design.how/r/sodium/code-block.json"
registryDependencies: [button, copy-button, icon, scroll, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/code-block
---

# Code block

Shows code or commands to copy.

## Use when
- A query, a config or a snippet to read or copy.
- A command to paste into a shell, with or without what it prints.

## Don't use when
- A whole file as a step of a pipeline, with the line that failed. Use [Code window](/systems/sodium/components/code-window.md).
- Structured output to fold and search. Use [JSON view](/systems/sodium/components/json-view.md).
- A job's output as it streams. Use [Log viewer](/systems/sodium/components/log-viewer.md).

## Minimal example
```tsx
<CodeBlock code={query} language="sql" filename="orders_by_region.sql"/>
<CodeBlock variant="command" code="$ sodium run ingest-events"/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. code-block-command-variant MUST Show shell commands with variant="command" and their prompt, never a $ typed into a block. Because the command variant keeps the prompt and the printed output out of the copy, so a pasted command runs as is.
   - Correct: `<CodeBlock variant="command" code="$ sodium run ingest-events"/>`
   - Wrong: `<CodeBlock code="$ sodium run ingest-events" language="bash"/>`
2. code-block-secret MUST Pass a key inside a command as secret, so it shows as dots and still copies whole. Because a key in plain sight ends up in screenshots and screen shares, and a masked one that copied dots would not run.
   - Correct: `` <CodeBlock variant="command" code={`$ export SODIUM_KEY=${key}`} secret={key}/> ``
   - Wrong: `` <CodeBlock variant="command" code={`$ export SODIUM_KEY=${key}`}/> ``
3. code-block-no-hue NEVER Colour syntax with hues, yellow, or a theme from another library. Because colour in Sodium is status and yellow is the action, so a green string reads as a pass and a yellow keyword as a button; the tokens are ink at its steps.
   - Correct: `<CodeBlock code={source} language="sql"/>`
   - Wrong: `<SyntaxHighlighter style={dracula}>{source}</SyntaxHighlighter>`
4. code-block-no-caps NEVER Set code in a label role or in capitals. Because code is a value read as written, and capitals change what it says; mono capitals are for interface words only.
   - Correct: `<CodeBlock code={source}/>`
   - Wrong: `<pre className="type-label">{source}</pre>`
5. code-block-filename SHOULD Give a file its filename; the language label is the fallback. Because the filename says where the code goes, which a language name does not.
6. code-block-highlight SHOULD Highlight the lines the text talks about with highlight, never with a bar or a colour. Because the selection wash marks them as a place, and a screen reader hears "Highlighted".
7. code-block-long SHOULD Set maxLines on code longer than about 30 lines, or show it in a Code window. Because a 200-line block pushes everything after it off the screen.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `code` | `string` |  | The source; in a command block, prompt lines are commands and the rest output. |
| `variant` | `'block' \| 'command'` | `'block'` | A file or a snippet, or shell commands. |
| `language` | `'ts' \| 'tsx' \| 'js' \| 'json' \| 'bash' \| 'python' \| 'sql' \| 'yaml' \| 'text'` | `'text'` | The tokenizer, and the head row's label without a filename. |
| `filename` | `string` |  | Shown in the head row as written. |
| `header` | `boolean` | `true` | The head row; without it copy sits at the body's top end. |
| `lineNumbers` | `boolean` | `false` | A gutter selection and copy skip. |
| `highlight` | `number[] \| string` |  | Lines to wash: [3, 4] or "3-4,9". |
| `defaultWrap` | `boolean` | `false` | Start wrapped; the head row toggles it. |
| `prompt` | `string` | `'$'` | Command only; never selected or copied. |
| `secret` | `string` |  | Command only; dots until shown, copied whole. |
| `maxLines` | `number` |  | Past this the body scrolls. |
Other props pass through to the figure.

## Variants and states
- variant: block, command
- header: true, false
- lineNumbers: false, true
- states: rest, highlighted, wrapped, secret hidden, with output

## Accessibility
- [ ] The body is a focusable region named by the filename or the language while it scrolls, so a keyboard can scroll it.
- [ ] Copy says "code copied" or how to copy by hand once in a status region; the cell keeps its name.
- [ ] Line numbers and the prompt are aria-hidden and unselectable; a hidden secret reads "hidden secret".
- [ ] Code is text-1, text-2 and text-3 on the well, 5.1:1 or better in both themes.
- [ ] The wrap toggle is a pressed button named "Wrap lines"; its glyph says which way the lines run.

## Keyboard
- `Tab`: Reaches wrap and copy, then the body while it scrolls.
- `Arrow keys`: Scroll the focused body.
- `Enter`: Presses the focused wrap, show or copy cell.

## Edge cases
- Long line -> Scrolls sideways; wrap breaks it anywhere instead.
- Clipboard refused -> The copy cell shows the warning glyph and says how to copy by hand; the code stays selectable.
- Right to left page -> Code stays left to right.
- Narrow at 390 -> The language label hides; the filename truncates; the body scrolls.
- Dark theme -> The well and the panel step up from the near-black page; the ink steps flip with the tokens.

## Tokens
--code-surface, --panel, --line, --selected, --type-code, --type-code-sm, --type-label-sm, --type-micro, --text-1, --text-2, --text-3, --row-sm, --control, --focus

## Related
- [Code window](/systems/sodium/components/code-window.md): Shows a file as a numbered window, with the line that failed.
- [JSON view](/systems/sodium/components/json-view.md): Shows structured data as a foldable tree.
- [Copy button](/systems/sodium/components/copy-button.md): Copies a value.
