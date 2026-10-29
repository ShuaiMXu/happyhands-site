# How to give Claude Code a design system

Install a design system that ships its own skill. One shadcn command adds the tokens, the styles and a SKILL.md to your project, and Claude Code loads that skill whenever it builds UI, so it uses the system's components and rules instead of its own defaults.

Updated 19 October 2026. By Arlan Marat (https://design.how/about).

The steps below use [Quartz](https://design.how/systems/quartz). For [Sodium](https://design.how/systems/sodium) or [Glaze](https://design.how/systems/glaze) or [Lime](https://design.how/systems/lime), swap `quartz` for its name in every command. Run them in a React project from its root.

## Claude Code

1. If the project has no `components.json`, set up shadcn first: `npx shadcn@latest init -d`.
2. Add the theme, which brings the tokens, the styles and the skill: `npx shadcn@latest add https://design.how/r/quartz/theme.json`.
3. Do what the command prints: import `@/components/quartz/styles.css` once in the root layout, and put the `quartz` class on `<body>` with `QuartzPortalProvider` inside it, so dialogs and menus keep the theme.
4. Add components by name as you need them: `npx shadcn@latest add https://design.how/r/quartz/button.json`. The full list is at `https://design.how/r/quartz/registry.json`.
5. Add the lint and run it: `npx shadcn@latest add https://design.how/r/quartz/lint.json`, then `npx eslint -c quartz.eslint.config.mjs .`.
6. Ask for a screen. Claude Code finds the skill at `.claude/skills/quartz/SKILL.md` and loads it because its description matches UI work. You can also call it by name with `/quartz`.

```sh
npx shadcn@latest add https://design.how/r/quartz/theme.json
```

## What Claude Code does differently afterwards

These are the steps the Quartz skill gives it, in order. Without a skill, none of them happen unless you ask each time.

- It starts a whole screen from a block when one fits, such as Tool approval or API keys, then swaps in the real data and copy.
- It fetches each component's docs page before using it, for the props, variants and that component's rules.
- It builds only from the system's components and tokens, and never invents a token. When a part is missing it composes one from existing components and says what it built.
- It asks when a screen needs a credential, an endpoint or an approval policy it was not given, instead of making one up.
- Before it finishes, it runs the lint and fixes every error, renders the screen at 390 and 1280 wide, and checks it against the anti-slop list.

The lint is what makes this hold. Its messages name the fix, so the agent can correct itself. When Claude Code restyles a button, it reads this, word for word:

```text
"h-14" restyles the height of <Button>; use its variant and size props, and keep className for placement such as w-full, flex-1, self-start or mt-4.
```

## Cursor

The same theme command writes a second copy of the skill to `.agents/skills/quartz/SKILL.md`. Cursor loads project skills from `.agents/skills/` and `.cursor/skills/`, and for compatibility from `.claude/skills/` too, so there is nothing extra to set up.

1. Run steps 1 to 5 above in the project Cursor has open.
2. In Agent chat, ask for the screen. The agent sees the skill's description and loads it when the task is UI work.
3. To call it by hand, type `/` in Agent chat and pick `quartz`.

## Codex

Codex reads skills from `.agents/skills` in the folder you start it in and every parent up to the repository root, which is where the theme writes the second copy.

1. Run steps 1 to 5 above.
2. Start Codex at the project root and ask for the screen. Codex picks a skill when the task matches its description, and loads the full SKILL.md only then.
3. To call it by hand, type `$quartz` in your prompt, or run `/skills` to see what it found.

## Only the rules, without the code

To give an agent the rules in a project that keeps its own components, add the skill alone: `npx shadcn@latest add https://design.how/r/quartz/skill.json`. The agent then follows the rules but has no Quartz components to import, so the lint and the components are what you give up.

For work on a design system of your own, such as reviewing a screen or mapping hardcoded values to tokens, see the [skills](https://design.how/skills/design-system-boss).

## Sources

- [Claude Code docs: Extend Claude with skills](https://code.claude.com/docs/en/skills)
- [Cursor docs: Agent Skills](https://cursor.com/docs/skills)
- [Codex docs: Build skills](https://learn.chatgpt.com/docs/build-skills)

## Related

- [What is a design system for agents?](https://design.how/design-systems-for-agents.md)
- [The best design system for AI agents](https://design.how/best-design-system-for-ai-agents.md)
- [AI slop UI](https://design.how/ai-slop-ui.md)
- [ui-review](https://design.how/skills/ui-review.md)
