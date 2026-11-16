# ADHD Planner

> Pricing section reference for a health or wellbeing product — a stats row, 300ms transitions, cubic-bezier(0.77,0,0.175,1) easing and #D9C4AA accent.

- 行业：Health（health）
- 区块：Pricing section
- 画布：1458x1080 · 比例 1.35 · 7.333s

## 概述

ADHD Planner shows one way to build the pricing section for a health or wellbeing product, and publishes the instructions that produced it. The colour scheme is muted orange #F6E4CF underneath, deep orange #321C04 for the type and muted orange #D9C4AA carrying the accents, and the page is set in Inter. Delivery is React and Tailwind CSS, captured at 1458x1080 so the frame is fixed before any code is written. Motion is 300ms transitions, cubic-bezier(0.77,0,0.175,1) and a looping video bed, kept quiet enough that the copy still leads. It is the right reference for a health or wellbeing product pricing section that has to look deliberate on the first screen.

## 主标题文案

> Pricing section reference built on muted orange #F6E4CF and muted orange #D9C4AA, set in Inter and measured against type from 42px to 96px.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Deep orange | `#321C04` | Headline |
| Muted orange | `#D9C4AA` | accent |
| Muted orange — lighter | `#F6E4CF` | composition |
| White | `#FFF9F2` | lightest |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | 400 / 500 / 600 | Control text |
| Instrument Serif | 400 / 500 / 600 | Emphasis |

## 视觉要点

- Media is specified at 1458x1080 and a 7.3s loop, so a replacement should match the crop and the loop length.
- Accent and ground are both named (muted orange #D9C4AA on muted orange #F6E4CF), so a brand swap moves one value.
- Font roles are assigned rather than mixed here, and 42–96px is the range the whole scale works in.

## 布局

**Navigation held to one row** — The bar is the quietest part of the composition: wordmark, a short row of links and one #D9C4AA action, all held at the smallest type step in the brief. The links are set below the wordmark in size, and the #D9C4AA action is the only element in the bar with any weight. Give the wordmark no more room than its type needs.

**Measured against the viewport** — The brief fixes type from 42px to 96px, 25px spacing steps, 300ms transitions and cubic-bezier(0.77,0,0.175,1) easing and leaves the rest to the arrangement, which is the opposite of a scale that grows on its own. The type and the layout share the same steps, so nothing drifts when one of them is substituted.

**A clip, not an illustration** — The background is a single 7.3s loop at 1458x1080, cropped to cover and left un-tinted. Everything else floats above it on a higher layer. The loop is short enough (7.3s) that the eye reads it as texture rather than as a timeline.

**A grid, not a text run** — The grid is the structure: panels of the same size, set in Inter, arranged so the eye moves across rather than down. Panels are separated by spacing rather than by borders, which keeps the grid quiet. The order of the panels is the reading order.


## 动效

**Ambient motion without a scroll library** — Ambient movement is one 7.3s clip at 1458x1080, looping quietly behind the copy rather than reacting to the pointer. Nothing else on the page animates continuously, so the media is the only thing asking for attention.

**Timing kept in the brief** — Motion is measured in milliseconds here: 300ms on cubic-bezier(0.77,0,0.175,1). That is the whole animation budget, and it is spent on state changes rather than on a scroll timeline. Because the values are short, a rebuild that slows them down is immediately visible.


## 可替换项

- Keep the 1458x1080 frame when you swap the content, because the composition was solved against that ratio.
- Recut your footage to the 7.3s loop, then export at 1458x1080 so the crop the reference specifies survives.
- Replace the video with a still at 1458x1080 if the 7.3s loop is too heavy for the page you are shipping.
- Replace #D9C4AA last, after the copy is final, and test it against #F6E4CF at the smallest text size on the page.

## 文案规则

**The order behind the pricing section** — If your page currently leads with features, this is the order to copy: navigation, the headline, the announcement badge, the stats row and the card grid in front, the supporting detail after, and type from 42px to 96px and 25px spacing steps setting the distance. A health reader gets the offer before the options.

**The timing behind the pricing section** — A short motion budget costs you drama on the first frame. It buys legibility, and it means 300ms transitions, a 7.3s media loop and a scroll reveal can be ported without a library. Nothing animates for its own sake in this pricing section.

**Making the pricing section yours** — A straight substitution has a limit: if your product needs a different hierarchy, type from 42px to 96px and 25px spacing steps will fight it. Change the order first in that case, and the values second. If a new element does not help explain the offer or the next action, it belongs below the fold.


## 规格

| 项 | 值 |
|---|---|
| Section | Pricing section |
| Industry | Health |
| Frame | 1458x1080 · 1.35:1 |
| Runtime | 7.3s loop |
| Brief | 8,810 characters |
| Captured | 2026-09-17 |
| Key tone | muted orange #D9C4AA |
| Fonts | Inter, Instrument Serif · 42–96px |
| Stack | Tailwind CSS, React, TypeScript |
| Transitions | 300ms transitions, cubic-bezier(0.77,0,0.175,1) easing and a 7.3s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1458x1080 capture before you generate.
2. Set the brand first: product name, the #D9C4AA accent and a headline that replaces the reference's.
3. Drop your product name in, then replace #D9C4AA with your own accent and re-check the contrast.
4. Type the product name and the #D9C4AA accent before you touch the layout.
5. Set your brand first: product name, the #D9C4AA accent and the headline that replaces the reference's.

---
来源：https://ottermind.ai/explore/website/adhd-planner
原始 prompt：8810 字符
