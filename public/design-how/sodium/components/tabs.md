---
name: Tabs
system: sodium
kind: component
import: "import {Tabs, TabsList, TabsTrigger, TabsContent, TabsCount, tabsListVariants, tabBase, useActiveInView} from '@/components/sodium/ui/tabs'"
install: "npx shadcn@latest add https://design.how/r/sodium/tabs.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/tabs
---

# Tabs

Switches between panels of one view.

## Use when
- One thing has several panels the person moves between: a pipeline's runs, schema and settings.
- The panels are siblings; none comes first.

## Don't use when
- The panels are a page's few sections in order. Use [Numbered tabs](/systems/sodium/components/numbered-tabs.md).
- One set of data is shown two ways: a chart or a table. Use [Segmented control](/systems/sodium/components/segmented-control.md).
- Each tab is its own page with a URL; use links. Use [Breadcrumb](/systems/sodium/components/breadcrumb.md).

## Minimal example
```tsx
<Tabs defaultValue="runs">
  <TabsList>
    <TabsTrigger value="runs">Runs <TabsCount>248</TabsCount></TabsTrigger>
    <TabsTrigger value="schema">Schema</TabsTrigger>
  </TabsList>
  <TabsContent value="runs">…</TabsContent>
</Tabs>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. tabs-short-labels MUST Name each tab with one or two words in sentence case; the tab sets the capitals. Because mono capitals take room, and a long label pushes the row into scrolling.
   - Correct: `<TabsTrigger value="runs">Runs</TabsTrigger>`
   - Wrong: `<TabsTrigger value="runs">RUN HISTORY FOR THIS PIPELINE</TabsTrigger>`
2. tabs-ink-bar NEVER Recolour the selected tab's bar yellow or put the selection wash under a tab. Because yellow belongs to the one action and to numbered sections, and a washed tab reads as a chosen value.
   - Correct: `<TabsTrigger value="runs">Runs</TabsTrigger>`
   - Wrong: `<TabsTrigger className="data-active:bg-selected">`
3. tabs-count SHOULD Put a count after a label with TabsCount. Because it sets the number in tabular figures and text-3, so the label still leads.
   - Correct: `<TabsTrigger value="runs">Runs <TabsCount>248</TabsCount></TabsTrigger>`
4. tabs-no-box NEVER Box the tab panel in its own frame under the list. Because the list's rule already divides the view, and a frame under it is a box in the region.
   - Correct: `<TabsContent value="runs">`
   - Wrong: `<TabsContent className="frame p-4">`
5. tabs-size SHOULD Use size="sm" inside a frame's header or a toolbar, the default at the top of a view. Because a 26px tab fits a 40px header row with clear space.
6. tabs-disabled-reason SHOULD Disable a tab only when its panel cannot exist yet, and say why nearby. Because a disabled tab cannot be focused to read a reason.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Tabs value, defaultValue, onValueChange` | `Base UI` |  | The selected tab. |
| `TabsList size` | `'default' \| 'sm'` | `'default'` | 32 or 26px tabs. |
| `TabsTrigger value, disabled` | `Base UI` |  | One tab. |
| `TabsCount` | `span` |  | A count after a label. |
Other props pass through to the root element.

## Variants and states
- size: default, sm
- states: rest, hover, selected, focus-visible, disabled
- when states meet, the first wins: disabled > selected > focus-visible > hover > rest

## Accessibility
- [ ] The list is role="tablist"; each tab is role="tab" with aria-selected, and its panel role="tabpanel".
- [ ] The selected tab is text-1 with a 2px ink bar, so it does not rely on colour alone; others are text-2 at 7.8:1.
- [ ] Focus is the 2px ring drawn inside the tab, so the scrolling list never clips it.

## Keyboard
- `Left, Right`: Moves between tabs and selects, mirrored in right to left.
- `Home, End`: First and last tab.
- `Tab`: Leaves the list for the selected panel.

## Edge cases
- More tabs than room -> The list scrolls sideways with no bar; the selected tab scrolls into view.
- Phone, 390 wide -> The rule runs the full width and the tabs scroll along it.
- Right to left -> Tabs run right to left and the arrow keys follow.
- Reduced motion -> Nothing changes: the bar already cuts to the new tab.

## Tokens
--line, --control, --control-sm, --type-label, --type-label-sm, --text-1, --text-2, --text-3, --text-disabled, --focus

## Related
- [Numbered tabs](/systems/sodium/components/numbered-tabs.md): Steps through the few numbered sections of one page.
- [Segmented control](/systems/sodium/components/segmented-control.md): Switches between a few views of one thing.
