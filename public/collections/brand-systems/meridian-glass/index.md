# Meridian Glass

> Meridian Glass is compact black and white for AI products: ink and paper, greys as ink at alphas, colour only for status, and glass only on the one action a group leads with; its secondaries stay flat. Build with these components before writing markup.

kind: system-index
version: 1
last-updated: 2026-10-26
install-base: `npx shadcn@latest add http://localhost:8080/r/meridian-glass/<name>.json`
human: http://localhost:8080/systems/meridian-glass

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
1. glaze-components-first MUST Use a Meridian Glass component or recipe before writing markup; fetch its page before you build. Because each one already carries the focus ring, the states and the glass a hand-built copy forgets.
   - Correct: `import {Button} from '@/components/meridian-glass/ui/button'`
2. glaze-scope MUST Wrap Meridian Glass UI in className="meridian-glass" with MeridianGlassPortalProvider inside it, so overlays keep the tokens. Because a menu or dialog renders at the end of the body, outside the scope, and would lose every colour.
   - Correct: `<div className="meridian-glass"><MeridianGlassPortalProvider>{children}</MeridianGlassPortalProvider></div>`
3. glaze-tokens-only MUST Use only the roles Meridian Glass defines, such as text-text-2, bg-paper and border-line-faint; never a hex, an arbitrary px or a dark: variant. Because the dark theme swaps the roles, and a raw value stays behind.
   - Correct: `<p className="text-text-2">`
   - Wrong: `<p className="text-[#6c6c6c]">`
4. glaze-one-primary MUST Lead a card, footer, dialog or any group of actions with at most one primary Button (ink, coral or green glass); every other action beside it is variant="secondary", flat. Because two glass pills side by side split the eye and neither reads as the next step.
   - Correct: `<Button variant="secondary">Not now</Button><Button>Join</Button>`
   - Wrong: `<Button>Not now</Button><Button>Join</Button>`
5. glaze-glass-on-pressables NEVER Put glass on anything a person does not press: cards, headers, badges, fields, menus. Because glass is the one sign that a thing can be pressed, and glass everywhere turns it into a theme.
   - Correct: `<div className="shell"><div className="panel p-3">`
   - Wrong: `<div className="glass glass-paper rounded-shell p-3">`
6. glaze-no-shadows NEVER Cast a shadow anywhere, overlays included; a card is a shell, an overlay is paper with a 1px ring. Because depth in Meridian Glass is drawn inside the shape, and every shadow class draws nothing.
   - Correct: `<div className="shell">`
   - Wrong: `<div className="shell shadow-md">`
7. glaze-pill-controls MUST Make every one-line control a pill: buttons, fields, selects, chips, the segmented control. Because the pill is how a Meridian Glass control looks, and a squared field beside a pill button reads as another system.
   - Correct: `<div className="field">`
   - Wrong: `<div className="field rounded-tag">`
8. glaze-mono-scale MUST Set mono at 0.8 of the sans around it: mono or <code> inline, a type-code role beside sans; a block of code, JSON or logs takes type-code-block, 12px. Because Meridian Glass Mono's letters are 26% wider than Meridian Glass Sans's, so at one size mono reads a size bigger.
   - Correct: `<span className="mono">run_8f2a91</span>`
   - Wrong: `<span className="font-mono">run_8f2a91</span>`
9. glaze-focus-ink MUST Keep the 2px ink :focus-visible ring on every control and never outline: none; a field shows focus by darkening its line. Because keyboard users lose their place without it, and a coral ring would read as an error.
10. glaze-sentence-case MUST Write sentence case and a verb with its object on actions; no emoji, no em dash. Because every screen then sounds like one person talking.
   - Correct: `<Button>Run eval</Button>`
   - Wrong: `<Button>OK</Button>`

## Page shell
Every screen sits in this frame.
- Root: `<div className="meridian-glass min-h-dvh bg-page text-text-1">` with `MeridianGlassPortalProvider` inside it
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
- [Color](/systems/meridian-glass/foundations/color.md): Ink and paper with greys as ink at alphas, and colour only for status.
- [Typography](/systems/meridian-glass/foundations/typography.md): Meridian Glass Sans for every word, Meridian Glass Mono at 0.8 of the text around it.
- [Space](/systems/meridian-glass/foundations/space.md): A 4px grid, 32px controls and 36px rows.
- [Radius](/systems/meridian-glass/foundations/radius.md): Pills for every one-line control, 14 and 11 for the card, 10 for overlays, 6 for tags.
- [Borders and lines](/systems/meridian-glass/foundations/borders-and-lines.md): One hairline weight, from the faint card edge to the field line that darkens on focus.
- [Elevation](/systems/meridian-glass/foundations/elevation.md): No shadows: depth is drawn inside the shape, and overlays lift with a ring.
- [Motion](/systems/meridian-glass/foundations/motion.md): A press settles at 0.97 in 120ms; nothing springs.
- [Iconography](/systems/meridian-glass/foundations/iconography.md): Phosphor at regular weight, 14px in controls.
- [Anti-slop](/systems/meridian-glass/foundations/anti-slop.md): The habits of generated UI to avoid, and what to do instead.

## Components
- Actions: [Button](/systems/meridian-glass/components/button.md), [Toolbar](/systems/meridian-glass/components/toolbar.md), [Copy button](/systems/meridian-glass/components/copy-button.md), [Button group](/systems/meridian-glass/components/button-group.md)
- Inputs: [Field](/systems/meridian-glass/components/field.md), [Input](/systems/meridian-glass/components/input.md), [Textarea](/systems/meridian-glass/components/textarea.md), [Chip](/systems/meridian-glass/components/chip.md), [Date picker](/systems/meridian-glass/components/date-picker.md), [Number input](/systems/meridian-glass/components/number-input.md), [OTP input](/systems/meridian-glass/components/otp-input.md)
- Selection: [Checkbox](/systems/meridian-glass/components/checkbox.md), [Radio group](/systems/meridian-glass/components/radio-group.md), [Switch](/systems/meridian-glass/components/switch.md), [Slider](/systems/meridian-glass/components/slider.md), [Segmented control](/systems/meridian-glass/components/segmented-control.md), [Select](/systems/meridian-glass/components/select.md), [Combobox](/systems/meridian-glass/components/combobox.md)
- Display: [Kbd](/systems/meridian-glass/components/kbd.md), [Card](/systems/meridian-glass/components/card.md), [Panel](/systems/meridian-glass/components/panel.md), [Badge](/systems/meridian-glass/components/badge.md), [Avatar](/systems/meridian-glass/components/avatar.md), [Item](/systems/meridian-glass/components/item.md), [Data list](/systems/meridian-glass/components/data-list.md), [Truncate](/systems/meridian-glass/components/truncate.md), [Relative time](/systems/meridian-glass/components/relative-time.md)
- Feedback: [Status](/systems/meridian-glass/components/status.md), [Skeleton](/systems/meridian-glass/components/skeleton.md), [Progress](/systems/meridian-glass/components/progress.md), [Empty state](/systems/meridian-glass/components/empty-state.md), [Alert](/systems/meridian-glass/components/alert.md), [Toast](/systems/meridian-glass/components/toast.md)
- Overlays: [Dialog](/systems/meridian-glass/components/dialog.md), [Sheet](/systems/meridian-glass/components/sheet.md), [Popover](/systems/meridian-glass/components/popover.md), [Tooltip](/systems/meridian-glass/components/tooltip.md), [Dropdown menu](/systems/meridian-glass/components/dropdown-menu.md), [Command](/systems/meridian-glass/components/command.md)
- Navigation: [Tabs](/systems/meridian-glass/components/tabs.md), [Breadcrumb](/systems/meridian-glass/components/breadcrumb.md), [Steps](/systems/meridian-glass/components/steps.md), [Pagination](/systems/meridian-glass/components/pagination.md)
- Layout: [Collapsible](/systems/meridian-glass/components/collapsible.md)
- Data: [Filter bar](/systems/meridian-glass/components/filter-bar.md), [Table](/systems/meridian-glass/components/table.md), [Data grid](/systems/meridian-glass/components/data-grid.md), [Bulk action bar](/systems/meridian-glass/components/bulk-action-bar.md), [Timeline](/systems/meridian-glass/components/timeline.md)
- Code: [Code block](/systems/meridian-glass/components/code-block.md), [JSON view](/systems/meridian-glass/components/json-view.md), [Log viewer](/systems/meridian-glass/components/log-viewer.md)
- Media and charts: [Attachment](/systems/meridian-glass/components/attachment.md), [Chart](/systems/meridian-glass/components/chart.md)
- AI: [Prompt input](/systems/meridian-glass/components/prompt-input.md), [Send button](/systems/meridian-glass/components/send-button.md), [Mention](/systems/meridian-glass/components/mention.md), [Message](/systems/meridian-glass/components/message.md), [Conversation](/systems/meridian-glass/components/conversation.md), [Response](/systems/meridian-glass/components/response.md), [Reasoning](/systems/meridian-glass/components/reasoning.md), [Tool call](/systems/meridian-glass/components/tool-call.md), [Activity](/systems/meridian-glass/components/activity.md), [Follow-ups](/systems/meridian-glass/components/follow-ups.md), [Action receipt](/systems/meridian-glass/components/action-receipt.md), [Autonomy rule](/systems/meridian-glass/components/autonomy-rule.md)

## Blocks
Whole screens built only from the components above. For a whole screen, start from one.
- Today: The morning of a personal assistant, at phone width: the day in a line, a card of what it handled and Ask by voice. `npx shadcn@latest add http://localhost:8080/r/meridian-glass/today.json`
- Voice capture: The assistant listening, at phone width: the time, the words as they are heard, Cancel and Send it. `npx shadcn@latest add http://localhost:8080/r/meridian-glass/voice-capture.json`
- Note recap: A note the assistant wrote from a voice note: a one line summary and a card of to-dos with Share note. `npx shadcn@latest add http://localhost:8080/r/meridian-glass/note-recap.json`
- Booking approval: The assistant asks before it pays a deposit, at phone width: the ask, why it checks and the booking card with Book table. `npx shadcn@latest add http://localhost:8080/r/meridian-glass/booking-approval.json`
- Assistant limits: A list of what a personal assistant may do on its own, one rule per kind of action with its level. `npx shadcn@latest add http://localhost:8080/r/meridian-glass/assistant-limits.json`
- Conversation insights: A question asked of a week of support conversations: the answer in a line, the week as a number and a line, and the three topics behind it. `npx shadcn@latest add http://localhost:8080/r/meridian-glass/conversation-insights.json`
- Cited answer: A question asked of the workspace: a short answer with numbered citations and the sources they point to. `npx shadcn@latest add http://localhost:8080/r/meridian-glass/cited-answer.json`
- Agent plan: An agent builds another agent: the ask, its changes with their status, and Publish agent as the confirm. `npx shadcn@latest add http://localhost:8080/r/meridian-glass/agent-plan.json`
- Agent procedure: The steps an agent follows, in plain sentences with its tools, documents and teams as mention chips, and Test and Publish. `npx shadcn@latest add http://localhost:8080/r/meridian-glass/agent-procedure.json`
- Simulations: Simulated customers run against an agent: the pass count, the last 30 runs as a status strip and each scenario with its status, failures first. `npx shadcn@latest add http://localhost:8080/r/meridian-glass/simulations.json`
- Experiment: Two prompts split live traffic: each arm's resolution rate, both by day, and Ship as the confirm. `npx shadcn@latest add http://localhost:8080/r/meridian-glass/experiment.json`

## Optional
- [Human docs](http://localhost:8080/systems/meridian-glass): visual reference
