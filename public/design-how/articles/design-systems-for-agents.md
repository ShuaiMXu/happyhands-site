# What is a design system for agents?

A design system for agents is a set of tokens, components and rules that a coding agent such as Claude Code, Cursor or Codex can install into a project, read as text and be checked against, so every screen it builds uses the same parts instead of a fresh guess.

Updated 19 October 2026. By Arlan Marat (https://design.how/about).

People read a design system and use judgement. An agent reads whatever is in its context, follows the instructions it was given, and keeps going until something fails. So a design system written for an agent needs three things a human one can skip: rules written as checkable instructions, a text version of every page, and a check that fails when a screen breaks a rule.

## What it contains

| Part | What it is | In a design.how system |
|-|-|-|
| Tokens | Named values for color, type, space, radius and motion | `tokens.css`, installed by the theme |
| Components | Built parts with their states, focus and keyboard behaviour | 49 to 66 per system, each added by name with the shadcn CLI |
| Blocks | Whole screens built only from those components | Such as Workspace home, Agent session, Tool approval in Quartz |
| Rules | One instruction each, with an id and a level: must, should or never | In every docs page, such as `quartz-components-first` |
| Skill | A SKILL.md the agent loads whenever it builds UI | `.claude/skills/quartz/SKILL.md` and `.agents/skills/quartz/SKILL.md` |
| Lint | ESLint rules that fail on a raw color or a restyled component | `npx eslint -c quartz.eslint.config.mjs .` |
| Agent view | Every docs page as Markdown | Add `.md` to any docs URL |

## How it differs from a design system for people

A design system for people is mostly pictures and prose: a design library, a docs site, examples to copy. An agent can't look at a design file while it writes code, and it reads a long page about tone the same way it reads a footnote. So the agent version puts the same decisions where an agent acts on them.

- Rules carry an id, a level and a wrong and right snippet, so the agent can match its own code against them and a reviewer can cite one by name.
- Docs pages have a Markdown version an agent fetches, with the props, states and rules and none of the page chrome.
- The components install as source into the project, so the agent imports them instead of rebuilding a button from `div`s.
- A lint turns the rules into errors. The agent runs it, reads the message, which names the fix, and corrects its own code.

## A rule, as the agent reads it

This is one of the global rules in the Quartz skill, word for word. The same text is on the Quartz [agent view](https://design.how/systems/quartz.md).

```md
1. quartz-components-first MUST Use a component from this system before writing custom markup. Because hand-built markup skips the component's focus ring, keyboard handling and states, which people notice one at a time.
   - Correct: `<Button onClick={open}>Open run</Button>`
   - Wrong: `<div onClick={open} className="cursor-pointer">Open run</div>`
```

## Why an agent needs one

Agents copy whatever is in the repo. If the repo has three buttons, forty greys and a token file half the code ignores, every new screen picks a different one. With nothing in the repo at all, the model falls back on its own defaults, which is why so many generated screens share the same gradients, pills and tracked capitals. Those defaults have a name, [AI slop](https://design.how/ai-slop-ui), and a design system for agents bans them in its rules and its lint.

## How to add one

One command adds the tokens, the styles and the skill. For Quartz:

```sh
npx shadcn@latest add https://design.how/r/quartz/theme.json
```

The step by step for each agent is in [How to give Claude Code a design system](https://design.how/claude-code-design-system), and which system fits which product is in [The best design system for AI agents](https://design.how/best-design-system-for-ai-agents).

## Questions

### Is a DESIGN.md file a design system for agents?

It is part of one. A DESIGN.md file describes tokens and intent in text, which an agent can read, but it brings no components to import and no check that fails. [design.how vs DESIGN.md files](https://design.how/compare/design-md) goes through the difference.

### Does it work with Cursor and Codex, or only Claude Code?

The theme writes the skill twice: to `.claude/skills/` for Claude Code and to `.agents/skills/`, which Codex and Cursor read. The components and the lint are plain React, Tailwind CSS v4 and ESLint, so they work with any agent.

### Do I need one if my team already has a design system?

You need yours in a form an agent can follow. The [build-design-system](https://design.how/skills/build-design-system) skill turns the UI an app already ships into tokens, components, docs and checks, and [migrate-design-system](https://design.how/skills/migrate-design-system) moves screens onto it.

### Are the design.how systems free?

Yes. Sodium, Glaze, Quartz, Lime are free and MIT licensed, and install from a shadcn registry with no account.

## Related

- [The best design system for AI agents](https://design.how/best-design-system-for-ai-agents.md)
- [How to give Claude Code a design system](https://design.how/claude-code-design-system.md)
- [AI slop UI](https://design.how/ai-slop-ui.md)
- [design.how vs DESIGN.md files](https://design.how/compare/design-md.md)
