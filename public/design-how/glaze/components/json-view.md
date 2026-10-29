---
name: JSON view
system: glaze
kind: component
import: "import {JsonView, pathOf} from '@/components/glaze/ui/json-view'"
install: "npx shadcn@latest add https://design.how/r/glaze/json-view.json"
registryDependencies: [button, code-block, icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/json-view
---

# JSON view

Shows structured data as a foldable tree.

## Use when
- A tool result, a run payload or a span's attributes that people search and drill into.
- Someone needs the path to a value for code, a jq filter or a bug report.

## Don't use when
- A file or a snippet to read top to bottom. Use [Code block](/systems/glaze/components/code-block.md).
- A handful of named fields about one thing. Use [Data list](/systems/glaze/components/data-list.md).

## Minimal example
```tsx
<JsonView data={toolCall.output} label="issue_refund result"/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. json-view-not-stringified NEVER Show structured output as JSON.stringify in a CodeBlock when people will search or fold it. Because a flat dump of 400 lines has no folding, no search and no path, so finding steps[2].ms means counting brackets.
   - Correct: `<JsonView data={result} label="Tool result"/>`
   - Wrong: `<CodeBlock code={JSON.stringify(result, null, 2)} language="json"/>`
2. json-view-label MUST Name the tree with label: what the data is, such as "issue_refund result". Because label names the tree, the search field and the scroll region, and "JSON" alone does not say which of three results it is.
3. json-view-depth SHOULD Open two levels by default, and set defaultExpandDepth={1} for payloads over a few hundred rows. Because the top keys tell what is inside, and a fully open large payload buries them.
4. json-view-no-hue NEVER Colour keys, strings or numbers with hues. Because colour means status in Glaze, and JSON view shares Code block's ink steps.
   - Correct: `<JsonView data={d}/>`
   - Wrong: `<JsonView className="[&_[data-slot=json-view-row]]:text-ok-text" data={d}/>`
5. json-view-raw-data MUST Pass the parsed value as data, not a JSON string. Because a string renders as one long string row, with nothing to fold or search inside it.
   - Correct: `<JsonView data={JSON.parse(response.text)}/>`
   - Wrong: `<JsonView data={response.text}/>`
6. json-view-height SHOULD Keep maxRows at about 16 inside a card; the tree scrolls past it. Because an open payload can run to hundreds of rows and push the rest of the card away.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `data` | `unknown` |  | Any JSON-serialisable value; a bigint reads as its digits. |
| `label` | `string` | `'JSON'` | The tree's, the search's and the region's name. |
| `defaultExpandDepth` | `number` | `2` | Branches shallower than this start open. |
| `toolbar` | `boolean` | `true` | Search, open all and close all. |
| `copy` | `boolean` | `true` | Copies the whole value as formatted JSON. |
| `path` | `boolean` | `toolbar` | The focused node's path with copy, under the tree. |
| `maxRows` | `number` | `16` | Past this many rows the tree scrolls. |
Other props pass through to the root div.

## Variants and states
- toolbar: true, false
- states: open, folded, searching, no matches, long string folded

## Accessibility
- [ ] The tree follows the WAI-ARIA tree pattern: role="tree", treeitems with aria-level and aria-expanded, one tab stop.
- [ ] Search reports "2 of 5" or "No matches" in a polite live region.
- [ ] When the tree overflows, its scroll box takes a tab stop so the keyboard can scroll it.
- [ ] Copy and path copy say Copied once in a status region.

## Keyboard
- `Arrow Up and Down`: Move between rows.
- `Arrow Right`: Opens a branch, or moves into it.
- `Arrow Left`: Closes a branch, or moves to its parent.
- `Home and End`: Move to the first and last row.
- `Enter or Space`: Toggles a branch, or unfolds a long string.
- `Enter in search`: Steps to the next match; Shift+Enter steps back.
- `Escape in search`: Clears the search.

## Edge cases
- String over 120 characters -> Folds to 80 with a "+n chars" button.
- Empty object or array -> Shows {} or [] with nothing to open.
- Key with spaces -> The path writes it in brackets: $["user agent"].
- Right to left page -> The tree stays left to right.
- Narrow at 390 -> Rows scroll sideways inside the surface.

## Tokens
--code-surface, --line-faint, --line-control, --radius-overlay, --radius-tag, --type-code-block, --type-caption, --text-1, --text-2, --hover, --pressed, --control-sm, --control

## Related
- [Code block](/systems/glaze/components/code-block.md): Shows code or commands to copy.
- [Data list](/systems/glaze/components/data-list.md): Lists label and value pairs about one thing.
