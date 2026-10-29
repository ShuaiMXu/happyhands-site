---
name: Iconography
system: glaze
kind: foundation
source: registry/glaze/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/glaze/foundations/iconography
---

# Iconography

Phosphor at regular weight, 14px in controls.

## Rules
1. iconography-one-source MUST Import icons from Glaze's icon file and draw them with Icon, never from @phosphor-icons/react or another set. Because Icon sets the size from Glaze's scale and the weight from its rule, and a glyph straight from the package renders at 1em in whatever weight its caller guessed.
   - Correct: `import {Icon, Add} from '@/components/glaze/icon'`
   - Wrong: `import {PlusIcon} from '@phosphor-icons/react'`
2. iconography-weights MUST Leave Icon at weight="regular" in controls; pass "light" in dense rows and tables at 14px and up, "bold" only where a 12px glyph must hold on glass, and "fill" only for an icon toggle that is on. Because Phosphor draws each weight as its own outline, so regular matches a 13px label, light keeps a column of glyphs from darkening the row, and fill is the one way an icon-only toggle shows it is on without colour.
   - Correct: `<Icon icon={Wrap} weight={wrap ? 'fill' : 'regular'}/> // aria-pressed toggle`
   - Wrong: `<Icon icon={Wrap} weight="fill"/> // a plain button`
3. iconography-sizes MUST Size an icon 12px in a small control or a tag, 14px in a control, 16px in a large one; 20 and 24 only on their own. Because the icon matches the label beside it at those sizes, and a bigger one outweighs a 13px label.
   - Correct: `<Icon icon={Add}/> // 14px`
   - Wrong: `<Icon icon={Add} size={20}/> // in a 32px button`
4. iconography-name-icon-only MUST Name every icon-only control with aria-label; an icon on its own is decorative. Because Icon is aria-hidden unless it has a label, so an icon button with no name is announced as "button".
   - Correct: `<Button size="icon" aria-label="Copy run ID"><Icon icon={Copy}/></Button>`
   - Wrong: `<Button size="icon"><Icon icon={Copy}/></Button>`
5. iconography-earn-it SHOULD Use an icon where its shape is found faster than a word: send, copy, close, more, search. Because an icon beside every label doubles the noise and teaches people to skip both.
6. iconography-no-tiles NEVER Put an icon in a tinted tile or circle as decoration. Because a tile says nothing the word beside it does not, and it looks like a button to press.
   - Correct: `<Icon icon={Bot}/>`
   - Wrong: `<span className="rounded-tag bg-field p-2"><Icon icon={Bot}/></span>`

## Tokens
| Token | Role | Use for | Not for | Light |
|-|-|-|-|-|
| `--icon-sm` | an icon in a small control or a tag | small controls and tags | default controls | `12px` |
| `--icon` | an icon in a control | controls, menu items, inputs | empty states | `14px` |
| `--icon-lg` | an icon in a large control or on its own | large controls, an icon on its own | tags | `16px` |

## Decision table
| You need | Use |
|-|-|
| An icon in a button | `<Icon icon={...}/>, 14px from the button` |
| An icon-only button | `Button size="icon" with aria-label` |
| An icon in a table row or a dense list | `<Icon icon={...} weight="light"/> at 14px or more; 12px stays regular` |
| An icon toggle that is on | `weight="fill" while aria-pressed is true` |
| The glyph over an empty state | `EmptyTitle draws it: 40px light in text-3 (32 at size sm), centred over the title` |
| A glyph the set lacks | `import it from @phosphor-icons/react/ssr in icon.tsx and name it there` |

## Scale
12, 14 and 16px in UI, 20 and 24 on their own, 32 and 40 at light weight only for the glyph over an empty state's title. Regular weight by default: its line is 1/16 of the size, 0.875px at 14px.

## Reject list
- No second icon set, no fill outside a toggle that is on, no duotone or thin, no icon tiles, no emoji as icons.

## Related
- [Typography](/systems/glaze/foundations/typography.md): Glaze Sans for every word, Glaze Mono at 0.8 of the text around it.
