---
name: Date picker
system: glaze
kind: component
import: "import {Calendar, DatePicker, TimeField, addDays, addMonths, daysBetween, formatTime, parseTime} from '@/components/glaze/ui/date-picker'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/date-picker.json"
registryDependencies: [button, field, icon, input, overlay, portal, select, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/date-picker
---

# Date picker

Sets a date, a range or a time.

## Use when
- A date in the next or last few months: a snooze, a scheduled eval, when a key expires.
- A period for a report or a chart, where its length matters (mode="range").
- A time of day for something that repeats (granularity="time").

## Don't use when
- A date years away, like a birth date; type it. Use [Input](/systems/glaze/components/input.md).
- A few fixed periods: 24h, 7d, 30d. Use [Segmented control](/systems/glaze/components/segmented-control.md).
- A duration, like a timeout. Use [Number input](/systems/glaze/components/number-input.md).

## Minimal example
```tsx
<Field>
  <FieldLabel>Snooze until</FieldLabel>
  <DatePicker disabledDays={{before: today}} clearable/>
</Field>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. date-picker-range MUST Use mode="range" when the length matters; never two pickers for a start and an end. Because two pickers let the end come before the start and lose the day count the range shows.
   - Correct: `<DatePicker mode="range" presets={presets} aria-label="Report period"/>`
   - Wrong:
     ```tsx
     <DatePicker aria-label="From"/>
     <DatePicker aria-label="To"/>
     ```
2. date-picker-draft MUST Read the value from onValueChange on DatePicker, never from a bare Calendar's onSelect. Because the Calendar fires on the first click of a range, so a query runs with no end date; the picker writes only a finished pick.
   - Correct: `<DatePicker mode="range" value={range} onValueChange={setRange}/>`
   - Wrong: `<Calendar mode="range" onSelect={setRange}/>`
3. date-picker-disabled-days MUST Pass disabledDays for days that cannot be picked; never reject a date after the pick. Because the person learns the date was never allowed only after choosing it, and the arrow keys cannot skip it.
   - Correct: `<DatePicker disabledDays={{before: today}}/>`
   - Wrong: `<DatePicker onValueChange={d => d < today && setError("Pick a later date")}/>`
4. date-picker-field MUST Put the picker in a Field with a FieldLabel, or give it aria-label. Because the trigger is a button whose text is the value, so without a label a screen reader hears only the date.
   - Correct: `<Field><FieldLabel>Expires</FieldLabel><DatePicker/></Field>`
   - Wrong:
     ```tsx
     <p>Expires</p>
     <DatePicker/>
     ```
5. date-picker-glaze-day NEVER Restyle the picked day with an ink fill or a ring in className. Because the picked day is the one pressed thing in the grid and takes small glaze like a ticked box, so a flat fill reads as another system.
   - Correct: `<Calendar/>`
   - Wrong: `<Calendar className="[&_[data-selected]]:bg-ink"/>`
6. date-picker-preset-labels SHOULD Name a preset "Last 7 days" and count it to include today.
   - Correct: `{label: 'Last 7 days', range: {from: addDays(today, -6), to: today}}`
   - Wrong: `{label: 'This week', range: {from: addDays(today, -7), to: today}}`
7. date-picker-clearable SHOULD Set clearable on an optional date, so it can go back to empty.
   - Correct: `<DatePicker clearable/>`
8. date-picker-no-library NEVER Add date-fns, dayjs or react-day-picker for it. Because the picker works on Date and Intl, so a library adds weight and a second idea of the week start and the locale.
   - Correct: `import {DatePicker} from '@/components/glaze/ui/date-picker'`
   - Wrong: `import {DayPicker} from 'react-day-picker'`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `granularity` | `'date' \| 'datetime' \| 'time'` | `'date'` | The value type. |
| `mode` | `'single' \| 'range'` | `'single'` | date only. |
| `value, defaultValue, onValueChange` | `Date \| null, DateRange, "HH:mm" \| null` |  | By granularity and mode. |
| `presets, numberOfMonths` | `{label, range}[], 1 \| 2` | `, 2` | range. One month under 640px. |
| `disabledDays` | `(date) => boolean \| {before, after}` |  | date and datetime. |
| `weekStartsOn, locale, format` | `0 to 6, string, Intl options` | `0, 'en-US', Sep 18, 2026` | Not for time. |
| `hourCycle, step, min, max` | `12 \| 24, 5 to 60, "HH:mm"` | `24, 15` | datetime and time. |
| `clearable` | `boolean` | `false` | Clear in the footer. |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | 26, 32 or 36px. |
| `name` | `string` |  | A hidden ISO input; a range posts name-from and name-to. |
Other props pass through to the root element.

## Variants and states
- granularity: date, range, datetime, time
- size: sm, default, lg
- states: empty, hover, focus, open, picked, range end open, today, disabled day, invalid, disabled, unreadable time
- when states meet, the first wins: disabled > invalid > open > focus > hover > rest

## Accessibility
- [ ] The trigger is a button named by the label and the value together, with aria-expanded and aria-invalid.
- [ ] The calendar is an ARIA grid with one tab stop; days are named by their full date and carry aria-selected and aria-current="date".
- [ ] The picked day reads by its glaze and aria-selected; today by its hairline underline and "today" in its name.
- [ ] The footer's count and what to pick next sit in a status region, so a screen reader hears them.
- [ ] An unreadable time says why in words under the field, not only with the coral line.

## Keyboard
- `Arrows`: Move by day and week, mirrored in right to left; disabled days are skipped.
- `Page Up, Page Down`: Move by month; with Shift, by year.
- `Home, End`: Move to the week's ends.
- `Enter, Space`: Pick the focused day; in the time field, commit the typed time.
- `Escape`: Close and drop the draft; the value stays as it was.

## Edge cases
- Narrow trigger -> The date truncates; the day count drops out of the trigger first.
- One-day range -> Reads "1 day", singular.
- Under 640px -> The range shows one month and the presets wrap above it.
- Same day clicked twice in a range -> A one-day range.
- Right to left -> The month arrows mirror and the band rounds at its inline ends.
- Inside a Dialog -> Escape closes the calendar first, then the dialog.
- Forced colors -> The picked day draws a 2px border; the band takes Highlight.

## Tokens
--paper, --shell, --field, --line-control, --line-focus, --line-faint, --line, --fail, --fail-text, --hover, --pressed, --flat-hover, --glaze-sm-top, --glaze-sm-mid, --glaze-sm-bottom, --glaze-sm-highlight, --glaze-sm-rim, --glaze-sm-text, --text-1, --text-2, --text-3, --text-disabled, --control-sm, --control, --control-lg, --menu-row-sm, --shell-inset, --radius-shell, --radius-panel, --radius-pill, --radius-tag, --type-label, --type-caption

## Related
- [Input](/systems/glaze/components/input.md): Takes one line of text.
- [Select](/systems/glaze/components/select.md): Picks one option from a list.
- [Segmented control](/systems/glaze/components/segmented-control.md): Switches between a few views of one thing.
- [Field](/systems/glaze/components/field.md): Gives an input its label and error.
- [Popover](/systems/glaze/components/popover.md): Shows a few lines next to a control.
