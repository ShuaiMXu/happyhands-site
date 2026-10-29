---
name: Typography
system: quartz
kind: foundation
source: registry/quartz/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/quartz/foundations/typography
---

# Typography

One sans for every word, mono for what a person copies.

## Rules
1. typography-roles MUST Set text with a type-* role utility; never a raw font size or weight. Because a raw size skips the role's line height, tracking and weight, so the line sits off its neighbours.
   - Correct: `<p className="type-body">`
   - Wrong: `<p className="text-[15px] font-semibold">`
2. typography-size-not-weight MUST Make hierarchy with size; display, headings, labels and buttons are 400, running text 340. Because font-bold is 700, heavier than any role, so one bold heading outranks the page title.
   - Correct: `<h2 className="type-heading">Runs</h2>`
   - Wrong: `<h2 className="font-bold">Runs</h2>`
3. typography-fallback-width NEVER Set a font width; Quartz Sans and Quartz Mono are not bundled, so --font-sans and --font-mono render the platform UI sans and monospace at their normal width. Because a width meant for Quartz Sans lands on whatever font renders instead, and a stretched system sans overflows buttons and table heads sized for Normal.
   - Correct: `<h1 className="type-display">`
   - Wrong: `<h1 className="type-display [font-variation-settings:'wdth'_620]">`
4. typography-sentence-case MUST Write sentence case everywhere, including buttons and table heads. Because title case makes ordinary words look like proper nouns, so Refund Policy reads as a product name.
   - Correct: `<Button>Create agent</Button>`
   - Wrong: `<Button>Create New Agent</Button>`
5. typography-mono-ids MUST Set mono only for code, commands, paths, IDs and keys; give numbers the data utility for tabular figures. Because mono marks what a person copies, so a mono duration looks like an id, and data already lines figures up in the sans.
   - Correct: `<span className="type-body-sm data">2m 14s</span> <code className="type-code-sm">run_8f2a91</code>`
   - Wrong: `<span className="type-code-sm">2m 14s</span>`
6. typography-sentences-body SHOULD Set a full sentence at body-sm or larger in text-2; label-sm in text-3 is for short metadata. Because 12px at the 5:1 floor holds a word or two, and a whole sentence at that size is tiring to read.

## Tokens
| Token | Role | Use for | Not for | Light | Dark (blank: same as light) |
|-|-|-|-|-|-|
| `--font-sans` | all UI and prose: Quartz Sans where declared, else the platform UI sans | all UI and prose | code | `"Quartz Sans", ui-sans-serif, system-ui, sans-serif` |  |
| `--font-mono` | Quartz Mono where declared, else the platform monospace | code and anything copied | labels | `"Quartz Mono", ui-monospace, "SF Mono", Menlo, monospace` |  |
| `--weight-body` | Regular | running text | headings | `340` |  |
| `--weight-medium` | Medium | labels, buttons, headings | prose | `400` |  |
| `--weight-strong` | Semibold | emphasis inside prose, code keywords |  | `500` |  |
| `--width-normal` | each face's own width; Quartz Sans's Normal file has no width axis, and a "wdth" value here would stretch the fallback sans | every role |  | `normal` |  |
| `--features-data` | tabular figures, slashed zero, serif I; every duration, count and value | durations, counts, values | prose | `"tnum", "zero", "ss04"` |  |
| `--features-id` | serif I tells I, l and 1 apart | identifiers in sans |  | `"ss04"` |  |
| `--type-display-xl` | marketing hero, line-height 1.0 | marketing hero | app | `400 80px/80px var(--font-sans)` |  |
| `--type-display-lg` | section heads, line-height 1.1 | marketing section heads | app | `400 60px/66px var(--font-sans)` |  |
| `--type-display` | mobile hero, page titles with stats | page titles with stats, mobile hero | headings | `400 40px/44px var(--font-sans)` |  |
| `--type-heading-lg` | page titles | page titles | cards | `400 32px/36px var(--font-sans)` |  |
| `--type-heading` | panel and section titles | panel and section titles | labels | `400 24px/28px var(--font-sans)` |  |
| `--type-heading-sm` | subsection titles | subsection and card titles | body | `400 20px/24px var(--font-sans)` |  |
| `--type-heading-xs` | in-thread headings | in-thread headings | labels | `400 16px/20px var(--font-sans)` |  |
| `--type-body-lg` | marketing and docs prose, line-height 1.4 | marketing and docs prose | app tables | `340 16px/22px var(--font-sans)` |  |
| `--type-body` | app prose | app prose, descriptions | labels | `340 14px/20px var(--font-sans)` |  |
| `--type-body-sm` | dense meta, a step heavier than body so meta on text-3 still reads | dense meta | long prose | `380 13px/18px var(--font-sans)` |  |
| `--type-button` | default and large button label | large button labels | prose | `400 16px/20px var(--font-sans)` |  |
| `--type-label` | controls and table cells | controls, table cells, tabs | sentences | `400 14px/16px var(--font-sans)` |  |
| `--type-label-sm` | small tags, column heads | small tags, column heads | sentences | `400 12px/16px var(--font-sans)` |  |
| `--type-code` | code blocks | code blocks, logs | labels | `400 13px/20px var(--font-mono)` |  |
| `--type-code-sm` | IDs, ordinals, paths in tables | IDs, paths, inline code | durations | `400 12px/16px var(--font-mono)` |  |
| `--type-tag` | ids, methods, status codes and paths in a row or a code tag; the metrics of code-sm under its own name so the two cannot drift | row id, code tag, key tail |  | `var(--type-code-sm)` |  |
| `--type-code-display` | a code a person reads aloud or types on another device | CLI device code, recovery code |  | `400 32px/36px var(--font-mono)` |  |
| `--type-code-touch` | code typed into a field on touch; 16px so iOS WebKit does not zoom on focus (trap/touch-input-zoom) | terminal input, code inputs below 640px |  | `400 16px/22px var(--font-mono)` |  |
| `--type-stat-xl` | marketing stat numerals, tabular figures, plain sans | stat size xl |  | `400 48px/52px var(--font-sans)` |  |
| `--type-stat-lg` | hero stat in the app, tabular figures | stat size lg |  | `400 40px/44px var(--font-sans)` |  |
| `--type-stat` | app stat numerals, tabular figures | app stat numerals | prose | `400 32px/36px var(--font-sans)` |  |
| `--type-state-word` | status words, the label role in sentence case | status words | labels | `400 14px/16px var(--font-sans)` |  |
| `--tracking-display` | display sizes | display sizes | 14px and below | `-0.025em` |  |
| `--tracking-heading` | heading sizes | heading-lg, heading, heading-sm |  | `-0.015em` |  |
| `--tracking-body` | 16px text: body-lg and button | body-lg, button |  | `-0.01em` |  |
| `--tracking-text` | 14px and below, where negative tracking closes the counters | body, body-sm, label, label-sm |  | `0em` |  |
| `--code-string-alpha` | the alpha of ink in a string; the dark theme lowers it so strings part from plain code | code |  | `0.80` | `0.72` |
| `--code-comment-alpha` | the alpha of ink in a comment; --code-comment is 5.3:1 on --surface-card in both themes | code |  | `0.66` | `0.54` |
| `--code-text` | identifiers, punctuation | code |  | `var(--ink)` |  |
| `--code-string` | strings | code |  | `oklch(var(--ink-c) / var(--code-string-alpha))` |  |
| `--code-comment` | comments | code |  | `oklch(var(--ink-c) / var(--code-comment-alpha))` |  |
| `--code-prompt` | the $ in shell snippets | snippet |  | `oklch(var(--ink-c) / 0.40)` |  |

## Decision table
| You need | Use |
|-|-|
| App prose | `type-body` |
| Control or table cell | `type-label` |
| Column head or tag | `type-label-sm` |
| ID, path, command | `type-code-sm` |
| Page title | `type-heading-lg` |

## Scale
Sizes: 12, 13, 14, 16, 20, 24, 32, 40, 48, 60, 80px.

## Reject list
- No weights above 500 for hierarchy, and no all-caps text or tracked-out letters.

## Related
- [Color](/systems/quartz/foundations/color.md): Five hues name the kind of thing, and amber and red mean trouble.
- [Space](/systems/quartz/foundations/space.md): How much room goes between things, in steps of 4px.
