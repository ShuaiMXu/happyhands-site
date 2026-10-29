# How to make Claude Code UI look better in five steps

> Make Claude Code UI look better in five steps with Quartz, its skill and a lint whose 35 rules fail on tracked capitals and side rails.

By design.how, 2026-10-25. HTML: https://design.how/guides/how-to-make-claude-code-ui-look-better-in-five-steps

To make Claude Code UI look better, give the project a design system with a skill Claude loads on its own, and a lint that fails the code it writes. Without one, a coding agent falls back on tracked capitals, status dots and side rails. Five steps set that up with Quartz. Init shadcn, install the Quartz theme with its skill, wire the root layout, add Quartz lint, then run the lint and fix what it reports.

## Start from an app with components.json

You need a Next.js app, Claude Code and a `components.json` at the project root, because the design.how systems install through the shadcn CLI. If the project has no `components.json`, this command writes one:

```bash
npx shadcn@latest init -d
```

That file is the only shadcn requirement. [The comparison of design systems for AI agents](/best-design-system-for-ai-agents) states that the components themselves don't depend on shadcn/ui's, so the Quartz components do not need shadcn/ui's own components in the project.

The steps below use [Quartz](/systems/quartz), the design.how system for AI agents and developer tools, with runs, approvals, keys and releases as its subject. Quartz ships 57 components, 7 blocks and 10 foundations, 83 registry items in all. If the app runs agents or shows their output, Quartz is the right pick.

## Run the five steps in order

Each step is one action, and this list is the whole setup:

1. If `components.json` is missing, run `npx shadcn@latest init -d`.
2. Install the Quartz theme with `npx shadcn@latest add https://design.how/r/quartz/theme.json`. It adds the tokens, the scoped base styles, the Tailwind v4 theme mapping and the Quartz skill.
3. In the root layout, import `@/components/quartz/styles.css`, put `className="quartz"` on `body` and wrap the app in `QuartzPortalProvider`.
4. Install Quartz lint with `npx shadcn@latest add https://design.how/r/quartz/lint.json`.
5. Run `npx eslint -c quartz.eslint.config.mjs .` and fix each error it prints.

Step 2 does most of the work:

```sh
npx shadcn@latest add https://design.how/r/quartz/theme.json
```

The theme install also installs the skill item, which writes the Quartz skill to `.claude/skills/quartz/SKILL.md` and `.agents/skills/quartz/SKILL.md`. That skill teaches your coding agent Quartz's rules and components.

The [Claude Code docs on skills](https://code.claude.com/docs/en/skills) say Claude uses skills when relevant, or you can invoke one directly with /skill-name. So the Quartz rules sit in the project as a file that Claude loads when it is relevant. [How to give Claude Code a design system](/claude-code-design-system) goes through the exact commands and what the agent does differently afterwards, for Cursor and Codex as well.

## Wire the theme into the root layout

The theme prints a note after it installs, and its first line decides the layout. Quartz is scoped, so its styles apply only inside an element with the class quartz. Three edits follow from that.

Import `@/components/quartz/styles.css` once, in the root layout, as its own stylesheet. The note rules out an `@import` in `globals.css`.

Put `className="quartz"` on the element that holds Quartz UI, usually `body`. Quartz's classes then work on the elements inside it, in your own code too. They do not apply to that element itself.

Wrap the app inside that element in `QuartzPortalProvider` from `@/lib/quartz/portal`, so dialogs and menus keep the theme. The whole file is short:

```tsx
import '@/components/quartz/styles.css';
import type {ReactNode} from 'react';
import {QuartzPortalProvider} from '@/lib/quartz/portal';

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en">
      <body className="quartz">
        <QuartzPortalProvider>{children}</QuartzPortalProvider>
      </body>
    </html>
  );
}
```

Dark mode is an attribute you set. Put `data-theme="dark"` or the class `dark` on the quartz element or any ancestor, such as `html`. The theme does not follow the system setting (`prefers-color-scheme`) on its own, so wiring that setting is the app's job.

## Add the lint that fails on slop

Quartz lint is one install and one run:

```bash
npx shadcn@latest add https://design.how/r/quartz/lint.json
npx eslint -c quartz.eslint.config.mjs .
```

The install adds `quartz.eslint.config.mjs` at the project root, and the second command runs it over the project. Quartz lint flags what Quartz's rules forbid in your app, such as a raw color, a hue filling a region or a status dot, and says what to use instead.

Quartz lint has 35 rules, and each one names the docs rule it enforces. `quartz/no-caps` enforces anti-slop-no-caps. `quartz/no-raw-color` enforces quartz-tokens-only.

If you keep one step from this list, keep this one. The skill tells the agent what the rules are. The lint reads the files and reports when the code breaks a rule, so it does not depend on what the agent took in during a session.

## How do you make Claude Code UI look better and prove it?

Run the lint and read what it prints. A clean run is the proof, and each error is the next edit. On the planted fixture for `quartz/no-gradient`, a hero section with a gradient behind its heading, Quartz lint printed 3 problems, one for each gradient class.

Lint run: `quartz/no-gradient` on its planted fixture, `registry/quartz/lint/fixtures/bad/no-gradient.tsx`.

```tsx
// Planted: quartz/no-gradient. A decorative gradient behind content.
export function Hero() {
  return <section className="flex flex-col gap-2 bg-linear-to-br from-accent-wash to-surface p-6"><h1 className="type-display">Ship agents</h1></section>;
}
```

What the lint printed:

```text
registry/quartz/lint/fixtures/bad/no-gradient.tsx
  3:50  error  "bg-linear-to-br" draws a gradient; use a flat role such as bg-page.  quartz/no-gradient
  3:66  error  "from-accent-wash" draws a gradient; use a flat role such as bg-page.  quartz/no-gradient
  3:83  error  "to-surface" draws a gradient; use a flat role such as bg-page.  quartz/no-gradient

3 problems
```

Each message names the fix along with the fault: use a flat role such as `bg-page`. The rule it enforces is `quartz-no-decoration`, so the gradient goes and the section keeps its heading on a plain surface.

The lint prints its errors as plain text. The agent that ran the command gets the instruction for its next edit in the same output that reported the failure. Ask Claude Code to run `npx eslint -c quartz.eslint.config.mjs .` after each screen and to fix what it prints.

## Reflexes Claude Code keeps after the install

A finished theme does not stop every reflex, because the agent still writes the classes and the markup. [Quartz's anti-slop page](/systems/quartz/foundations/anti-slop) has 26 rules (1 must, 25 never), and [AI slop UI](/ai-slop-ui) lists the tells with the rules that ban them. Three of Quartz lint's planted fixtures show markup that a theme cannot prevent.

Lint run: `quartz/no-side-rail` on its planted fixture, `registry/quartz/lint/fixtures/bad/no-side-rail.tsx`.

```tsx
// Planted: quartz/no-side-rail. A selected row marked with a colored bar on its start edge.
export function Selected() {
  return <div className="border-s-4 border-accent-line bg-page p-3 type-body-sm text-text-1">api@v312</div>;
}
```

What the lint printed:

```text
registry/quartz/lint/fixtures/bad/no-side-rail.tsx
  3:26  error  "border-s-4" with a border color draws a bar on one edge; mark a chosen row with bg-accent-wash, and keep borders 1px all round.  quartz/no-side-rail

1 problem
```

The side rail fixture marks a selected row with `border-s-4` and a border color. Quartz lint printed 1 problem and named the replacement. Mark a chosen row with `bg-accent-wash`, and keep borders 1px all round.

The dot separator fixture joins facts with middle dots. Quartz lint printed 1 problem and gave the reason. A middle dot between facts is read aloud and wraps mid-fact on a phone, so each fact goes in its own element in a flex row with a gap.

The scroll reveal fixture puts `whileInView` on a section. Quartz lint flagged that prop and said to render the content in place and keep motion for answers to what the person did.

None of the three fixtures uses a raw color, so a theme's tokens have nothing to fix in them. The lint catches all three.

## The next rule you will break is in the copy

Once the layout passes, the words are what is left, and `quartz/no-emoji-or-em-dash` checks the text inside the JSX.

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

The planted fixture puts an emoji and an em dash in one line of deploy copy. Quartz lint printed 2 problems. The first says to use words, and an Icon from `@/components/quartz/icon` where a glyph helps. The second says to end the sentence or use a comma.

The docs rule it enforces, anti-slop-no-em-dash, covers empty values as well as pauses. Its incorrect code renders `<dd>{run.owner ?? '\u2014'}</dd>` for a missing owner, and its correct code renders `<dd>{run.owner ?? 'None'}</dd>`. The rule's reason is that an empty cell with a dash reads as a minus or a value still loading, and a screen reader may skip it.

This is the rule that matters once everything else passes. A theme restyles classes, the agent writes fresh copy on every screen, and no install can rewrite a sentence, so the lint that reads the words is the step that checks the last part of the screen.

## Questions

### Does this setup work with Cursor or Codex too?

Yes. The Quartz theme writes the skill to .claude/skills/quartz/SKILL.md for Claude Code and to .agents/skills/quartz/SKILL.md, which Codex and Cursor read. The components and the lint are plain React, Tailwind CSS v4 and ESLint.

### Can I use Glaze or Lime instead of Quartz?

Yes. Each installs with its own theme command, such as npx shadcn@latest add https://design.how/r/glaze/theme.json, and ships its own lint with its own config file, such as glaze.eslint.config.mjs.

### Why does dark mode not switch with my system setting?

The Quartz theme does not follow prefers-color-scheme on its own. Put data-theme="dark" or the class dark on the quartz element or an ancestor such as html.

### Do I need shadcn/ui installed?

The project needs a components.json because the systems install with the shadcn CLI, and npx shadcn@latest init -d writes one. The Quartz components do not depend on shadcn/ui's own components.

## Sources

- [Extend Claude with skills - Claude Code Docs](https://code.claude.com/docs/en/skills)
