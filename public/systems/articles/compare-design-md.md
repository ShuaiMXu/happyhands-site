# design.how vs DESIGN.md files

A DESIGN.md file describes a design as YAML tokens plus Markdown prose, in the format Google Stitch opened in April 2026. A design.how system brings that kind of description and the parts it describes: components to import, a skill the agent loads on its own, and a lint that fails on the code. A DESIGN.md tells an agent what the design should be; a design system gives it the parts and checks the result.

Updated 19 October 2026. By Arlan Marat (https://design.how/about).

## Side by side

|  | DESIGN.md | design.how system |
|-|-|-|
| Format | Markdown prose and YAML tokens. The sections are Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, and Do's and Don'ts | `tokens.css`, React components, a SKILL.md, and a Markdown agent view of every docs page |
| Components | Describes how components are styled. The spec calls this section actively evolving | Installs 49 to 66 components per system as source you import |
| How the agent finds it | You point to it, for example with `@DESIGN.md` in CLAUDE.md. The Claude Code, Codex and Cursor docs don't list it among the files they load | The theme writes the skill to `.claude/skills/` and `.agents/skills/`, which the agents load on their own |
| What gets checked | `npx @google/design.md lint` checks the file, including WCAG contrast | The lint checks your app's code, such as `npx eslint -c quartz.eslint.config.mjs .` |
| Ready-made ones | awesome-design-md has 84 files, added with `npx getdesign add <slug>`. Its README calls them inspiration files, not official design systems | 4: Sodium, Glaze, Quartz, Lime |
| License | The spec is Apache-2.0; awesome-design-md is MIT | MIT |

## The gap a DESIGN.md leaves

Text is context, not enforcement. Claude Code's own docs say it treats memory files "as context, not enforced configuration", and a DESIGN.md read through CLAUDE.md is the same. One reported failure is specific: the agent reads the tokens, then builds its own button from them instead of using the one in the component library. A Design Systems Collective post describes it under the title "I Gave My Agent CLAUDE.md and DESIGN.md. It Ignored My Entire Component Library."

A design.how system closes that gap in two places. Its skill tells the agent to use a component before writing custom markup, as rule `quartz-components-first`, and its lint fails when the agent restyles one:

```text
"h-14" restyles the height of <Button>; use its variant and size props, and keep className for placement such as w-full, flex-1, self-start or mt-4.
```

## Using both

- Keep a DESIGN.md as the brief for your brand: what it should feel like and why. It is easy to read and diff.
- If you have a brand DESIGN.md and no system yet, [build-design-system](https://design.how/skills/build-design-system) can take it as the design source you choose and turn it into tokens, components and checks.
- shadcn's official skill added a DESIGN.md workflow in October 2026 that maps a DESIGN.md's tokens onto a shadcn/ui theme, if you build on shadcn/ui directly.

## Sources

- [google-labs-code/design.md: the spec (docs/spec.md, Apache-2.0)](https://github.com/google-labs-code/design.md)
- [Google blog: Stitch's DESIGN.md format is now open source (21 April 2026)](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/)
- [VoltAgent/awesome-design-md (MIT)](https://github.com/VoltAgent/awesome-design-md)
- [Claude Code docs: How Claude remembers your project](https://code.claude.com/docs/en/memory)
- [Codex docs: AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Cursor docs: Rules](https://cursor.com/docs/context/rules)
- [Design Systems Collective: I Gave My Agent CLAUDE.md and DESIGN.md. It Ignored My Entire Component Library.](https://www.designsystemscollective.com/i-gave-my-agent-claude-md-and-design-md-it-ignored-my-entire-component-library-c6d7e9be34d4)
- [shadcn/ui skill: the DESIGN.md workflow (design-system.md)](https://github.com/shadcn-ui/ui/tree/main/skills/shadcn)

## Related

- [What is a design system for agents?](https://design.how/design-systems-for-agents.md)
- [design.how vs shadcn presets](https://design.how/compare/shadcn-presets.md)
- [How to give Claude Code a design system](https://design.how/claude-code-design-system.md)
