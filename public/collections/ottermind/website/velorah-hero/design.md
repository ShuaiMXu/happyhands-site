# Velorah

> Hero section reference for an agency or studio — glass panels, 0.8s transitions, a 800x589 frame and #01405F base.

- 行业：Agencies & Studios（creative）
- 区块：Hero section
- 画布：800x588 · 比例 1.3605 · 10.99s

## 概述

Velorah gives an agency or studio a finished first screen and the numbers that produced it. The page's own headline reads “Where dreams rise through the silence”, and the composition is built around those exact words. The colour scheme is teal #01405F underneath and yellow #D9BF63 for the type, and the page is set in Inter. Delivery is React and Tailwind CSS — one page, no plugin, no build tooling between you and the design. The brief spends its motion budget on 0.8s transitions. Keep it open while you write: the 3,788-character brief is the part that transfers to your own page.

## 主标题文案

> Hero section reference built around “Where dreams rise through the silence”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Deep yellow | `#2C2B17` | darkest |
| Yellow | `#D9BF63` | Headline |
| Teal | `#01405F` | composition |
| Teal — lighter | `#0A435F` | saturated |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | UI face |
| Instrument Serif | Weight not fixed in the brief | Accent face |

## 视觉要点

- Transitions are specified at 0.8s, which is the value to keep when the palette changes.
- The reference was captured at 800x589, and every value quoted on this page comes from the same brief.
- Transitions are specified at 0.8s, short enough that the page never feels like it is waiting for an animation. The timing budget is state feedback rather than page choreography (0.8s), so a slower rebuild reads as a different design.

## 布局

**Top row, one action** — The wordmark holds the left edge and the links run to the right of it, all of it set in Inter so the bar belongs to the page below rather than to a separate system. The bar sits over the 800x589 composition without a background of its own, so the media runs edge to edge underneath it.

**The brief names the steps** — The brief names the numbers: 90px spacing steps and 0.8s transitions. That is why the composition holds together, because there is no invented spacing step between the type and the frame. The brief states values rather than proportions, so the composition keeps its relationships when the copy changes length.

**One row, no drawers** — The bar is one row of text and one action, measured at 90px spacing steps and 0.8s transitions so it reads as a strip rather than as a band.

**Every measurement is written down** — Spacing is quoted the same way (90px spacing steps and 0.8s transitions), not as a scale that grows on its own.


## 动效

**Hover, but sparingly** — Every interactive element does one thing (hover states on the buttons and links rather than on every card), which is what keeps the states predictable. Interactive targets are large enough to tap and the pointer treatment is consistent across them.

**Timing kept in the brief** — Transitions are specified at 0.8s, which is the timing the controls are held to. Easing is specified alongside the duration (0.8s), so a rebuild cannot quietly substitute a different feel.


## 可替换项

- Swap in your own headline where “Where dreams rise through the silence” sits and keep the line breaks, because the entrance animates per line.
- The brief behind this page is written out in full below, so any rewrite can be checked against it value by value; the reference was captured at 800x589.
- Rewrite “Where dreams rise through the silence” to the same line count; the mask reveals each line in turn.
- Replace “Where dreams rise through the silence” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.

## 文案规则

**Reading Velorah as a spec** — Take the hero section apart and the values still describe it: 90px spacing steps and 0.8s transitions for the frame and the rhythm below. Nothing in this hero section depends on a default.

**The order behind the hero section** — One screen, one action, and navigation, the stats row and the background clip between them. The brief fixes that order rather than leaving the first screen to a stack of sections. A agency reader gets the offer before the options.

**The timing behind the hero section** — Copy the pattern rather than the values: keep 0.8s transitions and hover and press states and let your own brand set the durations. Nothing animates for its own sake in this hero section.


## 规格

| 项 | 值 |
|---|---|
| Page section | Hero section |
| Vertical | Agencies & Studios |
| Canvas | 800x589 · 1.36:1 |
| Prompt | 3,788 characters |
| Captured | 2026-09-17 |
| Type scale | Inter, Instrument Serif |
| Reference stack | Tailwind CSS, React, TypeScript |
| Animation | 0.8s transitions |

## 复刻步骤

1. Pin the reference measurements before you restyle anything: 90px spacing steps and 0.8s transitions.
2. Copy 90px spacing steps and 0.8s transitions into your own brief before you rewrite anything else.
3. Keep the measurements the brief spells out: 90px spacing steps and 0.8s transitions.
4. Check your build against the reference measurements: 90px spacing steps and 0.8s transitions.
5. Rebuild the motion last and keep the 0.8s entrance; the hover and scroll states come after it.

---
来源：https://ottermind.ai/explore/website/velorah-hero
原始 prompt：3788 字符
