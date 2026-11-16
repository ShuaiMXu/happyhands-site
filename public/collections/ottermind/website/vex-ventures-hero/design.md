# VEX Ventures

> Hero section reference for a fintech product — glass panels, React and Tailwind CSS, Inter and 1000ms transitions.

- 行业：Fintech（fintech）
- 区块：Hero section
- 画布：800x602 · 比例 1.3289 · 6.44s

## 概述

Before rebuilding a hero section for a fintech product, read VEX Ventures: the composition and the specification behind it are both here. The page's own headline reads “We back visionaries and craft ventures that define what comes next”, and the composition is built around those exact words. The page is set in Inter, with the sizes fixed in the brief. Delivery is React and Tailwind CSS, captured at 800x603 so the frame is fixed before any code is written. Motion is 1000ms transitions, kept quiet enough that the copy still leads. It is most useful when the Fintech hero section has to survive a copy change without a redesign.

## 主标题文案

> Hero section reference built around “We back visionaries and craft ventures that define what comes next”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Primary | `#111111` | base surface |
| Support | `#FFFFFF` | panels |
| Accent | `#A78BFA` | accent |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- Transitions are specified at 1000ms, which is the value to keep when the palette changes.
- The reference was captured at 800x603, and every value quoted on this page comes from the same brief.
- Transitions are specified at 1000ms, short enough that the page never feels like it is waiting for an animation. Glass surfaces use blur(4px), and the blur is what makes the panels read as material rather than as fill.

## 布局

**Navigation held to one row** — A slim bar sits over the hero section with the wordmark on the left and the links set in Inter, so the composition reads as content first and chrome second. The bar sits over the 800x603 composition without a background of its own, so the media runs edge to edge underneath it.

**One row, no drawers** — Focus and hover states are specified for each link rather than inherited from the browser. One action per bar.

**Measured against the viewport** — The values are the specification: 18px spacing steps and 1000ms transitions, captured at 800x603 rather than inferred from a screenshot. The type and the layout share the same steps, so nothing drifts when one of them is substituted.

**Proof in one row** — The numbers row is the proof: three or four figures on one line, small labels under each, kept in the same Inter as the interface so it reads as data rather than decoration. There are no dividers inside the row; spacing alone separates the figures.


## 动效

**Hover where it means something** — The pointer work is small and specified: hover states on the buttons and links rather than on every card, applied to the elements that already look interactive. Hover and focus are specified together, so the pointer and the keyboard get the same information. Keep the interactive layer small.

**Durations from the brief** — The controls resolve in 1000ms, fast enough that the page answers as it is touched rather than after it. The same duration is reused across controls, which keeps the interactions feeling like one system.


## 可替换项

- Hold the 800x603 frame when you swap the content; the composition was solved against that ratio and a wider export pushes the type off.
- The brief behind this page is written out in full below, so any rewrite can be checked against it value by value; the reference was captured at 800x603.
- Draft the new copy to the 800x603 frame, then check that the entrance still lands on the same number of lines.
- Set 1000ms to your own build speed and check that a standard ease-out still lands the copy before the media starts.

## 文案规则

**How the hero section reflows** — Where a template collapses to a single column and hopes, this brief states what happens (the scale is fluid rather than stepped) and keeps the order intact. Autoplay and motion are handled honestly, so the page still communicates when they are unavailable.

**Reading VEX Ventures as a spec** — Compare this with a template that calls its spacing a preference. Here the same values are named (18px spacing steps and 1000ms transitions), so an edit either keeps them or visibly breaks the composition. Nothing in this hero section depends on a default.

**Making the hero section yours** — You do not need to rebuild the hero section to make it yours. Replace the headline and the media, keep the scale (18px spacing steps and 1000ms transitions), and the layout still reads as designed. Rewrite the copy and the media before you re-colour anything.


## 规格

| 项 | 值 |
|---|---|
| Page section | Hero section |
| Field | Fintech |
| Canvas size | 800x603 · 1.33:1 |
| Brief | 5,051 characters |
| Date | 2026-09-17 |
| Faces | Inter |
| Tools | Tailwind CSS, React, TypeScript |
| Motion spec | 1000ms transitions |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 800x603 capture before you generate.
2. Pin the reference measurements before you restyle anything: 18px spacing steps and 1000ms transitions.
3. Keep the measurements the brief spells out: 18px spacing steps and 1000ms transitions.
4. Copy 18px spacing steps and 1000ms transitions into your own brief before you rewrite anything else.
5. Check your build against the reference measurements: 18px spacing steps and 1000ms transitions.

---
来源：https://ottermind.ai/explore/website/vex-ventures-hero
原始 prompt：5051 字符
