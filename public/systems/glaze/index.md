# Glaze

> Glaze is compact black and white for AI products: ink and paper, greys as ink at alphas, colour only for status, and glass only on the one action a group leads with; its secondaries stay flat. Build with these components before writing markup.

kind: system-index
version: 1
last-updated: 2026-10-26
install-base: `npx shadcn@latest add https://happyhands.cc/r/glaze/<name>.json`
human: https://design.how/systems/glaze

## How to use this system
1. Read this page. Follow the global rules and the priority order.
2. Before building a component, fetch its page from the list below.
3. Use only the tokens in the foundations' token tables. If a token or component is missing, stop and say so. Do not invent one.

## Priority order
When rules conflict, the earlier item wins.
1. Accessibility and keyboard behaviour
2. Tokens by role, never raw values
3. Existing components and recipes, never rebuilt
4. The three signatures: glass on pressables, the shell card, pills for one-line controls
5. Compact spacing and type

## Global rules
1. glaze-components-first MUST Use a Glaze component or recipe before writing markup; fetch its page before you build. Because each one already carries the focus ring, the states and the glass a hand-built copy forgets.
   - Correct: `import {Button} from '@/components/glaze/ui/button'`
2. glaze-scope MUST Wrap Glaze UI in className="glaze" with GlazePortalProvider inside it, so overlays keep the tokens. Because a menu or dialog renders at the end of the body, outside the scope, and would lose every colour.
   - Correct: `<div className="glaze"><GlazePortalProvider>{children}</GlazePortalProvider></div>`
3. glaze-tokens-only MUST Use only the roles Glaze defines, such as text-text-2, bg-paper and border-line-faint; never a hex, an arbitrary px or a dark: variant. Because the dark theme swaps the roles, and a raw value stays behind.
   - Correct: `<p className="text-text-2">`
   - Wrong: `<p className="text-[#6c6c6c]">`
4. glaze-one-primary MUST Lead a card, footer, dialog or any group of actions with at most one primary Button (ink, coral or green glass); every other action beside it is variant="secondary", flat. Because two glass pills side by side split the eye and neither reads as the next step.
   - Correct: `<Button variant="secondary">Not now</Button><Button>Join</Button>`
   - Wrong: `<Button>Not now</Button><Button>Join</Button>`
5. glaze-glass-on-pressables NEVER Put glass on anything a person does not press: cards, headers, badges, fields, menus. Because glass is the one sign that a thing can be pressed, and glass everywhere turns it into a theme.
   - Correct: `<div className="shell"><div className="panel p-3">`
   - Wrong: `<div className="glass glass-paper rounded-shell p-3">`
6. glaze-no-shadows NEVER Cast a shadow anywhere, overlays included; a card is a shell, an overlay is paper with a 1px ring. Because depth in Glaze is drawn inside the shape, and every shadow class draws nothing.
   - Correct: `<div className="shell">`
   - Wrong: `<div className="shell shadow-md">`
7. glaze-pill-controls MUST Make every one-line control a pill: buttons, fields, selects, chips, the segmented control. Because the pill is how a Glaze control looks, and a squared field beside a pill button reads as another system.
   - Correct: `<div className="field">`
   - Wrong: `<div className="field rounded-tag">`
8. glaze-mono-scale MUST Set mono at 0.8 of the sans around it: mono or <code> inline, a type-code role beside sans; a block of code, JSON or logs takes type-code-block, 12px. Because Glaze Mono's letters are 26% wider than Glaze Sans's, so at one size mono reads a size bigger.
   - Correct: `<span className="mono">run_8f2a91</span>`
   - Wrong: `<span className="font-mono">run_8f2a91</span>`
9. glaze-focus-ink MUST Keep the 2px ink :focus-visible ring on every control and never outline: none; a field shows focus by darkening its line. Because keyboard users lose their place without it, and a coral ring would read as an error.
10. glaze-sentence-case MUST Write sentence case and a verb with its object on actions; no emoji, no em dash. Because every screen then sounds like one person talking.
   - Correct: `<Button>Run eval</Button>`
   - Wrong: `<Button>OK</Button>`

## Page shell
Every screen sits in this frame.
- Root: `<div className="glaze min-h-dvh bg-page text-text-1">` with `GlazePortalProvider` inside it
- A card: `<div className="shell">` holding `<div className="panel p-3">` and an optional `<div className="shell-foot">`
- A card footer: meta first with `me-auto`, then `size="sm"` Buttons: flat secondaries, then at most one primary
- Page title: `<h1 className="type-title">`, one per page
- A phone moment: a component at `w-full max-w-sm`, sized to its content, with its one action inline (a Card footer or a row of Buttons); the screen around it supplies the header and the page colour

## When to ask
Ask the person only when the screen needs a fact you were not given, such as a model name or a limit; decide everything else from these rules and say what you chose.

## Reject list
- No brand accent, no gradient, no shadow, no blur.
- No glass off pressables, no square one-line controls.
- No mono at the sans size, no weight 700, no capitals.

## Foundations
- [Color](/systems/glaze/foundations/color.md): Ink and paper with greys as ink at alphas, and colour only for status.
- [Typography](/systems/glaze/foundations/typography.md): Glaze Sans for every word, Glaze Mono at 0.8 of the text around it.
- [Space](/systems/glaze/foundations/space.md): A 4px grid, 32px controls and 36px rows.
- [Radius](/systems/glaze/foundations/radius.md): Pills for every one-line control, 14 and 11 for the card, 10 for overlays, 6 for tags.
- [Borders and lines](/systems/glaze/foundations/borders-and-lines.md): One hairline weight, from the faint card edge to the field line that darkens on focus.
- [Elevation](/systems/glaze/foundations/elevation.md): No shadows: depth is drawn inside the shape, and overlays lift with a ring.
- [Motion](/systems/glaze/foundations/motion.md): A press settles at 0.97 in 120ms; nothing springs.
- [Iconography](/systems/glaze/foundations/iconography.md): Phosphor at regular weight, 14px in controls.
- [Anti-slop](/systems/glaze/foundations/anti-slop.md): The habits of generated UI to avoid, and what to do instead.

## Components
- Actions: [Button](/systems/glaze/components/button.md), [Toolbar](/systems/glaze/components/toolbar.md), [Copy button](/systems/glaze/components/copy-button.md), [Button group](/systems/glaze/components/button-group.md)
- Inputs: [Field](/systems/glaze/components/field.md), [Input](/systems/glaze/components/input.md), [Textarea](/systems/glaze/components/textarea.md), [Chip](/systems/glaze/components/chip.md), [Date picker](/systems/glaze/components/date-picker.md), [Number input](/systems/glaze/components/number-input.md), [OTP input](/systems/glaze/components/otp-input.md)
- Selection: [Checkbox](/systems/glaze/components/checkbox.md), [Radio group](/systems/glaze/components/radio-group.md), [Switch](/systems/glaze/components/switch.md), [Slider](/systems/glaze/components/slider.md), [Segmented control](/systems/glaze/components/segmented-control.md), [Select](/systems/glaze/components/select.md), [Combobox](/systems/glaze/components/combobox.md)
- Display: [Kbd](/systems/glaze/components/kbd.md), [Card](/systems/glaze/components/card.md), [Panel](/systems/glaze/components/panel.md), [Badge](/systems/glaze/components/badge.md), [Avatar](/systems/glaze/components/avatar.md), [Item](/systems/glaze/components/item.md), [Data list](/systems/glaze/components/data-list.md), [Truncate](/systems/glaze/components/truncate.md), [Relative time](/systems/glaze/components/relative-time.md)
- Feedback: [Status](/systems/glaze/components/status.md), [Skeleton](/systems/glaze/components/skeleton.md), [Progress](/systems/glaze/components/progress.md), [Empty state](/systems/glaze/components/empty-state.md), [Alert](/systems/glaze/components/alert.md), [Toast](/systems/glaze/components/toast.md)
- Overlays: [Dialog](/systems/glaze/components/dialog.md), [Sheet](/systems/glaze/components/sheet.md), [Popover](/systems/glaze/components/popover.md), [Tooltip](/systems/glaze/components/tooltip.md), [Dropdown menu](/systems/glaze/components/dropdown-menu.md), [Command](/systems/glaze/components/command.md)
- Navigation: [Tabs](/systems/glaze/components/tabs.md), [Breadcrumb](/systems/glaze/components/breadcrumb.md), [Steps](/systems/glaze/components/steps.md), [Pagination](/systems/glaze/components/pagination.md)
- Layout: [Collapsible](/systems/glaze/components/collapsible.md)
- Data: [Filter bar](/systems/glaze/components/filter-bar.md), [Table](/systems/glaze/components/table.md), [Data grid](/systems/glaze/components/data-grid.md), [Bulk action bar](/systems/glaze/components/bulk-action-bar.md), [Timeline](/systems/glaze/components/timeline.md)
- Code: [Code block](/systems/glaze/components/code-block.md), [JSON view](/systems/glaze/components/json-view.md), [Log viewer](/systems/glaze/components/log-viewer.md)
- Media and charts: [Attachment](/systems/glaze/components/attachment.md), [Chart](/systems/glaze/components/chart.md)
- AI: [Prompt input](/systems/glaze/components/prompt-input.md), [Send button](/systems/glaze/components/send-button.md), [Mention](/systems/glaze/components/mention.md), [Message](/systems/glaze/components/message.md), [Conversation](/systems/glaze/components/conversation.md), [Response](/systems/glaze/components/response.md), [Reasoning](/systems/glaze/components/reasoning.md), [Tool call](/systems/glaze/components/tool-call.md), [Activity](/systems/glaze/components/activity.md), [Follow-ups](/systems/glaze/components/follow-ups.md), [Action receipt](/systems/glaze/components/action-receipt.md), [Autonomy rule](/systems/glaze/components/autonomy-rule.md)

## Blocks
Whole screens built only from the components above. For a whole screen, start from one.
- Today: The morning of a personal assistant, at phone width: the day in a line, a card of what it handled and Ask by voice. `npx shadcn@latest add https://happyhands.cc/r/glaze/today.json`
- Voice capture: The assistant listening, at phone width: the time, the words as they are heard, Cancel and Send it. `npx shadcn@latest add https://happyhands.cc/r/glaze/voice-capture.json`
- Note recap: A note the assistant wrote from a voice note: a one line summary and a card of to-dos with Share note. `npx shadcn@latest add https://happyhands.cc/r/glaze/note-recap.json`
- Booking approval: The assistant asks before it pays a deposit, at phone width: the ask, why it checks and the booking card with Book table. `npx shadcn@latest add https://happyhands.cc/r/glaze/booking-approval.json`
- Assistant limits: A list of what a personal assistant may do on its own, one rule per kind of action with its level. `npx shadcn@latest add https://happyhands.cc/r/glaze/assistant-limits.json`
- Conversation insights: A question asked of a week of support conversations: the answer in a line, the week as a number and a line, and the three topics behind it. `npx shadcn@latest add https://happyhands.cc/r/glaze/conversation-insights.json`
- Cited answer: A question asked of the workspace: a short answer with numbered citations and the sources they point to. `npx shadcn@latest add https://happyhands.cc/r/glaze/cited-answer.json`
- Agent plan: An agent builds another agent: the ask, its changes with their status, and Publish agent as the confirm. `npx shadcn@latest add https://happyhands.cc/r/glaze/agent-plan.json`
- Agent procedure: The steps an agent follows, in plain sentences with its tools, documents and teams as mention chips, and Test and Publish. `npx shadcn@latest add https://happyhands.cc/r/glaze/agent-procedure.json`
- Simulations: Simulated customers run against an agent: the pass count, the last 30 runs as a status strip and each scenario with its status, failures first. `npx shadcn@latest add https://happyhands.cc/r/glaze/simulations.json`
- Experiment: Two prompts split live traffic: each arm's resolution rate, both by day, and Ship as the confirm. `npx shadcn@latest add https://happyhands.cc/r/glaze/experiment.json`

## Optional
- [Human docs](https://design.how/systems/glaze): visual reference
