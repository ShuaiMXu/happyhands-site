# Sodium

> Sodium is compact and ruled, for infrastructure and data tools: white and warm near-black grounds, 1px rules for structure, mono capitals for every interface word, Inter Display for headlines and prose, zero radius, and one sodium yellow for the thing to act on. Build with its recipes and components before writing markup.

kind: system-index
version: 1
last-updated: 2026-10-26
install-base: `npx shadcn@latest add https://design.how/r/sodium/<name>.json`
human: https://design.how/systems/sodium

## How to use this system
1. Read this page. Follow the global rules and the priority order.
2. Before building a component, fetch its page from the list below.
3. Use only the tokens in the foundations' token tables. If a token or component is missing, stop and say so. Do not invent one.

## Priority order
When rules conflict, the earlier item wins.
1. Accessibility and keyboard behaviour
2. Tokens by role, never raw values
3. Existing components and recipes, never rebuilt
4. The signatures: mono capitals through the label roles, rules as structure, the one yellow action, square corners
5. Compact spacing and type

## Global rules
1. sodium-components-first MUST Use a Sodium component or recipe before writing markup; fetch its page before you build. Because each one already carries the focus ring, the states and the yellow rules a hand-built copy forgets.
   - Correct: `import {Button} from '@/components/sodium/ui/button'`
2. sodium-scope MUST Wrap Sodium UI in className="sodium" with SodiumPortalProvider inside it, so overlays keep the tokens. Because a menu or dialog renders at the end of the body, outside the scope, and would lose every colour.
   - Correct: `<div className="sodium"><SodiumPortalProvider>{children}</SodiumPortalProvider></div>`
3. sodium-tokens-only MUST Use only the roles Sodium defines, such as text-text-2, bg-panel and border-line; never a hex, an arbitrary px or a dark: variant. Because the dark theme swaps the roles, and a raw value stays behind.
   - Correct: `<p className="text-text-2">`
   - Wrong: `<p className="text-[#55524a]">`
4. sodium-one-primary MUST Lead a frame, footer, dialog or any group of actions with at most one primary Button (the yellow slab, or the destructive); every other action beside it is variant="secondary" or "ghost". Because the slab is how a person finds the next action, and two of them side by side split the eye.
   - Correct: `<Button variant="secondary">Keep</Button><Button>Run</Button>`
   - Wrong: `<Button>Keep</Button><Button>Run</Button>`
5. sodium-yellow-on-light NEVER Set text, an icon or a lone line in solid yellow; yellow-family text is text-accent-text. Because sodium yellow on white is 1.4:1, and light is the default theme.
   - Correct: `<span className="text-accent-text">Running</span>`
   - Wrong: `<span className="text-accent-fill">Running</span>`
6. sodium-caps-through-roles MUST Set every interface word (button, tab, tag, table head, axis) in a label role, and every sentence in the sans. Because the role carries the mono face, the capitals and the tracking together, and a sentence in capitals reads slowly.
   - Correct: `<span className="type-label-sm">Queued</span>`
   - Wrong: `<span className="uppercase">Queued</span>`
7. sodium-rules-not-boxes MUST Box a region once with frame and divide its parts with rules; never a box in a box and never a grid behind the page. Because rules carry Sodium's layout, and extra edges or a background grid bury them.
   - Correct: `<main><div className="frame"><div className="rule-row">`
   - Wrong: `<main className="dots"><div className="frame"><div className="frame">`
8. sodium-square NEVER Round a corner anywhere. Because square corners meet the 1px rules cleanly, and one rounded part reads as another system.
   - Correct: `<div className="frame">`
   - Wrong: `<div className="frame rounded-lg">`
9. sodium-focus-ring MUST Keep the 2px focus ring on every control and never outline: none; a field shows focus on its own edge. Because keyboard users lose their place without it.
10. sodium-sentence-case MUST Write sentence case in the source and a verb with its object on actions; the label roles set the capitals. No emoji, no em dash. Because the source then reads as plain words to a screen reader, and every screen sounds like one person.
   - Correct: `<Button>Run pipeline</Button>`
   - Wrong: `<Button>OK</Button>`

## Page shell
Every screen sits in this frame.
- Root: `<div className="sodium min-h-dvh bg-page text-text-1">` with `SodiumPortalProvider` inside it
- A region: `<section className="frame">` with a `panel-head` row and parts divided by `rule-row` or `rule-col`
- Several numbers: a status strip: one ruled row of cells, a `type-micro` label over a `type-code` value
- Page title: `<h1 className="type-title">`, one per page
- A run's steps: `ToolCallStack` beside or under the frame, never inside it
- A phone moment: a component at `w-full max-w-sm`, sized to its content, with no device frame; its one slab sits in a row of Buttons

## When to ask
Ask the person only when the screen needs a fact you were not given, such as a region or a limit; decide everything else from these rules and say what you chose.

## Reject list
- No rounded corners, no shadow, no gradient, no blur, no grid behind the page.
- No yellow text or icons on light, no yellow warning, no second slab.
- No bold, no capitals outside the label roles, no sentence in capitals.

## Foundations
- [Color](/systems/sodium/foundations/color.md): White and warm near-black, rules for structure, and one sodium yellow that changes how it shows by theme.
- [Typography](/systems/sodium/foundations/typography.md): Mono capitals for the interface, Inter Display for headlines and prose, one weight.
- [Space](/systems/sodium/foundations/space.md): A 4px grid, 32px controls and 40px rows.
- [Radius](/systems/sodium/foundations/radius.md): Zero, everywhere.
- [Borders and lines](/systems/sodium/foundations/borders-and-lines.md): Rules divide content; a frame is a region's one outer edge.
- [Elevation](/systems/sodium/foundations/elevation.md): No shadows: an overlay is the panel with a rule edge, set apart by its fill and, for a dialog, the scrim.
- [Motion](/systems/sodium/foundations/motion.md): Typing, scrambles, wipes and connectors that draw; ease-out, no springs.
- [Iconography](/systems/sodium/foundations/iconography.md): Lucide at 16px, squared off to match square corners.
- [Anti-slop](/systems/sodium/foundations/anti-slop.md): The habits of generated UI to avoid, and what to do instead.

## Components
- Actions: [Button](/systems/sodium/components/button.md), [Button group](/systems/sodium/components/button-group.md), [Copy button](/systems/sodium/components/copy-button.md)
- Inputs: [Field](/systems/sodium/components/field.md), [Input](/systems/sodium/components/input.md), [Textarea](/systems/sodium/components/textarea.md), [Select](/systems/sodium/components/select.md), [Combobox](/systems/sodium/components/combobox.md)
- Selection: [Checkbox](/systems/sodium/components/checkbox.md), [Radio group](/systems/sodium/components/radio-group.md), [Switch](/systems/sodium/components/switch.md), [Slider](/systems/sodium/components/slider.md), [Segmented control](/systems/sodium/components/segmented-control.md)
- Display: [Tag](/systems/sodium/components/tag.md), [Status strip](/systems/sodium/components/status-strip.md), [Avatar](/systems/sodium/components/avatar.md), [Kbd](/systems/sodium/components/kbd.md), [Item](/systems/sodium/components/item.md), [Data list](/systems/sodium/components/data-list.md)
- Feedback: [Status](/systems/sodium/components/status.md), [Meter](/systems/sodium/components/meter.md), [Progress](/systems/sodium/components/progress.md), [Alert](/systems/sodium/components/alert.md), [Toast](/systems/sodium/components/toast.md), [Empty state](/systems/sodium/components/empty-state.md), [Skeleton](/systems/sodium/components/skeleton.md)
- Overlays: [Dialog](/systems/sodium/components/dialog.md), [Sheet](/systems/sodium/components/sheet.md), [Popover](/systems/sodium/components/popover.md), [Tooltip](/systems/sodium/components/tooltip.md), [Dropdown menu](/systems/sodium/components/dropdown-menu.md), [Command](/systems/sodium/components/command.md)
- Navigation: [Tabs](/systems/sodium/components/tabs.md), [Numbered tabs](/systems/sodium/components/numbered-tabs.md), [Breadcrumb](/systems/sodium/components/breadcrumb.md), [Pagination](/systems/sodium/components/pagination.md)
- Layout: [Collapsible](/systems/sodium/components/collapsible.md), [Frame](/systems/sodium/components/frame.md)
- Data: [Table](/systems/sodium/components/table.md), [Filter bar](/systems/sodium/components/filter-bar.md)
- Code: [Code block](/systems/sodium/components/code-block.md), [Code window](/systems/sodium/components/code-window.md), [JSON view](/systems/sodium/components/json-view.md), [Log viewer](/systems/sodium/components/log-viewer.md)
- Charts: [Chart](/systems/sodium/components/chart.md), [Stem chart](/systems/sodium/components/stem-chart.md), [Swimlanes](/systems/sodium/components/swimlanes.md), [Bar blocks](/systems/sodium/components/bar-blocks.md)
- Runs and agents: [Tool-call row](/systems/sodium/components/tool-call-row.md), [Tool call](/systems/sodium/components/tool-call.md), [Activity](/systems/sodium/components/activity.md), [Prompt input](/systems/sodium/components/prompt-input.md), [Message](/systems/sodium/components/message.md), [Response](/systems/sodium/components/response.md)

## Blocks
Whole screens built only from the components above. For a whole screen, start from one.
- Job runs: Every pipeline's runs as one table: a Status word per row, IDs and numbers in mono and Run now. `npx shadcn@latest add https://design.how/r/sodium/job-runs.json`
- Failed load: A load that failed: the alert with Retry load, the model with its failing line banded, and the step's log. `npx shadcn@latest add https://design.how/r/sodium/failed-load.json`
- On call: A failed job at phone width: its header, the failure in a sentence, its facts in a 2x2 grid, Acknowledge and Retry step. `npx shadcn@latest add https://design.how/r/sodium/on-call.json`
- Run progress: A backfill followed at phone width: the live step, partitions done, the run's numbers as a strip and its steps. `npx shadcn@latest add https://design.how/r/sodium/run-progress.json`
- Warehouse capacity: How full a warehouse is: credits, storage and concurrency as meters, storage by schema, queries by hour and Resize warehouse. `npx shadcn@latest add https://design.how/r/sodium/warehouse-capacity.json`
- Sync flow: A nightly sync across the systems it touches as swimlanes, the rows it loaded by source, and Run sync. `npx shadcn@latest add https://design.how/r/sodium/sync-flow.json`
- Pipeline history: A pipeline's page under its path: runs per day, its latest partitions and its schedule as numbered tabs. `npx shadcn@latest add https://design.how/r/sodium/pipeline-history.json`

## Optional
- [Human docs](https://design.how/systems/sodium): visual reference
