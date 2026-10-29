---
name: Tag
system: sodium
kind: component
import: "import {Tag, tagVariants} from '@/components/sodium/ui/tag'"
install: "npx shadcn@latest add https://design.how/r/sodium/tag.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/tag
---

# Tag

Labels what something is or how it stands.

## Use when
- A row or a header names what a thing is: an environment, an engine, a tier, a region.
- A static outcome that never moves, such as a check that passed on a past run.
- A count beside a name: open incidents, unread alerts.

## Don't use when
- Work that moves from queued to running to done. Use [Status](/systems/sodium/components/status.md).
- The person removes or picks the label. Use [Combobox](/systems/sodium/components/combobox.md).
- A key the person presses. Use [Kbd](/systems/sodium/components/kbd.md).

## Minimal example
```tsx
<Tag>Prod</Tag>
<Tag variant="fail">Schema drift</Tag>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. tag-status-only MUST Keep ok, warn and fail for outcomes, each with the word that names it; name kinds of thing with neutral or outline. Because colour means an outcome in Sodium, so a green environment tag reads as a check that passed.
   - Correct: `<Tag>Prod</Tag>`
   - Wrong: `<Tag variant="ok">Prod</Tag>`
2. tag-never-yellow NEVER Paint a Tag in the sodium yellow, as a fill, an edge or the word. Because yellow marks the one action on the screen, so a yellow tag beside the slab reads as a second one, and on white its word is 1.4:1.
   - Correct: `<Tag variant="outline">New</Tag>`
   - Wrong: `<Tag className="bg-accent-fill">New</Tag>`
3. tag-sentence-case MUST Write the label in sentence case; the tag sets the capitals. Because a screen reader spells typed capitals letter by letter, while the role only changes how the word looks.
   - Correct: `<Tag>Prod</Tag>`
   - Wrong: `<Tag>PROD</Tag>`
4. tag-not-a-button NEVER Give a Tag an onClick or render it as a button. Because it has no hover wash or focus ring, so nobody can tell it is pressable; use a Button with size="sm".
   - Correct: `<Button variant="secondary" size="sm" onClick={filter}>Prod</Button>`
   - Wrong: `<Tag onClick={filter}>Prod</Tag>`
5. tag-one-or-two-words SHOULD Keep the label to one or two words; a longer phrase is a description.
   - Correct: `<Tag>Weekends</Tag>`
   - Wrong: `<Tag>Runs only on the weekend</Tag>`
6. tag-count SHOULD Pass a number as count, not as children, so it groups its digits and caps at max.
   - Correct: `<Tag count={1204} max={999}/>`
   - Wrong: `<Tag>{1204}</Tag>`
7. tag-size-by-row SHOULD Use size="sm" inside a 32px row or beside a mono value; the default elsewhere.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `variant` | `'neutral' \| 'outline' \| 'ok' \| 'warn' \| 'fail'` | `'neutral'` | neutral and outline name a kind; ok, warn and fail an outcome. |
| `size` | `'default' \| 'sm'` | `'default'` | 24px with 12px capitals, or 20px with 11px. |
| `count` | `number` |  | Shown grouped in place of children. |
| `max` | `number` | `99` | Past it, count shows "max+" and keeps the exact number for a screen reader. |
| `render` | `ReactElement` |  | Renders another element, such as an abbr. |
Other props pass through to the span.

## Variants and states
- variant: neutral, outline, ok, warn, fail
- size: default, sm

## Accessibility
- [ ] Words on their grounds: ink on the well 16.4:1 (14.5:1 dark), text-2 on the page 7.8:1, each status word 5.2:1 or better on its tint in both themes.
- [ ] The capitals come from CSS, so a screen reader reads the sentence-case source.
- [ ] A capped count keeps the exact number as text for a screen reader and as the title on hover.
- [ ] A Tag is not focusable and not announced as a control.

## Edge cases
- Long label -> Never wraps; the box clips at its end when the row is narrower, which is why the label stays at two words.
- Count past max -> Shows 99+; the exact number is in the title and read aloud.
- Dark theme -> The tints turn deep and the words light; the edges stay in the status colour.
- Forced colours -> Every variant keeps a CanvasText edge, so the box still reads.

## Tokens
--well, --page, --line, --ok, --ok-text, --ok-tint, --warn, --warn-text, --warn-tint, --fail, --fail-text, --fail-tint, --text-1, --text-2, --type-label-sm, --type-micro

## Related
- [Status](/systems/sodium/components/status.md): Says where a job or a run stands.
- [Kbd](/systems/sodium/components/kbd.md): Shows a key or a shortcut.
- [Combobox](/systems/sodium/components/combobox.md): Finds one or more values by typing.
