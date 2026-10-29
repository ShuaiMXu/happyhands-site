---
name: Popover
system: sodium
kind: component
import: "import {Popover, PopoverTrigger, PopoverClose, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription, PopoverInfo} from '@/components/sodium/ui/popover'"
install: "npx shadcn@latest add https://design.how/r/sodium/popover.json"
registryDependencies: [button, icon, overlay, portal, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/popover
---

# Popover

Shows a few lines next to a control.

## Use when
- A few lines about one thing, next to it: a partition's size, a worker's load.
- A small control or two that act on that thing, with the page still usable.
- A term on the page needs a sentence of explanation (PopoverInfo).

## Don't use when
- The person must decide before the page goes on. Use [Dialog](/systems/sodium/components/dialog.md).
- A list of actions on one thing. Use [Dropdown menu](/systems/sodium/components/dropdown-menu.md).
- Only the name of an icon button. Use [Tooltip](/systems/sodium/components/tooltip.md).

## Minimal example
```tsx
<Popover>
  <PopoverTrigger render={<Button variant="secondary"/>}>Partition</PopoverTrigger>
  <PopoverContent>
    <PopoverHeader><PopoverTitle>Partition 2026-10-19</PopoverTitle><PopoverDescription>148,201 rows.</PopoverDescription></PopoverHeader>
  </PopoverContent>
</Popover>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. popover-title-label MUST Name the thing in PopoverTitle, a mono label, and say the rest in PopoverDescription, in sentences. Because the title names a place or a thing and the label role carries its capitals, while a sentence in capitals reads slowly.
   - Correct:
     ```tsx
     <PopoverTitle>Partition 2026-10-19</PopoverTitle>
     <PopoverDescription>Written 12 min ago.</PopoverDescription>
     ```
   - Wrong: `<PopoverTitle>This partition was written 12 min ago.</PopoverTitle>`
2. popover-one-primary MUST Hold at most one primary Button in a popover; the way out is secondary or a PopoverClose. Because the popover is one group of actions, and the yellow slab marks the one thing to act on.
   - Correct:
     ```tsx
     <PopoverClose render={<Button variant="secondary" size="sm"/>}>Done</PopoverClose><Button size="sm">Rewrite</Button>
     ```
   - Wrong: `<Button size="sm">Keep</Button><Button size="sm">Rewrite</Button>`
3. popover-info-plain NEVER Put a link or a button inside PopoverInfo. Because focus stays on the info button, so nothing inside can be reached by keyboard; use a Popover.
   - Correct: `<PopoverInfo title="Retention">Partitions older than 90 days move to cold storage.</PopoverInfo>`
   - Wrong: `<PopoverInfo>Moves to cold storage. <a href="/docs">Learn more</a></PopoverInfo>`
4. popover-hover-extra MUST Use openOnHover only for detail a person can also reach another way, such as the page the link opens. Because a hover preview never opens on touch, and a screen reader may never meet it.
   - Correct: `<PopoverTrigger openOnHover render={<a href="/tables/events_raw"/>}>events_raw</PopoverTrigger>`
   - Wrong: `<PopoverTrigger openOnHover render={<span/>}>Retry policy</PopoverTrigger>`
5. popover-no-shadow NEVER Add a shadow, an arrow or a rounded corner to PopoverContent. Because Sodium has no shadows, only rules: the panel fill and a rule edge set it apart, and the lint flags every shadow class.
   - Correct: `<PopoverContent>`
   - Wrong: `<PopoverContent className="shadow-lg rounded-md">`
6. popover-width SHOULD Keep the popover at its 288px width; past a few lines, move the content to a Sheet. Because a wide popover covers what it describes.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Popover modal` | `boolean` | `false` | true traps focus and adds the X. |
| `PopoverTrigger openOnHover` | `boolean` | `false` | A hover preview after 600ms; a press pins it. |
| `PopoverTrigger delay, closeDelay` | `number` | `600, 300` | With openOnHover. |
| `PopoverContent side, align` | `Base UI` | `'bottom', 'center'` | 6px off the anchor. |
| `PopoverInfo title, label` | `ReactNode, string` |  | The term, and the button's name ("About <title>"). |
| `PopoverInfo children` | `ReactNode` |  | Plain text only; it is also the button's description. |
Other props pass through to the root element.

## Variants and states
- opening: click, hover preview, info
- modal: false, true
- states: closed, open, peeking, pinned
- when states meet, the first wins: pinned > open > peeking > closed

## Accessibility
- [ ] The trigger has aria-expanded and aria-controls; the popup is a dialog named by PopoverTitle.
- [ ] The edge is --line, the rule colour; the popover is a dialog named by its title, not found by its edge.
- [ ] PopoverInfo is a 24px square button named "About <title>", described by its text, so focus alone reads it.
- [ ] A link trigger keeps the link role; a tap on touch only follows it.

## Keyboard
- `Enter, Space`: On the trigger: opens and closes the popover.
- `Escape`: Closes it and returns focus to the trigger.
- `Tab`: Moves into the popover's controls, then on to the page after the trigger.

## Edge cases
- Near a viewport edge -> It flips to the other side or shifts to stay 8px inside.
- Taller than the screen -> It stops at the available height and scrolls inside.
- Touch -> A hover preview never opens; a tap follows the link.
- Phone, 390 wide -> It narrows to the available width less 8px each side.
- Reduced motion -> It cuts in and out.

## Tokens
--panel, --line, --popover, --space-4, --type-label, --type-label-sm, --type-body-sm, --text-1, --text-2, --hover, --pressed, --overlay-shift, --z-overlay, --dur-overlay, --dur-state, --ease-out

## Related
- [Tooltip](/systems/sodium/components/tooltip.md): Names a control on hover or focus.
- [Dialog](/systems/sodium/components/dialog.md): Asks for a decision on top of the page.
- [Dropdown menu](/systems/sodium/components/dropdown-menu.md): Lists the actions on one thing.
