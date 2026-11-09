# HappyHands registry

Current adaptation: 2026-11-09.2. Original sources remain archived under /design-how/.

Install a pinned component:

`npx shadcn@latest add https://happyhands.cc/r/v/2026-11-09.2/quartz/button.json`

Opt-in hosted Skill (both agent clients):

`npx shadcn@latest add https://happyhands.cc/r/v/2026-11-09.2/quartz/skill.json`

For a pinned namespace, set components.json registries to:

`{"@happyhands":"https://happyhands.cc/r/v/2026-11-09.2/{name}.json"}`

Then install `@happyhands/quartz-button`. Unversioned URLs follow the current adaptation. Versioned registry dependencies remain pinned; upstream npm dependencies retain their source ranges.

Import only the generated styles.css once; tokens.css and base.css are bundled source references, not additional imports. Skill prose has only hosted navigation/install URLs adapted; executable components and original archives retain their source.
