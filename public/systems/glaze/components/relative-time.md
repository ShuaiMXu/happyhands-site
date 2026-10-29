---
name: Relative time
system: glaze
kind: component
import: "import {RelativeTime, formatRelative, untilChange} from '@/components/glaze/ui/relative-time'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/relative-time.json"
registryDependencies: [theme, truncate, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/relative-time
---

# Relative time

Shows a time as distance from now.

## Use when
- When something happened matters more than the exact clock: activity, last edited, last used.
- A column of times that must stay narrow and line up.

## Don't use when
- A schedule or a deadline someone plans around; write the date and time. Use [Data list](/systems/glaze/components/data-list.md).
- A duration such as 2m 14s; write it with tabular figures.

## Minimal example
```tsx
<RelativeTime date={run.finishedAt}/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. relative-time-component NEVER Format "x minutes ago" by hand or with a timer of your own. Because a hand timer re-renders every row on a fixed beat and still lags the boundary, and the server and the browser disagree on the first render.
   - Correct: `<RelativeTime date={date}/>`
   - Wrong: `useInterval(() => setLabel(timeAgo(date)), 10000)`
2. relative-time-date-value MUST Pass the moment as a Date, an ISO string or epoch milliseconds, never a preformatted string. Because RelativeTime needs the instant to tick, to write the dateTime attribute and to show local time and UTC in the hint.
   - Correct: `<RelativeTime date="2026-10-13T09:00:00Z"/>`
   - Wrong: `<RelativeTime date="3 hours ago"/>`
3. relative-time-short-columns SHOULD Use the short format in rows and columns and format="long" inside a sentence. Because "3m ago" keeps a column narrow, and "3 minutes ago" reads as words in a line of text.
4. relative-time-frozen-now MUST Pass now in tests, docs and screenshots. Because a live clock makes every snapshot differ, and now freezes the label and stops the ticking.
   - Correct: `<RelativeTime date={date} now="2026-10-13T12:00:00Z"/>`
5. relative-time-text-colour NEVER Set a time in text-text-3; it is read, so it takes text-2 or text-1. Because text-3 is 3.3:1, for placeholders and icons, and a time is a value someone reads.
   - Correct: `<span className="text-text-2"><RelativeTime date={d}/></span>`
   - Wrong: `<span className="text-text-3"><RelativeTime date={d}/></span>`
6. relative-time-no-hint-dense SHOULD Set hint={false} on times inside a row that is itself a link. Because each hinted time is a tab stop, and a row link with a time inside gives the row two.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `date` | `Date \| string \| number` |  | The moment. |
| `format` | `'short' \| 'long'` | `'short'` | "3m ago" or "3 minutes ago". |
| `now` | `Date \| string \| number` |  | Freezes the clock; the label never ticks. |
| `hint` | `boolean` | `true` | Local time and UTC in a hint on hover and focus, and a tab stop. |
Other props pass through to the time element.

## Variants and states
- format: short, long
- states: now, minutes, hours, days, past a week, future, invalid

## Accessibility
- [ ] A time element with a machine dateTime; a screen reader hears the long form and the exact local time.
- [ ] The hint opens on focus as well as hover; Escape closes it.
- [ ] The figures are tabular, so a column of times does not jitter as it ticks.

## Keyboard
- `Tab`: Reaches the time and opens its hint.
- `Escape`: Closes the hint.

## Edge cases
- Under 45 seconds -> Reads now.
- Past a week -> Turns into a date, with the year only when it differs.
- Server render -> Shows the UTC date until mounted, so the server and the browser agree.
- Tab hidden -> Stops ticking and catches up when shown.
- Invalid date -> Reads "Unknown time" in text-2.
- 200 times on a page -> Each ticks only at its own next boundary.

## Tokens
--ink, --text-inverse, --radius-tag, --type-label-sm, --focus

## Related
- [Truncate](/systems/glaze/components/truncate.md): Cuts a long line and keeps the whole value.
- [Item](/systems/glaze/components/item.md): Shows one thing as a row in a list.
