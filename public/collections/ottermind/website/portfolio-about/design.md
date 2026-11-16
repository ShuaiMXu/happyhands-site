# Portfolio About

> About page reference for an agency or studio — a stats row, a dark stage, 200ms transitions and fluid type.

- 行业：Agencies & Studios（creative）
- 区块：About page
- 画布：640x468 · 比例 1.3675 · 0s

## 概述

Before rebuilding a about page for an agency or studio, read Portfolio About: the composition and the specification behind it are both here. Colour is limited to black #0C0C0C underneath and white #D7E2EA for the type, set in Kanit. Delivery is React and Tailwind CSS — one page, no plugin, no build tooling between you and the design. Motion is 200ms transitions, kept quiet enough that the copy still leads. Start from the captured brief, then edit the about page rather than rebuilding it from scratch.

## 主标题文案

> About page reference for an agency or studio, captured at 640x468 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#0C0C0C` | composition |
| Muted blue | `#646973` | lighter step |
| Muted blue — lighter | `#BBCCD7` | Hover tint |
| White | `#D7E2EA` | Headline |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Kanit | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- Transitions are specified at 200ms, which is the value to keep when the palette changes. The reference was captured at 640x468, and every value quoted on this page comes from the same brief.
- The timing budget is state feedback rather than page choreography (200ms), so a slower rebuild reads as a different design.

## 布局

**The brief names the steps** — Type and spacing are drawn from one list here: 160px spacing steps and 200ms transitions. There is no invented intermediate value between the named ones; the measurement list is the whole system.

**Badge above the fold** — One badge, one message: the pill sits above the headline in Kanit at the smallest step, and nothing else competes for that slot. The pill sits at the smallest step in the brief, so it reads as a label rather than as a second title.

**Copy first, decoration second** — The about page is built so the copy lands before anything else: the type carries the hierarchy, the 640x468 frame holds the composition, and the supporting values stay quiet. The page is one composition at 640x468, which is why it holds together when the copy changes. The brief is the specification.

**Numbers carried into the build** — Spacing is quoted the same way (160px spacing steps and 200ms transitions), not as a scale that grows on its own.


## 动效

**The whole animation budget** — Every state change in the specification has a duration attached: transitions settle around 200ms. Nothing is left at the browser default, which is why the page feels authored rather than animated. One value is reused across the controls, so their timing cannot drift apart.

**Reveals tied to movement** — The effect sits on top of a finished layout rather than generating it, so the page is readable with a sticky element holds position while the content moves under it disabled. Reduced motion drops the effect without changing the composition's final state. The reference was captured at 640x468.


## 可替换项

- Load your own face beside Kanit and compare the headline at full width before committing to the swap.
- Read the brief value by value against the 640x468 capture before you edit anything; the numbers are the part that is easiest to lose.
- Hold the 640x468 frame when you swap the content; the composition was solved against that ratio and a wider export pushes the type off.
- Swap Kanit for a face with the same x-height and cap height, then re-measure the headline block.

## 文案规则

**Making the about page yours** — When you drop your own media in, keep the crop and the layer order. The media is a still at 640x468. That placement is what keeps the copy legible. If a new element does not help explain the offer or the next action, it belongs below the fold.

**How Portfolio About sequences the first read** — Set your own copy into this about page and the sequence still holds, because the elements are not interchangeable: the announcement badge, the stats row and the feature list each carry one job. A agency reader gets the offer before the options.

**What holds up for Agencies & Studios** — 5,431 characters of brief produce one screen with no filler. The values in it are explicit (160px spacing steps and 200ms transitions), which is why the composition still reads when the words change. Portfolio About states the offer once and lets the composition repeat it rather than adding a second claim.


## 规格

| 项 | 值 |
|---|---|
| Block | About page |
| Industry | Agencies & Studios |
| Format | 640x468 · 1.37:1 |
| Brief | 5,431 characters |
| Archived | 2026-09-17 |
| Fonts | Kanit |
| Tools | Tailwind CSS, React, Framer Motion |
| Timing | 200ms transitions |

## 复刻步骤

1. Copy 160px spacing steps and 200ms transitions into your own brief before you rewrite anything else.
2. Pin the reference measurements before you restyle anything: 160px spacing steps and 200ms transitions.
3. Keep the measurements the brief spells out: 160px spacing steps and 200ms transitions.
4. Check your build against the reference measurements: 160px spacing steps and 200ms transitions.
5. Rebuild the motion last and keep the 200ms entrance; the hover and scroll states come after it.

---
来源：https://ottermind.ai/explore/website/portfolio-about
原始 prompt：5431 字符
