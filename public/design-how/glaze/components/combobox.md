---
name: Combobox
system: glaze
kind: component
import: "import {Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxClear, ComboboxCollection, ComboboxContent, ComboboxCreate, ComboboxEmpty, ComboboxField, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxLabel, ComboboxList, ComboboxSeparator, ComboboxTrigger, ComboboxValue, normalizeEmail, splitEmails, validateEmail, useComboboxAnchor} from '@/components/glaze/ui/combobox'"
install: "npx shadcn@latest add https://design.how/r/glaze/combobox.json"
registryDependencies: [chip, field, icon, input, kbd, overlay, portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/combobox
---

# Combobox

Finds one or more values by typing.

## Use when
- More than about seven options, so typing beats scanning: agents, models, queues, tools.
- Several values from one list, shown together (multiple).
- Values the list cannot know: new labels, the emails allowed to review a run (multiple creatable).

## Don't use when
- Seven or fewer options known up front. Use [Select](/systems/glaze/components/select.md).
- A search across the product that runs commands. Use [Command](/systems/glaze/components/command.md).
- One line of free text with no list. Use [Input](/systems/glaze/components/input.md).

## Minimal example
```tsx
<Field>
  <FieldLabel>Agent</FieldLabel>
  <ComboboxField items={agents} placeholder="Search agents" showClear emptyText="No agents match."/>
</Field>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. combobox-label MUST Name the field with a Field and FieldLabel, or aria-label. Because a placeholder is not a name and goes on the first keystroke, so a screen reader hears only "combobox".
   - Correct: `<Field><FieldLabel>Agent</FieldLabel><ComboboxField items={agents}/></Field>`
   - Wrong: `<ComboboxField items={agents} placeholder="Agent"/>`
2. combobox-pending MUST Pass pending while results load, and filter={null} on Combobox when the server filters. Because without pending the list says No matches while results load, and the client filter drops and reorders server matches.
   - Correct: `<Combobox items={results} pending={loading} filter={null}>`
   - Wrong: `<Combobox items={results}>`
3. combobox-creatable-validate MUST Give multiple creatable a validate or a preset when the format matters. Because without one a typo like "ana@" commits as a valid chip.
   - Correct: `<ComboboxField multiple creatable preset="email" aria-label="Reviewers"/>`
   - Wrong: `<ComboboxField multiple creatable aria-label="Reviewers"/>`
4. combobox-empty-text SHOULD Name what was searched in emptyText.
   - Correct: `<ComboboxEmpty>No agents match.</ComboboxEmpty>`
   - Wrong: `<ComboboxEmpty>No results</ComboboxEmpty>`
5. combobox-clear SHOULD Set showClear on an optional single field. Because once a value is picked there is no other way back to empty.
   - Correct: `<ComboboxField items={agents} showClear/>`
6. combobox-chip-name MUST Pass the value as a plain string child of ComboboxChip. Because the remove button takes its name from string children only, so a chip holding an element gets a button named just "Remove".
   - Correct: `<ComboboxChip value={t.id}>{t.name}</ComboboxChip>`
   - Wrong: `<ComboboxChip value={t.id}>{t.icon}</ComboboxChip>`
7. combobox-not-for-few NEVER Use a combobox for seven options or fewer. Because typing to filter a list that already fits on screen is an extra step, and Select shows every option at once.
   - Correct: `<Select items={sizes}>…</Select>`
   - Wrong: `<ComboboxField items={["sm", "default", "lg"]}/>`
8. combobox-chips-height NEVER Lift the chips field's height cap with className. Because a pasted list of two hundred emails would grow the field and push the rest of the form off the screen; it stops at four rows and scrolls.
   - Correct: `<ComboboxChips>`
   - Wrong: `<ComboboxChips className="max-h-none">`
9. combobox-no-ring NEVER Draw a ring or a shadow on the field to show focus or the open list. Because the field shows focus by darkening its own line, as Input does.
   - Correct: `<ComboboxInput/>`
   - Wrong: `<ComboboxInput className="focus-within:ring-2"/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Combobox items, value, defaultValue, onValueChange, multiple, filter` | `Base UI` |  | Every Base UI Root prop. |
| `creatable, preset` | `boolean, 'email'` | `false` | With multiple and string items. |
| `normalize, validate, split, delimiters` | `(raw) => string, (v, all) => string \| null, (text) => string[], string[]` | `trim, none, commas and lines, [',']` | creatable. |
| `pending` | `boolean` | `false` | The Searching row and the arc. |
| `ComboboxField` | `items, multiple, placeholder, emptyText, size, showClear, showSearchIcon` |  | The usual composition for string items. |
| `ComboboxInput size` | `'sm' \| 'default' \| 'lg'` | `'default'` | 26, 32 or 36px, as Input. |
| `ComboboxChips size` | `'default' \| 'lg'` | `'default'` | The 26px chips need at least 32. |
| `ComboboxContent size, anchor` | `'default' \| 'sm', Ref` | `'default'` | Pass the chips ref as anchor. |
| `ComboboxChip value, showRemove` | `string, boolean` | `, true` | value lets a creatable root mark it. |
Other props pass through to the root element.

## Variants and states
- mode: single, multiple, creatable, email
- size: sm, default, lg
- states: rest, focus, filled, invalid, disabled, pending, open, empty, create row, marked chip
- when states meet, the first wins: disabled > invalid > focus > pending > rest

## Accessibility
- [ ] The text is role="combobox" with aria-expanded, aria-controls, aria-activedescendant and aria-invalid; the list is a listbox, multiselectable with multiple.
- [ ] Adds, removes and Searching are announced in polite status regions.
- [ ] A marked chip says its reason in title and in screen reader text, and the field turns coral, so colour is never the only cue.
- [ ] Each chip's remove button reads Remove and the value; the caret reads Show options and stays out of the tab order.
- [ ] Focus darkens the pill's line to --line-focus; the highlighted row's wash is the focus inside the list.

## Keyboard
- `Down, Up`: Opens the list and moves the highlight.
- `Enter`: Picks the highlighted row, or adds the typed value when creatable.
- `Escape`: Closes the list; a second Escape reaches the dialog around it.
- `Backspace`: In the empty text of a chips field, removes the last chip.
- `Left`: At the start of the text, moves into the chips.

## Edge cases
- Long chip -> Truncates inside the field with an ellipsis.
- Twenty-four chips -> They wrap; the field stops at four rows and scrolls.
- Pasted list -> Splits into chips; a quoted "Dee, Ops" <dee@acme.example> stays one address.
- Value typed twice -> Adds once; the text clears and the existing chip flashes the pressed wash.
- items=[] and not creatable -> The empty text; with creatable, nothing until the person types.
- Slow search -> Keeps the Searching row until results arrive.
- Inside a form -> Enter picks or adds and does not submit while the list is open.
- Right to left -> Chips flow right to left; the check and the caret swap sides.

## Tokens
--paper, --field, --line-control, --line-focus, --line, --fail, --fail-text, --hover, --pressed, --text-1, --text-2, --text-3, --control-sm, --control, --control-lg, --shell-inset, --menu-row, --menu-min, --popup-max, --radius-pill, --radius-overlay, --radius-tag, --type-body-sm, --type-label, --type-caption, --dur-state

## Related
- [Select](/systems/glaze/components/select.md): Picks one option from a list.
- [Input](/systems/glaze/components/input.md): Takes one line of text.
- [Chip](/systems/glaze/components/chip.md): Shows a filter or a chosen value.
- [Command](/systems/glaze/components/command.md): Finds and runs a command by typing.
- [Filter bar](/systems/glaze/components/filter-bar.md): Narrows a long list.
