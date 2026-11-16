# Neuralyn

> Hero section reference for an AI or SaaS product — glass panels, React and Tailwind CSS, #000000 base and a stats row.

- 行业：AI & SaaS（ai-saas）
- 区块：Hero section
- 画布：800x590 · 比例 1.3559 · 2.3s

## 概述

Neuralyn gives an AI or SaaS product a finished first screen and the numbers that produced it. “One Clear Overview” is the line the layout is built to carry. Colour is limited to black #000000 underneath, set in Inter. Delivery is React and Tailwind CSS, captured at 800x590 so the frame is fixed before any code is written. The page keeps its motion to 0.6s transitions. Keep it open while you write: the 5,257-character brief is the part that transfers to your own page.

## 主标题文案

> Hero section reference built around “One Clear Overview”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#000000` | composition |
| Gray | `#79786F` | lightest |
| Near-black — lighter | `#010001` | panel edges |
| Near-black — lighter | `#031214` | Secondary |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | UI face |
| Instrument Serif | Weight not fixed in the brief | Accent type |

## 视觉要点

- The timing budget is state feedback rather than page choreography (0.6s), so a slower rebuild reads as a different design.
- Transitions are specified at 0.6s, short enough that the page never feels like it is waiting for an animation.
- Transitions are specified at 0.6s, which is the value to keep when the palette changes.

## 布局

**Top row: wordmark, links, one action** — The bar overlays the hero section instead of pushing it down, so the composition keeps the full height of the first screen. The bar sits over the 800x590 composition without a background of its own, so the media runs edge to edge underneath it.

**Panels carry the middle** — Where a run of copy would go, this page puts a set of panels, which is what keeps the hero section scannable. Panels share the interface face at one size, which keeps the grid from becoming a second layout.

**Navigation without a background** — Focus and hover states are specified for each link rather than inherited from the browser. Keep the row to one line.

**Measured against the viewport** — Sizes were read off the render at 800x590: 0.6s transitions. Each value maps to one job: a type step, a gap, a radius or a transition.


## 动效

**Scroll drives the composition** — Parallax is the page's single scroll behaviour, so the effect has a defined place in the composition. Because it is tied to position, the effect resolves the same way on every visit.

**Timing kept in the brief** — The animation budget is small and explicit: 0.6s, applied to state changes rather than to entrances. Easing is specified alongside the duration (0.6s), so a rebuild cannot quietly substitute a different feel. Keep the durations when you re-skin the page.


## 可替换项

- Rewrite “One Clear Overview” to the same line count; the mask reveals each line in turn.
- Retime the entrance to taste. 0.6s with a standard ease-out is what the reference uses.
- Retime the entrance to your own 0.6s, but keep a standard ease-out as the curve, because the easing is what reads as this design.
- Write the replacement headline first, then confirm it still fits the 800x590 frame at the reference's type size.

## 文案规则

**The order behind the hero section** — Where a marketing page stacks proof below the fold and hopes, this hero section puts navigation, the headline, the announcement badge, the stats row and the card grid in front of the reader and holds the rest back. A SaaS reader gets the offer before the options.

**What moves in Neuralyn** — The timing is explicit: 0.6s transitions, parallax layers and a sticky element, all of it written into the brief rather than tuned by feel. Nothing animates for its own sake in this hero section.

**What to change first in Neuralyn** — The composition is the reusable part and the subject is yours. Keep 0.6s transitions and replace the words, the media and the brand marks. The frame and the scale are what to leave alone.


## 规格

| 项 | 值 |
|---|---|
| Block | Hero section |
| Vertical | AI & SaaS |
| Viewport | 800x590 · 1.36:1 |
| Source text | 5,257 characters |
| Archived | 2026-09-17 |
| Type scale | Inter, Instrument Serif |
| Built with | Tailwind CSS, React, TypeScript |
| Animation | 0.6s transitions |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 800x590 capture before you generate.
2. Check your build against the reference measurements: 0.6s transitions.
3. Copy 0.6s transitions into your own brief before you rewrite anything else.
4. Pin the reference measurements before you restyle anything: 0.6s transitions.
5. Keep the measurements the brief spells out: 0.6s transitions.

---
来源：https://ottermind.ai/explore/website/neuralyn-hero
原始 prompt：5257 字符
