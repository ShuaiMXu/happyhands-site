---
name: Code block
system: glaze
kind: component
import: "import {CodeBlock, CopyCodeButton, TokenLine, tokenize, parseLines, commandLines, maskSecret, matchClass, currentMatchClass, languageLabels} from '@/components/glaze/ui/code-block'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/code-block.json"
registryDependencies: [button, icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/code-block
---

# Code block

Shows code or commands to copy.

## Use when
- A file or an excerpt to read or copy: an API call, a config, a prompt template.
- A command to paste into a shell, with or without what it prints.

## Don't use when
- Structured output to fold and search, such as a tool result. Use [JSON view](/systems/glaze/components/json-view.md).
- An ID or a path inside a sentence; write it in <code>. Use [Truncate](/systems/glaze/components/truncate.md).

## Minimal example
```tsx
<CodeBlock code={source} language="ts" filename="agents/refund.ts"/>
<CodeBlock variant="command" code="$ npx agents deploy refund"/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. code-block-command-variant MUST Show shell commands with variant="command" and their prompt, never a $ typed into a block. Because the command variant keeps the prompt and the printed output out of the copy, so a pasted command runs as is.
   - Correct: `<CodeBlock variant="command" code="$ npx agents deploy refund"/>`
   - Wrong: `<CodeBlock code="$ npx agents deploy refund" language="bash"/>`
2. code-block-secret MUST Pass a key inside a command as secret, so it shows as dots and still copies whole. Because a key in plain sight ends up in screenshots and screen shares, and a masked one that copied dots would not run.
   - Correct: `` <CodeBlock variant="command" code={`$ export API_KEY=${key}`} secret={key}/> ``
   - Wrong: `` <CodeBlock variant="command" code={`$ export API_KEY=${key}`}/> ``
3. code-block-no-hue NEVER Colour syntax with hues or a theme from another library. Because colour means status in Glaze, so a green string reads as a pass; the tokens are ink at its steps.
   - Correct: `<CodeBlock code={source} language="ts"/>`
   - Wrong: `<SyntaxHighlighter style={dracula}>{source}</SyntaxHighlighter>`
4. code-block-mono-role NEVER Set code in font-mono at the sans size or restyle the block's type. Because the block sets type-code-block, 12px on a 20px line, sized for reading code line by line; a sans-sized mono reads a size bigger and a smaller one strains.
   - Correct: `<CodeBlock code={source}/>`
   - Wrong: `<pre className="font-mono text-sm">{source}</pre>`
5. code-block-filename SHOULD Give a file its filename; the language label is the fallback. Because the filename says where the code goes, which a language name does not.
6. code-block-highlight SHOULD Highlight the lines the text talks about with highlight, never with a bar or a colour. Because the pressed wash marks them in ink and a screen reader hears "Highlighted".
7. code-block-long SHOULD Set maxLines on code longer than about 30 lines, or link to the file. Because a 200-line block pushes everything after it off the screen.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `code` | `string` |  | The source; in a command block, prompt lines are commands and the rest output. |
| `variant` | `'block' \| 'command'` | `'block'` | A file, or shell commands. |
| `language` | `'ts' \| 'tsx' \| 'js' \| 'json' \| 'bash' \| 'python' \| 'yaml' \| 'text'` | `'text'` | The tokenizer, and the header label without a filename. |
| `filename` | `string` |  | Shown in the header in mono. |
| `header` | `boolean` | `true` | The header row; without it copy floats at the top end. |
| `lineNumbers` | `boolean` | `false` | A gutter selection and copy skip. |
| `highlight` | `number[] \| string` |  | Lines to wash: [3, 4] or "3-4,9". |
| `defaultWrap` | `boolean` | `false` | Start wrapped; the header toggles it. |
| `prompt` | `string` | `'$'` | Command only; never selected or copied. |
| `secret` | `string` |  | Command only; dots until shown, copied whole. |
| `maxLines` | `number` |  | Past this the body scrolls. |
Other props pass through to the figure.

## Variants and states
- variant: block, command
- header: true, false
- states: rest, wrapped, copied, copy failed, secret shown

## Accessibility
- [ ] The body is a focusable region named by the filename or the language, so a keyboard can scroll it.
- [ ] Copy says "Copied" or "Copy failed" once in a status region; the button keeps its name.
- [ ] Line numbers and the prompt are aria-hidden and unselectable; a hidden secret reads "hidden secret".
- [ ] Code text is text-1 and text-2 on --code-surface (paper), 5.5:1 or better in both themes.

## Keyboard
- `Tab`: Reaches the body, then wrap and copy.
- `Arrow keys`: Scroll the focused body.
- `Enter`: Presses the focused wrap, show or copy button.

## Edge cases
- Long line -> Scrolls sideways; wrap breaks it anywhere instead.
- Clipboard refused -> The button says Copy failed and the code stays selectable.
- Right to left page -> Code stays left to right.
- Narrow at 390 -> The language label hides; the filename truncates; the body scrolls.
- Dark theme -> The surface is the dark panel with its hairline; the ink steps flip with the tokens.

## Tokens
--code-surface, --line-faint, --radius-overlay, --type-code-block, --type-caption, --text-1, --text-2, --pressed, --control, --focus

## Related
- [JSON view](/systems/glaze/components/json-view.md): Shows structured data as a foldable tree.
- [Truncate](/systems/glaze/components/truncate.md): Cuts a long line and keeps the whole value.
