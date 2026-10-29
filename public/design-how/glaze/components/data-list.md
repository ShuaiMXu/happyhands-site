---
name: Data list
system: glaze
kind: component
import: "import {DataList, DataListItem, DataListLabel, DataListValue, DataListEmpty, dataListVariants} from '@/components/glaze/ui/data-list'"
install: "npx shadcn@latest add https://design.how/r/glaze/data-list.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/data-list
---

# Data list

Lists label and value pairs about one thing.

## Use when
- The detail of one thing: a run, a key, a prompt release, a deploy.
- A few facts beside a form or under a card's title.

## Don't use when
- Many things of one kind, one per row. Use [Item](/systems/glaze/components/item.md).
- One number worth reading at a glance; write a label and the number in the type roles.

## Minimal example
```tsx
<DataList variant="panel">
  <DataListItem><DataListLabel>Run</DataListLabel><DataListValue mono>run_8f2a91</DataListValue></DataListItem>
  <DataListItem><DataListLabel>Duration</DataListLabel><DataListValue>2m 14s</DataListValue></DataListItem>
</DataList>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. data-list-plain-in-card MUST Use variant="plain" inside a Card or a Panel, and variant="panel" only on its own. Because panel draws the white surface, and a panel inside a card's panel is a box in a box.
   - Correct: `<CardContent><DataList>...</DataList></CardContent>`
   - Wrong: `<CardContent><DataList variant="panel">...</DataList></CardContent>`
2. data-list-pairs MUST Put each DataListLabel and DataListValue in its own DataListItem. Because the item is the subgrid row and the rule; loose dt and dd pairs fall out of the label column and lose their split.
   - Correct:
     ```tsx
     <DataList><DataListItem><DataListLabel>Run</DataListLabel><DataListValue>run_8f2a</DataListValue></DataListItem></DataList>
     ```
   - Wrong: `<DataList><DataListLabel>Run</DataListLabel><DataListValue>run_8f2a</DataListValue></DataList>`
3. data-list-empty NEVER Render a dash or leave a value blank by hand; pass null and the value reads None. Because a blank looks like a bug and a dash is read as "dash", while None says the field has no value.
   - Correct: `<DataListValue>{run.trigger}</DataListValue>`
   - Wrong: `<DataListValue>{run.trigger ?? '-'}</DataListValue>`
4. data-list-mono MUST Set mono on a value that is an ID, a key, a hash or a path, and on nothing else. Because mono marks what can be copied into code; a name or a duration in mono reads a size bigger and as code.
   - Correct: `<DataListValue mono>run_8f2a91</DataListValue>`
   - Wrong: `<DataListValue mono>2m 14s</DataListValue>`
5. data-list-status SHOULD Show a value with an outcome as a Status inside the DataListValue, not as coloured text. Because Status carries the word and the mark, so the outcome reads in grayscale.
6. data-list-labels-short SHOULD Keep labels to one to three words, sentence case, no colon.
   - Correct: `<DataListLabel>Model</DataListLabel>`
   - Wrong: `<DataListLabel>The model used:</DataListLabel>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `variant` | `'plain' \| 'panel'` | `'plain'` | No surface, or the white panel with rows split by hairlines. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Side by side from 24rem, or always stacked. |
| `className` | `string` |  | Goes on the measuring box, to place the list. |
| `DataListValue mono` | `boolean` | `false` | type-code-sm, for IDs, keys and paths. |
Other props pass through to the dl.

## Variants and states
- variant: plain, panel
- orientation: horizontal, vertical
- states: value, empty

## Accessibility
- [ ] A real dl: each label is a dt and each value a dd, read as pairs.
- [ ] Labels are text-2, 5.5:1, and values text-1 on paper.
- [ ] An empty value reads None rather than nothing.

## Edge cases
- Long label -> The column stops at 160px and the label wraps.
- Long unbroken value -> Breaks anywhere rather than overflowing.
- Under 24rem -> Each label stacks over its value.
- Empty value -> Reads None in text-2.
- Value with a Status or Badge -> Sits on the label's baseline in the value cell.
- Dark theme -> The panel and the rules flip with the tokens.

## Tokens
--paper, --line-faint, --radius-panel, --row, --space-3, --space-4, --label-col, --text-1, --text-2, --type-body-sm, --type-label, --type-code-sm

## Related
- [Item](/systems/glaze/components/item.md): Shows one thing as a row in a list.
- [Card](/systems/glaze/components/card.md): Groups content about one thing.
