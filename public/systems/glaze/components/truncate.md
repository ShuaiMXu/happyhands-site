---
name: Truncate
system: glaze
kind: component
import: "import {Truncate, TextHint, textHintClass, splitTail} from '@/components/glaze/ui/truncate'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/truncate.json"
registryDependencies: [portal, theme, tooltip, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/truncate
---

# Truncate

Cuts a long line and keeps the whole value.

## Use when
- An ID, a hash or a path in a narrow column, where the tail is what tells two apart.
- A title in a row that must stay one line.
- Any cut value someone needs to read whole: the hint shows it on hover and focus.

## Don't use when
- A paragraph that can wrap; let it wrap. Use [Card](/systems/glaze/components/card.md).
- A row's title, which already truncates. Use [Item](/systems/glaze/components/item.md).

## Minimal example
```tsx
<Truncate position="middle" className="type-code-sm">{trace.id}</Truncate>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. truncate-middle-ids MUST Use position="middle" for an ID, a hash, a key or a path. Because IDs share their prefix, so an end cut leaves run_01J9ZK… on every row and nobody can tell them apart.
   - Correct: `<Truncate position="middle">{trace.id}</Truncate>`
   - Wrong: `<Truncate>{trace.id}</Truncate>`
2. truncate-string-child MUST Pass the full value as a plain string child. Because Truncate measures and splits the string, and the hint repeats it; an element child cannot be cut in the middle.
   - Correct: `<Truncate className="type-label">{name}</Truncate>`
   - Wrong: `<Truncate><b>{name}</b></Truncate>`
3. truncate-no-slice NEVER Cut a value in code with slice or a fixed character count. Because a sliced string loses the rest for copy, find and a screen reader, and cuts at the wrong place at every other width.
   - Correct: `<Truncate position="middle">{id}</Truncate>`
   - Wrong: `{id.slice(0, 12)}…`
4. truncate-sized-parent MUST Give Truncate a parent with a width it cannot grow past: min-w-0 in a flex row, or a max-w. Because a flex child grows to its content by default, so the value never runs out of room and never cuts.
   - Correct: `<div className="flex"><div className="min-w-0 flex-1"><Truncate>{path}</Truncate></div></div>`
   - Wrong: `<div className="flex"><Truncate>{path}</Truncate></div>`
5. truncate-no-title-attr NEVER Add a title attribute for the full value; the hint already shows it. Because a title opens a second, unstyled tooltip over the hint, and only for mouse users.
   - Correct: `<Truncate>{path}</Truncate>`
   - Wrong: `<Truncate title={path}>{path}</Truncate>`
6. truncate-mono-role SHOULD Set an ID's mono through type-code-sm or type-code-xs on Truncate. Because mono at the sans size reads a size bigger than the text beside it.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `children` | `string` |  | The full value. |
| `position` | `'end' \| 'middle'` | `'end'` | Ellipsis at the end, or between head and tail. |
| `tail` | `number \| 'auto'` | `'auto'` | Middle only: characters kept at the end; auto keeps a path's last segment, else 6. |
| `hint` | `boolean` | `true` | The whole value in a hint when cut. |
| `focusable` | `boolean` | `true` | A cut value takes a tab stop to open its hint. |
Other props pass through to the span holding the text.

## Variants and states
- position: end, middle
- states: fits, cut, hint open

## Accessibility
- [ ] The DOM holds the whole value, so a screen reader, copy and find in page get all of it.
- [ ] Only a cut value takes a tab stop; focus opens the hint, Escape closes it.
- [ ] The hint is Tooltip's ink chip, 20:1, and is the same words as the value.

## Keyboard
- `Tab`: Reaches a cut value and opens its hint.
- `Escape`: Closes the hint.

## Edge cases
- Value fits -> Plain text: no hint and no tab stop.
- Very narrow -> The head goes first; the tail and the ellipsis stay.
- Emoji or accents -> The cut lands between characters a person sees, never inside one.
- Copy of a cut value -> Copies the full string.
- Touch screen -> A tap pins the hint open; the next tap or Escape closes it.
- Font loads late -> It measures again once the font is ready.

## Tokens
--ink, --text-inverse, --radius-tag, --type-label-sm, --tooltip-max, --dur-overlay, --dur-state, --z-overlay

## Related
- [Tooltip](/systems/glaze/components/tooltip.md): Names a control on hover or focus.
- [Item](/systems/glaze/components/item.md): Shows one thing as a row in a list.
- [Relative time](/systems/glaze/components/relative-time.md): Shows a time as distance from now.
