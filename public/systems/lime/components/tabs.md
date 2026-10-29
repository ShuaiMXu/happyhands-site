---
name: Tabs
system: lime
kind: component
import: "import {Tabs, TabsList, TabsTrigger, TabsContent} from '@/components/lime/ui/tabs'"
install: "npx shadcn@latest add https://happyhands.cc/r/lime/tabs.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/tabs
---

# Tabs

Switches between a few views on the same page.

## Use when
- Two to five views of the same collection: Activity, Scheduled, Shared.
- Panels of one screen where one is wanted at a time.

## Don't use when
- Setting a value, such as a layout or a unit. Use [Segmented](/systems/lime/components/segmented.md).
- A long list of sections that open in place. Use [Accordion](/systems/lime/components/accordion.md).
- Moving to another page with its own address. Use links.

## Minimal example
```tsx
<Tabs defaultValue="activity">
  <TabsList>
    <TabsTrigger value="activity">Activity</TabsTrigger>
    <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
  </TabsList>
  <TabsContent value="activity">...</TabsContent>
</Tabs>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. tabs-same-kind MUST Make tabs parallel views of one thing, not unrelated sections. Because people expect every tab to show the same data another way, so Help there goes unfound.
   - Correct: `<Tab>Activity</Tab><Tab>Scheduled</Tab><Tab>Shared</Tab>`
   - Wrong: `<Tab>Activity</Tab><Tab>Billing</Tab><Tab>Help</Tab>`
2. tabs-not-segmented NEVER Use Tabs to set a value such as grid or list; use Segmented. Because Tabs announce a tab and a panel, so a view setting is read as a section change.
   - Correct: `<Segmented defaultValue="list"><SegmentedItem value="grid">Grid</SegmentedItem>...</Segmented>`
   - Wrong: `<TabsList><TabsTrigger value="grid">Grid</TabsTrigger>...</TabsList>`
3. tabs-short-labels MUST Name a tab in one or two words in sentence case. Because labels never wrap, so a long one truncates at 192px and loses its last words.
   - Correct: `<TabsTrigger value="a">Activity</TabsTrigger>`
   - Wrong: `<TabsTrigger value="a">All of your activity and scheduled payments</TabsTrigger>`
4. tabs-no-pills NEVER Restyle tabs as filled pills; the underline tells them from Segmented and Chip. Because a lime pill reads as the primary action or a filter chip, not a view.
   - Correct: `<TabsTrigger value="activity">Activity</TabsTrigger>`
   - Wrong: `<TabsTrigger className="rounded-full bg-accent"/>`
5. tabs-five-at-most MUST Keep five tabs or fewer. Because the row neither wraps nor scrolls, so a sixth tab squeezes every label to an ellipsis.
6. tabs-panel-focusable MUST Leave TabsContent focusable so a keyboard user can reach and scroll a text panel. Because a panel of plain text has no other tab stop, so arrow keys cannot scroll it.
   - Correct: `<TabsContent value="activity"/>`
   - Wrong: `<TabsContent tabIndex={-1}/>`
7. tabs-panel-loading SHOULD Show loading and errors inside the panel; the tab switches at once.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Tabs` | `Base UI Tabs.Root props` |  | value, defaultValue, onValueChange, orientation. |
| `TabsList` | `Base UI Tabs.List props` |  | activateOnFocus and loopFocus pass through. Full width. |
| `TabsTrigger value` | `string` | `required` | Matches a TabsContent value. |
| `TabsTrigger disabled` | `boolean` | `false` |  |
| `TabsContent value` | `string` | `required` | keepMounted keeps a hidden panel in the page. |
Other props pass through to the root element.

## Variants and states
- states: rest (selected and not), hover, focus-visible, disabled

## Accessibility
- [ ] TabsList is role tablist, each tab role tab with aria-selected, and each panel role tabpanel.
- [ ] Tab enters the list on the selected tab; arrows move; Tab then goes to the panel.
- [ ] Arrow keys follow the reading direction in RTL.
- [ ] The underline is a background fill, so forced colors may drop it; check in emulation.

## Edge cases
- Long label -> The label truncates; the row stays inside its container and does not scroll.
- Narrow container -> The triggers share the width and their labels truncate.
- Right to left -> The row reverses and the underline positions from the start edge.
- Reduced motion -> The underline jumps with no slide.
- Empty panel -> The tab still switches; an unlabeled tab is an unnamed button.
- Tabs inside tabs -> Valid but confusing; avoid.

## Tokens
--line, --fg-3, --fg, --fg-disabled, --ink, --text-sm, --weight-medium, --control-md, --dur-base, --dur-instant, --ease-out

## Related
- [Segmented](/systems/lime/components/segmented.md): A short row of exclusive options, such as Week, Month and Year.
- [Accordion](/systems/lime/components/accordion.md): A stack of questions that open one at a time.
- [Toolbar](/systems/lime/components/toolbar.md): A row of related controls with one tab stop.
