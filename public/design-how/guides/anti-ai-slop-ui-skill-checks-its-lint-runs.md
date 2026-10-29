# An anti AI slop UI skill, and the checks its lint runs

> An anti AI slop UI skill tells an agent which UI habits to avoid, and Quartz lint fails the code. A 15-check review list with rule ids, status dots first.

By design.how, 2026-10-25. HTML: https://design.how/guides/anti-ai-slop-ui-skill-checks-its-lint-runs

An anti AI slop UI skill is a SKILL.md that tells a coding agent which habits of generated UI to avoid, such as tracked capitals and status dots, and what to use instead. A skill cannot fail code, so pair it with a lint. Quartz ships both. The checklist below holds 15 checks. The lint runs the first eight, and a reviewer reads for the last seven.

## Run Quartz lint before reading the diff

Quartz lint is a separate install from the Quartz skill. The [Quartz](/systems/quartz) theme install also installs the skill item, which writes the Quartz skill to `.claude/skills/quartz/SKILL.md` and `.agents/skills/quartz/SKILL.md`. The lint config comes from its own registry item. If the project has no `components.json`, run `npx shadcn@latest init -d` first.

Install the theme and the lint, then run the lint:

```bash
npx shadcn@latest add https://design.how/r/quartz/theme.json
npx shadcn@latest add https://design.how/r/quartz/lint.json
npx eslint -c quartz.eslint.config.mjs .
```

The second command adds `quartz.eslint.config.mjs` at the project root, and the third runs it. Quartz lint has 35 rules, and each one names the docs rule it enforces, so `quartz/no-caps` maps to `anti-slop-no-caps`.

The run on the planted no-caps fixture printed 2 problems on one span. One error flags `uppercase`, the other flags `tracking-widest`, and the second one tells the agent to let the type-* role set the tracking.

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

That output is the reason the lint goes first. Each error says what to use instead, so a failing screen can go back to the agent with the output attached, and a person only reads a diff that already passed the patterns.

The [ui-review](/skills/ui-review) skill works in the same order. Its second step runs the project's own lint and records the command and exit code, and its third step captures each screen at 390 and 1280 wide.

## The checklist for a screen an agent wrote

Each check below is a yes or no question a reviewer answers from the code, with its id from [Quartz's anti-slop page](/systems/quartz/foundations/anti-slop), which has 26 rules. The lint checks come first, with status dots at the top, and the checks by eye follow.

1. Does `npx eslint -c quartz.eslint.config.mjs .` finish with no errors?
2. Is every status written as a word, with no dot in its place? `quartz/no-status-dot` (`anti-slop-no-status-dots`)
3. Is every label in sentence case, with no `uppercase` or tracking class? `quartz/no-caps` (`anti-slop-no-caps`)
4. Is a selected row free of a colored bar on one edge? `quartz/no-side-rail` (`anti-slop-no-side-rail`)
5. Does every link's text end without an arrow? `quartz/no-arrow-link` (`anti-slop-no-arrow-links`)
6. Does each fact sit in its own element, with no middle dot joining facts? `quartz/no-dot-separator` (`anti-slop-no-dot-separator`)
7. Is the UI copy free of emoji and em dashes? `quartz/no-emoji-or-em-dash` (`anti-slop-no-em-dash`)
8. Does content render in place, with no fade or slide as it scrolls into view? `quartz/no-scroll-reveal` (`anti-slop-no-decorative-motion`)
9. Is a running status the `Status` component, with no pulse, ping, bounce, glow or sweep? `anti-slop-no-decorative-motion`
10. Does every frame split its content with row rules or a well, with no bordered or grey box inside it? `anti-slop-no-box-in-box`
11. Does a kind hue sit only in a label, a chart line or the selected row, with no section, card or header filled with it? `anti-slop-no-hue-wallpaper`
12. Are several numbers shown as one stats strip, a table or a sentence, with no row of equal icon cards? `anti-slop-no-card-grid`
13. Does an empty state sit top-left of the body with a title, one muted line and the action, and no art? `anti-slop-no-centred-empty`, `anti-slop-no-empty-art`
14. Does the copy name the mechanism or the number, with none of the promise words the rule lists? `anti-slop-no-filler`
15. Does a destructive button carry the fail edge and fail text, with no red fill? `anti-slop-no-red-button`

Check 1 gates the rest. A screen that fails it goes back to the agent before a person reads further.

Check 2 is the one where the lint error explains the rule best. On the planted no-status-dot fixture, a colored dot sits before `api@v312` with no word, and the lint flagged it with the reason in the message itself: a colored dot carries status by hue alone, which grayscale, forced colors and screen readers lose.

Lint run: `quartz/no-status-dot` on its planted fixture, `registry/quartz/lint/fixtures/bad/no-status-dot.tsx`.

```tsx
// Planted: quartz/no-status-dot. Status as a colored dot with no word.
export function Healthy() {
  return <div className="flex items-center gap-2 type-body-sm"><span className="size-2 rounded-full bg-accent-mark"/>api@v312</div>;
}
```

What the lint printed:

```text
registry/quartz/lint/fixtures/bad/no-status-dot.tsx
  3:101  error  A colored dot carries status by hue alone, which grayscale, forced colors and screen readers lose; use <Status status="ok"/>, which writes the word.  quartz/no-status-dot

1 problem
```

The fix it names is `<Status status="ok"/>`, which writes the word, so the status survives without its color.

## Which checks does the lint leave to a person?

Checks 9 to 15 stay with a person, though the lint covers part of two of them. Check 9 shares its docs rule with `quartz/no-scroll-reveal`, but the only planted fixture for that lint rule is a section with `whileInView`, so the run gives no evidence that it catches `animate-ping` or a glow. No rule in Quartz lint lists the ids of checks 10 to 15 as the docs rule it enforces. Two lint rules come close. `quartz/one-frame` fails a framed list inside a framed panel, one shape of check 10, and `quartz/no-hue-fill` fails `bg-accent-field` on a section, the incorrect example of check 11. The rest of those checks need a reviewer to read the screen.

Start with check 9. `anti-slop-no-decorative-motion` bans a pulse, ping, bounce, glow or sweep that makes a row look alive, and says a running status is a small turning arc. Its incorrect example is a green `animate-ping` span, and its correct example is `Status` with the running status. The reason it gives is that constant motion takes the eye from the row that changed and keeps moving under reduced motion.

The card grid is the next one to read for. `anti-slop-no-card-grid` bans several numbers shown as three equal icon cards and asks for one stats strip, a table or a sentence. Equal cards give every number the same weight and push the table the person came for below the fold.

Rule `anti-slop-no-card-grid` (never) from the Quartz docs (https://design.how/systems/quartz/foundations/anti-slop). Never show several numbers as three equal icon cards; compose one stats strip, a table or a sentence. Because equal cards give every number the same weight and push the table the person came for below the fold.

Incorrect:

```tsx
<Card><Icon/><Stat>42</Stat></Card> x3
```

Correct:

```tsx
<PageHeaderStats/>
```

By eye, the breach is a run of sibling `Card` elements that each hold an icon and one number.

`anti-slop-no-box-in-box` bans a bordered or grey box inside a frame. Look for a `Card` whose child carries its own `border` or grey fill, and split that content with row rules or a well. A box in a box stacks edges until no one can tell which group a line closes.

`anti-slop-no-hue-wallpaper` bans filling a section, card or header with a kind hue. The rule's incorrect example is a `Section` with `bg-accent-field`. The hue belongs in a label, a chart line or the selected row, because a filled section makes everything inside look like that kind.

`anti-slop-no-centred-empty` and `anti-slop-no-empty-art` read as one check on the [Empty state](/systems/quartz/components/empty-state). The empty state sits top-left of the body with the query in a code tag, and holds a title, one muted line and the action. A centred block in a big box fails it, and so does a drawing above the title. The rule's correct example is an `Empty` with the title No agents yet and the line Create one to start.

`anti-slop-no-filler` asks copy to name the mechanism or the number. Its correct example reads "Deploys an agent in 42 seconds to 3 regions." A sentence that promises without saying what happens or how fast fails the check.

`anti-slop-no-red-button` asks for the fail edge and fail text on a destructive button. A red fill is the loudest shape on the page and outshouts the primary action, so look at every Delete and Revoke button in the diff.

Two of the lint checks also have a half that the runs on file do not show. The planted fixture for check 5 ends in an arrow, and `anti-slop-no-arrow-links` also bans link text that says Learn more, so read each link for a destination. The planted fixture for check 7 puts an em dash in a sentence, and `anti-slop-no-em-dash` also covers an empty value, which writes None, because a dash in an empty cell reads as a minus or a value still loading.

## Is an anti AI slop UI skill enough on its own?

Keep the skill, and run the lint after it. The Quartz skill gives the agent the anti-slop rules, and Quartz lint checks the code the agent wrote against them. The [Claude Code docs on skills](https://code.claude.com/docs/en/skills) say Claude uses skills when relevant, or a person invokes one directly with /skill-name. The setup for each agent is on the [Claude Code design system page](/claude-code-design-system), and the [design systems for agents page](/design-systems-for-agents) says Codex and Cursor read `.agents/skills/`.

The [AI slop UI page](/ai-slop-ui) lists the reflexes and says each design.how system fails the ones a pattern can catch in its lint.

The same checklist shape works on the other two systems with their own ids. [Glaze's anti-slop page](/systems/glaze/foundations/anti-slop) has 17 rules and [Lime's anti-slop page](/systems/lime/foundations/anti-slop) has 18 rules, and each system ships its own lint.

If a reviewer keeps one check, keep check 2, `anti-slop-no-status-dots`. The rule asks for the word, and color only on warn and fail. Its reason is that a dot carries status by hue alone, which color-blind people, forced colors and screen readers all lose. Quartz's [Status](/systems/quartz/components/status) covers idle, queued, running, waiting, ok, warn and fail as a mark or a word. A screen of runs exists to say where each run stands, and a dot says it only to people who can see the hue, so this is the check to keep.

## Questions

### Does the Quartz skill work outside Claude Code?

The Quartz theme writes the skill to `.claude/skills/quartz/SKILL.md` and to `.agents/skills/quartz/SKILL.md`. The design.how page on design systems for agents says Codex and Cursor read `.agents/skills/`, and the lint is plain ESLint, so it works with any agent.

### What does Quartz lint print when it finds slop?

It prints the file, the line and column, the error and the lint id. On the planted em dash fixture it printed "Em dash in UI copy; end the sentence or use a comma." next to `quartz/no-emoji-or-em-dash`.

### Can the checklist be used with Glaze or Lime?

Yes, with their own ids. Glaze's anti-slop page has 17 rules and Lime's anti-slop page has 18 rules, and each system installs its own lint config with the shadcn CLI.

## Sources

- [Extend Claude with skills - Claude Code Docs](https://code.claude.com/docs/en/skills)
