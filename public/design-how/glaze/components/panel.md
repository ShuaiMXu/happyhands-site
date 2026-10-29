---
name: Panel
system: glaze
kind: component
import: "import {Panel, panelVariants} from '@/components/glaze/ui/panel'"
install: "npx shadcn@latest add https://design.how/r/glaze/panel.json"
registryDependencies: [theme, utils]
version: 1
last-updated: 2026-10-26
human: https://design.how/systems/glaze/components/panel
---

# Panel

Holds a few rows inside a card.

## Use when
- A short list of rows on the page, such as API keys or members, with no header of its own.
- A second panel in one Card shell: the prompt above its output.
- A few read-only facts beside a form.

## Don't use when
- The group has a title, a description or a footer. Use [Card](/systems/glaze/components/card.md).
- Rows with media, meta and actions. Use [Item](/systems/glaze/components/item.md).
- Code or output. Use [Code block](/systems/glaze/components/code-block.md).

## Minimal example
```tsx
<Panel padding="none">
  {keys.map(k => <div key={k.id} className="rule-row px-3">{k.name}</div>)}
</Panel>
```

## Rules
Ordered by priority. MUST and NEVER break the system if skipped. SHOULD is style.

1. panel-no-nesting NEVER Put a Panel inside a Card's panel or inside another Panel. Because a box in a box stacks two faint edges, and nobody can tell which group a line closes.
   - Correct: `<Card><Panel>...</Panel><Panel>...</Panel></Card>`
   - Wrong: `<Card><CardContent><Panel>...</Panel></CardContent></Card>`
2. panel-rows-flush MUST Set padding="none" on a Panel that holds rows, and give each row rule-row and px-3. Because padding inside the edge leaves the rules floating short of it, and rule-row drops the last rule where the edge closes the list.
   - Correct: `<Panel padding="none">{rows.map(r => <div className="rule-row px-3">...</div>)}</Panel>`
   - Wrong: `<Panel>{rows.map(r => <div className="border-b">...</div>)}</Panel>`
3. panel-in-shell MUST Put two panels in one frame as direct children of Card, never in a hand-drawn shell. Because Card keeps them 3px apart and 3px from the shell, so the corners stay concentric.
   - Correct: `<Card><Panel/><Panel/></Card>`
   - Wrong: `<div className="shell"><Panel/><Panel/></div>`
4. panel-flat NEVER Fill a Panel with glass, a tint or a shadow. Because the panel is the quiet paper every row and value sits on, and glass marks only what is pressed.
   - Correct: `<Panel>`
   - Wrong: `<Panel className="glass glass-paper shadow-sm">`
5. panel-list-role MUST Give a Panel of rows role="list" and each row role="listitem", or render a ul and li inside it. Because a plain div of rows is read as one run of text, with no count and no way to jump between them.
   - Correct: `<Panel padding="none" role="list" aria-label="API keys"><div role="listitem">...</div></Panel>`
6. panel-short SHOULD Keep a Panel to about eight rows; past that, use a table with its own scroll and filter. Because a panel never scrolls inside, so a long list pushes the page.

## API
| Prop | Type | Default | Note |
|-|-|-|-|
| `padding` | `'default' \| 'none'` | `'default'` | 12px inside, or none for rows that run to the edge. |
Other props pass through to the div.

## Variants and states
- padding: default, none
- states: rest

## Accessibility
- [ ] Panel is a plain div; give a list of rows role="list" and a label, or a ul inside.
- [ ] Text on it uses text-1 and text-2, 11.9:1 and 5.5:1 on paper.
- [ ] Forced colours draw the edge as CanvasText.

## Edge cases
- One row -> rule-row drops the only rule; the panel's edge closes it.
- Rows taller than 36px -> They grow; the rule stays at the bottom of each.
- Narrow at 390 -> The panel fills its column; hide a row's meta before its name truncates.
- Dark theme -> Paper turns a step lighter than the page and the edge stays faint.

## Tokens
--paper, --line-faint, --radius-panel, --space-3, --row, --text-1, --text-2

## Related
- [Card](/systems/glaze/components/card.md): Groups content about one thing.
- [Item](/systems/glaze/components/item.md): Shows one thing as a row in a list.
- [Data list](/systems/glaze/components/data-list.md): Lists label and value pairs about one thing.
