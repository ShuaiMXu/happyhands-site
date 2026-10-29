---
name: Collapsible
system: glaze
kind: component
import: "import {Collapsible, CollapsibleGroup, CollapsibleTrigger, CollapsibleCaret, CollapsibleContent} from '@/components/glaze/ui/collapsible'"
install: "npx shadcn@latest add https://happyhands.cc/r/glaze/collapsible.json"
registryDependencies: [icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/collapsible
---

# Collapsible

Shows and hides a region.

## Use when
- Detail most people skip: raw input, tool call history, advanced settings.
- Questions or sections people scan by label and open one at a time (CollapsibleGroup).

## Don't use when
- The sections are views of one object people switch between. Use tabs.
- The detail is needed to act on the page. Show it.
- Detail beside a control that should not move the page. Use [Popover](/systems/glaze/components/popover.md).

## Minimal example
```tsx
<Collapsible>
  <CollapsibleTrigger summary="1 of 6 failed" summaryStatus="fail">Tool calls</CollapsibleTrigger>
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. collapsible-trigger-noun MUST Name what is inside in the trigger, such as 'Raw input', never 'Show more'. Because the label is the button's accessible name, and a list of "Show more" buttons says nothing about any of them.
   - Correct: `<CollapsibleTrigger>Raw input</CollapsibleTrigger>`
   - Wrong: `<CollapsibleTrigger>Show more</CollapsibleTrigger>`
2. collapsible-summary SHOULD Pass summary with the count and the one fact that matters, such as '1 of 6 failed', with summaryStatus when it is a problem.
   - Correct: `<CollapsibleTrigger summary="1 of 6 failed" summaryStatus="fail">Tool calls</CollapsibleTrigger>`
   - Wrong: `<CollapsibleTrigger>Tool calls</CollapsibleTrigger>`
3. collapsible-disabled-empty MUST Disable the trigger of an empty region and say 0 in the summary. Because a trigger that opens to nothing costs a press and reads as content that failed to load.
   - Correct: `<Collapsible disabled><CollapsibleTrigger summary="0 rules">Escalation rules</CollapsibleTrigger>…`
   - Wrong: `<CollapsibleTrigger>Escalation rules</CollapsibleTrigger> // opens to nothing`
4. collapsible-plain-in-card MUST Use variant="plain" for a group inside a card; framed only on its own. Because a framed group inside a card's panel is a box in a box.
   - Correct: `<div className="panel"><CollapsibleGroup variant="plain">…</CollapsibleGroup></div>`
   - Wrong: `<div className="panel"><CollapsibleGroup>…</CollapsibleGroup></div>`
5. collapsible-no-glass NEVER Put glass or a Button look on CollapsibleTrigger. Because glass marks what acts, and a trigger only shows and hides; a glass pill beside the real actions reads as one of them.
   - Correct: `<CollapsibleTrigger>Raw input</CollapsibleTrigger>`
   - Wrong: `<CollapsibleTrigger className="glass glass-paper">Raw input</CollapsibleTrigger>`
6. collapsible-one-caret NEVER Add a plus or a second chevron to CollapsibleTrigger. Because the trigger already draws one caret that turns when open, and a second glyph gives two cues that can disagree.
   - Correct: `<CollapsibleTrigger>Raw input</CollapsibleTrigger>`
   - Wrong: `<CollapsibleTrigger>Raw input<Icon icon={ChevronDown}/></CollapsibleTrigger>`
7. collapsible-content-scroll MUST Let wide content scroll in its own box with overflow-x-auto. Because the panel clips, so a long line is cut off with no way to scroll to it.
   - Correct: `<CollapsibleContent><pre className="overflow-x-auto">{longLine}</pre></CollapsibleContent>`
   - Wrong: `<CollapsibleContent><pre>{longLine}</pre></CollapsibleContent>`
8. collapsible-find SHOULD Pass hiddenUntilFound to a standalone CollapsibleContent when people search the page with the browser's find.
   - Correct: `<CollapsibleContent hiddenUntilFound>…</CollapsibleContent>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Collapsible open, defaultOpen, onOpenChange, disabled` | `Base UI` | `closed` | In a group it is an item and takes value. |
| `CollapsibleGroup value, defaultValue, onValueChange` | `Base UI Accordion` |  | The open items. |
| `CollapsibleGroup multiple` | `boolean` | `false` | More than one open at once. |
| `CollapsibleGroup variant` | `'framed' \| 'plain'` | `'framed'` | framed: rows on one paper box; plain: hairlines only. |
| `CollapsibleTrigger size` | `'sm' \| 'default'` | `'default'` | Standalone: a 26 or 32px pill. |
| `CollapsibleTrigger summary, summaryStatus` | `ReactNode, 'warn' \| 'fail'` |  | Shown while closed. |
| `CollapsibleTrigger caret` | `boolean` | `true` | Off for a trigger with its own indicator. |
Other props pass through to the root element.

## Variants and states
- form: single, group
- variant: framed, plain
- size: sm, default
- states: closed, open, hover, focus-visible, disabled
- when states meet, the first wins: disabled > focus-visible > hover > open > closed

## Accessibility
- [ ] The trigger is a button with aria-expanded and aria-controls, named by its label and summary.
- [ ] A group trigger sits in a heading; the content is a region named by the trigger.
- [ ] Focus is the 2px ink ring, inset on a group row so the box never clips it.
- [ ] The caret is decorative and hidden from screen readers.

## Keyboard
- `Enter, Space`: Opens or closes the region.
- `Up, Down, Home, End`: Move between the triggers of a group.

## Edge cases
- Long label -> In a group it wraps and the summary drops under it; alone, the pill truncates.
- Wide content -> Scrolls in its own box; the panel clips nothing else.
- Find in page -> A closed group section opens when the browser finds text in it.
- Right to left -> The caret points left when closed, and the content indents from the right.
- Reduced motion -> The caret jumps instead of turning; the panel always cuts.

## Tokens
--paper, --line-faint, --radius-overlay, --radius-pill, --row, --control, --control-sm, --hover, --pressed, --type-label, --type-label-sm, --type-caption, --type-body-sm, --text-1, --text-2, --text-3, --fail-text, --warn-text, --measure, --dur-state

## Related
- [Popover](/systems/glaze/components/popover.md): Shows a few lines next to a control.
- [Sheet](/systems/glaze/components/sheet.md): Opens the details of one thing at the side.
