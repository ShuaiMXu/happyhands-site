---
name: Frame
system: sodium
kind: component
import: "import {Frame, FrameHeader, FrameTitle, FrameStatus, FrameValue, FrameActions, FrameBody, FrameDescription, FrameFooter, FrameMeta, frameVariants} from '@/components/sodium/ui/frame'"
install: "npx shadcn@latest add https://design.how/r/sodium/frame.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/sodium/components/frame
---

# Frame

Boxes a region once and divides it by rules.

## Use when
- A region of a page: a table, a log, a pipeline's stages, a group of settings.
- A raised summary standing on its own beside the main region (variant="panel").

## Don't use when
- Parts inside a region; divide them with rule-row and rule-col. Use [Collapsible](/systems/sodium/components/collapsible.md).
- Something floating over the page. Use [Popover](/systems/sodium/components/popover.md).

## Minimal example
```tsx
<Frame>
  <FrameHeader><FrameTitle>wh.orders_daily</FrameTitle><FrameValue meta>96 partitions</FrameValue></FrameHeader>
  <FrameBody padding="none">{rows}</FrameBody>
  <FrameFooter><FrameMeta>Updated 2m ago</FrameMeta><Button size="sm">Rewrite</Button></FrameFooter>
</Frame>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. frame-once NEVER Put a Frame or a panel inside a Frame. Because rules carry Sodium's layout, and a box in a box draws two edges where one closes the region.
   - Correct: `<Frame><FrameBody padding="none"><div className="rule-row">…</div></FrameBody></Frame>`
   - Wrong: `<Frame><FrameBody><Frame>…</Frame></FrameBody></Frame>`
2. frame-header-name MUST Put the thing's name in FrameTitle as written, then its state in FrameStatus and its meta in FrameValue meta; never a kind word before the name. Because a product header reads as the name and then how it is, and a KIND prefix in capitals reads like a spec sheet and says what the body already shows.
   - Correct: `<FrameHeader><FrameTitle>wh-analytics</FrameTitle><FrameValue meta>size L</FrameValue></FrameHeader>`
   - Wrong: `<FrameHeader><FrameTitle>Warehouse</FrameTitle><FrameValue>wh-analytics</FrameValue>…`
3. frame-named SHOULD Give each Frame an accessible name, with aria-label or aria-labelledby on its FrameTitle, when a view holds more than one. Because a section with no name is not a landmark, so a screen reader cannot tell the regions apart or jump between them.
   - Correct:
     ```tsx
     <Frame aria-label="Warehouse wh-analytics"><FrameHeader><FrameTitle>wh-analytics</FrameTitle></FrameHeader>…</Frame>
     ```
   - Wrong: `<Frame><FrameHeader><FrameTitle>wh-analytics</FrameTitle></FrameHeader>…</Frame>`
4. frame-one-primary MUST Hold at most one primary Button in a frame, header and footer together. Because a frame is one group of actions, and the slab marks the one thing to act on there.
   - Correct:
     ```tsx
     <FrameActions><Button size="icon-sm" variant="ghost" aria-label="Refresh"><Icon icon={Renew}/></Button></FrameActions>…<FrameFooter><Button size="sm">Save</Button></FrameFooter>
     ```
   - Wrong:
     ```tsx
     <FrameActions><Button size="sm">Run</Button></FrameActions>…<FrameFooter><Button size="sm">Save</Button></FrameFooter>
     ```
5. frame-rows-to-edge SHOULD Use padding="none" for rows and tables, so they run to the frame's edge. Because a row's rule should meet the frame's edge, not stop 8px short of it.
6. frame-body-data-first MUST Start a body with its data, or one FrameDescription sentence, never a headline; divide a second part with a second FrameBody. Because the header already names the thing and its state, so a 24px headline under it repeats them in a marketing voice, and one rule between parts is what makes two regions read alike where a hand-set border drifts.
   - Correct:
     ```tsx
     <FrameBody><FrameDescription>The source dropped a column.</FrameDescription>…</FrameBody><FrameBody padding="none">{strip}</FrameBody>
     ```
   - Wrong:
     ```tsx
     <FrameBody><h3 className="type-heading">Orders stopped loading</h3>…</FrameBody><div className="border-t border-line">{strip}</div>
     ```
7. frame-small-actions SHOULD Use 26px buttons in the header and footer: icon-sm ghost buttons named with aria-label in the header, size="sm" in the footer. Because the header is a 38px row (--head), where a 26px ghost leaves 6px clear and its glyph lands 12px from the edge, and the footer's 12px inset puts a 26px button's box as far from the rule as from the side.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `Frame variant` | `'frame' \| 'panel'` | `'frame'` | The page fill with a rule edge, or the raised panel fill. |
| `FrameBody padding` | `'default' \| 'none'` | `'default'` | 12px in on all four sides (--inset), the header's inset, or none for rows. A body after a body draws the rule between them. |
| `FrameDescription` | `p` |  | The one sentence that opens a body, in type-body-sm, text-2. |
| `FrameHeader, FrameTitle, FrameActions` | `header, h2, div` |  | The panel-head row: the name as written, then state, meta and actions at its end. |
| `FrameStatus` | `span` |  | The state at the header's end, before the meta: a Status or an Activity at size sm. |
| `FrameValue meta` | `boolean` | `false` | The header's meta in text-2 at the end. Without meta, a second identifier after the title. |
| `FrameFooter, FrameMeta` | `footer, span` |  | A ruled row: meta as written in text-2, then actions. |
Other props pass through to the section element.

## Variants and states
- variant: frame, panel
- header: state

## Accessibility
- [ ] A section; give it an accessible name with aria-labelledby on the FrameTitle's id when the view has several.
- [ ] The edge is --line, the same rule a field, a menu and a secondary button draw; it divides, it is not a cue.
- [ ] The header's name is text-1 on the panel at 17.6:1 and 14.9:1; its meta text-2.

## Edge cases
- Long title -> Truncates before the actions move.
- Phone, 390 wide -> The frame fills the width; footer actions wrap under the meta.
- Dark theme -> Rules step up from the near-black page; the panel variant is a step lighter.
- Forced colors -> The edge draws in CanvasText.

## Tokens
--page, --panel, --line, --line-faint, --line-width, --head, --row, --inset, --type-code, --type-body-sm, --type-code-sm, --text-1, --text-2

## Related
- [Collapsible](/systems/sodium/components/collapsible.md): Shows and hides a region.
- [Sheet](/systems/sodium/components/sheet.md): Opens the details of one thing at the side.
