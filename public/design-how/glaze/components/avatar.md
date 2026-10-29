---
name: Avatar
system: glaze
kind: component
import: "import {Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount, avatarVariants, initialsOf} from '@/components/glaze/ui/avatar'"
install: "npx shadcn@latest add https://design.how/r/glaze/avatar.json"
registryDependencies: [icon, theme, truncate, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/avatar
---

# Avatar

Shows who or what acted.

## Use when
- A row, message or log line says who did it: a person, an agent, a connected source.
- A thread or review shows who is on it: AvatarGroup with +N.
- A citation shows where an answer came from: type="source".

## Don't use when
- A status or a count on its own. Use [Badge](/systems/glaze/components/badge.md).
- A file or an image the person attached. Use [Attachment](/systems/glaze/components/attachment.md).

## Minimal example
```tsx
<Avatar name="Maya Chen" src={user.photo}/>
<Avatar type="agent" name="Refund agent"/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. avatar-type-shape MUST Set type="agent" for an agent and type="source" for a page or tool; leave type="person" for people. Because round means a person, so an agent drawn round with initials reads as a colleague who did the work.
   - Correct: `<Avatar type="agent" name="Refund agent"/>`
   - Wrong: `<Avatar name="Refund agent"/>`
2. avatar-name MUST Pass name on every Avatar, and decorative when the name is written beside it. Because name gives the initials and the accessible name; without decorative a screen reader hears the name twice.
   - Correct: `<Avatar name="Maya Chen" src={photo} decorative/> Maya Chen`
   - Wrong: `<Avatar src={photo}/> Maya Chen`
3. avatar-no-hue NEVER Colour an avatar's fallback by a hash of the name. Because colour means status in Glaze, so a green or coral circle reads as a pass or a failure.
   - Correct: `<Avatar name="Maya Chen"/>`
   - Wrong: `<Avatar className="bg-ok-tint" name="Maya Chen"/>`
4. avatar-group-max MUST Put more than three avatars in an AvatarGroup with a label and a max. Because the group folds the rest into +N, which names whom it hides, so a long row never pushes the line or hides people.
   - Correct: `<AvatarGroup label="Reviewers" max={4}>{people.map(p => <Avatar key={p} name={p}/>)}</AvatarGroup>`
   - Wrong: `<div className="flex">{people.map(p => <Avatar name={p}/>)}</div>`
5. avatar-cutout MUST Set --avatar-cutout on an AvatarGroup that sits on anything but paper, such as the shell or the page. Because the 2px cut between avatars is drawn in that colour, and a paper cut on the grey shell shows as a white ring.
   - Correct: `<AvatarGroup className="[--avatar-cutout:var(--shell)]">`
6. avatar-no-third-party NEVER Load a source's icon from a third-party favicon service. Because it tells that service every page the person reads, and the globe fallback already names the source.
   - Correct: `<Avatar type="source" name={domain} src={cachedIcon}/>`
   - Wrong: `` <Avatar type="source" src={`https://icons.example/${domain}`}/> ``
7. avatar-size-row SHOULD Use size="sm" in a line of text, the default in a row and lg in a header. Because a 20px avatar fits the 13px line, 24px sits in a 36px row with room, and 32px holds two initials.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `name` | `string` |  | Gives the initials and the accessible name. |
| `src` | `string` |  | An image from your own origin; the fallback shows until it loads. |
| `type` | `'person' \| 'agent' \| 'source'` | `'person'` | Round with initials, or square with the bot or globe glyph. |
| `size` | `'xs' \| 'sm' \| 'default' \| 'lg'` | `'default'` | 16, 20, 24 or 32px. |
| `decorative` | `boolean` | `false` | Hidden from assistive tech when the name is beside it. |
| `AvatarGroup max` | `number` | `4` | Shown avatars, counting the +N. |
| `AvatarGroup label` | `string` |  | The list's accessible name. |
| `AvatarGroup size` | `'xs' \| 'sm' \| 'default' \| 'lg'` | `'default'` | Matches the overlap and the +N to the avatars. |
Other props pass through to the span (Base UI Avatar root).

## Variants and states
- type: person, agent, source
- size: xs, sm, default, lg
- states: image, fallback, loading, broken image

## Accessibility
- [ ] A named avatar is role="img" with the name; a decorative one is aria-hidden.
- [ ] Initials are ink on the grey field, 15:1 or better; glyphs are text-2.
- [ ] The +N reads "and 3 more" with the hidden names, and opens a hint with them on hover or focus.
- [ ] Forced colours draw a CanvasText border so every avatar keeps its shape.

## Keyboard
- `Tab`: Reaches the +N of a group, which opens its hint.
- `Escape`: Closes the hint.

## Edge cases
- Image fails -> The fallback stays: initials, the bot or the globe.
- Name in another script -> Initials take letters in any script.
- One-word name -> The first two letters, or one at 20px and smaller.
- No name and no image -> An empty grey shape; pass name.
- Right to left -> The group overlaps the other way on logical margins.
- Dark theme -> The field and the edge flip with the tokens; photos keep their pixels.

## Tokens
--field, --line-faint, --text-1, --text-2, --paper, --radius-pill, --radius-tag, --type-label-sm, --type-label, --type-caption

## Related
- [Badge](/systems/glaze/components/badge.md): Labels what something is or how it stands.
- [Item](/systems/glaze/components/item.md): Shows one thing as a row in a list.
