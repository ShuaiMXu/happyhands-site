---
name: Iconography
system: sodium
kind: foundation
source: registry/sodium/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/sodium/foundations/iconography
---

# Iconography

Lucide at 16px, squared off to match square corners.

## Rules
1. iconography-one-source MUST Import icons from Sodium's icon file and draw them with Icon, never from lucide-react or another set. Because the icon file squares each glyph's line ends and joins and holds its line at 1.25px, and Icon sets the size from Sodium's scale and hides a decorative glyph from screen readers; a glyph straight from the package does none of it.
   - Correct: `import {Icon, Add} from '@/components/sodium/icon'`
   - Wrong: `import {Plus} from 'lucide-react'`
2. iconography-sizes MUST Size an icon 16px in every control and row, 14px (--icon-sm) only inside a small field or filter cell, 20px on its own, 24 or 32px only over an empty state. Because the line is 1.25px at every size, so a glyph under 14 crowds and one at 40 looks thin; a small field's 12 or 13px text is shorter than a 16px glyph, which hangs below it, so the field takes the one step down; fixed steps keep icons in a row the same size.
   - Correct: `<Button size="icon" aria-label="Add"><Icon icon={Add}/></Button>  // 16px`
   - Wrong: `<Button size="icon" aria-label="Add"><Icon icon={Add} size={14}/></Button>`
3. iconography-name-icon-only MUST Name every icon-only control with aria-label; an icon on its own is decorative. Because Icon is aria-hidden unless it has a label, so an icon button with no name is announced as "button".
   - Correct: `<Button size="icon" aria-label="Copy job ID"><Icon icon={Copy}/></Button>`
   - Wrong: `<Button size="icon"><Icon icon={Copy}/></Button>`
4. iconography-colour NEVER Draw an icon in solid yellow on a light ground; an icon takes its label's colour. Because a yellow glyph on white is 1.4:1 and vanishes, and an icon in its own colour reads as a status.
   - Correct: `<Icon icon={Lightning} className="text-text-2"/>`
   - Wrong: `<Icon icon={Lightning} className="text-accent-fill"/>`
5. iconography-no-word MUST Draw an icon only where there is no word: an icon-only button named with aria-label (a region header's actions are these), inside an input (search), or a status glyph. A labeled button carries no icon; a menu trigger's caret is the control's own mark, as on a select. Because the mono capital label already says what the button does, so a glyph beside it says it twice, and once some labeled buttons carry one and others do not, a row reads as two kinds of button.
   - Correct:
     ```tsx
     <Button>Run pipeline</Button>
     <Button size="icon" aria-label="Replay run"><Icon icon={Renew}/></Button>
     ```
   - Wrong: `<Button><Icon icon={Play}/>Run pipeline</Button>`

## Tokens
| Token | Role | Use for | Not for | Light |
|-|-|-|-|-|
| `--icon` | an icon in a control: the set is drawn at 16 | every control and row | empty states | `16px` |
| `--icon-sm` | an icon inside a small field beside its 12 or 13px text, so the glyph spans the caps, not a line and a half | inside a small field or filter cell, beside 12 or 13px text | buttons | `14px` |

## Decision table
| You need | Use |
|-|-|
| A button with a label | `the label alone, no icon` |
| An icon in a row, an input or an icon-only button | `<Icon icon={...}/>, 16px` |
| An icon in a small (26px) field or filter cell | `nothing: the field draws its slots at --icon-sm, 14px` |
| An icon-only button | `Button size="icon" with aria-label` |
| The glyph over an empty state | `24 or 32px in text-3` |
| A glyph the set lacks | `import it from lucide-react in icon.tsx, wrap it with squared and name it there` |

## Scale
16px in UI, 14 inside a small field, 20 on its own, 24 and 32 over an empty state. One weight; the line is 1.25px at every size, with square ends and mitred joins.

## Reject list
- No second icon set, no round line ends, no duotone or filled glyphs, no emoji as icons, no yellow glyph on a light ground.

## Related
- [Typography](/systems/sodium/foundations/typography.md): Mono capitals for the interface, Inter Display for headlines and prose, one weight.
