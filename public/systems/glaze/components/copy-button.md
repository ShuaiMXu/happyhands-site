---
name: Copy button
system: glaze
kind: component
import: "import {CopyButton} from '@/components/glaze/ui/copy-button'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/copy-button.json"
registryDependencies: [button, icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/copy-button
---

# Copy button

Copies a value.

## Use when
- The person takes a value into another tool: an ID, an endpoint, an install command, a key.
- At the end of a row, a code block or a card that holds one value.

## Don't use when
- The value sits in a field the person reads. Use [Input](/systems/glaze/components/input.md).
- The action changes something on this page. Use [Button](/systems/glaze/components/button.md).

## Minimal example
```tsx
<CopyButton value="run_8f2a91" label="run ID"/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. copy-button-label MUST Pass label naming what is copied: label="run ID" gives "Copy run ID". Because a row of bare "Copy" buttons gives a screen reader no way to tell which value each one takes.
   - Correct: `<CopyButton value={run.id} label="run ID"/>`
   - Wrong: `<CopyButton value={run.id}/>`
2. copy-button-fetch-lazily MUST Pass a function for a secret read on demand; never fetch it on render to fill value. Because a key fetched up front sits in the page for anyone who opens the inspector, and the function pends with the arc only when pressed.
   - Correct: `<CopyButton value={() => vault.read(id)} label="production key"/>`
   - Wrong: `<CopyButton value={await vault.read(id)}/>`
3. copy-button-no-toast NEVER Show a toast or swap the label to confirm a copy; the button confirms in place. Because the glyph cuts to a check and a status region announces it, so a toast says it twice and a swapped label makes the button jump.
   - Correct: `<CopyButton value={id} label="run ID"/>`
   - Wrong: `<Button onClick={() => { copy(id); toast('Copied'); }}>Copy</Button>`
4. copy-button-quiet SHOULD Keep it ghost in a row or a code block; make it secondary only when copying is the card's own action. Because a flat pill on every row turns a list into a wall of buttons.
   - Correct: `<CopyButton value={cmd} label="install command" variant="secondary" size="sm" showLabel/>`
5. copy-button-never-ink NEVER Make a copy button variant="primary". Because copying never moves the task on, so it is never the group's one ink lead.
   - Correct: `<CopyButton value={key} variant="secondary" size="sm" showLabel/>`
   - Wrong: `<CopyButton value={key} variant="primary"/>`
6. copy-button-show-label SHOULD Set showLabel where the glyph alone could be missed, such as beside a command or in a footer.
   - Correct: `<CopyButton value={cmd} label="install command" showLabel/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `value` | `string \| (() => string \| Promise<string>)` |  | The text, or a function that fetches it on press. |
| `label` | `string` |  | What is copied, for the name: "Copy run ID". |
| `showLabel` | `boolean` | `false` | Shows Copy, Copied or Failed after the glyph, in one cell. |
| `variant, size` | `Button variant, size` | `'ghost', 'icon-sm' or 'sm'` | icon-sm without a label, sm with one. |
| `timeout` | `number` | `1600` | How long the confirmation stays, in ms. |
| `onCopy` | `(value: string) => void` |  | Runs after the value is on the clipboard. |
| `forceState` | `'fetching' \| 'copied' \| 'failed'` |  | Shows a state without a press, for docs. |
Other props pass through to the button (Glaze Button).

## Variants and states
- variant: ghost, secondary
- showLabel: false, true
- states: rest, hover, focus-visible, fetching, copied, failed, disabled
- when states meet, the first wins: disabled > fetching > failed > copied > focus-visible > hover > rest

## Accessibility
- [ ] The button is named "Copy" plus label; the visible Copy and Copied text is aria-hidden so the name never changes.
- [ ] A status region announces "run ID copied" or how to copy by hand; a second copy clears it for a frame so it is heard again.
- [ ] Fetching sets aria-busy and keeps focus; a second press does nothing.
- [ ] Focus is the 2px ink ring; the glyph is aria-hidden.

## Keyboard
- `Enter`: Copies.
- `Space`: Copies on release.

## Edge cases
- Clipboard refused -> The glyph turns to the warning and the region says to select and copy by hand.
- Slow fetch -> The arc turns in place, the width holds, and repeat presses are ignored.
- Pressed again while Copied -> Copies again and restarts the timer; the announcement repeats.
- A fetched value -> Writes a ClipboardItem in the same tick as the press, so the user activation holds across the fetch.
- Empty value -> Disable it; there is nothing to copy.
- Reduced motion -> The arc stays as a still mark; the glyph cuts as it always does.

## Tokens
--hover, --pressed, --text-1, --flat-bg, --flat-ring, --control-sm, --icon-sm, --radius-pill, --type-label-sm, --focus, --dur-press, --dur-spin

## Related
- [Button](/systems/glaze/components/button.md): Starts an action.
- [Input](/systems/glaze/components/input.md): Takes one line of text.
