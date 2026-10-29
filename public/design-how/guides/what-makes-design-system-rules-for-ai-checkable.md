# What makes design system rules for AI checkable

> Design system rules for AI carry an id, a level and code that breaks them. How Quartz's anti-slop-no-arrow-links rule maps to its lint error.

By design.how, 2026-10-24. HTML: https://design.how/guides/what-makes-design-system-rules-for-ai-checkable

A design system rule for an AI agent is a line with an id, a level (must, should or never) and, where it can, an incorrect and a correct snippet. A guideline written as prose has none of those parts, so an agent can read it, but no lint error or review can cite it by name.

[Quartz](/systems/quartz) writes the rules in its docs in that shape, and it is the right shape for an agent to work from.

## What do design system rules for AI look like in Quartz?

Each Quartz rule has an id, a level and its text. Quartz's docs hold 605 rules across 67 pages, and 507 of them carry both an incorrect and a correct code snippet. Quartz's [anti-slop page](/systems/quartz/foundations/anti-slop) has 26 rules, 1 must and 25 never, with 18 carrying incorrect and correct code.

One of its never rules is `anti-slop-no-arrow-links`:

Rule `anti-slop-no-arrow-links` (never) from the Quartz docs (https://design.how/systems/quartz/foundations/anti-slop). Never end link text in an arrow or write Learn more; name where the link goes. Because a screen reader listing links hears ten Learn mores and no destination.

Incorrect:

```tsx
<a>Learn more →</a>
```

Correct:

```tsx
<Link href="/docs/keys">Rotating API keys</Link>
```

The rule bans link text that ends in an arrow or reads Learn more, and asks the link to name where it goes. Its reason is that a screen reader listing links hears ten Learn mores and no destination. The incorrect snippet is `<a>Learn more →</a>`. The correct snippet is a `Link` to `/docs/keys` whose text reads Rotating API keys. The pair gives the agent the exact string to avoid and the text to write in its place, which the sentence alone does not.

## The id is what a lint error points back to

Quartz lint has 35 rules, and Quartz pairs each one with the docs rule it enforces. `quartz/no-arrow-link` enforces `anti-slop-no-arrow-links`. Run on its planted fixture, it printed this:

Lint run: `quartz/no-arrow-link` on its planted fixture, `registry/quartz/lint/fixtures/bad/no-arrow-link.tsx`.

```tsx
// Planted: quartz/no-arrow-link. Link text that ends in an arrow.
export function Docs() {
  return <a href="/docs/keys" className="type-body-sm text-text-1 underline">Rotating API keys →</a>;
}
```

What the lint printed:

```text
registry/quartz/lint/fixtures/bad/no-arrow-link.tsx
  3:10  error  "Rotating API keys →" ends in an arrow; a screen reader reads it aloud, so drop it and let the text name where the link goes.  quartz/no-arrow-link

1 problem
```

The output has one error at 3:10, on the link text "Rotating API keys →". It tells the agent that a screen reader reads the arrow aloud, and to drop it and let the text name where the link goes. The run ends at 1 problem.

The lint rule name and the docs id are separate strings, singular `quartz/no-arrow-link` against plural `anti-slop-no-arrow-links`. The published pairing is what ties an error back to the docs rule and its reason.

Reviews use the same names. The [ui-review skill](/skills/ui-review) cites each finding by number or by the installed design system's rule id, so a lint error and a review finding can name the same rule.

## A guideline in prose is a different thing

A guideline such as "write clear link text" gives an agent intent with no snippet to compare against and no name to cite. An agent can agree with it and still ship Learn more with an arrow on the end.

The [component-docs skill](/skills/component-docs) holds rules to the stricter format. It writes each usage rule with an id, a condition, an action, a reason, its evidence and a "Don't" line with real code that breaks it. It cuts a rule it cannot break with a snippet. That cut is the right default, because a rule nobody can break in code is a guideline with an id attached. The [AI slop UI](/ai-slop-ui) page goes through each tell with the rule that bans it and the lint error an agent reads.

The one mistake is reading a never rule's text as an instruction. A never rule's text names the thing to avoid, and the docs page prints it after the word Never. The text of `anti-slop-no-arrow-links` opens with "End link text in an arrow or write Learn more", which is the habit it bans. Copy that text into a prompt without its level and it reads as an order to do the banned thing, so the level belongs to a rule as much as its id does.

## Questions

### Does every Quartz rule come with code?

No. Quartz's docs hold 605 rules, and 507 of them carry both an incorrect and a correct snippet. On Quartz's anti-slop page, 18 of 26 rules have both and 8 have incorrect code only.

### How do I run Quartz's rules against my own code?

Install the lint with `npx shadcn@latest add https://design.how/r/quartz/lint.json`, which adds `quartz.eslint.config.mjs` at the project root. Run it with `npx eslint -c quartz.eslint.config.mjs .` and each of its 35 rules enforces a named docs rule.

### Is the lint rule name the same as the docs rule id?

Not always. `quartz/no-arrow-link` enforces anti-slop-no-arrow-links, and `quartz/no-scroll-reveal` enforces anti-slop-no-decorative-motion, and Quartz lists each pair.
