# Vize Footer

> Footer reference for an AI or SaaS product — #31A8FF accent, #000000 base, a stats row and a dark stage.

- 行业：AI & SaaS（ai-saas）
- 区块：Footer
- 画布：1838x1350 · 比例 1.3615 · 0s

## 概述

Vize Footer is a SaaS footer built from one written brief, and this page documents that brief. The colour scheme is black #000000 underneath and bright blue #31A8FF carrying the accents, and the page is set in Inter. Delivery is React and Tailwind CSS, captured at 1838x1350 so the frame is fixed before any code is written. It is the right reference for an AI or SaaS product footer that has to look deliberate on the first screen.

## 主标题文案

> Footer reference built on black #000000 and bright blue #31A8FF, set in Inter and measured against type from 14px to 26px.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Muted blue | `#64748B` | lighter |
| Deep blue | `#1E293B` | lighter step |
| Bright blue | `#31A8FF` | accent |
| Near-black | `#000000` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 14–26px | Headline and interface text — one face for the whole page |

## 视觉要点

- The display line is Inter at the top of a 14–26px scale, with the interface text on the same face.
- Font roles are assigned rather than mixed here, and 14–26px is the range the whole scale works in.
- The accent is spent on bright blue #31A8FF and the rest of the composition holds black #000000.

## 布局

**One scale for type and frame** — Sizes were read off the render at 1838x1350: type from 14px to 26px and 10px spacing steps. The frame proportions are recorded with the sizes, so a rebuild gets the aspect right as well. Keep the values that look arbitrary.

**Figures at display size** — Statistics are handled as typography: figures at the display size, labels at the smallest step in the brief, all of it on #31A8FF or the ink colour rather than a coloured card. The figures carry the #31A8FF accent while everything around them stays on the ink colour.

**Cards do the structuring** — The grid is the structure: panels of the same size, set in Inter, arranged so the eye moves across rather than down. Panel heights are driven by the copy, so a longer line does not break the alignment of the row. Cut a panel before you shrink the type.

**The brief names the steps** — Spacing is quoted the same way (type from 14px to 26px and 10px spacing steps), not as a scale that grows on its own.


## 动效

**Hover, but sparingly** — Interaction is local to each control here (hover states on the buttons and links rather than on every card), so nothing on the page moves as a side effect. A control that looks interactive behaves interactively, so there are no false affordances.

**Static by design** — This one is delivered as a still composition at 1838x1350, so the hierarchy has to work without motion, and it does. Only the elements that respond to the pointer move.


## 可替换项

- Write the replacement headline first, then confirm it still fits the 1838x1350 frame at the reference's type size.
- Change #31A8FF for your brand accent and re-check it against #000000, because the accent is the only saturated value in this composition.
- Keep the supporting line as short as the reference's and measure the pair against the 1838x1350 crop.
- Replace #31A8FF last, after the copy is final, and test it against #000000 at the smallest text size on the page.

## 文案规则

**Making the footer yours** — The trade-off is recognisability. Keep too much of Vize Footer and the page reads as someone else's; keep the numbers and change the content and it reads as yours. Rewrite the display line before you touch the colour.

**The order behind the footer** — The footer has a stated reading path. From there the eye takes the stats row, the card grid, the feature list and the footer in sequence, which is what keeps a single screen from reading as a list. A SaaS reader gets the offer before the options.

**The timing behind the footer** — Where a template animates every section on entry, this one animates hover and press states and then holds. Nothing animates for its own sake in this footer.


## 规格

| 项 | 值 |
|---|---|
| Screen | Footer |
| Industry | AI & SaaS |
| Frame | 1838x1350 · 1.36:1 |
| Brief | 7,734 characters |
| Capture date | 2026-09-17 |
| Accent tone | bright blue #31A8FF |
| Type scale | Inter · 14–26px |
| Stack | Tailwind CSS, React, TypeScript |
| Transitions | state changes only |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1838x1350 capture before you generate.
2. Drop your product name in, then replace #31A8FF with your own accent and re-check the contrast.
3. Set the brand first: product name, the #31A8FF accent and a headline that replaces the reference's.
4. Type the product name and the #31A8FF accent before you touch the layout.
5. Set your brand first: product name, the #31A8FF accent and the headline that replaces the reference's.

---
来源：https://ottermind.ai/explore/website/vize-footer
原始 prompt：7734 字符
