---
name: Data list
system: sodium
kind: component
import: "import {DataList, DataListItem, DataListLabel, DataListValue, DataListEmpty, dataListVariants} from '@/components/sodium/ui/data-list'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/data-list.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/data-list
---

# Data list

Lists label and value pairs about one thing.

## Use when
- The details of one pipeline, job, table or bucket: schedule, owner, region, last run.
- A key and value block beside a chart or at the top of a run.

## Don't use when
- Many things compared field by field; that is a table.
- Two to six headline numbers. Use [Status strip](/systems/sodium/components/status-strip.md).
- A list of things to open. Use [Item](/systems/sodium/components/item.md).

## Minimal example
```tsx
<DataList variant="framed">
  <DataListItem>
    <DataListLabel>Schedule</DataListLabel>
    <DataListValue>0 * * * *</DataListValue>
  </DataListItem>
</DataList>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. data-list-values-as-written NEVER Set a value in capitals or a label role; DataListValue keeps it as written in mono. Because values are copied and compared, and capitals change what an ID, a path or a region says.
   - Correct: `<DataListValue>eu-west-2</DataListValue>`
   - Wrong: `<DataListValue className="type-label">eu-west-2</DataListValue>`
2. data-list-prose MUST Pass prose for a value that is a sentence, such as a description. Because a sentence in mono reads slowly and wide, and Sodium sets every sentence in the sans.
   - Correct: `<DataListValue prose>Loads the orders topic every hour.</DataListValue>`
   - Wrong: `<DataListValue>Loads the orders topic every hour.</DataListValue>`
3. data-list-empty MUST Pass an empty value through as null or ""; never a dash or "N/A". Because DataListValue writes None in text-3 for it, the same word everywhere, and a dash is read as "dash".
   - Correct: `<DataListValue>{owner}</DataListValue>`
   - Wrong: `<DataListValue>{owner ?? "-"}</DataListValue>`
4. data-list-no-box-in-frame NEVER Use variant="framed" inside a frame; use the default plain there. Because a frame inside a frame is the box in a box Sodium never draws.
   - Correct: `<section className="frame px-4"><DataList>`
   - Wrong: `<section className="frame"><DataList variant="framed">`
5. data-list-label-nouns SHOULD Write labels as one or two nouns in sentence case; the list sets the capitals.
   - Correct: `<DataListLabel>Schedule</DataListLabel>`
   - Wrong: `<DataListLabel>WHEN IT RUNS</DataListLabel>`
6. data-list-status-inline SHOULD Put a Status or a Tag inside the value for a state, not a coloured word.
   - Correct: `<DataListValue><Status status="ok"/></DataListValue>`
   - Wrong: `<DataListValue className="text-ok-text">Succeeded</DataListValue>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `variant` | `'plain' \| 'framed'` | `'plain'` | framed draws a frame with row rules. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | horizontal stacks by itself under 24rem. |
| `DataListValue prose` | `boolean` | `false` | Sets a sentence in the sans. |
| `className` | `string` |  | Goes on the measuring box; other props go on the dl. |
Other props pass through to the dl.

## Variants and states
- variant: plain, framed
- orientation: horizontal, vertical
- states: value, empty, with a status

## Accessibility
- [ ] A real dl with dt and dd, each pair in a div, as HTML allows.
- [ ] Labels are text-2, 7.8:1; values text-1, 18.3:1; None text-3, 5.6:1.

## Edge cases
- Long label -> Wraps inside the 160px column; the values keep one edge.
- Long value -> Wraps anywhere, so a path never pushes the frame wider.
- Under 24rem -> Each label stacks over its value.
- Empty value -> Reads None in text-3.

## Tokens
--label-col, --row, --line, --line-faint, --text-1, --text-2, --text-3, --type-label-sm, --type-code, --type-body-sm

## Related
- [Status strip](/systems/sodium/components/status-strip.md): Shows the few numbers to check first, in one ruled row.
- [Item](/systems/sodium/components/item.md): Shows one thing as a row in a list.
