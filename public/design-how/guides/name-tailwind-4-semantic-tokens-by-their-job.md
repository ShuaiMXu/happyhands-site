# How to name Tailwind 4 semantic tokens by their job

> Name Tailwind 4 semantic tokens by job, such as text-2 or accent-wash, so a lint can check placement. Quartz's lint fails bg-accent-field on a section.

By design.how, 2026-10-25. HTML: https://design.how/guides/name-tailwind-4-semantic-tokens-by-their-job

Tailwind 4 semantic tokens are theme variables you define in `@theme` and name for their job, so the utility Tailwind generates from each one says where it belongs. Quartz's color-ink-text rule shows the difference. Its incorrect code is `<p className="text-gray-500">`, a palette grey that falls under the 5:1 text floor on the grey card and in the dark theme, and its correct code is `text-text-2`. Five steps get from one to the other.

## Start from an app with components.json

The starting point is a Next.js app on Tailwind CSS v4 with a `components.json` at its root, because [Quartz](/systems/quartz) installs through the shadcn CLI. If the app has no `components.json`, this command writes one:

```bash
npx shadcn@latest init -d
```

You also need a coding agent that edits the app. The token layer comes with the install, since the Quartz theme item ships Quartz's tokens, scoped base styles and the Tailwind v4 theme mapping.

## How do Tailwind 4 semantic tokens become utilities?

A variable you define inside `@theme` becomes a set of utility classes named after it. That mechanism is step 1, and every later step depends on it. The [Tailwind docs on theme variables](https://tailwindcss.com/docs/theme) say theme variables "influence which utility classes exist in your project". The page's example defines `--color-mint-500` and gets background, text and fill utilities named mint-500.

The same page splits the work between two places. Use `@theme` when a token should map directly to a utility class, and `:root` for a regular CSS variable that should have no utility. Theme variables also have to be defined top level, never nested under a selector or a media query.

The namespace reset is the part that changes what a class name can produce. Setting `--color-*: initial` inside `@theme` removes every default utility in the color namespace, such as the red-500 background, and leaves only the values you define:

```css
@import "tailwindcss";
@theme {
  --color-*: initial;
  --color-white: #fff;
  --color-midnight: #121063;
}
```

After that reset, the midnight color above has its utilities and `text-gray-500` does not, so a palette class left in the markup produces no CSS.

One more detail from the docs applies the moment a theme variable points at another variable. Use `@theme inline` there. Without `inline`, a utility can resolve to an unexpected value, because CSS resolves a `var()` where the theme variable is defined, and the variable it points at may only be set deeper in the tree.

Tailwind fixes the namespace, and the name after the prefix is yours. The docs say you can name theme variables whatever you want within a namespace, and a utility with the same name appears. Spend that freedom on the job. A name like `gray-500` describes a color. A name like `text-2` or `accent-wash` says where the token belongs, and Quartz's color rules are written against names of that kind.

## Install a system whose tokens are already named by job

Quartz's theme brings job-named tokens, so steps 2 and 3 are an install and a read. The whole path is five steps:

1. Learn what `@theme` does with a name (the section above).
2. Install the Quartz theme.
3. Read the job names on Quartz's color page.
4. Map the old values with token-mapping.
5. Run Quartz lint.

For step 2, run the theme install:

```bash
npx shadcn@latest add https://design.how/r/quartz/theme.json
```

The same install adds the Quartz skill, written to `.claude/skills/quartz/SKILL.md` and `.agents/skills/quartz/SKILL.md`. When it finishes, the theme prints three setup steps. Import `@/components/quartz/styles.css` once in the root layout, as its own stylesheet. Put `className="quartz"` on the element that holds Quartz UI, usually `<body>`. Wrap the app inside that element in `<QuartzPortalProvider>` from `@/lib/quartz/portal`, so dialogs and menus keep the theme.

Step 3 is reading the names before an agent writes against them. [Quartz's color page](/systems/quartz/foundations/color) sets text in `--text-1` to `--text-3`, which are ink at 100, 80 and 66%, and keeps `--text-disabled` for disabled controls only. The rule's reason calls text-3 the 5:1 floor. Nothing in that scale says grey. Each step names a rank of text.

Hue follows the same idea. The color page gives each kind one hue everywhere, in the order agent, key, run, deploy and model, and always shows the word. Components never name the hue. The rule below sets `data-kind` on a panel and reads `bg-accent-wash` inside it:

Rule `color-set-kind-attribute` (must) from the Quartz docs (https://design.how/systems/quartz/foundations/color). Set data-kind or data-status on a panel and read --accent-wash and --accent-line; never name a hue in a component. Because a hard-coded hue skips the dark theme value and keeps its color when the kind changes.

Incorrect:

```tsx
<Row className="bg-[var(--hue-3-wash)]"/>
```

Correct:

```tsx
<section data-kind="run"><Row className="bg-accent-wash"/></section>
```

The incorrect row reaches for `--hue-3-wash` directly. The rule's reason is that a hard-coded hue skips the dark theme value and keeps its color when the kind changes. `accent-wash` is the clearest job name in Quartz. The row asks for the wash of whatever kind its panel is, and the panel's `data-kind="run"` decides which kind that is.

## Map an existing app's raw values with token-mapping

An app that already has `text-gray-500` and hex values needs a map from those values to the new names, and step 4 gets it from the [token-mapping](/skills/token-mapping) skill. token-mapping reports how each hardcoded value lands on your existing tokens by what the value does, so an 8px radius never stands in for an 8px gap.

It starts by finding your token list in token files, theme entries and custom properties on `:root`. A framework's default theme is not your list.

Then it resolves every alias to its final value in each mode, normalises lengths to px and colors to OKLCH, and compares colors by delta E. Each row lands in one of four classes: exact, semantic (inside tolerance, with the difference in numbers), ambiguous (with every candidate) or gap.

token-mapping is a read-only report. It never edits, so applying the mapping is a separate step you hand to the agent, with the report as its brief. Read the gap rows before the agent edits anything, because those are the values with no token to land on. The design.how skills, token-mapping among them, install with one command:

```bash
npx skills@latest add https://design.how
```

## Check the result with Quartz lint

Step 5 proves the names are doing work. Install Quartz lint, which adds `quartz.eslint.config.mjs` at the project root, then run it:

```bash
npx shadcn@latest add https://design.how/r/quartz/lint.json
npx eslint -c quartz.eslint.config.mjs .
```

Quartz lint has 35 rules. A palette class like `text-gray-500` is the easy case, and [the guide to linting hardcoded Tailwind colors with Quartz](/guides/lint-hardcoded-colors-in-tailwind-with-quartz) covers it. The run below is the case job names make possible. `bg-accent-field` is a real Quartz token, and the lint still fails it on a `<section>`:

Lint run: `quartz/no-hue-fill` on its planted fixture, `registry/quartz/lint/fixtures/bad/no-hue-fill.tsx`.

```tsx
// Planted: quartz/no-hue-fill. A section filled with the agent hue.
export function AgentPanel() {
  return <section data-kind="agent" className="flex flex-col gap-2 bg-accent-field p-4"><h2 className="type-heading">Agents</h2></section>;
}
```

What the lint printed:

```text
registry/quartz/lint/fixtures/bad/no-hue-fill.tsx
  3:68  error  "bg-accent-field" fills a <section> with a kind hue; name the kind with <Badge kind/>, and mark a selected row with bg-accent-wash.  quartz/no-hue-fill

1 problem
```

The error is about where the token sits. It names the element, a `<section>`, and the replacement in the same line: [`<Badge kind/>`](/systems/quartz/components/badge) for the kind and `bg-accent-wash` for a selected row. The fixture is valid Quartz vocabulary in the wrong place, and the rule it enforces, color-no-hue-fills, gives the reason that a hue names a kind, so a filled section makes everything inside it look like that kind.

## Mistakes that survive correct tokens

Correct token names still break in three places: on the scope element, on classes both vocabularies define, and on warm hues. A Quartz class on the scope element itself does nothing, because the theme nests its utilities under the scope and the nesting matches descendants only. Put the system's classes on the elements inside the quartz element. Inside the scope, a class both vocabularies define, such as `text-sm` or `rounded-md`, takes the system's value. [What an agent-ready design system does to your CSS](/guides/what-an-agent-ready-design-system-does-to-your-css) walks through the decision record behind both.

Warm hues are the third trap. color-warm-is-trouble bans amber and red for anything but warn and fail, and no kind, chart series or decoration is warm. Its reason is that an operator scanning for trouble stops on every warm mark, so a warm Beta tag reads as a failing run. The rule is about where the hue goes, so a warm Beta tag breaks it whether the amber comes from `bg-amber-200` or from a token. Quartz lint enforces it as `quartz/warm-is-trouble`.

## The next habit to drop is a dark: override

Once palette greys are gone, the next habit to drop is a `dark:` override on a token that already flips. A semantic token changes its value in the dark theme on its own, so `dark:bg-raised` beside `bg-page` restates what the token does. Quartz lint enforces it as `quartz/no-dark-variant`, under the docs rule quartz-tokens-only, and the planted fixture fails a panel that adds `dark:bg-raised`:

Lint run: `quartz/no-dark-variant` on its planted fixture, `registry/quartz/lint/fixtures/bad/no-dark-variant.tsx`.

```tsx
// Planted: quartz/no-dark-variant. A dark: override where the role already flips.
export function Panel() {
  return <div className="bg-page p-4 type-body dark:bg-raised">Usage this month</div>;
}
```

What the lint printed:

```text
registry/quartz/lint/fixtures/bad/no-dark-variant.tsx
  3:48  error  "dark:bg-raised" uses dark:; Quartz's color roles change in the dark theme on their own, so use the role alone.  quartz/no-dark-variant

1 problem
```

The message gives the reason and the fix in one line: Quartz's color roles change in the dark theme on their own, so use the role alone. That is the test for whether a token is named by its job. If a component still needs `dark:` to look right, its token names a color, not a job.

## Questions

### Should semantic tokens go in @theme or :root in Tailwind 4?

The Tailwind docs say to use @theme when a token should map to a utility class and :root for a variable that should have no utility. Theme variables must also be defined top level, not nested under selectors or media queries.

### How do I remove Tailwind's default color palette?

Set the namespace to initial inside @theme with --color-*: initial, then define your own colors. The Tailwind docs say this removes default utilities such as bg-red-500 and leaves only your custom values.

### Does token-mapping change my code?

No. token-mapping is a read-only report that lands each hardcoded value on your existing tokens by purpose and never edits.

### Does the Quartz theme follow the system dark mode setting?

No. Put data-theme="dark" or the class dark on the quartz element or any ancestor, such as the html element. The theme does not follow prefers-color-scheme on its own.

## Sources

- [Theme variables - Core concepts - Tailwind CSS](https://tailwindcss.com/docs/theme)
