---
name: Badge
system: glaze
kind: component
import: "import {Badge, badgeVariants} from '@/components/glaze/ui/badge'"
install: "npx shadcn@latest add https://design.how/r/glaze/badge.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/badge
---

# Badge

Labels what something is or how it stands.

## Use when
- A row or title names what a thing is in one or two words: v14, Production, Beta.
- An eval or a check has an outcome to show beside its name: Passed, Slow, Failed.
- A queue shows how many wait: count, capped at 99+.

## Don't use when
- The work is moving: queued, running, then an outcome. Use [Status](/systems/glaze/components/status.md).
- The person can press it to filter or remove it. Use [Button](/systems/glaze/components/button.md).
- The outcome needs a sentence and an action. Use [Alert](/systems/glaze/components/alert.md).

## Minimal example
```tsx
<Badge>v14</Badge>
<Badge variant="fail">Failed</Badge>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. badge-status-word MUST Use variant="ok", "warn" or "fail" only for an outcome, and write the outcome as the word. Because colour means status in Glaze, so a green badge that says Beta reads as a pass, and a tint with no word vanishes in grayscale.
   - Correct: `<Badge variant="ok">Passed</Badge>`
   - Wrong: `<Badge variant="ok">New</Badge>`
2. badge-not-button NEVER Make a Badge pressable with onClick or a link; use a Button. Because a flat tag has no hover, held or focus state, so nobody can tell it does something, and only a Button reads as something to press.
   - Correct: `<Button size="sm" variant="secondary" onClick={filter}>Failed</Button>`
   - Wrong: `<Badge onClick={filter}>Failed</Badge>`
3. badge-tag-corner NEVER Round a Badge to a pill or restyle its fill, height or type through className. Because a pill is how a Glaze control looks, so a pill badge beside a button reads as a second button.
   - Correct: `<Badge>Beta</Badge>`
   - Wrong: `<Badge className="rounded-pill bg-ink text-text-inverse">Beta</Badge>`
4. badge-count MUST Pass a number as count, not as children, so it caps at max and keeps the exact figure. Because children print 1284 in a 20px tag that pushes the row, while count shows 99+ and reads 1,284 to a screen reader.
   - Correct: `<Badge count={approvals.length}/>`
   - Wrong: `<Badge>{approvals.length}</Badge>`
5. badge-short SHOULD Keep the label to one or two words in sentence case.
   - Correct: `<Badge>In review</Badge>`
   - Wrong: `<Badge>Waiting for a person to review</Badge>`
6. badge-one-status SHOULD Give a row at most one status badge; a second outcome belongs in its own column. Because two tints in one row give the eye two places to land.
7. badge-mono-ids SHOULD Write an ID or a version in a Badge as plain text, and an ID in a sentence with mono; never put mono at the badge's size.
   - Correct: `<span className="mono">run_8f2a</span>`
   - Wrong: `<Badge className="font-mono">run_8f2a</Badge>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `variant` | `'neutral' \| 'outline' \| 'ok' \| 'warn' \| 'fail'` | `'neutral'` | neutral the grey field, outline a control line, the rest status tints with their word colour. |
| `size` | `'default' \| 'sm'` | `'default'` | 20 or 16px tall, 12px type. |
| `count` | `number` |  | A count in place of the label, capped at max. |
| `max` | `number` | `99` | The cap for count; past it shows max+. |
| `render` | `ReactElement` |  | Renders another element, such as an li. |
Other props pass through to the span.

## Variants and states
- variant: neutral, outline, ok, warn, fail
- size: default, sm
- states: rest

## Accessibility
- [ ] Status words are 5.0:1 or better on their tint in both themes; neutral and outline are ink, 15:1 or better.
- [ ] A capped count shows max+ to the eye and reads the exact number; the title carries it on hover.
- [ ] A Badge is not focusable and takes no role; the word is its meaning.
- [ ] Forced colours draw a CanvasText border so the tag keeps its box.

## Edge cases
- Long label -> Never wraps; the badge stops at its container and clips. Keep it to two words.
- Count of 0 -> Shows 0; leave the badge out when an empty queue needs no mention.
- Count past max -> Shows 99+, reads the exact number, and the title holds it.
- Zoom 200% -> The height grows with the text from its 20px minimum.
- On the shell or a tint -> neutral is the grey field, a step darker than the shell; use outline on grey.
- Dark theme -> The tints turn dark and the words light, each still 5.0:1 or better.

## Tokens
--field, --line-control, --text-1, --ok-tint, --ok-text, --warn-tint, --warn-text, --fail-tint, --fail-text, --radius-tag, --type-label-sm, --icon-sm

## Related
- [Status](/systems/glaze/components/status.md): Says where a piece of work stands.
- [Button](/systems/glaze/components/button.md): Starts an action.
- [Alert](/systems/glaze/components/alert.md): Reports a problem with the current view.
