# Planetary Pulse

> Hero section reference for an education or community brand — 300ms transitions, cubic-bezier(0.16, 1, 0.3, 1) easing and a stats row.

- 行业：Education & Community（education）
- 区块：Hero section
- 画布：1826x1080 · 比例 1.6907 · 5.9s

## 概述

This is the hero section from Planetary Pulse, published with the brief that produced it rather than as a screenshot. Colour is limited to gray #C2CCD3 underneath, set in Helvetica, Arial. The entry names the stack that produced the page (Tailwind and vanilla JavaScript) rather than hiding it. The motion budget is 300ms transitions, cubic-bezier(0.16, 1, 0.3, 1) and a looping video bed. Treat it as the brief for an education or community brand hero section that has to hold up under a rebuild, not just a first look.

## 主标题文案

> Hero section reference for an education or community brand, captured at 1826x1080 with the layout, timings and palette specified in the brief.

## 色板

| 名称 | 色值 | 角色 |
|---|---|---|
| Gray | `#C2CCD3` | composition |
| White | `#F5F4F0` | lightest |
| Gray — darker | `#9895A7` | darkest |
| White — darker | `#DDE1E1` | panel edges |

## 字体

| 字体 | 字号/字重 | 用途 |
|---|---|---|
| Helvetica, Arial | Weight not fixed in the brief | Headline and interface text — one stack for the whole page |

## 视觉要点

- Corner treatment is specified in the brief: 9999px and 48px.
- The clip is one asset at 1826x1080 and a 5.9s loop, so the composition has a single media dependency.
- Glass surfaces use blur(12px), and the blur is what makes the panels read as material rather than as fill.

## 布局

**One row, no drawers** — The bar overlays the hero section instead of pushing it down, so the composition keeps the full height of the first screen. Below 280px the links collapse instead of wrapping onto a second line.

**One clip does the work** — The clip runs 5.9s at 1826x1080 and loops without a visible cut, so it reads as surface rather than as footage. Export at 1826x1080 or wider and the cover crop keeps working.

**Faces with one job each** — The display line is set in Helvetica, Arial at a size the brief fixes, which makes the headline a composition element rather than a paragraph. The interface text stays on one face, so the page never mixes two voices at the same size.

**A navigation bar that gets out of the way** — Labels are short enough to fit one line at 280px, and the active item is marked with weight rather than with a pill.


## 动效

**A loop, not a timeline** — The background clip runs 5.9s at 1826x1080 on an endless loop, muted and inline, so the page keeps moving while the reader's attention is on the copy. No scroll library is required, because the only ambient motion is the media itself. A poster frame stands in when autoplay is blocked, so the motion is additive rather than required.

**Timings in milliseconds** — The timings are short and consistent (300ms using cubic-bezier(0.16, 1, 0.3, 1)), so hover and press states read as one system instead of a set of separate effects. Short timings are why the page reads as authored; a slow default would undo the composition. Time the feedback exactly.


## 可替换项

- Keep 1826x1080 for the media and re-crop your own asset into it rather than resizing the frame.
- Swap the clip for your own footage at 1826x1080 or wider, keep it muted, and match the 5.9s loop point.
- Replace the headline and the supporting line with your own copy, keeping the same line count so the entrance still lands over the 1826x1080 frame.
- Replace the video with a still at 1826x1080 if the 5.9s loop is too heavy for the page you are shipping.

## 文案规则

**How Planetary Pulse sequences the first read** — Attention is directed rather than left to chance. The sequence runs navigation, the stats row, the card grid, the feature list and the background clip, and each stop is sized against 100vh sections and 9999px corners so nothing arrives out of order. A education reader gets the offer before the options.

**The timing behind the hero section** — You could drop a preset library onto this composition and it would look busier, not better. The brief keeps 300ms transitions, a 5.9s media loop and a masked line reveal and spends the budget there. Nothing animates for its own sake in this hero section.

**How the hero section reflows** — A fixed desktop scale would have been easier. The brief adds a clamp between 20px and 14px, which is what keeps the display line proportionate between widths. The narrow layout is a decision rather than a squeeze, and the hierarchy survives it.


## 规格

| 项 | 值 |
|---|---|
| Page section | Hero section |
| Field | Education & Community |
| Frame | 1826x1080 · 1.69:1 |
| Clip length | 5.9s loop |
| Brief | 26,446 characters |
| Archived | 2026-09-17 |
| Typefaces | Helvetica, Arial |
| Tech stack | Tailwind CSS, vanilla JS |
| Motion spec | 300ms transitions, cubic-bezier(0.16, 1, 0.3, 1) easing and a 5.9s media loop |

## 复刻步骤

1. Stage the prompt in Studio and read it once against the 1826x1080 capture before you generate.
2. Check your build against the reference measurements: 100vh sections, 9999px corners and 14px spacing steps.
3. Keep the measurements the brief spells out: 100vh sections, 9999px corners and 14px spacing steps.
4. Copy 100vh sections, 9999px corners and 14px spacing steps into your own brief before you rewrite anything else.
5. Pin the reference measurements before you restyle anything: 100vh sections, 9999px corners and 14px spacing steps.

---
来源：https://ottermind.ai/explore/website/planetary-pulse
原始 prompt：26446 字符
