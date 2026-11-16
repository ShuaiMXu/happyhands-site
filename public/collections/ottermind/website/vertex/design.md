# Vertex

> Landing page reference for an ecommerce brand — a masked headline reveal, #020204 base, a stats row and 620ms transitions.

- 行业：Ecommerce（ecommerce）
- 区块：Landing page
- 画布：1920x1414 · 比例 1.3579 · 6.925s

## 概述

Vertex solves the landing page problem for an ecommerce brand with a single captured brief. “Streamline the shop” is the line the layout is built to carry. The colour scheme is deep blue #020204 underneath, and the page is set in Poppins. The reference is built with one self-contained HTML file, and the layout decisions are stated independently of it. Motion comes down to 620ms transitions, cubic-bezier(.4,0.2,1) and a looping video bed. Treat it as the brief for an ecommerce brand landing page that has to hold up under a rebuild, not just a first look.

## 主标题文案

> Landing page reference built around “Streamline the shop”, with the layout, timings and palette written down in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Near-black | `#17181C` | lightest |
| Near-black — darker | `#16171B` | panel edges |
| Near-black — darker | `#020204` | composition |
| Near-black — darker | `#0A111D` | Secondary |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Poppins | 12–54px | UI text |
| Inter | 12–54px | Copy face |
| Playfair Display | 12–54px | Emphasis |

## 视觉要点

- Card widths come from the 4-column grid rather than from the copy, so the panels stay equal.
- Corner treatment is specified in the brief: 12px and 8px.
- The panels are laid out on a 4-column grid, which is what keeps the middle of the page on one measure.

## 布局

**A bar with nothing spare** — A short run of links and a single action sit over the landing page, held at type from 12px to 54px and 16px spacing steps so the bar never competes with the composition behind it. Below 158px the links collapse instead of wrapping onto a second line.

**A full-bleed clip behind the type** — The clip runs 6.9s at 1920x1414 and loops without a visible cut, so it reads as surface rather than as footage. The loop is short enough (6.9s) that the eye reads it as texture rather than as a timeline.

**Badge above the fold** — One badge, one message: the pill sits above the headline in Poppins at the smallest step, and nothing else competes for that slot. It is positioned so the headline keeps the centre of the composition. Remove it when the news is old.

**The bar shares the page grid** — If your own page has more sections, group them rather than widening the bar. The reference was captured at 1920x1414.


## 动效

**A canvas, not an image** — A live canvas is doing the visual work: a WebGL canvas. There is no image swap in the brief, so the scene is part of the first paint. Keep the interface flat around it.

**State changes, timed** — One duration covers the interactions (620ms on cubic-bezier(.4,0.2,1)), which is what keeps hover and press reading as one system. The same duration is reused across controls, which keeps the interactions feeling like one system.


## 可替换项

- Keep 1920x1414 for the media and re-crop your own asset into it rather than resizing the frame.
- Swap the clip for your own footage at 1920x1414 or wider, keep it muted, and match the 6.9s loop point.
- Draft the new copy to the 1920x1414 frame, then check that the entrance still lands on the same number of lines.
- Rewrite “Streamline the shop” to the same line count; the mask reveals each line in turn.

## 文案规则

**Why this composition works for ecommerce** — If your first screen currently explains three things, this is the version that explains one. navigation, the headline, the announcement badge, the stats row and the card grid are staged in reading order, with type from 12px to 54px and a 4-column grid setting the rhythm. It gives a ecommerce reader the shortest honest route to the offer.

**The numbers behind the landing page** — A screenshot tells you what the page looks like; the brief tells you why. type from 12px to 54px, a 4-column grid, 12px corners, 16px spacing steps and 620ms transitions close the gap between the two. Nothing in this landing page depends on a default.

**What to change first in Vertex** — Start with the copy, not the colour. Rewrite “Streamline the shop” as one sentence about your product, then set it in Poppins at the size the brief uses. If a new element does not help explain the offer or the next action, it belongs below the fold.


## 规格

| 项 | 值 |
|---|---|
| Section | Landing page |
| Vertical | Ecommerce |
| Viewport | 1920x1414 · 1.36:1 |
| Loop | 6.9s loop |
| Input brief | 51,432 characters |
| Capture date | 2026-09-17 |
| Faces | Poppins, Inter, Playfair Display · 12–54px |
| Tools | single HTML file |
| Timing | 620ms transitions, cubic-bezier(.4,0.2,1) easing and a 6.9s media loop |

## 复刻步骤

1. Check your build against the reference measurements: type from 12px to 54px, a 4-column grid and 12px corners.
2. Keep the measurements the brief spells out: type from 12px to 54px, a 4-column grid and 12px corners.
3. Pin the reference measurements before you restyle anything: type from 12px to 54px, a 4-column grid and 12px corners.
4. Copy type from 12px to 54px, a 4-column grid and 12px corners into your own brief before you rewrite anything else.
5. Add the entrance first at 620ms, and only then the hover and scroll behaviour.

---
来源：https://ottermind.ai/explore/website/vertex
原始 prompt：51432 字符
