# What an agent-ready design system does to your CSS

> An agent-ready design system gives an agent tokens, components and rules to install, read and check against, and its CSS must leave your Tailwind working.

By design.how, 2026-10-25. HTML: https://design.how/guides/what-an-agent-ready-design-system-does-to-your-css

An agent-ready design system is a set of tokens, components and rules that a coding agent can install into a project, read as text and be checked against. Its install also has to leave the app it lands in working. ADR 0009 records how design.how's installed themes do that. The reset moves into `@layer base`, the scan covers the app's folders, and utilities nest under the scope.

## What does an agent-ready design system need?

It needs tokens, components and rules that a coding agent can install, read and be checked against. That is the definition on design.how's [explainer on design systems for agents](/design-systems-for-agents), and Quartz covers each part with something it ships.

- Install: the Quartz theme installs with the shadcn CLI and also installs the skill item, which writes the Quartz skill to `.claude/skills/quartz/SKILL.md` and `.agents/skills/quartz/SKILL.md`.
- Read: the skill teaches the agent Quartz's rules and components, and Quartz publishes an agent index at `/systems/quartz/llms.txt`.
- Check: Quartz lint has 35 rules, each tied to a rule in the docs.

Of the three, the install is the part that touches code the system does not own. The theme's install note says Quartz's classes work on the elements inside the quartz element, in the project's own code too. So the theme's stylesheet has to coexist with the app's own Tailwind in the same files. ADR 0009 is the decision about how it does that, and it is the part to read before trusting any theme in a real app.

## The theme used to scan only its own folders

Before ADR 0009, the installed `styles.css` scanned only the system's own folders, and both its utilities and the reset in base.css were unlayered. That setup produced three bugs, and the record names each one. ADR 0009 records the first:

> So a system class in the project's own code (`bg-warn-tint` in `app/page.tsx`) was never generated

The class was spelled correctly and still had no CSS behind it, because `app/` sat outside the folders the theme scanned.

The second bug ran the other way. The reset, `.lime :where(*) { margin: 0; padding: 0 }`, was unlayered, and the project's Tailwind sits in `@layer utilities`. The reset beat it, so `mx-auto` and `px-4` did nothing.

The third bug was a leak. The system's utilities applied page-wide, so on a page that scopes only one panel, Lime's `.font-semibold { font-weight: var(--weight-semibold) }` reached the app's own headings, where that variable is undefined.

The record's examples come from Lime, and its title speaks of an installed theme in general. Quartz's install note describes the same scoped setup.

## Three parts that each need the others

ADR 0009 fixes the three bugs with three changes and says they only work as a set:

> The fix has three parts, and each one needs the others.

### The reset moves into @layer base

base.css puts the reset in `@layer base`, the layer Tailwind's preflight uses. A project's layered utilities now beat the reset, and the system's unlayered utilities still beat it too.

A few rules stay unlayered on purpose. The record lists the scope element's own rule, the selection colour, the focus ring and the iOS zoom guard. They must win over a page's plain `body`, `a:focus-visible` and `::selection` rules, which design.how's own globals.css has.

The layer is Tailwind's own `base` and no layer named for design.how. The record gives the reason. A new layer declared after the app's `@layer theme, base, components, utilities` would rank above the app's utilities, and the reset would beat `mx-auto` again.

### The scan covers the app

The build rewrites the shipped entry's `@source` lines to the project's `app`, `pages`, `src` and `components` folders, plus the system's lib and hooks folders. The paths are relative to the entry, so they resolve under `src/` in a src layout. Tailwind skips a folder that does not exist.

### Utilities nest under the scope

The build nests `@tailwind utilities` under a `:where()` selector that matches the scope class or a `data-system` attribute carrying the scope's name. For Quartz, the scope class is `quartz`. Specificity stays one class. A class the system generates from the app's code applies only inside the scope, so a partly scoped page keeps its own Tailwind everywhere else.

The record reports a side effect inside the systems themselves. Tailwind's `space-*` and `divide-*` utilities have zero specificity, so the old unlayered reset beat them inside every system. Lime's AvatarGroup did not overlap and its typography page had no row lines. Both now render as their classes say.

### Native @scope lost on its fallback

ADR 0009 rejects native `@scope` because a browser without it drops every utility. The record puts it in one sentence:

> We rejected native `@scope`, which also matches the scope element itself, because a browser without it drops every utility, and Firefox only shipped it in late 2025.

Matching the scope element is exactly what the chosen nesting gives up. The record still rejects `@scope`, and that is the right call for a theme a stranger installs. The fallback in a browser without it is no utilities at all.

On design.how's own site, the source entry is unchanged. `registry/postcss-scope.cjs` (ADR 0003) still scopes the site's compile, so the change lands in the shipped entry a project installs.

## The nesting costs the scope element itself

ADR 0009 is plain about the price:

> The cost is that the nesting matches descendants only.

A system class on the scope element itself does nothing. The record's example is a section with the classes `lime rounded-panel`, where `rounded-panel` has no effect, so the theme's docs say to put the system's classes inside that element.

The record names one more consequence. Inside the scope, a class both vocabularies define, such as `text-sm` or `rounded-md`, takes the system's value, and the record calls that what scoping the app to the system means.

The record accepts both, and it is right to. The bug it fixed, a reset that beat `mx-auto` and `px-4`, broke spacing in the app's own code. The cost it kept breaks the system's classes on one element, and the install note says where that class belongs.

## Setting up Quartz so the scope holds

The Quartz theme installs with one command. The [guide to giving Claude Code a design system](/claude-code-design-system) covers how Claude Code loads the skill it writes whenever it builds UI.

```sh
npx shadcn@latest add https://design.how/r/quartz/theme.json
```

After it installs, the theme prints three steps:

1. Import `@/components/quartz/styles.css` once, in the root layout, as its own stylesheet. The printed note rules out an @import in globals.css.
2. Put `className="quartz"` on the element that holds Quartz UI, usually the body.
3. Wrap the app inside that element in `QuartzPortalProvider` from `@/lib/quartz/portal`, so dialogs and menus keep the theme.

A root layout that follows all three:

```tsx
import type { ReactNode } from 'react'
import '@/components/quartz/styles.css'
import { QuartzPortalProvider } from '@/lib/quartz/portal'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="quartz">
        <QuartzPortalProvider>{children}</QuartzPortalProvider>
      </body>
    </html>
  )
}
```

The second step is ADR 0009's cost in practice. The printed note says Quartz's classes work on the elements inside the quartz element, in the project's own code too, and not on that element itself. So the layout above puts no Quartz class beside `quartz` on the body.

Dark mode goes on the quartz element or any ancestor, such as `html`, as `data-theme="dark"` or the class `dark`. The theme does not follow prefers-color-scheme on its own.

With the scope in place, the lint checks what an agent writes inside it. Quartz lint installs and runs with two commands:

```bash
npx shadcn@latest add https://design.how/r/quartz/lint.json
npx eslint -c quartz.eslint.config.mjs .
```

The [guide to linting hardcoded colors with Quartz](/guides/lint-hardcoded-colors-in-tailwind-with-quartz) covers `text-[#18181b]`, `text-gray-500` and a real token such as `bg-ink` in the wrong place. Several lint rules enforce rules from [Quartz's anti-slop page](/systems/quartz/foundations/anti-slop), which has 26 rules, such as `quartz/no-status-dot` for anti-slop-no-status-dots. The [Quartz system page](/systems/quartz) lists the rest of what ships.

## The part another design system should copy

Copy the three moves ADR 0009 backs with a mechanism. Put the reset in `@layer base`, so the app's layered utilities beat it. Point `@source` at the app's folders, because the record's first bug was a correct class in `app/page.tsx` with no CSS. Nest the utilities under a `:where()` scope, so specificity stays one class and a partly scoped page keeps its own Tailwind.

Leave two details alone. A reset layer named for the system ranks above the app's utilities once it is declared after the app's layer order, which brings back the dead `mx-auto`. Native `@scope` stays out of a shipped theme while the record's reason holds, since a browser without it drops every utility.

The nesting comes with one silent failure, a class on the scope element that does nothing, and Quartz's install note prints it in plain words. A theme that copies the layer, the scan and the nesting but skips that note has taken the mechanism and dropped the one line that tells an agent where its classes go.

## Questions

### What is an agent-ready design system?

It is a set of tokens, components and rules a coding agent can install, read and be checked against, as design.how's explainer defines it. Quartz installs with the shadcn CLI, writes a skill the agent reads, and ships a lint with 35 rules.

### Why does a Quartz class do nothing on the element with className quartz?

ADR 0009 nests the theme's utilities under the scope, and that nesting matches descendants only. Put Quartz's classes on elements inside the quartz element, as the theme's install message says.

### Will the Quartz reset override mx-auto or px-4 in my own code?

No. ADR 0009 moved the reset into @layer base, the layer Tailwind's preflight uses, so the project's layered utilities beat it.

### Why does text-sm look different inside the Quartz scope?

Inside the scope, a class that both the app and the system define takes the system's value. ADR 0009 calls that what scoping the app to the system means.
