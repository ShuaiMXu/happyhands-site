---
name: Response
system: glaze
kind: component
import: "import {Response, usePacedText, splitChunks, parseMarkdown, resolveTag, viableLength, completeJsonEnd, closeJson, nextCut, paceStep, safeHref, responseVariants} from '@/components/glaze/ai/response'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/response.json"
registryDependencies: [code-block, status, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/response
---

# Response

Renders an answer as it streams.

## Use when
- An agent's answer arrives as markdown, all at once or a delta at a time.
- The answer carries structured tags that render as your own components.

## Don't use when
- A file or a command to copy, on its own. Use [Code block](/systems/glaze/components/code-block.md).
- The model's thinking before the answer. Use [Reasoning](/systems/glaze/components/reasoning.md).

## Minimal example
```tsx
<Response streaming={status === 'streaming'} tags={{'refund-card': {pending: 'Preparing refund', render: data => <RefundCard {...data}/>}}}>{text}</Response>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. response-children-string MUST Pass the whole text so far as the one string child, and set streaming while more is coming. Because it paces bursts, closes a dangling ** or ` and holds an open tag only while streaming; a list of chunks re-parses as separate answers.
   - Correct: `<Response streaming={live}>{chunks.map(c => c.text).join('')}</Response>`
   - Wrong: `{chunks.map(c => <Response key={c.id}>{c.text}</Response>)}`
2. response-no-html NEVER Render the answer as HTML with dangerouslySetInnerHTML or a markdown library that allows raw HTML. Because model output is untrusted; Response never writes raw HTML and drops javascript: and data: links to their label.
   - Correct: `<Response>{text}</Response>`
   - Wrong: `<div dangerouslySetInnerHTML={{__html: marked(text)}}/>`
3. response-tags SHOULD Register structured output as tags with a pending label and a render function, not by parsing JSON out of the text yourself. Because a tag shows its placeholder while the JSON is a viable prefix, renders when it completes, and never shows broken JSON.
4. response-mono-roles NEVER Restyle code in an answer with font-mono or a text size; Response sets it. Because inline code is mono at 0.8 of the text around it and a fenced block is CodeBlock at type-code, so mono never looks a size bigger.
   - Correct: `<Response>{text}</Response>`
   - Wrong: `<Response className="[&_code]:font-mono [&_code]:text-sm">{text}</Response>`
5. response-size-sm SHOULD Use size="sm" inside a dense pane, such as Reasoning or a side panel; the default in a thread. Because sm sets 13px text with 8px between blocks, matching the rows around it.
6. response-inline-tags-stable MUST Keep the inlineTags array stable across renders, defined at module scope or memoised. Because its combined pattern is cached per array, and a new array each render rebuilds it on every delta.
   - Correct:
     ```tsx
     const citations = [{pattern: /\[\d+\]/, render}];
     <Response inlineTags={citations}>{text}</Response>
     ```
   - Wrong: `<Response inlineTags={[{pattern: /\[\d+\]/, render}]}>{text}</Response>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `children` | `string` | `required` | The markdown received so far. |
| `streaming` | `boolean` | `false` | Paces bursts, heals dangling syntax at the live edge, holds tags. |
| `size` | `'default' \| 'sm'` | `'default'` | 14 or 13px text. |
| `pace` | `boolean` | `true` | Off renders every delta at once. |
| `tags` | `Record<string, {pending, render, json?}>` |  | Structured tags by name; only these open a tag block. |
| `inlineTags` | `{pattern, render, partial?}[]` |  | Inline tokens such as [n] citations. |
| `tagTimeout` | `number` | `8000` | Ms an unclosed text tag may stall before it shows as text. |
| `maxCodeLines` | `number` | `24` | Lines of a fenced block before it scrolls. |
Other props pass through to the root element.

## Variants and states
- size: default, sm
- states: settled, streaming, open code block, pending tag

## Accessibility
- [ ] The root sets aria-busy while streaming; the thread announces the end, not each delta.
- [ ] Headings render as h3 to h5, so an answer never outranks the page.
- [ ] External links open in a new tab with rel="noreferrer noopener"; a refused link keeps its label as text.
- [ ] Code blocks keep their header copy button and a focusable scroll body.

## Edge cases
- A burst over 512 characters -> Drains every 24ms in slices that snap to a word edge; reduced motion and a hidden tab show it at once.
- A half-typed ** or link at the live edge -> Closed or shown as its label until the rest arrives.
- A table whose separator has not arrived -> Held back until it can render as a table.
- Broken JSON in a tag -> Discarded, never shown raw; prose after it still shows.
- An unknown tag such as <details> -> Stays text and never swallows the lines after it.
- Wide table or code -> Scrolls in its own box.

## Tokens
--type-body, --type-body-sm, --type-heading-sm, --type-label-lg, --type-label, --type-code, --mono-scale, --field, --radius-tag, --line-faint, --text-1, --text-2, --row

## Related
- [Code block](/systems/glaze/components/code-block.md): Shows code or commands to copy.
- [Reasoning](/systems/glaze/components/reasoning.md): Shows what the model thought before answering.
- [Message](/systems/glaze/components/message.md): Shows one turn of a conversation.
