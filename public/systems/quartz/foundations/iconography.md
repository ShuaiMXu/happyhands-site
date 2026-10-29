---
name: Iconography
system: quartz
kind: foundation
source: registry/quartz/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/quartz/foundations/iconography
---

# Iconography

A few solid icons from Font Awesome Free, only for actions you find by their shape.

## Rules
1. iconography-actions-only MUST Use an icon only for an action found by its shape: copy, close, search, more, external, chevron, add. Because icons on every row and item stop being findable by shape, and a rocket says nothing a screen reader or a new user can read.
   - Correct:
     ```tsx
     <Row>prompt-v13 <Badge kind="deploy"/></Row>
     <MenuItem>Rename</MenuItem>
     ```
   - Wrong:
     ```tsx
     <Row><Icon icon={Rocket}/> prompt-v13</Row>
     <MenuItem><Icon icon={Pencil}/>Rename</MenuItem>
     ```
2. iconography-import MUST Import icons only through registry/quartz/icon.tsx and draw them with <Icon icon={Copy} size={16}/>. Because the set is swapped in that one file, and Icon hides the glyph from a screen reader unless it gets a label.
   - Correct: `import {Icon, Copy} from '@/registry/quartz/icon'`
3. iconography-size MUST Use 16px in controls, rows and icon-only buttons, 12px for a caret or a check inside a control, and 20px or 24px only for a rare large target (a broken image, a drop zone); never pass a weight or stroke. Because the set is Font Awesome Classic Solid, one weight, and these sizes keep glyphs on whole pixels; a stroke prop would outline a filled glyph.
   - Correct: `<Icon icon={Copy} size={16}/>`
   - Wrong: `<Icon icon={Copy} size={18} strokeWidth={2}/>`
4. iconography-icon-only-name MUST Give every icon-only button an aria-label. Because the glyph is aria-hidden, so a screen reader announces only "button".
   - Correct: `<Button size="icon-sm" aria-label="Close"><Icon icon={Close}/></Button>`
   - Wrong: `<Button size="icon-sm"><Icon icon={Close}/></Button>`
5. iconography-no-kind-icons NEVER Draw a kind glyph or put an icon in a colored tile; a kind is a tinted word. Because a glyph has to be learned and a screen reader skips it, where the word names the kind for everyone.
   - Correct: `<Badge kind="deploy"/>`
   - Wrong: `<span className="bg-accent-mark rounded-md p-2"><Icon icon={Rocket}/></span>`
6. iconography-no-hue NEVER Color an icon; icons are ink. Because a tinted glyph reads as a kind or a status the row does not have, and a glyph in a mark step falls under 3:1 on paper.
   - Correct: `<Icon icon={Copy}/>`
   - Wrong: `<Icon icon={Copy} className="text-accent-mark"/>`

## Tokens
| Token | Role | Use for | Not for | Light |
|-|-|-|-|-|
| `--control-sm` | small control height, the sm of every control | small icon button box | glyph size | `28px` |
| `--control` | default control height, wider than tall: 16px of padding a side | default icon button box | glyph size | `32px` |
| `--control-lg` | large control and touch target | large icon button and touch target | glyph size | `44px` |
| `--text-1` | primary text, and the only text on marks and fields | icon color | hue | `var(--ink)` |

## Decision table
| You need | Use |
|-|-|
| Icon in a control | `size 16` |
| Icon-only button glyph | `size 16 in every icon-only size (icon-xs to icon-lg); a labelled xs button draws its icon at 14px` |
| Caret or check inside a control | `size 12` |
| Kind of a thing | `<Badge kind/>, never a glyph` |
| Name of a row or menu item | `the word, no icon` |

## Scale
Glyph sizes 12, 16, 20, 24px; 16 almost everywhere, 12 for carets and checks, 20 and 24 for large targets. One set, Font Awesome Classic Solid, one weight.

## Reject list
- No kind icons.
- No icon before every label.
- No hue on icons.

## Related
- [Color](/systems/quartz/foundations/color.md): Five hues name the kind of thing, and amber and red mean trouble.
- [Anti-slop](/systems/quartz/foundations/anti-slop.md): The habits of generated UI to avoid, and what to do instead.
