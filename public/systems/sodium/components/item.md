---
name: Item
system: sodium
kind: component
import: "import {Item, ItemGroup, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemMeta, ItemLink, ItemActions, itemVariants, itemGroupVariants} from '@/components/sodium/ui/item'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/item.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/item
---

# Item

Shows one thing as a row in a list.

## Use when
- A list of things a person opens one at a time: tables, pipelines, workers, buckets.
- A short list in a panel, where a table's columns would be empty.

## Don't use when
- Rows compared column by column, sorted or selected in bulk; that is a table.
- Label and value pairs about one thing. Use [Data list](/systems/sodium/components/data-list.md).

## Minimal example
```tsx
<ItemGroup>
  <Item>
    <ItemContent>
      <ItemTitle><ItemLink href="/tables/orders_daily">orders_daily</ItemLink></ItemTitle>
      <ItemDescription>Loaded from the orders topic every hour.</ItemDescription>
    </ItemContent>
    <ItemMeta>2.4 GB</ItemMeta>
  </Item>
</ItemGroup>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. item-in-group MUST Put Items in an ItemGroup; variant="plain" inside a frame that already has the edge. Because the group is the list role and the frame, and a framed group inside a frame draws a box in a box.
   - Correct: `<section className="frame"><ItemGroup variant="plain">…</ItemGroup></section>`
   - Wrong: `<section className="frame"><ItemGroup>…</ItemGroup></section>`
2. item-title-as-written NEVER Set an Item's name in capitals or a label role; ItemTitle keeps it as written. Because names are identifiers people compare and copy, and orders_daily in capitals is a different string.
   - Correct: `<ItemTitle>orders_daily</ItemTitle>`
   - Wrong: `<ItemTitle className="type-label">orders_daily</ItemTitle>`
3. item-link-one-target MUST Make a row that opens something an ItemLink inside ItemTitle, not an onClick on the Item. Because the link covers the row with one tab stop and its ring inside the row, while a clickable div is not reachable by keyboard.
   - Correct: `<ItemTitle><ItemLink href={href}>orders_daily</ItemLink></ItemTitle>`
   - Wrong: `<Item onClick={open}>`
4. item-selected-wash NEVER Mark the chosen row with a bar down one edge or a bold name; pass selected. Because Sodium marks a place you are with the selection wash, and a side rail is the habit of generated UI.
   - Correct: `<Item selected>`
   - Wrong: `<Item className="border-s-2 border-accent-edge">`
5. item-actions-quiet MUST Keep ItemActions to ghost icon buttons or one secondary small Button; never a primary. Because a slab on every row is a slab per row, and the one primary belongs to the page.
   - Correct: `<ItemActions><Button variant="secondary" size="sm">Run</Button></ItemActions>`
   - Wrong: `<ItemActions><Button size="sm">Run</Button></ItemActions>`
6. item-status-lead SHOULD Lead with a StatusMark when every row has a state, and keep the word in ItemMeta or a Status.
   - Correct: `<ItemMedia><StatusMark status="fail"/></ItemMedia>`
   - Wrong: `<ItemMedia><Tag variant="fail">Failed</Tag></ItemMedia>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `size` | `'default' \| 'sm'` | `'default'` | 40px rows, or 32px for a dense list. |
| `selected` | `boolean` | `false` | The selection wash. |
| `disabled` | `boolean` | `false` | Words in the disabled grey. |
| `ItemGroup variant` | `'framed' \| 'plain'` | `'framed'` | framed draws the edge; plain sits inside a frame. |
| `ItemMedia variant` | `'default' \| 'icon'` | `'default'` | icon puts a glyph in a 32px ruled square. |
| `render` | `ReactElement` |  | Renders another element, such as an li. |
Other props pass through to the row div.

## Variants and states
- size: default, sm
- media: icon, status
- states: rest, hover, focus-visible, selected, disabled
- when states meet, the first wins: disabled > focus-visible > selected > hover > rest

## Accessibility
- [ ] ItemGroup is role="list" and each Item a listitem.
- [ ] An ItemLink row takes one tab stop; its 2px ring is drawn inside the row so the frame cannot clip it.
- [ ] Names are text-1 18.3:1, descriptions text-2 7.8:1, meta text-3 5.6:1; on the selection wash 16.5, 7.0 and 5.1:1.
- [ ] Set aria-current="page" on the selected row's link.

## Keyboard
- `Tab`: Moves to the next row link, then its actions.

## Edge cases
- Long name -> Truncates last, after the meta has gone.
- Under 28rem -> The meta drops; actions never do.
- Two-line description -> Clamps at two lines; the lead aligns to the top.
- Forced colours -> The selected row draws a 2px outline inside its edge.

## Tokens
--row, --row-sm, --line, --line-faint, --hover, --pressed, --selected, --selected-strong, --text-1, --text-2, --text-3, --text-disabled, --type-code, --type-code-sm, --type-caption, --focus

## Related
- [Data list](/systems/sodium/components/data-list.md): Lists label and value pairs about one thing.
- [Avatar](/systems/sodium/components/avatar.md): Shows who or what acted.
- [Status](/systems/sodium/components/status.md): Says where a job or a run stands.
