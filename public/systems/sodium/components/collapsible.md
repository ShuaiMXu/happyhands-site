---
name: Collapsible
system: sodium
kind: component
import: "import {Collapsible, CollapsibleGroup, CollapsibleTrigger, CollapsibleCaret, CollapsibleContent} from '@/components/sodium/ui/collapsible'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/collapsible.json"
registryDependencies: [icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/collapsible
---

# Collapsible

Shows and hides a region.

## Use when
- Detail most people skip: a job's environment, its full config.
- A stack of sections where one or a few are read at a time: a pipeline's stages in an inspector.

## Don't use when
- Sibling panels the person switches between. Use [Tabs](/systems/sodium/components/tabs.md).
- Content everyone needs; leave it open. Use [Frame](/systems/sodium/components/frame.md).

## Minimal example
```tsx
<CollapsibleGroup>
  <Collapsible>
    <CollapsibleTrigger summary="2 of 14 failed" summaryStatus="fail">Partitions</CollapsibleTrigger>
    <CollapsibleContent>…</CollapsibleContent>
  </Collapsible>
</CollapsibleGroup>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. collapsible-summary SHOULD Give a closed section a summary that says what is inside, and a status when it holds a problem. Because a failure behind a closed section is the reason to open it, and the summary shows it without a press.
   - Correct: `<CollapsibleTrigger summary="2 of 14 failed" summaryStatus="fail">Partitions</CollapsibleTrigger>`
2. collapsible-label-name MUST Name the section in the trigger, in one or two words in sentence case; the trigger sets the capitals. Because the trigger is a label, and a sentence in mono capitals reads slowly.
   - Correct: `<CollapsibleTrigger>Environment</CollapsibleTrigger>`
   - Wrong: `<CollapsibleTrigger>Click to see the environment variables</CollapsibleTrigger>`
3. collapsible-group-frame NEVER Frame each Collapsible of a group on its own. Because the group is one region: variant="framed" boxes it once and rules split the rows.
   - Correct: `<CollapsibleGroup variant="framed"><Collapsible>…</Collapsible></CollapsibleGroup>`
   - Wrong: `<Collapsible className="frame">…</Collapsible>`
4. collapsible-plain-in-frame MUST Use variant="plain" for a group already inside a frame. Because a framed group inside a frame is a box in a box.
   - Correct: `<Frame><CollapsibleGroup variant="plain">…</CollapsibleGroup></Frame>`
   - Wrong: `<Frame><CollapsibleGroup>…</CollapsibleGroup></Frame>`
5. collapsible-not-nav NEVER Hide the page's main content or its only action in a closed section. Because a closed section is skipped by most readers, and an action inside it is found late or never.
   - Correct:
     ```tsx
     <Button>Deploy</Button>
     <Collapsible>…details…</Collapsible>
     ```
   - Wrong: `<CollapsibleContent><Button>Deploy</Button></CollapsibleContent>`
6. collapsible-multiple SHOULD Pass multiple when people compare sections side by side. Because closing one to open the next loses what they were comparing.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `CollapsibleGroup variant` | `'framed' \| 'plain'` | `'framed'` | framed boxes the stack once; plain is rules only. |
| `CollapsibleGroup multiple` | `boolean` | `false` | More than one open at once. |
| `CollapsibleTrigger size` | `'default' \| 'sm'` | `'default'` | Standalone only: 32 or 26px. |
| `CollapsibleTrigger summary, summaryStatus` | `ReactNode, 'warn' \| 'fail'` |  | Shown while closed. |
| `CollapsibleTrigger caret` | `boolean` | `true` | The quarter-turn chevron. |
| `Collapsible open, defaultOpen, onOpenChange` | `Base UI` | `false` | One region. |
Other props pass through to the root element.

## Variants and states
- variant: framed, plain, standalone
- size: default, sm
- states: closed, open, hover, focus-visible, disabled
- when states meet, the first wins: disabled > focus-visible > hover > open > closed

## Accessibility
- [ ] The trigger is a button with aria-expanded and aria-controls; in a group it sits in a heading.
- [ ] Group panels stay in the DOM as hidden="until-found", so find-in-page opens them.
- [ ] The summary is text-2, or the failure or warning word at 6.5:1 and 6.0:1 on the page.

## Keyboard
- `Enter, Space`: Opens and closes the section.
- `Up, Down, Home, End`: In a group: moves between triggers.

## Edge cases
- Long summary -> Drops under the label on a narrow row, then truncates.
- Phone, 390 wide -> Rows keep their 40px; the content wraps under the label.
- Right to left -> The caret points to the start and turns the other way.
- Reduced motion -> Nothing changes: the caret and the region already cut.

## Tokens
--line, --line-faint, --row, --control, --control-sm, --hover, --pressed, --type-label, --type-label-sm, --type-caption, --type-body-sm, --text-1, --text-2, --text-3, --fail-text, --warn-text, --measure

## Related
- [Tabs](/systems/sodium/components/tabs.md): Switches between panels of one view.
- [Frame](/systems/sodium/components/frame.md): Boxes a region once and divides it by rules.
