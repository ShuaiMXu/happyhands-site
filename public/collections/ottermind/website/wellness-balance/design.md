# Wellness Balance

> Hero section reference for a health or wellbeing product — DM Sans, fluid type, React and Tailwind CSS and cubic-bezier(0.16, 1, 0.3, 1) easing.

- 行业：Health（health）
- 区块：Hero section
- 画布：640x472 · 比例 1.3559 · 0s

## 概述

Wellness Balance shows one way to build the hero section for a health or wellbeing product, and publishes the instructions that produced it. It leads with “Discover our new plant-based supplements for daily balance and clean energy” and gives that line the frame rather than shrinking it into a card. The colour scheme is white #ECEDEC underneath and white #FEFDF9 for the type, and the page is set in DM Sans. Delivery is React and Tailwind CSS — one page, no plugin, no build tooling between you and the design. Motion comes down to 0.8s transitions and cubic-bezier(0.16, 1, 0.3, 1). It is the right reference for a health or wellbeing product hero section that has to look deliberate on the first screen.

## 主标题文案

> Hero section reference built around “Discover our new plant-based supplements for daily balance and clean energy”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#ECEDEC` | composition |
| White — lighter | `#FEFDF9` | Headline |
| Tint | `#FFFFFF` | supporting |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| DM Sans | 400 / 500 | Control text |
| Inter | 400 / 500 | Copy face |

## 视觉要点

- Font roles are assigned rather than mixed here, and 28–35px is the range the whole scale works in.
- The type is set in DM Sans on a 28–35px scale, and the spacing follows the same steps.
- The display line is DM Sans at the top of a 28–35px scale, with the interface text on the same face.

## 布局

**Top row: wordmark, links, one action** — The bar is one row of text and one action, measured at type from 28px to 35px and 110px spacing steps so it reads as a strip rather than as a band. The bar sits over the 640x472 composition without a background of its own, so the media runs edge to edge underneath it. The bar is a handful of elements, so it rebuilds without a component library.

**Figures as typography** — The figures are set in DM Sans at a size closer to the headline than to the body copy. Figures are set at one weight, so the row does not rank its own statistics.

**The bar shares the page grid** — If your own page has more sections, group them rather than widening the bar. The reference was captured at 640x472.

**The spacing steps are quoted** — Sizes are quoted rather than inherited: type from 28px to 35px, 110px spacing steps, 0.8s transitions and cubic-bezier(0.16, 1, 0.3, 1) easing. Swap the face or the copy and those relationships still hold. Because the values are fixed, a substitution changes the look without changing the rhythm.


## 动效

**Pointers only where they help** — Every interactive element does one thing (a slider that pages through content on demand), which is what keeps the states predictable. Hover and focus are specified together, so the pointer and the keyboard get the same information.

**Short, matched timings** — One duration covers the interactions (0.8s on cubic-bezier(0.16, 1, 0.3, 1)), which is what keeps hover and press reading as one system. Easing is specified alongside the duration (0.8s), so a rebuild cannot quietly substitute a different feel. Do not ship the browser default.


## 可替换项

- Swap in your own headline where “Discover our new plant-based supplements for daily balance and clean energy” sits and keep the line breaks, because the entrance animates per line.
- Replace “Discover our new plant-based supplements for daily balance and clean energy” with your own line and keep the same number of words, because the brief sizes the type for that rhythm.
- Write the replacement headline first, then confirm it still fits the 640x472 frame at the reference's type size.
- Set 0.8s to your own build speed and check that cubic-bezier(0.16, 1, 0.3, 1) still lands the copy before the media starts.

## 文案规则

**The argument this hero section makes** — Restraint costs you room for proof above the fold. This brief accepts that cost and spends the first screen on the offer, with type from 28px to 35px and 110px spacing steps fixed so a proof section can be added below without a rework. It gives a health reader the shortest honest route to the offer.

**What to change first in Wellness Balance** — Start with the copy, not the colour. Rewrite “Discover our new plant-based supplements for daily balance and clean energy” as one sentence about your product, then set it in DM Sans at the size the brief uses. Substitution is cheaper than composition, and that is the point.

**The timing behind the hero section** — The animation budget is stated: 0.8s transitions and a word-by-word headline. Nothing in the hero section moves without a value attached to it. Nothing animates for its own sake in this hero section.


## 规格

| 项 | 值 |
|---|---|
| Page part | Hero section |
| Sector | Health |
| Viewport | 640x472 · 1.36:1 |
| Brief | 7,840 characters |
| Capture date | 2026-09-17 |
| Fonts | DM Sans, Inter · 28–35px |
| Reference stack | Tailwind CSS, React, Lucide icons |
| Motion | 0.8s transitions and cubic-bezier(0.16, 1, 0.3, 1) easing |

## 复刻步骤

1. Copy type from 28px to 35px, 110px spacing steps and 0.8s transitions into your own brief before you rewrite anything else.
2. Check your build against the reference measurements: type from 28px to 35px, 110px spacing steps and 0.8s transitions.
3. Pin the reference measurements before you restyle anything: type from 28px to 35px, 110px spacing steps and 0.8s transitions.
4. Keep the measurements the brief spells out: type from 28px to 35px, 110px spacing steps and 0.8s transitions.
5. Copy the 0.8s timing exactly, then rebuild the entrance before the hover states.

---
来源：https://ottermind.ai/explore/website/wellness-balance
原始 prompt：7840 字符
