---
name: Tooltip
system: sodium
kind: component
import: "import {Tooltip, TooltipTrigger, TooltipContent, TooltipChip, TooltipProvider, TooltipShortcut, tooltipPopupClass, tooltipMotionClass} from '@/components/sodium/ui/tooltip'"
install: "npx shadcn@latest add https://design.how/r/sodium/tooltip.json"
registryDependencies: [kbd, overlay, portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/tooltip
---

# Tooltip

Names a control on hover or focus.

## Use when
- An icon button needs its name shown: replay, pause, drop.
- A control has a keyboard shortcut worth teaching.

## Don't use when
- The text explains something the person needs to act. Use [Popover](/systems/sodium/components/popover.md).
- The text is a sentence or holds a link. Use [Popover](/systems/sodium/components/popover.md).

## Minimal example
```tsx
<Tooltip>
  <TooltipTrigger render={<Button variant="ghost" size="icon"/>}><Icon icon={Renew}/></TooltipTrigger>
  <TooltipContent shortcut="shift+r">Replay run</TooltipContent>
</Tooltip>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. tooltip-label-only MUST Give a tooltip a short label in sentence case, a verb and its object, and at most a shortcut. Because the label is the control's name in mono capitals, and links or sentences inside cannot be reached or read.
   - Correct: `<TooltipContent>Replay run</TooltipContent>`
   - Wrong: `<TooltipContent>This replays the run. <a href="/docs">Docs</a></TooltipContent>`
2. tooltip-not-essential NEVER Put anything a person needs in a tooltip alone. Because it never opens on touch and a screen reader may never meet it.
   - Correct: `<p className="type-caption text-text-2">Dropping is permanent.</p>`
   - Wrong: `<Tooltip>…<TooltipContent>Deleting is permanent</TooltipContent></Tooltip>`
3. tooltip-names-trigger SHOULD Leave aria-label off an icon trigger with a tooltip; the tooltip's text names it. Because one string for the eye and the screen reader cannot drift apart.
4. tooltip-provider-toolbar SHOULD Wrap a toolbar's tooltips in one TooltipProvider. Because after the first opens, the next opens at once as the pointer moves along the row.
5. tooltip-no-ink-chip NEVER Restyle the tooltip into a solid ink or yellow chip. Because a solid block on a white page pulls the eye like the slab does, and every Sodium overlay is the panel with a rule edge.
   - Correct: `<TooltipContent>Replay run</TooltipContent>`
   - Wrong: `<TooltipContent className="bg-text-1 text-text-inverse">`
6. tooltip-disabled-wrapper MUST Give a disabled control's tooltip a wrapper trigger that can take focus, and say why it is disabled on the page too. Because a disabled button takes no pointer or focus events, so its own tooltip never opens.
   - Correct: `<TooltipTrigger render={<span tabIndex={0}/>}><Button disabled>Run</Button></TooltipTrigger>`
   - Wrong: `<TooltipTrigger render={<Button disabled/>}/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `TooltipContent children` | `string` |  | The label; any element but TooltipShortcut is dropped. |
| `TooltipContent shortcut` | `string` |  | As Kbd writes it, "shift+r", for the reader's platform. |
| `TooltipContent side, align` | `Base UI` | `'top', 'center'` | 6px off the trigger. |
| `TooltipProvider delay` | `number` | `500` | Hover delay before the first opens. |
| `TooltipChip` | `component` |  | The look drawn in place, for a still picture. |
Other props pass through to the root element.

## Variants and states
- side: top, bottom, left, right
- content: label, label + shortcut
- states: closed, open, instant

## Accessibility
- [ ] The trigger is described by the tooltip; a nameless trigger takes its text as aria-label.
- [ ] Keyboard focus opens it at once, and Escape closes it.
- [ ] The label is text-1 on the panel at 17.6:1 and 14.9:1; the edge is --line, the rule colour.

## Keyboard
- `Tab`: Focusing the trigger opens the tooltip at once.
- `Escape`: Closes it; focus stays on the trigger.

## Edge cases
- Touch -> It never opens; the control's name is still read from the label.
- Long label -> Wraps at 256px; past that, it belongs in a Popover.
- Near a viewport edge -> It flips to the other side.
- Reduced motion -> It cuts in and out.

## Tokens
--panel, --line, --tooltip-max, --type-label-sm, --type-micro, --text-1, --overlay-shift, --z-overlay, --dur-overlay, --dur-state

## Related
- [Popover](/systems/sodium/components/popover.md): Shows a few lines next to a control.
- [Button](/systems/sodium/components/button.md): Starts an action.
