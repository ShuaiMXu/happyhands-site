---
name: Numbered tabs
system: sodium
kind: component
import: "import {NumberedTabs, NumberedTabsList, NumberedTabsTrigger, NumberedTabsContent, NumberedTabsPanels} from '@/components/sodium/ui/numbered-tabs'"
install: "npx shadcn@latest add https://design.how/r/sodium/numbered-tabs.json"
registryDependencies: [tabs, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/numbered-tabs
---

# Numbered tabs

Steps through the few numbered sections of one page.

## Use when
- A page's two to five sections that run in an order: ingest, transform, load.
- The head of a pipeline's page, where each stage has its own panel.

## Don't use when
- Sibling panels with no order. Use [Tabs](/systems/sodium/components/tabs.md).
- More than five sections. Use [Tabs](/systems/sodium/components/tabs.md).

## Minimal example
```tsx
<NumberedTabs defaultValue="ingest">
  <NumberedTabsList>
    <NumberedTabsTrigger value="ingest">Ingest</NumberedTabsTrigger>
    <NumberedTabsTrigger value="transform">Transform</NumberedTabsTrigger>
  </NumberedTabsList>
  <NumberedTabsContent value="ingest">…</NumberedTabsContent>
</NumberedTabs>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. numbered-tabs-order MUST Use numbered tabs only when the sections run in an order; the index says so. Because a number promises a sequence, and numbered siblings read as steps that are not there.
   - Correct: `<NumberedTabsTrigger value="transform">Transform</NumberedTabsTrigger>`
   - Wrong: `<NumberedTabsTrigger value="settings">Settings</NumberedTabsTrigger>`
2. numbered-tabs-one-row MUST Keep one row of numbered tabs per page, at its head. Because the yellow bar is the brand, spent once, and two rows of it compete with the page's one action.
   - Correct:
     ```tsx
     <NumberedTabs>…</NumberedTabs>
     <Tabs>…</Tabs>
     ```
   - Wrong:
     ```tsx
     <NumberedTabs>…</NumberedTabs>
     <NumberedTabs>…</NumberedTabs>
     ```
3. numbered-tabs-no-typed-index NEVER Type the number or the brackets into the label. Because the list numbers the tabs in written order and draws the brackets, so a typed one doubles or drifts when a tab moves.
   - Correct: `<NumberedTabsTrigger value="ingest">Ingest</NumberedTabsTrigger>`
   - Wrong: `<NumberedTabsTrigger value="ingest">[01] Ingest</NumberedTabsTrigger>`
4. numbered-tabs-yellow-rule NEVER Make the yellow bar the only sign of the selected tab, or paint the index yellow in light. Because sodium yellow on white is 1.4:1, so the gold index and the text-1 label carry the selection and the bar sits beside them.
   - Correct: `<NumberedTabsTrigger value="ingest">Ingest</NumberedTabsTrigger>`
   - Wrong: `<NumberedTabsTrigger className="text-accent-fill">`
5. numbered-tabs-few SHOULD Keep the row to two to five tabs. Because past five the numbers stop helping and the row scrolls.
6. numbered-tabs-start SHOULD Pass index to the first trigger only when the row continues an order shown elsewhere. Because the list counts from 01 in written order on its own.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `NumberedTabs value, defaultValue, onValueChange` | `Base UI` |  | The selected tab. |
| `NumberedTabsList size` | `'default' \| 'sm'` | `'default'` | 40 or 32px tabs. |
| `NumberedTabsTrigger index` | `number` | `written order` | The number in brackets, padded to two digits. |
| `NumberedTabsPanels` | `part` |  | Wraps the contents so a frame eases to the next panel's height over --dur-wipe. |
| `NumberedTabsContent keepMounted` | `boolean` | `true` | Keeps a hidden panel mounted, so a chart in it draws once instead of on every visit. |
Other props pass through to the root element.

## Variants and states
- size: default, sm
- states: rest, hover, selected, focus-visible, disabled
- when states meet, the first wins: disabled > selected > focus-visible > hover > rest

## Accessibility
- [ ] Tabs semantics from Base UI: tablist, tab with aria-selected, tabpanel.
- [ ] The index is read as part of the tab's name ("01 Ingest"); the brackets are drawn and not read.
- [ ] Selected: the index in --accent-text (6.2:1 in light, yellow at 12.9:1 in dark) and the label in text-1; the 2px bar is decoration in light.
- [ ] Focus is the 2px ring drawn inside the tab.

## Keyboard
- `Left, Right`: Moves between tabs and selects, mirrored in right to left.
- `Home, End`: First and last tab.

## Edge cases
- Phone, 390 wide -> The row scrolls sideways along its rule; the selected tab scrolls into view.
- Dark theme -> The index and the bar are both sodium yellow on the near-black page.
- Forced colors -> The bar takes the Highlight colour.
- Ten or more -> The index grows to two digits from the start, so 01 and 10 line up.

## Tokens
--accent, --accent-text, --line, --row, --control, --type-label, --type-label-sm, --text-1, --text-2, --text-3, --focus

## Related
- [Tabs](/systems/sodium/components/tabs.md): Switches between panels of one view.
- [Segmented control](/systems/sodium/components/segmented-control.md): Switches between a few views of one thing.
