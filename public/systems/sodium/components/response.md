---
name: Response
system: sodium
kind: component
import: "import {Response, usePacedText, splitChunks, parseMarkdown, closeDangling, nextCut, paceStep, safeHref} from '@/components/sodium/ai/response'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/response.json"
registryDependencies: [code-block, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/response
---

# Response

Renders an agent's answer as it streams.

## Use when
- An agent answers in Markdown, whole or as it streams: an explanation, a list of late partitions, a query.

## Don't use when
- A tool's raw output. Use [Tool call](/systems/sodium/components/tool-call.md).
- One line of what the run is doing. Use [Activity](/systems/sodium/components/activity.md).

## Minimal example
```tsx
<Response live={streaming}>{text}</Response>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. response-append MUST Append each delta to the same string and pass live while the stream is open; set live to false when it ends. Because Response paces an append, freezes every chunk but the tail, and drops the caret only when live turns false.
   - Correct: `<Response live={streaming}>{text}</Response>`
   - Wrong: `<Response>{chunks.at(-1)}</Response>`
2. response-no-html NEVER Render the answer with dangerouslySetInnerHTML or a Markdown library's raw HTML. Because model output can hold script and javascript: links, and Response draws only its own elements and safe links.
   - Correct: `<Response>{text}</Response>`
   - Wrong: `<div dangerouslySetInnerHTML={{__html: marked(text)}}/>`
3. response-names-as-code SHOULD Ask the model to put tables, paths, IDs and partitions in backticks. Because inline code is mono on the well and keeps the name as written, where prose would break it at a hyphen.
4. response-strong-wash MUST Expect **strong** to draw the selection wash, not a heavier weight; keep it to the one fact to find. Because Sodium has one weight, and a paragraph of washed words hides the one that mattered.
   - Correct: `` The write to `events_raw` failed at **partition 812**. ``
   - Wrong: `The **write** to **events_raw** **failed** at **812**.`
5. response-no-caret-at-rest NEVER Draw your own blinking caret after the answer. Because Response shows the typing caret only while live, and a caret at rest reads as a field waiting for input.
   - Correct: `<Response live={streaming}>{text}</Response>`
   - Wrong: `<Response>{text}</Response><span className="caret animate-pulse"/>`
6. response-size SHOULD Use size="sm" in a dense panel or a message beside tool rows, and the default on a run's page. Because 14/20 prose sits with 40px rows, where 15/24 would read as the page's lead.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `children` | `string` | `required` | The Markdown so far. |
| `live` | `boolean` | `false` | Paced reveal, closed dangling syntax and the caret. |
| `size` | `'default' \| 'sm'` | `'default'` | 15/24 or 14/20 prose. |
Other props pass through to the div.

## Variants and states
- size: default, sm
- blocks: list, code, table, quote
- states: streaming, done, open fence

## Accessibility
- [ ] The answer sets aria-busy while live; the caret is aria-hidden.
- [ ] Headings in the answer start at h3, under the page's and the message's own.
- [ ] Links are the dark gold in light (6.2:1) with an underline; an unsafe link is its label only.
- [ ] A code block's copy button is named by its language.

## Edge cases
- Burst of text -> Drains every 24ms in slices that grow with the backlog, cut at word edges.
- Half-written link or a lone ** -> The link waits until it closes; the ** is closed for now.
- Open code fence -> Renders as a code block that grows as lines arrive.
- Text replaced, not appended -> Shows the new text at once.
- Hidden tab or reduced motion -> Shows the full text at once.

## Tokens
--type-body, --type-body-sm, --type-label, --type-label-lg, --type-label-sm, --type-code, --type-micro, --mono-scale, --well, --selected, --accent-text, --accent-edge, --line, --code-surface, --rail, --mark, --caret, --measure, --row-sm

## Related
- [Message](/systems/sodium/components/message.md): Shows one turn of a run's thread.
- [Tool call](/systems/sodium/components/tool-call.md): Shows one tool an agent called in a run.
