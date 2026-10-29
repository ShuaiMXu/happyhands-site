---
name: List
system: lime
kind: component
import: "import {List, ListItem, ListIcon, listVariants} from '@/components/lime/ui/list'"
install: "npx shadcn@latest add https://happyhands.cc/r/lime/list.json"
registryDependencies: [icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/list
---

# List

Lines up rows on a phone, like recent activity or settings.

## Use when
- Recent activity, accounts or friends, read one row at a time.
- A settings screen, where each row holds one switch or opens one page.
- A short choice on a phone, such as picking the account to pay from.

## Don't use when
- Many columns compared across rows on a wide screen. Use [Table](/systems/lime/components/table.md).
- One choice from a few options inside a form. Use [Radio](/systems/lime/components/radio.md).
- A menu of commands behind a button. Use [Dropdown menu](/systems/lime/components/dropdown-menu.md).

## Minimal example
```tsx
<List>
  <ListItem leading={<ListIcon icon={Cafe}/>} title="Corner Coffee" description="Today" trailing="−$4.80" href="/activity/1"/>
</List>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. list-one-action MUST Give a row one action: href, onClick or one trailing control, never two. Because a Switch inside the row button nests two controls, and one tap fires both.
   - Correct: `<ListItem title="Round-ups" trailing={<Switch aria-label="Round-ups"/>}/>`
   - Wrong: `<ListItem onClick={open} trailing={<Switch/>}/>`
2. list-chevron-opens MUST Show the chevron only on a row that opens another screen; href turns it on. Because the person taps a chevron row expecting a screen, and a Switch row opens nothing.
   - Wrong: `<ListItem title="Round-ups" trailing={<Switch/>} chevron/>`
3. list-amount-sign MUST Write a row amount as formatAmount text, signed for money in; use the Amount pill only when the row needs a tone, such as more than the balance. Because a column of plain figures stays quiet and lines up, and a pill on every row is noise.
   - Correct: `trailing={formatAmount(-4.8)}`
   - Wrong: `trailing="4.80"`
4. list-title-short SHOULD Keep the title to the name and put the date or category in description; both truncate.
   - Correct: `title="Corner Coffee" description="Today, Food and drink"`
   - Wrong: `title="Corner Coffee, today at 8:42, Food and drink"`
5. list-leading-same SHOULD Use the same leading mark in every row of a list: all ListIcon or all Avatar.
6. list-grouped-on-page SHOULD Use plain for a feed of rows; grouped only for a short settings group on the white page, never inside a Card or a Sheet.
   - Correct: `<Card><List/></Card>`
   - Wrong: `<Card><List variant="grouped"/></Card>`
7. list-name-switch MUST Give a trailing Switch an aria-label that repeats the row title. Because a bare Switch is read as "switch, off" with no setting named.
   - Correct: `<Switch aria-label="Round-ups"/>`
   - Wrong: `<Switch/>`
8. list-flush-in-panel SHOULD Pull a plain list out by -mx-4 inside a padded Card or SheetBody, so row text lines up with the heading.
   - Correct: `<SheetBody><List className="-mx-4">...</List></SheetBody>`
9. list-no-lime-rows NEVER Fill a row with lime to mark it; tone="accent" on its ListIcon is the most a row gets. Because the lime fill marks the one primary action, so a lime row reads as a button.
   - Correct: `<ListItem title="Rent" leading={<ListIcon icon={Receipt} tone="accent"/>} trailing={formatAmount(-1450)}/>`
   - Wrong: `<ListItem title="Rent" className="bg-accent" trailing={formatAmount(-1450)}/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `List.variant` | `'plain' \| 'grouped'` | `'plain'` | grouped puts the rows on a warm-grey card. |
| `ListItem.title` | `ReactNode` |  | The name of the row. Required. |
| `ListItem.description` | `ReactNode` |  | A second, quieter line. |
| `ListItem.leading, trailing` | `ReactNode` |  | A ListIcon or Avatar; an amount, Switch or Badge. |
| `ListItem.href, onClick` | `string, function` |  | Makes the row a link or a button. |
| `ListItem.chevron` | `boolean` | `true with href` | A chevron at the end. |
| `ListItem.menu` | `ReactNode` |  | A ListItemMenu beside the row, for its other actions. |
| `ListIcon` | `{icon, tone?: 'neutral' \| 'accent' \| 'success' \| 'danger'}` | `'neutral'` | The round 40px mark. |
Other props pass through to the li (ListItem), not the row link or button; List passes them to the ul.

## Variants and states
- variant: plain, grouped
- trailing: amount, chevron, switch, badge
- tone: neutral, accent, success, danger
- states: rest, hover, focus-visible, pressed, disabled

## Accessibility
- [ ] The list is a ul with role list, so the count is announced even with list styles removed.
- [ ] A row with href is one link and with onClick one button; its name is the title and the line under it.
- [ ] A trailing Switch is the row control and needs its own aria-label.
- [ ] The focus ring sits inside the row so the grouped card does not clip it.
- [ ] Rows are at least 56px tall.

## Edge cases
- Long title -> Title and description truncate; the trailing value never shrinks.
- Right to left -> The mark sits at the start and the chevron flips.
- No leading mark -> The hairline starts at the text edge, 16px in.
- Disabled row -> It dims to half and stops responding; say why in description.
- One row -> No hairline is drawn; the last row never has one.

## Tokens
--surface, --surface-2, --surface-3, --radius-panel, --line, --fg, --fg-3, --text-base, --text-sm, --ring, --accent-wash, --success-tint, --success-text, --dur-instant

## Related
- [Table](/systems/lime/components/table.md): Rows of transactions you scan across, with amounts at the end.
- [Card](/systems/lime/components/card.md): A grouped block, such as a savings goal or a card, on warm grey, outlined or raised.
- [Avatar](/systems/lime/components/avatar.md): A person, such as a friend you split a bill with, with initials as the fallback.
- [Switch](/systems/lime/components/switch.md): A setting that applies at once, such as round-ups.
