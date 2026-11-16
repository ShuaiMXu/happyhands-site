# Retro-Futurist

> Hero section reference for an agency or studio — HelveticaNowDisplay-Medium, React and Tailwind CSS, #B3B1B3 base and fluid type.

- 行业：Agencies & Studios（creative）
- 区块：Hero section
- 画布：640x474 · 比例 1.3502 · 0s

## 概述

Retro-Futurist is a agency hero section built from one written brief, and this page documents that brief. It leads with “Glad you stopped in. Good taste tends to find us. Now, what are we building?” and gives that line the frame rather than shrinking it into a card. Colour is limited to gray #B3B1B3 underneath, set in HelveticaNowDisplay-Medium. The build is React and Tailwind CSS; every measurement in it is written down, which is what makes it reusable. The motion budget is 38ms transitions. Keep it open while you write: the 5,713-character brief is the part that transfers to your own page.

## 主标题文案

> “Glad you stopped in. Good taste tends to find us. Now, what are we building?” — the whole hero section is composed around that line, down to the animation timings.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Gray | `#4E4D46` | darkest |
| Gray — lighter | `#C7C5C7` | lightest |
| Gray — lighter | `#73716D` | surface |
| Gray — lighter | `#B3B1B3` | composition |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| HelveticaNowDisplay-Medium | 13–32px | Interface |
| HelveticaNowDisplayW01-Rg | 13–32px | Secondary copy, captions and labels |

## 视觉要点

- Font roles are assigned rather than mixed here, and 13–32px is the range the whole scale works in.
- Transitions are specified at 38ms, which is the value to keep when the palette changes.
- The display line is HelveticaNowDisplay-Medium at the top of a 13–32px scale, with the interface text on the same face.

## 布局

**Top row, one action** — The bar is one row of text and one action, measured at type from 13px to 32px and 26px spacing steps so it reads as a strip rather than as a band. The bar sits over the 640x474 composition without a background of its own, so the media runs edge to edge underneath it. Keep the link count to four or five; the row is sized for that.

**A pill for the one thing that is new** — One badge, one message: the pill sits above the headline in HelveticaNowDisplay-Medium at the smallest step, and nothing else competes for that slot. There is one announcement only, which is what makes the badge feel like news.

**The nav is deliberately thin** — Give the wordmark no more room than its type needs. The reference was captured at 640x474.

**Sizes fixed in the brief** — Every measurement in the brief is a number you can measure back: type from 13px to 32px, 26px spacing steps and 38ms transitions. Each value maps to one job: a type step, a gap, a radius or a transition.


## 动效

**The headline assembles itself** — Entrance motion is concentrated on one element: a typewriter pass types the intro line. Everything else is already in place when the page loads. The entrance finishes before the reader's eye reaches the supporting copy.

**Timings in milliseconds** — The controls resolve in 38ms, fast enough that the page answers as it is touched rather than after it. Focus states are timed with the same value as hover, so keyboard and pointer feedback match.


## 可替换项

- Keep HelveticaNowDisplay-Medium or substitute a face with the same proportions, because the brief pairs specific weights with specific sizes.
- Change the copy first, then the accent, then the media: the 640x474 frame was solved in that order and reversing it costs a re-layout.
- Keep the supporting line as short as the reference's and measure the pair against the 640x474 crop.
- Load your own face beside HelveticaNowDisplay-Medium and compare the headline at full width before committing to the swap.

## 文案规则

**Making the hero section yours** — You do not need to rebuild the hero section to make it yours. Replace the headline and the media, keep the scale (type from 13px to 32px and 26px spacing steps), and the layout still reads as designed. The subject is the part that should change.

**The numbers behind the hero section** — You cannot fix a composition by eye when two people are rebuilding it. The brief removes the argument: type from 13px to 32px, 26px spacing steps and 38ms transitions, stated once. Nothing in this hero section depends on a default.

**Why the agency brief holds** — The design argues its case on one screen. The media is a still at 640x474. The media carries the atmosphere, the copy carries the offer, and type from 13px to 32px and 26px spacing steps keep the two apart. Retro-Futurist states the offer once and lets the composition repeat it rather than adding a second claim.


## 规格

| 项 | 值 |
|---|---|
| Page part | Hero section |
| Vertical | Agencies & Studios |
| Canvas | 640x474 · 1.35:1 |
| Input brief | 5,713 characters |
| Archived | 2026-09-17 |
| Typefaces | HelveticaNowDisplay-Medium, HelveticaNowDisplayW01-Rg · 13–32px |
| Reference stack | Tailwind CSS, React, TypeScript |
| Motion | 38ms transitions |

## 复刻步骤

1. Pin the reference measurements before you restyle anything: type from 13px to 32px, 26px spacing steps and 38ms transitions.
2. Copy type from 13px to 32px, 26px spacing steps and 38ms transitions into your own brief before you rewrite anything else.
3. Check your build against the reference measurements: type from 13px to 32px, 26px spacing steps and 38ms transitions.
4. Keep the measurements the brief spells out: type from 13px to 32px, 26px spacing steps and 38ms transitions.
5. Port the motion last: the entrance, the 38ms states and the hover behaviour, in that order.

---
来源：https://ottermind.ai/explore/website/retro-futurist
原始 prompt：5713 字符
