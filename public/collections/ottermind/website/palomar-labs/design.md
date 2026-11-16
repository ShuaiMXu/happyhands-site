# Palomar Labs

> Landing page reference for an AI or SaaS product — glass panels, looping video, React and Tailwind CSS and 240ms transitions.

- 行业：AI & SaaS（ai-saas）
- 区块：Landing page
- 画布：1920x1422 · 比例 1.3502 · 6.667s

## 概述

Palomar Labs gives an AI or SaaS product a finished first screen and the numbers that produced it. The colour scheme is white #F5F3EF underneath and deep green #2D3A2E for the type, and the page is set in Montserrat. Delivery is React and Tailwind CSS, captured at 1920x1422 so the frame is fixed before any code is written. Motion is confined to 240ms transitions, cubic-bezier(0.16, 1, 0.3, 1) and a looping video bed. Keep it open while you write: the 7,574-character brief is the part that transfers to your own page.

## 主标题文案

> Landing page reference for an AI or SaaS product, captured at 1920x1422 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#FAF8F5` | lightest |
| Deep green | `#2D3A2E` | Headline |
| Muted green | `#3D5A3E` | surface |
| White — darker | `#F5F3EF` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Montserrat | Weight not fixed in the brief | UI face |
| Raleway | Weight not fixed in the brief | Copy face |
| Playfair Display | Weight not fixed in the brief | Display lines — the editorial voice of the page |

## 视觉要点

- Transitions are specified at 240ms, short enough that the page never feels like it is waiting for an animation.
- The clip is one asset at 1920x1422 and a 6.7s loop, so the composition has a single media dependency.
- Transitions are specified at 240ms, which is the value to keep when the palette changes.

## 布局

**The nav is deliberately thin** — Navigation is a single row with no second level under it. A mobile overlay takes over below the tablet breakpoint. The bar sits over the 1920x1422 composition without a background of its own, so the media runs edge to edge underneath it. Give the wordmark no more room than its type needs.

**The sizes are in the brief, not in a scale** — The brief names the numbers: 20px spacing steps, 240ms transitions and cubic-bezier(0.16, 1, 0.3, 1) easing. That is why the composition holds together, because there is no invented spacing step between the type and the frame. The list is short enough that a reviewer can check it element by element.

**Numbered lines do the work** — The features are set as a list in Montserrat rather than as a wall of cards. Items share one size and one marker, which keeps a long list scannable.

**A navigation bar that gets out of the way** — The mobile menu is part of the brief, so the collapsed state is designed rather than improvised. Keep the row to one line.


## 动效

**Pointer states, nothing more** — Feedback is limited to hover states on the buttons and links rather than on every card, which is what keeps a dense first screen from feeling busy. Because the states are simple, they port into any component system. Do not animate layout on hover.

**Timing kept in the brief** — Every state change in the specification has a duration attached: transitions settle around 240ms using cubic-bezier(0.16, 1, 0.3, 1). Nothing is left at the browser default, which is why the page feels authored rather than animated. Short timings are why the page reads as authored; a slow default would undo the composition.


## 可替换项

- Write the replacement headline first, then confirm it still fits the 1920x1422 frame at the reference's type size.
- Change the copy first, then the accent, then the media: the 1920x1422 frame was solved in that order and reversing it costs a re-layout.
- Retime the entrance to taste. 240ms with cubic-bezier(0.16, 1, 0.3, 1) is what the reference uses.
- Keep 1920x1422 for the media and re-crop your own asset into it rather than resizing the frame.

## 文案规则

**The numbers behind the landing page** — When a rebuild drifts, the spacing goes first. Palomar Labs avoids that by publishing 20px spacing steps, 240ms transitions and cubic-bezier(0.16, 1, 0.3, 1) easing with the composition. Nothing in this landing page depends on a default.

**What moves in Palomar Labs** — A preset animation library would give you more movement than this. The brief asks for less: 240ms transitions, a 6.7s media loop and hover and press states, and nothing decorative on top. Nothing animates for its own sake in this landing page.

**Why this composition works for SaaS** — Suppose your media is louder than your copy. That is the case this composition is built for. The media is a 6.7s 1920x1422 loop. The frame stays quiet and 20px spacing steps and 240ms transitions keep the reader on the text. Palomar Labs states the offer once and lets the composition repeat it rather than adding a second claim.


## 规格

| 项 | 值 |
|---|---|
| Section | Landing page |
| Industry | AI & SaaS |
| Format | 1920x1422 · 1.35:1 |
| Loop length | 6.7s loop |
| Prompt text | 7,574 characters |
| Captured | 2026-09-17 |
| Faces | Montserrat, Raleway, Playfair Display |
| Stack | Tailwind CSS, React, TypeScript |
| Timing | 240ms transitions, cubic-bezier(0.16, 1, 0.3, 1) easing and a 6.7s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1920x1422 capture before you generate.
2. Check your build against the reference measurements: 20px spacing steps, 240ms transitions and cubic-bezier(0.16, 1, 0.3, 1) easing.
3. Copy 20px spacing steps, 240ms transitions and cubic-bezier(0.16, 1, 0.3, 1) easing into your own brief before you rewrite anything else.
4. Pin the reference measurements before you restyle anything: 20px spacing steps, 240ms transitions and cubic-bezier(0.16, 1, 0.3, 1) easing.
5. Keep the measurements the brief spells out: 20px spacing steps, 240ms transitions and cubic-bezier(0.16, 1, 0.3, 1) easing.

---
来源：https://ottermind.ai/explore/website/palomar-labs
原始 prompt：7574 字符
