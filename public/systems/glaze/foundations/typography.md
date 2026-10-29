---
name: Typography
system: glaze
kind: foundation
source: registry/glaze/tokens.css
last-updated: 2026-10-26
human: https://design.how/systems/glaze/foundations/typography
---

# Typography

Glaze Sans for every word, Glaze Mono at 0.8 of the text around it, 12px in a block.

## Rules
1. typography-roles MUST Set text with a type-* role; never a raw size, weight or line height. Because a role carries its size, line height, weight and tracking together, and a raw size sits off the lines beside it.
   - Correct: `<p className="type-body">`
   - Wrong: `<p className="text-[15px] font-semibold leading-6">`
2. typography-mono-scale MUST Set mono inside text with mono or a code element, at 0.8 of the text around it, and mono beside sans with type-code, type-code-sm or type-code-xs. Set a block of code, JSON or logs in type-code-block, 12px, unscaled. Because Glaze Mono's lowercase is 26% wider than Glaze Sans's at one size, so mono at the sans size reads a size bigger than the words around it; a block has no words around it, and at 0.8 its lines fall to 10px and strain.
   - Correct: `<p className="type-body-sm">Run <span className="mono">run_8f2a91</span> passed</p>`
   - Wrong: `<p className="type-body-sm">Run <span className="font-mono">run_8f2a91</span> passed</p>`
3. typography-mono-line NEVER Give inline mono its own line height, padding or vertical-align. Because mono that grows its box pushes the line open, and the paragraph's rhythm breaks at every ID.
   - Correct: `<code>run_8f2a91</code>`
   - Wrong: `<code className="px-1 py-0.5 leading-5">run_8f2a91</code>`
4. typography-mono-for-code MUST Use mono only for code, commands, paths, IDs and keys; give numbers the data utility for tabular figures. Because mono marks what a person copies, so a mono duration looks like an ID.
   - Correct: `<span className="data">2m 14s</span>`
   - Wrong: `<span className="mono">2m 14s</span>`
5. typography-one-cut MUST Make hierarchy with size, tracking and colour through the type-* roles; keep 600 for a short strong phrase and never on a title or heading. Because Glaze Sans sets every word, titles included, in one Regular cut (400 and 500 land on it), so a 600 title reads heavy beside the glass and a raw weight lands on a cut the system never chose.
   - Correct: `<h2 className="type-heading">Evals</h2>`
   - Wrong: `<h2 className="font-semibold">Evals</h2>`
6. typography-sentence-case MUST Write sentence case everywhere, buttons and table heads included. Because title case makes ordinary words read as product names.
   - Correct: `<Button>Run eval</Button>`
   - Wrong: `<Button>Run New Eval</Button>`

## Tokens
| Token | Role | Use for | Not for | Light |
|-|-|-|-|-|
| `--font-sans` | every word | all text |  | `"Glaze Sans", "Geist", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif` |
| `--font-mono` | code, IDs, keys and paths | code, kbd, IDs |  | `"Glaze Mono", "Geist Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace` |
| `--mono-scale` | mono at this share of the sans it sits in or beside, so it never looks bigger; never a block of code | mono in or beside a line of sans | a block of code, JSON or logs | `0.8` |
| `--weight-normal` | running text | body, caption |  | `400` |
| `--weight-medium` | labels, controls and headings: the same cut as text in Glaze Sans, a step up in a fallback | label, button, heading |  | `500` |
| `--weight-semibold` | small strong emphasis inside prose, never a title | strong |  | `600` |
| `--type-title` | the page title |  |  | `500 28px/1.2 var(--font-sans)` |
| `--type-heading` | a section or dialog title | section, dialog title |  | `500 20px/1.3 var(--font-sans)` |
| `--type-heading-sm` | a subsection or card title at its largest | subsection, empty state title |  | `500 16px/1.35 var(--font-sans)` |
| `--type-body` | paragraphs, 1.5 | paragraphs, messages | controls | `400 14px/1.5 var(--font-sans)` |
| `--type-body-sm` | dense paragraphs and descriptions | card description, field hint |  | `400 13px/1.5 var(--font-sans)` |
| `--type-label` | controls and labels, 1.35 | controls, labels, card titles | paragraphs | `500 13px/1.35 var(--font-sans)` |
| `--type-label-sm` | a small control, a tag, a column head | small button, badge, table head |  | `500 12px/1.35 var(--font-sans)` |
| `--type-label-lg` | a large control | large button |  | `500 14px/1.35 var(--font-sans)` |
| `--type-caption` | meta beside a value | meta beside a value, footer meta | sentences that must be read | `400 12px/1.35 var(--font-sans)` |
| `--type-code` | standalone mono beside body text: 11.2px | shell prompt, a code line in a sentence's place |  | `400 calc(14px * var(--mono-scale))/1.5 var(--font-mono)` |
| `--type-code-sm` | standalone mono beside body-sm or a label: 10.4px | table IDs, key tails |  | `400 calc(13px * var(--mono-scale))/1.5 var(--font-mono)` |
| `--type-code-xs` | standalone mono beside a caption: 9.6px | footer meta, row IDs |  | `400 calc(12px * var(--mono-scale))/1.35 var(--font-mono)` |
| `--type-code-block` | a block of code read line by line, with no sans beside it to match: 12px on a 20px line | code block, JSON view, log lines | an ID in a sentence or a row | `400 12px/20px var(--font-mono)` |
| `--tracking-heading` | titles and headings | title, heading, heading-sm |  | `-0.025em` |
| `--tracking-body` | body and captions: the display cut sets tight on its own, so text takes no tracking | body, caption |  | `0em` |
| `--tracking-label` | labels and controls, opened a touch as in the reference button | label, button, menu item |  | `0.02em` |

## Decision table
| You need | Use |
|-|-|
| The fonts | `Glaze Sans and Glaze Mono, declared on design.how only; Geist and Geist Mono, then the platform faces, where they are not` |
| A paragraph | `type-body` |
| A control or a label | `type-label` |
| Meta beside a value | `type-caption` |
| An ID inside a sentence | `mono (or <code>)` |
| A code block, a JSON tree or log lines | `type-code-block on code-surface` |
| An ID in a table row | `type-code-sm` |
| A page title | `type-title` |

## Scale
Sans: 12, 13, 14, 16, 20, 28px. Mono beside sans: 0.8 of it, 9.6, 10.4, 11.2px. Mono in a block: 12px on a 20px line.
Line height 1.35 for UI, 1.5 for paragraphs, 1.2 to 1.3 for headings.

## Reject list
- No Semibold titles, no weights above 600, no capitals, no tracked-out letters.
- No mono at the sans size.

## Related
- [Color](/systems/glaze/foundations/color.md): Ink and paper with greys as ink at alphas, and colour only for status.
- [Space](/systems/glaze/foundations/space.md): A 4px grid, 32px controls and 36px rows.
