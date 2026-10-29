---
name: Space
system: glaze
kind: foundation
source: registry/glaze/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/glaze/foundations/space
---

# Space

A 4px grid, 32px controls and 36px rows.

## Rules
1. space-grid MUST Take every gap, padding and size from the 4px scale (p-1 is 4px, gap-2 is 8px) or a token; a 2px half step only inside a control. Because a hand-picked 13px puts one box off the grid and every edge beside it reads crooked.
   - Correct: `<div className="gap-3 p-3">`
   - Wrong: `<div className="gap-[13px] p-[10px]">`
2. space-control-heights MUST Size a one-line control from --control-sm (26px), --control (32px) or --control-lg (36px), and a row from --row (36px). Because a control at its own height stops lining up with the pills beside it and with the 36px rows it sits in.
   - Correct: `<div className="field">  // --control, 32px`
   - Wrong: `<div className="h-[30px] rounded-pill field">`
3. space-shell-inset MUST Keep a card panel --shell-inset (3px) inside its shell; it is the one value off the grid. Because the 14px shell less the 3px gap is the 11px panel, so the corners stay concentric only at that inset.
   - Correct: `<div className="shell"><div className="panel">`
   - Wrong: `<div className="shell p-2"><div className="panel">`
4. space-compact SHOULD Pack tight: 8px between controls in a row, 12px inside a panel, 16px between groups, 24px between sections. Because Glaze is compact, and a 24px gap inside a card reads as two cards.
5. space-touch SHOULD Give a small control on a touch screen room around it, 8px or more to its neighbours, rather than a bigger size. Because a 26px pill is below the 44px target, and space keeps a wrong tap off the button beside it.

## Tokens
| Token | Role | Use for | Not for | Light |
|-|-|-|-|-|
| `--space-0-5` | an optical nudge | icon offset |  | `2px` |
| `--space-1` | the grid's step: icon to label in a tag | the grid step: icon to label in a tag | between controls | `4px` |
| `--space-1-5` | icon to label inside a control | button, chip |  | `6px` |
| `--space-2` | between controls in a row | between controls in a row | inside a panel | `8px` |
| `--space-3` | a panel's padding, a field's text inset | inside a panel, a field's text inset | between sections | `12px` |
| `--space-4` | between groups in a form | form, section gap |  | `16px` |
| `--space-5` | a dialog's padding | dialog |  | `20px` |
| `--space-6` | between sections | page section |  | `24px` |
| `--space-8` | between page regions | page |  | `32px` |
| `--space-10` | a page's top padding | page |  | `40px` |
| `--shell-inset` | the gap between a card's shell and its panel: the 14px shell less the 11px panel | the card panel inside its shell | anything else | `3px` |
| `--shell-foot-inset` | the gap between the shell's edge and a footer action: the panel's 3px read as cramped beside a pill | a card footer's actions from the panel and the shell's edges | the panel inset | `6px` |
| `--control-sm` | a small control | button sm, chip, footer action |  | `26px` |
| `--control` | the default control | button, input, select, segmented control |  | `32px` |
| `--control-lg` | a large control | button lg, prompt input field |  | `36px` |
| `--row` | one row of a list, menu or table | table row, item, menu item |  | `36px` |
| `--icon-sm` | an icon in a small control or a tag | button sm, badge |  | `12px` |
| `--icon` | an icon in a control | button, input, menu item |  | `14px` |
| `--icon-lg` | an icon in a large control or on its own | button lg |  | `16px` |
| `--overlay-sm` | a small dialog | alert dialog |  | `400px` |
| `--overlay` | the default dialog and sheet width | dialog, sheet |  | `480px` |
| `--overlay-lg` | a wide dialog: a preview, the command palette | dialog lg, command palette |  | `640px` |
| `--popover` | a popover's width | popover |  | `288px` |
| `--toast` | a toast's width on a wide screen; full width less the gutter on a phone | toast |  | `360px` |
| `--menu-min` | the narrowest a menu opens | dropdown menu, select |  | `192px` |
| `--menu-row` | one row of a menu or a command list, a step under --row | menu item, command item |  | `32px` |
| `--menu-row-sm` | one row of a small menu, opened from a small control | menu item sm |  | `28px` |
| `--popup-max` | the tallest a list popup grows before it scrolls | select, combobox, menu |  | `320px` |
| `--tooltip-max` | a tooltip's line length before it wraps | tooltip |  | `256px` |
| `--label-col` | the widest a label column grows before its labels wrap | data list, horizontal field |  | `160px` |
| `--progress-bar-sm` | a small progress bar or meter, in a row or a card footer | progress sm |  | `4px` |
| `--progress-bar` | the thickness of a progress bar or a meter | progress |  | `6px` |
| `--progress-bar-lg` | a large progress bar, the one task on a screen | progress lg |  | `8px` |
| `--progress-sweep` | the length of the segment that slides along an indeterminate bar | progress indeterminate |  | `32%` |
| `--measure` | a paragraph's longest line | prose, message |  | `68ch` |
| `--measure-hint` | a description or hint's longest line | field hint, card description |  | `60ch` |

## Decision table
| You need | Use |
|-|-|
| Between buttons in a footer | `gap-2 (8px)` |
| Inside a card panel | `p-3 (12px)` |
| Inside a control: label padding, icon gap | `a 2px half step: px-3.5, gap-1.5` |
| A default control | `--control, 32px` |
| A list or table row | `--row, 36px` |

## Scale
Steps: 4, 8, 12, 16, 20, 24, 32, 40px, with 2 and 6px half steps inside controls only. Controls 26, 32, 36px. Rows 36px. Icons 12, 14, 16px.

## Reject list
- No arbitrary px values, no 44px desktop controls.

## Related
- [Radius](/systems/glaze/foundations/radius.md): Pills for every one-line control, 14 and 11 for the card, 10 for overlays, 6 for tags.
- [Typography](/systems/glaze/foundations/typography.md): Glaze Sans for every word, Glaze Mono at 0.8 of the text around it.
