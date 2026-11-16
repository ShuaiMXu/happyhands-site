# Prosthetics Hero

> Hero section reference for a health or wellbeing product — 200ms transitions, #FDFCFC base, a 640x464 frame and React and Tailwind CSS.

- 行业：Health（health）
- 区块：Hero section
- 画布：640x464 · 比例 1.3793 · 0s

## 概述

Prosthetics Hero is a working reference for a health or wellbeing product: the hero section laid out, measured and ready to rebuild. The palette is white #FDFCFC underneath. The entry names the stack that produced the page (React and Tailwind CSS) rather than hiding it. The page keeps its motion to 200ms transitions. If you are briefing a health hero section, start from this composition and replace the subject.

## 主标题文案

> Hero section reference for a health or wellbeing product, captured at 640x464 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| White | `#EDEDED` | panel edges |
| White — lighter | `#F0F0EE` | Secondary |
| Gray | `#8F8F8E` | darkest |
| White — lighter | `#FDFCFC` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Face not specified | 12–14px | The brief fixes the type scale but leaves the face to the build |

## 视觉要点

- Transitions are specified at 200ms, which is the value to keep when the palette changes.
- Transitions are specified at 200ms, short enough that the page never feels like it is waiting for an animation.

## 布局

**The bar shares the page grid** — The bar is one row of text and one action, measured at type from 12px to 14px and 13px spacing steps so it reads as a strip rather than as a band. The bar sits over the 640x464 composition without a background of its own, so the media runs edge to edge underneath it.

**The announcement pill** — A single pill carries the announcement above the headline, and nothing else competes for that position. It is positioned so the headline keeps the centre of the composition. One badge, one message.

**A navigation bar that gets out of the way** — Focus and hover states are specified for each link rather than inherited from the browser. Give the wordmark no more room than its type needs.

**Measured, not eyeballed** — Sizes are quoted rather than inherited: type from 12px to 14px, 13px spacing steps and 200ms transitions. Swap the face or the copy and those relationships still hold. The list is short enough that a reviewer can check it element by element.


## 动效

**A small interactive surface** — Every interactive element does one thing (hover states on the buttons and links rather than on every card), which is what keeps the states predictable. Nothing on the page opens a modal or hijacks the scroll; the interactions stay local to the element.

**Timings in milliseconds** — Hover, press and focus all resolve in 200ms, which is what makes the interface feel immediate. Every state change names a value, so the browser default is never used.


## 可替换项

- The brief behind this page is written out in full below, so any rewrite can be checked against it value by value; the reference was captured at 640x464.
- Read the brief value by value against the 640x464 capture before you edit anything; the numbers are the part that is easiest to lose.
- Retime the entrance to taste. 200ms with a standard ease-out is what the reference uses.
- Replace the headline and the supporting line with your own copy, keeping the same line count so the entrance still lands over the 640x464 frame.

## 文案规则

**The numbers behind the hero section** — The hero section is measured, not eyeballed. type from 12px to 14px and 13px spacing steps come from the brief, and the layout is arranged to those steps rather than nudged into place. Nothing in this hero section depends on a default.

**What a health or wellbeing product gains here** — The trade-off is density: this hero section says less on the first screen than a feature-led layout would. What it keeps is the reading order, and navigation, the headline, the announcement badge and the background clip do the work a longer page would spread out. Prosthetics Hero states the offer once and lets the composition repeat it rather than adding a second claim.

**How Prosthetics Hero sequences the first read** — Set your own copy into this hero section and the sequence still holds, because the elements are not interchangeable: navigation, the headline, the announcement badge and the background clip each carry one job. A health reader gets the offer before the options.


## 规格

| 项 | 值 |
|---|---|
| Page section | Hero section |
| Vertical | Health |
| Viewport | 640x464 · 1.38:1 |
| Brief | 3,421 characters |
| Capture date | 2026-09-17 |
| Tools | Tailwind CSS, React, TypeScript |
| Animation | 200ms transitions |

## 复刻步骤

1. Check your build against the reference measurements: type from 12px to 14px, 13px spacing steps and 200ms transitions.
2. Pin the reference measurements before you restyle anything: type from 12px to 14px, 13px spacing steps and 200ms transitions.
3. Keep the measurements the brief spells out: type from 12px to 14px, 13px spacing steps and 200ms transitions.
4. Copy type from 12px to 14px, 13px spacing steps and 200ms transitions into your own brief before you rewrite anything else.
5. Port the motion last: the entrance, the 200ms states and the hover behaviour, in that order.

---
来源：https://ottermind.ai/explore/website/prosthetics-hero
原始 prompt：3421 字符
