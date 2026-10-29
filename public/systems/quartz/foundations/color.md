---
name: Color
system: quartz
kind: foundation
source: registry/quartz/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/quartz/foundations/color
---

# Color

Frost: cold navy ink on icy paper, cards on a cool fog canvas. Five cold hues name the kind of thing, and amber and red mean trouble.

## Rules
1. color-hue-is-a-noun MUST Give each kind one hue everywhere: agent, key, run, deploy and model, in that order. Always show the word. Because a person learns cyan as agent once and reads it on every screen, and the word carries the kind in grayscale and aloud.
   - Correct: `<Badge kind="deploy"/>`
2. color-warm-is-trouble NEVER Use amber or red for anything but warn and fail; no kind, chart series or decoration is warm. Because an operator scanning for trouble stops on every warm mark, so a warm Beta tag reads as a failing run.
   - Correct: `<Status status="warn">Retrying</Status>`
   - Wrong: `<Badge className="bg-amber-200">Beta</Badge>`
3. color-set-kind-attribute MUST Set data-kind or data-status on a panel and read --accent-wash and --accent-line; never name a hue in a component. Because a hard-coded hue skips the dark theme value and keeps its color when the kind changes.
   - Correct: `<section data-kind="run"><Row className="bg-accent-wash"/></section>`
   - Wrong: `<Row className="bg-[var(--hue-3-wash)]"/>`
4. color-no-hue-fills NEVER Fill a tile, icon, section, card or header with a hue; hue goes in a kind label, a chart line or the selected row. Because a hue names a kind, so a filled section makes everything inside it look like that kind.
   - Correct: `<Section><Badge kind="agent"/></Section>`
   - Wrong: `<Section className="bg-accent-field">`
5. color-ink-text MUST Set text in --text-1 to --text-3 (ink at 100, 80, 66%); --text-disabled is for disabled controls only. A disabled ink fill (the primary Button) has no grey to turn, so the whole key fades to --dim-opacity instead. Because text-3 is the 5:1 floor, and a palette grey like gray-500 falls under it on the grey card and in the dark theme.
   - Correct: `<p className="text-text-2">`
   - Wrong: `<p className="text-gray-500">`
6. color-ink-fill MUST Fill with ink only the primary Button (one per view) and a control that is checked, such as a checkbox, radio or switch. Mark what waits on a person with the soft label, InkSlot, which is a grey fill with ink text. Because the primary button is the one thing to do next, and an ink header or kind tile takes that place from it.
   - Correct: `<InkSlot>Waiting on you</InkSlot>`
   - Wrong: `<h2 className="bg-ink text-text-inverse">Runs</h2>`
7. color-selection-wash MUST Mark selection with --accent-wash, or the neutral selected fill, and keep the wash on hover. Because a selected row that swaps to the hover fill looks deselected under the pointer.
   - Correct: `data-selected:bg-accent-wash`
8. color-line-step MUST Draw a 2px line or ring in a hue with the line step, --accent-line. Because the mark step is a fill that falls under 3:1 on paper, and only the line step clears 3:1 for a stroke.
   - Correct: `className="stroke-accent-line"`
   - Wrong: `stroke="var(--hue-3-mark)"`
9. color-surface-attr SHOULD Use data-surface (card, raised, overlay, paper, ink, inverse) to name what an element is painted as. Because nested tokens recompute from it, so text and lines inside keep their contrast.
   - Correct: `<div data-surface="inverse" className="bg-page text-text-1">`

## Tokens
| Token | Role | Use for | Not for | Light | Dark (blank: same as light) |
|-|-|-|-|-|-|
| `--warn-mark` | amber: degraded, slow, retrying; 9.4:1 with --text-on-field; warm, so never a kind | warn chip |  | `oklch(80% 0.152 68)` |  |
| `--warn-field` | warn field, 12.9:1 with --text-on-field | warn banner, warn toast |  | `oklch(89% 0.056 68)` |  |
| `--warn-wash` | warn wash, 16.1:1 with --text-1 | warn row |  | `oklch(96% 0.028 68)` | `oklch(31% 0.055 68)` |
| `--warn-line` | warn line, 3.7:1 on --surface-page, 3.3:1 on --surface-card | warn series, warn outline |  | `oklch(62% 0.132 68)` | `var(--warn-mark)` |
| `--fail-mark` | red: errored, crashed, 5xx; 5.1:1 with --text-on-field; warm, so never a kind | destructive button |  | `oklch(65.2% 0.219 26)` |  |
| `--fail-field` | fail field, 10.2:1 with --text-on-field | fail banner, fail toast |  | `oklch(82% 0.055 26)` |  |
| `--fail-wash` | fail wash, 15.3:1 with --text-1 | fail row, invalid field |  | `oklch(94.5% 0.027 26)` | `oklch(29% 0.060 26)` |
| `--fail-line` | fail line, 4.4:1 on --surface-page, 3.9:1 on --surface-card | fail series, fail outline |  | `oklch(60% 0.236 26)` | `var(--fail-mark)` |
| `--warn-text` | warn word, 6.4:1 on --surface-page, 5.6:1 on --surface-card | warn word | kinds | `oklch(49% 0.100 68)` | `oklch(80% 0.130 68)` |
| `--fail-text` | fail word, 6.3:1 on --surface-page, 5.6:1 on --surface-card | fail word, error text | kinds | `oklch(51% 0.180 26)` | `oklch(76% 0.140 26)` |
| `--text-1` | primary text, and the only text on marks and fields | primary text | disabled | `var(--ink)` |  |
| `--text-2` | secondary text, 9.6:1 on --surface-page, 8.9:1 on --surface-card | descriptions, meta | headings | `oklch(var(--ink-c) / 0.80)` |  |
| `--text-3` | tertiary text, 5.8:1 on --surface-page, 5.5:1 on --surface-card, the floor for readable text | timestamps, captions, the floor | essential labels | `oklch(var(--ink-c) / 0.66)` |  |
| `--text-disabled` | disabled controls only, never required text | disabled controls | required text | `oklch(var(--ink-c) / 0.40)` |  |
| `--text-inverse` | text on inverse surfaces | primary button, tooltip |  | `var(--paper)` |  |
| `--text-on-field` | text on any hue field or mark; fixed dark in both themes | field section, icon chip |  | `oklch(var(--text-on-field-c))` |  |
| `--accent-mark` | default when no kind is set | small solid fills | regions | `var(--ink)` |  |
| `--accent-field` | default field | section field |  | `var(--surface-card)` |  |
| `--accent-wash` | default selection wash, distinct from hover | selected row, focused panel | hover | `var(--surface-selected)` |  |
| `--accent-tint` | default label ground, neutral | kind label |  | `var(--surface-selected)` |  |
| `--accent-label` | default label word, ink | kind label |  | `var(--text-1)` |  |
| `--accent-line` | default chart line and outline; a kind sets its line step | chart line, outline | fills | `var(--ink)` |  |
| `--accent-on-field` | text on the accent field: ink by default, dark on a hue in both themes | field section, banner |  | `var(--text-1)` |  |

## Category hues tokens
Read only through their classes; never set or read them in a component.
`--hue-1-mark`, `--hue-1-field`, `--hue-1-wash`, `--hue-1-line`, `--hue-1-tint`, `--hue-1-label`, `--hue-2-mark`, `--hue-2-field`, `--hue-2-wash`, `--hue-2-line`, `--hue-2-tint`, `--hue-2-label`, `--hue-3-mark`, `--hue-3-field`, `--hue-3-wash`, `--hue-3-line`, `--hue-3-tint`, `--hue-3-label`, `--hue-4-mark`, `--hue-4-field`, `--hue-4-wash`, `--hue-4-line`, `--hue-4-tint`, `--hue-4-label`, `--hue-5-mark`, `--hue-5-field`, `--hue-5-wash`, `--hue-5-line`, `--hue-5-tint`, `--hue-5-label`

## Button tokens
Read only through their classes; never set or read them in a component.
`--button-primary`, `--key-primary-body`, `--key-primary-body-hover`, `--key-primary-edge`, `--key-primary-edge-press`, `--key-primary-sheen`, `--key-secondary-body`, `--key-secondary-body-hover`, `--key-secondary-edge`, `--key-secondary-edge-press`, `--key-secondary-sheen`, `--button-primary-hover`, `--button-secondary`, `--button-secondary-hover`, `--button-ghost`, `--button-ghost-hover`, `--surface-disabled`, `--ring-thumb`

## Contrast
[The table on the human page](https://design.how/systems/quartz/foundations/color#contrast).

## Decision table
| You need | Use |
|-|-|
| Body text | `--text-1` |
| Hint or caption | `--text-3` |
| Label for a kind | `<Badge kind/>` |
| Selected row | `--accent-wash` |
| Chart line for a kind | `--accent-line` |
| Trouble word | `--warn-text or --fail-text` |
| Grey field | `--surface-card` |

## Scale
Kinds in slot order: agent cyan, key orchid, run blue, deploy violet, model mint. All cold: warm hues are kept for trouble.
Text on every mark is 5:1 or better, on every field and wash 7.5:1, and every line step is 3:1 on paper and the grey card.

## Reject list
- No raw hex, rgb or Tailwind palette colors.
- No hue fills, gradients or warm kinds.

## Related
- [Typography](/systems/quartz/foundations/typography.md): One sans for every word, mono for what a person copies.
- [Borders and lines](/systems/quartz/foundations/borders-and-lines.md): Grey fields keep things apart, and hairlines go only where a field cannot.
