# NexaCore Control

> Features section reference for an AI or SaaS product — React and Tailwind CSS, #EBEBEB base, a 640x468 frame and Mazzard H.

- 行业：AI & SaaS（ai-saas）
- 区块：Features section
- 画布：640x468 · 比例 1.3675 · 0s

## 概述

NexaCore Control solves the features section problem for an AI or SaaS product with a single captured brief. The headline reads “Constant re-verification because source data can't be trusted”, and the rest of the features section is arranged around it. The palette is white #EBEBEB underneath, set in Mazzard H. Delivery is React and Tailwind CSS, captured at 640x468 so the frame is fixed before any code is written. Start from the captured brief, then edit the features section rather than rebuilding it from scratch.

## 主标题文案

> “Constant re-verification because source data can't be trusted” — the whole features section is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#FFFFFF` | lightest |
| Gray | `#BCB0C5` | darkest |
| White — darker | `#EEEDEF` | panel edges |
| White — darker | `#EBEBEB` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Mazzard H | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- The composition is measured on a 3-column grid, which is why the distances between elements look consistent.
- Card widths come from the 3-column grid rather than from the copy, so the panels stay equal.
- Panels and controls share the same corner treatment (18px), so the page keeps one surface language.

## 布局

**Values you can check** — Sizes were read off the render at 640x468: a 3-column grid, 18px corners and 12px spacing steps. The brief states values rather than proportions, so the composition keeps its relationships when the copy changes length.

**Numbers on the baseline** — The figures are set as type rather than in a card: Mazzard H at the display size with labels one step below. Labels are set at one size, so a long label does not change the height of the row.

**The sizes are in the brief, not in a scale** — Spacing is quoted the same way (a 3-column grid, 18px corners and 12px spacing steps), not as a scale that grows on its own.

**A stat strip, not a table** — The numbers row is the proof: three or four figures on one line, small labels under each, kept in the same Mazzard H as the interface so it reads as data rather than decoration.


## 动效

**Hover, but sparingly** — The interactive layer is deliberately small: hover states on the buttons and links rather than on every card. Because the states are simple, they port into any component system. Keep the interactive layer small.

**Static by design** — There is no scroll library here: the 640x468 composition holds still and only the elements that respond to you move. Motion is treated as feedback rather than as decoration. Stillness is a valid choice.


## 可替换项

- Replace “Constant re-verification because source data can't be trusted” with your own line and keep the word count, because the entrance is timed per line.
- Replace “Constant re-verification because source data can't be trusted” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.
- Change the copy first, then the accent, then the media: the 640x468 frame was solved in that order and reversing it costs a re-layout.
- The brief behind this page is written out in full below, so any rewrite can be checked against it value by value; the reference was captured at 640x468.

## 文案规则

**The order behind the features section** — The features section has a stated reading path. From there the eye takes the announcement badge, the stats row, the card grid and the background clip in sequence, which is what keeps a single screen from reading as a list. A SaaS reader gets the offer before the options.

**The numbers behind the features section** — 8,666 characters of brief produce a full specification. The load-bearing part is short: a 3-column grid, 18px corners and 12px spacing steps. Nothing in this features section depends on a default.

**Why this composition works for SaaS** — The design argues its case on one screen. The media is a still at 640x468. The media carries the atmosphere, the copy carries the offer, and a 3-column grid and 18px corners keep the two apart. It gives a SaaS reader the shortest honest route to the offer.


## 规格

| 项 | 值 |
|---|---|
| Section | Features section |
| Category | AI & SaaS |
| Viewport | 640x468 · 1.37:1 |
| Prompt | 8,666 characters |
| Captured | 2026-09-17 |
| Fonts | Mazzard H |
| Tools | Tailwind CSS, React, TypeScript |
| Motion spec | state changes only |

## 复刻步骤

1. Pin the reference measurements before you restyle anything: a 3-column grid, 18px corners and 12px spacing steps.
2. Copy a 3-column grid, 18px corners and 12px spacing steps into your own brief before you rewrite anything else.
3. Keep the measurements the brief spells out: a 3-column grid, 18px corners and 12px spacing steps.
4. Check your build against the reference measurements: a 3-column grid, 18px corners and 12px spacing steps.
5. Port the entrance and the hover states in that order, and keep the easing the reference uses.

---
来源：https://ottermind.ai/explore/website/nexacore-control
原始 prompt：8666 字符
