# Fun 404 Page

> 404 page reference for an education or community brand — 500ms transitions, a stats row, fluid type and React and Tailwind CSS.

- 行业：Education & Community（education）
- 区块：404 page
- 画布：1664x1248 · 比例 1.3333 · 10.042s

## 概述

Before rebuilding a 404 page for an education or community brand, read Fun 404 Page: the composition and the specification behind it are both here. The page's own headline reads “Oops, something went wrong!”, and the composition is built around those exact words. The colour scheme is bright orange #FF8233 underneath, and the page is set in Inter. Delivery is React and Tailwind CSS, captured at 1664x1248 so the frame is fixed before any code is written. Motion is limited to 500ms transitions, cubic-bezier(0.16,1,0.3,1) and a looping video bed. Start from the captured brief, then edit the 404 page rather than rebuilding it from scratch.

## 主标题文案

> “Oops, something went wrong!” — the whole 404 page is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Bright orange | `#F16524` | darker |
| White | `#FFFFFF` | lightest |
| Bright orange — lighter | `#FF8233` | composition |
| Orange | `#FDAC55` | lighter |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- Media is specified at 1664x1248 and a 10s loop, so a replacement should match the crop and the loop length.
- Nothing sits between the type and the 1664x1248 clip, so a replacement has to work under the copy directly.
- The clip is one asset at 1664x1248 and a 10s loop, so the composition has a single media dependency.

## 布局

**A bar with nothing spare** — A short run of links and a single action sit over the 404 page, held at 22vh sections and 200px spacing steps so the bar never competes with the composition behind it. The bar sits over the 1664x1248 composition without a background of its own, so the media runs edge to edge underneath it.

**A grid, not a text run** — The grid does the reading order for you: panels of equal weight, one idea each, set in Inter at a small size so the structure stays visible. Spacing between panels is one value, which is what keeps a dense grid from looking crowded.

**Links before the action** — The mobile menu is part of the brief, so the collapsed state is designed rather than improvised. Give the wordmark no more room than its type needs.

**Measured against the viewport** — The layout works on absolute values rather than ratios: 22vh sections, 200px spacing steps, 500ms transitions and cubic-bezier(0.16,1,0.3,1) easing. Each value maps to one job: a type step, a gap, a radius or a transition.


## 动效

**The whole animation budget** — Every state change in the specification has a duration attached: transitions settle around 500ms on cubic-bezier(0.16,1,0.3,1). Nothing is left at the browser default, which is why the page feels authored rather than animated. One value is reused across the controls, so their timing cannot drift apart.

**Feedback on the controls** — The interactive layer is small and predictable: hover states on the buttons and links rather than on every card. Everything else stays still, which keeps the emphasis on the composition. The states are named in the brief, so the page does not depend on a hover-effect library. Keep the interactive layer small.


## 可替换项

- Swap in your own headline where “Oops, something went wrong!” sits and keep the line breaks, because the entrance animates per line.
- Swap the clip for your own. Export at 1664x1248 or wider, keep it muted, and make the 10s loop seamless so the cut is invisible.
- Keep the supporting line as short as the reference's and measure the pair against the 1664x1248 crop.
- Swap the clip for your own footage at 1664x1248 or wider, keep it muted, and match the 10s loop point.

## 文案规则

**How the 404 page reflows** — Responsive here means the scale changes, not the hierarchy: the scale is fluid rather than stepped, the section is held at 22vh and the navigation collapses into a mobile menu. Text stays above the fold, controls stay large enough to tap, and reduced motion is honoured. Width changes the measurements, not the reading path.

**How Fun 404 Page sequences the first read** — A feature-led layout lists what the product does; this one routes the reader to a single decision. The route is visible in navigation, the announcement badge, the stats row, the card grid and the background clip and in how 22vh sections and 200px spacing steps space them. A education reader gets the offer before the options.

**What to change first in Fun 404 Page** — Where a theme hands you components, this brief hands you a composition: 22vh sections, 200px spacing steps, 500ms transitions and cubic-bezier(0.16,1,0.3,1) easing and a media frame, with the subject left to you. Set the new copy at the same display size and re-check the contrast before you add anything.


## 规格

| 项 | 值 |
|---|---|
| Screen | 404 page |
| Vertical | Education & Community |
| Viewport | 1664x1248 · 1.33:1 |
| Loop | 10s loop |
| Prompt | 6,085 characters |
| Saved | 2026-09-17 |
| Fonts | Inter |
| Built with | Tailwind CSS, React, TypeScript |
| Animation | 500ms transitions, cubic-bezier(0.16,1,0.3,1) easing and a 10s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1664x1248 capture before you generate.
2. Copy 22vh sections, 200px spacing steps and 500ms transitions into your own brief before you rewrite anything else.
3. Check your build against the reference measurements: 22vh sections, 200px spacing steps and 500ms transitions.
4. Pin the reference measurements before you restyle anything: 22vh sections, 200px spacing steps and 500ms transitions.
5. Keep the measurements the brief spells out: 22vh sections, 200px spacing steps and 500ms transitions.

---
来源：https://ottermind.ai/explore/website/fun-404-page
原始 prompt：6085 字符
