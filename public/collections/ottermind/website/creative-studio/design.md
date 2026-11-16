# Creative Studio

> Landing page reference for an agency or studio — Inter, #F3F3F3 base, 0.1s transitions and React and Tailwind CSS.

- 行业：Agencies & Studios（creative）
- 区块：Landing page
- 画布：640x462 · 比例 1.3853 · 0s

## 概述

Creative Studio gives an agency or studio a finished first screen and the numbers that produced it. “Creative Studios Built Around Elevating Your Vision Into Striking Reality” is the line the layout is built to carry. Colour is limited to white #F3F3F3 underneath and indigo #5E0ED7 for the type, set in Inter. The build is React and Tailwind CSS; every measurement in it is written down, which is what makes it reusable. Motion is limited to 0.1s transitions. Use it as the reference when you are building an agency or studio landing page and want a finished composition instead of a starting point.

## 主标题文案

> “Creative Studios Built Around Elevating Your Vision Into Striking Reality” — the whole landing page is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Indigo | `#5E0ED7` | Headline |
| Muted indigo | `#52455C` | darker step |
| White | `#F7F7F7` | lightest |
| White — darker | `#F3F3F3` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- Transitions are specified at 0.1s, which is the value to keep when the palette changes.
- The timing budget is state feedback rather than page choreography (0.1s), so a slower rebuild reads as a different design.
- Transitions are specified at 0.1s, short enough that the page never feels like it is waiting for an animation.

## 布局

**A navigation bar that gets out of the way** — A slim bar sits over the landing page with the wordmark on the left and the links set in Inter, so the composition reads as content first and chrome second. A mobile overlay takes over below the tablet breakpoint. The bar sits over the 640x462 composition without a background of its own, so the media runs edge to edge underneath it.

**One scale for type and frame** — The layout is solved against fixed values (10px spacing steps and 0.1s transitions), which is what keeps the first screen composed at any width. The frame proportions are recorded with the sizes, so a rebuild gets the aspect right as well.

**Navigation without a background** — The mobile menu is part of the brief, so the collapsed state is designed rather than improvised. Design the collapsed state before adding a sixth link.

**The sizes are in the brief, not in a scale** — Spacing is quoted the same way (10px spacing steps and 0.1s transitions), not as a scale that grows on its own.


## 动效

**Durations from the brief** — One duration covers the interactions (0.1s), which is what keeps hover and press reading as one system. Easing is specified alongside the duration (0.1s), so a rebuild cannot quietly substitute a different feel.

**Almost no motion** — There is no scroll library here: the 640x462 composition holds still and only the elements that respond to you move. There is no animation library in the brief, which keeps the rebuild small.


## 可替换项

- Rewrite “Creative Studios Built Around Elevating Your Vision Into Striking Reality” to the same line count; the mask reveals each line in turn.
- Draft the new copy to the 640x462 frame, then check that the entrance still lands on the same number of lines.
- Write the replacement headline first, then confirm it still fits the 640x462 frame at the reference's type size.
- Swap in your own headline where “Creative Studios Built Around Elevating Your Vision Into Striking Reality” sits and keep the line breaks, because the entrance animates per line.

## 文案规则

**The argument this landing page makes** — Most agency pages add another section when the first screen is weak. This one removes options instead: navigation, the headline, the stats row, the card grid and the feature list, in that order, and nothing that repeats the offer. It gives a agency reader the shortest honest route to the offer.

**What to change first in Creative Studio** — Suppose you only have one afternoon. Change the headline and the action label, leave 10px spacing steps and 0.1s transitions alone, and you have a page that looks intentional. The composition is the reusable part, and it survives a different brand.

**The timing behind the landing page** — Copy the pattern rather than the values: keep 0.1s transitions and let your own brand set the durations. Nothing animates for its own sake in this landing page.


## 规格

| 项 | 值 |
|---|---|
| Page part | Landing page |
| Industry | Agencies & Studios |
| Canvas | 640x462 · 1.39:1 |
| Prompt text | 5,481 characters |
| Archived | 2026-09-17 |
| Faces | Inter |
| Tech stack | Tailwind CSS, React, Framer Motion |
| Transitions | 0.1s transitions |

## 复刻步骤

1. Copy 10px spacing steps and 0.1s transitions into your own brief before you rewrite anything else.
2. Check your build against the reference measurements: 10px spacing steps and 0.1s transitions.
3. Keep the measurements the brief spells out: 10px spacing steps and 0.1s transitions.
4. Pin the reference measurements before you restyle anything: 10px spacing steps and 0.1s transitions.
5. Rebuild the motion last and keep the 0.1s entrance; the hover and scroll states come after it.

---
来源：https://ottermind.ai/explore/website/creative-studio
原始 prompt：5481 字符
