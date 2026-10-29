# The best design system for AI agents

For data infrastructure, use Sodium; for compact AI products, use Glaze; for AI agents and developer tools, use Quartz; for consumer apps, use Lime. All four are free, install with the shadcn CLI, and bring a skill and a lint that keep Claude Code, Cursor or Codex on their rules.

Updated 19 October 2026. By Arlan Marat (https://design.how/about).

"Best" here means the system an agent can follow with the fewest wrong guesses. That takes components to import rather than describe, rules written for an agent, and a check that fails. Each of the four ships all of that. They differ in who the product is for.

## Compared

| System | For | Components | Blocks |
|-|-|-|-|
| [Sodium](https://design.how/systems/sodium) | Infrastructure and data tools: pipelines, runs, warehouses, on-call | 54 | 7 |
| [Glaze](https://design.how/systems/glaze) | Compact AI products, such as assistants and voice notes | 66 | 11 |
| [Quartz](https://design.how/systems/quartz) | AI agents and developer tools: runs, approvals, keys, releases | 57 | 7 |
| [Lime](https://design.how/systems/lime) | Consumer apps, such as a money app on a phone | 49 | 5 |

Counts are from each system's registry on 2026-10-19. A block is a whole screen built only from the system's components, installed as code you edit.

## Install

Each one is one command from a React project with shadcn set up. It adds the tokens, the styles and the skill.

Sodium:

```sh
npx shadcn@latest add https://design.how/r/sodium/theme.json
```

Glaze:

```sh
npx shadcn@latest add https://design.how/r/glaze/theme.json
```

Quartz:

```sh
npx shadcn@latest add https://design.how/r/quartz/theme.json
```

Lime:

```sh
npx shadcn@latest add https://design.how/r/lime/theme.json
```

## How to choose

- Pick [Sodium](https://design.how/systems/sodium) when the screens watch systems run: pipelines and backfills, job runs, schedules, alerts and on-call. Its blocks are Job runs, Failed load, On call, Run progress, Warehouse capacity, Sync flow, Pipeline history. It is sharp and monospaced, with 1px rules, no shadows and one yellow action per view.
- Pick [Glaze](https://design.how/systems/glaze) for a compact AI product, such as an assistant that takes voice notes or books on someone's behalf. Its blocks are Today, Voice capture, Note recap, Booking approval, Assistant limits, Conversation insights, Cited answer, Agent plan, Agent procedure, Simulations, Experiment. It is black and white, with glass only on the one action you press next.
- Pick [Quartz](https://design.how/systems/quartz) when the screens show work an agent did or is doing: runs, tool calls, approvals, API keys, deploys. Its blocks are Workspace home, Agent session, Tool approval, API keys, Prompt release, Run trace, Live activity. It is black and white, with a hue only for the kind of thing and warm colors only for trouble.
- Pick [Lime](https://design.how/systems/lime) for a consumer app, such as one where people manage their own money. Its blocks are Home screen, Assistant approval, Assistant alert, Settings rules, Split request. It is warm and light, with one glowing action per screen.

## What every one of them brings

- A skill. The theme writes it to `.claude/skills/<system>/SKILL.md` for Claude Code and `.agents/skills/<system>/SKILL.md` for Codex and Cursor, and the agent loads it whenever it builds UI.
- A lint. `npx eslint -c <system>.eslint.config.mjs .` fails on a raw color, a restyled component or a banned pattern, and each message names the fix.
- An agent view of every docs page: add `.md` to the URL.
- AI components: Glaze has Prompt input, Send button, Mention, Message, Conversation, Response, Reasoning, Tool call, Activity, Follow-ups, Action receipt, Autonomy rule.
- AI components: Quartz has Message, Conversation, Response, Reasoning, Tool call, Activity, Prompt input.
- AI components: Lime has Chat input, Message, Tool call, Follow ups, Approval request, Action receipt, Autonomy rule, Receipt match, Insight.

## When to use something else

There are good reasons not to install one of these.

- Your team already has a design system. Give your agent that one instead. The [build-design-system](https://design.how/skills/build-design-system) skill turns the UI an app ships into tokens, components and checks, and [migrate-design-system](https://design.how/skills/migrate-design-system) moves the screens onto it.
- You want stock shadcn/ui with your own colors, fonts and radius. A shadcn preset does exactly that, and the official shadcn skill and `@shadcn/lint` keep an agent on it. See [design.how vs shadcn presets](https://design.how/compare/shadcn-presets).
- You want a one-off page to look less generic and have no system to follow. The frontend-design skill from the anthropics/skills repository gives the agent a design brief to work from. See [design.how vs the frontend-design skill](https://design.how/compare/frontend-design-skill).
- Your app is not React. The components are React with Tailwind CSS v4 and Base UI, so a Vue or Svelte app can use the tokens and rules but not the components.

## Questions

### What is the best design system for Claude Code?

The one that matches the product: Sodium for data infrastructure, Glaze for compact AI products, Quartz for AI agents and developer tools, Lime for consumer apps. Claude Code loads each system's skill from `.claude/skills/`, and [the setup takes four commands](https://design.how/claude-code-design-system).

### Are they free?

Yes. All four are MIT licensed and install from a public shadcn registry with no account.

### Do they need shadcn?

They install with the shadcn CLI, so the project needs a `components.json`. `npx shadcn@latest init -d` writes one. The components themselves don't depend on shadcn/ui's.

## Related

- [What is a design system for agents?](https://design.how/design-systems-for-agents.md)
- [How to give Claude Code a design system](https://design.how/claude-code-design-system.md)
- [design.how vs shadcn presets](https://design.how/compare/shadcn-presets.md)
- [design.how vs the frontend-design skill](https://design.how/compare/frontend-design-skill.md)
