---
name: Kbd
system: sodium
kind: component
import: "import {Kbd, KbdGroup, shortcut} from '@/components/sodium/ui/kbd'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/kbd.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/kbd
---

# Kbd

Shows a key or a shortcut.

## Use when
- A menu item, a tooltip or a field hint names the shortcut for it.
- A help sheet lists the keys a log viewer or a table answers to.

## Don't use when
- A label for a kind of thing. Use [Tag](/systems/sodium/components/tag.md).
- Code or a command to copy. Use [Copy button](/systems/sodium/components/copy-button.md).

## Minimal example
```tsx
<Kbd keys="mod+k"/>
<Kbd>Enter</Kbd>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. kbd-keys-prop MUST Write a shortcut with keys="mod+k", not with ⌘ or Ctrl typed in. Because keys shows ⌘ on a Mac and Ctrl elsewhere and gives a screen reader the spoken names; a typed ⌘ is wrong for half the readers.
   - Correct: `<Kbd keys="mod+k"/>`
   - Wrong: `<Kbd>⌘K</Kbd>`
2. kbd-not-alone NEVER Use a Kbd as the only way to say what a control does. Because a touch screen has no keys, and the hint hides there.
   - Correct: `<Button>Search<Kbd>/</Kbd></Button>`
   - Wrong: `<Button aria-label="Search"><Kbd>/</Kbd></Button>`
3. kbd-not-pressable NEVER Give a Kbd an onClick or a hover state. Because it is printed on the row, not a key on screen; a pressable cap needs a Button.
   - Correct: `<Button variant="secondary" size="sm" onClick={open}>Open</Button>`
   - Wrong: `<Kbd onClick={open}>K</Kbd>`
4. kbd-hide-on-touch SHOULD Hide a shortcut hint where the pointer is coarse (pointer-coarse:hidden).
   - Correct: `<Kbd keys="mod+k" className="pointer-coarse:hidden"/>`
   - Wrong: `<Kbd keys="mod+k"/>`
5. kbd-sentence-source MUST Write a named key as a word in the source ("Enter", "Esc"); the cap sets the capitals. Because a screen reader reads the source, and typed capitals such as ENTER are spelled out letter by letter.
   - Correct: `<Kbd>Enter</Kbd>`
   - Wrong: `<Kbd>ENTER</Kbd>`
6. kbd-group-by-hand SHOULD Use KbdGroup for a sequence written by hand, so it is read as one.
   - Correct: `<KbdGroup><Kbd>G</Kbd><Kbd>J</Kbd></KbdGroup>`
   - Wrong: `<Kbd>G</Kbd><Kbd>J</Kbd>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `keys` | `string` |  | A shortcut such as "mod+shift+p", shown for the reader's platform. |
| `children` | `ReactNode` |  | One key, as printed on the cap. |
| `KbdGroup` | `kbd` |  | Keys 4px apart, read as one. |
Other props pass through to the kbd element.

## Variants and states
- form: key, shortcut, group

## Accessibility
- [ ] A shortcut from keys has a hidden spoken form: "Command K" on a Mac, "Control K" elsewhere.
- [ ] The cap is text-2 on the page, 7.8:1 in light and 10.2:1 in dark.
- [ ] The server renders a blank cap for a key whose platform form is not known yet, so no wrong key flashes.

## Edge cases
- Unknown platform -> Keys that differ by platform render as blank caps until hydration.
- Long key name -> Wraps inside the cap, which grows taller.
- Touch device -> Hide the hint with pointer-coarse:hidden; nothing depends on it.

## Tokens
--line, --page, --text-2, --type-micro

## Related
- [Input](/systems/sodium/components/input.md): Takes one line of text.
- [Combobox](/systems/sodium/components/combobox.md): Finds one or more values by typing.
- [Tag](/systems/sodium/components/tag.md): Labels what something is or how it stands.
