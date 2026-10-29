---
name: Command
system: glaze
kind: component
import: "import {Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandLoading, CommandGroup, CommandItem, CommandLabel, CommandShortcut, CommandSeparator, CommandFooter, CommandHint, useCommand} from '@/components/glaze/ui/command'"
install: "npx shadcn@latest add https://design.how/r/glaze/command.json"
registryDependencies: [dialog, empty-state, icon, kbd, overlay, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/command
---

# Command

Finds and runs a command by typing.

## Use when
- A ⌘K palette across the product: run an eval, open an agent, change a setting.
- Picking one of many named things where typing beats scrolling: an agent, a model, a workspace.

## Don't use when
- Three to twelve actions on one item. Use [Dropdown menu](/systems/glaze/components/dropdown-menu.md).
- Choosing a value for a form field. Use a combobox.

## Minimal example
```tsx
<CommandDialog open={open} onOpenChange={setOpen} title="Search commands and agents">
  <Command>
    <CommandInput placeholder="Search commands and agents"/>
    <CommandList><CommandEmpty/><CommandGroup heading="Actions">…</CommandGroup></CommandList>
  </Command>
</CommandDialog>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. command-server-loading MUST Set shouldFilter={false} and mount CommandLoading while a server request runs. Because the client filter hides server results whose text lacks the query, and without CommandLoading the list says No results while the request runs.
   - Correct: `<Command shouldFilter={false}>…{loading && <CommandLoading>Searching agents</CommandLoading>}…</Command>`
   - Wrong: `<Command><CommandList>{results.map(…)}</CommandList></Command>`
2. command-label-part MUST Wrap item text in CommandLabel and pass value when the item holds an icon or a shortcut. Because only a string child gets its matched letters drawn, so a mixed item shows no reason it matched.
   - Correct: `<CommandItem value="Create agent"><Icon icon={Add}/><CommandLabel>Create agent</CommandLabel></CommandItem>`
   - Wrong: `<CommandItem><Icon icon={Add}/>Create agent</CommandItem>`
3. command-dialog-title MUST Give CommandDialog a title that says what it searches. Because the hidden title names the dialog, and the default "Command palette" does not say what it finds.
   - Correct: `<CommandDialog title="Search commands and agents">`
   - Wrong: `<CommandDialog>`
4. command-no-fuzzy-soup NEVER Swap in a loose fuzzy matcher for filter. Because scattered-letter matches rank unrelated items first, and Enter runs the first item.
   - Correct: `<Command>`
   - Wrong: `<Command filter={fuzzyScore}>`
5. command-hints-in-dialog SHOULD Put CommandFooter with its CommandHint keys in a CommandDialog, after the Command, where it is the card's footer row.
   - Correct: `<CommandDialog><Command>…</Command><CommandFooter>…</CommandFooter></CommandDialog>`
   - Wrong: `<Command>…<CommandFooter/></Command> on a page`
6. command-keywords SHOULD Pass keywords with the other words people use, such as ['ship', 'release'] for Publish prompt.
   - Correct: `<CommandItem value="Publish prompt" keywords={['ship', 'release']}>`
   - Wrong: `<CommandItem value="Publish prompt">`
7. command-item-verb SHOULD Start an action with its verb and name things by their own name; ranking favours the first word.
   - Correct: `<CommandItem>Create agent</CommandItem>`
   - Wrong: `<CommandItem>Agent creation</CommandItem>`
8. command-placeholder SHOULD Say what can be found in the placeholder, such as "Search commands and agents".
   - Correct: `<CommandInput placeholder="Search commands and agents"/>`
   - Wrong: `<CommandInput placeholder="Type here"/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Command label` | `string` | `'Commands'` | Names the search field and the list; not shown. |
| `Command shouldFilter, filter` | `boolean, (value, search, keywords) => number` | `true, ranked words` | false for server results. |
| `Command loop` | `boolean` | `false` | Wrap at the ends. |
| `CommandInput value, onValueChange` | `string` |  | Controlled search. |
| `CommandItem value, keywords, onSelect` | `string, string[], (value) => void` | `text content` | What the filter matches and what Enter runs. |
| `CommandItem disabled, forceMount` | `boolean` | `false` | forceMount keeps the item whatever the search. |
| `CommandDialog title, description` | `ReactNode \| null` | `'Command palette'` | Hidden; null when the children render their own. |
Other props pass through to the root element.

## Variants and states
- placement: inline, dialog
- filtering: built in, by your server
- states: rest, active item, searching, empty, loading, disabled item
- when states meet, the first wins: loading > empty > searching > rest

## Accessibility
- [ ] The input is a combobox pointing at the active option with aria-activedescendant; focus never leaves it.
- [ ] The list is a listbox of groups and options, with aria-posinset and aria-setsize in screen order.
- [ ] A polite status outside the list says how many results, counting the unavailable ones.
- [ ] The active row's wash is the indicator, as in the menu. The search is the header row and keeps the cursor for the palette's whole life, so it draws no ring; the caret shows it.
- [ ] CommandDialog makes the page inert and closes with Escape back to the opener.

## Keyboard
- `Up, Down (Ctrl P, Ctrl N)`: Moves the active item.
- `Home, End`: The first and last item, when the field is empty or with Ctrl.
- `Enter`: Runs the active item, which after typing is the best match.
- `Escape`: Closes the palette and returns focus to the opener.

## Edge cases
- A 90-character label -> Truncates on one line; the shortcut keeps its place.
- One-letter search -> Names starting with it rank first across groups, then word starts, then the rest.
- Nothing matches -> No results, then the query that found nothing.
- Request never returns -> The search glyph turns; Empty never shows; typing goes on.
- Touch -> The key hints hide; the input is 16px so a phone browser does not zoom.
- Reduced motion -> The loading arc stays drawn and still.

## Tokens
--paper, --line, --line-faint, --control-lg, --scrollbar-thumb, --radius-overlay, --radius-tag, --shell, --shell-inset, --menu-row, --popup-max, --overlay-lg, --hover, --type-label, --type-body-sm, --type-code-xs, --text-1, --text-2, --text-3, --text-disabled

## Related
- [Dropdown menu](/systems/glaze/components/dropdown-menu.md): Lists the actions on one thing.
- [Dialog](/systems/glaze/components/dialog.md): Asks for a decision on top of the page.
- [Kbd](/systems/glaze/components/kbd.md): Shows a key or a shortcut.
- [Empty state](/systems/glaze/components/empty-state.md): Explains why a region is empty.
