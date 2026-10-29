---
name: Command
system: sodium
kind: component
import: "import {Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandLoading, CommandGroup, CommandItem, CommandLabel, CommandShortcut, CommandSeparator, CommandFooter, CommandHint, useCommand} from '@/components/sodium/ui/command'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/command.json"
registryDependencies: [dialog, icon, kbd, overlay, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/command
---

# Command

Finds and runs a command by typing.

## Use when
- The palette: every action and place in the tool, found by typing, opened with mod+k.
- A long list of actions on one page, filtered as the person types.

## Don't use when
- A few actions on one thing. Use [Dropdown menu](/systems/sodium/components/dropdown-menu.md).
- The person picks a value for a field. Use [Combobox](/systems/sodium/components/combobox.md).

## Minimal example
```tsx
<CommandDialog open={open} onOpenChange={setOpen}>
  <Command label="Pipeline commands">
    <CommandInput/>
    <CommandList>
      <CommandEmpty/>
      <CommandGroup heading="Pipelines"><CommandItem onSelect={run}>Run ingest-events</CommandItem></CommandGroup>
    </CommandList>
  </Command>
</CommandDialog>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. command-label MUST Give Command a label that says what it searches. Because it names the search field and the list for a screen reader, which sees neither the placeholder nor the headings while typing.
   - Correct: `<Command label="Pipeline commands">`
   - Wrong: `<Command>`
2. command-item-verb MUST Write each item as a verb and its object in sentence case; the row sets the capitals. Because an item is an action, and the matched letters are drawn from the words as written.
   - Correct: `<CommandItem>Open events_raw</CommandItem>`
   - Wrong: `<CommandItem>EVENTS_RAW</CommandItem>`
3. command-keywords SHOULD Add keywords for the other words people use: "rerun" and "retry" for Replay. Because a keyword match ranks last but still finds the item.
   - Correct: `<CommandItem keywords={['rerun', 'retry']}>Replay failed partitions</CommandItem>`
4. command-server-filter MUST Set shouldFilter={false} and mount CommandLoading while results come from a server. Because the list would filter the server's answer a second time, and the pending mark says the search is still going.
   - Correct: `<Command shouldFilter={false}><CommandInput onValueChange={search}/>{loading && <CommandLoading/>}…`
   - Wrong: `<Command><CommandInput onValueChange={search}/>…`
5. command-dialog-title MUST Keep CommandDialog's hidden title, or pass your own DialogTitle. Because the dialog is named by its title, and without one a screen reader announces only "dialog".
   - Correct: `<CommandDialog title="Command palette">`
   - Wrong: `<CommandDialog title={null}>`
6. command-no-box-search NEVER Box CommandInput in a field or put a frame around a group. Because the search is the list's first ruled row, and a box inside the box is a second edge.
   - Correct: `<CommandInput/>`
   - Wrong: `<div className="field"><CommandInput/></div>`
7. command-one-inset NEVER Pad a CommandItem, a group heading or a shortcut in className. Because every row, the search, the headings, the items and their key caps, starts and ends on the 12px --inset, and 40px rows put each 16px icon 12px from its top and from the side, right under the search glyph.
   - Correct: `<CommandItem>Run ingest-events</CommandItem>`
   - Wrong: `<CommandItem className="px-2">Run ingest-events</CommandItem>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Command label` | `string` | `'Commands'` | The name of the search and the list. |
| `Command shouldFilter` | `boolean` | `true` | false when the results come from a server. |
| `Command filter` | `(value, search, keywords) => number` | `rank by match` | Above 0 shows the item; higher sorts first. |
| `Command loop` | `boolean` | `false` | Arrows wrap from last to first. |
| `CommandDialog title, description` | `ReactNode \| null` | `hidden` | The palette's accessible name and description. |
| `CommandItem value, keywords` | `string, string[]` | `its text` | What the search matches. |
| `CommandItem onSelect` | `(value) => void` |  | Runs on Enter or a click. |
| `CommandShortcut, CommandHint keys` | `string` |  | As Kbd writes it: "shift+r". |
Other props pass through to the root element.

## Variants and states
- placement: inline, dialog
- states: rest, searching, empty, loading, item disabled
- when states meet, the first wins: loading > empty > searching > rest

## Accessibility
- [ ] The input is a combobox pointing at the active option with aria-activedescendant; focus never leaves it.
- [ ] A polite status says how many results there are, and which are unavailable.
- [ ] The active row lifts to white off the panel between two --line hairlines, text-1 on it 18.3:1 and 13:1; that lift is the focus indicator, and forced colors draw a 2px outline.
- [ ] Each option carries its place in the ranked order (aria-posinset).

## Keyboard
- `Up, Down`: Moves the active item; Ctrl+P and Ctrl+N too.
- `Home, End`: First and last item, when the field is empty or with Ctrl.
- `Enter`: Runs the active item.
- `Escape`: Closes the palette and returns focus to what opened it.

## Edge cases
- Nothing matches -> A sentence and the query take the list's place.
- Whitespace typed -> No search: every group shows as written.
- Slow results -> The pending mark takes the search icon's place, so the text never moves.
- Touch -> The key hints hide; a tap runs an item.
- Phone, 390 wide -> The palette leaves 16px of page each side.

## Tokens
--panel, --page, --line, --row-highlight, --row-highlight-edge, --inset, --row, --row-sm, --popup-max, --type-body-sm, --type-label, --type-micro, --text-1, --text-2, --text-3, --pending-cell, --overlay-lg, --z-overlay

## Related
- [Dropdown menu](/systems/sodium/components/dropdown-menu.md): Lists the actions on one thing.
- [Combobox](/systems/sodium/components/combobox.md): Finds one or more values by typing.
- [Dialog](/systems/sodium/components/dialog.md): Asks for a decision on top of the page.
