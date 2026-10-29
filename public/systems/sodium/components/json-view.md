---
name: JSON view
system: sodium
kind: component
import: "import {JsonView, pathOf} from '@/components/sodium/ui/json-view'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/json-view.json"
registryDependencies: [button, code-block, copy-button, icon, input, scroll, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/json-view
---

# JSON view

Shows structured data as a foldable tree.

## Use when
- A run's result, a job's config or a partition's stats that people search and drill into.
- Someone needs the path to a value for a query, a jq filter or a ticket.

## Don't use when
- A file or a snippet to read top to bottom. Use [Code block](/systems/sodium/components/code-block.md).
- Records that share the same fields. Use [Table](/systems/sodium/components/table.md).

## Minimal example
```tsx
<JsonView data={run.result} label="run_8f2a91 result"/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. json-view-not-stringified NEVER Show structured output as JSON.stringify in a CodeBlock when people will search or fold it. Because a flat dump of 400 lines has no folding, no search and no path, so finding partitions[2].rows means counting brackets.
   - Correct: `<JsonView data={result} label="run_8f2a91 result"/>`
   - Wrong: `<CodeBlock code={JSON.stringify(result, null, 2)} language="json"/>`
2. json-view-label MUST Name the tree with label: what the data is, such as "run_8f2a91 result". Because label names the tree, the search field and the scroll region, and "JSON" alone does not say which of three results it is.
   - Correct: `<JsonView data={result} label="run_8f2a91 result"/>`
   - Wrong: `<JsonView data={result}/>`
3. json-view-raw-data MUST Pass the parsed value as data, not a JSON string. Because a string renders as one long string row, with nothing to fold or search inside it.
   - Correct: `<JsonView data={JSON.parse(response.text)}/>`
   - Wrong: `<JsonView data={response.text}/>`
4. json-view-no-hue NEVER Colour keys, strings or numbers with hues or yellow. Because colour in Sodium is status and yellow is the action, and JSON view shares Code block's ink steps.
   - Correct: `<JsonView data={d} label="Result"/>`
   - Wrong: `<JsonView className="[&_[data-slot=json-view-row]]:text-ok-text" data={d}/>`
5. json-view-depth SHOULD Open two levels by default, and set defaultExpandDepth={1} for payloads over a few hundred rows. Because the top keys tell what is inside, and a fully open large payload buries them.
6. json-view-height SHOULD Keep maxRows near 16 beside other regions; the tree scrolls past it. Because an open payload can run to hundreds of rows and push the rest of the page away.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `data` | `unknown` |  | Any JSON-serialisable value; a bigint reads as its digits. |
| `label` | `string` | `'JSON'` | The tree's, the search's and the region's name. |
| `defaultExpandDepth` | `number` | `2` | Branches shallower than this start open. |
| `toolbar` | `boolean` | `true` | Search, open all and close all. |
| `copy` | `boolean` | `true` | Copies the whole value as formatted JSON. |
| `path` | `boolean` | `toolbar` | The focused node's path with a copy cell, under the tree. |
| `maxRows` | `number` | `16` | Past this many rows the tree scrolls. |
Other props pass through to the root div.

## Variants and states
- toolbar: true, false
- states: open, folded, long string folded

## Accessibility
- [ ] The tree follows the WAI-ARIA tree pattern: role="tree", treeitems with aria-level and aria-expanded, one tab stop.
- [ ] Search reports its "2/5" place in a polite live region.
- [ ] When the tree overflows, its scroll box takes a tab stop so the keyboard can scroll it.
- [ ] Copy and path copy say they copied once in a status region.

## Keyboard
- `Arrow Up and Down`: Move between rows.
- `Arrow Right`: Opens a branch, or moves into it.
- `Arrow Left`: Closes a branch, or moves to its parent.
- `Home and End`: Move to the first and last row.
- `Enter or Space`: Toggles a branch, or unfolds a long string.
- `Enter in search`: Steps to the next match; Shift+Enter steps back.
- `Escape in search`: Clears the search.

## Edge cases
- String over 120 characters -> Folds to 80 with a "+n chars" cell.
- Empty object or array -> Shows {} or [] with nothing to open.
- Key with spaces -> The path writes it in brackets: $["row count"].
- Search matches nothing -> The tree says so in a sentence, with the query in mono.
- Right to left page -> The tree stays left to right.
- Narrow at 390 -> Rows scroll sideways inside the frame.

## Tokens
--code-surface, --panel, --line, --hover, --selected, --selected-strong, --accent-edge, --type-code, --type-code-sm, --type-micro, --text-1, --text-2, --text-3, --row-sm, --control-sm

## Related
- [Code block](/systems/sodium/components/code-block.md): Shows code or commands to copy.
- [Table](/systems/sodium/components/table.md): Lists records that share the same fields.
