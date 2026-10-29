---
name: Tooltip
system: glaze
kind: component
import: "import {Tooltip, TooltipTrigger, TooltipContent, TooltipChip, TooltipProvider, TooltipShortcut, tooltipPopupClass, tooltipMotionClass} from '@/components/glaze/ui/tooltip'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/tooltip.json"
registryDependencies: [children, portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/tooltip
---

# Tooltip

Names a control on hover or focus.

## Use when
- An icon button whose glyph alone could be read two ways: retry or refresh, archive or download.
- The keyboard shortcut of a button that already has a name.
- A toolbar of icon buttons, inside one TooltipProvider.

## Don't use when
- The text explains a term or a rule the person needs. Use [Popover](/systems/glaze/components/popover.md).
- The content has a link, a button or more than one short phrase. Use [Popover](/systems/glaze/components/popover.md).
- The text says why a button is disabled. Put it on the page beside the button.

## Minimal example
```tsx
<Tooltip>
  <TooltipTrigger render={<Button variant="ghost" size="icon-sm"/>}><Icon icon={Copy}/></TooltipTrigger>
  <TooltipContent shortcut={['⌘', 'C']}>Copy run ID</TooltipContent>
</Tooltip>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. tooltip-names-icon-button MUST Let the tooltip name an icon-only trigger, or give the button an aria-label with the same words. Because a different aria-label has a screen reader say "Copy" while the eye reads "Copy run ID".
   - Correct:
     ```tsx
     <TooltipTrigger render={<Button size="icon-sm"/>}>…</TooltipTrigger>
     <TooltipContent>Copy run ID</TooltipContent>
     ```
   - Wrong:
     ```tsx
     <TooltipTrigger render={<Button size="icon-sm" aria-label="Copy"/>}/>
     <TooltipContent>Copy run ID</TooltipContent>
     ```
2. tooltip-verb-object MUST Write a verb and its object in sentence case under 32 characters, with no period. Because the label becomes the trigger's accessible name, and a sentence wraps into a block that covers the row.
   - Correct: `<TooltipContent>Copy run ID</TooltipContent>`
   - Wrong: `<TooltipContent>This copies the ID of the run to your clipboard.</TooltipContent>`
3. tooltip-shortcut-prop MUST Pass a shortcut as shortcut={['⌘', 'C']}, one string per key; never type it into the label. Because typed in, "(⌘C)" joins the trigger's accessible name and is read aloud as part of what the button does.
   - Correct: `<TooltipContent shortcut={['⌘', 'C']}>Copy run ID</TooltipContent>`
   - Wrong: `<TooltipContent>Copy run ID (⌘C)</TooltipContent>`
4. tooltip-label-only NEVER Put a link, a button or a sentence of help in a tooltip; use a PopoverInfo. Because a tooltip never opens on touch and closes as the pointer moves toward the link, so nobody can press it.
   - Correct: `<PopoverInfo title="Token budget">The most tokens one run may use.</PopoverInfo>`
   - Wrong: `<TooltipContent>Learn about budgets <a href="/docs">here</a></TooltipContent>`
5. tooltip-disabled-reason-visible MUST Show why a button is disabled as text beside it with aria-describedby; never in a tooltip. Because a tooltip never opens on touch, so a phone user meets a dead Publish button with no reason.
   - Correct:
     ```tsx
     <Button disabled focusableWhenDisabled aria-describedby="r">Publish</Button>
     <p id="r">Add a model before publishing.</p>
     ```
   - Wrong: `<Tooltip><TooltipTrigger render={<span tabIndex={0}/>}><Button disabled>Publish</Button></TooltipTrigger>…`
6. tooltip-not-on-text NEVER Add a tooltip to a button with a text label unless it adds the shortcut. Because it repeats the label in a chip that covers the next control and says nothing new.
   - Correct: `<TooltipContent shortcut={['⌘', '↵']}>Publish</TooltipContent>`
   - Wrong: `<TooltipTrigger render={<Button>Publish</Button>}/><TooltipContent>Publish</TooltipContent>`
7. tooltip-provider-toolbar SHOULD Wrap a row of three or more icon buttons in one TooltipProvider, on Base UI Toolbar when it is role="toolbar".
   - Correct:
     ```tsx
     <TooltipProvider><Toolbar.Root aria-label="Run actions">{tools.map(t => <Tooltip>…</Tooltip>)}</Toolbar.Root></TooltipProvider>
     ```
   - Wrong: `{tools.map(t => <TooltipProvider><Tooltip>…</Tooltip></TooltipProvider>)}`
8. tooltip-no-restyle NEVER Restyle the chip to paper or add a shadow or an arrow. Because the ink chip is how a Glaze label reads apart from the page, and Glaze draws no shadows.
   - Correct: `<TooltipContent>Copy run ID</TooltipContent>`
   - Wrong: `<TooltipContent className="bg-paper shadow-md">Copy run ID</TooltipContent>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `TooltipContent children` | `string (plus a TooltipShortcut)` |  | Other elements are dropped with a development error. |
| `TooltipContent shortcut` | `string[]` |  | One string per key. |
| `TooltipContent side, align, sideOffset` | `Base UI` | `'top', 'center', 6` | It flips on collision. |
| `TooltipProvider delay, closeDelay` | `number` | `500, 0` | Shared by every tooltip inside. |
| `TooltipTrigger render` | `ReactElement` |  | Usually <Button variant="ghost" size="icon-sm"/>. |
| `TooltipChip` | `string, shortcut` |  | The chip in place, for a specimen; no behaviour. |
Other props pass through to the root element.

## Variants and states
- shortcut: none, keys
- side: top, bottom, right, left
- states: closed, delayed open, instant open, named trigger
- when states meet, the first wins: instant open > delayed open > closed

## Accessibility
- [ ] The tooltip is visual; the trigger carries the name, written from the tooltip when it has none.
- [ ] Focus opens it at once; hover after 500ms; the next trigger in one provider at once with no fade.
- [ ] The chip holds --text-inverse on ink at 18:1 or more in both themes.
- [ ] Touch never opens a tooltip; the trigger is still named.
- [ ] Forced colors give the chip a 1px outline.

## Keyboard
- `Tab`: Focusing the trigger opens the tooltip at once.
- `Escape`: Closes the tooltip and nothing else.

## Edge cases
- 120-character label -> Wraps inside 256px and breaks anywhere.
- Empty label -> Renders nothing and names nothing.
- Link or button as a child -> Dropped with a development error.
- Near a viewport edge -> Flips or shifts to stay 8px inside.
- Inside a dialog -> Portals above it; Escape closes the tooltip only.
- Dark theme -> The chip turns near-white with a dark label: still the inverse of the page.
- Reduced motion -> It cuts in and out.

## Tokens
--ink, --text-inverse, --radius-tag, --type-label-sm, --type-code-xs, --tooltip-max, --z-overlay, --dur-overlay, --dur-state, --ease-out

## Related
- [Popover](/systems/glaze/components/popover.md): Shows a few lines next to a control.
- [Truncate](/systems/glaze/components/truncate.md): Cuts a long line and keeps the whole value.
- [Button](/systems/glaze/components/button.md): Starts an action.
