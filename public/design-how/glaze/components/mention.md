---
name: Mention
system: glaze
kind: component
import: "import {Mention, mentionVariants, mentionTypeLabels, mentionToText, encodeMentionId, parseMentions, uniqueLabel} from '@/components/glaze/ai/mention'"
install: "npx shadcn@latest add https://design.how/r/glaze/mention.json"
registryDependencies: [icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/mention
---

# Mention

Names a resource inside a prompt or answer.

## Use when
- A prompt or an answer points at one thing by name: a file, a run, a doc, a command.
- A chip in a message should read the same as the one the composer made.

## Don't use when
- The label says what kind of thing something is or how it stands. Use [Badge](/systems/glaze/components/badge.md).
- The chip filters a list or shows a chosen value. Use [Chip](/systems/glaze/components/chip.md).

## Minimal example
```tsx
<p>Read <Mention type="file">refund-policy.md</Mention> before you refund.</p>
mentionToText({type: 'file', id: 'docs/refund-policy.md', label: 'refund-policy.md'})
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. mention-text-form MUST Store and send a mention as mentionToText(ref), and read text back with parseMentions. Because the [label](type:id) form survives any clipboard and comes back a chip; a hand-made "@label" loses the id, so two files with one name collapse.
   - Correct: `const text = mentionToText({type: 'file', id: file.path, label: file.name})`
   - Wrong: `` const text = `@${file.name}` ``
2. mention-unique-label MUST Pass a new chip's label through uniqueLabel(ref, taken) before you insert it. Because two different files called deploy.ts would read as one chip; uniqueLabel gives the second "deploy.ts (2)" and keeps the label of the same id.
3. mention-missing MUST Set missing on a mention whose source is gone; never drop it from the text. Because removing it changes what the person wrote, and missing keeps the chip in place, struck through, and says so to a screen reader.
   - Correct: `<Mention type="run" missing={!exists}>run 4812</Mention>`
   - Wrong: `{exists && <Mention type="run">run 4812</Mention>}`
4. mention-not-pressable-glass NEVER Give a mention glass, a fill colour or a shadow; render it as a link or button with render when it opens the thing. Because a mention is a tag inside a line of text, and glass is the sign of something pressed.
   - Correct: `<Mention type="file" render={<a href="/files/a.ts"/>}>a.ts</Mention>`
   - Wrong: `<Mention type="file" className="glass glass-ink">a.ts</Mention>`
5. mention-command-slash NEVER Type the slash into a command's label; type="command" draws it. Because the label would read "//refund" and the text form would carry the slash twice.
   - Correct: `<Mention type="command">refund</Mention>`
   - Wrong: `<Mention type="command">/refund</Mention>`
6. mention-remove-focus SHOULD Put removable mentions in a ul, ol, role="list" or role="group", and focus your field in onRemove when the last one goes. Because after a remove, focus moves to the next chip's remove button in the same list, and with none left the caller decides.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `type` | `'file' \| 'folder' \| 'doc' \| 'table' \| 'web' \| 'command' \| 'paste' \| 'agent' \| 'run' \| 'deploy' \| 'key' \| 'model'` | `required` | What is mentioned. Read aloud; every type looks the same. |
| `children` | `ReactNode` | `required` | The visible name. |
| `missing` | `boolean` | `false` | Struck through, with "(no longer exists)" read after it. |
| `onRemove` | `() => void` |  | Adds a remove button inside the chip. |
| `removeLabel` | `string` | `"Remove <label>"` | The remove button's name. |
| `render` | `ReactElement` |  | Renders a link or button that opens the thing. |
| `mentionToText, parseMentions, uniqueLabel` | `functions` |  | The text form [label](type:id) and back, and a label no other chip uses. |
Other props pass through to the root element.

## Variants and states
- form: plain, link, removable, command
- states: rest, hover, focus-visible, missing, disabled

## Accessibility
- [ ] The chip reads as its label; a missing one adds "(no longer exists)".
- [ ] The remove button is named "Remove <label>"; its target is 28px though the chip is 20px.
- [ ] A linked mention is a real link, with the ink focus ring.

## Keyboard
- `Enter, Space`: On the remove button, removes the chip and moves focus to the next one.

## Edge cases
- Long label -> Truncates; a label over 24 characters keeps the whole name in its title.
- Brackets, line breaks or emoji in a label -> Escaped in the text form and read back unchanged.
- A markdown link in the text -> parseMentions leaves it as text; only known types become chips.
- Right to left -> The chip mirrors; the remove button sits at its end.

## Tokens
--paper, --line-control, --line-faint, --radius-tag, --type-label, --text-1, --text-2, --hover, --focus

## Related
- [Badge](/systems/glaze/components/badge.md): Labels what something is or how it stands.
- [Chip](/systems/glaze/components/chip.md): Shows a filter or a chosen value.
- [Prompt input](/systems/glaze/components/prompt-input.md): Takes the next message for an agent.
