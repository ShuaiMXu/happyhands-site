---
name: Tooltip
system: lime
kind: component
import: "import {Tooltip, TooltipTrigger, TooltipContent, TooltipProvider} from '@/components/lime/ui/tooltip'"
install: "npx shadcn@latest add https://happyhands.cc/r/lime/tooltip.json"
registryDependencies: [portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/tooltip
---

# Tooltip

Names an icon button when you hover over it or tab to it.

## Use when
- An icon button with no visible text.
- A truncated label, where the tooltip shows the full text.
- A disabled control that stays focusable, where a short reason helps.

## Don't use when
- A button that already has a text label; the tooltip repeats it.
- Anything with a link, a button or more than one sentence. Use [Popover](/systems/lime/components/popover.md).
- A list of commands. Use [Dropdown menu](/systems/lime/components/dropdown-menu.md).

## Minimal example
```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<Button size="icon" aria-label="Copy link"/>}><Icon icon={Copy}/></TooltipTrigger>
    <TooltipContent>Copy link</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. tooltip-names-icon-button MUST Give an icon-only trigger an aria-label with the same words as the tooltip. Because the tooltip is not the button's name, so a screen reader reads only "button".
   - Correct: `<TooltipTrigger render={<Button size="icon" aria-label="Copy link"/>}><Icon icon={Copy}/></TooltipTrigger>`
   - Wrong: `<TooltipTrigger render={<Button size="icon"/>}><Icon icon={Copy}/></TooltipTrigger>`
2. tooltip-no-text-button NEVER Add a tooltip to a button that has a visible label. Because it repeats the label in an ink chip that covers what sits above the button.
   - Correct: `<Button>Send</Button>`
   - Wrong: `<TooltipTrigger render={<Button/>}>Send</TooltipTrigger> // tooltip: Send money`
3. tooltip-verb-object SHOULD Write a verb and its object in sentence case with no period.
   - Correct: `<TooltipContent>Copy link</TooltipContent>`
   - Wrong: `<TooltipContent>This button copies the link to your clipboard.</TooltipContent>`
4. tooltip-no-rich NEVER Put a link, button or second sentence in a tooltip; use Popover. Because touch never opens it and Tab moves focus past it, so the link cannot be reached.
   - Correct: `<PopoverContent>...</PopoverContent>`
   - Wrong: `<TooltipContent>Learn more <a href="/round-ups">here</a></TooltipContent>`
5. tooltip-max-length SHOULD Keep the label under about 30 characters; the chip wraps at 256px.
   - Correct: `<TooltipContent>Download all</TooltipContent>`
   - Wrong: `<TooltipContent>Download every statement for this account as one archive</TooltipContent>`
6. tooltip-provider-once MUST Wrap the app or a button group in one TooltipProvider. Because a shared provider opens the next tooltip at once, where separate ones each wait 400ms.
   - Correct: `<TooltipProvider delay={400}>...</TooltipProvider>`
7. tooltip-touch-name MUST Never rely on the tooltip alone; the button name must carry the meaning. Because touch never opens a tooltip, so on a phone the name is all there is.
8. tooltip-disabled-reason SHOULD Keep a disabled trigger focusable with focusableWhenDisabled when the reason matters.
   - Correct: `<Button disabled focusableWhenDisabled>Send</Button>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `TooltipProvider delay` | `number` | `400` | Milliseconds before the first tooltip opens. |
| `TooltipTrigger` | `Base UI props` |  | Use `render={<Button/>}`. Takes delay and closeOnClick. |
| `TooltipContent side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | Flips on collision. |
| `TooltipContent sideOffset` | `number` | `6` |  |
Other props pass through to each part's own element; TooltipContent passes them to the bubble.

## Variants and states
- side: top, bottom, left, right
- states: closed, open

## Accessibility
- [ ] The tooltip opens on keyboard focus as well as pointer rest; Escape closes it.
- [ ] The trigger is named by aria-label; the tooltip only shows the same words to sighted people.
- [ ] Touch never opens it.
- [ ] The chip is a fill with no border, so its edge may drop in forced colors.

## Edge cases
- Long label -> Wraps inside 256px and breaks long unbroken strings.
- Right to left -> Start and end sides follow the reading direction.
- Reduced motion -> The chip appears at once.
- Near a viewport edge -> The chip flips or shifts and keeps 8px inside the screen.
- Sweeping a row of buttons -> The first waits 400ms; the next open at once with no fade.
- Empty content -> An empty ink chip; do not render the tooltip.
- Inside a dialog or menu -> It portals into the Lime scope and renders above.

## Tokens
--ink, --fg-inverse, --radius-md, --text-xs, --weight-medium, --dur-fast, --scale-enter

## Related
- [Popover](/systems/lime/components/popover.md): An anchored panel with controls, such as splitting a bill.
- [Dropdown menu](/systems/lime/components/dropdown-menu.md): A list of commands behind a button.
- [Button](/systems/lime/components/button.md): Starts an action, such as Send money. The lime primary is the one glowing action on a screen.
