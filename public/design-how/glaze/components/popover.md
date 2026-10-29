---
name: Popover
system: glaze
kind: component
import: "import {Popover, PopoverTrigger, PopoverClose, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription, PopoverInfo} from '@/components/glaze/ui/popover'"
install: "npx shadcn@latest add https://design.how/r/glaze/popover.json"
registryDependencies: [button, icon, overlay, portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/popover
---

# Popover

Shows a few lines next to a control.

## Use when
- A small task beside its control: share a link, set one value, pick a filter.
- The explanation of a term beside it (PopoverInfo).
- A preview of a linked thing on hover, for a pointer (openOnHover).

## Don't use when
- A list of actions. Use [Dropdown menu](/systems/glaze/components/dropdown-menu.md).
- A one-line name for an icon button. Use [Tooltip](/systems/glaze/components/tooltip.md).
- A decision the page must wait for. Use [Dialog](/systems/glaze/components/dialog.md).
- More than 320px of content. Use [Sheet](/systems/glaze/components/sheet.md).

## Minimal example
```tsx
<Popover>
  <PopoverTrigger render={<Button variant="secondary"/>}>Share</PopoverTrigger>
  <PopoverContent>
    <PopoverHeader><PopoverTitle>Share run_8f2a91</PopoverTitle></PopoverHeader>
  </PopoverContent>
</Popover>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. popover-info-not-tooltip MUST Use PopoverInfo for an info icon that explains a term, never a Tooltip. Because a tooltip never opens on touch and closes when the pointer leaves, so the definition is unreadable on a phone.
   - Correct: `<PopoverInfo title="Token budget">The most tokens one run may use.</PopoverInfo>`
   - Wrong:
     ```tsx
     <Tooltip><TooltipTrigger>…<Icon icon={Information}/>…</TooltipTrigger><TooltipContent>The most tokens…</TooltipContent></Tooltip>
     ```
2. popover-info-label MUST Pass title (it names the button "About <title>") or label to PopoverInfo. Because without either every info button is named "More information" and a screen reader cannot tell them apart.
   - Correct: `<PopoverInfo title="Token budget">The most tokens…</PopoverInfo>`
   - Wrong: `<PopoverInfo>The most tokens…</PopoverInfo>`
3. popover-info-text-only MUST Write plain text only in a PopoverInfo; put a link beside the term, or use a Popover. Because focus never enters a PopoverInfo, so a link inside it cannot be reached by keyboard.
   - Correct: `<PopoverInfo title="Token budget">The cap per run.</PopoverInfo> <a href="/docs/budget">Learn more</a>`
   - Wrong: `<PopoverInfo title="Token budget">The cap. <a href="/docs">Learn more</a></PopoverInfo>`
4. popover-hover-preview-link MUST Make an openOnHover trigger a link that works on its own, and show nothing the linked page does not. Because touch and keyboard never see a hover preview, so the link has to reach the same facts alone.
   - Correct:
     ```tsx
     <PopoverTrigger openOnHover nativeButton={false} render={<a href="/agents/refund-agent"/>}>refund-agent</PopoverTrigger>
     ```
   - Wrong: `<PopoverTrigger openOnHover render={<span/>}>refund-agent</PopoverTrigger>`
5. popover-no-hover-actions NEVER Put actions in a hover preview; move them to a DropdownMenu or the linked page. Because a peek closes when the pointer leaves and never opens on touch, so the actions slip away or never appear.
   - Correct: `<DropdownMenu>…<DropdownMenuItem>Pause agent</DropdownMenuItem>…</DropdownMenu>`
   - Wrong: `<PopoverContent><Button size="sm">Pause agent</Button></PopoverContent>`
6. popover-one-ink MUST Give a popover at most one ink Button; Done or Cancel beside it is variant="secondary" (paper). Because the popover's actions are one group, and two ink pills split the eye.
   - Correct:
     ```tsx
     <PopoverClose render={<Button variant="secondary" size="sm"/>}>Done</PopoverClose><Button size="sm">Copy link</Button>
     ```
   - Wrong: `<Button size="sm">Done</Button><Button size="sm">Copy link</Button>`
7. popover-no-shadow-arrow NEVER Add a shadow or an arrow; the ring and the 6px offset tie the panel to its trigger. Because Glaze has no shadows, every shadow class draws nothing, and an arrow breaks the ring's one edge.
   - Correct: `<PopoverContent sideOffset={6}>…`
   - Wrong: `<PopoverContent className="shadow-lg"><Popover.Arrow/>…`
8. popover-preview-facts SHOULD Lead a hover preview with the name and one line of what it is, then two to four facts with numbers.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Popover open, defaultOpen, onOpenChange` | `Base UI` | `false` | A pin cancels the close event. |
| `Popover defaultPreview` | `'peeking' \| 'pinned'` |  | With defaultOpen on a hover trigger, for a specimen. |
| `PopoverTrigger openOnHover, delay, closeDelay` | `boolean, number` | `false, 600, 300` | Peek on hover; a press inside pins it. |
| `PopoverContent side, align, sideOffset` | `Base UI` | `'bottom', 'center', 6` | It flips and shifts on collision. |
| `PopoverContent collisionPadding` | `number` | `8` | Pixels kept clear of the viewport edge. |
| `PopoverInfo title, label` | `ReactNode, string` | `'About ' + title` | The first line, and the button's name. |
| `PopoverInfo side, align` | `Base UI` | `'top', 'center'` | Where the toggletip opens. |
Other props pass through to the root element.

## Variants and states
- opening: press, openOnHover, PopoverInfo
- states: closed, open, peeking, pinned, info open
- when states meet, the first wins: pinned > open > peeking > closed

## Accessibility
- [ ] The panel is a dialog named by PopoverTitle; Tab moves through its content and leaving it closes it.
- [ ] A peek never takes focus; a pinned preview shows a Close preview button.
- [ ] PopoverInfo's text is also its button's description, so focus alone reads it.
- [ ] Hover previews never open on touch; PopoverInfo opens by tap.

## Keyboard
- `Enter, Space`: Opens or closes it from the trigger; pins a peeking preview.
- `Escape`: Closes this popover only and returns focus to the trigger.
- `Tab`: Moves through the content; past the last control it closes and moves on.

## Edge cases
- Long content -> The title wraps and the panel scrolls inside the available height.
- Opened at a screen edge -> The panel flips and shifts to stay 8px inside.
- Phone, 390 wide -> The panel keeps 288px, or the available width when that is less.
- Inside a Dialog -> Escape closes the popover first; focus returns to its trigger.
- Right to left -> The panel lays out right to left inside an RTL portal scope.
- Reduced motion -> It cuts in and out instead of fading.

## Tokens
--paper, --line, --radius-overlay, --popover, --space-3, --type-label, --type-body-sm, --text-1, --text-2, --hover, --pressed, --z-overlay, --dur-overlay, --dur-state, --ease-out

## Related
- [Tooltip](/systems/glaze/components/tooltip.md): Names a control on hover or focus.
- [Dropdown menu](/systems/glaze/components/dropdown-menu.md): Lists the actions on one thing.
- [Dialog](/systems/glaze/components/dialog.md): Asks for a decision on top of the page.
- [Sheet](/systems/glaze/components/sheet.md): Opens the details of one thing at the side.
