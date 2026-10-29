---
name: Popover
system: lime
kind: component
import: "import {Popover, PopoverTrigger, PopoverContent, PopoverTitle, PopoverDescription, PopoverClose} from '@/components/lime/ui/popover'"
install: "npx shadcn@latest add https://design.how/r/lime/popover.json"
registryDependencies: [portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/popover
---

# Popover

Opens a small panel right next to whatever you tapped.

## Use when
- A share link, copy button or small form next to the control that opened it.
- A filter with a few options that should not take the screen.
- Extra detail on a control that needs buttons or inputs inside.

## Don't use when
- A one-line label on hover. Use [Tooltip](/systems/lime/components/tooltip.md).
- A list of commands. Use [Dropdown menu](/systems/lime/components/dropdown-menu.md).
- A task that stops the page. Use [Dialog](/systems/lime/components/dialog.md).
- A large panel of details. Use [Sheet](/systems/lime/components/sheet.md).

## Minimal example
```tsx
<Popover>
  <PopoverTrigger render={<Button variant="outline"/>}>Share</PopoverTrigger>
  <PopoverContent>
    <PopoverTitle>Split this bill</PopoverTitle>
  </PopoverContent>
</Popover>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. popover-click-not-hover MUST Open on press; never openOnHover for a panel with buttons or fields. Because a pointer passing over the trigger opens a panel of controls nobody asked for.
   - Correct: `<PopoverTrigger render={<Button/>}>Share</PopoverTrigger>`
   - Wrong: `<PopoverTrigger openOnHover/>`
2. popover-title MUST Add PopoverTitle when the panel holds more than one control. Because the panel takes its accessible name from PopoverTitle, and without it is read as an unnamed dialog.
   - Correct: `<PopoverContent><PopoverTitle>Split this bill</PopoverTitle><Input/><Button/></PopoverContent>`
   - Wrong: `<PopoverContent><Input/><Button/></PopoverContent>`
3. popover-short-title SHOULD Title it in two to four words naming the task.
   - Correct: `<PopoverTitle>Split this bill</PopoverTitle>`
   - Wrong: `<PopoverTitle>You can split this bill with everyone using the link below</PopoverTitle>`
4. popover-width SHOULD Keep the panel at 288px; use a Sheet or Dialog for a large one.
   - Correct: `<Sheet/>`
   - Wrong: `<PopoverContent className="w-[640px]"/>`
5. popover-not-tooltip NEVER Use a popover to name an icon button; use a Tooltip. Because the name shows only after a press, and the button itself stays unnamed.
   - Correct: `<Tooltip><TooltipTrigger/><TooltipContent>Copy link</TooltipContent></Tooltip>`
   - Wrong: `<Popover><PopoverTrigger/><PopoverContent>Copy link</PopoverContent></Popover>`
6. popover-no-nesting NEVER Open a popover from a popover; put the controls in the first. Because the second panel covers the first, and Escape and focus return must unwind two layers.
   - Correct: `<PopoverContent><PopoverTitle>Split this bill</PopoverTitle><Input/><Button>Split</Button></PopoverContent>`
   - Wrong: `<PopoverContent><Popover><PopoverTrigger render={<Button/>}>Pick a date</PopoverTrigger>...</Popover>`
7. popover-tall-content SHOULD Cap tall content with a ScrollArea; the panel limits width, not height.
8. popover-break-long MUST Break long unbroken strings in the content; the panel does not set break-word. Because a pasted account number or share link runs past the 288px panel edge.
   - Correct: `<p className="break-all">{shareLink}</p>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Popover` | `Base UI Popover.Root props` |  | open, defaultOpen, onOpenChange, modal. |
| `PopoverContent side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Flips on collision. |
| `PopoverContent align` | `'start' \| 'center' \| 'end'` | `'center'` |  |
| `PopoverContent sideOffset, alignOffset` | `number` | `8, 0` | Pixels from the trigger. |
Other props pass through to each part's own element; PopoverContent passes them to the panel, not the positioner.

## Variants and states
- side: bottom, top, right, left
- align: center, start, end
- states: closed, open

## Accessibility
- [ ] Press opens it; Escape or an outside press closes it and focus returns to the trigger.
- [ ] PopoverTitle names the panel through aria-labelledby.
- [ ] The panel is a fill and a shadow with no border, so its edge may drop in forced colors.
- [ ] Escape closes the popover first and a dialog behind it second.

## Edge cases
- No room on the side -> The panel flips and shifts to stay 8px inside the viewport.
- Right to left -> Side and align resolve against the reading direction.
- Reduced motion -> The panel appears at once.
- Empty content -> An empty padded box; render nothing instead.
- Slow content -> It opens at once; show loading inside.
- Inside a dialog or sheet -> It portals into the Lime scope and renders above.

## Tokens
--raised, --radius-panel, --shadow-menu, --popover, --text-base, --weight-semibold, --text-sm, --fg-2, --dur-base, --dur-fast, --ease-out, --scale-enter

## Related
- [Tooltip](/systems/lime/components/tooltip.md): A short label on hover and focus.
- [Dropdown menu](/systems/lime/components/dropdown-menu.md): A list of commands behind a button.
- [Dialog](/systems/lime/components/dialog.md): A focused task over a scrim, such as sending money.
- [Sheet](/systems/lime/components/sheet.md): A panel from an edge, such as transaction details, that keeps the page visible.
