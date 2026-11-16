# Neo Museum

> Landing page reference for an education or community brand — 2800ms transitions, Inter, a stats row and cubic-bezier(0.16,1,0.3,1) easing.

- 行业：Education & Community（education）
- 区块：Landing page
- 画布：640x468 · 比例 1.3675 · 0s

## 概述

Neo Museum is a working reference for an education or community brand: the landing page laid out, measured and ready to rebuild. The page's own headline reads “Step into the natural world and discover the stories written millions of years ago”, and the composition is built around those exact words. The colour scheme is white #FCFCFC underneath and black #0A0A0A for the type, and the page is set in Inter. The reference is built with React and Tailwind CSS, and the layout decisions are stated independently of it. Motion comes down to 2800ms transitions and cubic-bezier(0.16,1,0.3,1). It is most useful when the Education & Community landing page has to survive a copy change without a redesign.

## 主标题文案

> Landing page reference built around “Step into the natural world and discover the stories written millions of years ago”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#FCFCFC` | composition |
| Near-black | `#1A1A1A` | darker step |
| Near-black — darker | `#0A0A0A` | Headline |
| Deep orange | `#39332B` | Secondary |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 300 / 400 / 500 / 600 | UI face |
| JetBrains Mono | 300 / 400 / 500 / 600 | Technical |

## 视觉要点

- The type is set in Inter on a 12–15px scale, and the spacing follows the same steps.
- The display line is Inter at the top of a 12–15px scale, with the interface text on the same face.
- Transitions are specified at 2800ms, short enough that the page never feels like it is waiting for an animation.

## 布局

**Top row, one action** — A short run of links and a single action sit over the landing page, held at type from 12px to 15px and 75vh sections so the bar never competes with the composition behind it. The bar sits over the 640x468 composition without a background of its own, so the media runs edge to edge underneath it.

**Figures as typography** — A compact stats strip carries the claims that would otherwise need a paragraph, which keeps the landing page from turning into a feature list. The row is aligned to the same margin as the headline above it.

**Badge above the fold** — One badge, one message: the pill sits above the headline in Inter at the smallest step, and nothing else competes for that slot. The pill sits at the smallest step in the brief, so it reads as a label rather than as a second title. Keep it above the headline, never beside it.

**Top row: wordmark, links, one action** — Give the wordmark no more room than its type needs. The reference was captured at 640x468.


## 动效

**One duration for the controls** — State changes are specified at 2800ms, so the feedback on the controls is a designed value rather than a browser default. The quoted timing covers state changes, so the feedback is the part of the motion that is specified.

**The stat counts on entry** — Figures count up as they enter the viewport, set in Inter at the display size. The count is short enough to read as a reveal rather than as a loading state.


## 可替换项

- Rewrite “Step into the natural world and discover the stories written millions of years ago” to the same line count; the mask reveals each line in turn.
- Replace “Step into the natural world and discover the stories written millions of years ago” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.
- Retime the entrance to taste. 2800ms with cubic-bezier(0.16,1,0.3,1) is what the reference uses.
- Swap in your own headline where “Step into the natural world and discover the stories written millions of years ago” sits and keep the line breaks, because the entrance animates per line.

## 文案规则

**How the landing page reflows** — When the copy is long, the narrow layout breaks first. Here a clamp between 12px and 15px absorbs the change, and the section is held at 75vh and the navigation collapses into a mobile menu. Width changes the measurements, not the reading path.

**The argument this landing page makes** — There is one promise on this page, and type from 12px to 15px and 75vh sections hold it in place. The page says it out loud: “Step into the natural world and discover the stories written millions of years ago”. Nothing below the fold is asked to carry the offer as well. Neo Museum states the offer once and lets the composition repeat it rather than adding a second claim.

**The order behind the landing page** — Read the first screen in one pass and the offer is already clear. navigation, the headline, the announcement badge, the stats row and the background clip arrive in sequence, separated by type from 12px to 15px and 75vh sections rather than by decorative dividers. A education reader gets the offer before the options.


## 规格

| 项 | 值 |
|---|---|
| Page part | Landing page |
| Category | Education & Community |
| Format | 640x468 · 1.37:1 |
| Prompt text | 15,036 characters |
| Saved | 2026-09-17 |
| Type scale | Inter, JetBrains Mono · 12–15px |
| Reference stack | Tailwind CSS, React, TypeScript |
| Motion | 2800ms transitions and cubic-bezier(0.16,1,0.3,1) easing |

## 复刻步骤

1. Pin the reference measurements before you restyle anything: type from 12px to 15px, 75vh sections and 10px spacing steps.
2. Check your build against the reference measurements: type from 12px to 15px, 75vh sections and 10px spacing steps.
3. Copy type from 12px to 15px, 75vh sections and 10px spacing steps into your own brief before you rewrite anything else.
4. Keep the measurements the brief spells out: type from 12px to 15px, 75vh sections and 10px spacing steps.
5. Rebuild the motion last and keep the 2800ms entrance; the hover and scroll states come after it.

---
来源：https://ottermind.ai/explore/website/neo-museum
原始 prompt：15036 字符
