---
name: Code window
system: sodium
kind: component
import: "import {CodeWindow} from '@/components/sodium/ui/code-window'"
install: "npx shadcn@latest add https://design.how/r/sodium/code-window.json"
registryDependencies: [code-block, copy-button, scroll, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/code-window
---

# Code window

Shows a file as a numbered window, with the line that failed.

## Use when
- A pipeline step's source on its run page, with the line that raised marked.
- A file a person reads as a whole, with its line numbers, rather than a snippet to copy.

## Don't use when
- A short snippet or a command to copy. Use [Code block](/systems/sodium/components/code-block.md).
- The run's output. Use [Log viewer](/systems/sodium/components/log-viewer.md).

## Minimal example
```tsx
<CodeWindow code={source} language="python" filename="steps/extract.py" fail={[5]}/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. code-window-fail-line MUST Mark the line that failed with fail, never with a red class or a comment typed into the source. Because fail draws the failure band across the window, turns the number to the failure word, adds the FAIL label and says "Failed" to a screen reader, and none of it is copied.
   - Correct: `<CodeWindow code={source} fail={[5]}/>`
   - Wrong: `<CodeWindow code={source.replace(line, line + "  // FAIL")}/>`
2. code-window-one-failure SHOULD Mark only the line that raised, not the lines that called it. Because one band reads as the cause; three read as three failures.
3. code-window-filename MUST Give the window its filename as the path a person would open. Because the header is the window's only name, and "Python" does not say which of the run's steps this is.
   - Correct: `<CodeWindow code={source} language="python" filename="steps/extract.py"/>`
   - Wrong: `<CodeWindow code={source} language="python"/>`
4. code-window-no-window-controls NEVER Draw window controls (dots or squares) in the header. Because they do nothing and say nothing, so they are decoration, and red and yellow already mean a failure and the action in Sodium.
   - Correct: `<CodeWindow code={source} filename="steps/extract.py"/>`
   - Wrong: `<span className="size-2 bg-fail"/><span className="size-2 bg-accent-fill"/><span className="size-2 bg-ok"/>`
5. code-window-highlight SHOULD Mark the lines the page talks about with highlight, and keep fail for the line that broke. Because the selection wash says "look here" and the failure band says "this failed"; a failure drawn as a highlight reads as a pointer, not a cause.
6. code-window-excerpt SHOULD Pass startLine with an excerpt, so its numbers match the file. Because line 5 of an excerpt that starts at 120 is line 124 in the stack trace beside it.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `code` | `string` |  | The source. |
| `language` | `'ts' \| 'tsx' \| 'js' \| 'json' \| 'bash' \| 'python' \| 'sql' \| 'yaml' \| 'text'` | `'text'` | The tokenizer. |
| `filename` | `string` |  | The name, as written, after the language in the header. |
| `fail` | `number[] \| string` |  | Lines that failed: the failure band and the FAIL label. |
| `failLabel` | `string` | `'Fail'` | The label at the end of a failing line, in mono capitals. |
| `highlight` | `number[] \| string` |  | Lines to mark with the selection wash. |
| `startLine` | `number` | `1` | The first line's number. |
| `defaultWrap` | `boolean` | `false` | Start wrapped; the header toggles it. |
| `maxLines` | `number` |  | Past this the body scrolls. |
| `copy` | `boolean` | `true` | The copy cell, last in the header. |
Other props pass through to the figure.

## Variants and states
- fail: none, one line
- states: rest, highlighted, failed, wrapped
- when states meet, the first wins: failed > highlighted > rest

## Accessibility
- [ ] The window is named by its filename.
- [ ] A failing line is read as "Failed:" before its code; a highlighted one as "Highlighted:". Neither is copied.
- [ ] The failure number and label are --fail-text on --fail-tint, 5.7:1 in light; the code on the band stays text-1.
- [ ] Line numbers are aria-hidden and unselectable.

## Keyboard
- `Tab`: Reaches wrap and copy, then the body while it scrolls.
- `Arrow keys`: Scroll the focused body.

## Edge cases
- Long failing line -> The FAIL label sticks to the window's end while the line scrolls under it.
- Failed and highlighted -> Failure wins; the line takes one band.
- Narrow at 390 -> The filename truncates from its end; the body scrolls sideways.
- Forced colours -> Failing and highlighted lines keep an outline; the label keeps its word.
- Dark theme -> The body is the near-black page and the band the dark failure tint.

## Tokens
--page, --panel, --line, --fail-tint, --fail-text, --selected, --type-code, --type-code-sm, --type-label, --type-label-sm, --text-1, --text-2, --text-3, --row, --control-sm, --space-4

## Related
- [Code block](/systems/sodium/components/code-block.md): Shows code or commands to copy.
- [Log viewer](/systems/sodium/components/log-viewer.md): Shows a job's output lines as they stream.
