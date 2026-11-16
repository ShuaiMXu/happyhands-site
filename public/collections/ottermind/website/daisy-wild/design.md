# Daisy Wild

> Landing page reference for an ecommerce brand — fluid type, scroll-triggered reveals, cubic-bezier(0.22, 1, 0.36, 1) easing and a 640x476 frame.

- 行业：Ecommerce（ecommerce）
- 区块：Landing page
- 画布：640x476 · 比例 1.3445 · 0s

## 概述

Daisy Wild is the landing page reference for an ecommerce brand, and the brief behind it is a full build spec rather than a mood board. The page's own headline reads “`), the note LABELS (”, and the composition is built around those exact words. The palette is lime #BDE84F underneath and black #000000 for the type. Delivery is React and Tailwind CSS, captured at 640x476 so the frame is fixed before any code is written. Motion comes down to 1400ms transitions and cubic-bezier(0.22, 1, 0.36, 1). This reference is for an ecommerce brand that wants the first screen settled before the build starts.

## 主标题文案

> Landing page reference built around “`), the note LABELS (”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#000000` | Headline |
| Lime | `#BDE84F` | composition |
| White | `#D9D9D9` | surface |
| White — lighter | `#FFFFFF` | lightest |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Face not specified | Sizes and weights only | The brief fixes the type scale but leaves the face to the build |

## 视觉要点

- Transitions are specified at 1400ms, short enough that the page never feels like it is waiting for an animation.
- Transitions are specified at 1400ms, which is the value to keep when the palette changes.
- The timing budget is state feedback rather than page choreography (1400ms), so a slower rebuild reads as a different design.

## 布局

**Values you can check** — The brief names the numbers: 16px spacing steps, 1400ms transitions and cubic-bezier(0.22, 1, 0.36, 1) easing. That is why the composition holds together, because there is no invented spacing step between the type and the frame. Each value maps to one job: a type step, a gap, a radius or a transition.

**A stat row instead of a claim** — A compact stats strip carries the claims that would otherwise need a paragraph, which keeps the landing page from turning into a feature list. The accent is spent on the figures that make a claim, not on the row as a whole.

**Structure in one screen** — The landing page is built so the copy lands before anything else: the type carries the hierarchy, the 640x476 frame holds the composition, and the supporting values stay quiet. The page is one composition at 640x476, which is why it holds together when the copy changes.

**The spacing steps are quoted** — Spacing is quoted the same way (16px spacing steps, 1400ms transitions and cubic-bezier(0.22, 1, 0.36, 1) easing), not as a scale that grows on its own.


## 动效

**Durations from the brief** — Motion in the controls is short and repeatable: 1400ms on each state change. The quoted timing covers state changes, so the feedback is the part of the motion that is specified.

**Feedback on the controls** — The pointer work is small and specified: hover states on the buttons and links rather than on every card, applied to the elements that already look interactive. The states are named in the brief, so the page does not depend on a hover-effect library.


## 可替换项

- Retime the entrance to taste. 1400ms with cubic-bezier(0.22, 1, 0.36, 1) is what the reference uses.
- Change the copy first, then the accent, then the media: the 640x476 frame was solved in that order and reversing it costs a re-layout.
- Swap in your own headline where “`), the note LABELS (” sits and keep the line breaks, because the entrance animates per line.
- Hold the 640x476 frame when you swap the content; the composition was solved against that ratio and a wider export pushes the type off.

## 文案规则

**The order behind the landing page** — When a ecommerce reader lands on a single screen, they scan before they read. The layout answers that: the stats row and the background clip are sized to be scanned, with 16px spacing steps and 1400ms transitions keeping each stop distinct. A ecommerce reader gets the offer before the options.

**What holds up for Ecommerce** — When you brief a ecommerce landing page, the hard part is deciding what the first screen refuses to say. Daisy Wild answers that in advance: one display line, the stats row and the background clip behind it. It gives a ecommerce reader the shortest honest route to the offer.

**What to change first in Daisy Wild** — A straight substitution has a limit: if your product needs a different hierarchy, 16px spacing steps and 1400ms transitions will fight it. Change the order first in that case, and the values second. The frame and the scale are what to leave alone.


## 规格

| 项 | 值 |
|---|---|
| Block | Landing page |
| Category | Ecommerce |
| Viewport | 640x476 · 1.34:1 |
| Source text | 10,292 characters |
| Captured | 2026-09-17 |
| Tech stack | Tailwind CSS, React, TypeScript |
| Motion spec | 1400ms transitions and cubic-bezier(0.22, 1, 0.36, 1) easing |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 640x476 capture before you generate.
2. Copy 16px spacing steps, 1400ms transitions and cubic-bezier(0.22, 1, 0.36, 1) easing into your own brief before you rewrite anything else.
3. Keep the measurements the brief spells out: 16px spacing steps, 1400ms transitions and cubic-bezier(0.22, 1, 0.36, 1) easing.
4. Check your build against the reference measurements: 16px spacing steps, 1400ms transitions and cubic-bezier(0.22, 1, 0.36, 1) easing.
5. Pin the reference measurements before you restyle anything: 16px spacing steps, 1400ms transitions and cubic-bezier(0.22, 1, 0.36, 1) easing.

---
来源：https://ottermind.ai/explore/website/daisy-wild
原始 prompt：10292 字符
