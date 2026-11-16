# JungleMind

> Landing page reference for an AI or SaaS product — fluid type, 70ms transitions, #5C5C5C base and cubic-bezier(0.16, 1, 0.3, 1) easing.

- 行业：AI & SaaS（ai-saas）
- 区块：Landing page
- 画布：1920x1422 · 比例 1.3502 · 6.925s

## 概述

This is the landing page from JungleMind, published with the brief that produced it rather than as a screenshot. The palette is #5C5C5C underneath and #111111 for the type, set in Poppins. The entry names the stack that produced the page (vanilla JS) rather than hiding it. Motion is confined to 70ms transitions, cubic-bezier(0.16, 1, 0.3, 1) and a looping video bed. Keep it open while you write: the 36,531-character brief is the part that transfers to your own page.

## 主标题文案

> Landing page reference for an AI or SaaS product, captured at 1920x1422 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#111111` | Headline |
| Neutral | `#5C5C5C` | Secondary |
| Near-black — lighter | `#141414` | darker step |
| Near-black — lighter | `#1A1A1A` | supporting |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Poppins | 12–25px | Headline and interface text — one face for the whole page |

## 视觉要点

- Panel corners reuse the radius list in the brief (9px and 2px), so the grid needs no separate treatment.
- The clip is one asset at 1920x1422 and a 6.9s loop, so the composition has a single media dependency.
- Nothing sits between the type and the 1920x1422 clip, so a replacement has to work under the copy directly.

## 布局

**Top row: wordmark, links, one action** — The bar overlays the landing page instead of pushing it down, so the composition keeps the full height of the first screen. Below 340px the links collapse instead of wrapping onto a second line. If your own page has more sections, group them rather than widening the bar.

**Video at the bottom layer** — The media is one 6.9s clip cropped to cover the 1920x1422 frame, so it never letterboxes at any width. A poster frame at 1920x1422 holds the composition when autoplay is unavailable, so the layout never collapses.

**The scale steps down hard** — The face is quoted with its sizes (Poppins across 12–25px), which is what makes the type portable between builds. Tracking tightens as the size grows, which is why the display line holds together across 12–25px.

**Links before the action** — The bar is a handful of elements, so it rebuilds without a component library. The reference was captured at 1920x1422.


## 动效

**Hover where it means something** — Feedback is limited to hover states on the buttons and links rather than on every card, which is what keeps a dense first screen from feeling busy. Feedback is limited to the controls, so the composition stays still around them. Keep the pointer effects on the controls.

**It respects reduced-motion** — Reduced motion is specified rather than bolted on: with it on, the entrance and the loop stops and the composition holds its final state. The branch is part of the brief rather than an afterthought. Test the page with motion disabled.


## 可替换项

- Replace the video with a still at 1920x1422 if the 6.9s loop is too heavy for the page you are shipping.
- Retime the entrance to taste. 70ms with cubic-bezier(0.16, 1, 0.3, 1) is what the reference uses.
- Swap the clip for your own footage at 1920x1422 or wider, keep it muted, and match the 6.9s loop point.
- Retime the entrance to your own 70ms, but keep cubic-bezier(0.16, 1, 0.3, 1) as the curve, because the easing is what reads as this design.

## 文案规则

**What an AI or SaaS product gains here** — 36,531 characters of brief produce one screen with no filler. The values in it are explicit (type from 12px to 25px and 100vh sections), which is why the composition still reads when the words change. It gives a SaaS reader the shortest honest route to the offer.

**Reading JungleMind as a spec** — The brief is a specification. It states type from 12px to 25px, 100vh sections, 9px corners, 16px spacing steps and 70ms transitions, and it names the media frame at 1920x1422 before anything is designed around it. Nothing in this landing page depends on a default.

**How the landing page reflows** — Test this landing page at 1920x1422 and then at phone width: the same order holds, with the type is clamped between 12px and 25px, the layout shifts at 340px and the section is held at 100vh. A squeeze would have been cheaper and would not hold.


## 规格

| 项 | 值 |
|---|---|
| Page section | Landing page |
| Field | AI & SaaS |
| Canvas size | 1920x1422 · 1.35:1 |
| Loop | 6.9s loop |
| Prompt text | 36,531 characters |
| Saved | 2026-09-17 |
| Faces | Poppins · 12–25px |
| Built with | vanilla JS |
| Motion spec | 70ms transitions, cubic-bezier(0.16, 1, 0.3, 1) easing and a 6.9s media loop |

## 复刻步骤

1. Pin the reference measurements before you restyle anything: type from 12px to 25px, 100vh sections and 9px corners.
2. Check your build against the reference measurements: type from 12px to 25px, 100vh sections and 9px corners.
3. Keep the measurements the brief spells out: type from 12px to 25px, 100vh sections and 9px corners.
4. Copy type from 12px to 25px, 100vh sections and 9px corners into your own brief before you rewrite anything else.
5. Rebuild the motion last and keep the 70ms entrance; the hover and scroll states come after it.

---
来源：https://ottermind.ai/explore/website/junglemind
原始 prompt：36531 字符
