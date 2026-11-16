# USD Halo

> Landing page reference for a fintech product — Inter, #F5F5F5 base, a moving marquee and a stats row.

- 行业：Fintech（fintech）
- 区块：Landing page
- 画布：458x800 · 比例 0.5725 · 6.09s

## 概述

This is the landing page from USD Halo, published with the brief that produced it rather than as a screenshot. “An automated, reward-powered digital dollar built for native passive earnings and effortless connection into DeFi” is the line the layout is built to carry. Colour is limited to white #F5F5F5 underneath and deep indigo #2B2644 for the type, set in Inter. Delivery is React and Tailwind CSS, captured at 458x800 so the frame is fixed before any code is written. Use it as the reference when you are building a fintech product landing page and want a finished composition instead of a starting point.

## 主标题文案

> “An automated, reward-powered digital dollar built for native passive earnings and effortless connection into DeFi” — the whole landing page is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#F5F5F5` | composition |
| Deep indigo | `#2B2644` | Headline |
| Muted blue | `#454063` | darker step |
| White — lighter | `#FDFDFD` | lightest |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 13–16px | Headline and interface text |
| Matter | 13–16px | Secondary copy, captions and labels |

## 视觉要点

- The type is set in Inter on a 13–16px scale, and the spacing follows the same steps.
- Font roles are assigned rather than mixed here, and 13–16px is the range the whole scale works in.
- The display line is Inter at the top of a 13–16px scale, with the interface text on the same face.

## 布局

**Top row: wordmark, links, one action** — The bar overlays the landing page instead of pushing it down, so the composition keeps the full height of the first screen. The bar sits over the 458x800 composition without a background of its own, so the media runs edge to edge underneath it. Design the collapsed state before adding a sixth link.

**Every measurement is written down** — The layout is solved against fixed values (type from 13px to 16px, 100vh sections and 15px spacing steps), which is what keeps the first screen composed at any width. Each value maps to one job: a type step, a gap, a radius or a transition.

**Labels under the figures** — A compact stats strip carries the claims that would otherwise need a paragraph, which keeps the landing page from turning into a feature list. Labels sit under the figures at the smallest step in the brief, so the row reads as data rather than decoration.

**The grid sets the order** — The grid is the structure: panels of the same size, set in Inter, arranged so the eye moves across rather than down. Panel order is the reading order, so nothing depends on position cues. Keep the reading order the panel order.


## 动效

**Interaction kept local** — The page answers only where it can be acted on: hover states on the buttons and links rather than on every card. Because the states are simple, they port into any component system.

**Continuous horizontal motion** — A marquee runs across the composition on an endless loop, set in Inter, so the page has movement even where nothing animates on scroll. Because the strip is decorative, it can be paused or dropped without changing the layout.


## 可替换项

- Keep the supporting line as short as the reference's and measure the pair against the 458x800 crop.
- Keep 458x800 for the media and re-crop your own asset into it rather than resizing the frame.
- Write the replacement headline first, then confirm it still fits the 458x800 frame at the reference's type size.
- Replace “An automated, reward-powered digital dollar built for native passive earnings and effortless connection into DeFi” with your own line and keep the word count, because the entrance is timed per line.

## 文案规则

**How the landing page reflows** — When the copy is long, the narrow layout breaks first. Here a clamp between 13px and 16px absorbs the change, and the section is held at 100vh. The narrow layout is a decision rather than a squeeze, and the hierarchy survives it.

**What to change first in USD Halo** — When you drop your own media in, keep the crop and the layer order. The media is a still at 458x800. That placement is what keeps the copy legible. The frame and the scale are what to leave alone.

**Reading USD Halo as a spec** — The brief is a specification. It states type from 13px to 16px, 100vh sections and 15px spacing steps, and it names the media frame at 458x800 before anything is designed around it. Nothing in this landing page depends on a default.


## 规格

| 项 | 值 |
|---|---|
| Page section | Landing page |
| Industry | Fintech |
| Frame | 458x800 · 0.57:1 |
| Prompt text | 8,531 characters |
| Archived | 2026-09-17 |
| Type scale | Inter, Matter · 13–16px |
| Built with | Tailwind CSS, React, TypeScript |
| Motion spec | state changes only |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 458x800 capture before you generate.
2. Copy type from 13px to 16px, 100vh sections and 15px spacing steps into your own brief before you rewrite anything else.
3. Pin the reference measurements before you restyle anything: type from 13px to 16px, 100vh sections and 15px spacing steps.
4. Check your build against the reference measurements: type from 13px to 16px, 100vh sections and 15px spacing steps.
5. Keep the measurements the brief spells out: type from 13px to 16px, 100vh sections and 15px spacing steps.

---
来源：https://ottermind.ai/explore/website/halo-usd-landing
原始 prompt：8531 字符
