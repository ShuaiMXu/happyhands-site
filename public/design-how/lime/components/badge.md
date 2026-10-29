---
name: Badge
system: lime
kind: component
import: "import {Badge, badgeVariants} from '@/components/lime/ui/badge'"
install: "npx shadcn@latest add https://design.how/r/lime/badge.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/badge
---

# Badge

Puts a short label on something, like Paid or Pro.

## Use when
- A state next to a title or in a table cell: Paid, Failed.
- A plan or a count: Plus, 3.
- A single highlight, such as New.

## Don't use when
- The person presses it to filter or toggle. Use [Chip](/systems/lime/components/chip.md).
- It is a dot and a word for work in progress with a retry. Use [Status](/systems/lime/components/status.md).
- It needs a sentence. Use text beside the item.

## Minimal example
```tsx
<Badge variant="success">Paid</Badge>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. badge-word-with-tone MUST Keep the word on a status badge; the tone repeats the state and never carries it alone. Because the tone is only a tint, so an empty danger badge is a red pill a screen reader skips.
   - Correct: `<Badge variant="danger">Failed</Badge>`
   - Wrong: `<Badge variant="danger"/>`
2. badge-no-clickable NEVER Add onClick to a Badge; use a Chip or Button. Because it is a span with no focus or role, so a keyboard never reaches it.
   - Correct: `<Chip onPressedChange={filter}>Paid</Chip>`
   - Wrong: `<Badge onClick={filter}>Paid</Badge>`
3. badge-one-accent SHOULD Use accent for at most one kind of badge, such as New, never for every row.
   - Correct: `{r.isNew && <Badge variant="accent">New</Badge>}`
   - Wrong: `{rows.map(r => <Badge variant="accent">{r.state}</Badge>)}`
4. badge-beside-subject SHOULD Place a badge right after the item's title or in its own table column, not at a corner.
   - Correct: `<h3>Vacation fund <Badge>Pending</Badge></h3>`
5. badge-sentence-case MUST Write badges in sentence case, never capitals. Because capitals widen a pill that never wraps, and some screen readers spell short capitals letter by letter.
   - Correct: `<Badge variant="accent">New</Badge>`
   - Wrong: `<Badge variant="accent">NEW</Badge>`
6. badge-length SHOULD Keep a badge under about 14 characters; it never wraps or truncates.
7. badge-icon-decorative SHOULD Leave the 12px icon before the word decorative; do not give it a label.
   - Correct: `<Badge><Icon icon={Checkmark} size={12}/>Settled</Badge>`
   - Wrong: `<Badge><Icon icon={Checkmark} label="Done"/>Settled</Badge>`
8. badge-no-empty MUST Render no badge when there is no text, such as a count of zero. Because an empty Badge still draws a 24px pill with its padding, a blank lozenge in the row.
   - Correct: `{pending > 0 && <Badge>{pending}</Badge>}`
   - Wrong: `<Badge>{pending > 0 && pending}</Badge>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `variant` | `'neutral' \| 'accent' \| 'outline' \| 'success' \| 'warn' \| 'danger'` | `'neutral'` | The tone. |
| `children` | `ReactNode` |  | The word, with an optional 12px Icon before it. |
| `className` | `string` |  | Placement only. |
Other props pass through to the root element.

## Variants and states
- variant: neutral, accent, outline, success, warn, danger
- children: text, icon and text, count

## Accessibility
- [ ] A span read as text in order, such as "Vacation fund, Paid"; not focusable.
- [ ] Color never carries a state alone; every status tone has a word.
- [ ] Contrast on the tint: success 5.4:1, warning 5.8:1, danger 5.7:1.

## Edge cases
- Long text -> Never wraps or truncates; a long pill overflows a narrow cell.
- Row of badges in 160px -> Badges are shrink-0 and overflow. Use flex-wrap.
- Right to left -> Padding is symmetric; an icon placed first moves to the right edge.
- Zoom 200% -> The pill widens and keeps its 24px height.
- Forced colors -> Tints drop but the word still reads; only outline keeps an edge.

## Tokens
--radius-control, --text-xs, --weight-medium, --surface-2, --fg, --fg-2, --accent-wash, --line-strong, --success-tint, --success-text, --warn-tint, --warn-text, --danger-tint, --danger-text

## Related
- [Chip](/systems/lime/components/chip.md): A filter the person toggles, such as a spending category.
- [Status](/systems/lime/components/status.md): The state of a payment as a dot and a word.
- [Avatar](/systems/lime/components/avatar.md): A person, such as a friend you split a bill with, with initials as the fallback.
