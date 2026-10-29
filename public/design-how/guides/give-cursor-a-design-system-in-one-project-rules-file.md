# Give Cursor a design system in one project rules file

> Give Cursor a design system with one .cursor/rules/quartz.mdc file that points it at the Quartz skill, then let Quartz lint's 35 rules catch the rest.

By design.how, 2026-10-20, updated 2026-10-23. HTML: https://design.how/guides/give-cursor-a-design-system-in-one-project-rules-file

At the end of this setup, a Next.js app has Quartz installed, a `.cursor/rules/quartz.mdc` file that names the Quartz skill and agent index and that Cursor auto-attaches when a `.tsx` file under `app/` or `components/` is in context, and Quartz lint flagging what Quartz's rules forbid. It takes four steps: the theme, the rule file, the lint and one lint run.

## Start from a Next.js app with components.json

Quartz installs through the shadcn CLI, so the project needs a `components.json` before step 1. A project without one runs this first:

```bash
npx shadcn@latest init -d
```

Then open the project in Cursor. The rule file from step 2 lives in the repo under `.cursor/rules`, and the [Cursor rules docs](https://cursor.com/docs/context/rules) describe project rules there as version-controlled and scoped to the codebase. The same page says to check rules into git so the whole team benefits, so commit the file once it works.

## Install Quartz and its skill

Step 1 is the Quartz theme command. It installs Quartz's tokens, scoped base styles and the Tailwind v4 theme mapping, and it also installs the skill item.

```bash
npx shadcn@latest add https://design.how/r/quartz/theme.json
```

The skill item writes the Quartz skill twice, to `.claude/skills/quartz/SKILL.md` and to `.agents/skills/quartz/SKILL.md`. The [design system for agents](/design-systems-for-agents) page says the `.claude/skills/` copy is for Claude Code and the `.agents/skills/` copy is the one Codex and Cursor read. The rule in step 2 names the `.agents/skills/` path.

After it installs, the theme prints three steps. Do all three before asking Cursor for a screen:

1. Import `@/components/quartz/styles.css` once in the root layout, as its own stylesheet, and leave it out of `globals.css` as an `@import`.
2. Put `className="quartz"` on the element that holds Quartz UI, usually the body element.
3. Wrap the app inside that element in `QuartzPortalProvider` from `@/lib/quartz/portal`, so dialogs and menus keep the theme.

Quartz is scoped. Its styles apply only inside the element with the `quartz` class, and its classes work on the elements inside that element. Dark mode needs `data-theme="dark"` or the class `dark` on the `quartz` element or an ancestor such as `html`, and the theme does not follow `prefers-color-scheme` on its own.

[Quartz](/systems/quartz) ships 57 components, 7 blocks and 10 foundations for AI agents and developer tools. The skill is the support file that teaches a coding agent Quartz's rules and components, which is why the rule file in step 2 names it. The [comparison of design.how's three systems](/best-design-system-for-ai-agents) sets Quartz beside Glaze, for compact AI products, and Lime, for consumer apps.

## Point Cursor at the design system with a project rule

Step 2 is one file, `.cursor/rules/quartz.mdc`, whose body names the Quartz skill, the agent index and the lint command, and leaves Quartz's rules where Quartz keeps them. Create it with this content:

```markdown
---
globs: app/**/*.tsx, components/**/*.tsx
alwaysApply: false
---
- This app uses the Quartz design system. Build UI from the components in @/components/quartz before writing your own markup.
- Read @.agents/skills/quartz/SKILL.md before you add or change a screen.
- For one component's rules, read the Quartz agent index at design.how/systems/quartz/llms.txt.
- After editing UI, run npx eslint -c quartz.eslint.config.mjs . and fix every error it prints.
```

The Cursor docs describe two other ways to make the file. Typing `/create-rule` in Agent generates a rule file with frontmatter and saves it to `.cursor/rules`, and Customize in the sidebar has a Rules section with Add Rule. Either way, replace what it writes with the content above.

### The extension and the frontmatter

The file has to end in `.mdc`. The Cursor rules docs say project rules must use the `.mdc` extension, and a plain `.md` file in `.cursor/rules` is ignored by the rules system because it has no frontmatter to set `description`, `globs` and `alwaysApply`.

The frontmatter sets `alwaysApply: false` and puts `globs` on the app's `.tsx` paths. The Cursor docs list that combination as auto-attached when a matching file is in context. A chat about a database migration that touches no matching `.tsx` file never pulls the rule in, which is the right scope for a UI rule. The two globs are separated by a comma, as the docs require for multiple patterns. Change them if the app keeps its components somewhere else, such as `src/**/*.tsx`.

### The body points at files

The body is four short lines with one file mention. The Cursor docs say a file mention tells Agent where to look, Agent reads the file with its tools when it needs the content, and the file's contents are not inlined into the prompt. The same section says to put anything that must always be in context directly in the rule body. So the four lines Agent needs every time sit in the body, and the detail stays in `@.agents/skills/quartz/SKILL.md`.

Copying Quartz's rules into the file would go against two lines of the Cursor docs' advice at once. The docs say to keep rules under 500 lines, and to reference files instead of copying their contents, which keeps rules short and stops them going stale as code changes. Quartz's docs hold 605 rules across 67 pages. The third line of the body names Quartz's agent index, `/systems/quartz/llms.txt`, as the place to look past the skill.

Treat the rule file as a signpost. Its job is to name the skill, the agent index and the lint command, and a line that restates one of Quartz's rules is a copy of something Quartz already ships. The [Claude Code setup guide](/claude-code-design-system) covers the same skill from the Claude Code side, where the agent reads the `.claude/skills/` copy.

## Add the lint that checks the rule

Step 3 installs Quartz lint, which adds `quartz.eslint.config.mjs` at the project root.

```bash
npx shadcn@latest add https://design.how/r/quartz/lint.json
```

The Cursor rules docs list copying entire style guides as something to avoid in rules, and say to use a linter instead. Quartz lint is that linter for this setup. It has 35 rules, and each one is tied to the docs rule it enforces, such as `quartz/no-caps` for `anti-slop-no-caps` and `quartz/no-dot-separator` for `anti-slop-no-dot-separator`.

The rule file tells Cursor what to read. The lint is the part that fails when the code breaks one of its 35 rules. A setup with the rule file and no lint has no check at all.

## Why does Cursor still write capitals and middle dots?

A rule file adds context and checks nothing. The Cursor docs say that when a rule applies, its contents are included at the start of the model context, and nothing in that description fails a file that sets `uppercase tracking-widest` on a status word.

[Quartz's anti-slop page](/systems/quartz/foundations/anti-slop) has 26 rules, 25 of them never rules, and two of them name the habits in this heading. `anti-slop-no-caps` bans setting text in capitals or tracked out and asks for sentence case, because capitals read slower and make every label shout, so a real warning no longer stands out.

Rule `anti-slop-no-caps` (never) from the Quartz docs (https://design.how/systems/quartz/foundations/anti-slop). Never set text in capitals or tracked out; keep sentence case. Because capitals read slower and make every label shout, so a real warning no longer stands out.

Incorrect:

```tsx
<span className="uppercase tracking-widest">Running</span>
```

Correct:

```tsx
<Status status="running"/>
```

`anti-slop-no-dot-separator` bans joining facts with a middle dot and asks for each fact in its own element with a gap. Its reason is that a screen reader reads each dot aloud, and the string wraps mid-fact on a phone. Quartz lint's `quartz/no-dot-separator` caught the planted case in this run:

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

The one error points at line 3, column 50, and its message says to give each fact its own element in a flex row with a gap.

Two setup mistakes stop the rule from attaching at all. Saving it as `quartz.md` puts it in the case the Cursor docs say the rules system ignores. Globs that miss the folders where the app keeps its `.tsx` files mean no matching file is ever in context, so the auto-attach never happens.

The [AI slop UI](/ai-slop-ui) page lists each of these tells with the rule that bans it and the lint error an agent reads.

## Check that Cursor and the lint agree

Step 4 is one lint run over the whole project:

```bash
npx eslint -c quartz.eslint.config.mjs .
```

Quartz lint's run on its planted `no-caps` fixture printed 2 problems, one for `uppercase` and one for `tracking-widest`, both tagged `quartz/no-caps`.

Lint run: `quartz/no-caps` on its planted fixture, `registry/quartz/lint/fixtures/bad/no-caps.tsx`.

```tsx
// Planted: quartz/no-caps. Capitals and letter spacing on a status word.
export function Queued() {
  return <span className="type-label-sm text-text-3 uppercase tracking-widest">Queued</span>;
}
```

What the lint printed:

```text
registry/quartz/lint/fixtures/bad/no-caps.tsx
  3:53  error  "uppercase" sets capitals or spreads letters; keep sentence case.  quartz/no-caps
  3:63  error  "tracking-widest" sets capitals or spreads letters; keep sentence case, and let the type-* role set the tracking.  quartz/no-caps

2 problems
```

The second message carries the fix in words. It tells the reader to keep sentence case and let the type-* role set the tracking. The fourth line of the rule body tells Agent to run this same command after editing UI and fix every error it prints.

Then confirm the rule attaches. The Cursor docs say Customize in the sidebar, under Rules, shows all rules and their status, so look for `quartz.mdc` there.

If the lint passes but screens still drift from Quartz, check the file extension and the globs first, because a rule that never attaches never names the skill. If the lint keeps failing on the same rule id after Agent edits, add that rule id to the rule body as its own line. The Cursor docs give the same advice, to update a rule when Agent makes a mistake and to add rules only when Agent makes the same mistake repeatedly.

Grow the rule file one repeated mistake at a time and no faster, because every line that copies a Quartz rule is a second copy of Quartz's docs that can go stale, and the skill the file points at already teaches those rules.

## Questions

### Can Cursor use AGENTS.md instead of a .mdc rule?

Yes. The Cursor rules docs describe AGENTS.md as agent instructions in markdown format and a simple alternative to `.cursor/rules`. A `.mdc` rule adds frontmatter, so it can attach only when a matching `.tsx` file is in context.

### Should the rule set alwaysApply to true?

The Cursor docs say `alwaysApply: true` includes the rule in every chat session and ignores globs and description. For a UI rule, `alwaysApply: false` with globs on the app's `.tsx` files attaches the rule only when a matching file is in context.

### Does the rule paste the Quartz skill into every prompt?

No. The Cursor docs say a file mention tells Agent where to look, Agent reads the file with its tools when it needs it, and the contents are not inlined into the prompt. Only the rule body reaches Agent as written.

### Does this work with Glaze or Lime instead of Quartz?

Yes. Each theme writes its skill to `.agents/skills/`, such as `.agents/skills/glaze/SKILL.md` or `.agents/skills/lime/SKILL.md`, so swap that path into the rule body. Each system ships its own lint config, run with `npx eslint -c glaze.eslint.config.mjs .` or `npx eslint -c lime.eslint.config.mjs .`.

## Sources

- [Rules | Cursor Docs](https://cursor.com/docs/context/rules)
