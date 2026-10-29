---
name: Tabs
system: glaze
kind: component
import: "import {Tabs, TabsList, TabsTrigger, TabsContent, TabsCount, tabsListVariants} from '@/components/glaze/ui/tabs'"
install: "npx shadcn@latest add https://design.how/r/glaze/tabs.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/tabs
---

# Tabs

Switches between panels of one view.

## Use when
- One page or card shows two to seven panels of the same object, read one at a time: runs, traces, settings.
- A page, a card or a pane splits into sections with their own content.

## Don't use when
- The choice changes how one set of data shows, such as a log level or a chart range. Use [Segmented control](/systems/glaze/components/segmented-control.md).
- The person moves through the panels in order. Use [Steps](/systems/glaze/components/steps.md).
- The places are the app's main areas, each with its own URL; link them from the app's navigation.

## Minimal example
```tsx
<Tabs defaultValue="runs">
  <TabsList aria-label="Agent">
    <TabsTrigger value="runs">Runs<TabsCount>42</TabsCount></TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="runs">…</TabsContent>
  <TabsContent value="settings">…</TabsContent>
</Tabs>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. tabs-list-name MUST Give every TabsList an aria-label naming the object: "Agent", "Run". Because a screen reader announces an unnamed "tab list", so two tab sets on one page sound the same.
   - Correct: `<TabsList aria-label="Agent">`
   - Wrong: `<TabsList>`
2. tabs-value MUST Pass value or defaultValue on Tabs. Because with neither, no tab is selected on load, so no panel shows and the paper pill has nothing to sit under.
   - Correct: `<Tabs defaultValue="runs">…</Tabs>`
   - Wrong: `<Tabs>…</Tabs>`
3. tabs-no-track NEVER Put tabs on a grey track or darken the selected pill; a track is the segmented control. Because tabs on a track look exactly like a segmented control, which changes a view of one data set, so the person cannot tell whether a press swaps the panel or filters it.
   - Correct: `<TabsList aria-label="Run">`
   - Wrong: `<TabsList className="rounded-pill bg-field p-0.5">`
4. tabs-count-part MUST Put a number after the label in TabsCount, never in the label text. Because TabsCount sets tabular figures at the label's weight, so 9 to 10 does not jump, and a bracketed number reads as part of the name.
   - Correct: `<TabsTrigger value="runs">Runs<TabsCount>42</TabsCount></TabsTrigger>`
   - Wrong: `<TabsTrigger value="runs">Runs (42)</TabsTrigger>`
5. tabs-keep-mounted MUST Pass keepMounted to a TabsContent that holds typed or scrolled state. Because Base UI unmounts a hidden panel, so switching away and back drops the typed text and the scroll position.
   - Correct: `<TabsContent value="prompt" keepMounted><Textarea/></TabsContent>`
   - Wrong: `<TabsContent value="prompt"><Textarea/></TabsContent>`
6. tabs-same-object SHOULD Keep two to seven tabs, all about the same object, each a noun of one or two words. Because a tab bar reads as one object seen several ways, so Billing beside Runs hides a page people look for in the app's navigation.
7. tabs-no-icons NEVER Add an icon to some tabs and not others. Because a tab with an icon or a different mark reads as selected or special, so the person cannot tell which panel shows.
   - Correct:
     ```tsx
     <TabsTrigger value="runs">Runs</TabsTrigger>
     <TabsTrigger value="settings">Settings</TabsTrigger>
     ```
   - Wrong:
     ```tsx
     <TabsTrigger value="runs"><Icon icon={Play}/>Runs</TabsTrigger>
     <TabsTrigger value="settings">Settings</TabsTrigger>
     ```

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Tabs value, defaultValue, onValueChange` | `Base UI Tabs.Root` |  | The selected tab's value. Horizontal only. |
| `TabsList size` | `'default' \| 'sm'` | `'default'` | 32 or 26px tall. |
| `TabsList activateOnFocus` | `boolean` | `true` | Arrow keys select the tab they land on. |
| `TabsTrigger value, disabled` | `Base UI Tabs.Tab` |  | One tab. |
| `TabsContent value, keepMounted` | `Base UI Tabs.Panel` |  | keepMounted keeps a hidden panel's state. |
| `TabsCount` | `span` |  | A count after the label, in tabular figures. |
Other props pass through to the Base UI part each wraps.

## Variants and states
- size: default, sm
- states: rest, hover, held, focus-visible, selected, disabled
- when states meet, the first wins: disabled > selected > held > focus-visible > hover > rest

## Accessibility
- [ ] The list is a tablist named by aria-label; each trigger is a tab with aria-selected and aria-controls, each panel a tabpanel.
- [ ] The selected tab reads by more than colour: it sits on the paper pill with a hairline, its label text-1 at 11.9:1 against text-2 ones.
- [ ] Unselected labels are text-2, 5.5:1 on paper; disabled ones drop to the disabled grey and arrow keys skip them.
- [ ] Focus is the 2px ink ring outside the pill, never clipped by the scroller.
- [ ] Forced colors: the selected pill takes Highlight and its label HighlightText.

## Keyboard
- `Arrow Left, Arrow Right`: Move to the next tab and select it, mirrored in right to left.
- `Home, End`: Move to the first or last tab.
- `Tab`: Enters on the selected tab, then moves into the panel.

## Edge cases
- Tabs wider than the container -> The list never wraps; it scrolls sideways with no bar and keeps the selected tab in view.
- One tab -> Render the panel alone: a tab list of one switches nothing.
- Count changes live -> Tabular figures keep each digit one width, so the tabs to its right barely move.
- Panel loading or failing -> The tab switches at once; the panel holds its Skeleton or Empty state.
- Zoom 200% -> Tabs grow with the text past 32px and the list scrolls.
- Dark theme -> The selected pill is the raised dark paper with a light hairline, the lightest thing in the row.
- Reduced motion -> The paper pill jumps to the selected tab instead of sliding.
- Vertical -> Not supported: a column of places is the app's navigation, plain links.

## Tokens
--paper, --line-faint, --text-1, --text-2, --text-disabled, --control, --control-sm, --radius-pill, --radius-tag, --type-label, --type-label-sm, --focus, --dur-slide, --ease-out

## Related
- [Segmented control](/systems/glaze/components/segmented-control.md): Switches between a few views of one thing.
- [Steps](/systems/glaze/components/steps.md): Shows the steps of a flow.
