# Meridian Clay

> Meridian Clay is a white page, warm-grey surfaces and near-black text with one electric blue on the main action, for consumer apps. Build with these components before writing markup.

kind: system-index
version: 1
last-updated: 2026-10-26
install-base: `npx shadcn@latest add http://localhost:8080/r/meridian-clay/<name>.json`
human: http://localhost:8080/systems/meridian-clay

## How to use this system
1. Read this page. Follow the global rules and the priority order.
2. Before building a component, fetch its page from the list below.
3. Use only the tokens in the foundations' token tables. If a component is missing, build the stand-in under Coverage gaps; if none is listed, compose it from existing components and tokens and say what you built. Never invent a token.

## Priority order
When rules conflict, the earlier item wins.
1. Accessibility and keyboard behavior
2. Tokens by role, never raw values
3. Existing components, never rebuilt
4. Spacing, radius and type scales
5. Polish: glow, motion, detail

## Global rules
1. blue-components-first MUST Use a Meridian Clay component before writing custom markup; fetch its page before you build. Because each one already carries the focus ring, states and touch size a hand-built copy forgets.
   - Correct: `import {Button} from '@/components/meridian-clay/ui/button'`
2. blue-scope MUST Wrap Meridian Clay UI in className="meridian-clay" with MeridianClayPortalProvider inside it, so overlays keep the tokens. Because a menu or dialog renders at the end of the body, outside the scope, and would lose every color.
   - Correct: `<div className="meridian-clay"><MeridianClayPortalProvider>{children}</MeridianClayPortalProvider></div>`
3. blue-tokens-only MUST Use only the token names Meridian Clay defines, such as --fg, --surface and --accent; never a hex value, arbitrary px or dark: variant. Because the dark theme and any retune change the roles, and a raw value stays behind.
   - Correct: `<p className="text-fg">`
   - Wrong: `<p className="text-[#0f0f0d]">`
4. blue-one-action MUST Use one blue primary action per view; every other action is solid, secondary, outline or ghost. Because the glowing blue is how the person finds the next step in a second.
5. blue-blue-scarce NEVER Fill a page, card or section with blue, or put white text on it; text on blue is --on-accent. Because white on blue is unreadable and a blue block drowns the one action.
   - Wrong: `<Card className="bg-accent text-white">Your goals</Card>`
6. blue-glow-scarce NEVER Add glow beyond primary and destructive buttons, the balance chip and one featured card. Because two glowing things compete and neither reads as the action.
   - Wrong: `<Card variant="glow">Recent activity</Card> // beside the upgrade card`
7. blue-money-sign MUST Format every amount with formatAmount or Amount, never by hand: formatAmount text in List and Table rows, the Amount pill for a sum beside a control or one that needs a tone. Because a hand-built string drops the minus, the separators or the tabular figures.
   - Correct: `import {Amount, formatAmount} from '@/components/meridian-clay/ui/amount'`
   - Wrong: `<span>${total}</span>`
8. blue-ask-before-money MUST When the assistant moves money, show an ApprovalRequest first and an ActionReceipt with Undo after; when the person pays, show a review step and then Payment done with Undo. Because money that moves without a check, or with no way back, is the one mistake people do not forgive.
   - Correct: `<ApprovalRequest title="Pay Maya for dinner" amount={-24} reason="Your half of Friday dinner"/>`
9. blue-field-label MUST Wrap every input in Field with a label above it; a placeholder is not a label. Because a placeholder disappears as soon as the person types and is not read as a name.
   - Correct: `<Field name="title"><FieldLabel>Goal name</FieldLabel><Input/></Field>`
10. blue-focus MUST Keep every control keyboard-operable with the 2px olive :focus-visible ring; never outline: none. Because keyboard and switch users lose their place without it.
11. blue-section-heading MUST Name a section with a real heading (an h2 at text-lg font-semibold in --fg) or not at all; never a small text-sm or text-xs label above the content. Because a small grey label above content is skipped by heading navigation and makes every section look the same.
   - Correct: `<h2 className="text-lg font-semibold">Recent activity</h2>`
   - Wrong: `<p className="text-sm font-medium text-fg-3">Recent activity</p>`
12. blue-sentence-case MUST Write sentence case and a verb with its object on actions; no emoji, no em dash, no title case. Because the copy then reads like a person talking, and every screen sounds the same.
   - Correct: `<Button>Send money</Button>`
   - Wrong: `<Button>OK</Button>`

## Page shell
Every screen sits in this frame.
- Root: `<div className="blue min-h-dvh bg-page text-fg">` with `MeridianClayPortalProvider` inside it
- One task, such as send or pay: `<main className="mx-auto w-full max-w-md px-4 pt-4 pb-8 sm:px-6 sm:pt-8">`
- Home, activity, settings: the same `main` at `max-w-2xl`
- A Table on a wide screen: the same `main` at `max-w-5xl`
- Header: `<header className="sticky top-0 z-10 flex h-14 items-center gap-2 bg-page">`: a ghost `size="icon"` Button with `aria-label="Back"`, then the h1; add `border-b border-line` once content scrolls under it
- Page title: `<h1 className="text-xl leading-tight font-semibold tracking-tight sm:text-2xl">`, one per page
- Section: `<section className="flex flex-col gap-3">` led by an h2 at `text-lg font-semibold`; sections sit `gap-8` apart
- Form: Fields in `flex flex-col gap-4` at `max-w-md`; the submit Button last, `size="lg"` and `w-full` on a phone
- Main action of a phone flow: `<div className="sticky bottom-0 bg-page pt-3 pb-4">` holding `<Button size="lg" className="w-full">`; add the safe-area inset under a home bar

## When to ask
Ask the person only when the screen needs an amount, a payee or an autonomy limit you were not given; never invent one. Decide everything else from these rules and say what you chose.

## Reject list
- No blue, no second brand hue, no gradient behind content, no colored shadows.
- No second icon set, no weight 700, no letter-spaced capitals.
- No transition: all, no looping animation except the spinner.

## Coverage gaps
Not in the system yet, and what to build meanwhile.
- Bottom navigation: a `<nav aria-label="Main">` fixed to the bottom on `bg-page` with `border-t border-line`, 3 to 5 links each an Icon at 20 over a `text-xs` label, at least 56px tall; the current one has `aria-current="page"` in `--fg`, the rest `--fg-3`.
- Date picker: an Input with `type="date"` inside a Field.
- Charts beyond a sparkline: the Insight sparkline, or the figures in a List; no chart library.

## Foundations
- [Color](/systems/meridian-clay/foundations/color.md): The colors Meridian Clay uses, and where each one goes.
- [Typography](/systems/meridian-clay/foundations/typography.md): The typeface, sizes and weights Meridian Clay uses for every word and number.
- [Spacing](/systems/meridian-clay/foundations/spacing.md): How much room goes between things, and how tall controls are.
- [Radius](/systems/meridian-clay/foundations/radius.md): How round each corner is, from pill buttons to softer panels.
- [Elevation](/systems/meridian-clay/foundations/elevation.md): How things stack, using grey steps and a soft shadow for what floats.
- [Motion](/systems/meridian-clay/foundations/motion.md): How things move, quickly and only when something changes.
- [Iconography](/systems/meridian-clay/foundations/iconography.md): One set of simple line icons, drawn in the same color as the text.
- [Anti-slop](/systems/meridian-clay/foundations/anti-slop.md): The habits of generated UI to avoid, and what to do instead.

## Components
- Actions: [Button](/systems/meridian-clay/components/button.md), [Copy button](/systems/meridian-clay/components/copy-button.md)
- Inputs: [Input](/systems/meridian-clay/components/input.md), [Textarea](/systems/meridian-clay/components/textarea.md), [Field](/systems/meridian-clay/components/field.md), [Select](/systems/meridian-clay/components/select.md), [Combobox](/systems/meridian-clay/components/combobox.md), [Dropzone](/systems/meridian-clay/components/dropzone.md), [Keypad](/systems/meridian-clay/components/keypad.md)
- Selection: [Checkbox](/systems/meridian-clay/components/checkbox.md), [Radio](/systems/meridian-clay/components/radio.md), [Switch](/systems/meridian-clay/components/switch.md), [Slider](/systems/meridian-clay/components/slider.md), [Segmented](/systems/meridian-clay/components/segmented.md), [Chip](/systems/meridian-clay/components/chip.md)
- Display: [Badge](/systems/meridian-clay/components/badge.md), [Avatar](/systems/meridian-clay/components/avatar.md), [Card](/systems/meridian-clay/components/card.md), [Table](/systems/meridian-clay/components/table.md), [List](/systems/meridian-clay/components/list.md), [Progress](/systems/meridian-clay/components/progress.md), [Amount](/systems/meridian-clay/components/amount.md), [Bill schedule](/systems/meridian-clay/components/bill-schedule.md), [Balance](/systems/meridian-clay/components/balance.md)
- Feedback: [Status](/systems/meridian-clay/components/status.md), [Empty](/systems/meridian-clay/components/empty.md), [Skeleton](/systems/meridian-clay/components/skeleton.md), [Error state](/systems/meridian-clay/components/error-state.md), [Toast](/systems/meridian-clay/components/toast.md)
- Overlays: [Dialog](/systems/meridian-clay/components/dialog.md), [Alert dialog](/systems/meridian-clay/components/alert-dialog.md), [Sheet](/systems/meridian-clay/components/sheet.md), [Popover](/systems/meridian-clay/components/popover.md), [Dropdown menu](/systems/meridian-clay/components/dropdown-menu.md), [Tooltip](/systems/meridian-clay/components/tooltip.md)
- Navigation: [Tabs](/systems/meridian-clay/components/tabs.md), [Toolbar](/systems/meridian-clay/components/toolbar.md)
- Layout: [Accordion](/systems/meridian-clay/components/accordion.md), [Separator](/systems/meridian-clay/components/separator.md), [Scroll area](/systems/meridian-clay/components/scroll-area.md)
- Assistant: [Chat input](/systems/meridian-clay/components/chat-input.md), [Message](/systems/meridian-clay/components/message.md), [Tool call](/systems/meridian-clay/components/tool-call.md), [Follow ups](/systems/meridian-clay/components/follow-ups.md), [Approval request](/systems/meridian-clay/components/approval-request.md), [Action receipt](/systems/meridian-clay/components/action-receipt.md), [Autonomy rule](/systems/meridian-clay/components/autonomy-rule.md), [Receipt match](/systems/meridian-clay/components/receipt-match.md), [Insight](/systems/meridian-clay/components/insight.md)

## Blocks
Whole screens built only from the components above. For a whole screen, start from one.
- Home screen: An app home: a greeting, the balance, three quick actions with Add as the glow, and a savings goal. `npx shadcn@latest add http://localhost:8080/r/meridian-clay/home.json`
- Assistant approval: You ask the assistant to pay a bill and it asks before it pays, with Approve as the glow. `npx shadcn@latest add http://localhost:8080/r/meridian-clay/assistant-approval.json`
- Assistant alert: The assistant flags an unusual charge or an unused subscription, with one row and the answers to it. `npx shadcn@latest add http://localhost:8080/r/meridian-clay/assistant-alert.json`
- Settings rules: Payday rules and the assistant's limits as settings lists, one row per rule. `npx shadcn@latest add http://localhost:8080/r/meridian-clay/settings-rules.json`
- Split request: A bill you paid, split by what each person owes, with one request to send. `npx shadcn@latest add http://localhost:8080/r/meridian-clay/split-request.json`

## Optional
- [Human docs](http://localhost:8080/systems/meridian-clay): visual reference
