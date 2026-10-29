---
name: Segmented
system: lime
kind: component
import: "import {Segmented, SegmentedItem, trackVariants} from '@/components/lime/ui/segmented'"
install: "npx shadcn@latest add https://design.how/r/lime/segmented.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/segmented
---

# Segmented

Chooses between a few options side by side, like Grid or List.

## Use when
- A view or mode switch: Grid or List, Monthly or Yearly.
- A short setting where seeing every option helps: Week, Month or Year.

## Don't use when
- The choice switches panels of content. Use [Tabs](/systems/lime/components/tabs.md).
- More than five options. Use [Select](/systems/lime/components/select.md).
- Each option needs a line of explanation. Use [Radio](/systems/lime/components/radio.md).
- Any number of options may be on. Use [Chip](/systems/lime/components/chip.md).

## Minimal example
```tsx
<Segmented aria-label="List view" defaultValue="grid">
  <SegmentedItem value="grid">Grid</SegmentedItem>
  <SegmentedItem value="list">List</SegmentedItem>
</Segmented>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. segmented-always-chosen MUST Set defaultValue or value so one segment is always chosen. Because the group starts empty, so no pill shows and the view it sets has no value.
   - Correct: `<Segmented defaultValue="grid">...</Segmented>`
   - Wrong: `<Segmented>...</Segmented>`
2. segmented-name MUST Pass aria-label to Segmented when there is no visible heading. Because the track is a radio group, and unnamed a reader hears "Grid, radio" with no question.
   - Correct: `<Segmented aria-label="List view">...</Segmented>`
   - Wrong: `<Segmented>...</Segmented>`
3. segmented-string-value MUST Read the choice with onValueChange(value: string), not the Base UI details object. Because Segmented passes only the value string, so a second details argument is undefined.
   - Correct: `<Segmented onValueChange={setView}>`
   - Wrong: `<Segmented onValueChange={(v, details) => ...}>`
4. segmented-labels SHOULD Write one or two words in sentence case, all the same kind.
5. segmented-count MUST Keep two to five segments; use Select beyond that. Because segments never wrap, so past five the labels truncate to a few letters on a phone.
   - Correct: `<Select>...8 items...</Select>`
   - Wrong: `<Segmented>...8 items...</Segmented>`
6. segmented-fit-phone SHOULD Use fill on a phone; labels truncate rather than wrap.
   - Correct: `<Segmented fill>...</Segmented>`
7. segmented-not-tabs NEVER Build a view switch with Tabs; Segmented sets a value, Tabs switch panels. Because Tabs announce a tab and a panel per item, and a view switch has one panel.
   - Correct: `<Segmented>...</Segmented>`
   - Wrong: `<Tabs>...Grid | List...</Tabs>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `size` | `'sm' \| 'md'` | `'md'` | 32 or 40px track. |
| `fill` | `boolean` | `false` | Full width, equal segments. |
| `value, defaultValue` | `string` |  | The chosen segment. |
| `onValueChange` | `(value: string) => void` |  | Called with the new value. |
| `SegmentedItem value` | `string` | `required` | The value the segment sets. |
| `disabled` | `boolean` | `false` | On the group or on one item. |
Other props pass through to the root element.

## Variants and states
- size: sm, md
- fill: false, true
- states: rest, hover (unchosen), focus-visible, disabled item, disabled

## Accessibility
- [ ] Segmented is a radio group: Tab enters once, arrows move and choose, and the group needs a name.
- [ ] The white pill on the grey track is about 1.1:1, so the chosen segment also takes the stronger text color.
- [ ] Forced colors paints the chosen segment Highlight and HighlightText.
- [ ] The track is 32 or 40px tall, under 44px; fill gives wider targets.

## Edge cases
- Long labels -> Segments never wrap; once the track fills its container the labels truncate. Shorten them or use Select.
- Narrow container -> Three segments need about 230px; below that the labels truncate. Use fill or fewer segments.
- Right to left -> Segments run right to left and arrows follow the reading direction.
- No items -> An empty grey pill; never render it.
- Zoom 200% -> Segments widen and the track keeps its height.
- Reduced motion -> Colors change at once; there is no sliding pill.

## Tokens
--surface-2, --radius-control, --control-sm, --control-md, --fg-2, --fg, --raised, --shadow-card, --fg-disabled, --ring, --line-focus, --focus-offset, --dur-fast, --ease-out

## Related
- [Radio](/systems/lime/components/radio.md): One choice from a short visible list, such as a transfer speed.
- [Select](/systems/lime/components/select.md): One choice from a list, such as an account or a category.
- [Chip](/systems/lime/components/chip.md): A filter the person toggles, such as a spending category.
- [Tabs](/systems/lime/components/tabs.md): Switches between views of one list, such as Activity and Scheduled.
