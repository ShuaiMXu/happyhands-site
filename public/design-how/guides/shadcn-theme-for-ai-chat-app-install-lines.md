# A shadcn theme for an AI chat app, with the install lines

> Three shadcn themes for an AI chat app compared, Quartz, Glaze and Lime, by the tool calls and streaming parts each ships, with the install line for each.

By design.how, 2026-10-21, updated 2026-10-23. HTML: https://design.how/guides/shadcn-theme-for-ai-chat-app-install-lines

For an AI chat app whose agent calls tools, install Quartz. The difference that matters is how much of the agent's work the thread shows. Quartz's Tool call carries the call's name, arguments, status, duration and output, with Conversation, Response and Reasoning around it. Glaze ships the same chat set in compact black and white. Lime's Tool call shows one step as a single line.

## Which shadcn theme for an AI chat app ships the streaming parts?

Quartz and Glaze ship the streaming parts, and Lime does not. Both Quartz and Glaze ship Message, Conversation, Response, Reasoning, Tool call, Activity and Prompt input. Lime ships Chat input, Message, Tool call, Follow ups, Approval request, Action receipt and Autonomy rule, with no Conversation, Response or Reasoning component. The table sets the three design systems on the same rows.

|  | Glaze | Quartz | Lime |
|-|-|-|-|
| For | Glassy and compact, for AI products | Cold and calm, for AI agents and developer tools | Warm and light, for consumer apps |
| Theme install | `npx shadcn@latest add https://design.how/r/glaze/theme.json` | `npx shadcn@latest add https://design.how/r/quartz/theme.json` | `npx shadcn@latest add https://design.how/r/lime/theme.json` |
| Components | 66 | 57 | 49 |
| Conversation, Response, Reasoning | Yes | Yes | No |
| Tool call page rules | 8 | 11 | 7 |
| Lint rules | 24 | 35 | 23 |
| Dark mode | `data-theme="dark"` | `data-theme="dark"` or class `dark` | `data-theme="dark"` |

Glaze ships 66 components. [Quartz](/systems/quartz) ships 57 components. Lime ships 49 components. The Tool call row counts the rules on each system's Tool call page, and the lint row counts the rules in each system's shipped ESLint config. None of the three themes follows the system dark mode setting on its own, so the switch in the last row is set by hand.

Each theme installs with one shadcn command from the table. The shadcn CLI's add command [adds components and dependencies to your project](https://ui.shadcn.com/docs/cli), and design.how serves each system from a [shadcn registry](https://ui.shadcn.com/docs/registry), which the shadcn docs describe as a way to distribute components, config, rules and other files to any project. The theme also installs the skill item, which writes the system's skill to `.claude/skills/` and `.agents/skills/`. For Quartz, those files are `.claude/skills/quartz/SKILL.md` and `.agents/skills/quartz/SKILL.md`.

A project with no `components.json` needs one before the theme:

```bash
npx shadcn@latest init -d
npx shadcn@latest add https://design.how/r/quartz/theme.json
```

The CLI docs list `-d` as the flag that uses the default configuration. Once the Quartz theme is in, it prints three steps. Import `@/components/quartz/styles.css` once in the root layout as its own stylesheet, put `className="quartz"` on the element that holds Quartz UI, usually the body, and wrap the app inside that element in `QuartzPortalProvider` from `@/lib/quartz/portal`, so dialogs and menus keep the theme.

A [shadcn preset](/compare/shadcn-presets) restyles shadcn/ui's own components. A design.how system replaces those components with its own and adds blocks, a skill and a lint for one kind of product.

## Quartz shows the agent's work in the thread

Quartz is the design system for AI agents and developer tools, and its chat components put the agent's tool calls in front of the person. [Quartz's Tool call page](/systems/quartz/components/tool-call) has 11 rules (7 must, 2 never, 2 should), each with incorrect and correct code, for one call with its name, arguments, status, duration and output. [The tool call UI guide](/guides/tool-call-ui-rules) takes those rules apart, from a seq on every event to explicit status and a denied call that is not an error.

```sh
npx shadcn@latest add https://design.how/r/quartz/tool-call.json
```

Four more Quartz components hold the rest of a turn:

- [Conversation](/systems/quartz/components/conversation) keeps a streaming thread pinned to the bottom until the person scrolls. Quartz's Conversation page has 9 rules (8 must, 1 never), each with incorrect and correct code.
- [Response](/systems/quartz/components/response) is Markdown that renders as it streams.
- [Reasoning](/systems/quartz/components/reasoning) shows the model's thinking, open while it streams and folded when done.
- Activity says what the agent is doing now, with the first-wait loader.

The agent-session block assembles one turn from these parts. It puts tool calls under one live Activity header, then the answer, a queued follow-up and the composer with Stop. For a chat app, that block is the starting screen, and it is already built from the components above.

Quartz's rules also cover what a waiting thread looks like. [Quartz's anti-slop page](/systems/quartz/foundations/anti-slop) has 26 rules, and `anti-slop-no-shimmer-text` bans sweeping a gradient through in-progress text. It asks for still text and the running status instead, and its incorrect code is a shimmering "Thinking" label.

Rule `anti-slop-no-shimmer-text` (never) from the Quartz docs (https://design.how/systems/quartz/foundations/anti-slop). Never sweep a gradient through in-progress text; keep the text still and show the running status. Because the sweep drops the text under its contrast floor mid-pass and never says when the work stops.

Incorrect:

```tsx
<span className="shimmer">Thinking</span>
```

Correct:

```tsx
<Status status="running"/>
```

The rule is strict, and its reason holds. The sweep drops the text under its contrast floor mid-pass and never says when the work stops. The correct code swaps the label for `<Status status="running"/>`.

The lint catches a meta line of facts as well. Run on its planted fixture, `quartz/no-dot-separator` flagged a line that joins a model name, a region and a time with middle dots. It told the agent that a middle dot between facts is read aloud and wraps mid-fact on a phone, and to give each fact its own element in a flex row with a gap.

Lint run: `quartz/no-dot-separator` on its planted fixture, `registry/quartz/lint/fixtures/bad/no-dot-separator.tsx`.

```tsx
// Planted: quartz/no-dot-separator. Facts joined with middle dots.
export function Meta() {
  return <p className="type-body-sm text-text-2">model-5 · eu-west-1 · 2m ago</p>;
}
```

What the lint printed:

```text
registry/quartz/lint/fixtures/bad/no-dot-separator.tsx
  3:50  error  A middle dot between facts is read aloud and wraps mid-fact on a phone; give each fact its own element in a flex row with a gap.  quartz/no-dot-separator

1 problem
```

## Glaze keeps the chat compact, with glass on the next action

[Glaze](/systems/glaze) is compact black and white for AI products, with glass only on the one action a person presses next. The `glaze/glass-on-pressables` lint rule enforces the docs rule `glaze-glass-on-pressables`, and Glaze's lint flags glass on something a person cannot press.

Glaze ships the same streaming set as Quartz, and it adds chat parts Quartz has no component for. They are Send button, Mention, Follow-ups, Action receipt and Autonomy rule. [Glaze's Send button](/systems/glaze/components/send-button) sends a prompt, or stops the reply, and its page has 6 rules (4 must, 2 never). In a chat screen, Send is the likely holder of that glass.

```sh
npx shadcn@latest add https://design.how/r/glaze/send-button.json
```

The thread itself carries fewer rules than Quartz's. [Glaze's Tool call page](/systems/glaze/components/tool-call) has 8 rules (5 must, 2 never, 1 should), each with incorrect and correct code, and [Glaze's Conversation page](/systems/glaze/components/conversation) has 6 rules. Glaze describes its Tool call as showing one tool an agent called.

Glaze ships 66 components, 11 blocks and 9 foundations, and the blocks lean to assistants and agent builders. Cited answer gives a short answer with numbered citations and the sources they point to. Agent plan shows an agent building another agent, with its changes, their status and Publish agent as the confirm.

## Lime fits an assistant inside a consumer app

[Lime](/systems/lime) is a warm, light system for consumer apps, with one glowing action, and `lime/one-primary` enforces that through the docs rule `lime-one-action`. Lime's examples are about money, such as Send money and a savings goal.

[Lime's Tool call](/systems/lime/components/tool-call) shows one step the assistant took as a single line, such as Moved $50 to Vacation fund, and its page has 7 rules. [Lime's Approval request](/systems/lime/components/approval-request) asks before the assistant moves money, with the amount, one reason, and Approve, Edit or Decline, and its page has 11 rules. Chat input is the box a request to the assistant is written in, with the amount and send.

```sh
npx shadcn@latest add https://design.how/r/lime/chat-input.json
```

Lime ships 49 components, and none of them is a Conversation, a Response or a Reasoning. A chat-first product on Lime would build the streaming thread, the Markdown answer and the model's thinking outside the system. That is the right boundary for Lime, whose assistant lives inside a money app and reports its steps as single lines.

## The close call is Quartz against Glaze

Quartz beats Glaze when a person reads the tool calls, and Glaze beats Quartz when the person reads only the answer. Both ship the streaming set, so the parts list does not settle it. Quartz's Tool call is the one whose docs spell out a call's detail, with name, arguments, status, duration and output. Quartz's Tool call page has 11 rules. Glaze's Tool call page has 8 rules.

The lints differ more. Quartz's lint ships 35 lint rules. Glaze's lint ships 24 lint rules. Quartz's include `quartz/no-glass`, `quartz/no-pill` and `quartz/mono-for-copyable`, which enforce `elevation-no-glass`, `radius-no-pill` and `typography-mono-ids`. The two systems take opposite positions on glass, with Glaze putting it on the next action and Quartz failing the lint on it.

The copy rules overlap. Run on its planted fixture, `quartz/no-emoji-or-em-dash` flagged two errors in one line of copy, an emoji and an em dash. It told the agent to use words, with an Icon where a glyph helps, and to end the sentence or use a comma. Glaze's lint has `glaze/no-emoji-or-em-dash` as well.

Lint run: `quartz/no-emoji-or-em-dash` on its planted fixture, `registry/quartz/lint/fixtures/bad/no-emoji-or-em-dash.tsx`.

```tsx
// Planted: quartz/no-emoji-or-em-dash. An emoji and an em dash in copy.
export function Deployed() {
  return <p className="type-body-sm text-text-2">Deployed 🚀 — api is live in 3 regions.</p>;
}
```

What the lint printed:

```text
registry/quartz/lint/fixtures/bad/no-emoji-or-em-dash.tsx
  3:50  error  Emoji in UI copy; use words, and an Icon from '@/components/quartz/icon' where a glyph helps.  quartz/no-emoji-or-em-dash
  3:50  error  Em dash in UI copy; end the sentence or use a comma.  quartz/no-emoji-or-em-dash

2 problems
```

Glaze wins for an assistant with few visible tool calls, where a Send button carries the glass and the answer is the point. The [comparison of design systems for AI agents](/best-design-system-for-ai-agents) sets all three side by side by components, blocks and install commands, with when to use something else.

## When one screen needs the thread and the run

A chat screen that also shows a run's steps needs a conversation and a trace together, and Quartz ships both as blocks. agent-session holds the turn, with tool calls under one live Activity header, the answer, a queued follow-up and the composer with Stop. run-trace shows one agent run as a waterfall of its steps and model calls, with the live step growing and the open step's details beside it.

Both blocks sit inside the one element with `className="quartz"`, under one `QuartzPortalProvider`. Quartz's theme is scoped, and its styles apply only inside an element with the class quartz. So the thread, the trace and any dialog either one opens use one set of tokens, and `npx eslint -c quartz.eslint.config.mjs .` checks them against one set of rules.

Adding Glaze to that screen for its Send button would bring a second scope, a second stylesheet and a second lint config. A chat app whose agent calls tools belongs on Quartz alone, with agent-session and run-trace in one quartz scope, because the composer with Stop already does the job a second system's Send button would be brought in for.

## Questions

### Which design.how system has a chat input?

Quartz and Glaze ship Prompt input, and Glaze adds a Send button that sends a prompt or stops the reply. Lime ships Chat input, the box a request to the assistant is written in, with the amount and send.

### Do these themes need shadcn/ui installed?

They install with the shadcn CLI, so the project needs a components.json, which npx shadcn@latest init -d writes. The components themselves don't depend on shadcn/ui's.

### Does the theme follow the system dark mode setting?

No. Put data-theme="dark" on the system's element or an ancestor such as html, and Quartz also accepts the class dark.

### How does the coding agent learn the system's rules?

The theme install also installs the skill item, which writes the skill to .claude/skills/ and .agents/skills/. The lint, installed with its own shadcn command, flags what the rules forbid and says what to use instead.

## Sources

- [shadcn - shadcn/ui](https://ui.shadcn.com/docs/cli)
- [Introduction - shadcn/ui](https://ui.shadcn.com/docs/registry)
