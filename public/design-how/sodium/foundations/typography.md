---
name: Typography
system: sodium
kind: foundation
source: registry/sodium/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/sodium/foundations/typography
---

# Typography

Mono capitals for the interface, Inter Display for headlines and prose, one weight.

## Rules
1. typography-roles MUST Set text with a type-* role; never a raw size, weight, line height or tracking. Because a role carries its size, line, case and tracking together, and a raw size sits off the lines beside it.
   - Correct: `<p className="type-body">`
   - Wrong: `<p className="text-[15px] leading-6">`
2. typography-caps-through-roles MUST Set interface words (buttons, tabs, tags, table heads, axes) in a label role: type-label, type-label-sm, type-label-lg or type-micro. Write the words in sentence case in the source; the role sets the capitals. Because the role carries the mono face, the capitals and the opened tracking together, so a hand-set uppercase class gets the case without the tracking and crowds.
   - Correct: `<span className="type-label-sm">Queued</span>`
   - Wrong: `<span className="uppercase tracking-widest">Queued</span>`
3. typography-sans-for-sentences NEVER Set a headline, a sentence or a description in a label role; mono capitals are for words a person scans, not reads. Because a sentence in capitals reads slowly and shouts, and the sans is what makes the mono labels stand apart.
   - Correct: `<p className="type-body">The backfill wrote 1,204 partitions.</p>`
   - Wrong: `<p className="type-label">The backfill wrote 1,204 partitions.</p>`
4. typography-mono-roles MUST Set code, logs and values as written in type-code or type-code-sm; set mono inside a sentence of sans with mono or <code>, at 0.85 of the text around it. Never font-mono on its own. Because Commit Mono is 22% wider than Inter Display a to z, so at the sans size an ID inside a sentence reads a size bigger than the words around it.
   - Correct: `<p className="type-body">Job <code>job_8f2a91</code> failed</p>`
   - Wrong: `<p className="type-body">Job <span className="font-mono">job_8f2a91</span> failed</p>`
5. typography-one-weight NEVER Set a weight above 400 in either face; make hierarchy with size, case and colour. Because both faces ship one cut, Regular, so a bold class makes the browser fake a bold that smears the strokes.
   - Correct: `<h2 className="type-heading">`
   - Wrong: `<h2 className="type-heading font-semibold">`
6. typography-three-voices MUST Choose the role by what the words are. Labels are mono capitals (button text and status words at their control's size, column heads and field and stat labels in type-label-sm); IDs, names, paths, counts, durations and sizes are mono as written (a region header's name and a value in type-code, header, footer or row meta in type-code-sm); prose is the sans (FrameDescription, type-body-sm). Because a reader learns three voices once and then knows what a word is before reading it: capitals name a place, mono as written is a thing to compare or copy, the sans is a thing to read.
   - Correct: `<TableCell mono>{run.pipeline}</TableCell>  <span className="type-code">1.2M</span>`
   - Wrong: `<TableCell>{run.pipeline}</TableCell>  <span className="type-heading-sm">1.2M</span>`
7. typography-figures SHOULD Set a number in a cell, a strip, a meter or a block in type-code like any value; keep type-figure for the one KPI a chart frame leads with. Because the mono column is the ledger, and a sans number beside mono ones reads as a different kind of thing.

## Tokens
| Token | Role | Use for | Not for | Light |
|-|-|-|-|-|
| `--font-sans` | headlines, prose and big numbers | title, heading, body, figure |  | `"Inter Display", "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif` |
| `--font-mono` | the interface voice and code: labels, buttons, tabs, tags, axes, table heads, IDs | label roles, code roles |  | `"Commit Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace` |
| `--mono-scale` | mono inside a sentence of sans, at this share of the size around it: Commit Mono is 22% wider than Inter Display a to z | mono inside a sentence of sans | labels, code blocks | `0.85` |
| `--weight-normal` | every word in both faces; hierarchy is size, case and colour | all text |  | `400` |
| `--type-display` | a hero headline, on a cover or an introduction | display |  | `400 56px/1.02 var(--font-sans)` |
| `--type-title` | the page title | page title |  | `400 32px/1.1 var(--font-sans)` |
| `--type-heading` | a section or dialog title | section, dialog title |  | `400 24px/1.2 var(--font-sans)` |
| `--type-heading-sm` | a subsection or panel title in sans | panel title, empty state title |  | `400 18px/1.3 var(--font-sans)` |
| `--type-figure` | a big number with tabular figures | KPI value, meter readout |  | `400 40px/1 var(--font-sans)` |
| `--type-body` | paragraphs | paragraphs, descriptions | controls | `400 15px/24px var(--font-sans)` |
| `--type-body-sm` | dense paragraphs, a field's text | field, card description, hint |  | `400 14px/20px var(--font-sans)` |
| `--type-caption` | a sentence of meta under a row | row description, footnote |  | `400 13px/18px var(--font-sans)` |
| `--type-label-lg` | a large control's label, in capitals | large button |  | `400 14px/20px var(--font-mono)` |
| `--type-label` | the interface voice, in capitals: a control, a tab, a table head | buttons, tabs, table heads | sentences | `400 13px/16px var(--font-mono)` |
| `--type-label-sm` | a small control or a tag, in capitals | small buttons, tags, tab indices | sentences | `400 12px/16px var(--font-mono)` |
| `--type-micro` | an axis, a tick or a micro caption, in capitals | axes, ticks, frame captions | controls | `400 11px/14px var(--font-mono)` |
| `--type-code` | code, logs and values read as written, not in capitals, and a region header's name | code, logs, values, a region header's name | labels | `400 13px/20px var(--font-mono)` |
| `--type-code-sm` | an ID or a value beside a label, as written | table ID, key tail, status value |  | `400 12px/16px var(--font-mono)` |
| `--tracking-display` | the hero headline | display |  | `-0.04em` |
| `--tracking-title` | titles | title, figure |  | `-0.035em` |
| `--tracking-heading` | headings | heading, heading-sm |  | `-0.025em` |
| `--tracking-body` | prose: the display cut sets tight on its own | body, body-sm, caption |  | `0em` |
| `--tracking-label` | mono capitals at 13px: opened so capitals do not crowd | label |  | `0.05em` |
| `--tracking-label-lg` | mono capitals at 14px | label-lg |  | `0.04em` |
| `--tracking-label-sm` | mono capitals at 12 and 11px, opened a step more as they shrink | label-sm, micro |  | `0.06em` |

## Decision table
| You need | Use |
|-|-|
| The fonts | `Commit Mono and Inter Display, both OFL, both at 400, shipped with the theme (ADR 0011)` |
| A button, a tab, a table head | `type-label` |
| A tag or a small control | `type-label-sm` |
| A name in a chart: an axis tick, a lane, a block, a step | `type-micro` |
| A paragraph | `type-body` |
| An ID inside a sentence | `mono or <code>` |
| A field, column or stat label (Workers, Rows, Credits) | `type-label-sm` |
| An ID, a name or a number as a value: a cell, a list, a strip, a meter, a block | `type-code` |
| Meta in a header, a footer or after a row (02:14 UTC, Updated 2m ago) | `type-code-sm` |
| The sentence that opens a frame's body | `FrameDescription, type-body-sm` |
| A block of code or logs | `type-code on the well` |
| A KPI number | `type-figure` |

## Scale
Sans: 13, 14, 15, 18, 24, 32, 40, 56px. Mono capitals: 11, 12, 13, 14px. Mono as written: 12, 13px. Mono inside sans: 0.85 of it.
One weight, 400. Headlines track tight (-0.025 to -0.04em), prose at 0, mono capitals open (+0.04 to +0.06em).

## Reject list
- No bold, no weights above 400.
- No capitals outside the label roles, no sentence in capitals.
- No mono at the sans size inside a sentence.

## Related
- [Color](/systems/sodium/foundations/color.md): White and warm near-black, rules for structure, and one sodium yellow that changes how it shows by theme.
- [Space](/systems/sodium/foundations/space.md): A 4px grid, 32px controls and 40px rows.
