---
name: Item
system: glaze
kind: component
import: "import {Item, ItemGroup, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemMeta, ItemLink, ItemActions, itemVariants, itemGroupVariants} from '@/components/glaze/ui/item'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/item.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/item
---

# Item

Shows one thing as a row in a list.

## Use when
- A short list of similar things, each a row: agents, keys, reviewers, saved prompts.
- Each row opens its own page or panel: ItemLink.
- Each row carries a quiet action or two: copy, more, remove.

## Don't use when
- Label and value pairs about one thing. Use [Data list](/systems/glaze/components/data-list.md).
- One topic with a header and a footer. Use [Card](/systems/glaze/components/card.md).
- A file the person attached. Use [Attachment](/systems/glaze/components/attachment.md).

## Minimal example
```tsx
<ItemGroup aria-label="Agents">
  <Item>
    <ItemContent><ItemTitle><ItemLink href="/agents/refund">Refund agent</ItemLink></ItemTitle></ItemContent>
    <ItemMeta>Edited 2h ago</ItemMeta>
  </Item>
</ItemGroup>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. item-in-group MUST Put Items in an ItemGroup with an aria-label; use variant="plain" inside a Card's CardContent flush. Because the group is the panel and the list role, and a second panel inside a card's panel is a box in a box.
   - Correct: `<CardContent flush><ItemGroup variant="plain" aria-label="Reviewers">...</ItemGroup></CardContent>`
   - Wrong: `<CardContent><ItemGroup>...</ItemGroup></CardContent>`
2. item-link-not-wrap NEVER Wrap a row in an <a> or render it as a link when it holds actions; put ItemLink in ItemTitle. Because a button inside a link is invalid HTML and takes the press of both, while ItemLink covers the row under its actions.
   - Correct:
     ```tsx
     <Item><ItemContent><ItemTitle><ItemLink href="/agents/refund">Refund agent</ItemLink></ItemTitle></ItemContent><ItemActions>...</ItemActions></Item>
     ```
   - Wrong: `<a href="/agents/refund"><Item>... <Button/></Item></a>`
3. item-actions-ghost MUST Make ItemActions ghost icon-sm Buttons with an aria-label naming the row, or one size="sm" Button. Because a filled Button on every row stacks a column of pills, and "Copy" alone does not say which key it copies.
   - Correct:
     ```tsx
     <Button size="icon-sm" variant="ghost" aria-label="Copy the Production key"><Icon icon={Copy} size={12}/></Button>
     ```
   - Wrong: `<Button size="icon-sm" aria-label="Copy"><Icon icon={Copy}/></Button>`
4. item-selected-wash NEVER Mark the chosen row with a colour, a bold title or a bar on one edge; set selected. Because colour means status, and a bar on one edge is the side rail Glaze rules out; selected gives the pressed wash and aria-current.
   - Correct: `<Item selected>`
   - Wrong: `<Item className="border-s-2 border-ink">`
5. item-id-mono MUST Put an ID after the name in ItemTitle in type-code-sm, never the name itself in mono. Because mono is for code and IDs; a name in mono reads a size bigger and as something to copy.
   - Correct:
     ```tsx
     <ItemTitle><span>Production</span><span className="type-code-sm text-text-2">sk_demo_0000aaaa</span></ItemTitle>
     ```
   - Wrong: `<ItemTitle><span className="font-mono">Production</span></ItemTitle>`
6. item-meta-drops SHOULD Put what the person can live without in ItemMeta; it is the first part to go under 28rem. Because a row keeps its title and actions at 390 by giving up its meta.
7. item-short-list SHOULD Keep a list of Items to about a dozen rows; a longer one belongs in a table with search. Because a panel never scrolls inside, so a long list pushes everything below it.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `ItemGroup variant` | `'panel' \| 'plain'` | `'panel'` | The white panel, or no surface inside a card. |
| `Item size` | `'default' \| 'sm'` | `'default'` | 36px rows, or 32px for a dense list. |
| `Item selected` | `boolean` | `false` | The pressed wash; pass aria-current to the ItemLink. |
| `Item disabled` | `boolean` | `false` | Words in the disabled grey. |
| `Item render` | `ReactElement` |  | Renders another element, such as an li. |
| `ItemMedia variant` | `'default' \| 'icon' \| 'image'` | `'default'` | An avatar, a 24px icon box or a 32px thumbnail. |
Other props pass through to the row div (Item); each part takes its own element's props.

## Variants and states
- size: default, sm
- states: rest, hover, focus-visible, selected, disabled
- when states meet, the first wins: disabled > selected > focus-visible > hover > rest

## Accessibility
- [ ] ItemGroup is role="list" and each Item a listitem; name the group with aria-label.
- [ ] ItemLink is one tab stop per row, with a 1.5px ink ring drawn inside the row, its corners on the panel's, never clipped.
- [ ] Actions follow the link in tab order and name their row.
- [ ] Description and meta are text-2, 5.5:1 on paper.

## Keyboard
- `Tab`: Moves to the row's link, then to each of its actions.
- `Enter`: Follows the row's link.

## Edge cases
- Long title -> Truncates last, after the meta has gone; an ID after it truncates first.
- Row under 28rem -> The meta hides; the status and actions stay.
- Description of three lines -> Clamps at two; the media moves to the top.
- One row -> The rule drops and the panel's edge closes the list.
- Zoom 200% -> Rows grow from 36px with the text.
- Dark theme -> The wash and the rule flip with the ink.

## Tokens
--paper, --line-faint, --radius-panel, --row, --control, --hover, --pressed, --text-1, --text-2, --text-disabled, --type-label, --type-body-sm, --type-caption, --focus, --z-raised

## Related
- [Card](/systems/glaze/components/card.md): Groups content about one thing.
- [Panel](/systems/glaze/components/panel.md): Holds a few rows inside a card.
- [Data list](/systems/glaze/components/data-list.md): Lists label and value pairs about one thing.
- [Avatar](/systems/glaze/components/avatar.md): Shows who or what acted.
