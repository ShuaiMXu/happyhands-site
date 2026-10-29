---
name: Table
system: lime
kind: component
import: "import {Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption} from '@/components/lime/ui/table'"
install: "npx shadcn@latest add https://design.how/r/lime/table.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/table
---

# Table

Lays out rows of data you read across, with the numbers lined up.

## Use when
- The same fields for many items, compared across rows: transactions, payments, statements.
- Data with numbers that need to line up.

## Don't use when
- A phone list of transactions or settings. Use [List](/systems/lime/components/list.md).
- Mixed content per item, with images and long text. Use [Card](/systems/lime/components/card.md).
- Page layout. Use CSS grid; a table is for data.

## Minimal example
```tsx
<Table>
  <TableCaption>Recent transactions</TableCaption>
  <TableHeader><TableRow><TableHead scope="col">Merchant</TableHead></TableRow></TableHeader>
  <TableBody><TableRow><TableCell>Corner Coffee</TableCell></TableRow></TableBody>
</Table>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. table-numbers-end MUST Set text-end on the head and cells of a numeric column. Because start-aligned amounts put the dollars of $8.50 and $1,240.00 in different columns.
   - Correct: `<TableCell className="text-end">{amount}</TableCell>`
   - Wrong: `<TableCell>{amount}</TableCell>`
2. table-caption MUST Add a TableCaption that says what a standalone table lists. Because a screen reader enters the table with no idea which transactions it holds.
   - Correct: `<Table><TableCaption>Your 3 most recent transactions</TableCaption>...`
   - Wrong: `<Table><TableHeader>...`
3. table-head-scope MUST Add scope="col" to a column TableHead and scope="row" to a row heading. Because TableHead sets no scope, and scope is what makes a screen reader read Amount with each cell.
   - Correct: `<TableHead scope="col">Amount</TableHead>`
   - Wrong: `<TableHead>Amount</TableHead>`
4. table-empty-row MUST Show one full-width cell that says what to do when there are no rows. Because headings over nothing look like a table that failed to load.
   - Correct: `<TableRow><TableCell colSpan={4}>No transactions yet.</TableCell></TableRow>`
   - Wrong: `<TableBody>{[]}</TableBody>`
5. table-heading-nouns SHOULD Name a column with one noun in sentence case, as in Amount.
   - Correct: `<TableHead>Amount</TableHead>`
   - Wrong: `<TableHead>AMOUNT IN DOLLARS</TableHead>`
6. table-no-zebra NEVER Add striped rows or a boxed grid; rows are hairlines and fills are for hover and selected. Because bg-surface is the hover fill, so every other row looks pointed at.
   - Correct: `<TableRow>`
   - Wrong: `<TableRow className="odd:bg-surface">`
7. table-selected-mark MUST Pair data-state="selected" with a checked Checkbox; the wash is not the only cue. Because the lime wash is color alone, and a screen reader hears nothing about the row.
   - Correct: `<TableRow data-state="selected"><TableCell><Checkbox checked/></TableCell>...</TableRow>`
8. table-wide-phone SHOULD Let a table past four columns scroll in its wrapper, or use Cards on a phone.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Table` | `table props` |  | Wraps the table in a scrolling box. className goes on the table. |
| `TableRow data-state` | `'selected'` |  | Marks a chosen row with the lime wash. |
| `TableHead, TableCell` | `th, td props` |  | className text-end on numbers. colSpan and scope pass through. |
| `TableCaption` | `caption props` |  | The table's name, shown under it. |
Other props pass through to the root element.

## Variants and states
- states: rest, row hover, row selected, empty

## Accessibility
- [ ] Rows and cells are not focusable; controls inside a row carry their own states.
- [ ] TableCaption names the table; TableHead renders a bare th, so add scope.
- [ ] Heading text is 5.4:1 on the page; cell text is 17.6:1.
- [ ] The selected row is a fill; styles.css gives it a Highlight outline in forced colors.

## Edge cases
- Long cell text -> Cells wrap and the row grows; headings never wrap.
- Narrow container -> The wrapper scrolls sideways; the page never widens.
- Right to left -> The table mirrors; figures stay left to right with the minus in front.
- No rows -> A header over nothing; render the empty row.
- Loading or error -> No state of its own; keep the header and show a sentence.
- Control in a cell -> It keeps its own size; a 48px row fits a 44px control.

## Tokens
--text-sm, --fg, --fg-3, --text-xs, --weight-medium, --line, --surface, --accent-wash, --dur-instant

## Related
- [Card](/systems/lime/components/card.md): A grouped block, such as a savings goal or a card, on warm grey, outlined or raised.
- [Badge](/systems/lime/components/badge.md): A short fact that never changes on its own, such as Plus or New.
- [List](/systems/lime/components/list.md): Rows of transactions, accounts or settings, each with a mark, a title and a value or a chevron.
