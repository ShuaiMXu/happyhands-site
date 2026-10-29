---
name: Space
system: sodium
kind: foundation
source: registry/sodium/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/sodium/foundations/space
---

# Space

A 4px grid, one 12px inset for every region, 38px headers, 32px controls and 40px rows.

## Rules
1. space-grid MUST Take every gap, padding and size from the 4px scale (p-1 is 4px, gap-2 is 8px) or a token. A 2px half step goes only inside a control or a row, and --head (38px) is the one measured size off the grid. Because a hand-picked 13px puts one edge off the grid, and in a system drawn with rules every crooked edge shows.
   - Correct: `<div className="gap-3 p-3">`
   - Wrong: `<div className="gap-[13px] p-[10px]">`
2. space-control-heights MUST Size a one-line control from --control-sm (26px), --control (32px) or --control-lg (36px), a row from --row (40px) or --row-sm (32px), and a region header from --head (38px). Because a 40px row holds a 32px control with 4px above and below and a 36px one with 2px, so rows and controls line up across a table and its toolbar.
   - Correct: `<div className="field">  // --control, 32px`
   - Wrong: `<div className="h-[34px] field">`
3. space-shared-rules MUST Put columns that sit side by side on one shared rule with no gap (rule-col); where a gap must exist, make it 20px or more and fill it with dots. Because a 4px or 8px gap between two framed columns draws a double line, and nobody can tell which edge belongs to which column.
   - Correct: `<div className="frame flex"><div className="rule-col">…</div><div className="rule-col">…</div></div>`
   - Wrong: `<div className="flex gap-2"><div className="frame">…</div><div className="frame">…</div></div>`
4. space-one-inset MUST Keep 12px (--inset) between a region's edge and the nearest thing you see: the header's name and last icon glyph, the body and footer on all four sides (p-inset), a dialog's and a sheet's too, a table's first and last cell, log and code lines, tool-call rows, status-strip cells. A selected row keeps its text where it was: a wash, never a start border that pushes it in. Because text that starts on one edge from the header down reads as one column; in the 38px header the name's ink sits 12.4 to 13.6px from the side and 11.3 to 13.9px from the top and the rule, measured, so the header reads as even as the body under it, where the 8px inset of 2026-10-25 made every body cramped.
   - Correct: `<FrameBody>  // p-inset, 12px, the header's inset`
   - Wrong: `<FrameBody className="p-2">  // 8px: cramped under the header`
5. space-compact SHOULD Pack tight: 8px between controls in a row, 12px between items inside a body, 16px between groups, 24px between sections, 32px between page regions. Because Sodium is a dense tool, and space beyond that reads as a new section when the rules already say where one starts.
6. space-touch SHOULD Give a small control on a touch screen room around it, 8px or more to its neighbours, rather than a bigger size. Because a 26px control is below the 44px target, and space keeps a wrong tap off the one beside it.

## Tokens
| Token | Role | Use for | Not for | Light |
|-|-|-|-|-|
| `--space-0-5` | an optical nudge | icon offset |  | `2px` |
| `--space-1` | the grid's step | tag, tab index box |  | `4px` |
| `--space-1-5` | icon to label inside a control | button, tag |  | `6px` |
| `--space-2` | between controls in a row, label to value, between a header's icon buttons | between controls in a row, between a header's icon buttons | a region's inset | `8px` |
| `--space-3` | a button's text inset, between items inside a body, between table columns; a field and a menu row take --field-inset | a button's text inset, between items in a body, between table columns | a region's inset (--inset) or a field's (--field-inset) | `12px` |
| `--space-4` | between groups inside a body, an overlay's inset | popover, field group |  | `16px` |
| `--space-5` | the narrowest dot gutter, between steps in a tool-call stack | dots, tool-call stack |  | `20px` |
| `--space-6` | between sections, a dialog's inset | section, dialog |  | `24px` |
| `--space-8` | between page regions | page |  | `32px` |
| `--space-10` | a page's top padding | page |  | `40px` |
| `--inset` | a region's one inset, from its edge to the nearest thing you see: header sides, body and footer on all four sides, a table's first and last cell, log and code lines, a tool-call row's header and body, a status-strip cell, a data list's sides | a region's one inset: header sides, body, footer, table edge cells, log and code lines, tool-call rows, status-strip cells | a field's text inset | `12px` |
| `--control-sm` | a small control | button sm, tag button, toolbar action |  | `26px` |
| `--control` | the default control | button, input, select, tab |  | `32px` |
| `--control-lg` | a large control: a page's one main action, 2px clear of a row's rules each side | button lg, input lg, select lg |  | `36px` |
| `--row` | one row of a list, table or tool-call stack | table row, list row, tool-call row |  | `40px` |
| `--row-sm` | one row of a dense list or a menu, a table's column-head row | menu item, table head, dense table, small tool-call row |  | `32px` |
| `--head` | a region header's height, measured, not on the 4px grid: a 13px name's ink sits 12 to 14px from the top and 11 to 14px over the rule, against 12 to 14px from the side on the 12px inset | a region header: frame, table title, log viewer, code window, framed chart | rows and toolbars | `38px` |
| `--icon` | an icon in a control: the set is drawn at 16 | button, input, menu item |  | `16px` |
| `--icon-sm` | an icon inside a small field beside its 12 or 13px text, so the glyph spans the caps, not a line and a half | input sm, select sm, filter cell |  | `14px` |
| `--marker` | a small square mark: a status square, a chart head, a legend key | status, chart, meter |  | `8px` |
| `--cap` | the cap height of the text around it, Commit Mono and Inter Display alike | a status mark beside a value |  | `0.7em` |
| `--rail` | the width of a perforated rail at a quote's start | response quote |  | `12px` |
| `--field-inset` | the text inset of a 32px field, measured: the first glyph's ink 11.5px in against the caps 11.3px from top and bottom | a 32px field's and a menu row's text inset, measured; -sm 7px at 26, -lg 11px at 36 | a glyph or a key cap in a field: it takes (size - its height) / 2 | `10px` |

## Decision table
| You need | Use |
|-|-|
| Region header (panel-head): height, sides, name to meta | `h --head (38px), px-inset (12px), gap-3 (12px)` |
| Header icon buttons | `--control-sm (26px) ghost, gap-2 (8px), pulled 5px out so the last glyph sits on the 12px inset` |
| Region body (FrameBody) | `p-inset (12px) all round, gap-3 (12px) between items` |
| Region footer (Frame, Table, Chart) | `p-inset (12px) all round, gap-2 (8px) between buttons` |
| Table cells | `first ps-inset, last pe-inset (12px); between columns ps-3 (12px)` |
| Table rows | `head --row-sm (32px), body --row (40px), size sm --row-sm (32px)` |
| Toolbar row under a header (Table, LogViewer) | `min-h --row (40px), px-inset (12px), py-1.5, gap-2 (8px)` |
| Log line | `px-inset (12px), gap-3 (12px) between cells; the list py-inset (12px)` |
| Code line (CodeWindow, CodeBlock) | `gutter: the digits plus px-inset (12px) each side; line pe-inset; body py-inset (12px)` |
| Tool-call row header | `min-h --row (40px) or --row-sm, px-inset (12px), gap-3 (12px)` |
| Tool-call row body | `p-inset (12px) all round, gap-3 (12px)` |
| Between steps in a tool-call stack | `gap-5 (20px), room for the tab above each box` |
| Status-strip cell | `p-inset (12px), gap-0.5 label to value` |
| Data-list row | `min-h --row (40px), py-2.5; framed px-inset (12px); label to value gap-x-6 (24px)` |
| Field inset: Input, Select, Combobox, Textarea | `text --field-inset: 10px at 32, 7 at 26, 11 at 36; a glyph, key cap or caret (size - its height) / 2; Textarea 10px, py-1.5` |
| Button padding | `sm px-2.5 (10px) at 26px, default px-3 (12px) at 32px, lg px-4 (16px) at 36px; icon to label gap-1.5` |
| Menu, Select or Combobox list | `no popup padding; rows --row-sm (32px), text on --field-inset (10px), a glyph (32 - 16) / 2 = 8px in, icon gap-2 (8px)` |
| Command list | `rows --row (40px) on --inset (12px), the search row's, so icons sit under its glyph` |
| Prompt input | `controls 26px, p-1.5 (6px) inside the edge; text on Attach's glyph ink, pt-2` |
| Popover | `p-4 (16px), gap-3 (12px); a toggletip p-3 (12px)` |
| Dialog and Sheet header | `panel-head: h --head (38px), px-inset (12px); the X a 26px ghost in panel-head-actions` |
| Dialog and Sheet body and footer | `p-inset (12px) all round; body gap-3 (12px), rows py-2.5 with the first and last flush; footer gap-2 (8px)` |
| Between controls in a row | `gap-2 (8px)` |
| Between groups in a body | `gap-4 (16px)` |
| Between sections | `gap-6 (24px); between page regions --space-8 (32px)` |

## Scale
Steps: 4, 8, 12, 16, 20, 24, 32, 40px, with 2, 6 and 10px half steps inside controls and rows. Inset 12px. Header 38px. Controls 26, 32, 36px. Rows 40 and 32px. Icons 14, 16 and 20px.

## Reject list
- No arbitrary px values.
- No 8px region inset: it made every body cramped.
- No small gaps between framed columns: a shared rule, or a dot gutter of 20px or more.

## Related
- [Radius](/systems/sodium/foundations/radius.md): Zero, everywhere.
- [Borders and lines](/systems/sodium/foundations/borders-and-lines.md): Rules divide content; a frame is a region's one outer edge.
- [Elevation](/systems/sodium/foundations/elevation.md): No shadows: an overlay is the panel with a rule edge, set apart by its fill and, for a dialog, the scrim.
