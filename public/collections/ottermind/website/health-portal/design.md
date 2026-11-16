# Health Portal

> Landing page reference for a health or wellbeing product — #990A09 accent, fluid type, #F9F8F9 base and cubic-bezier(0.16,1,0.3,1) easing.

- 行业：Health（health）
- 区块：Landing page
- 画布：640x472 · 比例 1.3559 · 0s

## 概述

Health Portal is the landing page reference for a health or wellbeing product, and the brief behind it is a full build spec rather than a mood board. It leads with “Trusted Dentist in West New York” and gives that line the frame rather than shrinking it into a card. The palette is white #F9F8F9 underneath, deep orange #1D110C for the type and red #990A09 carrying the accents. The build is React and Tailwind CSS; every measurement in it is written down, which is what makes it reusable. The motion budget is 2000ms transitions and cubic-bezier(0.16,1,0.3,1). It is most useful when the Health landing page has to survive a copy change without a redesign.

## 主标题文案

> Landing page reference built around “Trusted Dentist in West New York”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#1D110C` | Headline |
| White | `#FEFEFE` | lightest |
| Red | `#990A09` | accent |
| White — darker | `#F9F8F9` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Face not specified | Sizes and weights only | The brief fixes the type scale but leaves the face to the build |

## 视觉要点

- Transitions are specified at 2000ms, short enough that the page never feels like it is waiting for an animation.
- The navigation collapses at max-width 767px, so the bar has a designed narrow state.
- The accent is spent on red #990A09 and the rest of the composition holds white #F9F8F9.

## 布局

**Links before the action** — The top row holds the wordmark, four to five links and a single action tinted #990A09, sized to stay quiet against the rest of the page. Under 767px the links collapse into a full-screen overlay. Labels are short enough to fit one line at 767px, and the active item is marked with weight rather than with a pill.

**Fluid where it needs to be** — The top of the scale is fluid (a clamp between 180px and 200px) and the rest is fixed, so the frame stays composed as the viewport narrows. The type changes size, not role, as the viewport narrows. Design the narrow layout, do not squeeze it.

**Structure in one screen** — The landing page is built so the copy lands before anything else: the type carries the hierarchy, the 640x472 frame holds the composition, and the supporting values stay quiet. The page is one composition at 640x472, which is why it holds together when the copy changes.

**Navigation without a background** — Below 767px the links collapse instead of wrapping onto a second line.


## 动效

**One duration for the controls** — Hover, press and focus all resolve in 2000ms, which is what makes the interface feel immediate. Every state change names a value, so the browser default is never used. If you change the easing, change it everywhere.

**Position, not a timer** — Scroll reveal runs while the page is moving, so the composition has a defined resting state. The page changes at the reader's pace rather than on a schedule.


## 可替换项

- Replace #990A09 last, after the copy is final, and test it against #F9F8F9 at the smallest text size on the page.
- Swap in your own headline where “Trusted Dentist in West New York” sits and keep the line breaks, because the entrance animates per line.
- Draft the new copy to the 640x472 frame, then check that the entrance still lands on the same number of lines.

## 文案规则

**The numbers behind the landing page** — Most references show the result and keep the numbers. This one reverses that: 200px spacing steps, 2000ms transitions, cubic-bezier(0.16,1,0.3,1) easing and a 767px breakpoint are published beside the page, so the result can be reproduced instead of approximated. Nothing in this landing page depends on a default.

**The order behind the landing page** — When a health reader lands on a single screen, they scan before they read. The layout answers that: navigation, the headline, the announcement badge, the stats row and the card grid are sized to be scanned, with 200px spacing steps and 2000ms transitions keeping each stop distinct. A health reader gets the offer before the options.

**Why the health brief holds** — 16,908 characters of brief produce one screen with no filler. The values in it are explicit (200px spacing steps and 2000ms transitions), which is why the composition still reads when the words change. Health Portal states the offer once and lets the composition repeat it rather than adding a second claim.


## 规格

| 项 | 值 |
|---|---|
| Screen | Landing page |
| Category | Health |
| Viewport | 640x472 · 1.36:1 |
| Brief | 16,908 characters |
| Captured | 2026-09-17 |
| Accent hex | red #990A09 |
| Tech stack | Tailwind CSS, React, TypeScript |
| Timing | 2000ms transitions and cubic-bezier(0.16,1,0.3,1) easing |

## 复刻步骤

1. Drop your product name in, then replace #990A09 with your own accent and re-check the contrast.
2. Set the brand first: product name, the #990A09 accent and a headline that replaces the reference's.
3. Type the product name and the #990A09 accent before you touch the layout.
4. Set your brand first: product name, the #990A09 accent and the headline that replaces the reference's.
5. Copy 200px spacing steps, 2000ms transitions and cubic-bezier(0.16,1,0.3,1) easing into your own brief before you rewrite anything else.

---
来源：https://ottermind.ai/explore/website/health-portal
原始 prompt：16908 字符
