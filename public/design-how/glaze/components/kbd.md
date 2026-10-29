---
name: Kbd
system: glaze
kind: component
import: "import {Kbd, KbdGroup, shortcut} from '@/components/glaze/ui/kbd'"
install: "npx shadcn@latest add https://design.how/r/glaze/kbd.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/kbd
---

# Kbd

Shows a key or a shortcut.

## Use when
- A hint names the keys for an action: send, a new line, the command menu.
- A shortcuts list or a help panel.
- A search field shows the key that focuses it (Input mode="search" does this for you).

## Don't use when
- A value, an ID or a path: use mono text or <code>, not a key cap.
- Something the person clicks. Use [Button](/systems/glaze/components/button.md).

## Minimal example
```tsx
<Kbd keys="mod+k"/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. kbd-keys-prop MUST Write a shortcut as keys="mod+k", never as ⌘ or Ctrl by hand. Because keys shows ⌘ where the platform has a Command key and Ctrl elsewhere, and gives a screen reader the spoken names, where a hand-written ⌘ shows everyone else the wrong key.
   - Correct: `<Kbd keys="mod+k"/>`
   - Wrong: `<KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>`
2. kbd-not-for-values NEVER Use Kbd for an ID, a path or a value; it is for keys only. Because a key cap tells the person to press something, so a run ID in one reads as a shortcut.
   - Correct: `<span className="mono">run_8f2a91</span>`
   - Wrong: `<Kbd>run_8f2a91</Kbd>`
3. kbd-no-restyle NEVER Set a font, a size or a fill on Kbd. Because its mono is already 0.8 of a caption so it never looks bigger than the text beside it, and a fill turns it into a badge.
   - Correct: `<Kbd>K</Kbd>`
   - Wrong: `<Kbd className="font-mono text-sm bg-ink text-text-inverse">K</Kbd>`
4. kbd-aria-keyshortcuts SHOULD Put aria-keyshortcuts on the control the shortcut triggers, beside the visible Kbd. Because the hint is text near the button, and aria-keyshortcuts tells a screen reader the button itself answers to the keys.
   - Correct: `<Button aria-keyshortcuts="Meta+Enter Control+Enter">Send</Button>`
5. kbd-hint-in-caption SHOULD Sit a Kbd inside a caption or a body line, not on its own above a control.
   - Correct: `<span><Kbd keys="enter"/> to send</span>`
6. kbd-few-keys SHOULD Show at most three keys in a shortcut; a longer chord belongs in a help page, not a hint.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `keys` | `string` |  | "mod+k", "shift+enter". Written for the reader's platform; replaces children. |
| `children` | `ReactNode` |  | One key written by hand, when keys does not apply. |
| `KbdGroup` | `component` |  | Keys 4px apart, for a combination written by hand. |
| `shortcut(keys, platform)` | `function` |  | The shown and spoken form of each key. |
Other props pass through to the kbd element.

## Variants and states
- keys: single, combination
- states: rest, before hydration

## Accessibility
- [ ] With keys, the caps are aria-hidden and a hidden span reads the spoken names: "Command K", "Control K".
- [ ] The caps are text-2 on paper, 5.5:1, with a 1px ink 15% line.
- [ ] Kbd is not focusable and takes no pointer events, so a press passes to the row or button under it.

## Edge cases
- Before hydration -> A key that differs by platform is a blank cap of the minimum width, so a Command-key platform never flashes Ctrl.
- keys="" -> Renders nothing, not an empty cap.
- Long key name -> Wraps inside the cap, which grows taller, instead of spilling out.
- Touch phone -> Hide shortcut hints where the pointer is coarse; there is no keyboard to press them on.
- Dark theme -> The cap turns near-black with the line at ink 15%.

## Tokens
--paper, --line-control, --text-2, --radius-tag, --type-code-xs, --mono-scale, --icon-sm

## Related
- [Command](/systems/glaze/components/command.md): Finds and runs a command by typing.
- [Tooltip](/systems/glaze/components/tooltip.md): Names a control on hover or focus.
- [Input](/systems/glaze/components/input.md): Takes one line of text.
