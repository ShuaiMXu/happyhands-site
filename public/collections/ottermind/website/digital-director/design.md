# Digital Director

> Portfolio reference for an agency or studio — Inter, #000000 base, React and Tailwind CSS and a dark stage.

- 行业：Agencies & Studios（creative）
- 区块：Portfolio
- 画布：1472x1080 · 比例 1.363 · 6.967s

## 概述

Digital Director gives an agency or studio a finished first screen and the numbers that produced it. The headline reads “Adam Roberts - Design & Engineering”, and the rest of the portfolio page is arranged around it. The colour scheme is black #000000 underneath and white #FFFFFF for the type, and the page is set in Inter. It ships as React and Tailwind CSS, so the whole portfolio page can be lifted into a project without a design handoff. The page keeps its motion to 400ms transitions, cubic-bezier(0.16,1,0.3,1) and a looping video bed. Take it on when the portfolio page needs a decided order before any new sections are added.

## 主标题文案

> Portfolio reference built around “Adam Roberts - Design & Engineering”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#0B0B0B` | panel edges |
| Near-black — darker | `#000000` | composition |
| White | `#FFFFFF` | Headline |
| White — darker | `#DBD2CE` | lighter step |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Inter | Weight not fixed in the brief | Headline and interface text — one face for the whole page |

## 视觉要点

- Media is specified at 1472x1080 and a 7s loop, so a replacement should match the crop and the loop length.
- The clip is one asset at 1472x1080 and a 7s loop, so the composition has a single media dependency.
- The reference was captured at 1472x1080, and every value quoted on this page comes from the same brief.

## 布局

**A navigation bar that gets out of the way** — Navigation is a single row with no second level under it. A mobile overlay takes over below the tablet breakpoint. The bar sits over the 1472x1080 composition without a background of its own, so the media runs edge to edge underneath it.

**Sizes fixed in the brief** — The brief states its sizes at capture (10px spacing steps, 400ms transitions and cubic-bezier(0.16,1,0.3,1) easing), so a rebuild can be verified instead of approximated. The type and the layout share the same steps, so nothing drifts when one of them is substituted.

**Faces with one job each** — The faces are assigned roles rather than mixed: Inter carries the display and the interface together. The face is paired with fixed sizes, which is what keeps the display line and the interface text related. Do not add a size without a job.

**The footer is a full composition** — Links are grouped into columns with the wordmark in its own block, which keeps a long footer readable instead of turning it into a list. Columns align to the same grid as the page above, so the footer feels like the same design. Give the wordmark its own column.


## 动效

**One duration for the controls** — Hover, press and focus all resolve in 400ms, which is what makes the interface feel immediate. The same duration is reused across controls, which keeps the interactions feeling like one system.

**A loop, not a timeline** — Ambient movement comes from the 7s 1472x1080 loop rather than from scroll effects, which keeps the page calm and the type readable. A poster frame stands in when autoplay is blocked, so the motion is additive rather than required.


## 可替换项

- Hold the portfolio page to one screen on desktop; the composition is solved for a reader who never scrolls.
- Keep the 1472x1080 frame when you swap the content, because the composition was solved against that ratio.
- Set 400ms to your own build speed and check that cubic-bezier(0.16,1,0.3,1) still lands the copy before the media starts.
- Keep the supporting line as short as the reference's and measure the pair against the 1472x1080 crop.

## 文案规则

**How Digital Director sequences the first read** — The brief runs 8,947 characters and names the reading order explicitly: navigation, the headline, the stats row, the feature list and the background clip, with 10px spacing steps and 400ms transitions between them. A agency reader gets the offer before the options.

**Making the portfolio page yours** — Suppose you only have one afternoon. Change the headline and the action label, leave 10px spacing steps and 400ms transitions alone, and you have a page that looks intentional. Substitution is cheaper than composition, and that is the point.

**How the portfolio page reflows** — If your breakpoints were chosen to make things fit rather than to change the layout, read this entry. the navigation collapses into a mobile menu rather than a list of hidden elements. The order is the last thing to change.


## 规格

| 项 | 值 |
|---|---|
| Page section | Portfolio |
| Sector | Agencies & Studios |
| Format | 1472x1080 · 1.36:1 |
| Clip length | 7s loop |
| Input brief | 8,947 characters |
| Captured | 2026-09-17 |
| Type scale | Inter |
| Stack | Tailwind CSS, React, TypeScript |
| Motion | 400ms transitions, cubic-bezier(0.16,1,0.3,1) easing and a 7s media loop |

## 复刻步骤

1. Keep the measurements the brief spells out: 10px spacing steps, 400ms transitions and cubic-bezier(0.16,1,0.3,1) easing.
2. Copy 10px spacing steps, 400ms transitions and cubic-bezier(0.16,1,0.3,1) easing into your own brief before you rewrite anything else.
3. Check your build against the reference measurements: 10px spacing steps, 400ms transitions and cubic-bezier(0.16,1,0.3,1) easing.
4. Pin the reference measurements before you restyle anything: 10px spacing steps, 400ms transitions and cubic-bezier(0.16,1,0.3,1) easing.
5. Add the entrance first at 400ms, and only then the hover and scroll behaviour.

---
来源：https://ottermind.ai/explore/website/digital-director
原始 prompt：8947 字符
