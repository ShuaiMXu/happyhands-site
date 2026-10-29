---
name: Avatar
system: sodium
kind: component
import: "import {Avatar, AvatarImage, AvatarFallback, AvatarGroup, avatarVariants, initialsOf} from '@/components/sodium/ui/avatar'"
install: "npx shadcn@latest add https://happyhands.cc/r/sodium/avatar.json"
registryDependencies: [icon, theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/avatar
---

# Avatar

Shows who or what acted.

## Use when
- A row says who triggered a run, owns a pipeline or approved a change.
- A service did the work: the scheduler, a connector, a bot account (type="service").
- Several owners on one line (AvatarGroup).

## Don't use when
- A kind of thing, such as an engine or a region. Use [Tag](/systems/sodium/components/tag.md).
- A logo of a third-party product; use its name in text.

## Minimal example
```tsx
<Avatar name="Mira Okafor"/>
<Avatar type="service" name="scheduler"/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. avatar-square NEVER Round an Avatar or its image. Because every corner in Sodium is square, and one round photo is the part everyone notices.
   - Correct: `<Avatar name="Mira Okafor"/>`
   - Wrong: `<Avatar name="Mira Okafor" className="rounded-full"/>`
2. avatar-service-type MUST Set type="service" for a machine account, so it shows the server glyph and never initials. Because initials on a scheduler make a machine read as a colleague in an audit trail.
   - Correct: `<Avatar type="service" name="Nightly scheduler"/>`
   - Wrong: `<Avatar name="Nightly scheduler"/>`
3. avatar-name MUST Pass name, or decorative when the name is written beside it. Because name gives the initials and the accessible name; without either, the avatar is an unnamed image.
   - Correct: `<Avatar name={user.name} src={user.photo}/>`
   - Wrong: `<Avatar src={user.photo}/>`
4. avatar-decorative-beside-name SHOULD Set decorative when the person's name is the next text, so it is not read twice.
   - Correct: `<Avatar name="Mira Okafor" decorative/> Mira Okafor`
   - Wrong: `<Avatar name="Mira Okafor"/> Mira Okafor`
5. avatar-own-origin MUST Serve src from your own origin or a store you control. Because a third-party image tells that host who looked at the run, and fails closed behind a strict content policy.
6. avatar-group-label MUST Give an AvatarGroup a label that says what the people share. Because the group is a list, and "list, 4 items" says nothing about why these four are together.
   - Correct: `<AvatarGroup label="Owners of ingest-prod">…</AvatarGroup>`
   - Wrong: `<AvatarGroup>…</AvatarGroup>`
7. avatar-size-by-row SHOULD Use sm in a 32px row, the default in a 40px row, lg in a header.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `type` | `'person' \| 'service'` | `'person'` | service shows the server glyph, never initials. |
| `name` | `string` |  | The initials and the accessible name. |
| `src` | `string` |  | A photo; the initials show while it loads and if it fails. |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | 20, 24 or 32px. |
| `decorative` | `boolean` | `false` | Hides it from assistive tech. |
| `AvatarGroup max, label, size` | `number, string, size` | `4` | Past max the rest fold into +N. |
Other props pass through to the root span (Base UI Avatar).

## Variants and states
- type: person, service
- size: sm, default, lg
- states: initials, one letter, image, group

## Accessibility
- [ ] A named avatar is role="img" with its name; decorative ones are aria-hidden.
- [ ] Initials are ink on the well, 16.4:1 in light and 14.5:1 in dark; the service glyph text-2, 7.0:1.
- [ ] The +N cell reads "and 3 more" with the hidden names, and shows them on hover.

## Edge cases
- Image fails -> The initials (or the glyph) stay; nothing breaks.
- One-word name -> Takes its first two letters; the 20px size takes one.
- Email as name -> Uses the part before @.
- Name in another script -> Takes the first letters of that script.
- Forced colours -> The edge draws in CanvasText.

## Tokens
--well, --line, --page, --text-1, --text-2, --type-micro, --type-label-sm

## Related
- [Item](/systems/sodium/components/item.md): Shows one thing as a row in a list.
- [Tag](/systems/sodium/components/tag.md): Labels what something is or how it stands.
