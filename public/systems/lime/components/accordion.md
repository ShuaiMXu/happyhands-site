---
name: Accordion
system: lime
kind: component
import: "import {Accordion, AccordionItem, AccordionTrigger, AccordionContent} from '@/components/lime/ui/accordion'"
install: "npx shadcn@latest add https://happyhands.cc/r/lime/accordion.json"
registryDependencies: [icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/accordion
---

# Accordion

Stacks a few sections so people open one answer at a time.

## Use when
- Questions and answers, where most visitors read one.
- A settings page with a few groups of controls.
- Help text that would crowd a form if all of it were open.

## Don't use when
- The reasons behind something the assistant asks to do. Use [Approval request](/systems/lime/components/approval-request.md).
- The person switches between views of the same content. Use [Tabs](/systems/lime/components/tabs.md).
- Every visitor must read the content. Show it open.

## Minimal example
```tsx
<Accordion defaultValue={['round-ups']}>
  <AccordionItem value="round-ups">
    <AccordionTrigger>How do round-ups work?</AccordionTrigger>
    <AccordionContent>Each purchase rounds up to the next dollar.</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. accordion-item-value MUST Give every AccordionItem a unique value; defaultValue is an array of the values that start open. Because defaultValue matches items by value, so a plain string or a missing value opens nothing.
   - Correct: `<Accordion defaultValue={['a']}><AccordionItem value="a">...</AccordionItem></Accordion>`
   - Wrong: `<Accordion defaultValue="a"><AccordionItem>...</AccordionItem></Accordion>`
2. accordion-question-headings SHOULD Write each heading as the question the person has, in sentence case.
3. accordion-first-open SHOULD Open the answer most visitors read with defaultValue.
   - Correct: `<Accordion defaultValue={['round-ups']}>...</Accordion>`
4. accordion-short-answer SHOULD Answer in one to three sentences and link out for more.
5. accordion-no-nested NEVER Nest an Accordion in a panel; use one Accordion with more items. Because a second stack of hairlines and chevrons inside a panel hides which heading owns which answer.
   - Correct: `<AccordionItem value="fees">...</AccordionItem><AccordionItem value="limits">...</AccordionItem>`
   - Wrong: `<AccordionContent><Accordion>...</Accordion></AccordionContent>`
6. accordion-eight-items SHOULD Group or split an accordion that passes about eight items.
7. accordion-one-section MUST Use Collapsible for a single section; an Accordion with one item is a Collapsible. Because one item still needs a value and an array defaultValue that Collapsible does without.
   - Correct: `<Collapsible>...</Collapsible>`
   - Wrong: `<Accordion><AccordionItem value="a">...</AccordionItem></Accordion>`
8. accordion-multiple SHOULD Set multiple when the person compares two answers; leave it off to keep one open.
   - Correct: `<Accordion multiple defaultValue={['a', 'b']}>...</Accordion>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Accordion.multiple` | `boolean` | `false` | Allow several sections open at once. |
| `Accordion.defaultValue` | `string[]` | `[]` | Values that start open. value and onValueChange control it. |
| `AccordionItem.value` | `string` |  | The id of the section. Required. |
| `AccordionItem.disabled` | `boolean` | `false` | Greys the heading and caret; the section cannot open or close. |
Other props pass through to the root element.

## Variants and states
- multiple: false, true
- states: closed, hover, focus-visible, open, disabled

## Accessibility
- [ ] Each trigger sits in a heading element; check the level fits the page outline.
- [ ] Enter and Space toggle; Arrow Up and Down, Home and End move between headings.
- [ ] The trigger carries aria-expanded and aria-controls; the panel is a region named by its trigger.
- [ ] Focus shows a 2px olive outline on :focus-visible. Hover underlines the heading.

## Edge cases
- Long heading -> Wraps inside the trigger and the caret stays at the end. A long unbroken string overflows.
- Narrow to 120px -> Headings and panel text wrap; nothing clips.
- Right to left -> Headings align to the start and the caret moves to the left.
- Empty panel -> Opens a 16px empty space. A heading with no text is an unnamed button.
- Rapid presses -> The height animation reverses from where it is, with no jump.
- Reduced motion -> The panel and caret change at once.
- Forced colors -> Separators are 1px borders and the caret takes currentColor.

## Tokens
--line, --fg, --fg-2, --fg-3, --text-base, --text-sm, --weight-medium, --radius-md, --dur-base, --dur-fast, --ease-out

## Related
- [Approval request](/systems/lime/components/approval-request.md): The assistant asking before it moves money, with the amount, one reason, and Approve, Edit or Decline.
- [Tabs](/systems/lime/components/tabs.md): Switches between views of one list, such as Activity and Scheduled.
- [Separator](/systems/lime/components/separator.md): A hairline between groups.
