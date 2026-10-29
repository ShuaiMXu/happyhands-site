---
name: Borders and lines
system: sodium
kind: foundation
source: registry/sodium/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/sodium/foundations/borders-and-lines
---

# Borders and lines

Rules divide content; a frame is a region's one outer edge.

## Rules
1. borders-and-lines-rules-divide MUST Divide the parts of a region with rules (rule-row between rows, rule-col between columns, panel-head over a header row); box only the region itself, with frame. Because a rule says where one part ends without adding an edge of its own, so a dense screen stays one surface instead of a stack of boxes.
   - Correct: `<div className="frame"><div className="rule-row p-inset">…</div><div className="p-inset">…</div></div>`
   - Wrong: `<div className="frame"><div className="frame p-3">…</div><div className="frame p-3">…</div></div>`
2. borders-and-lines-one-header MUST Open every top-level region with the one header as its frame's first row: panel-head, --head (38px) on the panel fill, the thing's name as written (FrameTitle), then its state, meta and actions at the end (FrameStatus, FrameValue meta, FrameActions), with no kind word before the name. Start the body with the data, never a repeat of the name or the state; Table, LogViewer and CodeWindow draw the same header. Because a product names a thing and then says how it is, so the reader finds which region this is and its state in the same place on every screen, while a KIND prefix in capitals reads like a spec sheet, and a status and headline repeated in the body push the data down.
   - Correct:
     ```tsx
     <Frame aria-label="Failed job">
       <FrameHeader>
         <FrameTitle>orders-daily</FrameTitle>
         <FrameStatus><Status status="fail" size="sm">Job failed</Status></FrameStatus>
         <FrameValue meta>02:14 UTC</FrameValue>
       </FrameHeader>
       <FrameBody>…</FrameBody>
     </Frame>
     ```
   - Wrong:
     ```tsx
     <FrameHeader>
       <FrameTitle>On call</FrameTitle>
       <FrameValue>orders-daily</FrameValue>
     </FrameHeader>
     <FrameBody><Status status="fail">Job failed</Status><h3 className="type-heading">Orders stopped</h3>…</FrameBody>
     ```
3. borders-and-lines-header-actions MUST Put a header's actions at its end in panel-head-actions, as 26px ghost icon buttons (icon-sm) named with aria-label, 8px apart, the last glyph on the 12px inset (--inset), in one order: search, refresh, wrap, then navigation such as next failure, then the run action, then copy last. Never the yellow slab in a header, and a count belongs in the meta, not on a button. Because the same action sits in the same place in every header, so a hand that copied from the log finds copy in the code window too; the header is the thing's name, so a slab there outshouts it, and a count said twice reads as two different numbers.
   - Correct:
     ```tsx
     <FrameActions>
       <WrapToggle wrap={wrap} onWrap={setWrap}/>
       <Button size="icon-sm" variant="ghost" aria-label="Next failure"><Icon icon={Misuse}/></Button>
       <CopyButton value={text}/>
     </FrameActions>
     ```
   - Wrong:
     ```tsx
     <CopyButton value={text}/><WrapToggle wrap={wrap} onWrap={setWrap} size="icon"/>
     <Button size="sm">Run now</Button>
     ```
4. borders-and-lines-no-page-grid NEVER Draw a grid, a dot field or any pattern behind the page or behind content; structure is rules between content, and dots fill only an empty gutter. Because a cell grid behind every word competes with the rules that carry the layout, and the owner ruled it out.
   - Correct: `<main className="min-h-dvh bg-page">`
   - Wrong: `<main className="dots min-h-dvh">`
5. borders-and-lines-one-weight MUST Draw every line 1px; the focus ring is the only 2px line, and a focused field doubles its own edge inward. Because a 2px rule reads as a selected or focused state.
   - Correct: `<div className="border border-line">`
   - Wrong: `<div className="border-2 border-line">`
6. borders-and-lines-by-role MUST Pick the line by its job: line-faint between rows; line for a region's edge, a column rule, and the edge of a field, a boxed control, a secondary button and an overlay; line-control only for a small mark: a checkbox, a radio, a switch, a meter track. Because a field or a menu is found by its label, placeholder and fill, so it takes the rule a card draws and every bordered thing reads as one family, while a 16px box in line, 1.3:1 on white, disappears.
   - Correct: `<input className="field">`
   - Wrong: `<input className="border border-line-control">`
7. borders-and-lines-dots-sparingly SHOULD Use dots only in a gutter 20px or wider with nothing in it, at most one or two per view. Because the texture is decoration; past a couple of gutters it turns into the grid Sodium does not draw.

## Tokens
| Token | Role | Use for | Not for | Light | Dark (blank: same as light) |
|-|-|-|-|-|-|
| `--line-faint` | the rule between rows inside a region | between rows inside a region | edges | `#efede6` | `#22211e` |
| `--line` | the rule that divides content and the edge of a field, a boxed control and an overlay, 1.3:1 on the page | a region's edge, a column rule, a header's underline, a field, a segmented control, a secondary button, an overlay | checkbox, radio, switch | `#e2dfd5` | `#2c2a25` |
| `--line-control` | the edge of a small mark that would vanish on white, 3.7:1 on the page and 3.3:1 on the well (WCAG 1.4.11) | a checkbox, radio or switch edge, a meter track, a chart cursor, a swimlane connector | fields, overlays, rules between rows | `#8a8478` | `#736d61` |
| `--mark` | the rail's dots and a tool-call stack's dashed connectors | rail dots, a tool-call stack's connectors | text | `#8a8478` | `#736d61` |
| `--dot` | the dots of a dot-matrix gutter, decoration only | a dot gutter | behind content | `#dedad0` | `#2a2824` |
| `--line-width` | every line: rules, edges, connectors | frame, field, rule, overlay |  | `1px` |  |
| `--focus-width` | the focus ring | every focusable |  | `2px` |  |
| `--focus-offset` | the gap between a control and its ring | every focusable |  | `2px` |  |
| `--dot-pitch` | the spacing of a dot-matrix gutter | dots |  | `4px` |  |
| `--rail-pitch` | the spacing of a rail's square dots | rail |  | `6px` |  |
| `--rail-dot` | one rail dot, square | rail |  | `2px` |  |
| `--pending-cell` | one square of the pending mark; four of them, 2px apart | button pending, switch pending, search pending |  | `3px` |  |

## Decision table
| You need | Use |
|-|-|
| A region: a table, a log, a pipeline's page | `frame` |
| Between rows | `rule-row` |
| Between columns | `rule-col, no gap` |
| A region's header | `panel-head, --head (38px), 12px sides: name as written, then state, meta, actions` |
| A header's actions | `26px ghost icons, 8px apart: search, refresh, wrap, navigation, run, copy last` |
| A raised region on its own | `panel` |
| A gap that must be there | `dots, 20px or wider, nothing in it` |
| The start of a quote in a response | `rail; a row never draws one` |

## Scale
Every line is 1px. Rules in line-faint and line; fields, boxed controls and overlays in line too; small marks in line-control.

## Reject list
- No cell grid or dot field behind the page or content.
- No box in a box: rules inside a frame.
- No 2px rules, no coloured side bars.

## Related
- [Space](/systems/sodium/foundations/space.md): A 4px grid, 32px controls and 40px rows.
- [Elevation](/systems/sodium/foundations/elevation.md): No shadows: an overlay is the panel with a rule edge, set apart by its fill and, for a dialog, the scrim.
