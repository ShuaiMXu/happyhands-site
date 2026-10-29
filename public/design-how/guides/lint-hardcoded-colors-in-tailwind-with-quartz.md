# How to lint hardcoded colors in Tailwind with Quartz

> Lint hardcoded Tailwind colors like text-[#18181b] and text-gray-500 with Quartz, and catch the next mistake, a real token such as bg-ink in the wrong place.

By design.how, 2026-10-20, updated 2026-10-23. HTML: https://design.how/guides/lint-hardcoded-colors-in-tailwind-with-quartz

To lint hardcoded colors in Tailwind, run a lint that fails every color your theme doesn't name: a hex value in brackets like `text-[#18181b]`, a palette class like `text-gray-500`, and a raw `stroke` on an svg. Quartz's `quartz/no-raw-color` fails all three and names the color role to use instead. A real token in the wrong place passes that check, so Quartz lints placement too.

## How do you lint hardcoded colors in Tailwind?

Install a lint that knows the design system's tokens, then run it as its own ESLint config. The planted fixture for `quartz/no-raw-color` holds the three hardcoded colors an agent writes most, and the lint printed 3 problems.

Lint run: `quartz/no-raw-color` on its planted fixture, `registry/quartz/lint/fixtures/bad/no-raw-color.tsx`.

```tsx
// Planted: quartz/no-raw-color. A hex value in a class, a palette color and a raw stroke on an svg.
export function Latency() {
  return (
    <p className="text-[#18181b]">
      <span className="type-body-sm text-gray-500">p95 latency</span>
      <svg aria-hidden="true" viewBox="0 0 16 4" className="h-1 w-4"><path d="M0 2h16" stroke="#3b82f6"/></svg>
    </p>
  );
}
```

What the lint printed:

```text
registry/quartz/lint/fixtures/bad/no-raw-color.tsx
  4:19  error  Raw color #18181b in "text-[#18181b]"; use a color role such as text-text-1, text-text-2, text-text-3.  quartz/no-raw-color
  5:37  error  Raw color gray-500 in "text-gray-500"; use a color role such as text-text-1, text-text-2, text-text-3.  quartz/no-raw-color
  6:88  error  Raw color #3b82f6 in stroke; use currentColor and a color role class such as text-text-3.  quartz/no-raw-color

3 problems
```

Each message names the raw color, the class or attribute it sat in, and the roles to use. The two text colors point to `text-text-1`, `text-text-2` and `text-text-3`. The svg stroke gets a different answer: `currentColor`, with the color set by a role class such as `text-text-3`. That is the case a regex over class names misses, because the color is in an attribute.

Tailwind sets the starting point. In Tailwind v4, [theme variables in the --color-* namespace decide which color utilities exist](https://tailwindcss.com/docs/theme), and the default theme is why classes like `bg-red-500` are there at all. The same page shows that setting `--color-*: initial` removes the default color utilities and leaves only custom ones. That stops new palette classes from building, but it says nothing about a bracketed hex or an inline stroke. A lint covers those.

For Quartz, the lint installs with the shadcn CLI, adds `quartz.eslint.config.mjs` at the project root and runs on its own:

```bash
npx shadcn@latest add https://design.how/r/quartz/lint.json
npx eslint -c quartz.eslint.config.mjs .
```

Quartz lint has 35 rules. The value checks are `quartz/no-raw-color`, `quartz/no-dark-variant`, `quartz/no-inline-style`, `quartz/no-dynamic-class` and `quartz/unknown-class`, and all of them enforce the docs rule `quartz-tokens-only`. An app with its own tokens and no Quartz can still start the audit. The [token-mapping skill](/skills/token-mapping) reports how hardcoded values map onto existing tokens by purpose, and it never edits.

## Ink on a heading passes that check and still fails

Banning hardcoded colors is the easy half. The planted fixture for `quartz/ink-is-a-hand` fills an `h2` with `bg-ink` and sets `text-text-inverse` on it. Both are real Quartz tokens, so `quartz/no-raw-color` has nothing to say. The lint printed 1 problem anyway.

Lint run: `quartz/ink-is-a-hand` on its planted fixture, `registry/quartz/lint/fixtures/bad/ink-is-a-hand.tsx`.

```tsx
// Planted: quartz/ink-is-a-hand. A heading filled with ink, which is reserved for the primary action and checked controls.
export function RunsHeader() {
  return <h2 className="bg-ink px-4 type-label text-text-inverse">Runs</h2>;
}
```

What the lint printed:

```text
registry/quartz/lint/fixtures/bad/ink-is-a-hand.tsx
  3:25  error  "bg-ink" fills a <h2> with ink, and ink fill is for the primary action and checked controls; use Button for the action or InkSlot, the soft grey label, for what waits on a person, and leave headers and kinds on paper.  quartz/ink-is-a-hand

1 problem
```

The message says ink fill is for the primary action and checked controls. It offers `Button` for an action and `InkSlot`, the soft grey label, for something that waits on a person, and tells the agent to leave headers and kinds on paper.

The rule behind it is `color-ink-fill` on [Quartz's color page](/systems/quartz/foundations/color). It allows ink fill on the primary Button, one per view, and on a checked control such as a checkbox, radio or switch, because the primary button is the one thing to do next and an ink header takes that place from it. Quartz's [anti-slop page](/systems/quartz/foundations/anti-slop) bans the same thing as `anti-slop-no-ink-decoration`, whose incorrect code is an ink `header` with the word Runs, almost character for character the fixture above.

## A kind hue filling a section fails the same way

The planted fixture for `quartz/no-hue-fill` puts `bg-accent-field` on a `section` with `data-kind="agent"`, and the lint printed 1 problem.

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

The message tells the agent to name the kind with `<Badge kind/>` and to mark a selected row with `bg-accent-wash`. The fixture already reads the hue through `data-kind`, which is what `color-set-kind-attribute` asks for, so the failure is the fill itself. The rule is `color-no-hue-fills`: a hue names a kind, so a filled section makes everything inside it look like that kind.

## The after swaps each flagged color for a role

The rebuilt module answers all five messages. It compiles, and it uses only classes and components the messages point to.

```sh
npx shadcn@latest add https://design.how/r/quartz/badge.json
```

```tsx
import { Badge } from '@/components/quartz/ui/badge';

export function Latency() {
  return (
    <p className="text-text-1">
      <span className="type-body-sm text-text-2">p95 latency</span>
      <svg aria-hidden="true" viewBox="0 0 16 4" className="h-1 w-4 text-text-3"><path d="M0 2h16" stroke="currentColor"/></svg>
    </p>
  );
}

export function RunsHeader() {
  return <h2 className="px-4 type-label text-text-1">Runs</h2>;
}

export function AgentPanel() {
  return (
    <section data-kind="agent" className="flex flex-col gap-2 p-4">
      <h2 className="type-heading">Agents</h2>
      <Badge kind="agent" />
    </section>
  );
}
```

`Latency` answers `quartz/no-raw-color`. The hex becomes `text-text-1`, the palette grey becomes `text-text-2`, and the stroke becomes `currentColor` under `text-text-3`. Palette greys have their own docs rule, `color-ink-text`, with `text-gray-500` as its incorrect code and `text-text-2` as its correct code. Its reason is that `text-3` is the 5:1 floor, and `gray-500` falls under it on the grey card and in the dark theme.

`RunsHeader` drops `bg-ink` and `text-text-inverse` and sets `text-text-1`, full ink on paper. `AgentPanel` keeps `data-kind="agent"`, loses `bg-accent-field`, and carries a [Badge](/systems/quartz/components/badge) with `kind="agent"`, which matches the correct code on `color-no-hue-fills`. The hue survives in the one place the rule allows it.

## Color rules with no lint rule of their own

Quartz's color page has 9 rules, and some are not the docs rule behind any of the 35 lint rules. The first is `color-line-step`, which asks for a 2px line or ring in a hue to use the line step, `--accent-line`.

Rule `color-line-step` (must) from the Quartz docs (https://design.how/systems/quartz/foundations/color). Draw a 2px line or ring in a hue with the line step, --accent-line. Because the mark step is a fill that falls under 3:1 on paper, and only the line step clears 3:1 for a stroke.

Incorrect:

```tsx
stroke="var(--hue-3-mark)"
```

Correct:

```tsx
className="stroke-accent-line"
```

Its reason is that the mark step is a fill that falls under 3:1 on paper, and only the line step clears 3:1 for a stroke. The second is `color-selection-wash`, which keeps a selected row on `--accent-wash` under hover, because a row that swaps to the hover fill looks deselected under the pointer. The [ui-review skill](/skills/ui-review) cites findings by the installed design system's rule id, so a review can point straight at either.

## Run the lint in the build so the before stays out

Put `npx eslint -c quartz.eslint.config.mjs .` in the build, and a commit with `text-[#18181b]`, `bg-ink` on a heading or `bg-accent-field` on a section fails with the messages shown above. Each message names its replacement, a color role, `Button`, `InkSlot`, `Badge kind` or `bg-accent-wash`, so the fix is in the error text the agent reads. The [AI slop UI](/ai-slop-ui) page pairs each slop tell with the rule that bans it and the lint error an agent reads, and these failures follow that pattern.

The cost is real. Every raw color, ink fill and hue fill outside the allowed places stops the build, including a one-off accent someone wanted on purpose. That cost is worth paying. A hex ban alone would have passed two of the three fixtures here, and those two are the ones a reviewer is least likely to spot by eye.

## Questions

### Does the Quartz lint only catch hex codes and palette classes?

No. Its quartz/ink-is-a-hand and quartz/no-hue-fill rules fail Quartz's own tokens, bg-ink and bg-accent-field, when they fill a heading or a section.

### Which docs rule does quartz/no-raw-color enforce?

It enforces quartz-tokens-only, the same docs rule behind quartz/no-dark-variant, quartz/no-inline-style, quartz/no-dynamic-class and quartz/unknown-class.

### Where may ink fill go in Quartz?

The color-ink-fill rule allows ink fill only on the primary Button, one per view, and on a checked control such as a checkbox, radio or switch. What waits on a person gets InkSlot, a grey fill with ink text.

### Can I use amber for a Beta tag?

Not in Quartz. The color-warm-is-trouble rule keeps amber and red for warn and fail only, and quartz/warm-is-trouble is the lint rule that enforces it.

## Sources

- [Theme variables - Core concepts - Tailwind CSS](https://tailwindcss.com/docs/theme)
