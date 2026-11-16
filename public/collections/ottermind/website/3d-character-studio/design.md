# 3D Character Studio

> Landing page reference for an agency or studio — HelveticaNowDisplay-Medium, React and Tailwind CSS, #E12444 accent and looping video.

- 行业：Agencies & Studios（creative）
- 区块：Landing page
- 画布：1740x1080 · 比例 1.6111 · 6.567s

## 概述

Read 3D Character Studio as a landing page spec: the values were written down before the page was built. “Glad you stopped in. Good taste tends to find us. Now, what are we building?” is the line the layout is built to carry. The colour scheme is red #800014 underneath and bright red #E12444 carrying the accents, and the page is set in HelveticaNowDisplay-Medium. Delivery is React and Tailwind CSS, captured at 1740x1080 so the frame is fixed before any code is written. The brief spends its motion budget on 38ms transitions and a looping video bed. Keep it open while you write: the 5,726-character brief is the part that transfers to your own page.

## 主标题文案

> “Glad you stopped in. Good taste tends to find us. Now, what are we building?” — the whole landing page is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Red | `#780011` | saturated |
| Orange | `#D79780` | lighter |
| Red — lighter | `#800014` | composition |
| Bright red | `#E12444` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| HelveticaNowDisplay-Medium | 13–32px | UI text |
| HelveticaNowDisplayW01-Rg | 13–32px | Copy face |

## 视觉要点

- Media is specified at 1740x1080 and a 6.6s loop, so a replacement should match the crop and the loop length.
- Nothing sits between the type and the 1740x1080 clip, so a replacement has to work under the copy directly.
- Accent use is limited to bright red #E12444; everything else sits on red #800014.

## 布局

**One row, no drawers** — Wordmark, links and the #E12444 action share one baseline, which is what keeps a thin row from looking accidental. The links are set below the wordmark in size, and the #E12444 action is the only element in the bar with any weight. Keep the row to one line.

**One scale for type and frame** — Nothing in the layout is left to feel: the brief quotes type from 13px to 32px, 26px spacing steps and 38ms transitions and the build has to hit those values. Every value can be checked against the captured prompt, which is what makes a rebuild verifiable rather than approximate. Verify a rebuild against the same numbers.

**Video at the bottom layer** — The clip runs 6.6s at 1740x1080 and loops without a visible cut, so it reads as surface rather than as footage. Export at 1740x1080 or wider and the cover crop keeps working.

**Links before the action** — The bar sits over the 1740x1080 composition without a background of its own, so the media runs edge to edge underneath it.


## 动效

**The entrance is the signature** — Entrance motion is spent on the page's own message rather than on the frame around it: a typewriter pass types the intro line. The animation runs once on load rather than on every scroll, so the page never re-performs while you read it. Make sure the still frame works on its own.

**Feedback on the controls** — Interaction is local to each control here (hover states on the buttons and links rather than on every card), so nothing on the page moves as a side effect. The interactive states do not move layout, so nothing jumps under the pointer. A few reliable states beat a long list of effects.


## 可替换项

- Set 38ms to your own build speed and check that a standard ease-out still lands the copy before the media starts.
- Replace “Glad you stopped in. Now, what are we building?” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.
- Read the brief value by value against the 1740x1080 capture before you edit anything; the numbers are the part that is easiest to lose.
- Move #E12444 to your own hue and leave #800014 where it is; the distance between them is doing the hierarchy work.

## 文案规则

**How 3D Character Studio sequences the first read** — A page like this usually buries the action under a feature grid. This one puts navigation, the announcement badge, the stats row and the background clip in a fixed sequence, with the action inside the first screen rather than after three scroll lengths. A agency reader gets the offer before the options.

**The numbers behind the landing page** — This is what makes the reference reusable: type from 13px to 32px, 26px spacing steps and 38ms transitions. Nothing is left to a default, so a substitution that keeps those numbers keeps the composition. Nothing in this landing page depends on a default.

**What moves in 3D Character Studio** — Compare the motion here with a scroll-driven page. Both move; this one moves where the brief says (38ms transitions, a 6.6s media loop and a typewriter pass), so the copy stays in front. Nothing animates for its own sake in this landing page.


## 规格

| 项 | 值 |
|---|---|
| Screen | Landing page |
| Sector | Agencies & Studios |
| Canvas size | 1740x1080 · 1.61:1 |
| Clip length | 6.6s loop |
| Source text | 5,726 characters |
| Captured | 2026-09-17 |
| Accent hex | bright red #E12444 |
| Type | HelveticaNowDisplay-Medium, HelveticaNowDisplayW01-Rg · 13–32px |
| Stack | Tailwind CSS, React, TypeScript |
| Animation | 38ms transitions and a 6.6s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1740x1080 capture before you generate.
2. Set the brand first: product name, the #E12444 accent and a headline that replaces the reference's.
3. Drop your product name in, then replace #E12444 with your own accent and re-check the contrast.
4. Set your brand first: product name, the #E12444 accent and the headline that replaces the reference's.
5. Type the product name and the #E12444 accent before you touch the layout.

---
来源：https://ottermind.ai/explore/website/3d-character-studio
原始 prompt：5726 字符
