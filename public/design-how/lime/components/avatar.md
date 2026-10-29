---
name: Avatar
system: lime
kind: component
import: "import {Avatar, AvatarGroup, avatarVariants} from '@/components/lime/ui/avatar'"
install: "npx shadcn@latest add https://design.how/r/lime/avatar.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/lime/components/avatar
---

# Avatar

Puts a face to a name, or initials when there's no photo.

## Use when
- Who a payment is with or who owns something: a friend on a split bill, a household member.
- A stack of people on a shared goal (AvatarGroup).

## Don't use when
- The image is a receipt or a merchant logo.
- The element labels a state. Use [Badge](/systems/lime/components/badge.md).

## Minimal example
```tsx
<Avatar name="Maya Lens" src={url}/>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. avatar-name-required MUST Pass name with the full name. Because it is the image alt and the initials, so an empty name leaves an unnamed image and a blank disc.
   - Correct: `<Avatar src={url} name="Maya Lens"/>`
   - Wrong: `<Avatar src={url} name=""/>`
2. avatar-real-name MUST Pass the display name, not the handle. Because initials come from the first two words, so "@mayaslens" draws an @ in the disc.
   - Correct: `<Avatar name="Maya Lens"/>`
   - Wrong: `<Avatar name="@mayaslens"/>`
3. avatar-group-limit SHOULD Show four avatars and a count after them; discs overlap by about an eighth, so every person still widens the row.
   - Correct: `<AvatarGroup>{four}</AvatarGroup> <Badge>+8</Badge>`
   - Wrong: `<AvatarGroup>{twelve.map(...)}</AvatarGroup>`
4. avatar-visible-name SHOULD Keep the name as visible text beside an avatar and hide the avatar from assistive tech.
   - Correct: `<span aria-hidden><Avatar name="Maya Lens"/></span> <span>Maya Lens</span>`
   - Wrong: `<Avatar name="Maya Lens"/> <span>Maya Lens</span>`
5. avatar-size-to-line SHOULD Match size to the line: xs for 14px text, sm for a row, md for a card, lg for a profile.
6. avatar-no-status-dot NEVER Add an online dot, gradient or extra ring. Because Lime tracks no presence, so a dot or lime ring claims an online status nothing backs.
   - Correct: `<Avatar name="Maya Lens"/>`
   - Wrong: `<div className="rounded-full ring-2 ring-accent"><Avatar name="Maya Lens"/></div>`
7. avatar-button-wrap MUST Wrap an avatar that opens a profile in a Button or link. Because the avatar is a span with no focus or role, so an onClick on it is out of keyboard reach.
   - Correct: `<Button variant="ghost" size="icon" aria-label="Maya Lens"><Avatar name="Maya Lens" size="sm"/></Button>`
   - Wrong: `<Avatar name="Maya Lens" onClick={openProfile}/>`

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `name` | `string` |  | Full name. Alt text and initials. Required. |
| `src` | `string` |  | The picture. Without it, or if it fails, initials show. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | 24, 32, 40 or 56px. |
| `AvatarGroup` | `div props` |  | Overlaps avatars, each ringed in the page colour. Pass aria-label to name it; on a surface, pass *:ring-surface. |
Other props pass through to the root element.

## Variants and states
- size: xs, sm, md, lg
- states: image, fallback

## Accessibility
- [ ] The image uses name as alt; the fallback is role="img" labelled with the name.
- [ ] Not focusable; it takes no keys.
- [ ] Beside a visible name the person is read twice; hide the avatar.
- [ ] Name an AvatarGroup with aria-label.

## Edge cases
- One-word or emoji name -> Initials are the first grapheme of each of the first two words, so an emoji stays whole.
- Image fails -> The initials show, with no layout shift.
- Right to left -> The overlap is a logical margin, so the first avatar sits at the right edge and the stack runs leftward.
- Empty name -> An empty grey disc with no initials and empty alt text.
- Forced colors -> Every avatar gets a 1px CanvasText border; the group ring is dropped.
- Zoom 200% -> Sizes are pixels; the disc does not grow.

## Tokens
--surface-2, --fg-2, --radius-control, --weight-medium, --text-xs, --text-sm, --text-lg, --page

## Related
- [Badge](/systems/lime/components/badge.md): A short fact that never changes on its own, such as Plus or New.
- [Chip](/systems/lime/components/chip.md): A filter the person toggles, such as a spending category.
- [List](/systems/lime/components/list.md): Rows of transactions, accounts or settings, each with a mark, a title and a value or a chevron.
