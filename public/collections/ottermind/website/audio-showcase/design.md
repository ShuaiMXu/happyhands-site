# Audio Showcase

> Hero section reference for a lifestyle brand — Helvetica, Arial, cubic-bezier(0.22, 1, 0.36, 1) easing, React and Tailwind CSS and a stats row.

- 行业：Lifestyle（lifestyle）
- 区块：Hero section
- 画布：640x474 · 比例 1.3502 · 0s

## 概述

Audio Showcase gives a lifestyle brand a finished first screen and the numbers that produced it. The page's own headline reads “Press 04. Vernal woods”, and the composition is built around those exact words. Colour is limited to blue #216CD1 underneath and gray #C7D5D5 for the type, set in Helvetica, Arial. The entry names the stack that produced the page (React and Tailwind CSS) rather than hiding it. The brief spends its motion budget on 0.7s transitions and cubic-bezier(0.22, 1, 0.36, 1). This reference is for a lifestyle brand that wants the first screen settled before the build starts.

## 主标题文案

> Hero section reference built around “Press 04. Vernal woods”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#16140A` | darkest |
| Gray | `#C7D5D5` | Headline |
| Blue | `#074FBB` | darker |
| Blue — lighter | `#216CD1` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Helvetica, Arial | Weight not fixed in the brief | Headline and interface text — one stack for the whole page |

## 视觉要点

- Motion is dropped rather than redesigned under reduced motion, so the layout is the version to check first.
- Transitions are specified at 0.7s, short enough that the page never feels like it is waiting for an animation. Transitions are specified at 0.7s, which is the value to keep when the palette changes.
- Glass surfaces use blur(4px), and the blur is what makes the panels read as material rather than as fill. The timing budget is state feedback rather than page choreography (0.7s), so a slower rebuild reads as a different design.

## 布局

**Top row: wordmark, links, one action** — The bar is one row of text and one action, measured at 20px spacing steps and 0.7s transitions so it reads as a strip rather than as a band. The bar sits over the 640x474 composition without a background of its own, so the media runs edge to edge underneath it.

**Badge above the fold** — One badge, one message: the pill sits above the headline in Helvetica, Arial at the smallest step, and nothing else competes for that slot. It is positioned so the headline keeps the centre of the composition. Keep it above the headline, never beside it.

**One row, no drawers** — Keep the row to one line. The reference was captured at 640x474.

**The spacing steps are quoted** — The brief fixes 20px spacing steps, 0.7s transitions and cubic-bezier(0.22, 1, 0.36, 1) easing and leaves the rest to the arrangement, which is the opposite of a scale that grows on its own. Every value can be checked against the captured prompt, which is what makes a rebuild verifiable rather than approximate.


## 动效

**Short, named durations** — State changes are specified at 0.7s, so the feedback on the controls is a designed value rather than a browser default. Easing is specified alongside the duration (0.7s), so a rebuild cannot quietly substitute a different feel.

**A live scene on the first screen** — The centrepiece is rendered live (a WebGL canvas) rather than shipped as an image, so the 640x474 composition reacts to the viewport instead of sitting behind it. There is no image swap in the brief, so the scene is part of the first paint.


## 可替换项

- Write the replacement headline first, then confirm it still fits the 640x474 frame at the reference's type size.
- Keep Helvetica, Arial or substitute a face with the same proportions, because the brief pairs specific weights with specific sizes.
- Load your own face beside Helvetica, Arial and compare the headline at full width before committing to the swap.
- Set 0.7s to your own build speed and check that cubic-bezier(0.22, 1, 0.36, 1) still lands the copy before the media starts.

## 文案规则

**What holds up for Lifestyle** — You could rebuild this as a stack of separate cards and lose only the argument. The hero section reads as one decision instead: navigation, the headline, the announcement badge, the stats row and the card grid in a single sequence. It gives a lifestyle reader the shortest honest route to the offer.

**How Audio Showcase sequences the first read** — Committing to one reading path means other paths are closed. The brief accepts that, fixes navigation, the headline, the announcement badge, the stats row and the card grid in place, and spends 20px spacing steps and 0.7s transitions on making the route obvious. A lifestyle reader gets the offer before the options.

**How the hero section reflows** — The hero section is composed at 640x474 and then re-composed for narrow widths. the navigation collapses into a mobile menu and the motion has a reduced-motion branch, so the phone version is a decision rather than a squeeze. Both states are described in the same brief.


## 规格

| 项 | 值 |
|---|---|
| Screen | Hero section |
| Sector | Lifestyle |
| Frame | 640x474 · 1.35:1 |
| Input brief | 6,927 characters |
| Saved | 2026-09-17 |
| Typefaces | Helvetica, Arial |
| Tools | Tailwind CSS, React, TypeScript |
| Animation | 0.7s transitions and cubic-bezier(0.22, 1, 0.36, 1) easing |

## 复刻步骤

1. Copy 20px spacing steps, 0.7s transitions and cubic-bezier(0.22, 1, 0.36, 1) easing into your own brief before you rewrite anything else.
2. Keep the measurements the brief spells out: 20px spacing steps, 0.7s transitions and cubic-bezier(0.22, 1, 0.36, 1) easing.
3. Pin the reference measurements before you restyle anything: 20px spacing steps, 0.7s transitions and cubic-bezier(0.22, 1, 0.36, 1) easing.
4. Check your build against the reference measurements: 20px spacing steps, 0.7s transitions and cubic-bezier(0.22, 1, 0.36, 1) easing.
5. Copy the 0.7s timing exactly, then rebuild the entrance before the hover states.

---
来源：https://ottermind.ai/explore/website/audio-showcase
原始 prompt：6927 字符
