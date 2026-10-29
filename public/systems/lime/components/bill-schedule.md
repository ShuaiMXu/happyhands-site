---
name: Bill schedule
system: lime
kind: component
import: "import {BillSchedule} from '@/components/lime/ui/bill-schedule'"
install: "npx shadcn@latest add https://happyhands.cc/r/lime/bill-schedule.json"
registryDependencies: [amount, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/bill-schedule
---

# Bill schedule

Shows what is coming up, by date, and who takes care of each one.

## Use when
- The next one or two weeks of bills on a home or bills screen.
- Showing which bills the assistant pays on its own and which wait for you.

## Don't use when
- Payments that already happened. Use [List](/systems/lime/components/list.md).
- Asking before one bill is paid. Use [Approval request](/systems/lime/components/approval-request.md).
- A long history to scan and sort. Use [Table](/systems/lime/components/table.md).

## Minimal example
```tsx
<BillSchedule bills={[
  {name: 'Phone', due: new Date('2026-10-08'), amount: -45, pay: 'autopay'},
  {name: 'Rent share', due: new Date('2026-10-10'), amount: -450, pay: 'manual'},
]}/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. bill-schedule-order MUST Pass bills in date order, soonest first. Because BillSchedule renders bills in the order given and never sorts them.
   - Correct: `<BillSchedule bills={bills.toSorted((a, b) => +a.due - +b.due)}/>`
   - Wrong: `<BillSchedule bills={billsFromApi}/> // unsorted`
2. bill-schedule-who-pays MUST Set pay on every bill so the person sees what goes out without them. Because a bill with no pay shows no line under its name, so nothing tells the person whether it goes out without them.
   - Correct: `{name: 'Phone', due, amount: -45, pay: 'autopay'}`
3. bill-schedule-available SHOULD Pass available so a bill the account cannot cover warns before its day.
   - Correct: `<BillSchedule bills={bills} available={balance}/>`
4. bill-schedule-keep-paid SHOULD Keep a paid bill in place with paid: true until the period ends; do not remove it.
5. bill-schedule-short SHOULD Show up to five bills and link to the rest.
6. bill-schedule-no-calendar NEVER Draw a month grid for a few bills. Because the date tiles already give the weekday and day, and a grid spreads five bills over 35 cells.
   - Correct: `<BillSchedule bills={bills} available={balance}/>`
   - Wrong: `<div className="grid grid-cols-7">{days.map(d => <DayCell bills={billsOn(d)}/>)}</div>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `bills` | `Bill[]` | `required` | {name, due: Date, amount, pay: autopay or manual, paid?}. |
| `available` | `number` |  | Tones the amount of a bill it cannot cover. |
| `autopayLabel` | `string` | `'Paid for you'` | The words under a bill the assistant pays. |
Other props pass through to the root element.

## Variants and states
- pay: autopay, manual
- states: upcoming, not covered, paid

## Accessibility
- [ ] The list is an ordered list, so its order is announced.
- [ ] Each tile is a time element with the full date as hidden text.
- [ ] A bill the account cannot cover says so in words under its name, not by the amount color alone.

## Edge cases
- Long bill name -> Truncates; the tile and the amount keep their width.
- Two bills on one day -> Each keeps its own tile, so the rows stay the same shape.
- Right to left -> The tile sits at the start and the amount at the end.

## Tokens
--surface, --radius-field, --fg, --fg-3, --text-xs, --text-base, --weight-semibold

## Related
- [List](/systems/lime/components/list.md): Rows of transactions, accounts or settings, each with a mark, a title and a value or a chevron.
- [Amount](/systems/lime/components/amount.md): A money amount with its sign, currency and tabular figures.
- [Approval request](/systems/lime/components/approval-request.md): The assistant asking before it moves money, with the amount, one reason, and Approve, Edit or Decline.
